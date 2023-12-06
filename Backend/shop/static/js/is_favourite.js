document.addEventListener('DOMContentLoaded', function () {
    const favoriteIcons = document.querySelectorAll('.favorite');

    function isProductFavorited(productId, userId) {
        //console.log('productId', productId, 'userId', userId)
        fetch(`http://127.0.0.1:8000/api/v1/product/favorites?product_id=${productId}&user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch favorites');
            })
            .then((data) => {
                if (data.length != 0) {
                    favoriteIcons.forEach((icon) => {
                        if (icon.dataset.productId === productId) {
                            icon.classList.add('clicked');
                            const heartImage = icon.querySelector('img');
                            heartImage.src = 'http://127.0.0.1:8000/static/img/orangeheart.svg';
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    const accessToken = localStorage.getItem('access_token');
    if(accessToken){
        const decodedToken = parseJwt(accessToken);
        const userId = decodedToken.user_id;

        favoriteIcons.forEach((icon) => {
            const productId = icon.dataset.productId;
            //console.log('productId', productId, 'userId', userId)
            isProductFavorited(productId, userId);
        });
    }

    favoriteIcons.forEach((icon) => {
        icon.addEventListener('click', function () {
            const clickedIcon = this;
            const accessToken = localStorage.getItem('access_token');
            const productId = clickedIcon.dataset.productId;

            let method = '';
            let url = 'http://127.0.0.1:8000/api/v1/product/favorites';

            if (clickedIcon.classList.contains('clicked')) {
                method = 'DELETE';
                url += `?productId=${productId}`;
            } else {
                method = 'POST';
            }

            if (!accessToken) {
                window.location.href = 'http://127.0.0.1:8000/login';
            }
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: method === 'POST' ? JSON.stringify({productId: productId}) : null,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Toggle successful');
                        clickedIcon.classList.toggle('clicked');
                        const heartImage = clickedIcon.querySelector('img');
                        heartImage.src = clickedIcon.classList.contains('clicked') ? 'http://127.0.0.1:8000/static/img/orangeheart.svg' : 'http://127.0.0.1:8000/static/img/hearter.svg';
                        location.reload(true);
                    } else {
                        console.error('Failed to toggle favorite');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    });
});
