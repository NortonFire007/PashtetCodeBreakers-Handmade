document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.product');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const productId = button.getAttribute('data-product-id');
            addToRecentlyViewed(productId);
        });
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function addToRecentlyViewed(productId) {
        const recentlyViewed = getCookie('recentlyViewed') || '';
        let viewedArray = recentlyViewed.split(',');

        const index = viewedArray.indexOf(productId);
        if (index !== -1) {
            viewedArray.splice(index, 1);
        }
        viewedArray.push(productId);
        viewedArray = viewedArray.slice(-4);

        setCookie('recentlyViewed', viewedArray.join(','), 7);
    }
});
