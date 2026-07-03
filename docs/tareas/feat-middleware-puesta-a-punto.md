# Backend - Correcciones para la puesta a punto de la arquitectura middleware

En este documento se registran los cambios y las correcciones aplicadas para que la arquitectura middleware implementada, la validación con Zod, las migraciones con Prisma, la suite de tests y el contrato Front-Back compile sin errores y tengan el comportamiento esperado.

---

## Cambios

### 1. Restaurar `CreateTaskDTO`

El tipo había sido borrado de `taskModel.ts`, pero se seguí importando en `taskRepository`. Esto provocaba que el código no compilara.

**Solución**: Se vuelve a añadir `export type CreateTaskDTO = Omit<Task, 'id' | 'description'> & { description?: string }` a `taskModel.ts`.

**Comprobación**: `npx tsc --noEmit` -> 0 errores. Demuestra que el proyecto compila.

### 2. Corregir comportamiento de controllers para que no crashee el servidor

`goalController.ts` y `taskController.ts` tienen errores en los métodos de `createGoal` y `createTask` que provocan 201 falso y una Promise no controlada que tumba el servidor.

**Solución**:
- La llamada a `addOne` debe ser `async` -> se añade `await`. Esto hace que los errores ahora sean gestionados por `errorHandler`.
- La respuesta debe enviar el resultado de `addOne` (`savedGoal` y `savedTask`) con el uuid creado en la BD, no los datos recibidos del request.
- `req.body` no es asíncrono -> se elimina `await`
- Se deconstruye `timeline` anidado solo para metas (gestionado por `goalRepository.ts`), para Tasks no es necesario -> se refactoriza.

**Comprobación**: 
- `POST /tasks` → 201 con uuid en la respuesta
- `POST /goals` → 500 JSON (falla hasta que se corrijan más cosas), pero el servidor sigue vivo.

### 3. Generar UUID por la BD

La regla de negocio 'UUID de Goals y Tasks generados por la Base de Datos' tenía fallos de implementación.

**Solución**:

- Se añade `id String @id @default(uuid())` a `model Goal` en `schema.prisma` (`model Task` ya lo tenía) y se regenera el cliente prisma con `prisma migrate dev`.

- Se modifica `seed.ts` con los datos iniciales de la BD, eliminando ids y linkedGoalIds fijos (también de `mockData.ts`). Se modifica `mockData.ts` con tareas anidadas en su meta. De esta forma, el seed de la BD hace upsert de metas por la clave natural `title` (funciona porque el título es único), se captura el id generado y el upsert de tareas se hace por la clave compuesta title_linkedGoalId (también único).

- Permitir la creación sin id en la interfaz `repository.ts` y añadiendo el genérico `TCreate` en `taskReposityory.ts`. `addOne(item: T)` exigía `id` en el tipo. 

**Comprobación**:
- `POST /goals` → 201 con uuid en la respuesta
- `db:reset` + seed → 2 metas uuid, 3 tareas vinculadas (idempotente).
- `npx tsc --noEmit` → 0 errores.



### 4. Schemas y Params coherentes con las decisiones de negocio

Se modifican los Schemas y Params de validación para mantener la consistencia con las reglas de negocio:

**Solución**:

- Se modifican `goalSchema.ts`, `taskSchema.ts` y `routes.ts`. Validación error 400 para id no uuid, `.uuid()` debe ser consistente en `GoalParamsSchema` y `TaskParamsSchema` (se cambia el nombre al último para mantener la convención PascalCase).

- Se aplican las decisiones de negocio a `goalSchema.ts` y `taskSchema.ts`:

    - Crear sin `isCompleted` ni `startDate` (automáticos, los fija el servidor por defecto).
    - `UpdateGoalSchema` con `timeline` anidado (como en las request).
    - `UpdateTaskSchema` sin `endDate` y sin `linkedGoalId`.

**Comprobación**:

- `GET /goals/<no-uuid>` → 400; `GET /goals/<uuid>` → 200.
- `POST /goals` con isCompleted=true -> 201 con isCompleted forzado a `false`.
- `PATCH /goals/<uuid-goal>` con `timeline` anidado -> 200.
- `PATCH /tasks/<uuid-task>` con `endDate` -> 200 con endDate ignorado.
- `POST /tasks` o `PATCH /tasks/<uuid-task>` con `linkedGoalId` no uuid -> 400.


### 5. Optimizar el manejo de errores

El `errorHandler` actual no mapea los errores específicos de Prisma, y sigue filtrando mensajes internos con información sensible al cliente.

**Solución**:

- Mapear errores Prisma con errores HTTP: `P2002`-> 409, `P2003` -> 400, `P2025` -> 404.

- Orden de prioridad `prismaError ?? statusCode ?? 500`.

- Mensaje de error (`err.message`) solo se reenvía en errores menores al 500. Los 500 responden con un mensaje genérico y el detalle del error va al log terminal (`console.error`).

**Comprobación**:

- Crear Goal/Task duplicada -> 409 limpio.
- Crear Task con FK (linkedGoalId) inexistente -> 400.
- Actualizar Goal/Task con uuid inexistente -> 404
- No se muestran tracebacks ni internals en el body de las responses.


### 6. Configurar y ampliar la suite de tests

Necesario redefinir la suite de test para que no utilice ids fijos (los crea la BD), sino que utilice el método crear y capturar. También se necesita crear una suite de test para probar el controller de Tareas.

**Solución**:
- Test dinámicos para que capturen ids mediante la API (lista -> primer id) en lugar de asumir `g1`.
- Se utilizan constantes para uuid inexistente y expresión regular de uuid.
- Test nuevos: 400 por id no válido, 409 por título duplicado y reglas de negocio.
- Suite de test `taskController.test.ts` para CRUD básico y reglas de negocio; 400 en `linkedGoalId` desde Zod (formato) o desde Prisma FK/P2003 (inexistente); 409 por título de tarea duplicado en la misma meta; inmutabilidad de `linkedGoalId` en edición de tareas (PATCH).

**Comprobación**:
- `npm test` -> 2 suites, 16/16 pasan en verde.

**Nota**: Jest corre ambas suites en paralelo y estas comparten la BD. Si aparecen problemas, considerar serializar (`jest --runInBand`).


### 7. Limpieza de archivos

Los archivos `goal-api@1.0.0` y `tsx` de la raíz probablemente se han generado con comandos erróneos. Como no tienen utilidad los elimino del repositorio y del trackeo de git con `git rm`.

