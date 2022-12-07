let idDOM = document.querySelector('.id');
let nameDOM = document.querySelector('.name');
let completedDOM = document.querySelector('.completed');
let formDOM = document.querySelector('.editTask');

formDOM.onsubmit = async (event) => {
  event.preventDefault();

  let task = {
    id: idDOM.value,
    name: nameDOM.value,
    completed: completedDOM.checked,
  };

  let response = await fetch(`/api/v1/tasks/edit/${idDOM.value}`, {
    method: 'put',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(task),
  });
  let result = await response.json();
  console.log(result);
  //window.location.replace(result.url);
};
