'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var vSelect=_interopDefault(require('vue-select')),kUtilsJs=require('k-utils-js'),lodash=require('lodash'),dateFns=require('date-fns'),flatPickr=_interopDefault(require('vue-flatpickr-component'));require('flatpickr/dist/flatpickr.css');var R=require('ramda'),dateFnsTz=require('date-fns-tz'),ConfirmDatePlugin=_interopDefault(require('flatpickr/dist/plugins/confirmDate/confirmDate'));require('flatpickr/dist/plugins/confirmDate/confirmDate.css');var Monaco=_interopDefault(require('vue-monaco')),vue2Editor=require('vue2-editor'),Vue=_interopDefault(require('vue/dist/vue.esm')),Vuex=_interopDefault(require('vuex'));require('intl-tel-input/build/css/intlTelInput.css');var intlTelInput=_interopDefault(require('intl-tel-input'));//

var script = {
  inheritAttrs: false,
  components:{
    vSelect: vSelect
  },

  props: {
    append: {
      type: String,
    },
    choices: {
      type: String,
      require: true
    },
    include_blank: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    id: {
      type: String,
      require: true
    },
    prepend: {
      type: String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    choicesToJson: function() {
      return (
          this.$store.getters.getPotentialValues(this.$props.name) ||
          JSON.parse(this.$props.choices)
      )

    },
    displayValidationError: function () {
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    includeBlank: function(){
      return (this.$props.include_blank === 'true')
    },
    inputClass: function () {
      return {
        "form-control": true,
        "custom-autocomplete": true,
        "is-invalid": (this.inputTouched && this.inputError)
      }
    },

    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function () {
      return {
        "input-block": true,
      }
    },
    inputTouched: {
      get: function get () {

        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        console.log(value);
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },

  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
  methods: {
  },
  mounted: function () {
    this.$nextTick(function () {
    });
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "+((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" "),_c('vSelect',_vm._b({class:[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : ''],attrs:{"id":_vm.id,"label":"display_name","value":"id","name":_vm.name,"reduce":function (option) { return option.id; },"options":_vm.choicesToJson},on:{"search:focus":function($event){_vm.inputTouched=true;}},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}},'vSelect',this.$attrs,false)),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"invalid-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-6eaa9103";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );//
var script$1 = {
  inheritAttrs: false,
  props: {
    checked_value: {
      type:String,
      required:true
    },
    unchecked_value: {
      type:String,
      required:true
    },
    name:{
      type:String,
      require:true
    },
    id:{
      type:String,
      require:true
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    inputClass: function(){
      return {
        "input-block__field--invalid": (this.displayValidationError), //r equired in order to be able to display the error message in red
      }
    },
    inputError: function() {
      var error = this.$store.getters.getError(this.$props.name);
      if (this.inputTouched) {
        return (kUtilsJs.Utils.isBlank(error) ? null : error)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {
        var value = this.$store.getters.getValue(this.$props.name);
        return ((value === true) || (value === this.$props.name))
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  }
};/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"checkbox__container",attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.unchecked_value))+"> "+((((this.$attrs).type)==='checkbox')?("<input"+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("id",_vm.id))+" type=\"checkbox\""+(_vm._ssrAttr("value",_vm.checked_value))+(_vm._ssrAttr("checked",Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,_vm.checked_value)>-1:(_vm.inputValue)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass("checkbox",_vm.inputClass))+">"):(((this.$attrs).type)==='radio')?("<input"+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("id",_vm.id))+" type=\"radio\""+(_vm._ssrAttr("value",_vm.checked_value))+(_vm._ssrAttr("checked",_vm._q(_vm.inputValue,_vm.checked_value)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass("checkbox",_vm.inputClass))+">"):("<input"+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("type",(this.$attrs).type))+(_vm._ssrAttr("value",_vm.checked_value))+(_vm._ssrAttr("value",(_vm.inputValue)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass("checkbox",_vm.inputClass))+">"))+" <span class=\"checkbox__custom\"></span>\n   \n  "+((_vm.displayValidationError)?("<div"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</div>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<div"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</div>"):"<!---->"))])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = "data-v-6047c06e";
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$2 = {
 data: function data () {
    return {
      config: {
        dateFormat: this.pickerFormat(),
        allowInput: true,
      },
      debouncedSetFormattedValue: lodash.debounce(this.setFormattedValue, 500),
    };
  },
  components: {
    flatPickr: flatPickr,
  },
  inheritAttrs: false,
  props: {
    append: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    prepend: {
      type: String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false",
    },
    display_format: {
      type: String,
      require: false,
      default: "dd/MM/yyyy",
    },
  },
  computed: {
    displayValidationError: function () {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
    suggestValue: function () {
      return this.$props.suggest_value === "true";
    },
    useSuggestedValue: function () {
      return this.suggestValue && !this.inputTouched;
    },
    suggestedValue: function () {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    inputClass: function () {
      return {
        "input-block__field": true,
        "input-block__field--invalid": this.displayValidationError,
        datepicker: true,
      };
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name);
      } else {
        return null;
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name);
      } else {
        return null;
      }
    },
    inputGroupClass: function () {
      return {
        "input-block": true,
      };
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name);
      },
      set: function set (value) {
        this.$store.commit("setTouched", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputValue: {
      get: function get () {
        return this.$store.getters.getValue(this.$props.name);
      },
      set: function set (value) {
        this.$store.dispatch("update", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputFormattedValue: {
      get: function get () {
        var value = this.$store.getters.getValue(this.$props.name);
        var date = this.convertStringToDate(value, "yyyy-MM-dd" );

        if (dateFns.isValid(date)) {
          return dateFns.format(date, this.$props.display_format);
        } else {
          return "";
        }
      },
      set: function set (value) {
        // user is probably typing a new date, wait for him to finish
        // and avoid unnecessary updates of the state
        this.debouncedSetFormattedValue(value);
      },
    },
  },
  watch: {
    suggestedValue: function (value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    },
  },
  methods: {
    onFocusDatePicker: function () {
      this.inputTouched = true;
    },
    checkIsValidFormat: function (value, display_format) {
      console.log("isMatch", value, display_format, dateFns.isMatch(value, display_format));
      return !R.isNil(value) && !R.isEmpty(value) && dateFns.isMatch(value, display_format)
    },
    pickerFormat: function () {
      var format;

      if (this.$props.display_format === 'dd MMM yy') {
        format = 'j M y';
      } else if (this.$props.display_format === 'dd/MM/yyyy') {
        format = 'd/m/Y';
      } else {
        format = 'd/m/Y';
      }

      return format
    },
    convertStringToDate: function(value, display_format) {
      return dateFns.isMatch(value, display_format) ? dateFns.parse(value, display_format, new Date()) : null
    },
    setFormattedValue: function (value) {
      var display_format =  this.$props.display_format;

      if (!R.isNil(value) && !R.isEmpty(value) && !dateFns.isMatch(value, display_format)) {
        // ignore non-blank & unmatched values
        // user is probably typing a new date, wait for him to finish
        return
      }

      var date = this.convertStringToDate(value, display_format);

      this.$store.dispatch("update", {
        value: dateFns.isValid(date) ? dateFns.format(date, "yyyy-MM-dd") : "",
        name: this.$props.name,
      });
    }
  },
};/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" <input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "),_c('flat-pickr',_vm._b({ref:"input",class:[
      _vm.inputClass,
      _vm.prepend ? 'input--has-prepend' : '',
      _vm.append ? 'input--has-append' : '' ],attrs:{"id":_vm.id,"config":_vm.config},on:{"on-open":_vm.onFocusDatePicker},model:{value:(_vm.inputFormattedValue),callback:function ($$v) {_vm.inputFormattedValue=$$v;},expression:"inputFormattedValue"}},'flat-pickr',this.$attrs,false)),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputError))+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputWarning))+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = "data-v-6c253526";
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$3 = {
  data: function data () {
    return {
      config: {
        dateFormat: this.pickerFormat(),
        allowInput: true,
        enableTime: true,
        time_24hr: true,
        "plugins": [new ConfirmDatePlugin({ confirmText: "Done" })]
      },
      debouncedSetFormattedValue: lodash.debounce(this.setFormattedValue, 500),
    };
  },
  components: {
    flatPickr: flatPickr,
  },
  inheritAttrs: false,
  props: {
    append: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    prepend: {
      type: String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false",
    },
    display_format: {
      type: String,
      require: false,
      default: "dd/MM/yyyy HH:mm",
    },
    time_zone: {
      type: String,
      require: true,

    }
  },
  computed: {
    displayValidationError: function () {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
    suggestValue: function () {
      return this.$props.suggest_value === "true";
    },
    useSuggestedValue: function () {
      return this.suggestValue && !this.inputTouched;
    },
    suggestedValue: function () {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    inputClass: function () {
      return {
        "input-block__field": true,
        "input-block__field--invalid": this.displayValidationError,
        datepicker: true,
      };
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name);
      } else {
        return null;
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name);
      } else {
        return null;
      }
    },
    inputGroupClass: function () {
      return {
        "input-block": true,
      };
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name);
      },
      set: function set (value) {
        this.$store.commit("setTouched", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputValue: {
      get: function get () {
        return this.$store.getters.getValue(this.$props.name);
      },
      set: function set (value) {
        this.$store.dispatch("update", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputFormattedValue: {
      get: function get () {
        var value = this.$store.getters.getValue(this.$props.name);
        var tempDate = value == null ? "" : new Date(value);

        if (dateFns.isValid(tempDate)) {
          // it is safe to parse Value using utcToZonedTime
          return dateFnsTz.format(
              dateFnsTz.utcToZonedTime(value, this.$props.time_zone),
              this.$props.display_format
          );
        } else {
          return "";
        }
      },
      set: function set (value) {
        // user is probably typing a new date, wait for him to finish
        // and avoid unnecessary updates of the state
        this.debouncedSetFormattedValue(value);
      },
    },
  },
  watch: {
    suggestedValue: function (value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;  // :fixme : make sure this really works with the timezones and the right format
      }
    },
  },
  methods: {
    onFocusDatePicker: function () {
      this.inputTouched = true;
    },
    pickerFormat: function () {
      var format;

      if (this.$props.display_format === 'dd MMM yy HH:mm') {
        format = 'j M y H:i';
      } else if (this.$props.display_format === 'dd/MM/yyyy HH:mm') {
        format = 'd/m/Y H:i';
      } else {
        format = 'd/m/Y H:i';
      }

      return format
    },
    setFormattedValue: function (value) {
      var display_format = this.$props.display_format;

      if (!R.isNil(value) && !R.isEmpty(value) && !dateFns.isMatch(value, display_format)) {
        // ignore non-blank & unmatched values
        // user is probably typing a new date, wait for him to finish
        return
      }

      var date = dateFns.parse(value, display_format, this.getCurrentDateInTimezone());
      var normalised_date = dateFns.isValid(date) ? dateFns.formatISO(dateFnsTz.zonedTimeToUtc(date, this.$props.time_zone)) : '';

      this.$store.dispatch("update", {
        value: normalised_date,
        name: this.$props.name,
      });
    },
    getCurrentDateInTimezone: function () {

      function zeroPad (num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
      }

      // construct the date in UTC (ex: 2014-06-25T10:00:00.000Z)
      var date = new Date();
      var year = zeroPad(date.getUTCFullYear(), 4);
      var month = zeroPad(date.getUTCMonth() + 1, 2);
      var day = zeroPad(date.getUTCDate(), 2);
      var hour = zeroPad(date.getUTCHours(), 2);
      var minute = zeroPad(date.getUTCMinutes(), 2);
      var second = zeroPad(date.getUTCSeconds(), 2);
      var dateString = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ".000Z";

      // convert to timezone
      var result = dateFnsTz.utcToZonedTime(dateString, this.$props.time_zone);

      return result
    }
  },
};/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" <input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "),_c('flat-pickr',_vm._b({ref:"input",class:[
          _vm.inputClass,
          _vm.prepend ? 'input--has-prepend' : '',
           _vm.append ? 'input--has-append' : '' ],attrs:{"id":_vm.id,"config":_vm.config},on:{"on-open":_vm.onFocusDatePicker},model:{value:(_vm.inputFormattedValue),callback:function ($$v) {_vm.inputFormattedValue=$$v;},expression:"inputFormattedValue"}},'flat-pickr',this.$attrs,false)),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape("\n    "+_vm._s(_vm.inputError)+"\n  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape("\n    "+_vm._s(_vm.inputWarning)+"\n  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = "data-v-4a2d4606";
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  inheritAttrs: false,
  props: {
    append: {
      type:String,
    },
    name:{
      type:String,
      require:true
    },
    id:{
      type:String,
      require:true
    },
    prepend: {
      type:String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    inputClass: function() {
      return {
        "input-block__field": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError)
      }
    },

    inputError: function() {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function() {
      return {
        "input-block": true
      }
    },
    inputTouched: {
      get: function get () {

        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },

  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
};/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" "+((((this.$attrs).type)==='checkbox')?("<input"+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+" type=\"checkbox\""+(_vm._ssrAttr("checked",Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass(null,[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : '']))+">"):(((this.$attrs).type)==='radio')?("<input"+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+" type=\"radio\""+(_vm._ssrAttr("checked",_vm._q(_vm.inputValue,null)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass(null,[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : '']))+">"):("<input"+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("type",(this.$attrs).type))+(_vm._ssrAttr("value",(_vm.inputValue)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass(null,[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : '']))+">"))+" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = "data-v-7f79c25e";
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$5 = {

  props: {
    "acceptCharset": {
      type: String,
      required: true,
      default: 'UTF-8'
    },
    "action": {
      type: String,
      required: true,
    },
    "enctype": {
      type: String,
    },
    "method": {
      type: String,
      required: true,
      default: "post"
    },
    "autoSubmit": {
      type: String,
      default: ''
    }
  },
  data: function() {
    return { timer: null }
  },
  computed: {
    values: function() {
      return this.$store.getters.getValue(
          this.$store.getters.getMeta('modelName')
      )
    }
  },
  methods:{
    "debounce": function(timeout){
      var this$1 = this;
      if ( timeout === void 0 ) timeout = 500;

      clearTimeout(this.timer);
      // GOTCHA: DO NOT USE form.submit() because it does not play well with HOTWIRE
      //  * instead, use form.requestSubmit() that acts as if a submit button were clicked
      //    and therefor is compatible with HOTWIRE
      this.timer = setTimeout(function () {  this$1.$refs.form.requestSubmit(); }, timeout);
    },

    "handleSubmit": function(event) {
      if (this.$store.getters.getMeta('disableValidation')) {
        return // early exit (will continue with the submit)
      }

      this.$store.commit('setTouched', {
            value: true,
            name: ((this.$store.getters.getMeta('modelName')) + "._submit")
          }
      );

      if (!this.$store.getters.getError(((this.$store.getters.getMeta('modelName')) + "._is_valid"))) {
        // invalid data => du not submit
        event.preventDefault();
      }
    },

    "ajaxBeforeSend": function(event) {
      if (!this.$store.getters.getError(((this.$store.getters.getMeta('modelName')) + "._is_valid"))) {
        // ignore RailsUjs: make that when using rails ujs with remote:true (aka local:false) we do not send the form
        // if the data is valid note: there is no test for this specific case !!
        event.preventDefault();
      }
    }
  },
  watch: {
    values: function(value, _oldValue) {
      if (this.$props.autoSubmit === 'onChange') {
        this.debounce(750);
      }
    }
  }

};/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{ref:"form",attrs:{"accept-charset":_vm.$props.acceptCharset,"action":_vm.$props.action,"data-values":_vm.$props.dataValues,"method":_vm.$props.method,"enctype":_vm.$props.enctype},on:{"submit":_vm.handleSubmit,"ajax:beforeSend":_vm.ajaxBeforeSend}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = "data-v-0bcd40d6";
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//

var script$6 = {
  inheritAttrs: false,
  props: {
    append: {
      type:String,
    },
    name:{
      type:String,
      require:true
    },
    id:{
      type:String,
      require:true
    },
    prepend: {
      type:String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
};/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (((this.$attrs).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],attrs:{"id":_vm.id,"name":_vm.name,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"change":function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.inputValue=$$c;}}}},'input',this.$attrs,false)):(((this.$attrs).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],attrs:{"id":_vm.id,"name":_vm.name,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"change":function($event){_vm.inputValue=null;}}},'input',this.$attrs,false),[]):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],attrs:{"id":_vm.id,"name":_vm.name,"type":(this.$attrs).type},domProps:{"value":(_vm.inputValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;}}},'input',this.$attrs,false),[])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = "data-v-5b08d70a";
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$7 = {
  inheritAttrs: false,
  props: {
    id:{
      type: String,
      require: true
    },
    name:{
      type: String,
      require: true
    },
    readonly: {
      type: Boolean,
      require: false,
      default: false
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  components: {
    Monaco: Monaco,
  },
  computed: {
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    inputClass: function() {
      return {
        "input-block__field": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError),
        "editor": true
      }
    },

    inputError: function() {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function() {
      return {
        "input-block": true,
      }
    },
    inputTouched: {
      get: function get () {

        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        // todo v-on:focus="inputTouched=true" does not work => it seems there isn't a onFocus event on monaco editor
        // workaround => set touch when input is changed
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );

        this.inputTouched = true;
      }
    },
    options: function() {
      return {
        readOnly: this.$props.readonly,
        lineNumbers: 'on',
        minimap: { enabled: false}

        //see https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#editoroptions
      }
    }
  },
  methods: {
    onEditorDidMount: function(editor) {
      // this function is needed in order to display properly the monaco
      // editor inside a modal.
      // TODO: add a cucumber test !
      var count = 5;
      var countdownInteval = setInterval(function(){
        editor.layout();
        count--;
        if (count === 0) {
          clearInterval(countdownInteval);
        }
      }, 100);
    }
  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
};/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "),_c('Monaco',_vm._b({ref:"editor",class:_vm.inputClass,attrs:{"id":_vm.id,"language":"ruby","options":_vm.options},on:{"focus":function($event){_vm.inputTouched=true;},"editorDidMount":_vm.onEditorDidMount},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}},'Monaco',this.$attrs,false)),_vm._ssrNode(" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = "data-v-f625043e";
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );//
var script$8 = {
  components: {
    VueEditor: vue2Editor.VueEditor
  },
  inheritAttrs: false,
  props: {
    append: {
      type:String,
    },
    id:{
      type:String,
      require:true
    },
    name:{
      type:String,
      require:true
    },
    prepend: {
      type:String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    inputClass: function() {
      return {
        "input-block__field": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError)
      }
    },
    inputCustomToolBar: function() {
      return {
        customToolbar: [
          ["bold", "italic", "underline"],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }] ],
      }
    },
    inputError: function() {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function() {
      return {
        "input-block": true,
      }
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {
        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
};/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" <input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "),_c('vue-editor',_vm._b({class:[_vm.inputClass, _vm.prepend ? 'input&#45;&#45;has-prepend' : '', _vm.append ? 'input&#45;&#45;has-append' : ''],attrs:{"id":_vm.id,"editor-toolbar":_vm.inputCustomToolBar.customToolbar,"name":_vm.name},on:{"focus":function($event){_vm.inputTouched = true;}},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}},'vue-editor',this.$attrs,false)),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = "data-v-e50c8f7e";
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$9 = {
  inheritAttrs: false,
  props: {
    append: {
      type:String,
    },
    name:{
      type:String,
      require:true
    },
    id:{
      type:String,
      require:true
    },
    prepend: {
      type:String,
    },
    choices: {
      type: String,
      require: true
    },
    include_blank: {
      type: String,
      require: true
    },
    readonly: {
      type: Boolean,
      require: false,
      default: false
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    choicesToJson: function() {
      return (
          this.$store.getters.getPotentialValues(this.$props.name) ||
          JSON.parse(this.$props.choices)
      )

    },
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    includeBlank: function(){
      return (this.$props.include_blank === 'true')
    },
    inputClass: function() {
      return {
        //"input-block__field": true,
        "custom-select": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError)
      }
    },

    inputError: function() {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function() {
      return {
        "input-block": true,
      }
    },
    inputTouched: {
      get: function get () {

        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },

  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  }
};/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.readonly)?("<input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+">"):"<!---->")+" "+((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" "),_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],class:[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : ''],attrs:{"id":_vm.id,"name":_vm.name,"disabled":_vm.readonly},on:{"focus":function($event){_vm.inputTouched=true;},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.inputValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',this.$attrs,false),[(_vm.includeBlank)?_c('option',{attrs:{"value":""}}):_vm._e(),_vm._v(" "),_vm._l((_vm.choicesToJson),function(value,key){return _c('option',{key:key,domProps:{"value":value.id}},[_vm._v("\n      "+_vm._s(value.display_name)+"\n    ")])})],2),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = "data-v-9a1704b6";
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$a = {
  inheritAttrs: false,
  props: {
  },
  computed: {
    displayValidationWarning: function() {
      return this.inputTouched
          && !this.$store.getters.getMeta("hideValidationErrors")
          && !this.$store.getters.getError(((this.$store.getters.getMeta('modelName')) + "._is_valid"))
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched('modelName')
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    recapErrors: function() {
      var recap = this.$store.getters.getError(this.$store.getters.getMeta("modelName"));
      delete recap._is_valid;
      return Object.values(recap);
    }
  },
  data: function data() {
    return {
      disabled: false,
      displayValidationMessages: false,
    }
  },
  methods: {
    submitting: function submitting() {
      var this$1 = this;

      if (this.$store.getters.getError(((this.$store.getters.getMeta('modelName')) + "._is_valid"))) {
        setTimeout( function () { return this$1.disabled = true; });
      }
    },
  }
};/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-validation"},[_vm._ssrNode("<input"+(_vm._ssrAttr("disabled",_vm.disabled))+(_vm._ssrAttrs(this.$attrs))+"> "+((_vm.displayValidationWarning)?("<div class=\"form-validation__global-error\">!</div>"):"<!---->")+" "+((_vm.displayValidationWarning & _vm.displayValidationMessages)?("<ul class=\"form-validation__tooltip\">"+(_vm._ssrList((_vm.recapErrors),function(error){return ("<li>"+_vm._ssrEscape(_vm._s(error))+"</li>")}))+"</ul>"):"<!---->"))])};
var __vue_staticRenderFns__$a = [];

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = "data-v-130dd608";
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$b = {
  inheritAttrs: false,
  props: {
    append: {
      type:String,
    },
    id:{
      type:String,
      require:true
    },
    name:{
      type:String,
      require:true
    },
    prepend: {
      type:String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },
  computed: {
    displayValidationError: function(){
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function(){
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    suggestValue: function(){
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    suggestedValue: function(){
      return this.$store.getters.getSuggestedValues(this.$props.name)
    },
    inputClass: function() {
      return {
        "input-block__field": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError)
      }
    },

    inputError: function() {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function() {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputGroupClass: function() {
      return {
        "input-block": true,
      }
    },
    inputTouched: {
      get: function get () {

        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get () {

        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set (value) {
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },

  },
  watch: {
    suggestedValue: function(value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  },
};/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" <textarea"+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass(null,[_vm.inputClass, _vm.prepend ? 'input--has-prepend' : '', _vm.append ? 'input--has-append' : '']))+">"+_vm._ssrEscape(_vm._s(_vm.inputValue))+"</textarea> "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError)+"  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning)+"  ")+"</span>"):"<!---->"))])};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = "data-v-1858b061";
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//

var script$c = {
  inheritAttrs: false,
  props: {
    for: {
      type: String,
      require: true
    }
  },
};/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{attrs:{"for":_vm.$props['for']}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$c = undefined;
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = "data-v-6c319b9b";
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$d = {
  props: {
    name: {
      type: String,
      require: true
    },
    id: {
      type: String,
      require: true
    },
    value: {
      type: String,
      require: true
    },
    on_value: {
      type: String,
      require: true
    },
    on_label: {
      type: String,
      require: true
    },
    off_value: {
      type: String,
      require: true
    },
    off_label: {
      type: String,
      require: true
    },
    disabled: {
      type: Boolean,
      require: false
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    }
  },

  methods: {
    toggleInputValue: function () {
      if (this.inputValue === this.$props.on_value) {
        this.inputValue = this.$props.off_value;
      } else {
        this.inputValue = this.$props.on_value;
      }
    }
  },

  computed: {
    displayValidationError: function () {
      return this.inputTouched && this.inputError
    },
    suggestValue: function () {
      return (this.$props.suggest_value === 'true')
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    inputClass: function () {
      return {
        "toggle_switch_component__label": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError)
      }
    },
    inputValue: {
      get: function get() {
        var value = this.$store.getters.getValue(this.$props.name);
        if (value === true || value === this.$props.on_value) {
          return this.$props.on_value
        } else {
          return this.$props.off_value
        }
      },
      set: function set(value) {
        this.$store.dispatch('update', {
              value: (value === true || value === this.$props.on_value) ? this.$props.on_value : this.$props.off_value,
              name: this.$props.name
            }
        );
      }
    },
    inputLabel: {
      get: function get() {
        var value = this.$store.getters.getValue(this.$props.name);
        if (value === true || value === this.$props.on_value) {
          return this.$props.on_label
        } else {
          return this.$props.off_label
        }
      }
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name)
      } else {
        return null
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputTouched: {
      get: function get() {
        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set(value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
  },
  watch: {
    suggestedValue: function (value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    }
  }
};/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toggle_switch_component__global-container",attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<label"+(_vm._ssrAttr("for",_vm.id))+(_vm._ssrClass(null,_vm.inputClass))+"><input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.off_value))+"> <input"+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+" type=\"checkbox\""+(_vm._ssrAttr("disabled",_vm.disabled))+(_vm._ssrAttr("checked",_vm.inputValue === _vm.on_value))+(_vm._ssrAttr("value",_vm.on_value))+(_vm._ssrAttrs(this.$attrs))+" class=\"toggle_switch_component__input\"> <span hidden=\"hidden\" class=\"toggle_switch_component__display\"></span> <p>"+_vm._ssrEscape(_vm._s(_vm.inputLabel))+"</p></label> "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputError))+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(" "+_vm._s(_vm.inputWarning))+"</span>"):"<!---->"))])};
var __vue_staticRenderFns__$d = [];

  /* style */
  var __vue_inject_styles__$d = undefined;
  /* scoped */
  var __vue_scope_id__$d = undefined;
  /* module identifier */
  var __vue_module_identifier__$d = "data-v-62f97495";
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );//
var script$e = {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true
    }
  },
  computed: {
    displayValidationError: function () {
      return this.inputTouched && this.inputError
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning
    },
    inputClass: function () {
      return {
        "input-block__field": true,
        "tel-input__text-input": true,
        "input-block__field--invalid": (this.inputTouched && this.inputError),
      }
    },
    inputGroupClass: function () {
      return {
        "input-block tel-input-block": true,
      }
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name);
      } else {
        return null;
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name)
      } else {
        return null
      }
    },
    inputTouched: {
      get: function get() {
        return this.$store.getters.getTouched(this.$props.name)
      },
      set: function set(value) {
        this.$store.commit('setTouched', {
              value: value,
              name: this.$props.name
            }
        );
      }
    },
    inputValue: {
      get: function get() {
        return this.$store.getters.getValue(this.$props.name)
      },
      set: function set(value) {
        var iti = window.intlTelInputGlobals.getInstance(this.$refs.telInput);
        value = iti.getNumber();
        this.$store.dispatch('update', {
              value: value,
              name: this.$props.name
            }
        );
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // go to the library folder and use the utils file from the library
      // to display the phone number format placeholder
      var intlTelInputUtils = require("intl-tel-input/build/js/utils");
      intlTelInput(this.$refs.telInput, {
        preferredCountries: [],
        formatOnDisplay: false,
        separateDialCode: false,
        utilsScript: intlTelInputUtils
      });
      //let iti = window.intlTelInputGlobals.getInstance(this.$refs.telInput)
      //this.$refs.telInput.value = iti.getNumber();
    });
  },
};/* script */
var __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<input type=\"tel\""+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",(_vm.inputValue)))+(_vm._ssrAttrs(this.$attrs))+(_vm._ssrClass(null,_vm.inputClass))+"> "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"tel-input__error-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputError))+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputWarning))+"</span>"):"<!---->"))])};
var __vue_staticRenderFns__$e = [];

  /* style */
  var __vue_inject_styles__$e = undefined;
  /* scoped */
  var __vue_scope_id__$e = undefined;
  /* module identifier */
  var __vue_module_identifier__$e = "data-v-25c5f69d";
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$f = {
  data: function data () {
    return {
      config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: this.pickerFormat(),
        allowInput: true,
        time_24hr: true,
      },
      debouncedSetFormattedValue: lodash.debounce(this.setFormattedValue, 500),
    };
  },
  components: {
    flatPickr: flatPickr,
  },
  inheritAttrs: false,
  props: {
    append: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    prepend: {
      type: String,
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false",
    },
    display_format: {
      type: String,
      require: false,
      default: "HH:mm",
    },
  },
  computed: {
    displayValidationError: function () {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
    suggestValue: function () {
      return this.$props.suggest_value === "true";
    },
    useSuggestedValue: function () {
      return this.suggestValue && !this.inputTouched;
    },
    suggestedValue: function () {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    inputClass: function () {
      return {
        "input-block__field": true,
        "input-block__field--invalid": this.displayValidationError,
        datepicker: true,
      };
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name);
      } else {
        return null;
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name);
      } else {
        return null;
      }
    },
    inputGroupClass: function () {
      return {
        "input-block": true,
      };
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name);
      },
      set: function set (value) {
        this.$store.commit("setTouched", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputValue: {
      get: function get () {
        return this.$store.getters.getValue(this.$props.name);
      },
      set: function set (value) {
        this.$store.dispatch("update", {
          value: value,
          name: this.$props.name,
        });
      },
    },
    inputFormattedValue: {
      get: function get () {
        //update
        var value = this.$store.getters.getValue(this.$props.name);
        var datetime = value == null ? "" : new Date(value);

        if (dateFns.isValid(datetime)) {
          return dateFnsTz.format(
              dateFnsTz.utcToZonedTime(datetime, 'UTC'),
              this.$props.display_format,
              {timeZone: "UTC"}
          );
        } else {
          return "";
        }
      },
      set: function set (value) {
        // user is probably typing a new date, wait for him to finish
        // and avoid unnecessary updates of the state
        this.debouncedSetFormattedValue(value);
      },
    },
  },
  watch: {
    suggestedValue: function (value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    },
  },
  methods: {
    onFocusDatePicker: function () {
      this.inputTouched = true;
    },
    checkIsValidFormat: function (value, display_format) {
      return !R.isNil(value) && !R.isEmpty(value) && dateFns.isMatch(value, display_format)
    },
    pickerFormat: function () {
      var format;

      if (this.$props.display_format === 'HH:mm') {
        format = 'H:i';
      }

      return format
    },
    setFormattedValue: function (value) {
      var display_format = this.$props.display_format;

      if (!R.isNil(value) && !R.isEmpty(value) && !dateFns.isMatch(value, display_format)) {
        // ignore non-blank & unmatched values
        // user is probably typing a new date, wait for him to finish
        return
      }


      var time = dateFns.parse(value, display_format, new Date());
      var normalised_date = dateFns.isValid(time) ? dateFns.formatISO(dateFnsTz.zonedTimeToUtc(time, 'UTC')) : '';

      this.$store.dispatch("update", {
        value: normalised_date,
        name: this.$props.name,
      });
    }
  },
};/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.inputGroupClass,attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode(((_vm.prepend)?("<div"+(_vm._ssrAttr("id",_vm.id + '__prepend'))+" class=\"input-block__prepend\"><span>"+(_vm._s(_vm.prepend))+"</span></div>"):"<!---->")+" <input type=\"hidden\""+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",_vm.inputValue))+"> "),_c('flat-pickr',_vm._b({ref:"input",class:[
          _vm.inputClass,
          _vm.prepend ? 'input--has-prepend' : '',
           _vm.append ? 'input--has-append' : '' ],attrs:{"id":_vm.id,"config":_vm.config},on:{"on-open":_vm.onFocusDatePicker},model:{value:(_vm.inputFormattedValue),callback:function ($$v) {_vm.inputFormattedValue=$$v;},expression:"inputFormattedValue"}},'flat-pickr',this.$attrs,false)),_vm._ssrNode(" "+((_vm.append)?("<div"+(_vm._ssrAttr("id",_vm.id + '__append'))+" class=\"input-block__append\"><span>"+(_vm._s(_vm.append))+"</span></div>"):"<!---->")+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape("\n    "+_vm._s(_vm.inputError)+"\n  ")+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape("\n    "+_vm._s(_vm.inputWarning)+"\n  ")+"</span>"):"<!---->"))],2)};
var __vue_staticRenderFns__$f = [];

  /* style */
  var __vue_inject_styles__$f = undefined;
  /* scoped */
  var __vue_scope_id__$f = undefined;
  /* module identifier */
  var __vue_module_identifier__$f = "data-v-33050435";
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$g = {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      require: true
    },
    id: {
      type: String,
      require: true
    },
    choices: {
      type: String,
      require: true
    },
    suggest_value: {
      type: String,
      require: false,
      default: "false"
    },
  },
  data: function data () {
    return {
      selectedChoices: this.getStoredValues()
    };
  },
  computed: {
    choicesToJson: function () {
      return (
        this.$store.getters.getPotentialValues(this.$props.name) ||
        JSON.parse(this.$props.choices)
      )
    },
    displayValidationError: function () {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function () {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
    suggestValue: function () {
      return this.$props.suggest_value === 'true';
    },
    useSuggestedValue: function () {
      return this.suggestValue && !this.inputTouched;
    },
    suggestedValue: function () {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    inputError: function () {
      if (this.inputTouched) {
        return this.$store.getters.getError(this.$props.name);
      } else {
        return null;
      }
    },
    inputWarning: function () {
      if (this.inputTouched) {
        return this.$store.getters.getWarning(this.$props.name);
      } else {
        return null;
      }
    },
    inputTouched: {
      get: function get () {
        return this.$store.getters.getTouched(this.$props.name);
      },
      set: function set (value) {
        this.$store.commit('setTouched', {
          value: value,
          name: this.$props.name
        });
      }
    },
    inputValue: {
      get: function get () {
        return this.$store.getters.getValue(this.$props.name);
      },
      set: function set (value) {
        this.$store.dispatch('update', {
          value: value,
          name: this.$props.name
        });
      }
    },
  },
  watch: {
    suggestedValue: function (value, _oldValue) {
      if (this.useSuggestedValue) {
        this.inputValue = value;
      }
    },
    selectedChoices: function (newChoices) {
      this.inputValue = newChoices.join(',');
    },
    inputValue: function () {
      this.selectedChoices = this.getStoredValues();
    }
  },
  methods: {
    getStoredValues: function () {
      var storedValue = this.$store.getters.getValue(this.$props.name);
      return storedValue ? storedValue.split(',') : [];
    }
  }
};/* script */
var __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"multi_check__wrapper",attrs:{"id":_vm.id + '__wrapper'}},[_vm._ssrNode("<input type=\"hidden\""+(_vm._ssrAttr("id",_vm.id))+(_vm._ssrAttr("name",_vm.name))+(_vm._ssrAttr("value",(_vm.inputValue)))+"> "+(_vm._ssrList((_vm.choicesToJson),function(value){return ("<div class=\"multi_check__flex-container\"><div class=\"multi_check__checkbox-container\"><input type=\"checkbox\""+(_vm._ssrAttr("value",value.id))+(_vm._ssrAttr("checked",Array.isArray(_vm.selectedChoices)?_vm._i(_vm.selectedChoices,value.id)>-1:(_vm.selectedChoices)))+" class=\"multi_check__checkbox-input\"></div> <div class=\"multi_check__label-container\"><label class=\"multi_check__label-text\">"+_vm._ssrEscape(_vm._s(value.display_name))+"</label></div></div>")}))+" "+((_vm.displayValidationError)?("<span"+(_vm._ssrAttr("id",_vm.id + '__error_message'))+" class=\"input-block__error-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputError))+"</span>"):"<!---->")+" "+((_vm.displayValidationWarning)?("<span"+(_vm._ssrAttr("id",_vm.id + '__warning_message'))+" class=\"input-block__warning-feedback\">"+_vm._ssrEscape(_vm._s(_vm.inputWarning))+"</span>"):"<!---->"))])};
var __vue_staticRenderFns__$g = [];

  /* style */
  var __vue_inject_styles__$g = undefined;
  /* scoped */
  var __vue_scope_id__$g = undefined;
  /* module identifier */
  var __vue_module_identifier__$g = "data-v-483a377c";
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );// start here the update
function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var FormStore = function FormStore(ref) {
  var obj, obj$1, obj$2, obj$3, obj$4, obj$5;

  var additionalComponents = ref.additionalComponents; if ( additionalComponents === void 0 ) additionalComponents = {};
  var authenticityToken = ref.authenticityToken;
  var element = ref.element;
  var globalAuthenticityToken = ref.globalAuthenticityToken;
  var httpMethod = ref.httpMethod; if ( httpMethod === void 0 ) httpMethod = 'POST';
  var plugins = ref.plugins; if ( plugins === void 0 ) plugins = [];
  var validationUrl = ref.validationUrl;
  var values = ref.values; if ( values === void 0 ) values = {};
  var initialTouch = ref.initialTouch; if ( initialTouch === void 0 ) initialTouch = false;
  var disableValidation = ref.disableValidation; if ( disableValidation === void 0 ) disableValidation = false;
  var hideValidationErrors = ref.hideValidationErrors; if ( hideValidationErrors === void 0 ) hideValidationErrors = false;
  var rest = objectWithoutProperties( ref, ["additionalComponents", "authenticityToken", "element", "globalAuthenticityToken", "httpMethod", "plugins", "validationUrl", "values", "initialTouch", "disableValidation", "hideValidationErrors"] );
  var others = rest;
  Vue.use(Vuex);

  window.toto = "TOTO"; // temporary test to bust cache on CI

  var defaultComponents = {
    'k-time': __vue_component__$f,
    'k-autocomplete': __vue_component__,
    'k-check_box': __vue_component__$1,
    'k-date': __vue_component__$2,
    'k-datetime': __vue_component__$3,
    'k-input': __vue_component__$4,
    'k-form': __vue_component__$5,
    'k-hidden': __vue_component__$6,
    'k-select': __vue_component__$9,
    'k-monaco_editor': __vue_component__$7,
    'k-quill_editor': __vue_component__$8,
    'k-textarea': __vue_component__$b,
    'k-submit': __vue_component__$a,
    'k-label': __vue_component__$c,
    'k-toggle-switch': __vue_component__$d,
    'k-tel-input': __vue_component__$e,
    'k-multi-check': __vue_component__$g
  };

  var modelName = Object.keys(values)[0];

  var ref$1 = values[modelName];
  var errors = ref$1.errors;
  var warnings = ref$1.warnings;
  var suggested_values = ref$1.suggested_values;
  var potential_values = ref$1.potential_values;
  var rest$1 = objectWithoutProperties( ref$1, ["errors", "warnings", "suggested_values", "potential_values"] );
  var model = rest$1;
  var initialState = {
    values: ( obj = {}, obj[modelName] = model || {}, obj ),
    errors: ( obj$1 = {}, obj$1[modelName] = errors || {}, obj$1 ),
    warnings: ( obj$2 = {}, obj$2[modelName] = warnings || {}, obj$2 ),
    touched: ( obj$3 = {}, obj$3[modelName] = {
        _submit: initialTouch
      }, obj$3 ),
    potentialValues: ( obj$4 = {}, obj$4[modelName] = potential_values || {}, obj$4 ),
    suggestedValues: ( obj$5 = {}, obj$5[modelName] = suggested_values || {}, obj$5 ),
    meta: Object.assign({
      modelName: modelName,
      authenticityToken: authenticityToken,
      globalAuthenticityToken: globalAuthenticityToken,
      validationUrl: validationUrl,
      httpMethod: httpMethod,
      disableValidation: disableValidation,
      hideValidationErrors: hideValidationErrors,
    }, others)
  };

  this.store = new Vuex.Store({
    state: initialState,
    plugins: plugins,
    getters:{
      getValue: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        return R.path(path.split('.'), state.values )
      }; },
      getError: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        if (state.meta.hideValidationErrors) {
          return null
        } else {
          return R.path(path.split('.'), state.errors )
        }
      }; },
      getWarning: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        if (state.meta.hideValidationErrors) {
          return null
        } else {
          return R.path(path.split('.'), state.warnings )
        }
      }; },
      getTouched: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        return (R.path(path.split('.'), state.touched ) || R.path([modelName, '_submit'], state.touched ))
      }; },
      getMeta: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        return R.path(path.split('.'), state.meta )
      }; },
      getPotentialValues: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        return R.path(path.split('.'), state.potentialValues )
      }; },
      getSuggestedValues: function (state) { return function (name) {
        var path = kUtilsJs.Utils.dotify(name);
        return R.path(path.split('.'), state.suggestedValues )
      }; },
    },
    mutations: {
      setValue: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.values = R.assocPath(path.split('.'), payload.value, state.values );
      },
      setTouched: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.touched = R.assocPath(path.split('.'), payload.value, state.touched );
      },
      setError: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.errors = R.assocPath(path.split('.'), payload.value, state.errors );
      },
      setWarning: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.warnings = R.assocPath(path.split('.'), payload.value, state.warnings );
      },
      setPotentialValues: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.potentialValues = R.assocPath(path.split('.'), payload.value, state.potentialValues );
      },
      setSuggestedValues: function(state, payload) {
        var path = kUtilsJs.Utils.dotify(payload.name);
        state.suggestedValues = R.assocPath(path.split('.'), payload.value, state.suggestedValues );
      },

    },
    actions: {

      // payload should have the following keys
      // * sid: mandatory, unique name of the call
      // * url: mandatory, where to send the data
      // * method: , option, http verb, by default 'post'
      // * data: mandatory, json data to be sent to the server
      // * onSuccess: callback, to be executed when the http request was a success (optional)
      // * onError: callback, to be executed when the http request was a error (optional)
      genericSendDataToServer: function(context, payload) {
        var sid = payload.sid;
        var url = payload.url;
        var method = payload.method;
        var data = payload.data;
        var onSuccess = payload.onSuccess;
        var onError = payload.onError;
        var rest = objectWithoutProperties( payload, ["sid", "url", "method", "data", "onSuccess", "onError"] );
        var others = rest;

        var genericOnSuccess = function (response) {
          var payload = Object.assign(others, {
            sid: sid,
            response: response
          });

          context.dispatch('genericDataReceivedFromServer', payload);
        };

        var genericOnError = function (response) {
          console.log('There was a problem with validating the data');
          console.log(response);
          //This exclusively to be able to see this in CI console reports (instead of '[object Object]'):
          console.log(JSON.stringify(response, null, 2));
        };

        kUtilsJs.Api.sendRequest({
          url: url,
          method: (method || 'post'),
          data: data,
          onSuccess: onSuccess || genericOnSuccess,
          onError: onError || genericOnError,
          delay: true
        });
      },

      genericDataReceivedFromServer: function(context, payload) {
        // do nothing, intercect the action in plugins in order to execute code
      },

      sendValuesToServer: function(context) {

        if (!disableValidation) {
          var onSuccess = function (response) {
            context.dispatch('dataReceivedFromServer', response.data);
          };

          var onError = function (response) {
            console.log('There was a problem with validating the data');
            console.log(response);
            //This exclusively to be able to see this in CI console reports (instead of '[object Object]'):
            console.log(JSON.stringify(response, null, 2));
          };

          var data = Object.assign({
            utf8: '✓',
            authenticity_token: context.state.meta.authenticityToken,
            _method: context.state.meta.httpMethod,
          }, R.clone(context.state.values) );

          data[modelName]._prevent_save = true;

          kUtilsJs.Api.sendRequest({url: context.state.meta.validationUrl, data: data, method: context.state.meta.httpMethod, onSuccess: onSuccess, onError: onError, delay: true});
        } else {
          console.log('Back-end validation is disabled');
          return;
        }

      },

      dataReceivedFromServer: function(context, payload) {
        var ref = payload[modelName];
        var errors = ref.errors;
        var warnings = ref.warnings;
        var potential_values = ref.potential_values;
        var suggested_values = ref.suggested_values;
        if (errors) {
          context.commit('setError', {
            value: errors,
            name: modelName
          });
        }

        if (warnings) {
          context.commit('setWarning', {
            value: warnings,
            name: modelName
          });
        }

        if (potential_values) {
          context.commit('setPotentialValues', {
            value: potential_values,
            name: modelName
          });
        }

        if (suggested_values) {
          context.commit('setSuggestedValues', {
            value: suggested_values,
            name: modelName
          });
        }
      },

      update: function(context, payload) {
        context.commit('setValue', payload);
        context.dispatch('sendValuesToServer');
      }
    }

  });

  this.app = new Vue({
    el: element,
    store: this.store,
    inheritAttrs: false,
    components: Object.assign(defaultComponents, additionalComponents),
    props: {},
  });
};/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Autocomplete: __vue_component__,CheckBox: __vue_component__$1,Date: __vue_component__$2,Datetime: __vue_component__$3,Field: __vue_component__$4,Form: __vue_component__$5,Hidden: __vue_component__$6,MonacoEditor: __vue_component__$7,QuillEditor: __vue_component__$8,Select: __vue_component__$9,Submit: __vue_component__$a,Textarea: __vue_component__$b,FormStore: FormStore,Label: __vue_component__$c,ToggleSwitch: __vue_component__$d,TelInput: __vue_component__$e,Time: __vue_component__$f,MultiCheck: __vue_component__$g});// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}exports.Autocomplete=__vue_component__;exports.CheckBox=__vue_component__$1;exports.Date=__vue_component__$2;exports.Datetime=__vue_component__$3;exports.Field=__vue_component__$4;exports.Form=__vue_component__$5;exports.FormStore=FormStore;exports.Hidden=__vue_component__$6;exports.Label=__vue_component__$c;exports.MonacoEditor=__vue_component__$7;exports.MultiCheck=__vue_component__$g;exports.QuillEditor=__vue_component__$8;exports.Select=__vue_component__$9;exports.Submit=__vue_component__$a;exports.TelInput=__vue_component__$e;exports.Textarea=__vue_component__$b;exports.Time=__vue_component__$f;exports.ToggleSwitch=__vue_component__$d;exports.default=plugin;