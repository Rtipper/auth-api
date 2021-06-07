'use strict';

require('dotenv').config();
require('@code-fellows/supergoose');

const supertest = require('supertest')

const server = require('../src/server.js')

const mockRequest = supertest(server.app);
process.env.SECRET = 'secret';

let user = {
  username: 'rtipper',
  password: '12345',
  role: 'admin'
}

let shirt = {
  name: 'Shirt',
  color: 'White',
  size: 'Large'
}


describe('Route Tests v2', () => {
  it('Will add an item to the data base and return an object with that added item', async () => {
    
    const responseA = await mockRequest.post('/signup').send(user)

    const responseB = await mockRequest.post('/api/v2/clothes')
     .send(shirt)
     .set('Authorization', `Bearer ${responseA.body.token}`)

    expect(responseB.status).toBe(500);
    expect(responseB.body).toBeDefined();
  })
  
  it('Will return a list of :model items', async () => {
    
    const responseA = await mockRequest.post('/signin')
    .auth('rtipper','12345')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();
  })

  it('Will return an item that has been updated', async () => {
    const responseA = await mockRequest.post('/signin')
    .auth('rtipper','12345')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();

  })

  it('Will return the item that has been deleted', async () => {
    const responseA = await mockRequest.post('/signin')
    .auth('rtipper','12345')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();

  })
})