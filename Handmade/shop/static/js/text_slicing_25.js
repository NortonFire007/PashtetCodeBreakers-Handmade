document.addEventListener("DOMContentLoaded", function () {
    var products = document.querySelectorAll('.product h2');
    products.forEach(function (product) {
        var text = product.innerText;
        if (text.length > 22) {
            text = text.substring(0, 22) + '...';
            product.innerText = text;
        }
    });
});