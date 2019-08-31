const request = require('supertest');
const server = require('../api/server');

describe('auth router', () => {
  describe('POST /api/auth/register', () => {
    it('should respond 400 Bad Request if no information', async () => {
      const response = await request(server)
                              .post('/api/auth/register')
                              .send({});

      expect(response.status).toBe(400);
    });

    it('should respond with message if successful', async () => {
      const username = `testDummy-${Date.now()}`;

      const input = {
        username,
        password: "cantTouchThis"
      };

      const expectedOutput = {
        message: "Head on in. You have registered successfully.",
        success: true
      };

      const response = await request(server)
                              .post('/api/auth/register')
                              .send(input);
    
      expect(response.body).toEqual(expectedOutput);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should respond 200 ok', async () => {
      const response = await request(server)
                        .post('/api/auth/login')
                        .send({
                          "username": "testDummy",
                          "password": "testDummyPassword"
                        });

      expect(response.status).toBe(200);
    });

    it('should respond with message and token', async () => {
      const response = await request(server)
                              .post('/api/auth/login')
                              .send({
                                "username": "testDummy",
                                "password": "testDummyPassword"
                              });

      const expectedOutput = {
        message: "Welcome, testDummy.",
        success: true,
        token: expect.any(String)
      };

      expect(response.body).toEqual(expectedOutput);
    });
  });
});