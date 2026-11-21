const fs = require('fs');
const path = require('path');

const mimeMap = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

module.exports = (req, res) => {
  const urlParam = req.query ? req.query.url : null;
  if (!urlParam) {
    res.statusCode = 400;
    return res.end('Missing url parameter');
  }

  try {
    // Decode the URL param (e.g. /media/Z0ToauDx7Eve/...)
    let cleanPath = decodeURIComponent(urlParam).split('?')[0].replace(/^\/+/, '');

    // Prevent directory traversal
    const safePath = path.normalize(cleanPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(process.cwd(), 'public', safePath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.statusCode = 404;
      return res.end('Image not found: ' + safePath);
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.end('Server error: ' + err.message);
  }
};
