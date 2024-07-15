# Entrepreneurial Idea Showcase Platform

This project is a web application designed to facilitate the submission, evaluation, and investment in entrepreneurial business ideas. Entrepreneurs can submit their ideas, prototypes, and business plans, which are then reviewed and scored by Judge-Sponsors. Events are managed by Event Coordinators, and the overall platform administration is handled by Admins.

## Table of Contents

- [Features](#features)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [License](#license)

## Features

- User Authentication and Authorization
- Submission Management
- Event Management
- Feedback and Scoring System
- Investment Tracking
- Real-time Notifications
- User Profiles
- Messaging System

## User Roles

1. **Entrepreneur**
   - Submit and manage business ideas and prototypes.
   - Receive feedback and track investments.
   - Schedule presentations and participate in events.

2. **Judge-Sponsor**
   - Review, score, and provide feedback on submissions.
   - Invest in business ideas.
   - Schedule meetings with entrepreneurs.

3. **Event Coordinator**
   - Manage events and track participants.
   - Coordinate with entrepreneurs and Judge-Sponsors.

4. **Admin**
   - Oversee the entire platform.
   - Manage users, submissions, and events.
   - Generate reports and handle platform settings.

## API Endpoints

### User Management
- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user by ID.
- **DELETE /users/:id**: Delete a user by ID.

### Submissions
- **GET /submissions**: Retrieve a list of all submissions.
- **GET /submissions/:id**: Retrieve a specific submission by ID.
- **POST /submissions**: Create a new submission.
- **PUT /submissions/:id**: Update an existing submission by ID.

### Feedback
- **GET /feedback**: Retrieve a list of all feedback.
- **POST /feedback**: Create new feedback.

### Investments
- **GET /investments/:id**: Retrieve a specific investment by ID.
- **POST /investments**: Create a new investment.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
