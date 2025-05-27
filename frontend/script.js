// URL base da API
const apiUrl = "http://localhost:3002";

// Variáveis para os modais de atualização
const modal = document.getElementById("update-aluno-modal"); // Modal de atualização de aluno
const closeModalButton = document.getElementById("close-modal"); // Botão para fechar o modal de aluno
const closeCursoModalButton = document.getElementById("close-curso-modal"); // Botão para fechar o modal de curso
let currentAlunoId = null; // ID do aluno atualmente sendo atualizado
let currentCursoId = null; // ID do curso atualmente sendo atualizado
const modalCurso = document.getElementById("update-curso-modal"); // Modal de atualização de curso

// Função para abrir o modal de atualização de aluno
function openUpdateModal(aluno) {
  currentAlunoId = aluno._id; // em vez de aluno.id
  document.getElementById("modal-update-aluno-nome").value = aluno.nome; // Preenche o campo de nome
  document.getElementById("modal-update-aluno-apelido").value = aluno.apelido; // Preenche o campo de apelido

  // Preenche a select box com os cursos
  const cursoSelect = document.getElementById("modal-update-aluno-curso");
  cursoSelect.innerHTML = ""; // Limpa as opções existentes

  fetch(`${apiUrl}/cursos`)
    .then(response => response.json())
    .then(cursos => {
      cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso._id; // em vez de curso.id
        option.textContent = curso.nome; // Define o texto como o nome do curso
        if (curso._id === aluno.curso) { // se curso for o _id do curso
          option.selected = true;
        }
        cursoSelect.appendChild(option);
      });
    });

  modal.style.display = "block"; // Exibe o modal
}

// Função para fechar o modal de aluno
closeModalButton.onclick = () => {
  modal.style.display = "none"; // Esconde o modal
  currentAlunoId = null; // Reseta o ID do aluno
};

// Função para fechar o modal de curso
closeCursoModalButton.onclick = () => {
  modalCurso.style.display = "none"; // Esconde o modal
  currentCursoId = null; // Reseta o ID do curso
};

// Função para atualizar um aluno a partir do modal
async function updateAlunoFromModal(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  const nome = document.getElementById("modal-update-aluno-nome").value; // Obtém o novo nome
  const apelido = document.getElementById("modal-update-aluno-apelido").value; // Obtém o novo apelido
  const curso = document.getElementById("modal-update-aluno-curso").value; // Obtém o novo curso ID

  // Cria o objeto com os dados atualizados
  const alunoData = { nome, apelido, curso }; // em vez de cursoId

  // Envia a requisição PATCH para atualizar o aluno
  await fetch(`${apiUrl}/alunos/${currentAlunoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alunoData),
  });

  modal.style.display = "none"; // Fecha o modal
  fetchAlunos(); // Atualiza a lista de alunos
}

// Função para buscar e exibir alunos
async function fetchAlunos() {
  const responseAlunos = await fetch(`${apiUrl}/alunos`); // Faz a requisição GET para obter os alunos
  const alunos = await responseAlunos.json(); // Converte a resposta para JSON

  const alunosList = document.getElementById("alunos-list"); // Obtém o elemento da lista de alunos
  alunosList.innerHTML = ""; // Limpa a lista

  // Itera sobre os alunos e cria os elementos da lista
  alunos.forEach(aluno => {
    const li = document.createElement("li");

    // Exibe o nome e apelido do aluno e o ID do curso
    li.textContent = `${aluno.nome} ${aluno.apelido} (Curso ID: ${aluno.curso || "null"})`;

    // Container para os botões
    const buttonContainer = document.createElement("div");

    // Botão de atualizar
    const updateButton = document.createElement("buttonAtualizar");
    updateButton.textContent = "Atualizar";
    updateButton.onclick = () => openUpdateModal(aluno);

    // Botão de remover
    const deleteButton = document.createElement("buttonEliminar");
    deleteButton.textContent = "Remover";
    deleteButton.onclick = () => deleteAluno(aluno._id); // em vez de aluno.id

    // Adiciona os botões ao container
    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(deleteButton);

    // Adiciona o container ao item da lista
    li.appendChild(buttonContainer);
    alunosList.appendChild(li);
  });
}

// Função para buscar e exibir cursos
async function fetchCursos() {
  const response = await fetch(`${apiUrl}/cursos`); // Faz a requisição GET para obter os cursos
  const cursos = await response.json(); // Converte a resposta para JSON
  const cursosList = document.getElementById("cursos-list"); // Obtém o elemento da lista de cursos
  cursosList.innerHTML = ""; // Limpa a lista

  // Itera sobre os cursos e cria os elementos da lista
  cursos.forEach(curso => {
    const li = document.createElement("li");
    li.textContent = `${curso.nome}`;

    // Container para os botões
    const buttonContainer = document.createElement("div");

    // Botão de atualizar
    const updateButton = document.createElement("buttonAtualizar");
    updateButton.textContent = "Atualizar";
    updateButton.onclick = () => openUpdateCursoModal(curso);

    // Botão de remover
    const deleteButton = document.createElement("buttonEliminar");
    deleteButton.textContent = "Remover";
    deleteButton.onclick = () => deleteCurso(curso._id); // em vez de curso.id

    // Adiciona os botões ao container
    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(deleteButton);

    // Adiciona o container ao item da lista
    li.appendChild(buttonContainer);
    cursosList.appendChild(li);
  });
}

// Função para adicionar um aluno
async function addAluno(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  const nome = document.getElementById("aluno-nome").value; // Obtém o nome do aluno
  const apelido = document.getElementById("aluno-apelido").value; // Obtém o apelido do aluno
  const curso = document.getElementById("aluno-curso").value; // Obtém o ID do curso selecionado

  // Envia a requisição POST para adicionar o aluno
  await fetch(`${apiUrl}/alunos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, apelido, curso }) // em vez de cursoId
  });

  document.getElementById("add-aluno-form").reset(); // Reseta o formulário
  fetchAlunos(); // Atualiza a lista de alunos
}

// Função para remover um aluno
async function deleteAluno(id) {
  await fetch(`${apiUrl}/alunos/${id}`, { method: "DELETE" }); // Faz a requisição DELETE para remover o aluno
  fetchAlunos(); // Atualiza a lista de alunos
}

// Função para adicionar um curso
async function addCurso(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  const nome = document.getElementById("curso-nome").value; // Obtém o nome do curso

  // Envia a requisição POST para adicionar o curso
  await fetch(`${apiUrl}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });

  document.getElementById("add-curso-form").reset(); // Reseta o formulário
  fetchCursos(); // Atualiza a lista de cursos
}

// Função para remover um curso
async function deleteCurso(id) {
  await fetch(`${apiUrl}/cursos/${id}`, { method: "DELETE" }); // Remove o curso
  fetchCursos(); // Atualiza a lista de cursos
  CursoSelect(); // <-- Atualiza a select-box dos cursos
}

// Função para abrir o modal de atualização de curso
function openUpdateCursoModal(curso) {
  currentCursoId = curso._id; // em vez de curso.id
  document.getElementById("modal-update-curso-nome").value = curso.nome; // Preenche o campo de nome
  modalCurso.style.display = "block"; // Exibe o modal
}

// Função para atualizar um curso a partir do modal
async function updateCursoFromModal(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  const nome = document.getElementById("modal-update-curso-nome").value; // Obtém o novo nome do curso

  // Envia a requisição PATCH para atualizar o curso
  await fetch(`${apiUrl}/cursos/${currentCursoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });

  modalCurso.style.display = "none"; // Fecha o modal
  fetchCursos(); // Atualiza a lista de cursos
}

// Função para preencher a select box com os cursos
async function CursoSelect() {
  const response = await fetch(`${apiUrl}/cursos`); // Faz a requisição GET para obter os cursos
  const cursos = await response.json(); // Converte a resposta para JSON
  const cursoSelect = document.getElementById("aluno-curso"); // Obtém o elemento select

  // Limpa as opções existentes (exceto a primeira)
  cursoSelect.innerHTML = '<option value="" disabled selected>Selecione um curso</option>';

  // Adiciona os cursos como opções na select box
  cursos.forEach(curso => {
    const option = document.createElement("option");
    option.value = curso._id; // em vez de curso.id
    option.textContent = curso.nome; // Define o texto como o nome do curso
    cursoSelect.appendChild(option);
  });
}

// Inicialização
document.getElementById("add-aluno-form").addEventListener("submit", addAluno); // Adiciona evento ao formulário de alunos
document.getElementById("add-curso-form").addEventListener("submit", addCurso); // Adiciona evento ao formulário de cursos
document.getElementById("modal-update-aluno-form").addEventListener("submit", updateAlunoFromModal); // Adiciona evento ao modal de alunos
document.getElementById("modal-update-curso-form").addEventListener("submit", updateCursoFromModal); // Adiciona evento ao modal de cursos
fetchAlunos(); // Busca e exibe os alunos
fetchCursos(); // Busca e exibe os cursos
CursoSelect(); // Preenche a select box com os cursos