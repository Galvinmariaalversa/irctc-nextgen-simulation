// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    validateLoginState();
    loadDashboardData();
});

let currentUser = null;

function validateLoginState() {
    const userRaw = localStorage.getItem('logged_in_user');
    if (!userRaw) {
        alert('You must be logged in to view your dashboard. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    try {
        currentUser = JSON.parse(userRaw);
    } catch(e) {
        localStorage.removeItem('logged_in_user');
        window.location.href = 'index.html';
        return;
    }

    // Populate Sidebar Profile details
    document.getElementById('profileName').textContent = currentUser.fullName;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileMobile').textContent = currentUser.mobile;
    
    // Initials
    const names = currentUser.fullName.split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('profileInitials').textContent = initials;
}

function handleLogout() {
    localStorage.removeItem('logged_in_user');
    alert('Logged out successfully.');
    window.location.href = 'index.html';
}

function switchDashTab(tab) {
    const upcomingSec = document.getElementById('upcomingSection');
    const pastSec = document.getElementById('pastSection');
    const refundsSec = document.getElementById('refundsSection');

    const tabUpcoming = document.getElementById('tabUpcoming');
    const tabPast = document.getElementById('tabPast');
    const tabRefunds = document.getElementById('tabRefunds');

    // Hide all sections
    upcomingSec.classList.add('hidden');
    pastSec.classList.add('hidden');
    refundsSec.classList.add('hidden');

    // Reset tabs styles
    const inactiveClasses = "text-gray-600 dark:text-gray-300 font-bold text-xs sm:text-sm";
    const activeClasses = "bg-blue-900 text-white font-bold text-xs sm:text-sm";

    tabUpcoming.className = "flex-1 py-3 px-2 text-center rounded-lg " + (tab === 'upcoming' ? activeClasses : inactiveClasses);
    tabPast.className = "flex-1 py-3 px-2 text-center rounded-lg " + (tab === 'past' ? activeClasses : inactiveClasses);
    tabRefunds.className = "flex-1 py-3 px-2 text-center rounded-lg " + (tab === 'refunds' ? activeClasses : inactiveClasses);

    // Show selected section
    if (tab === 'upcoming') {
        upcomingSec.classList.remove('hidden');
    } else if (tab === 'past') {
        pastSec.classList.remove('hidden');
    } else {
        refundsSec.classList.remove('hidden');
    }
}

function loadDashboardData() {
    const bookingsRaw = localStorage.getItem('booked_tickets') || '[]';
    let bookings = [];
    try { bookings = JSON.parse(bookingsRaw); } catch(e) {}

    // Sort by booking date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Split tickets
    const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
    const pastBookings = bookings.filter(b => b.status === 'Cancelled' || b.status === 'Completed');

    // 1. Render Upcoming
    const upcomingContainer = document.getElementById('upcomingBookingsContainer');
    if (upcomingBookings.length === 0) {
        upcomingContainer.innerHTML = `
            <div class="text-center py-10 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl">
                <p class="text-gray-500 text-sm">No upcoming journeys found.</p>
                <a href="index.html" class="mt-4 inline-block bg-blue-900 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition">Book Tickets Now</a>
            </div>
        `;
    } else {
        upcomingContainer.innerHTML = upcomingBookings.map(b => getBookingCardHTML(b, true)).join('');
    }

    // 2. Render Past
    const pastContainer = document.getElementById('pastBookingsContainer');
    if (pastBookings.length === 0) {
        pastContainer.innerHTML = `
            <div class="text-center py-10 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl">
                <p class="text-gray-500 text-sm">No booking history records found.</p>
            </div>
        `;
    } else {
        pastContainer.innerHTML = pastBookings.map(b => getBookingCardHTML(b, false)).join('');
    }

    // 3. Render Refunds
    loadRefundsList();
}

function getBookingCardHTML(ticket, isUpcoming) {
    const passengersList = ticket.passengers.map(p => `${p.firstName} ${p.lastName} (${p.age}, ${p.gender[0].toUpperCase()})`).join(', ');
    const travelDate = ticket.date ? new Date(ticket.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
    
    let statusBadge = '';
    if (ticket.status === 'Confirmed') {
        statusBadge = '<span class="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded">Confirmed</span>';
    } else if (ticket.status === 'Cancelled') {
        statusBadge = '<span class="bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded">Cancelled</span>';
    } else {
        statusBadge = '<span class="bg-gray-100 text-gray-800 dark:bg-slate-900 dark:text-gray-400 text-xs font-bold px-2.5 py-1 rounded">Completed</span>';
    }

    return `
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow border dark:border-slate-700 p-5 md:p-6 transition hover:shadow-md">
            <div class="flex justify-between items-start flex-wrap gap-2 border-b dark:border-slate-700 pb-3 mb-4">
                <div>
                    <span class="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">PNR: ${ticket.pnr}</span>
                    <h4 class="font-extrabold text-slate-800 dark:text-white mt-0.5">${ticket.trainId} - ${ticket.trainName}</h4>
                </div>
                <div class="text-right">
                    ${statusBadge}
                    <p class="text-[10px] text-gray-400 mt-1">Journey: ${travelDate}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                <div>
                    <p class="text-gray-500">Route</p>
                    <p class="font-bold text-slate-700 dark:text-slate-200 mt-0.5">${ticket.from} ➡️ ${ticket.to}</p>
                </div>
                <div>
                    <p class="text-gray-500">Coach / Seat(s)</p>
                    <p class="font-bold text-slate-700 dark:text-slate-200 mt-0.5">${ticket.coach || 'B1'} / Seat ${ticket.seats ? ticket.seats.join(', ') : '15'}</p>
                </div>
                <div>
                    <p class="text-gray-500">Fare Charged</p>
                    <p class="font-bold text-green-600 dark:text-green-400 mt-0.5">₹${ticket.price || 0}</p>
                </div>
            </div>
            
            <div class="text-xs border-t dark:border-slate-700 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="text-gray-500 max-w-[70%]">
                    <span>Passengers:</span> <span class="font-semibold text-slate-700 dark:text-slate-200">${passengersList}</span>
                </div>
                ${isUpcoming ? `
                    <div class="flex gap-2 w-full sm:w-auto">
                        <button onclick="viewPrintTicket('${ticket.pnr}')" class="flex-1 sm:flex-none px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition">Print Pass</button>
                        <button onclick="cancelTicketAction('${ticket.pnr}')" class="flex-1 sm:flex-none px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-lg transition border border-red-200">Cancel</button>
                    </div>
                ` : `
                    <button onclick="viewPrintTicket('${ticket.pnr}')" class="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-lg transition">View Details</button>
                `}
            </div>
        </div>
    `;
}

function viewPrintTicket(pnr) {
    window.location.href = `ticket.html?pnr=${pnr}`;
}

function cancelTicketAction(pnr) {
    const c = confirm("Are you sure you want to cancel booking for PNR " + pnr + "?\nThis cancellation processes a mock refund.");
    if (!c) return;

    const bookingsRaw = localStorage.getItem('booked_tickets');
    if (!bookingsRaw) return;

    try {
        let bookings = JSON.parse(bookingsRaw);
        const idx = bookings.findIndex(b => b.pnr === pnr);
        if (idx !== -1) {
            bookings[idx].status = 'Cancelled';
            localStorage.setItem('booked_tickets', JSON.stringify(bookings));
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

        alert('Ticket PNR ' + pnr + ' cancelled successfully! Refund of ₹4,803 has been initiated.');
        loadDashboardData();
    } catch(err) {}
}

function loadRefundsList() {
    const refundsContainer = document.getElementById('refundsTrackerContainer');
    const refundsRaw = localStorage.getItem('refunds_list') || '[]';
    let refunds = [];
    try { refunds = JSON.parse(refundsRaw); } catch(e) {}

    if (refunds.length === 0) {
        refundsContainer.innerHTML = `
            <div class="text-center py-10 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl">
                <p class="text-gray-500 text-sm">No cancellation refunds found.</p>
            </div>
        `;
        return;
    }

    refundsContainer.innerHTML = refunds.map(r => {
        let progressVal = 30; // Initiated
        let statusText = 'Initiated';
        let statusColor = 'text-blue-500 bg-blue-50 dark:bg-blue-950/20';

        if (r.status === 'Processing') {
            progressVal = 65;
            statusText = 'Processing at Bank';
            statusColor = 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
        } else if (r.status === 'Refunded' || r.status === 'Completed') {
            progressVal = 100;
            statusText = 'Refund Completed';
            statusColor = 'text-green-600 bg-green-50 dark:bg-green-950/20';
        }

        return `
            <div class="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-5 md:p-6 shadow">
                <div class="flex justify-between items-center mb-4 flex-wrap gap-2 border-b dark:border-slate-700 pb-3">
                    <div>
                        <span class="text-[10px] text-gray-500">REFUND ID: ${r.txId}</span>
                        <h4 class="font-bold text-slate-800 dark:text-white text-sm">Associated PNR: ${r.pnr}</h4>
                    </div>
                    <div class="text-right">
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full ${statusColor}">${statusText}</span>
                    </div>
                </div>
                
                <!-- Progress Meter -->
                <div class="space-y-2 mb-3">
                    <div class="flex justify-between text-xs text-gray-400 font-bold">
                        <span>Initiated</span>
                        <span>Bank Clearance</span>
                        <span>Credited</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div class="bg-teal-500 h-full transition-all duration-500" style="width: ${progressVal}%"></div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center text-xs text-gray-500 pt-1">
                    <span>Initiated on: ${r.date}</span>
                    <span class="font-bold text-slate-800 dark:text-white">Amount: <span class="text-teal-600 dark:text-teal-400 font-extrabold text-sm">₹${r.refundAmount}</span></span>
                </div>
            </div>
        `;
    }).join('');
}
