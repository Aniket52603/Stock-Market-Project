document.addEventListener("DOMContentLoaded", () => {
    const queryInput = document.getElementById('query');
    const suggestionsContainer = document.getElementById('suggestions');

    if (!queryInput || !suggestionsContainer) {
        console.error("One or more elements not found in the DOM!");
        return;
    }

    let debounceTimeout;

    // Event listener for input changes
    queryInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => fetchSuggestions(queryInput.value.trim()), 300);
    });

    // Position the suggestion box dynamically
    function positionSuggestionsBox() {
        const inputRect = queryInput.getBoundingClientRect();
        suggestionsContainer.style.top = `${inputRect.bottom + -33  + window.scrollY}px`;
        suggestionsContainer.style.left = `${inputRect.left + -16 + window.scrollX}px`;
        suggestionsContainer.style.width = `${inputRect.width}px`;
        suggestionsContainer.style.display = 'block';
    }

    // Fetch suggestions from the API
    async function fetchSuggestions(query) {
        if (query.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`/api/auto-complete?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (response.ok && data.quotes && data.quotes.length > 0) {
                displaySuggestions(data.quotes);
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            suggestionsContainer.style.display = 'none';
        }
    }

    // Display suggestions below the search box
    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions
        positionSuggestionsBox(); // Ensure correct positioning

        suggestions.forEach((suggestion) => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = `${suggestion.symbol} - ${suggestion.shortname}`;
            item.addEventListener('click', () => {
                queryInput.value = suggestion.symbol;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(item);
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!suggestionsContainer.contains(event.target) && event.target !== queryInput) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
