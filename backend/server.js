// Importação dos módulos necessários
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
require('dotenv').config({ path: __dirname + '/../.env' }); // Carrega variáveis de ambiente do .env

const app = express();
app.use(cors()); // Permite CORS
app.use(express.json()); // Permite receber JSON nos pedidos

// LIGAÇÃO AO MONGODB ATLAS usando a variável de ambiente
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Ligado ao MongoDB Atlas!'))
  .catch(err => console.error('Erro ao ligar ao MongoDB:', err));

// ESQUEMAS E MODELOS MONGOOSE
const CursoSchema = new mongoose.Schema({
  nome: String
});
const Curso = mongoose.model('Curso', CursoSchema);

const AlunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurso: String,
  idade: String
});
const Aluno = mongoose.model('Aluno', AlunoSchema);

// ROTA INICIAL (GET /)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Página inicial da API
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
app.get('/', (req, res) => {
  res.send('API de Cursos e Alunos');
});

// CRUD CURSOS

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
app.get('/cursos', async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Curso criado
 */
app.post('/cursos', async (req, res) => {
  const novo = new Curso({ nome: req.body.nome });
  await novo.save();
  res.status(201).json(novo);
});

/**
 * @swagger
 * /cursos/{id}:
 *   patch:
 *     summary: Atualiza um curso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Curso atualizado
 *       404:
 *         description: Curso não encontrado
 */
app.patch('/cursos/:id', async (req, res) => {
  const curso = await Curso.findByIdAndUpdate(req.params.id, { nome: req.body.nome }, { new: true });
  if (!curso) return res.sendStatus(404);
  res.json(curso);
});

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Remove um curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do curso
 *     responses:
 *       204:
 *         description: Curso removido
 */
app.delete('/cursos/:id', async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// CRUD ALUNOS

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 */
app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               apelido:
 *                 type: string
 *               curso:
 *                 type: string
 *               anoCurso:
 *                 type: string
 *               idade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno criado
 */
app.post('/alunos', async (req, res) => {
  const novo = new Aluno({
    nome: req.body.nome,
    apelido: req.body.apelido,
    curso: req.body.curso,
    anoCurso: req.body.anoCurso,
    idade: req.body.idade
  });
  await novo.save();
  res.status(201).json(novo);
});

/**
 * @swagger
 * /alunos/{id}:
 *   patch:
 *     summary: Atualiza um aluno existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               apelido:
 *                 type: string
 *               curso:
 *                 type: string
 *               anoCurso:
 *                 type: string
 *               idade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 */
app.patch('/alunos/:id', async (req, res) => {
  const aluno = await Aluno.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      apelido: req.body.apelido,
      curso: req.body.curso,
      anoCurso: req.body.anoCurso,
      idade: req.body.idade
    },
    { new: true }
  );
  if (!aluno) return res.sendStatus(404);
  res.json(aluno);
});

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       204:
 *         description: Aluno removido
 */
app.delete('/alunos/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Rota para servir a documentação Swagger em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia o servidor na porta 3002
const PORT = 3002;
app.listen(PORT, () => console.log(`API real a correr em http://localhost:${PORT}`));