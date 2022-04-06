![Logo](https://i.imgur.com/LtCEdEC.png)


# Chronos
A simple Collection tracker app for skills demonstration for Code Éxitos
I named my app Chronos like the Greek god of time Chronos 




## Live Demo

https://chronos-app.azurewebsites.net/


## Tech Stack

**Client:** React, Redux, Ionic, genql

**Server:** Node, NestJS, GraphQl, MongoDB


## Server Repo

Read the documentation for the back end,
take a look to the backend repo 
https://github.com/PENA98/chronos-api.git
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
contact me if you need the value for the .env variables

`REACT_APP_API_URI`



## Run Locally

Clone the project

```bash
  git clone https://github.com/PENA98/chronos-app.git
```

Go to the project directory

```bash
  cd chronos-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ionic Serve
```
For the back end the instructions are on its documentation you can find it at https://github.com/PENA98/chronos-api.git

## Project Structure


```
chronos
├─ .gitignore
├─ capacitor.config.ts
├─ ionic.config.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ components
│  │  ├─ Collection.css
│  │  ├─ Collection.tsx
│  │  └─ collectionItem.tsx
│  ├─ data
│  │  └─ messages.ts
│  ├─ graphql
│  │  ├─ client.ts
│  │  ├─ generated
│  │  │  ├─ guards.cjs.js
│  │  │  ├─ index.d.ts
│  │  │  ├─ index.js
│  │  │  ├─ schema.graphql
│  │  │  ├─ schema.ts
│  │  │  └─ types.cjs.js
│  │  ├─ mutations.ts
│  │  ├─ queries.ts
│  │  └─ schema.gql
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ CollectionItems.css
│  │  ├─ CollectionItems.tsx
│  │  ├─ Home.css
│  │  ├─ Home.tsx
│  │  ├─ SignIn.tsx
│  │  └─ SignUp.tsx
│  ├─ react-app-env.d.ts
│  ├─ redux
│  │  ├─ appMiddle.ts
│  │  ├─ appSlice.ts
│  │  ├─ authMiddle.ts
│  │  ├─ authSlice.ts
│  │  └─ store.ts
│  ├─ reportWebVitals.ts
│  ├─ service-worker.ts
│  ├─ serviceWorkerRegistration.ts
│  ├─ setupTests.ts
│  └─ theme
│     └─ variables.css
└─ tsconfig.json

```

## Screenshots
CI/CD Deployment

![CI/CD](https://imgur.com/FHjT0Xm.png)

You can use gestures like swipe to the right or to the left to edit and delete

![CI/CD](https://imgur.com/d7Acij0.png) 


![CI/CD](https://imgur.com/bx6Wa6u.png) 

## Authors

- [@MaynorPeña](https://github.com/PENA98)
