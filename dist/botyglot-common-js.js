import { openBlock as W, createElementBlock as B, normalizeClass as jn, toDisplayString as Tr, createCommentVNode as Ne, renderSlot as Er, computed as X, watch as xr, createBlock as an, withCtx as bi, createElementVNode as pt, withDirectives as Hn, mergeProps as xt, vModelDynamic as Gn, Fragment as Oi, renderList as ki, effectScope as Di, reactive as Mi, normalizeProps as Ti, createApp as Ei } from "vue";
const Ce = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, xi = {
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
function Ni(e, t, r, n, s, i) {
  return i.displayValidationMessage ? (W(), B("span", {
    key: 0,
    class: jn(i.inputClass)
  }, Tr(i.inputMessage), 3)) : Ne("", !0);
}
const Nr = /* @__PURE__ */ Ce(xi, [["render", Ni]]), Yi = {
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
}, Ci = ["id"];
function Ri(e, t, r, n, s, i) {
  return W(), B("div", {
    class: jn([i.inputGroupClass, r.classes]),
    id: r.id + "__wrapper"
  }, [
    Er(e.$slots, "default")
  ], 10, Ci);
}
const qn = /* @__PURE__ */ Ce(Yi, [["render", Ri]]), Pi = ["id"], Ai = ["innerHTML"], Vi = ["id", "name"], $i = ["id"], Li = ["innerHTML"], Bn = {
  __name: "field",
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
  setup(e) {
    const t = e, r = X(() => t.suggest_value === "true" || t.suggest_value === !0 || t.suggest_value === "force"), n = X(() => t.display_error === "true" || t.display_error === !0), s = X(() => r && !f || t.suggest_value === "force"), i = X(() => this.$store.getters.getSuggestedValues(t.name)), a = X(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": f && o,
      "input-block__field--warning": f && !o && u
    })), o = X(() => f ? this.$store.getters.getError(t.name) : null), u = X(() => f ? this.$store.getters.getWarning(t.name) : null), l = X(() => ({
      "input-block": !0
    })), f = X({
      get() {
        return this.$store.getters.getTouched(t.name);
      },
      set(m) {
        this.$store.commit(
          "setTouched",
          {
            value: m,
            name: t.name
          }
        );
      }
    }), p = X({
      get() {
        return this.$store.getters.getValue(t.name);
      },
      set(m) {
        this.$store.dispatch(
          "update",
          {
            value: m,
            name: t.name
          }
        );
      }
    });
    return xr(i, (m, _) => {
      s && (this.inputValue = m);
    }), (m, _) => (W(), an(qn, {
      name: e.name,
      classes: l.value,
      id: e.id
    }, {
      default: bi(() => [
        e.prepend ? (W(), B("div", {
          key: 0,
          class: "input-block__prepend",
          id: e.id + "__prepend"
        }, [
          pt("span", { innerHTML: e.prepend }, null, 8, Ai)
        ], 8, Pi)) : Ne("", !0),
        Hn(pt("input", xt(m.$attrs, {
          class: [a.value, e.prepend ? "input--has-prepend" : "", e.append ? "input--has-append" : ""],
          id: e.id,
          "onUpdate:modelValue": _[0] || (_[0] = (E) => p.value = E),
          onFocus: _[1] || (_[1] = (E) => f.value = !0),
          name: e.name
        }), null, 16, Vi), [
          [Gn, p.value]
        ]),
        e.append ? (W(), B("div", {
          key: 1,
          class: "input-block__append",
          id: e.id + "__append"
        }, [
          pt("span", { innerHTML: e.append }, null, 8, Li)
        ], 8, $i)) : Ne("", !0),
        n.value ? (W(), an(Nr, {
          key: 2,
          names: [e.name]
        }, null, 8, ["names"])) : Ne("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}, Fi = {
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
}, Ii = ["accept-charset", "action", "data-values", "method", "enctype"];
function Ui(e, t, r, n, s, i) {
  return W(), B("form", {
    "accept-charset": e.$props.acceptCharset,
    action: e.$props.action,
    "data-values": e.$props.dataValues,
    method: e.$props.method,
    enctype: e.$props.enctype,
    onSubmit: t[0] || (t[0] = (...a) => i.handleSubmit && i.handleSubmit(...a)),
    "on:ajax:beforeSend": t[1] || (t[1] = (...a) => i.ajaxBeforeSend && i.ajaxBeforeSend(...a)),
    ref: "form"
  }, [
    Er(e.$slots, "default")
  ], 40, Ii);
}
const zn = /* @__PURE__ */ Ce(Fi, [["render", Ui]]), Wi = {
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
}, ji = { class: "form-validation" }, Hi = ["disabled"], Gi = {
  key: 1,
  class: "form-validation__tooltip"
};
function qi(e, t, r, n, s, i) {
  return W(), B("div", ji, [
    pt("input", xt(this.$attrs, {
      onClick: t[0] || (t[0] = (...a) => i.submitting && i.submitting(...a)),
      disabled: s.disabled
    }), null, 16, Hi),
    i.displayValidationWarning ? (W(), B("div", {
      key: 0,
      class: "form-validation__global-error",
      onClick: t[1] || (t[1] = (a) => s.displayValidationMessages = !s.displayValidationMessages)
    }, "!")) : Ne("", !0),
    i.displayValidationWarning & s.displayValidationMessages ? (W(), B("ul", Gi, [
      (W(!0), B(Oi, null, ki(i.recapErrors, (a) => (W(), B("li", { key: a }, Tr(a), 1))), 128))
    ])) : Ne("", !0)
  ]);
}
const Zn = /* @__PURE__ */ Ce(Wi, [["render", qi]]);
function Bi() {
  return Jn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Jn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const zi = typeof Proxy == "function", Zi = "devtools-plugin:setup", Ji = "plugin:settings:set";
let $e, pr;
function Ki() {
  var e;
  return $e !== void 0 || (typeof window < "u" && window.performance ? ($e = !0, pr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? ($e = !0, pr = globalThis.perf_hooks.performance) : $e = !1), $e;
}
function Qi() {
  return Ki() ? pr.now() : Date.now();
}
class Xi {
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
        return Qi();
      }
    }, r && r.on(Ji, (a, o) => {
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
function ea(e, t) {
  const r = e, n = Jn(), s = Bi(), i = zi && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Zi, e, t);
  else {
    const a = i ? new Xi(r, s) : null;
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
var ta = "store";
function Re(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function ra(e) {
  return e !== null && typeof e == "object";
}
function na(e) {
  return e && typeof e.then == "function";
}
function te(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function sa(e, t) {
  return function() {
    return e(t);
  };
}
function Kn(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function Qn(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  Nt(e, r, [], e._modules.root, !0), Yr(e, r, t);
}
function Yr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = Di(!0);
  u.run(function() {
    Re(i, function(l, f) {
      a[f] = sa(l, e), o[f] = X(function() {
        return a[f]();
      }), Object.defineProperty(e.getters, f, {
        get: function() {
          return o[f].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = Mi({
    data: t
  }), e._scope = u, e.strict && la(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function Nt(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = Cr(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = ia(e, a, r);
  n.forEachMutation(function(f, p) {
    var m = a + p;
    aa(e, m, f, l);
  }), n.forEachAction(function(f, p) {
    var m = f.root ? p : a + p, _ = f.handler || f;
    oa(e, m, _, l);
  }), n.forEachGetter(function(f, p) {
    var m = a + p;
    ua(e, m, f, l);
  }), n.forEachChild(function(f, p) {
    Nt(e, t, r.concat(p), f, s);
  });
}
function ia(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, f = u.options, p = u.type;
      if ((!f || !f.root) && (p = t + p, process.env.NODE_ENV !== "production" && !e._actions[p])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + p);
        return;
      }
      return e.dispatch(p, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, f = u.options, p = u.type;
      if ((!f || !f.root) && (p = t + p, process.env.NODE_ENV !== "production" && !e._mutations[p])) {
        console.error("[vuex] unknown local mutation type: " + u.type + ", global type: " + p);
        return;
      }
      e.commit(p, l, f);
    }
  };
  return Object.defineProperties(s, {
    getters: {
      get: n ? function() {
        return e.getters;
      } : function() {
        return Xn(e, t);
      }
    },
    state: {
      get: function() {
        return Cr(e.state, r);
      }
    }
  }), s;
}
function Xn(e, t) {
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
function aa(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function oa(e, t, r, n) {
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
    return na(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function ua(e, t, r, n) {
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
function la(e) {
  xr(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && te(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function Cr(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function St(e, t, r) {
  return ra(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && te(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var ca = "vuex bindings", on = "vuex:mutations", zt = "vuex:actions", Le = "vuex", da = 0;
function fa(e, t) {
  ea(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [ca]
    },
    function(r) {
      r.addTimelineLayer({
        id: on,
        label: "Vuex Mutations",
        color: un
      }), r.addTimelineLayer({
        id: zt,
        label: "Vuex Actions",
        color: un
      }), r.addInspector({
        id: Le,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === Le)
          if (n.filter) {
            var s = [];
            ns(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              rs(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Le) {
          var s = n.nodeId;
          Xn(t, s), n.state = pa(
            ya(t._modules, s),
            s === "root" ? t.getters : t._makeLocalGettersCache,
            s
          );
        }
      }), r.on.editInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Le) {
          var s = n.nodeId, i = n.path;
          s !== "root" && (i = s.split("/").filter(Boolean).concat(i)), t._withCommit(function() {
            n.set(t._state.data, i, n.state.value);
          });
        }
      }), t.subscribe(function(n, s) {
        var i = {};
        n.payload && (i.payload = n.payload), i.state = s, r.notifyComponentUpdate(), r.sendInspectorTree(Le), r.sendInspectorState(Le), r.addTimelineEvent({
          layerId: on,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = da++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
            layerId: zt,
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
            layerId: zt,
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
var un = 8702998, ha = 6710886, ma = 16777215, es = {
  label: "namespaced",
  textColor: ma,
  backgroundColor: ha
};
function ts(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function rs(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: ts(t),
    tags: e.namespaced ? [es] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return rs(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function ns(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [es] : []
  }), Object.keys(t._children).forEach(function(s) {
    ns(e, t._children[s], r, n + s + "/");
  });
}
function pa(e, t, r) {
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
    var i = _a(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? ts(a) : a,
        editable: !1,
        value: _r(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function _a(e) {
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
      }), s[i] = _r(function() {
        return e[r];
      });
    } else
      t[r] = _r(function() {
        return e[r];
      });
  }), t;
}
function ya(e, t) {
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
function _r(e) {
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
}, ss = { namespaced: { configurable: !0 } };
ss.namespaced.get = function() {
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
  Re(this._children, t);
};
ie.prototype.forEachGetter = function(t) {
  this._rawModule.getters && Re(this._rawModule.getters, t);
};
ie.prototype.forEachAction = function(t) {
  this._rawModule.actions && Re(this._rawModule.actions, t);
};
ie.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && Re(this._rawModule.mutations, t);
};
Object.defineProperties(ie.prototype, ss);
var Pe = function(t) {
  this.register([], t, !1);
};
Pe.prototype.get = function(t) {
  return t.reduce(function(r, n) {
    return r.getChild(n);
  }, this.root);
};
Pe.prototype.getNamespace = function(t) {
  var r = this.root;
  return t.reduce(function(n, s) {
    return r = r.getChild(s), n + (r.namespaced ? s + "/" : "");
  }, "");
};
Pe.prototype.update = function(t) {
  is([], this.root, t);
};
Pe.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && as(t, r);
  var i = new ie(r, n);
  if (t.length === 0)
    this.root = i;
  else {
    var a = this.get(t.slice(0, -1));
    a.addChild(t[t.length - 1], i);
  }
  r.modules && Re(r.modules, function(o, u) {
    s.register(t.concat(u), o, n);
  });
};
Pe.prototype.unregister = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1], s = r.getChild(n);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + n + "', which is not registered"
    );
    return;
  }
  s.runtime && r.removeChild(n);
};
Pe.prototype.isRegistered = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1];
  return r ? r.hasChild(n) : !1;
};
function is(e, t, r) {
  if (process.env.NODE_ENV !== "production" && as(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      is(
        e.concat(n),
        t.getChild(n),
        r.modules[n]
      );
    }
}
var ln = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, ga = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, cn = {
  getters: ln,
  mutations: ln,
  actions: ga
};
function as(e, t) {
  Object.keys(cn).forEach(function(r) {
    if (t[r]) {
      var n = cn[r];
      Re(t[r], function(s, i) {
        te(
          n.assert(s),
          va(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function va(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function wa(e) {
  return new H(e);
}
var H = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (te(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), te(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Pe(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(m, _) {
    return u.call(a, m, _);
  }, this.commit = function(m, _, E) {
    return l.call(a, m, _, E);
  }, this.strict = s;
  var f = this._modules.root.state;
  Nt(this, f, [], this._modules.root), Yr(this, f), n.forEach(function(p) {
    return p(r);
  });
}, Rr = { state: { configurable: !0 } };
H.prototype.install = function(t, r) {
  t.provide(r || ta, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && fa(t, this);
};
Rr.state.get = function() {
  return this._state.data;
};
Rr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && te(!1, "use store.replaceState() to explicit replace store state.");
};
H.prototype.commit = function(t, r, n) {
  var s = this, i = St(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, f = this._mutations[a];
  if (!f) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + a);
    return;
  }
  this._withCommit(function() {
    f.forEach(function(m) {
      m(o);
    });
  }), this._subscribers.slice().forEach(function(p) {
    return p(l, s.state);
  }), process.env.NODE_ENV !== "production" && u && u.silent && console.warn(
    "[vuex] mutation type: " + a + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
H.prototype.dispatch = function(t, r) {
  var n = this, s = St(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + i);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(f) {
      return f.before;
    }).forEach(function(f) {
      return f.before(o, n.state);
    });
  } catch (f) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(f));
  }
  var l = u.length > 1 ? Promise.all(u.map(function(f) {
    return f(a);
  })) : u[0](a);
  return new Promise(function(f, p) {
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
      f(m);
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
H.prototype.subscribe = function(t, r) {
  return Kn(t, this._subscribers, r);
};
H.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return Kn(n, this._actionSubscribers, r);
};
H.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && te(typeof t == "function", "store.watch only accepts a function."), xr(function() {
    return t(s.state, s.getters);
  }, r, Object.assign({}, n));
};
H.prototype.replaceState = function(t) {
  var r = this;
  this._withCommit(function() {
    r._state.data = t;
  });
};
H.prototype.registerModule = function(t, r, n) {
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (te(Array.isArray(t), "module path must be a string or an Array."), te(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), Nt(this, this.state, t, this._modules.get(t), n.preserveState), Yr(this, this.state);
};
H.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = Cr(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), Qn(this);
};
H.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
H.prototype.hotUpdate = function(t) {
  this._modules.update(t), Qn(this, !0);
};
H.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(H.prototype, Rr);
function C(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ue(e) {
  return function t(r) {
    return arguments.length === 0 || C(r) ? t : e.apply(this, arguments);
  };
}
function Ee(e) {
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
function os(e) {
  return function t(r, n, s) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return C(r) ? t : Ee(function(i, a) {
          return e(r, i, a);
        });
      case 2:
        return C(r) && C(n) ? t : C(r) ? Ee(function(i, a) {
          return e(i, n, a);
        }) : C(n) ? Ee(function(i, a) {
          return e(r, i, a);
        }) : ue(function(i) {
          return e(r, n, i);
        });
      default:
        return C(r) && C(n) && C(s) ? t : C(r) && C(n) ? Ee(function(i, a) {
          return e(i, a, s);
        }) : C(r) && C(s) ? Ee(function(i, a) {
          return e(i, n, a);
        }) : C(n) && C(s) ? Ee(function(i, a) {
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
const Sa = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function ba(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var Oa = /* @__PURE__ */ Ee(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const Se = Oa;
var ka = /* @__PURE__ */ os(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const Da = ka, dn = Number.isInteger || function(t) {
  return t << 0 === t;
};
var Ma = /* @__PURE__ */ ue(function(t) {
  return t == null;
});
const Ta = Ma;
var Ea = /* @__PURE__ */ os(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !Ta(n) && ba(s, n) ? n[s] : dn(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (dn(s) && Sa(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return Da(s, r, n);
});
const Fe = Ea;
function xa(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var Na = /* @__PURE__ */ ue(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const Ya = Na;
function us(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? us(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (Ya(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return xa(e);
    default:
      return e;
  }
}
var Ca = /* @__PURE__ */ ue(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : us(t, [], [], !0);
});
const Ra = Ca;
function Pa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Pr = { exports: {} }, ls = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, Aa = ls, Ae = Object.prototype.toString;
function Ar(e) {
  return Ae.call(e) === "[object Array]";
}
function yr(e) {
  return typeof e > "u";
}
function Va(e) {
  return e !== null && !yr(e) && e.constructor !== null && !yr(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function $a(e) {
  return Ae.call(e) === "[object ArrayBuffer]";
}
function La(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Fa(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function Ia(e) {
  return typeof e == "string";
}
function Ua(e) {
  return typeof e == "number";
}
function cs(e) {
  return e !== null && typeof e == "object";
}
function _t(e) {
  if (Ae.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Wa(e) {
  return Ae.call(e) === "[object Date]";
}
function ja(e) {
  return Ae.call(e) === "[object File]";
}
function Ha(e) {
  return Ae.call(e) === "[object Blob]";
}
function ds(e) {
  return Ae.call(e) === "[object Function]";
}
function Ga(e) {
  return cs(e) && ds(e.pipe);
}
function qa(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function Ba(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function za() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Vr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Ar(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function gr() {
  var e = {};
  function t(s, i) {
    _t(e[i]) && _t(s) ? e[i] = gr(e[i], s) : _t(s) ? e[i] = gr({}, s) : Ar(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Vr(arguments[r], t);
  return e;
}
function Za(e, t, r) {
  return Vr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = Aa(s, r) : e[i] = s;
  }), e;
}
function Ja(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var z = {
  isArray: Ar,
  isArrayBuffer: $a,
  isBuffer: Va,
  isFormData: La,
  isArrayBufferView: Fa,
  isString: Ia,
  isNumber: Ua,
  isObject: cs,
  isPlainObject: _t,
  isUndefined: yr,
  isDate: Wa,
  isFile: ja,
  isBlob: Ha,
  isFunction: ds,
  isStream: Ga,
  isURLSearchParams: qa,
  isStandardBrowserEnv: za,
  forEach: Vr,
  merge: gr,
  extend: Za,
  trim: Ba,
  stripBOM: Ja
}, Ie = z;
function fn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var fs = function(t, r, n) {
  if (!r)
    return t;
  var s;
  if (n)
    s = n(r);
  else if (Ie.isURLSearchParams(r))
    s = r.toString();
  else {
    var i = [];
    Ie.forEach(r, function(u, l) {
      u === null || typeof u > "u" || (Ie.isArray(u) ? l = l + "[]" : u = [u], Ie.forEach(u, function(p) {
        Ie.isDate(p) ? p = p.toISOString() : Ie.isObject(p) && (p = JSON.stringify(p)), i.push(fn(l) + "=" + fn(p));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, Ka = z;
function Yt() {
  this.handlers = [];
}
Yt.prototype.use = function(t, r, n) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: n ? n.synchronous : !1,
    runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1;
};
Yt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Yt.prototype.forEach = function(t) {
  Ka.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Qa = Yt, Xa = z, eo = function(t, r) {
  Xa.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, hs = function(t, r, n, s, i) {
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
}, Zt, hn;
function ms() {
  if (hn)
    return Zt;
  hn = 1;
  var e = hs;
  return Zt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Zt;
}
var Jt, mn;
function to() {
  if (mn)
    return Jt;
  mn = 1;
  var e = ms();
  return Jt = function(r, n, s) {
    var i = s.config.validateStatus;
    !s.status || !i || i(s.status) ? r(s) : n(e(
      "Request failed with status code " + s.status,
      s.config,
      null,
      s.request,
      s
    ));
  }, Jt;
}
var Kt, pn;
function ro() {
  if (pn)
    return Kt;
  pn = 1;
  var e = z;
  return Kt = e.isStandardBrowserEnv() ? (
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
  ), Kt;
}
var Qt, _n;
function no() {
  return _n || (_n = 1, Qt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Qt;
}
var Xt, yn;
function so() {
  return yn || (yn = 1, Xt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), Xt;
}
var er, gn;
function io() {
  if (gn)
    return er;
  gn = 1;
  var e = no(), t = so();
  return er = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, er;
}
var tr, vn;
function ao() {
  if (vn)
    return tr;
  vn = 1;
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
  return tr = function(n) {
    var s = {}, i, a, o;
    return n && e.forEach(n.split(`
`), function(l) {
      if (o = l.indexOf(":"), i = e.trim(l.substr(0, o)).toLowerCase(), a = e.trim(l.substr(o + 1)), i) {
        if (s[i] && t.indexOf(i) >= 0)
          return;
        i === "set-cookie" ? s[i] = (s[i] ? s[i] : []).concat([a]) : s[i] = s[i] ? s[i] + ", " + a : a;
      }
    }), s;
  }, tr;
}
var rr, wn;
function oo() {
  if (wn)
    return rr;
  wn = 1;
  var e = z;
  return rr = e.isStandardBrowserEnv() ? (
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
  ), rr;
}
var nr, Sn;
function bn() {
  if (Sn)
    return nr;
  Sn = 1;
  var e = z, t = to(), r = ro(), n = fs, s = io(), i = ao(), a = oo(), o = ms();
  return nr = function(l) {
    return new Promise(function(p, m) {
      var _ = l.data, E = l.headers, De = l.responseType;
      e.isFormData(_) && delete E["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var qt = l.auth.username || "", Bt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        E.Authorization = "Basic " + btoa(qt + ":" + Bt);
      }
      var ut = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(ut, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function lt() {
        if (w) {
          var v = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !De || De === "text" || De === "json" ? w.responseText : w.response, G = {
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
      if ("onloadend" in w ? w.onloadend = lt : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(lt);
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
        var y = (l.withCredentials || a(ut)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        y && (E[l.xsrfHeaderName] = y);
      }
      "setRequestHeader" in w && e.forEach(E, function(S, G) {
        typeof _ > "u" && G.toLowerCase() === "content-type" ? delete E[G] : w.setRequestHeader(G, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), De && De !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), m(S), w = null);
      }), _ || (_ = null), w.send(_);
    });
  }, nr;
}
var A = z, On = eo, uo = hs, lo = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function kn(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function co() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = bn()), e;
}
function fo(e, t, r) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
var Ct = {
  transitional: {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  adapter: co(),
  transformRequest: [function(t, r) {
    return On(r, "Accept"), On(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (kn(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (kn(r, "application/json"), fo(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? uo(a, this, "E_JSON_PARSE") : a;
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
Ct.headers = {
  common: {
    Accept: "application/json, text/plain, */*"
  }
};
A.forEach(["delete", "get", "head"], function(t) {
  Ct.headers[t] = {};
});
A.forEach(["post", "put", "patch"], function(t) {
  Ct.headers[t] = A.merge(lo);
});
var $r = Ct, ho = z, mo = $r, po = function(t, r, n) {
  var s = this || mo;
  return ho.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, sr, Dn;
function ps() {
  return Dn || (Dn = 1, sr = function(t) {
    return !!(t && t.__CANCEL__);
  }), sr;
}
var Mn = z, ir = po, _o = ps(), yo = $r;
function ar(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var go = function(t) {
  ar(t), t.headers = t.headers || {}, t.data = ir.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = Mn.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), Mn.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete t.headers[s];
    }
  );
  var r = t.adapter || yo.adapter;
  return r(t).then(function(s) {
    return ar(t), s.data = ir.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return _o(s) || (ar(t), s && s.response && (s.response.data = ir.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, V = z, _s = function(t, r) {
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
  var f = s.concat(i).concat(a).concat(o), p = Object.keys(t).concat(Object.keys(r)).filter(function(_) {
    return f.indexOf(_) === -1;
  });
  return V.forEach(p, l), n;
};
const vo = "axios", wo = "0.21.4", So = "Promise based HTTP client for the browser and node.js", bo = "index.js", Oo = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, ko = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, Do = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], Mo = "Matt Zabriskie", To = "MIT", Eo = {
  url: "https://github.com/axios/axios/issues"
}, xo = "https://axios-http.com", No = {
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
}, Yo = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, Co = "dist/axios.min.js", Ro = "dist/axios.min.js", Po = "./index.d.ts", Ao = {
  "follow-redirects": "^1.14.0"
}, Vo = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], $o = {
  name: vo,
  version: wo,
  description: So,
  main: bo,
  scripts: Oo,
  repository: ko,
  keywords: Do,
  author: Mo,
  license: To,
  bugs: Eo,
  homepage: xo,
  devDependencies: No,
  browser: Yo,
  jsdelivr: Co,
  unpkg: Ro,
  typings: Po,
  dependencies: Ao,
  bundlesize: Vo
};
var ys = $o, Lr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Lr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Tn = {}, Lo = ys.version.split(".");
function gs(e, t) {
  for (var r = t ? t.split(".") : Lo, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
Lr.transitional = function(t, r, n) {
  var s = r && gs(r);
  function i(a, o) {
    return "[Axios v" + ys.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !Tn[o] && (Tn[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, o, u) : !0;
  };
};
function Fo(e, t, r) {
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
var Io = {
  isOlderVersion: gs,
  assertOptions: Fo,
  validators: Lr
}, vs = z, Uo = fs, En = Qa, xn = go, Rt = _s, ws = Io, Ue = ws.validators;
function nt(e) {
  this.defaults = e, this.interceptors = {
    request: new En(),
    response: new En()
  };
}
nt.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Rt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && ws.assertOptions(r, {
    silentJSONParsing: Ue.transitional(Ue.boolean, "1.0.0"),
    forcedJSONParsing: Ue.transitional(Ue.boolean, "1.0.0"),
    clarifyTimeoutError: Ue.transitional(Ue.boolean, "1.0.0")
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
    var o = [xn, void 0];
    for (Array.prototype.unshift.apply(o, n), o = o.concat(i), a = Promise.resolve(t); o.length; )
      a = a.then(o.shift(), o.shift());
    return a;
  }
  for (var u = t; n.length; ) {
    var l = n.shift(), f = n.shift();
    try {
      u = l(u);
    } catch (p) {
      f(p);
      break;
    }
  }
  try {
    a = xn(u);
  } catch (p) {
    return Promise.reject(p);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
nt.prototype.getUri = function(t) {
  return t = Rt(this.defaults, t), Uo(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
vs.forEach(["delete", "get", "head", "options"], function(t) {
  nt.prototype[t] = function(r, n) {
    return this.request(Rt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
vs.forEach(["post", "put", "patch"], function(t) {
  nt.prototype[t] = function(r, n, s) {
    return this.request(Rt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var Wo = nt, or, Nn;
function Ss() {
  if (Nn)
    return or;
  Nn = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, or = e, or;
}
var ur, Yn;
function jo() {
  if (Yn)
    return ur;
  Yn = 1;
  var e = Ss();
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
  }, ur = t, ur;
}
var lr, Cn;
function Ho() {
  return Cn || (Cn = 1, lr = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), lr;
}
var cr, Rn;
function Go() {
  return Rn || (Rn = 1, cr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), cr;
}
var Pn = z, qo = ls, yt = Wo, Bo = _s, zo = $r;
function bs(e) {
  var t = new yt(e), r = qo(yt.prototype.request, t);
  return Pn.extend(r, yt.prototype, t), Pn.extend(r, t), r;
}
var re = bs(zo);
re.Axios = yt;
re.create = function(t) {
  return bs(Bo(re.defaults, t));
};
re.Cancel = Ss();
re.CancelToken = jo();
re.isCancel = ps();
re.all = function(t) {
  return Promise.all(t);
};
re.spread = Ho();
re.isAxiosError = Go();
Pr.exports = re;
Pr.exports.default = re;
var Zo = Pr.exports, Jo = Zo;
const Me = /* @__PURE__ */ Pa(Jo);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Os;
function d() {
  return Os.apply(null, arguments);
}
function Ko(e) {
  Os = e;
}
function ne(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ye(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function D(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Fr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (D(e, t))
      return !1;
  return !0;
}
function j(e) {
  return e === void 0;
}
function ge(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function st(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function ks(e, t) {
  var r = [], n, s = e.length;
  for (n = 0; n < s; ++n)
    r.push(t(e[n], n));
  return r;
}
function be(e, t) {
  for (var r in t)
    D(t, r) && (e[r] = t[r]);
  return D(t, "toString") && (e.toString = t.toString), D(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ce(e, t, r, n) {
  return zs(e, t, r, n, !0).utc();
}
function Qo() {
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
  return e._pf == null && (e._pf = Qo()), e._pf;
}
var vr;
Array.prototype.some ? vr = Array.prototype.some : vr = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Ir(e) {
  if (e._isValid == null) {
    var t = b(e), r = vr.call(t.parsedDateParts, function(s) {
      return s != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function Pt(e) {
  var t = ce(NaN);
  return e != null ? be(b(t), e) : b(t).userInvalidated = !0, t;
}
var An = d.momentProperties = [], dr = !1;
function Ur(e, t) {
  var r, n, s, i = An.length;
  if (j(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), j(t._i) || (e._i = t._i), j(t._f) || (e._f = t._f), j(t._l) || (e._l = t._l), j(t._strict) || (e._strict = t._strict), j(t._tzm) || (e._tzm = t._tzm), j(t._isUTC) || (e._isUTC = t._isUTC), j(t._offset) || (e._offset = t._offset), j(t._pf) || (e._pf = b(t)), j(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = An[r], s = t[n], j(s) || (e[n] = s);
  return e;
}
function it(e) {
  Ur(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), dr === !1 && (dr = !0, d.updateOffset(this), dr = !1);
}
function se(e) {
  return e instanceof it || e != null && e._isAMomentObject != null;
}
function Ds(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function K(e, t) {
  var r = !0;
  return be(function() {
    if (d.deprecationHandler != null && d.deprecationHandler(null, e), r) {
      var n = [], s, i, a, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (s = "", typeof arguments[i] == "object") {
          s += `
[` + i + "] ";
          for (a in arguments[0])
            D(arguments[0], a) && (s += a + ": " + arguments[0][a] + ", ");
          s = s.slice(0, -2);
        } else
          s = arguments[i];
        n.push(s);
      }
      Ds(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Vn = {};
function Ms(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), Vn[e] || (Ds(t), Vn[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Xo(e) {
  var t, r;
  for (r in e)
    D(e, r) && (t = e[r], de(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function wr(e, t) {
  var r = be({}, e), n;
  for (n in t)
    D(t, n) && (Ye(e[n]) && Ye(t[n]) ? (r[n] = {}, be(r[n], e[n]), be(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    D(e, n) && !D(t, n) && Ye(e[n]) && (r[n] = be({}, r[n]));
  return r;
}
function Wr(e) {
  e != null && this.set(e);
}
var Sr;
Object.keys ? Sr = Object.keys : Sr = function(e) {
  var t, r = [];
  for (t in e)
    D(e, t) && r.push(t);
  return r;
};
var eu = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function tu(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, r) : n;
}
function le(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var jr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ft = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, fr = {}, Ge = {};
function g(e, t, r, n) {
  var s = n;
  typeof n == "string" && (s = function() {
    return this[n]();
  }), e && (Ge[e] = s), t && (Ge[t[0]] = function() {
    return le(s.apply(this, arguments), t[1], t[2]);
  }), r && (Ge[r] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function ru(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function nu(e) {
  var t = e.match(jr), r, n;
  for (r = 0, n = t.length; r < n; r++)
    Ge[t[r]] ? t[r] = Ge[t[r]] : t[r] = ru(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += de(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function gt(e, t) {
  return e.isValid() ? (t = Ts(t, e.localeData()), fr[t] = fr[t] || nu(t), fr[t](e)) : e.localeData().invalidDate();
}
function Ts(e, t) {
  var r = 5;
  function n(s) {
    return t.longDateFormat(s) || s;
  }
  for (ft.lastIndex = 0; r >= 0 && ft.test(e); )
    e = e.replace(
      ft,
      n
    ), ft.lastIndex = 0, r -= 1;
  return e;
}
var su = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function iu(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(jr).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var au = "Invalid date";
function ou() {
  return this._invalidDate;
}
var uu = "%d", lu = /\d{1,2}/;
function cu(e) {
  return this._ordinal.replace("%d", e);
}
var du = {
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
function fu(e, t, r, n) {
  var s = this._relativeTime[r];
  return de(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function hu(e, t) {
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
function Hr(e) {
  var t = {}, r, n;
  for (n in e)
    D(e, n) && (r = Q(n), r && (t[r] = e[n]));
  return t;
}
var Es = {};
function U(e, t) {
  Es[e] = t;
}
function mu(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: Es[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function At(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function J(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function O(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = J(t)), r;
}
function ze(e, t) {
  return function(r) {
    return r != null ? (xs(this, e, r), d.updateOffset(this, t), this) : bt(this, e);
  };
}
function bt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function xs(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && At(e.year()) && e.month() === 1 && e.date() === 29 ? (r = O(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Ut(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function pu(e) {
  return e = Q(e), de(this[e]) ? this[e]() : this;
}
function _u(e, t) {
  if (typeof e == "object") {
    e = Hr(e);
    var r = mu(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = Q(e), de(this[e]))
    return this[e](t);
  return this;
}
var Ns = /\d/, Z = /\d\d/, Ys = /\d{3}/, Gr = /\d{4}/, Vt = /[+-]?\d{6}/, N = /\d\d?/, Cs = /\d\d\d\d?/, Rs = /\d\d\d\d\d\d?/, $t = /\d{1,3}/, qr = /\d{1,4}/, Lt = /[+-]?\d{1,6}/, Ze = /\d+/, Ft = /[+-]?\d+/, yu = /Z|[+-]\d\d:?\d\d/gi, It = /Z|[+-]\d\d(?::?\d\d)?/gi, gu = /[+-]?\d+(\.\d{1,3})?/, at = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ot;
Ot = {};
function h(e, t, r) {
  Ot[e] = de(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function vu(e, t) {
  return D(Ot, e) ? Ot[e](t._strict, t._locale) : new RegExp(wu(e));
}
function wu(e) {
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
var br = {};
function T(e, t) {
  var r, n = t, s;
  for (typeof e == "string" && (e = [e]), ge(t) && (n = function(i, a) {
    a[t] = O(i);
  }), s = e.length, r = 0; r < s; r++)
    br[e[r]] = n;
}
function ot(e, t) {
  T(e, function(r, n, s, i) {
    s._w = s._w || {}, t(r, s._w, s, i);
  });
}
function Su(e, t, r) {
  t != null && D(br, e) && br[e](t, r._a, r, e);
}
var F = 0, pe = 1, oe = 2, P = 3, ee = 4, _e = 5, xe = 6, bu = 7, Ou = 8;
function ku(e, t) {
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
function Ut(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = ku(t, 12);
  return e += (t - r) / 12, r === 1 ? At(e) ? 29 : 28 : 31 - r % 7 % 2;
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
U("month", 8);
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
var Du = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ps = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), As = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Mu = at, Tu = at;
function Eu(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || As).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function xu(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[As.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Nu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ce([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function Yu(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return Nu.call(this, e, t, r);
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
function Vs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = O(t);
    else if (t = e.localeData().monthsParse(t), !ge(t))
      return e;
  }
  return r = Math.min(e.date(), Ut(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function $s(e) {
  return e != null ? (Vs(this, e), d.updateOffset(this, !0), this) : bt(this, "Month");
}
function Cu() {
  return Ut(this.year(), this.month());
}
function Ru(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Ls.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = Mu), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Pu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Ls.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = Tu), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Ls() {
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
U("year", 1);
h("Y", Ft);
h("YY", N, Z);
h("YYYY", qr, Gr);
h("YYYYY", Lt, Vt);
h("YYYYYY", Lt, Vt);
T(["YYYYY", "YYYYYY"], F);
T("YYYY", function(e, t) {
  t[F] = e.length === 2 ? d.parseTwoDigitYear(e) : O(e);
});
T("YY", function(e, t) {
  t[F] = d.parseTwoDigitYear(e);
});
T("Y", function(e, t) {
  t[F] = parseInt(e, 10);
});
function Xe(e) {
  return At(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return O(e) + (O(e) > 68 ? 1900 : 2e3);
};
var Fs = ze("FullYear", !0);
function Au() {
  return At(this.year());
}
function Vu(e, t, r, n, s, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, n, s, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, n, s, i, a), o;
}
function et(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function kt(e, t, r) {
  var n = 7 + t - r, s = (7 + et(e, 0, n).getUTCDay() - t) % 7;
  return -s + n - 1;
}
function Is(e, t, r, n, s) {
  var i = (7 + r - n) % 7, a = kt(e, n, s), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = Xe(u) + o) : o > Xe(e) ? (u = e + 1, l = o - Xe(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function tt(e, t, r) {
  var n = kt(e.year(), t, r), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return s < 1 ? (a = e.year() - 1, i = s + ye(a, t, r)) : s > ye(e.year(), t, r) ? (i = s - ye(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = s), {
    week: i,
    year: a
  };
}
function ye(e, t, r) {
  var n = kt(e, t, r), s = kt(e + 1, t, r);
  return (Xe(e) - n + s) / 7;
}
g("w", ["ww", 2], "wo", "week");
g("W", ["WW", 2], "Wo", "isoWeek");
I("week", "w");
I("isoWeek", "W");
U("week", 5);
U("isoWeek", 5);
h("w", N);
h("ww", N, Z);
h("W", N);
h("WW", N, Z);
ot(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = O(e);
  }
);
function $u(e) {
  return tt(e, this._week.dow, this._week.doy).week;
}
var Lu = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function Fu() {
  return this._week.dow;
}
function Iu() {
  return this._week.doy;
}
function Uu(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Wu(e) {
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
U("day", 11);
U("weekday", 11);
U("isoWeekday", 11);
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
ot(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : b(r).invalidWeekday = e;
});
ot(["d", "e", "E"], function(e, t, r, n) {
  t[n] = O(e);
});
function ju(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Hu(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Br(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Gu = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Us = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), qu = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Bu = at, zu = at, Zu = at;
function Ju(e, t) {
  var r = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Br(r, this._week.dow) : e ? r[e.day()] : r;
}
function Ku(e) {
  return e === !0 ? Br(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Qu(e) {
  return e === !0 ? Br(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Xu(e, t, r) {
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
function el(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Xu.call(this, e, t, r);
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
function tl(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = ju(e, this.localeData()), this.add(e - t, "d")) : t;
}
function rl(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function nl(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Hu(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function sl(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || zr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = Bu), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function il(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || zr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = zu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function al(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || zr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Zu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function zr() {
  function e(f, p) {
    return p.length - f.length;
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
function Zr() {
  return this.hours() % 12 || 12;
}
function ol() {
  return this.hours() || 24;
}
g("H", ["HH", 2], 0, "hour");
g("h", ["hh", 2], 0, Zr);
g("k", ["kk", 2], 0, ol);
g("hmm", 0, 0, function() {
  return "" + Zr.apply(this) + le(this.minutes(), 2);
});
g("hmmss", 0, 0, function() {
  return "" + Zr.apply(this) + le(this.minutes(), 2) + le(this.seconds(), 2);
});
g("Hmm", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2);
});
g("Hmmss", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2) + le(this.seconds(), 2);
});
function Ws(e, t) {
  g(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ws("a", !0);
Ws("A", !1);
I("hour", "h");
U("hour", 13);
function js(e, t) {
  return t._meridiemParse;
}
h("a", js);
h("A", js);
h("H", N);
h("h", N);
h("k", N);
h("HH", N, Z);
h("hh", N, Z);
h("kk", N, Z);
h("hmm", Cs);
h("hmmss", Rs);
h("Hmm", Cs);
h("Hmmss", Rs);
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
function ul(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var ll = /[ap]\.?m?\.?/i, cl = ze("Hours", !0);
function dl(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Hs = {
  calendar: eu,
  longDateFormat: su,
  invalidDate: au,
  ordinal: uu,
  dayOfMonthOrdinalParse: lu,
  relativeTime: du,
  months: Du,
  monthsShort: Ps,
  week: Lu,
  weekdays: Gu,
  weekdaysMin: qu,
  weekdaysShort: Us,
  meridiemParse: ll
}, Y = {}, Je = {}, rt;
function fl(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function $n(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function hl(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = $n(e[t]).split("-"), r = i.length, n = $n(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = Wt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && fl(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return rt;
}
function ml(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Wt(e) {
  var t = null, r;
  if (Y[e] === void 0 && typeof module < "u" && module && module.exports && ml(e))
    try {
      t = rt._abbr, r = require, r("./locale/" + e), ke(t);
    } catch {
      Y[e] = null;
    }
  return Y[e];
}
function ke(e, t) {
  var r;
  return e && (j(t) ? r = ve(e) : r = Jr(e, t), r ? rt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), rt._abbr;
}
function Jr(e, t) {
  if (t !== null) {
    var r, n = Hs;
    if (t.abbr = e, Y[e] != null)
      Ms(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Y[e]._config;
    else if (t.parentLocale != null)
      if (Y[t.parentLocale] != null)
        n = Y[t.parentLocale]._config;
      else if (r = Wt(t.parentLocale), r != null)
        n = r._config;
      else
        return Je[t.parentLocale] || (Je[t.parentLocale] = []), Je[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return Y[e] = new Wr(wr(n, t)), Je[e] && Je[e].forEach(function(s) {
      Jr(s.name, s.config);
    }), ke(e), Y[e];
  } else
    return delete Y[e], null;
}
function pl(e, t) {
  if (t != null) {
    var r, n, s = Hs;
    Y[e] != null && Y[e].parentLocale != null ? Y[e].set(wr(Y[e]._config, t)) : (n = Wt(e), n != null && (s = n._config), t = wr(s, t), n == null && (t.abbr = e), r = new Wr(t), r.parentLocale = Y[e], Y[e] = r), ke(e);
  } else
    Y[e] != null && (Y[e].parentLocale != null ? (Y[e] = Y[e].parentLocale, e === ke() && ke(e)) : Y[e] != null && delete Y[e]);
  return Y[e];
}
function ve(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return rt;
  if (!ne(e)) {
    if (t = Wt(e), t)
      return t;
    e = [e];
  }
  return hl(e);
}
function _l() {
  return Sr(Y);
}
function Kr(e) {
  var t, r = e._a;
  return r && b(e).overflow === -2 && (t = r[pe] < 0 || r[pe] > 11 ? pe : r[oe] < 1 || r[oe] > Ut(r[F], r[pe]) ? oe : r[P] < 0 || r[P] > 24 || r[P] === 24 && (r[ee] !== 0 || r[_e] !== 0 || r[xe] !== 0) ? P : r[ee] < 0 || r[ee] > 59 ? ee : r[_e] < 0 || r[_e] > 59 ? _e : r[xe] < 0 || r[xe] > 999 ? xe : -1, b(e)._overflowDayOfYear && (t < F || t > oe) && (t = oe), b(e)._overflowWeeks && t === -1 && (t = bu), b(e)._overflowWeekday && t === -1 && (t = Ou), b(e).overflow = t), e;
}
var yl = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gl = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, vl = /Z|[+-]\d\d(?::?\d\d)?/, ht = [
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
], hr = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], wl = /^\/?Date\((-?\d+)/i, Sl = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, bl = {
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
function Gs(e) {
  var t, r, n = e._i, s = yl.exec(n) || gl.exec(n), i, a, o, u, l = ht.length, f = hr.length;
  if (s) {
    for (b(e).iso = !0, t = 0, r = l; t < r; t++)
      if (ht[t][1].exec(s[1])) {
        a = ht[t][0], i = ht[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, r = f; t < r; t++)
        if (hr[t][1].exec(s[3])) {
          o = (s[2] || " ") + hr[t][0];
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
      if (vl.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Xr(e);
  } else
    e._isValid = !1;
}
function Ol(e, t, r, n, s, i) {
  var a = [
    kl(e),
    Ps.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function kl(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Dl(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Ml(e, t, r) {
  if (e) {
    var n = Us.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return b(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function Tl(e, t, r) {
  if (e)
    return bl[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function qs(e) {
  var t = Sl.exec(Dl(e._i)), r;
  if (t) {
    if (r = Ol(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Ml(t[1], r, e))
      return;
    e._a = r, e._tzm = Tl(t[8], t[9], t[10]), e._d = et.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function El(e) {
  var t = wl.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Gs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (qs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = K(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function je(e, t, r) {
  return e ?? t ?? r;
}
function xl(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Qr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = xl(e), e._w && e._a[oe] == null && e._a[pe] == null && Nl(e), e._dayOfYear != null && (a = je(e._a[F], s[F]), (e._dayOfYear > Xe(a) || e._dayOfYear === 0) && (b(e)._overflowDayOfYear = !0), r = et(a, 0, e._dayOfYear), e._a[pe] = r.getUTCMonth(), e._a[oe] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[ee] === 0 && e._a[_e] === 0 && e._a[xe] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? et : Vu).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (b(e).weekdayMismatch = !0);
  }
}
function Nl(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = je(
    t.GG,
    e._a[F],
    tt(x(), 1, 4).year
  ), n = je(t.W, 1), s = je(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = tt(x(), i, a), r = je(t.gg, e._a[F], l.year), n = je(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > ye(r, i, a) ? b(e)._overflowWeeks = !0 : u != null ? b(e)._overflowWeekday = !0 : (o = Is(r, n, s, i, a), e._a[F] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Xr(e) {
  if (e._f === d.ISO_8601) {
    Gs(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    qs(e);
    return;
  }
  e._a = [], b(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, f;
  for (s = Ts(e._f, e._locale).match(jr) || [], f = s.length, r = 0; r < f; r++)
    i = s[r], n = (t.match(vu(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && b(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), Ge[i] ? (n ? b(e).empty = !1 : b(e).unusedTokens.push(i), Su(i, n, e)) : e._strict && !n && b(e).unusedTokens.push(i);
  b(e).charsLeftOver = o - u, t.length > 0 && b(e).unusedInput.push(t), e._a[P] <= 12 && b(e).bigHour === !0 && e._a[P] > 0 && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[P] = Yl(
    e._locale,
    e._a[P],
    e._meridiem
  ), l = b(e).era, l !== null && (e._a[F] = e._locale.erasConvertYear(l, e._a[F])), Qr(e), Kr(e);
}
function Yl(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function Cl(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    b(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = Ur({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Xr(t), Ir(t) && (a = !0), i += b(t).charsLeftOver, i += b(t).unusedTokens.length * 10, b(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  be(e, r || t);
}
function Rl(e) {
  if (!e._d) {
    var t = Hr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = ks(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), Qr(e);
  }
}
function Pl(e) {
  var t = new it(Kr(Bs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Bs(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ve(e._l), t === null || r === void 0 && t === "" ? Pt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), se(t) ? new it(Kr(t)) : (st(t) ? e._d = t : ne(r) ? Cl(e) : r ? Xr(e) : Al(e), Ir(e) || (e._d = null), e));
}
function Al(e) {
  var t = e._i;
  j(t) ? e._d = new Date(d.now()) : st(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? El(e) : ne(t) ? (e._a = ks(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Qr(e)) : Ye(t) ? Rl(e) : ge(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function zs(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Ye(e) && Fr(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, Pl(i);
}
function x(e, t, r, n) {
  return zs(e, t, r, n, !1);
}
var Vl = K(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = x.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Pt();
  }
), $l = K(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = x.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Pt();
  }
);
function Zs(e, t) {
  var r, n;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return x();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function Ll() {
  var e = [].slice.call(arguments, 0);
  return Zs("isBefore", e);
}
function Fl() {
  var e = [].slice.call(arguments, 0);
  return Zs("isAfter", e);
}
var Il = function() {
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
function Ul(e) {
  var t, r = !1, n, s = Ke.length;
  for (t in e)
    if (D(e, t) && !(R.call(Ke, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < s; ++n)
    if (e[Ke[n]]) {
      if (r)
        return !1;
      parseFloat(e[Ke[n]]) !== O(e[Ke[n]]) && (r = !0);
    }
  return !0;
}
function Wl() {
  return this._isValid;
}
function jl() {
  return ae(NaN);
}
function jt(e) {
  var t = Hr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, f = t.millisecond || 0;
  this._isValid = Ul(t), this._milliseconds = +f + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ve(), this._bubble();
}
function vt(e) {
  return e instanceof jt;
}
function Or(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Hl(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && O(e[a]) !== O(t[a])) && i++;
  return i + s;
}
function Js(e, t) {
  g(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + le(~~(r / 60), 2) + t + le(~~r % 60, 2);
  });
}
Js("Z", ":");
Js("ZZ", "");
h("Z", It);
h("ZZ", It);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = en(It, e);
});
var Gl = /([\+\-]|\d\d)/gi;
function en(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(Gl) || ["-", 0, 0], i = +(s[1] * 60) + O(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function tn(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (se(e) || st(e) ? e.valueOf() : x(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), d.updateOffset(r, !1), r) : x(e).local();
}
function kr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function ql(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = en(It, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = kr(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? Xs(
      this,
      ae(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : kr(this);
}
function Bl(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function zl(e) {
  return this.utcOffset(0, e);
}
function Zl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(kr(this), "m")), this;
}
function Jl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = en(yu, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Kl(e) {
  return this.isValid() ? (e = e ? x(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Ql() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Xl() {
  if (!j(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Ur(e, this), e = Bs(e), e._a ? (t = e._isUTC ? ce(e._a) : x(e._a), this._isDSTShifted = this.isValid() && Hl(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function ec() {
  return this.isValid() ? !this._isUTC : !1;
}
function tc() {
  return this.isValid() ? this._isUTC : !1;
}
function Ks() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var rc = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, nc = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ae(e, t) {
  var r = e, n = null, s, i, a;
  return vt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ge(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = rc.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: O(n[oe]) * s,
    h: O(n[P]) * s,
    m: O(n[ee]) * s,
    s: O(n[_e]) * s,
    ms: O(Or(n[xe] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = nc.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: Te(n[2], s),
    M: Te(n[3], s),
    w: Te(n[4], s),
    d: Te(n[5], s),
    h: Te(n[6], s),
    m: Te(n[7], s),
    s: Te(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = sc(
    x(r.from),
    x(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new jt(r), vt(e) && D(e, "_locale") && (i._locale = e._locale), vt(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
ae.fn = jt.prototype;
ae.invalid = jl;
function Te(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Ln(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function sc(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = tn(t, e), e.isBefore(t) ? r = Ln(e, t) : (r = Ln(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function Qs(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (Ms(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ae(r, n), Xs(this, s, e), this;
  };
}
function Xs(e, t, r, n) {
  var s = t._milliseconds, i = Or(t._days), a = Or(t._months);
  e.isValid() && (n = n ?? !0, a && Vs(e, bt(e, "Month") + a * r), i && xs(e, "Date", bt(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && d.updateOffset(e, i || a));
}
var ic = Qs(1, "add"), ac = Qs(-1, "subtract");
function ei(e) {
  return typeof e == "string" || e instanceof String;
}
function oc(e) {
  return se(e) || st(e) || ei(e) || ge(e) || lc(e) || uc(e) || e === null || e === void 0;
}
function uc(e) {
  var t = Ye(e) && !Fr(e), r = !1, n = [
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
    i = n[s], r = r || D(e, i);
  return t && r;
}
function lc(e) {
  var t = ne(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ge(n) && ei(e);
  }).length === 0), t && r;
}
function cc(e) {
  var t = Ye(e) && !Fr(e), r = !1, n = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], s, i;
  for (s = 0; s < n.length; s += 1)
    i = n[s], r = r || D(e, i);
  return t && r;
}
function dc(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function fc(e, t) {
  arguments.length === 1 && (arguments[0] ? oc(arguments[0]) ? (e = arguments[0], t = void 0) : cc(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || x(), n = tn(r, this).startOf("day"), s = d.calendarFormat(this, n) || "sameElse", i = t && (de(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, x(r))
  );
}
function hc() {
  return new it(this);
}
function mc(e, t) {
  var r = se(e) ? e : x(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function pc(e, t) {
  var r = se(e) ? e : x(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function _c(e, t, r, n) {
  var s = se(e) ? e : x(e), i = se(t) ? t : x(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function yc(e, t) {
  var r = se(e) ? e : x(e), n;
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function gc(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function vc(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function wc(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = tn(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = Q(t), t) {
    case "year":
      i = wt(this, n) / 12;
      break;
    case "month":
      i = wt(this, n);
      break;
    case "quarter":
      i = wt(this, n) / 3;
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
function wt(e, t) {
  if (e.date() < t.date())
    return -wt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Sc() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function bc(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? gt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : de(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", gt(r, "Z")) : gt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Oc() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function kc(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = gt(this, e);
  return this.localeData().postformat(t);
}
function Dc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || x(e).isValid()) ? ae({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Mc(e) {
  return this.from(x(), e);
}
function Tc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || x(e).isValid()) ? ae({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Ec(e) {
  return this.to(x(), e);
}
function ti(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ve(e), t != null && (this._locale = t), this);
}
var ri = K(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function ni() {
  return this._locale;
}
var Dt = 1e3, qe = 60 * Dt, Mt = 60 * qe, si = (365 * 400 + 97) * 24 * Mt;
function Be(e, t) {
  return (e % t + t) % t;
}
function ii(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - si : new Date(e, t, r).valueOf();
}
function ai(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - si : Date.UTC(e, t, r);
}
function xc(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ai : ii, e) {
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
      t = this._d.valueOf(), t -= Be(
        t + (this._isUTC ? 0 : this.utcOffset() * qe),
        Mt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Be(t, qe);
      break;
    case "second":
      t = this._d.valueOf(), t -= Be(t, Dt);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Nc(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ai : ii, e) {
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
      t = this._d.valueOf(), t += Mt - Be(
        t + (this._isUTC ? 0 : this.utcOffset() * qe),
        Mt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += qe - Be(t, qe) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Dt - Be(t, Dt) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Yc() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Cc() {
  return Math.floor(this.valueOf() / 1e3);
}
function Rc() {
  return new Date(this.valueOf());
}
function Pc() {
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
function Ac() {
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
function Vc() {
  return this.isValid() ? this.toISOString() : null;
}
function $c() {
  return Ir(this);
}
function Lc() {
  return be({}, b(this));
}
function Fc() {
  return b(this).overflow;
}
function Ic() {
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
h("N", rn);
h("NN", rn);
h("NNN", rn);
h("NNNN", Kc);
h("NNNNN", Qc);
T(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? b(r).era = s : b(r).invalidEra = e;
  }
);
h("y", Ze);
h("yy", Ze);
h("yyy", Ze);
h("yyyy", Ze);
h("yo", Xc);
T(["y", "yy", "yyy", "yyyy"], F);
T(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[F] = r._locale.eraYearOrdinalParse(e, s) : t[F] = parseInt(e, 10);
});
function Uc(e, t) {
  var r, n, s, i = this._eras || ve("en")._eras;
  for (r = 0, n = i.length; r < n; ++r) {
    switch (typeof i[r].since) {
      case "string":
        s = d(i[r].since).startOf("day"), i[r].since = s.valueOf();
        break;
    }
    switch (typeof i[r].until) {
      case "undefined":
        i[r].until = 1 / 0;
        break;
      case "string":
        s = d(i[r].until).startOf("day").valueOf(), i[r].until = s.valueOf();
        break;
    }
  }
  return i;
}
function Wc(e, t, r) {
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
function jc(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * r;
}
function Hc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function Gc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function qc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function Bc() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - d(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function zc(e) {
  return D(this, "_erasNameRegex") || nn.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Zc(e) {
  return D(this, "_erasAbbrRegex") || nn.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Jc(e) {
  return D(this, "_erasNarrowRegex") || nn.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function rn(e, t) {
  return t.erasAbbrRegex(e);
}
function Kc(e, t) {
  return t.erasNameRegex(e);
}
function Qc(e, t) {
  return t.erasNarrowRegex(e);
}
function Xc(e, t) {
  return t._eraYearOrdinalRegex || Ze;
}
function nn() {
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
function Ht(e, t) {
  g(0, [e, e.length], 0, t);
}
Ht("gggg", "weekYear");
Ht("ggggg", "weekYear");
Ht("GGGG", "isoWeekYear");
Ht("GGGGG", "isoWeekYear");
I("weekYear", "gg");
I("isoWeekYear", "GG");
U("weekYear", 1);
U("isoWeekYear", 1);
h("G", Ft);
h("g", Ft);
h("GG", N, Z);
h("gg", N, Z);
h("GGGG", qr, Gr);
h("gggg", qr, Gr);
h("GGGGG", Lt, Vt);
h("ggggg", Lt, Vt);
ot(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = O(e);
  }
);
ot(["gg", "GG"], function(e, t, r, n) {
  t[n] = d.parseTwoDigitYear(e);
});
function ed(e) {
  return oi.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function td(e) {
  return oi.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function rd() {
  return ye(this.year(), 1, 4);
}
function nd() {
  return ye(this.isoWeekYear(), 1, 4);
}
function sd() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function id() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function oi(e, t, r, n, s) {
  var i;
  return e == null ? tt(this, n, s).year : (i = ye(e, n, s), t > i && (t = i), ad.call(this, e, t, r, n, s));
}
function ad(e, t, r, n, s) {
  var i = Is(e, t, r, n, s), a = et(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
g("Q", 0, "Qo", "quarter");
I("quarter", "Q");
U("quarter", 7);
h("Q", Ns);
T("Q", function(e, t) {
  t[pe] = (O(e) - 1) * 3;
});
function od(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
g("D", ["DD", 2], "Do", "date");
I("date", "D");
U("date", 9);
h("D", N);
h("DD", N, Z);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], oe);
T("Do", function(e, t) {
  t[oe] = O(e.match(N)[0]);
});
var ui = ze("Date", !0);
g("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
I("dayOfYear", "DDD");
U("dayOfYear", 4);
h("DDD", $t);
h("DDDD", Ys);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = O(e);
});
function ud(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
g("m", ["mm", 2], 0, "minute");
I("minute", "m");
U("minute", 14);
h("m", N);
h("mm", N, Z);
T(["m", "mm"], ee);
var ld = ze("Minutes", !1);
g("s", ["ss", 2], 0, "second");
I("second", "s");
U("second", 15);
h("s", N);
h("ss", N, Z);
T(["s", "ss"], _e);
var cd = ze("Seconds", !1);
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
U("millisecond", 16);
h("S", $t, Ns);
h("SS", $t, Z);
h("SSS", $t, Ys);
var Oe, li;
for (Oe = "SSSS"; Oe.length <= 9; Oe += "S")
  h(Oe, Ze);
function dd(e, t) {
  t[xe] = O(("0." + e) * 1e3);
}
for (Oe = "S"; Oe.length <= 9; Oe += "S")
  T(Oe, dd);
li = ze("Milliseconds", !1);
g("z", 0, 0, "zoneAbbr");
g("zz", 0, 0, "zoneName");
function fd() {
  return this._isUTC ? "UTC" : "";
}
function hd() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = it.prototype;
c.add = ic;
c.calendar = fc;
c.clone = hc;
c.diff = wc;
c.endOf = Nc;
c.format = kc;
c.from = Dc;
c.fromNow = Mc;
c.to = Tc;
c.toNow = Ec;
c.get = pu;
c.invalidAt = Fc;
c.isAfter = mc;
c.isBefore = pc;
c.isBetween = _c;
c.isSame = yc;
c.isSameOrAfter = gc;
c.isSameOrBefore = vc;
c.isValid = $c;
c.lang = ri;
c.locale = ti;
c.localeData = ni;
c.max = $l;
c.min = Vl;
c.parsingFlags = Lc;
c.set = _u;
c.startOf = xc;
c.subtract = ac;
c.toArray = Pc;
c.toObject = Ac;
c.toDate = Rc;
c.toISOString = bc;
c.inspect = Oc;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = Vc;
c.toString = Sc;
c.unix = Cc;
c.valueOf = Yc;
c.creationData = Ic;
c.eraName = Hc;
c.eraNarrow = Gc;
c.eraAbbr = qc;
c.eraYear = Bc;
c.year = Fs;
c.isLeapYear = Au;
c.weekYear = ed;
c.isoWeekYear = td;
c.quarter = c.quarters = od;
c.month = $s;
c.daysInMonth = Cu;
c.week = c.weeks = Uu;
c.isoWeek = c.isoWeeks = Wu;
c.weeksInYear = sd;
c.weeksInWeekYear = id;
c.isoWeeksInYear = rd;
c.isoWeeksInISOWeekYear = nd;
c.date = ui;
c.day = c.days = tl;
c.weekday = rl;
c.isoWeekday = nl;
c.dayOfYear = ud;
c.hour = c.hours = cl;
c.minute = c.minutes = ld;
c.second = c.seconds = cd;
c.millisecond = c.milliseconds = li;
c.utcOffset = ql;
c.utc = zl;
c.local = Zl;
c.parseZone = Jl;
c.hasAlignedHourOffset = Kl;
c.isDST = Ql;
c.isLocal = ec;
c.isUtcOffset = tc;
c.isUtc = Ks;
c.isUTC = Ks;
c.zoneAbbr = fd;
c.zoneName = hd;
c.dates = K(
  "dates accessor is deprecated. Use date instead.",
  ui
);
c.months = K(
  "months accessor is deprecated. Use month instead",
  $s
);
c.years = K(
  "years accessor is deprecated. Use year instead",
  Fs
);
c.zone = K(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Bl
);
c.isDSTShifted = K(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Xl
);
function md(e) {
  return x(e * 1e3);
}
function pd() {
  return x.apply(null, arguments).parseZone();
}
function ci(e) {
  return e;
}
var M = Wr.prototype;
M.calendar = tu;
M.longDateFormat = iu;
M.invalidDate = ou;
M.ordinal = cu;
M.preparse = ci;
M.postformat = ci;
M.relativeTime = fu;
M.pastFuture = hu;
M.set = Xo;
M.eras = Uc;
M.erasParse = Wc;
M.erasConvertYear = jc;
M.erasAbbrRegex = Zc;
M.erasNameRegex = zc;
M.erasNarrowRegex = Jc;
M.months = Eu;
M.monthsShort = xu;
M.monthsParse = Yu;
M.monthsRegex = Pu;
M.monthsShortRegex = Ru;
M.week = $u;
M.firstDayOfYear = Iu;
M.firstDayOfWeek = Fu;
M.weekdays = Ju;
M.weekdaysMin = Qu;
M.weekdaysShort = Ku;
M.weekdaysParse = el;
M.weekdaysRegex = sl;
M.weekdaysShortRegex = il;
M.weekdaysMinRegex = al;
M.isPM = ul;
M.meridiem = dl;
function Tt(e, t, r, n) {
  var s = ve(), i = ce().set(n, t);
  return s[r](i, e);
}
function di(e, t, r) {
  if (ge(e) && (t = e, e = void 0), e = e || "", t != null)
    return Tt(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = Tt(e, n, r, "month");
  return s;
}
function sn(e, t, r, n) {
  typeof e == "boolean" ? (ge(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ge(t) && (r = t, t = void 0), t = t || "");
  var s = ve(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return Tt(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = Tt(t, (a + i) % 7, n, "day");
  return o;
}
function _d(e, t) {
  return di(e, t, "months");
}
function yd(e, t) {
  return di(e, t, "monthsShort");
}
function gd(e, t, r) {
  return sn(e, t, r, "weekdays");
}
function vd(e, t, r) {
  return sn(e, t, r, "weekdaysShort");
}
function wd(e, t, r) {
  return sn(e, t, r, "weekdaysMin");
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
d.lang = K(
  "moment.lang is deprecated. Use moment.locale instead.",
  ke
);
d.langData = K(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ve
);
var he = Math.abs;
function Sd() {
  var e = this._data;
  return this._milliseconds = he(this._milliseconds), this._days = he(this._days), this._months = he(this._months), e.milliseconds = he(e.milliseconds), e.seconds = he(e.seconds), e.minutes = he(e.minutes), e.hours = he(e.hours), e.months = he(e.months), e.years = he(e.years), this;
}
function fi(e, t, r, n) {
  var s = ae(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function bd(e, t) {
  return fi(this, e, t, 1);
}
function Od(e, t) {
  return fi(this, e, t, -1);
}
function Fn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function kd() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Fn(Dr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = J(e / 1e3), n.seconds = s % 60, i = J(s / 60), n.minutes = i % 60, a = J(i / 60), n.hours = a % 24, t += J(a / 24), u = J(hi(t)), r += u, t -= Fn(Dr(u)), o = J(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function hi(e) {
  return e * 4800 / 146097;
}
function Dr(e) {
  return e * 146097 / 4800;
}
function Dd(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = Q(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + hi(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(Dr(this._months)), e) {
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
function Md() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + O(this._months / 12) * 31536e6 : NaN;
}
function we(e) {
  return function() {
    return this.as(e);
  };
}
var Td = we("ms"), Ed = we("s"), xd = we("m"), Nd = we("h"), Yd = we("d"), Cd = we("w"), Rd = we("M"), Pd = we("Q"), Ad = we("y");
function Vd() {
  return ae(this);
}
function $d(e) {
  return e = Q(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ve(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Ld = Ve("milliseconds"), Fd = Ve("seconds"), Id = Ve("minutes"), Ud = Ve("hours"), Wd = Ve("days"), jd = Ve("months"), Hd = Ve("years");
function Gd() {
  return J(this.days() / 7);
}
var me = Math.round, He = {
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
function qd(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function Bd(e, t, r, n) {
  var s = ae(e).abs(), i = me(s.as("s")), a = me(s.as("m")), o = me(s.as("h")), u = me(s.as("d")), l = me(s.as("M")), f = me(s.as("w")), p = me(s.as("y")), m = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (m = m || f <= 1 && ["w"] || f < r.w && ["ww", f]), m = m || l <= 1 && ["M"] || l < r.M && ["MM", l] || p <= 1 && ["y"] || ["yy", p], m[2] = t, m[3] = +e > 0, m[4] = n, qd.apply(null, m);
}
function zd(e) {
  return e === void 0 ? me : typeof e == "function" ? (me = e, !0) : !1;
}
function Zd(e, t) {
  return He[e] === void 0 ? !1 : t === void 0 ? He[e] : (He[e] = t, e === "s" && (He.ss = t - 1), !0);
}
function Jd(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = He, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, He, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = Bd(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var mr = Math.abs;
function We(e) {
  return (e > 0) - (e < 0) || +e;
}
function Gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = mr(this._milliseconds) / 1e3, t = mr(this._days), r = mr(this._months), n, s, i, a, o = this.asSeconds(), u, l, f, p;
  return o ? (n = J(e / 60), s = J(n / 60), e %= 60, n %= 60, i = J(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = We(this._months) !== We(o) ? "-" : "", f = We(this._days) !== We(o) ? "-" : "", p = We(this._milliseconds) !== We(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? f + t + "D" : "") + (s || n || e ? "T" : "") + (s ? p + s + "H" : "") + (n ? p + n + "M" : "") + (e ? p + a + "S" : "")) : "P0D";
}
var k = jt.prototype;
k.isValid = Wl;
k.abs = Sd;
k.add = bd;
k.subtract = Od;
k.as = Dd;
k.asMilliseconds = Td;
k.asSeconds = Ed;
k.asMinutes = xd;
k.asHours = Nd;
k.asDays = Yd;
k.asWeeks = Cd;
k.asMonths = Rd;
k.asQuarters = Pd;
k.asYears = Ad;
k.valueOf = Md;
k._bubble = kd;
k.clone = Vd;
k.get = $d;
k.milliseconds = Ld;
k.seconds = Fd;
k.minutes = Id;
k.hours = Ud;
k.days = Wd;
k.weeks = Gd;
k.months = jd;
k.years = Hd;
k.humanize = Jd;
k.toISOString = Gt;
k.toString = Gt;
k.toJSON = Gt;
k.locale = ti;
k.localeData = ni;
k.toIsoString = K(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Gt
);
k.lang = ri;
g("X", 0, 0, "unix");
g("x", 0, 0, "valueOf");
h("x", Ft);
h("X", gu);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(O(e));
});
//! moment.js
d.version = "2.29.4";
Ko(x);
d.fn = c;
d.min = Ll;
d.max = Fl;
d.now = Il;
d.utc = ce;
d.unix = md;
d.months = _d;
d.isDate = st;
d.locale = ke;
d.invalid = Pt;
d.duration = ae;
d.isMoment = se;
d.weekdays = gd;
d.parseZone = pd;
d.localeData = ve;
d.isDuration = vt;
d.monthsShort = yd;
d.weekdaysMin = wd;
d.defineLocale = Jr;
d.updateLocale = pl;
d.locales = _l;
d.weekdaysShort = vd;
d.normalizeUnits = Q;
d.relativeTimeRounding = zd;
d.relativeTimeThreshold = Zd;
d.calendarFormat = dc;
d.prototype = c;
d.HTML5_FMT = {
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
function In(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var $ = function() {
};
$.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (Me.defaults.headers.common["X-CSRF-Token"] = e.content), Me.defaults.headers.common.Accept = "application/json", Me.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, $.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  L.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = Me.CancelToken.source();
}, $.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, $.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, $.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = In(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return Me(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, $.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = In(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), L.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, $.cancelTokenSources = {}, $.active = 0, Me.interceptors.request.use(function(e) {
  return $.active += 1, e;
}, function(e) {
  return $.active -= 1, Promise.reject(e);
}), Me.interceptors.response.use(function(e) {
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
  return !d(e, "YYYY-MM-DD HH:mm", !0).isValid();
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
} }, Un = Object.freeze({ __proto__: null, Api: $, Utils: L }), Kd = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Un).forEach(function(r) {
    t.component(r, Un[r]);
  }));
} }, mt = null;
typeof window < "u" ? mt = window.Vue : typeof global < "u" && (mt = global.Vue), mt && mt.use(Kd);
const Qd = {
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
        return this.$store.getters.getValue(this.name);
      },
      set(e) {
        this.$store.dispatch(
          "update",
          {
            value: e,
            name: this.name
          }
        );
      }
    },
    suggestValue() {
      return this.suggest_value === "true" || this.suggest_value === !0;
    },
    useSuggestedValue() {
      return this.suggestValue;
    },
    suggestedValue() {
      return this.$store.getters.getSuggestedValues(this.name);
    }
  },
  watch: {
    suggestedValue(e, t) {
      this.useSuggestedValue && (this.inputValue = e);
    }
  }
}, Xd = ["id", "name"];
function ef(e, t, r, n, s, i) {
  return Hn((W(), B("input", xt(e.$attrs, {
    id: r.id,
    name: r.name,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.inputValue = a)
  }), null, 16, Xd)), [
    [Gn, i.inputValue]
  ]);
}
const tf = /* @__PURE__ */ Ce(Qd, [["render", ef]]), rf = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      require: !0
    }
  }
}, nf = ["for"];
function sf(e, t, r, n, s, i) {
  return W(), B("label", {
    for: e.$props.for
  }, [
    Er(e.$slots, "default")
  ], 8, nf);
}
const mi = /* @__PURE__ */ Ce(rf, [["render", sf]]), af = {
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
function of(e, t, r, n, s, i) {
  return i.displaySuggestedValue ? (W(), B("span", Ti(xt({ key: 0 }, this.$attrs)), Tr(i.getSuggestedValue), 17)) : Ne("", !0);
}
const pi = /* @__PURE__ */ Ce(af, [["render", of]]);
class uf {
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
    disableValidation: f = !1,
    hideValidationErrors: p = !1,
    ...m
  }) {
    window.toto = "TOTO";
    let _ = {
      "botyglot-input": Bn,
      "botyglot-form": zn,
      "botyglot-hidden": tf,
      "botyglot-submit": Zn,
      "botyglot-label": mi,
      "botyglot-errors-placeholder": Nr,
      "botyglot-suggested-value": pi
    };
    const E = Object.keys(u)[0];
    let { errors: De, warnings: w, suggested_values: qt, potential_values: Bt, ...ut } = u[E], lt = {
      values: {
        [E]: ut || {}
      },
      errors: {
        [E]: De || {}
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
        [E]: Bt || {}
      },
      suggestedValues: {
        [E]: qt || {}
      },
      meta: Object.assign({
        modelName: E,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: f,
        hideValidationErrors: p
      }, m)
    };
    this.store = wa({
      state: lt,
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
          y.values = Fe(S.split("."), v.value, y.values);
        },
        setTouched: function(y, v) {
          let S = L.dotify(v.name);
          y.touched = Fe(S.split("."), v.value, y.touched);
        },
        setError: function(y, v) {
          let S = L.dotify(v.name);
          y.errors = Fe(S.split("."), v.value, y.errors);
        },
        setWarning: function(y, v) {
          let S = L.dotify(v.name);
          y.warnings = Fe(S.split("."), v.value, y.warnings);
        },
        setPotentialValues: function(y, v) {
          let S = L.dotify(v.name);
          y.potentialValues = Fe(S.split("."), v.value, y.potentialValues);
        },
        setSuggestedValues: function(y, v) {
          let S = L.dotify(v.name);
          y.suggestedValues = Fe(S.split("."), v.value, y.suggestedValues);
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
          let { sid: S, url: G, method: fe, data: ct, onSuccess: _i, onError: yi, ...gi } = v, vi = (dt) => {
            let Si = Object.assign(gi, {
              sid: S,
              response: dt
            });
            y.dispatch("genericDataReceivedFromServer", Si);
          }, wi = (dt) => {
            console.log("There was a problem with validating the data"), console.log(dt), console.log(JSON.stringify(dt, null, 2));
          };
          $.sendRequest({
            url: G,
            method: fe || "post",
            data: ct,
            onSuccess: _i || vi,
            onError: yi || wi,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(y, v) {
        },
        sendValuesToServer: function(y) {
          if (f) {
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
            }, Ra(y.state.values));
            G[E]._prevent_save = !0, $.sendRequest({
              url: y.state.meta.validationUrl,
              data: G,
              method: y.state.meta.httpMethod,
              onSuccess: v,
              onError: S,
              delay: !0
            });
          }
        },
        dataReceivedFromServer: function(y, v) {
          let { errors: S, warnings: G, potential_values: fe, suggested_values: ct } = v[E];
          S && y.commit("setError", {
            value: S,
            name: E
          }), G && y.commit("setWarning", {
            value: G,
            name: E
          }), fe && y.commit("setPotentialValues", {
            value: fe,
            name: E
          }), ct && y.commit("setSuggestedValues", {
            value: ct,
            name: E
          });
        },
        update: function(y, v) {
          y.commit("setValue", v), y.dispatch("sendValuesToServer");
        }
      }
    }), this.app = Ei({
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(_, t),
      props: {}
    }), this.app.mount(n);
  }
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ComponentWrapper: qn,
  ErrorsPlaceholder: Nr,
  Field: Bn,
  Form: zn,
  FormStore: uf,
  Label: mi,
  Submit: Zn,
  SuggestedValue: pi
}, Symbol.toStringTag, { value: "Module" }));
function Mr(e) {
  Mr.installed || (Mr.installed = !0, Object.keys(Wn).forEach((t) => {
    e.component(t, Wn[t]);
  }));
}
const lf = {
  install: Mr
};
let Et = null;
typeof window < "u" ? Et = window.Vue : typeof global < "u" && (Et = global.Vue);
Et && Et.use(lf);
export {
  qn as ComponentWrapper,
  Nr as ErrorsPlaceholder,
  Bn as Field,
  zn as Form,
  uf as FormStore,
  mi as Label,
  Zn as Submit,
  pi as SuggestedValue,
  lf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
