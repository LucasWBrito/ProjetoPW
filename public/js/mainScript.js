let taskDOM = document.querySelector('.getTask');

async function completeTask(id) {
  let response = await fetch(`/api/v1/tasks/complete/${id}`, {
    method: 'PATCH',
  });
  let result = await response.json();
  window.location.replace(result.url);
}

async function deleteTask(id) {
  let response = await fetch(`/api/v1/tasks/delete/${id}`, {
    method: 'DELETE',
  });
  let result = await response.text();
  window.location.replace(result);
}
