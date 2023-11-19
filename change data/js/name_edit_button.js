function editName() {
  const input = document.querySelector('.sellername');
  const button = document.querySelector('.edit-name');

  if (input.hasAttribute('disabled')) {
    input.removeAttribute('disabled');
  } else {
    input.setAttribute('disabled', 'true');
    button.textContent = 'Редактировать имя';
  }
}
