

document.addEventListener("DOMContentLoaded", function () {
  const LOGIN_PAGE_SRC = "http://127.0.0.1:5501/login.html";
  const MAIN_PAGE_SRC = "http://127.0.0.1:5501/mainpage.html";
  const loginoutButton = document.getElementById("loginout-button");
  const accessToken = localStorage.getItem("access_token");

  let img = document.createElement('img');




  if (accessToken) {
    loginoutButton.innerHTML = '';
    img.src = 'img/Header/log-out.svg';
    img.alt = 'Вийти';

    loginoutButton.appendChild(img);
    loginoutButton.setAttribute('title', 'Натисніть щоб вийти');


    loginoutButton.addEventListener("click", function () {
      localStorage.removeItem("access_token");
      // Очищаем содержимое кнопки

      window.location.href = MAIN_PAGE_SRC;
    });
  } else {
    loginoutButton.innerHTML = '';
    img.src = 'img/Header/log-in.svg';
    img.alt = 'Увійти';
    loginoutButton.appendChild(img);

    loginoutButton.addEventListener("click", function () {
      // Обработка события для входа, например, открытие модального окна или переход на страницу входа
      loginoutButton.href = LOGIN_PAGE_SRC;
    });
  }
});



