// Comprehensive list of Indian Railway Stations and Cities
const INDIAN_STATIONS = [
    // Major Metropolitan Cities
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
    "Chandigarh", "Gurgaon", "Noida", "Ghaziabad", "Surat", "Vadodara", "Ludhiana", "Kota",
    "Coimbatore", "Mysore", "Srinagar", "Leh", "Kochi", "Thiruvananthapuram", "Guwahati",
    
    // Northern India Cities & Towns
    "Agra", "Mathura", "Jodhpur", "Udaipur", "Bikaner", "Ajmer", "Alwar", "Gwalior",
    "Jhansi", "Orchha", "Khajuraho", "Jabalpur", "Ujjain", "Mandu", "Ranchi", "Dhanbad",
    "Patna", "Gaya", "Varanasi", "Gorakhpur", "Dehradun", "Haridwar", "Rishikesh", "Shimla",
    "Manali", "Dharamshala", "McLeodGanj", "Amritsar", "Pathankot", "Jalandhar", "Hoshiarpur",
    "Meerut", "Roorkee", "Saharanpur", "Muzaffarnagar", "Rampur", "Bareilly", "Moradabad",
    
    // Eastern India
    "Howrah", "Sealdah", "Burdwan", "Asansol", "Durgapur", "Kharagpur",
    "Haldia", "Medinipur", "Krishnanagar", "Cooch Behar", "Siliguri", "Darjeeling", "Jalpaiguri",
    
    // Southern India  
    "Coimbatore", "Madurai", "Tirupati", "Kochi", "Thiruvananthapuram", "Mangalore", 
    "Udupi", "Kannur", "Kottayam", "Ernakulam", "Calicut", "Palakkad", "Thrissur", 
    "Salem", "Erode", "Nellore", "Tirunelveli", "Kanyakumari", "Rameswaram", 
    "Chidambaram", "Puducherry", "Cuddalore", "Kurnool", "Visakhapatnam",
    
    // Western India
    "Goa", "Aurangabad", "Nashik", "Satara", "Belgaum", "Bijapur", "Kolhapur",
    "Ahmednagar", "Sangli", "Solapur", "Panaji", "Margao", "Vasco da Gama", "Amravati",
    
    // Central India
    "Raipur", "Durg", "Bilaspur", "Raigarh", "Wardha", "Akola", "Yavatmal", "Parbhani",
    
    // Major Railway Junctions & Stations
    "New Delhi", "Delhi Junction", "Old Delhi", "Howrah Junction", "Sealdah Junction",
    "Chennai Central", "Egmore", "Hyderabad Deccan", "Secunderabad", "Bangalore City",
    "Bengaluru Junction", "Pune Junction", "Ahmedabad Junction", "Mumbai Central",
    "Mumbai Terminus", "Kolkata Terminus", "Lucknow Charbagh", "Kanpur Central",
    
    // Popular Tourist Destinations
    "Ooty", "Coonoor", "Kodaikanal", "Munnar", "Thekkady", "Gulmarg", "Srinagar",
    "Ladakh", "Auli", "Chopta", "Munsiyari", "Pushkar", "Sawai Madhopur", "Ranthambore",
    
    // Additional Towns & Villages
    "Aligarh", "Allahabad", "Etawah", "Gonda", "Bahraich", "Balrampur", "Bijnor",
    "Bulandshahr", "Chandausi", "Chhatarpur", "Deoband", "Deoria", "Didwana",
    "Firozabad", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Kachhla", "Kannauj",
    "Kargain", "Kaushambi", "Khiriya", "Koraj", "Lalitpur", "Mainpuri", "Mirzapur",
    "Mughalsarai", "Muzaffarnagar", "Nainital", "Orai", "Rampur", "Ranikhet",
    "Raxaul", "Rohtak", "Saharanpur", "Sambhal", "Satna", "Shahdara", "Shahdol",
    "Shamli", "Shirpur", "Shivpuri", "Sitapur", "Siwan", "Sohna", "Somanath",
    "Sonipat", "Sultanpur", "Sundargarh", "Taherpur", "Tandur", "Tanakpur", "Tenali",
    "Tendukheda", "Tharad", "Thigri", "Tikapur", "Tikehar", "Tilak", "Tilapur",
    "Tilkhara", "Tilia", "Tillari", "Tilpara", "Tilpur", "Tilsara", "Tilsar",
    "Tilva", "Tilwari", "Timara", "Timbalay", "Timbauri", "Timbel", "Timber",
    "Timberi", "Timbi", "Timbira", "Timbiro", "Timbirwa", "Timboa", "Timbog",
    "Timbol", "Timbor", "Timbori", "Timboro", "Timbosu", "Timbota", "Timboti",
    "Timbowa", "Timbowal", "Timbowe", "Timbra", "Timbrad", "Timbrag", "Timbrai",
    "Timbrail", "Timbrain", "Timbrala", "Timbram", "Timbran", "Timbrana", "Timbrani",
    "Timbrar", "Timbras", "Timbrata", "Timbrati", "Timbrayal", "Timbre", "Timbrea",
    "Timbrean", "Timbrear", "Timbrei", "Timbrela", "Timbrena", "Timbrenai",
    "Timbrenal", "Timbrenan", "Timbrenani", "Timbrenar", "Timbrenara", "Timbrenari",
    "Timbrenas", "Timbrenata", "Timbrenati", "Timbreni", "Timbrenian", "Timbreniana"
];

// DOM Elements
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const dateInput = document.getElementById('date');
const returnDateInput = document.getElementById('returnDate');
const classSelect = document.getElementById('class');
const quotaSelect = document.getElementById('quota');
const passengersSelect = document.getElementById('passengers');
const flexibleDatesCheckbox = document.getElementById('flexibleDates');
const searchForm = document.getElementById('searchForm');
const fromSuggestions = document.getElementById('fromSuggestions');
const toSuggestions = document.getElementById('toSuggestions');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Set today's date as default
function setDefaultDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
    dateInput.min = formattedDate;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDate();
    setupEventListeners();
    
    updateNavbarAuth();
    
    // Auto-open login modal if redirected from other pages
    const params = new URLSearchParams(window.location.search);
    if (params.get('openAuth') === 'true') {
        openAuthModal();
    }
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

// Update the Theme Icon based on current HTML class


// Toggle Theme function


// Swap From and To stations
function swapStations() {
    const fromVal = fromInput.value;
    const toVal = toInput.value;
    fromInput.value = toVal;
    toInput.value = fromVal;
    
    // Spin icon
    const icon = document.getElementById('swapIcon');
    if (icon) {
        icon.classList.add('scale-75');
        const currentRotation = icon.style.transform || 'rotate(0deg)';
        const newRotation = currentRotation === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
        icon.style.transform = newRotation;
        setTimeout(() => {
            icon.classList.remove('scale-75');
        }, 150);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Autocomplete for From input
    fromInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value, fromSuggestions);
    });

    fromInput.addEventListener('focus', () => {
        if (fromInput.value) {
            showSuggestions(fromInput.value, fromSuggestions);
        }
    });

    // Autocomplete for To input
    toInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value, toSuggestions);
    });

    toInput.addEventListener('focus', () => {
        if (toInput.value) {
            showSuggestions(toInput.value, toSuggestions);
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
            fromSuggestions.classList.add('hidden');
            toSuggestions.classList.add('hidden');
        }
    });

    // Form submission
    searchForm.addEventListener('submit', handleFormSubmit);

    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Quick action cards
    document.querySelectorAll('[data-action]').forEach(card => {
        card.addEventListener('click', handleQuickAction);
    });

    // Quick autofill for Vande Bharat promo
    const bookVandeBharatBtn = document.getElementById('bookVandeBharatBtn');
    if (bookVandeBharatBtn) {
        bookVandeBharatBtn.addEventListener('click', () => {
            if (fromInput && toInput && dateInput && classSelect) {
                // Set From station
                fromInput.value = "New Delhi";
                // Set To station
                toInput.value = "Varanasi";
                
                // Set date to 7 days from now
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 7);
                dateInput.value = futureDate.toISOString().split('T')[0];
                
                // Set travel class to AC Chair Car (CC)
                classSelect.value = "CC";
                
                // Set Quota to General
                if (quotaSelect) quotaSelect.value = "General";
                
                // Scroll to the search-card form
                const searchCard = document.querySelector('.search-card');
                if (searchCard) {
                    searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Add a brief highlight flash effect
                    searchCard.classList.add('ring-4', 'ring-orange-500/50', 'transition-all', 'duration-500');
                    setTimeout(() => {
                        searchCard.classList.remove('ring-4', 'ring-orange-500/50');
                    }, 1500);
                }
            }
        });
    }
}

// Show autocomplete suggestions with matched text highlighting
function showSuggestions(input, suggestionsList) {
    if (!input.trim()) {
        suggestionsList.classList.add('hidden');
        return;
    }

    const filtered = INDIAN_STATIONS.filter(station =>
        station.toLowerCase().startsWith(input.toLowerCase())
    ).slice(0, 8);

    if (filtered.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }

    suggestionsList.innerHTML = filtered.map(station => {
        const matchLength = input.length;
        const matchText = station.substring(0, matchLength);
        const remainingText = station.substring(matchLength);
        const highlighted = `<span class="highlight-text">${matchText}</span>${remainingText}`;
        return `
            <li class="px-4 py-2 hover:bg-orange-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100" onclick="selectStation('${station}', '${suggestionsList.id}')">
                ${highlighted}
            </li>
        `;
    }).join('');

    suggestionsList.classList.remove('hidden');
}

// Select station from autocomplete
function selectStation(station, suggestionId) {
    if (suggestionId === 'fromSuggestions') {
        fromInput.value = station;
        fromSuggestions.classList.add('hidden');
    } else {
        toInput.value = station;
        toSuggestions.classList.add('hidden');
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const date = dateInput.value;
    const returnDate = returnDateInput.value;
    const trainClass = classSelect.value;
    const quota = quotaSelect.value;
    const passengers = passengersSelect.value;

    // Validation
    if (!from || !to || !date || !trainClass || !quota) {
        alert(getValidationMessage('fillAllFields'));
        return;
    }

    if (from.toLowerCase() === to.toLowerCase()) {
        alert(getValidationMessage('sameStation'));
        return;
    }

    // Check if stations exist in our list (case insensitive)
    const isFromValid = INDIAN_STATIONS.some(s => s.toLowerCase() === from.toLowerCase());
    const isToValid = INDIAN_STATIONS.some(s => s.toLowerCase() === to.toLowerCase());

    if (!isFromValid) {
        alert(getValidationMessage('invalidFrom'));
        return;
    }

    if (!isToValid) {
        alert(getValidationMessage('invalidTo'));
        return;
    }

    // Validate dates
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert(getValidationMessage('selectPastDate'));
        return;
    }

    // Validate return date if provided
    if (returnDate) {
        const selectedReturnDate = new Date(returnDate);
        if (selectedReturnDate < selectedDate) {
            alert(getValidationMessage('selectReturnDate'));
            return;
        }
    }

    // Build query parameters
    const queryParams = new URLSearchParams({
        from: encodeURIComponent(from),
        to: encodeURIComponent(to),
        date: date,
        returnDate: returnDate || '',
        class: trainClass,
        quota: quota,
        passengers: passengers
    });

    // Redirect to search results page
    window.location.href = `search-results.html?${queryParams.toString()}`;
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    hamburger.classList.toggle('active');
}

// Open Quick Services Modal
function openQuickServiceModal() {
    const modal = document.getElementById('quickServiceModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close Quick Services Modal
function closeQuickServiceModal() {
    const modal = document.getElementById('quickServiceModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close quick service modal clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const qsModal = document.getElementById('quickServiceModal');
    if (qsModal) {
        qsModal.addEventListener('click', (e) => {
            if (e.target === qsModal) {
                closeQuickServiceModal();
            }
        });
    }
});

// Handle quick action cards
function handleQuickAction(e) {
    const actionType = e.currentTarget.getAttribute('data-action');
    if (!actionType) return;
    
    const titleEl = document.getElementById('quickServiceModalTitle');
    const bodyEl = document.getElementById('quickServiceModalBody');
    
    if (!titleEl || !bodyEl) return;
    
    // Open the modal
    openQuickServiceModal();
    
    if (actionType === 'pnr') {
        titleEl.innerHTML = '📋 Check PNR Booking Status';
        bodyEl.innerHTML = getPNRModalHTML();
    } else if (actionType === 'live-status') {
        titleEl.innerHTML = '🚂 Live Train Tracking';
        bodyEl.innerHTML = getLiveStatusModalHTML();
    } else if (actionType === 'schedule') {
        titleEl.innerHTML = '⏱️ Train Schedule & Route';
        bodyEl.innerHTML = getScheduleModalHTML();
    } else if (actionType === 'seat-availability') {
        titleEl.innerHTML = '💺 Seat Availability Calendar';
        bodyEl.innerHTML = getSeatAvailabilityModalHTML();
        // prefill date input inside modal
        const dateInput = document.getElementById('seatDate');
        if (dateInput) {
            const today = new Date();
            dateInput.value = today.toISOString().split('T')[0];
            dateInput.min = today.toISOString().split('T')[0];
        }
    } else if (actionType === 'cancel') {
        titleEl.innerHTML = '❌ Cancel Train Ticket';
        bodyEl.innerHTML = getCancelModalHTML();
    } else if (actionType === 'refund') {
        titleEl.innerHTML = '💰 Refund Status Tracker';
        bodyEl.innerHTML = getRefundModalHTML();
    }
}

// Flexible dates toggle
if (flexibleDatesCheckbox) {
    flexibleDatesCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show flexible dates UI if needed
            console.log('Flexible dates enabled');
        } else {
            console.log('Flexible dates disabled');
        }
    });
}

// Keyboard accessibility - Arrow keys for autocomplete navigation
let currentSuggestionIndex = -1;

fromInput.addEventListener('keydown', (e) => {
    handleAutocompletKeyboard(e, fromSuggestions, fromInput);
});

toInput.addEventListener('keydown', (e) => {
    handleAutocompletKeyboard(e, toSuggestions, toInput);
});

function handleAutocompletKeyboard(e, suggestionsList, inputField) {
    const items = suggestionsList.querySelectorAll('li');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, items.length - 1);
        highlightSuggestion(items, currentSuggestionIndex);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
        highlightSuggestion(items, currentSuggestionIndex);
    } else if (e.key === 'Enter' && currentSuggestionIndex >= 0) {
        e.preventDefault();
        items[currentSuggestionIndex].click();
        currentSuggestionIndex = -1;
    } else if (e.key === 'Escape') {
        suggestionsList.classList.add('hidden');
        currentSuggestionIndex = -1;
    }
}

function highlightSuggestion(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('bg-orange-100');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('bg-orange-100');
        }
    });
}

// Update validation messages to use language from translations
function getValidationMessage(messageKey) {
    return translations[getCurrentLanguage()][messageKey] || translations['en'][messageKey];
}

// ===== COMBINED LOGIN/SIGNUP MODAL =====

function openAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Reset forms
    document.getElementById('loginFormModal').reset();
    document.getElementById('signupFormModal').reset();
    document.getElementById('loginError').classList.add('hidden');
    document.getElementById('signupError').classList.add('hidden');
}

/**
 * Switch between Login and Signup tabs with smooth animation
 * @param {string} tab - 'login' or 'signup'
 */
function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');

    if (tab === 'login') {
        // Show login, hide signup
        loginForm.classList.remove('hidden');
        loginForm.classList.add('form-enter');
        signupForm.classList.add('hidden');
        signupForm.classList.remove('form-enter');

        // Update tabs
        loginTab.classList.add('border-blue-600', 'text-blue-600');
        loginTab.classList.remove('border-transparent', 'text-gray-600', 'hover:text-gray-800');

        signupTab.classList.add('border-transparent', 'text-gray-600', 'hover:text-gray-800');
        signupTab.classList.remove('border-green-600', 'text-green-600');
    } else {
        // Show signup, hide login
        signupForm.classList.remove('hidden');
        signupForm.classList.add('form-enter');
        loginForm.classList.add('hidden');
        loginForm.classList.remove('form-enter');

        // Update tabs
        signupTab.classList.add('border-green-600', 'text-green-600');
        signupTab.classList.remove('border-transparent', 'text-gray-600', 'hover:text-gray-800');

        loginTab.classList.add('border-transparent', 'text-gray-600', 'hover:text-gray-800');
        loginTab.classList.remove('border-blue-600', 'text-blue-600');
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAuthModal();
            }
        });
    }

    // Setup login form
    const loginForm = document.getElementById('loginFormModal');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Setup signup form
    const signupForm = document.getElementById('signupFormModal');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
});

function toggleLoginPwd() {
    const pwd = document.getElementById('loginPwd');
    const btn = event.target;
    if (pwd.type === 'password') {
        pwd.type = 'text';
        btn.textContent = 'Hide';
    } else {
        pwd.type = 'password';
        btn.textContent = 'Show';
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const identifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('loginPwd').value.trim();
    const remember = document.getElementById('loginRemember').checked;
    const errEl = document.getElementById('loginError');

    errEl.classList.add('hidden');

    if (!identifier || !password) {
        errEl.textContent = 'Please enter both email/mobile and password.';
        errEl.classList.remove('hidden');
        return;
    }

    // Demo: check against saved users
    const usersRaw = localStorage.getItem('irctc_demo_users');
    let users = [];
    try { users = usersRaw ? JSON.parse(usersRaw) : []; } catch (e) { users = []; }

    const found = users.find(u => (u.email === identifier || u.mobile === identifier) && u.password === password);

    if (!found) {
        errEl.textContent = 'Invalid credentials or user not found. (Demo: try signing up first)';
        errEl.classList.remove('hidden');
        return;
    }

    if (remember) {
        localStorage.setItem('irctc_last_user', identifier);
    }

    // Store user session
    localStorage.setItem('logged_in_user', JSON.stringify(found));
    updateNavbarAuth();

    alert('✓ Login successful! Welcome ' + found.fullName);
    closeAuthModal();
    document.getElementById('loginFormModal').reset();
}

function handleSignupSubmit(e) {
    e.preventDefault();
    const fullName = document.getElementById('signupFullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const mobile = document.getElementById('signupMobile').value.trim();
    const pwd = document.getElementById('signupPwd').value;
    const confirmPwd = document.getElementById('signupConfirmPwd').value;
    const terms = document.getElementById('signupTerms').checked;
    const errEl = document.getElementById('signupError');

    errEl.classList.add('hidden');

    if (!fullName || !email || !mobile || !pwd || !confirmPwd) {
        errEl.textContent = 'Please fill all fields.';
        errEl.classList.remove('hidden');
        return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        errEl.textContent = 'Invalid email format.';
        errEl.classList.remove('hidden');
        return;
    }

    const mobileRe = /^[0-9]{10}$/;
    if (!mobileRe.test(mobile)) {
        errEl.textContent = 'Mobile must be 10 digits.';
        errEl.classList.remove('hidden');
        return;
    }

    if (pwd.length < 6) {
        errEl.textContent = 'Password must be at least 6 characters.';
        errEl.classList.remove('hidden');
        return;
    }

    if (pwd !== confirmPwd) {
        errEl.textContent = 'Passwords do not match.';
        errEl.classList.remove('hidden');
        return;
    }

    if (!terms) {
        errEl.textContent = 'You must accept the terms.';
        errEl.classList.remove('hidden');
        return;
    }

    // Save user
    let users = [];
    const raw = localStorage.getItem('irctc_demo_users');
    try { users = raw ? JSON.parse(raw) : []; } catch (e) { users = []; }

    const exists = users.find(u => u.email === email || u.mobile === mobile);
    if (exists) {
        errEl.textContent = 'User with this email/mobile already exists.';
        errEl.classList.remove('hidden');
        return;
    }

    users.push({ fullName, email, mobile, password: pwd, userType: 'individual', createdAt: Date.now() });
    localStorage.setItem('irctc_demo_users', JSON.stringify(users));

    alert('✓ Account created successfully! You can now log in.');
    
    // Switch to login tab automatically
    document.getElementById('signupFormModal').reset();
    switchAuthTab('login');
}

// =========================================================================
// QUICK SERVICES MODAL CONTENT GENERATORS & MOCK ACTIONS
// =========================================================================

function getPNRModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Enter your 10-digit Passenger Name Record (PNR) to check booking status, coach details, and berth allocation.</p>
            <div class="flex gap-3">
                <input type="text" id="pnrNumberInput" placeholder="Enter 10-digit PNR Number" maxlength="10" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none dark:bg-slate-800" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
                <button onclick="checkPNRStatus()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200">Check Status</button>
            </div>
            <p class="text-xs text-gray-500">Demo PNRs: <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('pnrNumberInput').value='9876543210'">9876543210</span> (Confirmed) or <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('pnrNumberInput').value='1234567890'">1234567890</span> (Waitlisted)</p>
            
            <div id="pnrResultContainer" class="hidden mt-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Status details will load here -->
            </div>
        </div>
    `;
}

function checkPNRStatus() {
    const pnr = document.getElementById('pnrNumberInput').value.trim();
    const container = document.getElementById('pnrResultContainer');
    if (!pnr || pnr.length !== 10) {
        alert('Please enter a valid 10-digit PNR');
        return;
    }
    
    // Simulate API loading
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Fetching PNR data from server...</p>
        </div>
    `;
    
    setTimeout(() => {
        if (pnr === '9876543210') {
            container.innerHTML = `
                <div class="border-b dark:border-slate-700 pb-4 mb-4 flex justify-between items-center flex-wrap gap-2">
                    <div>
                        <span class="text-xs font-bold text-blue-600 dark:text-blue-400">PNR: 9876543210</span>
                        <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">12002 - NDLS Shatabdi Express</h4>
                    </div>
                    <span class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">Booking Status: CNF (Confirmed)</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                        <p class="text-gray-500 text-xs">Date of Journey</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">28 May 2026</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">Class & Quota</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">CC (Chair Car) / General</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">From</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">New Delhi (NDLS)</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">To</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">Agra Cantt (AGC)</p>
                    </div>
                </div>
                <div class="border-t dark:border-slate-700 pt-4">
                    <p class="text-sm font-semibold mb-2">Passenger Information:</p>
                    <table class="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr class="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                                <th class="p-2 rounded-l">#</th>
                                <th class="p-2">Name</th>
                                <th class="p-2">Age/Gender</th>
                                <th class="p-2 rounded-r">Coach / Seat / Berth</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-700 dark:text-slate-200">
                            <tr class="border-b dark:border-slate-700">
                                <td class="p-2">1</td>
                                <td class="p-2 font-semibold">Rajesh Kumar</td>
                                <td class="p-2">34 / Male</td>
                                <td class="p-2 font-bold text-green-600">C1 / Seat 42 / Window</td>
                            </tr>
                            <tr>
                                <td class="p-2">2</td>
                                <td class="p-2 font-semibold">Sunita Devi</td>
                                <td class="p-2">32 / Female</td>
                                <td class="p-2 font-bold text-green-600">C1 / Seat 43 / Middle</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (pnr === '1234567890') {
            container.innerHTML = `
                <div class="border-b dark:border-slate-700 pb-4 mb-4 flex justify-between items-center flex-wrap gap-2">
                    <div>
                        <span class="text-xs font-bold text-blue-600 dark:text-blue-400">PNR: 1234567890</span>
                        <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">12952 - Mumbai Rajdhani</h4>
                    </div>
                    <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">Booking Status: WL (Waitlisted)</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                        <p class="text-gray-500 text-xs">Date of Journey</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">30 May 2026</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">Class & Quota</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">3A / Tatkal</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">From</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">Mumbai Central (BCT)</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">To</p>
                        <p class="font-bold text-slate-700 dark:text-slate-200">New Delhi (NDLS)</p>
                    </div>
                </div>
                <div class="border-t dark:border-slate-700 pt-4">
                    <p class="text-sm font-semibold mb-2">Passenger Information:</p>
                    <table class="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr class="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                                <th class="p-2 rounded-l">#</th>
                                <th class="p-2">Name</th>
                                <th class="p-2">Booking Status</th>
                                <th class="p-2 rounded-r">Current Status</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-700 dark:text-slate-200">
                            <tr>
                                <td class="p-2">1</td>
                                <td class="p-2 font-semibold">Amit Shah</td>
                                <td class="p-2 text-red-500">WL 12</td>
                                <td class="p-2 font-bold text-orange-600">WL 4 (Likely CNF)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            // Check if there is a real booking matching this PNR in local storage
            const bookingsRaw = localStorage.getItem('booked_tickets');
            let bookings = [];
            try { bookings = bookingsRaw ? JSON.parse(bookingsRaw) : []; } catch(e) {}
            
            const matched = bookings.find(b => b.pnr === pnr);
            if (matched) {
                const passengerRows = matched.passengers.map((p, idx) => `
                    <tr class="${idx < matched.passengers.length - 1 ? 'border-b dark:border-slate-700' : ''}">
                        <td class="p-2">${idx + 1}</td>
                        <td class="p-2 font-semibold">${p.firstName} ${p.lastName}</td>
                        <td class="p-2">${p.age} / ${p.gender}</td>
                        <td class="p-2 font-bold text-green-600">${matched.coach || 'B1'} / Seat ${matched.seats ? matched.seats[idx] : 12 + idx} / ${p.berthPreference || 'No Preference'}</td>
                    </tr>
                `).join('');
                
                container.innerHTML = `
                    <div class="border-b dark:border-slate-700 pb-4 mb-4 flex justify-between items-center flex-wrap gap-2">
                        <div>
                            <span class="text-xs font-bold text-blue-600 dark:text-blue-400">PNR: ${matched.pnr}</span>
                            <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">${matched.trainId} - ${matched.trainName}</h4>
                        </div>
                        <span class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">Booking Status: CNF (Confirmed)</span>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                            <p class="text-gray-500 text-xs">Date of Journey</p>
                            <p class="font-bold text-slate-700 dark:text-slate-200">${matched.date}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">Class & Quota</p>
                            <p class="font-bold text-slate-700 dark:text-slate-200">${matched.trainClass || 'SL'} / General</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">From</p>
                            <p class="font-bold text-slate-700 dark:text-slate-200">${matched.from}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">To</p>
                            <p class="font-bold text-slate-700 dark:text-slate-200">${matched.to}</p>
                        </div>
                    </div>
                    <div class="border-t dark:border-slate-700 pt-4">
                        <p class="text-sm font-semibold mb-2">Passenger Information:</p>
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                                    <th class="p-2 rounded-l">#</th>
                                    <th class="p-2">Name</th>
                                    <th class="p-2">Age/Gender</th>
                                    <th class="p-2 rounded-r">Coach / Seat / Berth</th>
                                </tr>
                            </thead>
                            <tbody class="text-slate-700 dark:text-slate-200">
                                ${passengerRows}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="text-center py-4">
                        <div class="text-red-500 text-2xl mb-2">⚠️</div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-200">PNR Not Found</h4>
                        <p class="text-xs text-gray-500 mt-1">No active booking was found for PNR ${pnr}. For demo, try entering: <span class="font-bold text-blue-600 dark:text-blue-400">9876543210</span></p>
                    </div>
                `;
            }
        }
    }, 1000);
}

function getLiveStatusModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Enter a 5-digit Train Number to see its simulated real-time location, upcoming stops, delay details, and platform numbers.</p>
            <div class="flex gap-3">
                <input type="text" id="trainNoInput" placeholder="Enter Train Number (e.g. 12002 or 12952)" maxlength="5" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none dark:bg-slate-800" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
                <button onclick="trackLiveTrain()" class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200">Track Status</button>
            </div>
            <p class="text-xs text-gray-500">Try demo trains: <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('trainNoInput').value='12002'">12002</span> (Shatabdi Express) or <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('trainNoInput').value='12952'">12952</span> (Rajdhani Express)</p>
            
            <div id="liveStatusContainer" class="hidden mt-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Tracking timeline will load here -->
            </div>
        </div>
    `;
}

function trackLiveTrain() {
    const trainNo = document.getElementById('trainNoInput').value.trim();
    const container = document.getElementById('liveStatusContainer');
    if (!trainNo || trainNo.length < 3) {
        alert('Please enter a valid Train Number');
        return;
    }
    
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Contacting Train GPS System...</p>
        </div>
    `;
    
    setTimeout(() => {
        let trainName = "SuperFast Express";
        let stops = [];
        let currentIndex = 2; // Where the train is currently
        
        if (trainNo === '12002') {
            trainName = "12002 NDLS Shatabdi Express (New Delhi ➡️ Bhopal)";
            stops = [
                { station: "New Delhi (NDLS)", sch: "06:00", act: "06:00", status: "Departed", delay: 0, platform: "1" },
                { station: "Mathura Junction (MTJ)", sch: "07:20", act: "07:22", status: "Departed", delay: 2, platform: "2" },
                { station: "Agra Cantt (AGC)", sch: "07:50", act: "08:02", status: "Arrived / Waiting", delay: 12, platform: "1" },
                { station: "Gwalior Junction (GWL)", sch: "09:23", act: "09:33", status: "Upcoming", delay: 10, platform: "3" },
                { station: "Jhansi Junction (VGLJ)", sch: "10:45", act: "10:45", status: "Upcoming", delay: 0, platform: "1" },
                { station: "Bhopal Junction (BPL)", sch: "14:40", act: "14:40", status: "Upcoming", delay: 0, platform: "2" }
            ];
            currentIndex = 2; // Agra Cantt
        } else if (trainNo === '12952') {
            trainName = "12952 Mumbai Rajdhani Express (Mumbai ➡️ New Delhi)";
            stops = [
                { station: "Mumbai Central (MMCT)", sch: "17:00", act: "17:00", status: "Departed", delay: 0, platform: "1" },
                { station: "Surat (ST)", sch: "19:43", act: "19:43", status: "Departed", delay: 0, platform: "3" },
                { station: "Vadodara Junction (BRC)", sch: "21:04", act: "21:09", status: "Departed", delay: 5, platform: "2" },
                { station: "Ratlam Junction (RTM)", sch: "00:43", act: "00:53", status: "In Transit", delay: 10, platform: "1" },
                { station: "Kota Junction (KOTA)", sch: "03:55", act: "03:55", status: "Upcoming", delay: 0, platform: "1" },
                { station: "New Delhi (NDLS)", sch: "08:30", act: "08:30", status: "Upcoming", delay: 0, platform: "4" }
            ];
            currentIndex = 3; // Ratlam Junction
        } else {
            // General Random train generator
            trainName = `${trainNo} - Intercity SuperFast Express`;
            stops = [
                { station: "Source Station", sch: "10:00", act: "10:00", status: "Departed", delay: 0, platform: "1" },
                { station: "Intermediate Stop 1", sch: "11:30", act: "11:45", status: "Departed", delay: 15, platform: "2" },
                { station: "Intermediate Stop 2", sch: "13:00", act: "13:12", status: "Arrived", delay: 12, platform: "1" },
                { station: "Intermediate Stop 3", sch: "15:45", act: "15:45", status: "Upcoming", delay: 0, platform: "3" },
                { station: "Destination Terminal", sch: "18:30", act: "18:30", status: "Upcoming", delay: 0, platform: "2" }
            ];
            currentIndex = 2;
        }
        
        let timelineHTML = '';
        stops.forEach((stop, idx) => {
            const isDeparted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;
            
            let statusColor = "text-gray-400";
            let dotBorder = "border-gray-300 dark:border-slate-700 bg-gray-200 dark:bg-slate-800";
            
            if (isDeparted) {
                statusColor = "text-green-600 dark:text-green-500 font-semibold";
                dotBorder = "border-green-600 bg-green-100 dark:bg-green-950 dark:border-green-500 text-green-600";
            } else if (isCurrent) {
                statusColor = "text-orange-600 dark:text-orange-500 font-bold animate-pulse";
                dotBorder = "border-orange-600 bg-orange-100 dark:bg-orange-950 dark:border-orange-500 text-orange-600 scale-125 z-10 shadow-md";
            }
            
            const delayText = stop.delay > 0 ? `<span class="text-red-500 font-medium">(${stop.delay} mins Late)</span>` : `<span class="text-green-600 font-medium">(On Time)</span>`;
            
            timelineHTML += `
                <div class="flex items-start gap-4 relative">
                    <!-- Vertical Line connecting dots -->
                    ${idx < stops.length - 1 ? `
                        <div class="absolute left-4 top-8 bottom-0 w-0.5 ${isDeparted ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-700'}"></div>
                    ` : ''}
                    
                    <!-- Circle Indicator -->
                    <div class="w-8 h-8 rounded-full border-2 ${dotBorder} flex items-center justify-center font-bold text-xs">
                        ${isCurrent ? '🚂' : idx + 1}
                    </div>
                    
                    <!-- Station Info -->
                    <div class="flex-1 pb-6">
                        <div class="flex justify-between items-start flex-wrap gap-1">
                            <h5 class="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">${stop.station}</h5>
                            <span class="text-xs text-gray-500 font-medium">Platform ${stop.platform}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs mt-1">
                            <span class="${statusColor}">${stop.status}</span>
                            <span class="text-slate-600 dark:text-slate-300">Sch: ${stop.sch} | Act: ${stop.act} ${delayText}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = `
            <div class="border-b dark:border-slate-700 pb-3 mb-4">
                <h4 class="font-bold text-lg text-blue-900 dark:text-blue-400">${trainName}</h4>
                <p class="text-xs text-gray-500 mt-0.5">Live Status Refreshed Just Now via Satellite GPS</p>
            </div>
            <div class="space-y-1">
                ${timelineHTML}
            </div>
        `;
    }, 1000);
}

function getScheduleModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Check operational schedule, weekly runs, and stoppage timings for any train.</p>
            <div class="flex gap-3">
                <input type="text" id="trainScheduleNoInput" placeholder="Enter Train Number (e.g. 12002)" maxlength="5" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none dark:bg-slate-800" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
                <button onclick="fetchTrainSchedule()" class="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200">Get Schedule</button>
            </div>
            <p class="text-xs text-gray-500">Try demo trains: <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('trainScheduleNoInput').value='12002'">12002</span> or <span class="font-semibold cursor-pointer underline text-blue-600" onclick="document.getElementById('trainScheduleNoInput').value='12952'">12952</span></p>
            
            <div id="trainScheduleContainer" class="hidden mt-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Schedule table will load here -->
            </div>
        </div>
    `;
}

function fetchTrainSchedule() {
    const trainNo = document.getElementById('trainScheduleNoInput').value.trim();
    const container = document.getElementById('trainScheduleContainer');
    if (!trainNo) {
        alert('Please enter a train number');
        return;
    }
    
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading schedule timetable...</p>
        </div>
    `;
    
    setTimeout(() => {
        let scheduleHTML = '';
        let trainTitle = '';
        let runsOn = '';
        
        if (trainNo === '12002') {
            trainTitle = "12002 - Shatabdi Express (New Delhi to Bhopal)";
            runsOn = "Runs On: M T W T F S S (All Days)";
            const stops = [
                { station: "New Delhi (NDLS)", arr: "Source", dep: "06:00", dist: "0 km", halt: "--" },
                { station: "Mathura Junction (MTJ)", arr: "07:19", dep: "07:20", dist: "141 km", halt: "1 min" },
                { station: "Agra Cantt (AGC)", arr: "07:50", dep: "07:55", dist: "195 km", halt: "5 mins" },
                { station: "Gwalior Junction (GWL)", arr: "09:23", dep: "09:28", dist: "313 km", halt: "5 mins" },
                { station: "Jhansi Junction (VGLJ)", arr: "10:43", dep: "10:48", dist: "411 km", halt: "5 mins" },
                { station: "Bhopal Junction (BPL)", arr: "14:40", dep: "Destination", dist: "703 km", halt: "--" }
            ];
            scheduleHTML = generateScheduleTable(stops);
        } else {
            trainTitle = `${trainNo} - Mumbai Express`;
            runsOn = "Runs On: M T W T F S S (All Days)";
            const stops = [
                { station: "Mumbai Central (MMCT)", arr: "Source", dep: "17:00", dist: "0 km", halt: "--" },
                { station: "Surat (ST)", arr: "19:40", dep: "19:43", dist: "263 km", halt: "3 mins" },
                { station: "Vadodara Junction (BRC)", arr: "21:00", dep: "21:05", dist: "392 km", halt: "5 mins" },
                { station: "New Delhi (NDLS)", arr: "08:30", dep: "Destination", dist: "1384 km", halt: "--" }
            ];
            scheduleHTML = generateScheduleTable(stops);
        }
        
        container.innerHTML = `
            <div class="border-b dark:border-slate-700 pb-3 mb-4 flex justify-between items-start flex-wrap gap-1">
                <div>
                    <h4 class="font-bold text-lg text-blue-900 dark:text-blue-400">${trainTitle}</h4>
                    <p class="text-xs text-gray-500 mt-0.5">${runsOn}</p>
                </div>
            </div>
            ${scheduleHTML}
        `;
    }, 1000);
}

function generateScheduleTable(stops) {
    const rows = stops.map((stop, idx) => `
        <tr class="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
            <td class="p-2 font-semibold text-gray-700 dark:text-gray-200">${idx+1}</td>
            <td class="p-2 font-bold text-slate-800 dark:text-slate-100">${stop.station}</td>
            <td class="p-2 text-slate-700 dark:text-slate-300">${stop.arr}</td>
            <td class="p-2 text-slate-700 dark:text-slate-300">${stop.dep}</td>
            <td class="p-2 text-slate-700 dark:text-slate-300">${stop.halt}</td>
            <td class="p-2 text-slate-700 dark:text-slate-300">${stop.dist}</td>
        </tr>
    `).join('');
    
    return `
        <table class="w-full text-left text-xs border-collapse">
            <thead>
                <tr class="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold border-b dark:border-slate-600">
                    <th class="p-2">#</th>
                    <th class="p-2">Station</th>
                    <th class="p-2">Arrival</th>
                    <th class="p-2">Departure</th>
                    <th class="p-2">Halt</th>
                    <th class="p-2">Distance</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function getSeatAvailabilityModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Select details below to see seat availability calendar for the next 7 days.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">From Station</label>
                    <input type="text" id="seatFrom" value="Delhi" class="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">To Station</label>
                    <input type="text" id="seatTo" value="Mumbai" class="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm">
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
                    <input type="date" id="seatDate" class="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Class</label>
                    <select id="seatClass" class="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm">
                        <option value="SL">Sleeper (SL)</option>
                        <option value="3A">3rd AC (3A)</option>
                        <option value="2A">2nd AC (2A)</option>
                        <option value="1A">1st AC (1A)</option>
                    </select>
                </div>
            </div>
            
            <button onclick="checkSeatAvailability()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200">Check Seat Availability</button>
            
            <div id="seatAvailabilityResult" class="hidden border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Seats grid will load here -->
            </div>
        </div>
    `;
}

function checkSeatAvailability() {
    const from = document.getElementById('seatFrom').value.trim();
    const to = document.getElementById('seatTo').value.trim();
    const dateStr = document.getElementById('seatDate').value || new Date().toISOString().split('T')[0];
    const travelClass = document.getElementById('seatClass').value;
    
    const container = document.getElementById('seatAvailabilityResult');
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Polling seat counts...</p>
        </div>
    `;
    
    setTimeout(() => {
        const days = [];
        const baseDate = new Date(dateStr + 'T00:00:00');
        
        for (let i = 0; i < 7; i++) {
            const tempDate = new Date(baseDate);
            tempDate.setDate(baseDate.getDate() + i);
            const opt = { day: 'numeric', month: 'short', weekday: 'short' };
            const formatted = tempDate.toLocaleDateString('en-US', opt);
            
            let status = 'AVL';
            let count = Math.floor(Math.random() * 80) + 10;
            let statusClass = 'bg-green-50 dark:bg-green-950/20 border-green-500 text-green-700 dark:text-green-400';
            
            // Waitlist or RAC mock simulation
            const rand = Math.random();
            if (rand > 0.8) {
                status = 'WL';
                count = Math.floor(Math.random() * 20) + 1;
                statusClass = 'bg-red-50 dark:bg-red-950/20 border-red-500 text-red-700 dark:text-red-400';
            } else if (rand > 0.6) {
                status = 'RAC';
                count = Math.floor(Math.random() * 15) + 1;
                statusClass = 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500 text-yellow-700 dark:text-yellow-400';
            }
            
            days.push({ date: formatted, status: status, count: count, css: statusClass });
        }
        
        const gridHTML = days.map(d => `
            <div class="border-2 rounded-lg p-3 text-center transition hover:shadow-md cursor-pointer ${d.css}">
                <p class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">${d.date}</p>
                <p class="font-extrabold text-sm sm:text-base">${d.status} - ${d.count}</p>
                <p class="text-[10px] text-gray-500 mt-1">Book Now</p>
            </div>
        `).join('');
        
        container.innerHTML = `
            <div class="border-b dark:border-slate-700 pb-3 mb-4">
                <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100">${from} ➡️ ${to} (${travelClass} Class)</h4>
                <p class="text-xs text-gray-500 mt-0.5">Availability for 7 days from selected date</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${gridHTML}
            </div>
        `;
    }, 1000);
}

function getCancelModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Enter a PNR number to fetch your active ticket details and cancel reservation.</p>
            <div class="flex gap-3">
                <input type="text" id="cancelPnrInput" placeholder="Enter PNR Number" maxlength="10" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none dark:bg-slate-800">
                <button onclick="fetchCancelTicket()" class="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200">Fetch Booking</button>
            </div>
            
            <div id="cancelResultContainer" class="hidden mt-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Fetch results -->
            </div>
        </div>
    `;
}

function fetchCancelTicket() {
    const pnr = document.getElementById('cancelPnrInput').value.trim();
    const container = document.getElementById('cancelResultContainer');
    if (!pnr || pnr.length !== 10) {
        alert('Please enter a valid 10-digit PNR');
        return;
    }
    
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Searching active bookings...</p>
        </div>
    `;
    
    setTimeout(() => {
        // Look up in localStorage booked_tickets
        const bookingsRaw = localStorage.getItem('booked_tickets');
        let bookings = [];
        try { bookings = bookingsRaw ? JSON.parse(bookingsRaw) : []; } catch(e) {}
        
        const matched = bookings.find(b => b.pnr === pnr && b.status !== 'Cancelled');
        
        // Include default mock if they type 9876543210
        if (pnr === '9876543210' || matched) {
            const data = matched || {
                trainId: "12002",
                trainName: "Shatabdi Express",
                from: "New Delhi",
                to: "Agra Cantt",
                date: "28 May 2026",
                passengers: [{ firstName: "Rajesh", lastName: "Kumar" }, { firstName: "Sunita", lastName: "Devi" }],
                pnr: "9876543210",
                price: 5303
            };
            
            const passNames = data.passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ');
            
            container.innerHTML = `
                <div class="border-b dark:border-slate-700 pb-3 mb-4">
                    <span class="text-xs font-bold text-red-600">ACTIVE BOOKING FOUND</span>
                    <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">${data.trainId} - ${data.trainName}</h4>
                </div>
                <div class="text-sm space-y-2 mb-4">
                    <p><span class="text-gray-500">Route:</span> <span class="font-bold text-slate-700 dark:text-slate-200">${data.from} ➡️ ${data.to}</span></p>
                    <p><span class="text-gray-500">Date:</span> <span class="font-bold text-slate-700 dark:text-slate-200">${data.date}</span></p>
                    <p><span class="text-gray-500">Passengers:</span> <span class="font-bold text-slate-700 dark:text-slate-200">${passNames}</span></p>
                    <p><span class="text-gray-500">Fare Charged:</span> <span class="font-bold text-green-600">₹${data.price || 1200}</span></p>
                </div>
                <div class="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 mb-4 text-xs text-red-800 dark:text-red-400 font-medium">
                    Warning: Cancelling this ticket will incur a cancellation charge of ₹250 per passenger. The balance refund will be processed to the original payment source.
                </div>
                <button onclick="confirmCancellation('${data.pnr}')" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-200">Confirm Cancellation</button>
            `;
        } else {
            container.innerHTML = `
                <div class="text-center py-4">
                    <div class="text-red-500 text-2xl mb-2">⚠️</div>
                    <h4 class="font-bold text-slate-800 dark:text-slate-200">No Booking Found</h4>
                    <p class="text-xs text-gray-500 mt-1">No active booking was found for PNR ${pnr}. For demo, check status using <span class="font-bold text-blue-600" onclick="document.getElementById('cancelPnrInput').value='9876543210'; fetchCancelTicket();">9876543210</span></p>
                </div>
            `;
        }
    }, 1000);
}

function confirmCancellation(pnr) {
    const container = document.getElementById('cancelResultContainer');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Processing cancellation & refund...</p>
        </div>
    `;
    
    setTimeout(() => {
        // Update localStorage
        const bookingsRaw = localStorage.getItem('booked_tickets');
        if (bookingsRaw) {
            try {
                let bookings = JSON.parse(bookingsRaw);
                const idx = bookings.findIndex(b => b.pnr === pnr);
                if (idx !== -1) {
                    bookings[idx].status = 'Cancelled';
                    localStorage.setItem('booked_tickets', JSON.stringify(bookings));
                }
            } catch(e) {}
        }
        
        // Add refund tracker object in localStorage
        const refundsRaw = localStorage.getItem('refunds_list') || '[]';
        let refunds = [];
        try { refunds = JSON.parse(refundsRaw); } catch(e) {}
        refunds.push({
            pnr: pnr,
            txId: 'TXN' + Math.floor(Math.random() * 900000 + 100000),
            refundAmount: 4803,
            status: 'Initiated',
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('refunds_list', JSON.stringify(refunds));
        
        container.innerHTML = `
            <div class="text-center py-6 space-y-3">
                <div class="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">Ticket Cancelled Successfully</h4>
                <p class="text-xs text-gray-500">Your reservation has been voided. Refund of <span class="font-bold text-green-600">₹4,803</span> (after ₹500 cancellation fee) has been initiated.</p>
                <div class="pt-2">
                    <button onclick="document.getElementById('quickServiceModal').classList.add('hidden')" class="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-xs rounded transition">Close Window</button>
                </div>
            </div>
        `;
    }, 1500);
}

function getRefundModalHTML() {
    return `
        <div class="space-y-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">Track processing progress for your cancelled ticket refund using PNR.</p>
            <div class="flex gap-3">
                <input type="text" id="refundPnrInput" placeholder="Enter cancelled PNR (e.g. 9876543210)" maxlength="10" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none dark:bg-slate-800">
                <button onclick="trackRefundProgress()" class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200">Track Refund</button>
            </div>
            
            <div id="refundResultContainer" class="hidden mt-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800">
                <!-- Refund tracking timeline -->
            </div>
        </div>
    `;
}

function trackRefundProgress() {
    const pnr = document.getElementById('refundPnrInput').value.trim();
    const container = document.getElementById('refundResultContainer');
    if (!pnr || pnr.length !== 10) {
        alert('Please enter a valid 10-digit PNR');
        return;
    }
    
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Querying bank clearing house...</p>
        </div>
    `;
    
    setTimeout(() => {
        // Look up refunds in localStorage
        const refundsRaw = localStorage.getItem('refunds_list');
        let refunds = [];
        try { refunds = refundsRaw ? JSON.parse(refundsRaw) : []; } catch(e) {}
        
        const matched = refunds.find(r => r.pnr === pnr);
        
        if (pnr === '9876543210' || matched) {
            const data = matched || {
                pnr: "9876543210",
                txId: "TXN5829104",
                refundAmount: 4803,
                status: "Processing",
                date: new Date().toLocaleDateString()
            };
            
            let progressIndex = 2; // Bank Processing
            if (data.status === 'Initiated') progressIndex = 1;
            else if (data.status === 'Completed' || data.status === 'Refunded') progressIndex = 3;
            
            const steps = [
                { title: "Cancellation Settled", desc: "Ticket cancelled successfully", date: data.date },
                { title: "Refund Disbursed", desc: "Refund approved & sent to bank", date: data.date },
                { title: "Bank Processing", desc: "Pending clearance at vendor bank", date: "In Progress" },
                { title: "Refund Completed", desc: "Credited to your original account", date: "--" }
            ];
            
            let timelineHTML = '';
            steps.forEach((step, idx) => {
                const isDone = idx < progressIndex;
                const isCurrent = idx === progressIndex;
                const isPending = idx > progressIndex;
                
                let circleCss = "border-gray-300 text-gray-400 bg-gray-100";
                let textCss = "text-gray-500";
                let lineCss = "bg-gray-300";
                
                if (isDone) {
                    circleCss = "border-teal-600 bg-teal-100 text-teal-600";
                    textCss = "text-slate-800 dark:text-slate-200 font-semibold";
                    lineCss = "bg-teal-600";
                } else if (isCurrent) {
                    circleCss = "border-orange-500 bg-orange-100 text-orange-600 scale-110 z-10 animate-pulse";
                    textCss = "text-orange-600 font-bold";
                    lineCss = "bg-gray-300";
                }
                
                timelineHTML += `
                    <div class="flex items-start gap-3 relative">
                        ${idx < steps.length - 1 ? `
                            <div class="absolute left-[13px] top-6 bottom-0 w-0.5 ${lineCss}"></div>
                        ` : ''}
                        
                        <div class="w-7 h-7 rounded-full border-2 ${circleCss} flex items-center justify-center text-xs font-bold">
                            ${isDone ? '✓' : idx + 1}
                        </div>
                        
                        <div class="flex-1 pb-5">
                            <div class="flex justify-between items-center text-xs">
                                <span class="${textCss}">${step.title}</span>
                                <span class="text-gray-400 font-semibold">${step.date}</span>
                            </div>
                            <p class="text-[11px] text-gray-500 mt-0.5">${step.desc}</p>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = `
                <div class="border-b dark:border-slate-700 pb-3 mb-4">
                    <span class="text-xs font-bold text-teal-600 font-semibold">REFUND ID: ${data.txId}</span>
                    <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">Amount: ₹${data.refundAmount}</h4>
                </div>
                <div class="space-y-1">
                    ${timelineHTML}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="text-center py-4">
                    <div class="text-red-500 text-2xl mb-2">⚠️</div>
                    <h4 class="font-bold text-slate-800 dark:text-slate-200">No Refund Found</h4>
                    <p class="text-xs text-gray-500 mt-1">Please ensure the PNR matches a cancelled booking. For demo, try entering: <span class="font-bold text-teal-600" onclick="document.getElementById('refundPnrInput').value='9876543210'; trackRefundProgress();">9876543210</span></p>
                </div>
            `;
        }
    }, 1000);
}

// Autofill route from Popular Route cards and scroll to booking form
function autofillRoute(fromStation, toStation) {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const dateInput = document.getElementById('date');
    const classSelect = document.getElementById('class');
    const quotaSelect = document.getElementById('quota');
    const searchForm = document.getElementById('searchForm');
    
    if (fromInput && toInput) {
        fromInput.value = fromStation;
        toInput.value = toStation;
        
        // Calculate a date exactly 7 days from today
        const travelDate = new Date();
        travelDate.setDate(travelDate.getDate() + 7);
        if (dateInput) {
            dateInput.value = travelDate.toISOString().split('T')[0];
        }
        
        // Default to Sleeper Class and General Quota
        if (classSelect) classSelect.value = "SL";
        if (quotaSelect) quotaSelect.value = "General";
        
        // Scroll to search form smoothly
        const searchCard = searchForm.closest('.search-card');
        if (searchCard) {
            searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add a visual flash effect to attract user attention
            searchCard.classList.add('ring-4', 'ring-orange-500/50', 'transition-all', 'duration-500');
            setTimeout(() => {
                searchCard.classList.remove('ring-4', 'ring-orange-500/50');
            }, 2500);
        }
    }
}
