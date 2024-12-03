const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const svgCaptcha = require('svg-captcha')
const User = require('../../models/User')
const router = express.Router()
const SECRET_KEY = 'YOUR_SECRET_KEY'
const redisClient = require('../../plugins/redisClient')

// 用户注册
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body
  try {
    const existingUser = await User.findOne({ email })
    const exitphoneUser = await User.findOne({ phone })
    const existUserName = await User.findOne({ name })
    if (existUserName) return res.status(409).json({ message: '用户名已存在' })
    if (existingUser) return res.status(400).json({ message: '邮箱已注册' })
    if (exitphoneUser) return res.status(401).json({ message: '手机号已注册' })
    const user = new User({ name, email, password, phone })
    await user.save()
    console.log('注册成功')
    res.status(200).send({ message: '注册成功' })
  } catch (error) {
    res.status(500).json({ message: '注册失败' })
  }
})

// 用户登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '邮箱或密码错误' })
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: '7d',
    })
    res.json({ message: '登录成功', token })
  } catch (error) {
    res.status(500).json({ message: '登录失败' })
  }
})

// 忘记密码
router.post('/forgot-password', async (req, res) => {
  const { email, phone } = req.body
  try {
    const user = await User.findOne({ email, phone })
    if (!user) return res.status(404).json({ message: '用户不存在' })

    const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: '1h',
    })
    user.resetToken = resetToken
    user.resetTokenExpiration = Date.now() + 3600000
    await user.save()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
    })

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: '重置密码',
      text: `请点击以下链接重置您的密码：\nhttp://yourfrontend.com/reset-password/${resetToken}`,
    }

    await transporter.sendMail(mailOptions)
    res.json({ message: '重置密码链接已发送到您的邮箱' })
  } catch (error) {
    res.status(500).json({ message: '发送邮件失败' })
  }
})

// 生成验证码并存入 Redis
router.get('/captcha', async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 3,
    noise: 0,
    color: true,
    background: '#cc9966',
  })
  const captchaText = captcha.text.toLowerCase() // 转换为小写，强制不区分大小写;
  console.log(captchaText)
  const userId = req.ip // 假设用IP标识用户，也可以用其他唯一标识
  //redisClient.connectRedis()  //连接

  // 设置过期时间为 180 秒的键值对
  await redisClient.set(`captcha:${userId}`, captchaText, {
    EX: 180, // 设置过期时间，单位为秒
  })
  res.type('svg')
  res.status(200).send(captcha.data)
})

// 验证验证码
router.post('/verify', async (req, res) => {
  const { inputCaptcha } = req.body
  const userId = req.ip
  console.log(userId, inputCaptcha)

  try {
    const storedCaptcha = await redisClient.get(`captcha:${userId}`)

    if (!storedCaptcha) {
      console.log('验证码已失效')
      return res.status(400).json({ success: false, message: '验证码已失效' })
    }

    console.log('从 Redis 获取的验证码:', storedCaptcha) // 确保从 Redis 获取到验证码
    if (inputCaptcha === storedCaptcha) {
      await redisClient.del(`captcha:${userId}`) // 删除验证码
      res.status(200).json({ success: true, message: '验证码正确' })
    } else {
      console.log('验证码错误')
      res.status(400).json({ success: false, message: '验证码错误' })
    }
  } catch (err) {
    console.error('Redis 操作错误:', err)
    res.status(500).json({ success: false, message: '服务器错误' })
  }
})

redisClient.on('connect', () => {
  console.log('Redis 已连接')
})

redisClient.on('error', (err) => {
  console.error('Redis 连接错误:', err)
})

module.exports = router
