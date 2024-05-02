## Users

### Get the Current User by ID

Returns the information about the current user that is logged in.

-   Require Authentication: true
-   Request

    -   Method: `GET`
    -   URL: `/api/users/int:id`
    -   Body: none

-   Successful Response when there is a logged in user

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "email": "demo@aa.io",
            "id": 1,
            "username": "Demo"
        }
        ```

### Authentication / Get signed in User

Authenticates a User

Request

-   Method: `GET`
-   URL: `/api/auth`
-   Body: None

-   Successful Response when authenticated:

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "email": "demo@aa.io",
            "id": 1,
            "username": "Demo"
        }
        ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

-   Require Authentication: false
-   Request

    -   Method: `POST`
    -   URL: `/api/auth/login`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "email": "demo@aa.io",
            "password": "password"
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "email": "demo@aa.io",
            "id": 1,
            "username": "Demo"
        }
        ```

### Log Out

Logs out current user

-   Request

    -   Method: `GET`
    -   URL: `/api/auth/logout`
    -   Body: NONE

-   Successful Response:

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Response Body:

    ```json
    {
        "message": "User logged out"
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

-   Require Authentication: false
-   Request

    -   Method: `POST`
    -   URL: /api/auth/signup
    -   Headers:
        -   Content-Type: application/json
    -   Body:
        ```json
        {
            "username": "Demo",
            "email": "demo@aa.io",
            "password": "password"
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "email": "demo@aa.io",
            "id": 1,
            "username": "Demo"
        }
        ```

## Habits

### Get all Habits of the Current User

Returns all the Habits belonging to the current user.

-   Require Authentication: true
-   Request

    -   Method: `GET`
    -   URL: `/api/habits`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            {
                "id": 7,
                "userId": 4,
                "title": "Walk Luna",
                "description": "Two laps around the block",
                "difficulty": 2,
                "frequency": 1,
                "pos": true,
                "neg": true,
                "posCount": 0,
                "negCount": 0,
                "createdAt": "2023-08-22 18:51:53",
                "updatedAt": "2023-08-22 18:51:53"
            },
            {
                "id": 8,
                "userId": 4,
                "title": "Homework",
                "description": "Must sit for an hour",
                "difficulty": 2,
                "frequency": 1,
                "pos": true,
                "neg": true,
                "posCount": 0,
                "negCount": 0,
                "createdAt": "2023-08-22 18:51:53",
                "updatedAt": "2023-08-22 18:51:53"
            }
        }
        ```

### Get Habit by id

Returns the details of a Habit specified by its id.

-   Require Authentication: True
-   Request

    -   Method: `GET`
    -   URL: `/api/habits/int:habit_id`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 7,
            "userId": 4,
            "title": "Walk Luna",
            "description": "Two laps around the block",
            "difficulty": 2,
            "frequency": 1,
            "pos": true,
            "neg": true,
            "posCount": 0,
            "negCount": 0,
            "createdAt": "2023-08-22 18:51:53",
            "updatedAt": "2023-08-22 18:51:53"
        }
        ```

### Create a new Habit

Creates and returns a new Habit.

-   Require Authentication: true
-   Request

    -   Method: `POST`
    -   URL: `/api/habits`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 14,
            "userId": 8,
            "title": "Do the dishes",
            "description": "",
            "difficulty": 2,
            "frequency": 1,
            "pos": true,
            "neg": false,
            "posCount": 0,
            "negCount": 0,
            "createdAt": "2023-08-22 18:51:53",
            "updatedAt": "2023-08-22 18:51:53"
        }
        ```

-   Successful Response

    -   Status Code: 201
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 14,
            "userId": 8,
            "title": "Do the dishes",
            "description": "",
            "difficulty": 2,
            "frequency": 1,
            "pos": true,
            "neg": false,
            "posCount": 0,
            "negCount": 0,
            "createdAt": "2023-08-22 18:51:53",
            "updatedAt": "2023-08-22 18:51:53"
        }
        ```

### Update a Habit

Updates and returns an existing Habit.

-   Require Authentication: true
-   Require proper authorization: Habit must belong to the current user
-   Request

    -   Method: `PUT`
    -   URL: `/api/habits/int:habit_id`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "habit_id": 14,
            "frequency": 2
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 14,
            "userId": 4,
            "title": "Walk the dog",
            "description": "Two laps around the block",
            "difficulty": "Easy",
            "frequency": 1,
            "pos": true,
            "neg": true,
            "posCount": 0,
            "negCount": 0,
            "createdAt": "2023-08-22 18:51:53",
            "updatedAt": "2023-08-22 19:27:79"
        }
        ```

### DELETE a Habit

Deletes an existing Habit.

-   Require Authentication: true
-   Require proper authorization: Habit must belong to the current user
-   Request

    -   Method: `DELETE`
    -   URL: `/api/habits/int:habit_id`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "message": "Successfully deleted"
        }
        ```

## To-Dos

### Get all To-dos

Returns all the To-dos belonging to the current user.

-   Require Authentication: true
-   Request

    -   Method: `GET`
    -   URL: `/api/todos`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
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
        }
        ```

### Get To-do by id

Returns the details of a To-do specified by its id.

-   Require Authentication: True
-   Request

    -   Method: `GET`
    -   URL: `/api/todos/int:todo_id`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 1,
            "title": "Buy groceries",
            "description": "Get milk, bread, and cheese",
            "user_id": 123
        }
        ```

### Create a new To-do

Creates and returns a new To-do.

-   Require Authentication: true
-   Request

    -   Method: `POST`
    -   URL: `/api/todos`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 3,
            "title": "Finish project",
            "description": "Complete the final report and review code",
            "user_id": 123
        }
        ```

-   Successful Response

    -   Status Code: 201
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 3,
            "title": "Finish project",
            "description": "Complete the final report and review code",
            "user_id": 123
        }
        ```

### Update a To-do

Updates and returns an existing To-do.

-   Require Authentication: true
-   Require proper authorization: To-do must belong to the current user
-   Request

    -   Method: `PUT`
    -   URL: `/api/todos/int:todo_id`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "title": "Visit doctor",
            "description": "Routine check-up at 3 pm"
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 2,
            "title": "Visit doctor",
            "description": "Routine check-up at 3 pm",
            "user_id": 123
        }
        ```

### DELETE a To-do

Deletes an existing To-do.

-   Require Authentication: true
-   Require proper authorization: To-do must belong to the current user
-   Request

    -   Method: `DELETE`
    -   URL: `/api/todos/int:todo_id`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "message": "Successfully deleted"
        }
        ```

## Dailies

### Get all Dailies

Returns all the Dailies belonging to the current user.

-   Require Authentication: true
-   Request

    -   Method: `GET`
    -   URL: `/api/dailies`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            {
                "id": 1,
                "user_Id": 1,
                "title": "Water House Plants",
                "description": "Give palm tree a full water can amount and give cactus a little spray",
                "repeats_frame": 1,
                "repeats_frequency": 2,
                "streak": 5,
                "completed": false,
                "due_date": "2024-12-12"
            },
            {
                "id": 2,
                "user_Id": 1,
                "title": "Work Out",
                "description": "Following the app on the phone",
                "strength": 1,
                "repeats_frame": 1,
                "repeats_frequency": 5,
                "streak": 5,
                "completed": false,
                "due_date": "2025-08-15"
            }
        }
        ```


### Get Daily by id

Returns the details of a Daily specified by its id.

-   Require Authentication: True
-   Request

    -   Method: `GET`
    -   URL: `/api/dailies/int:daily_id`
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 1,
            "user_Id": 1,
            "title": "Water House Plants",
            "description": "Give palm tree a full water can amount and give cactus a little spray",
            "repeats_frame": 1,
            "repeats_frequency" : 2,
            "streak": 5,
            "completed" : false,
            "due_date" : "2023-09-10",
        }
        ```


### CREATE NEW DAILY

Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Response Body:
{

}


### Create a new Daily

Creates and returns a new Daily.

-   Require Authentication: true
-   Request

    -   Method: `POST`
    -   URL: `/api/dailies`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "title": "Clean out Fridge",
            "description": "Take out any leftovers, wipe down shelves, check for expired items to toss",
            "repeats_frame": 7,
            "repeats_frequency": 1
        }
        ```

-   Successful Response

    -   Status Code: 201
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 5,
            "user_Id": 1,
            "title": "Clean out Fridge",
            "description" : "Take out any leftovers, wipe down shelves, check for expired items to toss",
            "repeats_frame": 7,
            "repeats_frequency" : 1,
        }
        ```


### Update a Daily

Updates and returns an existing Daily.

-   Require Authentication: true
-   Require proper authorization: To-do must belong to the current user
-   Request

    -   Method: `PUT`
    -   URL: `/api/daily/int:daily_id`
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "title" : "Clean out Fridge",
            "description": "CLeaned, Just make ice",
            "repeats_frame": 7,
            "repeats_frequency": 1
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
            "id": 5,
            "user_Id": 1,
            "title": "Clean out Fridge",
            "description" : "CLeaned, Just make ice",
            "repeats_frame": 7,
            "repeats_frequency" : 1,
        }
        ```

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
