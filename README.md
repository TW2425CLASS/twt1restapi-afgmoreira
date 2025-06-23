# Gestão de Alunos e Cursos

## Autor

- **Nome:** André Ferreira Garcia Moreira
- **Número:** 27617

---

## Publicação

- **Frontend:** [https://twt1restapi-afgmoreira.vercel.app](https://twt1restapi-afgmoreira.vercel.app)
- **Backend (API):** [https://twt1restapi-afgmoreira.onrender.com](https://twt1restapi-afgmoreira.onrender.com)

---

## Instalação e Execução Local

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/TW2425CLASS/twt1restapi-afgmoreira.git
   cd twt1restapi-afgmoreira
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Correr o mock-server (opcional):**
   ```bash
   npm run start:mock
   ```
   Acede a [http://localhost:3001](http://localhost:3001)

4. **Correr a API real:**
   ```bash
   npm run start:api
   ```
   Acede a [http://localhost:3002](http://localhost:3002)

5. **Frontend:**
   - Abrir o ficheiro `frontend/index.html` no navegador
   - Ou usar o link publicado acima

---

## Descrição da Base de Dados

A base de dados contém duas coleções principais:

- **Alunos**
  - `nome`: Nome do aluno
  - `apelido`: Apelido do aluno
  - `curso`: ID do curso frequentado
  - `anoCurso`: Ano curricular do aluno

- **Cursos**
  - `nome`: Nome do curso

---

## Descrição da API (Rotas)

### Alunos

- `GET /alunos`  
  Lista todos os alunos

- `GET /alunos/:id`  
  Devolve um aluno pelo seu ID

- `POST /alunos`  
  Adiciona um novo aluno  
  **Body:** `{ nome, apelido, curso, anoCurso }`

- `PATCH /alunos/:id`  
  Atualiza dados de um aluno  
  **Body:** `{ nome?, apelido?, curso?, anoCurso? }`

- `DELETE /alunos/:id`  
  Remove um aluno

### Cursos

- `GET /cursos`  
  Lista todos os cursos

- `GET /cursos/:id`  
  Devolve um curso pelo seu ID

- `POST /cursos`  
  Adiciona um novo curso  
  **Body:** `{ nome }`

- `PATCH /cursos/:id`  
  Atualiza o nome de um curso  
  **Body:** `{ nome }`

- `DELETE /cursos/:id`  
  Remove um curso

---

## Descrição do Frontend

- Interface web desenvolvida em HTML, CSS e JavaScript.
- Permite:
  - Visualizar, adicionar, editar e remover alunos.
  - Visualizar, adicionar, editar e remover cursos.
  - Atualização dinâmica dos dados sem recarregar a página.
  - Utilização de modais para edição de alunos e cursos.
  - Consumo da API real publicada.

---

## Outros Conteúdos Relevantes

- **Documentação Swagger da API:**  
  [https://twt1restapi-afgmoreira.onrender.com/api-docs](https://twt1restapi-afgmoreira.onrender.com/api-docs)

- **Tecnologias utilizadas:**  
  - Node.js, Express, MongoDB Atlas, Fetch API, HTML, CSS, JavaScript

- **Estrutura do projeto:**
  ```
  /frontend    ← Interface web
  /backend     ← API RESTful
  /mock-server ← Mock-server (JSON-server)
  /mock-data   ← Dados de exemplo
  /tests       ← Coleção de testes Postman
  README.md
  ```

---