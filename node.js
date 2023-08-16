const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 8888;
function logRequest(req, res, timer) {
    const timestamp = new Date().toISOString();
    const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '-';
    const responseStatus = res.statusCode;
    const httpMethod = req.method;
    const httpPath = req.url;
    const userAgent = req.headers['user-agent'];
    const hostHeader = req.headers['host'];

    let statusColor;
    if (responseStatus >= 500) {
        statusColor = '\x1b[31m'; // Red
    } else if (responseStatus >= 400 && responseStatus < 500) {
        statusColor = '\x1b[33m'; // Yellow (Orange-like)
    } else if (responseStatus >= 300 && responseStatus < 400) {
        statusColor = '\x1b[36m'; // Cyan (Blue-like)
    } else {
        statusColor = '\x1b[32m'; // Green
    }

    const methodColor = httpMethod === 'GET' ? '\x1b[36m' : httpMethod === 'POST' ? '\x1b[35m' : '\x1b[34m'; // Cyan, Magenta, Blue

    console.log(
        `${timestamp} | ${remoteAddress} | ${statusColor}${responseStatus}\x1b[0m | ${timer}ms | ${methodColor}${httpMethod}\x1b[0m ${httpPath} | User-Agent: ${userAgent} | Host: ${hostHeader}`
    );
}

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/api/healthz', async (req, res) => {
    const timer = Date.now();
    res.sendFile(path.join(__dirname, 'templates', 'healthz.html'));
    logRequest(req, res, Date.now() - timer);
});

app.get('/', (req, res) => {
    const timer = Date.now();
    res.redirect('/en');
    logRequest(req, res, Date.now() - timer);
});

app.get('/:language', async (req, res) => {
    const validLanguages = ['en', 'am', 'ru'];
    const language = req.params.language;
    const timer = Date.now();

    if (!validLanguages.includes(language)) {
        res.redirect('/en');
        logRequest(req, res, Date.now() - timer);
        return;
    }

    try {
        const filePath = path.join(__dirname, 'templates', `index_${language}.html`);
        const content = await fs.readFile(filePath, 'utf-8');
        res.send(content);
    } catch (error) {
        res.redirect('/en');
    } finally {
        logRequest(req, res, Date.now() - timer);
    }
});

app.get('/hotels/:language', async (req, res) => {
    const validLanguages = ['en', 'am', 'ru'];
    const language = req.params.language;
    const timer = Date.now();

    if (!validLanguages.includes(language)) {
        res.redirect('/hotels/en');
        logRequest(req, res, Date.now() - timer);
        return;
    }

    try {
        const filePath = path.join(__dirname, 'templates', `hotels_${language}.html`);
        const content = await fs.readFile(filePath, 'utf-8');
        res.send(content);
    } catch (error) {
        res.redirect('/hotels/en');
    } finally {
        logRequest(req, res, Date.now() - timer);
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
