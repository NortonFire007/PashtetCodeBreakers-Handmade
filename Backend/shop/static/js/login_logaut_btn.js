document.addEventListener("DOMContentLoaded", function () {
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