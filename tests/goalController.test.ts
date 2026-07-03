
import request from 'supertest'
import { app } from '../src/app.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const UUID_INEXISTENTE = '00000000-0000-4000-8000-000000000000';

// Probar GET /goals
describe ('GET /goals', () => {
    it('devuelve 200 y un array de metas', async () => {
        const res = await request(app).get('/goals');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

// Probar GET /goals/:id
describe ('GET /goals/:id', () => {
    it('devuelve 200 y la meta cuando el id existe', async () => {
        
        // Descubrir un id real preguntando a la API
        const list = await request(app).get('/goals');
        const existingGoal = list.body[0];

        const res = await request(app).get(`/goals/${existingGoal.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(existingGoal.id);
    });

    it('devuelve 404 cuando el id no existe', async () => {
        const res = await request(app).get(`/goals/${UUID_INEXISTENTE}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Meta no encontrada' });
    });

    it('devuelve 400 cuando el id no es un uuid', async () => {
        const res = await request(app).get('/goals/no-es-uuid');
        expect(res.status).toBe(400);
    });
});

// Probar POST /goals
describe('POST /goals', () => {
    const validData = {
        title: "Dominar TypeScript y Zod",
        description: "Completar la implementación de la API con validaciones robustas.",
        timeline: { endDate: "2026-06-25T00:00:00Z" },
    };

    const invalidData = {
        name: "Dani", //
        description: "Esto es una prueba",
        timeline: { endDate: "2026-06-25T00:00:00Z" }
    };

    it('devuelve 201 con id uuid e isCompleted false', async () => {
        const res = await request(app).post('/goals').send(validData);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(validData.title);
        expect(res.body.id).toMatch(UUID_RE);
        expect(res.body.isCompleted).toBe(false);
    });

    it('devuelve 409 si el título ya existe', async () => {
        // ValidData ya en la BD por el test anterior -> título duplicado
        // Alternativa más limpia -> crear meta en beforeAll
        const res = await request(app).post('/goals').send(validData);
        expect(res.status).toBe(409);
    });

    it('devuelve 400 cuando el body no es compatible con el esquema Goal', async () => {
        const res = await request(app).post('/goals').send(invalidData);
        expect(res.status).toBe(400);
    });
});