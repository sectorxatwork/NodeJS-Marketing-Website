// Random JavaScript from CDN
const lodashScript = document.createElement('script');
lodashScript.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';
document.head.appendChild(lodashScript);

lodashScript.onload = () => {
    console.log('Lodash loaded:', _.VERSION);
};

// Comments about the packages used in the app
/*
Packages used in this app:
- express: Web framework for Node.js
- nunjucks: Templating engine
- dotenv: Environment variable management
- @ibm-org/welcome: Custom greeting package
- body-parser: Middleware for parsing request bodies
- cookie-parser: Middleware for parsing cookies
- morgan: HTTP request logger middleware
- serve-favicon: Middleware for serving favicons
- async: Utility for working with asynchronous JavaScript
- debug: Small debugging utility
*/ 