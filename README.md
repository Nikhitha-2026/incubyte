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

