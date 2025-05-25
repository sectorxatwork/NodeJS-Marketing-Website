/**
 * Module dependencies.
 */
var express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path'),
    contentService = require('./services/contentService'),
    os = require('os');

var app = express();
var env = process.env.NODE_ENV || "development";

// Function to find IP address starting with '9.'
function findVpnIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                if (iface.address.startsWith('9.')) {
                    return iface.address;
                }
            }
        }
    }
    return 'localhost'; // Fallback to localhost if no matching IP found
}

try {
  // load port and host
  var PORT = process.env.PORT || 3000;
  var HOST = process.env.HOST || findVpnIp(); // Automatically find VPN IP

  // Client side pages to fall under ~/views directory
  app.set('views', path.join(__dirname, 'views'));

  // Setting Nunjucks as default view
  nunjucks.configure('views', {
    autoescape: false,
    express: app,
    watch: env === 'development'
  });
  
  app.set('view engine', 'html');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));

  // Make content service available to templates
  app.locals.getContent = contentService;

  // Add currentYear to templates
  app.use((req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    next();
  });

  // Add request to templates
  app.use((req, res, next) => {
    res.locals.request = req;
    next();
  });

  // Routes
  require('./routes')(app);

  app.locals.getAssetUrl = function(asset) {
    if(asset){
      asset = asset.split("?");
      asset = asset[0];
      return (asset) ? asset : "";
    }
  };

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
      message: env === 'development' ? err.message : 'Something went wrong!',
      error: env === 'development' ? err : {}
    });
  });

  app.listen(PORT, HOST, function() {
    console.log(`Server started in ${env} mode`);
    console.log(`Start your browser to http://${HOST}:${PORT}`);
  });

} catch (error) {
  console.error('Application failed to start:');
  console.error(error.message);
  process.exit(1);
}

module.exports = app;

