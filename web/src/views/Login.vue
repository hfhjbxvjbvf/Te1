<script>
export default {
  data() {
    return {
      UserInfo: {
        name: '',
        password: '',
        phone: '',
        email: '',
        rememberMe: false,//勾选协议
      },
      captcha: '',
      captchaUrl: `/auth/captcha?t=${Date.now()}`,
      islogin: 2,
      isLoading:false,
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 4,
            max: 20,
            message: '用户名长度为4-20个字符',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '手机号码长度为11个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' },
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: () => {
              return this.UserInfo.password === this.UserInfo.repassword
            },
            message: '两次输入的密码不一致',
            trigger: 'blur',
          },
        ],
        rememberMe:[
          {required: true, message: '请勾选协议', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    //登入
    async login( ) {
      if(!this.$refs.loginForm) return
      await this.$refs.loginForm.validate( async(valid,fields)=>{
        console.log("文本",valid,"错误",fields)
        if(valid){
          if(! await this.checkCode())
            return
      try {
        const res = await this.$http.post('/auth/login', {
          ...this.UserInfo,
        })
        console.log('登录成功', res.data)

        localStorage.setItem('user', JSON.stringify(res.data))
        this.$router.push('/')
      } catch (error) {
        console.error('登录失败', error)
        console.log(error.response.status)
        if (error.response.status === 401) {
          this.$message.error('用户名或密码错误')
        } else {
          this.$message.error('登录失败')
        }
      }
        }
      })
      
    },
    //注册
    async register() {
      if(! await this.checkCode())
          return
      await this.$http
        .post('/auth/register', this.UserInfo)
        .then((response) => {
          const staus = response.status
          //console.log('注册状态码:', staus);
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success',
          })
        })
        .catch((error) => {
          const staus = error.response.status
          console.log('注册状态码:', staus)
          switch (staus) {
            case 400:
              this.$message({
                message: '邮箱已经存在',
                type: 'warning',
              })
              break
            case 401:
              this.$message({
                message: '手机号已经存在',
                type: 'warning',
              })
              break
            case 409:
            this.$message({
                message: '用户名重复',
                type: 'warning',
              })
              break
            default:
              alert('注册失败')
              break
          }
        })
      refreshCaptcha()
      this.islogin = 2
    },
    //忘记密码
    async forgotPassword() {
      try {
        await this.$http.post('/auth/forgot-password', {
          email: this.UserInfo.email,
          phone: this.UserInfo.phone,
        })
        alert('重置密码链接已发送到您的邮箱')
      } catch (error) {
        console.error('忘记密码失败', error)
      }
    },
    //验证码刷新
    async refreshCaptcha() {
      try {
        const res = await this.$http.get('/auth/captcha')
        // 将SVG内容转为Base64
        const svgContent = res.data
        const base64Svg = btoa(unescape(encodeURIComponent(svgContent))) // 转换为Base64
        this.captchaUrl = `data:image/svg+xml;base64,${base64Svg}` // 设置Base64格式的URL
        //console.log("验证码URL:", this.captchaUrl);
      } catch (error) {
        console.error('刷新验证码失败', error)
      }
    },
    //验证码校验

    //后台校验速度过慢，需要加一个加载动画
    async checkCode() {
      try {
        await this.$http.post('/auth/verify', {
          inputCaptcha: this.captcha,
        })
        this.$message({
          type: 'success',
          message: '验证码校验成功',
        })
        this.refreshCaptcha()
        return true
      } catch (error) {
        console.error('验证码校验失败', error)
        this.$message({
          type: 'error',
          message: '验证码校验失败',
        })
        this.refreshCaptcha()
        return false
      }
    },

    submitForm() {
      console.log('Submitting Form')
    },
  },
  mounted() {
    this.refreshCaptcha()
  },
}
</script>
<template>
  <div class="container" >
    <div class="login-box" v-loading="isLoading">
      <!-- 登录表单 -->
      <el-form
        v-if="islogin === 2"
        :model="UserInfo"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="login-form"
        status-icon
      >
        <h2>登录</h2>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="UserInfo.email"
            autocomplete="off"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="UserInfo.password"
            autocomplete="off"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input
                type="text"
                v-model="captcha"
                placeholder="请输入验证码"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                @click="refreshCaptcha"
                type="text"
                style="width: 100%"
              >
                <img :src="captchaUrl" alt="Captcha" style="width: 100%" />
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 同意条款 -->
        <el-form-item prop="rememberMe">
          <el-checkbox v-model="UserInfo.rememberMe">
            已阅读并同意趣玩账号
            <a href="#" class="a-text" target="_blank">用户协议</a>
            和
            <a href="#" class="a-text" target="_blank">隐私政策</a>
          </el-checkbox>
          <div
            style="float: right; cursor: pointer; font-weight: bold; color: red"
            @click="islogin = 3"
          >
            忘记密码?
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            style="width: 100%; height: 40px; background-color: #409eff"
          >
            登录
          </el-button>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="islogin = 1"
            style="width: 100%; height: 40px; background-color: #67c23a"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form
        v-else-if="islogin === 1"
        :model="UserInfo"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="register-form"
        status-icon
      >
        <h2>注册</h2>

        <!-- 用户名 -->
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="UserInfo.name"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="UserInfo.email"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="UserInfo.phone"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="UserInfo.password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input
                type="text"
                v-model="captcha"
                placeholder="请输入验证码"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                @click="refreshCaptcha"
                type="text"
                style="width: 100%"
              >
                <img :src="captchaUrl" alt="Captcha" style="width: 100%" />
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 同意条款 -->
        <el-form-item prop="rememberMe">
          <el-checkbox v-model="UserInfo.rememberMe">
            已阅读并同意趣玩账号
            <a href="#" class="a-text" target="_blank">用户协议</a>
            和
            <a href="#" class="a-text" target="_blank">隐私政策</a>
          </el-checkbox>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="register"
            style="width: 100%; height: 40px; background-color: #67c23a"
          >
            注册
          </el-button>
        </el-form-item>

        <!-- 返回按钮 -->
        <el-form-item>
          <el-button
            @click="islogin = 2"
            style="width: 100%; height: 40px; background-color: #909399"
          >
            返回登录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 忘记密码表单 -->
      <el-form
        label-width="100px"
        class="login-form"
        :model="UserInfo"
        :rules="rules"
        status-icon
        v-else
      >
        <h2>忘记密码</h2>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="UserInfo.email"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="UserInfo.phone"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input
                type="text"
                v-model="captcha"
                placeholder="请输入验证码"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                @click="refreshCaptcha"
                type="text"
                style="width: 100%"
              >
                <img :src="captchaUrl" alt="Captcha" style="width: 100%" />
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="forgotPassword"
            style="width: 100%; height: 40px; background-color: #409eff"
          >
            确定
          </el-button>
        </el-form-item>
        <!-- 返回按钮 -->
        <el-form-item>
          <el-button
            @click="islogin = 2"
            style="width: 100%; height: 40px; background-color: #909399"
          >
            返回登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
/* loding */
.example-showcase .el-loading-mask {
  z-index: 9;
}

/* Custom CSS */
.container {
  width: 100%;
  height: 100vh;
  background: url('../assets/images/bg-img.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  position: relative;
  width: 575px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}

h2 {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* 表单元素样式 */
.el-form {
  max-width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input,
.el-button {
  width: 100%;
}

.el-button {
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
}

/* 颜色 */
.el-button.primary {
  background-color: #409eff;
  color: #fff;
}

.el-button.primary:hover {
  background-color: #3a8ee6;
}

.el-button.secondary {
  background-color: #67c23a;
  color: #fff;
}

.el-button.secondary:hover {
  background-color: #4cae3a;
}

.el-button.text {
  background-color: transparent;
  color: #409eff;
  border: 1px solid #409eff;
}

.el-button.text:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

/* 其他样式 */
.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
.a-text {
  color: black;
  font-weight: bold;
}
</style>
