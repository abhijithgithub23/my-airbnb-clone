Website Link : https://my-airbnb-clone-8989.onrender.com/listings

# Airbnb Clone - Full Stack — MVC

A server-rendered web application inspired by Airbnb, built with Node.js, Express and MongoDB, following the Model-View-Controller (MVC) architecture. Views are rendered using EJS. Users can create and manage property listings, upload images, search by location, and view interactive maps. Authentication and authorization are implemented for secure access.

## Key points
- Server-rendered application (EJS views).  
- Project architecture follows the MVC pattern (Models, Views, Controllers).

## Features
- User registration and authentication (local and OAuth via Passport)  
- Create, edit and delete listings with image upload (Cloudinary)  
- Location-based listing and interactive maps (Mapbox / Google Maps)  
- Search and category filters for listings  
- Reviews and ratings for listings  
- Responsive UI (Bootstrap / custom CSS)  
- Session handling and authorization (role checks for owners/admins)

## Technology stack
- Node.js, Express  
- MongoDB (MongoDB Atlas) with Mongoose  
- EJS for server-side rendering (views)  
- Passport.js for authentication (local + OAuth providers)  
- Cloudinary for image storage  
- Mapbox (or Google Maps) for geocoding and maps  
- Bootstrap 5 and custom CSS for UI  

## Project Structure

```bash
├── app.js                 # Application entry (server)
├── package.json
├── config/
│   ├── passport.js
│   └── db.js
├── controllers/           # Controllers (business logic)
│   ├── authController.js
│   ├── listingsController.js
│   └── reviewsController.js
├── models/                # Mongoose models (User, Listing, Review, ...)
├── routes/                # Route definitions (auth, listings, reviews)
├── views/                 # EJS templates (layouts, partials, pages)
│   ├── layouts/
│   ├── partials/
│   └── listings/
├── public/                # Static assets (css, js, images)
├── middleware/            # Custom middleware (auth checks, error handlers)
├── utils/                 # Helpers (e.g., geocoding, cloudinary helpers)
├── .env.example           # Example environment variables
└── README.md
```

## Environment variables
Create a `.env` file (backend root) with values similar to:
PORT=8080
MONGO_URI=<your_mongodb_connection_string>
SESSION_SECRET=<random_secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
MAPBOX_TOKEN=<mapbox_token>
GOOGLE_CLIENT_ID=<google_oauth_client_id> # if using Google OAuth
GOOGLE_CLIENT_SECRET=<google_oauth_client_secret>
GITHUB_CLIENT_ID=<github_oauth_client_id> # if using GitHub OAuth
GITHUB_CLIENT_SECRET=<github_oauth_client_secret>


## Installation and run 
Clone repository:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

#Install dependencies
npm install

# development (with nodemon if configured)
npm run dev

# or production
npm start
```

## Deployment notes
- Use MongoDB Atlas for a managed database.  
- Host the Node/Express app on Render, Heroku, or a similar provider.  
- Ensure environment variables (especially API keys and session secret) are set in the host dashboard.  
- Configure Cloudinary and Mapbox keys in environment variables.  
- Use HTTPS in production and set secure cookie flags for session cookies.  

## Security and production considerations
- Do not commit `.env` or secrets to source control.  
- Use secure session configuration (`httpOnly`, secure cookies in production).  
- Validate and sanitize user input (server-side).  
- Limit file upload size and validate file types.  
- Apply rate limiting and CSRF protection where appropriate.

## Contributing
- Fork the repository
- Create a feature branch (feature/brief-description)
- Open a pull request with a clear description of changes

## Contact / Author
- Abhijith
- abhijithksd23@gmail.com


































