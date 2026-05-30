// payment.js
document.addEventListener('DOMContentLoaded', () => {
    loadPaymentDetails();
    setupCardListeners();
    startUPITimer();
});

let bookingDataObj = null;

function loadPaymentDetails() {
    const raw = localStorage.getItem('temp_booking');
    if (!raw) {
        alert('No active payment session found. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    try {
        bookingDataObj = JSON.parse(raw);
    } catch(e) {
        alert('Session corrupted. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    const priceText = formatPrice(bookingDataObj.price || 0);
    document.getElementById('totalPayAmount').textContent = priceText;
    document.getElementById('sideTotalPay').textContent = priceText;
    
    document.getElementById('sideTrainNo').textContent = bookingDataObj.trainId;
    document.getElementById('sidePassengerCount').textContent = bookingDataObj.passengers ? bookingDataObj.passengers.length : 0;
}

// Switch between card, upi, and netbanking tabs
function switchTab(tab) {
    const cardSec = document.getElementById('cardSection');
    const upiSec = document.getElementById('upiSection');
    const netSec = document.getElementById('netSection');

    const cardTab = document.getElementById('cardTab');
    const upiTab = document.getElementById('upiTab');
    const netTab = document.getElementById('netTab');

    // Hide all
    cardSec.classList.add('hidden');
    upiSec.classList.add('hidden');
    netSec.classList.add('hidden');

    cardTab.classList.replace('border-blue-600', 'border-transparent');
    cardTab.classList.replace('text-blue-600', 'text-gray-600');
    upiTab.classList.replace('border-blue-600', 'border-transparent');
    upiTab.classList.replace('text-blue-600', 'text-gray-600');
    netTab.classList.replace('border-blue-600', 'border-transparent');
    netTab.classList.replace('text-blue-600', 'text-gray-600');

    // Show selected
    if (tab === 'card') {
        cardSec.classList.remove('hidden');
        cardTab.classList.replace('border-transparent', 'border-blue-600');
        cardTab.classList.replace('text-gray-600', 'text-blue-600');
    } else if (tab === 'upi') {
        upiSec.classList.remove('hidden');
        upiTab.classList.replace('border-transparent', 'border-blue-600');
        upiTab.classList.replace('text-gray-600', 'text-blue-600');
    } else {
        netSec.classList.remove('hidden');
        netTab.classList.replace('border-transparent', 'border-blue-600');
        netTab.classList.replace('text-gray-600', 'text-blue-600');
    }
}

// Setup inputs syncing to 3D Card Front/Back
function setupCardListeners() {
    const cardEl = document.getElementById('creditCard');
    
    const cardNumInput = document.getElementById('cardNumInput');
    const cardHolderInput = document.getElementById('cardHolderInput');
    const cardExpiryInput = document.getElementById('cardExpiryInput');
    const cardCvvInput = document.getElementById('cardCvvInput');

    const cardNumDisplay = document.getElementById('cardNumDisplay');
    const cardHolderDisplay = document.getElementById('cardHolderDisplay');
    const cardExpiryDisplay = document.getElementById('cardExpiryDisplay');
    const cardCvvDisplay = document.getElementById('cardCvvDisplay');

    // Flip to CVV back
    cardCvvInput.addEventListener('focus', () => {
        cardEl.classList.add('flipped');
    });
    cardCvvInput.addEventListener('blur', () => {
        cardEl.classList.remove('flipped');
    });

    // Sync values
    cardNumInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += value[i];
        }
        e.target.value = formatted;
        cardNumDisplay.textContent = formatted || '•••• •••• •••• ••••';
    });

    cardHolderInput.addEventListener('input', (e) => {
        cardHolderDisplay.textContent = e.target.value.toUpperCase() || 'FULL NAME';
    });

    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        cardExpiryDisplay.textContent = value || 'MM/YY';
    });

    cardCvvInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        e.target.value = val;
        cardCvvDisplay.textContent = '•'.repeat(val.length) || '***';
    });
}

// Start 5 min QR checkout countdown
function startUPITimer() {
    let duration = 300; // 5 mins
    const display = document.getElementById('upiTimer');
    
    const interval = setInterval(() => {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        if (display) {
            display.textContent = `${minutes}:${seconds}`;
        }

        if (--duration < 0) {
            clearInterval(interval);
            if (display) display.textContent = "Expired";
        }
    }, 1000);
}

// Fullscreen Payment Loader & Redirect
function processDemoPayment(e, paymentMethod) {
    if (e) e.preventDefault();

    const processingScreen = document.getElementById('processingScreen');
    const processingMethod = document.getElementById('processingMethod');
    
    if (processingScreen && processingMethod) {
        processingMethod.textContent = `Method: ${paymentMethod}`;
        processingScreen.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    setTimeout(() => {
        // Generate random PNR
        const generatedPnr = String(Math.floor(Math.random() * 9000000000) + 1000000000);
        const coaches = ['B1', 'B2', 'A1', 'S1', 'S2'];
        const coach = coaches[Math.floor(Math.random() * coaches.length)];
        
        // Generate seat numbers
        const passengersCount = bookingDataObj.passengers ? bookingDataObj.passengers.length : 1;
        const seats = [];
        for (let i = 0; i < passengersCount; i++) {
            seats.push(Math.floor(Math.random() * 64) + 1);
        }

        // Add ticket to profile bookings list in localStorage
        const ticket = {
            pnr: generatedPnr,
            coach: coach,
            seats: seats,
            trainId: bookingDataObj.trainId,
            trainName: bookingDataObj.trainName,
            from: bookingDataObj.from,
            to: bookingDataObj.to,
            date: bookingDataObj.date,
            passengers: bookingDataObj.passengers,
            email: bookingDataObj.email,
            mobile: bookingDataObj.mobile,
            price: bookingDataObj.price,
            status: 'Confirmed',
            createdAt: new Date().toISOString()
        };

        const existingBookingsRaw = localStorage.getItem('booked_tickets') || '[]';
        let bookingsList = [];
        try {
            bookingsList = JSON.parse(existingBookingsRaw);
        } catch(err) {
            bookingsList = [];
        }
        bookingsList.push(ticket);
        localStorage.setItem('booked_tickets', JSON.stringify(bookingsList));

        // Clear temporary booking session
        localStorage.removeItem('temp_booking');

        // Redirect to E-ticket page
        window.location.href = `ticket.html?pnr=${generatedPnr}`;
    }, 2500); // 2.5 second delay simulation
}

function formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}
