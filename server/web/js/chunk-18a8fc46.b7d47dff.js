(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18a8fc46"],{"29da":function(t,a,s){"use strict";s("5f71")},"5f71":function(t,a,s){},e569:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"box"}},[s("div",{staticClass:"content"},[s("div",{staticClass:"image-container",on:{click:function(a){t.showModal=!0}}},[s("img",{staticClass:"thumbnail",attrs:{src:t.imageUrl,alt:"chip image"}})]),s("div",{staticClass:"description"},[s("h2",[t._v(t._s(t.data.title))]),s("p",[t._v(" 介绍:"),s("br"),t._v(" "+t._s(t.data.body)+" ")])])]),t.showModal?s("div",{staticClass:"modal",on:{click:function(a){return a.target!==a.currentTarget?null:t.closeModal.apply(null,arguments)}}},[s("div",{staticClass:"modal-content"},[s("img",{staticClass:"large-image",attrs:{src:t.imageUrl,alt:"large image"}}),s("button",{staticClass:"close-btn",on:{click:t.closeModal}},[t._v("×")])])]):t._e()])},c=[],e={data(){return{showModal:!1,imageUrl:"https://example.com/path/to/chip-image.jpg",data:{}}},methods:{closeModal(){this.showModal=!1},async getData(){const t=this.$route.params.id;try{const a=await this.$http.get("/dieshot/"+t);this.data=a.data,this.imageUrl=a.data.icon,console.log(a)}catch(a){}}},mounted(){this.getData()}},o=e,l=(s("29da"),s("d34b")),n=Object(l["a"])(o,i,c,!1,null,"5b7f0677",null);a["default"]=n.exports}}]);