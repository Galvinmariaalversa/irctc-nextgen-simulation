// Mock Train Data Generator
function generateMockTrains(count = 12) {
    const trainTypes = ['Express', 'SuperFast', 'Rajdhani', 'Passenger'];
    const coaches = ['SL', '3A', '2A', 'CC', '1A'];
    const trainNames = [
        'Chennai Express', 'South Express', 'Kerala Express', 'Rajdhani Express',
        'Shatabdi Express', 'Golden Chariot', 'Deccan Express', 'Mumbai Express',
        'Taj Express', 'Himalayan Queen', 'Darjeeling Mail', 'East Coast Express',
        'West Coast Express', 'Flying Ranee', 'Maharaja Express', 'Palace on Wheels'
    ];

    const trains = [];
    for (let i = 0; i < count; i++) {
        const departure = 5 + Math.floor(Math.random() * 19); // 5 AM to 11 PM
        const duration = 8 + Math.floor(Math.random() * 28); // 8 to 35 hours
        const basePrice = 1500 + Math.floor(Math.random() * 8500); // 1500 to 10000

        trains.push({
            trainNumber: '10001' + i,
            trainName: trainNames[Math.floor(Math.random() * trainNames.length)],
            trainType: trainTypes[Math.floor(Math.random() * trainTypes.length)],
            departure: `${String(departure).padStart(2, '0')}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]}`,
            arrival: `${String((departure + duration) % 24).padStart(2, '0')}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]}`,
            durationHours: duration,
            days: Math.ceil(duration / 24),
            availability: {
                [coaches[0]]: { status: Math.random() > 0.5 ? 'Avl' : 'WL', count: Math.floor(Math.random() * 20) + 1 },
                [coaches[1]]: { status: Math.random() > 0.5 ? 'Avl' : 'WL', count: Math.floor(Math.random() * 15) + 1 },
                [coaches[2]]: { status: Math.random() > 0.5 ? 'Avl' : 'WL', count: Math.floor(Math.random() * 12) + 1 },
                [coaches[3]]: { status: Math.random() > 0.5 ? 'Avl' : 'WL', count: Math.floor(Math.random() * 10) + 1 }
            },
            basePrice: basePrice,
            rating: (3.5 + Math.random() * 1.5).toFixed(1),
            reviews: Math.floor(Math.random() * 500) + 50
        });
    }
    return trains;
}

// Global Variables
let allTrains = [];
let filteredTrains = [];
let displayedTrainsCount = 0;
const trainsPerPage = 12;
let currentFilters = {
    classes: ['SL'],
    times: [],
    types: [],
    sort: 'earliest'
};

// DOM Elements
const trainsContainer = document.getElementById('trainsContainer');
const resultsCount = document.getElementById('resultsCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filtersToggle = document.getElementById('filtersToggle');
const filtersContainer = document.getElementById('filtersContainer');
const sortSelect = document.getElementById('sortSelect');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchResults();
    setupEventListeners();
    updateSearchSummary();
    updateNavbarAuth();
});

// Update navbar for logged in state
function updateNavbarAuth() {
    const authBtn = document.getElementById('authBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    const loggedInUserRaw = localStorage.getItem('logged_in_user');
    if (loggedInUserRaw) {
        try {
            const user = JSON.parse(loggedInUserRaw);
            if (authBtn) {
                authBtn.outerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-gray-600 dark:text-gray-300 hidden md:block">Welcome, ${user.fullName.split(' ')[0]}</span>
                        <a href="dashboard.html" class="px-4 py-2 text-sm bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-100 hover:bg-blue-100 font-bold rounded-lg transition shadow-sm">My Dashboard</a>
                        <button onclick="handleLogout()" class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 font-bold rounded-lg transition">Logout</button>
                    </div>
                `;
            }
            // Update mobile menu
            if (mobileMenu) {
                const mobileLoginBtn = mobileMenu.querySelector('[data-i18n="loginSignUp"]') || mobileMenu.lastElementChild;
                if (mobileLoginBtn) {
                    mobileLoginBtn.outerHTML = `
                        <div class="border-t dark:border-slate-700 pt-2 mt-2 px-4 space-y-2">
                            <p class="text-xs text-gray-500">Logged in as ${user.fullName}</p>
                            <a href="dashboard.html" class="block py-2 text-blue-900 dark:text-blue-200 font-medium">My Dashboard</a>
                            <button onclick="handleLogout()" class="block w-full text-left py-2 text-red-600 font-medium">Logout</button>
                        </div>
                    `;
                }
            }
        } catch(e) {}
    }
}

// Log out action
function handleLogout() {
    localStorage.removeItem('logged_in_user');
    alert('Logged out successfully.');
    window.location.reload();
}

// Initialize search results
function initializeSearchResults() {
    // Generate mock trains
    allTrains = generateMockTrains(50);
    filteredTrains = [...allTrains];
    
    // Display initial trains
    displayTrains();
}

// Setup event listeners
function setupEventListeners() {
    // Class filters
    document.querySelectorAll('.classFilter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Time filters
    document.querySelectorAll('.timeFilter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Train type filters
    document.querySelectorAll('.typeFilter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Sort select
    sortSelect.addEventListener('change', applyFilters);

    // Mobile filters toggle
    if (filtersToggle) {
        filtersToggle.addEventListener('click', () => {
            filtersContainer.classList.toggle('hidden');
            const icon = filtersToggle.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    }

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Modify search form
    const modifyForm = document.getElementById('modifySearchForm');
    if (modifyForm) {
        modifyForm.addEventListener('submit', handleModifySearch);
    }
}

// Display trains in the container
function displayTrains(showAll = false) {
    const startIndex = displayedTrainsCount;
    const endIndex = showAll ? filteredTrains.length : displayedTrainsCount + trainsPerPage;
    const trainsToDisplay = filteredTrains.slice(startIndex, endIndex);

    trainsToDisplay.forEach(train => {
        const trainCard = createTrainCard(train);
        trainsContainer.appendChild(trainCard);
    });

    displayedTrainsCount = endIndex;
    resultsCount.textContent = filteredTrains.length;

    // Hide load more button if all trains are displayed
    if (displayedTrainsCount >= filteredTrains.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'flex';
    }

    // Scan and translate the newly added train cards
    if (typeof setupInternationalization === 'function') {
        setupInternationalization();
        updatePageLanguage();
    }
}

// Create train card HTML
function createTrainCard(train) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md hover:shadow-xl transition border-l-4 border-blue-600 overflow-hidden';
    
    // Calculate time of day category
    const departureHour = parseInt(train.departure.split(':')[0]);
    let timeOfDay = 'night';
    if (departureHour >= 5 && departureHour < 12) timeOfDay = 'morning';
    else if (departureHour >= 12 && departureHour < 17) timeOfDay = 'afternoon';
    else if (departureHour >= 17 && departureHour < 21) timeOfDay = 'evening';

    card.innerHTML = `
        <div class="p-4 md:p-6">
            <!-- Train Header -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-lg md:text-xl font-bold text-blue-900">${train.trainNumber}</h3>
                        <span class="bg-blue-100 text-blue-900 text-xs font-bold px-2 py-1 rounded">${train.trainType}</span>
                    </div>
                    <p class="text-gray-600 font-medium">${train.trainName}</p>
                </div>
                <div class="flex items-center gap-1">
                    <span class="text-yellow-500">★</span>
                    <span class="font-bold text-gray-800">${train.rating}</span>
                    <span class="text-gray-500 text-sm">(${train.reviews} reviews)</span>
                </div>
            </div>

            <!-- Journey Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 pb-4 border-b border-gray-200">
                <!-- Departure to Arrival -->
                <div class="flex items-center justify-between">
                    <div class="text-center">
                        <p class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">${train.departure}</p>
                        <p class="text-sm text-gray-500 mt-1">Departure</p>
                    </div>
                    <div class="flex flex-col items-center flex-1 mx-2 sm:mx-4">
                        <div class="text-[10px] sm:text-xs text-gray-500 font-semibold mb-2">${train.durationHours}h ${String(train.durationHours % 24).padStart(2, '0')}m</div>
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <div class="text-[10px] sm:text-xs text-gray-500 font-semibold mt-2">${train.days} day${train.days > 1 ? 's' : ''}</div>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">${train.arrival}</p>
                        <p class="text-sm text-gray-500 mt-1">Arrival</p>
                    </div>
                </div>

                <!-- Price Info -->
                <div class="flex flex-col justify-center items-center md:items-end bg-blue-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm mb-1">From</p>
                    <p class="text-3xl font-bold text-green-600">₹${train.basePrice}</p>
                    <p class="text-xs text-gray-500 mt-1">per passenger</p>
                </div>
            </div>

            <!-- Class Availability Pills -->
            <div class="mb-4">
                <p class="text-sm font-semibold text-gray-700 mb-2">Class Availability:</p>
                <div class="flex flex-wrap gap-2">
                    ${Object.entries(train.availability).map(([classType, details]) => `
                        <div class="flex items-center gap-1 px-3 py-2 rounded-full transition ${details.status === 'Avl' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            <span class="font-bold text-sm">${classType}</span>
                            <span class="text-xs font-semibold">${details.status} ${details.count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Book Button -->
            <button onclick="bookTrain('${train.trainNumber}', '${train.trainName}')" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="fas fa-ticket-alt"></i>
                <span>Book This Train</span>
            </button>
        </div>
    `;

    return card;
}

// Apply filters
function applyFilters() {
    // Get selected classes
    const selectedClasses = Array.from(document.querySelectorAll('.classFilter:checked'))
        .map(cb => cb.value);
    
    // Get selected times
    const selectedTimes = Array.from(document.querySelectorAll('.timeFilter:checked'))
        .map(cb => cb.value);
    
    // Get selected train types
    const selectedTypes = Array.from(document.querySelectorAll('.typeFilter:checked'))
        .map(cb => cb.value);

    // Get sort option
    const sortBy = sortSelect.value;

    // Filter trains
    filteredTrains = allTrains.filter(train => {
        // Check class filter
        const classMatch = selectedClasses.length === 0 || 
            selectedClasses.some(cls => train.availability[cls]);

        // Check time filter
        let timeMatch = selectedTimes.length === 0;
        if (!timeMatch && selectedTimes.length > 0) {
            const departureHour = parseInt(train.departure.split(':')[0]);
            timeMatch = selectedTimes.some(time => {
                if (time === 'morning') return departureHour >= 5 && departureHour < 12;
                if (time === 'afternoon') return departureHour >= 12 && departureHour < 17;
                if (time === 'evening') return departureHour >= 17 && departureHour < 21;
                if (time === 'night') return departureHour >= 21 || departureHour < 5;
            });
        }

        // Check train type filter
        const typeMatch = selectedTypes.length === 0 ||
            selectedTypes.some(type => train.trainType.toLowerCase() === type.toLowerCase());

        return classMatch && timeMatch && typeMatch;
    });

    // Sort trains
    if (sortBy === 'earliest') {
        filteredTrains.sort((a, b) => parseInt(a.departure.split(':')[0]) - parseInt(b.departure.split(':')[0]));
    } else if (sortBy === 'shortest') {
        filteredTrains.sort((a, b) => a.durationHours - b.durationHours);
    } else if (sortBy === 'cheapest') {
        filteredTrains.sort((a, b) => a.basePrice - b.basePrice);
    }

    // Reset display and show filtered results
    displayedTrainsCount = 0;
    trainsContainer.innerHTML = '';
    displayTrains();
}

// Load more trains
function loadMoreTrains() {
    displayTrains();
}

// Clear all filters
function clearFilters() {
    // Reset all checkboxes
    document.querySelectorAll('.classFilter, .timeFilter, .typeFilter').forEach(cb => {
        cb.checked = cb.classList.contains('classFilter'); // Keep class filter checked by default
    });

    // Reset sort
    sortSelect.value = 'earliest';

    // Reapply filters
    applyFilters();
}

// Update search summary from URL parameters
function updateSearchSummary() {
    const params = new URLSearchParams(window.location.search);
    
    document.getElementById('summaryFrom').textContent = decodeURIComponent(params.get('from') || 'Chennai');
    document.getElementById('summaryTo').textContent = decodeURIComponent(params.get('to') || 'Delhi');
    
    // Format date
    const dateStr = params.get('date');
    if (dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('summaryDate').textContent = date.toLocaleDateString('en-US', options);
    }

    const classVal = params.get('class') || 'All Classes';
    const classNames = {
        'SL': 'Sleeper',
        '3A': '3rd AC',
        '2A': '2nd AC',
        'CC': 'Chair Car',
        '1A': '1st Class'
    };
    
    const classLabel = (typeof t === 'function' ? t('travelClass') : null) || 'Class';
    const className = classNames[classVal] || classVal;
    let translatedClassName = className;
    if (typeof t === 'function') {
        if (className === 'Sleeper') translatedClassName = t('sleeper') || className;
        else if (className === '3rd AC') translatedClassName = t('thirdAC') || className;
        else if (className === '2nd AC') translatedClassName = t('secondAC') || className;
        else if (className === 'Chair Car') translatedClassName = t('chairCar') || className;
        else if (className === '1st Class') translatedClassName = t('firstClass') || className;
    }
    
    document.getElementById('summaryClass').textContent = `${classLabel}: ${translatedClassName}`;
    
    const passengers = params.get('passengers') || '1';
    const passengersLabel = (typeof t === 'function' ? t('passengers') : null) || 'Passengers';
    document.getElementById('summaryPassengers').textContent = `${passengersLabel}: ${passengers}`;

    // Set values in modify modal
    document.getElementById('modifyFrom').value = decodeURIComponent(params.get('from') || '');
    document.getElementById('modifyTo').value = decodeURIComponent(params.get('to') || '');
    document.getElementById('modifyDate').value = dateStr || '';
    document.getElementById('modifyClass').value = classVal || 'SL';
}

// Modify search functionality
function modifySearch() {
    document.getElementById('modifySearchModal').classList.remove('hidden');
}

function closeModifyModal() {
    document.getElementById('modifySearchModal').classList.add('hidden');
}

function handleModifySearch(e) {
    e.preventDefault();
    
    const from = document.getElementById('modifyFrom').value;
    const to = document.getElementById('modifyTo').value;
    const date = document.getElementById('modifyDate').value;
    const trainClass = document.getElementById('modifyClass').value;

    if (!from || !to || !date) {
        alert('Please fill all fields');
        return;
    }

    const queryParams = new URLSearchParams({
        from: encodeURIComponent(from),
        to: encodeURIComponent(to),
        date: date,
        class: trainClass,
        quota: 'General',
        passengers: '1'
    });

    window.location.href = `search-results.html?${queryParams.toString()}`;
}

// Book train functionality
function bookTrain(trainId, trainName) {
    const params = new URLSearchParams(window.location.search);
    
    const bookingParams = new URLSearchParams({
        trainId: trainId,
        trainName: encodeURIComponent(trainName),
        from: params.get('from'),
        to: params.get('to'),
        date: params.get('date'),
        passengers: params.get('passengers') || '1'
    });

    // Redirect to passenger details page
    window.location.href = `passenger-details.html?${bookingParams.toString()}`;
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    hamburger.classList.toggle('active');
}

// Close filters on mobile when a filter is applied
document.querySelectorAll('.classFilter, .timeFilter, .typeFilter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (window.innerWidth < 1024) {
            // Auto-close on mobile after selection
            setTimeout(() => {
                filtersContainer.classList.add('hidden');
            }, 300);
        }
    });
});

// Close modify modal when clicking outside
document.getElementById('modifySearchModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modifySearchModal') {
        closeModifyModal();
    }
});
