# AutoMoX

A car purchase web application built with the MERN stack.

## Project Description

AutoMoX is a web platform that connects car buyers with dealerships. Users can browse vehicles, filter by make/model/price, compare cars side by side, calculate loans, book test drives, customize vehicle colors and add-ons, and pay booking fees online. Administrators can manage inventory using VIN auto-population, track analytics, and approve customer documents.

## SRS Document

The Software Requirements Specification is available in [SRS.md](SRS.md).

## Team Members

| Student ID | Name                 |
|------------|----------------------|
| 23301088   | Junayed Bin Aziz     |
| 23101514   | Shohom Karmaker      |
| 23301280   | Sanjida Noshin Omi   |
| 23301197   | Md. Hafizur Rahman   |

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** OTP (email/phone) with JWT
- **Payment Gateway:** SSLCommerz
- **External API:** VIN Decoder (NHTSA)
- **Hosting (planned):** Vercel (frontend), Heroku/DigitalOcean (backend)

## Features

- Car discovery with filters (make, model, fuel type, price)
- Side-by-side comparison of up to 4 vehicles
- Interactive image gallery
- Wishlist for saving cars
- Loan calculator and trade-in valuation
- PDF summary generation
- Test drive booking with calendar and status tracking
- Verified buyer reviews and ratings
- FAQ chatbot
- Vehicle personalization (colors and add-ons)
- Admin panel with VIN auto-population
- Analytics dashboard
- Price drop notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hafiz-110/AutoMoX.git
   cd AutoMoX
