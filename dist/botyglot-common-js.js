import dn, { openBlock as U, createElementBlock as B, normalizeClass as es, toDisplayString as Cr, createCommentVNode as Ne, renderSlot as Rr, resolveComponent as fn, createBlock as hn, withCtx as Fi, createElementVNode as yt, withDirectives as ts, mergeProps as Yt, vModelDynamic as rs, Fragment as Ii, renderList as Wi, watch as ns, inject as Ui, effectScope as ji, reactive as Hi, computed as Gi, normalizeProps as qi } from "vue";
const Me = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, Bi = {
  inheritAttrs: !1,
  props: {
    names: {
      // do not use directly (instead use the computed property computed_names)
      type: [String, Array],
      require: !0
    },
    id: {
      type: String
    }
  },
  computed: {
    computed_names: function() {
      return typeof this.$props.names == "string" ? JSON.parse(this.$props.names) : this.$props.names;
    },
    displayValidationError: function() {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function() {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
    displayValidationMessage: function() {
      return this.displayValidationError || this.displayValidationWarning;
    },
    inputClass: function() {
      return {
        "input-block__error-feedback": this.displayValidationError,
        "input-block__warning-feedback": this.displayValidationWarning
      };
    },
    inputError: function() {
      if (this.inputTouched) {
        let e = "";
        return this.computed_names.forEach((t) => {
          let r = this.$store.getters.getError(t);
          r && r !== "" && e === "" && (e = r);
        }), e;
      } else
        return null;
    },
    inputWarning: function() {
      if (this.inputTouched) {
        let e = "";
        return this.computed_names.forEach((t) => {
          let r = this.$store.getters.getWarning(t);
          r && r !== "" && e === "" && (e = r);
        }), e;
      } else
        return null;
    },
    inputMessage: function() {
      return this.inputError || this.inputWarning;
    },
    inputTouched: {
      get() {
        let e = null;
        return this.computed_names.forEach((t) => {
          let r = this.$store.getters.getTouched(t);
          r !== !1 && (e = r);
        }), e;
      },
      set(e) {
        this.$store.commit(
          "setTouched",
          {
            value: e,
            name: this.$props.name
          }
        );
      }
    }
  }
};
function zi(e, t, r, n, s, i) {
  return i.displayValidationMessage ? (U(), B("span", {
    key: 0,
    class: es(i.inputClass)
  }, Cr(i.inputMessage), 3)) : Ne("", !0);
}
const Pr = /* @__PURE__ */ Me(Bi, [["render", zi]]), Zi = {
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      require: !0
    },
    id: {
      type: String,
      require: !0
    },
    classes: {
      type: [String, Array, Object],
      default: ""
    }
  },
  computed: {
    isEmpty() {
      const e = this.$store.getters.getValue(this.$props.name);
      return e == null || e === "";
    },
    inputGroupClass() {
      return {
        "botyglot-form--class-when-not-empty": !this.isEmpty,
        "botyglot-form--class-when-empty": this.isEmpty
      };
    }
  }
}, Ji = ["id"];
function Ki(e, t, r, n, s, i) {
  return U(), B("div", {
    class: es([i.inputGroupClass, r.classes]),
    id: r.id + "__wrapper"
  }, [
    Rr(e.$slots, "default")
  ], 10, Ji);
}
const ss = /* @__PURE__ */ Me(Zi, [["render", Ki]]), Qi = {
  components: { ComponentWrapper: ss, ErrorsPlaceholder: Pr },
  inheritAttrs: !1,
  props: {
    append: {
      type: String
    },
    name: {
      type: String,
      require: !0
    },
    id: {
      type: String,
      require: !0
    },
    prepend: {
      type: String
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      require: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      require: !1,
      default: !0
    }
  },
  computed: {
    suggestValue: function() {
      return this.$props.suggest_value === "true" || this.$props.suggest_value === !0 || this.$props.suggest_value === "force";
    },
    displayError: function() {
      return this.$props.display_error === "true" || this.$props.display_error === !0;
    },
    useSuggestedValue: function() {
      return this.suggestValue && !this.inputTouched || this.$props.suggest_value === "force";
    },
    suggestedValue: function() {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    inputClass: function() {
      return {
        "input-block__field": !0,
        "input-block__field--invalid": this.inputTouched && this.inputError,
        "input-block__field--warning": this.inputTouched && !this.inputError && this.inputWarning
      };
    },
    inputError: function() {
      return this.inputTouched ? this.$store.getters.getError(this.$props.name) : null;
    },
    inputWarning: function() {
      return this.inputTouched ? this.$store.getters.getWarning(this.$props.name) : null;
    },
    inputGroupClass: function() {
      return {
        "input-block": !0
      };
    },
    inputTouched: {
      get() {
        return this.$store.getters.getTouched(this.$props.name);
      },
      set(e) {
        this.$store.commit(
          "setTouched",
          {
            value: e,
            name: this.$props.name
          }
        );
      }
    },
    inputValue: {
      get() {
        return this.$store.getters.getValue(this.$props.name);
      },
      set(e) {
        this.$store.dispatch(
          "update",
          {
            value: e,
            name: this.$props.name
          }
        );
      }
    }
  },
  watch: {
    suggestedValue: function(e, t) {
      this.useSuggestedValue && (this.inputValue = e);
    }
  }
}, Xi = ["id"], ea = ["innerHTML"], ta = ["id", "name"], ra = ["id"], na = ["innerHTML"];
function sa(e, t, r, n, s, i) {
  const a = fn("ErrorsPlaceholder"), o = fn("ComponentWrapper");
  return U(), hn(o, {
    name: r.name,
    classes: i.inputGroupClass,
    id: r.id
  }, {
    default: Fi(() => [
      r.prepend ? (U(), B("div", {
        key: 0,
        class: "input-block__prepend",
        id: r.id + "__prepend"
      }, [
        yt("span", { innerHTML: r.prepend }, null, 8, ea)
      ], 8, Xi)) : Ne("", !0),
      ts(yt("input", Yt(this.$attrs, {
        class: [i.inputClass, r.prepend ? "input--has-prepend" : "", r.append ? "input--has-append" : ""],
        id: r.id,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => i.inputValue = u),
        onFocus: t[1] || (t[1] = (u) => i.inputTouched = !0),
        name: r.name
      }), null, 16, ta), [
        [rs, i.inputValue]
      ]),
      r.append ? (U(), B("div", {
        key: 1,
        class: "input-block__append",
        id: r.id + "__append"
      }, [
        yt("span", { innerHTML: r.append }, null, 8, na)
      ], 8, ra)) : Ne("", !0),
      i.displayError ? (U(), hn(a, {
        key: 2,
        names: [r.name]
      }, null, 8, ["names"])) : Ne("", !0)
    ]),
    _: 1
  }, 8, ["name", "classes", "id"]);
}
const is = /* @__PURE__ */ Me(Qi, [["render", sa]]), ia = {
  props: {
    acceptCharset: {
      type: String,
      required: !0,
      default: "UTF-8"
    },
    action: {
      type: String,
      required: !0
    },
    enctype: {
      type: String
    },
    method: {
      type: String,
      required: !0,
      default: "post"
    },
    autoSubmit: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return { timer: null };
  },
  computed: {
    values: function() {
      return this.$store.getters.getValue(
        this.$store.getters.getMeta("modelName")
      );
    }
  },
  methods: {
    debounce: function(e = 500) {
      clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.$refs.form.requestSubmit();
      }, e);
    },
    handleSubmit: function(e) {
      this.$store.getters.getMeta("disableValidation") || (this.$store.commit(
        "setTouched",
        {
          value: !0,
          name: `${this.$store.getters.getMeta("modelName")}._submit`
        }
      ), this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`) || e.preventDefault());
    },
    ajaxBeforeSend: function(e) {
      this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`) || e.preventDefault();
    }
  },
  watch: {
    values: function(e, t) {
      this.$props.autoSubmit === "onChange" && this.debounce(750);
    }
  }
}, aa = ["accept-charset", "action", "data-values", "method", "enctype"];
function oa(e, t, r, n, s, i) {
  return U(), B("form", {
    "accept-charset": e.$props.acceptCharset,
    action: e.$props.action,
    "data-values": e.$props.dataValues,
    method: e.$props.method,
    enctype: e.$props.enctype,
    onSubmit: t[0] || (t[0] = (...a) => i.handleSubmit && i.handleSubmit(...a)),
    "on:ajax:beforeSend": t[1] || (t[1] = (...a) => i.ajaxBeforeSend && i.ajaxBeforeSend(...a)),
    ref: "form"
  }, [
    Rr(e.$slots, "default")
  ], 40, aa);
}
const as = /* @__PURE__ */ Me(ia, [["render", oa]]), ua = {
  inheritAttrs: !1,
  props: {},
  computed: {
    displayValidationWarning: function() {
      return this.inputTouched && !this.$store.getters.getMeta("hideValidationErrors") && !this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`);
    },
    inputTouched: {
      get() {
        return this.$store.getters.getTouched("modelName");
      },
      set(e) {
        this.$store.commit(
          "setTouched",
          {
            value: e,
            name: this.$props.name
          }
        );
      }
    },
    recapErrors: function() {
      let e = this.$store.getters.getError(this.$store.getters.getMeta("modelName"));
      return delete e._is_valid, Object.values(e);
    }
  },
  data() {
    return {
      disabled: !1,
      displayValidationMessages: !1
    };
  },
  methods: {
    submitting() {
      this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`) && setTimeout(() => this.disabled = !0);
    }
  }
}, la = { class: "form-validation" }, ca = ["disabled"], da = {
  key: 1,
  class: "form-validation__tooltip"
};
function fa(e, t, r, n, s, i) {
  return U(), B("div", la, [
    yt("input", Yt(this.$attrs, {
      onClick: t[0] || (t[0] = (...a) => i.submitting && i.submitting(...a)),
      disabled: s.disabled
    }), null, 16, ca),
    i.displayValidationWarning ? (U(), B("div", {
      key: 0,
      class: "form-validation__global-error",
      onClick: t[1] || (t[1] = (a) => s.displayValidationMessages = !s.displayValidationMessages)
    }, "!")) : Ne("", !0),
    i.displayValidationWarning & s.displayValidationMessages ? (U(), B("ul", da, [
      (U(!0), B(Ii, null, Wi(i.recapErrors, (a) => (U(), B("li", { key: a }, Cr(a), 1))), 128))
    ])) : Ne("", !0)
  ]);
}
const os = /* @__PURE__ */ Me(ua, [["render", fa]]);
function ha() {
  return us().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function us() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const ma = typeof Proxy == "function", pa = "devtools-plugin:setup", _a = "plugin:settings:set";
let Ve, vr;
function ya() {
  var e;
  return Ve !== void 0 || (typeof window < "u" && window.performance ? (Ve = !0, vr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Ve = !0, vr = globalThis.perf_hooks.performance) : Ve = !1), Ve;
}
function ga() {
  return ya() ? vr.now() : Date.now();
}
class va {
  constructor(t, r) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = r;
    const n = {};
    if (t.settings)
      for (const a in t.settings) {
        const o = t.settings[a];
        n[a] = o.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, n);
    try {
      const a = localStorage.getItem(s), o = JSON.parse(a);
      Object.assign(i, o);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(a) {
        try {
          localStorage.setItem(s, JSON.stringify(a));
        } catch {
        }
        i = a;
      },
      now() {
        return ga();
      }
    }, r && r.on(_a, (a, o) => {
      a === this.plugin.id && this.fallbacks.setSettings(o);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, o) => this.target ? this.target.on[o] : (...u) => {
        this.onQueue.push({
          method: o,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, o) => this.target ? this.target[o] : o === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(o) ? (...u) => (this.targetQueue.push({
        method: o,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[o](...u)) : (...u) => new Promise((l) => {
        this.targetQueue.push({
          method: o,
          args: u,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const r of this.onQueue)
      this.target.on[r.method](...r.args);
    for (const r of this.targetQueue)
      r.resolve(await this.target[r.method](...r.args));
  }
}
function wa(e, t) {
  const r = e, n = us(), s = ha(), i = ma && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(pa, e, t);
  else {
    const a = i ? new va(r, s) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: r,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var Ar = "store";
function Sa(e) {
  return e === void 0 && (e = null), Ui(e !== null ? e : Ar);
}
function ba(e, t) {
  return e.filter(t)[0];
}
function wr(e, t) {
  if (t === void 0 && (t = []), e === null || typeof e != "object")
    return e;
  var r = ba(t, function(s) {
    return s.original === e;
  });
  if (r)
    return r.copy;
  var n = Array.isArray(e) ? [] : {};
  return t.push({
    original: e,
    copy: n
  }), Object.keys(e).forEach(function(s) {
    n[s] = wr(e[s], t);
  }), n;
}
function Ce(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function ls(e) {
  return e !== null && typeof e == "object";
}
function Oa(e) {
  return e && typeof e.then == "function";
}
function te(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function ka(e, t) {
  return function() {
    return e(t);
  };
}
function cs(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function ds(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  Ct(e, r, [], e._modules.root, !0), Vr(e, r, t);
}
function Vr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = ji(!0);
  u.run(function() {
    Ce(i, function(l, d) {
      a[d] = ka(l, e), o[d] = Gi(function() {
        return a[d]();
      }), Object.defineProperty(e.getters, d, {
        get: function() {
          return o[d].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = Hi({
    data: t
  }), e._scope = u, e.strict && xa(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function Ct(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = $r(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = Ma(e, a, r);
  n.forEachMutation(function(d, p) {
    var m = a + p;
    Da(e, m, d, l);
  }), n.forEachAction(function(d, p) {
    var m = d.root ? p : a + p, _ = d.handler || d;
    Ea(e, m, _, l);
  }), n.forEachGetter(function(d, p) {
    var m = a + p;
    Ta(e, m, d, l);
  }), n.forEachChild(function(d, p) {
    Ct(e, t, r.concat(p), d, s);
  });
}
function Ma(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = Ot(i, a, o), l = u.payload, d = u.options, p = u.type;
      if ((!d || !d.root) && (p = t + p, process.env.NODE_ENV !== "production" && !e._actions[p])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + p);
        return;
      }
      return e.dispatch(p, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = Ot(i, a, o), l = u.payload, d = u.options, p = u.type;
      if ((!d || !d.root) && (p = t + p, process.env.NODE_ENV !== "production" && !e._mutations[p])) {
        console.error("[vuex] unknown local mutation type: " + u.type + ", global type: " + p);
        return;
      }
      e.commit(p, l, d);
    }
  };
  return Object.defineProperties(s, {
    getters: {
      get: n ? function() {
        return e.getters;
      } : function() {
        return fs(e, t);
      }
    },
    state: {
      get: function() {
        return $r(e.state, r);
      }
    }
  }), s;
}
function fs(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var r = {}, n = t.length;
    Object.keys(e.getters).forEach(function(s) {
      if (s.slice(0, n) === t) {
        var i = s.slice(n);
        Object.defineProperty(r, i, {
          get: function() {
            return e.getters[s];
          },
          enumerable: !0
        });
      }
    }), e._makeLocalGettersCache[t] = r;
  }
  return e._makeLocalGettersCache[t];
}
function Da(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function Ea(e, t, r, n) {
  var s = e._actions[t] || (e._actions[t] = []);
  s.push(function(a) {
    var o = r.call(e, {
      dispatch: n.dispatch,
      commit: n.commit,
      getters: n.getters,
      state: n.state,
      rootGetters: e.getters,
      rootState: e.state
    }, a);
    return Oa(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function Ta(e, t, r, n) {
  if (e._wrappedGetters[t]) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate getter key: " + t);
    return;
  }
  e._wrappedGetters[t] = function(i) {
    return r(
      n.state,
      // local state
      n.getters,
      // local getters
      i.state,
      // root state
      i.getters
      // root getters
    );
  };
}
function xa(e) {
  ns(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && te(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function $r(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function Ot(e, t, r) {
  return ls(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && te(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var Na = "vuex bindings", mn = "vuex:mutations", Qt = "vuex:actions", $e = "vuex", Ya = 0;
function Ca(e, t) {
  wa(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [Na]
    },
    function(r) {
      r.addTimelineLayer({
        id: mn,
        label: "Vuex Mutations",
        color: pn
      }), r.addTimelineLayer({
        id: Qt,
        label: "Vuex Actions",
        color: pn
      }), r.addInspector({
        id: $e,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === $e)
          if (n.filter) {
            var s = [];
            _s(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              ps(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === $e) {
          var s = n.nodeId;
          fs(t, s), n.state = Aa(
            $a(t._modules, s),
            s === "root" ? t.getters : t._makeLocalGettersCache,
            s
          );
        }
      }), r.on.editInspectorState(function(n) {
        if (n.app === e && n.inspectorId === $e) {
          var s = n.nodeId, i = n.path;
          s !== "root" && (i = s.split("/").filter(Boolean).concat(i)), t._withCommit(function() {
            n.set(t._state.data, i, n.state.value);
          });
        }
      }), t.subscribe(function(n, s) {
        var i = {};
        n.payload && (i.payload = n.payload), i.state = s, r.notifyComponentUpdate(), r.sendInspectorTree($e), r.sendInspectorState($e), r.addTimelineEvent({
          layerId: mn,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = Ya++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
            layerId: Qt,
            event: {
              time: n._time,
              title: n.type,
              groupId: n._id,
              subtitle: "start",
              data: i
            }
          });
        },
        after: function(n, s) {
          var i = {}, a = Date.now() - n._time;
          i.duration = {
            _custom: {
              type: "duration",
              display: a + "ms",
              tooltip: "Action duration",
              value: a
            }
          }, n.payload && (i.payload = n.payload), i.state = s, r.addTimelineEvent({
            layerId: Qt,
            event: {
              time: Date.now(),
              title: n.type,
              groupId: n._id,
              subtitle: "end",
              data: i
            }
          });
        }
      });
    }
  );
}
var pn = 8702998, Ra = 6710886, Pa = 16777215, hs = {
  label: "namespaced",
  textColor: Pa,
  backgroundColor: Ra
};
function ms(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function ps(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: ms(t),
    tags: e.namespaced ? [hs] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return ps(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function _s(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [hs] : []
  }), Object.keys(t._children).forEach(function(s) {
    _s(e, t._children[s], r, n + s + "/");
  });
}
function Aa(e, t, r) {
  t = r === "root" ? t : t[r];
  var n = Object.keys(t), s = {
    state: Object.keys(e.state).map(function(a) {
      return {
        key: a,
        editable: !0,
        value: e.state[a]
      };
    })
  };
  if (n.length) {
    var i = Va(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? ms(a) : a,
        editable: !1,
        value: Sr(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function Va(e) {
  var t = {};
  return Object.keys(e).forEach(function(r) {
    var n = r.split("/");
    if (n.length > 1) {
      var s = t, i = n.pop();
      n.forEach(function(a) {
        s[a] || (s[a] = {
          _custom: {
            value: {},
            display: a,
            tooltip: "Module",
            abstract: !0
          }
        }), s = s[a]._custom.value;
      }), s[i] = Sr(function() {
        return e[r];
      });
    } else
      t[r] = Sr(function() {
        return e[r];
      });
  }), t;
}
function $a(e, t) {
  var r = t.split("/").filter(function(n) {
    return n;
  });
  return r.reduce(
    function(n, s, i) {
      var a = n[s];
      if (!a)
        throw new Error('Missing module "' + s + '" for path "' + t + '".');
      return i === r.length - 1 ? a : a._children;
    },
    t === "root" ? e : e.root._children
  );
}
function Sr(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var ie = function(t, r) {
  this.runtime = r, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var n = t.state;
  this.state = (typeof n == "function" ? n() : n) || {};
}, ys = { namespaced: { configurable: !0 } };
ys.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
ie.prototype.addChild = function(t, r) {
  this._children[t] = r;
};
ie.prototype.removeChild = function(t) {
  delete this._children[t];
};
ie.prototype.getChild = function(t) {
  return this._children[t];
};
ie.prototype.hasChild = function(t) {
  return t in this._children;
};
ie.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
ie.prototype.forEachChild = function(t) {
  Ce(this._children, t);
};
ie.prototype.forEachGetter = function(t) {
  this._rawModule.getters && Ce(this._rawModule.getters, t);
};
ie.prototype.forEachAction = function(t) {
  this._rawModule.actions && Ce(this._rawModule.actions, t);
};
ie.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && Ce(this._rawModule.mutations, t);
};
Object.defineProperties(ie.prototype, ys);
var Re = function(t) {
  this.register([], t, !1);
};
Re.prototype.get = function(t) {
  return t.reduce(function(r, n) {
    return r.getChild(n);
  }, this.root);
};
Re.prototype.getNamespace = function(t) {
  var r = this.root;
  return t.reduce(function(n, s) {
    return r = r.getChild(s), n + (r.namespaced ? s + "/" : "");
  }, "");
};
Re.prototype.update = function(t) {
  gs([], this.root, t);
};
Re.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && vs(t, r);
  var i = new ie(r, n);
  if (t.length === 0)
    this.root = i;
  else {
    var a = this.get(t.slice(0, -1));
    a.addChild(t[t.length - 1], i);
  }
  r.modules && Ce(r.modules, function(o, u) {
    s.register(t.concat(u), o, n);
  });
};
Re.prototype.unregister = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1], s = r.getChild(n);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + n + "', which is not registered"
    );
    return;
  }
  s.runtime && r.removeChild(n);
};
Re.prototype.isRegistered = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1];
  return r ? r.hasChild(n) : !1;
};
function gs(e, t, r) {
  if (process.env.NODE_ENV !== "production" && vs(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      gs(
        e.concat(n),
        t.getChild(n),
        r.modules[n]
      );
    }
}
var _n = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, La = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, yn = {
  getters: _n,
  mutations: _n,
  actions: La
};
function vs(e, t) {
  Object.keys(yn).forEach(function(r) {
    if (t[r]) {
      var n = yn[r];
      Ce(t[r], function(s, i) {
        te(
          n.assert(s),
          Fa(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function Fa(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function Ia(e) {
  return new j(e);
}
var j = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (te(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), te(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Re(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(m, _) {
    return u.call(a, m, _);
  }, this.commit = function(m, _, E) {
    return l.call(a, m, _, E);
  }, this.strict = s;
  var d = this._modules.root.state;
  Ct(this, d, [], this._modules.root), Vr(this, d), n.forEach(function(p) {
    return p(r);
  });
}, Lr = { state: { configurable: !0 } };
j.prototype.install = function(t, r) {
  t.provide(r || Ar, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Ca(t, this);
};
Lr.state.get = function() {
  return this._state.data;
};
Lr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && te(!1, "use store.replaceState() to explicit replace store state.");
};
j.prototype.commit = function(t, r, n) {
  var s = this, i = Ot(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, d = this._mutations[a];
  if (!d) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + a);
    return;
  }
  this._withCommit(function() {
    d.forEach(function(m) {
      m(o);
    });
  }), this._subscribers.slice().forEach(function(p) {
    return p(l, s.state);
  }), process.env.NODE_ENV !== "production" && u && u.silent && console.warn(
    "[vuex] mutation type: " + a + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
j.prototype.dispatch = function(t, r) {
  var n = this, s = Ot(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + i);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(d) {
      return d.before;
    }).forEach(function(d) {
      return d.before(o, n.state);
    });
  } catch (d) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(d));
  }
  var l = u.length > 1 ? Promise.all(u.map(function(d) {
    return d(a);
  })) : u[0](a);
  return new Promise(function(d, p) {
    l.then(function(m) {
      try {
        n._actionSubscribers.filter(function(_) {
          return _.after;
        }).forEach(function(_) {
          return _.after(o, n.state);
        });
      } catch (_) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(_));
      }
      d(m);
    }, function(m) {
      try {
        n._actionSubscribers.filter(function(_) {
          return _.error;
        }).forEach(function(_) {
          return _.error(o, n.state, m);
        });
      } catch (_) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(_));
      }
      p(m);
    });
  });
};
j.prototype.subscribe = function(t, r) {
  return cs(t, this._subscribers, r);
};
j.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return cs(n, this._actionSubscribers, r);
};
j.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && te(typeof t == "function", "store.watch only accepts a function."), ns(function() {
    return t(s.state, s.getters);
  }, r, Object.assign({}, n));
};
j.prototype.replaceState = function(t) {
  var r = this;
  this._withCommit(function() {
    r._state.data = t;
  });
};
j.prototype.registerModule = function(t, r, n) {
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (te(Array.isArray(t), "module path must be a string or an Array."), te(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), Ct(this, this.state, t, this._modules.get(t), n.preserveState), Vr(this, this.state);
};
j.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = $r(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), ds(this);
};
j.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
j.prototype.hotUpdate = function(t) {
  this._modules.update(t), ds(this, !0);
};
j.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(j.prototype, Lr);
var ws = Pt(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !nt(t) && console.error("[vuex] mapState: mapper parameter must be either an Array or an Object"), Rt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      var o = this.$store.state, u = this.$store.getters;
      if (e) {
        var l = At(this.$store, "mapState", e);
        if (!l)
          return;
        o = l.context.state, u = l.context.getters;
      }
      return typeof i == "function" ? i.call(this, o, u) : o[i];
    }, r[s].vuex = !0;
  }), r;
}), Ss = Pt(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !nt(t) && console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object"), Rt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      for (var o = [], u = arguments.length; u--; )
        o[u] = arguments[u];
      var l = this.$store.commit;
      if (e) {
        var d = At(this.$store, "mapMutations", e);
        if (!d)
          return;
        l = d.context.commit;
      }
      return typeof i == "function" ? i.apply(this, [l].concat(o)) : l.apply(this.$store, [i].concat(o));
    };
  }), r;
}), bs = Pt(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !nt(t) && console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object"), Rt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    i = e + i, r[s] = function() {
      if (!(e && !At(this.$store, "mapGetters", e))) {
        if (process.env.NODE_ENV !== "production" && !(i in this.$store.getters)) {
          console.error("[vuex] unknown getter: " + i);
          return;
        }
        return this.$store.getters[i];
      }
    }, r[s].vuex = !0;
  }), r;
}), Os = Pt(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !nt(t) && console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object"), Rt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      for (var o = [], u = arguments.length; u--; )
        o[u] = arguments[u];
      var l = this.$store.dispatch;
      if (e) {
        var d = At(this.$store, "mapActions", e);
        if (!d)
          return;
        l = d.context.dispatch;
      }
      return typeof i == "function" ? i.apply(this, [l].concat(o)) : l.apply(this.$store, [i].concat(o));
    };
  }), r;
}), Wa = function(e) {
  return {
    mapState: ws.bind(null, e),
    mapGetters: bs.bind(null, e),
    mapMutations: Ss.bind(null, e),
    mapActions: Os.bind(null, e)
  };
};
function Rt(e) {
  return nt(e) ? Array.isArray(e) ? e.map(function(t) {
    return { key: t, val: t };
  }) : Object.keys(e).map(function(t) {
    return { key: t, val: e[t] };
  }) : [];
}
function nt(e) {
  return Array.isArray(e) || ls(e);
}
function Pt(e) {
  return function(t, r) {
    return typeof t != "string" ? (r = t, t = "") : t.charAt(t.length - 1) !== "/" && (t += "/"), e(t, r);
  };
}
function At(e, t, r) {
  var n = e._modulesNamespaceMap[r];
  return process.env.NODE_ENV !== "production" && !n && console.error("[vuex] module namespace not found in " + t + "(): " + r), n;
}
function Ua(e) {
  e === void 0 && (e = {});
  var t = e.collapsed;
  t === void 0 && (t = !0);
  var r = e.filter;
  r === void 0 && (r = function(d, p, m) {
    return !0;
  });
  var n = e.transformer;
  n === void 0 && (n = function(d) {
    return d;
  });
  var s = e.mutationTransformer;
  s === void 0 && (s = function(d) {
    return d;
  });
  var i = e.actionFilter;
  i === void 0 && (i = function(d, p) {
    return !0;
  });
  var a = e.actionTransformer;
  a === void 0 && (a = function(d) {
    return d;
  });
  var o = e.logMutations;
  o === void 0 && (o = !0);
  var u = e.logActions;
  u === void 0 && (u = !0);
  var l = e.logger;
  return l === void 0 && (l = console), function(d) {
    var p = wr(d.state);
    typeof l > "u" || (o && d.subscribe(function(m, _) {
      var E = wr(_);
      if (r(m, p, E)) {
        var X = wn(), w = s(m), Ze = "mutation " + m.type + X;
        gn(l, Ze, t), l.log("%c prev state", "color: #9E9E9E; font-weight: bold", n(p)), l.log("%c mutation", "color: #03A9F4; font-weight: bold", w), l.log("%c next state", "color: #4CAF50; font-weight: bold", n(E)), vn(l);
      }
      p = E;
    }), u && d.subscribeAction(function(m, _) {
      if (i(m, _)) {
        var E = wn(), X = a(m), w = "action " + m.type + E;
        gn(l, w, t), l.log("%c action", "color: #03A9F4; font-weight: bold", X), vn(l);
      }
    }));
  };
}
function gn(e, t, r) {
  var n = r ? e.groupCollapsed : e.group;
  try {
    n.call(e, t);
  } catch {
    e.log(t);
  }
}
function vn(e) {
  try {
    e.groupEnd();
  } catch {
    e.log("—— log end ——");
  }
}
function wn() {
  var e = /* @__PURE__ */ new Date();
  return " @ " + ht(e.getHours(), 2) + ":" + ht(e.getMinutes(), 2) + ":" + ht(e.getSeconds(), 2) + "." + ht(e.getMilliseconds(), 3);
}
function ja(e, t) {
  return new Array(t + 1).join(e);
}
function ht(e, t) {
  return ja("0", t - e.toString().length) + e;
}
var Ha = {
  version: "4.1.0",
  Store: j,
  storeKey: Ar,
  createStore: Ia,
  useStore: Sa,
  mapState: ws,
  mapMutations: Ss,
  mapGetters: bs,
  mapActions: Os,
  createNamespacedHelpers: Wa,
  createLogger: Ua
};
const Sn = Ha;
function C(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ue(e) {
  return function t(r) {
    return arguments.length === 0 || C(r) ? t : e.apply(this, arguments);
  };
}
function Te(e) {
  return function t(r, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return C(r) ? t : ue(function(s) {
          return e(r, s);
        });
      default:
        return C(r) && C(n) ? t : C(r) ? ue(function(s) {
          return e(s, n);
        }) : C(n) ? ue(function(s) {
          return e(r, s);
        }) : e(r, n);
    }
  };
}
function ks(e) {
  return function t(r, n, s) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return C(r) ? t : Te(function(i, a) {
          return e(r, i, a);
        });
      case 2:
        return C(r) && C(n) ? t : C(r) ? Te(function(i, a) {
          return e(i, n, a);
        }) : C(n) ? Te(function(i, a) {
          return e(r, i, a);
        }) : ue(function(i) {
          return e(r, n, i);
        });
      default:
        return C(r) && C(n) && C(s) ? t : C(r) && C(n) ? Te(function(i, a) {
          return e(i, a, s);
        }) : C(r) && C(s) ? Te(function(i, a) {
          return e(i, n, a);
        }) : C(n) && C(s) ? Te(function(i, a) {
          return e(r, i, a);
        }) : C(r) ? ue(function(i) {
          return e(i, n, s);
        }) : C(n) ? ue(function(i) {
          return e(r, i, s);
        }) : C(s) ? ue(function(i) {
          return e(r, n, i);
        }) : e(r, n, s);
    }
  };
}
const Ga = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function qa(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var Ba = /* @__PURE__ */ Te(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const Se = Ba;
var za = /* @__PURE__ */ ks(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const Za = za, bn = Number.isInteger || function(t) {
  return t << 0 === t;
};
var Ja = /* @__PURE__ */ ue(function(t) {
  return t == null;
});
const Ka = Ja;
var Qa = /* @__PURE__ */ ks(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !Ka(n) && qa(s, n) ? n[s] : bn(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (bn(s) && Ga(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return Za(s, r, n);
});
const Le = Qa;
function Xa(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var eo = /* @__PURE__ */ ue(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const to = eo;
function Ms(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? Ms(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (to(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Xa(e);
    default:
      return e;
  }
}
var ro = /* @__PURE__ */ ue(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Ms(t, [], [], !0);
});
const no = ro;
function so(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fr = { exports: {} }, Ds = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, io = Ds, Pe = Object.prototype.toString;
function Ir(e) {
  return Pe.call(e) === "[object Array]";
}
function br(e) {
  return typeof e > "u";
}
function ao(e) {
  return e !== null && !br(e) && e.constructor !== null && !br(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function oo(e) {
  return Pe.call(e) === "[object ArrayBuffer]";
}
function uo(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function lo(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function co(e) {
  return typeof e == "string";
}
function fo(e) {
  return typeof e == "number";
}
function Es(e) {
  return e !== null && typeof e == "object";
}
function gt(e) {
  if (Pe.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function ho(e) {
  return Pe.call(e) === "[object Date]";
}
function mo(e) {
  return Pe.call(e) === "[object File]";
}
function po(e) {
  return Pe.call(e) === "[object Blob]";
}
function Ts(e) {
  return Pe.call(e) === "[object Function]";
}
function _o(e) {
  return Es(e) && Ts(e.pipe);
}
function yo(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function go(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function vo() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Wr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Ir(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function Or() {
  var e = {};
  function t(s, i) {
    gt(e[i]) && gt(s) ? e[i] = Or(e[i], s) : gt(s) ? e[i] = Or({}, s) : Ir(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Wr(arguments[r], t);
  return e;
}
function wo(e, t, r) {
  return Wr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = io(s, r) : e[i] = s;
  }), e;
}
function So(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var z = {
  isArray: Ir,
  isArrayBuffer: oo,
  isBuffer: ao,
  isFormData: uo,
  isArrayBufferView: lo,
  isString: co,
  isNumber: fo,
  isObject: Es,
  isPlainObject: gt,
  isUndefined: br,
  isDate: ho,
  isFile: mo,
  isBlob: po,
  isFunction: Ts,
  isStream: _o,
  isURLSearchParams: yo,
  isStandardBrowserEnv: vo,
  forEach: Wr,
  merge: Or,
  extend: wo,
  trim: go,
  stripBOM: So
}, Fe = z;
function On(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var xs = function(t, r, n) {
  if (!r)
    return t;
  var s;
  if (n)
    s = n(r);
  else if (Fe.isURLSearchParams(r))
    s = r.toString();
  else {
    var i = [];
    Fe.forEach(r, function(u, l) {
      u === null || typeof u > "u" || (Fe.isArray(u) ? l = l + "[]" : u = [u], Fe.forEach(u, function(p) {
        Fe.isDate(p) ? p = p.toISOString() : Fe.isObject(p) && (p = JSON.stringify(p)), i.push(On(l) + "=" + On(p));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, bo = z;
function Vt() {
  this.handlers = [];
}
Vt.prototype.use = function(t, r, n) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: n ? n.synchronous : !1,
    runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1;
};
Vt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Vt.prototype.forEach = function(t) {
  bo.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Oo = Vt, ko = z, Mo = function(t, r) {
  ko.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, Ns = function(t, r, n, s, i) {
  return t.config = r, n && (t.code = n), t.request = s, t.response = i, t.isAxiosError = !0, t.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  }, t;
}, Xt, kn;
function Ys() {
  if (kn)
    return Xt;
  kn = 1;
  var e = Ns;
  return Xt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Xt;
}
var er, Mn;
function Do() {
  if (Mn)
    return er;
  Mn = 1;
  var e = Ys();
  return er = function(r, n, s) {
    var i = s.config.validateStatus;
    !s.status || !i || i(s.status) ? r(s) : n(e(
      "Request failed with status code " + s.status,
      s.config,
      null,
      s.request,
      s
    ));
  }, er;
}
var tr, Dn;
function Eo() {
  if (Dn)
    return tr;
  Dn = 1;
  var e = z;
  return tr = e.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function() {
      return {
        write: function(n, s, i, a, o, u) {
          var l = [];
          l.push(n + "=" + encodeURIComponent(s)), e.isNumber(i) && l.push("expires=" + new Date(i).toGMTString()), e.isString(a) && l.push("path=" + a), e.isString(o) && l.push("domain=" + o), u === !0 && l.push("secure"), document.cookie = l.join("; ");
        },
        read: function(n) {
          var s = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
          return s ? decodeURIComponent(s[3]) : null;
        },
        remove: function(n) {
          this.write(n, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function() {
      return {
        write: function() {
        },
        read: function() {
          return null;
        },
        remove: function() {
        }
      };
    }()
  ), tr;
}
var rr, En;
function To() {
  return En || (En = 1, rr = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), rr;
}
var nr, Tn;
function xo() {
  return Tn || (Tn = 1, nr = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), nr;
}
var sr, xn;
function No() {
  if (xn)
    return sr;
  xn = 1;
  var e = To(), t = xo();
  return sr = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, sr;
}
var ir, Nn;
function Yo() {
  if (Nn)
    return ir;
  Nn = 1;
  var e = z, t = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return ir = function(n) {
    var s = {}, i, a, o;
    return n && e.forEach(n.split(`
`), function(l) {
      if (o = l.indexOf(":"), i = e.trim(l.substr(0, o)).toLowerCase(), a = e.trim(l.substr(o + 1)), i) {
        if (s[i] && t.indexOf(i) >= 0)
          return;
        i === "set-cookie" ? s[i] = (s[i] ? s[i] : []).concat([a]) : s[i] = s[i] ? s[i] + ", " + a : a;
      }
    }), s;
  }, ir;
}
var ar, Yn;
function Co() {
  if (Yn)
    return ar;
  Yn = 1;
  var e = z;
  return ar = e.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function() {
      var r = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a"), s;
      function i(a) {
        var o = a;
        return r && (n.setAttribute("href", o), o = n.href), n.setAttribute("href", o), {
          href: n.href,
          protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
          host: n.host,
          search: n.search ? n.search.replace(/^\?/, "") : "",
          hash: n.hash ? n.hash.replace(/^#/, "") : "",
          hostname: n.hostname,
          port: n.port,
          pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
        };
      }
      return s = i(window.location.href), function(o) {
        var u = e.isString(o) ? i(o) : o;
        return u.protocol === s.protocol && u.host === s.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function() {
      return function() {
        return !0;
      };
    }()
  ), ar;
}
var or, Cn;
function Rn() {
  if (Cn)
    return or;
  Cn = 1;
  var e = z, t = Do(), r = Eo(), n = xs, s = No(), i = Yo(), a = Co(), o = Ys();
  return or = function(l) {
    return new Promise(function(p, m) {
      var _ = l.data, E = l.headers, X = l.responseType;
      e.isFormData(_) && delete E["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var Ze = l.auth.username || "", Kt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        E.Authorization = "Basic " + btoa(Ze + ":" + Kt);
      }
      var lt = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(lt, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function ct() {
        if (w) {
          var v = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !X || X === "text" || X === "json" ? w.responseText : w.response, G = {
            data: S,
            status: w.status,
            statusText: w.statusText,
            headers: v,
            config: l,
            request: w
          };
          t(p, m, G), w = null;
        }
      }
      if ("onloadend" in w ? w.onloadend = ct : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(ct);
      }, w.onabort = function() {
        w && (m(o("Request aborted", l, "ECONNABORTED", w)), w = null);
      }, w.onerror = function() {
        m(o("Network Error", l, null, w)), w = null;
      }, w.ontimeout = function() {
        var S = "timeout of " + l.timeout + "ms exceeded";
        l.timeoutErrorMessage && (S = l.timeoutErrorMessage), m(o(
          S,
          l,
          l.transitional && l.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          w
        )), w = null;
      }, e.isStandardBrowserEnv()) {
        var y = (l.withCredentials || a(lt)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        y && (E[l.xsrfHeaderName] = y);
      }
      "setRequestHeader" in w && e.forEach(E, function(S, G) {
        typeof _ > "u" && G.toLowerCase() === "content-type" ? delete E[G] : w.setRequestHeader(G, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), X && X !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), m(S), w = null);
      }), _ || (_ = null), w.send(_);
    });
  }, or;
}
var A = z, Pn = Mo, Ro = Ns, Po = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function An(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function Ao() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = Rn()), e;
}
function Vo(e, t, r) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
var $t = {
  transitional: {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  adapter: Ao(),
  transformRequest: [function(t, r) {
    return Pn(r, "Accept"), Pn(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (An(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (An(r, "application/json"), Vo(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Ro(a, this, "E_JSON_PARSE") : a;
      }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  }
};
$t.headers = {
  common: {
    Accept: "application/json, text/plain, */*"
  }
};
A.forEach(["delete", "get", "head"], function(t) {
  $t.headers[t] = {};
});
A.forEach(["post", "put", "patch"], function(t) {
  $t.headers[t] = A.merge(Po);
});
var Ur = $t, $o = z, Lo = Ur, Fo = function(t, r, n) {
  var s = this || Lo;
  return $o.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, ur, Vn;
function Cs() {
  return Vn || (Vn = 1, ur = function(t) {
    return !!(t && t.__CANCEL__);
  }), ur;
}
var $n = z, lr = Fo, Io = Cs(), Wo = Ur;
function cr(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Uo = function(t) {
  cr(t), t.headers = t.headers || {}, t.data = lr.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = $n.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), $n.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete t.headers[s];
    }
  );
  var r = t.adapter || Wo.adapter;
  return r(t).then(function(s) {
    return cr(t), s.data = lr.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return Io(s) || (cr(t), s && s.response && (s.response.data = lr.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, V = z, Rs = function(t, r) {
  r = r || {};
  var n = {}, s = ["url", "method", "data"], i = ["headers", "auth", "proxy", "params"], a = [
    "baseURL",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "timeoutMessage",
    "withCredentials",
    "adapter",
    "responseType",
    "xsrfCookieName",
    "xsrfHeaderName",
    "onUploadProgress",
    "onDownloadProgress",
    "decompress",
    "maxContentLength",
    "maxBodyLength",
    "maxRedirects",
    "transport",
    "httpAgent",
    "httpsAgent",
    "cancelToken",
    "socketPath",
    "responseEncoding"
  ], o = ["validateStatus"];
  function u(m, _) {
    return V.isPlainObject(m) && V.isPlainObject(_) ? V.merge(m, _) : V.isPlainObject(_) ? V.merge({}, _) : V.isArray(_) ? _.slice() : _;
  }
  function l(m) {
    V.isUndefined(r[m]) ? V.isUndefined(t[m]) || (n[m] = u(void 0, t[m])) : n[m] = u(t[m], r[m]);
  }
  V.forEach(s, function(_) {
    V.isUndefined(r[_]) || (n[_] = u(void 0, r[_]));
  }), V.forEach(i, l), V.forEach(a, function(_) {
    V.isUndefined(r[_]) ? V.isUndefined(t[_]) || (n[_] = u(void 0, t[_])) : n[_] = u(void 0, r[_]);
  }), V.forEach(o, function(_) {
    _ in r ? n[_] = u(t[_], r[_]) : _ in t && (n[_] = u(void 0, t[_]));
  });
  var d = s.concat(i).concat(a).concat(o), p = Object.keys(t).concat(Object.keys(r)).filter(function(_) {
    return d.indexOf(_) === -1;
  });
  return V.forEach(p, l), n;
};
const jo = "axios", Ho = "0.21.4", Go = "Promise based HTTP client for the browser and node.js", qo = "index.js", Bo = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, zo = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, Zo = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], Jo = "Matt Zabriskie", Ko = "MIT", Qo = {
  url: "https://github.com/axios/axios/issues"
}, Xo = "https://axios-http.com", eu = {
  coveralls: "^3.0.0",
  "es6-promise": "^4.2.4",
  grunt: "^1.3.0",
  "grunt-banner": "^0.6.0",
  "grunt-cli": "^1.2.0",
  "grunt-contrib-clean": "^1.1.0",
  "grunt-contrib-watch": "^1.0.0",
  "grunt-eslint": "^23.0.0",
  "grunt-karma": "^4.0.0",
  "grunt-mocha-test": "^0.13.3",
  "grunt-ts": "^6.0.0-beta.19",
  "grunt-webpack": "^4.0.2",
  "istanbul-instrumenter-loader": "^1.0.0",
  "jasmine-core": "^2.4.1",
  karma: "^6.3.2",
  "karma-chrome-launcher": "^3.1.0",
  "karma-firefox-launcher": "^2.1.0",
  "karma-jasmine": "^1.1.1",
  "karma-jasmine-ajax": "^0.1.13",
  "karma-safari-launcher": "^1.0.0",
  "karma-sauce-launcher": "^4.3.6",
  "karma-sinon": "^1.0.5",
  "karma-sourcemap-loader": "^0.3.8",
  "karma-webpack": "^4.0.2",
  "load-grunt-tasks": "^3.5.2",
  minimist: "^1.2.0",
  mocha: "^8.2.1",
  sinon: "^4.5.0",
  "terser-webpack-plugin": "^4.2.3",
  typescript: "^4.0.5",
  "url-search-params": "^0.10.0",
  webpack: "^4.44.2",
  "webpack-dev-server": "^3.11.0"
}, tu = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, ru = "dist/axios.min.js", nu = "dist/axios.min.js", su = "./index.d.ts", iu = {
  "follow-redirects": "^1.14.0"
}, au = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], ou = {
  name: jo,
  version: Ho,
  description: Go,
  main: qo,
  scripts: Bo,
  repository: zo,
  keywords: Zo,
  author: Jo,
  license: Ko,
  bugs: Qo,
  homepage: Xo,
  devDependencies: eu,
  browser: tu,
  jsdelivr: ru,
  unpkg: nu,
  typings: su,
  dependencies: iu,
  bundlesize: au
};
var Ps = ou, jr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  jr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Ln = {}, uu = Ps.version.split(".");
function As(e, t) {
  for (var r = t ? t.split(".") : uu, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
jr.transitional = function(t, r, n) {
  var s = r && As(r);
  function i(a, o) {
    return "[Axios v" + Ps.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !Ln[o] && (Ln[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, o, u) : !0;
  };
};
function lu(e, t, r) {
  if (typeof e != "object")
    throw new TypeError("options must be an object");
  for (var n = Object.keys(e), s = n.length; s-- > 0; ) {
    var i = n[s], a = t[i];
    if (a) {
      var o = e[i], u = o === void 0 || a(o, i, e);
      if (u !== !0)
        throw new TypeError("option " + i + " must be " + u);
      continue;
    }
    if (r !== !0)
      throw Error("Unknown option " + i);
  }
}
var cu = {
  isOlderVersion: As,
  assertOptions: lu,
  validators: jr
}, Vs = z, du = xs, Fn = Oo, In = Uo, Lt = Rs, $s = cu, Ie = $s.validators;
function st(e) {
  this.defaults = e, this.interceptors = {
    request: new Fn(),
    response: new Fn()
  };
}
st.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Lt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && $s.assertOptions(r, {
    silentJSONParsing: Ie.transitional(Ie.boolean, "1.0.0"),
    forcedJSONParsing: Ie.transitional(Ie.boolean, "1.0.0"),
    clarifyTimeoutError: Ie.transitional(Ie.boolean, "1.0.0")
  }, !1);
  var n = [], s = !0;
  this.interceptors.request.forEach(function(m) {
    typeof m.runWhen == "function" && m.runWhen(t) === !1 || (s = s && m.synchronous, n.unshift(m.fulfilled, m.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(m) {
    i.push(m.fulfilled, m.rejected);
  });
  var a;
  if (!s) {
    var o = [In, void 0];
    for (Array.prototype.unshift.apply(o, n), o = o.concat(i), a = Promise.resolve(t); o.length; )
      a = a.then(o.shift(), o.shift());
    return a;
  }
  for (var u = t; n.length; ) {
    var l = n.shift(), d = n.shift();
    try {
      u = l(u);
    } catch (p) {
      d(p);
      break;
    }
  }
  try {
    a = In(u);
  } catch (p) {
    return Promise.reject(p);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
st.prototype.getUri = function(t) {
  return t = Lt(this.defaults, t), du(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
Vs.forEach(["delete", "get", "head", "options"], function(t) {
  st.prototype[t] = function(r, n) {
    return this.request(Lt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
Vs.forEach(["post", "put", "patch"], function(t) {
  st.prototype[t] = function(r, n, s) {
    return this.request(Lt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var fu = st, dr, Wn;
function Ls() {
  if (Wn)
    return dr;
  Wn = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, dr = e, dr;
}
var fr, Un;
function hu() {
  if (Un)
    return fr;
  Un = 1;
  var e = Ls();
  function t(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    var n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    var s = this;
    r(function(a) {
      s.reason || (s.reason = new e(a), n(s.reason));
    });
  }
  return t.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, t.source = function() {
    var n, s = new t(function(a) {
      n = a;
    });
    return {
      token: s,
      cancel: n
    };
  }, fr = t, fr;
}
var hr, jn;
function mu() {
  return jn || (jn = 1, hr = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), hr;
}
var mr, Hn;
function pu() {
  return Hn || (Hn = 1, mr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), mr;
}
var Gn = z, _u = Ds, vt = fu, yu = Rs, gu = Ur;
function Fs(e) {
  var t = new vt(e), r = _u(vt.prototype.request, t);
  return Gn.extend(r, vt.prototype, t), Gn.extend(r, t), r;
}
var re = Fs(gu);
re.Axios = vt;
re.create = function(t) {
  return Fs(yu(re.defaults, t));
};
re.Cancel = Ls();
re.CancelToken = hu();
re.isCancel = Cs();
re.all = function(t) {
  return Promise.all(t);
};
re.spread = mu();
re.isAxiosError = pu();
Fr.exports = re;
Fr.exports.default = re;
var vu = Fr.exports, wu = vu;
const De = /* @__PURE__ */ so(wu);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Is;
function f() {
  return Is.apply(null, arguments);
}
function Su(e) {
  Is = e;
}
function ne(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ye(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function M(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Hr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (M(e, t))
      return !1;
  return !0;
}
function H(e) {
  return e === void 0;
}
function ge(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function it(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ws(e, t) {
  var r = [], n, s = e.length;
  for (n = 0; n < s; ++n)
    r.push(t(e[n], n));
  return r;
}
function be(e, t) {
  for (var r in t)
    M(t, r) && (e[r] = t[r]);
  return M(t, "toString") && (e.toString = t.toString), M(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ce(e, t, r, n) {
  return di(e, t, r, n, !0).utc();
}
function bu() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function b(e) {
  return e._pf == null && (e._pf = bu()), e._pf;
}
var kr;
Array.prototype.some ? kr = Array.prototype.some : kr = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Gr(e) {
  if (e._isValid == null) {
    var t = b(e), r = kr.call(t.parsedDateParts, function(s) {
      return s != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function Ft(e) {
  var t = ce(NaN);
  return e != null ? be(b(t), e) : b(t).userInvalidated = !0, t;
}
var qn = f.momentProperties = [], pr = !1;
function qr(e, t) {
  var r, n, s, i = qn.length;
  if (H(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), H(t._i) || (e._i = t._i), H(t._f) || (e._f = t._f), H(t._l) || (e._l = t._l), H(t._strict) || (e._strict = t._strict), H(t._tzm) || (e._tzm = t._tzm), H(t._isUTC) || (e._isUTC = t._isUTC), H(t._offset) || (e._offset = t._offset), H(t._pf) || (e._pf = b(t)), H(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = qn[r], s = t[n], H(s) || (e[n] = s);
  return e;
}
function at(e) {
  qr(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), pr === !1 && (pr = !0, f.updateOffset(this), pr = !1);
}
function se(e) {
  return e instanceof at || e != null && e._isAMomentObject != null;
}
function Us(e) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function K(e, t) {
  var r = !0;
  return be(function() {
    if (f.deprecationHandler != null && f.deprecationHandler(null, e), r) {
      var n = [], s, i, a, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (s = "", typeof arguments[i] == "object") {
          s += `
[` + i + "] ";
          for (a in arguments[0])
            M(arguments[0], a) && (s += a + ": " + arguments[0][a] + ", ");
          s = s.slice(0, -2);
        } else
          s = arguments[i];
        n.push(s);
      }
      Us(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Bn = {};
function js(e, t) {
  f.deprecationHandler != null && f.deprecationHandler(e, t), Bn[e] || (Us(t), Bn[e] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Ou(e) {
  var t, r;
  for (r in e)
    M(e, r) && (t = e[r], de(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Mr(e, t) {
  var r = be({}, e), n;
  for (n in t)
    M(t, n) && (Ye(e[n]) && Ye(t[n]) ? (r[n] = {}, be(r[n], e[n]), be(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    M(e, n) && !M(t, n) && Ye(e[n]) && (r[n] = be({}, r[n]));
  return r;
}
function Br(e) {
  e != null && this.set(e);
}
var Dr;
Object.keys ? Dr = Object.keys : Dr = function(e) {
  var t, r = [];
  for (t in e)
    M(e, t) && r.push(t);
  return r;
};
var ku = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Mu(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, r) : n;
}
function le(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var zr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, mt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, _r = {}, He = {};
function g(e, t, r, n) {
  var s = n;
  typeof n == "string" && (s = function() {
    return this[n]();
  }), e && (He[e] = s), t && (He[t[0]] = function() {
    return le(s.apply(this, arguments), t[1], t[2]);
  }), r && (He[r] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function Du(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Eu(e) {
  var t = e.match(zr), r, n;
  for (r = 0, n = t.length; r < n; r++)
    He[t[r]] ? t[r] = He[t[r]] : t[r] = Du(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += de(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function wt(e, t) {
  return e.isValid() ? (t = Hs(t, e.localeData()), _r[t] = _r[t] || Eu(t), _r[t](e)) : e.localeData().invalidDate();
}
function Hs(e, t) {
  var r = 5;
  function n(s) {
    return t.longDateFormat(s) || s;
  }
  for (mt.lastIndex = 0; r >= 0 && mt.test(e); )
    e = e.replace(
      mt,
      n
    ), mt.lastIndex = 0, r -= 1;
  return e;
}
var Tu = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function xu(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(zr).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var Nu = "Invalid date";
function Yu() {
  return this._invalidDate;
}
var Cu = "%d", Ru = /\d{1,2}/;
function Pu(e) {
  return this._ordinal.replace("%d", e);
}
var Au = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function Vu(e, t, r, n) {
  var s = this._relativeTime[r];
  return de(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function $u(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return de(r) ? r(t) : r.replace(/%s/i, t);
}
var Qe = {};
function I(e, t) {
  var r = e.toLowerCase();
  Qe[r] = Qe[r + "s"] = Qe[t] = e;
}
function Q(e) {
  return typeof e == "string" ? Qe[e] || Qe[e.toLowerCase()] : void 0;
}
function Zr(e) {
  var t = {}, r, n;
  for (n in e)
    M(e, n) && (r = Q(n), r && (t[r] = e[n]));
  return t;
}
var Gs = {};
function W(e, t) {
  Gs[e] = t;
}
function Lu(e) {
  var t = [], r;
  for (r in e)
    M(e, r) && t.push({ unit: r, priority: Gs[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function It(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function J(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function O(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = J(t)), r;
}
function Be(e, t) {
  return function(r) {
    return r != null ? (qs(this, e, r), f.updateOffset(this, t), this) : kt(this, e);
  };
}
function kt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function qs(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && It(e.year()) && e.month() === 1 && e.date() === 29 ? (r = O(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    qt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Fu(e) {
  return e = Q(e), de(this[e]) ? this[e]() : this;
}
function Iu(e, t) {
  if (typeof e == "object") {
    e = Zr(e);
    var r = Lu(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = Q(e), de(this[e]))
    return this[e](t);
  return this;
}
var Bs = /\d/, Z = /\d\d/, zs = /\d{3}/, Jr = /\d{4}/, Wt = /[+-]?\d{6}/, N = /\d\d?/, Zs = /\d\d\d\d?/, Js = /\d\d\d\d\d\d?/, Ut = /\d{1,3}/, Kr = /\d{1,4}/, jt = /[+-]?\d{1,6}/, ze = /\d+/, Ht = /[+-]?\d+/, Wu = /Z|[+-]\d\d:?\d\d/gi, Gt = /Z|[+-]\d\d(?::?\d\d)?/gi, Uu = /[+-]?\d+(\.\d{1,3})?/, ot = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Mt;
Mt = {};
function h(e, t, r) {
  Mt[e] = de(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function ju(e, t) {
  return M(Mt, e) ? Mt[e](t._strict, t._locale) : new RegExp(Hu(e));
}
function Hu(e) {
  return q(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, n, s, i) {
        return r || n || s || i;
      }
    )
  );
}
function q(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Er = {};
function T(e, t) {
  var r, n = t, s;
  for (typeof e == "string" && (e = [e]), ge(t) && (n = function(i, a) {
    a[t] = O(i);
  }), s = e.length, r = 0; r < s; r++)
    Er[e[r]] = n;
}
function ut(e, t) {
  T(e, function(r, n, s, i) {
    s._w = s._w || {}, t(r, s._w, s, i);
  });
}
function Gu(e, t, r) {
  t != null && M(Er, e) && Er[e](t, r._a, r, e);
}
var F = 0, pe = 1, oe = 2, P = 3, ee = 4, _e = 5, xe = 6, qu = 7, Bu = 8;
function zu(e, t) {
  return (e % t + t) % t;
}
var R;
Array.prototype.indexOf ? R = Array.prototype.indexOf : R = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function qt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = zu(t, 12);
  return e += (t - r) / 12, r === 1 ? It(e) ? 29 : 28 : 31 - r % 7 % 2;
}
g("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
g("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
g("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
I("month", "M");
W("month", 8);
h("M", N);
h("MM", N, Z);
h("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
T(["M", "MM"], function(e, t) {
  t[pe] = O(e) - 1;
});
T(["MMM", "MMMM"], function(e, t, r, n) {
  var s = r._locale.monthsParse(e, n, r._strict);
  s != null ? t[pe] = s : b(r).invalidMonth = e;
});
var Zu = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ks = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Qs = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Ju = ot, Ku = ot;
function Qu(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Qs).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function Xu(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Qs.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function el(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ce([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function tl(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return el.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (s = ce([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
      "^" + this.months(s, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[n] = new RegExp(
      "^" + this.monthsShort(s, "").replace(".", "") + "$",
      "i"
    )), !r && !this._monthsParse[n] && (i = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[n] = new RegExp(i.replace(".", ""), "i")), r && t === "MMMM" && this._longMonthsParse[n].test(e))
      return n;
    if (r && t === "MMM" && this._shortMonthsParse[n].test(e))
      return n;
    if (!r && this._monthsParse[n].test(e))
      return n;
  }
}
function Xs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = O(t);
    else if (t = e.localeData().monthsParse(t), !ge(t))
      return e;
  }
  return r = Math.min(e.date(), qt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function ei(e) {
  return e != null ? (Xs(this, e), f.updateOffset(this, !0), this) : kt(this, "Month");
}
function rl() {
  return qt(this.year(), this.month());
}
function nl(e) {
  return this._monthsParseExact ? (M(this, "_monthsRegex") || ti.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (M(this, "_monthsShortRegex") || (this._monthsShortRegex = Ju), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function sl(e) {
  return this._monthsParseExact ? (M(this, "_monthsRegex") || ti.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (M(this, "_monthsRegex") || (this._monthsRegex = Ku), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function ti() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], n = [], s, i;
  for (s = 0; s < 12; s++)
    i = ce([2e3, s]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
  for (t.sort(e), r.sort(e), n.sort(e), s = 0; s < 12; s++)
    t[s] = q(t[s]), r[s] = q(r[s]);
  for (s = 0; s < 24; s++)
    n[s] = q(n[s]);
  this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
g("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? le(e, 4) : "+" + e;
});
g(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
g(0, ["YYYY", 4], 0, "year");
g(0, ["YYYYY", 5], 0, "year");
g(0, ["YYYYYY", 6, !0], 0, "year");
I("year", "y");
W("year", 1);
h("Y", Ht);
h("YY", N, Z);
h("YYYY", Kr, Jr);
h("YYYYY", jt, Wt);
h("YYYYYY", jt, Wt);
T(["YYYYY", "YYYYYY"], F);
T("YYYY", function(e, t) {
  t[F] = e.length === 2 ? f.parseTwoDigitYear(e) : O(e);
});
T("YY", function(e, t) {
  t[F] = f.parseTwoDigitYear(e);
});
T("Y", function(e, t) {
  t[F] = parseInt(e, 10);
});
function Xe(e) {
  return It(e) ? 366 : 365;
}
f.parseTwoDigitYear = function(e) {
  return O(e) + (O(e) > 68 ? 1900 : 2e3);
};
var ri = Be("FullYear", !0);
function il() {
  return It(this.year());
}
function al(e, t, r, n, s, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, n, s, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, n, s, i, a), o;
}
function et(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Dt(e, t, r) {
  var n = 7 + t - r, s = (7 + et(e, 0, n).getUTCDay() - t) % 7;
  return -s + n - 1;
}
function ni(e, t, r, n, s) {
  var i = (7 + r - n) % 7, a = Dt(e, n, s), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = Xe(u) + o) : o > Xe(e) ? (u = e + 1, l = o - Xe(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function tt(e, t, r) {
  var n = Dt(e.year(), t, r), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return s < 1 ? (a = e.year() - 1, i = s + ye(a, t, r)) : s > ye(e.year(), t, r) ? (i = s - ye(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = s), {
    week: i,
    year: a
  };
}
function ye(e, t, r) {
  var n = Dt(e, t, r), s = Dt(e + 1, t, r);
  return (Xe(e) - n + s) / 7;
}
g("w", ["ww", 2], "wo", "week");
g("W", ["WW", 2], "Wo", "isoWeek");
I("week", "w");
I("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
h("w", N);
h("ww", N, Z);
h("W", N);
h("WW", N, Z);
ut(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = O(e);
  }
);
function ol(e) {
  return tt(e, this._week.dow, this._week.doy).week;
}
var ul = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function ll() {
  return this._week.dow;
}
function cl() {
  return this._week.doy;
}
function dl(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function fl(e) {
  var t = tt(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
g("d", 0, "do", "day");
g("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
g("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
g("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
g("e", 0, 0, "weekday");
g("E", 0, 0, "isoWeekday");
I("day", "d");
I("weekday", "e");
I("isoWeekday", "E");
W("day", 11);
W("weekday", 11);
W("isoWeekday", 11);
h("d", N);
h("e", N);
h("E", N);
h("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
h("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
h("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
ut(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : b(r).invalidWeekday = e;
});
ut(["d", "e", "E"], function(e, t, r, n) {
  t[n] = O(e);
});
function hl(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function ml(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Qr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var pl = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), si = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), _l = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), yl = ot, gl = ot, vl = ot;
function wl(e, t) {
  var r = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Qr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Sl(e) {
  return e === !0 ? Qr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function bl(e) {
  return e === !0 ? Qr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Ol(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      i = ce([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (s = R.call(this._weekdaysParse, a), s !== -1 ? s : null) : t === "ddd" ? (s = R.call(this._shortWeekdaysParse, a), s !== -1 ? s : null) : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null) : t === "dddd" ? (s = R.call(this._weekdaysParse, a), s !== -1 || (s = R.call(this._shortWeekdaysParse, a), s !== -1) ? s : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : t === "ddd" ? (s = R.call(this._shortWeekdaysParse, a), s !== -1 || (s = R.call(this._weekdaysParse, a), s !== -1) ? s : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : (s = R.call(this._minWeekdaysParse, a), s !== -1 || (s = R.call(this._weekdaysParse, a), s !== -1) ? s : (s = R.call(this._shortWeekdaysParse, a), s !== -1 ? s : null));
}
function kl(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Ol.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (s = ce([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
      "^" + this.weekdays(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[n] || (i = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[n] = new RegExp(i.replace(".", ""), "i")), r && t === "dddd" && this._fullWeekdaysParse[n].test(e))
      return n;
    if (r && t === "ddd" && this._shortWeekdaysParse[n].test(e))
      return n;
    if (r && t === "dd" && this._minWeekdaysParse[n].test(e))
      return n;
    if (!r && this._weekdaysParse[n].test(e))
      return n;
  }
}
function Ml(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = hl(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Dl(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function El(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = ml(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Tl(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Xr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (M(this, "_weekdaysRegex") || (this._weekdaysRegex = yl), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function xl(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Xr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (M(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = gl), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Nl(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Xr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (M(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = vl), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Xr() {
  function e(d, p) {
    return p.length - d.length;
  }
  var t = [], r = [], n = [], s = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = ce([2e3, 1]).day(i), o = q(this.weekdaysMin(a, "")), u = q(this.weekdaysShort(a, "")), l = q(this.weekdays(a, "")), t.push(o), r.push(u), n.push(l), s.push(o), s.push(u), s.push(l);
  t.sort(e), r.sort(e), n.sort(e), s.sort(e), this._weekdaysRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function en() {
  return this.hours() % 12 || 12;
}
function Yl() {
  return this.hours() || 24;
}
g("H", ["HH", 2], 0, "hour");
g("h", ["hh", 2], 0, en);
g("k", ["kk", 2], 0, Yl);
g("hmm", 0, 0, function() {
  return "" + en.apply(this) + le(this.minutes(), 2);
});
g("hmmss", 0, 0, function() {
  return "" + en.apply(this) + le(this.minutes(), 2) + le(this.seconds(), 2);
});
g("Hmm", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2);
});
g("Hmmss", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2) + le(this.seconds(), 2);
});
function ii(e, t) {
  g(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
ii("a", !0);
ii("A", !1);
I("hour", "h");
W("hour", 13);
function ai(e, t) {
  return t._meridiemParse;
}
h("a", ai);
h("A", ai);
h("H", N);
h("h", N);
h("k", N);
h("HH", N, Z);
h("hh", N, Z);
h("kk", N, Z);
h("hmm", Zs);
h("hmmss", Js);
h("Hmm", Zs);
h("Hmmss", Js);
T(["H", "HH"], P);
T(["k", "kk"], function(e, t, r) {
  var n = O(e);
  t[P] = n === 24 ? 0 : n;
});
T(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
T(["h", "hh"], function(e, t, r) {
  t[P] = O(e), b(r).bigHour = !0;
});
T("hmm", function(e, t, r) {
  var n = e.length - 2;
  t[P] = O(e.substr(0, n)), t[ee] = O(e.substr(n)), b(r).bigHour = !0;
});
T("hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = O(e.substr(0, n)), t[ee] = O(e.substr(n, 2)), t[_e] = O(e.substr(s)), b(r).bigHour = !0;
});
T("Hmm", function(e, t, r) {
  var n = e.length - 2;
  t[P] = O(e.substr(0, n)), t[ee] = O(e.substr(n));
});
T("Hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = O(e.substr(0, n)), t[ee] = O(e.substr(n, 2)), t[_e] = O(e.substr(s));
});
function Cl(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Rl = /[ap]\.?m?\.?/i, Pl = Be("Hours", !0);
function Al(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var oi = {
  calendar: ku,
  longDateFormat: Tu,
  invalidDate: Nu,
  ordinal: Cu,
  dayOfMonthOrdinalParse: Ru,
  relativeTime: Au,
  months: Zu,
  monthsShort: Ks,
  week: ul,
  weekdays: pl,
  weekdaysMin: _l,
  weekdaysShort: si,
  meridiemParse: Rl
}, Y = {}, Je = {}, rt;
function Vl(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function zn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function $l(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = zn(e[t]).split("-"), r = i.length, n = zn(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = Bt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && Vl(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return rt;
}
function Ll(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Bt(e) {
  var t = null, r;
  if (Y[e] === void 0 && typeof module < "u" && module && module.exports && Ll(e))
    try {
      t = rt._abbr, r = require, r("./locale/" + e), ke(t);
    } catch {
      Y[e] = null;
    }
  return Y[e];
}
function ke(e, t) {
  var r;
  return e && (H(t) ? r = ve(e) : r = tn(e, t), r ? rt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), rt._abbr;
}
function tn(e, t) {
  if (t !== null) {
    var r, n = oi;
    if (t.abbr = e, Y[e] != null)
      js(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Y[e]._config;
    else if (t.parentLocale != null)
      if (Y[t.parentLocale] != null)
        n = Y[t.parentLocale]._config;
      else if (r = Bt(t.parentLocale), r != null)
        n = r._config;
      else
        return Je[t.parentLocale] || (Je[t.parentLocale] = []), Je[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return Y[e] = new Br(Mr(n, t)), Je[e] && Je[e].forEach(function(s) {
      tn(s.name, s.config);
    }), ke(e), Y[e];
  } else
    return delete Y[e], null;
}
function Fl(e, t) {
  if (t != null) {
    var r, n, s = oi;
    Y[e] != null && Y[e].parentLocale != null ? Y[e].set(Mr(Y[e]._config, t)) : (n = Bt(e), n != null && (s = n._config), t = Mr(s, t), n == null && (t.abbr = e), r = new Br(t), r.parentLocale = Y[e], Y[e] = r), ke(e);
  } else
    Y[e] != null && (Y[e].parentLocale != null ? (Y[e] = Y[e].parentLocale, e === ke() && ke(e)) : Y[e] != null && delete Y[e]);
  return Y[e];
}
function ve(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return rt;
  if (!ne(e)) {
    if (t = Bt(e), t)
      return t;
    e = [e];
  }
  return $l(e);
}
function Il() {
  return Dr(Y);
}
function rn(e) {
  var t, r = e._a;
  return r && b(e).overflow === -2 && (t = r[pe] < 0 || r[pe] > 11 ? pe : r[oe] < 1 || r[oe] > qt(r[F], r[pe]) ? oe : r[P] < 0 || r[P] > 24 || r[P] === 24 && (r[ee] !== 0 || r[_e] !== 0 || r[xe] !== 0) ? P : r[ee] < 0 || r[ee] > 59 ? ee : r[_e] < 0 || r[_e] > 59 ? _e : r[xe] < 0 || r[xe] > 999 ? xe : -1, b(e)._overflowDayOfYear && (t < F || t > oe) && (t = oe), b(e)._overflowWeeks && t === -1 && (t = qu), b(e)._overflowWeekday && t === -1 && (t = Bu), b(e).overflow = t), e;
}
var Wl = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ul = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, jl = /Z|[+-]\d\d(?::?\d\d)?/, pt = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], yr = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], Hl = /^\/?Date\((-?\d+)/i, Gl = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, ql = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function ui(e) {
  var t, r, n = e._i, s = Wl.exec(n) || Ul.exec(n), i, a, o, u, l = pt.length, d = yr.length;
  if (s) {
    for (b(e).iso = !0, t = 0, r = l; t < r; t++)
      if (pt[t][1].exec(s[1])) {
        a = pt[t][0], i = pt[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, r = d; t < r; t++)
        if (yr[t][1].exec(s[3])) {
          o = (s[2] || " ") + yr[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!i && o != null) {
      e._isValid = !1;
      return;
    }
    if (s[4])
      if (jl.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), sn(e);
  } else
    e._isValid = !1;
}
function Bl(e, t, r, n, s, i) {
  var a = [
    zl(e),
    Ks.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function zl(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Zl(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Jl(e, t, r) {
  if (e) {
    var n = si.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return b(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function Kl(e, t, r) {
  if (e)
    return ql[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function li(e) {
  var t = Gl.exec(Zl(e._i)), r;
  if (t) {
    if (r = Bl(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Jl(t[1], r, e))
      return;
    e._a = r, e._tzm = Kl(t[8], t[9], t[10]), e._d = et.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Ql(e) {
  var t = Hl.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (ui(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (li(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : f.createFromInputFallback(e);
}
f.createFromInputFallback = K(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ue(e, t, r) {
  return e ?? t ?? r;
}
function Xl(e) {
  var t = new Date(f.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function nn(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = Xl(e), e._w && e._a[oe] == null && e._a[pe] == null && ec(e), e._dayOfYear != null && (a = Ue(e._a[F], s[F]), (e._dayOfYear > Xe(a) || e._dayOfYear === 0) && (b(e)._overflowDayOfYear = !0), r = et(a, 0, e._dayOfYear), e._a[pe] = r.getUTCMonth(), e._a[oe] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[ee] === 0 && e._a[_e] === 0 && e._a[xe] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? et : al).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (b(e).weekdayMismatch = !0);
  }
}
function ec(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = Ue(
    t.GG,
    e._a[F],
    tt(x(), 1, 4).year
  ), n = Ue(t.W, 1), s = Ue(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = tt(x(), i, a), r = Ue(t.gg, e._a[F], l.year), n = Ue(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > ye(r, i, a) ? b(e)._overflowWeeks = !0 : u != null ? b(e)._overflowWeekday = !0 : (o = ni(r, n, s, i, a), e._a[F] = o.year, e._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function sn(e) {
  if (e._f === f.ISO_8601) {
    ui(e);
    return;
  }
  if (e._f === f.RFC_2822) {
    li(e);
    return;
  }
  e._a = [], b(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, d;
  for (s = Hs(e._f, e._locale).match(zr) || [], d = s.length, r = 0; r < d; r++)
    i = s[r], n = (t.match(ju(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && b(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), He[i] ? (n ? b(e).empty = !1 : b(e).unusedTokens.push(i), Gu(i, n, e)) : e._strict && !n && b(e).unusedTokens.push(i);
  b(e).charsLeftOver = o - u, t.length > 0 && b(e).unusedInput.push(t), e._a[P] <= 12 && b(e).bigHour === !0 && e._a[P] > 0 && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[P] = tc(
    e._locale,
    e._a[P],
    e._meridiem
  ), l = b(e).era, l !== null && (e._a[F] = e._locale.erasConvertYear(l, e._a[F])), nn(e), rn(e);
}
function tc(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function rc(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    b(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = qr({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], sn(t), Gr(t) && (a = !0), i += b(t).charsLeftOver, i += b(t).unusedTokens.length * 10, b(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  be(e, r || t);
}
function nc(e) {
  if (!e._d) {
    var t = Zr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = Ws(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), nn(e);
  }
}
function sc(e) {
  var t = new at(rn(ci(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function ci(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ve(e._l), t === null || r === void 0 && t === "" ? Ft({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), se(t) ? new at(rn(t)) : (it(t) ? e._d = t : ne(r) ? rc(e) : r ? sn(e) : ic(e), Gr(e) || (e._d = null), e));
}
function ic(e) {
  var t = e._i;
  H(t) ? e._d = new Date(f.now()) : it(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Ql(e) : ne(t) ? (e._a = Ws(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), nn(e)) : Ye(t) ? nc(e) : ge(t) ? e._d = new Date(t) : f.createFromInputFallback(e);
}
function di(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Ye(e) && Hr(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, sc(i);
}
function x(e, t, r, n) {
  return di(e, t, r, n, !1);
}
var ac = K(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = x.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Ft();
  }
), oc = K(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = x.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Ft();
  }
);
function fi(e, t) {
  var r, n;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return x();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function uc() {
  var e = [].slice.call(arguments, 0);
  return fi("isBefore", e);
}
function lc() {
  var e = [].slice.call(arguments, 0);
  return fi("isAfter", e);
}
var cc = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ke = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function dc(e) {
  var t, r = !1, n, s = Ke.length;
  for (t in e)
    if (M(e, t) && !(R.call(Ke, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < s; ++n)
    if (e[Ke[n]]) {
      if (r)
        return !1;
      parseFloat(e[Ke[n]]) !== O(e[Ke[n]]) && (r = !0);
    }
  return !0;
}
function fc() {
  return this._isValid;
}
function hc() {
  return ae(NaN);
}
function zt(e) {
  var t = Zr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, d = t.millisecond || 0;
  this._isValid = dc(t), this._milliseconds = +d + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ve(), this._bubble();
}
function St(e) {
  return e instanceof zt;
}
function Tr(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function mc(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && O(e[a]) !== O(t[a])) && i++;
  return i + s;
}
function hi(e, t) {
  g(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + le(~~(r / 60), 2) + t + le(~~r % 60, 2);
  });
}
hi("Z", ":");
hi("ZZ", "");
h("Z", Gt);
h("ZZ", Gt);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = an(Gt, e);
});
var pc = /([\+\-]|\d\d)/gi;
function an(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(pc) || ["-", 0, 0], i = +(s[1] * 60) + O(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function on(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (se(e) || it(e) ? e.valueOf() : x(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), f.updateOffset(r, !1), r) : x(e).local();
}
function xr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function _c(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = an(Gt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = xr(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? _i(
      this,
      ae(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : xr(this);
}
function yc(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function gc(e) {
  return this.utcOffset(0, e);
}
function vc(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(xr(this), "m")), this;
}
function wc() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = an(Wu, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Sc(e) {
  return this.isValid() ? (e = e ? x(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function bc() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Oc() {
  if (!H(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return qr(e, this), e = ci(e), e._a ? (t = e._isUTC ? ce(e._a) : x(e._a), this._isDSTShifted = this.isValid() && mc(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function kc() {
  return this.isValid() ? !this._isUTC : !1;
}
function Mc() {
  return this.isValid() ? this._isUTC : !1;
}
function mi() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Dc = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Ec = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ae(e, t) {
  var r = e, n = null, s, i, a;
  return St(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ge(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = Dc.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: O(n[oe]) * s,
    h: O(n[P]) * s,
    m: O(n[ee]) * s,
    s: O(n[_e]) * s,
    ms: O(Tr(n[xe] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = Ec.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: Ee(n[2], s),
    M: Ee(n[3], s),
    w: Ee(n[4], s),
    d: Ee(n[5], s),
    h: Ee(n[6], s),
    m: Ee(n[7], s),
    s: Ee(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Tc(
    x(r.from),
    x(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new zt(r), St(e) && M(e, "_locale") && (i._locale = e._locale), St(e) && M(e, "_isValid") && (i._isValid = e._isValid), i;
}
ae.fn = zt.prototype;
ae.invalid = hc;
function Ee(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Zn(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Tc(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = on(t, e), e.isBefore(t) ? r = Zn(e, t) : (r = Zn(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function pi(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (js(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ae(r, n), _i(this, s, e), this;
  };
}
function _i(e, t, r, n) {
  var s = t._milliseconds, i = Tr(t._days), a = Tr(t._months);
  e.isValid() && (n = n ?? !0, a && Xs(e, kt(e, "Month") + a * r), i && qs(e, "Date", kt(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && f.updateOffset(e, i || a));
}
var xc = pi(1, "add"), Nc = pi(-1, "subtract");
function yi(e) {
  return typeof e == "string" || e instanceof String;
}
function Yc(e) {
  return se(e) || it(e) || yi(e) || ge(e) || Rc(e) || Cc(e) || e === null || e === void 0;
}
function Cc(e) {
  var t = Ye(e) && !Hr(e), r = !1, n = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], s, i, a = n.length;
  for (s = 0; s < a; s += 1)
    i = n[s], r = r || M(e, i);
  return t && r;
}
function Rc(e) {
  var t = ne(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ge(n) && yi(e);
  }).length === 0), t && r;
}
function Pc(e) {
  var t = Ye(e) && !Hr(e), r = !1, n = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], s, i;
  for (s = 0; s < n.length; s += 1)
    i = n[s], r = r || M(e, i);
  return t && r;
}
function Ac(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Vc(e, t) {
  arguments.length === 1 && (arguments[0] ? Yc(arguments[0]) ? (e = arguments[0], t = void 0) : Pc(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || x(), n = on(r, this).startOf("day"), s = f.calendarFormat(this, n) || "sameElse", i = t && (de(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, x(r))
  );
}
function $c() {
  return new at(this);
}
function Lc(e, t) {
  var r = se(e) ? e : x(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Fc(e, t) {
  var r = se(e) ? e : x(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function Ic(e, t, r, n) {
  var s = se(e) ? e : x(e), i = se(t) ? t : x(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Wc(e, t) {
  var r = se(e) ? e : x(e), n;
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function Uc(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function jc(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Hc(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = on(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = Q(t), t) {
    case "year":
      i = bt(this, n) / 12;
      break;
    case "month":
      i = bt(this, n);
      break;
    case "quarter":
      i = bt(this, n) / 3;
      break;
    case "second":
      i = (this - n) / 1e3;
      break;
    case "minute":
      i = (this - n) / 6e4;
      break;
    case "hour":
      i = (this - n) / 36e5;
      break;
    case "day":
      i = (this - n - s) / 864e5;
      break;
    case "week":
      i = (this - n - s) / 6048e5;
      break;
    default:
      i = this - n;
  }
  return r ? i : J(i);
}
function bt(e, t) {
  if (e.date() < t.date())
    return -bt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Gc() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function qc(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? wt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : de(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", wt(r, "Z")) : wt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Bc() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function zc(e) {
  e || (e = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var t = wt(this, e);
  return this.localeData().postformat(t);
}
function Zc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || x(e).isValid()) ? ae({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Jc(e) {
  return this.from(x(), e);
}
function Kc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || x(e).isValid()) ? ae({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Qc(e) {
  return this.to(x(), e);
}
function gi(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ve(e), t != null && (this._locale = t), this);
}
var vi = K(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function wi() {
  return this._locale;
}
var Et = 1e3, Ge = 60 * Et, Tt = 60 * Ge, Si = (365 * 400 + 97) * 24 * Tt;
function qe(e, t) {
  return (e % t + t) % t;
}
function bi(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Si : new Date(e, t, r).valueOf();
}
function Oi(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Si : Date.UTC(e, t, r);
}
function Xc(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Oi : bi, e) {
    case "year":
      t = r(this.year(), 0, 1);
      break;
    case "quarter":
      t = r(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = r(this.year(), this.month(), 1);
      break;
    case "week":
      t = r(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= qe(
        t + (this._isUTC ? 0 : this.utcOffset() * Ge),
        Tt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= qe(t, Ge);
      break;
    case "second":
      t = this._d.valueOf(), t -= qe(t, Et);
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function ed(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Oi : bi, e) {
    case "year":
      t = r(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = r(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = r(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = r(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += Tt - qe(
        t + (this._isUTC ? 0 : this.utcOffset() * Ge),
        Tt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Ge - qe(t, Ge) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Et - qe(t, Et) - 1;
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function td() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function rd() {
  return Math.floor(this.valueOf() / 1e3);
}
function nd() {
  return new Date(this.valueOf());
}
function sd() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function id() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function ad() {
  return this.isValid() ? this.toISOString() : null;
}
function od() {
  return Gr(this);
}
function ud() {
  return be({}, b(this));
}
function ld() {
  return b(this).overflow;
}
function cd() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
g("N", 0, 0, "eraAbbr");
g("NN", 0, 0, "eraAbbr");
g("NNN", 0, 0, "eraAbbr");
g("NNNN", 0, 0, "eraName");
g("NNNNN", 0, 0, "eraNarrow");
g("y", ["y", 1], "yo", "eraYear");
g("y", ["yy", 2], 0, "eraYear");
g("y", ["yyy", 3], 0, "eraYear");
g("y", ["yyyy", 4], 0, "eraYear");
h("N", un);
h("NN", un);
h("NNN", un);
h("NNNN", Sd);
h("NNNNN", bd);
T(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? b(r).era = s : b(r).invalidEra = e;
  }
);
h("y", ze);
h("yy", ze);
h("yyy", ze);
h("yyyy", ze);
h("yo", Od);
T(["y", "yy", "yyy", "yyyy"], F);
T(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[F] = r._locale.eraYearOrdinalParse(e, s) : t[F] = parseInt(e, 10);
});
function dd(e, t) {
  var r, n, s, i = this._eras || ve("en")._eras;
  for (r = 0, n = i.length; r < n; ++r) {
    switch (typeof i[r].since) {
      case "string":
        s = f(i[r].since).startOf("day"), i[r].since = s.valueOf();
        break;
    }
    switch (typeof i[r].until) {
      case "undefined":
        i[r].until = 1 / 0;
        break;
      case "string":
        s = f(i[r].until).startOf("day").valueOf(), i[r].until = s.valueOf();
        break;
    }
  }
  return i;
}
function fd(e, t, r) {
  var n, s, i = this.eras(), a, o, u;
  for (e = e.toUpperCase(), n = 0, s = i.length; n < s; ++n)
    if (a = i[n].name.toUpperCase(), o = i[n].abbr.toUpperCase(), u = i[n].narrow.toUpperCase(), r)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[n];
          break;
        case "NNNN":
          if (a === e)
            return i[n];
          break;
        case "NNNNN":
          if (u === e)
            return i[n];
          break;
      }
    else if ([a, o, u].indexOf(e) >= 0)
      return i[n];
}
function hd(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? f(e.since).year() : f(e.since).year() + (t - e.offset) * r;
}
function md() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function pd() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function _d() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function yd() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - f(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function gd(e) {
  return M(this, "_erasNameRegex") || ln.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function vd(e) {
  return M(this, "_erasAbbrRegex") || ln.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function wd(e) {
  return M(this, "_erasNarrowRegex") || ln.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function un(e, t) {
  return t.erasAbbrRegex(e);
}
function Sd(e, t) {
  return t.erasNameRegex(e);
}
function bd(e, t) {
  return t.erasNarrowRegex(e);
}
function Od(e, t) {
  return t._eraYearOrdinalRegex || ze;
}
function ln() {
  var e = [], t = [], r = [], n = [], s, i, a = this.eras();
  for (s = 0, i = a.length; s < i; ++s)
    t.push(q(a[s].name)), e.push(q(a[s].abbr)), r.push(q(a[s].narrow)), n.push(q(a[s].name)), n.push(q(a[s].abbr)), n.push(q(a[s].narrow));
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
g(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
g(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function Zt(e, t) {
  g(0, [e, e.length], 0, t);
}
Zt("gggg", "weekYear");
Zt("ggggg", "weekYear");
Zt("GGGG", "isoWeekYear");
Zt("GGGGG", "isoWeekYear");
I("weekYear", "gg");
I("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
h("G", Ht);
h("g", Ht);
h("GG", N, Z);
h("gg", N, Z);
h("GGGG", Kr, Jr);
h("gggg", Kr, Jr);
h("GGGGG", jt, Wt);
h("ggggg", jt, Wt);
ut(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = O(e);
  }
);
ut(["gg", "GG"], function(e, t, r, n) {
  t[n] = f.parseTwoDigitYear(e);
});
function kd(e) {
  return ki.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Md(e) {
  return ki.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Dd() {
  return ye(this.year(), 1, 4);
}
function Ed() {
  return ye(this.isoWeekYear(), 1, 4);
}
function Td() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function xd() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function ki(e, t, r, n, s) {
  var i;
  return e == null ? tt(this, n, s).year : (i = ye(e, n, s), t > i && (t = i), Nd.call(this, e, t, r, n, s));
}
function Nd(e, t, r, n, s) {
  var i = ni(e, t, r, n, s), a = et(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
g("Q", 0, "Qo", "quarter");
I("quarter", "Q");
W("quarter", 7);
h("Q", Bs);
T("Q", function(e, t) {
  t[pe] = (O(e) - 1) * 3;
});
function Yd(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
g("D", ["DD", 2], "Do", "date");
I("date", "D");
W("date", 9);
h("D", N);
h("DD", N, Z);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], oe);
T("Do", function(e, t) {
  t[oe] = O(e.match(N)[0]);
});
var Mi = Be("Date", !0);
g("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
I("dayOfYear", "DDD");
W("dayOfYear", 4);
h("DDD", Ut);
h("DDDD", zs);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = O(e);
});
function Cd(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
g("m", ["mm", 2], 0, "minute");
I("minute", "m");
W("minute", 14);
h("m", N);
h("mm", N, Z);
T(["m", "mm"], ee);
var Rd = Be("Minutes", !1);
g("s", ["ss", 2], 0, "second");
I("second", "s");
W("second", 15);
h("s", N);
h("ss", N, Z);
T(["s", "ss"], _e);
var Pd = Be("Seconds", !1);
g("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
g(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
g(0, ["SSS", 3], 0, "millisecond");
g(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
g(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
g(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
g(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
g(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
g(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
I("millisecond", "ms");
W("millisecond", 16);
h("S", Ut, Bs);
h("SS", Ut, Z);
h("SSS", Ut, zs);
var Oe, Di;
for (Oe = "SSSS"; Oe.length <= 9; Oe += "S")
  h(Oe, ze);
function Ad(e, t) {
  t[xe] = O(("0." + e) * 1e3);
}
for (Oe = "S"; Oe.length <= 9; Oe += "S")
  T(Oe, Ad);
Di = Be("Milliseconds", !1);
g("z", 0, 0, "zoneAbbr");
g("zz", 0, 0, "zoneName");
function Vd() {
  return this._isUTC ? "UTC" : "";
}
function $d() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = at.prototype;
c.add = xc;
c.calendar = Vc;
c.clone = $c;
c.diff = Hc;
c.endOf = ed;
c.format = zc;
c.from = Zc;
c.fromNow = Jc;
c.to = Kc;
c.toNow = Qc;
c.get = Fu;
c.invalidAt = ld;
c.isAfter = Lc;
c.isBefore = Fc;
c.isBetween = Ic;
c.isSame = Wc;
c.isSameOrAfter = Uc;
c.isSameOrBefore = jc;
c.isValid = od;
c.lang = vi;
c.locale = gi;
c.localeData = wi;
c.max = oc;
c.min = ac;
c.parsingFlags = ud;
c.set = Iu;
c.startOf = Xc;
c.subtract = Nc;
c.toArray = sd;
c.toObject = id;
c.toDate = nd;
c.toISOString = qc;
c.inspect = Bc;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = ad;
c.toString = Gc;
c.unix = rd;
c.valueOf = td;
c.creationData = cd;
c.eraName = md;
c.eraNarrow = pd;
c.eraAbbr = _d;
c.eraYear = yd;
c.year = ri;
c.isLeapYear = il;
c.weekYear = kd;
c.isoWeekYear = Md;
c.quarter = c.quarters = Yd;
c.month = ei;
c.daysInMonth = rl;
c.week = c.weeks = dl;
c.isoWeek = c.isoWeeks = fl;
c.weeksInYear = Td;
c.weeksInWeekYear = xd;
c.isoWeeksInYear = Dd;
c.isoWeeksInISOWeekYear = Ed;
c.date = Mi;
c.day = c.days = Ml;
c.weekday = Dl;
c.isoWeekday = El;
c.dayOfYear = Cd;
c.hour = c.hours = Pl;
c.minute = c.minutes = Rd;
c.second = c.seconds = Pd;
c.millisecond = c.milliseconds = Di;
c.utcOffset = _c;
c.utc = gc;
c.local = vc;
c.parseZone = wc;
c.hasAlignedHourOffset = Sc;
c.isDST = bc;
c.isLocal = kc;
c.isUtcOffset = Mc;
c.isUtc = mi;
c.isUTC = mi;
c.zoneAbbr = Vd;
c.zoneName = $d;
c.dates = K(
  "dates accessor is deprecated. Use date instead.",
  Mi
);
c.months = K(
  "months accessor is deprecated. Use month instead",
  ei
);
c.years = K(
  "years accessor is deprecated. Use year instead",
  ri
);
c.zone = K(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  yc
);
c.isDSTShifted = K(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Oc
);
function Ld(e) {
  return x(e * 1e3);
}
function Fd() {
  return x.apply(null, arguments).parseZone();
}
function Ei(e) {
  return e;
}
var D = Br.prototype;
D.calendar = Mu;
D.longDateFormat = xu;
D.invalidDate = Yu;
D.ordinal = Pu;
D.preparse = Ei;
D.postformat = Ei;
D.relativeTime = Vu;
D.pastFuture = $u;
D.set = Ou;
D.eras = dd;
D.erasParse = fd;
D.erasConvertYear = hd;
D.erasAbbrRegex = vd;
D.erasNameRegex = gd;
D.erasNarrowRegex = wd;
D.months = Qu;
D.monthsShort = Xu;
D.monthsParse = tl;
D.monthsRegex = sl;
D.monthsShortRegex = nl;
D.week = ol;
D.firstDayOfYear = cl;
D.firstDayOfWeek = ll;
D.weekdays = wl;
D.weekdaysMin = bl;
D.weekdaysShort = Sl;
D.weekdaysParse = kl;
D.weekdaysRegex = Tl;
D.weekdaysShortRegex = xl;
D.weekdaysMinRegex = Nl;
D.isPM = Cl;
D.meridiem = Al;
function xt(e, t, r, n) {
  var s = ve(), i = ce().set(n, t);
  return s[r](i, e);
}
function Ti(e, t, r) {
  if (ge(e) && (t = e, e = void 0), e = e || "", t != null)
    return xt(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = xt(e, n, r, "month");
  return s;
}
function cn(e, t, r, n) {
  typeof e == "boolean" ? (ge(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ge(t) && (r = t, t = void 0), t = t || "");
  var s = ve(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return xt(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = xt(t, (a + i) % 7, n, "day");
  return o;
}
function Id(e, t) {
  return Ti(e, t, "months");
}
function Wd(e, t) {
  return Ti(e, t, "monthsShort");
}
function Ud(e, t, r) {
  return cn(e, t, r, "weekdays");
}
function jd(e, t, r) {
  return cn(e, t, r, "weekdaysShort");
}
function Hd(e, t, r) {
  return cn(e, t, r, "weekdaysMin");
}
ke("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, r = O(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
f.lang = K(
  "moment.lang is deprecated. Use moment.locale instead.",
  ke
);
f.langData = K(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ve
);
var he = Math.abs;
function Gd() {
  var e = this._data;
  return this._milliseconds = he(this._milliseconds), this._days = he(this._days), this._months = he(this._months), e.milliseconds = he(e.milliseconds), e.seconds = he(e.seconds), e.minutes = he(e.minutes), e.hours = he(e.hours), e.months = he(e.months), e.years = he(e.years), this;
}
function xi(e, t, r, n) {
  var s = ae(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function qd(e, t) {
  return xi(this, e, t, 1);
}
function Bd(e, t) {
  return xi(this, e, t, -1);
}
function Jn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function zd() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Jn(Nr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = J(e / 1e3), n.seconds = s % 60, i = J(s / 60), n.minutes = i % 60, a = J(i / 60), n.hours = a % 24, t += J(a / 24), u = J(Ni(t)), r += u, t -= Jn(Nr(u)), o = J(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function Ni(e) {
  return e * 4800 / 146097;
}
function Nr(e) {
  return e * 146097 / 4800;
}
function Zd(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = Q(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + Ni(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(Nr(this._months)), e) {
      case "week":
        return t / 7 + n / 6048e5;
      case "day":
        return t + n / 864e5;
      case "hour":
        return t * 24 + n / 36e5;
      case "minute":
        return t * 1440 + n / 6e4;
      case "second":
        return t * 86400 + n / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + n;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function Jd() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + O(this._months / 12) * 31536e6 : NaN;
}
function we(e) {
  return function() {
    return this.as(e);
  };
}
var Kd = we("ms"), Qd = we("s"), Xd = we("m"), ef = we("h"), tf = we("d"), rf = we("w"), nf = we("M"), sf = we("Q"), af = we("y");
function of() {
  return ae(this);
}
function uf(e) {
  return e = Q(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ae(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var lf = Ae("milliseconds"), cf = Ae("seconds"), df = Ae("minutes"), ff = Ae("hours"), hf = Ae("days"), mf = Ae("months"), pf = Ae("years");
function _f() {
  return J(this.days() / 7);
}
var me = Math.round, je = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function yf(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function gf(e, t, r, n) {
  var s = ae(e).abs(), i = me(s.as("s")), a = me(s.as("m")), o = me(s.as("h")), u = me(s.as("d")), l = me(s.as("M")), d = me(s.as("w")), p = me(s.as("y")), m = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (m = m || d <= 1 && ["w"] || d < r.w && ["ww", d]), m = m || l <= 1 && ["M"] || l < r.M && ["MM", l] || p <= 1 && ["y"] || ["yy", p], m[2] = t, m[3] = +e > 0, m[4] = n, yf.apply(null, m);
}
function vf(e) {
  return e === void 0 ? me : typeof e == "function" ? (me = e, !0) : !1;
}
function wf(e, t) {
  return je[e] === void 0 ? !1 : t === void 0 ? je[e] : (je[e] = t, e === "s" && (je.ss = t - 1), !0);
}
function Sf(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = je, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, je, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = gf(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var gr = Math.abs;
function We(e) {
  return (e > 0) - (e < 0) || +e;
}
function Jt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = gr(this._milliseconds) / 1e3, t = gr(this._days), r = gr(this._months), n, s, i, a, o = this.asSeconds(), u, l, d, p;
  return o ? (n = J(e / 60), s = J(n / 60), e %= 60, n %= 60, i = J(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = We(this._months) !== We(o) ? "-" : "", d = We(this._days) !== We(o) ? "-" : "", p = We(this._milliseconds) !== We(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? d + t + "D" : "") + (s || n || e ? "T" : "") + (s ? p + s + "H" : "") + (n ? p + n + "M" : "") + (e ? p + a + "S" : "")) : "P0D";
}
var k = zt.prototype;
k.isValid = fc;
k.abs = Gd;
k.add = qd;
k.subtract = Bd;
k.as = Zd;
k.asMilliseconds = Kd;
k.asSeconds = Qd;
k.asMinutes = Xd;
k.asHours = ef;
k.asDays = tf;
k.asWeeks = rf;
k.asMonths = nf;
k.asQuarters = sf;
k.asYears = af;
k.valueOf = Jd;
k._bubble = zd;
k.clone = of;
k.get = uf;
k.milliseconds = lf;
k.seconds = cf;
k.minutes = df;
k.hours = ff;
k.days = hf;
k.weeks = _f;
k.months = mf;
k.years = pf;
k.humanize = Sf;
k.toISOString = Jt;
k.toString = Jt;
k.toJSON = Jt;
k.locale = gi;
k.localeData = wi;
k.toIsoString = K(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Jt
);
k.lang = vi;
g("X", 0, 0, "unix");
g("x", 0, 0, "valueOf");
h("x", Ht);
h("X", Uu);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(O(e));
});
//! moment.js
f.version = "2.29.4";
Su(x);
f.fn = c;
f.min = uc;
f.max = lc;
f.now = cc;
f.utc = ce;
f.unix = Ld;
f.months = Id;
f.isDate = it;
f.locale = ke;
f.invalid = Ft;
f.duration = ae;
f.isMoment = se;
f.weekdays = Ud;
f.parseZone = Fd;
f.localeData = ve;
f.isDuration = St;
f.monthsShort = Wd;
f.weekdaysMin = Hd;
f.defineLocale = tn;
f.updateLocale = Fl;
f.locales = Il;
f.weekdaysShort = jd;
f.normalizeUnits = Q;
f.relativeTimeRounding = vf;
f.relativeTimeThreshold = wf;
f.calendarFormat = Ac;
f.prototype = c;
f.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
function Kn(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var $ = function() {
};
$.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (De.defaults.headers.common["X-CSRF-Token"] = e.content), De.defaults.headers.common.Accept = "application/json", De.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, $.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  L.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = De.CancelToken.source();
}, $.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, $.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, $.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = Kn(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return De(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, $.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = Kn(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), L.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, $.cancelTokenSources = {}, $.active = 0, De.interceptors.request.use(function(e) {
  return $.active += 1, e;
}, function(e) {
  return $.active -= 1, Promise.reject(e);
}), De.interceptors.response.use(function(e) {
  return $.active -= 1, e;
}, function(e) {
  return $.active -= 1, Promise.reject(e);
}), window.Api = $;
var L = { isString: function(e) {
  return typeof e == "string";
}, isUndefined: function(e) {
  return e === void 0;
}, isUndefinedOrNull: function(e) {
  return this.isUndefined(e) || e === null;
}, isEmpty: function(e) {
  return this.isObject(e) ? Object.keys(e).length === 0 : this.isString(e) ? e.length === 0 : void 0;
}, isNotEmpty: function(e) {
  return !this.isEmpty(e);
}, isBlank: function(e) {
  return this.isUndefinedOrNull(e) || this.isEmpty(e);
}, isFalsy: function(e) {
  return this.isBlank(e) || e === !1;
}, isTruthy: function(e) {
  return !this.isFalsy(e);
}, isUUID: function(e) {
  return typeof e == "string" && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(e);
}, toUnderscore: function(e) {
  return typeof e == "string" ? e.replace(/([A-Z])/g, function(t) {
    return "_" + t.toLowerCase();
  }) : e;
}, toLowerCamelCase: function(e) {
  return typeof e == "string" ? e.replace(/(_[a-z])/g, function(t) {
    return t.toUpperCase().replace("_", "");
  }) : e;
}, isObject: function(e) {
  return typeof e == "object";
}, isArray: function(e) {
  return e.constructor === Array;
}, isFunction: function(e) {
  return typeof e == "function";
}, noop: function() {
}, getMaxOfArray: function(e) {
  return Math.max.apply(null, e);
}, compareStrings: function(e, t) {
  return e.localeCompare(t);
}, compareNumbers: function(e, t) {
  return e - t;
}, generateIntegerHashFromString: function(e) {
  for (var t = 5381, r = e.length; r; )
    t = 33 * t ^ e.charCodeAt(--r);
  return t >>> 0;
}, dateHasIsoFormat: function(e) {
  return e.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/);
}, dateTimeHasIsoFormat: function(e) {
  return e.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):([0-5][0-9])$/);
}, dateTimeHasStrictISO8601Format: function(e) {
  return !f(e, "YYYY-MM-DD HH:mm", !0).isValid();
}, dateHasCustomFormat: function(e) {
  return e.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/);
}, dateTimeHasCustomFormat: function(e) {
  return e.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4} (0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/);
}, count: function(e, t, r, n) {
  e === void 0 && (e = 0), t === void 0 && (t = 1), r === void 0 && (r = 1), n === void 0 && (n = []);
  for (var s = [], i = e; i <= t; i += r)
    !n.includes(i) && s.push(i);
  return s;
}, compareBy: function(e) {
  return function(t, r) {
    return t[e] < r[e] ? -1 : t[e] > r[e] ? 1 : 0;
  };
}, dotify: function(e) {
  return e.replace(/\[/g, ".").replace(/]/g, "");
} }, Qn = Object.freeze({ __proto__: null, Api: $, Utils: L }), bf = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Qn).forEach(function(r) {
    t.component(r, Qn[r]);
  }));
} }, _t = null;
typeof window < "u" ? _t = window.Vue : typeof global < "u" && (_t = global.Vue), _t && _t.use(bf);
const Of = {
  inheritAttrs: !1,
  props: {
    append: {
      type: String
    },
    name: {
      type: String,
      require: !0
    },
    id: {
      type: String,
      require: !0
    },
    prepend: {
      type: String
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      require: !1,
      default: !1
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.$store.getters.getValue(this.$props.name);
      },
      set(e) {
        this.$store.dispatch(
          "update",
          {
            value: e,
            name: this.$props.name
          }
        );
      }
    },
    suggestValue: function() {
      return this.$props.suggest_value === "true" || this.$props.suggest_value === !0;
    },
    useSuggestedValue: function() {
      return this.suggestValue;
    },
    suggestedValue: function() {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    }
  },
  watch: {
    suggestedValue: function(e, t) {
      this.useSuggestedValue && (this.inputValue = e);
    }
  }
}, kf = ["id", "name"];
function Mf(e, t, r, n, s, i) {
  return ts((U(), B("input", Yt(this.$attrs, {
    id: r.id,
    name: r.name,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.inputValue = a)
  }), null, 16, kf)), [
    [rs, i.inputValue]
  ]);
}
const Df = /* @__PURE__ */ Me(Of, [["render", Mf]]), Ef = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      require: !0
    }
  }
}, Tf = ["for"];
function xf(e, t, r, n, s, i) {
  return U(), B("label", {
    for: e.$props.for
  }, [
    Rr(e.$slots, "default")
  ], 8, Tf);
}
const Yi = /* @__PURE__ */ Me(Ef, [["render", xf]]), Nf = {
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      require: !0
    }
  },
  computed: {
    getSuggestedValue() {
      return this.$store.getters.getSuggestedValues(this.$props.name);
    },
    displaySuggestedValue() {
      return this.getSuggestedValue !== null;
    }
  }
};
function Yf(e, t, r, n, s, i) {
  return i.displaySuggestedValue ? (U(), B("span", qi(Yt({ key: 0 }, this.$attrs)), Cr(i.getSuggestedValue), 17)) : Ne("", !0);
}
const Ci = /* @__PURE__ */ Me(Nf, [["render", Yf]]);
class Cf {
  constructor({
    additionalComponents: t = {},
    authenticityToken: r,
    element: n,
    globalAuthenticityToken: s,
    httpMethod: i = "POST",
    plugins: a = [],
    validationUrl: o,
    values: u = {},
    initialTouch: l = !1,
    disableValidation: d = !1,
    hideValidationErrors: p = !1,
    ...m
  }) {
    dn.use(Sn), window.toto = "TOTO";
    let _ = {
      "botyglot-input": is,
      "botyglot-form": as,
      "botyglot-hidden": Df,
      "botyglot-submit": os,
      "botyglot-label": Yi,
      "botyglot-errors-placeholder": Pr,
      "botyglot-suggested-value": Ci
    };
    const E = Object.keys(u)[0];
    let { errors: X, warnings: w, suggested_values: Ze, potential_values: Kt, ...lt } = u[E], ct = {
      values: {
        [E]: lt || {}
      },
      errors: {
        [E]: X || {}
      },
      warnings: {
        [E]: w || {}
      },
      touched: {
        [E]: {
          _submit: l
        }
      },
      potentialValues: {
        [E]: Kt || {}
      },
      suggestedValues: {
        [E]: Ze || {}
      },
      meta: Object.assign({
        modelName: E,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: d,
        hideValidationErrors: p
      }, m)
    };
    this.store = new Sn.Store({
      state: ct,
      plugins: a,
      getters: {
        getValue: (y) => (v) => {
          let S = L.dotify(v);
          return Se(S.split("."), y.values);
        },
        getError: (y) => (v) => {
          let S = L.dotify(v);
          return y.meta.hideValidationErrors ? null : Se(S.split("."), y.errors);
        },
        getWarning: (y) => (v) => {
          let S = L.dotify(v);
          return y.meta.hideValidationErrors ? null : Se(S.split("."), y.warnings);
        },
        getTouched: (y) => (v) => {
          let S = L.dotify(v);
          return Se(S.split("."), y.touched) || Se([E, "_submit"], y.touched);
        },
        getMeta: (y) => (v) => {
          let S = L.dotify(v);
          return Se(S.split("."), y.meta);
        },
        getPotentialValues: (y) => (v) => {
          let S = L.dotify(v);
          return Se(S.split("."), y.potentialValues);
        },
        getSuggestedValues: (y) => (v) => {
          let S = L.dotify(v);
          return Se(S.split("."), y.suggestedValues);
        }
      },
      mutations: {
        setValue: function(y, v) {
          let S = L.dotify(v.name);
          y.values = Le(S.split("."), v.value, y.values);
        },
        setTouched: function(y, v) {
          let S = L.dotify(v.name);
          y.touched = Le(S.split("."), v.value, y.touched);
        },
        setError: function(y, v) {
          let S = L.dotify(v.name);
          y.errors = Le(S.split("."), v.value, y.errors);
        },
        setWarning: function(y, v) {
          let S = L.dotify(v.name);
          y.warnings = Le(S.split("."), v.value, y.warnings);
        },
        setPotentialValues: function(y, v) {
          let S = L.dotify(v.name);
          y.potentialValues = Le(S.split("."), v.value, y.potentialValues);
        },
        setSuggestedValues: function(y, v) {
          let S = L.dotify(v.name);
          y.suggestedValues = Le(S.split("."), v.value, y.suggestedValues);
        }
      },
      actions: {
        // payload should have the following keys
        // * sid: mandatory, unique name of the call
        // * url: mandatory, where to send the data
        // * method: , option, http verb, by default 'post'
        // * data: mandatory, json data to be sent to the server
        // * onSuccess: callback, to be executed when the http request was a success (optional)
        // * onError: callback, to be executed when the http request was a error (optional)
        genericSendDataToServer: function(y, v) {
          let { sid: S, url: G, method: fe, data: dt, onSuccess: Ri, onError: Pi, ...Ai } = v, Vi = (ft) => {
            let Li = Object.assign(Ai, {
              sid: S,
              response: ft
            });
            y.dispatch("genericDataReceivedFromServer", Li);
          }, $i = (ft) => {
            console.log("There was a problem with validating the data"), console.log(ft), console.log(JSON.stringify(ft, null, 2));
          };
          $.sendRequest({
            url: G,
            method: fe || "post",
            data: dt,
            onSuccess: Ri || Vi,
            onError: Pi || $i,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(y, v) {
        },
        sendValuesToServer: function(y) {
          if (d) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let v = (fe) => {
              y.dispatch("dataReceivedFromServer", fe.data);
            }, S = (fe) => {
              console.log("There was a problem with validating the data"), console.log(fe), console.log(JSON.stringify(fe, null, 2));
            }, G = Object.assign({
              utf8: "✓",
              authenticity_token: y.state.meta.authenticityToken,
              _method: y.state.meta.httpMethod
            }, no(y.state.values));
            G[E]._prevent_save = !0, $.sendRequest({ url: y.state.meta.validationUrl, data: G, method: y.state.meta.httpMethod, onSuccess: v, onError: S, delay: !0 });
          }
        },
        dataReceivedFromServer: function(y, v) {
          let { errors: S, warnings: G, potential_values: fe, suggested_values: dt } = v[E];
          S && y.commit("setError", {
            value: S,
            name: E
          }), G && y.commit("setWarning", {
            value: G,
            name: E
          }), fe && y.commit("setPotentialValues", {
            value: fe,
            name: E
          }), dt && y.commit("setSuggestedValues", {
            value: dt,
            name: E
          });
        },
        update: function(y, v) {
          y.commit("setValue", v), y.dispatch("sendValuesToServer");
        }
      }
    }), this.app = new dn({
      el: n,
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(_, t),
      props: {}
    });
  }
}
const Xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ComponentWrapper: ss,
  ErrorsPlaceholder: Pr,
  Field: is,
  Form: as,
  FormStore: Cf,
  Label: Yi,
  Submit: os,
  SuggestedValue: Ci
}, Symbol.toStringTag, { value: "Module" }));
function Yr(e) {
  Yr.installed || (Yr.installed = !0, Object.keys(Xn).forEach((t) => {
    e.component(t, Xn[t]);
  }));
}
const Rf = {
  install: Yr
};
let Nt = null;
typeof window < "u" ? Nt = window.Vue : typeof global < "u" && (Nt = global.Vue);
Nt && Nt.use(Rf);
export {
  ss as ComponentWrapper,
  Pr as ErrorsPlaceholder,
  is as Field,
  as as Form,
  Cf as FormStore,
  Yi as Label,
  os as Submit,
  Ci as SuggestedValue,
  Rf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
