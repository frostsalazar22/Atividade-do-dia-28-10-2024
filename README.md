# Atividade-do-dia-28-10-2024
Vejo que o exercício é para implementar um sistema de autenticação simples usando **Node.js**, **Express**, **cookies** e **sessions**. Vou te orientar pelo passo a passo.

### Passo 1: Instalar as dependências necessárias
No terminal, dentro do diretório do projeto, instale as dependências necessárias:

```bash
npm init -y
npm install express express-session cookie-parser
```

### Passo 2: Configurar o servidor Express
Crie um arquivo chamado `server.js` e configure o servidor básico:

```javascript
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
```

### Passo 3: Implementar rotas básicas
No arquivo `server.js`, adicione as rotas para **login**, **logout**, e uma **página protegida**.

```javascript
// Página inicial
app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo! <a href="/login">Login</a> | <a href="/protected">Página Protegida</a></h1>');
});

// Página de login
app.get('/login', (req, res) => {
  res.send('<form method="POST" action="/login">Usuário: <input type="text" name="username"/><br>Senha: <input type="password" name="password"/><br><button type="submit">Login</button></form>');
});
```

### Passo 4: Adicionar suporte a sessions
A configuração de sessions já foi feita no `app.use(session({...}))` no Passo 2.

### Passo 5: Implementar rota de login
Agora, implemente a lógica de autenticação na rota de **login**.

```javascript
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
```

### Passo 6: Implementar rota de logout
Adicione a rota de **logout** para encerrar a sessão do usuário.

```javascript
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Você saiu! <a href="/">Voltar à página inicial</a>');
});
```

### Passo 7: Criar rota protegida
Adicione uma rota protegida que só pode ser acessada por usuários autenticados.

```javascript
app.get('/protected', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Página Protegida</h1><p>Bem-vindo, ${req.session.user}! <a href="/logout">Logout</a></p>`);
  } else {
    res.send('Acesso negado! <a href="/login">Faça login</a>');
  }
});
```

### Passo 8: Implementar middleware de autenticação
Para proteger rotas específicas, você pode criar um middleware de autenticação.

```javascript
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
```
