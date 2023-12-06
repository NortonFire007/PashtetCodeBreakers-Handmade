document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const mailInput = document.getElementById("mail").value;
      const passwordInput = document.getElementById("password").value;
      const textError = document.getElementById("generalError").value;

      function validateEmail(mail) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(mail);
      }
    
      function isPasswordValid(password) { 
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
        return passwordRegex.test(password); 
      } 
  
      // Валидация email
      // if (!validateEmail(mailInput.value.trim())) {

      //   mailInput.style.borderColor = "red";
      //   mailError.textContent = "Введіть коректну пошту";
      //   mailError.style.display = "block";
      //   event.preventDefault();
      //   return;
      // } else {
      //   mailInput.style.borderColor = "";
      //   mailError.textContent = "";
      //   mailError.style.display = "none";
      // }
  
      // // Валидация пароля (пример: не менее 8 символов)
      // if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
      //   passwordInput.style.borderColor = "red";
      //   passwordError.textContent = "Пароль повинен складатися мінімум з 8 символів";
      //   passwordError.style.display = "block";
      //   event.preventDefault();
      //   return;
      // } else {
      //   passwordInput.style.borderColor = "";
      //   passwordError.textContent = "";
      //   passwordError.style.display = "none";
      // }

      // passwordInput.addEventListener('focus', function(){
      //   passwordError.textContent = ""; // Очищаем сообщение об ошибке
      // });
      // mailInput.addEventListener('focus', function(){
      //   mailError.textContent = ""; // Очищаем сообщение об ошибке
      // });
      if (!validateEmail(mailInput)) {
        document.getElementById("generalError").textContent = 'Некоректно введено пошту!'; 
        return;
        }
      else {
        document.getElementById("generalError").textContent = ''; 
      }

        if (!isPasswordValid(passwordInput)) {
          document.getElementById("generalError").textContent = 'Пароль повинен містити мінімум 8 символів, хоча б одну велику літеру і хоча б одну цифру'; 
        return;
        }
        else {
          document.getElementById("generalError").textContent = ''; 
        }
  
      const data = {
        username: mailInput.trim(),
        password: passwordInput
      };

      fetch("http://127.0.0.1:8000/api/v1/auth/log/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.access) {
             console.log('bdsbdbsdbdbsdb', data.access);
            localStorage.setItem("access_token", data.access);

            window.location.href = "http://127.0.0.1:8000";
          } else {
            document.getElementById("generalError").textContent = "Не вдалось увійти. Будь ласка, перевірте email та пароль.";
            console.error("Не вдалось увійти. Будь ласка, перевірте email та пароль.");
          }
        })
        .catch(error => {
          textError.textContent = "Не вдалось увійти. Будь ласка, перевірте email та пароль.";
          console.error("Произошла ошибка:", error);

        });
    });
  });
