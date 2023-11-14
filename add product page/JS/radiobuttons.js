document.addEventListener("DOMContentLoaded", function () {
    // Отримайте посилання на радіокнопки та поля вводу
    const defaultNumRadio = document.getElementById("defaultNum");
    const differentNumRadio = document.getElementById("differentNum");
    const differentNumField = document.getElementById("differentNumField");

    const defaultLocationRadio = document.getElementById("defaultLocation");
    const differentLocationRadio = document.getElementById("differentlocation");
    const differentLocationField = document.getElementById("differentlocationField");
    const differentNumFieldError = document.getElementById("differentNumFieldError");

    // Додайте обробник події для радіокнопок номера
    defaultNumRadio.addEventListener("change", function () {
        differentNumField.classList.add("hidden");
        differentNumFieldError.style.display = "none"; // Показываем сообщение об ошибке
    });

    differentNumRadio.addEventListener("change", function () {
        differentNumField.classList.remove("hidden");
        differentNumFieldError.style.display = "block"; // Показываем сообщение об ошибке
    });

    // Додайте обробник події для радіокнопок місцезнаходження
    defaultLocationRadio.addEventListener("change", function () {
        differentLocationField.classList.add("hidden");
    });

    differentLocationRadio.addEventListener("change", function () {
        differentLocationField.classList.remove("hidden");
    });
});