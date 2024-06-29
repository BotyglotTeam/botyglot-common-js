import { watch as Wn, effectScope as _i, reactive as yi, computed as gi, openBlock as U, createElementBlock as B, normalizeClass as Un, toDisplayString as Mr, createCommentVNode as Ne, renderSlot as Tr, resolveComponent as rn, createBlock as nn, withCtx as vi, createElementVNode as mt, withDirectives as jn, mergeProps as Et, vModelDynamic as Hn, withModifiers as wi, Fragment as Si, renderList as bi, normalizeProps as Oi, createApp as ki } from "vue";
function Di() {
  return Gn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Gn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Mi = typeof Proxy == "function", Ti = "devtools-plugin:setup", Ei = "plugin:settings:set";
let Ve, mr;
function xi() {
  var e;
  return Ve !== void 0 || (typeof window < "u" && window.performance ? (Ve = !0, mr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Ve = !0, mr = globalThis.perf_hooks.performance) : Ve = !1), Ve;
}
function Ni() {
  return xi() ? mr.now() : Date.now();
}
class Yi {
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
        return Ni();
      }
    }, r && r.on(Ei, (a, o) => {
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
function Ci(e, t) {
  const r = e, n = Gn(), s = Di(), i = Mi && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Ti, e, t);
  else {
    const a = i ? new Yi(r, s) : null;
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
var Ri = "store";
function Ce(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function Pi(e) {
  return e !== null && typeof e == "object";
}
function Ai(e) {
  return e && typeof e.then == "function";
}
function ee(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function Vi(e, t) {
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
  xt(e, r, [], e._modules.root, !0), Er(e, r, t);
}
function Er(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = _i(!0);
  u.run(function() {
    Ce(i, function(l, h) {
      a[h] = Vi(l, e), o[h] = gi(function() {
        return a[h]();
      }), Object.defineProperty(e.getters, h, {
        get: function() {
          return o[h].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = yi({
    data: t
  }), e._scope = u, e.strict && Wi(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function xt(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = xr(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = Li(e, a, r);
  n.forEachMutation(function(h, m) {
    var p = a + m;
    $i(e, p, h, l);
  }), n.forEachAction(function(h, m) {
    var p = h.root ? m : a + m, g = h.handler || h;
    Fi(e, p, g, l);
  }), n.forEachGetter(function(h, m) {
    var p = a + m;
    Ii(e, p, h, l);
  }), n.forEachChild(function(h, m) {
    xt(e, t, r.concat(m), h, s);
  });
}
function Li(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = wt(i, a, o), l = u.payload, h = u.options, m = u.type;
      if ((!h || !h.root) && (m = t + m, process.env.NODE_ENV !== "production" && !e._actions[m])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + m);
        return;
      }
      return e.dispatch(m, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = wt(i, a, o), l = u.payload, h = u.options, m = u.type;
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
        return zn(e, t);
      }
    },
    state: {
      get: function() {
        return xr(e.state, r);
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
function $i(e, t, r, n) {
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
    return Ai(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
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
function Wi(e) {
  Wn(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && ee(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function xr(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function wt(e, t, r) {
  return Pi(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && ee(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var Ui = "vuex bindings", sn = "vuex:mutations", Bt = "vuex:actions", Le = "vuex", ji = 0;
function Hi(e, t) {
  Ci(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [Ui]
    },
    function(r) {
      r.addTimelineLayer({
        id: sn,
        label: "Vuex Mutations",
        color: an
      }), r.addTimelineLayer({
        id: Bt,
        label: "Vuex Actions",
        color: an
      }), r.addInspector({
        id: Le,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === Le)
          if (n.filter) {
            var s = [];
            Qn(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              Kn(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Le) {
          var s = n.nodeId;
          zn(t, s), n.state = Bi(
            Zi(t._modules, s),
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
          layerId: sn,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = ji++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
            layerId: Bt,
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
            layerId: Bt,
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
var an = 8702998, Gi = 6710886, qi = 16777215, Zn = {
  label: "namespaced",
  textColor: qi,
  backgroundColor: Gi
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
function Bi(e, t, r) {
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
    var i = zi(t);
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
function zi(e) {
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
function Zi(e, t) {
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
var se = function(t, r) {
  this.runtime = r, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var n = t.state;
  this.state = (typeof n == "function" ? n() : n) || {};
}, Xn = { namespaced: { configurable: !0 } };
Xn.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
se.prototype.addChild = function(t, r) {
  this._children[t] = r;
};
se.prototype.removeChild = function(t) {
  delete this._children[t];
};
se.prototype.getChild = function(t) {
  return this._children[t];
};
se.prototype.hasChild = function(t) {
  return t in this._children;
};
se.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
se.prototype.forEachChild = function(t) {
  Ce(this._children, t);
};
se.prototype.forEachGetter = function(t) {
  this._rawModule.getters && Ce(this._rawModule.getters, t);
};
se.prototype.forEachAction = function(t) {
  this._rawModule.actions && Ce(this._rawModule.actions, t);
};
se.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && Ce(this._rawModule.mutations, t);
};
Object.defineProperties(se.prototype, Xn);
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
  es([], this.root, t);
};
Re.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && ts(t, r);
  var i = new se(r, n);
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
var on = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, Ji = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, un = {
  getters: on,
  mutations: on,
  actions: Ji
};
function ts(e, t) {
  Object.keys(un).forEach(function(r) {
    if (t[r]) {
      var n = un[r];
      Ce(t[r], function(s, i) {
        ee(
          n.assert(s),
          Ki(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function Ki(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function Qi(e) {
  return new H(e);
}
var H = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (ee(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), ee(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Re(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(p, g) {
    return u.call(a, p, g);
  }, this.commit = function(p, g, Y) {
    return l.call(a, p, g, Y);
  }, this.strict = s;
  var h = this._modules.root.state;
  xt(this, h, [], this._modules.root), Er(this, h), n.forEach(function(m) {
    return m(r);
  });
}, Nr = { state: { configurable: !0 } };
H.prototype.install = function(t, r) {
  t.provide(r || Ri, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Hi(t, this);
};
Nr.state.get = function() {
  return this._state.data;
};
Nr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && ee(!1, "use store.replaceState() to explicit replace store state.");
};
H.prototype.commit = function(t, r, n) {
  var s = this, i = wt(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, h = this._mutations[a];
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
  var n = this, s = wt(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
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
        n._actionSubscribers.filter(function(g) {
          return g.after;
        }).forEach(function(g) {
          return g.after(o, n.state);
        });
      } catch (g) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(g));
      }
      h(p);
    }, function(p) {
      try {
        n._actionSubscribers.filter(function(g) {
          return g.error;
        }).forEach(function(g) {
          return g.error(o, n.state, p);
        });
      } catch (g) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(g));
      }
      m(p);
    });
  });
};
H.prototype.subscribe = function(t, r) {
  return qn(t, this._subscribers, r);
};
H.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return qn(n, this._actionSubscribers, r);
};
H.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && ee(typeof t == "function", "store.watch only accepts a function."), Wn(function() {
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
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (ee(Array.isArray(t), "module path must be a string or an Array."), ee(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), xt(this, this.state, t, this._modules.get(t), n.preserveState), Er(this, this.state);
};
H.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && ee(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = xr(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), Bn(this);
};
H.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && ee(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
H.prototype.hotUpdate = function(t) {
  this._modules.update(t), Bn(this, !0);
};
H.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(H.prototype, Nr);
function C(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function oe(e) {
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
        return C(r) ? t : oe(function(s) {
          return e(r, s);
        });
      default:
        return C(r) && C(n) ? t : C(r) ? oe(function(s) {
          return e(s, n);
        }) : C(n) ? oe(function(s) {
          return e(r, s);
        }) : e(r, n);
    }
  };
}
function rs(e) {
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
        }) : oe(function(i) {
          return e(r, n, i);
        });
      default:
        return C(r) && C(n) && C(s) ? t : C(r) && C(n) ? Ee(function(i, a) {
          return e(i, a, s);
        }) : C(r) && C(s) ? Ee(function(i, a) {
          return e(i, n, a);
        }) : C(n) && C(s) ? Ee(function(i, a) {
          return e(r, i, a);
        }) : C(r) ? oe(function(i) {
          return e(i, n, s);
        }) : C(n) ? oe(function(i) {
          return e(r, i, s);
        }) : C(s) ? oe(function(i) {
          return e(r, n, i);
        }) : e(r, n, s);
    }
  };
}
const Xi = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function ea(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var ta = /* @__PURE__ */ Ee(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const we = ta;
var ra = /* @__PURE__ */ rs(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const na = ra, ln = Number.isInteger || function(t) {
  return t << 0 === t;
};
var sa = /* @__PURE__ */ oe(function(t) {
  return t == null;
});
const ia = sa;
var aa = /* @__PURE__ */ rs(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !ia(n) && ea(s, n) ? n[s] : ln(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (ln(s) && Xi(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return na(s, r, n);
});
const $e = aa;
function oa(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var ua = /* @__PURE__ */ oe(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const la = ua;
function ns(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? ns(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (la(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return oa(e);
    default:
      return e;
  }
}
var ca = /* @__PURE__ */ oe(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : ns(t, [], [], !0);
});
const da = ca;
function fa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yr = { exports: {} }, ss = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, ha = ss, Pe = Object.prototype.toString;
function Cr(e) {
  return Pe.call(e) === "[object Array]";
}
function _r(e) {
  return typeof e > "u";
}
function ma(e) {
  return e !== null && !_r(e) && e.constructor !== null && !_r(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function pa(e) {
  return Pe.call(e) === "[object ArrayBuffer]";
}
function _a(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function ya(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function ga(e) {
  return typeof e == "string";
}
function va(e) {
  return typeof e == "number";
}
function is(e) {
  return e !== null && typeof e == "object";
}
function pt(e) {
  if (Pe.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function wa(e) {
  return Pe.call(e) === "[object Date]";
}
function Sa(e) {
  return Pe.call(e) === "[object File]";
}
function ba(e) {
  return Pe.call(e) === "[object Blob]";
}
function as(e) {
  return Pe.call(e) === "[object Function]";
}
function Oa(e) {
  return is(e) && as(e.pipe);
}
function ka(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function Da(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Ma() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Rr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Cr(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function yr() {
  var e = {};
  function t(s, i) {
    pt(e[i]) && pt(s) ? e[i] = yr(e[i], s) : pt(s) ? e[i] = yr({}, s) : Cr(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Rr(arguments[r], t);
  return e;
}
function Ta(e, t, r) {
  return Rr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = ha(s, r) : e[i] = s;
  }), e;
}
function Ea(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var z = {
  isArray: Cr,
  isArrayBuffer: pa,
  isBuffer: ma,
  isFormData: _a,
  isArrayBufferView: ya,
  isString: ga,
  isNumber: va,
  isObject: is,
  isPlainObject: pt,
  isUndefined: _r,
  isDate: wa,
  isFile: Sa,
  isBlob: ba,
  isFunction: as,
  isStream: Oa,
  isURLSearchParams: ka,
  isStandardBrowserEnv: Ma,
  forEach: Rr,
  merge: yr,
  extend: Ta,
  trim: Da,
  stripBOM: Ea
}, Fe = z;
function cn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var os = function(t, r, n) {
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
      u === null || typeof u > "u" || (Fe.isArray(u) ? l = l + "[]" : u = [u], Fe.forEach(u, function(m) {
        Fe.isDate(m) ? m = m.toISOString() : Fe.isObject(m) && (m = JSON.stringify(m)), i.push(cn(l) + "=" + cn(m));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, xa = z;
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
  xa.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Na = Nt, Ya = z, Ca = function(t, r) {
  Ya.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, us = function(t, r, n, s, i) {
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
}, zt, dn;
function ls() {
  if (dn)
    return zt;
  dn = 1;
  var e = us;
  return zt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, zt;
}
var Zt, fn;
function Ra() {
  if (fn)
    return Zt;
  fn = 1;
  var e = ls();
  return Zt = function(r, n, s) {
    var i = s.config.validateStatus;
    !s.status || !i || i(s.status) ? r(s) : n(e(
      "Request failed with status code " + s.status,
      s.config,
      null,
      s.request,
      s
    ));
  }, Zt;
}
var Jt, hn;
function Pa() {
  if (hn)
    return Jt;
  hn = 1;
  var e = z;
  return Jt = e.isStandardBrowserEnv() ? (
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
  ), Jt;
}
var Kt, mn;
function Aa() {
  return mn || (mn = 1, Kt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Kt;
}
var Qt, pn;
function Va() {
  return pn || (pn = 1, Qt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), Qt;
}
var Xt, _n;
function La() {
  if (_n)
    return Xt;
  _n = 1;
  var e = Aa(), t = Va();
  return Xt = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, Xt;
}
var er, yn;
function $a() {
  if (yn)
    return er;
  yn = 1;
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
  return er = function(n) {
    var s = {}, i, a, o;
    return n && e.forEach(n.split(`
`), function(l) {
      if (o = l.indexOf(":"), i = e.trim(l.substr(0, o)).toLowerCase(), a = e.trim(l.substr(o + 1)), i) {
        if (s[i] && t.indexOf(i) >= 0)
          return;
        i === "set-cookie" ? s[i] = (s[i] ? s[i] : []).concat([a]) : s[i] = s[i] ? s[i] + ", " + a : a;
      }
    }), s;
  }, er;
}
var tr, gn;
function Fa() {
  if (gn)
    return tr;
  gn = 1;
  var e = z;
  return tr = e.isStandardBrowserEnv() ? (
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
  ), tr;
}
var rr, vn;
function wn() {
  if (vn)
    return rr;
  vn = 1;
  var e = z, t = Ra(), r = Pa(), n = os, s = La(), i = $a(), a = Fa(), o = ls();
  return rr = function(l) {
    return new Promise(function(m, p) {
      var g = l.data, Y = l.headers, De = l.responseType;
      e.isFormData(g) && delete Y["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var Gt = l.auth.username || "", qt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        Y.Authorization = "Basic " + btoa(Gt + ":" + qt);
      }
      var ot = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(ot, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function ut() {
        if (w) {
          var v = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !De || De === "text" || De === "json" ? w.responseText : w.response, G = {
            data: S,
            status: w.status,
            statusText: w.statusText,
            headers: v,
            config: l,
            request: w
          };
          t(m, p, G), w = null;
        }
      }
      if ("onloadend" in w ? w.onloadend = ut : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(ut);
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
        var _ = (l.withCredentials || a(ot)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        _ && (Y[l.xsrfHeaderName] = _);
      }
      "setRequestHeader" in w && e.forEach(Y, function(S, G) {
        typeof g > "u" && G.toLowerCase() === "content-type" ? delete Y[G] : w.setRequestHeader(G, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), De && De !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), p(S), w = null);
      }), g || (g = null), w.send(g);
    });
  }, rr;
}
var A = z, Sn = Ca, Ia = us, Wa = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function bn(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function Ua() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = wn()), e;
}
function ja(e, t, r) {
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
  adapter: Ua(),
  transformRequest: [function(t, r) {
    return Sn(r, "Accept"), Sn(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (bn(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (bn(r, "application/json"), ja(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Ia(a, this, "E_JSON_PARSE") : a;
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
  Yt.headers[t] = A.merge(Wa);
});
var Pr = Yt, Ha = z, Ga = Pr, qa = function(t, r, n) {
  var s = this || Ga;
  return Ha.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, nr, On;
function cs() {
  return On || (On = 1, nr = function(t) {
    return !!(t && t.__CANCEL__);
  }), nr;
}
var kn = z, sr = qa, Ba = cs(), za = Pr;
function ir(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Za = function(t) {
  ir(t), t.headers = t.headers || {}, t.data = sr.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = kn.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), kn.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete t.headers[s];
    }
  );
  var r = t.adapter || za.adapter;
  return r(t).then(function(s) {
    return ir(t), s.data = sr.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return Ba(s) || (ir(t), s && s.response && (s.response.data = sr.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, V = z, ds = function(t, r) {
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
  function u(p, g) {
    return V.isPlainObject(p) && V.isPlainObject(g) ? V.merge(p, g) : V.isPlainObject(g) ? V.merge({}, g) : V.isArray(g) ? g.slice() : g;
  }
  function l(p) {
    V.isUndefined(r[p]) ? V.isUndefined(t[p]) || (n[p] = u(void 0, t[p])) : n[p] = u(t[p], r[p]);
  }
  V.forEach(s, function(g) {
    V.isUndefined(r[g]) || (n[g] = u(void 0, r[g]));
  }), V.forEach(i, l), V.forEach(a, function(g) {
    V.isUndefined(r[g]) ? V.isUndefined(t[g]) || (n[g] = u(void 0, t[g])) : n[g] = u(void 0, r[g]);
  }), V.forEach(o, function(g) {
    g in r ? n[g] = u(t[g], r[g]) : g in t && (n[g] = u(void 0, t[g]));
  });
  var h = s.concat(i).concat(a).concat(o), m = Object.keys(t).concat(Object.keys(r)).filter(function(g) {
    return h.indexOf(g) === -1;
  });
  return V.forEach(m, l), n;
};
const Ja = "axios", Ka = "0.21.4", Qa = "Promise based HTTP client for the browser and node.js", Xa = "index.js", eo = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, to = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, ro = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], no = "Matt Zabriskie", so = "MIT", io = {
  url: "https://github.com/axios/axios/issues"
}, ao = "https://axios-http.com", oo = {
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
}, uo = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, lo = "dist/axios.min.js", co = "dist/axios.min.js", fo = "./index.d.ts", ho = {
  "follow-redirects": "^1.14.0"
}, mo = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], po = {
  name: Ja,
  version: Ka,
  description: Qa,
  main: Xa,
  scripts: eo,
  repository: to,
  keywords: ro,
  author: no,
  license: so,
  bugs: io,
  homepage: ao,
  devDependencies: oo,
  browser: uo,
  jsdelivr: lo,
  unpkg: co,
  typings: fo,
  dependencies: ho,
  bundlesize: mo
};
var fs = po, Ar = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Ar[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Dn = {}, _o = fs.version.split(".");
function hs(e, t) {
  for (var r = t ? t.split(".") : _o, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
Ar.transitional = function(t, r, n) {
  var s = r && hs(r);
  function i(a, o) {
    return "[Axios v" + fs.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !Dn[o] && (Dn[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, o, u) : !0;
  };
};
function yo(e, t, r) {
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
var go = {
  isOlderVersion: hs,
  assertOptions: yo,
  validators: Ar
}, ms = z, vo = os, Mn = Na, Tn = Za, Ct = ds, ps = go, Ie = ps.validators;
function rt(e) {
  this.defaults = e, this.interceptors = {
    request: new Mn(),
    response: new Mn()
  };
}
rt.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Ct(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && ps.assertOptions(r, {
    silentJSONParsing: Ie.transitional(Ie.boolean, "1.0.0"),
    forcedJSONParsing: Ie.transitional(Ie.boolean, "1.0.0"),
    clarifyTimeoutError: Ie.transitional(Ie.boolean, "1.0.0")
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
    var o = [Tn, void 0];
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
    a = Tn(u);
  } catch (m) {
    return Promise.reject(m);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
rt.prototype.getUri = function(t) {
  return t = Ct(this.defaults, t), vo(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
ms.forEach(["delete", "get", "head", "options"], function(t) {
  rt.prototype[t] = function(r, n) {
    return this.request(Ct(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
ms.forEach(["post", "put", "patch"], function(t) {
  rt.prototype[t] = function(r, n, s) {
    return this.request(Ct(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var wo = rt, ar, En;
function _s() {
  if (En)
    return ar;
  En = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, ar = e, ar;
}
var or, xn;
function So() {
  if (xn)
    return or;
  xn = 1;
  var e = _s();
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
  }, or = t, or;
}
var ur, Nn;
function bo() {
  return Nn || (Nn = 1, ur = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), ur;
}
var lr, Yn;
function Oo() {
  return Yn || (Yn = 1, lr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), lr;
}
var Cn = z, ko = ss, _t = wo, Do = ds, Mo = Pr;
function ys(e) {
  var t = new _t(e), r = ko(_t.prototype.request, t);
  return Cn.extend(r, _t.prototype, t), Cn.extend(r, t), r;
}
var te = ys(Mo);
te.Axios = _t;
te.create = function(t) {
  return ys(Do(te.defaults, t));
};
te.Cancel = _s();
te.CancelToken = So();
te.isCancel = cs();
te.all = function(t) {
  return Promise.all(t);
};
te.spread = bo();
te.isAxiosError = Oo();
Yr.exports = te;
Yr.exports.default = te;
var To = Yr.exports, Eo = To;
const Me = /* @__PURE__ */ fa(Eo);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var gs;
function d() {
  return gs.apply(null, arguments);
}
function xo(e) {
  gs = e;
}
function re(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ye(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function D(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Vr(e) {
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
function ye(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function nt(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function vs(e, t) {
  var r = [], n, s = e.length;
  for (n = 0; n < s; ++n)
    r.push(t(e[n], n));
  return r;
}
function Se(e, t) {
  for (var r in t)
    D(t, r) && (e[r] = t[r]);
  return D(t, "toString") && (e.toString = t.toString), D(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function le(e, t, r, n) {
  return js(e, t, r, n, !0).utc();
}
function No() {
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
  return e._pf == null && (e._pf = No()), e._pf;
}
var gr;
Array.prototype.some ? gr = Array.prototype.some : gr = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Lr(e) {
  if (e._isValid == null) {
    var t = b(e), r = gr.call(t.parsedDateParts, function(s) {
      return s != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function Rt(e) {
  var t = le(NaN);
  return e != null ? Se(b(t), e) : b(t).userInvalidated = !0, t;
}
var Rn = d.momentProperties = [], cr = !1;
function $r(e, t) {
  var r, n, s, i = Rn.length;
  if (j(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), j(t._i) || (e._i = t._i), j(t._f) || (e._f = t._f), j(t._l) || (e._l = t._l), j(t._strict) || (e._strict = t._strict), j(t._tzm) || (e._tzm = t._tzm), j(t._isUTC) || (e._isUTC = t._isUTC), j(t._offset) || (e._offset = t._offset), j(t._pf) || (e._pf = b(t)), j(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = Rn[r], s = t[n], j(s) || (e[n] = s);
  return e;
}
function st(e) {
  $r(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), cr === !1 && (cr = !0, d.updateOffset(this), cr = !1);
}
function ne(e) {
  return e instanceof st || e != null && e._isAMomentObject != null;
}
function ws(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function K(e, t) {
  var r = !0;
  return Se(function() {
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
      ws(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Pn = {};
function Ss(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), Pn[e] || (ws(t), Pn[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function ce(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Yo(e) {
  var t, r;
  for (r in e)
    D(e, r) && (t = e[r], ce(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function vr(e, t) {
  var r = Se({}, e), n;
  for (n in t)
    D(t, n) && (Ye(e[n]) && Ye(t[n]) ? (r[n] = {}, Se(r[n], e[n]), Se(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    D(e, n) && !D(t, n) && Ye(e[n]) && (r[n] = Se({}, r[n]));
  return r;
}
function Fr(e) {
  e != null && this.set(e);
}
var wr;
Object.keys ? wr = Object.keys : wr = function(e) {
  var t, r = [];
  for (t in e)
    D(e, t) && r.push(t);
  return r;
};
var Co = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Ro(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return ce(n) ? n.call(t, r) : n;
}
function ue(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var Ir = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, dt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, dr = {}, He = {};
function y(e, t, r, n) {
  var s = n;
  typeof n == "string" && (s = function() {
    return this[n]();
  }), e && (He[e] = s), t && (He[t[0]] = function() {
    return ue(s.apply(this, arguments), t[1], t[2]);
  }), r && (He[r] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function Po(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Ao(e) {
  var t = e.match(Ir), r, n;
  for (r = 0, n = t.length; r < n; r++)
    He[t[r]] ? t[r] = He[t[r]] : t[r] = Po(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += ce(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function yt(e, t) {
  return e.isValid() ? (t = bs(t, e.localeData()), dr[t] = dr[t] || Ao(t), dr[t](e)) : e.localeData().invalidDate();
}
function bs(e, t) {
  var r = 5;
  function n(s) {
    return t.longDateFormat(s) || s;
  }
  for (dt.lastIndex = 0; r >= 0 && dt.test(e); )
    e = e.replace(
      dt,
      n
    ), dt.lastIndex = 0, r -= 1;
  return e;
}
var Vo = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Lo(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Ir).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var $o = "Invalid date";
function Fo() {
  return this._invalidDate;
}
var Io = "%d", Wo = /\d{1,2}/;
function Uo(e) {
  return this._ordinal.replace("%d", e);
}
var jo = {
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
function Ho(e, t, r, n) {
  var s = this._relativeTime[r];
  return ce(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function Go(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return ce(r) ? r(t) : r.replace(/%s/i, t);
}
var Ke = {};
function I(e, t) {
  var r = e.toLowerCase();
  Ke[r] = Ke[r + "s"] = Ke[t] = e;
}
function Q(e) {
  return typeof e == "string" ? Ke[e] || Ke[e.toLowerCase()] : void 0;
}
function Wr(e) {
  var t = {}, r, n;
  for (n in e)
    D(e, n) && (r = Q(n), r && (t[r] = e[n]));
  return t;
}
var Os = {};
function W(e, t) {
  Os[e] = t;
}
function qo(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: Os[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function Pt(e) {
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
    return r != null ? (ks(this, e, r), d.updateOffset(this, t), this) : St(this, e);
  };
}
function St(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function ks(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && Pt(e.year()) && e.month() === 1 && e.date() === 29 ? (r = O(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    It(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Bo(e) {
  return e = Q(e), ce(this[e]) ? this[e]() : this;
}
function zo(e, t) {
  if (typeof e == "object") {
    e = Wr(e);
    var r = qo(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = Q(e), ce(this[e]))
    return this[e](t);
  return this;
}
var Ds = /\d/, Z = /\d\d/, Ms = /\d{3}/, Ur = /\d{4}/, At = /[+-]?\d{6}/, x = /\d\d?/, Ts = /\d\d\d\d?/, Es = /\d\d\d\d\d\d?/, Vt = /\d{1,3}/, jr = /\d{1,4}/, Lt = /[+-]?\d{1,6}/, ze = /\d+/, $t = /[+-]?\d+/, Zo = /Z|[+-]\d\d:?\d\d/gi, Ft = /Z|[+-]\d\d(?::?\d\d)?/gi, Jo = /[+-]?\d+(\.\d{1,3})?/, it = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, bt;
bt = {};
function f(e, t, r) {
  bt[e] = ce(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function Ko(e, t) {
  return D(bt, e) ? bt[e](t._strict, t._locale) : new RegExp(Qo(e));
}
function Qo(e) {
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
var Sr = {};
function T(e, t) {
  var r, n = t, s;
  for (typeof e == "string" && (e = [e]), ye(t) && (n = function(i, a) {
    a[t] = O(i);
  }), s = e.length, r = 0; r < s; r++)
    Sr[e[r]] = n;
}
function at(e, t) {
  T(e, function(r, n, s, i) {
    s._w = s._w || {}, t(r, s._w, s, i);
  });
}
function Xo(e, t, r) {
  t != null && D(Sr, e) && Sr[e](t, r._a, r, e);
}
var F = 0, me = 1, ae = 2, P = 3, X = 4, pe = 5, xe = 6, eu = 7, tu = 8;
function ru(e, t) {
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
function It(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = ru(t, 12);
  return e += (t - r) / 12, r === 1 ? Pt(e) ? 29 : 28 : 31 - r % 7 % 2;
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
I("month", "M");
W("month", 8);
f("M", x);
f("MM", x, Z);
f("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
f("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
T(["M", "MM"], function(e, t) {
  t[me] = O(e) - 1;
});
T(["MMM", "MMMM"], function(e, t, r, n) {
  var s = r._locale.monthsParse(e, n, r._strict);
  s != null ? t[me] = s : b(r).invalidMonth = e;
});
var nu = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), xs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ns = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, su = it, iu = it;
function au(e, t) {
  return e ? re(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ns).test(t) ? "format" : "standalone"][e.month()] : re(this._months) ? this._months : this._months.standalone;
}
function ou(e, t) {
  return e ? re(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ns.test(t) ? "format" : "standalone"][e.month()] : re(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function uu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = le([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function lu(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return uu.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (s = le([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
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
function Ys(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = O(t);
    else if (t = e.localeData().monthsParse(t), !ye(t))
      return e;
  }
  return r = Math.min(e.date(), It(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Cs(e) {
  return e != null ? (Ys(this, e), d.updateOffset(this, !0), this) : St(this, "Month");
}
function cu() {
  return It(this.year(), this.month());
}
function du(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Rs.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = su), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function fu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Rs.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = iu), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Rs() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], n = [], s, i;
  for (s = 0; s < 12; s++)
    i = le([2e3, s]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
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
y("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? ue(e, 4) : "+" + e;
});
y(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
y(0, ["YYYY", 4], 0, "year");
y(0, ["YYYYY", 5], 0, "year");
y(0, ["YYYYYY", 6, !0], 0, "year");
I("year", "y");
W("year", 1);
f("Y", $t);
f("YY", x, Z);
f("YYYY", jr, Ur);
f("YYYYY", Lt, At);
f("YYYYYY", Lt, At);
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
function Qe(e) {
  return Pt(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return O(e) + (O(e) > 68 ? 1900 : 2e3);
};
var Ps = Be("FullYear", !0);
function hu() {
  return Pt(this.year());
}
function mu(e, t, r, n, s, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, n, s, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, n, s, i, a), o;
}
function Xe(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Ot(e, t, r) {
  var n = 7 + t - r, s = (7 + Xe(e, 0, n).getUTCDay() - t) % 7;
  return -s + n - 1;
}
function As(e, t, r, n, s) {
  var i = (7 + r - n) % 7, a = Ot(e, n, s), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = Qe(u) + o) : o > Qe(e) ? (u = e + 1, l = o - Qe(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function et(e, t, r) {
  var n = Ot(e.year(), t, r), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return s < 1 ? (a = e.year() - 1, i = s + _e(a, t, r)) : s > _e(e.year(), t, r) ? (i = s - _e(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = s), {
    week: i,
    year: a
  };
}
function _e(e, t, r) {
  var n = Ot(e, t, r), s = Ot(e + 1, t, r);
  return (Qe(e) - n + s) / 7;
}
y("w", ["ww", 2], "wo", "week");
y("W", ["WW", 2], "Wo", "isoWeek");
I("week", "w");
I("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
f("w", x);
f("ww", x, Z);
f("W", x);
f("WW", x, Z);
at(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = O(e);
  }
);
function pu(e) {
  return et(e, this._week.dow, this._week.doy).week;
}
var _u = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function yu() {
  return this._week.dow;
}
function gu() {
  return this._week.doy;
}
function vu(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function wu(e) {
  var t = et(this, 1, 4).week;
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
I("day", "d");
I("weekday", "e");
I("isoWeekday", "E");
W("day", 11);
W("weekday", 11);
W("isoWeekday", 11);
f("d", x);
f("e", x);
f("E", x);
f("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
f("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
f("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
at(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : b(r).invalidWeekday = e;
});
at(["d", "e", "E"], function(e, t, r, n) {
  t[n] = O(e);
});
function Su(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function bu(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Hr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Ou = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Vs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), ku = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Du = it, Mu = it, Tu = it;
function Eu(e, t) {
  var r = re(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Hr(r, this._week.dow) : e ? r[e.day()] : r;
}
function xu(e) {
  return e === !0 ? Hr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Nu(e) {
  return e === !0 ? Hr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Yu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      i = le([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (s = R.call(this._weekdaysParse, a), s !== -1 ? s : null) : t === "ddd" ? (s = R.call(this._shortWeekdaysParse, a), s !== -1 ? s : null) : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null) : t === "dddd" ? (s = R.call(this._weekdaysParse, a), s !== -1 || (s = R.call(this._shortWeekdaysParse, a), s !== -1) ? s : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : t === "ddd" ? (s = R.call(this._shortWeekdaysParse, a), s !== -1 || (s = R.call(this._weekdaysParse, a), s !== -1) ? s : (s = R.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : (s = R.call(this._minWeekdaysParse, a), s !== -1 || (s = R.call(this._weekdaysParse, a), s !== -1) ? s : (s = R.call(this._shortWeekdaysParse, a), s !== -1 ? s : null));
}
function Cu(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Yu.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (s = le([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
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
function Ru(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Su(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Pu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Au(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = bu(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Vu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Gr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = Du), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Lu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Gr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Mu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function $u(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || Gr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Tu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Gr() {
  function e(h, m) {
    return m.length - h.length;
  }
  var t = [], r = [], n = [], s = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = le([2e3, 1]).day(i), o = q(this.weekdaysMin(a, "")), u = q(this.weekdaysShort(a, "")), l = q(this.weekdays(a, "")), t.push(o), r.push(u), n.push(l), s.push(o), s.push(u), s.push(l);
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
function qr() {
  return this.hours() % 12 || 12;
}
function Fu() {
  return this.hours() || 24;
}
y("H", ["HH", 2], 0, "hour");
y("h", ["hh", 2], 0, qr);
y("k", ["kk", 2], 0, Fu);
y("hmm", 0, 0, function() {
  return "" + qr.apply(this) + ue(this.minutes(), 2);
});
y("hmmss", 0, 0, function() {
  return "" + qr.apply(this) + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
y("Hmm", 0, 0, function() {
  return "" + this.hours() + ue(this.minutes(), 2);
});
y("Hmmss", 0, 0, function() {
  return "" + this.hours() + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
function Ls(e, t) {
  y(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ls("a", !0);
Ls("A", !1);
I("hour", "h");
W("hour", 13);
function $s(e, t) {
  return t._meridiemParse;
}
f("a", $s);
f("A", $s);
f("H", x);
f("h", x);
f("k", x);
f("HH", x, Z);
f("hh", x, Z);
f("kk", x, Z);
f("hmm", Ts);
f("hmmss", Es);
f("Hmm", Ts);
f("Hmmss", Es);
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
  t[P] = O(e.substr(0, n)), t[X] = O(e.substr(n)), b(r).bigHour = !0;
});
T("hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = O(e.substr(0, n)), t[X] = O(e.substr(n, 2)), t[pe] = O(e.substr(s)), b(r).bigHour = !0;
});
T("Hmm", function(e, t, r) {
  var n = e.length - 2;
  t[P] = O(e.substr(0, n)), t[X] = O(e.substr(n));
});
T("Hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[P] = O(e.substr(0, n)), t[X] = O(e.substr(n, 2)), t[pe] = O(e.substr(s));
});
function Iu(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Wu = /[ap]\.?m?\.?/i, Uu = Be("Hours", !0);
function ju(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Fs = {
  calendar: Co,
  longDateFormat: Vo,
  invalidDate: $o,
  ordinal: Io,
  dayOfMonthOrdinalParse: Wo,
  relativeTime: jo,
  months: nu,
  monthsShort: xs,
  week: _u,
  weekdays: Ou,
  weekdaysMin: ku,
  weekdaysShort: Vs,
  meridiemParse: Wu
}, N = {}, Ze = {}, tt;
function Hu(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function An(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Gu(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = An(e[t]).split("-"), r = i.length, n = An(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = Wt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && Hu(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return tt;
}
function qu(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Wt(e) {
  var t = null, r;
  if (N[e] === void 0 && typeof module < "u" && module && module.exports && qu(e))
    try {
      t = tt._abbr, r = require, r("./locale/" + e), Oe(t);
    } catch {
      N[e] = null;
    }
  return N[e];
}
function Oe(e, t) {
  var r;
  return e && (j(t) ? r = ge(e) : r = Br(e, t), r ? tt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), tt._abbr;
}
function Br(e, t) {
  if (t !== null) {
    var r, n = Fs;
    if (t.abbr = e, N[e] != null)
      Ss(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = N[e]._config;
    else if (t.parentLocale != null)
      if (N[t.parentLocale] != null)
        n = N[t.parentLocale]._config;
      else if (r = Wt(t.parentLocale), r != null)
        n = r._config;
      else
        return Ze[t.parentLocale] || (Ze[t.parentLocale] = []), Ze[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return N[e] = new Fr(vr(n, t)), Ze[e] && Ze[e].forEach(function(s) {
      Br(s.name, s.config);
    }), Oe(e), N[e];
  } else
    return delete N[e], null;
}
function Bu(e, t) {
  if (t != null) {
    var r, n, s = Fs;
    N[e] != null && N[e].parentLocale != null ? N[e].set(vr(N[e]._config, t)) : (n = Wt(e), n != null && (s = n._config), t = vr(s, t), n == null && (t.abbr = e), r = new Fr(t), r.parentLocale = N[e], N[e] = r), Oe(e);
  } else
    N[e] != null && (N[e].parentLocale != null ? (N[e] = N[e].parentLocale, e === Oe() && Oe(e)) : N[e] != null && delete N[e]);
  return N[e];
}
function ge(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return tt;
  if (!re(e)) {
    if (t = Wt(e), t)
      return t;
    e = [e];
  }
  return Gu(e);
}
function zu() {
  return wr(N);
}
function zr(e) {
  var t, r = e._a;
  return r && b(e).overflow === -2 && (t = r[me] < 0 || r[me] > 11 ? me : r[ae] < 1 || r[ae] > It(r[F], r[me]) ? ae : r[P] < 0 || r[P] > 24 || r[P] === 24 && (r[X] !== 0 || r[pe] !== 0 || r[xe] !== 0) ? P : r[X] < 0 || r[X] > 59 ? X : r[pe] < 0 || r[pe] > 59 ? pe : r[xe] < 0 || r[xe] > 999 ? xe : -1, b(e)._overflowDayOfYear && (t < F || t > ae) && (t = ae), b(e)._overflowWeeks && t === -1 && (t = eu), b(e)._overflowWeekday && t === -1 && (t = tu), b(e).overflow = t), e;
}
var Zu = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ju = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ku = /Z|[+-]\d\d(?::?\d\d)?/, ft = [
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
], Qu = /^\/?Date\((-?\d+)/i, Xu = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, el = {
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
function Is(e) {
  var t, r, n = e._i, s = Zu.exec(n) || Ju.exec(n), i, a, o, u, l = ft.length, h = fr.length;
  if (s) {
    for (b(e).iso = !0, t = 0, r = l; t < r; t++)
      if (ft[t][1].exec(s[1])) {
        a = ft[t][0], i = ft[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, r = h; t < r; t++)
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
      if (Ku.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Jr(e);
  } else
    e._isValid = !1;
}
function tl(e, t, r, n, s, i) {
  var a = [
    rl(e),
    xs.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function rl(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function nl(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function sl(e, t, r) {
  if (e) {
    var n = Vs.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return b(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function il(e, t, r) {
  if (e)
    return el[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function Ws(e) {
  var t = Xu.exec(nl(e._i)), r;
  if (t) {
    if (r = tl(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !sl(t[1], r, e))
      return;
    e._a = r, e._tzm = il(t[8], t[9], t[10]), e._d = Xe.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function al(e) {
  var t = Qu.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Is(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Ws(e), e._isValid === !1)
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
function Ue(e, t, r) {
  return e ?? t ?? r;
}
function ol(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Zr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = ol(e), e._w && e._a[ae] == null && e._a[me] == null && ul(e), e._dayOfYear != null && (a = Ue(e._a[F], s[F]), (e._dayOfYear > Qe(a) || e._dayOfYear === 0) && (b(e)._overflowDayOfYear = !0), r = Xe(a, 0, e._dayOfYear), e._a[me] = r.getUTCMonth(), e._a[ae] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[X] === 0 && e._a[pe] === 0 && e._a[xe] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? Xe : mu).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (b(e).weekdayMismatch = !0);
  }
}
function ul(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = Ue(
    t.GG,
    e._a[F],
    et(E(), 1, 4).year
  ), n = Ue(t.W, 1), s = Ue(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = et(E(), i, a), r = Ue(t.gg, e._a[F], l.year), n = Ue(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > _e(r, i, a) ? b(e)._overflowWeeks = !0 : u != null ? b(e)._overflowWeekday = !0 : (o = As(r, n, s, i, a), e._a[F] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Jr(e) {
  if (e._f === d.ISO_8601) {
    Is(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    Ws(e);
    return;
  }
  e._a = [], b(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, h;
  for (s = bs(e._f, e._locale).match(Ir) || [], h = s.length, r = 0; r < h; r++)
    i = s[r], n = (t.match(Ko(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && b(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), He[i] ? (n ? b(e).empty = !1 : b(e).unusedTokens.push(i), Xo(i, n, e)) : e._strict && !n && b(e).unusedTokens.push(i);
  b(e).charsLeftOver = o - u, t.length > 0 && b(e).unusedInput.push(t), e._a[P] <= 12 && b(e).bigHour === !0 && e._a[P] > 0 && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[P] = ll(
    e._locale,
    e._a[P],
    e._meridiem
  ), l = b(e).era, l !== null && (e._a[F] = e._locale.erasConvertYear(l, e._a[F])), Zr(e), zr(e);
}
function ll(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function cl(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    b(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = $r({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Jr(t), Lr(t) && (a = !0), i += b(t).charsLeftOver, i += b(t).unusedTokens.length * 10, b(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  Se(e, r || t);
}
function dl(e) {
  if (!e._d) {
    var t = Wr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = vs(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), Zr(e);
  }
}
function fl(e) {
  var t = new st(zr(Us(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Us(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ge(e._l), t === null || r === void 0 && t === "" ? Rt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), ne(t) ? new st(zr(t)) : (nt(t) ? e._d = t : re(r) ? cl(e) : r ? Jr(e) : hl(e), Lr(e) || (e._d = null), e));
}
function hl(e) {
  var t = e._i;
  j(t) ? e._d = new Date(d.now()) : nt(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? al(e) : re(t) ? (e._a = vs(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Zr(e)) : Ye(t) ? dl(e) : ye(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function js(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Ye(e) && Vr(e) || re(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, fl(i);
}
function E(e, t, r, n) {
  return js(e, t, r, n, !1);
}
var ml = K(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Rt();
  }
), pl = K(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Rt();
  }
);
function Hs(e, t) {
  var r, n;
  if (t.length === 1 && re(t[0]) && (t = t[0]), !t.length)
    return E();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function _l() {
  var e = [].slice.call(arguments, 0);
  return Hs("isBefore", e);
}
function yl() {
  var e = [].slice.call(arguments, 0);
  return Hs("isAfter", e);
}
var gl = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Je = [
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
function vl(e) {
  var t, r = !1, n, s = Je.length;
  for (t in e)
    if (D(e, t) && !(R.call(Je, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < s; ++n)
    if (e[Je[n]]) {
      if (r)
        return !1;
      parseFloat(e[Je[n]]) !== O(e[Je[n]]) && (r = !0);
    }
  return !0;
}
function wl() {
  return this._isValid;
}
function Sl() {
  return ie(NaN);
}
function Ut(e) {
  var t = Wr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, h = t.millisecond || 0;
  this._isValid = vl(t), this._milliseconds = +h + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ge(), this._bubble();
}
function gt(e) {
  return e instanceof Ut;
}
function br(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function bl(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && O(e[a]) !== O(t[a])) && i++;
  return i + s;
}
function Gs(e, t) {
  y(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + ue(~~(r / 60), 2) + t + ue(~~r % 60, 2);
  });
}
Gs("Z", ":");
Gs("ZZ", "");
f("Z", Ft);
f("ZZ", Ft);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Kr(Ft, e);
});
var Ol = /([\+\-]|\d\d)/gi;
function Kr(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(Ol) || ["-", 0, 0], i = +(s[1] * 60) + O(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function Qr(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (ne(e) || nt(e) ? e.valueOf() : E(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), d.updateOffset(r, !1), r) : E(e).local();
}
function Or(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function kl(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Kr(Ft, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = Or(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? zs(
      this,
      ie(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : Or(this);
}
function Dl(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Ml(e) {
  return this.utcOffset(0, e);
}
function Tl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Or(this), "m")), this;
}
function El() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Kr(Zo, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function xl(e) {
  return this.isValid() ? (e = e ? E(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Nl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Yl() {
  if (!j(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return $r(e, this), e = Us(e), e._a ? (t = e._isUTC ? le(e._a) : E(e._a), this._isDSTShifted = this.isValid() && bl(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Cl() {
  return this.isValid() ? !this._isUTC : !1;
}
function Rl() {
  return this.isValid() ? this._isUTC : !1;
}
function qs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Pl = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Al = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ie(e, t) {
  var r = e, n = null, s, i, a;
  return gt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ye(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = Pl.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: O(n[ae]) * s,
    h: O(n[P]) * s,
    m: O(n[X]) * s,
    s: O(n[pe]) * s,
    ms: O(br(n[xe] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = Al.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: Te(n[2], s),
    M: Te(n[3], s),
    w: Te(n[4], s),
    d: Te(n[5], s),
    h: Te(n[6], s),
    m: Te(n[7], s),
    s: Te(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Vl(
    E(r.from),
    E(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new Ut(r), gt(e) && D(e, "_locale") && (i._locale = e._locale), gt(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
ie.fn = Ut.prototype;
ie.invalid = Sl;
function Te(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Vn(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Vl(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Qr(t, e), e.isBefore(t) ? r = Vn(e, t) : (r = Vn(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function Bs(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (Ss(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ie(r, n), zs(this, s, e), this;
  };
}
function zs(e, t, r, n) {
  var s = t._milliseconds, i = br(t._days), a = br(t._months);
  e.isValid() && (n = n ?? !0, a && Ys(e, St(e, "Month") + a * r), i && ks(e, "Date", St(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && d.updateOffset(e, i || a));
}
var Ll = Bs(1, "add"), $l = Bs(-1, "subtract");
function Zs(e) {
  return typeof e == "string" || e instanceof String;
}
function Fl(e) {
  return ne(e) || nt(e) || Zs(e) || ye(e) || Wl(e) || Il(e) || e === null || e === void 0;
}
function Il(e) {
  var t = Ye(e) && !Vr(e), r = !1, n = [
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
function Wl(e) {
  var t = re(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ye(n) && Zs(e);
  }).length === 0), t && r;
}
function Ul(e) {
  var t = Ye(e) && !Vr(e), r = !1, n = [
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
function jl(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Hl(e, t) {
  arguments.length === 1 && (arguments[0] ? Fl(arguments[0]) ? (e = arguments[0], t = void 0) : Ul(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || E(), n = Qr(r, this).startOf("day"), s = d.calendarFormat(this, n) || "sameElse", i = t && (ce(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, E(r))
  );
}
function Gl() {
  return new st(this);
}
function ql(e, t) {
  var r = ne(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Bl(e, t) {
  var r = ne(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function zl(e, t, r, n) {
  var s = ne(e) ? e : E(e), i = ne(t) ? t : E(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Zl(e, t) {
  var r = ne(e) ? e : E(e), n;
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function Jl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Kl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Ql(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = Qr(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = Q(t), t) {
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
  return r ? i : J(i);
}
function vt(e, t) {
  if (e.date() < t.date())
    return -vt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Xl() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function ec(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? yt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ce(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", yt(r, "Z")) : yt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function tc() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function rc(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = yt(this, e);
  return this.localeData().postformat(t);
}
function nc(e, t) {
  return this.isValid() && (ne(e) && e.isValid() || E(e).isValid()) ? ie({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function sc(e) {
  return this.from(E(), e);
}
function ic(e, t) {
  return this.isValid() && (ne(e) && e.isValid() || E(e).isValid()) ? ie({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ac(e) {
  return this.to(E(), e);
}
function Js(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ge(e), t != null && (this._locale = t), this);
}
var Ks = K(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Qs() {
  return this._locale;
}
var kt = 1e3, Ge = 60 * kt, Dt = 60 * Ge, Xs = (365 * 400 + 97) * 24 * Dt;
function qe(e, t) {
  return (e % t + t) % t;
}
function ei(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Xs : new Date(e, t, r).valueOf();
}
function ti(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Xs : Date.UTC(e, t, r);
}
function oc(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ti : ei, e) {
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
        Dt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= qe(t, Ge);
      break;
    case "second":
      t = this._d.valueOf(), t -= qe(t, kt);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function uc(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ti : ei, e) {
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
      t = this._d.valueOf(), t += Dt - qe(
        t + (this._isUTC ? 0 : this.utcOffset() * Ge),
        Dt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Ge - qe(t, Ge) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += kt - qe(t, kt) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function lc() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function cc() {
  return Math.floor(this.valueOf() / 1e3);
}
function dc() {
  return new Date(this.valueOf());
}
function fc() {
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
function hc() {
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
function mc() {
  return this.isValid() ? this.toISOString() : null;
}
function pc() {
  return Lr(this);
}
function _c() {
  return Se({}, b(this));
}
function yc() {
  return b(this).overflow;
}
function gc() {
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
f("N", Xr);
f("NN", Xr);
f("NNN", Xr);
f("NNNN", xc);
f("NNNNN", Nc);
T(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? b(r).era = s : b(r).invalidEra = e;
  }
);
f("y", ze);
f("yy", ze);
f("yyy", ze);
f("yyyy", ze);
f("yo", Yc);
T(["y", "yy", "yyy", "yyyy"], F);
T(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[F] = r._locale.eraYearOrdinalParse(e, s) : t[F] = parseInt(e, 10);
});
function vc(e, t) {
  var r, n, s, i = this._eras || ge("en")._eras;
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
function wc(e, t, r) {
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
function Sc(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * r;
}
function bc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function Oc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function kc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function Dc() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - d(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function Mc(e) {
  return D(this, "_erasNameRegex") || en.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Tc(e) {
  return D(this, "_erasAbbrRegex") || en.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Ec(e) {
  return D(this, "_erasNarrowRegex") || en.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Xr(e, t) {
  return t.erasAbbrRegex(e);
}
function xc(e, t) {
  return t.erasNameRegex(e);
}
function Nc(e, t) {
  return t.erasNarrowRegex(e);
}
function Yc(e, t) {
  return t._eraYearOrdinalRegex || ze;
}
function en() {
  var e = [], t = [], r = [], n = [], s, i, a = this.eras();
  for (s = 0, i = a.length; s < i; ++s)
    t.push(q(a[s].name)), e.push(q(a[s].abbr)), r.push(q(a[s].narrow)), n.push(q(a[s].name)), n.push(q(a[s].abbr)), n.push(q(a[s].narrow));
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
function jt(e, t) {
  y(0, [e, e.length], 0, t);
}
jt("gggg", "weekYear");
jt("ggggg", "weekYear");
jt("GGGG", "isoWeekYear");
jt("GGGGG", "isoWeekYear");
I("weekYear", "gg");
I("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
f("G", $t);
f("g", $t);
f("GG", x, Z);
f("gg", x, Z);
f("GGGG", jr, Ur);
f("gggg", jr, Ur);
f("GGGGG", Lt, At);
f("ggggg", Lt, At);
at(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = O(e);
  }
);
at(["gg", "GG"], function(e, t, r, n) {
  t[n] = d.parseTwoDigitYear(e);
});
function Cc(e) {
  return ri.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Rc(e) {
  return ri.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Pc() {
  return _e(this.year(), 1, 4);
}
function Ac() {
  return _e(this.isoWeekYear(), 1, 4);
}
function Vc() {
  var e = this.localeData()._week;
  return _e(this.year(), e.dow, e.doy);
}
function Lc() {
  var e = this.localeData()._week;
  return _e(this.weekYear(), e.dow, e.doy);
}
function ri(e, t, r, n, s) {
  var i;
  return e == null ? et(this, n, s).year : (i = _e(e, n, s), t > i && (t = i), $c.call(this, e, t, r, n, s));
}
function $c(e, t, r, n, s) {
  var i = As(e, t, r, n, s), a = Xe(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
y("Q", 0, "Qo", "quarter");
I("quarter", "Q");
W("quarter", 7);
f("Q", Ds);
T("Q", function(e, t) {
  t[me] = (O(e) - 1) * 3;
});
function Fc(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
y("D", ["DD", 2], "Do", "date");
I("date", "D");
W("date", 9);
f("D", x);
f("DD", x, Z);
f("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], ae);
T("Do", function(e, t) {
  t[ae] = O(e.match(x)[0]);
});
var ni = Be("Date", !0);
y("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
I("dayOfYear", "DDD");
W("dayOfYear", 4);
f("DDD", Vt);
f("DDDD", Ms);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = O(e);
});
function Ic(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
y("m", ["mm", 2], 0, "minute");
I("minute", "m");
W("minute", 14);
f("m", x);
f("mm", x, Z);
T(["m", "mm"], X);
var Wc = Be("Minutes", !1);
y("s", ["ss", 2], 0, "second");
I("second", "s");
W("second", 15);
f("s", x);
f("ss", x, Z);
T(["s", "ss"], pe);
var Uc = Be("Seconds", !1);
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
I("millisecond", "ms");
W("millisecond", 16);
f("S", Vt, Ds);
f("SS", Vt, Z);
f("SSS", Vt, Ms);
var be, si;
for (be = "SSSS"; be.length <= 9; be += "S")
  f(be, ze);
function jc(e, t) {
  t[xe] = O(("0." + e) * 1e3);
}
for (be = "S"; be.length <= 9; be += "S")
  T(be, jc);
si = Be("Milliseconds", !1);
y("z", 0, 0, "zoneAbbr");
y("zz", 0, 0, "zoneName");
function Hc() {
  return this._isUTC ? "UTC" : "";
}
function Gc() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = st.prototype;
c.add = Ll;
c.calendar = Hl;
c.clone = Gl;
c.diff = Ql;
c.endOf = uc;
c.format = rc;
c.from = nc;
c.fromNow = sc;
c.to = ic;
c.toNow = ac;
c.get = Bo;
c.invalidAt = yc;
c.isAfter = ql;
c.isBefore = Bl;
c.isBetween = zl;
c.isSame = Zl;
c.isSameOrAfter = Jl;
c.isSameOrBefore = Kl;
c.isValid = pc;
c.lang = Ks;
c.locale = Js;
c.localeData = Qs;
c.max = pl;
c.min = ml;
c.parsingFlags = _c;
c.set = zo;
c.startOf = oc;
c.subtract = $l;
c.toArray = fc;
c.toObject = hc;
c.toDate = dc;
c.toISOString = ec;
c.inspect = tc;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = mc;
c.toString = Xl;
c.unix = cc;
c.valueOf = lc;
c.creationData = gc;
c.eraName = bc;
c.eraNarrow = Oc;
c.eraAbbr = kc;
c.eraYear = Dc;
c.year = Ps;
c.isLeapYear = hu;
c.weekYear = Cc;
c.isoWeekYear = Rc;
c.quarter = c.quarters = Fc;
c.month = Cs;
c.daysInMonth = cu;
c.week = c.weeks = vu;
c.isoWeek = c.isoWeeks = wu;
c.weeksInYear = Vc;
c.weeksInWeekYear = Lc;
c.isoWeeksInYear = Pc;
c.isoWeeksInISOWeekYear = Ac;
c.date = ni;
c.day = c.days = Ru;
c.weekday = Pu;
c.isoWeekday = Au;
c.dayOfYear = Ic;
c.hour = c.hours = Uu;
c.minute = c.minutes = Wc;
c.second = c.seconds = Uc;
c.millisecond = c.milliseconds = si;
c.utcOffset = kl;
c.utc = Ml;
c.local = Tl;
c.parseZone = El;
c.hasAlignedHourOffset = xl;
c.isDST = Nl;
c.isLocal = Cl;
c.isUtcOffset = Rl;
c.isUtc = qs;
c.isUTC = qs;
c.zoneAbbr = Hc;
c.zoneName = Gc;
c.dates = K(
  "dates accessor is deprecated. Use date instead.",
  ni
);
c.months = K(
  "months accessor is deprecated. Use month instead",
  Cs
);
c.years = K(
  "years accessor is deprecated. Use year instead",
  Ps
);
c.zone = K(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Dl
);
c.isDSTShifted = K(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Yl
);
function qc(e) {
  return E(e * 1e3);
}
function Bc() {
  return E.apply(null, arguments).parseZone();
}
function ii(e) {
  return e;
}
var M = Fr.prototype;
M.calendar = Ro;
M.longDateFormat = Lo;
M.invalidDate = Fo;
M.ordinal = Uo;
M.preparse = ii;
M.postformat = ii;
M.relativeTime = Ho;
M.pastFuture = Go;
M.set = Yo;
M.eras = vc;
M.erasParse = wc;
M.erasConvertYear = Sc;
M.erasAbbrRegex = Tc;
M.erasNameRegex = Mc;
M.erasNarrowRegex = Ec;
M.months = au;
M.monthsShort = ou;
M.monthsParse = lu;
M.monthsRegex = fu;
M.monthsShortRegex = du;
M.week = pu;
M.firstDayOfYear = gu;
M.firstDayOfWeek = yu;
M.weekdays = Eu;
M.weekdaysMin = Nu;
M.weekdaysShort = xu;
M.weekdaysParse = Cu;
M.weekdaysRegex = Vu;
M.weekdaysShortRegex = Lu;
M.weekdaysMinRegex = $u;
M.isPM = Iu;
M.meridiem = ju;
function Mt(e, t, r, n) {
  var s = ge(), i = le().set(n, t);
  return s[r](i, e);
}
function ai(e, t, r) {
  if (ye(e) && (t = e, e = void 0), e = e || "", t != null)
    return Mt(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = Mt(e, n, r, "month");
  return s;
}
function tn(e, t, r, n) {
  typeof e == "boolean" ? (ye(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ye(t) && (r = t, t = void 0), t = t || "");
  var s = ge(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return Mt(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = Mt(t, (a + i) % 7, n, "day");
  return o;
}
function zc(e, t) {
  return ai(e, t, "months");
}
function Zc(e, t) {
  return ai(e, t, "monthsShort");
}
function Jc(e, t, r) {
  return tn(e, t, r, "weekdays");
}
function Kc(e, t, r) {
  return tn(e, t, r, "weekdaysShort");
}
function Qc(e, t, r) {
  return tn(e, t, r, "weekdaysMin");
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
    var t = e % 10, r = O(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
d.lang = K(
  "moment.lang is deprecated. Use moment.locale instead.",
  Oe
);
d.langData = K(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ge
);
var fe = Math.abs;
function Xc() {
  var e = this._data;
  return this._milliseconds = fe(this._milliseconds), this._days = fe(this._days), this._months = fe(this._months), e.milliseconds = fe(e.milliseconds), e.seconds = fe(e.seconds), e.minutes = fe(e.minutes), e.hours = fe(e.hours), e.months = fe(e.months), e.years = fe(e.years), this;
}
function oi(e, t, r, n) {
  var s = ie(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function ed(e, t) {
  return oi(this, e, t, 1);
}
function td(e, t) {
  return oi(this, e, t, -1);
}
function Ln(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function rd() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Ln(kr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = J(e / 1e3), n.seconds = s % 60, i = J(s / 60), n.minutes = i % 60, a = J(i / 60), n.hours = a % 24, t += J(a / 24), u = J(ui(t)), r += u, t -= Ln(kr(u)), o = J(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function ui(e) {
  return e * 4800 / 146097;
}
function kr(e) {
  return e * 146097 / 4800;
}
function nd(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = Q(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + ui(t), e) {
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
function sd() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + O(this._months / 12) * 31536e6 : NaN;
}
function ve(e) {
  return function() {
    return this.as(e);
  };
}
var id = ve("ms"), ad = ve("s"), od = ve("m"), ud = ve("h"), ld = ve("d"), cd = ve("w"), dd = ve("M"), fd = ve("Q"), hd = ve("y");
function md() {
  return ie(this);
}
function pd(e) {
  return e = Q(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ae(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var _d = Ae("milliseconds"), yd = Ae("seconds"), gd = Ae("minutes"), vd = Ae("hours"), wd = Ae("days"), Sd = Ae("months"), bd = Ae("years");
function Od() {
  return J(this.days() / 7);
}
var he = Math.round, je = {
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
function kd(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function Dd(e, t, r, n) {
  var s = ie(e).abs(), i = he(s.as("s")), a = he(s.as("m")), o = he(s.as("h")), u = he(s.as("d")), l = he(s.as("M")), h = he(s.as("w")), m = he(s.as("y")), p = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (p = p || h <= 1 && ["w"] || h < r.w && ["ww", h]), p = p || l <= 1 && ["M"] || l < r.M && ["MM", l] || m <= 1 && ["y"] || ["yy", m], p[2] = t, p[3] = +e > 0, p[4] = n, kd.apply(null, p);
}
function Md(e) {
  return e === void 0 ? he : typeof e == "function" ? (he = e, !0) : !1;
}
function Td(e, t) {
  return je[e] === void 0 ? !1 : t === void 0 ? je[e] : (je[e] = t, e === "s" && (je.ss = t - 1), !0);
}
function Ed(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = je, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, je, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = Dd(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var hr = Math.abs;
function We(e) {
  return (e > 0) - (e < 0) || +e;
}
function Ht() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = hr(this._milliseconds) / 1e3, t = hr(this._days), r = hr(this._months), n, s, i, a, o = this.asSeconds(), u, l, h, m;
  return o ? (n = J(e / 60), s = J(n / 60), e %= 60, n %= 60, i = J(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = We(this._months) !== We(o) ? "-" : "", h = We(this._days) !== We(o) ? "-" : "", m = We(this._milliseconds) !== We(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? h + t + "D" : "") + (s || n || e ? "T" : "") + (s ? m + s + "H" : "") + (n ? m + n + "M" : "") + (e ? m + a + "S" : "")) : "P0D";
}
var k = Ut.prototype;
k.isValid = wl;
k.abs = Xc;
k.add = ed;
k.subtract = td;
k.as = nd;
k.asMilliseconds = id;
k.asSeconds = ad;
k.asMinutes = od;
k.asHours = ud;
k.asDays = ld;
k.asWeeks = cd;
k.asMonths = dd;
k.asQuarters = fd;
k.asYears = hd;
k.valueOf = sd;
k._bubble = rd;
k.clone = md;
k.get = pd;
k.milliseconds = _d;
k.seconds = yd;
k.minutes = gd;
k.hours = vd;
k.days = wd;
k.weeks = Od;
k.months = Sd;
k.years = bd;
k.humanize = Ed;
k.toISOString = Ht;
k.toString = Ht;
k.toJSON = Ht;
k.locale = Js;
k.localeData = Qs;
k.toIsoString = K(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Ht
);
k.lang = Ks;
y("X", 0, 0, "unix");
y("x", 0, 0, "valueOf");
f("x", $t);
f("X", Jo);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(O(e));
});
//! moment.js
d.version = "2.29.4";
xo(E);
d.fn = c;
d.min = _l;
d.max = yl;
d.now = gl;
d.utc = le;
d.unix = qc;
d.months = zc;
d.isDate = nt;
d.locale = Oe;
d.invalid = Rt;
d.duration = ie;
d.isMoment = ne;
d.weekdays = Jc;
d.parseZone = Bc;
d.localeData = ge;
d.isDuration = gt;
d.monthsShort = Zc;
d.weekdaysMin = Qc;
d.defineLocale = Br;
d.updateLocale = Bu;
d.locales = zu;
d.weekdaysShort = Kc;
d.normalizeUnits = Q;
d.relativeTimeRounding = Md;
d.relativeTimeThreshold = Td;
d.calendarFormat = jl;
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
function $n(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var L = function() {
};
L.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (Me.defaults.headers.common["X-CSRF-Token"] = e.content), Me.defaults.headers.common.Accept = "application/json", Me.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, L.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  $.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = Me.CancelToken.source();
}, L.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, L.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, L.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = $n(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return Me(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, L.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = $n(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), $.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, L.cancelTokenSources = {}, L.active = 0, Me.interceptors.request.use(function(e) {
  return L.active += 1, e;
}, function(e) {
  return L.active -= 1, Promise.reject(e);
}), Me.interceptors.response.use(function(e) {
  return L.active -= 1, e;
}, function(e) {
  return L.active -= 1, Promise.reject(e);
}), window.Api = L;
var $ = { isString: function(e) {
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
} }, Fn = Object.freeze({ __proto__: null, Api: L, Utils: $ }), xd = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Fn).forEach(function(r) {
    t.component(r, Fn[r]);
  }));
} }, ht = null;
typeof window < "u" ? ht = window.Vue : typeof global < "u" && (ht = global.Vue), ht && ht.use(xd);
const ke = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, Nd = {
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
function Yd(e, t, r, n, s, i) {
  return i.displayValidationMessage ? (U(), B("span", {
    key: 0,
    class: Un(i.inputClass)
  }, Mr(i.inputMessage), 3)) : Ne("", !0);
}
const li = /* @__PURE__ */ ke(Nd, [["render", Yd]]), Cd = {
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
}, Rd = ["id"];
function Pd(e, t, r, n, s, i) {
  return U(), B("div", {
    class: Un([i.inputGroupClass, r.classes]),
    id: r.id + "__wrapper"
  }, [
    Tr(e.$slots, "default")
  ], 10, Rd);
}
const Ad = /* @__PURE__ */ ke(Cd, [["render", Pd]]), Vd = {
  components: { ComponentWrapper: Ad, ErrorsPlaceholder: li },
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
}, Ld = ["id"], $d = ["innerHTML"], Fd = ["id", "name"], Id = ["id"], Wd = ["innerHTML"];
function Ud(e, t, r, n, s, i) {
  const a = rn("ErrorsPlaceholder"), o = rn("ComponentWrapper");
  return U(), nn(o, {
    name: r.name,
    classes: i.inputGroupClass,
    id: r.id
  }, {
    default: vi(() => [
      r.prepend ? (U(), B("div", {
        key: 0,
        class: "input-block__prepend",
        id: r.id + "__prepend"
      }, [
        mt("span", { innerHTML: r.prepend }, null, 8, $d)
      ], 8, Ld)) : Ne("", !0),
      jn(mt("input", Et(this.$attrs, {
        class: [i.inputClass, r.prepend ? "input--has-prepend" : "", r.append ? "input--has-append" : ""],
        id: r.id,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => i.inputValue = u),
        onFocus: t[1] || (t[1] = (u) => i.inputTouched = !0),
        name: r.name
      }), null, 16, Fd), [
        [Hn, i.inputValue]
      ]),
      r.append ? (U(), B("div", {
        key: 1,
        class: "input-block__append",
        id: r.id + "__append"
      }, [
        mt("span", { innerHTML: r.append }, null, 8, Wd)
      ], 8, Id)) : Ne("", !0),
      i.displayError ? (U(), nn(a, {
        key: 2,
        names: [r.name]
      }, null, 8, ["names"])) : Ne("", !0)
    ]),
    _: 1
  }, 8, ["name", "classes", "id"]);
}
const jd = /* @__PURE__ */ ke(Vd, [["render", Ud]]), Hd = {
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
  data() {
    return { timer: null };
  },
  computed: {
    values() {
      return this.$store.getters.getValue(
        this.$store.getters.getMeta("modelName")
      );
    }
  },
  methods: {
    debounce(e = 500) {
      clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.$refs.form.requestSubmit();
      }, e);
    },
    handleSubmit(e) {
      this.$store.getters.getMeta("disableValidation") || (this.$store.commit(
        "setTouched",
        {
          value: !0,
          name: `${this.$store.getters.getMeta("modelName")}._submit`
        }
      ), this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`) || e.preventDefault());
    },
    ajaxBeforeSend(e) {
      this.$store.getters.getError(`${this.$store.getters.getMeta("modelName")}._is_valid`) || e.preventDefault();
    }
  },
  watch: {
    values: function(e, t) {
      this.$props.autoSubmit === "onChange" && this.debounce(750);
    }
  }
}, Gd = ["accept-charset", "action", "data-values", "method", "enctype"];
function qd(e, t, r, n, s, i) {
  return U(), B("form", {
    "accept-charset": r.acceptCharset,
    action: r.action,
    "data-values": e.dataValues,
    method: r.method,
    enctype: r.enctype,
    onSubmit: t[0] || (t[0] = wi((...a) => i.handleSubmit && i.handleSubmit(...a), ["prevent"])),
    "on:ajax:beforeSend": t[1] || (t[1] = (...a) => i.ajaxBeforeSend && i.ajaxBeforeSend(...a)),
    ref: "form"
  }, [
    Tr(e.$slots, "default")
  ], 40, Gd);
}
const Bd = /* @__PURE__ */ ke(Hd, [["render", qd]]), zd = {
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
}, Zd = ["id", "name"];
function Jd(e, t, r, n, s, i) {
  return jn((U(), B("input", Et(this.$attrs, {
    id: r.id,
    name: r.name,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.inputValue = a)
  }), null, 16, Zd)), [
    [Hn, i.inputValue]
  ]);
}
const Kd = /* @__PURE__ */ ke(zd, [["render", Jd]]), Qd = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      require: !0
    }
  }
}, Xd = ["for"];
function ef(e, t, r, n, s, i) {
  return U(), B("label", {
    for: e.$props.for
  }, [
    Tr(e.$slots, "default")
  ], 8, Xd);
}
const tf = /* @__PURE__ */ ke(Qd, [["render", ef]]), rf = {
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
}, nf = { class: "form-validation" }, sf = ["disabled"], af = {
  key: 1,
  class: "form-validation__tooltip"
};
function of(e, t, r, n, s, i) {
  return U(), B("div", nf, [
    mt("input", Et(this.$attrs, {
      onClick: t[0] || (t[0] = (...a) => i.submitting && i.submitting(...a)),
      disabled: s.disabled
    }), null, 16, sf),
    i.displayValidationWarning ? (U(), B("div", {
      key: 0,
      class: "form-validation__global-error",
      onClick: t[1] || (t[1] = (a) => s.displayValidationMessages = !s.displayValidationMessages)
    }, "!")) : Ne("", !0),
    i.displayValidationWarning & s.displayValidationMessages ? (U(), B("ul", af, [
      (U(!0), B(Si, null, bi(i.recapErrors, (a) => (U(), B("li", { key: a }, Mr(a), 1))), 128))
    ])) : Ne("", !0)
  ]);
}
const uf = /* @__PURE__ */ ke(rf, [["render", of]]), lf = {
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
function cf(e, t, r, n, s, i) {
  return i.displaySuggestedValue ? (U(), B("span", Oi(Et({ key: 0 }, this.$attrs)), Mr(i.getSuggestedValue), 17)) : Ne("", !0);
}
const df = /* @__PURE__ */ ke(lf, [["render", cf]]);
class ff {
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
    let g = {
      "botyglot-input": jd,
      "botyglot-form": Bd,
      "botyglot-hidden": Kd,
      "botyglot-submit": uf,
      "botyglot-label": tf,
      "botyglot-errors-placeholder": li,
      "botyglot-suggested-value": df
    };
    const Y = Object.keys(u)[0];
    let { errors: De, warnings: w, suggested_values: Gt, potential_values: qt, ...ot } = u[Y], ut = {
      values: {
        [Y]: ot || {}
      },
      errors: {
        [Y]: De || {}
      },
      warnings: {
        [Y]: w || {}
      },
      touched: {
        [Y]: {
          _submit: l
        }
      },
      potentialValues: {
        [Y]: qt || {}
      },
      suggestedValues: {
        [Y]: Gt || {}
      },
      meta: Object.assign({
        modelName: Y,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: h,
        hideValidationErrors: m
      }, p)
    };
    this.store = Qi({
      state: ut,
      plugins: a,
      getters: {
        getValue: (_) => (v) => {
          let S = $.dotify(v);
          return we(S.split("."), _.values);
        },
        getError: (_) => (v) => {
          let S = $.dotify(v);
          return _.meta.hideValidationErrors ? null : we(S.split("."), _.errors);
        },
        getWarning: (_) => (v) => {
          let S = $.dotify(v);
          return _.meta.hideValidationErrors ? null : we(S.split("."), _.warnings);
        },
        getTouched: (_) => (v) => {
          let S = $.dotify(v);
          return we(S.split("."), _.touched) || we([Y, "_submit"], _.touched);
        },
        getMeta: (_) => (v) => {
          let S = $.dotify(v);
          return we(S.split("."), _.meta);
        },
        getPotentialValues: (_) => (v) => {
          let S = $.dotify(v);
          return we(S.split("."), _.potentialValues);
        },
        getSuggestedValues: (_) => (v) => {
          let S = $.dotify(v);
          return we(S.split("."), _.suggestedValues);
        }
      },
      mutations: {
        setValue: function(_, v) {
          let S = $.dotify(v.name);
          _.values = $e(S.split("."), v.value, _.values);
        },
        setTouched: function(_, v) {
          let S = $.dotify(v.name);
          _.touched = $e(S.split("."), v.value, _.touched);
        },
        setError: function(_, v) {
          let S = $.dotify(v.name);
          _.errors = $e(S.split("."), v.value, _.errors);
        },
        setWarning: function(_, v) {
          let S = $.dotify(v.name);
          _.warnings = $e(S.split("."), v.value, _.warnings);
        },
        setPotentialValues: function(_, v) {
          let S = $.dotify(v.name);
          _.potentialValues = $e(S.split("."), v.value, _.potentialValues);
        },
        setSuggestedValues: function(_, v) {
          let S = $.dotify(v.name);
          _.suggestedValues = $e(S.split("."), v.value, _.suggestedValues);
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
        genericSendDataToServer: function(_, v) {
          let { sid: S, url: G, method: de, data: lt, onSuccess: ci, onError: di, ...fi } = v, hi = (ct) => {
            let pi = Object.assign(fi, {
              sid: S,
              response: ct
            });
            _.dispatch("genericDataReceivedFromServer", pi);
          }, mi = (ct) => {
            console.log("There was a problem with validating the data"), console.log(ct), console.log(JSON.stringify(ct, null, 2));
          };
          L.sendRequest({
            url: G,
            method: de || "post",
            data: lt,
            onSuccess: ci || hi,
            onError: di || mi,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(_, v) {
        },
        sendValuesToServer: function(_) {
          if (h) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let v = (de) => {
              _.dispatch("dataReceivedFromServer", de.data);
            }, S = (de) => {
              console.log("There was a problem with validating the data"), console.log(de), console.log(JSON.stringify(de, null, 2));
            }, G = Object.assign({
              utf8: "✓",
              authenticity_token: _.state.meta.authenticityToken,
              _method: _.state.meta.httpMethod
            }, da(_.state.values));
            G[Y]._prevent_save = !0, L.sendRequest({
              url: _.state.meta.validationUrl,
              data: G,
              method: _.state.meta.httpMethod,
              onSuccess: v,
              onError: S,
              delay: !0
            });
          }
        },
        dataReceivedFromServer: function(_, v) {
          let { errors: S, warnings: G, potential_values: de, suggested_values: lt } = v[Y];
          S && _.commit("setError", {
            value: S,
            name: Y
          }), G && _.commit("setWarning", {
            value: G,
            name: Y
          }), de && _.commit("setPotentialValues", {
            value: de,
            name: Y
          }), lt && _.commit("setSuggestedValues", {
            value: lt,
            name: Y
          });
        },
        update: function(_, v) {
          _.commit("setValue", v), _.dispatch("sendValuesToServer");
        }
      }
    }), this.app = ki({
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(g, t),
      props: {}
    }), this.app.mount(n);
  }
}
const In = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormStore: ff
}, Symbol.toStringTag, { value: "Module" }));
function Dr(e) {
  Dr.installed || (Dr.installed = !0, Object.keys(In).forEach((t) => {
    e.component(t, In[t]);
  }));
}
const hf = {
  install: Dr
};
let Tt = null;
typeof window < "u" ? Tt = window.Vue : typeof global < "u" && (Tt = global.Vue);
Tt && Tt.use(hf);
export {
  ff as FormStore,
  hf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
