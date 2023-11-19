document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.file-input').addEventListener('change', function() {
        changeProfileImage(this);
    });

    function changeProfileImage(input) {
        const imageElement = document.querySelector('.seller-image');
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageElement.src = e.target.result;
                imageElement.alt = 'Нове фото Валерії Тарасенко';
            };
            reader.readAsDataURL(file);
        }
    }
});