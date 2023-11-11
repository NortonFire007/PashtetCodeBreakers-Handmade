document.addEventListener("DOMContentLoaded", function () {
    const favorites = document.querySelectorAll('.favorite__image');

    favorites.forEach((favorite) => {
        favorite.addEventListener('click', function () {

            const isAuthenticated = true; // Замените на вашу логику проверки авторизации

            if (isAuthenticated) {
                // Получаем ID товара из атрибута data-product-id
                const productId = this.closest('.product').getAttribute('data-product-id');

                fetch(`http://127.0.0.1:8000/api/v1/favorites/toggle/${productId}/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Ошибка при обращении к серверу');
                    })
                    .then(data => {
                        console.log(data);

                        if (data.is_favourite) {
                            favorite.src = "static/img/heart-filled.svg";
                        } else {
                            favorite.src = "static/img/heart.svg";
                        }
                    })
                    .catch(error => {
                        console.error("Произошла ошибка:", error);
                    });
            } else {
                console.log('Пользователь не авторизован');
            }
        });
    });
});
