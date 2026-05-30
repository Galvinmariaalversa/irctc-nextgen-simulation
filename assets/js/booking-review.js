// booking-review.js
document.addEventListener('DOMContentLoaded', () => {
    loadBookingData();
});

let bookingDataObj = null;

function loadBookingData() {
    const raw = localStorage.getItem('temp_booking');
    if (!raw) {
        alert('No active booking session found. Redirecting to home.');
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

    // Set Header Info
    document.getElementById('bookingTrain').textContent = `Train: ${bookingDataObj.trainId} - ${bookingDataObj.trainName}`;
    document.getElementById('bookingRoute').textContent = `Route: ${bookingDataObj.from} → ${bookingDataObj.to}`;
    
    // Set Main Details Card
    document.getElementById('trainNumName').textContent = `${bookingDataObj.trainId} - ${bookingDataObj.trainName}`;
    document.getElementById('fromStationVal').textContent = bookingDataObj.from;
    document.getElementById('toStationVal').textContent = bookingDataObj.to;
    
    if (bookingDataObj.date) {
        const dateObj = new Date(bookingDataObj.date + 'T00:00:00');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('journeyDateVal').textContent = dateObj.toLocaleDateString('en-US', options);
    }

    // Set Passengers List
    const tableBody = document.getElementById('passengersTableBody');
    if (tableBody && bookingDataObj.passengers) {
        tableBody.innerHTML = bookingDataObj.passengers.map((p, idx) => `
            <tr class="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td class="p-3 font-semibold text-gray-500">${idx + 1}</td>
                <td class="p-3 font-bold text-slate-800 dark:text-white">${p.firstName} ${p.lastName}</td>
                <td class="p-3 text-slate-600 dark:text-gray-300 capitalize">${p.age} / ${p.gender}</td>
                <td class="p-3 text-slate-600 dark:text-gray-300 capitalize">${p.berthPreference || 'No Preference'}</td>
            </tr>
        `).join('');
    }

    // Set Contact details
    document.getElementById('contactEmail').textContent = bookingDataObj.email;
    document.getElementById('contactMobile').textContent = bookingDataObj.mobile;

    // Calculate Fares
    calculateFares();
}

function calculateFares() {
    if (!bookingDataObj || !bookingDataObj.passengers) return;

    const count = bookingDataObj.passengers.length;
    // Mock base fare calculation: 1850 per passenger
    const baseFare = 1850 * count;
    const convFee = 50;
    const gst = Math.round(baseFare * 0.05);
    const total = baseFare + convFee + gst;

    // Save calculated price in bookingDataObj
    bookingDataObj.price = total;
    localStorage.setItem('temp_booking', JSON.stringify(bookingDataObj));

    // Render prices
    document.getElementById('baseFareVal').textContent = formatPrice(baseFare);
    document.getElementById('gstFareVal').textContent = formatPrice(gst);
    document.getElementById('totalFareVal').textContent = formatPrice(total);
}

function goToPayment() {
    window.location.href = 'payment.html';
}

function formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}
