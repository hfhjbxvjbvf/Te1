(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2da06827"],{"141d":function(e,t,a){},9286:function(e,t,a){"use strict";a("141d")},a55b:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"login-box"},[2===e.islogin?a("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.UserInfo,rules:e.rules,"label-width":"100px","status-icon":""}},[a("h2",[e._v("登录")]),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{type:"email",autocomplete:"off",placeholder:"请输入邮箱",clearable:""},model:{value:e.UserInfo.email,callback:function(t){e.$set(e.UserInfo,"email",t)},expression:"UserInfo.email"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"请输入密码",clearable:""},model:{value:e.UserInfo.password,callback:function(t){e.$set(e.UserInfo,"password",t)},expression:"UserInfo.password"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{type:"text",placeholder:"请输入验证码",clearable:""},model:{value:e.captcha,callback:function(t){e.captcha=t},expression:"captcha"}})],1),a("el-col",{attrs:{span:8}},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"text"},on:{click:e.refreshCaptcha}},[a("img",{staticStyle:{width:"100%"},attrs:{src:e.captchaUrl,alt:"Captcha"}})])],1)],1)],1),a("el-form-item",{attrs:{prop:"argeement"}},[a("el-checkbox",{model:{value:e.rememberMe,callback:function(t){e.rememberMe=t},expression:"rememberMe"}},[e._v(" 已阅读并同意趣玩账号 "),a("a",{staticClass:"a-text",attrs:{href:"#",target:"_blank"}},[e._v("用户协议")]),e._v(" 和 "),a("a",{staticClass:"a-text",attrs:{href:"#",target:"_blank"}},[e._v("隐私政策")])]),a("div",{staticStyle:{float:"right",cursor:"pointer","font-weight":"bold",color:"red"},on:{click:function(t){e.islogin=3}}},[e._v(" 忘记密码? ")])],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#409eff"},attrs:{type:"primary"},on:{click:e.login}},[e._v(" 登录 ")])],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#67c23a"},attrs:{type:"primary"},on:{click:function(t){e.islogin=1}}},[e._v(" 注册 ")])],1)],1):1===e.islogin?a("el-form",{ref:"registerForm",staticClass:"register-form",attrs:{model:e.UserInfo,rules:e.rules,"label-width":"100px","status-icon":""}},[a("h2",[e._v("注册")]),a("el-form-item",{attrs:{label:"用户名",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},model:{value:e.UserInfo.name,callback:function(t){e.$set(e.UserInfo,"name",t)},expression:"UserInfo.name"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{type:"email",placeholder:"请输入邮箱",clearable:""},model:{value:e.UserInfo.email,callback:function(t){e.$set(e.UserInfo,"email",t)},expression:"UserInfo.email"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.UserInfo.phone,callback:function(t){e.$set(e.UserInfo,"phone",t)},expression:"UserInfo.phone"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入密码",clearable:""},model:{value:e.UserInfo.password,callback:function(t){e.$set(e.UserInfo,"password",t)},expression:"UserInfo.password"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{type:"text",placeholder:"请输入验证码",clearable:""},model:{value:e.captcha,callback:function(t){e.captcha=t},expression:"captcha"}})],1),a("el-col",{attrs:{span:8}},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"text"},on:{click:e.refreshCaptcha}},[a("img",{staticStyle:{width:"100%"},attrs:{src:e.captchaUrl,alt:"Captcha"}})])],1)],1)],1),a("el-form-item",{attrs:{prop:"argeement"}},[a("el-checkbox",{model:{value:e.rememberMe,callback:function(t){e.rememberMe=t},expression:"rememberMe"}},[e._v(" 已阅读并同意趣玩账号 "),a("a",{staticClass:"a-text",attrs:{href:"#",target:"_blank"}},[e._v("用户协议")]),e._v(" 和 "),a("a",{staticClass:"a-text",attrs:{href:"#",target:"_blank"}},[e._v("隐私政策")])])],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#67c23a"},attrs:{type:"primary"},on:{click:e.register}},[e._v(" 注册 ")])],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#909399"},on:{click:function(t){e.islogin=2}}},[e._v(" 返回登录 ")])],1)],1):a("el-form",{staticClass:"login-form",attrs:{"label-width":"100px",model:e.UserInfo,rules:e.rules,"status-icon":""}},[a("h2",[e._v("忘记密码")]),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入邮箱",clearable:""},model:{value:e.UserInfo.email,callback:function(t){e.$set(e.UserInfo,"email",t)},expression:"UserInfo.email"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.UserInfo.phone,callback:function(t){e.$set(e.UserInfo,"phone",t)},expression:"UserInfo.phone"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{type:"text",placeholder:"请输入验证码",clearable:""},model:{value:e.captcha,callback:function(t){e.captcha=t},expression:"captcha"}})],1),a("el-col",{attrs:{span:8}},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"text"},on:{click:e.refreshCaptcha}},[a("img",{staticStyle:{width:"100%"},attrs:{src:e.captchaUrl,alt:"Captcha"}})])],1)],1)],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#409eff"},on:{click:e.forgotPassword}},[e._v(" 确定 ")])],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%",height:"40px","background-color":"#909399"},on:{click:function(t){e.islogin=2}}},[e._v(" 返回登录 ")])],1)],1)],1)])},r=[],l={data(){return{UserInfo:{name:"",password:"",phone:"",email:""},captcha:"",captchaUrl:"/auth/captcha?t="+Date.now(),rememberMe:!1,islogin:2,isLoading:!1,rules:{email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],name:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:4,max:20,message:"用户名长度为4-20个字符",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{min:11,max:11,message:"手机号码长度为11个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"密码长度为6-20个字符",trigger:"blur"}],repassword:[{required:!0,message:"请输入密码",trigger:"blur"},{validator:()=>this.UserInfo.password===this.UserInfo.repassword,message:"两次输入的密码不一致",trigger:"blur"}],agreement:[{required:!0,message:"请勾选协议",trigger:"change"}]}}},methods:{async login(){this.$refs.loginForm&&await this.$refs.loginForm.validate(async(e,t)=>{if(console.log("文本",e,"错误",t),e){this.isLoading=!0,await this.checkCode(),this.isLoading=!1;try{const e=await this.$http.post("/auth/login",{...this.UserInfo});console.log("登录成功",e.data),localStorage.setItem("user",JSON.stringify(e.data)),this.$router.push("/")}catch(a){console.error("登录失败",a),console.log(a.response.status),400===a.response.status?this.$message.error("用户名或密码错误"):this.$message.error("登录失败")}}})},async register(){this.checkCode(),await this.$http.post("/auth/register",this.UserInfo).then(e=>{e.status;this.$message({message:"恭喜你，注册成功",type:"success"})}).catch(e=>{const t=e.response.status;switch(console.log("注册状态码:",t),t){case 400:this.$message({message:"邮箱已经存在",type:"warning"});break;case 401:this.$message({message:"手机号已经存在",type:"warning"});break;case 409:alert("用户已存在");break;default:alert("注册失败");break}}),refreshCaptcha(),this.islogin=2},async forgotPassword(){try{await this.$http.post("/auth/forgot-password",{email:this.UserInfo.email,phone:this.UserInfo.phone}),alert("重置密码链接已发送到您的邮箱")}catch(e){console.error("忘记密码失败",e)}},async refreshCaptcha(){try{const e=await this.$http.get("/auth/captcha"),t=e.data,a=btoa(unescape(encodeURIComponent(t)));this.captchaUrl="data:image/svg+xml;base64,"+a}catch(e){console.error("刷新验证码失败",e)}},async checkCode(){try{await this.$http.post("/auth/verify",{inputCaptcha:this.captcha}),this.$message({type:"success",message:"验证码校验成功"})}catch(e){console.error("验证码校验失败",e),this.$message({type:"error",message:"验证码校验失败"}),this.refreshCaptcha()}},submitForm(){console.log("Submitting Form")}},mounted(){this.refreshCaptcha()}},o=l,i=(a("9286"),a("d34b")),c=Object(i["a"])(o,s,r,!1,null,"6e4b616c",null);t["default"]=c.exports}}]);