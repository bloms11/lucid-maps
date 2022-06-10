# lucid-maps
 Lucid-maps is a map pinning travel app using React hooks, Mapbox, Express, Node and MongoDB. It's a really fun app designed for users to leave a review of places they've been to, anywhere in the world in the form of pins. Users can see other pins on the map with color distinction of the pins. User logins are also stored in local storage after login to prevent logging out after the page refreshes. Every pin is displayed on load. This is my favorite MERN stack app. It was really fun building it. It's super cool and really easy to use.
 
# How To Use
It's quite simple. Just do the following...

- Login/Register in order to add a pin to the map.
- After login/registration, right click(for PC, hold for mobile devices) for form to pop up.
- Fill in the form and your reviews and ratings.
- Submit
- Logged in/current user pin is orange in color, while other user pins are blue in color.

# Demo


![Screenshot (14)](https://user-images.githubusercontent.com/57482590/173156505-58580f79-29fa-48a3-be2a-bd864b713c2a.png)


https://user-images.githubusercontent.com/57482590/173157221-93da2520-eaf0-466a-b606-52cdb5c7e70e.mp4

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL = mongodb key`

Go to the project directory(backend)

```bash
  cd my-project
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Go to the project directory(frontend)

```bash
  cd my-project
  cd frontend
```
Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm start
```

## Tech Stack

**Client:** React, CSS, Mapbox

**Server:** Node, Express, MongoDB

## Futer Scope
- Add an image model for users to add photos of locations for further display.

## Contributing

Contributions are always welcome!

See [Contributions](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) for ways to get started.
