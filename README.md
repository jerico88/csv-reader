# CSV Reader

CSV Reader is a web application that allows you to upload CSV files, view the data in a tabular format, and search and paginate through the data. It consists of a React frontend and a Node.js backend.

## Features

- Upload CSV files
- View uploaded data in a table
- Search through the data
- Paginate through the data

## Technologies Used

### Frontend

- React
- TypeScript

### Backend

- Node.js
- Express
- csv-parser

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```
git clone https://github.com/jerico88/csv-reader.git
```

2. Install dependencies for the frontend:
```
cd src
npm install
```

3. Install dependencies for the backend:
```
cd server
npm install
```

### Running the Application

1. Start the frontend development server:
```
cd ../src
npm start
```

2. In a separate terminal window, start the backend server:
```
cd ../server
npm start
```

3. Open your browser and navigate to `http://localhost:3000` to access the CSV Reader application.

## Testing

### Frontend
To run the frontend tests:
```
cd ../src
npm test
```

### Backend
To run the backend tests:
```
cd ../server
npm test
```
