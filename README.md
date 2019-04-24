# pobu.io
*A peer-to-peer booking platform with WebRTC, React Native Web, Express, Node.js and MongoDB.*


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
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "morgan": "~1.9.0"
  }
```

#### Front-end:
- React Native Web

```json
  "dependencies": {
    "react": "^16.8.*",
    "react-app-polyfill": "^0.2.*",
    "react-art": "^16.8.*",
    "react-dom": "^16.8.*",
    "react-native": "^0.59.*",
    "react-native-web": "^0.11.*"
  }
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

Seed the data
```
 seed
```

Go to the `api` folder and start the server.
```
cd api
npm start
```

Go to the `view` folder and run the script start script.
```
cd view
// For web:
npm run web

// For iOS (Requires Xcode):
npm run ios

// For Android (Requires Android Studio):
npm run android
```

<br />

# About project

### Problem
Services such as Calendly, in their current state doesn't provide direct communication on their platform. 
Therefor the hosts and clients are depended on third-party solutions for communication, then the problem of privacy occurs.

### Solution
A web and mobile based application that allows clients to book appointments with hosts on our platform. We provide live communication without any middle interferance which in term increases the privacy of our users.


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
- [Github Projects](https://github.com/chas-academy/u10-business-idea-pobu/projects/2)

<br />

## Future
*Future plans/ideas*

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
