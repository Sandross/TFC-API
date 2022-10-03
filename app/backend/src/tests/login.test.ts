import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/userModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Validação da rota login', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
    .stub(User, "findOne")
    .resolves({
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as User);
});

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  describe('Rota de Login', () => {
    it('deve retornar um token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin'
          });
  });
});

  it('Deve retornar erro de credenciais inválidas', async () => {
    const response =  await chai.request(app).post('/login')
    .send({ email: '', password: '' });
    expect(response.status).to.equal(400);
});
});