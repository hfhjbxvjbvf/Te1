(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe94151c"],{4623:function(t,e,a){},"6bd4":function(t,e,a){"use strict";a("4623")},fd11:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"box"}},[a("div",{staticStyle:{"margin-top":"70px"}},[a("el-row",{staticClass:"tac",attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"0"}},t._l(t.category,(function(e,s){return a("el-menu-item",{key:s,attrs:{index:String(s)},on:{click:function(a){return t.Operation(e)}}},[a("template",{slot:"title"},[a("span",[t._v(t._s(e))])])],2)})),1)],1),t.data.length>0?a("el-col",{attrs:{span:20}},t._l(t.data,(function(e,s){return a("el-col",{key:s,attrs:{xs:12,sm:8,md:6,lg:5}},[a("el-card",{staticClass:"card-view"},[a("div",{staticClass:"box-img"},[a("img",{staticClass:"image",attrs:{src:e.icon}})]),a("div",{staticClass:"title"},[t._v(t._s(e.title))])])],1)})),1):a("el-col",{attrs:{span:20}},[a("div",{staticStyle:{"text-align":"center","margin-top":"100px"}},[t._v(" 抱歉，暂时还没有该分类的图片 ")])])],1)],1)])},i=[],l={data(){return{isCollapse:!0,isCollapseText:"展开",category:["CPU","GPU","苹果","协处理器","其他"],currentCategory:"",data:[]}},methods:{Operation(t){this.currentCategory=t,console.log(t),this.getDate(t)},async getDate(t){try{console.log(t);const e=await this.$http.get("/articles?category="+t);console.log(e.data),this.data=e.data,console.log(this.data)}catch(e){console.error("获取数据失败",e)}}},mounted(){this.getDate(this.category[0])}},n=l,c=(a("6bd4"),a("d34b")),o=Object(c["a"])(n,s,i,!1,null,"dbf8e1a6",null);e["default"]=o.exports}}]);