This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run the application

Runs the app using `npm start` and then
open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Trigger Batch request

Upon launch, click `Initialise test`. 

It will trigger three requests from to the backend which will be intercepted by `interceptor.js` and then after 5 seconds a single requests will be triggered to backend with all the unique params of all three request.

Upon receiving response, three apis will print the response on the console.


#### Further development

Since backend api is not returning response in the desired format at the moment, there is a task to individually map the batch api response to original three api requests. More details in the comments of `interceptor.js`


