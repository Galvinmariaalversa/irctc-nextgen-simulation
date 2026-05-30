// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    updateBookingSummary();
    setupEventListeners();
    updateNavbarAuth();
});

// Update navbar for logged in state
function updateNavbarAuth() {
    const authBtn = document.getElementById('authBtn');
    
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
        } catch(e) {}
    }
}

// Log out action
function handleLogout() {
    localStorage.removeItem('logged_in_user');
    alert('Logged out successfully.');
    window.location.reload();
}

// Setup event listeners
function setupEventListeners() {
    const passengerForm = document.getElementById('passengerForm');
    if (passengerForm) {
        passengerForm.addEventListener('submit', handleFormSubmit);
    }
}

// Update booking summary from URL parameters
function updateBookingSummary() {
    const params = new URLSearchParams(window.location.search);
    
    const from = decodeURIComponent(params.get('from') || 'Chennai');
    const to = decodeURIComponent(params.get('to') || 'Delhi');
    const trainId = params.get('trainId') || '12345';
    const trainName = decodeURIComponent(params.get('trainName') || 'Express Train');
    const date = params.get('date');

    const trainLabel = (typeof t === 'function' ? t('trainLabel') : null) || 'Train';
    const routeLabel = (typeof t === 'function' ? t('routeLabel') : null) || 'Route';

    // Update header info
    document.getElementById('bookingTrain').textContent = `${trainLabel}: ${trainId} - ${trainName}`;
    document.getElementById('bookingRoute').textContent = `${routeLabel}: ${from} → ${to}`;

    // Update sidebar summary
    document.getElementById('summaryTrainNumber').textContent = `${trainLabel}: ${trainId}`;
    document.getElementById('summaryTrainName').textContent = trainName;
    document.getElementById('summaryFrom').textContent = from;
    document.getElementById('summaryTo').textContent = to;
    
    // Format and display date
    if (date) {
        const dateObj = new Date(date + 'T00:00:00');
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('summaryDate').textContent = dateObj.toLocaleDateString('en-US', options);
    }
}

// Add another passenger
function addPassenger() {
    const passengerCount = document.querySelectorAll('[data-passenger-id]').length + 1;
    
    // Only allow up to 6 passengers per booking
    if (passengerCount > 6) {
        alert('Maximum 6 passengers allowed per booking');
        return;
    }

    const passengerDiv = document.createElement('div');
    passengerDiv.className = 'border-b pb-6';
    passengerDiv.setAttribute('data-passenger-id', passengerCount);
    passengerDiv.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span class="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center">${passengerCount}</span>
                <span>Passenger ${passengerCount}</span>
            </h3>
            <button type="button" onclick="removePassenger(this)" class="text-red-600 hover:text-red-800 font-bold transition">
                <i class="fas fa-trash-alt"></i> Remove
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name" required>
            </div>
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name" required>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Age *</label>
                <input type="number" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter age" min="1" max="120" required>
            </div>
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Gender *</label>
                <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Berth Preference</label>
                <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">No Preference</option>
                    <option value="upper">Upper</option>
                    <option value="lower">Lower</option>
                    <option value="middle">Middle</option>
                    <option value="side">Side</option>
                </select>
            </div>
        </div>
    `;

    // Insert before the "Add More Passengers" button
    const addButton = document.querySelector('[onclick="addPassenger()"]').parentElement;
    addButton.parentElement.insertBefore(passengerDiv, addButton);

    // Update passengers list in sidebar
    updatePassengersList();

    // Scan and translate the newly added passenger element
    if (typeof setupInternationalization === 'function') {
        setupInternationalization();
        updatePageLanguage();
    }
}

// Remove passenger
function removePassenger(button) {
    button.closest('[data-passenger-id]').remove();
    updatePassengersList();
}

// Update passengers list in sidebar
function updatePassengersList() {
    const passengerElements = document.querySelectorAll('[data-passenger-id]');
    const passengersList = document.getElementById('passengersList');
    
    passengersList.innerHTML = '';
    passengerElements.forEach((el, index) => {
        const firstName = el.querySelector('input[type="text"]').value || `Passenger ${index + 1}`;
        const li = document.createElement('li');
        li.className = 'text-gray-700';
        li.textContent = `• ${firstName}`;
        passengersList.appendChild(li);
    });

    // Update summary header
    const count = passengerElements.length;
    passengersList.parentElement.querySelector('p').textContent = `Passengers (${count}):`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Collect form data
    const passengers = [];
    document.querySelectorAll('[data-passenger-id]').forEach(el => {
        const inputs = el.querySelectorAll('input, select');
        passengers.push({
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            age: inputs[2].value,
            gender: inputs[3].value,
            berthPreference: inputs[4].value
        });
    });

    // Collect contact details
    const contactInputs = document.querySelectorAll('.border-t input[type="email"], .border-t input[type="tel"]');
    const email = contactInputs[0].value;
    const mobile = contactInputs[1].value;

    // Validation
    if (passengers.length === 0) {
        alert('Please add at least one passenger');
        return;
    }

    for (let passenger of passengers) {
        if (!passenger.firstName || !passenger.lastName || !passenger.age || !passenger.gender) {
            alert('Please fill all required fields for all passengers');
            return;
        }
    }

    if (!email || !mobile) {
        alert('Please enter email and mobile number');
        return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Store booking data in session/local storage
    const params = new URLSearchParams(window.location.search);
    const bookingData = {
        passengers: passengers,
        email: email,
        mobile: mobile,
        trainId: params.get('trainId') || '12345',
        trainName: decodeURIComponent(params.get('trainName') || 'Express Train'),
        from: decodeURIComponent(params.get('from') || 'Chennai'),
        to: decodeURIComponent(params.get('to') || 'Delhi'),
        date: params.get('date') || '',
        timestamp: new Date().toISOString()
    };

    // Save to localStorage for demo review
    localStorage.setItem('temp_booking', JSON.stringify(bookingData));

    // Redirect to review page
    const reviewParams = new URLSearchParams({
        trainId: bookingData.trainId,
        trainName: encodeURIComponent(bookingData.trainName),
        from: encodeURIComponent(bookingData.from),
        to: encodeURIComponent(bookingData.to),
        date: bookingData.date,
        passengers: passengers.length
    });

    window.location.href = `booking-review.html?${reviewParams.toString()}`;
}

// Format price with Indian numbering system
function formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}
