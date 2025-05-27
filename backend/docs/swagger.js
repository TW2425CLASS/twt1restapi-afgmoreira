const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cursos e Alunos',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
  },
  apis: [__dirname + '/../server.js'], // Caminho correto para o server.js
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;