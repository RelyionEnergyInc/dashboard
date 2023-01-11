
# Relyion Power System Dashboard

This project is a utility to monitor battery system status and critical metrics, built with ExpressJS, SQL, and React. 

## Getting Started
*This guide assumes a running local database has been configured in
`db.config.js`, and its schema matched in `datasample.model.js`.*

### 1. Launch the ExpressJS backend

* Using PowersShell (Win) or Terminal (Mac) navigate to the `server` directory

* If it's the first time launching the dashboard on this device, run `npm install`

* Once any dependency installations or updates have finished, run `node server.js`

### 2. Launch the React frontend

* In a separate window, navigate to the `client` directory

* If it's the first time launching the dashboard on this device, run `npm install`

* When finshed, run `npm start` to launch the dashboard interface

*The interface should automatically open in the default browser when ready. If this window is closed or does not open, navigate to [localhost:8081](http://localhost:8081) in any browser.*
