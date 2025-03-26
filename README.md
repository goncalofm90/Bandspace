# Bandspace 🎸🎼

## Overview
Bandspace is a comprehensive social network designed specifically for musicians. It provides a platform for artists to connect, collaborate, showcase their talents, and grow their musical careers.

## Project Structure
```
Bandspace/
├── config/
├── middleware/
├── models/
├── routes/
├── src/
├── public/
├── server.js
└── package.json
```

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux
- **Runtime:** Node.js v14.x

## Prerequisites
- Node.js (v14.x)
- npm
- MongoDB

## Installation

### Clone the Repository
```bash
git clone https://github.com/goncalofm90/Bandspace.git
cd Bandspace
```

### Install Dependencies
```bash
# Install all project dependencies
npm install
```

### Environment Configuration
Create a `.env` file in the project root with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

### Development Mode
```bash
# Start both frontend and backend concurrently
npm run dev
```

### Start Backend Server
```bash
# Run backend server
npm run server
```

### Start Frontend
```bash
# Start React development server
npm run client
```

## Application Ports
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

## Key Features
- User profiles for musicians
- Band member matching
- Discussion Forum (reddit style)
- Live concert streaming (WIP)
- Music merchandise marketplace (WIP)
- Professional networking for musicians

## Project Scripts
Check `package.json` for available scripts, likely including:
- `start`: Start the production server
- `server`: Run backend with nodemon
- `client`: Start React development server
- `dev`: Run both frontend and backend concurrently

## Authentication
- User registration and login
- JWT-based authentication
- Protected routes

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Folder Structure Explained
- `config/`: Configuration files
- `middleware/`: Express middleware
- `models/`: Mongoose data models
- `routes/`: Express route definitions
- `src/`: React frontend source code
- `public/`: Static assets
- `server.js`: Backend entry point

## Debugging Tips
- Ensure MongoDB is running
- Check `.env` file configurations
- Verify Node.js and npm versions

## License
Distributed under the MIT License.

## Contact
Gonçalo Mendes - goncalofm90@email.com

Project Link: [https://github.com/goncalofm90/Bandspace](https://github.com/goncalofm90/Bandspace)