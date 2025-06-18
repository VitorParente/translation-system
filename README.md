# Translation System

This project is a translation system composed of two main services: a REST API for handling translation requests and a worker service for processing those requests asynchronously through a message queue.

## Project Structure

The project is organized into the following directories:

- **translation-api**: This directory contains the REST API that receives translation requests.
  - **src**: Source code for the API.
    - **controllers**: Contains the logic for handling translation requests.
    - **routes**: Defines the API endpoints.
    - **services**: Contains services for interacting with the message queue.
    - **models**: Defines the data models for translations.
    - **app.js**: Entry point for the API, setting up the server and routes.
  - **package.json**: NPM configuration for the API.
  - **README.md**: Documentation for the API.

- **translation-worker**: This directory contains the worker service that processes translation requests.
  - **src**: Source code for the worker.
    - **services**: Contains logic for translating text and consuming messages from the queue.
    - **models**: Defines the data models for translations, similar to the API.
    - **worker.js**: Entry point for the worker service.
  - **package.json**: NPM configuration for the worker.
  - **README.md**: Documentation for the worker service.

- **database**: Contains the database schema.
  - **schema.sql**: SQL script to create the necessary tables for storing translations and their statuses.

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd translation-system
   ```

2. Install dependencies for the API:
   ```
   cd translation-api
   npm install
   ```

3. Install dependencies for the worker:
   ```
   cd ../translation-worker
   npm install
   ```

4. Set up the database by running the SQL script in `database/schema.sql`.

## Usage

### Starting the API

To start the translation API, navigate to the `translation-api` directory and run:
```
npm start
```
The API will be available at `http://localhost:3000`.

### Starting the Worker

To start the translation worker, navigate to the `translation-worker` directory and run:
```
npm start
```
The worker will listen for messages in the queue and process translation requests.

## API Endpoints

- **POST /translations**: Submit a new translation request.
- **GET /translations/:requestId**: Check the status of a translation request.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.