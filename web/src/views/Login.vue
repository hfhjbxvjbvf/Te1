<template>
  <div class="container">
    <div class="login-box">
      <!-- 登入表单 -->
      <form @submit.prevent="submitForm" v-if = "islogin==2">
        <h2>登入</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input type="email" v-model="email" required placeholder="Email" />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <div class="remember-forget">
          <label><input type="checkbox" v-model="rememberMe" /> 记住我</label>
          <a @click="() => islogin=0">忘记密码</a>
          
        </div>
        <button type="submit">登入</button>
        <div class="register-link" @click="() => islogin=1">
          <a>注册</a>
        </div>
      </form>
      <!-- 注册表单 -->
      <form v-else-if="islogin==1">
        <h2>注册</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input type="text" v-model="username" required placeholder="用户名" />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input type="email" v-model="email" required placeholder="邮箱" />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input type="password" v-model="password" placeholder="密码" required />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input type="password" v-model="repassword" placeholder="再次输入密码" required />
        </div>
        <div class="remember-forget">
          <label><input type="checkbox" v-model="rememberMe" /> 记住我</label>
          <a  @click="() => islogin=0">忘记密码</a>
        </div>
        <button type="submit" @click="()=>islogin=2">登入</button>
      </form>
      <!-- 忘记密码表单 -->
      <form v-else >
        <h2>忘记密码</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input type="email" v-model="email" required placeholder="邮箱" />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input type="text" v-model="phone" placeholder="手机号" required />
        </div>
        <button type="submit">登入</button>
        <div class="register-link">
          <a  @click="() => islogin=1">注册</a>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      email: '',
      password: '',
      repassword:'',
      phone:'',
      rememberMe: false,
      islogin:1,
    };
  },
  methods: {
    submitForm() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Remember Me:', this.rememberMe);
    }
  }
};
</script>

<style scoped>
/* Google Font */

/* General CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* Custom CSS */
.container {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/bg-img.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .login-box {
  position: relative;
  width: 390px;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(15px);
  padding-top:10px;
  padding-bottom:10px;
}

.login-box h2 {
  font-size: 28px;
  color: #fff;
  text-align: center;
}

.login-box .input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #fff;
  padding: 0 35px 0 5px;
}

.input-box input::placeholder {
  color: #f9f9f9;
}

.input-box .icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
}

.login-box .remember-forget {
  margin: -15px 0 15px;
  font-size: 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.remember-forget label input {
  margin-right: 3px;
}

.login-box button {
  width: 100%;
  height: 40px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  transition: all 0.5s;
}

.login-box button:hover {
  background: #1f73c9;
  color: #fff;
}

.login-box .register-link {
  font-size: 15px;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}

.remember-forget a,
.register-link a {
  color: #fff;
  text-decoration: none;
}

.remember-forget a:hover,
.register-link a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 460px) {
  .container .login-box {
    width: 350px;
  }

  .login-box .input-box {
    width: 290px;
  }
}

@media (max-width: 360px) {
  .container .login-box {
    width: 100%;
    height: 100vh;
    border: none;
  }
}
</style>
