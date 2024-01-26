const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const dbConnection = require('./db'); 

app.use(bodyParser.json());
app.use(cors());

app.post('/usuarios', (req, res) => {
  const { nome, email, profissao, regiao, temNegocio } = req.body;

  const sql = 'INSERT INTO usuarios (nome, email, profissao, regiao, temNegocio) VALUES (?, ?, ?, ?, ?)';
  dbConnection.query(sql, [nome, email, profissao, regiao, temNegocio], (err, results) => {
    if (err) {
      console.error('Erro ao inserir usuário no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    } else {
      console.log('Usuário inserido com sucesso no banco de dados');
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
  });
});


app.get('/usuarios', async (req, res) => {
    try {
      const [rows] = await dbConnection.promise().query('SELECT * FROM usuarios');
  
      res.json(rows);
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      res.status(500).send('Erro interno do servidor');
    }
});

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { novoNome, novoEmail, novaProfissao, novaRegiao, temNegocio } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: 'ID do usuário inválido' });
    }
  
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, profissao = ?, regiao = ?, temNegocio = ? WHERE id = ?';

    dbConnection.query(sql, [novoNome, novoEmail, novaProfissao, novaRegiao, temNegocio, id], (err, results) => {
      if (err) {
        console.error('Erro ao editar usuário no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao editar usuário' });
      } else {
        console.log('Usuário editado com sucesso no banco de dados');
        res.json({ message: 'Usuário editado com sucesso!' });
      }
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    dbConnection.query(sql, [id], (err, results) => {
    if (err) {
        console.error('Erro ao remover usuário do banco de dados:', err);
        res.status(500).json({ error: 'Erro ao remover usuário' });
    } else {
        console.log('Usuário removido com sucesso do banco de dados');
        res.status(200).json({ message: 'Usuário removido com sucesso' });
    }
    });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

module.exports = app;