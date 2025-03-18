// Fonctionnalité de filtrage pour les restaurants d'Albi
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const filterContainer = document.getElementById('filter-container');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const searchInput = document.getElementById('search-input');
    const resetButton = document.getElementById('reset-filter');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    // Collecter toutes les cuisines disponibles
    const cuisines = new Set();
    restaurantCards.forEach(card => {
        const cuisine = card.querySelector('.restaurant-cuisine').textContent;
        cuisines.add(cuisine);
    });
    
    // Remplir le sélecteur de cuisines
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.value = cuisine;
        option.textContent = cuisine;
        cuisineFilter.appendChild(option);
    });
    
    // Fonction pour filtrer les restaurants
    function filterRestaurants() {
        const selectedCuisine = cuisineFilter.value;
        const selectedRating = parseFloat(ratingFilter.value);
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        restaurantCards.forEach(card => {
            const cuisine = card.querySelector('.restaurant-cuisine').textContent;
            const ratingText = card.querySelector('.restaurant-rating span').textContent;
            const rating = parseFloat(ratingText.split('/')[0]);
            const title = card.querySelector('.restaurant-title').textContent.toLowerCase();
            const description = card.querySelector('.restaurant-description').textContent.toLowerCase();
            
            // Vérifier si le restaurant correspond aux critères de filtrage
            const matchesCuisine = selectedCuisine === 'all' || cuisine === selectedCuisine;
            const matchesRating = isNaN(selectedRating) || rating >= selectedRating;
            const matchesSearch = searchTerm === '' || 
                                 title.includes(searchTerm) || 
                                 description.includes(searchTerm);
            
            // Afficher ou masquer le restaurant
            if (matchesCuisine && matchesRating && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Vérifier s'il y a des résultats à afficher
        checkNoResults();
    }
    
    // Fonction pour vérifier s'il n'y a aucun résultat
    function checkNoResults() {
        const visibleCards = document.querySelectorAll('.restaurant-card[style="display: block;"]');
        const noResultsMessage = document.getElementById('no-results');
        
        if (visibleCards.length === 0) {
            // Créer un message si nécessaire
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'no-results';
                message.className = 'no-results-message';
                message.textContent = 'Aucun restaurant ne correspond à ces critères de recherche.';
                document.querySelector('.restaurants-grid').appendChild(message);
            } else {
                noResultsMessage.style.display = 'block';
            }
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }
    
    // Réinitialiser les filtres
    function resetFilters() {
        cuisineFilter.value = 'all';
        ratingFilter.value = 'all';
        searchInput.value = '';
        
        restaurantCards.forEach(card => {
            card.style.display = 'block';
        });
        
        const noResultsMessage = document.getElementById('no-results');
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }
    
    // Ajouter les écouteurs d'événements
    cuisineFilter.addEventListener('change', filterRestaurants);
    ratingFilter.addEventListener('change', filterRestaurants);
    searchInput.addEventListener('input', filterRestaurants);
    resetButton.addEventListener('click', resetFilters);
    
    // Style CSS en ligne pour les filtres
    const style = document.createElement('style');
    style.textContent = `
        .no-results-message {
            grid-column: 1 / -1;
            text-align: center;
            padding: 30px;
            background-color: #f8f5f2;
            border-radius: 10px;
            font-style: italic;
            color: #666;
        }
    `;
    document.head.appendChild(style);
});