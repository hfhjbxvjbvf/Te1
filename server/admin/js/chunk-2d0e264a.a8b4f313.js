(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e264a"],{"7f05":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("m-top-handle",{attrs:{title:"标题",content:"写博客",path:"/articles/create/"}}),a("h1",[t._v("文章列表")]),a("el-table",{attrs:{data:t.items}},[a("el-table-column",{attrs:{prop:"_id",label:"ID",width:"250"}}),a("el-table-column",{attrs:{prop:"title",label:"文章标题"}}),a("el-table-column",{attrs:{prop:"createdAt",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("date")(e.row.createdAt,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),a("el-table-column",{attrs:{prop:"updatedAt",label:"最后更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("date")(e.row.updatedAt,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small",icon:"el-icon-edit"},on:{click:function(a){return t.$router.push("/articles/edit/"+e.row._id)}}},[t._v(" 编辑 ")]),a("el-button",{attrs:{type:"text",size:"small",icon:"el-icon-delete"},on:{click:function(a){return t.remove(e.row._id)}}},[t._v(" 删除 ")])]}}])})],1)],1)},l=[],n={data(){return{items:[]}},methods:{async fetch(){const t=await this.$http.get("/articles");console.log("输出",t),this.items=t.data},remove(t){this.$confirm("是否确定要删除这篇文章?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{await this.$http.delete("/articles/"+t),this.$message({type:"success",message:"删除成功!"}),await this.fetch()}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})}},created(){this.fetch()}},c=n,o=a("d34b"),i=Object(o["a"])(c,s,l,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0e264a.a8b4f313.js.map