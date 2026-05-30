# 🚆 IRCTC Next-Generation Booking Portal Simulation

An interactive, premium simulation of the **Indian Railway Catering and Tourism Corporation (IRCTC)** ticket booking portal. This application features a modern UI/UX design, dark/light theme options, localized content translation, responsive layouts, and a complete simulated booking workflow.

---

## 🌟 Core Features

- **Dynamic Ticket Search & Booking**: Auto-complete stations matching, one-way/round-trip toggles, custom quota filters, travel class dropdowns, and date validations.
- **Quick-Book Routes**: Fast-track booking buttons for high-demand routes, such as the premium *Vande Bharat Express (NDLS ➔ BSB)*.
- **Utility Services Panel**: Fully responsive modules for checking:
  - **PNR Status**
  - **Live Train Tracking** (live running logs)
  - **Train Schedules** (frequencies & routes)
  - **Seat Availability**
  - **Ticket Cancellation**
  - **Refund Status**
- **Complete Booking Workflow**:
  - `index.html` — Homepage with search form, promotions, and popular routes.
  - `search-results.html` — Train availability grid with filters for quotas, timings, and class seats.
  - `passenger-details.html` — Dynamic form addition for booking traveler details.
  - `booking-review.html` — Checkout review screen with seat/coach summary and fare breakup.
  - `payment.html` — Secure simulated payment portal (UPI, Net Banking, Card payments).
  - `ticket.html` — Interactive digital ticket with mock PNR, seat allocations, bar code, and print-ready styles.
- **User Dashboard**: Track active journeys, cancelled reservations, and wallet history.
- **Multi-language Translation**: Fully localizable between **English**, **Hindi (हिन्दी)**, and **Tamil (தமிழ்)**.
- **Modern Design & Micro-animations**:
  - Premium TailwindCSS variables with harmonious dark mode accents.
  - Interactive widgets with custom hover transitions and keyframe animations.
  - Accessible design structure with clean semantic HTML.

---

## 🛠️ Technology Stack

- **Structure**: HTML5
- **Styling**: Tailwind CSS (CDN-based) & Vanilla CSS for animations, custom variables, and utility classes
- **Icons & Fonts**: FontAwesome v6, Google Fonts (`Space Grotesk`, `Inter`)
- **Logic**: Vanilla JavaScript (ES6+) for suggestion logic, translation engine, routing parameters, and local storage state persistence.
- **Hosting & Security Config**: Optimized for Vercel with clean URLs and strict Content Security Policies in [vercel.json](file:///c:/Users/acer/Desktop/IRCTC/vercel.json).

---

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser to run this project. No compiler or databases are required as all APIs and transactions are simulated client-side.

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/IRCTC.git
   cd IRCTC
   ```

2. **Open the project**:
   - Double-click [index.html](file:///c:/Users/acer/Desktop/IRCTC/index.html) in your file explorer to run in any browser.
   - Alternatively, serve it using a lightweight dev server to ensure optimal relative path loading:
     ```bash
     # Using Node.js npx:
     npx serve .
     ```

---

## 📦 Deployment to Vercel

The project is configured for direct deployment on **Vercel** with clean URLs enabled:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command in the project directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompt to link the project and deploy it instantly.