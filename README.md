# M3 - `README.md` 

<br>

## Description

This is an app to create and join private parties. This app allows users to publish their parties, make money from it and meet new people.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start publishing my parties or joining other users' parties.
-  **Login:** As a user I can login to the platform so that I can create or book other people's parties.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Add Parties** As a user I can publish a party.
-  **Edit parties** As a user I can edit a party.
-  **Join a party** As a user I can join a party.
-  **Edit User profile** As a user I can edit my profile.
-  **View party details** As a user I want to see the party details
-  **View User profile** As a user I can see my profile and everyone else's.




## Backlog


-Implement Stripe
-Implement Mapbox
-Implement Chat among owners and attendants
-Make party owners decide whether people can join their party or not


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public `<Route>`            | Home page or search for parties                                |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/parties`            | PartiesListPage   | user only `<PrivateRoute>`  | Shows all parties in a list                              |
| `/parties/add`        | CreateParty   | user only `<PrivateRoute>`  | Create a party                                     |
| `/parties/:id`         | PartyDetails                 | user only `<PrivateRoute>`  | Delete party, edit party, view details                                            |

| `/profile/:id`       | Profile            | user only `<PrivateRoute>`  |  View profile, edit and delete user, edit user's parties                                              |





## Components

- LoginPage

- SplashPage

- PartiesListPage

- PartyDetailsPage

- PartyAttendantsPage

- CreatePartyPage

- ProfilePage

- Search bar

- Buttons

- Navbar


  

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  
- party Service
  - parties.list()
  - party.details(id)
  - party.add(title, description, date, city, street, music genre, age)
  - party.delete(id)
  - party.edit(id)
  
- User Service 

  - User.details(id)
  - User.create(username, password, email)
  - User.delete(id)
  -User.edit(id)




<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  parties: [{type: Schema.Types.ObjectId, ref: "Party"}],
  goingToParties: [{type: Schema.Types.ObjectId, ref:"Party"}],
  reviews: { type: [{ type: Schema.Types.ObjectId, ref: "Review" }, { type: Schema.Types.ObjectId, ref: "Review"}] }
}
```



party model

```javascript
 {
   name: {type: String, required: true},
   description: {type: String, required: true},
   images: {type: Array, required: true},
   date: {type: Date, required: true},
   city: {type: String},
   street: {type: String},
   ageInterval: {type: String},
   musicType: {type: String},
   price: {type: Number},
   attendants: [{type: Schema.Types.ObjectId,ref:'User'}],
   smoking: {type: Boolean}
 }
```






<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/api/parties`                |                              |                | 400          | Show all parties                                         |
| GET         | `/api/party/:id`            | {id}                         |                |              | Show specific party                                     |
| POST        | `/api/parties/create` | {}                           | 201            | 400          | Create and save a new party                             |
| PUT         | `/api/party/:id`       | {name,images,description}           | 200            | 400          | edit party                                              |
| DELETE      | `/api/party/:id`     | {id}                         | 201            | 400          | delete party                                            |
| GET         | `/api/Users/:id`                | {id}                         |                |              | show specific User                                         |
| PUT         | `/api/Users/:id`           | {name,img}                   | 201            | 400          | edit User                                                  |
| DELETE      | `/api/Users/:id`         | {id}                         | 200            | 400          | delete User                                                |


<br>


## Links

### Trello

[Link to our trello board](https://trello.com/b/X0fqMpLK/final-project-ironhack) 


### Git

The url to our repository and our deployed project

[Client repository Link](https://github.com/toniluiscristofol/Project-3-ironhack-frontend)

[Server repository Link](https://github.com/toniluiscristofol/Project-3-ironhack-backend)

[Deployed App Link](https://shappn.herokuapp.com/)


