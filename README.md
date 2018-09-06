# illustration-webform

> A webform for SquaredLabs's illustration service

## Features

* File Storage

* CAS Authentication

* Admin Management

* Email Notifications

## Screenshots


### Initial Request Form
![Request Form]("https://i.imgur.com/cNrOaJH.png")

### Admin Page
![Admin Page]("https://i.imgur.com/GAhp03I.png")

### Admin Management
![Admin Management]("https://i.imgur.com/lI7kBgH.png")

### Request Info
![Request Info]("https://i.imgur.com/7ExjnKH.png")

### Illustration Contract
![Illustration Contract]("https://i.imgur.com/OcV5JhM.png")

## Build Setup
**Note**: Requires UCONN CAS Login. To remove login dependency:
`api/admin.js`
```javascript
// Require API routes
const login = require("./routes/login")
app.use(login) // Comment out/remove this line.
```

``` bash
# install dependencies
$ npm install # Or yarn install

# Create config file (Edit .env with your info)
# A valid email address is NOT necessary; the app will throw errors but otherwise work (minus the emails)
$ cp .env.example .env

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
# Will NOT work without SSR mode. (Do not use generate or build)
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
