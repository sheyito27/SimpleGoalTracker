import request from 'supertest';
import { app } from '../src/app.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const UUID_INEXISTENTE = '00000000-0000-4000-8000-000000000000';

describe('GET /tasks', () => {
    it('devuelve 200 y un array de tareas', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /tasks/:id', () => {
    it('devuelve 200 y la tarea cuando el id existe', async () => {
        const list = await request(app).get('/tasks');
        const existingTask = list.body[0];

        const res = await request(app).get(`/tasks/${existingTask.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(existingTask.id);
    });

    it('devuelve 404 cuando el id no existe', async () => {
        const res = await request(app).get(`/tasks/${UUID_INEXISTENTE}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Tarea no encontrada' });
    });

    it('devuelve 400 cuando el id no es un uuid', async () => {
        const res = await request(app).get(`/tasks/no-es-uuid`);
        expect(res.status).toBe(400);
    });
});

describe('POST /tasks', () => {
    it('devuelve 201 con uuid, isCompleted false y startDate automática', async () => {
        const goals = await request(app).get('/goals');
        const goalId = goals.body[0].id;

        const res = await request(app).post('/tasks').send(
            { title: 'Tarea creada por test', linkedGoalId: goalId }
        );

        expect(res.status).toBe(201);
        expect(res.body.id).toMatch(UUID_RE);
        expect(res.body.isCompleted).toBe(false);
        expect(res.body.startDate).toBeDefined();
        expect(res.body.linkedGoalId).toBe(goalId);
    });

    it('devuelve 409 para títulos duplicados en la misma meta', async () => {
        const goals = await request(app).get('/goals');
        const goalId = goals.body[0].id;

        const res = await request(app).post('/tasks').send(
            { title: 'Tarea creada por test', linkedGoalId: goalId }
        );
        expect(res.status).toBe(409);
    });

    it('devuelve 400 si linkedGoalId no es un uuid', async () => {
        const res = await request(app).post('/tasks').send(
            { title: 'Tarea con meta no uuid', linkedGoalId: 'g2' }
        );
        expect(res.status).toBe(400);
    });

    it('devuelve 400 si la meta vinculada no existe', async () => {
        const res = await request(app).post('/tasks').send(
            { title: 'Tarea sin meta', linkedGoalId: UUID_INEXISTENTE }
        );
        expect(res.status).toBe(400);
    });
});

describe('PATCH /tasks/:id', () => {
    it('linkedGoalId es inmutable: se ignora si se envía', async () => {
        const list = await request(app).get('/tasks');
        const task = list.body[0];

        const res = await request(app).patch(`/tasks/${task.id}`).send(
            { linkedGoalId: UUID_INEXISTENTE, title: task.title }
        );

        // linkedGoalId no cambia
        expect(res.status).toBe(200);
        expect(res.body.linkedGoalId).toBe(task.linkedGoalId); 
    });
});