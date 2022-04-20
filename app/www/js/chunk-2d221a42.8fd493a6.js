(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221a42"],{cae3:function(t,e,n){"use strict";n.r(e);n("b0c0");var a=n("7a23"),r={class:"smoothShow w-full flex flex-col gap-6 items-center justify-center"},o={class:"h-min font_itim text-white bg-[#2C2C2C] p-6 pt-8 rounded-2xl"},i=Object(a["j"])("p",{class:"mb-4 ml-2 -mt-1.5 tracking-wider"},[Object(a["m"])(" Sharing group name "),Object(a["j"])("span",{class:"text-red-300"},"*")],-1),l=Object(a["j"])("p",{class:"mt-6 mb-4 ml-2 tracking-wider"}," Sharing group detail ",-1),s={class:"grid grid-rows-2 md:grid-cols-2 gap-2.5"},c=Object(a["j"])("button",{class:"font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] w-full text-white duration-200 rounded-xl text-sm py-2.5 md:py-3"}," Cancel ",-1),u={class:"h-min text-white bg-[#2C2C2C] p-6 rounded-2xl tracking-wider"},d=Object(a["j"])("p",{class:"font_baloo mb-2 ml-2 tracking-wider text-xl text-center"}," Your invitation ",-1),b={class:"mt-6 flex flex-col items-center gap-y-4"},p={class:"w-full grid grid-cols-[98px_1fr_20px] items-center"},m=Object(a["j"])("span",null,"Name",-1),h=Object(a["j"])("i",{class:"ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"},null,-1),f=[h],j={class:"w-full grid grid-cols-[98px_1fr_20px] items-center"},g=Object(a["j"])("span",null,"Detail",-1),x=Object(a["j"])("i",{class:"ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"},null,-1),O=[x],w={class:"w-full grid grid-cols-[98px_1fr_20px] items-center"},y=Object(a["j"])("span",null,"Code",-1),v=Object(a["j"])("i",{class:"ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"},null,-1),k=[v],C={class:"w-full grid grid-cols-[98px_1fr_20px] items-center"},L=Object(a["j"])("span",null,"Link invite",-1),_=Object(a["j"])("i",{class:"ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"},null,-1),S=[_],V={class:"flex flex-col gap-3 text-white"},I=Object(a["j"])("button",{class:"font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] w-full text-white duration-200 rounded-xl text-sm py-3"}," OK  "+Object(a["K"])("&")+"  GO BACK ",-1);function N(t,e,n,h,x,v){var _=Object(a["G"])("router-link"),N=Object(a["G"])("Toast"),D=Object(a["G"])("Layout");return Object(a["y"])(),Object(a["g"])(D,null,{default:Object(a["P"])((function(){return[Object(a["j"])("div",r,[Object(a["j"])("div",{class:Object(a["u"])([{hidden:1!==x.stepGenerate},"w-11/12 sm:w-10/12 md:w-6/12 xl:w-4/12 flex flex-col justify-center gap-3"])},[Object(a["j"])("div",o,[i,Object(a["Q"])(Object(a["j"])("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=function(t){return x.groupName=t}),placeholder:"Sharing group name",class:Object(a["u"])(["w-full py-3.5 px-5 rounded-lg bg-[#474747]",{"border-2 border-red-500 border-opacity-60":x.validate.groupName.status}])},null,2),[[a["M"],x.groupName]]),l,Object(a["Q"])(Object(a["j"])("input",{type:"text",placeholder:"Set sharing group detail",class:"w-full py-3.5 px-5 rounded-lg bg-[#474747]","onUpdate:modelValue":e[1]||(e[1]=function(t){return x.groupDetail=t})},null,512),[[a["M"],x.groupDetail]])]),Object(a["j"])("div",s,[Object(a["n"])(_,{to:"/share",class:"md:row-start-1 row-start-2"},{default:Object(a["P"])((function(){return[c]})),_:1}),Object(a["j"])("button",{onClick:e[2]||(e[2]=function(t){return v.onCreateInvitation()}),class:"font_baloo font-semibold tracking-wider bg-[#5C2D8A] hover:bg-[#502779] w-full text-white duration-200 rounded-xl text-sm py-3"}," Create the invitation. ")])],2),Object(a["j"])("div",{class:Object(a["u"])([{hidden:2!==x.stepGenerate},"w-11/12 sm:w-10/12 md:w-6/12 xl:w-4/12 flex flex-col justify-center gap-4 smoothShow"])},[Object(a["j"])("div",u,[d,Object(a["j"])("div",b,[Object(a["j"])("div",p,[m,Object(a["Q"])(Object(a["j"])("input",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return x.share.name=t}),type:"text",disabled:"",class:"cursor-text w-11/12 md:w-full font-medium tracking-wider rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"},null,512),[[a["M"],x.share.name]]),Object(a["j"])("button",{onClick:e[4]||(e[4]=function(t){return v.onCopy(x.share.name)})},f)]),Object(a["j"])("div",j,[g,Object(a["Q"])(Object(a["j"])("input",{"onUpdate:modelValue":e[5]||(e[5]=function(t){return x.share.detail=t}),type:"text",disabled:"",class:"cursor-text w-11/12 md:w-full font-medium tracking-wider rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"},null,512),[[a["M"],x.share.detail]]),Object(a["j"])("button",{onClick:e[6]||(e[6]=function(t){return v.onCopy(x.share.detail)})},O)]),Object(a["j"])("div",w,[y,Object(a["Q"])(Object(a["j"])("input",{"onUpdate:modelValue":e[7]||(e[7]=function(t){return x.share.code=t}),type:"text",disabled:"",class:"cursor-text w-11/12 md:w-full font-medium tracking-widest rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"},null,512),[[a["M"],x.share.code]]),Object(a["j"])("button",{onClick:e[8]||(e[8]=function(t){return v.onCopy(x.share.code)})},k)]),Object(a["j"])("div",C,[L,Object(a["Q"])(Object(a["j"])("input",{"onUpdate:modelValue":e[9]||(e[9]=function(t){return x.share.LinkJoin=t}),type:"text",disabled:"",class:"cursor-text w-11/12 md:w-full font-medium tracking-widest rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"},null,512),[[a["M"],x.share.LinkJoin]]),Object(a["j"])("button",{onClick:e[10]||(e[10]=function(t){return v.onCopy(x.share.LinkJoin)})},S)])])]),Object(a["j"])("div",V,[Object(a["n"])(_,{to:"/share"},{default:Object(a["P"])((function(){return[I]})),_:1})])],2)]),Object(a["n"])(N,{position:"bottom-right",class:"Toast"})]})),_:1})}var D=n("1da1"),G=(n("96cf"),n("bc3a")),P=n.n(G),T=n("3a65"),$=n("216d"),J={name:"ToggleButton",emits:["update:modelValue","change"],props:{modelValue:Boolean,onIcon:String,offIcon:String,onLabel:String,offLabel:String,iconPos:{type:String,default:"left"}},methods:{onClick(t){this.$attrs.disabled||(this.$emit("update:modelValue",!this.modelValue),this.$emit("change",t))}},computed:{buttonClass(){return{"p-button p-togglebutton p-component":!0,"p-button-icon-only":this.hasIcon&&!this.hasLabel,"p-disabled":this.$attrs.disabled,"p-highlight":!0===this.modelValue}},iconClass(){return[this.modelValue?this.onIcon:this.offIcon,"p-button-icon",{"p-button-icon-left":"left"===this.iconPos&&this.label,"p-button-icon-right":"right"===this.iconPos&&this.label}]},hasLabel(){return this.onLabel&&this.onLabel.length>0&&this.offLabel&&this.offLabel.length>0},hasIcon(){return this.onIcon&&this.onIcon.length>0&&this.offIcon&&this.offIcon.length>0},label(){return this.hasLabel?this.modelValue?this.onLabel:this.offLabel:"&nbsp;"}},directives:{ripple:$["a"]}};const Q={class:"p-button-label"};function F(t,e,n,r,o,i){const l=Object(a["H"])("ripple");return Object(a["Q"])((Object(a["y"])(),Object(a["g"])("div",{class:i.buttonClass,onClick:e[1]||(e[1]=t=>i.onClick(t)),role:"checkbox","aria-checked":n.modelValue,tabindex:t.$attrs.disabled?null:"0"},[i.hasIcon?(Object(a["y"])(),Object(a["g"])("span",{key:0,class:i.iconClass},null,2)):Object(a["h"])("",!0),Object(a["n"])("span",Q,Object(a["K"])(i.label),1)],10,["aria-checked","tabindex"])),[[l]])}J.render=F;var M=J,R=n("b3b6"),U={name:"Share_Create",components:{ToggleButton:M,Layout:T["a"],Toast:R["a"]},data:function(){return{checked:!1,stepGenerate:1,groupName:null,groupDetail:null,validate:{groupName:{msg:"",status:!1}},share:{name:null,detail:null,code:null,LinkJoin:null}}},methods:{onCopy:function(t){try{navigator.clipboard.writeText(t),this.$toast.add({severity:"success",summary:"Copied : ".concat(t),detail:"",life:600})}catch(e){this.alertError(e)}},alertError:function(){this.$toast.add({severity:"error",summary:"An error occurred in the system.",detail:"Please try again later.",life:1300})},sendDataToShow:function(t){var e=this;return Object(D["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.share.name=t.name,e.share.detail=t.detail||"-",e.share.code=t.code,e.share.LinkJoin="brain_plz.com/share/".concat(t.code);case 4:case"end":return n.stop()}}),n)})))()},onCreateInvitation:function(){var t=this;return Object(D["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.validationForm()){e.next=3;break}return e.next=3,P.a.post("/api/share/create",{name:t.groupName,detail:t.groupDetail}).then(function(){var e=Object(D["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(200!==n.status){e.next=7;break}return e.next=3,t.sendDataToShow(n.data);case 3:t.stepGenerate=2,t.$toast.add({severity:"success",summary:"Create invite success",detail:"",life:2e3}),e.next=8;break;case 7:t.alertError();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.alertError(e)}));case 3:case"end":return e.stop()}}),e)})))()},validationForm:function(){if(""!==this.groupName&&null!==this.groupName)return this.validate.groupName.msg="",this.validate.groupName.status=!1,!0;this.validate.groupName.msg="is required",this.validate.groupName.status=!0}},mounted:function(){document.title="Share | BrainPlz"}},B=n("6b0d"),E=n.n(B);const K=E()(U,[["render",N]]);e["default"]=K}}]);
//# sourceMappingURL=chunk-2d221a42.8fd493a6.js.map