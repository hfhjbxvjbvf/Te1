const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/AdminUser');
const assert = require('http-assert');
const jwt = require('jsonwebtoken');

// 登录接口
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 查询用户
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 422, '用户不存在');

    // 验证密码
    const isValid = require('bcryptjs').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');

    // 生成 Token
    const token = jwt.sign({ id: user._id }, req.app.get('secret'));
    res.send({ token, username });
  } catch (error) {
    next(error); // 将错误传递给全局错误处理器
  }
});

// 获取管理员列表
router.get('/', async (req, res, next) => {
  try {
    const data = await AdminUser.find();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// 获取单个管理员
router.get('/:id', async (req, res, next) => {
  try {
    const data = await AdminUser.findById(req.params.id);
    assert(data, 404, '管理员不存在');
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// 删除管理员
router.delete('/:id', async (req, res, next) => {
  try {
    await AdminUser.findByIdAndDelete(req.params.id);
    res.send({});
  } catch (error) {
    next(error);
  }
});

// 编辑管理员
router.put('/:id', async (req, res, next) => {
  try {
    const data = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
    assert(data, 404, '管理员不存在');
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// 注册接口
router.post('/register', async (req, res, next) => {
  try {
    const user = await AdminUser.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// 全局错误处理
router.use((err, req, res, next) => {
  // 处理 assert 抛出的错误
  if (err instanceof assert.AssertionError) {
    return res.status(err.status || 500).send({ message: err.message });
  }

  // 处理其他错误
  res.status(500).send({
    message: err.message || '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err : {}, // 仅开发环境返回详细错误信息
  });
});

module.exports = router;
