(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"01cf":function(t,e,i){"use strict";var n=i("06a7"),s=i.n(n);s.a},"06a7":function(t,e,i){},"0a93":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"main-dashboard",attrs:{elevation:"0"}},[i("v-carousel",{staticClass:"carrousel",attrs:{"hide-delimiter-background":"","hide-delimiters":"",continuous:"","show-arrows":!1,cycle:"",height:"calc(100vh - 80px)"}},[i("v-carousel-item",{key:"1",attrs:{src:"img/Bienvenido.png","reverse-transition":"fade-transition",transition:"fade-transition"}}),i("v-carousel-item",{key:"2",attrs:{src:"img/Contactanos.png","reverse-transition":"fade-transition",transition:"fade-transition"}}),i("v-carousel-item",{key:"3",attrs:{src:"img/Call_center.png","reverse-transition":"fade-transition",transition:"fade-transition"}}),i("v-carousel-item",{key:"4",attrs:{src:"img/Arte_espiritu.png","reverse-transition":"fade-transition",transition:"fade-transition"}}),i("v-carousel-item",{key:"5",attrs:{src:"img/Arte_manos.png","reverse-transition":"fade-transition",transition:"fade-transition"}})],1)],1)},s=[],r={data:function(){return{}},methods:{showConfirmation:function(){var t=this;this.$confirm("Modal demo para mostrar la confirmacion",(function(){t.$message.success("Presionaste aceptar")}),(function(){t.$message.warning("Presionaste cancelar")}))},showAlert:function(){this.$alert("Modal demo para mostrar un alert")},showBlock:function(){var t=this;this.$waiting(!0,"Modal demo para mostrar una pantalla bloqueante que se eliminar dentro de 5 segundos"),setTimeout((function(){t.$waiting(!1)}),5e3)}},mounted:function(){var t=this;this.$nextTick((function(){t.$storage.removeUser(),t.$storage.remove("menu"),t.$storage.remove("token"),t.$storage.remove("sidenav"),t.$storage.remove("permissions"),t.$store.commit("setAuth",!1),t.$store.commit("setMain",!1),"/"!==t.$route.path&&t.$router.push("/")}))}},o=r,a=(i("01cf"),i("2877")),c=i("6544"),u=i.n(c),l=i("b0af"),h=i("5e66"),d=i("3e35"),v=Object(a["a"])(o,n,s,!1,null,"6451a406",null);e["default"]=v.exports;u()(v,{VCard:l["a"],VCarousel:h["a"],VCarouselItem:d["a"]})},"13b3":function(t,e,i){},"1e6c":function(t,e,i){"use strict";var n=i("9d65"),s=i("4e82"),r=i("c3f0"),o=i("80d2"),a=i("58df"),c=Object(a["a"])(n["a"],Object(s["a"])("windowGroup","v-window-item","v-window"));e["a"]=c.extend().extend().extend({name:"v-window-item",directives:{Touch:r["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.showLazyContent(this.genDefaultSlot()))},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(o["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(o["g"])(t.clientHeight))}))}},render:function(t){return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},[this.genWindowItem()])}})},"3e35":function(t,e,i){"use strict";var n=i("5530"),s=i("1e6c"),r=i("adda"),o=i("58df"),a=i("1c87"),c=Object(o["a"])(s["a"],a["a"]);e["a"]=c.extend({name:"v-carousel-item",inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(r["a"],{staticClass:"v-carousel__item",props:Object(n["a"])(Object(n["a"])({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners},[this.$slots.default,this.$createElement("template",{slot:"placeholder"},this.$slots.placeholder)])]},genWindowItem:function(){var t=this.generateRouteLink(),e=t.tag,i=t.data;return i.staticClass="v-window-item",i.directives.push({name:"show",value:this.isActive}),this.$createElement(e,i,this.showLazyContent(this.genDefaultSlot()))}}})},"5e66":function(t,e,i){"use strict";i("a9e3");var n=i("5530"),s=(i("63b7"),i("f665")),r=i("afdd"),o=i("9d26"),a=i("37c6"),c=i("604c"),u=c["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return c["a"].options.computed.classes.call(this)}},methods:{genData:c["a"].options.methods.genData}}),l=i("80d2"),h=i("d9bd");e["a"]=s["a"].extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(t){return t>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(t,e){t!==e&&t&&(this.internalHeight=t)},cycle:function(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(h["a"])("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:s["a"].options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var t=this,e=this.items.length,i=[],n=0;n<e;n++){var s=this.$createElement(r["a"],{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",n+1,e)},props:{icon:!0,small:!0,value:this.getValue(this.items[n],n)}},[this.$createElement(o["a"],{props:{size:18}},this.delimiterIcon)]);i.push(s)}return this.$createElement(u,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(e){t.internalValue=e}}},i)},genProgress:function(){return this.$createElement(a["a"],{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(t){var e=s["a"].options.render.call(this,t);return e.data.style="height: ".concat(Object(l["g"])(this.height),";"),this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}})},"63b7":function(t,e,i){},afdd:function(t,e,i){"use strict";var n=i("8336");e["a"]=n["a"]},f665:function(t,e,i){"use strict";i("99af"),i("7db0"),i("c740");var n=i("5530"),s=(i("13b3"),i("c3f0")),r=i("afdd"),o=i("9d26"),a=i("604c");e["a"]=a["a"].extend({name:"v-window",provide:function(){return{windowGroup:this}},directives:{Touch:s["a"]},props:{activeClass:{type:String,default:"v-window-item--active"},continuous:Boolean,mandatory:{type:Boolean,default:!0},nextIcon:{type:[Boolean,String],default:"$next"},prevIcon:{type:[Boolean,String],default:"$prev"},reverse:{type:Boolean,default:void 0},showArrows:Boolean,showArrowsOnHover:Boolean,touch:Object,touchless:Boolean,value:{required:!1},vertical:Boolean},data:function(){return{changedByDelimiters:!1,internalHeight:void 0,transitionHeight:void 0,transitionCount:0,isBooted:!1,isReverse:!1}},computed:{isActive:function(){return this.transitionCount>0},classes:function(){return Object(n["a"])(Object(n["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-window--show-arrows-on-hover":this.showArrowsOnHover})},computedTransition:function(){if(!this.isBooted)return"";var t=this.vertical?"y":"x",e=this.$vuetify.rtl&&"x"===t?!this.internalReverse:this.internalReverse,i=e?"-reverse":"";return"v-window-".concat(t).concat(i,"-transition")},hasActiveItems:function(){return Boolean(this.items.find((function(t){return!t.disabled})))},hasNext:function(){return this.continuous||this.internalIndex<this.items.length-1},hasPrev:function(){return this.continuous||this.internalIndex>0},internalIndex:function(){var t=this;return this.items.findIndex((function(e,i){return t.internalValue===t.getValue(e,i)}))},internalReverse:function(){return void 0!==this.reverse?this.reverse:this.isReverse}},watch:{internalIndex:"updateReverse"},mounted:function(){var t=this;window.requestAnimationFrame((function(){return t.isBooted=!0}))},methods:{genContainer:function(){var t=[this.$slots.default];return this.showArrows&&t.push(this.genControlIcons()),this.$createElement("div",{staticClass:"v-window__container",class:{"v-window__container--is-active":this.isActive},style:{height:this.internalHeight||this.transitionHeight}},t)},genIcon:function(t,e,i){var n=this;return this.$createElement("div",{staticClass:"v-window__".concat(t)},[this.$createElement(r["a"],{props:{icon:!0},attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.".concat(t))},on:{click:function(){n.changedByDelimiters=!0,i()}}},[this.$createElement(o["a"],{props:{large:!0}},e)])])},genControlIcons:function(){var t=[],e=this.$vuetify.rtl?this.nextIcon:this.prevIcon;if(this.hasPrev&&e&&"string"===typeof e){var i=this.genIcon("prev",e,this.prev);i&&t.push(i)}var n=this.$vuetify.rtl?this.prevIcon:this.nextIcon;if(this.hasNext&&n&&"string"===typeof n){var s=this.genIcon("next",n,this.next);s&&t.push(s)}return t},getNextIndex:function(t){var e=(t+1)%this.items.length,i=this.items[e];return i.disabled?this.getNextIndex(e):e},getPrevIndex:function(t){var e=(t+this.items.length-1)%this.items.length,i=this.items[e];return i.disabled?this.getPrevIndex(e):e},next:function(){if(this.isReverse=this.$vuetify.rtl,this.hasActiveItems&&this.hasNext){var t=this.getNextIndex(this.internalIndex),e=this.items[t];this.internalValue=this.getValue(e,t)}},prev:function(){if(this.isReverse=!this.$vuetify.rtl,this.hasActiveItems&&this.hasPrev){var t=this.getPrevIndex(this.internalIndex),e=this.items[t];this.internalValue=this.getValue(e,t)}},updateReverse:function(t,e){this.changedByDelimiters?this.changedByDelimiters=!1:this.isReverse=t<e}},render:function(t){var e=this,i={staticClass:"v-window",class:this.classes,directives:[]};if(!this.touchless){var n=this.touch||{left:function(){e.$vuetify.rtl?e.prev():e.next()},right:function(){e.$vuetify.rtl?e.next():e.prev()},end:function(t){t.stopPropagation()},start:function(t){t.stopPropagation()}};i.directives.push({name:"touch",value:n})}return t("div",i,[this.genContainer()])}})}}]);