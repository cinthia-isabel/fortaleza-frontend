(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["llamadas"],{"2bfd":function(e,t,a){},"6ca7":function(e,t,a){},7860:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user--crud"},[a("crud-table",{attrs:{headers:e.headers,url:e.url,filters:e.filters,widthModal:750,order:e.order,custom:!0},scopedSlots:e._u([{key:"items",fn:function(t){return[a("tr",{class:"X"===t.items.Estado?"fila-roja":""},[a("td",[a("v-tooltip",{attrs:{bottom:"",color:"success"},scopedSlots:e._u([{key:"activator",fn:function(n){var i=n.on;return[a("v-btn",e._g({attrs:{disabled:"X"===t.items.Estado,icon:""},on:{click:function(a){return e.showForm(t)}}},i),[a("v-icon",{attrs:{color:"success"}},[e._v("phone")])],1)]}}],null,!0)},[a("span",[e._v("Atender llamada")])]),[1,3].includes(e.$storage.getUser().id_rol)?a("v-tooltip",{attrs:{bottom:"",color:"secondary"},scopedSlots:e._u([{key:"activator",fn:function(n){var i=n.on;return[a("v-btn",e._g({attrs:{disabled:"X"===t.items.Estado,icon:""},on:{click:function(a){return e.asignCall(t)}}},i),[a("v-icon",{attrs:{color:"secondary"}},[e._v("person_search")])],1)]}}],null,!0)},[a("span",[e._v("Asignar llamada")])]):e._e()],1),a("td",[e._v(e._s(t.items.Celular))]),a("td",[e._v(e._s(t.items.FechaLlamada))]),a("td",[e._v(e._s(t.items.Tipo))]),a("td",[e._v(" "+e._s("P"===t.items.Estado?"Pendiente":"Bloqueado")+" ")])])]}}])},[[1,3].includes(e.$storage.getUser().id_rol)?a("template",{slot:"buttons"},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-btn",e._g({staticClass:"ml-3",attrs:{slot:"activator",color:"primary",dark:"",text:""},nativeOn:{click:function(t){t.stopPropagation(),e.form={},e.dialogAdd=!0}},slot:"activator"},n),[a("v-icon",{staticClass:"mr-2",attrs:{dark:""}},[e._v("add")]),e._v("Agregar llamada ")],1)]}}],null,!1,723803794)},[a("span",[e._v(" Agregar llamada ")])])],1):e._e()],2),a("v-dialog",{attrs:{persistent:"",width:"620"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v("Número: "+e._s(e.item.Celular)+", Tipo de contacto: "+e._s(e.item.Tipo))])]),a("v-card-text",[a("v-container",[a("v-form",{ref:"form",on:{submit:function(t){return t.preventDefault(),e.sendData(t)}}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-checkbox",{staticClass:"mb-2",attrs:{color:"primary",label:"¿No Contesto la llamada?",outlined:"","hide-details":"",dense:"",required:""},on:{change:e.marcarNoContesto},model:{value:e.form.noContesta,callback:function(t){e.$set(e.form,"noContesta",t)},expression:"form.noContesta"}})],1),(e.item.NumeroIntentos||1)+1===3&&e.form.noContesta?a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-textarea",{staticClass:"mb-2",attrs:{color:"primary",label:"Comentarios",placeholder:"Ingrese las posibles razones por las que no puedo realizar la llamada",outlined:"","hide-details":"",dense:"",rules:[function(e){return!!e||"Este campo no puede estar vacio"}],required:""},model:{value:e.form.ComentarioNoRespondio,callback:function(t){e.$set(e.form,"ComentarioNoRespondio",t)},expression:"form.ComentarioNoRespondio"}})],1):e._e(),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{staticClass:"mb-2",attrs:{color:"primary",label:"Nombres",outlined:"","hide-details":"",dense:"",disabled:e.form.noContesta,required:""},model:{value:e.form.nombres,callback:function(t){e.$set(e.form,"nombres",t)},expression:"form.nombres"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{staticClass:"mb-2",attrs:{color:"primary",label:"Apellidos",outlined:"","hide-details":"",dense:"",disabled:e.form.noContesta,required:""},model:{value:e.form.apellidos,callback:function(t){e.$set(e.form,"apellidos",t)},expression:"form.apellidos"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{staticClass:"mb-2",attrs:{color:"primary",label:"Ciudad",outlined:"","hide-details":"",dense:"",disabled:e.form.noContesta,required:""},model:{value:e.form.ciudad,callback:function(t){e.$set(e.form,"ciudad",t)},expression:"form.ciudad"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{staticClass:"mb-2",attrs:{color:"primary",label:"Iglesia o congregacion a la que asiste",outlined:"","hide-details":"",dense:"",disabled:e.form.noContesta,required:""},model:{value:e.form.iglesiaCongregacion,callback:function(t){e.$set(e.form,"iglesiaCongregacion",t)},expression:"form.iglesiaCongregacion"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("span",[e._v("Categoria de la llamada:")]),a("v-radio-group",{attrs:{color:"primary",disabled:e.form.noContesta,rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}]},model:{value:e.form.categoriaLlamada,callback:function(t){e.$set(e.form,"categoriaLlamada",t)},expression:"form.categoriaLlamada"}},e._l(e.aMotivos,(function(e){return a("v-radio",{key:e.id_motivo,attrs:{label:e.Descripcion,value:e.id_motivo,color:"primary","hide-details":"",dense:""}})})),1)],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-textarea",{staticClass:"mb-2",attrs:{color:"primary",label:"Motivo de la llamada *",outlined:"","hide-details":"",disabled:e.form.noContesta,rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}],dense:""},model:{value:e.form.motivoLlamada,callback:function(t){e.$set(e.form,"motivoLlamada",t)},expression:"form.motivoLlamada"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-textarea",{staticClass:"mb-2",attrs:{label:"Notas de seguimiento *",rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}],"hide-details":"",dense:"",disabled:e.form.noContesta,outlined:""},model:{value:e.form.notasSeguimiento,callback:function(t){e.$set(e.form,"notasSeguimiento",t)},expression:"form.notasSeguimiento"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-switch",{attrs:{color:"primary",label:"¿Acepta al Señor?","hide-details":"",disabled:e.form.noContesta,dense:""},model:{value:e.form.recibirDios,callback:function(t){e.$set(e.form,"recibirDios",t)},expression:"form.recibirDios"}})],1),e.form.recibirDios?a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-radio-group",{attrs:{color:"primary",disabled:e.form.noContesta,rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}]},model:{value:e.form.recibirDiosOpcion,callback:function(t){e.$set(e.form,"recibirDiosOpcion",t)},expression:"form.recibirDiosOpcion"}},[a("v-radio",{attrs:{label:"Ya tiene al señor como su salvador",value:"SIEMPRE",color:"primary","hide-details":"",dense:""}}),a("v-radio",{attrs:{label:"Acepto al señor durante la llamada",value:"LLAMADA",color:"primary","hide-details":"",dense:""}})],1)],1):e._e(),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-switch",{staticClass:"mb-2",attrs:{color:"primary","hide-details":"",disabled:e.form.noContesta,dense:"",label:"¿Quiere que se le contacte nuevamente?"},model:{value:e.form.contactame,callback:function(t){e.$set(e.form,"contactame",t)},expression:"form.contactame"}})],1),e.form.contactame?a("v-col",{attrs:{cols:"12",sm:"7",md:"7"}},[a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"250px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-text-field",e._g({staticClass:"mb-2",attrs:{disabled:e.form.noContesta,label:"Fecha de seguimiento *",hint:"DD/MM/YYYY",clearable:"","persistent-hint":"",outlined:"","hide-details":"",dense:"","prepend-icon":"event",autocomplete:"off",rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}]},on:{change:e.handleSelectDate,blur:e.isValidDate,keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.isValidDate(t))}},model:{value:e.form.fechaSeguimiento,callback:function(t){e.$set(e.form,"fechaSeguimiento",t)},expression:"form.fechaSeguimiento"}},n))]}}],null,!1,1572009871),model:{value:e.menuDatepicker,callback:function(t){e.menuDatepicker=t},expression:"menuDatepicker"}},[a("v-date-picker",{attrs:{locale:"es-EN",color:"primary","no-title":"",min:e.minDate||void 0,max:e.maxDate||void 0},on:{"click:date":e.handleSelectDate,input:function(t){e.menuDatepicker=!1}},model:{value:e.mCalendar,callback:function(t){e.mCalendar=t},expression:"mCalendar"}})],1)],1):e._e(),e.form.contactame?a("v-col",{attrs:{cols:"12",sm:"5",md:"5"}},[a("v-text-field",{staticClass:"ml-2 mb-2",attrs:{label:"Hora de seguimiento *",placeholder:"15:40",outlined:"",disabled:e.form.noContesta,rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}],"hide-details":"",dense:""},model:{value:e.form.horaSeguimiento,callback:function(t){e.$set(e.form,"horaSeguimiento",t)},expression:"form.horaSeguimiento"}})],1):e._e(),e.form.contactame?a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("h4",[e._v("Seguimiento: ")]),a("v-radio-group",{attrs:{disabled:e.form.noContesta,rules:e.form.noContesta?[]:[function(e){return!!e||"No puede estar vacio"}]},model:{value:e.form.seguimiento,callback:function(t){e.$set(e.form,"seguimiento",t)},expression:"form.seguimiento"}},[a("v-radio",{attrs:{color:"primary",label:"Llamada",value:"LLAMADA"}}),a("v-radio",{attrs:{color:"primary",label:"Whatsapp",value:"WHATSAPP"}})],1)],1):e._e(),a("v-col",{attrs:{cols:"12"}},[a("small",{staticClass:"red--text"},[e._v("* Todos los campos marcados son requeridos")])]),a("v-col",{attrs:{cols:"12"}},[a("v-card-actions",{staticClass:"mb-0 pb-0"},[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:e.cancelCall}},[e._v("Cancelar")]),a("v-btn",{attrs:{type:"submit",color:"primary"}},[e._v("Guardar")])],1)],1)],1)],1)],1)],1)],1)],1),a("v-dialog",{attrs:{persistent:"",width:"450"},model:{value:e.dialogAdd,callback:function(t){e.dialogAdd=t},expression:"dialogAdd"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline primary--text"},[e._v("Agregar nueva llamada")])]),a("v-card-text",[a("v-container",[a("v-form",{ref:"formAdd",on:{submit:function(t){return t.preventDefault(),e.sendDataAdd(t)}}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{staticClass:"mb-2",attrs:{color:"primary",label:"Celular *",outlined:"","hide-details":"",dense:"",rules:[function(e){return!!e||"No puede estar vacio"}],required:""},model:{value:e.form.celular,callback:function(t){e.$set(e.form,"celular",t)},expression:"form.celular"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-radio-group",{attrs:{color:"primary",rules:[function(e){return!!e||"No puede estar vacio"}]},model:{value:e.form.tipo,callback:function(t){e.$set(e.form,"tipo",t)},expression:"form.tipo"}},[a("v-radio",{attrs:{label:"Llamada",value:"LLAMADA",color:"primary","hide-details":"",dense:""}}),a("v-radio",{attrs:{label:"Whatsapp",value:"WHATSAPP",color:"primary","hide-details":"",dense:""}})],1)],1),a("v-col",{attrs:{cols:"12"}},[a("small",{staticClass:"red--text"},[e._v("* Todos los campos marcados son requeridos")])]),a("v-col",{attrs:{cols:"12"}},[a("v-card-actions",{staticClass:"mb-0 pb-0"},[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:function(t){e.dialogAdd=!1}}},[e._v("Cancelar")]),a("v-btn",{attrs:{type:"submit",color:"primary"}},[e._v("Guardar")])],1)],1)],1)],1)],1)],1)],1)],1),a("v-dialog",{attrs:{persistent:"",width:"450"},model:{value:e.dialogAsignCall,callback:function(t){e.dialogAsignCall=t},expression:"dialogAsignCall"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline primary--text"},[e._v("Asignar llamada")])]),a("v-card-text",[a("v-container",[a("v-form",{ref:"formAsignCall",on:{submit:function(t){return t.preventDefault(),e.sendDataAsignCall(t)}}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-autocomplete",{attrs:{label:"Asignar a:","item-text":"Nombre","item-value":"id","return-object":"",clearable:"","prepend-icon":"account_circle",rules:[function(e){return!!e||"Este campo no puede estar vacio"}],items:e.aUsuariosDisponibles,"no-data-text":"No existen usuarios"},model:{value:e.form.asignar,callback:function(t){e.$set(e.form,"asignar",t)},expression:"form.asignar"}})],1),a("v-col",{attrs:{cols:"12"}},[a("small",{staticClass:"red--text"},[e._v("* Todos los campos marcados son requeridos")])]),a("v-col",{attrs:{cols:"12"}},[a("v-card-actions",{staticClass:"mb-0 pb-0"},[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:function(t){e.dialogAsignCall=!1}}},[e._v("Cancelar")]),a("v-btn",{attrs:{type:"submit",color:"primary"}},[e._v("Guardar")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},i=[],o=(a("99af"),a("4d63"),a("ac1f"),a("25f0"),a("5319"),a("1276"),a("3835")),s=a("5530"),r=(a("96cf"),a("1da1")),l=a("a5b9"),c=a("83c0"),u={mixins:[c["a"]],data:function(){return{interval:null,dialog:null,mCalendar:null,dialogAdd:null,dialogAsignCall:null,aUsuariosDisponibles:[],aMotivos:[],minDate:void 0,maxDate:void 0,url:"unicall",item:{},order:["createdAt","DESC"],headers:[{text:"Acciones",divider:!1,sortable:!1,align:"center",value:"ACTIONS"},{text:"Celular",align:"center",value:"Celular",sortable:!1},{text:"Fecha de la llamada",value:"FechaLlamada",sortable:!1},{text:"Tipo",align:"center",value:"Tipo",sortable:!1},{text:"Estado",align:"center",value:"Estado",sortable:!1}],breakpoints:["md","lg","xl"],menuDatepicker:null,form:{},filters:[]}},watch:{mCalendar:function(e){this.form.fechaSeguimiento=this.formatDate(e)}},destroyed:function(){clearInterval(this.interval)},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$service.get("usuarios-disponibles");case 2:return e.aUsuariosDisponibles=t.sent,t.next=5,e.$service.get("motivo-llamada");case 5:e.aMotivos=t.sent,e.interval=setInterval((function(){e.updateList()}),6e4);case 7:case"end":return t.stop()}}),t)})))()},methods:{marcarNoContesto:function(){this.form=Object(s["a"])(Object(s["a"])({},this.form),{},{ComentarioNoRespondio:null})},sendDataAsignCall:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$refs.formAsignCall.validate()){t.next=8;break}return a={interno:e.form.asignar.Interno,idCall:e.item.idCall},t.next=4,e.$service.post("asignar-llamada",a);case 4:n=t.sent,n.finalizado&&(e.$message.success(n.mensaje),e.dialogAsignCall=null,e.form={},e.updateList()),t.next=9;break;case 8:e.$message.error("Faltan campos por llenar");case 9:case"end":return t.stop()}}),t)})))()},asignCall:function(e){var t=e.items;this.dialogAsignCall=!0,this.item=t},sendData:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,!e.$refs.form.validate()){t.next=17;break}if(a=new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),!e.form.horaSeguimiento||a.test(e.form.horaSeguimiento)){t.next=6;break}return e.$message.error("Formato incorrecto de la hora de seguimiento, tiene que ser por ejemplo: 15:00"),t.abrupt("return");case 6:return e.form.motivoLlamada&&e.form.notasSeguimiento&&(e.form=Object(s["a"])(Object(s["a"])({},e.form),{},{motivoLlamada:e.form.motivoLlamada.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,"").replace(/['"]+/g,""),notasSeguimiento:e.form.notasSeguimiento.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,"").replace(/['"]+/g,"")})),e.$waiting(!0,"Espere unos segundos por favor..."),t.next=10,e.$service.post("llamada-finalizada",Object(s["a"])(Object(s["a"])({},e.form),{},{numeroIntentos:e.item.NumeroIntentos,idCall:e.item.idCall,interno:e.$storage.getUser().interno,celular:e.item.Celular,idUser:e.$storage.getUser().id}));case 10:n=t.sent,n.finalizado?e.$message.success("Registro exitosamente actualizado"):e.$message.error(n.mensaje),e.$waiting(!1),e.dialog=!1,setTimeout((function(){e.updateList()}),100),t.next=19;break;case 17:e.$waiting(!1),e.$message.error("Faltan campos por llenar");case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](0),e.$waiting(!1);case 24:case"end":return t.stop()}}),t,null,[[0,21]])})))()},sendDataAdd:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,!e.$refs.formAdd.validate()){t.next=12;break}return e.$waiting(!0,"Espere unos segundos por favor..."),t.next=5,e.$service.post("nueva-llamada",Object(s["a"])(Object(s["a"])({},e.form),{},{OrigenRegistro:"SISTEMA"}));case 5:a=t.sent,a.finalizado?e.$message.success("Registro exitosamente actualizado"):e.$message.error(a.mensaje),e.$waiting(!1),e.dialogAdd=!1,setTimeout((function(){e.updateList()}),100),t.next=14;break;case 12:e.$waiting(!1),e.$message.error("Faltan campos por llenar");case 14:t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),e.$waiting(!1);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()},formatDate:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";if(!e)return null;if("-"===a){var n=e.split(a),i=Object(o["a"])(n,3),s=i[0],r=i[1],l=i[2];t="".concat(l,"/").concat(r,"/").concat(s)}else{var c=e.split(a),u=Object(o["a"])(c,3),d=u[0],m=u[1],f=u[2];t="".concat(f,"-").concat(m,"-").concat(d)}return t},cancelCall:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$service.put("estado-usuario",{idUser:e.$storage.getUser().id,libre:1,conectado:1});case 2:e.dialog=!1;case 3:case"end":return t.stop()}}),t)})))()},showForm:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.items,t.item=n,t.form={},a.next=5,t.$service.put("estado-usuario",{idUser:t.$storage.getUser().id,libre:0,conectado:1});case 5:t.dialog=!0;case 6:case"end":return a.stop()}}),a)})))()},handleSelectDate:function(){this.isValidDate()},isValidDate:function(){var e=this;setTimeout((function(){var t=e.form.fechaSeguimiento?e.form.fechaSeguimiento.split("/"):[];t.length<2&&(e.form.fechaSeguimiento=null)}),100)}},components:{CrudTable:l["a"]}},d=u,m=(a("ed8a"),a("2877")),f=a("6544"),h=a.n(f),p=a("c6a6"),v=a("8336"),b=a("b0af"),g=a("99d9"),x=(a("d3b7"),a("6ca7"),a("ec29"),a("9d26")),C=a("c37a"),I=a("fe09"),S=I["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},C["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.disabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.validationState)),this.$createElement(x["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}),k=a("62ad"),y=a("a523"),D=a("2e4b"),$=a("169a"),w=a("4bd4"),_=a("132d"),A=a("e449"),O=a("67b6"),V=a("43a6"),j=a("0fd9"),T=a("2fa4"),F=a("b73d"),L=a("8654"),N=a("a844"),R=a("3a2f"),M=Object(m["a"])(d,n,i,!1,null,"24dda8fe",null);t["default"]=M.exports;h()(M,{VAutocomplete:p["a"],VBtn:v["a"],VCard:b["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VCheckbox:S,VCol:k["a"],VContainer:y["a"],VDatePicker:D["a"],VDialog:$["a"],VForm:w["a"],VIcon:_["a"],VMenu:A["a"],VRadio:O["a"],VRadioGroup:V["a"],VRow:j["a"],VSpacer:T["a"],VSwitch:F["a"],VTextField:L["a"],VTextarea:N["a"],VTooltip:R["a"]})},c6a6:function(e,t,a){"use strict";a("4de4"),a("7db0"),a("c975"),a("d81d"),a("45fc"),a("498a");var n=a("5530"),i=(a("2bfd"),a("b974")),o=a("8654"),s=a("80d2"),r=Object(n["a"])(Object(n["a"])({},i["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1});t["a"]=i["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,a){return a.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:i["a"].options.props.menuProps.type,default:function(){return r}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){return e.filter(t,String(e.internalSearch),String(e.getText(t)))}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch=e,this.$emit("update:search-input",e)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=i["a"].options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),Object(n["a"])(Object(n["a"])({},r),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(t){return e.valueComparator(e.getValue(t),e.getValue(e.internalValue))}))},listData:function(){var e=i["a"].options.computed.listData.call(this);return e.props=Object(n["a"])(Object(n["a"])({},e.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=void 0)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(e,t){var a=this;e!==t&&(this.setMenuIndex(-1),this.$nextTick((function(){a.internalSearch&&(1===e.length||a.autoSelectFirst)&&(a.$refs.menu.getTiles(),a.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===s["v"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===s["v"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==s["v"].backspace&&e!==s["v"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){if(!this.readonly){var e=this.selectedItems.length-1;if(-1!==this.selectedIndex){var t=this.selectedItems[this.selectedIndex];if(!this.getDisabled(t)){var a=this.selectedIndex===e?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===a?this.setValue(this.multiple?[]:void 0):this.selectItem(t),this.selectedIndex=a}}else this.selectedIndex=e}},clearableCallback:function(){this.internalSearch=void 0,i["a"].options.methods.clearableCallback.call(this)},genInput:function(){var e=o["a"].options.methods.genInput.call(this);return e.data=e.data||{},e.data.attrs=e.data.attrs||{},e.data.attrs.autocomplete=e.data.attrs.autocomplete||"off",e.data.domProps=e.data.domProps||{},e.data.domProps.value=this.internalSearch,e},genInputSlot:function(){var e=i["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections:function(){return this.hasSlot||this.multiple?i["a"].options.methods.genSelections.call(this):[]},onClick:function(){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,a=t.value;t.value&&this.activateMenu(),this.internalSearch=a,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;i["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){i["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(){this.activateMenu()},selectItem:function(e){i["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){i["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){if(-1!==this.selectedIndex){var t=this.selectedItems[this.selectedIndex],a=this.getText(t);e.clipboardData.setData("text/plain",a),e.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",a),e.preventDefault()}}}})},ed8a:function(e,t,a){"use strict";var n=a("f1a2"),i=a.n(n);i.a},f1a2:function(e,t,a){}}]);