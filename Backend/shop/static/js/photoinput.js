let wrapper = document.querySelector('.img__wrapper');

document.addEventListener('DOMContentLoaded', function () {
    wrapper = document.getElementById('img_wrapper');
});

function download(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let img = document.createElement('img');
        img.setAttribute('name', 'images');
        wrapper.appendChild(img);
        img.src = reader.result;
    }
}
