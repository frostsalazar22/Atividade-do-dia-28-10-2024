const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: true
}));

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

// Página inicial
app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo! <a href="/login">Login</a> | <a href="/protected">Página Protegida</a></h1>');
});

// Página de login
app.get('/login', (req, res) => {
  res.send('<form method="POST" action="/login">Usuário: <input type="text" name="username"/><br>Senha: <input type="password" name="password"/><br><button type="submit">Login</button></form>');
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validação simples
  if (username === 'usuario' && password === 'senha') {
    req.session.user = username;
    res.redirect('/protected');
  } else {
    res.send('Login falhou. <a href="/login">Tente novamente</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Você saiu! <a href="/">Voltar à página inicial</a>');
});

app.get('/protected', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Página Protegida</h1><p>Bem-vindo, ${req.session.user}! <a href="/logout">Logout</a></p>`);
  } else {
    res.send('Acesso negado! <a href="/login">Faça login</a>');
  }
});

function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Aplicar o middleware na rota protegida
app.get('/protected', authMiddleware, (req, res) => {
  res.send(`<h1>Página Protegida</h1><p>Bem-vindo, ${req.session.user}! <a href="/logout">Logout</a></p>`);
});