document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const firstName = document.getElementById("first_name").value;
        const lastName = document.getElementById("last_name").value;
        const phone_number = document.getElementById("phone_number").value;
        const city = document.getElementById("city").value;

        function isPasswordValid(password) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            return passwordRegex.test(password);
        }

        function doPasswordsMatch(password, confirmPassword) {
            return password === confirmPassword;
        }

        if (!validateEmail(email)) {
            //alert("Пожалуйста, введите корректный email адрес.");
            document.getElementById('emailError').textContent = 'Некоректно введено пошту!';
            return;
        }
        else {
            document.getElementById('emailError').textContent = '';
        }

        if (!isPasswordValid(password)) {
            document.getElementById('passwordError').textContent = 'Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву и хотя бы одну цифру';
            return;
        }
        else {
            document.getElementById('passwordError').textContent = '';
        }

        if (!doPasswordsMatch(password, confirmPassword)) {
            document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают';
        }
        else {
            document.getElementById('confirmPasswordError').textContent = '';
        }

        if (firstName.trim() === "" || lastName.trim() === "" || phone_number.trim() === "" || city.trim() === "") {
            //alert("Пожалуйста, заполните все обязательные поля.");
            document.getElementById('generalError').textContent = 'Пожалуйста, заполните все обязательные поля.';
            return;
        }
        else {
            document.getElementById('generalError').textContent = '';
        }

        const data = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone_number,
            city: city
        };

        fetch("http://127.0.0.1:8000/api/v1/auth/reg/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);

                    // Перенаправляем пользователя на страницу входа в аккаунт
                    window.location.href = "http://127.0.0.1:5501/mainpage.html";
                } else {
                    console.error("Не удалось получить access_token.");
                }
            })
            .catch(error => {
                console.error("Произошла ошибка:", error);
            });
    });

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
});



function togglePasswordVisibility(pasw) {
    var passwordInput = document.getElementById(pasw);
    var toggleButton = document.querySelector(".togglePassword"); // Здесь используется querySelector

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.innerHTML = '<img src="static/img/open-eye.svg" alt="">'; // Изменение HTML содержимого кнопки для показа пароля
    } else {
        passwordInput.type = "password";
        toggleButton.innerHTML = '<img src="static/img/close-eye.svg" alt="">'; // Изменение HTML содержимого кнопки для скрытия пароля
    }
}





