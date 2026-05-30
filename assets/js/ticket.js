// ticket.js
document.addEventListener('DOMContentLoaded', () => {
    loadTicketDetails();
});

function loadTicketDetails() {
    const params = new URLSearchParams(window.location.search);
    const pnr = params.get('pnr');

    if (!pnr) {
        alert('No PNR specified. Returning to home.');
        window.location.href = 'index.html';
        return;
    }

    const bookingsRaw = localStorage.getItem('booked_tickets') || '[]';
    let bookings = [];
    try {
        bookings = JSON.parse(bookingsRaw);
    } catch(e) {
        bookings = [];
    }

    const matchedTicket = bookings.find(t => t.pnr === pnr);

    if (!matchedTicket) {
        alert('Ticket record not found for PNR: ' + pnr);
        window.location.href = 'index.html';
        return;
    }

    // Set Header/Gen details
    document.getElementById('ticketPnr').textContent = matchedTicket.pnr;
    document.getElementById('barcodePnr').textContent = `PNR: ${matchedTicket.pnr}`;
    document.getElementById('ticketCoach').textContent = matchedTicket.coach || 'B1';
    document.getElementById('ticketSeats').textContent = matchedTicket.seats ? matchedTicket.seats.join(', ') : '15';
    document.getElementById('ticketTrainNumName').textContent = `${matchedTicket.trainId} - ${matchedTicket.trainName}`;
    document.getElementById('ticketFrom').textContent = matchedTicket.from;
    document.getElementById('ticketTo').textContent = matchedTicket.to;
    document.getElementById('ticketPrice').textContent = formatPrice(matchedTicket.price);

    const createdAtDate = matchedTicket.createdAt ? new Date(matchedTicket.createdAt) : new Date();
    document.getElementById('ticketGenTime').textContent = `Booked on: ${createdAtDate.toLocaleString()}`;

    if (matchedTicket.date) {
        const dateObj = new Date(matchedTicket.date + 'T00:00:00');
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('ticketTravelDate').textContent = `Journey Date: ${dateObj.toLocaleDateString('en-US', options)}`;
    }

    // Load Passengers List
    const passengersBody = document.getElementById('ticketPassengersBody');
    if (passengersBody && matchedTicket.passengers) {
        passengersBody.innerHTML = matchedTicket.passengers.map((p, idx) => {
            const seat = matchedTicket.seats ? matchedTicket.seats[idx] : 15 + idx;
            return `
                <tr class="border-b dark:border-slate-700">
                    <td class="p-2 font-semibold text-gray-500">${idx + 1}</td>
                    <td class="p-2 font-bold text-slate-800 dark:text-white">${p.firstName} ${p.lastName}</td>
                    <td class="p-2 text-slate-600 dark:text-gray-300 capitalize">${p.age} / ${p.gender}</td>
                    <td class="p-2 text-blue-600 dark:text-blue-400 font-bold">${matchedTicket.coach || 'B1'} / Seat ${seat}</td>
                    <td class="p-2 text-slate-600 dark:text-gray-300 capitalize">${p.berthPreference || 'No Preference'}</td>
                </tr>
            `;
        }).join('');
    }
}

function goToHome() {
    window.location.href = 'dashboard.html';
}

function formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

