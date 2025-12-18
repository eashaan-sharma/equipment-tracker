Assignment Equipment Tracker

Hi. I am Eashaan Sharma. This is my full stack assignment.
An equipment management application.
The app allows users to manage equipment records with full CRUD functionality and demonstrates practical frontend, backend, database, and deployment skills.



Live Demo (Vercel)

https://equipment-tracker-es.vercel.app/


Features

- View all equipment in a tabular format
- Add new equipment records
- Edit existing equipment records
- Delete equipment records
- Persistent storage using Mongo
- Deployed frontend and backend

Equipment Fields

Each equipment record contains, as instructed:

- Name (text)
- Type (Machine, Vessel, Tank, Mixer)
- Status (Active, Inactive, Under Maintenance)
- Last Cleaned Date (date)

Tech Stack

### Frontend
- React (Create React App)
- Fetch API for HTTP requests
- HTML table based layout
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- REST API architecture
- Mongoose for MongoDB interaction
- Deployed on Render

### Database
- MongoDB Atlas
- Mongoose


API Endpoints

Method      GET                 POST                 PUT                DELETE
Endpoint    /api/equipment      /api/equipment       /api/equipment/:id /api/equipment/:id 
Description Fetch all equipment Create new equipment Update equipment   Delete equipment

Backend Details

- Express server with modular routes
- MongoDB connection managed using Mongoose
- Schema level validation using enums
- Proper HTTP status codes
- Error handling for all endpoints
- CORS enabled for frontend communication

Frontend Details

- Single page React application
- Equipment displayed in a table
- Unified form used for both create and edit actions
- Optimistic UI updates by refetching data after mutations
- Clean separation of API logic in a dedicated helper file

Deployment Notes

Backend Deployment
- Hosted on Render as a Web Service
- Root directory set to `backend`
- Start command: `npm start`
- MongoDB Atlas IP whitelist configured to allow Render

Frontend Deployment
- Hosted on Vercel
- Root directory set to `frontend`
- Framework preset: Create React App
- Frontend communicates with backend via production API URL

Local Development

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start

find env variables in .env

Assignment Notes

- No external UI libraries used
- Focused on correctness, clarity, and maintainability

Future Improvements

- Search
- Auth layer
- Improved UI styling

Author

Built by Eashaan Sharma as a full stack web development assignment.


