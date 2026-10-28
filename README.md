# DCIT 26: Laboratory 5 - Express and MongoDB

It is a backend service built with Node.js, Express, MongoDB, and Mongoose that manages student records.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vonnieee-glitch/dcit26-lab5-express-mongodb.git
   cd dcit26-lab5-express-mongodb

2. Install dependencies
    ```bash
    npm install

3. MongoDB Configuration
```bash 
Create a .env file in the root directory (refer to .env.example as a reference):

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lab5_students
``` 
Ensure your local MongoDB Community Server service is running.

The server will automatically connect to MongoDB on startup before listening to HTTP requests.


## How to Run the Server
```bash 
npm run dev
```

## API Routes


| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/health | Check API server health status |
| GET | /api/students | Retrieve all student records |
| GET | /api/students/:id | Retrieve a single student record by ID |
| POST | /api/students | Create a new student record |
| PUT | /api/students/:id | Update an existing student record by ID |
| DELETE | /api/students/:id | Delete a student record by ID |