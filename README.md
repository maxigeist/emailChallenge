# Email Service Challenge

## Overview

This repository contains a solution to the Email Service Challenge, which aims to create a robust email service that abstracts between different email service providers, implements user authentication with JWT, enforces daily email quotas, provides statistics for admin users, and includes comprehensive testing.

## Challenge Goals

- **Email Service Abstraction:** Create a service that abstracts between different email service providers.
- **User Authentication:** Implement JWT-based authentication for user access.
- **Email Quotas:** Limit users to 1000 emails per day.
- **Statistics Endpoint:** Provide admin users with access to statistics on user email usage.
- **Testing:** Include comprehensive tests for reliability.

## Implementation Details

### Technologies Used

- **Language:** TypeScript (Node.js)
- **Framework:** Express.js
- **Authentication:** JWT
- **Database:** PostgreSQL
- **Testing:** Jest
- **Additional Points:** Docker, Gitflow Branching Strategy, Swagger Documentation

### Features

- **Email Service Abstraction:** Abstracts between SendGrid and Mailgun.
- **User Authentication:** Users must register and log in using a username-password flow. JWT tokens expire after 1 hour.
- **Email Quotas:** Users are limited to 1000 emails per day.
- **Statistics Endpoint:** Admin users can access `/stats` endpoint for user email usage statistics.
- **Testing:** Comprehensive tests cover all endpoints, authentication flows, and error cases.

### Additional Points

- **Gitflow Branching:** Follow Gitflow branching strategy for structured development.
- **Swagger Documentation:** Provide Swagger documentation for API endpoints.
- **GitHub actions:** Include an action to check if tests pass before merging to master


## Running the Application

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up PostgreSQL database and configure connection settings in `.env` file.
4. Run migrations using `npm run migrate`.
5. Start the application using `npm start`.


## .env file structure
- **DATABASE_URL**
- **PGADMIN_DEFAULT_EMAIL**
- **TOKEN_SECRET**
- **SENDGRID_API_KEY**
- **MAILGUN_API_KEY**
- **MAILGUN_MAILER_DOMAIN**
- **MAIL_LIMIT**
- **TOKEN_LIMIT**


## Testing

Run tests using:

```bash
npm test

