const express = require('express');
const app = express();
const PORT = 8888;
const HOST = 'localhost';
const winston = require('winston');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/static/')) {
      next();
    } else {
      winston.info({
        message: 'Request received',
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      });
      next();
    }
});


const customFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, method, url, ip }) => {
      return JSON.stringify({ timestamp, level, message, method, url, ip });
  })
);

 
winston.configure({
    level: 'debug',
    format: customFormat,
    transports: [
        new winston.transports.Console(),
    ],
});
  

app.use((err, req, res, next) => {
    winston.error({
        message: 'Error occurred',
        error: err.message,
        stack: err.stack,
    });
    if (res.statusCode === 500) {
        return res.status(500).render('server-error');
    }
    res.status(500).json({ error: 'Internal Server Error' });
});


app.get('/api/healthz', (req, res) => {
    winston.info('Processing request at /api/healthz');
    res.render('healthz');
});


app.get('/', (req, res) => {
  winston.info('Processing request at /');
  winston.info('Processing redirect to /en');
  res.redirect('/en');
});


app.get('/en', (req, res) => {
    winston.info('Processing request at /en');
    res.render('index_en');
});


app.get('/ru', (req, res) => {
    winston.info('Processing request at /ru');
    res.render('index_ru');
});


app.get('/am', (req, res) => {
    winston.info('Processing request at /am');
    res.render('index_am');
});


app.get('/hotels', (req, res) => {
    winston.info('Processing request at /hotels');
    winston.info('Processing redirect to /hotels/en');
    res.redirect('/hotels/en');
});


app.get('/hotels/en', (req, res) => {
    winston.info('Processing request at /hotels/en');
    res.render('hotels_en');
});


app.get('/hotels/ru', (req, res) => {
    winston.info('Processing request at /hotels/ru');
    res.render('hotels_ru');
});


app.get('/hotels/am', (req, res) => {
    winston.info('Processing request at /hotels/am');
    res.render('hotels_am');
});


app.use((req, res) => {
    winston.warn('Request for undefined route', { url: req.originalUrl, ip: req.ip });
    res.status(404).render('not-found');
});


app.listen(PORT, () => {
  winston.info(`Server started: http://${HOST}:${PORT}`);
});
