const request = require('supertest');
const app = require('../src/app');

describe('GET /health/live', () => {

    it('returns a healthy status', async () => {

        const response = await request(app)
            .get('/health/live');

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            status: 'healthy'
        });
    });

});