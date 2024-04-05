# Project Title - EZDocs

## Introduction
EZDocs is an online docs application where you can create docs and collaborate with your friends and collegues.

## Project Type
Fullstack

## Deplolyed App
Frontend: [https://interface-ideal-2345.netlify.app/]
Backend: [https://interface-ideaal-2345.onrender.com]

## Directory Structure
├─ Backend/
├─ client/
│- server/

## Video Walkthrough of the project
[https://drive.google.com/file/d/1uGs3oyRkSWipEnwbEbhK7i111IaV11BW/view?usp=drive_link]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features

- Secure Authentication and Login Functionality: Implemented a secure login mechanism using password hashing.
- Collaborative document creation: Enables users to write and create document collaboratively online.
- Cursor tracking: Shows the cursor of the other person in the document.
- Chat Availability: Users collaborating together can chat also in real-time to discuss.

## design decisions or assumptions
Desgin Decision
- Chat feature will only be available while collaborating on a document and not otherwise. Decision was made because there might be a need to 
  consistently chat in between users to make decisions while collaboration.

## Installation & Getting started
To run the backend server -

```bash
npm install 
cd Backend
npm run start
```

## Usage
Run the frontend deployed app.
Create your account to login.
Create your docs and collaborate with your frineds or collegues in real time.


## Credentials
Email :- rj3@gmail.com , Password :- rj3


## API Endpoints

POST /api/users/register - create a new user.
POST /api/users/login - login a user.
POST /api/docs/ - create a new document.
GET /api/docs/ - retreive all documents.
PATCH /api/docs/:id - update a document.
DELETE /api/docs/:id - delete a document.


## Technology Stack

- HTML : Provides the structure and content of a web page.
- CSS : Used to style the visual presentation of HTML elements.
- JavaScript : Used for adding interactivity and dynamic behavior to web pages.
- Node.js : Server-side JavaScript runtime environment.
- Express.js : Web application framework for Node.js.
- MongoDB : NoSQL database used for data storage.
- bcrypt : Library for hashing passwords.
- jwt : Library for generating JSON Web Tokens.
- quill : Libraray to provide functionality in documents.
- socket.io : Library to provide real-time connection between different users.


## Team Members

- Rajat Kumar Jangid
- Shlok Gaikwad
- Muzammil Raza Khan
