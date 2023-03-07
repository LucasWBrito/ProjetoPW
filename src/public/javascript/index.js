const modalDiv = document.getElementById('modal-div');
const loginModalBtn = document.getElementById('login-modal-btn');
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.hidden = true;
const registerForm = document.getElementById('register-form');
const createTaskForm = document.getElementById('create-task-form');

var userId;

const getUser = async (userUrl) => {
  let response = await fetch(`/api/v1/u/${userUrl}`);
  let result = await response.json();

  userId = result.id;

  document.querySelector('.title').innerHTML = `Lista de Tarefas - ${result.username}`;
  document.getElementById('add-btn').disabled = false;
  loginModalBtn.hidden = true;
};

const getAllTasks = async (userUrl) => {
  let response = await fetch(`/api/v1/u/${userUrl}/t`);
  let tasks = await response.json();

  const tasksDiv = document.getElementById('tasks-list');

  tasksDiv.innerHTML = '';

  console.log(tasks);

  tasks.forEach((task) => {
    tasksDiv.innerHTML += `
      <div class = "input-group  pb-1">
        <div class="input-group-text">
          <input id="task-checkbox-${
            task.id
          }" class="form-check-input mt-0" type="checkbox" onclick="toggleTaskCompleted(${
      task.id
    })"/>
        </div>
        <input id="task-title-${task.id}" type="text" class="form-control w-50 bg-white" value="${
      task.title
    }" disabled />
        <input type="text" class="form-control bg-white" value="${getDateString(
          task.date
        )}" disabled />
        <button class="btn btn-outline-primary" type="button" onclick="editModal('${
          task.id
        }')">Editar</button>
        <button class="btn btn-outline-danger" type="button" onclick="deleteTask('${
          task.id
        }')">Deletar</button>
      </div>`;

    /* console.log(task.completed); */
  });
  tasks.forEach((task) => {
    if (task.completed) {
      let taskCheck = document.getElementById(`task-checkbox-${task.id}`);
      console.log(taskCheck.checked);

      taskCheck.checked = true;
      console.log(taskCheck.checked);

      let taskTitle = document.getElementById(`task-title-${task.id}`);
      taskTitle.classList.add('text-decoration-line-through');
      taskTitle.classList.add('text-muted');
    } else {
      let taskCheck = document.getElementById(`task-checkbox-${task.id}`);
      taskCheck.checked = false;
      let taskTitle = document.getElementById(`task-title-${task.id}`);
      taskTitle.classList.remove('text-decoration-line-through');
      taskTitle.classList.remove('text-muted');
    }
  });
};

loginModalBtn.onclick = () => {
  modalDiv.innerHTML = `<div class="modal fade" id="modalLogin" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Faça o seu Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="login-username" placeholder="Username" />
          <label for="login-username">Username</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="login-password" placeholder="Password" />
          <label for="login-password">Password</label>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary float-start"
          data-bs-target="#modalRegister"
          data-bs-toggle="modal"
        >
        Registrar-se
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="login-btn" onclick="userLogin()">Login</button>
        </div>
    </div>
   </div>
  </div>
    <div class="modal fade" id="modalRegister" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="modal-title fs-5">Criar Login</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-floating mb-3">
      <input type="text" class="form-control" id="rg-username" placeholder="Usarname" />
          <label for="login-username">Username</label>
        </div>
        <div class="form-floating">
        <input type="password" class="form-control" id="rg-password" placeholder="Password" />
        <label for="login-password">Password</label>
        </div>
        </div>
        <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#modalLogin" data-bs-toggle="modal">
          Voltar
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" id="rg-btn" onclick="createUser()">Criar</button>
      </div>
    </div>
    </div>
</div>
`;

  const modal = new bootstrap.Modal(document.querySelector('.modal'), {backdrop: true});
  modal.show();
};

const createUser = async () => {
  const username = document.getElementById('rg-username');
  const password = document.getElementById('rg-password');

  let response = await fetch('/api/v1', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: username.value, password: password.value}),
  });

  let result = await response.json();

  alert(result.message);
};

createTaskForm.onsubmit = async (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input');
  const date = document.getElementById('date-input');

  let response = await fetch(`/api/v1/u/${userId}/t`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: title.value, date: date.value}),
  });

  let result = await response.json();

  getAllTasks(`${userId}`);

  alert(result.message);
};

const userLogin = async () => {
  const username = document.getElementById('login-username');
  const password = document.getElementById('login-password');

  let response = await fetch('/api/v1/u', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: username.value, password: password.value}),
  });

  let result = await response.json();

  if (result.url) {
    getUser(result.url);
    getAllTasks(result.url);
  }

  logoutBtn.hidden = false;
};

const toggleTaskCompleted = async (id) => {
  let response = await fetch(`/api/v1/u/${userId}/t/${id}`, {
    method: 'PATCH',
  });

  let result = await response.json();

  alert(result.message);

  await getAllTasks(`${userId}`);
};

const editModal = async (id) => {
  let response = await fetch(`/api/v1/u/${userId}/t/${id}`);

  let result = await response.json();

  console.log(result);

  modalDiv.innerHTML = `<div class="modal fade" id="edit-modal" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Edite a Tarefa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating">
          <input type="text" class="form-control mb-3" id="edit-title" placeholder="Titulo" value="${
            result.title
          }"/>
          <label for="edit-title">Titulo</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control mb-3" id="edit-description" placeholder="Descrição" value="${
            result.description
          }"/>
          <label for="edit-description">Descrição</label>
        </div>
        <div class="form-floating">
          <input type="datetime-local" class="form-control mb-3" id="edit-date" placeholder="Data" value="${getDateFormated(
            result.date
          )}"/>
          <label for="edit-date">Data</label>
        </div>
        <div class = "input-group  pb-1">
        <div class="input-group-text">
          <input id="edit-completed" class="form-check-input mt-0" type="checkbox"/>
        </div>
        <input type="text" class="form-control w-50 bg-white" placeholder="Tarefa Completa?" disabled />
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="edit-btn" onclick="editTask(${
          result.id
        })">Editar</button>
      </div>
    </div>
   </div>
  </div>`;

  const modal = new bootstrap.Modal(document.querySelector('.modal'), {backdrop: true});
  modal.show();
};

const editTask = async (id) => {
  const title = document.getElementById('edit-title');
  const description = document.getElementById('edit-description');
  const date = document.getElementById('edit-date');
  const completed = document.getElementById('edit-completed');

  let response = await fetch(`/api/v1/u/${userId}/t/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      date: date.value,
      completed: completed.checked ? true : false,
    }),
  });

  let result = await response.json();

  await getAllTasks(`${userId}`);
};

const deleteTask = async (id) => {
  let response = await fetch(`/api/v1/u/${userId}/t/${id}`, {
    method: 'DELETE',
  });
  await getAllTasks(`${userId}`);
};

// Logout
document.getElementById('logout-btn').onclick = () => {
  userId = null;
  document.getElementById('tasks-list').innerHTML = '';
  document.getElementById('add-btn').disabled = true;
  document.querySelector('.title').innerHTML = `Lista de Tarefas`;
  document.getElementById('logout-btn').hidden = true;
  loginModalBtn.hidden = false;
};

function getDateString(date) {
  let dateStr = new Date(date);
  return (
    dateStr.getDate() +
    '-' +
    dateStr.getMonth() +
    1 +
    '-' +
    dateStr.getFullYear() +
    ' ' +
    dateStr.getHours() +
    ':' +
    dateStr.getMinutes()
  );
}

function getDateFormated(dateInput) {
  let dateFormated = new Date(dateInput);
  let date =
    dateFormated.getFullYear() +
    '-' +
    (dateFormated.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    dateFormated.getDate().toString().padStart(2, '0');
  let time =
    dateFormated.getHours().toString().padStart(2, '0') +
    ':' +
    dateFormated.getMinutes().toString().padStart(2, '0');
  return date + 'T' + time;
}

alert('Login necessario para continuar');
