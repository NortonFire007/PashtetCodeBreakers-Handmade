$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

const favorites = document.querySelectorAll('.favoritefor');

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

const favorite = document.querySelectorAll('.favorite');

favorite.forEach(favorite => {
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

    });
});

$(document).ready(function () {
    var itemsContainer = $('.wrapper');
    var items = $('.block__element');
    var showMoreBtn = $('.button__viewmore');

    // Определите количество видимых товаров
    var visibleItems = 8;

    // Скройте все товары, кроме первых visibleItems
    items.slice(visibleItems).hide();

    // При клике на кнопку "Всі товари"
    showMoreBtn.click(function () {
        // Покажите следующие 10 товаров
        items.slice(visibleItems, visibleItems + 10).slideDown();

        // Обновите количество видимых товаров
        visibleItems += 8;

        // Если все товары уже отображены, скройте кнопку "Всі товари"
        if (visibleItems >= items.length) {
            showMoreBtn.hide();
        }
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

const ratings_sell = document.querySelectorAll('.rating__sell');
if (ratings_sell.length > 0) {
    initRatings(ratings_sell);
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
        loginLogoutButton.innerHTML = '<img src="D:/narniya/2023/Page of item/Page of item/img/log-out.svg" alt="Logout">';
        loginLogoutButton.addEventListener("click", function () {
            localStorage.removeItem("access_token");
            window.location.href = "http://127.0.0.1:5501/login.html";
        });
    } else {
        loginLogoutButton.innerHTML = '<img src="D:/narniya/2023/Page of item/Page of item/img/log-in.svg" alt="Logout">';
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


const ratings_yakist = document.querySelectorAll('.rating__yakist');
if (ratings_product.length > 0) {
    initRatings(ratings_product);
}

const ratings_termin = document.querySelectorAll('.rating__termin');
if (ratings_seller.length > 0) {
    initRatings(ratings_seller);
}

const ratings_actyal = document.querySelectorAll('.rating__actyal');
if (ratings_coment.length > 0) {
    initRatings(ratings_coment);
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
                    ratingSetNew = true;
                }
            });
        }
    }
}





let ratingSetNew = false; // Флаг, указывающий, был ли установлен рейтинг

function initRating(rating) {
    let ratingActive, ratingValue;
    initRatingVars(rating);

    setRatingActiveWidth();
    if (rating.classList.contains('rating_set')) {
        setRating(rating);
    }
}

$(document).ready(function () {
    // Выбираем все элементы с классом product__title
    var productTitles = $('.product__title');

    // Проходим по каждому элементу
    productTitles.each(function () {
        // Получаем текст из элемента
        var titleText = $(this).text();

        // Проверяем длину текста
        if (titleText.length > 60) {
            // Обрезаем текст до 50 символов и добавляем троеточие
            var truncatedText = titleText.substring(0, 60) + '...';

            // Устанавливаем новый текст в элемент
            $(this).text(truncatedText);
        }
    });
});