
import request from 'supertest'
import { app } from '../src/app.js';

describe ('GET /goals', () => {
    it('devuelve 200 y un array de metas', async () => {
        const res = await request(app).get('/goals');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe ('GET /goals/:id', () => {
    it('devuelve 200 y la meta cuando el id existe', async () => {
        const res = await request(app).get('/goals/g1');
        expect(res.status).toBe(200);
        expect(res.body.id).toBe('g1');
    });

    it('devuelve 404 cuando el id no existe', async () => {
        const res = await request(app).get('/goals/no-existe');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Meta no encontrada' });
    });
});


