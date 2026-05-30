// help.js - Interactive features for Help & Support page

// ===== ACCORDION TOGGLE FUNCTIONALITY =====
/**
 * Toggles FAQ accordion sections open/closed
 * @param {Element} button - The button that was clicked
 */
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const chevron = button.querySelector('i:last-child');
    
    // Close all other sections (optional: comment out for multi-open support)
    document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content) {
            item.classList.add('hidden');
            item.previousElementSibling.querySelector('i:last-child').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current section
    content.classList.toggle('hidden');
    
    // Rotate chevron icon
    if (content.classList.contains('hidden')) {
        chevron.style.transform = 'rotate(0deg)';
    } else {
        chevron.style.transform = 'rotate(180deg)';
    }
}

// ===== SEARCH FUNCTIONALITY =====
/**
 * Searches through FAQ content and filters results
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Hide search results, show normal FAQ
                document.getElementById('searchResults').classList.add('hidden');
                document.querySelectorAll('#faq-Booking, #faq-Payments, #faq-Account, #faq-PNR, #faq-Tatkal').forEach(faq => {
                    faq.style.display = 'block';
                });
                return;
            }
            
            const results = searchFAQs(searchTerm);
            displaySearchResults(results);
            
            // Hide original FAQ sections during search
            document.querySelectorAll('#faq-Booking, #faq-Payments, #faq-Account, #faq-PNR, #faq-Tatkal').forEach(faq => {
                faq.style.display = 'none';
            });
        });
    }
});

/**
 * Searches through all FAQ content
 * @param {string} searchTerm - The search query
 * @returns {Array} Array of matching FAQ items
 */
function searchFAQs(searchTerm) {
    const results = [];
    
    // Get all FAQ categories
    const categories = document.querySelectorAll('.faq-content');
    
    categories.forEach(category => {
        const items = category.querySelectorAll('.faq-item');
        
        items.forEach(item => {
            const question = item.querySelector('h4')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            // Check if search term matches question or answer
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                results.push({
                    question: item.querySelector('h4')?.textContent,
                    answer: item.querySelector('p')?.textContent,
                    category: category.previousElementSibling?.querySelector('h3')?.textContent
                });
            }
        });
    });
    
    return results;
}

/**
 * Displays search results on the page
 * @param {Array} results - Array of matching FAQs
 */
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    const resultList = document.getElementById('resultList');
    
    if (results.length === 0) {
        resultList.innerHTML = '<div class="p-4 text-center text-gray-500 dark:text-gray-400">No results found. Please try different keywords.</div>';
        resultsContainer.classList.remove('hidden');
        return;
    }
    
    resultList.innerHTML = results.map((result, index) => `
        <div class="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-slate-900/50 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-800 transition" onclick="highlightResult(this)">
            <div class="font-bold text-blue-900 dark:text-blue-300">${result.question}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">${result.category || 'FAQ'}</div>
            <div class="text-sm text-gray-750 dark:text-gray-300 mt-2 line-clamp-2">${result.answer}</div>
        </div>
    `).join('');
    
    resultsContainer.classList.remove('hidden');
}

/**
 * Highlights a search result
 * @param {Element} element - The clicked result element
 */
function highlightResult(element) {
    const isDark = document.documentElement.classList.contains('dark');
    element.style.backgroundColor = isDark ? '#1e293b' : '#dbeafe';
    setTimeout(() => {
        element.style.backgroundColor = isDark ? 'rgba(15, 23, 42, 0.5)' : '#eff6ff';
    }, 1000);
}

// ===== SCROLL TO FAQ SECTION =====
/**
 * Scrolls to a specific FAQ category and opens it
 * @param {string} categoryId - The category ID to scroll to
 */
function scrollToFAQ(categoryId) {
    const faqElement = document.getElementById(`faq-${categoryId}`);
    
    if (faqElement) {
        // Scroll to element
        faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Open the accordion if not already open
        setTimeout(() => {
            const content = faqElement.querySelector('.faq-content');
            if (content && content.classList.contains('hidden')) {
                const button = faqElement.querySelector('.category-header');
                toggleFAQ(button);
            }
        }, 500);
    }
}

// ===== PROBLEM FORM HANDLING =====
/**
 * Handles the problem form submission
 */
document.addEventListener('DOMContentLoaded', () => {
    const problemForm = document.getElementById('problemForm');
    
    if (problemForm) {
        problemForm.addEventListener('submit', handleFormSubmit);
    }
    
    // File upload handling
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || '';
            const fileNameDisplay = document.getElementById('fileName');
            
            if (fileName) {
                fileNameDisplay.innerHTML = `<i class="fas fa-check-circle text-green-600"></i> File selected: ${fileName}`;
            } else {
                fileNameDisplay.innerHTML = '';
            }
        });
    }
});

/**
 * Handles problem form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const issueType = document.getElementById('issueType').value;
    const pnrNumber = document.getElementById('pnrNumber').value;
    const userEmail = document.getElementById('userEmail').value;
    const issueDescription = document.getElementById('issueDescription').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const formMessage = document.getElementById('formMessage');
    
    // Validation
    if (!issueType) {
        showFormMessage('Please select an issue type.', 'error');
        return;
    }
    
    if (!userEmail) {
        showFormMessage('Please enter your email address.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!issueDescription || issueDescription.trim().length < 10) {
        showFormMessage('Please provide at least 10 characters in description.', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showFormMessage('Please agree to the terms to proceed.', 'error');
        return;
    }
    
    // If validation passes, show success message
    showFormMessage('✓ Your problem has been submitted successfully! Our support team will contact you within 24 hours at ' + userEmail, 'success');
    
    // Store in localStorage for demo purposes
    const ticket = {
        id: 'TKT-' + Date.now(),
        issueType: issueType,
        pnr: pnrNumber,
        email: userEmail,
        description: issueDescription,
        submittedAt: new Date().toLocaleString(),
        status: 'Open'
    };
    
    // Save to localStorage
    let tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
    
    console.log('Support Ticket Saved:', ticket);
    
    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('problemForm').reset();
        document.getElementById('fileName').innerHTML = '';
        formMessage.classList.add('hidden');
    }, 2000);
}

/**
 * Shows a message in the form
 * @param {string} message - Message text
 * @param {string} type - Message type: 'success' or 'error'
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.remove('hidden');
    
    if (type === 'success') {
        formMessage.className = 'hidden p-4 rounded-lg text-center bg-green-100 text-green-800 border border-green-300';
    } else {
        formMessage.className = 'hidden p-4 rounded-lg text-center bg-red-100 text-red-800 border border-red-300';
    }
    
    formMessage.classList.remove('hidden');
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== KEYBOARD ACCESSIBILITY =====
/**
 * Allow keyboard navigation for FAQs (Enter/Space to toggle)
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-header').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(button);
            }
        });
        
        // Make buttons focusable
        button.setAttribute('tabindex', '0');
    });
});

// ===== LAZY LOAD OPTIMIZATION (Optional) =====
/**
 * Lazy load images and content for performance
 */
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    });
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0.95';
        observer.observe(section);
    });
}

// ===== UTILITY: FORMAT PNR INPUT =====
/**
 * Auto-format PNR input to uppercase
 */
document.addEventListener('DOMContentLoaded', () => {
    const pnrInput = document.getElementById('pnrNumber');
    if (pnrInput) {
        pnrInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase().replace(/[^0-9]/g, '');
        });
    }
});

// ===== ANALYTICS TRACKING (Optional) =====
/**
 * Track which FAQ sections users click on (for demo)
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-header').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.querySelector('h3')?.textContent;
            console.log('FAQ Opened:', category);
        });
    });
});

// ===== CORE PORTFOLIO ACTIONS (THEMING & AUTH STATE) =====




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
            if (mobileMenu) {
                const existingAuth = mobileMenu.querySelector('.auth-mobile-container');
                if (!existingAuth) {
                    const div = document.createElement('div');
                    div.className = 'auth-mobile-container border-t dark:border-slate-700 pt-2 mt-2 px-4 space-y-2';
                    div.innerHTML = `
                        <p class="text-xs text-gray-500">Logged in as ${user.fullName}</p>
                        <a href="dashboard.html" class="block py-2 text-blue-900 dark:text-blue-200 font-medium">My Dashboard</a>
                        <button onclick="handleLogout()" class="block w-full text-left py-2 text-red-600 font-medium">Logout</button>
                    `;
                    mobileMenu.appendChild(div);
                }
            }
        } catch(e) {}
    }
}

function handleLogout() {
    localStorage.removeItem('logged_in_user');
    alert('Logged out successfully.');
    window.location.reload();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle('hidden');
        hamburger.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    updateNavbarAuth();
    
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
});

function openDishaChat() {
    const btn = document.getElementById('dishaChatBtn');
    if (btn) {
        btn.click();
    }
}

console.log('help.js loaded successfully');
