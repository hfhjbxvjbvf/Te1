module.exports = (app) => {
  const express = require('express');
  const assert = require('http-assert');
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser');
  const Product = require('../../models/Product'); // 引入产品模型
  const sendEmail = require('../../plugins/sendEmail.js');
  const router = express.Router({
    mergeParams: true,
  });

  // 创建产品
  router.post('/products', async (req, res) => {
    const product = await Product.create(req.body);
    res.send(product);
  });

  // 更新产品
  router.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send(product);
  });

  // 删除产品
  router.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  // 获取所有产品
  router.get('/products', async (req, res) => {
    const products = await Product.find().limit(100);
    res.send(products);
  });

  // 获取单个产品
  router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  });

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth');

  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource');

  // 资源路由
  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  // 本地图片上传
  const multer = require('multer');
  const upload = multer({
    dest: __dirname + '/../../uploads',
  });
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  // 第一次登录把注册注释取消
  app.post('/admin/api/register', async (req, res) => {
    const user = await AdminUser.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(user);
  });

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({
      username,
    }).select('+password');
    assert(user, 422, '用户不存在');
    const isValid = require('bcryptjs').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
    const token = jwt.sign(
      {
        id: user._id,
      },
      app.get('secret')
    );
    res.send({
      token,
      username,
    });
  });

  app.post('/admin/api/email', async (req, res) => {
    sendEmail(req.body);
    res.send({
      ok: 'ok',
    });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
}
