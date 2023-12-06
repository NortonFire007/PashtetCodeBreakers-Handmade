function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();


        const formData = new FormData(productForm);

        const accessToken = localStorage.getItem('access_token');
        const decodedToken = parseJwt(accessToken);
        const userId = decodedToken.user_id;
        formData.append('user', userId);
                console.log("FormData entries:");
        for (const entry of formData.entries()) {
            console.log(entry);
        }


        fetch('http://127.0.0.1:8000/api/v1/product/', {
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
                throw new Error('Ошибка при создании продукта');
            })
            .then(data => {
                console.log('Продукт успешно создан:', data);
                location.reload();
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });
});