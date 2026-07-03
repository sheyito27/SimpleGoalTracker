# Decisiones

En este documento se reflejan las decisiones tomadas en el backend para que consten de forma clara las reglas de negocio y el contrato de la API.

## Creación de Metas y Tareas

- Cada Goal y Task tiene un uuid asociado, creado automáticamente por la BD.

- En la creación de Goal y Task, isCompleted siempre es `false` y no es requerido (valor por defecto de la BD). Luego podrá ser editado vía PATCH cuando Goal y Task se completen.

- Goal y Task tienen `startDate` no requerida (por defecto es la fecha actual de creación), pero solo Goal tiene `endDate`.

- La descripción es obligatoria solo para Goal, para Task es opcional.

- No se pueden crear Metas con títulos repetidos, ni Tareas con títulos repetidos para una misma meta. Si pertenecen a Metas diferentes, sí puede haber Tareas con el mismo título.

## Update de Metas y Tareas

- La Meta asociada a una Tarea no es editable vía PATCH. Si la Tarea corresponde a otra meta, hay que borrarla y crearla de nuevo en la Meta correspondiente. `linkedGoalId` es inmutable.