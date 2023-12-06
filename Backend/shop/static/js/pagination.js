document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sortSelect');
    const paginationButtons = document.querySelectorAll('.pagination button');

    // Set the initial selected option based on the current sorting option in the URL
    const currentSortOption = getCurrentSortOption();
    sortSelect.value = currentSortOption;

    sortSelect.addEventListener('change', function () {
        const selectedSortOption = sortSelect.value;
        const currentPage = getCurrentPage();
        const query = getCurrentQuery();

        if (query){
            window.location.href = `?page=${currentPage}&sort_by=${selectedSortOption}&query=${query}`
        }
        else{
            window.location.href = `?page=${currentPage}&sort_by=${selectedSortOption}`;
        }

        // Redirect to the next page with the selected sorting option
    });

    paginationButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default button behavior

            // Extract the page number from the button's text content
            const page = this.textContent.trim();

            const query = getCurrentQuery()
            if (query){
                window.location.href = `?page=${page}&sort_by=${getCurrentSortOption()}&query=${query}`;
            }
            else{
                window.location.href = `?page=${page}&sort_by=${getCurrentSortOption()}`;
            }

        });
    });

    function getCurrentQuery(){
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('query'))
        {
            return urlParams.get('query')
        }
    }

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('page')) {
            return urlParams.get('page');
        }
        else
        {
            return 1;
        }
    }

    function getCurrentSortOption() {
        // Get the current URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Check if the 'sort_by' parameter exists in the URL
        if (urlParams.has('sort_by')) {
            // Get the value of the 'sort_by' parameter
            const sortOption = urlParams.get('sort_by');

            // Check if the retrieved value is one of the valid sorting options
            if (["price_asc", "price_desc", "rating", "new"].includes(sortOption)) {
                return sortOption;
            }
        }

        // Default to "rating" if the 'sort_by' parameter is not present or invalid
        return "rating";
    }
});