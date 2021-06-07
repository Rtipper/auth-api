'use strict';

require('dotenv').config();
require('@code-fellows/supergoose');

const supertest = require('supertest')

const server = require('../src/server.js')

process.env.SECRET = 'secret';

const mockRequest = supertest(server.app);

let user = {
  username: 'rtipper',
  password: '12345'
}

describe('Routing Tests', () => {
  it('will create a new user and send an object with that user and the token', async () => {

    const response = await mockRequest.post('/signup').send(user)
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  })

  it('will sign in with basic auth headers, log in a user and send an object with that user and its correct token to the client', async () => {

    const response = await mockRequest.post('/signin')
    .auth('rtipper','12345')
    expect(response.body).toBeDefined();
    expect(response.body.token).toBeDefined();
  })
})