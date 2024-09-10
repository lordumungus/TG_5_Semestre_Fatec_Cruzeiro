const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./banco/database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Criar a tabela de usuários se não existir
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela de usuários:', err.message);
      } else {
        console.log('Tabela de usuários garantida.');
      }
    });
    // Criar a tabela de serviços se não existir
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rate INTEGER NOT NULL,
      userEmail TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela de serviços:', err.message);
      } else {
        console.log('Tabela de serviços garantida.');
      }
    });
  }
});

// Rota para cadastro de usuário
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err.message);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
      } else {
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      }
    });
  } else {
    res.status(400).json({ error: 'Dados incompletos' });
  }
});

// Rota para login de usuário
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err.message);
        res.status(500).json({ error: 'Erro no servidor' });
      } else if (row) {
        res.status(200).json({ message: 'Login bem-sucedido', user: row });
      } else {
        res.status(401).json({ error: 'Email ou senha incorretos' });
      }
    });
  } else {
    res.status(400).json({ error: 'Dados incompletos' });
  }
});

// Rota para adicionar serviço
app.post('/add-service', (req, res) => {
  const { name, rate, userEmail } = req.body;
  if (name && rate && userEmail) {
    db.run('INSERT INTO services (name, rate, userEmail) VALUES (?, ?, ?)', [name, rate, userEmail], (err) => {
      if (err) {
        console.error('Erro ao adicionar serviço:', err.message);
        res.status(500).json({ error: 'Erro ao adicionar serviço' });
      } else {
        res.status(201).json({ message: 'Serviço adicionado com sucesso!' });
      }
    });
  } else {
    res.status(400).json({ error: 'Dados incompletos' });
  }
});

// Rota para buscar todos os serviços
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar serviços:', err.message);
      res.status(500).json({ error: 'Erro ao buscar serviços' });
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
