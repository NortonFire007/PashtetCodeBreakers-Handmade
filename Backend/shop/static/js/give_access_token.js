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

document.addEventListener('DOMContentLoaded', function () {
    const accesstoken = localStorage.getItem('access_token');
    const accessToken = getCookie('accessToken');

    if (!accessToken && accesstoken) {
        setCookie('accessToken', accesstoken, 7);
    }

    if (accessToken) {
        fetch('/http://127.0.0.1:8000/favorite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({access_token: accessToken})
        }).then(response => {
            //location.reload();
        }).catch(error => {
        });
    }
});


// document.addEventListener('DOMContentLoaded', function () {
//     const accessToken = localStorage.getItem('access_token');
//
//     fetch('http://127.0.0.1:8000/api/v1/product/favorites?user_id=${userId}', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Обработка ответа
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error fetching favourites:', error);
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//
//       function parseJwt(token) {
//         try {
//             return JSON.parse(atob(token.split('.')[1]));
//         } catch (e) {
//             return null;
//         }
//     }
//
//     const accessToken = localStorage.getItem('access_token');
//       console.log()
//     const decodedToken = parseJwt(accessToken);
//     const userId = decodedToken.user_id;
//
//     fetch(`http://127.0.0.1:8000/favorite`, {
//         method: 'GET',
//         headers: {
//             'Authorization': accessToken,
//             'Content-Type': 'application/json'
//         }
//     })
// });