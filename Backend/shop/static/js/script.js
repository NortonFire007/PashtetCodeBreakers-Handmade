$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
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


$(document).ready(function () {
    var commentsContainer = $('.comments-container');
    var comments = $('.comments-items');
    var showMoreBtn = $('.show-more-btn');

    // Определите количество видимых комментариев
    var visibleComments = 3;

    // Скройте все комментарии, кроме первых visibleComments
    comments.children('.comments-item:gt(' + (visibleComments - 1) + ')').hide();

    // При клике на кнопку "Показать еще"
    showMoreBtn.click(function () {
        // Покажите следующие три комментария
        comments.children('.comments-item:lt(' + (visibleComments) + ')').slideDown();

        // Обновите количество видимых комментариев
        visibleComments += 3;

        // Проверьте, есть ли еще комментарии
        // if (visibleComments >= comments.children('.comments-item').length) {
        // Если нет, скройте кнопку "Показать еще"
        //   showMoreBtn.hide();
        // }
    });
});


const ratings_product = document.querySelectorAll('.rating__product');
if (ratings_product.length > 0) {
    initRatings(ratings_product);
}

const ratings_seller = document.querySelectorAll('.rating__seller');
if (ratings_seller.length > 0) {
    initRatings(ratings_seller);
}

const ratings_coment = document.querySelectorAll('.rating__coment');
if (ratings_coment.length > 0) {
    initRatings(ratings_coment);
}

const ratings_coment_under = document.querySelectorAll('.rating__coment_under');
if (ratings_coment_under.length > 0) {
    initRatings(ratings_coment_under);
}

function initRatings(ratings) {
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];
        initRating(rating);
    }

    function initRating(rating) {
        let ratingActive, ratingValue;
        initRatingVars(rating);

        setRatingActiveWidth();
        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.checked ? ratingItem.value : ratingValue.innerHTML);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                initRatingVars(rating);

                if (rating.dataset.ajax) {
                    setRatingValue(ratingItem.value, rating);
                } else {
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();
                    ratingSet = true;
                }
            });
        }
    }
}





let ratingSet = false; // Флаг, указывающий, был ли установлен рейтинг

function initRating(rating) {
    let ratingActive, ratingValue;
    initRatingVars(rating);

    setRatingActiveWidth();
    if (rating.classList.contains('rating_set')) {
        setRating(rating);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const accessToken = localStorage.getItem("access_token");
    const loginLogoutButton = document.getElementById("login-logout-button");

    if (accessToken) {
        loginLogoutButton.innerHTML = '<img src="static/img/log-out.svg" alt="Logout">';
        loginLogoutButton.addEventListener("click", function () {
            localStorage.removeItem("access_token");
            window.location.href = "http://127.0.0.1:5501/login.html";
        });
    } else {
        loginLogoutButton.innerHTML = '<img src="static/img/log-in.svg" alt="Logout">';
        loginLogoutButton.href = "http://127.0.0.1:5501/login.html";
    }
});





document.addEventListener("DOMContentLoaded", function () {
    const comentButton = document.querySelector('.coment_sell');
    const container = document.querySelector('.comentariy');

    if (comentButton) {
        comentButton.addEventListener('click', function () {
            container.style.display = "block";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const notcomentButton = document.querySelector('.closeapp');
    const notcontainer = document.querySelector('.comentariy');
    const nottext = document.querySelector('.comentariy textarea');

    if (notcomentButton) {
        notcomentButton.addEventListener('click', function () {
            notcontainer.style.display = "none";
            nottext.value = '';
        });
    }
});



const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
btn.onclick = () => {
    widget.style.display = "none";
    post.style.display = "block";
    editBtn.onclick = () => {
        widget.style.display = "block";
        post.style.display = "none";
    }
    return false;
}


document.addEventListener("DOMContentLoaded", function () {
    const tellefonButton = document.querySelector('.tellefon');
    const socialButtons = document.querySelector('.social-buttons');

    tellefonButton.addEventListener('click', function () {
        socialButtons.style.display = (socialButtons.style.display === 'block') ? 'none' : 'block';
    });
});