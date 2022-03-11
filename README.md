# Internship
INTERNSHIP || Vyshnav K U ||  11/03/2022

* This is a ExpressJs, MongoDb CRUD operations Project.
* There are two Db collections named Student and Class.
* Class contains standard and division.
* Student conrtains name, rollNumber, mobilenumber and classid.
* classid in Student is Objectid from Class. So a student's standard and division is stored as ObjectId of corresponding standard and division from Class collection. This method is called population. It is  like a Db inside a Db.
* Mongoose is used to connect Server to MongoDb database in this project.
* The Mongoose operater called "populate()" is used to populate data inside a collection from the ObjectIds.

# Tests
- Postman collection link to test APIs: 
https://www.getpostman.com/collections/42a77471b51d2b09340a


## Technologies used
NodeJs, ExpressJs and mongoDb database. 


## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.


## Getting started
- Clone the repository
```
git clone  https://github.com/unnivyshnav/internship
```
- Install dependencies
```
cd internship
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:5002`

- API Document endpoints





