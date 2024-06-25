# Fugitive Capture Game - Backend

This project is part of a fugitive capture game where players select cities and vehicles for cops to capture a fugitive. It includes a backend built with Node.js, Express, and other technologies.

## Features

- Handle requests to select cities and vehicles for each cop.
- Process and store selections to capture the fugitive.
- Provide the result of the capture operation.

## Technologies Used

- Node.js
- Express for handling HTTP requests
- MongoDB for data storage
- Mongoose for MongoDB object modeling

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/sanjitsarkar/yocket_backend
cd yocket_backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000
MONGODB_URI=<your_mongodb_uri>
```

4. **Start the server:**

```bash
npm start
```

The server will start running on [http://localhost:8000](http://localhost:8000).

## Folder Structure

- `src/`: Contains all source code for the backend.
  - `controllers/`: Handles the business logic of the application.
  - `models/`: Defines the data models for MongoDB.
  - `routes/`: Defines the API routes.
  - `middlewares/`: Contains custom middleware functions.
  - `config/`: Contains configuration files.
  - `services/`: Contains services for the application.
  - `repositories/`: Contains repositories for data access.
  - `types/`: Contains type definitions.
  - `server.ts`: Entry point of the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
