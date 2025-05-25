module.exports = function(app) {
  // Home page
  app.get('/', function(req, res) {
    const contentService = require('../services/contentService');
    const content = contentService.getHomeContent();
    res.render('home', { content });
  });

  // About page
  app.get('/about', function(req, res) {
    const contentService = require('../services/contentService');
    const content = contentService.getAboutContent();
    res.render('about', { content });
  });

  // Contact page
  app.get('/contact', function(req, res) {
    const contentService = require('../services/contentService');
    const content = contentService.getContactContent();
    res.render('contact', { content });
  });

  // 404 page
  app.use(function(req, res) {
    res.status(404).render('error', {
      message: 'Page not found',
      error: { status: 404 }
    });
  });
};