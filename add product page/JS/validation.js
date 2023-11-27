document.getElementById('productForm').addEventListener('submit', function(event) {
    const productName = document.getElementById('productName');
    const description = document.getElementById('description');
    const value = document.getElementById('value');
    const differentNumField = document.getElementById('differentNumField');
    const differentNum = document.getElementById("differentNum");
    const charity = document.getElementById('charity');
    const category = document.getElementById("category");
    const fileInput = document.getElementById('fileInput');
    const download__button = document.getElementById('download__button');
    if (productName.value.trim() === "" || description.value.trim() === "" || value.value.trim() === "" || differentNumField.value.trim() === "") {
        event.preventDefault(); // Предотвращаем отправку формы
        // название
        if (productName.value.trim() === "") {
            productName.style.border = "1px solid red";
            event.preventDefault();
        }
        else {
            productName.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // описание
        if (description.value.trim() === "") {
            description.style.border = "1px solid red";
            event.preventDefault();
        }
        else {
            description.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // цена
        if (value.value.trim() === "") {
            value.style.border = "1px solid red";
            event.preventDefault();
        }
        else {
            value.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // номер телефона
        if(differentNum.checked){
            if (differentNumField.value.trim() === "") {
                differentNumField.style.border = "1px solid red";
                event.preventDefault();
            }
        }
        else {
            differentNumField.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // charity
        if (charity.value.trim() === "") {
            charity.style.border = "1px solid red";
            event.preventDefault();
        }
        else {
            charity.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // category
        if (category.value === "option0") {
            category.style.border = "1px solid red";
            event.preventDefault();
        }
        else {
            category.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
         // Проверяем, выбран ли файл
        if (fileInput.files.length === 0) {
            // Если файл не выбран, добавляем красную рамку и отменяем отправку формы
            download__button.style.border = "1px solid red";
            event.preventDefault();
        } else {
            // Сбрасываем красную рамку, если файл выбран
            download__button.style.border = "";
        }
}});