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
- **M**ongoDB (Atlas)
- **E**xpress.js
- **R**eact (Vite)
- **N**ode.js

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



## 🛠️ Pre-requisites

Before you start, ensure you have the following installed on your machine:
- **Node.js** (LTS version recommended)
- **Git**
- **npm** (usually comes with Node)

## 🚀 Getting Started for Team Members

Follow these steps exactly to get the project running on your local machine:

### 1. Clone and Navigate
```bash
git clone https://github.com/Hafiz-110/AutoMoX.git
cd AutoMoX
git checkout dev
```
## Getting Started
1. Clone the repository.
2. Go to the `server` folder and run `npm install`.
3. Create a `.env` file in the `server` folder (use `.env.example` as a template).
4. Go to the `client` folder and run `npm install`.

## How to Run
- **Backend:** `cd server && npm run dev`
- **Frontend:** `cd client && npm run dev`
