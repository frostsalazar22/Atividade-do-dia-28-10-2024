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
