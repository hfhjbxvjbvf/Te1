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
  console.log('请求体:', req.body);
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: '创建产品失败' });
  }
});

// 更新产品
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: '更新产品失败' });
  }
});

// 删除产品
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ message: '删除产品失败' });
  }
});
// 获取所有产品
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().limit(100);
    res.send(products);
  } catch (error) {
    res.status(400).send({ message: '获取产品失败' });
  }
});

router.post('/', async (req, res) => {
  const model = await req.Model.create(req.body)
  res.send(model)
})
router.put('/:id', async (req, res) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id, req.body)
  res.send({
    success: true,
  })
})
router.get('/', async (req, res) => {
  const queryOptions = {}
  if (req.Model.modelName === 'Category') {
    queryOptions.populate = 'parent'
  }
  const items = await req.Model.find().setOptions(queryOptions).limit(100)
  res.send(items)
})
router.get('/:id', async (req, res) => {
  const model = await req.Model.findById(req.params.id)
  res.send(model)
})

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
