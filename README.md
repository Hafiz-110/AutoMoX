# AutoMoX

A car purchase web application built with the MERN stack.

## Project Description

AutoMoX is a web platform that connects car buyers with dealerships. Users can browse vehicles, filter by make/model/price, compare cars side by side, calculate loans, book test drives, customize vehicle colors and add-ons, and pay booking fees online. Administrators can manage inventory using VIN auto-population, track analytics, and approve customer documents.

## SRS Document

The Software Requirements Specification is available in [[SRS AutoMox](https://docs.google.com/document/u/2/d/1riIwhdvCP0LnE8zrBjIZh9vVYULgZjSTW_l4ftaPJPU/edit)
]
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

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** OTP (email/phone) with JWT
- **Payment Gateway:** SSLCommerz
- **External API:** VIN Decoder

## Features

### Car Discovery
- Filter by make, model, fuel type, price
- Compare up to 4 vehicles side by side
- Interactive image gallery (multiple angles)
- Wishlist to save cars for later

### Financial Tools
- Monthly loan calculator
- Trade-in valuation (age, mileage, condition)
- Downloadable PDF summary
- Secure booking fee payment via SSLCommerz

### User Interaction
- Test drive booking with calendar
- Track booking status (Pending, Confirmed, Completed)
- Verified buyer reviews and ratings
- FAQ chatbot for common questions

### Vehicle Personalization
- Change exterior color with preview
- Select add-ons (rims, interior) with real-time price update

### Admin Management
- Add cars using VIN (auto-populate data)
- Update price, stock, specifications
- Delete/archive sold cars
- Analytics dashboard (inventory value, most viewed)
- Approve/reject user documents
- Price drop alerts for wishlisted cars
## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

