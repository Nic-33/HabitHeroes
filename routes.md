# Users

## GET user by id

### Returns a dictionary with a users information
` GET '/api/users/int:id'`
* Request Body: NONE
* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

    ```json
    {
      "email": "demo@aa.io",
      "id": 1,
      "username": "Demo"
    }
    ```

# Authentication
## Get signed in user
### Authenticates a user
` GET '/api/auth/'`
* Request Body: NONE
* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

    ```json
    {
      "email": "demo@aa.io",
      "id": 1,
      "username": "Demo"
    }
    ```
# Log in
##  Logs a user in
`POST '/api/auth/login'`
* Request Body:
    ```json
    {
      "email": "demo@aa.io",
      "password": "password"
    }
    ```

* Successful Response:
* Status Code: 200
* Headers:
  * Content-Type: application/json
* Response Body:

```json
{
  "email": "demo@aa.io",
  "id": 1,
  "username": "Demo"
}
```

# Log Out
## Logs a user out
`GET '/api/auth/logout'`
* Request Body: NONE
* Successful Response:
* Status Code: 200
* Headers:
  * Content-Type: application/json
* Response Body:

```json
{
  "message": "User logged out"
}
```

# Sign Up
## Creates a new user and signs them in
`POST '/api/auth/signup'`
* Request Body:

```json
{
  "username": "Demo"
  "email": "demo@aa.io",
  "password": "password"
}
```

* Successful Response:
* Status Code: 200
* Headers:
  * Content-Type: application/json
* Response Body:

```json
{
  "email": "demo@aa.io",
  "id": 1,
  "username": "Demo"
}
```

Habits
GET all habits of current user
Returns an array of the habits belonging to signed-in user
Requires Authentication
GET /api/habits
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
  [{
    'id': 7,
    'userId': 4,
    'title': 'Walk Luna',
    'notes': 'Two laps around the block',
    'difficulty': 2,
    'frequency': 1,
    'strength': 0,
    'pos': true,
    'neg': true,
    'posCount': 0,
    'negCount': 0,
    'createdAt': '2023-08-22 18:51:53',
    'updatedAt': '2023-08-22 18:51:53'
  }]
CREATE a new habit
Returns the newly created habit
Requires Authentication
POST /api/habits
Request Body:
{
  'user_id': 8,
  'title: 'Do the dishes',
  'notes': "Start with large pans",
  'difficulty': 1,
  'pos': true,
  'neg': false,
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
  [{
    'id': 14,
    'userId': 8,
    'title': 'Do the dishes',
    'notes': '',
    'difficulty': 2,
    'frequency': 1,
    'strength': 0,
    'pos': true,
    'neg': false,
    'posCount': 0,
    'negCount': 0,
    'createdAt': '2023-08-22 18:51:53',
    'updatedAt': '2023-08-22 18:51:53'
  }]
UPDATE a habit
Returns the habit with updated values
Requires Authentication
PUT /api/habits/int:habit_id
Request Body:
{
  'habit_id': 14,
  frequency: 2
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
  [{
    'id': 14,
    'userId': 4,
    'title': 'Walk the dog',
    'notes': 'Two laps around the block',
    'difficulty': 'Easy',
    'frequency': 1,
    'strength': 'Neutral',
    'pos': true,
    'neg': true,
    'posCount':0,
    'negCount': 0,
    'createdAt': '2023-08-22 18:51:53',
    'updatedAt': '2023-08-22 19:27:79'
  }]
DELETE a habit
Returns a success message
Requires Authentication
DELETE /api/habits/int:habit_id
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{ 'message': 'success' }
To-Dos
Get all To-dos
List all to-dos for a user
Requires Authentication
GET /users/int:user_id/todos
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Get milk, bread, and cheese",
    "user_id": 123
  },
  {
    "id": 2,
    "title": "Go to the gym",
    "description": "Leg day workout",
    "user_id": 123
  }
]
Get To-do by id
View a single to-do for a user
Authorization Required
GET /users/int:user_id/todos/int:todo_id
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Get milk, bread, and cheese",
  "user_id": 123
}
POST new To-Do
Create a new to-do for a user
Authorization Required
POST /users/int:user_id/todos
Request Body:
{
  "title": "Finish project",
  "description": "Complete the final report and review code"
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  "id": 3,
  "title": "Finish project",
  "description": "Complete the final report and review code",
  "user_id": 123
}
Update a to-do
Updates a preexisting to-do
Requires Authorization
**PUT ** /users/int:user_id/todos/int:todo_id
Request Body:
{
  "title": "Visit doctor",
  "description": "Routine check-up at 3 pm"
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  "id": 2,
  "title": "Visit doctor",
  "description": "Routine check-up at 3 pm",
  "user_id": 123
}
Delete a to-do
Returns a success message and removes the to-do from the database
Requires Authorization
DELETE /users/int:user_id/todos/int:todo_id
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  "message": "Deleted successfully"
}
Daily Routes:
Get all Dailies
Get all records of Dailies under the signed in users's id from the database
Authorization Required
GET _/api/dailies _
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
[{
  “id”: 1,
  “user_Id”: 1,
  “title”: “Water House Plants”,
  “description”: “Give palm tree a full water can amount and give cactus a little spray”,
  "strength": 1
  “repeats_frame”: 1,
  “repeats_frequency” : 2,
  “streak”: 5,
  “completed” : false,
  “due_date” : “2023-09-10”,
}]
GET DAILY BY ID
Get a Daily record from database by id
Requires Authentication
GET /api/dailies/int:id
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  “id”: 1,
  “user_Id”: 1,
  “title”: “Water House Plants”,
  “description”: “Give palm tree a full water can amount and give cactus a little spray”,
  "strength": 1
  “repeats_frame”: 1,
  “repeats_frequency” : 2,
  “streak”: 5,
  “completed” : false,
  “due_date” : “2023-09-10”,
}
CREATE NEW DAILY
Enter a new Daily record into the Database and return a dictionary object of the new record
Requires Authentication
POST /api/dailies
Request Body:
{
  “title”: “Clean out Fridge”,
  “description”: “Take out any leftovers, wipe down shelves, check for expired items to toss”,
  “repeats_frame”: 7,
  “repeats_frequency”: 1
  "strength" : 3
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
 “id”: 1,
 “user_Id”: 1,
 “title”: “Water House Plants” ,
 “description” : “Give palm tree a full water can amount and give cactus a little spray”,
 "strength": 3
 “repeats_frame”: 1,
 “repeats_frequency” : 2,
 “streak”: 5,
 “completed” : false,
 “due_date” : “2023-09-10”,
}
UPDATE DAILY
Change the record in the database and return a dictionary of the updated version
Authentication Required
PUT /api/daily/int:id
Request Body:
{
  “title” : “Clean out Fridge”,
  “description”: “Take out any leftovers, wipe down shelves, check for expired items to toss” ,
  “repeats_frame”: 7,
  “repeats_frequency”: 1
  "strength": 3
}
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
 “id”: 1,
 “user_Id”: 1,
 “title”: “Water House Plants” ,
 “description” : “Give palm tree a full water can amount and give cactus a little spray” ,
 “repeats_frame”: 1,
 “repeats_frequency” : 2,
 “streak”: 5,
 “completed” : false,
 “due_date” : “2023-09-10”,
}
Update Daily- Completed
Toggle the completed status on a daily and adjust the streak
Authentication Required
PUT /api/daily/int:id/completed
Request Body: NONE -- Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
 “id”: 1,
 “user_Id”: 1,
 “title”: “Water House Plants” ,
 “description” : “Give palm tree a full water can amount and give cactus a little spray” ,
 “repeats_frame”: 1,
 “repeats_frequency” : 2,
 “streak”: 5,
 “completed” : false,
 “due_date” : “2023-09-10”,
}
DELETE DAILY
Remove a record of a daily from the database and return a success message
Requires Authentication
DELETE /api/daily/int:id
Request Body: None
Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{
  “Message”: “Successfully deleted”
}
