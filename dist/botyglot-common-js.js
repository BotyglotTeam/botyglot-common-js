import tn, { watch as Hn, inject as gi, effectScope as wi, reactive as Si, computed as Oi } from "vue";
function bi() {
  return $n().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function $n() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const ki = typeof Proxy == "function", Di = "devtools-plugin:setup", Mi = "plugin:settings:set";
let Re, hr;
function xi() {
  var e;
  return Re !== void 0 || (typeof window < "u" && window.performance ? (Re = !0, hr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Re = !0, hr = globalThis.perf_hooks.performance) : Re = !1), Re;
}
function Ei() {
  return xi() ? hr.now() : Date.now();
}
class Ti {
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
        return Ei();
      }
    }, r && r.on(Mi, (a, o) => {
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
function Ni(e, t) {
  const r = e, n = $n(), s = bi(), i = ki && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Di, e, t);
  else {
    const a = i ? new Ti(r, s) : null;
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
var Mr = "store";
function Yi(e) {
  return e === void 0 && (e = null), gi(e !== null ? e : Mr);
}
function Ri(e, t) {
  return e.filter(t)[0];
}
function mr(e, t) {
  if (t === void 0 && (t = []), e === null || typeof e != "object")
    return e;
  var r = Ri(t, function(s) {
    return s.original === e;
  });
  if (r)
    return r.copy;
  var n = Array.isArray(e) ? [] : {};
  return t.push({
    original: e,
    copy: n
  }), Object.keys(e).forEach(function(s) {
    n[s] = mr(e[s], t);
  }), n;
}
function Ee(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function Gn(e) {
  return e !== null && typeof e == "object";
}
function Ci(e) {
  return e && typeof e.then == "function";
}
function X(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function Pi(e, t) {
  return function() {
    return e(t);
  };
}
function qn(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function Bn(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  Mt(e, r, [], e._modules.root, !0), xr(e, r, t);
}
function xr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = wi(!0);
  u.run(function() {
    Ee(i, function(l, f) {
      a[f] = Pi(l, e), o[f] = Oi(function() {
        return a[f]();
      }), Object.defineProperty(e.getters, f, {
        get: function() {
          return o[f].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = Si({
    data: t
  }), e._scope = u, e.strict && Ui(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function Mt(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = Er(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = Ai(e, a, r);
  n.forEachMutation(function(f, p) {
    var m = a + p;
    Li(e, m, f, l);
  }), n.forEachAction(function(f, p) {
    var m = f.root ? p : a + p, y = f.handler || f;
    Fi(e, m, y, l);
  }), n.forEachGetter(function(f, p) {
    var m = a + p;
    Ii(e, m, f, l);
  }), n.forEachChild(function(f, p) {
    Mt(e, t, r.concat(p), f, s);
  });
}
function Ai(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = _t(i, a, o), l = u.payload, f = u.options, p = u.type;
      if ((!f || !f.root) && (p = t + p, process.env.NODE_ENV !== "production" && !e._actions[p])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + p);
        return;
      }
      return e.dispatch(p, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = _t(i, a, o), l = u.payload, f = u.options, p = u.type;
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
        return zn(e, t);
      }
    },
    state: {
      get: function() {
        return Er(e.state, r);
      }
    }
  }), s;
}
function zn(e, t) {
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
function Li(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function Fi(e, t, r, n) {
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
    return Ci(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function Ii(e, t, r, n) {
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
function Ui(e) {
  Hn(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && X(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function Er(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function _t(e, t, r) {
  return Gn(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && X(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var ji = "vuex bindings", rn = "vuex:mutations", qt = "vuex:actions", Ce = "vuex", Wi = 0;
function Vi(e, t) {
  Ni(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [ji]
    },
    function(r) {
      r.addTimelineLayer({
        id: rn,
        label: "Vuex Mutations",
        color: nn
      }), r.addTimelineLayer({
        id: qt,
        label: "Vuex Actions",
        color: nn
      }), r.addInspector({
        id: Ce,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === Ce)
          if (n.filter) {
            var s = [];
            Qn(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              Kn(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Ce) {
          var s = n.nodeId;
          zn(t, s), n.state = Gi(
            Bi(t._modules, s),
            s === "root" ? t.getters : t._makeLocalGettersCache,
            s
          );
        }
      }), r.on.editInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Ce) {
          var s = n.nodeId, i = n.path;
          s !== "root" && (i = s.split("/").filter(Boolean).concat(i)), t._withCommit(function() {
            n.set(t._state.data, i, n.state.value);
          });
        }
      }), t.subscribe(function(n, s) {
        var i = {};
        n.payload && (i.payload = n.payload), i.state = s, r.notifyComponentUpdate(), r.sendInspectorTree(Ce), r.sendInspectorState(Ce), r.addTimelineEvent({
          layerId: rn,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = Wi++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
            layerId: qt,
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
            layerId: qt,
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
var nn = 8702998, Hi = 6710886, $i = 16777215, Zn = {
  label: "namespaced",
  textColor: $i,
  backgroundColor: Hi
};
function Jn(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function Kn(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: Jn(t),
    tags: e.namespaced ? [Zn] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return Kn(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function Qn(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [Zn] : []
  }), Object.keys(t._children).forEach(function(s) {
    Qn(e, t._children[s], r, n + s + "/");
  });
}
function Gi(e, t, r) {
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
    var i = qi(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? Jn(a) : a,
        editable: !1,
        value: pr(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function qi(e) {
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
      }), s[i] = pr(function() {
        return e[r];
      });
    } else
      t[r] = pr(function() {
        return e[r];
      });
  }), t;
}
function Bi(e, t) {
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
function pr(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var ne = function(t, r) {
  this.runtime = r, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var n = t.state;
  this.state = (typeof n == "function" ? n() : n) || {};
}, Xn = { namespaced: { configurable: !0 } };
Xn.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
ne.prototype.addChild = function(t, r) {
  this._children[t] = r;
};
ne.prototype.removeChild = function(t) {
  delete this._children[t];
};
ne.prototype.getChild = function(t) {
  return this._children[t];
};
ne.prototype.hasChild = function(t) {
  return t in this._children;
};
ne.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
ne.prototype.forEachChild = function(t) {
  Ee(this._children, t);
};
ne.prototype.forEachGetter = function(t) {
  this._rawModule.getters && Ee(this._rawModule.getters, t);
};
ne.prototype.forEachAction = function(t) {
  this._rawModule.actions && Ee(this._rawModule.actions, t);
};
ne.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && Ee(this._rawModule.mutations, t);
};
Object.defineProperties(ne.prototype, Xn);
var Te = function(t) {
  this.register([], t, !1);
};
Te.prototype.get = function(t) {
  return t.reduce(function(r, n) {
    return r.getChild(n);
  }, this.root);
};
Te.prototype.getNamespace = function(t) {
  var r = this.root;
  return t.reduce(function(n, s) {
    return r = r.getChild(s), n + (r.namespaced ? s + "/" : "");
  }, "");
};
Te.prototype.update = function(t) {
  es([], this.root, t);
};
Te.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && ts(t, r);
  var i = new ne(r, n);
  if (t.length === 0)
    this.root = i;
  else {
    var a = this.get(t.slice(0, -1));
    a.addChild(t[t.length - 1], i);
  }
  r.modules && Ee(r.modules, function(o, u) {
    s.register(t.concat(u), o, n);
  });
};
Te.prototype.unregister = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1], s = r.getChild(n);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + n + "', which is not registered"
    );
    return;
  }
  s.runtime && r.removeChild(n);
};
Te.prototype.isRegistered = function(t) {
  var r = this.get(t.slice(0, -1)), n = t[t.length - 1];
  return r ? r.hasChild(n) : !1;
};
function es(e, t, r) {
  if (process.env.NODE_ENV !== "production" && ts(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      es(
        e.concat(n),
        t.getChild(n),
        r.modules[n]
      );
    }
}
var sn = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, zi = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, an = {
  getters: sn,
  mutations: sn,
  actions: zi
};
function ts(e, t) {
  Object.keys(an).forEach(function(r) {
    if (t[r]) {
      var n = an[r];
      Ee(t[r], function(s, i) {
        X(
          n.assert(s),
          Zi(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function Zi(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function Ji(e) {
  return new V(e);
}
var V = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (X(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), X(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Te(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(m, y) {
    return u.call(a, m, y);
  }, this.commit = function(m, y, x) {
    return l.call(a, m, y, x);
  }, this.strict = s;
  var f = this._modules.root.state;
  Mt(this, f, [], this._modules.root), xr(this, f), n.forEach(function(p) {
    return p(r);
  });
}, Tr = { state: { configurable: !0 } };
V.prototype.install = function(t, r) {
  t.provide(r || Mr, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Vi(t, this);
};
Tr.state.get = function() {
  return this._state.data;
};
Tr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && X(!1, "use store.replaceState() to explicit replace store state.");
};
V.prototype.commit = function(t, r, n) {
  var s = this, i = _t(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, f = this._mutations[a];
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
V.prototype.dispatch = function(t, r) {
  var n = this, s = _t(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
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
        n._actionSubscribers.filter(function(y) {
          return y.after;
        }).forEach(function(y) {
          return y.after(o, n.state);
        });
      } catch (y) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(y));
      }
      f(m);
    }, function(m) {
      try {
        n._actionSubscribers.filter(function(y) {
          return y.error;
        }).forEach(function(y) {
          return y.error(o, n.state, m);
        });
      } catch (y) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(y));
      }
      p(m);
    });
  });
};
V.prototype.subscribe = function(t, r) {
  return qn(t, this._subscribers, r);
};
V.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return qn(n, this._actionSubscribers, r);
};
V.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && X(typeof t == "function", "store.watch only accepts a function."), Hn(function() {
    return t(s.state, s.getters);
  }, r, Object.assign({}, n));
};
V.prototype.replaceState = function(t) {
  var r = this;
  this._withCommit(function() {
    r._state.data = t;
  });
};
V.prototype.registerModule = function(t, r, n) {
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (X(Array.isArray(t), "module path must be a string or an Array."), X(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), Mt(this, this.state, t, this._modules.get(t), n.preserveState), xr(this, this.state);
};
V.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && X(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = Er(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), Bn(this);
};
V.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && X(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
V.prototype.hotUpdate = function(t) {
  this._modules.update(t), Bn(this, !0);
};
V.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(V.prototype, Tr);
var rs = Et(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !Xe(t) && console.error("[vuex] mapState: mapper parameter must be either an Array or an Object"), xt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      var o = this.$store.state, u = this.$store.getters;
      if (e) {
        var l = Tt(this.$store, "mapState", e);
        if (!l)
          return;
        o = l.context.state, u = l.context.getters;
      }
      return typeof i == "function" ? i.call(this, o, u) : o[i];
    }, r[s].vuex = !0;
  }), r;
}), ns = Et(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !Xe(t) && console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object"), xt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      for (var o = [], u = arguments.length; u--; )
        o[u] = arguments[u];
      var l = this.$store.commit;
      if (e) {
        var f = Tt(this.$store, "mapMutations", e);
        if (!f)
          return;
        l = f.context.commit;
      }
      return typeof i == "function" ? i.apply(this, [l].concat(o)) : l.apply(this.$store, [i].concat(o));
    };
  }), r;
}), ss = Et(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !Xe(t) && console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object"), xt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    i = e + i, r[s] = function() {
      if (!(e && !Tt(this.$store, "mapGetters", e))) {
        if (process.env.NODE_ENV !== "production" && !(i in this.$store.getters)) {
          console.error("[vuex] unknown getter: " + i);
          return;
        }
        return this.$store.getters[i];
      }
    }, r[s].vuex = !0;
  }), r;
}), is = Et(function(e, t) {
  var r = {};
  return process.env.NODE_ENV !== "production" && !Xe(t) && console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object"), xt(t).forEach(function(n) {
    var s = n.key, i = n.val;
    r[s] = function() {
      for (var o = [], u = arguments.length; u--; )
        o[u] = arguments[u];
      var l = this.$store.dispatch;
      if (e) {
        var f = Tt(this.$store, "mapActions", e);
        if (!f)
          return;
        l = f.context.dispatch;
      }
      return typeof i == "function" ? i.apply(this, [l].concat(o)) : l.apply(this.$store, [i].concat(o));
    };
  }), r;
}), Ki = function(e) {
  return {
    mapState: rs.bind(null, e),
    mapGetters: ss.bind(null, e),
    mapMutations: ns.bind(null, e),
    mapActions: is.bind(null, e)
  };
};
function xt(e) {
  return Xe(e) ? Array.isArray(e) ? e.map(function(t) {
    return { key: t, val: t };
  }) : Object.keys(e).map(function(t) {
    return { key: t, val: e[t] };
  }) : [];
}
function Xe(e) {
  return Array.isArray(e) || Gn(e);
}
function Et(e) {
  return function(t, r) {
    return typeof t != "string" ? (r = t, t = "") : t.charAt(t.length - 1) !== "/" && (t += "/"), e(t, r);
  };
}
function Tt(e, t, r) {
  var n = e._modulesNamespaceMap[r];
  return process.env.NODE_ENV !== "production" && !n && console.error("[vuex] module namespace not found in " + t + "(): " + r), n;
}
function Qi(e) {
  e === void 0 && (e = {});
  var t = e.collapsed;
  t === void 0 && (t = !0);
  var r = e.filter;
  r === void 0 && (r = function(f, p, m) {
    return !0;
  });
  var n = e.transformer;
  n === void 0 && (n = function(f) {
    return f;
  });
  var s = e.mutationTransformer;
  s === void 0 && (s = function(f) {
    return f;
  });
  var i = e.actionFilter;
  i === void 0 && (i = function(f, p) {
    return !0;
  });
  var a = e.actionTransformer;
  a === void 0 && (a = function(f) {
    return f;
  });
  var o = e.logMutations;
  o === void 0 && (o = !0);
  var u = e.logActions;
  u === void 0 && (u = !0);
  var l = e.logger;
  return l === void 0 && (l = console), function(f) {
    var p = mr(f.state);
    typeof l > "u" || (o && f.subscribe(function(m, y) {
      var x = mr(y);
      if (r(m, p, x)) {
        var K = ln(), w = s(m), Ge = "mutation " + m.type + K;
        on(l, Ge, t), l.log("%c prev state", "color: #9E9E9E; font-weight: bold", n(p)), l.log("%c mutation", "color: #03A9F4; font-weight: bold", w), l.log("%c next state", "color: #4CAF50; font-weight: bold", n(x)), un(l);
      }
      p = x;
    }), u && f.subscribeAction(function(m, y) {
      if (i(m, y)) {
        var x = ln(), K = a(m), w = "action " + m.type + x;
        on(l, w, t), l.log("%c action", "color: #03A9F4; font-weight: bold", K), un(l);
      }
    }));
  };
}
function on(e, t, r) {
  var n = r ? e.groupCollapsed : e.group;
  try {
    n.call(e, t);
  } catch {
    e.log(t);
  }
}
function un(e) {
  try {
    e.groupEnd();
  } catch {
    e.log("—— log end ——");
  }
}
function ln() {
  var e = /* @__PURE__ */ new Date();
  return " @ " + lt(e.getHours(), 2) + ":" + lt(e.getMinutes(), 2) + ":" + lt(e.getSeconds(), 2) + "." + lt(e.getMilliseconds(), 3);
}
function Xi(e, t) {
  return new Array(t + 1).join(e);
}
function lt(e, t) {
  return Xi("0", t - e.toString().length) + e;
}
var ea = {
  version: "4.1.0",
  Store: V,
  storeKey: Mr,
  createStore: Ji,
  useStore: Yi,
  mapState: rs,
  mapMutations: ns,
  mapGetters: ss,
  mapActions: is,
  createNamespacedHelpers: Ki,
  createLogger: Qi
};
const cn = ea;
function R(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ae(e) {
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
        return R(r) ? t : ae(function(s) {
          return e(r, s);
        });
      default:
        return R(r) && R(n) ? t : R(r) ? ae(function(s) {
          return e(s, n);
        }) : R(n) ? ae(function(s) {
          return e(r, s);
        }) : e(r, n);
    }
  };
}
function as(e) {
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
        }) : ae(function(i) {
          return e(r, n, i);
        });
      default:
        return R(r) && R(n) && R(s) ? t : R(r) && R(n) ? De(function(i, a) {
          return e(i, a, s);
        }) : R(r) && R(s) ? De(function(i, a) {
          return e(i, n, a);
        }) : R(n) && R(s) ? De(function(i, a) {
          return e(r, i, a);
        }) : R(r) ? ae(function(i) {
          return e(i, n, s);
        }) : R(n) ? ae(function(i) {
          return e(r, i, s);
        }) : R(s) ? ae(function(i) {
          return e(r, n, i);
        }) : e(r, n, s);
    }
  };
}
const ta = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function ra(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var na = /* @__PURE__ */ De(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const ge = na;
var sa = /* @__PURE__ */ as(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const ia = sa, fn = Number.isInteger || function(t) {
  return t << 0 === t;
};
var aa = /* @__PURE__ */ ae(function(t) {
  return t == null;
});
const oa = aa;
var ua = /* @__PURE__ */ as(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !oa(n) && ra(s, n) ? n[s] : fn(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (fn(s) && ta(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return ia(s, r, n);
});
const Pe = ua;
function la(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var ca = /* @__PURE__ */ ae(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const fa = ca;
function os(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? os(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (fa(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return la(e);
    default:
      return e;
  }
}
var da = /* @__PURE__ */ ae(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : os(t, [], [], !0);
});
const ha = da;
function ma(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Nr = { exports: {} }, us = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, pa = us, Ne = Object.prototype.toString;
function Yr(e) {
  return Ne.call(e) === "[object Array]";
}
function yr(e) {
  return typeof e > "u";
}
function ya(e) {
  return e !== null && !yr(e) && e.constructor !== null && !yr(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function va(e) {
  return Ne.call(e) === "[object ArrayBuffer]";
}
function _a(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function ga(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function wa(e) {
  return typeof e == "string";
}
function Sa(e) {
  return typeof e == "number";
}
function ls(e) {
  return e !== null && typeof e == "object";
}
function ht(e) {
  if (Ne.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Oa(e) {
  return Ne.call(e) === "[object Date]";
}
function ba(e) {
  return Ne.call(e) === "[object File]";
}
function ka(e) {
  return Ne.call(e) === "[object Blob]";
}
function cs(e) {
  return Ne.call(e) === "[object Function]";
}
function Da(e) {
  return ls(e) && cs(e.pipe);
}
function Ma(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function xa(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Ea() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Rr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Yr(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function vr() {
  var e = {};
  function t(s, i) {
    ht(e[i]) && ht(s) ? e[i] = vr(e[i], s) : ht(s) ? e[i] = vr({}, s) : Yr(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Rr(arguments[r], t);
  return e;
}
function Ta(e, t, r) {
  return Rr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = pa(s, r) : e[i] = s;
  }), e;
}
function Na(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var q = {
  isArray: Yr,
  isArrayBuffer: va,
  isBuffer: ya,
  isFormData: _a,
  isArrayBufferView: ga,
  isString: wa,
  isNumber: Sa,
  isObject: ls,
  isPlainObject: ht,
  isUndefined: yr,
  isDate: Oa,
  isFile: ba,
  isBlob: ka,
  isFunction: cs,
  isStream: Da,
  isURLSearchParams: Ma,
  isStandardBrowserEnv: Ea,
  forEach: Rr,
  merge: vr,
  extend: Ta,
  trim: xa,
  stripBOM: Na
}, Ae = q;
function dn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var fs = function(t, r, n) {
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
      u === null || typeof u > "u" || (Ae.isArray(u) ? l = l + "[]" : u = [u], Ae.forEach(u, function(p) {
        Ae.isDate(p) ? p = p.toISOString() : Ae.isObject(p) && (p = JSON.stringify(p)), i.push(dn(l) + "=" + dn(p));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, Ya = q;
function Nt() {
  this.handlers = [];
}
Nt.prototype.use = function(t, r, n) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: n ? n.synchronous : !1,
    runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1;
};
Nt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Nt.prototype.forEach = function(t) {
  Ya.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Ra = Nt, Ca = q, Pa = function(t, r) {
  Ca.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, ds = function(t, r, n, s, i) {
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
}, Bt, hn;
function hs() {
  if (hn)
    return Bt;
  hn = 1;
  var e = ds;
  return Bt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Bt;
}
var zt, mn;
function Aa() {
  if (mn)
    return zt;
  mn = 1;
  var e = hs();
  return zt = function(r, n, s) {
    var i = s.config.validateStatus;
    !s.status || !i || i(s.status) ? r(s) : n(e(
      "Request failed with status code " + s.status,
      s.config,
      null,
      s.request,
      s
    ));
  }, zt;
}
var Zt, pn;
function La() {
  if (pn)
    return Zt;
  pn = 1;
  var e = q;
  return Zt = e.isStandardBrowserEnv() ? (
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
  ), Zt;
}
var Jt, yn;
function Fa() {
  return yn || (yn = 1, Jt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Jt;
}
var Kt, vn;
function Ia() {
  return vn || (vn = 1, Kt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), Kt;
}
var Qt, _n;
function Ua() {
  if (_n)
    return Qt;
  _n = 1;
  var e = Fa(), t = Ia();
  return Qt = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, Qt;
}
var Xt, gn;
function ja() {
  if (gn)
    return Xt;
  gn = 1;
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
  return Xt = function(n) {
    var s = {}, i, a, o;
    return n && e.forEach(n.split(`
`), function(l) {
      if (o = l.indexOf(":"), i = e.trim(l.substr(0, o)).toLowerCase(), a = e.trim(l.substr(o + 1)), i) {
        if (s[i] && t.indexOf(i) >= 0)
          return;
        i === "set-cookie" ? s[i] = (s[i] ? s[i] : []).concat([a]) : s[i] = s[i] ? s[i] + ", " + a : a;
      }
    }), s;
  }, Xt;
}
var er, wn;
function Wa() {
  if (wn)
    return er;
  wn = 1;
  var e = q;
  return er = e.isStandardBrowserEnv() ? (
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
  ), er;
}
var tr, Sn;
function On() {
  if (Sn)
    return tr;
  Sn = 1;
  var e = q, t = Aa(), r = La(), n = fs, s = Ua(), i = ja(), a = Wa(), o = hs();
  return tr = function(l) {
    return new Promise(function(p, m) {
      var y = l.data, x = l.headers, K = l.responseType;
      e.isFormData(y) && delete x["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var Ge = l.auth.username || "", Gt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        x.Authorization = "Basic " + btoa(Ge + ":" + Gt);
      }
      var it = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(it, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function at() {
        if (w) {
          var g = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !K || K === "text" || K === "json" ? w.responseText : w.response, $ = {
            data: S,
            status: w.status,
            statusText: w.statusText,
            headers: g,
            config: l,
            request: w
          };
          t(p, m, $), w = null;
        }
      }
      if ("onloadend" in w ? w.onloadend = at : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(at);
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
        var v = (l.withCredentials || a(it)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        v && (x[l.xsrfHeaderName] = v);
      }
      "setRequestHeader" in w && e.forEach(x, function(S, $) {
        typeof y > "u" && $.toLowerCase() === "content-type" ? delete x[$] : w.setRequestHeader($, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), K && K !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), m(S), w = null);
      }), y || (y = null), w.send(y);
    });
  }, tr;
}
var A = q, bn = Pa, Va = ds, Ha = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function kn(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function $a() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = On()), e;
}
function Ga(e, t, r) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
var Yt = {
  transitional: {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  adapter: $a(),
  transformRequest: [function(t, r) {
    return bn(r, "Accept"), bn(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (kn(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (kn(r, "application/json"), Ga(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Va(a, this, "E_JSON_PARSE") : a;
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
Yt.headers = {
  common: {
    Accept: "application/json, text/plain, */*"
  }
};
A.forEach(["delete", "get", "head"], function(t) {
  Yt.headers[t] = {};
});
A.forEach(["post", "put", "patch"], function(t) {
  Yt.headers[t] = A.merge(Ha);
});
var Cr = Yt, qa = q, Ba = Cr, za = function(t, r, n) {
  var s = this || Ba;
  return qa.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, rr, Dn;
function ms() {
  return Dn || (Dn = 1, rr = function(t) {
    return !!(t && t.__CANCEL__);
  }), rr;
}
var Mn = q, nr = za, Za = ms(), Ja = Cr;
function sr(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Ka = function(t) {
  sr(t), t.headers = t.headers || {}, t.data = nr.call(
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
  var r = t.adapter || Ja.adapter;
  return r(t).then(function(s) {
    return sr(t), s.data = nr.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return Za(s) || (sr(t), s && s.response && (s.response.data = nr.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, L = q, ps = function(t, r) {
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
  function u(m, y) {
    return L.isPlainObject(m) && L.isPlainObject(y) ? L.merge(m, y) : L.isPlainObject(y) ? L.merge({}, y) : L.isArray(y) ? y.slice() : y;
  }
  function l(m) {
    L.isUndefined(r[m]) ? L.isUndefined(t[m]) || (n[m] = u(void 0, t[m])) : n[m] = u(t[m], r[m]);
  }
  L.forEach(s, function(y) {
    L.isUndefined(r[y]) || (n[y] = u(void 0, r[y]));
  }), L.forEach(i, l), L.forEach(a, function(y) {
    L.isUndefined(r[y]) ? L.isUndefined(t[y]) || (n[y] = u(void 0, t[y])) : n[y] = u(void 0, r[y]);
  }), L.forEach(o, function(y) {
    y in r ? n[y] = u(t[y], r[y]) : y in t && (n[y] = u(void 0, t[y]));
  });
  var f = s.concat(i).concat(a).concat(o), p = Object.keys(t).concat(Object.keys(r)).filter(function(y) {
    return f.indexOf(y) === -1;
  });
  return L.forEach(p, l), n;
};
const Qa = "axios", Xa = "0.21.4", eo = "Promise based HTTP client for the browser and node.js", to = "index.js", ro = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, no = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, so = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], io = "Matt Zabriskie", ao = "MIT", oo = {
  url: "https://github.com/axios/axios/issues"
}, uo = "https://axios-http.com", lo = {
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
}, co = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, fo = "dist/axios.min.js", ho = "dist/axios.min.js", mo = "./index.d.ts", po = {
  "follow-redirects": "^1.14.0"
}, yo = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], vo = {
  name: Qa,
  version: Xa,
  description: eo,
  main: to,
  scripts: ro,
  repository: no,
  keywords: so,
  author: io,
  license: ao,
  bugs: oo,
  homepage: uo,
  devDependencies: lo,
  browser: co,
  jsdelivr: fo,
  unpkg: ho,
  typings: mo,
  dependencies: po,
  bundlesize: yo
};
var ys = vo, Pr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Pr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var xn = {}, _o = ys.version.split(".");
function vs(e, t) {
  for (var r = t ? t.split(".") : _o, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
Pr.transitional = function(t, r, n) {
  var s = r && vs(r);
  function i(a, o) {
    return "[Axios v" + ys.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !xn[o] && (xn[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, o, u) : !0;
  };
};
function go(e, t, r) {
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
var wo = {
  isOlderVersion: vs,
  assertOptions: go,
  validators: Pr
}, _s = q, So = fs, En = Ra, Tn = Ka, Rt = ps, gs = wo, Le = gs.validators;
function et(e) {
  this.defaults = e, this.interceptors = {
    request: new En(),
    response: new En()
  };
}
et.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Rt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && gs.assertOptions(r, {
    silentJSONParsing: Le.transitional(Le.boolean, "1.0.0"),
    forcedJSONParsing: Le.transitional(Le.boolean, "1.0.0"),
    clarifyTimeoutError: Le.transitional(Le.boolean, "1.0.0")
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
    var o = [Tn, void 0];
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
    a = Tn(u);
  } catch (p) {
    return Promise.reject(p);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
et.prototype.getUri = function(t) {
  return t = Rt(this.defaults, t), So(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
_s.forEach(["delete", "get", "head", "options"], function(t) {
  et.prototype[t] = function(r, n) {
    return this.request(Rt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
_s.forEach(["post", "put", "patch"], function(t) {
  et.prototype[t] = function(r, n, s) {
    return this.request(Rt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var Oo = et, ir, Nn;
function ws() {
  if (Nn)
    return ir;
  Nn = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, ir = e, ir;
}
var ar, Yn;
function bo() {
  if (Yn)
    return ar;
  Yn = 1;
  var e = ws();
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
  }, ar = t, ar;
}
var or, Rn;
function ko() {
  return Rn || (Rn = 1, or = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), or;
}
var ur, Cn;
function Do() {
  return Cn || (Cn = 1, ur = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), ur;
}
var Pn = q, Mo = us, mt = Oo, xo = ps, Eo = Cr;
function Ss(e) {
  var t = new mt(e), r = Mo(mt.prototype.request, t);
  return Pn.extend(r, mt.prototype, t), Pn.extend(r, t), r;
}
var ee = Ss(Eo);
ee.Axios = mt;
ee.create = function(t) {
  return Ss(xo(ee.defaults, t));
};
ee.Cancel = ws();
ee.CancelToken = bo();
ee.isCancel = ms();
ee.all = function(t) {
  return Promise.all(t);
};
ee.spread = ko();
ee.isAxiosError = Do();
Nr.exports = ee;
Nr.exports.default = ee;
var To = Nr.exports, No = To;
const be = /* @__PURE__ */ ma(No);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Os;
function d() {
  return Os.apply(null, arguments);
}
function Yo(e) {
  Os = e;
}
function te(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function xe(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function D(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ar(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (D(e, t))
      return !1;
  return !0;
}
function H(e) {
  return e === void 0;
}
function ye(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function tt(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function bs(e, t) {
  var r = [], n, s = e.length;
  for (n = 0; n < s; ++n)
    r.push(t(e[n], n));
  return r;
}
function we(e, t) {
  for (var r in t)
    D(t, r) && (e[r] = t[r]);
  return D(t, "toString") && (e.toString = t.toString), D(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ue(e, t, r, n) {
  return Bs(e, t, r, n, !0).utc();
}
function Ro() {
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
  return e._pf == null && (e._pf = Ro()), e._pf;
}
var _r;
Array.prototype.some ? _r = Array.prototype.some : _r = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Lr(e) {
  if (e._isValid == null) {
    var t = O(e), r = _r.call(t.parsedDateParts, function(s) {
      return s != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function Ct(e) {
  var t = ue(NaN);
  return e != null ? we(O(t), e) : O(t).userInvalidated = !0, t;
}
var An = d.momentProperties = [], lr = !1;
function Fr(e, t) {
  var r, n, s, i = An.length;
  if (H(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), H(t._i) || (e._i = t._i), H(t._f) || (e._f = t._f), H(t._l) || (e._l = t._l), H(t._strict) || (e._strict = t._strict), H(t._tzm) || (e._tzm = t._tzm), H(t._isUTC) || (e._isUTC = t._isUTC), H(t._offset) || (e._offset = t._offset), H(t._pf) || (e._pf = O(t)), H(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = An[r], s = t[n], H(s) || (e[n] = s);
  return e;
}
function rt(e) {
  Fr(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), lr === !1 && (lr = !0, d.updateOffset(this), lr = !1);
}
function re(e) {
  return e instanceof rt || e != null && e._isAMomentObject != null;
}
function ks(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Z(e, t) {
  var r = !0;
  return we(function() {
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
      ks(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Ln = {};
function Ds(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), Ln[e] || (ks(t), Ln[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function le(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Co(e) {
  var t, r;
  for (r in e)
    D(e, r) && (t = e[r], le(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function gr(e, t) {
  var r = we({}, e), n;
  for (n in t)
    D(t, n) && (xe(e[n]) && xe(t[n]) ? (r[n] = {}, we(r[n], e[n]), we(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    D(e, n) && !D(t, n) && xe(e[n]) && (r[n] = we({}, r[n]));
  return r;
}
function Ir(e) {
  e != null && this.set(e);
}
var wr;
Object.keys ? wr = Object.keys : wr = function(e) {
  var t, r = [];
  for (t in e)
    D(e, t) && r.push(t);
  return r;
};
var Po = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Ao(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return le(n) ? n.call(t, r) : n;
}
function oe(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var Ur = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ct = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, cr = {}, je = {};
function _(e, t, r, n) {
  var s = n;
  typeof n == "string" && (s = function() {
    return this[n]();
  }), e && (je[e] = s), t && (je[t[0]] = function() {
    return oe(s.apply(this, arguments), t[1], t[2]);
  }), r && (je[r] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function Lo(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Fo(e) {
  var t = e.match(Ur), r, n;
  for (r = 0, n = t.length; r < n; r++)
    je[t[r]] ? t[r] = je[t[r]] : t[r] = Lo(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += le(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function pt(e, t) {
  return e.isValid() ? (t = Ms(t, e.localeData()), cr[t] = cr[t] || Fo(t), cr[t](e)) : e.localeData().invalidDate();
}
function Ms(e, t) {
  var r = 5;
  function n(s) {
    return t.longDateFormat(s) || s;
  }
  for (ct.lastIndex = 0; r >= 0 && ct.test(e); )
    e = e.replace(
      ct,
      n
    ), ct.lastIndex = 0, r -= 1;
  return e;
}
var Io = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Uo(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Ur).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var jo = "Invalid date";
function Wo() {
  return this._invalidDate;
}
var Vo = "%d", Ho = /\d{1,2}/;
function $o(e) {
  return this._ordinal.replace("%d", e);
}
var Go = {
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
function qo(e, t, r, n) {
  var s = this._relativeTime[r];
  return le(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function Bo(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return le(r) ? r(t) : r.replace(/%s/i, t);
}
var ze = {};
function j(e, t) {
  var r = e.toLowerCase();
  ze[r] = ze[r + "s"] = ze[t] = e;
}
function J(e) {
  return typeof e == "string" ? ze[e] || ze[e.toLowerCase()] : void 0;
}
function jr(e) {
  var t = {}, r, n;
  for (n in e)
    D(e, n) && (r = J(n), r && (t[r] = e[n]));
  return t;
}
var xs = {};
function W(e, t) {
  xs[e] = t;
}
function zo(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: xs[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function Pt(e) {
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
    return r != null ? (Es(this, e, r), d.updateOffset(this, t), this) : gt(this, e);
  };
}
function gt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Es(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && Pt(e.year()) && e.month() === 1 && e.date() === 29 ? (r = b(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    jt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Zo(e) {
  return e = J(e), le(this[e]) ? this[e]() : this;
}
function Jo(e, t) {
  if (typeof e == "object") {
    e = jr(e);
    var r = zo(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = J(e), le(this[e]))
    return this[e](t);
  return this;
}
var Ts = /\d/, B = /\d\d/, Ns = /\d{3}/, Wr = /\d{4}/, At = /[+-]?\d{6}/, N = /\d\d?/, Ys = /\d\d\d\d?/, Rs = /\d\d\d\d\d\d?/, Lt = /\d{1,3}/, Vr = /\d{1,4}/, Ft = /[+-]?\d{1,6}/, $e = /\d+/, It = /[+-]?\d+/, Ko = /Z|[+-]\d\d:?\d\d/gi, Ut = /Z|[+-]\d\d(?::?\d\d)?/gi, Qo = /[+-]?\d+(\.\d{1,3})?/, nt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, wt;
wt = {};
function h(e, t, r) {
  wt[e] = le(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function Xo(e, t) {
  return D(wt, e) ? wt[e](t._strict, t._locale) : new RegExp(eu(e));
}
function eu(e) {
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
var Sr = {};
function E(e, t) {
  var r, n = t, s;
  for (typeof e == "string" && (e = [e]), ye(t) && (n = function(i, a) {
    a[t] = b(i);
  }), s = e.length, r = 0; r < s; r++)
    Sr[e[r]] = n;
}
function st(e, t) {
  E(e, function(r, n, s, i) {
    s._w = s._w || {}, t(r, s._w, s, i);
  });
}
function tu(e, t, r) {
  t != null && D(Sr, e) && Sr[e](t, r._a, r, e);
}
var U = 0, he = 1, ie = 2, P = 3, Q = 4, me = 5, Me = 6, ru = 7, nu = 8;
function su(e, t) {
  return (e % t + t) % t;
}
var C;
Array.prototype.indexOf ? C = Array.prototype.indexOf : C = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function jt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = su(t, 12);
  return e += (t - r) / 12, r === 1 ? Pt(e) ? 29 : 28 : 31 - r % 7 % 2;
}
_("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
_("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
_("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
j("month", "M");
W("month", 8);
h("M", N);
h("MM", N, B);
h("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
E(["M", "MM"], function(e, t) {
  t[he] = b(e) - 1;
});
E(["MMM", "MMMM"], function(e, t, r, n) {
  var s = r._locale.monthsParse(e, n, r._strict);
  s != null ? t[he] = s : O(r).invalidMonth = e;
});
var iu = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Cs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ps = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, au = nt, ou = nt;
function uu(e, t) {
  return e ? te(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ps).test(t) ? "format" : "standalone"][e.month()] : te(this._months) ? this._months : this._months.standalone;
}
function lu(e, t) {
  return e ? te(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ps.test(t) ? "format" : "standalone"][e.month()] : te(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function cu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ue([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = C.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = C.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = C.call(this._shortMonthsParse, a), s !== -1 ? s : (s = C.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = C.call(this._longMonthsParse, a), s !== -1 ? s : (s = C.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function fu(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return cu.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (s = ue([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
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
function As(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = b(t);
    else if (t = e.localeData().monthsParse(t), !ye(t))
      return e;
  }
  return r = Math.min(e.date(), jt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Ls(e) {
  return e != null ? (As(this, e), d.updateOffset(this, !0), this) : gt(this, "Month");
}
function du() {
  return jt(this.year(), this.month());
}
function hu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Fs.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = au), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function mu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Fs.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = ou), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Fs() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], n = [], s, i;
  for (s = 0; s < 12; s++)
    i = ue([2e3, s]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
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
_("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? oe(e, 4) : "+" + e;
});
_(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
_(0, ["YYYY", 4], 0, "year");
_(0, ["YYYYY", 5], 0, "year");
_(0, ["YYYYYY", 6, !0], 0, "year");
j("year", "y");
W("year", 1);
h("Y", It);
h("YY", N, B);
h("YYYY", Vr, Wr);
h("YYYYY", Ft, At);
h("YYYYYY", Ft, At);
E(["YYYYY", "YYYYYY"], U);
E("YYYY", function(e, t) {
  t[U] = e.length === 2 ? d.parseTwoDigitYear(e) : b(e);
});
E("YY", function(e, t) {
  t[U] = d.parseTwoDigitYear(e);
});
E("Y", function(e, t) {
  t[U] = parseInt(e, 10);
});
function Ze(e) {
  return Pt(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return b(e) + (b(e) > 68 ? 1900 : 2e3);
};
var Is = He("FullYear", !0);
function pu() {
  return Pt(this.year());
}
function yu(e, t, r, n, s, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, n, s, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, n, s, i, a), o;
}
function Je(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function St(e, t, r) {
  var n = 7 + t - r, s = (7 + Je(e, 0, n).getUTCDay() - t) % 7;
  return -s + n - 1;
}
function Us(e, t, r, n, s) {
  var i = (7 + r - n) % 7, a = St(e, n, s), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = Ze(u) + o) : o > Ze(e) ? (u = e + 1, l = o - Ze(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function Ke(e, t, r) {
  var n = St(e.year(), t, r), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return s < 1 ? (a = e.year() - 1, i = s + pe(a, t, r)) : s > pe(e.year(), t, r) ? (i = s - pe(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = s), {
    week: i,
    year: a
  };
}
function pe(e, t, r) {
  var n = St(e, t, r), s = St(e + 1, t, r);
  return (Ze(e) - n + s) / 7;
}
_("w", ["ww", 2], "wo", "week");
_("W", ["WW", 2], "Wo", "isoWeek");
j("week", "w");
j("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
h("w", N);
h("ww", N, B);
h("W", N);
h("WW", N, B);
st(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = b(e);
  }
);
function vu(e) {
  return Ke(e, this._week.dow, this._week.doy).week;
}
var _u = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function gu() {
  return this._week.dow;
}
function wu() {
  return this._week.doy;
}
function Su(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ou(e) {
  var t = Ke(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
_("d", 0, "do", "day");
_("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
_("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
_("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
_("e", 0, 0, "weekday");
_("E", 0, 0, "isoWeekday");
j("day", "d");
j("weekday", "e");
j("isoWeekday", "E");
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
st(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : O(r).invalidWeekday = e;
});
st(["d", "e", "E"], function(e, t, r, n) {
  t[n] = b(e);
});
function bu(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function ku(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Hr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Du = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), js = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Mu = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), xu = nt, Eu = nt, Tu = nt;
function Nu(e, t) {
  var r = te(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Hr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Yu(e) {
  return e === !0 ? Hr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Ru(e) {
  return e === !0 ? Hr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Cu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      i = ue([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (s = C.call(this._weekdaysParse, a), s !== -1 ? s : null) : t === "ddd" ? (s = C.call(this._shortWeekdaysParse, a), s !== -1 ? s : null) : (s = C.call(this._minWeekdaysParse, a), s !== -1 ? s : null) : t === "dddd" ? (s = C.call(this._weekdaysParse, a), s !== -1 || (s = C.call(this._shortWeekdaysParse, a), s !== -1) ? s : (s = C.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : t === "ddd" ? (s = C.call(this._shortWeekdaysParse, a), s !== -1 || (s = C.call(this._weekdaysParse, a), s !== -1) ? s : (s = C.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : (s = C.call(this._minWeekdaysParse, a), s !== -1 || (s = C.call(this._weekdaysParse, a), s !== -1) ? s : (s = C.call(this._shortWeekdaysParse, a), s !== -1 ? s : null));
}
function Pu(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Cu.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (s = ue([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
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
function Au(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = bu(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Lu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Fu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = ku(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Iu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || $r.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = xu), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Uu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || $r.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Eu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function ju(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || $r.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Tu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function $r() {
  function e(f, p) {
    return p.length - f.length;
  }
  var t = [], r = [], n = [], s = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = ue([2e3, 1]).day(i), o = G(this.weekdaysMin(a, "")), u = G(this.weekdaysShort(a, "")), l = G(this.weekdays(a, "")), t.push(o), r.push(u), n.push(l), s.push(o), s.push(u), s.push(l);
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
function Gr() {
  return this.hours() % 12 || 12;
}
function Wu() {
  return this.hours() || 24;
}
_("H", ["HH", 2], 0, "hour");
_("h", ["hh", 2], 0, Gr);
_("k", ["kk", 2], 0, Wu);
_("hmm", 0, 0, function() {
  return "" + Gr.apply(this) + oe(this.minutes(), 2);
});
_("hmmss", 0, 0, function() {
  return "" + Gr.apply(this) + oe(this.minutes(), 2) + oe(this.seconds(), 2);
});
_("Hmm", 0, 0, function() {
  return "" + this.hours() + oe(this.minutes(), 2);
});
_("Hmmss", 0, 0, function() {
  return "" + this.hours() + oe(this.minutes(), 2) + oe(this.seconds(), 2);
});
function Ws(e, t) {
  _(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ws("a", !0);
Ws("A", !1);
j("hour", "h");
W("hour", 13);
function Vs(e, t) {
  return t._meridiemParse;
}
h("a", Vs);
h("A", Vs);
h("H", N);
h("h", N);
h("k", N);
h("HH", N, B);
h("hh", N, B);
h("kk", N, B);
h("hmm", Ys);
h("hmmss", Rs);
h("Hmm", Ys);
h("Hmmss", Rs);
E(["H", "HH"], P);
E(["k", "kk"], function(e, t, r) {
  var n = b(e);
  t[P] = n === 24 ? 0 : n;
});
E(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
E(["h", "hh"], function(e, t, r) {
  t[P] = b(e), O(r).bigHour = !0;
});
E("hmm", function(e, t, r) {
  var n = e.length - 2;
  t[P] = b(e.substr(0, n)), t[Q] = b(e.substr(n)), O(r).bigHour = !0;
});
E("hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = b(e.substr(0, n)), t[Q] = b(e.substr(n, 2)), t[me] = b(e.substr(s)), O(r).bigHour = !0;
});
E("Hmm", function(e, t, r) {
  var n = e.length - 2;
  t[P] = b(e.substr(0, n)), t[Q] = b(e.substr(n));
});
E("Hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = b(e.substr(0, n)), t[Q] = b(e.substr(n, 2)), t[me] = b(e.substr(s));
});
function Vu(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Hu = /[ap]\.?m?\.?/i, $u = He("Hours", !0);
function Gu(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Hs = {
  calendar: Po,
  longDateFormat: Io,
  invalidDate: jo,
  ordinal: Vo,
  dayOfMonthOrdinalParse: Ho,
  relativeTime: Go,
  months: iu,
  monthsShort: Cs,
  week: _u,
  weekdays: Du,
  weekdaysMin: Mu,
  weekdaysShort: js,
  meridiemParse: Hu
}, Y = {}, qe = {}, Qe;
function qu(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function Fn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Bu(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = Fn(e[t]).split("-"), r = i.length, n = Fn(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = Wt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && qu(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return Qe;
}
function zu(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Wt(e) {
  var t = null, r;
  if (Y[e] === void 0 && typeof module < "u" && module && module.exports && zu(e))
    try {
      t = Qe._abbr, r = require, r("./locale/" + e), Oe(t);
    } catch {
      Y[e] = null;
    }
  return Y[e];
}
function Oe(e, t) {
  var r;
  return e && (H(t) ? r = ve(e) : r = qr(e, t), r ? Qe = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), Qe._abbr;
}
function qr(e, t) {
  if (t !== null) {
    var r, n = Hs;
    if (t.abbr = e, Y[e] != null)
      Ds(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Y[e]._config;
    else if (t.parentLocale != null)
      if (Y[t.parentLocale] != null)
        n = Y[t.parentLocale]._config;
      else if (r = Wt(t.parentLocale), r != null)
        n = r._config;
      else
        return qe[t.parentLocale] || (qe[t.parentLocale] = []), qe[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return Y[e] = new Ir(gr(n, t)), qe[e] && qe[e].forEach(function(s) {
      qr(s.name, s.config);
    }), Oe(e), Y[e];
  } else
    return delete Y[e], null;
}
function Zu(e, t) {
  if (t != null) {
    var r, n, s = Hs;
    Y[e] != null && Y[e].parentLocale != null ? Y[e].set(gr(Y[e]._config, t)) : (n = Wt(e), n != null && (s = n._config), t = gr(s, t), n == null && (t.abbr = e), r = new Ir(t), r.parentLocale = Y[e], Y[e] = r), Oe(e);
  } else
    Y[e] != null && (Y[e].parentLocale != null ? (Y[e] = Y[e].parentLocale, e === Oe() && Oe(e)) : Y[e] != null && delete Y[e]);
  return Y[e];
}
function ve(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return Qe;
  if (!te(e)) {
    if (t = Wt(e), t)
      return t;
    e = [e];
  }
  return Bu(e);
}
function Ju() {
  return wr(Y);
}
function Br(e) {
  var t, r = e._a;
  return r && O(e).overflow === -2 && (t = r[he] < 0 || r[he] > 11 ? he : r[ie] < 1 || r[ie] > jt(r[U], r[he]) ? ie : r[P] < 0 || r[P] > 24 || r[P] === 24 && (r[Q] !== 0 || r[me] !== 0 || r[Me] !== 0) ? P : r[Q] < 0 || r[Q] > 59 ? Q : r[me] < 0 || r[me] > 59 ? me : r[Me] < 0 || r[Me] > 999 ? Me : -1, O(e)._overflowDayOfYear && (t < U || t > ie) && (t = ie), O(e)._overflowWeeks && t === -1 && (t = ru), O(e)._overflowWeekday && t === -1 && (t = nu), O(e).overflow = t), e;
}
var Ku = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Qu = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Xu = /Z|[+-]\d\d(?::?\d\d)?/, ft = [
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
], fr = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], el = /^\/?Date\((-?\d+)/i, tl = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, rl = {
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
function $s(e) {
  var t, r, n = e._i, s = Ku.exec(n) || Qu.exec(n), i, a, o, u, l = ft.length, f = fr.length;
  if (s) {
    for (O(e).iso = !0, t = 0, r = l; t < r; t++)
      if (ft[t][1].exec(s[1])) {
        a = ft[t][0], i = ft[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, r = f; t < r; t++)
        if (fr[t][1].exec(s[3])) {
          o = (s[2] || " ") + fr[t][0];
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
      if (Xu.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Zr(e);
  } else
    e._isValid = !1;
}
function nl(e, t, r, n, s, i) {
  var a = [
    sl(e),
    Cs.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function sl(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function il(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function al(e, t, r) {
  if (e) {
    var n = js.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return O(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function ol(e, t, r) {
  if (e)
    return rl[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function Gs(e) {
  var t = tl.exec(il(e._i)), r;
  if (t) {
    if (r = nl(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !al(t[1], r, e))
      return;
    e._a = r, e._tzm = ol(t[8], t[9], t[10]), e._d = Je.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), O(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function ul(e) {
  var t = el.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if ($s(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Gs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = Z(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ie(e, t, r) {
  return e ?? t ?? r;
}
function ll(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function zr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = ll(e), e._w && e._a[ie] == null && e._a[he] == null && cl(e), e._dayOfYear != null && (a = Ie(e._a[U], s[U]), (e._dayOfYear > Ze(a) || e._dayOfYear === 0) && (O(e)._overflowDayOfYear = !0), r = Je(a, 0, e._dayOfYear), e._a[he] = r.getUTCMonth(), e._a[ie] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[Q] === 0 && e._a[me] === 0 && e._a[Me] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? Je : yu).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (O(e).weekdayMismatch = !0);
  }
}
function cl(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = Ie(
    t.GG,
    e._a[U],
    Ke(T(), 1, 4).year
  ), n = Ie(t.W, 1), s = Ie(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = Ke(T(), i, a), r = Ie(t.gg, e._a[U], l.year), n = Ie(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > pe(r, i, a) ? O(e)._overflowWeeks = !0 : u != null ? O(e)._overflowWeekday = !0 : (o = Us(r, n, s, i, a), e._a[U] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Zr(e) {
  if (e._f === d.ISO_8601) {
    $s(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    Gs(e);
    return;
  }
  e._a = [], O(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, f;
  for (s = Ms(e._f, e._locale).match(Ur) || [], f = s.length, r = 0; r < f; r++)
    i = s[r], n = (t.match(Xo(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && O(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), je[i] ? (n ? O(e).empty = !1 : O(e).unusedTokens.push(i), tu(i, n, e)) : e._strict && !n && O(e).unusedTokens.push(i);
  O(e).charsLeftOver = o - u, t.length > 0 && O(e).unusedInput.push(t), e._a[P] <= 12 && O(e).bigHour === !0 && e._a[P] > 0 && (O(e).bigHour = void 0), O(e).parsedDateParts = e._a.slice(0), O(e).meridiem = e._meridiem, e._a[P] = fl(
    e._locale,
    e._a[P],
    e._meridiem
  ), l = O(e).era, l !== null && (e._a[U] = e._locale.erasConvertYear(l, e._a[U])), zr(e), Br(e);
}
function fl(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function dl(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    O(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = Fr({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Zr(t), Lr(t) && (a = !0), i += O(t).charsLeftOver, i += O(t).unusedTokens.length * 10, O(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  we(e, r || t);
}
function hl(e) {
  if (!e._d) {
    var t = jr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = bs(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), zr(e);
  }
}
function ml(e) {
  var t = new rt(Br(qs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function qs(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ve(e._l), t === null || r === void 0 && t === "" ? Ct({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), re(t) ? new rt(Br(t)) : (tt(t) ? e._d = t : te(r) ? dl(e) : r ? Zr(e) : pl(e), Lr(e) || (e._d = null), e));
}
function pl(e) {
  var t = e._i;
  H(t) ? e._d = new Date(d.now()) : tt(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? ul(e) : te(t) ? (e._a = bs(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), zr(e)) : xe(t) ? hl(e) : ye(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Bs(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (xe(e) && Ar(e) || te(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, ml(i);
}
function T(e, t, r, n) {
  return Bs(e, t, r, n, !1);
}
var yl = Z(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = T.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Ct();
  }
), vl = Z(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = T.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Ct();
  }
);
function zs(e, t) {
  var r, n;
  if (t.length === 1 && te(t[0]) && (t = t[0]), !t.length)
    return T();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function _l() {
  var e = [].slice.call(arguments, 0);
  return zs("isBefore", e);
}
function gl() {
  var e = [].slice.call(arguments, 0);
  return zs("isAfter", e);
}
var wl = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Be = [
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
function Sl(e) {
  var t, r = !1, n, s = Be.length;
  for (t in e)
    if (D(e, t) && !(C.call(Be, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < s; ++n)
    if (e[Be[n]]) {
      if (r)
        return !1;
      parseFloat(e[Be[n]]) !== b(e[Be[n]]) && (r = !0);
    }
  return !0;
}
function Ol() {
  return this._isValid;
}
function bl() {
  return se(NaN);
}
function Vt(e) {
  var t = jr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, f = t.millisecond || 0;
  this._isValid = Sl(t), this._milliseconds = +f + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ve(), this._bubble();
}
function yt(e) {
  return e instanceof Vt;
}
function Or(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function kl(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && b(e[a]) !== b(t[a])) && i++;
  return i + s;
}
function Zs(e, t) {
  _(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + oe(~~(r / 60), 2) + t + oe(~~r % 60, 2);
  });
}
Zs("Z", ":");
Zs("ZZ", "");
h("Z", Ut);
h("ZZ", Ut);
E(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Jr(Ut, e);
});
var Dl = /([\+\-]|\d\d)/gi;
function Jr(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(Dl) || ["-", 0, 0], i = +(s[1] * 60) + b(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function Kr(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (re(e) || tt(e) ? e.valueOf() : T(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), d.updateOffset(r, !1), r) : T(e).local();
}
function br(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function Ml(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Jr(Ut, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = br(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? Qs(
      this,
      se(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : br(this);
}
function xl(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function El(e) {
  return this.utcOffset(0, e);
}
function Tl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(br(this), "m")), this;
}
function Nl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Jr(Ko, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Yl(e) {
  return this.isValid() ? (e = e ? T(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Rl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Cl() {
  if (!H(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Fr(e, this), e = qs(e), e._a ? (t = e._isUTC ? ue(e._a) : T(e._a), this._isDSTShifted = this.isValid() && kl(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Pl() {
  return this.isValid() ? !this._isUTC : !1;
}
function Al() {
  return this.isValid() ? this._isUTC : !1;
}
function Js() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Ll = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Fl = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function se(e, t) {
  var r = e, n = null, s, i, a;
  return yt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ye(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = Ll.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: b(n[ie]) * s,
    h: b(n[P]) * s,
    m: b(n[Q]) * s,
    s: b(n[me]) * s,
    ms: b(Or(n[Me] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = Fl.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: ke(n[2], s),
    M: ke(n[3], s),
    w: ke(n[4], s),
    d: ke(n[5], s),
    h: ke(n[6], s),
    m: ke(n[7], s),
    s: ke(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Il(
    T(r.from),
    T(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new Vt(r), yt(e) && D(e, "_locale") && (i._locale = e._locale), yt(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
se.fn = Vt.prototype;
se.invalid = bl;
function ke(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function In(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Il(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Kr(t, e), e.isBefore(t) ? r = In(e, t) : (r = In(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function Ks(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (Ds(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = se(r, n), Qs(this, s, e), this;
  };
}
function Qs(e, t, r, n) {
  var s = t._milliseconds, i = Or(t._days), a = Or(t._months);
  e.isValid() && (n = n ?? !0, a && As(e, gt(e, "Month") + a * r), i && Es(e, "Date", gt(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && d.updateOffset(e, i || a));
}
var Ul = Ks(1, "add"), jl = Ks(-1, "subtract");
function Xs(e) {
  return typeof e == "string" || e instanceof String;
}
function Wl(e) {
  return re(e) || tt(e) || Xs(e) || ye(e) || Hl(e) || Vl(e) || e === null || e === void 0;
}
function Vl(e) {
  var t = xe(e) && !Ar(e), r = !1, n = [
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
function Hl(e) {
  var t = te(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ye(n) && Xs(e);
  }).length === 0), t && r;
}
function $l(e) {
  var t = xe(e) && !Ar(e), r = !1, n = [
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
function Gl(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function ql(e, t) {
  arguments.length === 1 && (arguments[0] ? Wl(arguments[0]) ? (e = arguments[0], t = void 0) : $l(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || T(), n = Kr(r, this).startOf("day"), s = d.calendarFormat(this, n) || "sameElse", i = t && (le(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, T(r))
  );
}
function Bl() {
  return new rt(this);
}
function zl(e, t) {
  var r = re(e) ? e : T(e);
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Zl(e, t) {
  var r = re(e) ? e : T(e);
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function Jl(e, t, r, n) {
  var s = re(e) ? e : T(e), i = re(t) ? t : T(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Kl(e, t) {
  var r = re(e) ? e : T(e), n;
  return this.isValid() && r.isValid() ? (t = J(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function Ql(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Xl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function ec(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = Kr(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = J(t), t) {
    case "year":
      i = vt(this, n) / 12;
      break;
    case "month":
      i = vt(this, n);
      break;
    case "quarter":
      i = vt(this, n) / 3;
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
function vt(e, t) {
  if (e.date() < t.date())
    return -vt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function tc() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function rc(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? pt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : le(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", pt(r, "Z")) : pt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function nc() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function sc(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = pt(this, e);
  return this.localeData().postformat(t);
}
function ic(e, t) {
  return this.isValid() && (re(e) && e.isValid() || T(e).isValid()) ? se({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ac(e) {
  return this.from(T(), e);
}
function oc(e, t) {
  return this.isValid() && (re(e) && e.isValid() || T(e).isValid()) ? se({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function uc(e) {
  return this.to(T(), e);
}
function ei(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ve(e), t != null && (this._locale = t), this);
}
var ti = Z(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function ri() {
  return this._locale;
}
var Ot = 1e3, We = 60 * Ot, bt = 60 * We, ni = (365 * 400 + 97) * 24 * bt;
function Ve(e, t) {
  return (e % t + t) % t;
}
function si(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - ni : new Date(e, t, r).valueOf();
}
function ii(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - ni : Date.UTC(e, t, r);
}
function lc(e) {
  var t, r;
  if (e = J(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ii : si, e) {
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
        bt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Ve(t, We);
      break;
    case "second":
      t = this._d.valueOf(), t -= Ve(t, Ot);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function cc(e) {
  var t, r;
  if (e = J(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ii : si, e) {
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
      t = this._d.valueOf(), t += bt - Ve(
        t + (this._isUTC ? 0 : this.utcOffset() * We),
        bt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += We - Ve(t, We) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Ot - Ve(t, Ot) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function fc() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function dc() {
  return Math.floor(this.valueOf() / 1e3);
}
function hc() {
  return new Date(this.valueOf());
}
function mc() {
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
function pc() {
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
function yc() {
  return this.isValid() ? this.toISOString() : null;
}
function vc() {
  return Lr(this);
}
function _c() {
  return we({}, O(this));
}
function gc() {
  return O(this).overflow;
}
function wc() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
_("N", 0, 0, "eraAbbr");
_("NN", 0, 0, "eraAbbr");
_("NNN", 0, 0, "eraAbbr");
_("NNNN", 0, 0, "eraName");
_("NNNNN", 0, 0, "eraNarrow");
_("y", ["y", 1], "yo", "eraYear");
_("y", ["yy", 2], 0, "eraYear");
_("y", ["yyy", 3], 0, "eraYear");
_("y", ["yyyy", 4], 0, "eraYear");
h("N", Qr);
h("NN", Qr);
h("NNN", Qr);
h("NNNN", Yc);
h("NNNNN", Rc);
E(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? O(r).era = s : O(r).invalidEra = e;
  }
);
h("y", $e);
h("yy", $e);
h("yyy", $e);
h("yyyy", $e);
h("yo", Cc);
E(["y", "yy", "yyy", "yyyy"], U);
E(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[U] = r._locale.eraYearOrdinalParse(e, s) : t[U] = parseInt(e, 10);
});
function Sc(e, t) {
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
function Oc(e, t, r) {
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
function bc(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * r;
}
function kc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function Dc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function Mc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function xc() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - d(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function Ec(e) {
  return D(this, "_erasNameRegex") || Xr.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Tc(e) {
  return D(this, "_erasAbbrRegex") || Xr.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Nc(e) {
  return D(this, "_erasNarrowRegex") || Xr.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Qr(e, t) {
  return t.erasAbbrRegex(e);
}
function Yc(e, t) {
  return t.erasNameRegex(e);
}
function Rc(e, t) {
  return t.erasNarrowRegex(e);
}
function Cc(e, t) {
  return t._eraYearOrdinalRegex || $e;
}
function Xr() {
  var e = [], t = [], r = [], n = [], s, i, a = this.eras();
  for (s = 0, i = a.length; s < i; ++s)
    t.push(G(a[s].name)), e.push(G(a[s].abbr)), r.push(G(a[s].narrow)), n.push(G(a[s].name)), n.push(G(a[s].abbr)), n.push(G(a[s].narrow));
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
_(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
_(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function Ht(e, t) {
  _(0, [e, e.length], 0, t);
}
Ht("gggg", "weekYear");
Ht("ggggg", "weekYear");
Ht("GGGG", "isoWeekYear");
Ht("GGGGG", "isoWeekYear");
j("weekYear", "gg");
j("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
h("G", It);
h("g", It);
h("GG", N, B);
h("gg", N, B);
h("GGGG", Vr, Wr);
h("gggg", Vr, Wr);
h("GGGGG", Ft, At);
h("ggggg", Ft, At);
st(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = b(e);
  }
);
st(["gg", "GG"], function(e, t, r, n) {
  t[n] = d.parseTwoDigitYear(e);
});
function Pc(e) {
  return ai.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Ac(e) {
  return ai.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Lc() {
  return pe(this.year(), 1, 4);
}
function Fc() {
  return pe(this.isoWeekYear(), 1, 4);
}
function Ic() {
  var e = this.localeData()._week;
  return pe(this.year(), e.dow, e.doy);
}
function Uc() {
  var e = this.localeData()._week;
  return pe(this.weekYear(), e.dow, e.doy);
}
function ai(e, t, r, n, s) {
  var i;
  return e == null ? Ke(this, n, s).year : (i = pe(e, n, s), t > i && (t = i), jc.call(this, e, t, r, n, s));
}
function jc(e, t, r, n, s) {
  var i = Us(e, t, r, n, s), a = Je(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
_("Q", 0, "Qo", "quarter");
j("quarter", "Q");
W("quarter", 7);
h("Q", Ts);
E("Q", function(e, t) {
  t[he] = (b(e) - 1) * 3;
});
function Wc(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
_("D", ["DD", 2], "Do", "date");
j("date", "D");
W("date", 9);
h("D", N);
h("DD", N, B);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
E(["D", "DD"], ie);
E("Do", function(e, t) {
  t[ie] = b(e.match(N)[0]);
});
var oi = He("Date", !0);
_("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
j("dayOfYear", "DDD");
W("dayOfYear", 4);
h("DDD", Lt);
h("DDDD", Ns);
E(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = b(e);
});
function Vc(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
_("m", ["mm", 2], 0, "minute");
j("minute", "m");
W("minute", 14);
h("m", N);
h("mm", N, B);
E(["m", "mm"], Q);
var Hc = He("Minutes", !1);
_("s", ["ss", 2], 0, "second");
j("second", "s");
W("second", 15);
h("s", N);
h("ss", N, B);
E(["s", "ss"], me);
var $c = He("Seconds", !1);
_("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
_(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
_(0, ["SSS", 3], 0, "millisecond");
_(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
_(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
_(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
_(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
_(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
_(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
j("millisecond", "ms");
W("millisecond", 16);
h("S", Lt, Ts);
h("SS", Lt, B);
h("SSS", Lt, Ns);
var Se, ui;
for (Se = "SSSS"; Se.length <= 9; Se += "S")
  h(Se, $e);
function Gc(e, t) {
  t[Me] = b(("0." + e) * 1e3);
}
for (Se = "S"; Se.length <= 9; Se += "S")
  E(Se, Gc);
ui = He("Milliseconds", !1);
_("z", 0, 0, "zoneAbbr");
_("zz", 0, 0, "zoneName");
function qc() {
  return this._isUTC ? "UTC" : "";
}
function Bc() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = rt.prototype;
c.add = Ul;
c.calendar = ql;
c.clone = Bl;
c.diff = ec;
c.endOf = cc;
c.format = sc;
c.from = ic;
c.fromNow = ac;
c.to = oc;
c.toNow = uc;
c.get = Zo;
c.invalidAt = gc;
c.isAfter = zl;
c.isBefore = Zl;
c.isBetween = Jl;
c.isSame = Kl;
c.isSameOrAfter = Ql;
c.isSameOrBefore = Xl;
c.isValid = vc;
c.lang = ti;
c.locale = ei;
c.localeData = ri;
c.max = vl;
c.min = yl;
c.parsingFlags = _c;
c.set = Jo;
c.startOf = lc;
c.subtract = jl;
c.toArray = mc;
c.toObject = pc;
c.toDate = hc;
c.toISOString = rc;
c.inspect = nc;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = yc;
c.toString = tc;
c.unix = dc;
c.valueOf = fc;
c.creationData = wc;
c.eraName = kc;
c.eraNarrow = Dc;
c.eraAbbr = Mc;
c.eraYear = xc;
c.year = Is;
c.isLeapYear = pu;
c.weekYear = Pc;
c.isoWeekYear = Ac;
c.quarter = c.quarters = Wc;
c.month = Ls;
c.daysInMonth = du;
c.week = c.weeks = Su;
c.isoWeek = c.isoWeeks = Ou;
c.weeksInYear = Ic;
c.weeksInWeekYear = Uc;
c.isoWeeksInYear = Lc;
c.isoWeeksInISOWeekYear = Fc;
c.date = oi;
c.day = c.days = Au;
c.weekday = Lu;
c.isoWeekday = Fu;
c.dayOfYear = Vc;
c.hour = c.hours = $u;
c.minute = c.minutes = Hc;
c.second = c.seconds = $c;
c.millisecond = c.milliseconds = ui;
c.utcOffset = Ml;
c.utc = El;
c.local = Tl;
c.parseZone = Nl;
c.hasAlignedHourOffset = Yl;
c.isDST = Rl;
c.isLocal = Pl;
c.isUtcOffset = Al;
c.isUtc = Js;
c.isUTC = Js;
c.zoneAbbr = qc;
c.zoneName = Bc;
c.dates = Z(
  "dates accessor is deprecated. Use date instead.",
  oi
);
c.months = Z(
  "months accessor is deprecated. Use month instead",
  Ls
);
c.years = Z(
  "years accessor is deprecated. Use year instead",
  Is
);
c.zone = Z(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  xl
);
c.isDSTShifted = Z(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Cl
);
function zc(e) {
  return T(e * 1e3);
}
function Zc() {
  return T.apply(null, arguments).parseZone();
}
function li(e) {
  return e;
}
var M = Ir.prototype;
M.calendar = Ao;
M.longDateFormat = Uo;
M.invalidDate = Wo;
M.ordinal = $o;
M.preparse = li;
M.postformat = li;
M.relativeTime = qo;
M.pastFuture = Bo;
M.set = Co;
M.eras = Sc;
M.erasParse = Oc;
M.erasConvertYear = bc;
M.erasAbbrRegex = Tc;
M.erasNameRegex = Ec;
M.erasNarrowRegex = Nc;
M.months = uu;
M.monthsShort = lu;
M.monthsParse = fu;
M.monthsRegex = mu;
M.monthsShortRegex = hu;
M.week = vu;
M.firstDayOfYear = wu;
M.firstDayOfWeek = gu;
M.weekdays = Nu;
M.weekdaysMin = Ru;
M.weekdaysShort = Yu;
M.weekdaysParse = Pu;
M.weekdaysRegex = Iu;
M.weekdaysShortRegex = Uu;
M.weekdaysMinRegex = ju;
M.isPM = Vu;
M.meridiem = Gu;
function kt(e, t, r, n) {
  var s = ve(), i = ue().set(n, t);
  return s[r](i, e);
}
function ci(e, t, r) {
  if (ye(e) && (t = e, e = void 0), e = e || "", t != null)
    return kt(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = kt(e, n, r, "month");
  return s;
}
function en(e, t, r, n) {
  typeof e == "boolean" ? (ye(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ye(t) && (r = t, t = void 0), t = t || "");
  var s = ve(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return kt(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = kt(t, (a + i) % 7, n, "day");
  return o;
}
function Jc(e, t) {
  return ci(e, t, "months");
}
function Kc(e, t) {
  return ci(e, t, "monthsShort");
}
function Qc(e, t, r) {
  return en(e, t, r, "weekdays");
}
function Xc(e, t, r) {
  return en(e, t, r, "weekdaysShort");
}
function ef(e, t, r) {
  return en(e, t, r, "weekdaysMin");
}
Oe("en", {
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
d.lang = Z(
  "moment.lang is deprecated. Use moment.locale instead.",
  Oe
);
d.langData = Z(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ve
);
var fe = Math.abs;
function tf() {
  var e = this._data;
  return this._milliseconds = fe(this._milliseconds), this._days = fe(this._days), this._months = fe(this._months), e.milliseconds = fe(e.milliseconds), e.seconds = fe(e.seconds), e.minutes = fe(e.minutes), e.hours = fe(e.hours), e.months = fe(e.months), e.years = fe(e.years), this;
}
function fi(e, t, r, n) {
  var s = se(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function rf(e, t) {
  return fi(this, e, t, 1);
}
function nf(e, t) {
  return fi(this, e, t, -1);
}
function Un(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function sf() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Un(kr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = z(e / 1e3), n.seconds = s % 60, i = z(s / 60), n.minutes = i % 60, a = z(i / 60), n.hours = a % 24, t += z(a / 24), u = z(di(t)), r += u, t -= Un(kr(u)), o = z(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function di(e) {
  return e * 4800 / 146097;
}
function kr(e) {
  return e * 146097 / 4800;
}
function af(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = J(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + di(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(kr(this._months)), e) {
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
function of() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + b(this._months / 12) * 31536e6 : NaN;
}
function _e(e) {
  return function() {
    return this.as(e);
  };
}
var uf = _e("ms"), lf = _e("s"), cf = _e("m"), ff = _e("h"), df = _e("d"), hf = _e("w"), mf = _e("M"), pf = _e("Q"), yf = _e("y");
function vf() {
  return se(this);
}
function _f(e) {
  return e = J(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ye(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var gf = Ye("milliseconds"), wf = Ye("seconds"), Sf = Ye("minutes"), Of = Ye("hours"), bf = Ye("days"), kf = Ye("months"), Df = Ye("years");
function Mf() {
  return z(this.days() / 7);
}
var de = Math.round, Ue = {
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
function xf(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function Ef(e, t, r, n) {
  var s = se(e).abs(), i = de(s.as("s")), a = de(s.as("m")), o = de(s.as("h")), u = de(s.as("d")), l = de(s.as("M")), f = de(s.as("w")), p = de(s.as("y")), m = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (m = m || f <= 1 && ["w"] || f < r.w && ["ww", f]), m = m || l <= 1 && ["M"] || l < r.M && ["MM", l] || p <= 1 && ["y"] || ["yy", p], m[2] = t, m[3] = +e > 0, m[4] = n, xf.apply(null, m);
}
function Tf(e) {
  return e === void 0 ? de : typeof e == "function" ? (de = e, !0) : !1;
}
function Nf(e, t) {
  return Ue[e] === void 0 ? !1 : t === void 0 ? Ue[e] : (Ue[e] = t, e === "s" && (Ue.ss = t - 1), !0);
}
function Yf(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = Ue, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, Ue, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = Ef(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var dr = Math.abs;
function Fe(e) {
  return (e > 0) - (e < 0) || +e;
}
function $t() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = dr(this._milliseconds) / 1e3, t = dr(this._days), r = dr(this._months), n, s, i, a, o = this.asSeconds(), u, l, f, p;
  return o ? (n = z(e / 60), s = z(n / 60), e %= 60, n %= 60, i = z(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = Fe(this._months) !== Fe(o) ? "-" : "", f = Fe(this._days) !== Fe(o) ? "-" : "", p = Fe(this._milliseconds) !== Fe(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? f + t + "D" : "") + (s || n || e ? "T" : "") + (s ? p + s + "H" : "") + (n ? p + n + "M" : "") + (e ? p + a + "S" : "")) : "P0D";
}
var k = Vt.prototype;
k.isValid = Ol;
k.abs = tf;
k.add = rf;
k.subtract = nf;
k.as = af;
k.asMilliseconds = uf;
k.asSeconds = lf;
k.asMinutes = cf;
k.asHours = ff;
k.asDays = df;
k.asWeeks = hf;
k.asMonths = mf;
k.asQuarters = pf;
k.asYears = yf;
k.valueOf = of;
k._bubble = sf;
k.clone = vf;
k.get = _f;
k.milliseconds = gf;
k.seconds = wf;
k.minutes = Sf;
k.hours = Of;
k.days = bf;
k.weeks = Mf;
k.months = kf;
k.years = Df;
k.humanize = Yf;
k.toISOString = $t;
k.toString = $t;
k.toJSON = $t;
k.locale = ei;
k.localeData = ri;
k.toIsoString = Z(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  $t
);
k.lang = ti;
_("X", 0, 0, "unix");
_("x", 0, 0, "valueOf");
h("x", It);
h("X", Qo);
E("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
E("x", function(e, t, r) {
  r._d = new Date(b(e));
});
//! moment.js
d.version = "2.29.4";
Yo(T);
d.fn = c;
d.min = _l;
d.max = gl;
d.now = wl;
d.utc = ue;
d.unix = zc;
d.months = Jc;
d.isDate = tt;
d.locale = Oe;
d.invalid = Ct;
d.duration = se;
d.isMoment = re;
d.weekdays = Qc;
d.parseZone = Zc;
d.localeData = ve;
d.isDuration = yt;
d.monthsShort = Kc;
d.weekdaysMin = ef;
d.defineLocale = qr;
d.updateLocale = Zu;
d.locales = Ju;
d.weekdaysShort = Xc;
d.normalizeUnits = J;
d.relativeTimeRounding = Tf;
d.relativeTimeThreshold = Nf;
d.calendarFormat = Gl;
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
function jn(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var F = function() {
};
F.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (be.defaults.headers.common["X-CSRF-Token"] = e.content), be.defaults.headers.common.Accept = "application/json", be.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, F.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  I.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = be.CancelToken.source();
}, F.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, F.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, F.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = jn(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return be(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, F.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = jn(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), I.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, F.cancelTokenSources = {}, F.active = 0, be.interceptors.request.use(function(e) {
  return F.active += 1, e;
}, function(e) {
  return F.active -= 1, Promise.reject(e);
}), be.interceptors.response.use(function(e) {
  return F.active -= 1, e;
}, function(e) {
  return F.active -= 1, Promise.reject(e);
}), window.Api = F;
var I = { isString: function(e) {
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
} }, Wn = Object.freeze({ __proto__: null, Api: F, Utils: I }), Rf = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Wn).forEach(function(r) {
    t.component(r, Wn[r]);
  }));
} }, dt = null;
typeof window < "u" ? dt = window.Vue : typeof global < "u" && (dt = global.Vue), dt && dt.use(Rf);
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
    disableValidation: f = !1,
    hideValidationErrors: p = !1,
    ...m
  }) {
    tn.use(cn), window.toto = "TOTO";
    let y = {
      /*   'botyglot-input': Field,
         'botyglot-form': Form,
         'botyglot-hidden': Hidden,
         'botyglot-submit': Submit,
         'botyglot-label': Label,
         'botyglot-errors-placeholder': ErrorsPlaceholder,
         'botyglot-suggested-value': SuggestedValue,*/
    };
    const x = Object.keys(u)[0];
    let { errors: K, warnings: w, suggested_values: Ge, potential_values: Gt, ...it } = u[x], at = {
      values: {
        [x]: it || {}
      },
      errors: {
        [x]: K || {}
      },
      warnings: {
        [x]: w || {}
      },
      touched: {
        [x]: {
          _submit: l
        }
      },
      potentialValues: {
        [x]: Gt || {}
      },
      suggestedValues: {
        [x]: Ge || {}
      },
      meta: Object.assign({
        modelName: x,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: f,
        hideValidationErrors: p
      }, m)
    };
    this.store = new cn.Store({
      state: at,
      plugins: a,
      getters: {
        getValue: (v) => (g) => {
          let S = I.dotify(g);
          return ge(S.split("."), v.values);
        },
        getError: (v) => (g) => {
          let S = I.dotify(g);
          return v.meta.hideValidationErrors ? null : ge(S.split("."), v.errors);
        },
        getWarning: (v) => (g) => {
          let S = I.dotify(g);
          return v.meta.hideValidationErrors ? null : ge(S.split("."), v.warnings);
        },
        getTouched: (v) => (g) => {
          let S = I.dotify(g);
          return ge(S.split("."), v.touched) || ge([x, "_submit"], v.touched);
        },
        getMeta: (v) => (g) => {
          let S = I.dotify(g);
          return ge(S.split("."), v.meta);
        },
        getPotentialValues: (v) => (g) => {
          let S = I.dotify(g);
          return ge(S.split("."), v.potentialValues);
        },
        getSuggestedValues: (v) => (g) => {
          let S = I.dotify(g);
          return ge(S.split("."), v.suggestedValues);
        }
      },
      mutations: {
        setValue: function(v, g) {
          let S = I.dotify(g.name);
          v.values = Pe(S.split("."), g.value, v.values);
        },
        setTouched: function(v, g) {
          let S = I.dotify(g.name);
          v.touched = Pe(S.split("."), g.value, v.touched);
        },
        setError: function(v, g) {
          let S = I.dotify(g.name);
          v.errors = Pe(S.split("."), g.value, v.errors);
        },
        setWarning: function(v, g) {
          let S = I.dotify(g.name);
          v.warnings = Pe(S.split("."), g.value, v.warnings);
        },
        setPotentialValues: function(v, g) {
          let S = I.dotify(g.name);
          v.potentialValues = Pe(S.split("."), g.value, v.potentialValues);
        },
        setSuggestedValues: function(v, g) {
          let S = I.dotify(g.name);
          v.suggestedValues = Pe(S.split("."), g.value, v.suggestedValues);
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
        genericSendDataToServer: function(v, g) {
          let { sid: S, url: $, method: ce, data: ot, onSuccess: hi, onError: mi, ...pi } = g, yi = (ut) => {
            let _i = Object.assign(pi, {
              sid: S,
              response: ut
            });
            v.dispatch("genericDataReceivedFromServer", _i);
          }, vi = (ut) => {
            console.log("There was a problem with validating the data"), console.log(ut), console.log(JSON.stringify(ut, null, 2));
          };
          F.sendRequest({
            url: $,
            method: ce || "post",
            data: ot,
            onSuccess: hi || yi,
            onError: mi || vi,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(v, g) {
        },
        sendValuesToServer: function(v) {
          if (f) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let g = (ce) => {
              v.dispatch("dataReceivedFromServer", ce.data);
            }, S = (ce) => {
              console.log("There was a problem with validating the data"), console.log(ce), console.log(JSON.stringify(ce, null, 2));
            }, $ = Object.assign({
              utf8: "✓",
              authenticity_token: v.state.meta.authenticityToken,
              _method: v.state.meta.httpMethod
            }, ha(v.state.values));
            $[x]._prevent_save = !0, F.sendRequest({ url: v.state.meta.validationUrl, data: $, method: v.state.meta.httpMethod, onSuccess: g, onError: S, delay: !0 });
          }
        },
        dataReceivedFromServer: function(v, g) {
          let { errors: S, warnings: $, potential_values: ce, suggested_values: ot } = g[x];
          S && v.commit("setError", {
            value: S,
            name: x
          }), $ && v.commit("setWarning", {
            value: $,
            name: x
          }), ce && v.commit("setPotentialValues", {
            value: ce,
            name: x
          }), ot && v.commit("setSuggestedValues", {
            value: ot,
            name: x
          });
        },
        update: function(v, g) {
          v.commit("setValue", g), v.dispatch("sendValuesToServer");
        }
      }
    }), this.app = new tn({
      el: n,
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(y, t),
      props: {}
    });
  }
}
const Vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormStore: Cf
}, Symbol.toStringTag, { value: "Module" }));
function Dr(e) {
  Dr.installed || (Dr.installed = !0, Object.keys(Vn).forEach((t) => {
    e.component(t, Vn[t]);
  }));
}
const Pf = {
  install: Dr
};
let Dt = null;
typeof window < "u" ? Dt = window.Vue : typeof global < "u" && (Dt = global.Vue);
Dt && Dt.use(Pf);
export {
  Cf as FormStore,
  Pf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
