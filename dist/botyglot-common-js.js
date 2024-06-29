import { watch as jn, effectScope as yi, reactive as gi, computed as J, openBlock as j, createElementBlock as B, normalizeClass as $n, toDisplayString as Tr, createCommentVNode as Ye, renderSlot as Er, watchEffect as vi, resolveComponent as nn, createBlock as sn, withCtx as wi, createElementVNode as pt, withDirectives as Hn, mergeProps as xt, vModelDynamic as Gn, withModifiers as Si, Fragment as bi, renderList as Oi, normalizeProps as ki, createApp as Di } from "vue";
function Mi() {
  return qn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function qn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ti = typeof Proxy == "function", Ei = "devtools-plugin:setup", xi = "plugin:settings:set";
let Le, pr;
function Ni() {
  var e;
  return Le !== void 0 || (typeof window < "u" && window.performance ? (Le = !0, pr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Le = !0, pr = globalThis.perf_hooks.performance) : Le = !1), Le;
}
function Yi() {
  return Ni() ? pr.now() : Date.now();
}
class Ci {
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
        return Yi();
      }
    }, r && r.on(xi, (a, o) => {
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
function Ri(e, t) {
  const r = e, n = qn(), s = Mi(), i = Ti && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Ei, e, t);
  else {
    const a = i ? new Ci(r, s) : null;
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
var Pi = "store";
function Re(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function Ai(e) {
  return e !== null && typeof e == "object";
}
function Vi(e) {
  return e && typeof e.then == "function";
}
function te(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function Li(e, t) {
  return function() {
    return e(t);
  };
}
function Bn(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function zn(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  Nt(e, r, [], e._modules.root, !0), xr(e, r, t);
}
function xr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = yi(!0);
  u.run(function() {
    Re(i, function(l, f) {
      a[f] = Li(l, e), o[f] = J(function() {
        return a[f]();
      }), Object.defineProperty(e.getters, f, {
        get: function() {
          return o[f].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = gi({
    data: t
  }), e._scope = u, e.strict && ji(e), n && r && e._withCommit(function() {
    n.data = null;
  }), s && s.stop();
}
function Nt(e, t, r, n, s) {
  var i = !r.length, a = e._modules.getNamespace(r);
  if (n.namespaced && (e._modulesNamespaceMap[a] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + a + " for the namespaced module " + r.join("/")), e._modulesNamespaceMap[a] = n), !i && !s) {
    var o = Nr(t, r.slice(0, -1)), u = r[r.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && u in o && console.warn(
        '[vuex] state field "' + u + '" was overridden by a module with the same name at "' + r.join(".") + '"'
      ), o[u] = n.state;
    });
  }
  var l = n.context = Fi(e, a, r);
  n.forEachMutation(function(f, m) {
    var p = a + m;
    Ii(e, p, f, l);
  }), n.forEachAction(function(f, m) {
    var p = f.root ? m : a + m, g = f.handler || f;
    Ui(e, p, g, l);
  }), n.forEachGetter(function(f, m) {
    var p = a + m;
    Wi(e, p, f, l);
  }), n.forEachChild(function(f, m) {
    Nt(e, t, r.concat(m), f, s);
  });
}
function Fi(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, f = u.options, m = u.type;
      if ((!f || !f.root) && (m = t + m, process.env.NODE_ENV !== "production" && !e._actions[m])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + m);
        return;
      }
      return e.dispatch(m, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, f = u.options, m = u.type;
      if ((!f || !f.root) && (m = t + m, process.env.NODE_ENV !== "production" && !e._mutations[m])) {
        console.error("[vuex] unknown local mutation type: " + u.type + ", global type: " + m);
        return;
      }
      e.commit(m, l, f);
    }
  };
  return Object.defineProperties(s, {
    getters: {
      get: n ? function() {
        return e.getters;
      } : function() {
        return Zn(e, t);
      }
    },
    state: {
      get: function() {
        return Nr(e.state, r);
      }
    }
  }), s;
}
function Zn(e, t) {
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
function Ii(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function Ui(e, t, r, n) {
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
    return Vi(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function Wi(e, t, r, n) {
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
function ji(e) {
  jn(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && te(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function Nr(e, t) {
  return t.reduce(function(r, n) {
    return r[n];
  }, e);
}
function St(e, t, r) {
  return Ai(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && te(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var $i = "vuex bindings", an = "vuex:mutations", zt = "vuex:actions", Fe = "vuex", Hi = 0;
function Gi(e, t) {
  Ri(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [$i]
    },
    function(r) {
      r.addTimelineLayer({
        id: an,
        label: "Vuex Mutations",
        color: on
      }), r.addTimelineLayer({
        id: zt,
        label: "Vuex Actions",
        color: on
      }), r.addInspector({
        id: Fe,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), r.on.getInspectorTree(function(n) {
        if (n.app === e && n.inspectorId === Fe)
          if (n.filter) {
            var s = [];
            Xn(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              Qn(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Fe) {
          var s = n.nodeId;
          Zn(t, s), n.state = zi(
            Ji(t._modules, s),
            s === "root" ? t.getters : t._makeLocalGettersCache,
            s
          );
        }
      }), r.on.editInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Fe) {
          var s = n.nodeId, i = n.path;
          s !== "root" && (i = s.split("/").filter(Boolean).concat(i)), t._withCommit(function() {
            n.set(t._state.data, i, n.state.value);
          });
        }
      }), t.subscribe(function(n, s) {
        var i = {};
        n.payload && (i.payload = n.payload), i.state = s, r.notifyComponentUpdate(), r.sendInspectorTree(Fe), r.sendInspectorState(Fe), r.addTimelineEvent({
          layerId: an,
          event: {
            time: Date.now(),
            title: n.type,
            data: i
          }
        });
      }), t.subscribeAction({
        before: function(n, s) {
          var i = {};
          n.payload && (i.payload = n.payload), n._id = Hi++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
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
var on = 8702998, qi = 6710886, Bi = 16777215, Jn = {
  label: "namespaced",
  textColor: Bi,
  backgroundColor: qi
};
function Kn(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function Qn(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: Kn(t),
    tags: e.namespaced ? [Jn] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return Qn(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function Xn(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [Jn] : []
  }), Object.keys(t._children).forEach(function(s) {
    Xn(e, t._children[s], r, n + s + "/");
  });
}
function zi(e, t, r) {
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
    var i = Zi(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? Kn(a) : a,
        editable: !1,
        value: _r(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function Zi(e) {
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
function Ji(e, t) {
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
}, es = { namespaced: { configurable: !0 } };
es.namespaced.get = function() {
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
Object.defineProperties(ie.prototype, es);
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
  ts([], this.root, t);
};
Pe.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && rs(t, r);
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
function ts(e, t, r) {
  if (process.env.NODE_ENV !== "production" && rs(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      ts(
        e.concat(n),
        t.getChild(n),
        r.modules[n]
      );
    }
}
var un = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, Ki = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, ln = {
  getters: un,
  mutations: un,
  actions: Ki
};
function rs(e, t) {
  Object.keys(ln).forEach(function(r) {
    if (t[r]) {
      var n = ln[r];
      Re(t[r], function(s, i) {
        te(
          n.assert(s),
          Qi(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function Qi(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function Xi(e) {
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
  this.dispatch = function(p, g) {
    return u.call(a, p, g);
  }, this.commit = function(p, g, Y) {
    return l.call(a, p, g, Y);
  }, this.strict = s;
  var f = this._modules.root.state;
  Nt(this, f, [], this._modules.root), xr(this, f), n.forEach(function(m) {
    return m(r);
  });
}, Yr = { state: { configurable: !0 } };
H.prototype.install = function(t, r) {
  t.provide(r || Pi, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && Gi(t, this);
};
Yr.state.get = function() {
  return this._state.data;
};
Yr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && te(!1, "use store.replaceState() to explicit replace store state.");
};
H.prototype.commit = function(t, r, n) {
  var s = this, i = St(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, f = this._mutations[a];
  if (!f) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + a);
    return;
  }
  this._withCommit(function() {
    f.forEach(function(p) {
      p(o);
    });
  }), this._subscribers.slice().forEach(function(m) {
    return m(l, s.state);
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
  return new Promise(function(f, m) {
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
      f(p);
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
  return Bn(t, this._subscribers, r);
};
H.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return Bn(n, this._actionSubscribers, r);
};
H.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && te(typeof t == "function", "store.watch only accepts a function."), jn(function() {
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
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (te(Array.isArray(t), "module path must be a string or an Array."), te(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), Nt(this, this.state, t, this._modules.get(t), n.preserveState), xr(this, this.state);
};
H.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = Nr(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), zn(this);
};
H.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
H.prototype.hotUpdate = function(t) {
  this._modules.update(t), zn(this, !0);
};
H.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(H.prototype, Yr);
function C(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ue(e) {
  return function t(r) {
    return arguments.length === 0 || C(r) ? t : e.apply(this, arguments);
  };
}
function xe(e) {
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
function ns(e) {
  return function t(r, n, s) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return C(r) ? t : xe(function(i, a) {
          return e(r, i, a);
        });
      case 2:
        return C(r) && C(n) ? t : C(r) ? xe(function(i, a) {
          return e(i, n, a);
        }) : C(n) ? xe(function(i, a) {
          return e(r, i, a);
        }) : ue(function(i) {
          return e(r, n, i);
        });
      default:
        return C(r) && C(n) && C(s) ? t : C(r) && C(n) ? xe(function(i, a) {
          return e(i, a, s);
        }) : C(r) && C(s) ? xe(function(i, a) {
          return e(i, n, a);
        }) : C(n) && C(s) ? xe(function(i, a) {
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
const ea = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function ta(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var ra = /* @__PURE__ */ xe(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const Se = ra;
var na = /* @__PURE__ */ ns(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const sa = na, cn = Number.isInteger || function(t) {
  return t << 0 === t;
};
var ia = /* @__PURE__ */ ue(function(t) {
  return t == null;
});
const aa = ia;
var oa = /* @__PURE__ */ ns(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !aa(n) && ta(s, n) ? n[s] : cn(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (cn(s) && ea(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return sa(s, r, n);
});
const Ie = oa;
function ua(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var la = /* @__PURE__ */ ue(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const ca = la;
function ss(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? ss(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (ca(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return ua(e);
    default:
      return e;
  }
}
var da = /* @__PURE__ */ ue(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : ss(t, [], [], !0);
});
const fa = da;
function ha(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cr = { exports: {} }, is = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, ma = is, Ae = Object.prototype.toString;
function Rr(e) {
  return Ae.call(e) === "[object Array]";
}
function yr(e) {
  return typeof e > "u";
}
function pa(e) {
  return e !== null && !yr(e) && e.constructor !== null && !yr(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function _a(e) {
  return Ae.call(e) === "[object ArrayBuffer]";
}
function ya(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function ga(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function va(e) {
  return typeof e == "string";
}
function wa(e) {
  return typeof e == "number";
}
function as(e) {
  return e !== null && typeof e == "object";
}
function _t(e) {
  if (Ae.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Sa(e) {
  return Ae.call(e) === "[object Date]";
}
function ba(e) {
  return Ae.call(e) === "[object File]";
}
function Oa(e) {
  return Ae.call(e) === "[object Blob]";
}
function os(e) {
  return Ae.call(e) === "[object Function]";
}
function ka(e) {
  return as(e) && os(e.pipe);
}
function Da(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function Ma(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Ta() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Pr(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Rr(e))
      for (var r = 0, n = e.length; r < n; r++)
        t.call(null, e[r], r, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function gr() {
  var e = {};
  function t(s, i) {
    _t(e[i]) && _t(s) ? e[i] = gr(e[i], s) : _t(s) ? e[i] = gr({}, s) : Rr(s) ? e[i] = s.slice() : e[i] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Pr(arguments[r], t);
  return e;
}
function Ea(e, t, r) {
  return Pr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = ma(s, r) : e[i] = s;
  }), e;
}
function xa(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var z = {
  isArray: Rr,
  isArrayBuffer: _a,
  isBuffer: pa,
  isFormData: ya,
  isArrayBufferView: ga,
  isString: va,
  isNumber: wa,
  isObject: as,
  isPlainObject: _t,
  isUndefined: yr,
  isDate: Sa,
  isFile: ba,
  isBlob: Oa,
  isFunction: os,
  isStream: ka,
  isURLSearchParams: Da,
  isStandardBrowserEnv: Ta,
  forEach: Pr,
  merge: gr,
  extend: Ea,
  trim: Ma,
  stripBOM: xa
}, Ue = z;
function dn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var us = function(t, r, n) {
  if (!r)
    return t;
  var s;
  if (n)
    s = n(r);
  else if (Ue.isURLSearchParams(r))
    s = r.toString();
  else {
    var i = [];
    Ue.forEach(r, function(u, l) {
      u === null || typeof u > "u" || (Ue.isArray(u) ? l = l + "[]" : u = [u], Ue.forEach(u, function(m) {
        Ue.isDate(m) ? m = m.toISOString() : Ue.isObject(m) && (m = JSON.stringify(m)), i.push(dn(l) + "=" + dn(m));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, Na = z;
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
  Na.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Ya = Yt, Ca = z, Ra = function(t, r) {
  Ca.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, ls = function(t, r, n, s, i) {
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
}, Zt, fn;
function cs() {
  if (fn)
    return Zt;
  fn = 1;
  var e = ls;
  return Zt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Zt;
}
var Jt, hn;
function Pa() {
  if (hn)
    return Jt;
  hn = 1;
  var e = cs();
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
var Kt, mn;
function Aa() {
  if (mn)
    return Kt;
  mn = 1;
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
var Qt, pn;
function Va() {
  return pn || (pn = 1, Qt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Qt;
}
var Xt, _n;
function La() {
  return _n || (_n = 1, Xt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), Xt;
}
var er, yn;
function Fa() {
  if (yn)
    return er;
  yn = 1;
  var e = Va(), t = La();
  return er = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, er;
}
var tr, gn;
function Ia() {
  if (gn)
    return tr;
  gn = 1;
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
var rr, vn;
function Ua() {
  if (vn)
    return rr;
  vn = 1;
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
var nr, wn;
function Sn() {
  if (wn)
    return nr;
  wn = 1;
  var e = z, t = Pa(), r = Aa(), n = us, s = Fa(), i = Ia(), a = Ua(), o = cs();
  return nr = function(l) {
    return new Promise(function(m, p) {
      var g = l.data, Y = l.headers, Me = l.responseType;
      e.isFormData(g) && delete Y["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var qt = l.auth.username || "", Bt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        Y.Authorization = "Basic " + btoa(qt + ":" + Bt);
      }
      var ut = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(ut, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function lt() {
        if (w) {
          var v = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !Me || Me === "text" || Me === "json" ? w.responseText : w.response, G = {
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
      if ("onloadend" in w ? w.onloadend = lt : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(lt);
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
        var _ = (l.withCredentials || a(ut)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        _ && (Y[l.xsrfHeaderName] = _);
      }
      "setRequestHeader" in w && e.forEach(Y, function(S, G) {
        typeof g > "u" && G.toLowerCase() === "content-type" ? delete Y[G] : w.setRequestHeader(G, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), Me && Me !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), p(S), w = null);
      }), g || (g = null), w.send(g);
    });
  }, nr;
}
var A = z, bn = Ra, Wa = ls, ja = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function On(e, t) {
  !A.isUndefined(e) && A.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function $a() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = Sn()), e;
}
function Ha(e, t, r) {
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
  adapter: $a(),
  transformRequest: [function(t, r) {
    return bn(r, "Accept"), bn(r, "Content-Type"), A.isFormData(t) || A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) ? t : A.isArrayBufferView(t) ? t.buffer : A.isURLSearchParams(t) ? (On(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : A.isObject(t) || r && r["Content-Type"] === "application/json" ? (On(r, "application/json"), Ha(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && A.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Wa(a, this, "E_JSON_PARSE") : a;
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
  Ct.headers[t] = A.merge(ja);
});
var Ar = Ct, Ga = z, qa = Ar, Ba = function(t, r, n) {
  var s = this || qa;
  return Ga.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, sr, kn;
function ds() {
  return kn || (kn = 1, sr = function(t) {
    return !!(t && t.__CANCEL__);
  }), sr;
}
var Dn = z, ir = Ba, za = ds(), Za = Ar;
function ar(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Ja = function(t) {
  ar(t), t.headers = t.headers || {}, t.data = ir.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = Dn.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), Dn.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete t.headers[s];
    }
  );
  var r = t.adapter || Za.adapter;
  return r(t).then(function(s) {
    return ar(t), s.data = ir.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return za(s) || (ar(t), s && s.response && (s.response.data = ir.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, V = z, fs = function(t, r) {
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
  var f = s.concat(i).concat(a).concat(o), m = Object.keys(t).concat(Object.keys(r)).filter(function(g) {
    return f.indexOf(g) === -1;
  });
  return V.forEach(m, l), n;
};
const Ka = "axios", Qa = "0.21.4", Xa = "Promise based HTTP client for the browser and node.js", eo = "index.js", to = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, ro = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, no = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], so = "Matt Zabriskie", io = "MIT", ao = {
  url: "https://github.com/axios/axios/issues"
}, oo = "https://axios-http.com", uo = {
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
}, lo = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, co = "dist/axios.min.js", fo = "dist/axios.min.js", ho = "./index.d.ts", mo = {
  "follow-redirects": "^1.14.0"
}, po = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], _o = {
  name: Ka,
  version: Qa,
  description: Xa,
  main: eo,
  scripts: to,
  repository: ro,
  keywords: no,
  author: so,
  license: io,
  bugs: ao,
  homepage: oo,
  devDependencies: uo,
  browser: lo,
  jsdelivr: co,
  unpkg: fo,
  typings: ho,
  dependencies: mo,
  bundlesize: po
};
var hs = _o, Vr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Vr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Mn = {}, yo = hs.version.split(".");
function ms(e, t) {
  for (var r = t ? t.split(".") : yo, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
Vr.transitional = function(t, r, n) {
  var s = r && ms(r);
  function i(a, o) {
    return "[Axios v" + hs.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
  }
  return function(a, o, u) {
    if (t === !1)
      throw new Error(i(o, " has been removed in " + r));
    return s && !Mn[o] && (Mn[o] = !0, console.warn(
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
var vo = {
  isOlderVersion: ms,
  assertOptions: go,
  validators: Vr
}, ps = z, wo = us, Tn = Ya, En = Ja, Rt = fs, _s = vo, We = _s.validators;
function nt(e) {
  this.defaults = e, this.interceptors = {
    request: new Tn(),
    response: new Tn()
  };
}
nt.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Rt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && _s.assertOptions(r, {
    silentJSONParsing: We.transitional(We.boolean, "1.0.0"),
    forcedJSONParsing: We.transitional(We.boolean, "1.0.0"),
    clarifyTimeoutError: We.transitional(We.boolean, "1.0.0")
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
    var o = [En, void 0];
    for (Array.prototype.unshift.apply(o, n), o = o.concat(i), a = Promise.resolve(t); o.length; )
      a = a.then(o.shift(), o.shift());
    return a;
  }
  for (var u = t; n.length; ) {
    var l = n.shift(), f = n.shift();
    try {
      u = l(u);
    } catch (m) {
      f(m);
      break;
    }
  }
  try {
    a = En(u);
  } catch (m) {
    return Promise.reject(m);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
nt.prototype.getUri = function(t) {
  return t = Rt(this.defaults, t), wo(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
ps.forEach(["delete", "get", "head", "options"], function(t) {
  nt.prototype[t] = function(r, n) {
    return this.request(Rt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
ps.forEach(["post", "put", "patch"], function(t) {
  nt.prototype[t] = function(r, n, s) {
    return this.request(Rt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var So = nt, or, xn;
function ys() {
  if (xn)
    return or;
  xn = 1;
  function e(t) {
    this.message = t;
  }
  return e.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e.prototype.__CANCEL__ = !0, or = e, or;
}
var ur, Nn;
function bo() {
  if (Nn)
    return ur;
  Nn = 1;
  var e = ys();
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
var lr, Yn;
function Oo() {
  return Yn || (Yn = 1, lr = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), lr;
}
var cr, Cn;
function ko() {
  return Cn || (Cn = 1, cr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), cr;
}
var Rn = z, Do = is, yt = So, Mo = fs, To = Ar;
function gs(e) {
  var t = new yt(e), r = Do(yt.prototype.request, t);
  return Rn.extend(r, yt.prototype, t), Rn.extend(r, t), r;
}
var re = gs(To);
re.Axios = yt;
re.create = function(t) {
  return gs(Mo(re.defaults, t));
};
re.Cancel = ys();
re.CancelToken = bo();
re.isCancel = ds();
re.all = function(t) {
  return Promise.all(t);
};
re.spread = Oo();
re.isAxiosError = ko();
Cr.exports = re;
Cr.exports.default = re;
var Eo = Cr.exports, xo = Eo;
const Te = /* @__PURE__ */ ha(xo);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var vs;
function d() {
  return vs.apply(null, arguments);
}
function No(e) {
  vs = e;
}
function ne(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ce(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function D(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Lr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (D(e, t))
      return !1;
  return !0;
}
function $(e) {
  return e === void 0;
}
function ge(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function st(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function ws(e, t) {
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
  return Hs(e, t, r, n, !0).utc();
}
function Yo() {
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
  return e._pf == null && (e._pf = Yo()), e._pf;
}
var vr;
Array.prototype.some ? vr = Array.prototype.some : vr = function(e) {
  var t = Object(this), r = t.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function Fr(e) {
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
var Pn = d.momentProperties = [], dr = !1;
function Ir(e, t) {
  var r, n, s, i = Pn.length;
  if ($(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), $(t._i) || (e._i = t._i), $(t._f) || (e._f = t._f), $(t._l) || (e._l = t._l), $(t._strict) || (e._strict = t._strict), $(t._tzm) || (e._tzm = t._tzm), $(t._isUTC) || (e._isUTC = t._isUTC), $(t._offset) || (e._offset = t._offset), $(t._pf) || (e._pf = b(t)), $(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = Pn[r], s = t[n], $(s) || (e[n] = s);
  return e;
}
function it(e) {
  Ir(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), dr === !1 && (dr = !0, d.updateOffset(this), dr = !1);
}
function se(e) {
  return e instanceof it || e != null && e._isAMomentObject != null;
}
function Ss(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Q(e, t) {
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
      Ss(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var An = {};
function bs(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), An[e] || (Ss(t), An[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Co(e) {
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
    D(t, n) && (Ce(e[n]) && Ce(t[n]) ? (r[n] = {}, be(r[n], e[n]), be(r[n], t[n])) : t[n] != null ? r[n] = t[n] : delete r[n]);
  for (n in e)
    D(e, n) && !D(t, n) && Ce(e[n]) && (r[n] = be({}, r[n]));
  return r;
}
function Ur(e) {
  e != null && this.set(e);
}
var Sr;
Object.keys ? Sr = Object.keys : Sr = function(e) {
  var t, r = [];
  for (t in e)
    D(e, t) && r.push(t);
  return r;
};
var Ro = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Po(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, r) : n;
}
function le(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var Wr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ft = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, fr = {}, Ge = {};
function y(e, t, r, n) {
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
function Ao(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Vo(e) {
  var t = e.match(Wr), r, n;
  for (r = 0, n = t.length; r < n; r++)
    Ge[t[r]] ? t[r] = Ge[t[r]] : t[r] = Ao(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += de(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function gt(e, t) {
  return e.isValid() ? (t = Os(t, e.localeData()), fr[t] = fr[t] || Vo(t), fr[t](e)) : e.localeData().invalidDate();
}
function Os(e, t) {
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
var Lo = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Fo(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Wr).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var Io = "Invalid date";
function Uo() {
  return this._invalidDate;
}
var Wo = "%d", jo = /\d{1,2}/;
function $o(e) {
  return this._ordinal.replace("%d", e);
}
var Ho = {
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
function Go(e, t, r, n) {
  var s = this._relativeTime[r];
  return de(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function qo(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return de(r) ? r(t) : r.replace(/%s/i, t);
}
var Qe = {};
function U(e, t) {
  var r = e.toLowerCase();
  Qe[r] = Qe[r + "s"] = Qe[t] = e;
}
function X(e) {
  return typeof e == "string" ? Qe[e] || Qe[e.toLowerCase()] : void 0;
}
function jr(e) {
  var t = {}, r, n;
  for (n in e)
    D(e, n) && (r = X(n), r && (t[r] = e[n]));
  return t;
}
var ks = {};
function W(e, t) {
  ks[e] = t;
}
function Bo(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: ks[r] });
  return t.sort(function(n, s) {
    return n.priority - s.priority;
  }), t;
}
function At(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function K(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function O(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = K(t)), r;
}
function ze(e, t) {
  return function(r) {
    return r != null ? (Ds(this, e, r), d.updateOffset(this, t), this) : bt(this, e);
  };
}
function bt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ds(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && At(e.year()) && e.month() === 1 && e.date() === 29 ? (r = O(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Wt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function zo(e) {
  return e = X(e), de(this[e]) ? this[e]() : this;
}
function Zo(e, t) {
  if (typeof e == "object") {
    e = jr(e);
    var r = Bo(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = X(e), de(this[e]))
    return this[e](t);
  return this;
}
var Ms = /\d/, Z = /\d\d/, Ts = /\d{3}/, $r = /\d{4}/, Vt = /[+-]?\d{6}/, x = /\d\d?/, Es = /\d\d\d\d?/, xs = /\d\d\d\d\d\d?/, Lt = /\d{1,3}/, Hr = /\d{1,4}/, Ft = /[+-]?\d{1,6}/, Ze = /\d+/, It = /[+-]?\d+/, Jo = /Z|[+-]\d\d:?\d\d/gi, Ut = /Z|[+-]\d\d(?::?\d\d)?/gi, Ko = /[+-]?\d+(\.\d{1,3})?/, at = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ot;
Ot = {};
function h(e, t, r) {
  Ot[e] = de(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function Qo(e, t) {
  return D(Ot, e) ? Ot[e](t._strict, t._locale) : new RegExp(Xo(e));
}
function Xo(e) {
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
function eu(e, t, r) {
  t != null && D(br, e) && br[e](t, r._a, r, e);
}
var I = 0, pe = 1, oe = 2, P = 3, ee = 4, _e = 5, Ne = 6, tu = 7, ru = 8;
function nu(e, t) {
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
function Wt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = nu(t, 12);
  return e += (t - r) / 12, r === 1 ? At(e) ? 29 : 28 : 31 - r % 7 % 2;
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
U("month", "M");
W("month", 8);
h("M", x);
h("MM", x, Z);
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
var su = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ns = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ys = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, iu = at, au = at;
function ou(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ys).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function uu(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ys.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function lu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ce([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function cu(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return lu.call(this, e, t, r);
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
function Cs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = O(t);
    else if (t = e.localeData().monthsParse(t), !ge(t))
      return e;
  }
  return r = Math.min(e.date(), Wt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Rs(e) {
  return e != null ? (Cs(this, e), d.updateOffset(this, !0), this) : bt(this, "Month");
}
function du() {
  return Wt(this.year(), this.month());
}
function fu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Ps.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = iu), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function hu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || Ps.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = au), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Ps() {
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
y("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? le(e, 4) : "+" + e;
});
y(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
y(0, ["YYYY", 4], 0, "year");
y(0, ["YYYYY", 5], 0, "year");
y(0, ["YYYYYY", 6, !0], 0, "year");
U("year", "y");
W("year", 1);
h("Y", It);
h("YY", x, Z);
h("YYYY", Hr, $r);
h("YYYYY", Ft, Vt);
h("YYYYYY", Ft, Vt);
T(["YYYYY", "YYYYYY"], I);
T("YYYY", function(e, t) {
  t[I] = e.length === 2 ? d.parseTwoDigitYear(e) : O(e);
});
T("YY", function(e, t) {
  t[I] = d.parseTwoDigitYear(e);
});
T("Y", function(e, t) {
  t[I] = parseInt(e, 10);
});
function Xe(e) {
  return At(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return O(e) + (O(e) > 68 ? 1900 : 2e3);
};
var As = ze("FullYear", !0);
function mu() {
  return At(this.year());
}
function pu(e, t, r, n, s, i, a) {
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
function Vs(e, t, r, n, s) {
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
y("w", ["ww", 2], "wo", "week");
y("W", ["WW", 2], "Wo", "isoWeek");
U("week", "w");
U("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
h("w", x);
h("ww", x, Z);
h("W", x);
h("WW", x, Z);
ot(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = O(e);
  }
);
function _u(e) {
  return tt(e, this._week.dow, this._week.doy).week;
}
var yu = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function gu() {
  return this._week.dow;
}
function vu() {
  return this._week.doy;
}
function wu(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Su(e) {
  var t = tt(this, 1, 4).week;
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
U("day", "d");
U("weekday", "e");
U("isoWeekday", "E");
W("day", 11);
W("weekday", 11);
W("isoWeekday", 11);
h("d", x);
h("e", x);
h("E", x);
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
function bu(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Ou(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Gr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var ku = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Ls = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Du = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Mu = at, Tu = at, Eu = at;
function xu(e, t) {
  var r = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Gr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Nu(e) {
  return e === !0 ? Gr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Yu(e) {
  return e === !0 ? Gr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Cu(e, t, r) {
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
function Ru(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Cu.call(this, e, t, r);
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
function Pu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = bu(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Au(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Vu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Ou(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Lu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = Mu), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Fu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Tu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Iu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Eu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function qr() {
  function e(f, m) {
    return m.length - f.length;
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
function Br() {
  return this.hours() % 12 || 12;
}
function Uu() {
  return this.hours() || 24;
}
y("H", ["HH", 2], 0, "hour");
y("h", ["hh", 2], 0, Br);
y("k", ["kk", 2], 0, Uu);
y("hmm", 0, 0, function() {
  return "" + Br.apply(this) + le(this.minutes(), 2);
});
y("hmmss", 0, 0, function() {
  return "" + Br.apply(this) + le(this.minutes(), 2) + le(this.seconds(), 2);
});
y("Hmm", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2);
});
y("Hmmss", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2) + le(this.seconds(), 2);
});
function Fs(e, t) {
  y(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Fs("a", !0);
Fs("A", !1);
U("hour", "h");
W("hour", 13);
function Is(e, t) {
  return t._meridiemParse;
}
h("a", Is);
h("A", Is);
h("H", x);
h("h", x);
h("k", x);
h("HH", x, Z);
h("hh", x, Z);
h("kk", x, Z);
h("hmm", Es);
h("hmmss", xs);
h("Hmm", Es);
h("Hmmss", xs);
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
function Wu(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var ju = /[ap]\.?m?\.?/i, $u = ze("Hours", !0);
function Hu(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Us = {
  calendar: Ro,
  longDateFormat: Lo,
  invalidDate: Io,
  ordinal: Wo,
  dayOfMonthOrdinalParse: jo,
  relativeTime: Ho,
  months: su,
  monthsShort: Ns,
  week: yu,
  weekdays: ku,
  weekdaysMin: Du,
  weekdaysShort: Ls,
  meridiemParse: ju
}, N = {}, Je = {}, rt;
function Gu(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function Vn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function qu(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = Vn(e[t]).split("-"), r = i.length, n = Vn(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = jt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && Gu(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return rt;
}
function Bu(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function jt(e) {
  var t = null, r;
  if (N[e] === void 0 && typeof module < "u" && module && module.exports && Bu(e))
    try {
      t = rt._abbr, r = require, r("./locale/" + e), ke(t);
    } catch {
      N[e] = null;
    }
  return N[e];
}
function ke(e, t) {
  var r;
  return e && ($(t) ? r = ve(e) : r = zr(e, t), r ? rt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), rt._abbr;
}
function zr(e, t) {
  if (t !== null) {
    var r, n = Us;
    if (t.abbr = e, N[e] != null)
      bs(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = N[e]._config;
    else if (t.parentLocale != null)
      if (N[t.parentLocale] != null)
        n = N[t.parentLocale]._config;
      else if (r = jt(t.parentLocale), r != null)
        n = r._config;
      else
        return Je[t.parentLocale] || (Je[t.parentLocale] = []), Je[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return N[e] = new Ur(wr(n, t)), Je[e] && Je[e].forEach(function(s) {
      zr(s.name, s.config);
    }), ke(e), N[e];
  } else
    return delete N[e], null;
}
function zu(e, t) {
  if (t != null) {
    var r, n, s = Us;
    N[e] != null && N[e].parentLocale != null ? N[e].set(wr(N[e]._config, t)) : (n = jt(e), n != null && (s = n._config), t = wr(s, t), n == null && (t.abbr = e), r = new Ur(t), r.parentLocale = N[e], N[e] = r), ke(e);
  } else
    N[e] != null && (N[e].parentLocale != null ? (N[e] = N[e].parentLocale, e === ke() && ke(e)) : N[e] != null && delete N[e]);
  return N[e];
}
function ve(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return rt;
  if (!ne(e)) {
    if (t = jt(e), t)
      return t;
    e = [e];
  }
  return qu(e);
}
function Zu() {
  return Sr(N);
}
function Zr(e) {
  var t, r = e._a;
  return r && b(e).overflow === -2 && (t = r[pe] < 0 || r[pe] > 11 ? pe : r[oe] < 1 || r[oe] > Wt(r[I], r[pe]) ? oe : r[P] < 0 || r[P] > 24 || r[P] === 24 && (r[ee] !== 0 || r[_e] !== 0 || r[Ne] !== 0) ? P : r[ee] < 0 || r[ee] > 59 ? ee : r[_e] < 0 || r[_e] > 59 ? _e : r[Ne] < 0 || r[Ne] > 999 ? Ne : -1, b(e)._overflowDayOfYear && (t < I || t > oe) && (t = oe), b(e)._overflowWeeks && t === -1 && (t = tu), b(e)._overflowWeekday && t === -1 && (t = ru), b(e).overflow = t), e;
}
var Ju = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ku = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Qu = /Z|[+-]\d\d(?::?\d\d)?/, ht = [
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
], Xu = /^\/?Date\((-?\d+)/i, el = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, tl = {
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
function Ws(e) {
  var t, r, n = e._i, s = Ju.exec(n) || Ku.exec(n), i, a, o, u, l = ht.length, f = hr.length;
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
      if (Qu.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Kr(e);
  } else
    e._isValid = !1;
}
function rl(e, t, r, n, s, i) {
  var a = [
    nl(e),
    Ns.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function nl(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function sl(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function il(e, t, r) {
  if (e) {
    var n = Ls.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return b(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function al(e, t, r) {
  if (e)
    return tl[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function js(e) {
  var t = el.exec(sl(e._i)), r;
  if (t) {
    if (r = rl(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !il(t[1], r, e))
      return;
    e._a = r, e._tzm = al(t[8], t[9], t[10]), e._d = et.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function ol(e) {
  var t = Xu.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Ws(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (js(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = Q(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function $e(e, t, r) {
  return e ?? t ?? r;
}
function ul(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Jr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = ul(e), e._w && e._a[oe] == null && e._a[pe] == null && ll(e), e._dayOfYear != null && (a = $e(e._a[I], s[I]), (e._dayOfYear > Xe(a) || e._dayOfYear === 0) && (b(e)._overflowDayOfYear = !0), r = et(a, 0, e._dayOfYear), e._a[pe] = r.getUTCMonth(), e._a[oe] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[ee] === 0 && e._a[_e] === 0 && e._a[Ne] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? et : pu).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (b(e).weekdayMismatch = !0);
  }
}
function ll(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = $e(
    t.GG,
    e._a[I],
    tt(E(), 1, 4).year
  ), n = $e(t.W, 1), s = $e(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = tt(E(), i, a), r = $e(t.gg, e._a[I], l.year), n = $e(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > ye(r, i, a) ? b(e)._overflowWeeks = !0 : u != null ? b(e)._overflowWeekday = !0 : (o = Vs(r, n, s, i, a), e._a[I] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Kr(e) {
  if (e._f === d.ISO_8601) {
    Ws(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    js(e);
    return;
  }
  e._a = [], b(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, f;
  for (s = Os(e._f, e._locale).match(Wr) || [], f = s.length, r = 0; r < f; r++)
    i = s[r], n = (t.match(Qo(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && b(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), Ge[i] ? (n ? b(e).empty = !1 : b(e).unusedTokens.push(i), eu(i, n, e)) : e._strict && !n && b(e).unusedTokens.push(i);
  b(e).charsLeftOver = o - u, t.length > 0 && b(e).unusedInput.push(t), e._a[P] <= 12 && b(e).bigHour === !0 && e._a[P] > 0 && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[P] = cl(
    e._locale,
    e._a[P],
    e._meridiem
  ), l = b(e).era, l !== null && (e._a[I] = e._locale.erasConvertYear(l, e._a[I])), Jr(e), Zr(e);
}
function cl(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function dl(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    b(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = Ir({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Kr(t), Fr(t) && (a = !0), i += b(t).charsLeftOver, i += b(t).unusedTokens.length * 10, b(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  be(e, r || t);
}
function fl(e) {
  if (!e._d) {
    var t = jr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = ws(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), Jr(e);
  }
}
function hl(e) {
  var t = new it(Zr($s(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function $s(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ve(e._l), t === null || r === void 0 && t === "" ? Pt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), se(t) ? new it(Zr(t)) : (st(t) ? e._d = t : ne(r) ? dl(e) : r ? Kr(e) : ml(e), Fr(e) || (e._d = null), e));
}
function ml(e) {
  var t = e._i;
  $(t) ? e._d = new Date(d.now()) : st(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? ol(e) : ne(t) ? (e._a = ws(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Jr(e)) : Ce(t) ? fl(e) : ge(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Hs(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Ce(e) && Lr(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, hl(i);
}
function E(e, t, r, n) {
  return Hs(e, t, r, n, !1);
}
var pl = Q(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Pt();
  }
), _l = Q(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Pt();
  }
);
function Gs(e, t) {
  var r, n;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return E();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function yl() {
  var e = [].slice.call(arguments, 0);
  return Gs("isBefore", e);
}
function gl() {
  var e = [].slice.call(arguments, 0);
  return Gs("isAfter", e);
}
var vl = function() {
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
function wl(e) {
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
function Sl() {
  return this._isValid;
}
function bl() {
  return ae(NaN);
}
function $t(e) {
  var t = jr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, f = t.millisecond || 0;
  this._isValid = wl(t), this._milliseconds = +f + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ve(), this._bubble();
}
function vt(e) {
  return e instanceof $t;
}
function Or(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Ol(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && O(e[a]) !== O(t[a])) && i++;
  return i + s;
}
function qs(e, t) {
  y(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + le(~~(r / 60), 2) + t + le(~~r % 60, 2);
  });
}
qs("Z", ":");
qs("ZZ", "");
h("Z", Ut);
h("ZZ", Ut);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Qr(Ut, e);
});
var kl = /([\+\-]|\d\d)/gi;
function Qr(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(kl) || ["-", 0, 0], i = +(s[1] * 60) + O(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function Xr(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (se(e) || st(e) ? e.valueOf() : E(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), d.updateOffset(r, !1), r) : E(e).local();
}
function kr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function Dl(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Qr(Ut, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = kr(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? Zs(
      this,
      ae(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : kr(this);
}
function Ml(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Tl(e) {
  return this.utcOffset(0, e);
}
function El(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(kr(this), "m")), this;
}
function xl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Qr(Jo, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Nl(e) {
  return this.isValid() ? (e = e ? E(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Yl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Cl() {
  if (!$(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Ir(e, this), e = $s(e), e._a ? (t = e._isUTC ? ce(e._a) : E(e._a), this._isDSTShifted = this.isValid() && Ol(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Rl() {
  return this.isValid() ? !this._isUTC : !1;
}
function Pl() {
  return this.isValid() ? this._isUTC : !1;
}
function Bs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Al = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Vl = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ae(e, t) {
  var r = e, n = null, s, i, a;
  return vt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ge(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = Al.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: O(n[oe]) * s,
    h: O(n[P]) * s,
    m: O(n[ee]) * s,
    s: O(n[_e]) * s,
    ms: O(Or(n[Ne] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = Vl.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: Ee(n[2], s),
    M: Ee(n[3], s),
    w: Ee(n[4], s),
    d: Ee(n[5], s),
    h: Ee(n[6], s),
    m: Ee(n[7], s),
    s: Ee(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Ll(
    E(r.from),
    E(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new $t(r), vt(e) && D(e, "_locale") && (i._locale = e._locale), vt(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
ae.fn = $t.prototype;
ae.invalid = bl;
function Ee(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Ln(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Ll(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Xr(t, e), e.isBefore(t) ? r = Ln(e, t) : (r = Ln(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function zs(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (bs(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ae(r, n), Zs(this, s, e), this;
  };
}
function Zs(e, t, r, n) {
  var s = t._milliseconds, i = Or(t._days), a = Or(t._months);
  e.isValid() && (n = n ?? !0, a && Cs(e, bt(e, "Month") + a * r), i && Ds(e, "Date", bt(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && d.updateOffset(e, i || a));
}
var Fl = zs(1, "add"), Il = zs(-1, "subtract");
function Js(e) {
  return typeof e == "string" || e instanceof String;
}
function Ul(e) {
  return se(e) || st(e) || Js(e) || ge(e) || jl(e) || Wl(e) || e === null || e === void 0;
}
function Wl(e) {
  var t = Ce(e) && !Lr(e), r = !1, n = [
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
function jl(e) {
  var t = ne(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ge(n) && Js(e);
  }).length === 0), t && r;
}
function $l(e) {
  var t = Ce(e) && !Lr(e), r = !1, n = [
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
function Hl(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Gl(e, t) {
  arguments.length === 1 && (arguments[0] ? Ul(arguments[0]) ? (e = arguments[0], t = void 0) : $l(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || E(), n = Xr(r, this).startOf("day"), s = d.calendarFormat(this, n) || "sameElse", i = t && (de(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, E(r))
  );
}
function ql() {
  return new it(this);
}
function Bl(e, t) {
  var r = se(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function zl(e, t) {
  var r = se(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function Zl(e, t, r, n) {
  var s = se(e) ? e : E(e), i = se(t) ? t : E(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Jl(e, t) {
  var r = se(e) ? e : E(e), n;
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function Kl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Ql(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Xl(e, t, r) {
  var n, s, i;
  if (!this.isValid())
    return NaN;
  if (n = Xr(e, this), !n.isValid())
    return NaN;
  switch (s = (n.utcOffset() - this.utcOffset()) * 6e4, t = X(t), t) {
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
  return r ? i : K(i);
}
function wt(e, t) {
  if (e.date() < t.date())
    return -wt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(r, "months"), s, i;
  return t - n < 0 ? (s = e.clone().add(r - 1, "months"), i = (t - n) / (n - s)) : (s = e.clone().add(r + 1, "months"), i = (t - n) / (s - n)), -(r + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function ec() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function tc(e) {
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
function rc() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function nc(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = gt(this, e);
  return this.localeData().postformat(t);
}
function sc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || E(e).isValid()) ? ae({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ic(e) {
  return this.from(E(), e);
}
function ac(e, t) {
  return this.isValid() && (se(e) && e.isValid() || E(e).isValid()) ? ae({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function oc(e) {
  return this.to(E(), e);
}
function Ks(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ve(e), t != null && (this._locale = t), this);
}
var Qs = Q(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Xs() {
  return this._locale;
}
var Dt = 1e3, qe = 60 * Dt, Mt = 60 * qe, ei = (365 * 400 + 97) * 24 * Mt;
function Be(e, t) {
  return (e % t + t) % t;
}
function ti(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - ei : new Date(e, t, r).valueOf();
}
function ri(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - ei : Date.UTC(e, t, r);
}
function uc(e) {
  var t, r;
  if (e = X(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ri : ti, e) {
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
function lc(e) {
  var t, r;
  if (e = X(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ri : ti, e) {
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
function cc() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function dc() {
  return Math.floor(this.valueOf() / 1e3);
}
function fc() {
  return new Date(this.valueOf());
}
function hc() {
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
function mc() {
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
function pc() {
  return this.isValid() ? this.toISOString() : null;
}
function _c() {
  return Fr(this);
}
function yc() {
  return be({}, b(this));
}
function gc() {
  return b(this).overflow;
}
function vc() {
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
h("N", en);
h("NN", en);
h("NNN", en);
h("NNNN", Nc);
h("NNNNN", Yc);
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
h("yo", Cc);
T(["y", "yy", "yyy", "yyyy"], I);
T(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[I] = r._locale.eraYearOrdinalParse(e, s) : t[I] = parseInt(e, 10);
});
function wc(e, t) {
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
function Sc(e, t, r) {
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
function Oc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function kc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function Dc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].abbr;
  return "";
}
function Mc() {
  var e, t, r, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = s[e].since <= s[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return (this.year() - d(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function Tc(e) {
  return D(this, "_erasNameRegex") || tn.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Ec(e) {
  return D(this, "_erasAbbrRegex") || tn.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function xc(e) {
  return D(this, "_erasNarrowRegex") || tn.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function en(e, t) {
  return t.erasAbbrRegex(e);
}
function Nc(e, t) {
  return t.erasNameRegex(e);
}
function Yc(e, t) {
  return t.erasNarrowRegex(e);
}
function Cc(e, t) {
  return t._eraYearOrdinalRegex || Ze;
}
function tn() {
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
function Ht(e, t) {
  y(0, [e, e.length], 0, t);
}
Ht("gggg", "weekYear");
Ht("ggggg", "weekYear");
Ht("GGGG", "isoWeekYear");
Ht("GGGGG", "isoWeekYear");
U("weekYear", "gg");
U("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
h("G", It);
h("g", It);
h("GG", x, Z);
h("gg", x, Z);
h("GGGG", Hr, $r);
h("gggg", Hr, $r);
h("GGGGG", Ft, Vt);
h("ggggg", Ft, Vt);
ot(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = O(e);
  }
);
ot(["gg", "GG"], function(e, t, r, n) {
  t[n] = d.parseTwoDigitYear(e);
});
function Rc(e) {
  return ni.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Pc(e) {
  return ni.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Ac() {
  return ye(this.year(), 1, 4);
}
function Vc() {
  return ye(this.isoWeekYear(), 1, 4);
}
function Lc() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function Fc() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function ni(e, t, r, n, s) {
  var i;
  return e == null ? tt(this, n, s).year : (i = ye(e, n, s), t > i && (t = i), Ic.call(this, e, t, r, n, s));
}
function Ic(e, t, r, n, s) {
  var i = Vs(e, t, r, n, s), a = et(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
y("Q", 0, "Qo", "quarter");
U("quarter", "Q");
W("quarter", 7);
h("Q", Ms);
T("Q", function(e, t) {
  t[pe] = (O(e) - 1) * 3;
});
function Uc(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
y("D", ["DD", 2], "Do", "date");
U("date", "D");
W("date", 9);
h("D", x);
h("DD", x, Z);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], oe);
T("Do", function(e, t) {
  t[oe] = O(e.match(x)[0]);
});
var si = ze("Date", !0);
y("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
U("dayOfYear", "DDD");
W("dayOfYear", 4);
h("DDD", Lt);
h("DDDD", Ts);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = O(e);
});
function Wc(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
y("m", ["mm", 2], 0, "minute");
U("minute", "m");
W("minute", 14);
h("m", x);
h("mm", x, Z);
T(["m", "mm"], ee);
var jc = ze("Minutes", !1);
y("s", ["ss", 2], 0, "second");
U("second", "s");
W("second", 15);
h("s", x);
h("ss", x, Z);
T(["s", "ss"], _e);
var $c = ze("Seconds", !1);
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
U("millisecond", "ms");
W("millisecond", 16);
h("S", Lt, Ms);
h("SS", Lt, Z);
h("SSS", Lt, Ts);
var Oe, ii;
for (Oe = "SSSS"; Oe.length <= 9; Oe += "S")
  h(Oe, Ze);
function Hc(e, t) {
  t[Ne] = O(("0." + e) * 1e3);
}
for (Oe = "S"; Oe.length <= 9; Oe += "S")
  T(Oe, Hc);
ii = ze("Milliseconds", !1);
y("z", 0, 0, "zoneAbbr");
y("zz", 0, 0, "zoneName");
function Gc() {
  return this._isUTC ? "UTC" : "";
}
function qc() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = it.prototype;
c.add = Fl;
c.calendar = Gl;
c.clone = ql;
c.diff = Xl;
c.endOf = lc;
c.format = nc;
c.from = sc;
c.fromNow = ic;
c.to = ac;
c.toNow = oc;
c.get = zo;
c.invalidAt = gc;
c.isAfter = Bl;
c.isBefore = zl;
c.isBetween = Zl;
c.isSame = Jl;
c.isSameOrAfter = Kl;
c.isSameOrBefore = Ql;
c.isValid = _c;
c.lang = Qs;
c.locale = Ks;
c.localeData = Xs;
c.max = _l;
c.min = pl;
c.parsingFlags = yc;
c.set = Zo;
c.startOf = uc;
c.subtract = Il;
c.toArray = hc;
c.toObject = mc;
c.toDate = fc;
c.toISOString = tc;
c.inspect = rc;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = pc;
c.toString = ec;
c.unix = dc;
c.valueOf = cc;
c.creationData = vc;
c.eraName = Oc;
c.eraNarrow = kc;
c.eraAbbr = Dc;
c.eraYear = Mc;
c.year = As;
c.isLeapYear = mu;
c.weekYear = Rc;
c.isoWeekYear = Pc;
c.quarter = c.quarters = Uc;
c.month = Rs;
c.daysInMonth = du;
c.week = c.weeks = wu;
c.isoWeek = c.isoWeeks = Su;
c.weeksInYear = Lc;
c.weeksInWeekYear = Fc;
c.isoWeeksInYear = Ac;
c.isoWeeksInISOWeekYear = Vc;
c.date = si;
c.day = c.days = Pu;
c.weekday = Au;
c.isoWeekday = Vu;
c.dayOfYear = Wc;
c.hour = c.hours = $u;
c.minute = c.minutes = jc;
c.second = c.seconds = $c;
c.millisecond = c.milliseconds = ii;
c.utcOffset = Dl;
c.utc = Tl;
c.local = El;
c.parseZone = xl;
c.hasAlignedHourOffset = Nl;
c.isDST = Yl;
c.isLocal = Rl;
c.isUtcOffset = Pl;
c.isUtc = Bs;
c.isUTC = Bs;
c.zoneAbbr = Gc;
c.zoneName = qc;
c.dates = Q(
  "dates accessor is deprecated. Use date instead.",
  si
);
c.months = Q(
  "months accessor is deprecated. Use month instead",
  Rs
);
c.years = Q(
  "years accessor is deprecated. Use year instead",
  As
);
c.zone = Q(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Ml
);
c.isDSTShifted = Q(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Cl
);
function Bc(e) {
  return E(e * 1e3);
}
function zc() {
  return E.apply(null, arguments).parseZone();
}
function ai(e) {
  return e;
}
var M = Ur.prototype;
M.calendar = Po;
M.longDateFormat = Fo;
M.invalidDate = Uo;
M.ordinal = $o;
M.preparse = ai;
M.postformat = ai;
M.relativeTime = Go;
M.pastFuture = qo;
M.set = Co;
M.eras = wc;
M.erasParse = Sc;
M.erasConvertYear = bc;
M.erasAbbrRegex = Ec;
M.erasNameRegex = Tc;
M.erasNarrowRegex = xc;
M.months = ou;
M.monthsShort = uu;
M.monthsParse = cu;
M.monthsRegex = hu;
M.monthsShortRegex = fu;
M.week = _u;
M.firstDayOfYear = vu;
M.firstDayOfWeek = gu;
M.weekdays = xu;
M.weekdaysMin = Yu;
M.weekdaysShort = Nu;
M.weekdaysParse = Ru;
M.weekdaysRegex = Lu;
M.weekdaysShortRegex = Fu;
M.weekdaysMinRegex = Iu;
M.isPM = Wu;
M.meridiem = Hu;
function Tt(e, t, r, n) {
  var s = ve(), i = ce().set(n, t);
  return s[r](i, e);
}
function oi(e, t, r) {
  if (ge(e) && (t = e, e = void 0), e = e || "", t != null)
    return Tt(e, t, r, "month");
  var n, s = [];
  for (n = 0; n < 12; n++)
    s[n] = Tt(e, n, r, "month");
  return s;
}
function rn(e, t, r, n) {
  typeof e == "boolean" ? (ge(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ge(t) && (r = t, t = void 0), t = t || "");
  var s = ve(), i = e ? s._week.dow : 0, a, o = [];
  if (r != null)
    return Tt(t, (r + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = Tt(t, (a + i) % 7, n, "day");
  return o;
}
function Zc(e, t) {
  return oi(e, t, "months");
}
function Jc(e, t) {
  return oi(e, t, "monthsShort");
}
function Kc(e, t, r) {
  return rn(e, t, r, "weekdays");
}
function Qc(e, t, r) {
  return rn(e, t, r, "weekdaysShort");
}
function Xc(e, t, r) {
  return rn(e, t, r, "weekdaysMin");
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
d.lang = Q(
  "moment.lang is deprecated. Use moment.locale instead.",
  ke
);
d.langData = Q(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ve
);
var he = Math.abs;
function ed() {
  var e = this._data;
  return this._milliseconds = he(this._milliseconds), this._days = he(this._days), this._months = he(this._months), e.milliseconds = he(e.milliseconds), e.seconds = he(e.seconds), e.minutes = he(e.minutes), e.hours = he(e.hours), e.months = he(e.months), e.years = he(e.years), this;
}
function ui(e, t, r, n) {
  var s = ae(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function td(e, t) {
  return ui(this, e, t, 1);
}
function rd(e, t) {
  return ui(this, e, t, -1);
}
function Fn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function nd() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Fn(Dr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = K(e / 1e3), n.seconds = s % 60, i = K(s / 60), n.minutes = i % 60, a = K(i / 60), n.hours = a % 24, t += K(a / 24), u = K(li(t)), r += u, t -= Fn(Dr(u)), o = K(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function li(e) {
  return e * 4800 / 146097;
}
function Dr(e) {
  return e * 146097 / 4800;
}
function sd(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = X(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + li(t), e) {
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
function id() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + O(this._months / 12) * 31536e6 : NaN;
}
function we(e) {
  return function() {
    return this.as(e);
  };
}
var ad = we("ms"), od = we("s"), ud = we("m"), ld = we("h"), cd = we("d"), dd = we("w"), fd = we("M"), hd = we("Q"), md = we("y");
function pd() {
  return ae(this);
}
function _d(e) {
  return e = X(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ve(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var yd = Ve("milliseconds"), gd = Ve("seconds"), vd = Ve("minutes"), wd = Ve("hours"), Sd = Ve("days"), bd = Ve("months"), Od = Ve("years");
function kd() {
  return K(this.days() / 7);
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
function Dd(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function Md(e, t, r, n) {
  var s = ae(e).abs(), i = me(s.as("s")), a = me(s.as("m")), o = me(s.as("h")), u = me(s.as("d")), l = me(s.as("M")), f = me(s.as("w")), m = me(s.as("y")), p = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (p = p || f <= 1 && ["w"] || f < r.w && ["ww", f]), p = p || l <= 1 && ["M"] || l < r.M && ["MM", l] || m <= 1 && ["y"] || ["yy", m], p[2] = t, p[3] = +e > 0, p[4] = n, Dd.apply(null, p);
}
function Td(e) {
  return e === void 0 ? me : typeof e == "function" ? (me = e, !0) : !1;
}
function Ed(e, t) {
  return He[e] === void 0 ? !1 : t === void 0 ? He[e] : (He[e] = t, e === "s" && (He.ss = t - 1), !0);
}
function xd(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = He, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, He, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = Md(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var mr = Math.abs;
function je(e) {
  return (e > 0) - (e < 0) || +e;
}
function Gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = mr(this._milliseconds) / 1e3, t = mr(this._days), r = mr(this._months), n, s, i, a, o = this.asSeconds(), u, l, f, m;
  return o ? (n = K(e / 60), s = K(n / 60), e %= 60, n %= 60, i = K(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = je(this._months) !== je(o) ? "-" : "", f = je(this._days) !== je(o) ? "-" : "", m = je(this._milliseconds) !== je(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? f + t + "D" : "") + (s || n || e ? "T" : "") + (s ? m + s + "H" : "") + (n ? m + n + "M" : "") + (e ? m + a + "S" : "")) : "P0D";
}
var k = $t.prototype;
k.isValid = Sl;
k.abs = ed;
k.add = td;
k.subtract = rd;
k.as = sd;
k.asMilliseconds = ad;
k.asSeconds = od;
k.asMinutes = ud;
k.asHours = ld;
k.asDays = cd;
k.asWeeks = dd;
k.asMonths = fd;
k.asQuarters = hd;
k.asYears = md;
k.valueOf = id;
k._bubble = nd;
k.clone = pd;
k.get = _d;
k.milliseconds = yd;
k.seconds = gd;
k.minutes = vd;
k.hours = wd;
k.days = Sd;
k.weeks = kd;
k.months = bd;
k.years = Od;
k.humanize = xd;
k.toISOString = Gt;
k.toString = Gt;
k.toJSON = Gt;
k.locale = Ks;
k.localeData = Xs;
k.toIsoString = Q(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Gt
);
k.lang = Qs;
y("X", 0, 0, "unix");
y("x", 0, 0, "valueOf");
h("x", It);
h("X", Ko);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(O(e));
});
//! moment.js
d.version = "2.29.4";
No(E);
d.fn = c;
d.min = yl;
d.max = gl;
d.now = vl;
d.utc = ce;
d.unix = Bc;
d.months = Zc;
d.isDate = st;
d.locale = ke;
d.invalid = Pt;
d.duration = ae;
d.isMoment = se;
d.weekdays = Kc;
d.parseZone = zc;
d.localeData = ve;
d.isDuration = vt;
d.monthsShort = Jc;
d.weekdaysMin = Xc;
d.defineLocale = zr;
d.updateLocale = zu;
d.locales = Zu;
d.weekdaysShort = Qc;
d.normalizeUnits = X;
d.relativeTimeRounding = Td;
d.relativeTimeThreshold = Ed;
d.calendarFormat = Hl;
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
var L = function() {
};
L.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (Te.defaults.headers.common["X-CSRF-Token"] = e.content), Te.defaults.headers.common.Accept = "application/json", Te.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, L.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  F.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = Te.CancelToken.source();
}, L.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, L.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, L.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = In(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return Te(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, L.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = In(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), F.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, L.cancelTokenSources = {}, L.active = 0, Te.interceptors.request.use(function(e) {
  return L.active += 1, e;
}, function(e) {
  return L.active -= 1, Promise.reject(e);
}), Te.interceptors.response.use(function(e) {
  return L.active -= 1, e;
}, function(e) {
  return L.active -= 1, Promise.reject(e);
}), window.Api = L;
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
} }, Un = Object.freeze({ __proto__: null, Api: L, Utils: F }), Nd = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Un).forEach(function(r) {
    t.component(r, Un[r]);
  }));
} }, mt = null;
typeof window < "u" ? mt = window.Vue : typeof global < "u" && (mt = global.Vue), mt && mt.use(Nd);
const De = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, Yd = {
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
function Cd(e, t, r, n, s, i) {
  return i.displayValidationMessage ? (j(), B("span", {
    key: 0,
    class: $n(i.inputClass)
  }, Tr(i.inputMessage), 3)) : Ye("", !0);
}
const ci = /* @__PURE__ */ De(Yd, [["render", Cd]]), Rd = {
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
  setup(e) {
    const t = J(() => {
      const n = this.$store.getters.getValue(e.name);
      return n == null || n === "";
    }), r = J(() => ({
      "botyglot-form--class-when-not-empty": !t.value,
      "botyglot-form--class-when-empty": t.value
    }));
    return {
      isEmpty: t,
      inputGroupClass: r
    };
  }
}, Pd = ["id"];
function Ad(e, t, r, n, s, i) {
  return j(), B("div", {
    class: $n([n.inputGroupClass, r.classes]),
    id: r.id + "__wrapper"
  }, [
    Er(e.$slots, "default")
  ], 10, Pd);
}
const Vd = /* @__PURE__ */ De(Rd, [["render", Ad]]), Ld = {
  components: { ComponentWrapper: Vd, ErrorsPlaceholder: ci },
  inheritAttrs: !1,
  props: {
    append: {
      type: String
    },
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    prepend: {
      type: String
    },
    suggest_value: {
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(e) {
    const t = J({
      get() {
        return this.$store.getters.getTouched(e.name);
      },
      set(f) {
        this.$store.commit("setTouched", {
          value: f,
          name: e.name
        });
      }
    }), r = J({
      get() {
        return this.$store.getters.getValue(e.name);
      },
      set(f) {
        this.$store.dispatch("update", {
          value: f,
          name: e.name
        });
      }
    }), n = J(() => e.suggest_value === "true" || e.suggest_value === !0 || e.suggest_value === "force"), s = J(() => e.display_error === "true" || e.display_error === !0), i = J(() => n.value && !t.value || e.suggest_value === "force");
    vi(() => {
      i.value && (r.value = this.$store.getters.getSuggestedValues(e.name));
    });
    const a = J(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": t.value && o.value,
      "input-block__field--warning": t.value && !o.value && u.value
    })), o = J(() => t.value ? this.$store.getters.getError(e.name) : null), u = J(() => t.value ? this.$store.getters.getWarning(e.name) : null), l = J(() => ({
      "input-block": !0
    }));
    return {
      inputTouched: t,
      inputValue: r,
      suggestValue: n,
      displayError: s,
      useSuggestedValue: i,
      inputClass: a,
      inputError: o,
      inputWarning: u,
      inputGroupClass: l
    };
  }
}, Fd = ["id"], Id = ["innerHTML"], Ud = ["id", "name"], Wd = ["id"], jd = ["innerHTML"];
function $d(e, t, r, n, s, i) {
  const a = nn("ErrorsPlaceholder"), o = nn("ComponentWrapper");
  return j(), sn(o, {
    name: r.name,
    classes: n.inputGroupClass,
    id: r.id
  }, {
    default: wi(() => [
      r.prepend ? (j(), B("div", {
        key: 0,
        class: "input-block__prepend",
        id: r.id + "__prepend"
      }, [
        pt("span", { innerHTML: r.prepend }, null, 8, Id)
      ], 8, Fd)) : Ye("", !0),
      Hn(pt("input", xt(e.$attrs, {
        class: [n.inputClass, { "input--has-prepend": r.prepend, "input--has-append": r.append }],
        id: r.id,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => n.inputValue = u),
        onFocus: t[1] || (t[1] = (u) => n.inputTouched = !0),
        name: r.name
      }), null, 16, Ud), [
        [Gn, n.inputValue]
      ]),
      r.append ? (j(), B("div", {
        key: 1,
        class: "input-block__append",
        id: r.id + "__append"
      }, [
        pt("span", { innerHTML: r.append }, null, 8, jd)
      ], 8, Wd)) : Ye("", !0),
      n.displayError ? (j(), sn(a, {
        key: 2,
        names: [r.name]
      }, null, 8, ["names"])) : Ye("", !0)
    ]),
    _: 1
  }, 8, ["name", "classes", "id"]);
}
const Hd = /* @__PURE__ */ De(Ld, [["render", $d]]), Gd = {
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
    values(e, t) {
      this.autoSubmit === "onChange" && this.debounce(750);
    }
  }
}, qd = ["accept-charset", "action", "data-values", "method", "enctype"];
function Bd(e, t, r, n, s, i) {
  return j(), B("form", {
    "accept-charset": r.acceptCharset,
    action: r.action,
    "data-values": e.dataValues,
    method: r.method,
    enctype: r.enctype,
    onSubmit: t[0] || (t[0] = Si((...a) => i.handleSubmit && i.handleSubmit(...a), ["prevent"])),
    "on:ajax:beforeSend": t[1] || (t[1] = (...a) => i.ajaxBeforeSend && i.ajaxBeforeSend(...a)),
    ref: "form"
  }, [
    Er(e.$slots, "default")
  ], 40, qd);
}
const zd = /* @__PURE__ */ De(Gd, [["render", Bd]]), Zd = {
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
}, Jd = ["id", "name"];
function Kd(e, t, r, n, s, i) {
  return Hn((j(), B("input", xt(e.$attrs, {
    id: r.id,
    name: r.name,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.inputValue = a)
  }), null, 16, Jd)), [
    [Gn, i.inputValue]
  ]);
}
const Qd = /* @__PURE__ */ De(Zd, [["render", Kd]]), Xd = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      require: !0
    }
  }
}, ef = ["for"];
function tf(e, t, r, n, s, i) {
  return j(), B("label", {
    for: e.$props.for
  }, [
    Er(e.$slots, "default")
  ], 8, ef);
}
const rf = /* @__PURE__ */ De(Xd, [["render", tf]]), nf = {
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
}, sf = { class: "form-validation" }, af = ["disabled"], of = {
  key: 1,
  class: "form-validation__tooltip"
};
function uf(e, t, r, n, s, i) {
  return j(), B("div", sf, [
    pt("input", xt(this.$attrs, {
      onClick: t[0] || (t[0] = (...a) => i.submitting && i.submitting(...a)),
      disabled: s.disabled
    }), null, 16, af),
    i.displayValidationWarning ? (j(), B("div", {
      key: 0,
      class: "form-validation__global-error",
      onClick: t[1] || (t[1] = (a) => s.displayValidationMessages = !s.displayValidationMessages)
    }, "!")) : Ye("", !0),
    i.displayValidationWarning & s.displayValidationMessages ? (j(), B("ul", of, [
      (j(!0), B(bi, null, Oi(i.recapErrors, (a) => (j(), B("li", { key: a }, Tr(a), 1))), 128))
    ])) : Ye("", !0)
  ]);
}
const lf = /* @__PURE__ */ De(nf, [["render", uf]]), cf = {
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
function df(e, t, r, n, s, i) {
  return i.displaySuggestedValue ? (j(), B("span", ki(xt({ key: 0 }, this.$attrs)), Tr(i.getSuggestedValue), 17)) : Ye("", !0);
}
const ff = /* @__PURE__ */ De(cf, [["render", df]]);
class hf {
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
    hideValidationErrors: m = !1,
    ...p
  }) {
    window.toto = "TOTO";
    let g = {
      "botyglot-input": Hd,
      "botyglot-form": zd,
      "botyglot-hidden": Qd,
      "botyglot-submit": lf,
      "botyglot-label": rf,
      "botyglot-errors-placeholder": ci,
      "botyglot-suggested-value": ff
    };
    const Y = Object.keys(u)[0];
    let { errors: Me, warnings: w, suggested_values: qt, potential_values: Bt, ...ut } = u[Y], lt = {
      values: {
        [Y]: ut || {}
      },
      errors: {
        [Y]: Me || {}
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
        [Y]: Bt || {}
      },
      suggestedValues: {
        [Y]: qt || {}
      },
      meta: Object.assign({
        modelName: Y,
        authenticityToken: r,
        globalAuthenticityToken: s,
        validationUrl: o,
        httpMethod: i,
        disableValidation: f,
        hideValidationErrors: m
      }, p)
    };
    this.store = Xi({
      state: lt,
      plugins: a,
      getters: {
        getValue: (_) => (v) => {
          let S = F.dotify(v);
          return Se(S.split("."), _.values);
        },
        getError: (_) => (v) => {
          let S = F.dotify(v);
          return _.meta.hideValidationErrors ? null : Se(S.split("."), _.errors);
        },
        getWarning: (_) => (v) => {
          let S = F.dotify(v);
          return _.meta.hideValidationErrors ? null : Se(S.split("."), _.warnings);
        },
        getTouched: (_) => (v) => {
          let S = F.dotify(v);
          return Se(S.split("."), _.touched) || Se([Y, "_submit"], _.touched);
        },
        getMeta: (_) => (v) => {
          let S = F.dotify(v);
          return Se(S.split("."), _.meta);
        },
        getPotentialValues: (_) => (v) => {
          let S = F.dotify(v);
          return Se(S.split("."), _.potentialValues);
        },
        getSuggestedValues: (_) => (v) => {
          let S = F.dotify(v);
          return Se(S.split("."), _.suggestedValues);
        }
      },
      mutations: {
        setValue: function(_, v) {
          let S = F.dotify(v.name);
          _.values = Ie(S.split("."), v.value, _.values);
        },
        setTouched: function(_, v) {
          let S = F.dotify(v.name);
          _.touched = Ie(S.split("."), v.value, _.touched);
        },
        setError: function(_, v) {
          let S = F.dotify(v.name);
          _.errors = Ie(S.split("."), v.value, _.errors);
        },
        setWarning: function(_, v) {
          let S = F.dotify(v.name);
          _.warnings = Ie(S.split("."), v.value, _.warnings);
        },
        setPotentialValues: function(_, v) {
          let S = F.dotify(v.name);
          _.potentialValues = Ie(S.split("."), v.value, _.potentialValues);
        },
        setSuggestedValues: function(_, v) {
          let S = F.dotify(v.name);
          _.suggestedValues = Ie(S.split("."), v.value, _.suggestedValues);
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
          let { sid: S, url: G, method: fe, data: ct, onSuccess: di, onError: fi, ...hi } = v, mi = (dt) => {
            let _i = Object.assign(hi, {
              sid: S,
              response: dt
            });
            _.dispatch("genericDataReceivedFromServer", _i);
          }, pi = (dt) => {
            console.log("There was a problem with validating the data"), console.log(dt), console.log(JSON.stringify(dt, null, 2));
          };
          L.sendRequest({
            url: G,
            method: fe || "post",
            data: ct,
            onSuccess: di || mi,
            onError: fi || pi,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(_, v) {
        },
        sendValuesToServer: function(_) {
          if (f) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let v = (fe) => {
              _.dispatch("dataReceivedFromServer", fe.data);
            }, S = (fe) => {
              console.log("There was a problem with validating the data"), console.log(fe), console.log(JSON.stringify(fe, null, 2));
            }, G = Object.assign({
              utf8: "✓",
              authenticity_token: _.state.meta.authenticityToken,
              _method: _.state.meta.httpMethod
            }, fa(_.state.values));
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
          let { errors: S, warnings: G, potential_values: fe, suggested_values: ct } = v[Y];
          S && _.commit("setError", {
            value: S,
            name: Y
          }), G && _.commit("setWarning", {
            value: G,
            name: Y
          }), fe && _.commit("setPotentialValues", {
            value: fe,
            name: Y
          }), ct && _.commit("setSuggestedValues", {
            value: ct,
            name: Y
          });
        },
        update: function(_, v) {
          _.commit("setValue", v), _.dispatch("sendValuesToServer");
        }
      }
    }), this.app = Di({
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(g, t),
      props: {}
    }), this.app.mount(n);
  }
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormStore: hf
}, Symbol.toStringTag, { value: "Module" }));
function Mr(e) {
  Mr.installed || (Mr.installed = !0, Object.keys(Wn).forEach((t) => {
    e.component(t, Wn[t]);
  }));
}
const mf = {
  install: Mr
};
let Et = null;
typeof window < "u" ? Et = window.Vue : typeof global < "u" && (Et = global.Vue);
Et && Et.use(mf);
export {
  hf as FormStore,
  mf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
