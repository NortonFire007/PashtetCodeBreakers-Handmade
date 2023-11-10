$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 500
    });
});

const favorites = document.querySelectorAll('.favorite');

favorites.forEach(favorite => {
    favorite.addEventListener('click', function () {
        this.classList.toggle('clicked');

        if (this.classList.contains('clicked')) {
            const heartImage = this.querySelector('img');
            heartImage.src = 'static/img/orangeheart.svg'; // Изменяем изображение на оранжевое сердце
        } else {
            const heartImage = this.querySelector('img');
            heartImage.src = 'static/img/hearter.svg'; // Возвращаем изображение на сердце по умолчанию
        }
    });
});
