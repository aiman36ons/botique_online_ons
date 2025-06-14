# Ons_Techno E-commerce Platform

A multilingual e-commerce platform specializing in IT accessories, digital products, and IT services.

## Features

- Multi-language support (French, English, Arabic)
- Product categories:
  - IT Accessories
  - Digital Products
  - IT Services
- Multiple payment methods:
  - PayPal
  - Baridi Mob (Algerian)
  - Cash on Delivery
- User authentication and authorization
- Shopping cart functionality
- Order management
- Admin dashboard

## Tech Stack

### Backend
- PHP 8.1+
- Laravel 10.x
- MySQL Database
- RESTful API

### Frontend
- React 18
- Redux Toolkit
- Material-UI
- i18next for internationalization

## Project Structure

```
ons_techno/
├── backend/           # Laravel API
├── frontend/         # React Application
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory
2. Copy `.env.example` to `.env`
3. Configure your database settings
4. Run migrations: `php artisan migrate`
5. Start the server: `php artisan serve`

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Environment Variables

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ons_techno
DB_USERNAME=root
DB_PASSWORD=

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License. 