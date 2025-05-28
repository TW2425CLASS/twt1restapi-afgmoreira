// Importa o pacote swagger-jsdoc para gerar a especificação Swagger a partir de comentários JSDoc
const swaggerJSDoc = require('swagger-jsdoc');

// Define as opções para o swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI
    info: {
      title: 'API de Cursos e Alunos', // Título da documentação
      version: '1.0.0', // Versão da API
      description: 'Documentação da API usando Swagger', // Descrição
    },
  },
  apis: [__dirname + '/../server.js'], // Caminho para os ficheiros com comentários JSDoc
};

// Gera a especificação Swagger
const swaggerSpec = swaggerJSDoc(options);

// Exporta a especificação para ser usada no server.js
module.exports = swaggerSpec;