Quarintainment
Node.js Sequelize web application

https://github.com/shamlin143/Project_Two

https://quarintainment.herokuapp.com/members

This application is a web forum dedicated to collecting and exchanging ideas on family entertainment during the COVID-19 pandemic. The application stores ideas posted by authenticated users. Users may also bestow a post with a "like."

A global health crisis caused by a novel coronavirus named COVID-19 occured in early 2020. In an effort to control the spread of the disease, mandated and voluntary “stay home” orders were enacted. The purpose of the application is to provide users productive entertainment ideas to assist with planning safe activities while enduring a pandemic.

Results
Authenticated user access with password encryption using passport.js library and Sequelize database ORM.
User posts to the database of text input with a timestamp, user id, and post id.
User “like” of a prior post with storage and increment of the number of likes.
Display of prior posts sorted by date or number of likes.
Shared Responsibilities
In an effort to promote learning of Sequelize object relational mapping techniques, the team attempted to share equally in the coding of the server side code.

Model database Sequelize server handled code.
URL and API routing routing code.
Client side jQuery scripting and ajax HTML code.
Individual Responsibilities
Github repository management
User interface HTML page creation.
Application deployment through Heroku.
Challenges
The main challenges encountered were related to model program concerns. Database query and updates using “one to many” relationships presented an obstacle. Post storage presented a problem using the Sequelize ORM. Update of incremental “likes” of a post by the user posed a challenge utilizing the Sequelize method. The primary challenge related to user view concerns involved timestamps using moment.js and COR’s issues. Assistance was obtained from class instructors and aides in code correction and providing of library documentation.

Improvements
Implement score rating instead of likes.
Addition of query by post category.
Addition of updated post input to include photos, video, maps, etc.
In application user communication with chat functionality
Limit of number of likes by a user
Technologies Used
Node.js
Express.js - Routing library
MySql - Database functions.
Sequelize - javascript library Object-Relational-Manager for database management.
Moment.js - javascript library for managing dates.
Passport.js - javascript library for user authentication.
Bcrypt.js - password encryption.
Carousel - CSS library for photo slideshow images in user interface.
