function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const ratingInputs = document.querySelectorAll('input[name="rate"]');
    let selectedRating = 3;

    ratingInputs.forEach(input => {
        input.addEventListener('change', function () {
            selectedRating = parseInt(this.id.split('-')[1]);
        });
    });
    const button = document.getElementById('myr')
    const productId = button.getAttribute('data-product-id');
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(commentForm);
        const accessToken = localStorage.getItem('access_token');
        const decodedToken = parseJwt(accessToken);
        const userId = decodedToken.user_id;

        const description = document.getElementById('description');

        formData.append('user', userId);
        formData.append('grade', selectedRating);
        formData.append('product', productId);

        console.log("FormData entries:");
        for (const entry of formData.entries()) {
            console.log(entry);
        }


        fetch('http://127.0.0.1:8000/api/v1/comments/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка при добавлении комментария');
            })
            .then(data => {
                location.reload()
                console.log('Комментарий успешно создан:', data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });


    });

});
