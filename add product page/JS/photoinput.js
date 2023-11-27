let wrapper = document.querySelector('.img__wrapper');

function download(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        // Создаем контейнер для изображения и кнопки
        let container = document.createElement('div');
        container.style.position = 'relative'; // Позиционируем для корректного размещения элементов
        container.style.marginBottom = '30px'; // Добавляем отступ между изображениями

        let img = document.createElement('img');
        img.src = reader.result;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '-';

        // Добавляем стили для кнопки "Удалить"
        deleteButton.style.width = '50px';
        deleteButton.style.height = '50px';
        deleteButton.style.borderRadius = '50%';
        deleteButton.style.border = 'none';
        deleteButton.style.backgroundColor = '#D9D9D9'; // белый цвет
        deleteButton.style.position = 'absolute';
        deleteButton.style.left = '190px';
        deleteButton.style.bottom = '230px';
        deleteButton.style.cursor = 'pointer';

        deleteButton.addEventListener('click', function () {
            // При клике на кнопку "Удалить" удаляем контейнер
            wrapper.removeChild(container);
        });

        // Добавляем изображение и кнопку в контейнер
        container.appendChild(img);
        container.appendChild(deleteButton);

        // Добавляем контейнер в основной контейнер
        wrapper.appendChild(container);
    };
}
