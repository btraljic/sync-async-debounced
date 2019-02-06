## sync-async-debounced (React Time Slicing)

After I have seen Dan Abramov's presentation [Beyond React 16](https://www.youtube.com/watch?v=nLF0n9SACd4) in JSConf Iceland 2018 I was interested in Time Slicing. I tried to create an application that was shown in the presentation. That made me to study the React code and especially [Scheduler](https://github.com/facebook/react/blob/master/packages/scheduler/src/Scheduler.js) package. 

Scheduler package is still in the early stages of development and I do not know which direction to go, but it is definitely a useful improvement of the react library (framework?).  
I will try to be up to date with the development. It is currently compliant with version 16.7.0 

Demo: https://btraljic.github.io/sync-async-debounced/  
GitHub repo: https://github.com/btraljic/sync-async-debounced 

At first, I used `unstable_scheduleCallback`:  
```javascript
unstable_scheduleCallback(() => { 
  this.setState({ chars }); 
});
```
(`chars` contain string length that determines the complexity of the charts) 

Time Slicing worked properly, but, for this example, with unnecessary schedule render. In the example, we are only interested in the last state of the charts. So, I upgraded the logic using `unstable_getFirstCallbackNode` and `unstable_cancelCallback` and eliminated unnecessary rendering: 
```javascript(chars contain string length that determines the complexity of the charts) 
const firstNode = unstable_getFirstCallbackNode(); 

if (firstNode) { 
  unstable_cancelCallback(firstNode); 
}

unstable_scheduleCallback(() => { 
  this.setState({ chars }); 
});
```
I will try to track the development of Time Slicing. Feel free to join.
  
  
  
##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
