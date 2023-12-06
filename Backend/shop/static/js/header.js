function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}


document.getElementById('profileButton').addEventListener('click', function() {
// Check if JWT token exists in local storage
let token = parseJwt(localStorage.getItem('access_token'))

let link = ''
if (token)
{
    link = 'http://127.0.0.1:8000/user/' + token.user_id + '/';
}
else
{
    link = 'http://127.0.0.1:8000/login'
}
window.location.href = link
});




function performSearch() {
        // Get the input value from the search input field
        var searchQuery = document.getElementById('searchInput').value;

        // Check if the search query is not empty
        if (searchQuery.trim() !== '') {
            // Redirect the user to the search page with the query parameter
            window.location.href = 'http://127.0.0.1:8000/search/?query=' + encodeURIComponent(searchQuery);
        } else {
            // Handle empty search query (show an alert, error message, etc.)
            window.location.href = 'http://127.0.0.1:8000/search/';
        }
    }

    // Attach the 'keydown' event listener to the search input field
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        // Check if the pressed key is 'Enter' (key code 13)
        if (event.keyCode === 13) {
            // Prevent the default behavior of the Enter key (form submission)
            event.preventDefault();

            // Call the function to perform the search
            performSearch();
        }
    });

    // Attach the 'click' event listener to the search button
    document.getElementById('searchButton').addEventListener('click', performSearch);