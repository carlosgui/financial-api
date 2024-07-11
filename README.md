# Financial API

This repository contains a RESTful API for financial transactions and management.

## Features

- **User Management**: Allows creation, deletion, and management of user accounts.
- **Transaction Handling**: Supports various financial transactions such as deposits, withdrawals, and transfers.
- **Persistence**: Stores transactional data in a session.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/carlosgui/financial-api.git
   ```

2. Navigate into the project directory:

   ```bash
   cd financial-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   NOTE: Before install dependencies be sure that you are using node 21.x.x this project was create in this version of node.

4. Start the development server:

   ```bash
   nodemon app-v2.js
   ```

5. Open your browser and visit `http://localhost:5000` to view the application.

## API Endpoints

- **POST /event/:type/:amount**: Create a new account.
- **POST /event/:type/:amount:/destination**: Deposit or Withdraw from a account
- **POST /event/:type/:amount:/destination/:origin**: Transfer from origin to destination
- **GET /balance/:destination**: Get the balance for a given account
- **GET /accounts**: Get all created accounts

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature-name).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/your-feature-name).
- Submit a pull request.

### License

This project is licensed under the MIT License.