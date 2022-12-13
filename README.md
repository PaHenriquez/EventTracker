# Project - EventTracker React Application

The purpose of **EventTracker** is to give people a way to organize their tasks in a calendar-like web application. This responsive web design will help sort out events designated for specific days and can be accessed through the web or on a mobile device as well.


## User Stories

The following functionalities are **required**:

- [x] User can sign up and login (emails must be encrypted in the database)
- [x] Landing page after successful login should only display data/events associated with that user
- [x] Allow users to add events, delete events, and <ins>update events (Backend: Complete | Frontend: In Progress).</ins>
- [x] Implement a calendar design to draw out the events from that user onto the frontend

Other optional functionalities:
- [ ] Search Filters
- [ ] Sorting Functionality by event name/date
- [ ] Date filters for event list (range: in a week, in a month, in 2 months, within the year)
- [ ] Notes/Reminder page
- [ ] Profile Page (for more user information)
- [ ] A Chat for those attending the same events

## Notes

Running the Application: 

Installation
- Any Text Editor of your choice
- Postman (for backend endpoint testing)
- Git: https://git-scm.com/download/win
- Nodejs: https://nodejs.org/en/download/

use command: git clone https://github.com/andersontan1998/EventTracker.git to clone a copy of this repo in windows/mac terminal

Open VS code
- open two terminals
- cd one terminal to the frontend folder and the other terminal to the backend folder
- in both terminals do "npm install" to install dependencies
- on the backend terminal, use command "npm run dev" to start the backend server
- on the frontend terminal, use command "npm start" to start the frontend local host react application simultaneously (while backend server is also active)

If not already, do this: 
- to use mongodb atlas online, create an account, get the MONGO_URI, and paste it in the .env file <br>
---> MONGO_URI = "someuri32141324sadsa..."
<br> https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/
- in the same .env file, create a secret key for the json web token <br>
---> SECRET = "somesecretkey121398219084902148..."

<br>
<br>
For any of the following errors relating to:

Nodemon: 

"nodemon is not recognized as internal or external command, operable program or batch file"

You need to install nodemon globally by using command: npm install -g nodemon



