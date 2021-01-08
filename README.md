# Dependency

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
Requires node.js v10+.  
Also depends on bitcoin_explorer_api(backend project). 

### Preview
`cd bitcoin_explorer`  
`npm install`  
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Test   
`npm test`

### Build for deployment 
`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### Docker
`docker build -t bitcoin_explorer . && docker run -p 3000:3000 bitcoin_explorer`
