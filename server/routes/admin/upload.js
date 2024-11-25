const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../../middleware/auth');

const upload = multer({ dest: __dirname + '/../../uploads' });
//const BASE_URL = 'http://121.199.62.17:3000';  //客户服务器
//const BASE_URL = 'http://144.48.241.81:3000'; 自己的服务器
const BASE_URL = 'http://www.seedmediastudio.com:3000'||'http://seedmediastudio.com:3000'||'http://pc2.seedmediastudio.com:3000';
//const BASE_URL = 'http://localhost:3000';
router.post(
  '/',
  authMiddleware(),
  upload.single('file'),
  async (req, res) => {
    const file = req.file;
    file.url = `${BASE_URL}/uploads/${file.filename}`;
    console.log(file);
    res.send(file);
  }
);

module.exports = router;
