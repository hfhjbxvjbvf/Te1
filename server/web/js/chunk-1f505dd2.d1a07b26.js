(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f505dd2"],{a12b:function(e,t,s){"use strict";s("d5fd")},a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"login-box"},[2===e.islogin?s("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[s("h2",[e._v("登录")]),s("div",{staticClass:"input-box"},[e._m(0),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.email,expression:"UserInfo.email"}],attrs:{type:"email",required:"",placeholder:"Email"},domProps:{value:e.UserInfo.email},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"email",t.target.value)}}})]),s("div",{staticClass:"input-box"},[e._m(1),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.password,expression:"UserInfo.password"}],attrs:{type:"password",placeholder:"Password",required:""},domProps:{value:e.UserInfo.password},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"password",t.target.value)}}})]),s("div",{staticClass:"input-box captcha-box",staticStyle:{display:"flex","align-items":"center"}},[s("img",{staticStyle:{"margin-right":"10px"},attrs:{src:e.captchaUrl,alt:"Captcha"},on:{click:e.refreshCaptcha}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"验证码",required:""},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}})]),s("div",{staticClass:"remember-forget"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.rememberMe,expression:"rememberMe"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.rememberMe)?e._i(e.rememberMe,null)>-1:e.rememberMe},on:{change:function(t){var s=e.rememberMe,a=t.target,r=!!a.checked;if(Array.isArray(s)){var i=null,o=e._i(s,i);a.checked?o<0&&(e.rememberMe=s.concat([i])):o>-1&&(e.rememberMe=s.slice(0,o).concat(s.slice(o+1)))}else e.rememberMe=r}}}),e._v(" 记住我 ")]),s("a",{on:{click:function(){return e.islogin=0}}},[e._v("忘记密码")])]),s("button",{attrs:{type:"submit"},on:{click:e.login}},[e._v("登录")]),s("div",{staticClass:"register-link",on:{click:function(){return e.islogin=1}}},[s("a",[e._v("注册")])])]):1===e.islogin?s("form",[s("h2",[e._v("注册")]),s("div",{staticClass:"input-box"},[e._m(2),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.name,expression:"UserInfo.name"}],attrs:{type:"text",required:"",placeholder:"用户名"},domProps:{value:e.UserInfo.name},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"name",t.target.value)}}})]),s("div",{staticClass:"input-box"},[e._m(3),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.email,expression:"UserInfo.email"}],attrs:{type:"email",required:"",placeholder:"邮箱"},domProps:{value:e.UserInfo.email},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"email",t.target.value)}}})]),s("div",{staticClass:"input-box"},[e._m(4),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.phone,expression:"UserInfo.phone"}],attrs:{type:"text",placeholder:"手机号",required:""},domProps:{value:e.UserInfo.phone},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"phone",t.target.value)}}})]),s("div",{staticClass:"input-box"},[e._m(5),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.password,expression:"UserInfo.password"}],attrs:{type:"password",placeholder:"密码",required:""},domProps:{value:e.UserInfo.password},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"password",t.target.value)}}})]),s("div",{staticClass:"input-box captcha-box",staticStyle:{display:"flex","align-items":"center"}},[s("img",{staticStyle:{"margin-right":"10px"},attrs:{src:e.captchaUrl,alt:"Captcha"},on:{click:e.refreshCaptcha}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"验证码",required:""},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}})]),s("button",{attrs:{type:"submit"},on:{click:e.register}},[e._v("注册")]),s("button",{staticStyle:{"margin-top":"15px"},attrs:{type:"submit"},on:{click:function(t){e.islogin=2}}},[e._v(" 返回 ")])]):s("form",[s("h2",[e._v("忘记密码")]),s("div",{staticClass:"input-box"},[e._m(6),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.email,expression:"UserInfo.email"}],attrs:{type:"email",required:"",placeholder:"邮箱"},domProps:{value:e.UserInfo.email},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"email",t.target.value)}}})]),s("div",{staticClass:"input-box"},[e._m(7),s("input",{directives:[{name:"model",rawName:"v-model",value:e.UserInfo.phone,expression:"UserInfo.phone"}],attrs:{type:"text",placeholder:"手机号",required:""},domProps:{value:e.UserInfo.phone},on:{input:function(t){t.target.composing||e.$set(e.UserInfo,"phone",t.target.value)}}})]),s("button",{attrs:{type:"submit"},on:{click:e.forgotPassword}},[e._v("确定")]),s("button",{staticStyle:{"margin-top":"15px"},attrs:{type:"submit"},on:{click:function(t){e.islogin=2}}},[e._v(" 返回 ")])])])])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-envelope"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-lock"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-user"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-envelope"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-phone"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-lock"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-envelope"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa-solid fa-phone"})])}],i={data(){return{UserInfo:{name:"",password:"",phone:"",email:""},captcha:"",captchaUrl:"/auth/captcha?t="+Date.now(),rememberMe:!1,islogin:1}},methods:{async login(){this.checkCode();try{const e=await this.$http.post("/auth/login",{...this.UserInfo});localStorage.setItem("user",JSON.stringify(e.data)),this.$router.push("/")}catch(e){console.error("登录失败",e),console.log(e.response.status),400===e.response.status?this.$message.error("用户名或密码错误"):this.$message.error("登录失败")}},async register(){this.checkCode(),await this.$http.post("/auth/register",this.UserInfo).then(e=>{e.status;this.$message({message:"恭喜你，注册成功",type:"success"})}).catch(e=>{const t=e.response.status;switch(console.log("注册状态码:",t),t){case 400:this.$message({message:"邮箱已经存在",type:"warning"});break;case 401:this.$message({message:"手机号已经存在",type:"warning"});break;case 409:alert("用户已存在");break;default:alert("注册失败");break}}),refreshCaptcha(),this.islogin=2},async forgotPassword(){try{await this.$http.post("/auth/forgot-password",{email:this.UserInfo.email,phone:this.UserInfo.phone}),alert("重置密码链接已发送到您的邮箱")}catch(e){console.error("忘记密码失败",e)}},async refreshCaptcha(){try{const e=await this.$http.get("/auth/captcha"),t=e.data,s=btoa(unescape(encodeURIComponent(t)));this.captchaUrl="data:image/svg+xml;base64,"+s}catch(e){console.error("刷新验证码失败",e)}},async checkCode(){try{await this.$http.post("/auth/verify",{inputCaptcha:this.captcha}),this.$message({type:"success",message:"验证码校验成功"}),this.login()}catch(e){console.error("验证码校验失败",e),this.$message({type:"error",message:"验证码校验失败"}),this.refreshCaptcha()}},submitForm(){console.log("Submitting Form")}},mounted(){this.refreshCaptcha()}},o=i,n=(s("a12b"),s("d34b")),c=Object(n["a"])(o,a,r,!1,null,"2aa27d44",null);t["default"]=c.exports},d5fd:function(e,t,s){}}]);