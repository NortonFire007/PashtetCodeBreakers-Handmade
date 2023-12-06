function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

document.addEventListener("DOMContentLoaded", function () {
    const LOGIN_PAGE_SRC = "http://127.0.0.1:8000/login";
    const MAIN_PAGE_SRC = "http://127.0.0.1:8000/";
    const loginoutButton = document.getElementById("loginout-button");
    const addProdButton = document.getElementById("add-prod-btn");
    const heartButton = document.getElementById("heart-btn");
    const profileButton = document.getElementById("profileButton");
    const accessToken = localStorage.getItem("access_token");

    let img = document.createElement('img');

    if (accessToken) {
        loginoutButton.innerHTML = '';
        img.src = 'http://127.0.0.1:8000/static/img/log-out.svg';
        img.alt = 'Вийти';

        loginoutButton.appendChild(img);
        loginoutButton.setAttribute('title', 'Натисніть щоб вийти');


        loginoutButton.addEventListener("click", function () {
            localStorage.removeItem("access_token");

            window.location.href = MAIN_PAGE_SRC;
        });
    } else {
        deleteCookie('accessToken');
        addProdButton.style.display = "none";
        heartButton.style.display = "none";
        profileButton.style.display = "none";

        loginoutButton.innerHTML = '';
        img.src = 'http://127.0.0.1:8000/static/img/log-in.svg';
        img.alt = 'Увійти';
        loginoutButton.appendChild(img);

        loginoutButton.addEventListener("click", function () {
            // Обработка события для входа, например, открытие модального окна или переход на страницу входа
            loginoutButton.href = LOGIN_PAGE_SRC;
        });
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const LOGIN_PAGE_SRC = "http://127.0.0.1:8000/login";
//   const MAIN_PAGE_SRC = "http://127.0.0.1:8000/";
//   const loginoutButton = document.getElementById("loginout-button");
//   const accessToken = localStorage.getItem("access_token");
//
//   let img = document.createElement('img');
//
//
//
//
//   if (accessToken) {
//     loginoutButton.innerHTML = '';
//     img.src = 'http://127.0.0.1:8000/static/img/log-out.svg';
//     img.alt = 'Вийти';
//
//     loginoutButton.appendChild(img);
//     loginoutButton.setAttribute('title', 'Натисніть щоб вийти');
//
//
//     loginoutButton.addEventListener("click", function () {
//       localStorage.removeItem("access_token");
//       // Очищаем содержимое кнопки
//
//       window.location.href = MAIN_PAGE_SRC;
//     });
//   } else {
//     loginoutButton.innerHTML = '';
//     img.src = 'http://127.0.0.1:8000/static/img/log-in.svg';
//     img.alt = 'Увійти';
//     loginoutButton.appendChild(img);
//
//     loginoutButton.addEventListener("click", function () {
//       // Обработка события для входа, например, открытие модального окна или переход на страницу входа
//       loginoutButton.href = LOGIN_PAGE_SRC;
//     });
//   }
// });


/*document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("access_token");
  const loginLogoutButton = document.getElementById("login-logout-button");

  if (accessToken) {
    loginLogoutButton.textContent = "Вийти";
    loginLogoutButton.addEventListener("click", function () {
      localStorage.removeItem("access_token");
      window.location.href = "http://127.0.0.1:5501/login.html";
    });
  } else {
    loginLogoutButton.textContent = "Увійти";
    loginLogoutButton.href = "http://127.0.0.1:5501/login.html";
  }
});


// Находим кнопки входа и выхода по новым классам
const loginButton = document.getElementById("login-logout-button");
//const logoutButton = document.querySelector('.logout-button');
const accessToken = localStorage.getItem("access_token");


if (accessToken) {
  const img = document.createElement('img');
  img.src = 'D:/narniya/2023/Header new/header new/img/log-out.svg'; // Укажите путь к картинке
  img.alt = 'Вийти';
  img.width = "28px";
  img.height = "28px";
  loginButton.append(img);
  loginButton.addEventListener("click", function () {
    localStorage.removeItem("access_token");

  });
} else {
  const img = document.createElement('img');
  img.src = 'D:/narniya/2023/Header new/header new/img/log-in.svg'; // Укажите путь к картинке
  img.alt = 'Увійти';
  img.width = "28px";
  img.height = "28px";
  loginButton.append(img);

}
*/



