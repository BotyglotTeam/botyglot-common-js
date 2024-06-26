import { watch as Nn, effectScope as ri, reactive as ni, computed as si, createApp as ii } from "vue";
function ai() {
  return Rn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Rn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const oi = typeof Proxy == "function", ui = "devtools-plugin:setup", li = "plugin:settings:set";
let Re, ur;
function ci() {
  var e;
  return Re !== void 0 || (typeof window < "u" && window.performance ? (Re = !0, ur = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Re = !0, ur = globalThis.perf_hooks.performance) : Re = !1), Re;
}
function fi() {
  return ci() ? ur.now() : Date.now();
}
class di {
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
        return fi();
      }
    }, r && r.on(li, (a, o) => {
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
function hi(e, t) {
  const r = e, n = Rn(), s = ai(), i = oi && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(ui, e, t);
  else {
    const a = i ? new di(r, s) : null;
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
var mi = "store";
function Te(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function pi(e) {
  return e !== null && typeof e == "object";
}
function _i(e) {
  return e && typeof e.then == "function";
}
function Q(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function yi(e, t) {
  return function() {
    return e(t);
  };
}
function Pn(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function Cn(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  bt(e, r, [], e._modules.root, !0), wr(e, r, t);
}
function wr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = ri(!0);
  u.run(function() {
    Te(i, function(l, h) {
      a[h] = yi(l, e), o[h] = si(function() {
        return a[h]();
      }), Object.defineProperty(e.getters, h, {
        get: function() {
          return o[h].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = ni({
    data: t
  }), e._scope = u, e.strict && Oi(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function bt(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = Sr(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = vi(e, a, r);
  n.forEachMutation(function(h, m) {
    var p = a + m;
    gi(e, p, h, l);
  }), n.forEachAction(function(h, m) {
    var p = h.root ? m : a + m, v = h.handler || h;
    wi(e, p, v, l);
  }), n.forEachGetter(function(h, m) {
    var p = a + m;
    Si(e, p, h, l);
  }), n.forEachChild(function(h, m) {
    bt(e, t, r.concat(m), h, s);
  });
}
function vi(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = pt(i, a, o), l = u.payload, h = u.options, m = u.type;
      if ((!h || !h.root) && (m = t + m, process.env.NODE_ENV !== "production" && !e._actions[m])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + m);
        return;
      }
      return e.dispatch(m, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = pt(i, a, o), l = u.payload, h = u.options, m = u.type;
      if ((!h || !h.root) && (m = t + m, process.env.NODE_ENV !== "production" && !e._mutations[m])) {
        console.error("[vuex] unknown local mutation type: " + u.type + ", global type: " + m);
        return;
      }
      e.commit(m, l, h);
    }
  };
  return Object.defineProperties(s, {
    getters: {
      get: n ? function() {
        return e.getters;
      } : function() {
        return An(e, t);
      }
    },
    state: {
      get: function() {
        return Sr(e.state, r);
      }
    }
  }), s;
}
function An(e, t) {
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
function gi(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function wi(e, t, r, n) {
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
    return _i(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function Si(e, t, r, n) {
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
function Oi(e) {
  Nn(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && Q(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function Sr(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function pt(e, t, r) {
  return pi(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && Q(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var bi = "vuex bindings", zr = "vuex:mutations", Wt = "vuex:actions", Pe = "vuex", ki = 0;
function Di(e, t) {
  hi(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [bi]
    },
    function(r) {
      r.addTimelineLayer({
        id: zr,
        label: "Vuex Mutations",
        color: Zr
      }), r.addTimelineLayer({
        id: Wt,
        label: "Vuex Actions",
        color: Zr
      }), r.addInspector({
        id: Pe,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === Pe)
          if (n.filter) {
            var s = [];
            Un(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              Fn(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Pe) {
          var s = n.nodeId;
          An(t, s), n.state = Ti(
            Yi(t._modules, s),
            s === "root" ? t.getters : t._makeLocalGettersCache,
            s
          );
        }
      }), r.on.editInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Pe) {
          var s = n.nodeId, i = n.path;
          s !== "root" && (i = s.split("/").filter(Boolean).concat(i)), t._withCommit(function() {
            n.set(t._state.data, i, n.state.value);
          });
        }
      }), t.subscribe(function(n, s) {
        var i = {};
        n.payload && (i.payload = n.payload), i.state = s, r.notifyComponentUpdate(), r.sendInspectorTree(Pe), r.sendInspectorState(Pe), r.addTimelineEvent({
          layerId: zr,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = ki++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
            layerId: Wt,
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
            layerId: Wt,
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
var Zr = 8702998, Mi = 6710886, xi = 16777215, Ln = {
  label: "namespaced",
  textColor: xi,
  backgroundColor: Mi
};
function In(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function Fn(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: In(t),
    tags: e.namespaced ? [Ln] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return Fn(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function Un(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [Ln] : []
  }), Object.keys(t._children).forEach(function(s) {
    Un(e, t._children[s], r, n + s + "/");
  });
}
function Ti(e, t, r) {
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
    var i = Ei(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? In(a) : a,
        editable: !1,
        value: lr(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function Ei(e) {
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
      }), s[i] = lr(function() {
        return e[r];
      });
    } else
      t[r] = lr(function() {
        return e[r];
      });
  }), t;
}
function Yi(e, t) {
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
function lr(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var re = function(t, r) {
  this.runtime = r, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var n = t.state;
  this.state = (typeof n == "function" ? n() : n) || {};
}, jn = { namespaced: { configurable: !0 } };
jn.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
re.prototype.addChild = function(t, r) {
  this._children[t] = r;
};
re.prototype.removeChild = function(t) {
  delete this._children[t];
};
re.prototype.getChild = function(t) {
  return this._children[t];
};
re.prototype.hasChild = function(t) {
  return t in this._children;
};
re.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
re.prototype.forEachChild = function(t) {
  Te(this._children, t);
};
re.prototype.forEachGetter = function(t) {
  this._rawModule.getters && Te(this._rawModule.getters, t);
};
re.prototype.forEachAction = function(t) {
  this._rawModule.actions && Te(this._rawModule.actions, t);
};
re.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && Te(this._rawModule.mutations, t);
};
Object.defineProperties(re.prototype, jn);
var Ee = function(t) {
  this.register([], t, !1);
};
Ee.prototype.get = function(t) {
  return t.reduce(function(r, n) {
    return r.getChild(n);
  }, this.root);
};
Ee.prototype.getNamespace = function(t) {
  var r = this.root;
  return t.reduce(function(n, s) {
    return r = r.getChild(s), n + (r.namespaced ? s + "/" : "");
  }, "");
};
Ee.prototype.update = function(t) {
  Wn([], this.root, t);
};
Ee.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && Vn(t, r);
  var i = new re(r, n);
  if (t.length === 0)
    this.root = i;
  else {
    var a = this.get(t.slice(0, -1));
    a.addChild(t[t.length - 1], i);
  }
  r.modules && Te(r.modules, function(o, u) {
    s.register(t.concat(u), o, n);
  });
};
Ee.prototype.unregister = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1], s = r.getChild(n);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + n + "', which is not registered"
    );
    return;
  }
  s.runtime && r.removeChild(n);
};
Ee.prototype.isRegistered = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1];
  return r ? r.hasChild(n) : !1;
};
function Wn(e, t, r) {
  if (process.env.NODE_ENV !== "production" && Vn(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      Wn(
        e.concat(n),
        t.getChild(n),
        r.modules[n]
      );
    }
}
var Jr = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, Ni = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, Kr = {
  getters: Jr,
  mutations: Jr,
  actions: Ni
};
function Vn(e, t) {
  Object.keys(Kr).forEach(function(r) {
    if (t[r]) {
      var n = Kr[r];
      Te(t[r], function(s, i) {
        Q(
          n.assert(s),
          Ri(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function Ri(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function Pi(e) {
  return new H(e);
}
var H = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (Q(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), Q(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Ee(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(p, v) {
    return u.call(a, p, v);
  }, this.commit = function(p, v, N) {
    return l.call(a, p, v, N);
  }, this.strict = s;
  var h = this._modules.root.state;
  bt(this, h, [], this._modules.root), wr(this, h), n.forEach(function(m) {
    return m(r);
  });
}, Or = { state: { configurable: !0 } };
H.prototype.install = function(t, r) {
  t.provide(r || mi, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Di(t, this);
};
Or.state.get = function() {
  return this._state.data;
};
Or.state.set = function(e) {
  process.env.NODE_ENV !== "production" && Q(!1, "use store.replaceState() to explicit replace store state.");
};
H.prototype.commit = function(t, r, n) {
  var s = this, i = pt(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, h = this._mutations[a];
  if (!h) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + a);
    return;
  }
  this._withCommit(function() {
    h.forEach(function(p) {
      p(o);
    });
  }), this._subscribers.slice().forEach(function(m) {
    return m(l, s.state);
  }), process.env.NODE_ENV !== "production" && u && u.silent && console.warn(
    "[vuex] mutation type: " + a + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
H.prototype.dispatch = function(t, r) {
  var n = this, s = pt(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + i);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(h) {
      return h.before;
    }).forEach(function(h) {
      return h.before(o, n.state);
    });
  } catch (h) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(h));
  }
  var l = u.length > 1 ? Promise.all(u.map(function(h) {
    return h(a);
  })) : u[0](a);
  return new Promise(function(h, m) {
    l.then(function(p) {
      try {
        n._actionSubscribers.filter(function(v) {
          return v.after;
        }).forEach(function(v) {
          return v.after(o, n.state);
        });
      } catch (v) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(v));
      }
      h(p);
    }, function(p) {
      try {
        n._actionSubscribers.filter(function(v) {
          return v.error;
        }).forEach(function(v) {
          return v.error(o, n.state, p);
        });
      } catch (v) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(v));
      }
      m(p);
    });
  });
};
H.prototype.subscribe = function(t, r) {
  return Pn(t, this._subscribers, r);
};
H.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return Pn(n, this._actionSubscribers, r);
};
H.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && Q(typeof t == "function", "store.watch only accepts a function."), Nn(function() {
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
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (Q(Array.isArray(t), "module path must be a string or an Array."), Q(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), bt(this, this.state, t, this._modules.get(t), n.preserveState), wr(this, this.state);
};
H.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && Q(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = Sr(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), Cn(this);
};
H.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && Q(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
H.prototype.hotUpdate = function(t) {
  this._modules.update(t), Cn(this, !0);
};
H.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(H.prototype, Or);
function R(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ie(e) {
  return function t(r) {
    return arguments.length === 0 || R(r) ? t : e.apply(this, arguments);
  };
}
function De(e) {
  return function t(r, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return R(r) ? t : ie(function(s) {
          return e(r, s);
        });
      default:
        return R(r) && R(n) ? t : R(r) ? ie(function(s) {
          return e(s, n);
        }) : R(n) ? ie(function(s) {
          return e(r, s);
        }) : e(r, n);
    }
  };
}
function Hn(e) {
  return function t(r, n, s) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return R(r) ? t : De(function(i, a) {
          return e(r, i, a);
        });
      case 2:
        return R(r) && R(n) ? t : R(r) ? De(function(i, a) {
          return e(i, n, a);
        }) : R(n) ? De(function(i, a) {
          return e(r, i, a);
        }) : ie(function(i) {
          return e(r, n, i);
        });
      default:
        return R(r) && R(n) && R(s) ? t : R(r) && R(n) ? De(function(i, a) {
          return e(i, a, s);
        }) : R(r) && R(s) ? De(function(i, a) {
          return e(i, n, a);
        }) : R(n) && R(s) ? De(function(i, a) {
          return e(r, i, a);
        }) : R(r) ? ie(function(i) {
          return e(i, n, s);
        }) : R(n) ? ie(function(i) {
          return e(r, i, s);
        }) : R(s) ? ie(function(i) {
          return e(r, n, i);
        }) : e(r, n, s);
    }
  };
}
const Ci = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function Ai(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var Li = /* @__PURE__ */ De(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const ve = Li;
var Ii = /* @__PURE__ */ Hn(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const Fi = Ii, Qr = Number.isInteger || function(t) {
  return t << 0 === t;
};
var Ui = /* @__PURE__ */ ie(function(t) {
  return t == null;
});
const ji = Ui;
var Wi = /* @__PURE__ */ Hn(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !ji(n) && Ai(s, n) ? n[s] : Qr(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (Qr(s) && Ci(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return Fi(s, r, n);
});
const Ce = Wi;
function Vi(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var Hi = /* @__PURE__ */ ie(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const $i = Hi;
function $n(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? $n(e[l], t, r, !0) : e[l];
    return a;
  };
  switch ($i(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Vi(e);
    default:
      return e;
  }
}
var Gi = /* @__PURE__ */ ie(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : $n(t, [], [], !0);
});
const qi = Gi;
function Bi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var br = { exports: {} }, Gn = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, zi = Gn, Ye = Object.prototype.toString;
function kr(e) {
  return Ye.call(e) === "[object Array]";
}
function cr(e) {
  return typeof e > "u";
}
function Zi(e) {
  return e !== null && !cr(e) && e.constructor !== null && !cr(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function Ji(e) {
  return Ye.call(e) === "[object ArrayBuffer]";
}
function Ki(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Qi(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function Xi(e) {
  return typeof e == "string";
}
function ea(e) {
  return typeof e == "number";
}
function qn(e) {
  return e !== null && typeof e == "object";
}
function ct(e) {
  if (Ye.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function ta(e) {
  return Ye.call(e) === "[object Date]";
}
function ra(e) {
  return Ye.call(e) === "[object File]";
}
function na(e) {
  return Ye.call(e) === "[object Blob]";
}
function Bn(e) {
  return Ye.call(e) === "[object Function]";
}
function sa(e) {
  return qn(e) && Bn(e.pipe);
}
function ia(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function aa(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function oa() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Dr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), kr(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function fr() {
  var e = {};
  function t(s, i) {
    ct(e[i]) && ct(s) ? e[i] = fr(e[i], s) : ct(s) ? e[i] = fr({}, s) : kr(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Dr(arguments[r], t);
  return e;
}
function ua(e, t, r) {
  return Dr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = zi(s, r) : e[i] = s;
  }), e;
}
function la(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var q = {
  isArray: kr,
  isArrayBuffer: Ji,
  isBuffer: Zi,
  isFormData: Ki,
  isArrayBufferView: Qi,
  isString: Xi,
  isNumber: ea,
  isObject: qn,
  isPlainObject: ct,
  isUndefined: cr,
  isDate: ta,
  isFile: ra,
  isBlob: na,
  isFunction: Bn,
  isStream: sa,
  isURLSearchParams: ia,
  isStandardBrowserEnv: oa,
  forEach: Dr,
  merge: fr,
  extend: ua,
  trim: aa,
  stripBOM: la
}, Ae = q;
function Xr(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var zn = function(t, r, n) {
  if (!r)
    return t;
  var s;
  if (n)
    s = n(r);
  else if (Ae.isURLSearchParams(r))
    s = r.toString();
  else {
    var i = [];
    Ae.forEach(r, function(u, l) {
      u === null || typeof u > "u" || (Ae.isArray(u) ? l = l + "[]" : u = [u], Ae.forEach(u, function(m) {
        Ae.isDate(m) ? m = m.toISOString() : Ae.isObject(m) && (m = JSON.stringify(m)), i.push(Xr(l) + "=" + Xr(m));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, ca = q;
function kt() {
  this.handlers = [];
}
kt.prototype.use = function(t, r, n) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: n ? n.synchronous : !1,
    runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1;
};
kt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
kt.prototype.forEach = function(t) {
  ca.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var fa = kt, da = q, ha = function(t, r) {
  da.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, Zn = function(t, r, n, s, i) {
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
}, Vt, en;
function Jn() {
  if (en)
    return Vt;
  en = 1;
  var e = Zn;
  return Vt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Vt;
}
var Ht, tn;
function ma() {
  if (tn)
    return Ht;
  tn = 1;
  var e = Jn();
  return Ht = function(r, n, s) {
    var i = s.config.validateStatus;
    !s.status || !i || i(s.status) ? r(s) : n(e(
      "Request failed with status code " + s.status,
      s.config,
      null,
      s.request,
      s
    ));
  }, Ht;
}
var $t, rn;
function pa() {
  if (rn)
    return $t;
  rn = 1;
  var e = q;
  return $t = e.isStandardBrowserEnv() ? (
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
  ), $t;
}
var Gt, nn;
function _a() {
  return nn || (nn = 1, Gt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Gt;
}
var qt, sn;
function ya() {
  return sn || (sn = 1, qt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), qt;
}
var Bt, an;
function va() {
  if (an)
    return Bt;
  an = 1;
  var e = _a(), t = ya();
  return Bt = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, Bt;
}
var zt, on;
function ga() {
  if (on)
    return zt;
  on = 1;
  var e = q, t = [
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
  return zt = function(n) {
    var s = {}, i, a, o;
    return n && e.forEach(n.split(`
`), function(l) {
      if (o = l.indexOf(":"), i = e.trim(l.substr(0, o)).toLowerCase(), a = e.trim(l.substr(o + 1)), i) {
        if (s[i] && t.indexOf(i) >= 0)
          return;
        i === "set-cookie" ? s[i] = (s[i] ? s[i] : []).concat([a]) : s[i] = s[i] ? s[i] + ", " + a : a;
      }
    }), s;
  }, zt;
}
var Zt, un;
function wa() {
  if (un)
    return Zt;
  un = 1;
  var e = q;
  return Zt = e.isStandardBrowserEnv() ? (
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
  ), Zt;
}
var Jt, ln;
function cn() {
  if (ln)
    return Jt;
  ln = 1;
  var e = q, t = ma(), r = pa(), n = zn, s = va(), i = ga(), a = wa(), o = Jn();
  return Jt = function(l) {
    return new Promise(function(m, p) {
      var v = l.data, N = l.headers, Oe = l.responseType;
      e.isFormData(v) && delete N["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var Ut = l.auth.username || "", jt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        N.Authorization = "Basic " + btoa(Ut + ":" + jt);
      }
      var nt = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(nt, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function st() {
        if (w) {
          var g = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !Oe || Oe === "text" || Oe === "json" ? w.responseText : w.response, $ = {
            data: S,
            status: w.status,
            statusText: w.statusText,
            headers: g,
            config: l,
            request: w
          };
          t(m, p, $), w = null;
        }
      }
      if ("onloadend" in w ? w.onloadend = st : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(st);
      }, w.onabort = function() {
        w && (p(o("Request aborted", l, "ECONNABORTED", w)), w = null);
      }, w.onerror = function() {
        p(o("Network Error", l, null, w)), w = null;
      }, w.ontimeout = function() {
        var S = "timeout of " + l.timeout + "ms exceeded";
        l.timeoutErrorMessage && (S = l.timeoutErrorMessage), p(o(
          S,
          l,
          l.transitional && l.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          w
        )), w = null;
      }, e.isStandardBrowserEnv()) {
        var _ = (l.withCredentials || a(nt)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        _ && (N[l.xsrfHeaderName] = _);
      }
      "setRequestHeader" in w && e.forEach(N, function(S, $) {
        typeof v > "u" && $.toLowerCase() === "content-type" ? delete N[$] : w.setRequestHeader($, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), Oe && Oe !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), p(S), w = null);
      }), v || (v = null), w.send(v);
    });
  }, Jt;
}
var A = q, fn = ha, Sa = Zn, Oa = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function dn(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function ba() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = cn()), e;
}
function ka(e, t, r) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
var Dt = {
  transitional: {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  adapter: ba(),
  transformRequest: [function(t, r) {
    return fn(r, "Accept"), fn(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (dn(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (dn(r, "application/json"), ka(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Sa(a, this, "E_JSON_PARSE") : a;
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
Dt.headers = {
  common: {
    Accept: "application/json, text/plain, */*"
  }
};
A.forEach(["delete", "get", "head"], function(t) {
  Dt.headers[t] = {};
});
A.forEach(["post", "put", "patch"], function(t) {
  Dt.headers[t] = A.merge(Oa);
});
var Mr = Dt, Da = q, Ma = Mr, xa = function(t, r, n) {
  var s = this || Ma;
  return Da.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, Kt, hn;
function Kn() {
  return hn || (hn = 1, Kt = function(t) {
    return !!(t && t.__CANCEL__);
  }), Kt;
}
var mn = q, Qt = xa, Ta = Kn(), Ea = Mr;
function Xt(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Ya = function(t) {
  Xt(t), t.headers = t.headers || {}, t.data = Qt.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = mn.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), mn.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete t.headers[s];
    }
  );
  var r = t.adapter || Ea.adapter;
  return r(t).then(function(s) {
    return Xt(t), s.data = Qt.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return Ta(s) || (Xt(t), s && s.response && (s.response.data = Qt.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, L = q, Qn = function(t, r) {
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
  function u(p, v) {
    return L.isPlainObject(p) && L.isPlainObject(v) ? L.merge(p, v) : L.isPlainObject(v) ? L.merge({}, v) : L.isArray(v) ? v.slice() : v;
  }
  function l(p) {
    L.isUndefined(r[p]) ? L.isUndefined(t[p]) || (n[p] = u(void 0, t[p])) : n[p] = u(t[p], r[p]);
  }
  L.forEach(s, function(v) {
    L.isUndefined(r[v]) || (n[v] = u(void 0, r[v]));
  }), L.forEach(i, l), L.forEach(a, function(v) {
    L.isUndefined(r[v]) ? L.isUndefined(t[v]) || (n[v] = u(void 0, t[v])) : n[v] = u(void 0, r[v]);
  }), L.forEach(o, function(v) {
    v in r ? n[v] = u(t[v], r[v]) : v in t && (n[v] = u(void 0, t[v]));
  });
  var h = s.concat(i).concat(a).concat(o), m = Object.keys(t).concat(Object.keys(r)).filter(function(v) {
    return h.indexOf(v) === -1;
  });
  return L.forEach(m, l), n;
};
const Na = "axios", Ra = "0.21.4", Pa = "Promise based HTTP client for the browser and node.js", Ca = "index.js", Aa = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, La = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, Ia = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], Fa = "Matt Zabriskie", Ua = "MIT", ja = {
  url: "https://github.com/axios/axios/issues"
}, Wa = "https://axios-http.com", Va = {
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
}, Ha = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, $a = "dist/axios.min.js", Ga = "dist/axios.min.js", qa = "./index.d.ts", Ba = {
  "follow-redirects": "^1.14.0"
}, za = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], Za = {
  name: Na,
  version: Ra,
  description: Pa,
  main: Ca,
  scripts: Aa,
  repository: La,
  keywords: Ia,
  author: Fa,
  license: Ua,
  bugs: ja,
  homepage: Wa,
  devDependencies: Va,
  browser: Ha,
  jsdelivr: $a,
  unpkg: Ga,
  typings: qa,
  dependencies: Ba,
  bundlesize: za
};
var Xn = Za, xr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  xr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var pn = {}, Ja = Xn.version.split(".");
function es(e, t) {
  for (var r = t ? t.split(".") : Ja, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
xr.transitional = function(t, r, n) {
  var s = r && es(r);
  function i(a, o) {
    return "[Axios v" + Xn.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !pn[o] && (pn[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, o, u) : !0;
  };
};
function Ka(e, t, r) {
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
var Qa = {
  isOlderVersion: es,
  assertOptions: Ka,
  validators: xr
}, ts = q, Xa = zn, _n = fa, yn = Ya, Mt = Qn, rs = Qa, Le = rs.validators;
function Qe(e) {
  this.defaults = e, this.interceptors = {
    request: new _n(),
    response: new _n()
  };
}
Qe.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Mt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && rs.assertOptions(r, {
    silentJSONParsing: Le.transitional(Le.boolean, "1.0.0"),
    forcedJSONParsing: Le.transitional(Le.boolean, "1.0.0"),
    clarifyTimeoutError: Le.transitional(Le.boolean, "1.0.0")
  }, !1);
  var n = [], s = !0;
  this.interceptors.request.forEach(function(p) {
    typeof p.runWhen == "function" && p.runWhen(t) === !1 || (s = s && p.synchronous, n.unshift(p.fulfilled, p.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(p) {
    i.push(p.fulfilled, p.rejected);
  });
  var a;
  if (!s) {
    var o = [yn, void 0];
    for (Array.prototype.unshift.apply(o, n), o = o.concat(i), a = Promise.resolve(t); o.length; )
      a = a.then(o.shift(), o.shift());
    return a;
  }
  for (var u = t; n.length; ) {
    var l = n.shift(), h = n.shift();
    try {
      u = l(u);
    } catch (m) {
      h(m);
      break;
    }
  }
  try {
    a = yn(u);
  } catch (m) {
    return Promise.reject(m);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
Qe.prototype.getUri = function(t) {
  return t = Mt(this.defaults, t), Xa(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
ts.forEach(["delete", "get", "head", "options"], function(t) {
  Qe.prototype[t] = function(r, n) {
    return this.request(Mt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
ts.forEach(["post", "put", "patch"], function(t) {
  Qe.prototype[t] = function(r, n, s) {
    return this.request(Mt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var eo = Qe, er, vn;
function ns() {
  if (vn)
    return er;
  vn = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, er = e, er;
}
var tr, gn;
function to() {
  if (gn)
    return tr;
  gn = 1;
  var e = ns();
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
  }, tr = t, tr;
}
var rr, wn;
function ro() {
  return wn || (wn = 1, rr = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), rr;
}
var nr, Sn;
function no() {
  return Sn || (Sn = 1, nr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), nr;
}
var On = q, so = Gn, ft = eo, io = Qn, ao = Mr;
function ss(e) {
  var t = new ft(e), r = so(ft.prototype.request, t);
  return On.extend(r, ft.prototype, t), On.extend(r, t), r;
}
var X = ss(ao);
X.Axios = ft;
X.create = function(t) {
  return ss(io(X.defaults, t));
};
X.Cancel = ns();
X.CancelToken = to();
X.isCancel = Kn();
X.all = function(t) {
  return Promise.all(t);
};
X.spread = ro();
X.isAxiosError = no();
br.exports = X;
br.exports.default = X;
var oo = br.exports, uo = oo;
const be = /* @__PURE__ */ Bi(uo);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var is;
function f() {
  return is.apply(null, arguments);
}
function lo(e) {
  is = e;
}
function ee(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function xe(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function D(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Tr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (D(e, t))
      return !1;
  return !0;
}
function V(e) {
  return e === void 0;
}
function pe(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function Xe(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function as(e, t) {
  var r = [], n, s = e.length;
  for (n = 0; n < s; ++n)
    r.push(t(e[n], n));
  return r;
}
function ge(e, t) {
  for (var r in t)
    D(t, r) && (e[r] = t[r]);
  return D(t, "toString") && (e.toString = t.toString), D(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function oe(e, t, r, n) {
  return Ys(e, t, r, n, !0).utc();
}
function co() {
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
function O(e) {
  return e._pf == null && (e._pf = co()), e._pf;
}
var dr;
Array.prototype.some ? dr = Array.prototype.some : dr = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Er(e) {
  if (e._isValid == null) {
    var t = O(e), r = dr.call(t.parsedDateParts, function(s) {
      return s != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function xt(e) {
  var t = oe(NaN);
  return e != null ? ge(O(t), e) : O(t).userInvalidated = !0, t;
}
var bn = f.momentProperties = [], sr = !1;
function Yr(e, t) {
  var r, n, s, i = bn.length;
  if (V(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), V(t._i) || (e._i = t._i), V(t._f) || (e._f = t._f), V(t._l) || (e._l = t._l), V(t._strict) || (e._strict = t._strict), V(t._tzm) || (e._tzm = t._tzm), V(t._isUTC) || (e._isUTC = t._isUTC), V(t._offset) || (e._offset = t._offset), V(t._pf) || (e._pf = O(t)), V(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = bn[r], s = t[n], V(s) || (e[n] = s);
  return e;
}
function et(e) {
  Yr(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), sr === !1 && (sr = !0, f.updateOffset(this), sr = !1);
}
function te(e) {
  return e instanceof et || e != null && e._isAMomentObject != null;
}
function os(e) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Z(e, t) {
  var r = !0;
  return ge(function() {
    if (f.deprecationHandler != null && f.deprecationHandler(null, e), r) {
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
      os(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var kn = {};
function us(e, t) {
  f.deprecationHandler != null && f.deprecationHandler(e, t), kn[e] || (os(t), kn[e] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function ue(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function fo(e) {
  var t, r;
  for (r in e)
    D(e, r) && (t = e[r], ue(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function hr(e, t) {
  var r = ge({}, e), n;
  for (n in t)
    D(t, n) && (xe(e[n]) && xe(t[n]) ? (r[n] = {}, ge(r[n], e[n]), ge(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    D(e, n) && !D(t, n) && xe(e[n]) && (r[n] = ge({}, r[n]));
  return r;
}
function Nr(e) {
  e != null && this.set(e);
}
var mr;
Object.keys ? mr = Object.keys : mr = function(e) {
  var t, r = [];
  for (t in e)
    D(e, t) && r.push(t);
  return r;
};
var ho = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function mo(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return ue(n) ? n.call(t, r) : n;
}
function ae(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var Rr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ot = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, ir = {}, je = {};
function y(e, t, r, n) {
  var s = n;
  typeof n == "string" && (s = function() {
    return this[n]();
  }), e && (je[e] = s), t && (je[t[0]] = function() {
    return ae(s.apply(this, arguments), t[1], t[2]);
  }), r && (je[r] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function po(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function _o(e) {
  var t = e.match(Rr), r, n;
  for (r = 0, n = t.length; r < n; r++)
    je[t[r]] ? t[r] = je[t[r]] : t[r] = po(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += ue(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function dt(e, t) {
  return e.isValid() ? (t = ls(t, e.localeData()), ir[t] = ir[t] || _o(t), ir[t](e)) : e.localeData().invalidDate();
}
function ls(e, t) {
  var r = 5;
  function n(s) {
    return t.longDateFormat(s) || s;
  }
  for (ot.lastIndex = 0; r >= 0 && ot.test(e); )
    e = e.replace(
      ot,
      n
    ), ot.lastIndex = 0, r -= 1;
  return e;
}
var yo = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function vo(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Rr).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var go = "Invalid date";
function wo() {
  return this._invalidDate;
}
var So = "%d", Oo = /\d{1,2}/;
function bo(e) {
  return this._ordinal.replace("%d", e);
}
var ko = {
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
function Do(e, t, r, n) {
  var s = this._relativeTime[r];
  return ue(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function Mo(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return ue(r) ? r(t) : r.replace(/%s/i, t);
}
var Be = {};
function j(e, t) {
  var r = e.toLowerCase();
  Be[r] = Be[r + "s"] = Be[t] = e;
}
function J(e) {
  return typeof e == "string" ? Be[e] || Be[e.toLowerCase()] : void 0;
}
function Pr(e) {
  var t = {}, r, n;
  for (n in e)
    D(e, n) && (r = J(n), r && (t[r] = e[n]));
  return t;
}
var cs = {};
function W(e, t) {
  cs[e] = t;
}
function xo(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: cs[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function Tt(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function z(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function b(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = z(t)), r;
}
function He(e, t) {
  return function(r) {
    return r != null ? (fs(this, e, r), f.updateOffset(this, t), this) : _t(this, e);
  };
}
function _t(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function fs(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && Tt(e.year()) && e.month() === 1 && e.date() === 29 ? (r = b(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Ct(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function To(e) {
  return e = J(e), ue(this[e]) ? this[e]() : this;
}
function Eo(e, t) {
  if (typeof e == "object") {
    e = Pr(e);
    var r = xo(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = J(e), ue(this[e]))
    return this[e](t);
  return this;
}
var ds = /\d/, B = /\d\d/, hs = /\d{3}/, Cr = /\d{4}/, Et = /[+-]?\d{6}/, E = /\d\d?/, ms = /\d\d\d\d?/, ps = /\d\d\d\d\d\d?/, Yt = /\d{1,3}/, Ar = /\d{1,4}/, Nt = /[+-]?\d{1,6}/, $e = /\d+/, Rt = /[+-]?\d+/, Yo = /Z|[+-]\d\d:?\d\d/gi, Pt = /Z|[+-]\d\d(?::?\d\d)?/gi, No = /[+-]?\d+(\.\d{1,3})?/, tt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, yt;
yt = {};
function d(e, t, r) {
  yt[e] = ue(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function Ro(e, t) {
  return D(yt, e) ? yt[e](t._strict, t._locale) : new RegExp(Po(e));
}
function Po(e) {
  return G(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, n, s, i) {
        return r || n || s || i;
      }
    )
  );
}
function G(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var pr = {};
function x(e, t) {
  var r, n = t, s;
  for (typeof e == "string" && (e = [e]), pe(t) && (n = function(i, a) {
    a[t] = b(i);
  }), s = e.length, r = 0; r < s; r++)
    pr[e[r]] = n;
}
function rt(e, t) {
  x(e, function(r, n, s, i) {
    s._w = s._w || {}, t(r, s._w, s, i);
  });
}
function Co(e, t, r) {
  t != null && D(pr, e) && pr[e](t, r._a, r, e);
}
var U = 0, de = 1, se = 2, C = 3, K = 4, he = 5, Me = 6, Ao = 7, Lo = 8;
function Io(e, t) {
  return (e % t + t) % t;
}
var P;
Array.prototype.indexOf ? P = Array.prototype.indexOf : P = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Ct(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = Io(t, 12);
  return e += (t - r) / 12, r === 1 ? Tt(e) ? 29 : 28 : 31 - r % 7 % 2;
}
y("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
y("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
y("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
j("month", "M");
W("month", 8);
d("M", E);
d("MM", E, B);
d("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
d("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
x(["M", "MM"], function(e, t) {
  t[de] = b(e) - 1;
});
x(["MMM", "MMMM"], function(e, t, r, n) {
  var s = r._locale.monthsParse(e, n, r._strict);
  s != null ? t[de] = s : O(r).invalidMonth = e;
});
var Fo = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), _s = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), ys = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Uo = tt, jo = tt;
function Wo(e, t) {
  return e ? ee(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || ys).test(t) ? "format" : "standalone"][e.month()] : ee(this._months) ? this._months : this._months.standalone;
}
function Vo(e, t) {
  return e ? ee(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[ys.test(t) ? "format" : "standalone"][e.month()] : ee(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Ho(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = oe([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = P.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = P.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = P.call(this._shortMonthsParse, a), s !== -1 ? s : (s = P.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = P.call(this._longMonthsParse, a), s !== -1 ? s : (s = P.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function $o(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return Ho.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (s = oe([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
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
function vs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = b(t);
    else if (t = e.localeData().monthsParse(t), !pe(t))
      return e;
  }
  return r = Math.min(e.date(), Ct(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function gs(e) {
  return e != null ? (vs(this, e), f.updateOffset(this, !0), this) : _t(this, "Month");
}
function Go() {
  return Ct(this.year(), this.month());
}
function qo(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || ws.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = Uo), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Bo(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || ws.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = jo), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function ws() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], n = [], s, i;
  for (s = 0; s < 12; s++)
    i = oe([2e3, s]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
  for (t.sort(e), r.sort(e), n.sort(e), s = 0; s < 12; s++)
    t[s] = G(t[s]), r[s] = G(r[s]);
  for (s = 0; s < 24; s++)
    n[s] = G(n[s]);
  this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
y("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? ae(e, 4) : "+" + e;
});
y(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
y(0, ["YYYY", 4], 0, "year");
y(0, ["YYYYY", 5], 0, "year");
y(0, ["YYYYYY", 6, !0], 0, "year");
j("year", "y");
W("year", 1);
d("Y", Rt);
d("YY", E, B);
d("YYYY", Ar, Cr);
d("YYYYY", Nt, Et);
d("YYYYYY", Nt, Et);
x(["YYYYY", "YYYYYY"], U);
x("YYYY", function(e, t) {
  t[U] = e.length === 2 ? f.parseTwoDigitYear(e) : b(e);
});
x("YY", function(e, t) {
  t[U] = f.parseTwoDigitYear(e);
});
x("Y", function(e, t) {
  t[U] = parseInt(e, 10);
});
function ze(e) {
  return Tt(e) ? 366 : 365;
}
f.parseTwoDigitYear = function(e) {
  return b(e) + (b(e) > 68 ? 1900 : 2e3);
};
var Ss = He("FullYear", !0);
function zo() {
  return Tt(this.year());
}
function Zo(e, t, r, n, s, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, n, s, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, n, s, i, a), o;
}
function Ze(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function vt(e, t, r) {
  var n = 7 + t - r, s = (7 + Ze(e, 0, n).getUTCDay() - t) % 7;
  return -s + n - 1;
}
function Os(e, t, r, n, s) {
  var i = (7 + r - n) % 7, a = vt(e, n, s), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = ze(u) + o) : o > ze(e) ? (u = e + 1, l = o - ze(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function Je(e, t, r) {
  var n = vt(e.year(), t, r), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return s < 1 ? (a = e.year() - 1, i = s + me(a, t, r)) : s > me(e.year(), t, r) ? (i = s - me(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = s), {
    week: i,
    year: a
  };
}
function me(e, t, r) {
  var n = vt(e, t, r), s = vt(e + 1, t, r);
  return (ze(e) - n + s) / 7;
}
y("w", ["ww", 2], "wo", "week");
y("W", ["WW", 2], "Wo", "isoWeek");
j("week", "w");
j("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
d("w", E);
d("ww", E, B);
d("W", E);
d("WW", E, B);
rt(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = b(e);
  }
);
function Jo(e) {
  return Je(e, this._week.dow, this._week.doy).week;
}
var Ko = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function Qo() {
  return this._week.dow;
}
function Xo() {
  return this._week.doy;
}
function eu(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function tu(e) {
  var t = Je(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
y("d", 0, "do", "day");
y("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
y("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
y("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
y("e", 0, 0, "weekday");
y("E", 0, 0, "isoWeekday");
j("day", "d");
j("weekday", "e");
j("isoWeekday", "E");
W("day", 11);
W("weekday", 11);
W("isoWeekday", 11);
d("d", E);
d("e", E);
d("E", E);
d("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
d("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
d("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
rt(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : O(r).invalidWeekday = e;
});
rt(["d", "e", "E"], function(e, t, r, n) {
  t[n] = b(e);
});
function ru(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function nu(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Lr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var su = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), bs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), iu = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), au = tt, ou = tt, uu = tt;
function lu(e, t) {
  var r = ee(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Lr(r, this._week.dow) : e ? r[e.day()] : r;
}
function cu(e) {
  return e === !0 ? Lr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function fu(e) {
  return e === !0 ? Lr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function du(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      i = oe([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (s = P.call(this._weekdaysParse, a), s !== -1 ? s : null) : t === "ddd" ? (s = P.call(this._shortWeekdaysParse, a), s !== -1 ? s : null) : (s = P.call(this._minWeekdaysParse, a), s !== -1 ? s : null) : t === "dddd" ? (s = P.call(this._weekdaysParse, a), s !== -1 || (s = P.call(this._shortWeekdaysParse, a), s !== -1) ? s : (s = P.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : t === "ddd" ? (s = P.call(this._shortWeekdaysParse, a), s !== -1 || (s = P.call(this._weekdaysParse, a), s !== -1) ? s : (s = P.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : (s = P.call(this._minWeekdaysParse, a), s !== -1 || (s = P.call(this._weekdaysParse, a), s !== -1) ? s : (s = P.call(this._shortWeekdaysParse, a), s !== -1 ? s : null));
}
function hu(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return du.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (s = oe([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
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
function mu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = ru(e, this.localeData()), this.add(e - t, "d")) : t;
}
function pu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function _u(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = nu(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function yu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Ir.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = au), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function vu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Ir.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ou), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function gu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Ir.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = uu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Ir() {
  function e(h, m) {
    return m.length - h.length;
  }
  var t = [], r = [], n = [], s = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = oe([2e3, 1]).day(i), o = G(this.weekdaysMin(a, "")), u = G(this.weekdaysShort(a, "")), l = G(this.weekdays(a, "")), t.push(o), r.push(u), n.push(l), s.push(o), s.push(u), s.push(l);
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
function Fr() {
  return this.hours() % 12 || 12;
}
function wu() {
  return this.hours() || 24;
}
y("H", ["HH", 2], 0, "hour");
y("h", ["hh", 2], 0, Fr);
y("k", ["kk", 2], 0, wu);
y("hmm", 0, 0, function() {
  return "" + Fr.apply(this) + ae(this.minutes(), 2);
});
y("hmmss", 0, 0, function() {
  return "" + Fr.apply(this) + ae(this.minutes(), 2) + ae(this.seconds(), 2);
});
y("Hmm", 0, 0, function() {
  return "" + this.hours() + ae(this.minutes(), 2);
});
y("Hmmss", 0, 0, function() {
  return "" + this.hours() + ae(this.minutes(), 2) + ae(this.seconds(), 2);
});
function ks(e, t) {
  y(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
ks("a", !0);
ks("A", !1);
j("hour", "h");
W("hour", 13);
function Ds(e, t) {
  return t._meridiemParse;
}
d("a", Ds);
d("A", Ds);
d("H", E);
d("h", E);
d("k", E);
d("HH", E, B);
d("hh", E, B);
d("kk", E, B);
d("hmm", ms);
d("hmmss", ps);
d("Hmm", ms);
d("Hmmss", ps);
x(["H", "HH"], C);
x(["k", "kk"], function(e, t, r) {
  var n = b(e);
  t[C] = n === 24 ? 0 : n;
});
x(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
x(["h", "hh"], function(e, t, r) {
  t[C] = b(e), O(r).bigHour = !0;
});
x("hmm", function(e, t, r) {
  var n = e.length - 2;
  t[C] = b(e.substr(0, n)), t[K] = b(e.substr(n)), O(r).bigHour = !0;
});
x("hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[C] = b(e.substr(0, n)), t[K] = b(e.substr(n, 2)), t[he] = b(e.substr(s)), O(r).bigHour = !0;
});
x("Hmm", function(e, t, r) {
  var n = e.length - 2;
  t[C] = b(e.substr(0, n)), t[K] = b(e.substr(n));
});
x("Hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[C] = b(e.substr(0, n)), t[K] = b(e.substr(n, 2)), t[he] = b(e.substr(s));
});
function Su(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Ou = /[ap]\.?m?\.?/i, bu = He("Hours", !0);
function ku(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Ms = {
  calendar: ho,
  longDateFormat: yo,
  invalidDate: go,
  ordinal: So,
  dayOfMonthOrdinalParse: Oo,
  relativeTime: ko,
  months: Fo,
  monthsShort: _s,
  week: Ko,
  weekdays: su,
  weekdaysMin: iu,
  weekdaysShort: bs,
  meridiemParse: Ou
}, Y = {}, Ge = {}, Ke;
function Du(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function Dn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Mu(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = Dn(e[t]).split("-"), r = i.length, n = Dn(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = At(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && Du(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return Ke;
}
function xu(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function At(e) {
  var t = null, r;
  if (Y[e] === void 0 && typeof module < "u" && module && module.exports && xu(e))
    try {
      t = Ke._abbr, r = require, r("./locale/" + e), Se(t);
    } catch {
      Y[e] = null;
    }
  return Y[e];
}
function Se(e, t) {
  var r;
  return e && (V(t) ? r = _e(e) : r = Ur(e, t), r ? Ke = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), Ke._abbr;
}
function Ur(e, t) {
  if (t !== null) {
    var r, n = Ms;
    if (t.abbr = e, Y[e] != null)
      us(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Y[e]._config;
    else if (t.parentLocale != null)
      if (Y[t.parentLocale] != null)
        n = Y[t.parentLocale]._config;
      else if (r = At(t.parentLocale), r != null)
        n = r._config;
      else
        return Ge[t.parentLocale] || (Ge[t.parentLocale] = []), Ge[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return Y[e] = new Nr(hr(n, t)), Ge[e] && Ge[e].forEach(function(s) {
      Ur(s.name, s.config);
    }), Se(e), Y[e];
  } else
    return delete Y[e], null;
}
function Tu(e, t) {
  if (t != null) {
    var r, n, s = Ms;
    Y[e] != null && Y[e].parentLocale != null ? Y[e].set(hr(Y[e]._config, t)) : (n = At(e), n != null && (s = n._config), t = hr(s, t), n == null && (t.abbr = e), r = new Nr(t), r.parentLocale = Y[e], Y[e] = r), Se(e);
  } else
    Y[e] != null && (Y[e].parentLocale != null ? (Y[e] = Y[e].parentLocale, e === Se() && Se(e)) : Y[e] != null && delete Y[e]);
  return Y[e];
}
function _e(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return Ke;
  if (!ee(e)) {
    if (t = At(e), t)
      return t;
    e = [e];
  }
  return Mu(e);
}
function Eu() {
  return mr(Y);
}
function jr(e) {
  var t, r = e._a;
  return r && O(e).overflow === -2 && (t = r[de] < 0 || r[de] > 11 ? de : r[se] < 1 || r[se] > Ct(r[U], r[de]) ? se : r[C] < 0 || r[C] > 24 || r[C] === 24 && (r[K] !== 0 || r[he] !== 0 || r[Me] !== 0) ? C : r[K] < 0 || r[K] > 59 ? K : r[he] < 0 || r[he] > 59 ? he : r[Me] < 0 || r[Me] > 999 ? Me : -1, O(e)._overflowDayOfYear && (t < U || t > se) && (t = se), O(e)._overflowWeeks && t === -1 && (t = Ao), O(e)._overflowWeekday && t === -1 && (t = Lo), O(e).overflow = t), e;
}
var Yu = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Nu = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ru = /Z|[+-]\d\d(?::?\d\d)?/, ut = [
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
], ar = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], Pu = /^\/?Date\((-?\d+)/i, Cu = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Au = {
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
function xs(e) {
  var t, r, n = e._i, s = Yu.exec(n) || Nu.exec(n), i, a, o, u, l = ut.length, h = ar.length;
  if (s) {
    for (O(e).iso = !0, t = 0, r = l; t < r; t++)
      if (ut[t][1].exec(s[1])) {
        a = ut[t][0], i = ut[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, r = h; t < r; t++)
        if (ar[t][1].exec(s[3])) {
          o = (s[2] || " ") + ar[t][0];
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
      if (Ru.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Vr(e);
  } else
    e._isValid = !1;
}
function Lu(e, t, r, n, s, i) {
  var a = [
    Iu(e),
    _s.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function Iu(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Fu(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Uu(e, t, r) {
  if (e) {
    var n = bs.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return O(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function ju(e, t, r) {
  if (e)
    return Au[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function Ts(e) {
  var t = Cu.exec(Fu(e._i)), r;
  if (t) {
    if (r = Lu(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Uu(t[1], r, e))
      return;
    e._a = r, e._tzm = ju(t[8], t[9], t[10]), e._d = Ze.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), O(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Wu(e) {
  var t = Pu.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (xs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Ts(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : f.createFromInputFallback(e);
}
f.createFromInputFallback = Z(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Fe(e, t, r) {
  return e ?? t ?? r;
}
function Vu(e) {
  var t = new Date(f.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Wr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = Vu(e), e._w && e._a[se] == null && e._a[de] == null && Hu(e), e._dayOfYear != null && (a = Fe(e._a[U], s[U]), (e._dayOfYear > ze(a) || e._dayOfYear === 0) && (O(e)._overflowDayOfYear = !0), r = Ze(a, 0, e._dayOfYear), e._a[de] = r.getUTCMonth(), e._a[se] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[C] === 24 && e._a[K] === 0 && e._a[he] === 0 && e._a[Me] === 0 && (e._nextDay = !0, e._a[C] = 0), e._d = (e._useUTC ? Ze : Zo).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[C] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (O(e).weekdayMismatch = !0);
  }
}
function Hu(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = Fe(
    t.GG,
    e._a[U],
    Je(T(), 1, 4).year
  ), n = Fe(t.W, 1), s = Fe(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = Je(T(), i, a), r = Fe(t.gg, e._a[U], l.year), n = Fe(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > me(r, i, a) ? O(e)._overflowWeeks = !0 : u != null ? O(e)._overflowWeekday = !0 : (o = Os(r, n, s, i, a), e._a[U] = o.year, e._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function Vr(e) {
  if (e._f === f.ISO_8601) {
    xs(e);
    return;
  }
  if (e._f === f.RFC_2822) {
    Ts(e);
    return;
  }
  e._a = [], O(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, h;
  for (s = ls(e._f, e._locale).match(Rr) || [], h = s.length, r = 0; r < h; r++)
    i = s[r], n = (t.match(Ro(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && O(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), je[i] ? (n ? O(e).empty = !1 : O(e).unusedTokens.push(i), Co(i, n, e)) : e._strict && !n && O(e).unusedTokens.push(i);
  O(e).charsLeftOver = o - u, t.length > 0 && O(e).unusedInput.push(t), e._a[C] <= 12 && O(e).bigHour === !0 && e._a[C] > 0 && (O(e).bigHour = void 0), O(e).parsedDateParts = e._a.slice(0), O(e).meridiem = e._meridiem, e._a[C] = $u(
    e._locale,
    e._a[C],
    e._meridiem
  ), l = O(e).era, l !== null && (e._a[U] = e._locale.erasConvertYear(l, e._a[U])), Wr(e), jr(e);
}
function $u(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function Gu(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    O(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = Yr({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Vr(t), Er(t) && (a = !0), i += O(t).charsLeftOver, i += O(t).unusedTokens.length * 10, O(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  ge(e, r || t);
}
function qu(e) {
  if (!e._d) {
    var t = Pr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = as(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), Wr(e);
  }
}
function Bu(e) {
  var t = new et(jr(Es(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Es(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || _e(e._l), t === null || r === void 0 && t === "" ? xt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), te(t) ? new et(jr(t)) : (Xe(t) ? e._d = t : ee(r) ? Gu(e) : r ? Vr(e) : zu(e), Er(e) || (e._d = null), e));
}
function zu(e) {
  var t = e._i;
  V(t) ? e._d = new Date(f.now()) : Xe(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Wu(e) : ee(t) ? (e._a = as(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Wr(e)) : xe(t) ? qu(e) : pe(t) ? e._d = new Date(t) : f.createFromInputFallback(e);
}
function Ys(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (xe(e) && Tr(e) || ee(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, Bu(i);
}
function T(e, t, r, n) {
  return Ys(e, t, r, n, !1);
}
var Zu = Z(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = T.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : xt();
  }
), Ju = Z(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = T.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : xt();
  }
);
function Ns(e, t) {
  var r, n;
  if (t.length === 1 && ee(t[0]) && (t = t[0]), !t.length)
    return T();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function Ku() {
  var e = [].slice.call(arguments, 0);
  return Ns("isBefore", e);
}
function Qu() {
  var e = [].slice.call(arguments, 0);
  return Ns("isAfter", e);
}
var Xu = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, qe = [
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
function el(e) {
  var t, r = !1, n, s = qe.length;
  for (t in e)
    if (D(e, t) && !(P.call(qe, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < s; ++n)
    if (e[qe[n]]) {
      if (r)
        return !1;
      parseFloat(e[qe[n]]) !== b(e[qe[n]]) && (r = !0);
    }
  return !0;
}
function tl() {
  return this._isValid;
}
function rl() {
  return ne(NaN);
}
function Lt(e) {
  var t = Pr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, h = t.millisecond || 0;
  this._isValid = el(t), this._milliseconds = +h + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = _e(), this._bubble();
}
function ht(e) {
  return e instanceof Lt;
}
function _r(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function nl(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && b(e[a]) !== b(t[a])) && i++;
  return i + s;
}
function Rs(e, t) {
  y(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + ae(~~(r / 60), 2) + t + ae(~~r % 60, 2);
  });
}
Rs("Z", ":");
Rs("ZZ", "");
d("Z", Pt);
d("ZZ", Pt);
x(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Hr(Pt, e);
});
var sl = /([\+\-]|\d\d)/gi;
function Hr(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(sl) || ["-", 0, 0], i = +(s[1] * 60) + b(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function $r(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (te(e) || Xe(e) ? e.valueOf() : T(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), f.updateOffset(r, !1), r) : T(e).local();
}
function yr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function il(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Hr(Pt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = yr(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? As(
      this,
      ne(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : yr(this);
}
function al(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function ol(e) {
  return this.utcOffset(0, e);
}
function ul(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(yr(this), "m")), this;
}
function ll() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Hr(Yo, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function cl(e) {
  return this.isValid() ? (e = e ? T(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function fl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function dl() {
  if (!V(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Yr(e, this), e = Es(e), e._a ? (t = e._isUTC ? oe(e._a) : T(e._a), this._isDSTShifted = this.isValid() && nl(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function hl() {
  return this.isValid() ? !this._isUTC : !1;
}
function ml() {
  return this.isValid() ? this._isUTC : !1;
}
function Ps() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var pl = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, _l = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ne(e, t) {
  var r = e, n = null, s, i, a;
  return ht(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : pe(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = pl.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: b(n[se]) * s,
    h: b(n[C]) * s,
    m: b(n[K]) * s,
    s: b(n[he]) * s,
    ms: b(_r(n[Me] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = _l.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: ke(n[2], s),
    M: ke(n[3], s),
    w: ke(n[4], s),
    d: ke(n[5], s),
    h: ke(n[6], s),
    m: ke(n[7], s),
    s: ke(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = yl(
    T(r.from),
    T(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new Lt(r), ht(e) && D(e, "_locale") && (i._locale = e._locale), ht(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
ne.fn = Lt.prototype;
ne.invalid = rl;
function ke(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Mn(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function yl(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = $r(t, e), e.isBefore(t) ? r = Mn(e, t) : (r = Mn(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function Cs(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (us(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ne(r, n), As(this, s, e), this;
  };
}
function As(e, t, r, n) {
  var s = t._milliseconds, i = _r(t._days), a = _r(t._months);
  e.isValid() && (n = n ?? !0, a && vs(e, _t(e, "Month") + a * r), i && fs(e, "Date", _t(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && f.updateOffset(e, i || a));
}
var vl = Cs(1, "add"), gl = Cs(-1, "subtract");
function Ls(e) {
  return typeof e == "string" || e instanceof String;
}
function wl(e) {
  return te(e) || Xe(e) || Ls(e) || pe(e) || Ol(e) || Sl(e) || e === null || e === void 0;
}
function Sl(e) {
  var t = xe(e) && !Tr(e), r = !1, n = [
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
function Ol(e) {
  var t = ee(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !pe(n) && Ls(e);
  }).length === 0), t && r;
}
function bl(e) {
  var t = xe(e) && !Tr(e), r = !1, n = [
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
function kl(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Dl(e, t) {
  arguments.length === 1 && (arguments[0] ? wl(arguments[0]) ? (e = arguments[0], t = void 0) : bl(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || T(), n = $r(r, this).startOf("day"), s = f.calendarFormat(this, n) || "sameElse", i = t && (ue(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, T(r))
  );
}
function Ml() {
  return new et(this);
}
function xl(e, t) {
  var r = te(e) ? e : T(e);
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Tl(e, t) {
  var r = te(e) ? e : T(e);
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function El(e, t, r, n) {
  var s = te(e) ? e : T(e), i = te(t) ? t : T(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Yl(e, t) {
  var r = te(e) ? e : T(e), n;
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function Nl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Rl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Pl(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = $r(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = J(t), t) {
    case "year":
      i = mt(this, n) / 12;
      break;
    case "month":
      i = mt(this, n);
      break;
    case "quarter":
      i = mt(this, n) / 3;
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
  return r ? i : z(i);
}
function mt(e, t) {
  if (e.date() < t.date())
    return -mt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Cl() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Al(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? dt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ue(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", dt(r, "Z")) : dt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Ll() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function Il(e) {
  e || (e = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var t = dt(this, e);
  return this.localeData().postformat(t);
}
function Fl(e, t) {
  return this.isValid() && (te(e) && e.isValid() || T(e).isValid()) ? ne({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Ul(e) {
  return this.from(T(), e);
}
function jl(e, t) {
  return this.isValid() && (te(e) && e.isValid() || T(e).isValid()) ? ne({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Wl(e) {
  return this.to(T(), e);
}
function Is(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = _e(e), t != null && (this._locale = t), this);
}
var Fs = Z(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Us() {
  return this._locale;
}
var gt = 1e3, We = 60 * gt, wt = 60 * We, js = (365 * 400 + 97) * 24 * wt;
function Ve(e, t) {
  return (e % t + t) % t;
}
function Ws(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - js : new Date(e, t, r).valueOf();
}
function Vs(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - js : Date.UTC(e, t, r);
}
function Vl(e) {
  var t, r;
  if (e = J(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Vs : Ws, e) {
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
      t = this._d.valueOf(), t -= Ve(
        t + (this._isUTC ? 0 : this.utcOffset() * We),
        wt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Ve(t, We);
      break;
    case "second":
      t = this._d.valueOf(), t -= Ve(t, gt);
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function Hl(e) {
  var t, r;
  if (e = J(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Vs : Ws, e) {
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
      t = this._d.valueOf(), t += wt - Ve(
        t + (this._isUTC ? 0 : this.utcOffset() * We),
        wt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += We - Ve(t, We) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += gt - Ve(t, gt) - 1;
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function $l() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Gl() {
  return Math.floor(this.valueOf() / 1e3);
}
function ql() {
  return new Date(this.valueOf());
}
function Bl() {
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
function zl() {
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
function Zl() {
  return this.isValid() ? this.toISOString() : null;
}
function Jl() {
  return Er(this);
}
function Kl() {
  return ge({}, O(this));
}
function Ql() {
  return O(this).overflow;
}
function Xl() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
y("N", 0, 0, "eraAbbr");
y("NN", 0, 0, "eraAbbr");
y("NNN", 0, 0, "eraAbbr");
y("NNNN", 0, 0, "eraName");
y("NNNNN", 0, 0, "eraNarrow");
y("y", ["y", 1], "yo", "eraYear");
y("y", ["yy", 2], 0, "eraYear");
y("y", ["yyy", 3], 0, "eraYear");
y("y", ["yyyy", 4], 0, "eraYear");
d("N", Gr);
d("NN", Gr);
d("NNN", Gr);
d("NNNN", cc);
d("NNNNN", fc);
x(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? O(r).era = s : O(r).invalidEra = e;
  }
);
d("y", $e);
d("yy", $e);
d("yyy", $e);
d("yyyy", $e);
d("yo", dc);
x(["y", "yy", "yyy", "yyyy"], U);
x(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[U] = r._locale.eraYearOrdinalParse(e, s) : t[U] = parseInt(e, 10);
});
function ec(e, t) {
  var r, n, s, i = this._eras || _e("en")._eras;
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
function tc(e, t, r) {
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
function rc(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? f(e.since).year() : f(e.since).year() + (t - e.offset) * r;
}
function nc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function sc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function ic() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function ac() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - f(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function oc(e) {
  return D(this, "_erasNameRegex") || qr.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function uc(e) {
  return D(this, "_erasAbbrRegex") || qr.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function lc(e) {
  return D(this, "_erasNarrowRegex") || qr.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Gr(e, t) {
  return t.erasAbbrRegex(e);
}
function cc(e, t) {
  return t.erasNameRegex(e);
}
function fc(e, t) {
  return t.erasNarrowRegex(e);
}
function dc(e, t) {
  return t._eraYearOrdinalRegex || $e;
}
function qr() {
  var e = [], t = [], r = [], n = [], s, i, a = this.eras();
  for (s = 0, i = a.length; s < i; ++s)
    t.push(G(a[s].name)), e.push(G(a[s].abbr)), r.push(G(a[s].narrow)), n.push(G(a[s].name)), n.push(G(a[s].abbr)), n.push(G(a[s].narrow));
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
y(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
y(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function It(e, t) {
  y(0, [e, e.length], 0, t);
}
It("gggg", "weekYear");
It("ggggg", "weekYear");
It("GGGG", "isoWeekYear");
It("GGGGG", "isoWeekYear");
j("weekYear", "gg");
j("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
d("G", Rt);
d("g", Rt);
d("GG", E, B);
d("gg", E, B);
d("GGGG", Ar, Cr);
d("gggg", Ar, Cr);
d("GGGGG", Nt, Et);
d("ggggg", Nt, Et);
rt(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = b(e);
  }
);
rt(["gg", "GG"], function(e, t, r, n) {
  t[n] = f.parseTwoDigitYear(e);
});
function hc(e) {
  return Hs.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function mc(e) {
  return Hs.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function pc() {
  return me(this.year(), 1, 4);
}
function _c() {
  return me(this.isoWeekYear(), 1, 4);
}
function yc() {
  var e = this.localeData()._week;
  return me(this.year(), e.dow, e.doy);
}
function vc() {
  var e = this.localeData()._week;
  return me(this.weekYear(), e.dow, e.doy);
}
function Hs(e, t, r, n, s) {
  var i;
  return e == null ? Je(this, n, s).year : (i = me(e, n, s), t > i && (t = i), gc.call(this, e, t, r, n, s));
}
function gc(e, t, r, n, s) {
  var i = Os(e, t, r, n, s), a = Ze(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
y("Q", 0, "Qo", "quarter");
j("quarter", "Q");
W("quarter", 7);
d("Q", ds);
x("Q", function(e, t) {
  t[de] = (b(e) - 1) * 3;
});
function wc(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
y("D", ["DD", 2], "Do", "date");
j("date", "D");
W("date", 9);
d("D", E);
d("DD", E, B);
d("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
x(["D", "DD"], se);
x("Do", function(e, t) {
  t[se] = b(e.match(E)[0]);
});
var $s = He("Date", !0);
y("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
j("dayOfYear", "DDD");
W("dayOfYear", 4);
d("DDD", Yt);
d("DDDD", hs);
x(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = b(e);
});
function Sc(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
y("m", ["mm", 2], 0, "minute");
j("minute", "m");
W("minute", 14);
d("m", E);
d("mm", E, B);
x(["m", "mm"], K);
var Oc = He("Minutes", !1);
y("s", ["ss", 2], 0, "second");
j("second", "s");
W("second", 15);
d("s", E);
d("ss", E, B);
x(["s", "ss"], he);
var bc = He("Seconds", !1);
y("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
y(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
y(0, ["SSS", 3], 0, "millisecond");
y(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
y(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
y(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
y(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
y(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
y(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
j("millisecond", "ms");
W("millisecond", 16);
d("S", Yt, ds);
d("SS", Yt, B);
d("SSS", Yt, hs);
var we, Gs;
for (we = "SSSS"; we.length <= 9; we += "S")
  d(we, $e);
function kc(e, t) {
  t[Me] = b(("0." + e) * 1e3);
}
for (we = "S"; we.length <= 9; we += "S")
  x(we, kc);
Gs = He("Milliseconds", !1);
y("z", 0, 0, "zoneAbbr");
y("zz", 0, 0, "zoneName");
function Dc() {
  return this._isUTC ? "UTC" : "";
}
function Mc() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = et.prototype;
c.add = vl;
c.calendar = Dl;
c.clone = Ml;
c.diff = Pl;
c.endOf = Hl;
c.format = Il;
c.from = Fl;
c.fromNow = Ul;
c.to = jl;
c.toNow = Wl;
c.get = To;
c.invalidAt = Ql;
c.isAfter = xl;
c.isBefore = Tl;
c.isBetween = El;
c.isSame = Yl;
c.isSameOrAfter = Nl;
c.isSameOrBefore = Rl;
c.isValid = Jl;
c.lang = Fs;
c.locale = Is;
c.localeData = Us;
c.max = Ju;
c.min = Zu;
c.parsingFlags = Kl;
c.set = Eo;
c.startOf = Vl;
c.subtract = gl;
c.toArray = Bl;
c.toObject = zl;
c.toDate = ql;
c.toISOString = Al;
c.inspect = Ll;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = Zl;
c.toString = Cl;
c.unix = Gl;
c.valueOf = $l;
c.creationData = Xl;
c.eraName = nc;
c.eraNarrow = sc;
c.eraAbbr = ic;
c.eraYear = ac;
c.year = Ss;
c.isLeapYear = zo;
c.weekYear = hc;
c.isoWeekYear = mc;
c.quarter = c.quarters = wc;
c.month = gs;
c.daysInMonth = Go;
c.week = c.weeks = eu;
c.isoWeek = c.isoWeeks = tu;
c.weeksInYear = yc;
c.weeksInWeekYear = vc;
c.isoWeeksInYear = pc;
c.isoWeeksInISOWeekYear = _c;
c.date = $s;
c.day = c.days = mu;
c.weekday = pu;
c.isoWeekday = _u;
c.dayOfYear = Sc;
c.hour = c.hours = bu;
c.minute = c.minutes = Oc;
c.second = c.seconds = bc;
c.millisecond = c.milliseconds = Gs;
c.utcOffset = il;
c.utc = ol;
c.local = ul;
c.parseZone = ll;
c.hasAlignedHourOffset = cl;
c.isDST = fl;
c.isLocal = hl;
c.isUtcOffset = ml;
c.isUtc = Ps;
c.isUTC = Ps;
c.zoneAbbr = Dc;
c.zoneName = Mc;
c.dates = Z(
  "dates accessor is deprecated. Use date instead.",
  $s
);
c.months = Z(
  "months accessor is deprecated. Use month instead",
  gs
);
c.years = Z(
  "years accessor is deprecated. Use year instead",
  Ss
);
c.zone = Z(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  al
);
c.isDSTShifted = Z(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  dl
);
function xc(e) {
  return T(e * 1e3);
}
function Tc() {
  return T.apply(null, arguments).parseZone();
}
function qs(e) {
  return e;
}
var M = Nr.prototype;
M.calendar = mo;
M.longDateFormat = vo;
M.invalidDate = wo;
M.ordinal = bo;
M.preparse = qs;
M.postformat = qs;
M.relativeTime = Do;
M.pastFuture = Mo;
M.set = fo;
M.eras = ec;
M.erasParse = tc;
M.erasConvertYear = rc;
M.erasAbbrRegex = uc;
M.erasNameRegex = oc;
M.erasNarrowRegex = lc;
M.months = Wo;
M.monthsShort = Vo;
M.monthsParse = $o;
M.monthsRegex = Bo;
M.monthsShortRegex = qo;
M.week = Jo;
M.firstDayOfYear = Xo;
M.firstDayOfWeek = Qo;
M.weekdays = lu;
M.weekdaysMin = fu;
M.weekdaysShort = cu;
M.weekdaysParse = hu;
M.weekdaysRegex = yu;
M.weekdaysShortRegex = vu;
M.weekdaysMinRegex = gu;
M.isPM = Su;
M.meridiem = ku;
function St(e, t, r, n) {
  var s = _e(), i = oe().set(n, t);
  return s[r](i, e);
}
function Bs(e, t, r) {
  if (pe(e) && (t = e, e = void 0), e = e || "", t != null)
    return St(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = St(e, n, r, "month");
  return s;
}
function Br(e, t, r, n) {
  typeof e == "boolean" ? (pe(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, pe(t) && (r = t, t = void 0), t = t || "");
  var s = _e(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return St(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = St(t, (a + i) % 7, n, "day");
  return o;
}
function Ec(e, t) {
  return Bs(e, t, "months");
}
function Yc(e, t) {
  return Bs(e, t, "monthsShort");
}
function Nc(e, t, r) {
  return Br(e, t, r, "weekdays");
}
function Rc(e, t, r) {
  return Br(e, t, r, "weekdaysShort");
}
function Pc(e, t, r) {
  return Br(e, t, r, "weekdaysMin");
}
Se("en", {
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
    var t = e % 10, r = b(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
f.lang = Z(
  "moment.lang is deprecated. Use moment.locale instead.",
  Se
);
f.langData = Z(
  "moment.langData is deprecated. Use moment.localeData instead.",
  _e
);
var ce = Math.abs;
function Cc() {
  var e = this._data;
  return this._milliseconds = ce(this._milliseconds), this._days = ce(this._days), this._months = ce(this._months), e.milliseconds = ce(e.milliseconds), e.seconds = ce(e.seconds), e.minutes = ce(e.minutes), e.hours = ce(e.hours), e.months = ce(e.months), e.years = ce(e.years), this;
}
function zs(e, t, r, n) {
  var s = ne(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function Ac(e, t) {
  return zs(this, e, t, 1);
}
function Lc(e, t) {
  return zs(this, e, t, -1);
}
function xn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Ic() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += xn(vr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = z(e / 1e3), n.seconds = s % 60, i = z(s / 60), n.minutes = i % 60, a = z(i / 60), n.hours = a % 24, t += z(a / 24), u = z(Zs(t)), r += u, t -= xn(vr(u)), o = z(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function Zs(e) {
  return e * 4800 / 146097;
}
function vr(e) {
  return e * 146097 / 4800;
}
function Fc(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = J(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + Zs(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(vr(this._months)), e) {
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
function Uc() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + b(this._months / 12) * 31536e6 : NaN;
}
function ye(e) {
  return function() {
    return this.as(e);
  };
}
var jc = ye("ms"), Wc = ye("s"), Vc = ye("m"), Hc = ye("h"), $c = ye("d"), Gc = ye("w"), qc = ye("M"), Bc = ye("Q"), zc = ye("y");
function Zc() {
  return ne(this);
}
function Jc(e) {
  return e = J(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ne(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Kc = Ne("milliseconds"), Qc = Ne("seconds"), Xc = Ne("minutes"), ef = Ne("hours"), tf = Ne("days"), rf = Ne("months"), nf = Ne("years");
function sf() {
  return z(this.days() / 7);
}
var fe = Math.round, Ue = {
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
function af(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function of(e, t, r, n) {
  var s = ne(e).abs(), i = fe(s.as("s")), a = fe(s.as("m")), o = fe(s.as("h")), u = fe(s.as("d")), l = fe(s.as("M")), h = fe(s.as("w")), m = fe(s.as("y")), p = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (p = p || h <= 1 && ["w"] || h < r.w && ["ww", h]), p = p || l <= 1 && ["M"] || l < r.M && ["MM", l] || m <= 1 && ["y"] || ["yy", m], p[2] = t, p[3] = +e > 0, p[4] = n, af.apply(null, p);
}
function uf(e) {
  return e === void 0 ? fe : typeof e == "function" ? (fe = e, !0) : !1;
}
function lf(e, t) {
  return Ue[e] === void 0 ? !1 : t === void 0 ? Ue[e] : (Ue[e] = t, e === "s" && (Ue.ss = t - 1), !0);
}
function cf(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = Ue, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, Ue, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = of(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var or = Math.abs;
function Ie(e) {
  return (e > 0) - (e < 0) || +e;
}
function Ft() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = or(this._milliseconds) / 1e3, t = or(this._days), r = or(this._months), n, s, i, a, o = this.asSeconds(), u, l, h, m;
  return o ? (n = z(e / 60), s = z(n / 60), e %= 60, n %= 60, i = z(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = Ie(this._months) !== Ie(o) ? "-" : "", h = Ie(this._days) !== Ie(o) ? "-" : "", m = Ie(this._milliseconds) !== Ie(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? h + t + "D" : "") + (s || n || e ? "T" : "") + (s ? m + s + "H" : "") + (n ? m + n + "M" : "") + (e ? m + a + "S" : "")) : "P0D";
}
var k = Lt.prototype;
k.isValid = tl;
k.abs = Cc;
k.add = Ac;
k.subtract = Lc;
k.as = Fc;
k.asMilliseconds = jc;
k.asSeconds = Wc;
k.asMinutes = Vc;
k.asHours = Hc;
k.asDays = $c;
k.asWeeks = Gc;
k.asMonths = qc;
k.asQuarters = Bc;
k.asYears = zc;
k.valueOf = Uc;
k._bubble = Ic;
k.clone = Zc;
k.get = Jc;
k.milliseconds = Kc;
k.seconds = Qc;
k.minutes = Xc;
k.hours = ef;
k.days = tf;
k.weeks = sf;
k.months = rf;
k.years = nf;
k.humanize = cf;
k.toISOString = Ft;
k.toString = Ft;
k.toJSON = Ft;
k.locale = Is;
k.localeData = Us;
k.toIsoString = Z(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Ft
);
k.lang = Fs;
y("X", 0, 0, "unix");
y("x", 0, 0, "valueOf");
d("x", Rt);
d("X", No);
x("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
x("x", function(e, t, r) {
  r._d = new Date(b(e));
});
//! moment.js
f.version = "2.29.4";
lo(T);
f.fn = c;
f.min = Ku;
f.max = Qu;
f.now = Xu;
f.utc = oe;
f.unix = xc;
f.months = Ec;
f.isDate = Xe;
f.locale = Se;
f.invalid = xt;
f.duration = ne;
f.isMoment = te;
f.weekdays = Nc;
f.parseZone = Tc;
f.localeData = _e;
f.isDuration = ht;
f.monthsShort = Yc;
f.weekdaysMin = Pc;
f.defineLocale = Ur;
f.updateLocale = Tu;
f.locales = Eu;
f.weekdaysShort = Rc;
f.normalizeUnits = J;
f.relativeTimeRounding = uf;
f.relativeTimeThreshold = lf;
f.calendarFormat = kl;
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
function Tn(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var I = function() {
};
I.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (be.defaults.headers.common["X-CSRF-Token"] = e.content), be.defaults.headers.common.Accept = "application/json", be.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, I.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  F.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = be.CancelToken.source();
}, I.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, I.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, I.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = Tn(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return be(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, I.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = Tn(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), F.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, I.cancelTokenSources = {}, I.active = 0, be.interceptors.request.use(function(e) {
  return I.active += 1, e;
}, function(e) {
  return I.active -= 1, Promise.reject(e);
}), be.interceptors.response.use(function(e) {
  return I.active -= 1, e;
}, function(e) {
  return I.active -= 1, Promise.reject(e);
}), window.Api = I;
var F = { isString: function(e) {
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
} }, En = Object.freeze({ __proto__: null, Api: I, Utils: F }), ff = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(En).forEach(function(r) {
    t.component(r, En[r]);
  }));
} }, lt = null;
typeof window < "u" ? lt = window.Vue : typeof global < "u" && (lt = global.Vue), lt && lt.use(ff);
class df {
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
    disableValidation: h = !1,
    hideValidationErrors: m = !1,
    ...p
  }) {
    window.toto = "TOTO";
    let v = {
      /*   'botyglot-input': Field,
         'botyglot-form': Form,
         'botyglot-hidden': Hidden,
         'botyglot-submit': Submit,
         'botyglot-label': Label,
         'botyglot-errors-placeholder': ErrorsPlaceholder,
         'botyglot-suggested-value': SuggestedValue,*/
    };
    const N = Object.keys(u)[0];
    let { errors: Oe, warnings: w, suggested_values: Ut, potential_values: jt, ...nt } = u[N], st = {
      values: {
        [N]: nt || {}
      },
      errors: {
        [N]: Oe || {}
      },
      warnings: {
        [N]: w || {}
      },
      touched: {
        [N]: {
          _submit: l
        }
      },
      potentialValues: {
        [N]: jt || {}
      },
      suggestedValues: {
        [N]: Ut || {}
      },
      meta: Object.assign({
        modelName: N,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: h,
        hideValidationErrors: m
      }, p)
    };
    this.store = Pi({
      state: st,
      plugins: a,
      getters: {
        getValue: (_) => (g) => {
          let S = F.dotify(g);
          return ve(S.split("."), _.values);
        },
        getError: (_) => (g) => {
          let S = F.dotify(g);
          return _.meta.hideValidationErrors ? null : ve(S.split("."), _.errors);
        },
        getWarning: (_) => (g) => {
          let S = F.dotify(g);
          return _.meta.hideValidationErrors ? null : ve(S.split("."), _.warnings);
        },
        getTouched: (_) => (g) => {
          let S = F.dotify(g);
          return ve(S.split("."), _.touched) || ve([N, "_submit"], _.touched);
        },
        getMeta: (_) => (g) => {
          let S = F.dotify(g);
          return ve(S.split("."), _.meta);
        },
        getPotentialValues: (_) => (g) => {
          let S = F.dotify(g);
          return ve(S.split("."), _.potentialValues);
        },
        getSuggestedValues: (_) => (g) => {
          let S = F.dotify(g);
          return ve(S.split("."), _.suggestedValues);
        }
      },
      mutations: {
        setValue: function(_, g) {
          let S = F.dotify(g.name);
          _.values = Ce(S.split("."), g.value, _.values);
        },
        setTouched: function(_, g) {
          let S = F.dotify(g.name);
          _.touched = Ce(S.split("."), g.value, _.touched);
        },
        setError: function(_, g) {
          let S = F.dotify(g.name);
          _.errors = Ce(S.split("."), g.value, _.errors);
        },
        setWarning: function(_, g) {
          let S = F.dotify(g.name);
          _.warnings = Ce(S.split("."), g.value, _.warnings);
        },
        setPotentialValues: function(_, g) {
          let S = F.dotify(g.name);
          _.potentialValues = Ce(S.split("."), g.value, _.potentialValues);
        },
        setSuggestedValues: function(_, g) {
          let S = F.dotify(g.name);
          _.suggestedValues = Ce(S.split("."), g.value, _.suggestedValues);
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
        genericSendDataToServer: function(_, g) {
          let { sid: S, url: $, method: le, data: it, onSuccess: Js, onError: Ks, ...Qs } = g, Xs = (at) => {
            let ti = Object.assign(Qs, {
              sid: S,
              response: at
            });
            _.dispatch("genericDataReceivedFromServer", ti);
          }, ei = (at) => {
            console.log("There was a problem with validating the data"), console.log(at), console.log(JSON.stringify(at, null, 2));
          };
          I.sendRequest({
            url: $,
            method: le || "post",
            data: it,
            onSuccess: Js || Xs,
            onError: Ks || ei,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(_, g) {
        },
        sendValuesToServer: function(_) {
          if (h) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let g = (le) => {
              _.dispatch("dataReceivedFromServer", le.data);
            }, S = (le) => {
              console.log("There was a problem with validating the data"), console.log(le), console.log(JSON.stringify(le, null, 2));
            }, $ = Object.assign({
              utf8: "✓",
              authenticity_token: _.state.meta.authenticityToken,
              _method: _.state.meta.httpMethod
            }, qi(_.state.values));
            $[N]._prevent_save = !0, I.sendRequest({ url: _.state.meta.validationUrl, data: $, method: _.state.meta.httpMethod, onSuccess: g, onError: S, delay: !0 });
          }
        },
        dataReceivedFromServer: function(_, g) {
          let { errors: S, warnings: $, potential_values: le, suggested_values: it } = g[N];
          S && _.commit("setError", {
            value: S,
            name: N
          }), $ && _.commit("setWarning", {
            value: $,
            name: N
          }), le && _.commit("setPotentialValues", {
            value: le,
            name: N
          }), it && _.commit("setSuggestedValues", {
            value: it,
            name: N
          });
        },
        update: function(_, g) {
          _.commit("setValue", g), _.dispatch("sendValuesToServer");
        }
      }
    }), this.app = ii({
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(v, t),
      props: {}
    }), this.app.mount(n);
  }
}
const Yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormStore: df
}, Symbol.toStringTag, { value: "Module" }));
function gr(e) {
  gr.installed || (gr.installed = !0, Object.keys(Yn).forEach((t) => {
    e.component(t, Yn[t]);
  }));
}
const hf = {
  install: gr
};
let Ot = null;
typeof window < "u" ? Ot = window.Vue : typeof global < "u" && (Ot = global.Vue);
Ot && Ot.use(hf);
export {
  df as FormStore,
  hf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
