# pobu.io
*A peer-to-peer booking platform with WebRTC, React, Express, Node.js and MongoDB.*


![Logo](docs/pobu2.png)

![Logo](docs/logo.png) 


[twitter](https://twitter.com/pobu_io)

[instagram](https://instagram.com/pobu.io)

<br />

## Table of Contents

* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [About project](#about-project)
  * [Problem](#problem)
  * [Solution](#solution)
* [Planning](#planning)
  * [Personas](#personas)
  * [User stories](#user-stories)
  * [Entity Relationship Diagram](#entity-relationship-diagram)
  * [Kanban](#kanban)
  * [Future](#future)
* [Visual design](#visual-design)
  * [Wireframes w/ descriptions](#wireframes-with-descriptions)
* [Team](#team)

<br />

# Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes.
### Prerequisites
#### Back-end:
- MongoDB
- Express
- Node.js
- WebRTC

```json
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~4.1.1",
    "dotenv": "^8.0.0",
    "express": "^4.16.4",
    "http-errors": "~1.7.2",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.24.0",
    "moment-timezone": "^0.5.25",
    "mongoose": "^5.5.7",
    "mongoose-timestamp": "^0.6.0",
    "morgan": "~1.9.1",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1",
    "validator": "^10.11.0"
  },
```

#### Front-end:
- React 16.8

```json
  "dependencies": {
    "axios": "^0.18.0",
    "normalize.css": "^8.0.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router": "^5.0.0",
    "react-router-dom": "^5.0.0",
    "react-scripts": "3.0.1",
    "react-swipeable-routes": "^0.6.0"
  },
```
<br />

### Installation
Clone the repo
```
git clone https://github.com/chas-academy/u10-business-idea-pobu/
```

Change to the `api` folder and install development and production dependencies.

```
cd api
npm install
```

Change to the `view` folder and install development and producation dependencies.
```
cd view
npm install
```

You will need to set up MongoDB. 


Go to the `api` folder and start the server.
```
cd api
npm server
```

Go to the `view` folder and run the script start script.
```
cd view
npm run start

```

<br />

# About project

### Problem
Services such as Calendly, in their current state doesn't provide direct communication on their platform. 
Therefore the hosts and clients are dependent on third-party solutions for communication, that creates an issue of privacy.

### Solution
A web based application that allows clients to book appointments with hosts on our platform. We provide live communication without any middle interferance which in term increases the privacy of our users.


<br />

# Planning

<br />


## Personas
- Clients
- Hosts
- Admins


<br />

## User Stories

<br /> 

## Entity Relationship Diagram
- ![ER | ER ](docs/er.png)

<br />

## Kanban
- [Github Projects](https://github.com/okan-s/pobu/projects/1)

<br />

## Future
*Future plans/ideas*

When Expo SDK v33 is released, convert the view to native-web.

<br />

# Visual design 

<br />

## Wireframes with descriptions
#### Client view
- ![Mobile First | Client View](docs/wireframe-1.png)
#### Host View
- ![Mobile First| Host View](docs/wireframe-1.png)

<br />

# Team
- [Okan](https://github.com/okan-s)
- [Esra](https://github.com/esraod)
