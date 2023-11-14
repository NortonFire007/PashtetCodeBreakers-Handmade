document.getElementById('productForm').addEventListener('submit', function(event) {
    const productName = document.getElementById('productName');
    const description = document.getElementById('description');
    const value = document.getElementById('value');
    const productNameError = document.getElementById('productNameError');
    const differentNumField = document.getElementById('differentNumField');
    const differentNumFieldError = document.getElementById('differentNumFieldError')
    const differentNum = document.getElementById("differentNum");
    if (productName.value.trim() === "" || description.value.trim() === "" || value.value.trim() === "" || differentNumField.value.trim() === "") {
        event.preventDefault(); // Предотвращаем отправку формы
        // название
        if (productName.value.trim() === "") {
            productName.style.border = "1px solid red";
            productNameError.textContent = "Введіть коректну назву";
            productNameError.style.display = "block";
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
            valueError.textContent = "Введіть коректну ціну";
            valueError.style.display = "block";
            event.preventDefault();
        }
        else {
            value.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        // номер телефона
        if(differentNum.checked){
            if (differentNumField.value.trim() === "") {
                differentNumField.style.border = "1px solid red";
                differentNumFieldError.textContent = "Введіть коректний номер телефону";
                differentNumFieldError.style.display = "block";
                event.preventDefault();
            }
        }
        else {
            differentNumField.style.borderColor = ""; // Сбрасываем красную рамку, если поле заполнено
        }
        productName.addEventListener('mouseover', function() {
            if (productName.style.borderColor === 'red') {  
                productNameError.textContent = '';
            }
        });
        
        value.addEventListener('mouseover', function() {
            if (value.style.borderColor === 'red') {  
                valueError.textContent = '';
            }
        });
        
        differentNumField.addEventListener('mouseover', function() {
            if (differentNumField.style.borderColor === 'red') {  
                differentNumFieldError.textContent = '';
            }
        });

}});