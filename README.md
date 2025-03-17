# My Next.js App

This is a Next.js application that uses MySQL for data storage and Tailwind CSS for styling. The application captures web analytics and stores the data in a MySQL database.

## Features

- Custom App component for global styles and layout
- API route for capturing web analytics
- Tailwind CSS for responsive design

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- MySQL database

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd my-nextjs-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Set up your MySQL database and update the connection details in `utils/db.js`.

### Running the Application

To run the application in development mode, use the following command:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

### Capturing Web Analytics

The application includes an API route at `/api/analytics` that accepts POST requests to store analytics data. You can send data to this endpoint to log user interactions.

### Tailwind CSS

Tailwind CSS is included for styling. You can customize the styles in `public/styles/tailwind.css` and configure Tailwind in `tailwind.config.js`.

## License

This project is licensed under the MIT License.