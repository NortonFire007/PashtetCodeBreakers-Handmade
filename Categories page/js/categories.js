

const favorites = document.querySelectorAll('.favorite');

favorites.forEach(favorite => {
    favorite.addEventListener('click', function () {
        this.classList.toggle('clicked');

        if (this.classList.contains('clicked')) {
            const heartImage = this.querySelector('img');
            heartImage.src = 'img/Item/orangeheart.svg'; // Изменяем изображение на оранжевое сердце
        } else {
            const heartImage = this.querySelector('img');
            heartImage.src = 'img/Item/hearter.svg'; // Возвращаем изображение на сердце по умолчанию
        }
    });
});


const blockContents = document.querySelectorAll('.block__content');

blockContents.forEach(blockContent => {
    const favorite = blockContent.querySelector('.favorite');

    blockContent.addEventListener('mouseover', () => {
        favorite.style.display = 'block';
    });

    blockContent.addEventListener('mouseout', () => {
        favorite.style.display = 'none';
    });
});