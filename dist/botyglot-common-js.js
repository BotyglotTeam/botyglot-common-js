import { watch as jn, effectScope as gi, reactive as vi, computed as P, inject as wi, defineComponent as Si, openBlock as $, createElementBlock as z, normalizeClass as $n, toDisplayString as Tr, createCommentVNode as Ye, renderSlot as Er, watchEffect as bi, resolveComponent as nn, createBlock as sn, withCtx as Oi, createElementVNode as pt, withDirectives as Hn, mergeProps as xt, vModelDynamic as Gn, withModifiers as ki, Fragment as Di, renderList as Mi, normalizeProps as Ti, createApp as Ei } from "vue";
function xi() {
  return qn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function qn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ni = typeof Proxy == "function", Yi = "devtools-plugin:setup", Ci = "plugin:settings:set";
let Le, pr;
function Ri() {
  var e;
  return Le !== void 0 || (typeof window < "u" && window.performance ? (Le = !0, pr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Le = !0, pr = globalThis.perf_hooks.performance) : Le = !1), Le;
}
function Pi() {
  return Ri() ? pr.now() : Date.now();
}
class Ai {
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
        return Pi();
      }
    }, r && r.on(Ci, (a, o) => {
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
function Vi(e, t) {
  const r = e, n = qn(), s = xi(), i = Ni && r.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Yi, e, t);
  else {
    const a = i ? new Ai(r, s) : null;
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
var Bn = "store";
function Li(e) {
  return e === void 0 && (e = null), wi(e !== null ? e : Bn);
}
function Re(e, t) {
  Object.keys(e).forEach(function(r) {
    return t(e[r], r);
  });
}
function Fi(e) {
  return e !== null && typeof e == "object";
}
function Ii(e) {
  return e && typeof e.then == "function";
}
function te(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function Ui(e, t) {
  return function() {
    return e(t);
  };
}
function zn(e, t, r) {
  return t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)), function() {
    var n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  };
}
function Zn(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var r = e.state;
  Nt(e, r, [], e._modules.root, !0), xr(e, r, t);
}
function xr(e, t, r) {
  var n = e._state, s = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var i = e._wrappedGetters, a = {}, o = {}, u = gi(!0);
  u.run(function() {
    Re(i, function(l, h) {
      a[h] = Ui(l, e), o[h] = P(function() {
        return a[h]();
      }), Object.defineProperty(e.getters, h, {
        get: function() {
          return o[h].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = vi({
    data: t
  }), e._scope = u, e.strict && Gi(e), n && r && e._withCommit(function() {
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
  var l = n.context = Wi(e, a, r);
  n.forEachMutation(function(h, d) {
    var _ = a + d;
    ji(e, _, h, l);
  }), n.forEachAction(function(h, d) {
    var _ = h.root ? d : a + d, m = h.handler || h;
    $i(e, _, m, l);
  }), n.forEachGetter(function(h, d) {
    var _ = a + d;
    Hi(e, _, h, l);
  }), n.forEachChild(function(h, d) {
    Nt(e, t, r.concat(d), h, s);
  });
}
function Wi(e, t, r) {
  var n = t === "", s = {
    dispatch: n ? e.dispatch : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, h = u.options, d = u.type;
      if ((!h || !h.root) && (d = t + d, process.env.NODE_ENV !== "production" && !e._actions[d])) {
        console.error("[vuex] unknown local action type: " + u.type + ", global type: " + d);
        return;
      }
      return e.dispatch(d, l);
    },
    commit: n ? e.commit : function(i, a, o) {
      var u = St(i, a, o), l = u.payload, h = u.options, d = u.type;
      if ((!h || !h.root) && (d = t + d, process.env.NODE_ENV !== "production" && !e._mutations[d])) {
        console.error("[vuex] unknown local mutation type: " + u.type + ", global type: " + d);
        return;
      }
      e.commit(d, l, h);
    }
  };
  return Object.defineProperties(s, {
    getters: {
      get: n ? function() {
        return e.getters;
      } : function() {
        return Jn(e, t);
      }
    },
    state: {
      get: function() {
        return Nr(e.state, r);
      }
    }
  }), s;
}
function Jn(e, t) {
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
function ji(e, t, r, n) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function(a) {
    r.call(e, n.state, a);
  });
}
function $i(e, t, r, n) {
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
    return Ii(o) || (o = Promise.resolve(o)), e._devtoolHook ? o.catch(function(u) {
      throw e._devtoolHook.emit("vuex:error", u), u;
    }) : o;
  });
}
function Hi(e, t, r, n) {
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
function Gi(e) {
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
  return Fi(e) && e.type && (r = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && te(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: r };
}
var qi = "vuex bindings", an = "vuex:mutations", zt = "vuex:actions", Fe = "vuex", Bi = 0;
function zi(e, t) {
  Vi(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [qi]
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
            es(s, t._modules.root, n.filter, ""), n.rootNodes = s;
          } else
            n.rootNodes = [
              Xn(t._modules.root, "")
            ];
      }), r.on.getInspectorState(function(n) {
        if (n.app === e && n.inspectorId === Fe) {
          var s = n.nodeId;
          Jn(t, s), n.state = Ki(
            Xi(t._modules, s),
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
          n.payload && (i.payload = n.payload), n._id = Bi++, n._time = Date.now(), i.state = s, r.addTimelineEvent({
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
var on = 8702998, Zi = 6710886, Ji = 16777215, Kn = {
  label: "namespaced",
  textColor: Ji,
  backgroundColor: Zi
};
function Qn(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function Xn(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: Qn(t),
    tags: e.namespaced ? [Kn] : [],
    children: Object.keys(e._children).map(
      function(r) {
        return Xn(
          e._children[r],
          t + r + "/"
        );
      }
    )
  };
}
function es(e, t, r, n) {
  n.includes(r) && e.push({
    id: n || "root",
    label: n.endsWith("/") ? n.slice(0, n.length - 1) : n || "Root",
    tags: t.namespaced ? [Kn] : []
  }), Object.keys(t._children).forEach(function(s) {
    es(e, t._children[s], r, n + s + "/");
  });
}
function Ki(e, t, r) {
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
    var i = Qi(t);
    s.getters = Object.keys(i).map(function(a) {
      return {
        key: a.endsWith("/") ? Qn(a) : a,
        editable: !1,
        value: _r(function() {
          return i[a];
        })
      };
    });
  }
  return s;
}
function Qi(e) {
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
function Xi(e, t) {
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
}, ts = { namespaced: { configurable: !0 } };
ts.namespaced.get = function() {
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
Object.defineProperties(ie.prototype, ts);
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
  rs([], this.root, t);
};
Pe.prototype.register = function(t, r, n) {
  var s = this;
  n === void 0 && (n = !0), process.env.NODE_ENV !== "production" && ns(t, r);
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
function rs(e, t, r) {
  if (process.env.NODE_ENV !== "production" && ns(e, r), t.update(r), r.modules)
    for (var n in r.modules) {
      if (!t.getChild(n)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      rs(
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
}, ea = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, ln = {
  getters: un,
  mutations: un,
  actions: ea
};
function ns(e, t) {
  Object.keys(ln).forEach(function(r) {
    if (t[r]) {
      var n = ln[r];
      Re(t[r], function(s, i) {
        te(
          n.assert(s),
          ta(e, r, i, s, n.expected)
        );
      });
    }
  });
}
function ta(e, t, r, n, s) {
  var i = t + " should be " + s + ' but "' + t + "." + r + '"';
  return e.length > 0 && (i += ' in module "' + e.join(".") + '"'), i += " is " + JSON.stringify(n) + ".", i;
}
function ra(e) {
  return new G(e);
}
var G = function e(t) {
  var r = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (te(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), te(this instanceof e, "store must be called with the new operator."));
  var n = t.plugins;
  n === void 0 && (n = []);
  var s = t.strict;
  s === void 0 && (s = !1);
  var i = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new Pe(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = i;
  var a = this, o = this, u = o.dispatch, l = o.commit;
  this.dispatch = function(_, m) {
    return u.call(a, _, m);
  }, this.commit = function(_, m, Y) {
    return l.call(a, _, m, Y);
  }, this.strict = s;
  var h = this._modules.root.state;
  Nt(this, h, [], this._modules.root), xr(this, h), n.forEach(function(d) {
    return d(r);
  });
}, Yr = { state: { configurable: !0 } };
G.prototype.install = function(t, r) {
  t.provide(r || Bn, this), t.config.globalProperties.$store = this;
  var n = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  n && zi(t, this);
};
Yr.state.get = function() {
  return this._state.data;
};
Yr.state.set = function(e) {
  process.env.NODE_ENV !== "production" && te(!1, "use store.replaceState() to explicit replace store state.");
};
G.prototype.commit = function(t, r, n) {
  var s = this, i = St(t, r, n), a = i.type, o = i.payload, u = i.options, l = { type: a, payload: o }, h = this._mutations[a];
  if (!h) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + a);
    return;
  }
  this._withCommit(function() {
    h.forEach(function(_) {
      _(o);
    });
  }), this._subscribers.slice().forEach(function(d) {
    return d(l, s.state);
  }), process.env.NODE_ENV !== "production" && u && u.silent && console.warn(
    "[vuex] mutation type: " + a + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
G.prototype.dispatch = function(t, r) {
  var n = this, s = St(t, r), i = s.type, a = s.payload, o = { type: i, payload: a }, u = this._actions[i];
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
  return new Promise(function(h, d) {
    l.then(function(_) {
      try {
        n._actionSubscribers.filter(function(m) {
          return m.after;
        }).forEach(function(m) {
          return m.after(o, n.state);
        });
      } catch (m) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(m));
      }
      h(_);
    }, function(_) {
      try {
        n._actionSubscribers.filter(function(m) {
          return m.error;
        }).forEach(function(m) {
          return m.error(o, n.state, _);
        });
      } catch (m) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(m));
      }
      d(_);
    });
  });
};
G.prototype.subscribe = function(t, r) {
  return zn(t, this._subscribers, r);
};
G.prototype.subscribeAction = function(t, r) {
  var n = typeof t == "function" ? { before: t } : t;
  return zn(n, this._actionSubscribers, r);
};
G.prototype.watch = function(t, r, n) {
  var s = this;
  return process.env.NODE_ENV !== "production" && te(typeof t == "function", "store.watch only accepts a function."), jn(function() {
    return t(s.state, s.getters);
  }, r, Object.assign({}, n));
};
G.prototype.replaceState = function(t) {
  var r = this;
  this._withCommit(function() {
    r._state.data = t;
  });
};
G.prototype.registerModule = function(t, r, n) {
  n === void 0 && (n = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (te(Array.isArray(t), "module path must be a string or an Array."), te(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, r), Nt(this, this.state, t, this._modules.get(t), n.preserveState), xr(this, this.state);
};
G.prototype.unregisterModule = function(t) {
  var r = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var n = Nr(r.state, t.slice(0, -1));
    delete n[t[t.length - 1]];
  }), Zn(this);
};
G.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && te(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
G.prototype.hotUpdate = function(t) {
  this._modules.update(t), Zn(this, !0);
};
G.prototype._withCommit = function(t) {
  var r = this._committing;
  this._committing = !0, t(), this._committing = r;
};
Object.defineProperties(G.prototype, Yr);
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
function ss(e) {
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
const na = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function sa(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var ia = /* @__PURE__ */ xe(function(t, r) {
  for (var n = r, s = 0; s < t.length; ) {
    if (n == null)
      return;
    n = n[t[s]], s += 1;
  }
  return n;
});
const Se = ia;
var aa = /* @__PURE__ */ ss(function(t, r, n) {
  var s = {};
  for (var i in n)
    s[i] = n[i];
  return s[t] = r, s;
});
const oa = aa, cn = Number.isInteger || function(t) {
  return t << 0 === t;
};
var ua = /* @__PURE__ */ ue(function(t) {
  return t == null;
});
const la = ua;
var ca = /* @__PURE__ */ ss(function e(t, r, n) {
  if (t.length === 0)
    return r;
  var s = t[0];
  if (t.length > 1) {
    var i = !la(n) && sa(s, n) ? n[s] : cn(t[1]) ? [] : {};
    r = e(Array.prototype.slice.call(t, 1), r, i);
  }
  if (cn(s) && na(n)) {
    var a = [].concat(n);
    return a[s] = r, a;
  } else
    return oa(s, r, n);
});
const Ie = ca;
function da(e) {
  return new RegExp(e.source, (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : ""));
}
var fa = /* @__PURE__ */ ue(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const ha = fa;
function is(e, t, r, n) {
  var s = function(a) {
    for (var o = t.length, u = 0; u < o; ) {
      if (e === t[u])
        return r[u];
      u += 1;
    }
    t[u + 1] = e, r[u + 1] = a;
    for (var l in e)
      a[l] = n ? is(e[l], t, r, !0) : e[l];
    return a;
  };
  switch (ha(e)) {
    case "Object":
      return s({});
    case "Array":
      return s([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return da(e);
    default:
      return e;
  }
}
var ma = /* @__PURE__ */ ue(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : is(t, [], [], !0);
});
const pa = ma;
function _a(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cr = { exports: {} }, as = function(t, r) {
  return function() {
    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
      s[i] = arguments[i];
    return t.apply(r, s);
  };
}, ya = as, Ae = Object.prototype.toString;
function Rr(e) {
  return Ae.call(e) === "[object Array]";
}
function yr(e) {
  return typeof e > "u";
}
function ga(e) {
  return e !== null && !yr(e) && e.constructor !== null && !yr(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function va(e) {
  return Ae.call(e) === "[object ArrayBuffer]";
}
function wa(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Sa(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && e.buffer instanceof ArrayBuffer, t;
}
function ba(e) {
  return typeof e == "string";
}
function Oa(e) {
  return typeof e == "number";
}
function os(e) {
  return e !== null && typeof e == "object";
}
function _t(e) {
  if (Ae.call(e) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function ka(e) {
  return Ae.call(e) === "[object Date]";
}
function Da(e) {
  return Ae.call(e) === "[object File]";
}
function Ma(e) {
  return Ae.call(e) === "[object Blob]";
}
function us(e) {
  return Ae.call(e) === "[object Function]";
}
function Ta(e) {
  return os(e) && us(e.pipe);
}
function Ea(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
function xa(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Na() {
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
function Ya(e, t, r) {
  return Pr(t, function(s, i) {
    r && typeof s == "function" ? e[i] = ya(s, r) : e[i] = s;
  }), e;
}
function Ca(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var Z = {
  isArray: Rr,
  isArrayBuffer: va,
  isBuffer: ga,
  isFormData: wa,
  isArrayBufferView: Sa,
  isString: ba,
  isNumber: Oa,
  isObject: os,
  isPlainObject: _t,
  isUndefined: yr,
  isDate: ka,
  isFile: Da,
  isBlob: Ma,
  isFunction: us,
  isStream: Ta,
  isURLSearchParams: Ea,
  isStandardBrowserEnv: Na,
  forEach: Pr,
  merge: gr,
  extend: Ya,
  trim: xa,
  stripBOM: Ca
}, Ue = Z;
function dn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var ls = function(t, r, n) {
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
      u === null || typeof u > "u" || (Ue.isArray(u) ? l = l + "[]" : u = [u], Ue.forEach(u, function(d) {
        Ue.isDate(d) ? d = d.toISOString() : Ue.isObject(d) && (d = JSON.stringify(d)), i.push(dn(l) + "=" + dn(d));
      }));
    }), s = i.join("&");
  }
  if (s) {
    var a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}, Ra = Z;
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
  Ra.forEach(this.handlers, function(n) {
    n !== null && t(n);
  });
};
var Pa = Yt, Aa = Z, Va = function(t, r) {
  Aa.forEach(t, function(s, i) {
    i !== r && i.toUpperCase() === r.toUpperCase() && (t[r] = s, delete t[i]);
  });
}, cs = function(t, r, n, s, i) {
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
function ds() {
  if (fn)
    return Zt;
  fn = 1;
  var e = cs;
  return Zt = function(r, n, s, i, a) {
    var o = new Error(r);
    return e(o, n, s, i, a);
  }, Zt;
}
var Jt, hn;
function La() {
  if (hn)
    return Jt;
  hn = 1;
  var e = ds();
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
function Fa() {
  if (mn)
    return Kt;
  mn = 1;
  var e = Z;
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
function Ia() {
  return pn || (pn = 1, Qt = function(t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  }), Qt;
}
var Xt, _n;
function Ua() {
  return _n || (_n = 1, Xt = function(t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  }), Xt;
}
var er, yn;
function Wa() {
  if (yn)
    return er;
  yn = 1;
  var e = Ia(), t = Ua();
  return er = function(n, s) {
    return n && !e(s) ? t(n, s) : s;
  }, er;
}
var tr, gn;
function ja() {
  if (gn)
    return tr;
  gn = 1;
  var e = Z, t = [
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
function $a() {
  if (vn)
    return rr;
  vn = 1;
  var e = Z;
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
  var e = Z, t = La(), r = Fa(), n = ls, s = Wa(), i = ja(), a = $a(), o = ds();
  return nr = function(l) {
    return new Promise(function(d, _) {
      var m = l.data, Y = l.headers, Me = l.responseType;
      e.isFormData(m) && delete Y["Content-Type"];
      var w = new XMLHttpRequest();
      if (l.auth) {
        var qt = l.auth.username || "", Bt = l.auth.password ? unescape(encodeURIComponent(l.auth.password)) : "";
        Y.Authorization = "Basic " + btoa(qt + ":" + Bt);
      }
      var ut = s(l.baseURL, l.url);
      w.open(l.method.toUpperCase(), n(ut, l.params, l.paramsSerializer), !0), w.timeout = l.timeout;
      function lt() {
        if (w) {
          var v = "getAllResponseHeaders" in w ? i(w.getAllResponseHeaders()) : null, S = !Me || Me === "text" || Me === "json" ? w.responseText : w.response, q = {
            data: S,
            status: w.status,
            statusText: w.statusText,
            headers: v,
            config: l,
            request: w
          };
          t(d, _, q), w = null;
        }
      }
      if ("onloadend" in w ? w.onloadend = lt : w.onreadystatechange = function() {
        !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(lt);
      }, w.onabort = function() {
        w && (_(o("Request aborted", l, "ECONNABORTED", w)), w = null);
      }, w.onerror = function() {
        _(o("Network Error", l, null, w)), w = null;
      }, w.ontimeout = function() {
        var S = "timeout of " + l.timeout + "ms exceeded";
        l.timeoutErrorMessage && (S = l.timeoutErrorMessage), _(o(
          S,
          l,
          l.transitional && l.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          w
        )), w = null;
      }, e.isStandardBrowserEnv()) {
        var y = (l.withCredentials || a(ut)) && l.xsrfCookieName ? r.read(l.xsrfCookieName) : void 0;
        y && (Y[l.xsrfHeaderName] = y);
      }
      "setRequestHeader" in w && e.forEach(Y, function(S, q) {
        typeof m > "u" && q.toLowerCase() === "content-type" ? delete Y[q] : w.setRequestHeader(q, S);
      }), e.isUndefined(l.withCredentials) || (w.withCredentials = !!l.withCredentials), Me && Me !== "json" && (w.responseType = l.responseType), typeof l.onDownloadProgress == "function" && w.addEventListener("progress", l.onDownloadProgress), typeof l.onUploadProgress == "function" && w.upload && w.upload.addEventListener("progress", l.onUploadProgress), l.cancelToken && l.cancelToken.promise.then(function(S) {
        w && (w.abort(), _(S), w = null);
      }), m || (m = null), w.send(m);
    });
  }, nr;
}
var V = Z, bn = Va, Ha = cs, Ga = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function On(e, t) {
  !V.isUndefined(e) && V.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function qa() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = Sn()), e;
}
function Ba(e, t, r) {
  if (V.isString(e))
    try {
      return (t || JSON.parse)(e), V.trim(e);
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
  adapter: qa(),
  transformRequest: [function(t, r) {
    return bn(r, "Accept"), bn(r, "Content-Type"), V.isFormData(t) || V.isArrayBuffer(t) || V.isBuffer(t) || V.isStream(t) || V.isFile(t) || V.isBlob(t) ? t : V.isArrayBufferView(t) ? t.buffer : V.isURLSearchParams(t) ? (On(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : V.isObject(t) || r && r["Content-Type"] === "application/json" ? (On(r, "application/json"), Ba(t)) : t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, i = !n && this.responseType === "json";
    if (i || s && V.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? Ha(a, this, "E_JSON_PARSE") : a;
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
V.forEach(["delete", "get", "head"], function(t) {
  Ct.headers[t] = {};
});
V.forEach(["post", "put", "patch"], function(t) {
  Ct.headers[t] = V.merge(Ga);
});
var Ar = Ct, za = Z, Za = Ar, Ja = function(t, r, n) {
  var s = this || Za;
  return za.forEach(n, function(a) {
    t = a.call(s, t, r);
  }), t;
}, sr, kn;
function fs() {
  return kn || (kn = 1, sr = function(t) {
    return !!(t && t.__CANCEL__);
  }), sr;
}
var Dn = Z, ir = Ja, Ka = fs(), Qa = Ar;
function ar(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}
var Xa = function(t) {
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
  var r = t.adapter || Qa.adapter;
  return r(t).then(function(s) {
    return ar(t), s.data = ir.call(
      t,
      s.data,
      s.headers,
      t.transformResponse
    ), s;
  }, function(s) {
    return Ka(s) || (ar(t), s && s.response && (s.response.data = ir.call(
      t,
      s.response.data,
      s.response.headers,
      t.transformResponse
    ))), Promise.reject(s);
  });
}, L = Z, hs = function(t, r) {
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
  function u(_, m) {
    return L.isPlainObject(_) && L.isPlainObject(m) ? L.merge(_, m) : L.isPlainObject(m) ? L.merge({}, m) : L.isArray(m) ? m.slice() : m;
  }
  function l(_) {
    L.isUndefined(r[_]) ? L.isUndefined(t[_]) || (n[_] = u(void 0, t[_])) : n[_] = u(t[_], r[_]);
  }
  L.forEach(s, function(m) {
    L.isUndefined(r[m]) || (n[m] = u(void 0, r[m]));
  }), L.forEach(i, l), L.forEach(a, function(m) {
    L.isUndefined(r[m]) ? L.isUndefined(t[m]) || (n[m] = u(void 0, t[m])) : n[m] = u(void 0, r[m]);
  }), L.forEach(o, function(m) {
    m in r ? n[m] = u(t[m], r[m]) : m in t && (n[m] = u(void 0, t[m]));
  });
  var h = s.concat(i).concat(a).concat(o), d = Object.keys(t).concat(Object.keys(r)).filter(function(m) {
    return h.indexOf(m) === -1;
  });
  return L.forEach(d, l), n;
};
const eo = "axios", to = "0.21.4", ro = "Promise based HTTP client for the browser and node.js", no = "index.js", so = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
}, io = {
  type: "git",
  url: "https://github.com/axios/axios.git"
}, ao = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
], oo = "Matt Zabriskie", uo = "MIT", lo = {
  url: "https://github.com/axios/axios/issues"
}, co = "https://axios-http.com", fo = {
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
}, ho = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}, mo = "dist/axios.min.js", po = "dist/axios.min.js", _o = "./index.d.ts", yo = {
  "follow-redirects": "^1.14.0"
}, go = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
], vo = {
  name: eo,
  version: to,
  description: ro,
  main: no,
  scripts: so,
  repository: io,
  keywords: ao,
  author: oo,
  license: uo,
  bugs: lo,
  homepage: co,
  devDependencies: fo,
  browser: ho,
  jsdelivr: mo,
  unpkg: po,
  typings: _o,
  dependencies: yo,
  bundlesize: go
};
var ms = vo, Vr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Vr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Mn = {}, wo = ms.version.split(".");
function ps(e, t) {
  for (var r = t ? t.split(".") : wo, n = e.split("."), s = 0; s < 3; s++) {
    if (r[s] > n[s])
      return !0;
    if (r[s] < n[s])
      return !1;
  }
  return !1;
}
Vr.transitional = function(t, r, n) {
  var s = r && ps(r);
  function i(a, o) {
    return "[Axios v" + ms.version + "] Transitional option '" + a + "'" + o + (n ? ". " + n : "");
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
function So(e, t, r) {
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
var bo = {
  isOlderVersion: ps,
  assertOptions: So,
  validators: Vr
}, _s = Z, Oo = ls, Tn = Pa, En = Xa, Rt = hs, ys = bo, We = ys.validators;
function nt(e) {
  this.defaults = e, this.interceptors = {
    request: new Tn(),
    response: new Tn()
  };
}
nt.prototype.request = function(t) {
  typeof t == "string" ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = Rt(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var r = t.transitional;
  r !== void 0 && ys.assertOptions(r, {
    silentJSONParsing: We.transitional(We.boolean, "1.0.0"),
    forcedJSONParsing: We.transitional(We.boolean, "1.0.0"),
    clarifyTimeoutError: We.transitional(We.boolean, "1.0.0")
  }, !1);
  var n = [], s = !0;
  this.interceptors.request.forEach(function(_) {
    typeof _.runWhen == "function" && _.runWhen(t) === !1 || (s = s && _.synchronous, n.unshift(_.fulfilled, _.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(_) {
    i.push(_.fulfilled, _.rejected);
  });
  var a;
  if (!s) {
    var o = [En, void 0];
    for (Array.prototype.unshift.apply(o, n), o = o.concat(i), a = Promise.resolve(t); o.length; )
      a = a.then(o.shift(), o.shift());
    return a;
  }
  for (var u = t; n.length; ) {
    var l = n.shift(), h = n.shift();
    try {
      u = l(u);
    } catch (d) {
      h(d);
      break;
    }
  }
  try {
    a = En(u);
  } catch (d) {
    return Promise.reject(d);
  }
  for (; i.length; )
    a = a.then(i.shift(), i.shift());
  return a;
};
nt.prototype.getUri = function(t) {
  return t = Rt(this.defaults, t), Oo(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
_s.forEach(["delete", "get", "head", "options"], function(t) {
  nt.prototype[t] = function(r, n) {
    return this.request(Rt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
_s.forEach(["post", "put", "patch"], function(t) {
  nt.prototype[t] = function(r, n, s) {
    return this.request(Rt(s || {}, {
      method: t,
      url: r,
      data: n
    }));
  };
});
var ko = nt, or, xn;
function gs() {
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
function Do() {
  if (Nn)
    return ur;
  Nn = 1;
  var e = gs();
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
function Mo() {
  return Yn || (Yn = 1, lr = function(t) {
    return function(n) {
      return t.apply(null, n);
    };
  }), lr;
}
var cr, Cn;
function To() {
  return Cn || (Cn = 1, cr = function(t) {
    return typeof t == "object" && t.isAxiosError === !0;
  }), cr;
}
var Rn = Z, Eo = as, yt = ko, xo = hs, No = Ar;
function vs(e) {
  var t = new yt(e), r = Eo(yt.prototype.request, t);
  return Rn.extend(r, yt.prototype, t), Rn.extend(r, t), r;
}
var re = vs(No);
re.Axios = yt;
re.create = function(t) {
  return vs(xo(re.defaults, t));
};
re.Cancel = gs();
re.CancelToken = Do();
re.isCancel = fs();
re.all = function(t) {
  return Promise.all(t);
};
re.spread = Mo();
re.isAxiosError = To();
Cr.exports = re;
Cr.exports.default = re;
var Yo = Cr.exports, Co = Yo;
const Te = /* @__PURE__ */ _a(Co);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var ws;
function f() {
  return ws.apply(null, arguments);
}
function Ro(e) {
  ws = e;
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
function H(e) {
  return e === void 0;
}
function ge(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function st(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ss(e, t) {
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
  return Gs(e, t, r, n, !0).utc();
}
function Po() {
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
  return e._pf == null && (e._pf = Po()), e._pf;
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
var Pn = f.momentProperties = [], dr = !1;
function Ir(e, t) {
  var r, n, s, i = Pn.length;
  if (H(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), H(t._i) || (e._i = t._i), H(t._f) || (e._f = t._f), H(t._l) || (e._l = t._l), H(t._strict) || (e._strict = t._strict), H(t._tzm) || (e._tzm = t._tzm), H(t._isUTC) || (e._isUTC = t._isUTC), H(t._offset) || (e._offset = t._offset), H(t._pf) || (e._pf = b(t)), H(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      n = Pn[r], s = t[n], H(s) || (e[n] = s);
  return e;
}
function it(e) {
  Ir(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), dr === !1 && (dr = !0, f.updateOffset(this), dr = !1);
}
function se(e) {
  return e instanceof it || e != null && e._isAMomentObject != null;
}
function bs(e) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Q(e, t) {
  var r = !0;
  return be(function() {
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
      bs(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var An = {};
function Os(e, t) {
  f.deprecationHandler != null && f.deprecationHandler(e, t), An[e] || (bs(t), An[e] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Ao(e) {
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
var Vo = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Lo(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, r) : n;
}
function le(e, t, r) {
  var n = "" + Math.abs(e), s = t - n.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n;
}
var Wr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ft = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, fr = {}, Ge = {};
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
function Fo(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Io(e) {
  var t = e.match(Wr), r, n;
  for (r = 0, n = t.length; r < n; r++)
    Ge[t[r]] ? t[r] = Ge[t[r]] : t[r] = Fo(t[r]);
  return function(s) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += de(t[a]) ? t[a].call(s, e) : t[a];
    return i;
  };
}
function gt(e, t) {
  return e.isValid() ? (t = ks(t, e.localeData()), fr[t] = fr[t] || Io(t), fr[t](e)) : e.localeData().invalidDate();
}
function ks(e, t) {
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
var Uo = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Wo(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Wr).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var jo = "Invalid date";
function $o() {
  return this._invalidDate;
}
var Ho = "%d", Go = /\d{1,2}/;
function qo(e) {
  return this._ordinal.replace("%d", e);
}
var Bo = {
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
function zo(e, t, r, n) {
  var s = this._relativeTime[r];
  return de(s) ? s(e, t, r, n) : s.replace(/%d/i, e);
}
function Zo(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return de(r) ? r(t) : r.replace(/%s/i, t);
}
var Qe = {};
function W(e, t) {
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
var Ds = {};
function j(e, t) {
  Ds[e] = t;
}
function Jo(e) {
  var t = [], r;
  for (r in e)
    D(e, r) && t.push({ unit: r, priority: Ds[r] });
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
    return r != null ? (Ms(this, e, r), f.updateOffset(this, t), this) : bt(this, e);
  };
}
function bt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ms(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && At(e.year()) && e.month() === 1 && e.date() === 29 ? (r = O(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Wt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Ko(e) {
  return e = X(e), de(this[e]) ? this[e]() : this;
}
function Qo(e, t) {
  if (typeof e == "object") {
    e = jr(e);
    var r = Jo(e), n, s = r.length;
    for (n = 0; n < s; n++)
      this[r[n].unit](e[r[n].unit]);
  } else if (e = X(e), de(this[e]))
    return this[e](t);
  return this;
}
var Ts = /\d/, J = /\d\d/, Es = /\d{3}/, $r = /\d{4}/, Vt = /[+-]?\d{6}/, x = /\d\d?/, xs = /\d\d\d\d?/, Ns = /\d\d\d\d\d\d?/, Lt = /\d{1,3}/, Hr = /\d{1,4}/, Ft = /[+-]?\d{1,6}/, Ze = /\d+/, It = /[+-]?\d+/, Xo = /Z|[+-]\d\d:?\d\d/gi, Ut = /Z|[+-]\d\d(?::?\d\d)?/gi, eu = /[+-]?\d+(\.\d{1,3})?/, at = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ot;
Ot = {};
function p(e, t, r) {
  Ot[e] = de(t) ? t : function(n, s) {
    return n && r ? r : t;
  };
}
function tu(e, t) {
  return D(Ot, e) ? Ot[e](t._strict, t._locale) : new RegExp(ru(e));
}
function ru(e) {
  return B(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, n, s, i) {
        return r || n || s || i;
      }
    )
  );
}
function B(e) {
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
function nu(e, t, r) {
  t != null && D(br, e) && br[e](t, r._a, r, e);
}
var U = 0, pe = 1, oe = 2, A = 3, ee = 4, _e = 5, Ne = 6, su = 7, iu = 8;
function au(e, t) {
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
  var r = au(t, 12);
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
W("month", "M");
j("month", 8);
p("M", x);
p("MM", x, J);
p("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
p("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
T(["M", "MM"], function(e, t) {
  t[pe] = O(e) - 1;
});
T(["MMM", "MMMM"], function(e, t, r, n) {
  var s = r._locale.monthsParse(e, n, r._strict);
  s != null ? t[pe] = s : b(r).invalidMonth = e;
});
var ou = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ys = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Cs = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, uu = at, lu = at;
function cu(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Cs).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function du(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Cs.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function fu(e, t, r) {
  var n, s, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ce([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = R.call(this._longMonthsParse, a), s !== -1 ? s : (s = R.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function hu(e, t, r) {
  var n, s, i;
  if (this._monthsParseExact)
    return fu.call(this, e, t, r);
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
function Rs(e, t) {
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
function Ps(e) {
  return e != null ? (Rs(this, e), f.updateOffset(this, !0), this) : bt(this, "Month");
}
function mu() {
  return Wt(this.year(), this.month());
}
function pu(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || As.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = uu), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function _u(e) {
  return this._monthsParseExact ? (D(this, "_monthsRegex") || As.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (D(this, "_monthsRegex") || (this._monthsRegex = lu), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function As() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], n = [], s, i;
  for (s = 0; s < 12; s++)
    i = ce([2e3, s]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
  for (t.sort(e), r.sort(e), n.sort(e), s = 0; s < 12; s++)
    t[s] = B(t[s]), r[s] = B(r[s]);
  for (s = 0; s < 24; s++)
    n[s] = B(n[s]);
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
W("year", "y");
j("year", 1);
p("Y", It);
p("YY", x, J);
p("YYYY", Hr, $r);
p("YYYYY", Ft, Vt);
p("YYYYYY", Ft, Vt);
T(["YYYYY", "YYYYYY"], U);
T("YYYY", function(e, t) {
  t[U] = e.length === 2 ? f.parseTwoDigitYear(e) : O(e);
});
T("YY", function(e, t) {
  t[U] = f.parseTwoDigitYear(e);
});
T("Y", function(e, t) {
  t[U] = parseInt(e, 10);
});
function Xe(e) {
  return At(e) ? 366 : 365;
}
f.parseTwoDigitYear = function(e) {
  return O(e) + (O(e) > 68 ? 1900 : 2e3);
};
var Vs = ze("FullYear", !0);
function yu() {
  return At(this.year());
}
function gu(e, t, r, n, s, i, a) {
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
function Ls(e, t, r, n, s) {
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
W("week", "w");
W("isoWeek", "W");
j("week", 5);
j("isoWeek", 5);
p("w", x);
p("ww", x, J);
p("W", x);
p("WW", x, J);
ot(
  ["w", "ww", "W", "WW"],
  function(e, t, r, n) {
    t[n.substr(0, 1)] = O(e);
  }
);
function vu(e) {
  return tt(e, this._week.dow, this._week.doy).week;
}
var wu = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function Su() {
  return this._week.dow;
}
function bu() {
  return this._week.doy;
}
function Ou(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function ku(e) {
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
W("day", "d");
W("weekday", "e");
W("isoWeekday", "E");
j("day", 11);
j("weekday", 11);
j("isoWeekday", 11);
p("d", x);
p("e", x);
p("E", x);
p("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
p("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
p("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
ot(["dd", "ddd", "dddd"], function(e, t, r, n) {
  var s = r._locale.weekdaysParse(e, n, r._strict);
  s != null ? t.d = s : b(r).invalidWeekday = e;
});
ot(["d", "e", "E"], function(e, t, r, n) {
  t[n] = O(e);
});
function Du(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Mu(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Gr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Tu = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Fs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Eu = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), xu = at, Nu = at, Yu = at;
function Cu(e, t) {
  var r = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Gr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Ru(e) {
  return e === !0 ? Gr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Pu(e) {
  return e === !0 ? Gr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Au(e, t, r) {
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
function Vu(e, t, r) {
  var n, s, i;
  if (this._weekdaysParseExact)
    return Au.call(this, e, t, r);
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
function Lu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Du(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Fu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Iu(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Mu(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Uu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = xu), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Wu(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Nu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function ju(e) {
  return this._weekdaysParseExact ? (D(this, "_weekdaysRegex") || qr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Yu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function qr() {
  function e(h, d) {
    return d.length - h.length;
  }
  var t = [], r = [], n = [], s = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = ce([2e3, 1]).day(i), o = B(this.weekdaysMin(a, "")), u = B(this.weekdaysShort(a, "")), l = B(this.weekdays(a, "")), t.push(o), r.push(u), n.push(l), s.push(o), s.push(u), s.push(l);
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
function $u() {
  return this.hours() || 24;
}
g("H", ["HH", 2], 0, "hour");
g("h", ["hh", 2], 0, Br);
g("k", ["kk", 2], 0, $u);
g("hmm", 0, 0, function() {
  return "" + Br.apply(this) + le(this.minutes(), 2);
});
g("hmmss", 0, 0, function() {
  return "" + Br.apply(this) + le(this.minutes(), 2) + le(this.seconds(), 2);
});
g("Hmm", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2);
});
g("Hmmss", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2) + le(this.seconds(), 2);
});
function Is(e, t) {
  g(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Is("a", !0);
Is("A", !1);
W("hour", "h");
j("hour", 13);
function Us(e, t) {
  return t._meridiemParse;
}
p("a", Us);
p("A", Us);
p("H", x);
p("h", x);
p("k", x);
p("HH", x, J);
p("hh", x, J);
p("kk", x, J);
p("hmm", xs);
p("hmmss", Ns);
p("Hmm", xs);
p("Hmmss", Ns);
T(["H", "HH"], A);
T(["k", "kk"], function(e, t, r) {
  var n = O(e);
  t[A] = n === 24 ? 0 : n;
});
T(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
T(["h", "hh"], function(e, t, r) {
  t[A] = O(e), b(r).bigHour = !0;
});
T("hmm", function(e, t, r) {
  var n = e.length - 2;
  t[A] = O(e.substr(0, n)), t[ee] = O(e.substr(n)), b(r).bigHour = !0;
});
T("hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[A] = O(e.substr(0, n)), t[ee] = O(e.substr(n, 2)), t[_e] = O(e.substr(s)), b(r).bigHour = !0;
});
T("Hmm", function(e, t, r) {
  var n = e.length - 2;
  t[A] = O(e.substr(0, n)), t[ee] = O(e.substr(n));
});
T("Hmmss", function(e, t, r) {
  var n = e.length - 4, s = e.length - 2;
  t[A] = O(e.substr(0, n)), t[ee] = O(e.substr(n, 2)), t[_e] = O(e.substr(s));
});
function Hu(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Gu = /[ap]\.?m?\.?/i, qu = ze("Hours", !0);
function Bu(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Ws = {
  calendar: Vo,
  longDateFormat: Uo,
  invalidDate: jo,
  ordinal: Ho,
  dayOfMonthOrdinalParse: Go,
  relativeTime: Bo,
  months: ou,
  monthsShort: Ys,
  week: wu,
  weekdays: Tu,
  weekdaysMin: Eu,
  weekdaysShort: Fs,
  meridiemParse: Gu
}, N = {}, Je = {}, rt;
function zu(e, t) {
  var r, n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1)
    if (e[r] !== t[r])
      return r;
  return n;
}
function Vn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Zu(e) {
  for (var t = 0, r, n, s, i; t < e.length; ) {
    for (i = Vn(e[t]).split("-"), r = i.length, n = Vn(e[t + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (s = jt(i.slice(0, r).join("-")), s)
        return s;
      if (n && n.length >= r && zu(i, n) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return rt;
}
function Ju(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function jt(e) {
  var t = null, r;
  if (N[e] === void 0 && typeof module < "u" && module && module.exports && Ju(e))
    try {
      t = rt._abbr, r = require, r("./locale/" + e), ke(t);
    } catch {
      N[e] = null;
    }
  return N[e];
}
function ke(e, t) {
  var r;
  return e && (H(t) ? r = ve(e) : r = zr(e, t), r ? rt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), rt._abbr;
}
function zr(e, t) {
  if (t !== null) {
    var r, n = Ws;
    if (t.abbr = e, N[e] != null)
      Os(
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
function Ku(e, t) {
  if (t != null) {
    var r, n, s = Ws;
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
  return Zu(e);
}
function Qu() {
  return Sr(N);
}
function Zr(e) {
  var t, r = e._a;
  return r && b(e).overflow === -2 && (t = r[pe] < 0 || r[pe] > 11 ? pe : r[oe] < 1 || r[oe] > Wt(r[U], r[pe]) ? oe : r[A] < 0 || r[A] > 24 || r[A] === 24 && (r[ee] !== 0 || r[_e] !== 0 || r[Ne] !== 0) ? A : r[ee] < 0 || r[ee] > 59 ? ee : r[_e] < 0 || r[_e] > 59 ? _e : r[Ne] < 0 || r[Ne] > 999 ? Ne : -1, b(e)._overflowDayOfYear && (t < U || t > oe) && (t = oe), b(e)._overflowWeeks && t === -1 && (t = su), b(e)._overflowWeekday && t === -1 && (t = iu), b(e).overflow = t), e;
}
var Xu = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, el = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tl = /Z|[+-]\d\d(?::?\d\d)?/, ht = [
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
], rl = /^\/?Date\((-?\d+)/i, nl = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, sl = {
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
function js(e) {
  var t, r, n = e._i, s = Xu.exec(n) || el.exec(n), i, a, o, u, l = ht.length, h = hr.length;
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
      for (t = 0, r = h; t < r; t++)
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
      if (tl.exec(s[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Kr(e);
  } else
    e._isValid = !1;
}
function il(e, t, r, n, s, i) {
  var a = [
    al(e),
    Ys.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(s, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function al(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function ol(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function ul(e, t, r) {
  if (e) {
    var n = Fs.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== s)
      return b(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function ll(e, t, r) {
  if (e)
    return sl[e];
  if (t)
    return 0;
  var n = parseInt(r, 10), s = n % 100, i = (n - s) / 100;
  return i * 60 + s;
}
function $s(e) {
  var t = nl.exec(ol(e._i)), r;
  if (t) {
    if (r = il(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !ul(t[1], r, e))
      return;
    e._a = r, e._tzm = ll(t[8], t[9], t[10]), e._d = et.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function cl(e) {
  var t = rl.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (js(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if ($s(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : f.createFromInputFallback(e);
}
f.createFromInputFallback = Q(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function $e(e, t, r) {
  return e ?? t ?? r;
}
function dl(e) {
  var t = new Date(f.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Jr(e) {
  var t, r, n = [], s, i, a;
  if (!e._d) {
    for (s = dl(e), e._w && e._a[oe] == null && e._a[pe] == null && fl(e), e._dayOfYear != null && (a = $e(e._a[U], s[U]), (e._dayOfYear > Xe(a) || e._dayOfYear === 0) && (b(e)._overflowDayOfYear = !0), r = et(a, 0, e._dayOfYear), e._a[pe] = r.getUTCMonth(), e._a[oe] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[A] === 24 && e._a[ee] === 0 && e._a[_e] === 0 && e._a[Ne] === 0 && (e._nextDay = !0, e._a[A] = 0), e._d = (e._useUTC ? et : gu).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[A] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (b(e).weekdayMismatch = !0);
  }
}
function fl(e) {
  var t, r, n, s, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = $e(
    t.GG,
    e._a[U],
    tt(E(), 1, 4).year
  ), n = $e(t.W, 1), s = $e(t.E, 1), (s < 1 || s > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = tt(E(), i, a), r = $e(t.gg, e._a[U], l.year), n = $e(t.w, l.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (u = !0)) : t.e != null ? (s = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : s = i), n < 1 || n > ye(r, i, a) ? b(e)._overflowWeeks = !0 : u != null ? b(e)._overflowWeekday = !0 : (o = Ls(r, n, s, i, a), e._a[U] = o.year, e._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function Kr(e) {
  if (e._f === f.ISO_8601) {
    js(e);
    return;
  }
  if (e._f === f.RFC_2822) {
    $s(e);
    return;
  }
  e._a = [], b(e).empty = !0;
  var t = "" + e._i, r, n, s, i, a, o = t.length, u = 0, l, h;
  for (s = ks(e._f, e._locale).match(Wr) || [], h = s.length, r = 0; r < h; r++)
    i = s[r], n = (t.match(tu(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && b(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), u += n.length), Ge[i] ? (n ? b(e).empty = !1 : b(e).unusedTokens.push(i), nu(i, n, e)) : e._strict && !n && b(e).unusedTokens.push(i);
  b(e).charsLeftOver = o - u, t.length > 0 && b(e).unusedInput.push(t), e._a[A] <= 12 && b(e).bigHour === !0 && e._a[A] > 0 && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[A] = hl(
    e._locale,
    e._a[A],
    e._meridiem
  ), l = b(e).era, l !== null && (e._a[U] = e._locale.erasConvertYear(l, e._a[U])), Jr(e), Zr(e);
}
function hl(e, t, r) {
  var n;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (n = e.isPM(r), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function ml(e) {
  var t, r, n, s, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    b(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < u; s++)
    i = 0, a = !1, t = Ir({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], Kr(t), Fr(t) && (a = !0), i += b(t).charsLeftOver, i += b(t).unusedTokens.length * 10, b(t).score = i, o ? i < n && (n = i, r = t) : (n == null || i < n || a) && (n = i, r = t, a && (o = !0));
  be(e, r || t);
}
function pl(e) {
  if (!e._d) {
    var t = jr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = Ss(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), Jr(e);
  }
}
function _l(e) {
  var t = new it(Zr(Hs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Hs(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || ve(e._l), t === null || r === void 0 && t === "" ? Pt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), se(t) ? new it(Zr(t)) : (st(t) ? e._d = t : ne(r) ? ml(e) : r ? Kr(e) : yl(e), Fr(e) || (e._d = null), e));
}
function yl(e) {
  var t = e._i;
  H(t) ? e._d = new Date(f.now()) : st(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? cl(e) : ne(t) ? (e._a = Ss(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Jr(e)) : Ce(t) ? pl(e) : ge(t) ? e._d = new Date(t) : f.createFromInputFallback(e);
}
function Gs(e, t, r, n, s) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Ce(e) && Lr(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = s, i._l = r, i._i = e, i._f = t, i._strict = n, _l(i);
}
function E(e, t, r, n) {
  return Gs(e, t, r, n, !1);
}
var gl = Q(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Pt();
  }
), vl = Q(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Pt();
  }
);
function qs(e, t) {
  var r, n;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return E();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function wl() {
  var e = [].slice.call(arguments, 0);
  return qs("isBefore", e);
}
function Sl() {
  var e = [].slice.call(arguments, 0);
  return qs("isAfter", e);
}
var bl = function() {
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
function Ol(e) {
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
function kl() {
  return this._isValid;
}
function Dl() {
  return ae(NaN);
}
function $t(e) {
  var t = jr(e), r = t.year || 0, n = t.quarter || 0, s = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, h = t.millisecond || 0;
  this._isValid = Ol(t), this._milliseconds = +h + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +s + n * 3 + r * 12, this._data = {}, this._locale = ve(), this._bubble();
}
function vt(e) {
  return e instanceof $t;
}
function Or(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Ml(e, t, r) {
  var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (r && e[a] !== t[a] || !r && O(e[a]) !== O(t[a])) && i++;
  return i + s;
}
function Bs(e, t) {
  g(e, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + le(~~(r / 60), 2) + t + le(~~r % 60, 2);
  });
}
Bs("Z", ":");
Bs("ZZ", "");
p("Z", Ut);
p("ZZ", Ut);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Qr(Ut, e);
});
var Tl = /([\+\-]|\d\d)/gi;
function Qr(e, t) {
  var r = (t || "").match(e), n, s, i;
  return r === null ? null : (n = r[r.length - 1] || [], s = (n + "").match(Tl) || ["-", 0, 0], i = +(s[1] * 60) + O(s[2]), i === 0 ? 0 : s[0] === "+" ? i : -i);
}
function Xr(e, t) {
  var r, n;
  return t._isUTC ? (r = t.clone(), n = (se(e) || st(e) ? e.valueOf() : E(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), f.updateOffset(r, !1), r) : E(e).local();
}
function kr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function El(e, t, r) {
  var n = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Qr(Ut, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (s = kr(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), n !== e && (!t || this._changeInProgress ? Js(
      this,
      ae(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : kr(this);
}
function xl(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Nl(e) {
  return this.utcOffset(0, e);
}
function Yl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(kr(this), "m")), this;
}
function Cl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Qr(Xo, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Rl(e) {
  return this.isValid() ? (e = e ? E(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Pl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Al() {
  if (!H(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Ir(e, this), e = Hs(e), e._a ? (t = e._isUTC ? ce(e._a) : E(e._a), this._isDSTShifted = this.isValid() && Ml(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Vl() {
  return this.isValid() ? !this._isUTC : !1;
}
function Ll() {
  return this.isValid() ? this._isUTC : !1;
}
function zs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Fl = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Il = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ae(e, t) {
  var r = e, n = null, s, i, a;
  return vt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ge(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (n = Fl.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: O(n[oe]) * s,
    h: O(n[A]) * s,
    m: O(n[ee]) * s,
    s: O(n[_e]) * s,
    ms: O(Or(n[Ne] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (n = Il.exec(e)) ? (s = n[1] === "-" ? -1 : 1, r = {
    y: Ee(n[2], s),
    M: Ee(n[3], s),
    w: Ee(n[4], s),
    d: Ee(n[5], s),
    h: Ee(n[6], s),
    m: Ee(n[7], s),
    s: Ee(n[8], s)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Ul(
    E(r.from),
    E(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new $t(r), vt(e) && D(e, "_locale") && (i._locale = e._locale), vt(e) && D(e, "_isValid") && (i._isValid = e._isValid), i;
}
ae.fn = $t.prototype;
ae.invalid = Dl;
function Ee(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Ln(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Ul(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Xr(t, e), e.isBefore(t) ? r = Ln(e, t) : (r = Ln(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function Zs(e, t) {
  return function(r, n) {
    var s, i;
    return n !== null && !isNaN(+n) && (Os(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = n, n = i), s = ae(r, n), Js(this, s, e), this;
  };
}
function Js(e, t, r, n) {
  var s = t._milliseconds, i = Or(t._days), a = Or(t._months);
  e.isValid() && (n = n ?? !0, a && Rs(e, bt(e, "Month") + a * r), i && Ms(e, "Date", bt(e, "Date") + i * r), s && e._d.setTime(e._d.valueOf() + s * r), n && f.updateOffset(e, i || a));
}
var Wl = Zs(1, "add"), jl = Zs(-1, "subtract");
function Ks(e) {
  return typeof e == "string" || e instanceof String;
}
function $l(e) {
  return se(e) || st(e) || Ks(e) || ge(e) || Gl(e) || Hl(e) || e === null || e === void 0;
}
function Hl(e) {
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
function Gl(e) {
  var t = ne(e), r = !1;
  return t && (r = e.filter(function(n) {
    return !ge(n) && Ks(e);
  }).length === 0), t && r;
}
function ql(e) {
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
function Bl(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function zl(e, t) {
  arguments.length === 1 && (arguments[0] ? $l(arguments[0]) ? (e = arguments[0], t = void 0) : ql(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || E(), n = Xr(r, this).startOf("day"), s = f.calendarFormat(this, n) || "sameElse", i = t && (de(t[s]) ? t[s].call(this, r) : t[s]);
  return this.format(
    i || this.localeData().calendar(s, this, E(r))
  );
}
function Zl() {
  return new it(this);
}
function Jl(e, t) {
  var r = se(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Kl(e, t) {
  var r = se(e) ? e : E(e);
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function Ql(e, t, r, n) {
  var s = se(e) ? e : E(e), i = se(t) ? t : E(t);
  return this.isValid() && s.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(s, r) : !this.isBefore(s, r)) && (n[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Xl(e, t) {
  var r = se(e) ? e : E(e), n;
  return this.isValid() && r.isValid() ? (t = X(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function ec(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function tc(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function rc(e, t, r) {
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
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function nc() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function sc(e) {
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
function ic() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, n, s, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + n + s + i);
}
function ac(e) {
  e || (e = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var t = gt(this, e);
  return this.localeData().postformat(t);
}
function oc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || E(e).isValid()) ? ae({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function uc(e) {
  return this.from(E(), e);
}
function lc(e, t) {
  return this.isValid() && (se(e) && e.isValid() || E(e).isValid()) ? ae({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function cc(e) {
  return this.to(E(), e);
}
function Qs(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ve(e), t != null && (this._locale = t), this);
}
var Xs = Q(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function ei() {
  return this._locale;
}
var Dt = 1e3, qe = 60 * Dt, Mt = 60 * qe, ti = (365 * 400 + 97) * 24 * Mt;
function Be(e, t) {
  return (e % t + t) % t;
}
function ri(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - ti : new Date(e, t, r).valueOf();
}
function ni(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - ti : Date.UTC(e, t, r);
}
function dc(e) {
  var t, r;
  if (e = X(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ni : ri, e) {
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
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function fc(e) {
  var t, r;
  if (e = X(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ni : ri, e) {
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
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function hc() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function mc() {
  return Math.floor(this.valueOf() / 1e3);
}
function pc() {
  return new Date(this.valueOf());
}
function _c() {
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
function yc() {
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
function gc() {
  return this.isValid() ? this.toISOString() : null;
}
function vc() {
  return Fr(this);
}
function wc() {
  return be({}, b(this));
}
function Sc() {
  return b(this).overflow;
}
function bc() {
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
p("N", en);
p("NN", en);
p("NNN", en);
p("NNNN", Rc);
p("NNNNN", Pc);
T(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, n) {
    var s = r._locale.erasParse(e, n, r._strict);
    s ? b(r).era = s : b(r).invalidEra = e;
  }
);
p("y", Ze);
p("yy", Ze);
p("yyy", Ze);
p("yyyy", Ze);
p("yo", Ac);
T(["y", "yy", "yyy", "yyyy"], U);
T(["yo"], function(e, t, r, n) {
  var s;
  r._locale._eraYearOrdinalRegex && (s = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[U] = r._locale.eraYearOrdinalParse(e, s) : t[U] = parseInt(e, 10);
});
function Oc(e, t) {
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
function kc(e, t, r) {
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
function Dc(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? f(e.since).year() : f(e.since).year() + (t - e.offset) * r;
}
function Mc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].name;
  return "";
}
function Tc() {
  var e, t, r, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), n[e].since <= r && r <= n[e].until || n[e].until <= r && r <= n[e].since)
      return n[e].narrow;
  return "";
}
function Ec() {
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
      return (this.year() - f(s[e].since).year()) * r + s[e].offset;
  return this.year();
}
function Nc(e) {
  return D(this, "_erasNameRegex") || tn.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Yc(e) {
  return D(this, "_erasAbbrRegex") || tn.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Cc(e) {
  return D(this, "_erasNarrowRegex") || tn.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function en(e, t) {
  return t.erasAbbrRegex(e);
}
function Rc(e, t) {
  return t.erasNameRegex(e);
}
function Pc(e, t) {
  return t.erasNarrowRegex(e);
}
function Ac(e, t) {
  return t._eraYearOrdinalRegex || Ze;
}
function tn() {
  var e = [], t = [], r = [], n = [], s, i, a = this.eras();
  for (s = 0, i = a.length; s < i; ++s)
    t.push(B(a[s].name)), e.push(B(a[s].abbr)), r.push(B(a[s].narrow)), n.push(B(a[s].name)), n.push(B(a[s].abbr)), n.push(B(a[s].narrow));
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
W("weekYear", "gg");
W("isoWeekYear", "GG");
j("weekYear", 1);
j("isoWeekYear", 1);
p("G", It);
p("g", It);
p("GG", x, J);
p("gg", x, J);
p("GGGG", Hr, $r);
p("gggg", Hr, $r);
p("GGGGG", Ft, Vt);
p("ggggg", Ft, Vt);
ot(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, n) {
    t[n.substr(0, 2)] = O(e);
  }
);
ot(["gg", "GG"], function(e, t, r, n) {
  t[n] = f.parseTwoDigitYear(e);
});
function Vc(e) {
  return si.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Lc(e) {
  return si.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Fc() {
  return ye(this.year(), 1, 4);
}
function Ic() {
  return ye(this.isoWeekYear(), 1, 4);
}
function Uc() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function Wc() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function si(e, t, r, n, s) {
  var i;
  return e == null ? tt(this, n, s).year : (i = ye(e, n, s), t > i && (t = i), jc.call(this, e, t, r, n, s));
}
function jc(e, t, r, n, s) {
  var i = Ls(e, t, r, n, s), a = et(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
g("Q", 0, "Qo", "quarter");
W("quarter", "Q");
j("quarter", 7);
p("Q", Ts);
T("Q", function(e, t) {
  t[pe] = (O(e) - 1) * 3;
});
function $c(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
g("D", ["DD", 2], "Do", "date");
W("date", "D");
j("date", 9);
p("D", x);
p("DD", x, J);
p("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], oe);
T("Do", function(e, t) {
  t[oe] = O(e.match(x)[0]);
});
var ii = ze("Date", !0);
g("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
W("dayOfYear", "DDD");
j("dayOfYear", 4);
p("DDD", Lt);
p("DDDD", Es);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = O(e);
});
function Hc(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
g("m", ["mm", 2], 0, "minute");
W("minute", "m");
j("minute", 14);
p("m", x);
p("mm", x, J);
T(["m", "mm"], ee);
var Gc = ze("Minutes", !1);
g("s", ["ss", 2], 0, "second");
W("second", "s");
j("second", 15);
p("s", x);
p("ss", x, J);
T(["s", "ss"], _e);
var qc = ze("Seconds", !1);
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
W("millisecond", "ms");
j("millisecond", 16);
p("S", Lt, Ts);
p("SS", Lt, J);
p("SSS", Lt, Es);
var Oe, ai;
for (Oe = "SSSS"; Oe.length <= 9; Oe += "S")
  p(Oe, Ze);
function Bc(e, t) {
  t[Ne] = O(("0." + e) * 1e3);
}
for (Oe = "S"; Oe.length <= 9; Oe += "S")
  T(Oe, Bc);
ai = ze("Milliseconds", !1);
g("z", 0, 0, "zoneAbbr");
g("zz", 0, 0, "zoneName");
function zc() {
  return this._isUTC ? "UTC" : "";
}
function Zc() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var c = it.prototype;
c.add = Wl;
c.calendar = zl;
c.clone = Zl;
c.diff = rc;
c.endOf = fc;
c.format = ac;
c.from = oc;
c.fromNow = uc;
c.to = lc;
c.toNow = cc;
c.get = Ko;
c.invalidAt = Sc;
c.isAfter = Jl;
c.isBefore = Kl;
c.isBetween = Ql;
c.isSame = Xl;
c.isSameOrAfter = ec;
c.isSameOrBefore = tc;
c.isValid = vc;
c.lang = Xs;
c.locale = Qs;
c.localeData = ei;
c.max = vl;
c.min = gl;
c.parsingFlags = wc;
c.set = Qo;
c.startOf = dc;
c.subtract = jl;
c.toArray = _c;
c.toObject = yc;
c.toDate = pc;
c.toISOString = sc;
c.inspect = ic;
typeof Symbol < "u" && Symbol.for != null && (c[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
c.toJSON = gc;
c.toString = nc;
c.unix = mc;
c.valueOf = hc;
c.creationData = bc;
c.eraName = Mc;
c.eraNarrow = Tc;
c.eraAbbr = Ec;
c.eraYear = xc;
c.year = Vs;
c.isLeapYear = yu;
c.weekYear = Vc;
c.isoWeekYear = Lc;
c.quarter = c.quarters = $c;
c.month = Ps;
c.daysInMonth = mu;
c.week = c.weeks = Ou;
c.isoWeek = c.isoWeeks = ku;
c.weeksInYear = Uc;
c.weeksInWeekYear = Wc;
c.isoWeeksInYear = Fc;
c.isoWeeksInISOWeekYear = Ic;
c.date = ii;
c.day = c.days = Lu;
c.weekday = Fu;
c.isoWeekday = Iu;
c.dayOfYear = Hc;
c.hour = c.hours = qu;
c.minute = c.minutes = Gc;
c.second = c.seconds = qc;
c.millisecond = c.milliseconds = ai;
c.utcOffset = El;
c.utc = Nl;
c.local = Yl;
c.parseZone = Cl;
c.hasAlignedHourOffset = Rl;
c.isDST = Pl;
c.isLocal = Vl;
c.isUtcOffset = Ll;
c.isUtc = zs;
c.isUTC = zs;
c.zoneAbbr = zc;
c.zoneName = Zc;
c.dates = Q(
  "dates accessor is deprecated. Use date instead.",
  ii
);
c.months = Q(
  "months accessor is deprecated. Use month instead",
  Ps
);
c.years = Q(
  "years accessor is deprecated. Use year instead",
  Vs
);
c.zone = Q(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  xl
);
c.isDSTShifted = Q(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Al
);
function Jc(e) {
  return E(e * 1e3);
}
function Kc() {
  return E.apply(null, arguments).parseZone();
}
function oi(e) {
  return e;
}
var M = Ur.prototype;
M.calendar = Lo;
M.longDateFormat = Wo;
M.invalidDate = $o;
M.ordinal = qo;
M.preparse = oi;
M.postformat = oi;
M.relativeTime = zo;
M.pastFuture = Zo;
M.set = Ao;
M.eras = Oc;
M.erasParse = kc;
M.erasConvertYear = Dc;
M.erasAbbrRegex = Yc;
M.erasNameRegex = Nc;
M.erasNarrowRegex = Cc;
M.months = cu;
M.monthsShort = du;
M.monthsParse = hu;
M.monthsRegex = _u;
M.monthsShortRegex = pu;
M.week = vu;
M.firstDayOfYear = bu;
M.firstDayOfWeek = Su;
M.weekdays = Cu;
M.weekdaysMin = Pu;
M.weekdaysShort = Ru;
M.weekdaysParse = Vu;
M.weekdaysRegex = Uu;
M.weekdaysShortRegex = Wu;
M.weekdaysMinRegex = ju;
M.isPM = Hu;
M.meridiem = Bu;
function Tt(e, t, r, n) {
  var s = ve(), i = ce().set(n, t);
  return s[r](i, e);
}
function ui(e, t, r) {
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
function Qc(e, t) {
  return ui(e, t, "months");
}
function Xc(e, t) {
  return ui(e, t, "monthsShort");
}
function ed(e, t, r) {
  return rn(e, t, r, "weekdays");
}
function td(e, t, r) {
  return rn(e, t, r, "weekdaysShort");
}
function rd(e, t, r) {
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
f.lang = Q(
  "moment.lang is deprecated. Use moment.locale instead.",
  ke
);
f.langData = Q(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ve
);
var he = Math.abs;
function nd() {
  var e = this._data;
  return this._milliseconds = he(this._milliseconds), this._days = he(this._days), this._months = he(this._months), e.milliseconds = he(e.milliseconds), e.seconds = he(e.seconds), e.minutes = he(e.minutes), e.hours = he(e.hours), e.months = he(e.months), e.years = he(e.years), this;
}
function li(e, t, r, n) {
  var s = ae(t, r);
  return e._milliseconds += n * s._milliseconds, e._days += n * s._days, e._months += n * s._months, e._bubble();
}
function sd(e, t) {
  return li(this, e, t, 1);
}
function id(e, t) {
  return li(this, e, t, -1);
}
function Fn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function ad() {
  var e = this._milliseconds, t = this._days, r = this._months, n = this._data, s, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Fn(Dr(r) + t) * 864e5, t = 0, r = 0), n.milliseconds = e % 1e3, s = K(e / 1e3), n.seconds = s % 60, i = K(s / 60), n.minutes = i % 60, a = K(i / 60), n.hours = a % 24, t += K(a / 24), u = K(ci(t)), r += u, t -= Fn(Dr(u)), o = K(r / 12), r %= 12, n.days = t, n.months = r, n.years = o, this;
}
function ci(e) {
  return e * 4800 / 146097;
}
function Dr(e) {
  return e * 146097 / 4800;
}
function od(e) {
  if (!this.isValid())
    return NaN;
  var t, r, n = this._milliseconds;
  if (e = X(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, r = this._months + ci(t), e) {
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
function ud() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + O(this._months / 12) * 31536e6 : NaN;
}
function we(e) {
  return function() {
    return this.as(e);
  };
}
var ld = we("ms"), cd = we("s"), dd = we("m"), fd = we("h"), hd = we("d"), md = we("w"), pd = we("M"), _d = we("Q"), yd = we("y");
function gd() {
  return ae(this);
}
function vd(e) {
  return e = X(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ve(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var wd = Ve("milliseconds"), Sd = Ve("seconds"), bd = Ve("minutes"), Od = Ve("hours"), kd = Ve("days"), Dd = Ve("months"), Md = Ve("years");
function Td() {
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
function Ed(e, t, r, n, s) {
  return s.relativeTime(t || 1, !!r, e, n);
}
function xd(e, t, r, n) {
  var s = ae(e).abs(), i = me(s.as("s")), a = me(s.as("m")), o = me(s.as("h")), u = me(s.as("d")), l = me(s.as("M")), h = me(s.as("w")), d = me(s.as("y")), _ = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (_ = _ || h <= 1 && ["w"] || h < r.w && ["ww", h]), _ = _ || l <= 1 && ["M"] || l < r.M && ["MM", l] || d <= 1 && ["y"] || ["yy", d], _[2] = t, _[3] = +e > 0, _[4] = n, Ed.apply(null, _);
}
function Nd(e) {
  return e === void 0 ? me : typeof e == "function" ? (me = e, !0) : !1;
}
function Yd(e, t) {
  return He[e] === void 0 ? !1 : t === void 0 ? He[e] : (He[e] = t, e === "s" && (He.ss = t - 1), !0);
}
function Cd(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = He, s, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (n = Object.assign({}, He, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), s = this.localeData(), i = xd(this, !r, n, s), r && (i = s.pastFuture(+this, i)), s.postformat(i);
}
var mr = Math.abs;
function je(e) {
  return (e > 0) - (e < 0) || +e;
}
function Gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = mr(this._milliseconds) / 1e3, t = mr(this._days), r = mr(this._months), n, s, i, a, o = this.asSeconds(), u, l, h, d;
  return o ? (n = K(e / 60), s = K(n / 60), e %= 60, n %= 60, i = K(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = je(this._months) !== je(o) ? "-" : "", h = je(this._days) !== je(o) ? "-" : "", d = je(this._milliseconds) !== je(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? h + t + "D" : "") + (s || n || e ? "T" : "") + (s ? d + s + "H" : "") + (n ? d + n + "M" : "") + (e ? d + a + "S" : "")) : "P0D";
}
var k = $t.prototype;
k.isValid = kl;
k.abs = nd;
k.add = sd;
k.subtract = id;
k.as = od;
k.asMilliseconds = ld;
k.asSeconds = cd;
k.asMinutes = dd;
k.asHours = fd;
k.asDays = hd;
k.asWeeks = md;
k.asMonths = pd;
k.asQuarters = _d;
k.asYears = yd;
k.valueOf = ud;
k._bubble = ad;
k.clone = gd;
k.get = vd;
k.milliseconds = wd;
k.seconds = Sd;
k.minutes = bd;
k.hours = Od;
k.days = kd;
k.weeks = Td;
k.months = Dd;
k.years = Md;
k.humanize = Cd;
k.toISOString = Gt;
k.toString = Gt;
k.toJSON = Gt;
k.locale = Qs;
k.localeData = ei;
k.toIsoString = Q(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Gt
);
k.lang = Xs;
g("X", 0, 0, "unix");
g("x", 0, 0, "valueOf");
p("x", It);
p("X", eu);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(O(e));
});
//! moment.js
f.version = "2.29.4";
Ro(E);
f.fn = c;
f.min = wl;
f.max = Sl;
f.now = bl;
f.utc = ce;
f.unix = Jc;
f.months = Qc;
f.isDate = st;
f.locale = ke;
f.invalid = Pt;
f.duration = ae;
f.isMoment = se;
f.weekdays = ed;
f.parseZone = Kc;
f.localeData = ve;
f.isDuration = vt;
f.monthsShort = Xc;
f.weekdaysMin = rd;
f.defineLocale = zr;
f.updateLocale = Ku;
f.locales = Qu;
f.weekdaysShort = td;
f.normalizeUnits = X;
f.relativeTimeRounding = Nd;
f.relativeTimeThreshold = Yd;
f.calendarFormat = Bl;
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
function In(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) === -1 && (r[n] = e[n]);
  return r;
}
var F = function() {
};
F.setDefaultHeaders = function() {
  var e = document.querySelector('meta[name="csrf-token"]');
  e && (Te.defaults.headers.common["X-CSRF-Token"] = e.content), Te.defaults.headers.common.Accept = "application/json", Te.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}, F.setCancelToken = function(e) {
  var t = this.getCancelToken(e);
  I.isBlank(t) || t.cancel(e + " request canceled by the user."), this.cancelTokenSources[e] = Te.CancelToken.source();
}, F.getCancelToken = function(e) {
  return this.cancelTokenSources[e];
}, F.later = function(e, t) {
  return new Promise(function(r) {
    setTimeout(r, e, t);
  });
}, F.axiosRequest = function(e) {
  var t = e.onSuccess, r = e.onError, n = In(e, ["onSuccess", "onError"]);
  return new Promise(function(s) {
    return Te(n).then(function(i) {
      t(i), s();
    }).catch(function(i) {
      r(i), s();
    });
  });
}, F.sendRequest = function(e) {
  var t = e.delay, r = e.url, n = In(e, ["delay", "url"]);
  this.setDefaultHeaders(), this.setCancelToken(r);
  var s = this.getCancelToken(r).token, i = Object.assign(n, { url: r, cancelToken: s }), a = 300;
  return window && window.AppInfo && AppInfo.railsEnv === "test" && (a = 0), I.isTruthy(t) && a > 0 ? this.later(a, i).then(this.axiosRequest) : this.axiosRequest(i);
}, F.cancelTokenSources = {}, F.active = 0, Te.interceptors.request.use(function(e) {
  return F.active += 1, e;
}, function(e) {
  return F.active -= 1, Promise.reject(e);
}), Te.interceptors.response.use(function(e) {
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
} }, Un = Object.freeze({ __proto__: null, Api: F, Utils: I }), Rd = { install: function e(t) {
  e.installed || (e.installed = !0, Object.keys(Un).forEach(function(r) {
    t.component(r, Un[r]);
  }));
} }, mt = null;
typeof window < "u" ? mt = window.Vue : typeof global < "u" && (mt = global.Vue), mt && mt.use(Rd);
const De = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, Pd = Si({
  inheritAttrs: !1,
  props: {
    names: {
      // do not use directly (instead use the computed property computed_names)
      type: [String, Array],
      required: !0
    },
    id: {
      type: String
    }
  },
  setup(e, { attrs: t }) {
    const r = P(() => typeof e.names == "string" ? JSON.parse(e.names) : e.names), n = P({
      get() {
        let d = null;
        return r.value.forEach((_) => {
          let m = this.$store.getters.getTouched(_);
          m && m !== null && m !== !1 && (d = m);
        }), d;
      },
      set(d) {
        this.$store.commit("setTouched", {
          value: d,
          name: e.name
        });
      }
    }), s = P(() => {
      if (n.value) {
        let d = "";
        return r.value.forEach((_) => {
          let m = this.$store.getters.getError(_);
          m && m !== "" && d === "" && (d = m);
        }), d;
      } else
        return null;
    }), i = P(() => {
      if (n.value) {
        let d = "";
        return r.value.forEach((_) => {
          let m = this.$store.getters.getWarning(_);
          m && m !== "" && d === "" && (d = m);
        }), d;
      } else
        return null;
    }), a = P(() => n.value && s.value), o = P(() => n.value && !s.value && i.value), u = P(() => a.value || o.value), l = P(() => ({
      "input-block__error-feedback": a.value,
      "input-block__warning-feedback": o.value
    })), h = P(() => s.value || i.value);
    return {
      computed_names: r,
      inputTouched: n,
      inputError: s,
      inputWarning: i,
      displayValidationError: a,
      displayValidationWarning: o,
      displayValidationMessage: u,
      inputClass: l,
      inputMessage: h
    };
  }
});
function Ad(e, t, r, n, s, i) {
  return e.displayValidationMessage ? ($(), z("span", {
    key: 0,
    class: $n(e.inputClass)
  }, Tr(e.inputMessage), 3)) : Ye("", !0);
}
const di = /* @__PURE__ */ De(Pd, [["render", Ad]]), Vd = {
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
    const t = Li(), r = P(() => {
      const s = t.getters.getValue(e.name);
      return s == null || s === "";
    }), n = P(() => ({
      "botyglot-form--class-when-not-empty": !r.value,
      "botyglot-form--class-when-empty": r.value
    }));
    return {
      isEmpty: r,
      inputGroupClass: n
    };
  }
}, Ld = ["id"];
function Fd(e, t, r, n, s, i) {
  return $(), z("div", {
    class: $n([n.inputGroupClass, r.classes]),
    id: r.id + "__wrapper"
  }, [
    Er(e.$slots, "default")
  ], 10, Ld);
}
const Id = /* @__PURE__ */ De(Vd, [["render", Fd]]), Ud = {
  components: { ComponentWrapper: Id, ErrorsPlaceholder: di },
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
    const t = P({
      get() {
        return this.$store.getters.getTouched(e.name);
      },
      set(h) {
        this.$store.commit("setTouched", {
          value: h,
          name: e.name
        });
      }
    }), r = P({
      get() {
        return this.$store.getters.getValue(e.name);
      },
      set(h) {
        this.$store.dispatch("update", {
          value: h,
          name: e.name
        });
      }
    }), n = P(() => e.suggest_value === "true" || e.suggest_value === !0 || e.suggest_value === "force"), s = P(() => e.display_error === "true" || e.display_error === !0), i = P(() => n.value && !t.value || e.suggest_value === "force");
    bi(() => {
      i.value && (r.value = this.$store.getters.getSuggestedValues(e.name));
    });
    const a = P(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": t.value && o.value,
      "input-block__field--warning": t.value && !o.value && u.value
    })), o = P(() => t.value ? this.$store.getters.getError(e.name) : null), u = P(() => t.value ? this.$store.getters.getWarning(e.name) : null), l = P(() => ({
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
}, Wd = ["id"], jd = ["innerHTML"], $d = ["id", "name"], Hd = ["id"], Gd = ["innerHTML"];
function qd(e, t, r, n, s, i) {
  const a = nn("ErrorsPlaceholder"), o = nn("ComponentWrapper");
  return $(), sn(o, {
    name: r.name,
    classes: n.inputGroupClass,
    id: r.id
  }, {
    default: Oi(() => [
      r.prepend ? ($(), z("div", {
        key: 0,
        class: "input-block__prepend",
        id: r.id + "__prepend"
      }, [
        pt("span", { innerHTML: r.prepend }, null, 8, jd)
      ], 8, Wd)) : Ye("", !0),
      Hn(pt("input", xt(e.$attrs, {
        class: [n.inputClass, { "input--has-prepend": r.prepend, "input--has-append": r.append }],
        id: r.id,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => n.inputValue = u),
        onFocus: t[1] || (t[1] = (u) => n.inputTouched = !0),
        name: r.name
      }), null, 16, $d), [
        [Gn, n.inputValue]
      ]),
      r.append ? ($(), z("div", {
        key: 1,
        class: "input-block__append",
        id: r.id + "__append"
      }, [
        pt("span", { innerHTML: r.append }, null, 8, Gd)
      ], 8, Hd)) : Ye("", !0),
      n.displayError ? ($(), sn(a, {
        key: 2,
        names: [r.name]
      }, null, 8, ["names"])) : Ye("", !0)
    ]),
    _: 1
  }, 8, ["name", "classes", "id"]);
}
const Bd = /* @__PURE__ */ De(Ud, [["render", qd]]), zd = {
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
}, Zd = ["accept-charset", "action", "data-values", "method", "enctype"];
function Jd(e, t, r, n, s, i) {
  return $(), z("form", {
    "accept-charset": r.acceptCharset,
    action: r.action,
    "data-values": e.dataValues,
    method: r.method,
    enctype: r.enctype,
    onSubmit: t[0] || (t[0] = ki((...a) => i.handleSubmit && i.handleSubmit(...a), ["prevent"])),
    "on:ajax:beforeSend": t[1] || (t[1] = (...a) => i.ajaxBeforeSend && i.ajaxBeforeSend(...a)),
    ref: "form"
  }, [
    Er(e.$slots, "default")
  ], 40, Zd);
}
const Kd = /* @__PURE__ */ De(zd, [["render", Jd]]), Qd = {
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
  return Hn(($(), z("input", xt(e.$attrs, {
    id: r.id,
    name: r.name,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.inputValue = a)
  }), null, 16, Xd)), [
    [Gn, i.inputValue]
  ]);
}
const tf = /* @__PURE__ */ De(Qd, [["render", ef]]), rf = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      require: !0
    }
  }
}, nf = ["for"];
function sf(e, t, r, n, s, i) {
  return $(), z("label", {
    for: e.$props.for
  }, [
    Er(e.$slots, "default")
  ], 8, nf);
}
const af = /* @__PURE__ */ De(rf, [["render", sf]]), of = {
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
}, uf = { class: "form-validation" }, lf = ["disabled"], cf = {
  key: 1,
  class: "form-validation__tooltip"
};
function df(e, t, r, n, s, i) {
  return $(), z("div", uf, [
    pt("input", xt(this.$attrs, {
      onClick: t[0] || (t[0] = (...a) => i.submitting && i.submitting(...a)),
      disabled: s.disabled
    }), null, 16, lf),
    i.displayValidationWarning ? ($(), z("div", {
      key: 0,
      class: "form-validation__global-error",
      onClick: t[1] || (t[1] = (a) => s.displayValidationMessages = !s.displayValidationMessages)
    }, "!")) : Ye("", !0),
    i.displayValidationWarning & s.displayValidationMessages ? ($(), z("ul", cf, [
      ($(!0), z(Di, null, Mi(i.recapErrors, (a) => ($(), z("li", { key: a }, Tr(a), 1))), 128))
    ])) : Ye("", !0)
  ]);
}
const ff = /* @__PURE__ */ De(of, [["render", df]]), hf = {
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
function mf(e, t, r, n, s, i) {
  return i.displaySuggestedValue ? ($(), z("span", Ti(xt({ key: 0 }, this.$attrs)), Tr(i.getSuggestedValue), 17)) : Ye("", !0);
}
const pf = /* @__PURE__ */ De(hf, [["render", mf]]);
class _f {
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
    hideValidationErrors: d = !1,
    ..._
  }) {
    window.toto = "TOTO";
    let m = {
      "botyglot-input": Bd,
      "botyglot-form": Kd,
      "botyglot-hidden": tf,
      "botyglot-submit": ff,
      "botyglot-label": af,
      "botyglot-errors-placeholder": di,
      "botyglot-suggested-value": pf
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
        disableValidation: h,
        hideValidationErrors: d
      }, _)
    };
    this.store = ra({
      state: lt,
      plugins: a,
      getters: {
        getValue: (y) => (v) => {
          let S = I.dotify(v);
          return Se(S.split("."), y.values);
        },
        getError: (y) => (v) => {
          let S = I.dotify(v);
          return y.meta.hideValidationErrors ? null : Se(S.split("."), y.errors);
        },
        getWarning: (y) => (v) => {
          let S = I.dotify(v);
          return y.meta.hideValidationErrors ? null : Se(S.split("."), y.warnings);
        },
        getTouched: (y) => (v) => {
          let S = I.dotify(v);
          return Se(S.split("."), y.touched) || Se([Y, "_submit"], y.touched);
        },
        getMeta: (y) => (v) => {
          let S = I.dotify(v);
          return Se(S.split("."), y.meta);
        },
        getPotentialValues: (y) => (v) => {
          let S = I.dotify(v);
          return Se(S.split("."), y.potentialValues);
        },
        getSuggestedValues: (y) => (v) => {
          let S = I.dotify(v);
          return Se(S.split("."), y.suggestedValues);
        }
      },
      mutations: {
        setValue: function(y, v) {
          let S = I.dotify(v.name);
          y.values = Ie(S.split("."), v.value, y.values);
        },
        setTouched: function(y, v) {
          let S = I.dotify(v.name);
          y.touched = Ie(S.split("."), v.value, y.touched);
        },
        setError: function(y, v) {
          let S = I.dotify(v.name);
          y.errors = Ie(S.split("."), v.value, y.errors);
        },
        setWarning: function(y, v) {
          let S = I.dotify(v.name);
          y.warnings = Ie(S.split("."), v.value, y.warnings);
        },
        setPotentialValues: function(y, v) {
          let S = I.dotify(v.name);
          y.potentialValues = Ie(S.split("."), v.value, y.potentialValues);
        },
        setSuggestedValues: function(y, v) {
          let S = I.dotify(v.name);
          y.suggestedValues = Ie(S.split("."), v.value, y.suggestedValues);
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
          let { sid: S, url: q, method: fe, data: ct, onSuccess: fi, onError: hi, ...mi } = v, pi = (dt) => {
            let yi = Object.assign(mi, {
              sid: S,
              response: dt
            });
            y.dispatch("genericDataReceivedFromServer", yi);
          }, _i = (dt) => {
            console.log("There was a problem with validating the data"), console.log(dt), console.log(JSON.stringify(dt, null, 2));
          };
          F.sendRequest({
            url: q,
            method: fe || "post",
            data: ct,
            onSuccess: fi || pi,
            onError: hi || _i,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(y, v) {
        },
        sendValuesToServer: function(y) {
          if (h) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let v = (fe) => {
              y.dispatch("dataReceivedFromServer", fe.data);
            }, S = (fe) => {
              console.log("There was a problem with validating the data"), console.log(fe), console.log(JSON.stringify(fe, null, 2));
            }, q = Object.assign({
              utf8: "✓",
              authenticity_token: y.state.meta.authenticityToken,
              _method: y.state.meta.httpMethod
            }, pa(y.state.values));
            q[Y]._prevent_save = !0, F.sendRequest({
              url: y.state.meta.validationUrl,
              data: q,
              method: y.state.meta.httpMethod,
              onSuccess: v,
              onError: S,
              delay: !0
            });
          }
        },
        dataReceivedFromServer: function(y, v) {
          let { errors: S, warnings: q, potential_values: fe, suggested_values: ct } = v[Y];
          S && y.commit("setError", {
            value: S,
            name: Y
          }), q && y.commit("setWarning", {
            value: q,
            name: Y
          }), fe && y.commit("setPotentialValues", {
            value: fe,
            name: Y
          }), ct && y.commit("setSuggestedValues", {
            value: ct,
            name: Y
          });
        },
        update: function(y, v) {
          y.commit("setValue", v), y.dispatch("sendValuesToServer");
        }
      }
    }), this.app = Ei({
      store: this.store,
      inheritAttrs: !1,
      components: Object.assign(m, t),
      props: {}
    }), this.app.mount(n);
  }
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormStore: _f
}, Symbol.toStringTag, { value: "Module" }));
function Mr(e) {
  Mr.installed || (Mr.installed = !0, Object.keys(Wn).forEach((t) => {
    e.component(t, Wn[t]);
  }));
}
const yf = {
  install: Mr
};
let Et = null;
typeof window < "u" ? Et = window.Vue : typeof global < "u" && (Et = global.Vue);
Et && Et.use(yf);
export {
  _f as FormStore,
  yf as default
};
//# sourceMappingURL=botyglot-common-js.js.map
