(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["message"],{"2a24":function(t,e,s){},"8e2a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main-container page-message d-flex flex-column ai-center pt-9"},[s("div",{staticClass:"page p-5"},[t._m(0),s("div",[t._m(1),s("div",{class:{"message-box":t.parentComments.length>0}},[s("div",{staticClass:"textarea-box bg-postcolor bdr"},[s("comment-textarea",{attrs:{model:"messages",type:"parent",placeholder:"输入留言内容"},on:{toResponse:t.getMessagesList}})],1),s("div",{staticClass:"my-9",class:{"message-box":t.parentComments.length>0}},[t.parentComments?s("comment-list",{attrs:{model:"messages",commentsList:t.parentComments},on:{getCommentList:t.getMessagesList}}):t._e()],1)])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("div",{staticClass:"text-green fs-xxxxl"},[t._v("Message")]),s("div",{staticClass:"text-grey-2 fs-sm mt-5"},[t._v("Published on March 10th 2024")]),s("div",{staticClass:"mt-5 mb-5"}),s("div",{staticClass:"py-4"},[s("span",{staticClass:"fs-xxl text-green"},[t._v("#")]),t._v("   "),s("span",{staticClass:"fs-xxl text-grey-1"},[t._v("留言前需知")])]),s("div",{staticClass:"pl-5 text-green-1"},[s("p",[t._v("• 烦请各位留言时务必填写自己真实的邮箱")]),s("p",[t._v("• 留言博主基本都会回复，并会邮件通知留言者")]),s("p",[t._v("• 请不要发广告和带有商业推广链接的无用留言")])]),s("p",{staticClass:"my-8 text-grey-2"},[t._v("希望彼此之间有好的交流。 ^_^")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mb-7"},[s("span",{staticClass:"fs-xxxl text-grey-1 text-center ml-5"},[t._v("留言板")])])}],i=s("cbc9"),c={data(){return{parentComments:[]}},mounted(){this.getMessagesList()},methods:{async getMessagesList(){let t=await this.$http.get("messages"),e=t.data;this.parentComments=e.filter(t=>t.parent===i["a"].topParentId),this.parentComments.forEach(t=>t.children=e.filter(e=>e.parent===t._id))}}},r=c,l=(s("cc4a"),s("d34b")),m=Object(l["a"])(r,a,n,!1,null,"e92935be",null);e["default"]=m.exports},cc4a:function(t,e,s){"use strict";s("2a24")}}]);