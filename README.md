Incubyte Front End Interview Solution

This repository contains a React-based front-end web application designed to meet the requirements outlined in the problem statement. Below is a comprehensive explanation of the solution implemented, along with instructions for setup, testing, and additional considerations.

Problem Statement

The objective of this project is to build a simple UI that allows users to:

View a list of users.

Add a user.

Update a user's name and email.

Delete a user.

The solution adheres to the provided User API specification.

User API Specification

User Object

{
  "id": "string",
  "name": "string",
  "email": "string"
}

API Endpoints

GET /users: Returns { users: [ { array of user objects } ] }

GET /users/:id: Returns a single user object.

POST /users: Accepts { name: 'string', email: 'string' } and returns a user object with an ID.

DELETE /users/:id: Returns { success: true/false }.

PATCH /users/:id: Updates a user and returns an empty object.

Features Implemented

1. View Users

Users are fetched from the API and displayed in a tabular format.

2. Add Users

A form allows the addition of new users with fields for name and email.

Validations ensure that email addresses are in a valid format.

The newly added user appears at the top of the list.

3. Update Users

Existing users can be updated using a pre-filled form.

4. Delete Users

Users can be deleted with a confirmation dialog to prevent accidental deletions.

A toaster notification confirms the deletion.

Getting Started

Prerequisites

Ensure the following are installed:

git

Node.js 6+

npm 3+ (bundled with Node.js)

Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd <repository-directory>

Install dependencies:

npm install

### Extra Questions

* If the endpoint required authentication, how would you consider implementing this?
To manage authentication, we can store the token securely after the user logs in and include it in API requests by passing it in the HTTP headers (e.g., Authorization: Bearer <token>). we should also handle token expiration and implement automatic re-authentication when necessary.
* What if we wanted the UI to update based on changes from the server?
For real-time updates, consider using WebSockets, which allow the server to push changes directly to the client. Alternatively, we can use polling or Server-Sent Events (SSE) for periodic updates. Ensure the UI automatically reflects these changes by using state management techniques, such as Redux or the Context API, to trigger re-renders when data is updated.


