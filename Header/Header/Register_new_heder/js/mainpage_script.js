var swiper = new Swiper(".swiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    autoplay: {
        delay: 10000,
    },

});

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
