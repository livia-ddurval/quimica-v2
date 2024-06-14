const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definir o diretório de views e o template engine (ejs no caso)
app.set('views', path.join(__dirname, 'MVC', 'Views'));
app.set('view engine', 'ejs');


// Servir arquivos estáticos como CSS, JS, imagens, etc.
app.use(express.static(path.join(__dirname, 'MVC', 'Views', 'Public', 'REACT', 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'MVC', 'Views', 'Public', 'images', 'uploads')));

// Servir arquivos estáticos do React (assumindo a estrutura mencionada)
app.use('/react-app', express.static(path.join(__dirname, 'Public', 'REACT', 'build')));

// Importação dos roteadores
const usuariosRouter = require('./DAO/usuariosDAO');
const gruposFuncionaisRouter = require('./DAO/grupos_funcionaisDAO');
const compostosRouter = require('./DAO/compostosDAO');
const propriedadesRouter = require('./DAO/propriedadesDAO');
const usosRouter = require('./DAO/usosDAO');

// Rotas principais
app.get('/usuarios/lista', (req, res) => {
  res.render('DEV/usuarios/listusuarios');
});

// Rota para acessar o arquivo HomePage.js diretamente
app.get('/quimica-organica', (req, res) => {
  res.sendFile(path.join(__dirname, 'MVC', 'Views', 'Public', 'REACT', 'src', 'pages', 'HomePage.js'));
});


// Configuração das rotas para cada recurso   
app.use('/usuarios', usuariosRouter);
app.use('/grupos_funcionais', gruposFuncionaisRouter);
app.use('/compostos', compostosRouter);
app.use('/propriedades', propriedadesRouter);
app.use('/usos', usosRouter);

// Configuração do servidor para escutar na porta definida
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
