const request = require('supertest');
const app = require('./index');

describe('Testes da API', () => {
  it('Deve criar um usuário', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({
        nome: 'TesteUsuario',
        email: 'teste@email.com',
        profissao: 'Desenvolvedor',
        regiao: 'Sudeste',
        temNegocio: true,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso!');
  });

  it('Deve listar usuários', async () => {
    const response = await request(app).get('/usuarios');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve editar um usuário', async () => {
    const response = await request(app)
      .put('/usuarios/3') 
      .send({
        novoNome: 'NovoNome',
        novoEmail: 'novo@email.com',
        novaProfissao: 'Engenheiro',
        novaRegiao: 'Nordeste',
        temNegocio: false,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário editado com sucesso!');
  });

  it('Deve remover um usuário', async () => {
    const response = await request(app)
      .delete('/usuarios/8')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário removido com sucesso');
  });
});
