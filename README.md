Description
DiaryPal: Your Personal Digital Journal

DiaryPal is a user-friendly web application that offers a modern and convenient way to keep a digital journal. With DiaryPal, you can capture your thoughts, experiences and memories effortlessly. Seamlessly designed, it provides features like personalized entries, easy filtering by date and an inspiring daily quote to kickstart your writing journey. Dive into self-expression, organize your thoughts and reflect on your journey with DiaryPal.

This application is built using MERN Stack and Jodit Editor where user can pick a calendar date and write a journal entry using all the styles of text editor. Also user can search journal entries for particular month and view, edit or delete them.

Features :
User is authenticated by Login/SignUp.

User can enter their Journal entries using Jodit text Editor.

User can search journal entries for particular month and year.

User can also view, update, delete their Journal entries got from search results.

Users can view navigate through their entries with a user-friendly pagination system, allowing them to view a manageable number of entries per page.

Users get a fresh dose of motivation with daily inspirational quotes displayed on the app's interface

Installation
Clone the repo to your local machine.

On your local repo, run cd client and npm install to install dependencies for frontend.

Open a new terminal and run cd backend and npm install to install dependencies for backend

Create a file titled .env in the backend folder of your local repo. Inside it, you will include your mongodb atlas connection string as ATLAS_URI and api key form api-ninja as API_KEY. Example-

ATLAS_URI = "....."
API_KEY = "...."

Run npm start on both terminal to start the application. Your app should now be running on http://localhost:3000.

Technology:

React:
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

Express:
Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the rapid development of Node based Web applications.

MongoDB:
MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

Node.js :
Node.js is an open-source and cross-platform JavaScript runtime environment.A Node.js app is run in a single process, without creating a new thread for every request.

JSON Web Token:
JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON. Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

BCRYPT:
A library to help you hash passwords.

License
This project is licensed under MIT License.

Contribution
Please let us know how we can improve this project. Issues and pull requests are always welcome.