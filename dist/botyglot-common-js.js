import { toRefs as I, computed as e, openBlock as f, createElementBlock as C, normalizeClass as ae, toDisplayString as J, createCommentVNode as O, renderSlot as le, watch as G, createBlock as D, unref as u, withCtx as R, createElementVNode as M, createVNode as Z, mergeProps as N, withDirectives as Ue, vModelDynamic as Ge, createTextVNode as ze, ref as Y, Fragment as se, renderList as oe, withKeys as Re, withModifiers as Je, onMounted as Ke, resolveComponent as ue, normalizeProps as Ye, createApp as Qe } from "vue";
import { useStore as x, createStore as Ze } from "vuex";
import Xe from "vue-select";
import { debounce as ie } from "lodash";
import { isValid as Q, format as ge, isMatch as X, parse as de, formatISO as fe } from "date-fns";
import ce from "vue-flatpickr-component";
import * as P from "ramda";
import { format as he, utcToZonedTime as ne, zonedTimeToUtc as ye } from "date-fns-tz";
import { VueMonacoEditor as et } from "@guolao/vue-monaco-editor";
import { QuillEditor as tt } from "@vueup/vue-quill";
import { Utils as U, Api as me } from "k-utils-js";
import ut from "intl-tel-input";
const A = {
  __name: "errors_placeholder",
  props: {
    names: {
      // do not use directly (instead use the computed property computed_names)
      type: [String, Array],
      required: !0
    },
    id: {
      type: String
    },
    force: {
      type: [String, Boolean],
      default: !1,
      require: !1
    }
  },
  setup(c) {
    const g = c, t = x(), { names: l, force: n } = I(g), o = e(() => typeof l.value == "string" ? JSON.parse(l.value) : l.value), s = e({
      get() {
        if (n === !0 || n === "true")
          return !0;
        let r = null;
        return o.value.forEach((b) => {
          let _ = t.getters.getTouched(b);
          _ && _ !== null && _ !== !1 && (r = _);
        }), r;
      },
      set(r) {
        o.value.forEach((b) => {
          t.commit("setTouched", {
            value: r,
            name: b
          });
        });
      }
    }), p = e(() => {
      if (s.value) {
        let r = "";
        return o.value.forEach((b) => {
          let _ = t.getters.getError(b);
          _ && _ !== "" && r === "" && (r = _);
        }), r;
      } else
        return null;
    }), v = e(() => {
      if (s.value) {
        let r = "";
        return o.value.forEach((b) => {
          let _ = t.getters.getWarning(b);
          _ && _ !== "" && r === "" && (r = _);
        }), r;
      } else
        return null;
    }), m = e(() => s.value && p.value), d = e(() => s.value && !p.value && v.value), $ = e(() => m.value || d.value), S = e(() => ({
      "input-block__error-feedback": m.value,
      "input-block__warning-feedback": d.value
    })), V = e(() => p.value || v.value);
    return (r, b) => $.value ? (f(), C("span", {
      key: 0,
      class: ae(S.value)
    }, J(V.value), 3)) : O("", !0);
  }
}, nt = ["id"], z = {
  __name: "component_wrapper",
  props: {
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    classes: {
      type: [String, Array, Object],
      default: ""
    }
  },
  setup(c) {
    const g = x(), t = c, l = e(() => {
      const o = g.getters.getValue(t.name);
      return o == null || o === "";
    }), n = e(() => ({
      "botyglot-form--class-when-not-empty": !l.value,
      "botyglot-form--class-when-empty": l.value
    }));
    return (o, s) => (f(), C("div", {
      class: ae([n.value, c.classes]),
      id: c.id + "__wrapper"
    }, [
      le(o.$slots, "default")
    ], 10, nt));
  }
}, rt = ["value", "name"], at = ["id"], lt = ["innerHTML"], st = ["id"], ot = ["innerHTML"], be = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "autocomplete",
  props: {
    append: {
      type: String
    },
    choices: {
      type: String,
      required: !0
    },
    include_blank: {
      type: String,
      required: !0
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
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, choices: n, include_blank: o, name: s, id: p, prepend: v, suggest_value: m, display_error: d } = I(g), $ = e(() => t.getters.getPotentialValues(s.value) || JSON.parse(n.value));
    e(() => y.value && k.value), e(() => y.value && !k.value && E.value);
    const S = e(() => m.value === "true" || m.value === !0 || m.value === "force"), V = e(() => d.value === "true" || d.value === !0), r = e(() => S.value && !y.value || m.value === "force"), b = e(() => t.getters.getSuggestedValues(s.value));
    e(() => o.value === "true");
    const _ = e(() => ({
      "form-control": !0,
      "custom-autocomplete": !0,
      "is-invalid": y.value && k.value
    })), k = e(() => y.value ? t.getters.getError(s.value) : null), E = e(() => y.value ? t.getters.getWarning(s.value) : null), w = e(() => ({
      "input-block": !0
    })), y = e({
      get() {
        return t.getters.getTouched(s.value);
      },
      set(i) {
        t.commit("setTouched", {
          value: i,
          name: s.value
        });
      }
    }), a = e({
      get() {
        return t.getters.getValue(s.value);
      },
      set(i) {
        t.dispatch("update", {
          value: i,
          name: s.value
        });
      }
    });
    return G(b, (i, h) => {
      r.value && (a.value = i);
    }), (i, h) => (f(), D(z, {
      name: u(s),
      classes: w.value,
      id: u(p)
    }, {
      default: R(() => [
        M("input", {
          type: "hidden",
          value: a.value,
          name: u(s)
        }, null, 8, rt),
        u(v) ? (f(), C("div", {
          key: 0,
          class: "input-block__prepend",
          id: u(p) + "__prepend"
        }, [
          M("span", { innerHTML: u(v) }, null, 8, lt)
        ], 8, at)) : O("", !0),
        Z(u(Xe), N({
          id: u(p),
          class: [_.value, u(v) ? "input--has-prepend" : "", u(l) ? "input--has-append" : ""],
          label: "display_name",
          value: "id",
          name: u(s),
          reduce: (B) => B.id,
          modelValue: a.value,
          "onUpdate:modelValue": h[0] || (h[0] = (B) => a.value = B),
          "onSearch:focus": h[1] || (h[1] = (B) => y.value = !0),
          options: $.value
        }, i.$attrs), null, 16, ["id", "class", "name", "reduce", "modelValue", "options"]),
        u(l) ? (f(), C("div", {
          key: 1,
          class: "input-block__append",
          id: u(p) + "__append"
        }, [
          M("span", { innerHTML: u(l) }, null, 8, ot)
        ], 8, st)) : O("", !0),
        V.value ? (f(), D(A, {
          key: 2,
          names: [u(s)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}), it = ["id"], dt = ["name", "value"], ct = ["name", "id", "value"], Se = {
  __name: "check_box",
  props: {
    checked_value: {
      type: String,
      required: !0
    },
    unchecked_value: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { checked_value: l, unchecked_value: n, name: o, id: s, suggest_value: p, display_error: v } = I(g);
    e(() => _.value && r.value), e(() => _.value && !r.value && b.value);
    const m = e(() => p.value === "true" || p.value === !0 || p.value === "force"), d = e(() => v.value === "true" || v.value === !0), $ = e(() => m.value && !_.value || p.value === "force"), S = e(() => t.getters.getSuggestedValues(o.value)), V = e(() => ({
      "input-block__field--invalid": _.value && r.value,
      "input-block__field--warning": _.value && !r.value && b.value
    })), r = e(() => {
      let E = t.getters.getError(o.value);
      return _.value && E || null;
    }), b = e(() => _.value ? t.getters.getWarning(o.value) : null), _ = e({
      get() {
        return t.getters.getTouched(o.value);
      },
      set(E) {
        t.commit("setTouched", {
          value: E,
          name: o.value
        });
      }
    }), k = e({
      get() {
        let E = t.getters.getValue(o.value);
        return E === !0 || E === o.value;
      },
      set(E) {
        t.dispatch("update", {
          value: E,
          name: o.value
        });
      }
    });
    return G(S, (E, w) => {
      $.value && (k.value = E);
    }), (E, w) => (f(), C("label", {
      class: "checkbox__container",
      id: u(s) + "__wrapper"
    }, [
      M("input", {
        type: "hidden",
        name: u(o),
        value: u(n)
      }, null, 8, dt),
      Ue(M("input", N({
        class: "checkbox",
        ref: "input"
      }, E.$attrs, {
        class: V.value,
        name: u(o),
        id: u(s),
        "onUpdate:modelValue": w[0] || (w[0] = (y) => k.value = y),
        onFocus: w[1] || (w[1] = (y) => _.value = !0),
        value: u(l)
      }), null, 16, ct), [
        [Ge, k.value]
      ]),
      w[2] || (w[2] = M("span", { class: "checkbox__custom" }, null, -1)),
      w[3] || (w[3] = ze("   ")),
      d.value ? (f(), D(A, {
        key: 0,
        names: [u(o)]
      }, null, 8, ["names"])) : O("", !0)
    ], 8, it));
  }
};
const pt = ["id"], vt = ["innerHTML"], gt = ["name", "value"], mt = {
  key: 1,
  class: "botyglot--date-component-append-actions"
}, _t = ["id"], ft = ["innerHTML"], Ve = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "date",
  props: {
    append: {
      type: String
    },
    clear_option: {
      type: [String, Boolean],
      required: !0
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
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    },
    display_format: {
      type: String,
      required: !1,
      default: "dd/MM/yyyy"
    }
  },
  setup(c) {
    const g = c, { append: t, clear_option: l, name: n, id: o, prepend: s, suggest_value: p, display_error: v, display_format: m } = I(g), d = x(), $ = () => {
      let F;
      return m.value === "dd MMM yy" ? F = "j M y" : (m.value, F = "d/m/Y"), F;
    }, S = (F, j) => X(F, j) ? de(F, j, /* @__PURE__ */ new Date()) : null, V = (F) => {
      if (!P.isNil(F) && !P.isEmpty(F) && !X(F, m.value))
        return;
      let j = S(F, m.value);
      d.dispatch("update", {
        value: Q(j) ? ge(j, "yyyy-MM-dd") : "",
        name: n.value
      });
    }, r = () => {
      d.dispatch("update", {
        value: "",
        name: n.value
      });
    }, b = () => {
      H.value = !0;
    }, _ = Y({
      dateFormat: $(),
      allowInput: !0
    }), k = ie(V, 500);
    e(() => H.value && B.value), e(() => H.value && !B.value && q.value);
    const E = e(() => p.value === "true" || p.value === !0 || p.value === "force"), w = e(() => l.value === "true" || l.value === !0), y = e(() => v.value === "true" || v.value === !0), a = e(() => E.value && !H.value || p.value === "force"), i = e(() => d.getters.getSuggestedValues(n.value)), h = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": H.value && B.value,
      "input-block__field--warning": H.value && !B.value && q.value,
      datepicker: !0
    })), B = e(() => H.value ? d.getters.getError(n.value) : null), q = e(() => H.value ? d.getters.getWarning(n.value) : null), W = e(() => ({
      "input-block": !0
    })), H = e({
      get() {
        return d.getters.getTouched(n.value);
      },
      set(F) {
        d.commit("setTouched", {
          value: F,
          name: n.value
        });
      }
    }), T = e({
      get() {
        return d.getters.getValue(n.value);
      },
      set(F) {
        d.dispatch("update", {
          value: F,
          name: n.value
        });
      }
    }), L = e({
      get() {
        let F = d.getters.getValue(n.value), j = S(F, "yyyy-MM-dd");
        return Q(j) ? ge(j, m.value) : "";
      },
      set(F) {
        k(F);
      }
    });
    return G(i, (F, j) => {
      a.value && (T.value = F);
    }), (F, j) => (f(), D(z, {
      name: u(n),
      classes: W.value,
      id: u(o)
    }, {
      default: R(() => [
        u(s) ? (f(), C("div", {
          key: 0,
          class: "input-block__prepend",
          id: u(o) + "__prepend"
        }, [
          M("span", { innerHTML: u(s) }, null, 8, vt)
        ], 8, pt)) : O("", !0),
        M("input", {
          type: "hidden",
          name: u(n),
          value: T.value,
          onInput: j[0] || (j[0] = (K) => T.value = K.target.value)
        }, null, 40, gt),
        Z(u(ce), N({ ref: "input" }, F.$attrs, {
          modelValue: L.value,
          "onUpdate:modelValue": j[1] || (j[1] = (K) => L.value = K),
          id: u(o),
          class: [
            h.value,
            u(s) ? "input--has-prepend" : "",
            u(t) ? "input--has-append" : ""
          ],
          config: _.value,
          onOnOpen: b
        }), null, 16, ["modelValue", "id", "class", "config"]),
        w.value ? (f(), C("div", mt, [
          M("button", {
            class: "botyglot--date-component--clear-value",
            type: "button",
            title: "Clear",
            "data-clear": "",
            onClick: r
          }, j[2] || (j[2] = [
            M("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              height: "1.3rem",
              width: "1.3rem",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "2",
              stroke: "currentColor"
            }, [
              M("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M6 18 18 6M6 6l12 12"
              })
            ], -1),
            M("span", {
              "aria-hidden": "true",
              class: "sr-only"
            }, "Clear", -1)
          ]))
        ])) : O("", !0),
        u(t) ? (f(), C("div", {
          key: 2,
          class: "input-block__append",
          id: u(o) + "__append"
        }, [
          M("span", { innerHTML: u(t) }, null, 8, ft)
        ], 8, _t)) : O("", !0),
        y.value ? (f(), D(A, {
          key: 3,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
});
var ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yt(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var ke = { exports: {} };
(function(c, g) {
  (function(t, l) {
    c.exports = l();
  })(ht, function() {
    /*! *****************************************************************************
    	    Copyright (c) Microsoft Corporation.
    
    	    Permission to use, copy, modify, and/or distribute this software for any
    	    purpose with or without fee is hereby granted.
    
    	    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    	    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    	    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    	    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    	    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    	    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    	    PERFORMANCE OF THIS SOFTWARE.
    	    ***************************************************************************** */
    var t = function() {
      return t = Object.assign || function(p) {
        for (var v, m = 1, d = arguments.length; m < d; m++) {
          v = arguments[m];
          for (var $ in v)
            Object.prototype.hasOwnProperty.call(v, $) && (p[$] = v[$]);
        }
        return p;
      }, t.apply(this, arguments);
    };
    function l(s) {
      try {
        if (typeof s.composedPath == "function") {
          var p = s.composedPath();
          return p[0];
        }
        return s.target;
      } catch {
        return s.target;
      }
    }
    var n = {
      confirmIcon: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='17' height='17' viewBox='0 0 17 17'> <g> </g> <path d='M15.418 1.774l-8.833 13.485-4.918-4.386 0.666-0.746 4.051 3.614 8.198-12.515 0.836 0.548z' fill='#000000' /> </svg>",
      confirmText: "OK ",
      showAlways: !1,
      theme: "light"
    };
    function o(s) {
      var p = t(t({}, n), s), v, m = "flatpickr-confirm";
      return function(d) {
        return d.config.noCalendar || d.isMobile ? {} : t({
          onKeyDown: function($, S, V, r) {
            var b = l(r), _ = !d.config.time_24hr && b === d.amPM || d.config.time_24hr && (d.config.enableSeconds && b === d.secondElement || !d.config.enableSeconds && b === d.minuteElement);
            d.config.enableTime && r.key === "Tab" && _ ? (r.preventDefault(), v.focus()) : r.key === "Enter" && b === v && d.close();
          },
          onReady: function() {
            v = d._createElement("div", m + " " + (p.showAlways ? "visible" : "") + " " + p.theme + "Theme", p.confirmText), v.tabIndex = -1, v.innerHTML += p.confirmIcon, v.addEventListener("click", d.close), d.calendarContainer.appendChild(v), d.loadedPlugins.push("confirmDate");
          }
        }, p.showAlways ? {} : {
          onChange: function($, S) {
            var V = d.config.enableTime || d.config.mode === "multiple" || d.loadedPlugins.indexOf("monthSelect") !== -1, r = d.calendarContainer.querySelector("." + m);
            if (r) {
              if (S && !d.config.inline && V && r)
                return r.classList.add("visible");
              r.classList.remove("visible");
            }
          }
        });
      };
    }
    return o;
  });
})(ke);
var bt = ke.exports;
const St = /* @__PURE__ */ yt(bt);
const Vt = ["id"], kt = ["innerHTML"], Tt = ["name", "value"], $t = ["id"], Et = ["innerHTML"], Te = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "datetime",
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
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    },
    display_format: {
      type: String,
      required: !1,
      default: "dd/MM/yyyy HH:mm"
    },
    time_zone: {
      type: String,
      required: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, name: n, id: o, prepend: s, suggest_value: p, display_error: v, display_format: m, time_zone: d } = I(g), $ = () => {
      q.value = !0;
    }, S = () => {
      let T;
      return m.value === "dd MMM yy HH:mm" ? T = "j M y H:i" : (m.value, T = "d/m/Y H:i"), T;
    }, V = (T) => {
      let L = m.value;
      if (!P.isNil(T) && !P.isEmpty(T) && !X(T, L))
        return;
      let F = de(T, L, r()), j = Q(F) ? fe(ye(F, d.value)) : "";
      t.dispatch("update", {
        value: j,
        name: n.value
      });
    }, r = () => {
      const T = (pe, Ae) => {
        let ve = Ae - pe.toString().length + 1;
        return Array(+(ve > 0 && ve)).join("0") + pe;
      };
      let L = /* @__PURE__ */ new Date(), F = T(L.getUTCFullYear(), 4), j = T(L.getUTCMonth() + 1, 2), K = T(L.getUTCDate(), 2), te = T(L.getUTCHours(), 2), xe = T(L.getUTCMinutes(), 2), Ie = T(L.getUTCSeconds(), 2), Ne = `${F}-${j}-${K}T${te}:${xe}:${Ie}.000Z`;
      return ne(Ne, d.value);
    }, b = Y({
      dateFormat: S(),
      allowInput: !0,
      enableTime: !0,
      time_24hr: !0,
      plugins: [new St({ confirmText: "Done" })]
    }), _ = ie(V, 500);
    e(() => q.value && i.value), e(() => q.value && !i.value && h.value);
    const k = e(() => p.value === "true" || p.value === !0 || p.value === "force"), E = e(() => v.value === "true" || v.value === !0), w = e(() => k.value && !q.value || p.value === "force"), y = e(() => t.getters.getSuggestedValues(n.value)), a = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": q.value && i.value,
      "input-block__field--warning": q.value && !i.value && h.value,
      datepicker: !0
    })), i = e(() => q.value ? t.getters.getError(n.value) : null), h = e(() => q.value ? t.getters.getWarning(n.value) : null), B = e(() => ({
      "input-block": !0
    })), q = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(T) {
        t.commit("setTouched", {
          value: T,
          name: n.value
        });
      }
    }), W = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(T) {
        t.dispatch("update", {
          value: T,
          name: n.value
        });
      }
    }), H = e({
      get() {
        let T = t.getters.getValue(n.value), L = T == null ? "" : new Date(T);
        return Q(L) ? he(
          ne(T, d.value),
          m.value
        ) : "";
      },
      set(T) {
        _(T);
      }
    });
    return G(y, (T, L) => {
      w.value && (W.value = T);
    }), (T, L) => (f(), D(z, {
      name: u(n),
      classes: B.value,
      id: u(o)
    }, {
      default: R(() => [
        u(s) ? (f(), C("div", {
          key: 0,
          class: "input-block__prepend",
          id: u(o) + "__prepend"
        }, [
          M("span", { innerHTML: u(s) }, null, 8, kt)
        ], 8, Vt)) : O("", !0),
        M("input", {
          type: "hidden",
          name: u(n),
          value: W.value,
          onInput: L[0] || (L[0] = (F) => W.value = F.target.value)
        }, null, 40, Tt),
        Z(u(ce), N({ ref: "input" }, T.$attrs, {
          modelValue: H.value,
          "onUpdate:modelValue": L[1] || (L[1] = (F) => H.value = F),
          id: u(o),
          class: [
            a.value,
            u(s) ? "input--has-prepend" : "",
            u(l) ? "input--has-append" : ""
          ],
          config: b.value,
          onOnOpen: $
        }), null, 16, ["modelValue", "id", "class", "config"]),
        u(l) ? (f(), C("div", {
          key: 1,
          class: "input-block__append",
          id: u(o) + "__append"
        }, [
          M("span", { innerHTML: u(l) }, null, 8, Et)
        ], 8, $t)) : O("", !0),
        E.value ? (f(), D(A, {
          key: 2,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}), wt = ["id"], qt = ["innerHTML"], Mt = ["id", "value", "name"], Ct = ["id"], Ot = ["innerHTML"], $e = {
  __name: "field",
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
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, name: n, id: o, prepend: s, suggest_value: p, display_error: v } = I(g), m = e(() => p.value === "true" || p.value === !0 || p.value === "force"), d = e(() => v.value === "true" || v.value === !0), $ = e(() => m.value && !V.value || p.value === "force"), S = e(() => t.getters.getSuggestedValues(n.value)), V = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(w) {
        t.commit("setTouched", {
          value: w,
          name: n.value
        });
      }
    }), r = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(w) {
        t.dispatch("update", {
          value: w,
          name: n.value
        });
      }
    }), b = e(() => V.value ? t.getters.getError(n.value) : null), _ = e(() => V.value ? t.getters.getWarning(n.value) : null), k = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": V.value && b.value,
      "input-block__field--warning": V.value && !b.value && _.value
    })), E = e(() => ({
      "input-block": !0
    }));
    return G(S, (w, y) => {
      $.value && (r.value = w);
    }), (w, y) => (f(), D(z, {
      name: u(n),
      classes: E.value,
      id: u(o)
    }, {
      default: R(() => [
        u(s) ? (f(), C("div", {
          key: 0,
          class: "input-block__prepend",
          id: u(o) + "__prepend"
        }, [
          M("span", { innerHTML: u(s) }, null, 8, qt)
        ], 8, wt)) : O("", !0),
        M("input", N(w.$attrs, {
          class: [k.value, u(s) ? "input--has-prepend" : "", u(l) ? "input--has-append" : ""],
          id: u(o),
          value: r.value,
          onInput: y[0] || (y[0] = (a) => r.value = a.target.value),
          onFocus: y[1] || (y[1] = (a) => V.value = !0),
          name: u(n)
        }), null, 16, Mt),
        u(l) ? (f(), C("div", {
          key: 1,
          class: "input-block__append",
          id: u(o) + "__append"
        }, [
          M("span", { innerHTML: u(l) }, null, 8, Ot)
        ], 8, Ct)) : O("", !0),
        d.value ? (f(), D(A, {
          key: 2,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}, Ft = ["accept-charset", "action", "data-values", "method", "enctype"], Ee = {
  __name: "form",
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
  setup(c) {
    const g = c, t = Y(null), l = Y(null), { acceptCharset: n, action: o, enctype: s, method: p, autoSubmit: v } = I(g), m = x(), d = e(() => m.getters.getValue(m.getters.getMeta("modelName"))), $ = (r = 500) => {
      clearTimeout(t.value), t.value = setTimeout(() => {
        l.requestSubmit();
      }, r);
    }, S = (r) => {
      m.getters.getMeta("disableValidation") || (m.commit("setTouched", {
        value: !0,
        name: `${m.getters.getMeta("modelName")}._submit`
      }), m.getters.getError(`${m.getters.getMeta("modelName")}._is_valid`) || r.preventDefault());
    }, V = (r) => {
      m.getters.getError(`${m.getters.getMeta("modelName")}._is_valid`) || r.preventDefault();
    };
    return G(d, (r, b) => {
      v.value === "onChange" && $(750);
    }), (r, b) => (f(), C("form", {
      "accept-charset": u(n),
      action: u(o),
      "data-values": r.dataValues,
      method: u(p),
      enctype: u(s),
      onSubmit: S,
      "on:ajax:beforeSend": V,
      ref_key: "form",
      ref: l
    }, [
      le(r.$slots, "default")
    ], 40, Ft));
  }
}, Ht = ["id", "name", "value"], we = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "hidden",
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
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, name: n, id: o, prepend: s, suggest_value: p } = I(g), v = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(S) {
        t.dispatch("update", {
          value: S,
          name: n.value
        });
      }
    }), m = e(() => p.value === "true" || p.value === !0), d = e(() => m.value), $ = e(() => t.getters.getSuggestedValues(n.value));
    return G($, (S, V) => {
      d.value && (v.value = S);
    }), (S, V) => (f(), C("input", N(S.$attrs, {
      id: u(o),
      name: u(n),
      value: v.value,
      onInput: V[0] || (V[0] = (r) => v.value = r.target.value)
    }), null, 16, Ht));
  }
}), Bt = ["name", "value"], qe = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "monaco_editor",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    readonly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { id: l, name: n, readonly: o, suggest_value: s, display_error: p } = I(g);
    e(() => _.value && V.value), e(() => _.value && !V.value && r.value);
    const v = e(() => s.value === "true" || s.value === !0 || s.value === "force"), m = e(() => p.value === "true" || p.value === !0), d = e(() => v.value && !_.value || s.value === "force"), $ = e(() => t.getters.getSuggestedValues(n.value)), S = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": _.value && V.value,
      "input-block__field--warning": _.value && !V.value && r.value,
      editor: !0
    })), V = e(() => _.value ? t.getters.getError(n.value) : null), r = e(() => _.value ? t.getters.getWarning(n.value) : null), b = e(() => ({
      "input-block": !0
    })), _ = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(y) {
        t.commit("setTouched", {
          value: y,
          name: n.value
        });
      }
    }), k = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(y) {
        t.dispatch("update", {
          value: y,
          name: n.value
        }), _.value = !0;
      }
    }), E = {
      minimap: { enabled: !1 },
      automaticLayout: !0,
      autoIndent: !0,
      lineNumbers: "on",
      readOnly: o.value,
      autoClosingBrackets: "always",
      formatOnPaste: !0,
      formatOnType: !0,
      tabSize: 2
    }, w = (y) => {
      let a = 5, i = setInterval(() => {
        y.layout(), a--, a === 0 && clearInterval(i);
      }, 100);
    };
    return G($, (y, a) => {
      d.value && (k.value = y);
    }), (y, a) => (f(), D(z, {
      name: u(n),
      classes: b.value,
      id: u(l)
    }, {
      default: R(() => [
        M("input", {
          type: "hidden",
          name: u(n),
          value: k.value,
          onInput: a[0] || (a[0] = (i) => k.value = i.target.value)
        }, null, 40, Bt),
        Z(u(et), N(y.$attrs, {
          ref: "editor",
          id: u(l),
          class: S.value,
          language: "ruby",
          value: k.value,
          "onUpdate:value": a[1] || (a[1] = (i) => k.value = i),
          onFocus: a[2] || (a[2] = (i) => _.value = !0),
          options: E,
          onEditorDidMount: w
        }), null, 16, ["id", "class", "value"]),
        m.value ? (f(), D(A, {
          key: 0,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
});
const Wt = ["name", "value"], Me = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "quill_editor",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { id: l, name: n, suggest_value: o, display_error: s } = I(g);
    e(() => r.value && S.value), e(() => r.value && !S.value && V.value);
    const p = e(() => o.value === "true" || o.value === !0 || o.value === "force"), v = e(() => s.value === "true" || s.value === !0), m = e(() => p.value && !r.value || o.value === "force"), d = e(() => t.getters.getSuggestedValues(n.value)), $ = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": r.value && S.value,
      "input-block__field--warning": r.value && !S.value && V.value
    })), S = e(() => r.value ? t.getters.getError(n.value) : null), V = e(() => r.value ? t.getters.getWarning(n.value) : null), r = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(_) {
        t.commit("setTouched", {
          value: _,
          name: n.value
        });
      }
    }), b = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(_) {
        t.dispatch("update", {
          value: _,
          name: n.value
        });
      }
    });
    return G(d, (_, k) => {
      m.value && (b.value = _);
    }), (_, k) => (f(), D(z, {
      name: u(n),
      id: u(l)
    }, {
      default: R(() => [
        M("input", {
          type: "hidden",
          name: u(n),
          value: b.value
        }, null, 8, Wt),
        Z(u(tt), N({
          id: u(l),
          theme: "snow"
        }, _.$attrs, {
          content: b.value,
          "onUpdate:content": k[0] || (k[0] = (E) => b.value = E),
          toolbar: "minimal",
          class: $.value,
          onFocus: k[1] || (k[1] = (E) => r.value = !0),
          name: u(n)
        }), null, 16, ["id", "content", "class", "name"]),
        v.value ? (f(), D(A, {
          key: 0,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "id"]));
  }
}), Dt = ["name", "value"], Lt = ["id"], Pt = ["innerHTML"], jt = ["id", "value", "name", "disabled"], xt = {
  key: 0,
  value: ""
}, It = ["value"], Nt = ["id"], At = ["innerHTML"], Ce = {
  __name: "select",
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
    choices: {
      type: String,
      required: !0
    },
    include_blank: {
      type: String,
      required: !0
    },
    readonly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, name: n, id: o, prepend: s, choices: p, include_blank: v, readonly: m, suggest_value: d, display_error: $ } = I(g), S = e(() => t.getters.getPotentialValues(n.value) || JSON.parse(p.value));
    e(() => h.value && y.value), e(() => h.value && !y.value && a.value);
    const V = e(() => d.value === "true" || d.value === !0 || d.value === "force"), r = e(() => $.value === "true" || $.value === !0), b = e(() => V.value && !h.value || d.value === "force"), _ = e(() => t.getters.getSuggestedValues(n.value)), k = e(() => {
      let q = v.value;
      return !(q === null || q === "" || q === !1 || q === "false");
    }), E = e(() => {
      let q = v.value;
      return q === !0 || q === "true" ? "" : q;
    }), w = e(() => ({
      "custom-select": !0,
      "input-block__placeholder--selected": k.value && B.value === "",
      "input-block__field--invalid": h.value && y.value,
      "input-block__field--warning": h.value && !y.value && a.value
    })), y = e(() => h.value ? t.getters.getError(n.value) : null), a = e(() => h.value ? t.getters.getWarning(n.value) : null), i = e(() => ({
      "input-block": !0
    })), h = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(q) {
        t.commit("setTouched", {
          value: q,
          name: n.value
        });
      }
    }), B = e({
      get() {
        return t.getters.getValue(n.value) || "";
      },
      set(q) {
        t.dispatch("update", {
          value: q,
          name: n.value
        });
      }
    });
    return G(_, (q, W) => {
      b.value && (B.value = q);
    }), (q, W) => (f(), D(z, {
      name: u(n),
      classes: i.value,
      id: u(o)
    }, {
      default: R(() => [
        u(m) ? (f(), C("input", {
          key: 0,
          type: "hidden",
          name: u(n),
          value: B.value
        }, null, 8, Dt)) : O("", !0),
        u(s) ? (f(), C("div", {
          key: 1,
          class: "input-block__prepend",
          id: u(o) + "__prepend"
        }, [
          M("span", { innerHTML: u(s) }, null, 8, Pt)
        ], 8, Lt)) : O("", !0),
        M("select", N({
          id: u(o),
          class: [w.value, u(s) ? "input--has-prepend" : "", u(l) ? "input--has-append" : ""],
          value: B.value,
          onInput: W[0] || (W[0] = (H) => B.value = H.target.value),
          onFocus: W[1] || (W[1] = (H) => h.value = !0),
          name: u(n),
          disabled: u(m)
        }, q.$attrs), [
          k.value ? (f(), C("option", xt, J(E.value), 1)) : O("", !0),
          (f(!0), C(se, null, oe(S.value, (H, T) => (f(), C("option", {
            value: H.id,
            key: T
          }, J(H.display_name), 9, It))), 128))
        ], 16, jt),
        u(l) ? (f(), C("div", {
          key: 2,
          class: "input-block__append",
          id: u(o) + "__append"
        }, [
          M("span", { innerHTML: u(l) }, null, 8, At)
        ], 8, Nt)) : O("", !0),
        r.value ? (f(), D(A, {
          key: 3,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}, Ut = { class: "form-validation" }, Gt = ["disabled"], zt = {
  key: 1,
  class: "form-validation__tooltip"
}, Oe = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "submit",
  setup(c) {
    const g = x(), t = e(() => l.value && !g.getters.getMeta("hideValidationErrors") && !g.getters.getError(`${g.getters.getMeta("modelName")}._is_valid`)), l = e({
      get() {
        return g.getters.getTouched("modelName");
      },
      set(v) {
        g.commit("setTouched", {
          value: v,
          name: name.value
        });
      }
    }), n = e(() => {
      let v = g.getters.getError(g.getters.getMeta("modelName"));
      return delete v._is_valid, Object.values(v);
    }), o = Y(!1), s = Y(!1), p = () => {
      g.getters.getError(`${g.getters.getMeta("modelName")}._is_valid`) && setTimeout(() => o.value = !0);
    };
    return (v, m) => (f(), C("div", Ut, [
      M("input", N(v.$attrs, {
        onClick: p,
        disabled: o.value
      }), null, 16, Gt),
      t.value ? (f(), C("div", {
        key: 0,
        class: "form-validation__global-error",
        onClick: m[0] || (m[0] = (d) => s.value = !s.value)
      }, "! ")) : O("", !0),
      t.value & s.value ? (f(), C("ul", zt, [
        (f(!0), C(se, null, oe(n.value, (d) => (f(), C("li", { key: d }, J(d), 1))), 128))
      ])) : O("", !0)
    ]));
  }
}), Rt = ["id"], Jt = ["innerHTML"], Kt = ["id", "value", "name"], Yt = ["id"], Qt = ["innerHTML"], Fe = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "textarea",
  props: {
    append: {
      type: String
    },
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    prepend: {
      type: String
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { append: l, name: n, id: o, prepend: s, suggest_value: p, display_error: v } = I(g);
    e(() => k.value && r.value), e(() => k.value && !r.value && b.value);
    const m = e(() => p.value === "true" || p.value === !0 || p.value === "force"), d = e(() => v.value === "true" || v.value === !0), $ = e(() => m.value && !k.value || p.value === "force"), S = e(() => t.getters.getSuggestedValues(n.value)), V = e(() => ({
      "input-block__field": !0,
      "input-block__field--invalid": k.value && r.value,
      "input-block__field--warning": k.value && !r.value && b.value
    })), r = e(() => k.value ? t.getters.getError(n.value) : null), b = e(() => k.value ? t.getters.getWarning(n.value) : null), _ = e(() => ({
      "input-block": !0
    })), k = e({
      get() {
        return t.getters.getTouched(n.value);
      },
      set(w) {
        t.commit("setTouched", {
          value: w,
          name: n.value
        });
      }
    }), E = e({
      get() {
        return t.getters.getValue(n.value);
      },
      set(w) {
        t.dispatch("update", {
          value: w,
          name: n.value
        });
      }
    });
    return G(S, (w, y) => {
      $.value && (E.value = w);
    }), (w, y) => (f(), D(z, {
      name: u(n),
      classes: _.value,
      id: u(o)
    }, {
      default: R(() => [
        u(s) ? (f(), C("div", {
          key: 0,
          class: "input-block__prepend",
          id: u(o) + "__prepend"
        }, [
          M("span", { innerHTML: u(s) }, null, 8, Jt)
        ], 8, Rt)) : O("", !0),
        M("textarea", N(w.$attrs, {
          class: [V.value, u(s) ? "input--has-prepend" : "", u(l) ? "input--has-append" : ""],
          id: u(o),
          value: E.value,
          onInput: y[0] || (y[0] = (a) => E.value = a.target.value),
          onFocus: y[1] || (y[1] = (a) => k.value = !0),
          name: u(n)
        }), null, 16, Kt),
        u(l) ? (f(), C("div", {
          key: 1,
          class: "input-block__append",
          id: u(o) + "__append"
        }, [
          M("span", { innerHTML: u(l) }, null, 8, Qt)
        ], 8, Yt)) : O("", !0),
        d.value ? (f(), D(A, {
          key: 2,
          names: [u(n)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}), He = (c, g) => {
  const t = c.__vccOpts || c;
  for (const [l, n] of g)
    t[l] = n;
  return t;
}, Zt = {
  inheritAttrs: !1,
  props: {
    for: {
      type: String,
      required: !0
    }
  }
}, Xt = ["for"];
function eu(c, g, t, l, n, o) {
  return f(), C("label", { for: t.for }, [
    le(c.$slots, "default")
  ], 8, Xt);
}
const Be = /* @__PURE__ */ He(Zt, [["render", eu]]), tu = ["for"], uu = {
  key: 0,
  class: "toggle-label-prepend"
}, nu = ["name", "value"], ru = ["id", "name", "disabled", "checked", "onKeydown", "value"], au = {
  key: 1,
  class: "toggle-label-append"
}, lu = { key: 2 }, We = {
  __name: "toggle_switch",
  props: {
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    value: {
      type: String,
      required: !0
    },
    on_value: {
      type: String,
      required: !0
    },
    on_label: {
      type: String,
      required: !0
    },
    off_value: {
      type: String,
      required: !0
    },
    off_label: {
      type: String,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    },
    show_labels: {
      type: [String, Boolean],
      default: !1
    }
  },
  setup(c) {
    const g = c, t = x(), {
      name: l,
      id: n,
      value: o,
      on_value: s,
      on_label: p,
      off_value: v,
      off_label: m,
      disabled: d,
      suggest_value: $,
      display_error: S,
      show_labels: V
    } = I(g), r = () => {
      i.value === s.value ? i.value = v.value : i.value = s.value;
    };
    e(() => W.value && B.value), e(() => W.value && !B.value && q.value);
    const b = e(() => V.value === "true" || V.value === !0), _ = e(() => $.value === "true" || $.value === !0 || $.value === "force"), k = e(() => S.value === "true" || S.value === !0), E = e(() => _.value && !W.value || $.value === "force"), w = e(() => t.getters.getSuggestedValues(l.value)), y = e(() => ({
      toggle_switch_component__label: !0,
      "input-block__field--invalid": W.value && B.value,
      "input-block__field--warning": W.value && !B.value && q.value
    })), a = e(() => ({
      "toggle_switch_component__global-container": !0
    })), i = e({
      get() {
        let H = t.getters.getValue(l.value);
        return H === !0 || H === s.value ? s.value : v.value;
      },
      set(H) {
        t.dispatch("update", {
          value: H === !0 || H === s.value ? s.value : v.value,
          name: l.value
        });
      }
    }), h = e({
      get() {
        let H = t.getters.getValue(l.value);
        return H === !0 || H === s.value ? p.value : m.value;
      }
    }), B = e(() => W.value ? t.getters.getError(l.value) : null), q = e(() => W.value ? t.getters.getWarning(l.value) : null), W = e({
      get() {
        return t.getters.getTouched(l.value);
      },
      set(H) {
        t.commit("setTouched", {
          value: H,
          name: l.value
        });
      }
    });
    return G(w, (H, T) => {
      E.value && (i.value = H);
    }), (H, T) => (f(), D(z, {
      name: u(l),
      classes: a.value,
      id: u(n)
    }, {
      default: R(() => [
        M("label", {
          class: ae(y.value),
          for: u(n)
        }, [
          b.value ? (f(), C("span", uu, J(u(m)), 1)) : O("", !0),
          M("input", {
            type: "hidden",
            name: u(l),
            value: u(v)
          }, null, 8, nu),
          M("input", N({
            id: u(n),
            name: u(l),
            class: "toggle_switch_component__input",
            type: "checkbox",
            ref: "input"
          }, H.$attrs, {
            disabled: u(d),
            checked: i.value === u(s),
            onFocus: T[0] || (T[0] = (L) => W.value = !0),
            onKeydown: Re(Je(r, ["prevent"]), ["space"]),
            onClick: r,
            value: u(s)
          }), null, 16, ru),
          T[1] || (T[1] = M("span", {
            class: "toggle_switch_component__display",
            hidden: ""
          }, null, -1)),
          b.value ? (f(), C("span", au, J(u(p)), 1)) : O("", !0),
          b.value ? O("", !0) : (f(), C("p", lu, J(h.value), 1))
        ], 10, tu),
        k.value ? (f(), D(A, {
          key: 0,
          names: [u(l)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
};
const su = ["id", "value", "name"], ou = ["id"], iu = ["id"], De = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "tel_input",
  props: {
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    }
  },
  setup(c) {
    const g = c, t = Y(null), l = x(), { name: n, id: o } = I(g), s = e(() => S.value && d.value), p = e(() => S.value && !d.value && $.value), v = e(() => ({
      "input-block__field": !0,
      "tel-input__text-input": !0,
      "input-block__field--invalid": S.value && d.value
    })), m = e(() => ({
      "input-block tel-input-block": !0
    })), d = e(() => S.value ? l.getters.getError(n.value) : null), $ = e(() => S.value ? l.getters.getWarning(n.value) : null), S = e({
      get() {
        return l.getters.getTouched(n.value);
      },
      set(r) {
        l.commit("setTouched", {
          value: r,
          name: n.value
        });
      }
    }), V = e({
      get() {
        return l.getters.getValue(n.value);
      },
      set(r) {
        r = window.intlTelInputGlobals.getInstance(t.value).getNumber(), l.dispatch("update", {
          value: r,
          name: n.value
        });
      }
    });
    return Ke(() => {
      ut(t.value, {
        preferredCountries: [],
        formatOnDisplay: !1,
        separateDialCode: !1,
        // fixme: should be the path to intl-tel-input/build/js/utils but I dont know how to get it while using vite js
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.21/build/js/utils.js"
      });
    }), (r, b) => (f(), D(z, {
      name: u(n),
      classes: m.value,
      id: u(o)
    }, {
      default: R(() => [
        M("input", N(r.$attrs, {
          class: v.value,
          ref_key: "telInput",
          ref: t,
          type: "tel",
          id: u(o),
          value: V.value,
          onInput: b[0] || (b[0] = (_) => V.value = _.target.value),
          onFocus: b[1] || (b[1] = (_) => S.value = !0),
          name: u(n)
        }), null, 16, su),
        s.value ? (f(), C("span", {
          key: 0,
          id: u(o) + "__error_message",
          class: "tel-input__error-feedback"
        }, J(d.value), 9, ou)) : O("", !0),
        p.value ? (f(), C("span", {
          key: 1,
          id: u(o) + "__warning_message",
          class: "input-block__warning-feedback"
        }, J($.value), 9, iu)) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}), du = {
  data() {
    return {
      config: {
        enableTime: !0,
        noCalendar: !0,
        dateFormat: this.pickerFormat(),
        allowInput: !0,
        time_24hr: !0
      },
      debouncedSetFormattedValue: ie(this.setFormattedValue, 500)
    };
  },
  components: {
    ComponentWrapper: z,
    ErrorsPlaceholder: A,
    flatPickr: ce
  },
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
    },
    display_format: {
      type: String,
      require: !1,
      default: "HH:mm"
    }
  },
  computed: {
    displayValidationError: function() {
      return this.inputTouched && this.inputError;
    },
    displayValidationWarning: function() {
      return this.inputTouched && !this.inputError && this.inputWarning;
    },
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
        "input-block__field--warning": this.inputTouched && !this.inputError && this.inputWarning,
        datepicker: !0
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
      set(c) {
        this.$store.commit("setTouched", {
          value: c,
          name: this.$props.name
        });
      }
    },
    inputValue: {
      get() {
        return this.$store.getters.getValue(this.$props.name);
      },
      set(c) {
        this.$store.dispatch("update", {
          value: c,
          name: this.$props.name
        });
      }
    },
    inputFormattedValue: {
      get() {
        let c = this.$store.getters.getValue(this.$props.name), g = c == null ? "" : new Date(c);
        return Q(g) ? he(
          ne(g, "UTC"),
          this.$props.display_format,
          { timeZone: "UTC" }
        ) : "";
      },
      set(c) {
        this.debouncedSetFormattedValue(c);
      }
    }
  },
  watch: {
    suggestedValue: function(c, g) {
      this.useSuggestedValue && (this.inputValue = c);
    }
  },
  methods: {
    onFocusDatePicker: function() {
      this.inputTouched = !0;
    },
    checkIsValidFormat: (c, g) => !P.isNil(c) && !P.isEmpty(c) && X(c, g),
    pickerFormat: function() {
      let c;
      return this.$props.display_format === "HH:mm" && (c = "H:i"), c;
    },
    setFormattedValue: function(c) {
      let g = this.$props.display_format;
      if (!P.isNil(c) && !P.isEmpty(c) && !X(c, g))
        return;
      let t = de(c, g, /* @__PURE__ */ new Date()), l = Q(t) ? fe(ye(t, "UTC")) : "";
      this.$store.dispatch("update", {
        value: l,
        name: this.$props.name
      });
    }
  }
}, cu = ["id"], pu = ["innerHTML"], vu = ["name", "value"], gu = ["id"], mu = ["innerHTML"];
function _u(c, g, t, l, n, o) {
  const s = ue("flat-pickr"), p = ue("ErrorsPlaceholder"), v = ue("ComponentWrapper");
  return f(), D(v, {
    name: t.name,
    classes: o.inputGroupClass,
    id: t.id
  }, {
    default: R(() => [
      t.prepend ? (f(), C("div", {
        key: 0,
        class: "input-block__prepend",
        id: t.id + "__prepend"
      }, [
        M("span", { innerHTML: t.prepend }, null, 8, pu)
      ], 8, cu)) : O("", !0),
      M("input", {
        type: "hidden",
        name: t.name,
        value: o.inputValue
      }, null, 8, vu),
      Z(s, N({ ref: "input" }, c.$attrs, {
        modelValue: o.inputFormattedValue,
        "onUpdate:modelValue": g[0] || (g[0] = (m) => o.inputFormattedValue = m),
        id: t.id,
        class: [
          o.inputClass,
          t.prepend ? "input--has-prepend" : "",
          t.append ? "input--has-append" : ""
        ],
        config: n.config,
        onOnOpen: o.onFocusDatePicker
      }), null, 16, ["modelValue", "id", "class", "config", "onOnOpen"]),
      t.append ? (f(), C("div", {
        key: 1,
        class: "input-block__append",
        id: t.id + "__append"
      }, [
        M("span", { innerHTML: t.append }, null, 8, mu)
      ], 8, gu)) : O("", !0),
      o.displayError ? (f(), D(p, {
        key: 2,
        names: [t.name]
      }, null, 8, ["names"])) : O("", !0)
    ]),
    _: 1
  }, 8, ["name", "classes", "id"]);
}
const Le = /* @__PURE__ */ He(du, [["render", _u]]), fu = { class: "multi_check__flex-container" }, hu = { class: "multi_check__checkbox-container" }, yu = ["value", "name", "id", "checked"], bu = { class: "multi_check__label-container" }, Su = ["for"], Vu = ["id", "name"], Pe = {
  __name: "multi_check",
  props: {
    name: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    choices: {
      type: String,
      required: !0
    },
    suggest_value: {
      // do not use directly (instead use the computed property suggestValue)
      type: [String, Boolean],
      required: !1,
      default: !1
    },
    display_error: {
      // do not use directly (instead use the computed property displayError)
      type: [String, Boolean],
      required: !1,
      default: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { name: l, id: n, choices: o, suggest_value: s, display_error: p } = I(g), v = e(() => t.getters.getPotentialValues(l.value) || JSON.parse(o.value));
    e(() => k.value && V.value), e(() => k.value && !V.value && r.value);
    const m = e(() => s.value === "true" || s.value === !0 || s.value === "force"), d = e(() => p.value === "true" || p.value === !0), $ = e(() => m.value && !k.value || s.value === "force"), S = e(() => t.getters.getSuggestedValues(l.value)), V = e(() => k.value ? t.getters.getError(l.value) : null), r = e(() => k.value ? t.getters.getWarning(l.value) : null), b = e(() => ({
      multi_check__wrapper: !0
    })), _ = e(() => l.value + "[]"), k = e({
      get() {
        return t.getters.getTouched(l.value);
      },
      set(y) {
        t.commit("setTouched", {
          value: y,
          name: l.value
        });
      }
    }), E = e({
      get() {
        return t.getters.getValue(l.value);
      },
      set(y) {
        t.dispatch("update", {
          value: y,
          name: l.value
        });
      }
    });
    G(S, (y, a) => {
      $.value && (E.value = y);
    });
    const w = (y) => {
      const a = E.value || [], i = y.target.value, h = a.indexOf(i);
      y.target.checked ? h === -1 && (E.value = [...a, i]) : h !== -1 && (E.value = a.toSpliced(h, 1));
    };
    return (y, a) => (f(), D(z, {
      name: u(l),
      classes: b.value,
      id: u(n)
    }, {
      default: R(() => [
        (f(!0), C(se, null, oe(v.value, (i) => (f(), C("div", fu, [
          M("div", hu, [
            M("input", {
              onFocus: a[0] || (a[0] = (h) => k.value = !0),
              type: "checkbox",
              value: i.id,
              name: _.value,
              id: `id-${i.id}`,
              onChange: w,
              checked: E.value.includes(i.id),
              class: "multi_check__checkbox-input"
            }, null, 40, yu)
          ]),
          M("div", bu, [
            M("label", {
              class: "multi_check__label-text",
              for: `id-${i.id}`
            }, J(i.display_name), 9, Su)
          ])
        ]))), 256)),
        M("input", {
          type: "hidden",
          id: u(n),
          name: _.value,
          value: ""
        }, null, 8, Vu),
        d.value ? (f(), D(A, {
          key: 0,
          names: [u(l)]
        }, null, 8, ["names"])) : O("", !0)
      ]),
      _: 1
    }, 8, ["name", "classes", "id"]));
  }
}, je = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "suggested_value",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(c) {
    const g = c, t = x(), { name: l } = I(g), n = e(() => t.getters.getSuggestedValues(l.value)), o = e(() => n.value !== null);
    return (s, p) => o.value ? (f(), C("span", Ye(N({ key: 0 }, s.$attrs)), J(n.value), 17)) : O("", !0);
  }
});
class ku {
  constructor({
    additionalComponents: g = {},
    authenticityToken: t,
    element: l,
    globalAuthenticityToken: n,
    httpMethod: o = "POST",
    plugins: s = [],
    validationUrl: p,
    values: v = {},
    initialTouch: m = !1,
    disableValidation: d = !1,
    hideValidationErrors: $ = !1,
    ...S
  }) {
    let V = {
      "botyglot-time": Le,
      "botyglot-autocomplete": be,
      "botyglot-check_box": Se,
      "botyglot-date": Ve,
      "botyglot-datetime": Te,
      "botyglot-input": $e,
      "botyglot-form": Ee,
      "botyglot-hidden": we,
      "botyglot-select": Ce,
      "botyglot-monaco_editor": qe,
      "botyglot-quill_editor": Me,
      "botyglot-textarea": Fe,
      "botyglot-submit": Oe,
      "botyglot-label": Be,
      "botyglot-toggle-switch": We,
      "botyglot-tel-input": De,
      "botyglot-multi-check": Pe,
      "botyglot-errors-placeholder": A,
      "botyglot-suggested-value": je
    };
    const r = Object.keys(v)[0];
    let { errors: b, warnings: _, suggested_values: k, potential_values: E, ...w } = v[r], y = {
      values: {
        [r]: w || {}
      },
      errors: {
        [r]: b || {}
      },
      warnings: {
        [r]: _ || {}
      },
      touched: {
        [r]: {
          _submit: m
        }
      },
      potentialValues: {
        [r]: E || {}
      },
      suggestedValues: {
        [r]: k || {}
      },
      meta: Object.assign({
        modelName: r,
        authenticityToken: t,
        globalAuthenticityToken: n,
        validationUrl: p,
        httpMethod: o,
        disableValidation: d,
        hideValidationErrors: $
      }, S)
    };
    this.store = Ze({
      state: y,
      plugins: s,
      getters: {
        getValue: (a) => (i) => {
          let h = U.dotify(i);
          return P.path(h.split("."), a.values);
        },
        getError: (a) => (i) => {
          let h = U.dotify(i);
          return a.meta.hideValidationErrors ? null : P.path(h.split("."), a.errors);
        },
        getWarning: (a) => (i) => {
          let h = U.dotify(i);
          return a.meta.hideValidationErrors ? null : P.path(h.split("."), a.warnings);
        },
        getTouched: (a) => (i) => {
          let h = U.dotify(i);
          return P.path(h.split("."), a.touched) || P.path([r, "_submit"], a.touched);
        },
        getMeta: (a) => (i) => {
          let h = U.dotify(i);
          return P.path(h.split("."), a.meta);
        },
        getPotentialValues: (a) => (i) => {
          let h = U.dotify(i);
          return P.path(h.split("."), a.potentialValues);
        },
        getSuggestedValues: (a) => (i) => {
          let h = U.dotify(i);
          return P.path(h.split("."), a.suggestedValues);
        }
      },
      mutations: {
        setValue: function(a, i) {
          let h = U.dotify(i.name);
          a.values = P.assocPath(h.split("."), i.value, a.values);
        },
        setTouched: function(a, i) {
          let h = U.dotify(i.name);
          a.touched = P.assocPath(h.split("."), i.value, a.touched);
        },
        setError: function(a, i) {
          let h = U.dotify(i.name);
          a.errors = P.assocPath(h.split("."), i.value, a.errors);
        },
        setWarning: function(a, i) {
          let h = U.dotify(i.name);
          a.warnings = P.assocPath(h.split("."), i.value, a.warnings);
        },
        setPotentialValues: function(a, i) {
          let h = U.dotify(i.name);
          a.potentialValues = P.assocPath(h.split("."), i.value, a.potentialValues);
        },
        setSuggestedValues: function(a, i) {
          let h = U.dotify(i.name);
          a.suggestedValues = P.assocPath(h.split("."), i.value, a.suggestedValues);
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
        genericSendDataToServer: function(a, i) {
          let { sid: h, url: B, method: q, data: W, onSuccess: H, onError: T, ...L } = i, F = (K) => {
            let te = Object.assign(L, {
              sid: h,
              response: K
            });
            a.dispatch("genericDataReceivedFromServer", te);
          }, j = (K) => {
            console.log("There was a problem with validating the data"), console.log(K), console.log(JSON.stringify(K, null, 2));
          };
          me.sendRequest({
            url: B,
            method: q || "post",
            data: W,
            onSuccess: H || F,
            onError: T || j,
            delay: !0
          });
        },
        genericDataReceivedFromServer: function(a, i) {
        },
        sendValuesToServer: function(a) {
          if (d) {
            console.log("Back-end validation is disabled");
            return;
          } else {
            let i = (q) => {
              a.dispatch("dataReceivedFromServer", q.data);
            }, h = (q) => {
              console.log("There was a problem with validating the data"), console.log(q), console.log(JSON.stringify(q, null, 2));
            }, B = Object.assign({
              utf8: "✓",
              authenticity_token: a.state.meta.authenticityToken,
              _method: a.state.meta.httpMethod
            }, P.clone(a.state.values));
            B[r]._prevent_save = !0, me.sendRequest({ url: a.state.meta.validationUrl, data: B, method: a.state.meta.httpMethod, onSuccess: i, onError: h, delay: !0 });
          }
        },
        dataReceivedFromServer: function(a, i) {
          let { errors: h, warnings: B, potential_values: q, suggested_values: W } = i[r];
          h && a.commit("setError", {
            value: h,
            name: r
          }), B && a.commit("setWarning", {
            value: B,
            name: r
          }), q && a.commit("setPotentialValues", {
            value: q,
            name: r
          }), W && a.commit("setSuggestedValues", {
            value: W,
            name: r
          });
        },
        update: function(a, i) {
          a.commit("setValue", i), a.dispatch("sendValuesToServer");
        }
      }
    }), this.app = Qe({
      inheritAttrs: !1,
      components: Object.assign(V, g),
      props: {}
    }), this.app.use(this.store), this.app.mount(l.parentElement);
  }
}
const _e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Autocomplete: be,
  CheckBox: Se,
  ComponentWrapper: z,
  Date: Ve,
  Datetime: Te,
  ErrorsPlaceholder: A,
  Field: $e,
  Form: Ee,
  FormStore: ku,
  Hidden: we,
  Label: Be,
  MonacoEditor: qe,
  MultiCheck: Pe,
  QuillEditor: Me,
  Select: Ce,
  Submit: Oe,
  SuggestedValue: je,
  TelInput: De,
  Textarea: Fe,
  Time: Le,
  ToggleSwitch: We
}, Symbol.toStringTag, { value: "Module" }));
function re(c) {
  re.installed || (re.installed = !0, Object.keys(_e).forEach((g) => {
    c.component(g, _e[g]);
  }));
}
const Tu = {
  install: re
};
let ee = null;
typeof window < "u" ? ee = window.Vue : typeof global < "u" && (ee = global.Vue);
ee && ee.use(Tu);
export {
  be as Autocomplete,
  Se as CheckBox,
  z as ComponentWrapper,
  Ve as Date,
  Te as Datetime,
  A as ErrorsPlaceholder,
  $e as Field,
  Ee as Form,
  ku as FormStore,
  we as Hidden,
  Be as Label,
  qe as MonacoEditor,
  Pe as MultiCheck,
  Me as QuillEditor,
  Ce as Select,
  Oe as Submit,
  je as SuggestedValue,
  De as TelInput,
  Fe as Textarea,
  Le as Time,
  We as ToggleSwitch,
  Tu as default
};
//# sourceMappingURL=botyglot-common-js.js.map
