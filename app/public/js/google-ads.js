// Copyright 2012 Google Inc. All rights reserved.
(function () {
  var data = {
    resource: {
      version: "1",

      macros: [{ function: "__e" }, { function: "__cid" }],
      tags: [{ function: "__rep", once_per_event: true, vtp_containerId: ["macro", 1], tag_id: 1 }],
      predicates: [{ function: "_eq", arg0: ["macro", 0], arg1: "gtm.js" }],
      rules: [
        [
          ["if", 0],
          ["add", 0],
        ],
      ],
    },
    runtime: [],
  };

  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var aa,
    da = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    ea =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    fa;
  if ("function" == typeof Object.setPrototypeOf) fa = Object.setPrototypeOf;
  else {
    var ha;
    a: {
      var ia = { a: !0 },
        ja = {};
      try {
        ja.__proto__ = ia;
        ha = ja.a;
        break a;
      } catch (a) {}
      ha = !1;
    }
    fa = ha
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var ka = fa,
    la = function (a, b) {
      a.prototype = ea(b.prototype);
      a.prototype.constructor = a;
      if (ka) ka(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.kl = b.prototype;
    },
    ma = this || self,
    na = function (a) {
      return a;
    };
  var oa = function () {},
    pa = function (a) {
      return "function" === typeof a;
    },
    h = function (a) {
      return "string" === typeof a;
    },
    qa = function (a) {
      return "number" === typeof a && !isNaN(a);
    },
    ra = Array.isArray,
    sa = function (a, b) {
      if (a && ra(a)) for (var c = 0; c < a.length; c++) if (a[c] && b(a[c])) return a[c];
    },
    ta = function (a, b) {
      if (!qa(a) || !qa(b) || a > b) (a = 0), (b = 2147483647);
      return Math.floor(Math.random() * (b - a + 1) + a);
    },
    xa = function (a, b) {
      for (var c = new ua(), d = 0; d < a.length; d++) c.set(a[d], !0);
      for (var e = 0; e < b.length; e++) if (c.get(b[e])) return !0;
      return !1;
    },
    k = function (a, b) {
      for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
    },
    za = function (a) {
      return (
        !!a &&
        ("[object Arguments]" === Object.prototype.toString.call(a) ||
          Object.prototype.hasOwnProperty.call(a, "callee"))
      );
    },
    Aa = function (a) {
      return Math.round(Number(a)) || 0;
    },
    Ba = function (a) {
      return "false" === String(a).toLowerCase() ? !1 : !!a;
    },
    Ca = function (a) {
      var b = [];
      if (ra(a)) for (var c = 0; c < a.length; c++) b.push(String(a[c]));
      return b;
    },
    Da = function (a) {
      return a ? a.replace(/^\s+|\s+$/g, "") : "";
    },
    Ea = function () {
      return new Date(Date.now());
    },
    z = function () {
      return Ea().getTime();
    },
    ua = function () {
      this.prefix = "gtm.";
      this.values = {};
    };
  ua.prototype.set = function (a, b) {
    this.values[this.prefix + a] = b;
  };
  ua.prototype.get = function (a) {
    return this.values[this.prefix + a];
  };
  var Fa = function (a, b, c) {
      return a && a.hasOwnProperty(b) ? a[b] : c;
    },
    Ga = function (a) {
      var b = a;
      return function () {
        if (b) {
          var c = b;
          b = void 0;
          try {
            c();
          } catch (d) {}
        }
      };
    },
    Ha = function (a, b) {
      for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    },
    Ia = function (a) {
      for (var b in a) if (a.hasOwnProperty(b)) return !0;
      return !1;
    },
    Ja = function (a, b) {
      for (var c = [], d = 0; d < a.length; d++) c.push(a[d]), c.push.apply(c, b[a[d]] || []);
      return c;
    },
    Ka = function (a, b) {
      for (var c = {}, d = c, e = a.split("."), f = 0; f < e.length - 1; f++) d = d[e[f]] = {};
      d[e[e.length - 1]] = b;
      return c;
    },
    La = /^\w{1,9}$/,
    Ma = function (a, b) {
      a = a || {};
      b = b || ",";
      var c = [];
      k(a, function (d, e) {
        La.test(d) && e && c.push(d);
      });
      return c.join(b);
    },
    Na = function (a, b) {
      function c() {
        ++d === b && (e(), (e = null), (c.done = !0));
      }
      var d = 0,
        e = a;
      c.done = !1;
      return c;
    };
  function Qa() {
    for (var a = Ra, b = {}, c = 0; c < a.length; ++c) b[a[c]] = c;
    return b;
  }
  function Sa() {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    a += a.toLowerCase() + "0123456789-_";
    return a + ".";
  }
  var Ra, Ta;
  function Ua(a) {
    Ra = Ra || Sa();
    Ta = Ta || Qa();
    for (var b = [], c = 0; c < a.length; c += 3) {
      var d = c + 1 < a.length,
        e = c + 2 < a.length,
        f = a.charCodeAt(c),
        g = d ? a.charCodeAt(c + 1) : 0,
        l = e ? a.charCodeAt(c + 2) : 0,
        m = f >> 2,
        n = ((f & 3) << 4) | (g >> 4),
        p = ((g & 15) << 2) | (l >> 6),
        q = l & 63;
      e || ((q = 64), d || (p = 64));
      b.push(Ra[m], Ra[n], Ra[p], Ra[q]);
    }
    return b.join("");
  }
  function Va(a) {
    function b(m) {
      for (; d < a.length; ) {
        var n = a.charAt(d++),
          p = Ta[n];
        if (null != p) return p;
        if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n);
      }
      return m;
    }
    Ra = Ra || Sa();
    Ta = Ta || Qa();
    for (var c = "", d = 0; ; ) {
      var e = b(-1),
        f = b(0),
        g = b(64),
        l = b(64);
      if (64 === l && -1 === e) return c;
      c += String.fromCharCode((e << 2) | (f >> 4));
      64 != g &&
        ((c += String.fromCharCode(((f << 4) & 240) | (g >> 2))),
        64 != l && (c += String.fromCharCode(((g << 6) & 192) | l)));
    }
  }
  var Wa = {},
    Xa = function (a, b) {
      Wa[a] = Wa[a] || [];
      Wa[a][b] = !0;
    },
    Ya = function () {
      delete Wa.GA4_EVENT;
    },
    Za = function (a) {
      var b = Wa[a];
      if (!b || 0 === b.length) return "";
      for (var c = [], d = 0, e = 0; e < b.length; e++)
        0 === e % 8 && 0 < e && (c.push(String.fromCharCode(d)), (d = 0)), b[e] && (d |= 1 << e % 8);
      0 < d && c.push(String.fromCharCode(d));
      return Ua(c.join("")).replace(/\.+$/, "");
    };
  var $a = Array.prototype.indexOf
    ? function (a, b) {
        return Array.prototype.indexOf.call(a, b, void 0);
      }
    : function (a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1;
      };
  var ab,
    bb = function () {
      if (void 0 === ab) {
        var a = null,
          b = ma.trustedTypes;
        if (b && b.createPolicy) {
          try {
            a = b.createPolicy("goog#html", { createHTML: na, createScript: na, createScriptURL: na });
          } catch (c) {
            ma.console && ma.console.error(c.message);
          }
          ab = a;
        } else ab = a;
      }
      return ab;
    };
  var db = function (a, b) {
    this.h = b === cb ? a : "";
  };
  db.prototype.toString = function () {
    return this.h + "";
  };
  var cb = {};
  var eb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  function fb() {
    var a = ma.navigator;
    if (a) {
      var b = a.userAgent;
      if (b) return b;
    }
    return "";
  }
  function gb(a) {
    return -1 != fb().indexOf(a);
  }
  function hb() {
    return gb("Firefox") || gb("FxiOS");
  }
  function ib() {
    return ((gb("Chrome") || gb("CriOS")) && !gb("Edge")) || gb("Silk");
  }
  var jb = {},
    kb = function (a, b) {
      this.h = b === jb ? a : "";
    };
  kb.prototype.toString = function () {
    return this.h.toString();
  };
  var lb = function (a) {
      return a instanceof kb && a.constructor === kb ? a.h : "type_error:SafeHtml";
    },
    mb = function (a) {
      var b = a,
        c = bb(),
        d = c ? c.createHTML(b) : b;
      return new kb(d, jb);
    }; /*

 SPDX-License-Identifier: Apache-2.0
*/
  function nb(a) {
    if ("script" === a.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeScript.");
    if ("style" === a.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeStyleSheet.");
  }
  var E = window,
    F = document,
    ob = navigator,
    pb = F.currentScript && F.currentScript.src,
    qb = function (a, b) {
      var c = E[a];
      E[a] = void 0 === c ? b : c;
      return E[a];
    },
    rb = function (a, b) {
      b &&
        (a.addEventListener
          ? (a.onload = b)
          : (a.onreadystatechange = function () {
              a.readyState in { loaded: 1, complete: 1 } && ((a.onreadystatechange = null), b());
            }));
    },
    sb = { async: 1, nonce: 1, onerror: 1, onload: 1, src: 1, type: 1 },
    tb = { onload: 1, src: 1, width: 1, height: 1, style: 1 };
  function ub(a, b, c) {
    b &&
      k(b, function (d, e) {
        d = d.toLowerCase();
        c.hasOwnProperty(d) || a.setAttribute(d, e);
      });
  }
  var vb = function (a, b, c, d, e) {
      var f = F.createElement("script");
      ub(f, d, sb);
      f.type = "text/javascript";
      f.async = !0;
      var g,
        l = a,
        m = bb(),
        n = m ? m.createScriptURL(l) : l;
      g = new db(n, cb);
      f.src = g instanceof db && g.constructor === db ? g.h : "type_error:TrustedResourceUrl";
      var p,
        q,
        t,
        u =
          null == (t = (q = ((f.ownerDocument && f.ownerDocument.defaultView) || window).document).querySelector)
            ? void 0
            : t.call(q, "script[nonce]");
      (p = u ? u.nonce || u.getAttribute("nonce") || "" : "") && f.setAttribute("nonce", p);
      rb(f, b);
      c && (f.onerror = c);
      if (e) e.appendChild(f);
      else {
        var r = F.getElementsByTagName("script")[0] || F.body || F.head;
        r.parentNode.insertBefore(f, r);
      }
      return f;
    },
    wb = function () {
      if (pb) {
        var a = pb.toLowerCase();
        if (0 === a.indexOf("https://")) return 2;
        if (0 === a.indexOf("http://")) return 3;
      }
      return 1;
    },
    xb = function (a, b, c, d, e) {
      var f;
      f = void 0 === f ? !0 : f;
      var g = e,
        l = !1;
      g || ((g = F.createElement("iframe")), (l = !0));
      ub(g, c, tb);
      d &&
        k(d, function (n, p) {
          g.dataset[n] = p;
        });
      f && ((g.height = "0"), (g.width = "0"), (g.style.display = "none"), (g.style.visibility = "hidden"));
      if (l) {
        var m = (F.body && F.body.lastChild) || F.body || F.head;
        m.parentNode.insertBefore(g, m);
      }
      rb(g, b);
      void 0 !== a && (g.src = a);
      return g;
    },
    yb = function (a, b, c) {
      var d = new Image(1, 1);
      d.onload = function () {
        d.onload = null;
        b && b();
      };
      d.onerror = function () {
        d.onerror = null;
        c && c();
      };
      d.src = a;
    },
    zb = function (a, b, c, d) {
      a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c);
    },
    Ab = function (a, b, c) {
      a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c);
    },
    G = function (a) {
      E.setTimeout(a, 0);
    },
    Bb = function (a, b) {
      return a && b && a.attributes && a.attributes[b] ? a.attributes[b].value : null;
    },
    Cb = function (a) {
      var b = a.innerText || a.textContent || "";
      b && " " != b && (b = b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""));
      b && (b = b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g, " "));
      return b;
    },
    Db = function (a) {
      var b = F.createElement("div"),
        c = b,
        d = mb("A<div>" + a + "</div>");
      void 0 !== c.tagName && nb(c);
      c.innerHTML = lb(d);
      b = b.lastChild;
      for (var e = []; b.firstChild; ) e.push(b.removeChild(b.firstChild));
      return e;
    },
    Eb = function (a, b, c) {
      c = c || 100;
      for (var d = {}, e = 0; e < b.length; e++) d[b[e]] = !0;
      for (var f = a, g = 0; f && g <= c; g++) {
        if (d[String(f.tagName).toLowerCase()]) return f;
        f = f.parentElement;
      }
      return null;
    },
    Fb = function (a) {
      var b;
      try {
        b = ob.sendBeacon && ob.sendBeacon(a);
      } catch (c) {
        Xa("TAGGING", 15);
      }
      b || yb(a);
    },
    Gb = function (a, b) {
      var c = a[b];
      c && "string" === typeof c.animVal && (c = c.animVal);
      return c;
    },
    Hb = function () {
      var a = E.performance;
      if (a && pa(a.now)) return a.now();
    },
    Ib = function () {
      return E.performance || void 0;
    }; /*
 jQuery (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
  var Jb = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
    Kb = function (a) {
      if (null == a) return String(a);
      var b = Jb.exec(Object.prototype.toString.call(Object(a)));
      return b ? b[1].toLowerCase() : "object";
    },
    Lb = function (a, b) {
      return Object.prototype.hasOwnProperty.call(Object(a), b);
    },
    Mb = function (a) {
      if (!a || "object" != Kb(a) || a.nodeType || a == a.window) return !1;
      try {
        if (a.constructor && !Lb(a, "constructor") && !Lb(a.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (c) {
        return !1;
      }
      for (var b in a);
      return void 0 === b || Lb(a, b);
    },
    I = function (a, b) {
      var c = b || ("array" == Kb(a) ? [] : {}),
        d;
      for (d in a)
        if (Lb(a, d)) {
          var e = a[d];
          "array" == Kb(e)
            ? ("array" != Kb(c[d]) && (c[d] = []), (c[d] = I(e, c[d])))
            : Mb(e)
            ? (Mb(c[d]) || (c[d] = {}), (c[d] = I(e, c[d])))
            : (c[d] = e);
        }
      return c;
    };
  var Nb = function (a) {
    if (void 0 === a || ra(a) || Mb(a)) return !0;
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "function":
        return !0;
    }
    return !1;
  };
  var Ob = (function () {
    var a = function (b) {
      return {
        toString: function () {
          return b;
        },
      };
    };
    return {
      Zh: a("consent"),
      Xf: a("convert_case_to"),
      Yf: a("convert_false_to"),
      Zf: a("convert_null_to"),
      ag: a("convert_true_to"),
      cg: a("convert_undefined_to"),
      Nk: a("debug_mode_metadata"),
      Sa: a("function"),
      af: a("instance_name"),
      Si: a("live_only"),
      Ti: a("malware_disabled"),
      Ui: a("metadata"),
      Xi: a("original_activity_id"),
      Uk: a("original_vendor_template_id"),
      Tk: a("once_on_load"),
      Wi: a("once_per_event"),
      bh: a("once_per_load"),
      Vk: a("priority_override"),
      Wk: a("respected_consent_types"),
      gh: a("setup_tags"),
      sb: a("tag_id"),
      ih: a("teardown_tags"),
    };
  })();
  var kc;
  var lc = [],
    mc = [],
    nc = [],
    oc = [],
    pc = [],
    qc = {},
    rc,
    sc,
    uc = function () {
      var a = tc;
      sc = sc || a;
    },
    vc,
    wc = function (a, b) {
      var c = a["function"],
        d = b && b.event;
      if (!c) throw Error("Error: No function name given for function call.");
      var e = qc[c],
        f = {},
        g;
      for (g in a)
        a.hasOwnProperty(g) &&
          0 === g.indexOf("vtp_") &&
          (e && d && d.nh && d.nh(a[g]), (f[void 0 !== e ? g : g.substr(4)] = a[g]));
      e && d && d.mh && (f.vtp_gtmCachedValues = d.mh);
      if (b) {
        if (null == b.name) {
          var l;
          a: {
            var m = b.index;
            if (null == m) l = "";
            else {
              var n;
              switch (b.type) {
                case 2:
                  n = lc[m];
                  break;
                case 1:
                  n = oc[m];
                  break;
                default:
                  l = "";
                  break a;
              }
              var p = n && n[Ob.af];
              l = p ? String(p) : "";
            }
          }
          b.name = l;
        }
        e && ((f.vtp_gtmEntityIndex = b.index), (f.vtp_gtmEntityName = b.name));
      }
      return void 0 !== e ? e(f) : kc(c, f, b);
    },
    yc = function (a, b, c) {
      c = c || [];
      var d = {},
        e;
      for (e in a) a.hasOwnProperty(e) && (d[e] = xc(a[e], b, c));
      return d;
    },
    xc = function (a, b, c) {
      if (ra(a)) {
        var d;
        switch (a[0]) {
          case "function_id":
            return a[1];
          case "list":
            d = [];
            for (var e = 1; e < a.length; e++) d.push(xc(a[e], b, c));
            return d;
          case "macro":
            var f = a[1];
            if (c[f]) return;
            var g = lc[f];
            if (!g || b.xf(g)) return;
            c[f] = !0;
            var l = String(g[Ob.af]);
            try {
              var m = yc(g, b, c);
              m.vtp_gtmEventId = b.id;
              b.priorityId && (m.vtp_gtmPriorityId = b.priorityId);
              d = wc(m, { event: b, index: f, type: 2, name: l });
              vc && (d = vc.rj(d, m));
            } catch (x) {
              b.zh && b.zh(x, Number(f), l), (d = !1);
            }
            c[f] = !1;
            return d;
          case "map":
            d = {};
            for (var n = 1; n < a.length; n += 2) d[xc(a[n], b, c)] = xc(a[n + 1], b, c);
            return d;
          case "template":
            d = [];
            for (var p = !1, q = 1; q < a.length; q++) {
              var t = xc(a[q], b, c);
              sc && (p = p || t === sc.Ud);
              d.push(t);
            }
            return sc && p ? sc.sj(d) : d.join("");
          case "escape":
            d = xc(a[1], b, c);
            if (sc && ra(a[1]) && "macro" === a[1][0] && sc.Qj(a)) return sc.jk(d);
            d = String(d);
            for (var u = 2; u < a.length; u++) Pb[a[u]] && (d = Pb[a[u]](d));
            return d;
          case "tag":
            var r = a[1];
            if (!oc[r]) throw Error("Unable to resolve tag reference " + r + ".");
            return (d = { sh: a[2], index: r });
          case "zb":
            var v = { arg0: a[2], arg1: a[3], ignore_case: a[5] };
            v["function"] = a[1];
            var w = zc(v, b, c),
              y = !!a[4];
            return y || 2 !== w ? y !== (1 === w) : null;
          default:
            throw Error("Attempting to expand unknown Value type: " + a[0] + ".");
        }
      }
      return a;
    },
    zc = function (a, b, c) {
      try {
        return rc(yc(a, b, c));
      } catch (d) {
        JSON.stringify(a);
      }
      return 2;
    };
  var Cc = function (a) {
      function b(t) {
        for (var u = 0; u < t.length; u++) d[t[u]] = !0;
      }
      for (var c = [], d = [], e = Ac(a), f = 0; f < mc.length; f++) {
        var g = mc[f],
          l = Bc(g, e);
        if (l) {
          for (var m = g.add || [], n = 0; n < m.length; n++) c[m[n]] = !0;
          b(g.block || []);
        } else null === l && b(g.block || []);
      }
      for (var p = [], q = 0; q < oc.length; q++) c[q] && !d[q] && (p[q] = !0);
      return p;
    },
    Bc = function (a, b) {
      for (var c = a["if"] || [], d = 0; d < c.length; d++) {
        var e = b(c[d]);
        if (0 === e) return !1;
        if (2 === e) return null;
      }
      for (var f = a.unless || [], g = 0; g < f.length; g++) {
        var l = b(f[g]);
        if (2 === l) return null;
        if (1 === l) return !1;
      }
      return !0;
    },
    Ac = function (a) {
      var b = [];
      return function (c) {
        void 0 === b[c] && (b[c] = zc(nc[c], a));
        return b[c];
      };
    };
  var Dc = {
    rj: function (a, b) {
      b[Ob.Xf] && "string" === typeof a && (a = 1 == b[Ob.Xf] ? a.toLowerCase() : a.toUpperCase());
      b.hasOwnProperty(Ob.Zf) && null === a && (a = b[Ob.Zf]);
      b.hasOwnProperty(Ob.cg) && void 0 === a && (a = b[Ob.cg]);
      b.hasOwnProperty(Ob.ag) && !0 === a && (a = b[Ob.ag]);
      b.hasOwnProperty(Ob.Yf) && !1 === a && (a = b[Ob.Yf]);
      return a;
    },
  };
  var $c = /^[1-9a-zA-Z_-][1-9a-c][1-9a-v]\d$/;
  function ad(a, b) {
    return "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[(a << 2) | b];
  }
  var cd = function (a) {
      return bd ? F.querySelectorAll(a) : null;
    },
    dd = function (a, b) {
      if (!bd) return null;
      if (Element.prototype.closest)
        try {
          return a.closest(b);
        } catch (e) {
          return null;
        }
      var c =
          Element.prototype.matches ||
          Element.prototype.webkitMatchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector,
        d = a;
      if (!F.documentElement.contains(d)) return null;
      do {
        try {
          if (c.call(d, b)) return d;
        } catch (e) {
          break;
        }
        d = d.parentElement || d.parentNode;
      } while (null !== d && 1 === d.nodeType);
      return null;
    },
    ed = !1;
  if (F.querySelectorAll)
    try {
      var fd = F.querySelectorAll(":root");
      fd && 1 == fd.length && fd[0] == F.documentElement && (ed = !0);
    } catch (a) {}
  var bd = ed;
  var O = function (a) {
    Xa("GTM", a);
  };
  var P = {
      g: {
        F: "ad_storage",
        T: "analytics_storage",
        Sf: "region",
        Tf: "consent_updated",
        Uf: "wait_for_update",
        fi: "app_remove",
        gi: "app_store_refund",
        hi: "app_store_subscription_cancel",
        ii: "app_store_subscription_convert",
        ji: "app_store_subscription_renew",
        dg: "add_payment_info",
        eg: "add_shipping_info",
        sc: "add_to_cart",
        uc: "remove_from_cart",
        fg: "view_cart",
        Nb: "begin_checkout",
        vc: "select_item",
        vb: "view_item_list",
        Ob: "select_promotion",
        wb: "view_promotion",
        Ca: "purchase",
        wc: "refund",
        Ia: "view_item",
        gg: "add_to_wishlist",
        ki: "first_open",
        li: "first_visit",
        wa: "gtag.config",
        Da: "gtag.get",
        mi: "in_app_purchase",
        xc: "page_view",
        ni: "session_start",
        ze: "user_engagement",
        Pb: "gclid",
        da: "ads_data_redaction",
        Z: "allow_ad_personalization_signals",
        Ae: "allow_custom_scripts",
        oi: "allow_display_features",
        yc: "allow_enhanced_conversions",
        xb: "allow_google_signals",
        xa: "allow_interest_groups",
        zd: "auid",
        ri: "auto_detection_enabled",
        Xa: "aw_remarketing",
        Ad: "aw_remarketing_only",
        zc: "discount",
        Ac: "aw_feed_country",
        Bc: "aw_feed_language",
        aa: "items",
        Cc: "aw_merchant_id",
        hg: "aw_basket_type",
        Bd: "campaign_content",
        Cd: "campaign_id",
        Dd: "campaign_medium",
        Ed: "campaign_name",
        Dc: "campaign",
        Fd: "campaign_source",
        Gd: "campaign_term",
        pb: "client_id",
        si: "content_group",
        ui: "content_type",
        Ea: "conversion_cookie_prefix",
        Ec: "conversion_id",
        Ya: "conversion_label",
        ra: "conversion_linker",
        Be: "conversion_api",
        Za: "cookie_domain",
        Ja: "cookie_expires",
        ab: "cookie_flags",
        Fc: "cookie_name",
        Ce: "cookie_path",
        Qa: "cookie_prefix",
        yb: "cookie_update",
        Qb: "country",
        na: "currency",
        Gc: "customer_lifetime_value",
        Hc: "custom_map",
        vi: "debug_mode",
        ba: "developer_id",
        ig: "disable_merchant_reported_purchases",
        wi: "dc_custom_params",
        xi: "dc_natural_search",
        De: "dynamic_event_settings",
        yi: "affiliation",
        jg: "checkout_option",
        kg: "checkout_step",
        zi: "coupon",
        Ee: "item_list_name",
        Fe: "list_name",
        Ai: "promotions",
        Ic: "shipping",
        lg: "tax",
        Hd: "engagement_time_msec",
        Jc: "enhanced_client_id",
        Kc: "enhanced_conversions",
        mg: "enhanced_conversions_automatic_settings",
        Lc: "estimated_delivery_date",
        Ge: "euid_logged_in_state",
        Rb: "event_callback",
        Sb: "event_developer_id_string",
        ng: "event",
        Id: "event_settings",
        Jd: "event_timeout",
        Bi: "experiments",
        He: "firebase_id",
        Kd: "first_party_collection",
        Ld: "_x_20",
        zb: "_x_19",
        og: "fledge",
        pg: "flight_error_code",
        qg: "flight_error_message",
        rg: "gac_gclid",
        Md: "gac_wbraid",
        sg: "gac_wbraid_multiple_conversions",
        Ie: "ga_restrict_domain",
        Je: "ga_temp_client_id",
        ug: "gdpr_applies",
        vg: "geo_granularity",
        cb: "value_callback",
        Ra: "value_key",
        Tb: "global_developer_id_string",
        Ok: "google_ono",
        eb: "google_signals",
        Mc: "google_tld",
        Nd: "groups",
        wg: "gsa_experiment_id",
        xg: "iframe_state",
        Od: "ignore_referrer",
        Ke: "internal_traffic_results",
        Pd: "is_legacy_loaded",
        yg: "is_passthrough",
        Ka: "language",
        Le: "legacy_developer_id_string",
        sa: "linker",
        Ub: "accept_incoming",
        Ab: "decorate_forms",
        N: "domains",
        Vb: "url_position",
        zg: "method",
        Wb: "new_customer",
        Ag: "non_interaction",
        Ci: "optimize_id",
        La: "page_location",
        Me: "page_path",
        Ma: "page_referrer",
        Xb: "page_title",
        Bg: "passengers",
        Cg: "phone_conversion_callback",
        Di: "phone_conversion_country_code",
        Dg: "phone_conversion_css_class",
        Ei: "phone_conversion_ids",
        Eg: "phone_conversion_number",
        Fg: "phone_conversion_options",
        Gg: "quantity",
        Nc: "redact_device_info",
        Ne: "redact_enhanced_user_id",
        Fi: "redact_ga_client_id",
        Gi: "redact_user_id",
        Qd: "referral_exclusion_definition",
        qb: "restricted_data_processing",
        Hi: "retoken",
        Hg: "screen_name",
        Bb: "screen_resolution",
        Ii: "search_term",
        ya: "send_page_view",
        Cb: "send_to",
        Oc: "session_duration",
        Rd: "session_engaged",
        Oe: "session_engaged_time",
        rb: "session_id",
        Sd: "session_number",
        Yb: "delivery_postal_code",
        Ig: "tc_privacy_string",
        Jg: "temporary_client_id",
        Ji: "tracking_id",
        Pe: "traffic_type",
        Fa: "transaction_id",
        oa: "transport_url",
        Kg: "trip_type",
        Pc: "update",
        fb: "url_passthrough",
        Qe: "_user_agent_architecture",
        Re: "_user_agent_bitness",
        Se: "_user_agent_full_version_list",
        Lg: "_user_agent_mobile",
        Te: "_user_agent_model",
        Ue: "_user_agent_platform",
        Ve: "_user_agent_platform_version",
        Mg: "_user_agent_wait",
        We: "_user_agent_wow64",
        fa: "user_data",
        Ng: "user_data_auto_latency",
        Og: "user_data_auto_meta",
        Pg: "user_data_auto_multi",
        Qg: "user_data_auto_selectors",
        Rg: "user_data_auto_status",
        Sg: "user_data_mode",
        Xe: "user_data_settings",
        va: "user_id",
        Na: "user_properties",
        Tg: "us_privacy_string",
        la: "value",
        Td: "wbraid",
        Ug: "wbraid_multiple_conversions",
        Xg: "_host_name",
        Yg: "_in_page_command",
        bf: "_is_linker_valid",
        Zg: "_is_passthrough_cid",
        ah: "non_personalized_ads",
        Tc: "_sst_parameters",
      },
    },
    Gd = {},
    Hd = Object.freeze(
      ((Gd[P.g.Z] = 1),
      (Gd[P.g.yc] = 1),
      (Gd[P.g.xb] = 1),
      (Gd[P.g.aa] = 1),
      (Gd[P.g.Za] = 1),
      (Gd[P.g.Ja] = 1),
      (Gd[P.g.ab] = 1),
      (Gd[P.g.Fc] = 1),
      (Gd[P.g.Ce] = 1),
      (Gd[P.g.Qa] = 1),
      (Gd[P.g.yb] = 1),
      (Gd[P.g.Hc] = 1),
      (Gd[P.g.ba] = 1),
      (Gd[P.g.De] = 1),
      (Gd[P.g.Rb] = 1),
      (Gd[P.g.Id] = 1),
      (Gd[P.g.Jd] = 1),
      (Gd[P.g.Kd] = 1),
      (Gd[P.g.Ie] = 1),
      (Gd[P.g.eb] = 1),
      (Gd[P.g.Mc] = 1),
      (Gd[P.g.Nd] = 1),
      (Gd[P.g.Ke] = 1),
      (Gd[P.g.Pd] = 1),
      (Gd[P.g.sa] = 1),
      (Gd[P.g.Ne] = 1),
      (Gd[P.g.Qd] = 1),
      (Gd[P.g.qb] = 1),
      (Gd[P.g.ya] = 1),
      (Gd[P.g.Cb] = 1),
      (Gd[P.g.Oc] = 1),
      (Gd[P.g.Oe] = 1),
      (Gd[P.g.Yb] = 1),
      (Gd[P.g.oa] = 1),
      (Gd[P.g.Pc] = 1),
      (Gd[P.g.Xe] = 1),
      (Gd[P.g.Na] = 1),
      (Gd[P.g.Tc] = 1),
      Gd),
    );
  Object.freeze([P.g.La, P.g.Ma, P.g.Xb, P.g.Ka, P.g.Hg, P.g.va, P.g.He, P.g.si]);
  var Id = {},
    Jd = Object.freeze(
      ((Id[P.g.fi] = 1),
      (Id[P.g.gi] = 1),
      (Id[P.g.hi] = 1),
      (Id[P.g.ii] = 1),
      (Id[P.g.ji] = 1),
      (Id[P.g.ki] = 1),
      (Id[P.g.li] = 1),
      (Id[P.g.mi] = 1),
      (Id[P.g.ni] = 1),
      (Id[P.g.ze] = 1),
      Id),
    ),
    Kd = {},
    Ld = Object.freeze(
      ((Kd[P.g.dg] = 1),
      (Kd[P.g.eg] = 1),
      (Kd[P.g.sc] = 1),
      (Kd[P.g.uc] = 1),
      (Kd[P.g.fg] = 1),
      (Kd[P.g.Nb] = 1),
      (Kd[P.g.vc] = 1),
      (Kd[P.g.vb] = 1),
      (Kd[P.g.Ob] = 1),
      (Kd[P.g.wb] = 1),
      (Kd[P.g.Ca] = 1),
      (Kd[P.g.wc] = 1),
      (Kd[P.g.Ia] = 1),
      (Kd[P.g.gg] = 1),
      Kd),
    ),
    Md = Object.freeze([P.g.Z, P.g.xb, P.g.yb]),
    Nd = Object.freeze([].concat(Md)),
    Od = Object.freeze([P.g.Ja, P.g.Jd, P.g.Oc, P.g.Oe, P.g.Hd]),
    Pd = Object.freeze([].concat(Od)),
    Qd = {},
    Sd = ((Qd[P.g.F] = "1"), (Qd[P.g.T] = "2"), Qd),
    Td = {},
    Ud = Object.freeze(
      ((Td[P.g.Z] = 1),
      (Td[P.g.yc] = 1),
      (Td[P.g.xa] = 1),
      (Td[P.g.Xa] = 1),
      (Td[P.g.Ad] = 1),
      (Td[P.g.zc] = 1),
      (Td[P.g.Ac] = 1),
      (Td[P.g.Bc] = 1),
      (Td[P.g.aa] = 1),
      (Td[P.g.Cc] = 1),
      (Td[P.g.Ea] = 1),
      (Td[P.g.ra] = 1),
      (Td[P.g.Za] = 1),
      (Td[P.g.Ja] = 1),
      (Td[P.g.ab] = 1),
      (Td[P.g.Qa] = 1),
      (Td[P.g.na] = 1),
      (Td[P.g.Gc] = 1),
      (Td[P.g.ba] = 1),
      (Td[P.g.ig] = 1),
      (Td[P.g.Kc] = 1),
      (Td[P.g.Lc] = 1),
      (Td[P.g.He] = 1),
      (Td[P.g.Kd] = 1),
      (Td[P.g.Pd] = 1),
      (Td[P.g.Ka] = 1),
      (Td[P.g.Wb] = 1),
      (Td[P.g.La] = 1),
      (Td[P.g.Ma] = 1),
      (Td[P.g.Cg] = 1),
      (Td[P.g.Dg] = 1),
      (Td[P.g.Eg] = 1),
      (Td[P.g.Fg] = 1),
      (Td[P.g.qb] = 1),
      (Td[P.g.ya] = 1),
      (Td[P.g.Cb] = 1),
      (Td[P.g.Yb] = 1),
      (Td[P.g.Fa] = 1),
      (Td[P.g.oa] = 1),
      (Td[P.g.Pc] = 1),
      (Td[P.g.fb] = 1),
      (Td[P.g.fa] = 1),
      (Td[P.g.va] = 1),
      (Td[P.g.la] = 1),
      Td),
    );
  Object.freeze(P.g);
  var Vd = {},
    Wd = (E.google_tag_manager = E.google_tag_manager || {}),
    Xd = Math.random();
  Vd.Sc = "1a1";
  Vd.ff = Number("0") || 0;
  Vd.ja = "dataLayer";
  Vd.bi = "ChAIgPz+nQYQyrn11KPR9PJIEicAlqrcZRmZhmOhU4awUDSSQq15+TqmYzWFEsZ/MUG4kDtxFP/PtMgaAlia";
  var Yd = {
      __cl: !0,
      __ecl: !0,
      __ehl: !0,
      __evl: !0,
      __fal: !0,
      __fil: !0,
      __fsl: !0,
      __hl: !0,
      __jel: !0,
      __lcl: !0,
      __sdl: !0,
      __tl: !0,
      __ytl: !0,
    },
    Zd = { __paused: !0, __tg: !0 },
    $d;
  for ($d in Yd) Yd.hasOwnProperty($d) && (Zd[$d] = !0);
  var ae = Ba(""),
    be = Ba(""),
    ce,
    de = !1;
  de = !0;
  ce = de;
  var ee,
    fe = !1;
  ee = fe;
  var ge,
    he = !1;
  ge = he;
  var ie,
    je = !1;
  ie = je;
  Vd.yd = "www.googletagmanager.com";
  var ke = "" + Vd.yd + (ce ? "/gtag/js" : "/gtm.js"),
    le = null,
    me = null,
    ne = {},
    oe = {},
    pe = {},
    qe = function () {
      var a = Wd.sequence || 1;
      Wd.sequence = a + 1;
      return a;
    };
  Vd.ai = "";
  var re = "";
  Vd.Yd = re;
  var se = new ua(),
    te = {},
    ue = {},
    xe = {
      name: Vd.ja,
      set: function (a, b) {
        I(Ka(a, b), te);
        ve();
      },
      get: function (a) {
        return we(a, 2);
      },
      reset: function () {
        se = new ua();
        te = {};
        ve();
      },
    },
    we = function (a, b) {
      return 2 != b ? se.get(a) : ye(a);
    },
    ye = function (a) {
      var b,
        c = a.split(".");
      b = b || [];
      for (var d = te, e = 0; e < c.length; e++) {
        if (null === d) return !1;
        if (void 0 === d) break;
        d = d[c[e]];
        if (-1 !== b.indexOf(d)) return;
      }
      return d;
    },
    ze = function (a, b) {
      ue.hasOwnProperty(a) || (se.set(a, b), I(Ka(a, b), te), ve());
    },
    ve = function (a) {
      k(ue, function (b, c) {
        se.set(b, c);
        I(Ka(b), te);
        I(Ka(b, c), te);
        a && delete ue[b];
      });
    },
    Ae = function (a, b) {
      var c,
        d = 1 !== (void 0 === b ? 2 : b) ? ye(a) : se.get(a);
      "array" === Kb(d) || "object" === Kb(d) ? (c = I(d)) : (c = d);
      return c;
    };
  var Be,
    Ce = !1,
    De = function (a) {
      if (!Ce) {
        Ce = !0;
        Be = Be || {};
      }
      return Be[a];
    };
  var Ee = function () {
      var a = E.screen;
      return { width: a ? a.width : 0, height: a ? a.height : 0 };
    },
    Fe = function (a) {
      if (F.hidden) return !0;
      var b = a.getBoundingClientRect();
      if (b.top == b.bottom || b.left == b.right || !E.getComputedStyle) return !0;
      var c = E.getComputedStyle(a, null);
      if ("hidden" === c.visibility) return !0;
      for (var d = a, e = c; d; ) {
        if ("none" === e.display) return !0;
        var f = e.opacity,
          g = e.filter;
        if (g) {
          var l = g.indexOf("opacity(");
          0 <= l &&
            ((g = g.substring(l + 8, g.indexOf(")", l))),
            "%" == g.charAt(g.length - 1) && (g = g.substring(0, g.length - 1)),
            (f = Math.min(g, f)));
        }
        if (void 0 !== f && 0 >= f) return !0;
        (d = d.parentElement) && (e = E.getComputedStyle(d, null));
      }
      return !1;
    };
  var Oe = /:[0-9]+$/,
    Pe = function (a, b, c) {
      for (var d = a.split("&"), e = 0; e < d.length; e++) {
        var f = d[e].split("=");
        if (decodeURIComponent(f[0]).replace(/\+/g, " ") === b) {
          var g = f.slice(1).join("=");
          return c ? g : decodeURIComponent(g).replace(/\+/g, " ");
        }
      }
    },
    Ue = function (a, b, c, d, e) {
      b && (b = String(b).toLowerCase());
      if ("protocol" === b || "port" === b) a.protocol = Qe(a.protocol) || Qe(E.location.protocol);
      "port" === b
        ? (a.port = String(
            Number(a.hostname ? a.port : E.location.port) ||
              ("http" === a.protocol ? 80 : "https" === a.protocol ? 443 : ""),
          ))
        : "host" === b && (a.hostname = (a.hostname || E.location.hostname).replace(Oe, "").toLowerCase());
      return Te(a, b, c, d, e);
    },
    Te = function (a, b, c, d, e) {
      var f,
        g = Qe(a.protocol);
      b && (b = String(b).toLowerCase());
      switch (b) {
        case "url_no_fragment":
          f = Ve(a);
          break;
        case "protocol":
          f = g;
          break;
        case "host":
          f = a.hostname.replace(Oe, "").toLowerCase();
          if (c) {
            var l = /^www\d*\./.exec(f);
            l && l[0] && (f = f.substr(l[0].length));
          }
          break;
        case "port":
          f = String(Number(a.port) || ("http" === g ? 80 : "https" === g ? 443 : ""));
          break;
        case "path":
          a.pathname || a.hostname || Xa("TAGGING", 1);
          f = "/" === a.pathname.substr(0, 1) ? a.pathname : "/" + a.pathname;
          var m = f.split("/");
          0 <= (d || []).indexOf(m[m.length - 1]) && (m[m.length - 1] = "");
          f = m.join("/");
          break;
        case "query":
          f = a.search.replace("?", "");
          e && (f = Pe(f, e));
          break;
        case "extension":
          var n = a.pathname.split(".");
          f = 1 < n.length ? n[n.length - 1] : "";
          f = f.split("/")[0];
          break;
        case "fragment":
          f = a.hash.replace("#", "");
          break;
        default:
          f = a && a.href;
      }
      return f;
    },
    Qe = function (a) {
      return a ? a.replace(":", "").toLowerCase() : "";
    },
    Ve = function (a) {
      var b = "";
      if (a && a.href) {
        var c = a.href.indexOf("#");
        b = 0 > c ? a.href : a.href.substr(0, c);
      }
      return b;
    },
    We = function (a) {
      var b = F.createElement("a");
      a && (b.href = a);
      var c = b.pathname;
      "/" !== c[0] && (a || Xa("TAGGING", 1), (c = "/" + c));
      var d = b.hostname.replace(Oe, "");
      return {
        href: b.href,
        protocol: b.protocol,
        host: b.host,
        hostname: d,
        pathname: c,
        search: b.search,
        hash: b.hash,
        port: b.port,
      };
    },
    Xe = function (a) {
      function b(n) {
        var p = n.split("=")[0];
        return 0 > d.indexOf(p) ? n : p + "=0";
      }
      function c(n) {
        return n
          .split("&")
          .map(b)
          .filter(function (p) {
            return void 0 !== p;
          })
          .join("&");
      }
      var d = "gclid dclid gbraid wbraid gclaw gcldc gclha gclgf gclgb _gl".split(" "),
        e = We(a),
        f = a.split(/[?#]/)[0],
        g = e.search,
        l = e.hash;
      "?" === g[0] && (g = g.substring(1));
      "#" === l[0] && (l = l.substring(1));
      g = c(g);
      l = c(l);
      "" !== g && (g = "?" + g);
      "" !== l && (l = "#" + l);
      var m = "" + f + g + l;
      "/" === m[m.length - 1] && (m = m.substring(0, m.length - 1));
      return m;
    };
  var Ye = {};
  var Af = {},
    Bf = function (a, b) {
      if (E._gtmexpgrp && E._gtmexpgrp.hasOwnProperty(a)) return E._gtmexpgrp[a];
      void 0 === Af[a] && (Af[a] = Math.floor(Math.random() * b));
      return Af[a];
    };
  var Df = { pf: "SG", qk: "" };
  var Ef = new (function (a, b) {
    this.h = a;
    this.defaultValue = void 0 === b ? !1 : b;
  })(1933);
  var Ff = function (a) {
    Ff[" "](a);
    return a;
  };
  Ff[" "] = function () {};
  var Hf = function () {
    var a = Gf,
      b = "vf";
    if (a.vf && a.hasOwnProperty(b)) return a.vf;
    var c = new a();
    return (a.vf = c);
  };
  var Gf = function () {
    var a = {};
    this.h = function () {
      var b = Ef.h,
        c = Ef.defaultValue;
      return null != a[b] ? a[b] : c;
    };
    this.m = function () {
      a[Ef.h] = !0;
    };
  };
  var If = [];
  function Jf() {
    var a = qb("google_tag_data", {});
    a.ics ||
      (a.ics = {
        entries: {},
        set: Kf,
        update: Lf,
        addListener: Mf,
        notifyListeners: Nf,
        active: !1,
        usedDefault: !1,
        usedUpdate: !1,
        accessedDefault: !1,
        accessedAny: !1,
        wasSetLate: !1,
      });
    return a.ics;
  }
  function Kf(a, b, c, d, e, f) {
    var g = Jf();
    g.usedDefault || (!g.accessedDefault && !g.accessedAny) || (g.wasSetLate = !0);
    g.active = !0;
    g.usedDefault = !0;
    if (void 0 != b) {
      var l = g.entries,
        m = l[a] || {},
        n = m.region,
        p = c && h(c) ? c.toUpperCase() : void 0;
      d = d.toUpperCase();
      e = e.toUpperCase();
      if ("" === d || p === e || (p === d ? n !== e : !p && !n)) {
        var q = !!(f && 0 < f && void 0 === m.update),
          t = { region: p, initial: "granted" === b, update: m.update, quiet: q };
        if ("" !== d || !1 !== m.initial) l[a] = t;
        q &&
          E.setTimeout(function () {
            l[a] === t && t.quiet && ((t.quiet = !1), Of(a), Nf(), Xa("TAGGING", 2));
          }, f);
      }
    }
  }
  function Lf(a, b) {
    var c = Jf();
    c.usedDefault || c.usedUpdate || !c.accessedAny || (c.wasSetLate = !0);
    c.active = !0;
    c.usedUpdate = !0;
    if (void 0 != b) {
      var d = Pf(c, a),
        e = c.entries,
        f = (e[a] = e[a] || {});
      f.update = "granted" === b;
      var g = Pf(c, a);
      f.quiet ? ((f.quiet = !1), Of(a)) : g !== d && Of(a);
    }
  }
  function Mf(a, b) {
    If.push({ lf: a, Aj: b });
  }
  function Of(a) {
    for (var b = 0; b < If.length; ++b) {
      var c = If[b];
      ra(c.lf) && -1 !== c.lf.indexOf(a) && (c.Eh = !0);
    }
  }
  function Nf(a, b) {
    for (var c = 0; c < If.length; ++c) {
      var d = If[c];
      if (d.Eh) {
        d.Eh = !1;
        try {
          d.Aj({ consentEventId: a, consentPriorityId: b });
        } catch (e) {}
      }
    }
  }
  function Pf(a, b) {
    var c = a.entries[b] || {};
    return void 0 !== c.update ? c.update : c.initial;
  }
  var Qf = function (a) {
      var b = Jf();
      b.accessedAny = !0;
      return Pf(b, a);
    },
    Rf = function (a) {
      var b = Jf();
      b.accessedDefault = !0;
      return (b.entries[a] || {}).initial;
    },
    Sf = function (a) {
      var b = Jf();
      b.accessedAny = !0;
      return !(b.entries[a] || {}).quiet;
    },
    Tf = function () {
      if (!Hf().h()) return !1;
      var a = Jf();
      a.accessedAny = !0;
      return a.active;
    },
    Uf = function () {
      var a = Jf();
      a.accessedDefault = !0;
      return a.usedDefault;
    },
    Vf = function (a, b) {
      Jf().addListener(a, b);
    },
    Wf = function (a, b) {
      Jf().notifyListeners(a, b);
    },
    Xf = function (a, b) {
      function c() {
        for (var e = 0; e < b.length; e++) if (!Sf(b[e])) return !0;
        return !1;
      }
      if (c()) {
        var d = !1;
        Vf(b, function (e) {
          d || c() || ((d = !0), a(e));
        });
      } else a({});
    },
    Yf = function (a, b) {
      function c() {
        for (var f = [], g = 0; g < d.length; g++) {
          var l = d[g];
          !1 === Qf(l) || e[l] || (f.push(l), (e[l] = !0));
        }
        return f;
      }
      var d = h(b) ? [b] : b,
        e = {};
      c().length !== d.length &&
        Vf(d, function (f) {
          var g = c();
          0 < g.length && ((f.lf = g), a(f));
        });
    };
  function Zf() {}
  function $f() {}
  function ag(a) {
    for (var b = [], c = 0; c < bg.length; c++) {
      var d = a(bg[c]);
      b[c] = !0 === d ? "1" : !1 === d ? "0" : "-";
    }
    return b.join("");
  }
  var bg = [P.g.F, P.g.T],
    cg = function (a) {
      var b = a[P.g.Sf];
      b && O(40);
      var c = a[P.g.Uf];
      c && O(41);
      for (var d = ra(b) ? b : [b], e = { nc: 0 }; e.nc < d.length; e = { nc: e.nc }, ++e.nc)
        k(
          a,
          (function (f) {
            return function (g, l) {
              if (g !== P.g.Sf && g !== P.g.Uf) {
                var m = d[f.nc],
                  n = Df.pf,
                  p = Df.qk;
                Jf().set(g, l, m, n, p, c);
              }
            };
          })(e),
        );
    },
    dg = function (a, b) {
      k(a, function (c, d) {
        Jf().update(c, d);
      });
      Wf(b.eventId, b.priorityId);
    },
    eg = function (a) {
      var b = Qf(a);
      return void 0 != b ? b : !0;
    },
    fg = function () {
      return "G1" + ag(Qf);
    },
    gg = function () {
      return "G1" + ag(Rf);
    },
    hg = function (a, b) {
      Yf(a, b);
    },
    ig = function (a, b) {
      Xf(a, b);
    };
  var jg = [];
  jg[7] = !0;
  jg[9] = !0;
  jg[27] = !0;
  jg[6] = !0;
  jg[10] = !0;
  jg[12] = !0;
  jg[11] = !0;
  jg[13] = !0;
  jg[15] = !0;
  jg[23] = !0;
  jg[29] = !0;
  jg[35] = !0;
  jg[36] = !0;
  jg[38] = !0;
  jg[43] = !0;
  jg[44] = !0;
  a: {
    for (var kg, lg, mg = 0; kg === lg; )
      if (((kg = Math.floor(2 * Math.random())), (lg = Math.floor(2 * Math.random())), mg++, 20 < mg)) break a;
    kg ? (jg[46] = !0) : (jg[47] = !0);
  }
  jg[54] = !0;
  jg[57] = !0;
  jg[60] = !0;
  jg[63] = !0;

  var Q = function (a) {
    return !!jg[a];
  };
  var ng = function (a) {
    var b = 1,
      c,
      d,
      e;
    if (a)
      for (b = 0, d = a.length - 1; 0 <= d; d--)
        (e = a.charCodeAt(d)),
          (b = ((b << 6) & 268435455) + e + (e << 14)),
          (c = b & 266338304),
          (b = 0 !== c ? b ^ (c >> 21) : b);
    return b;
  };
  var og = function (a, b, c) {
    for (var d = [], e = b.split(";"), f = 0; f < e.length; f++) {
      var g = e[f].split("="),
        l = g[0].replace(/^\s*|\s*$/g, "");
      if (l && l == a) {
        var m = g
          .slice(1)
          .join("=")
          .replace(/^\s*|\s*$/g, "");
        m && c && (m = decodeURIComponent(m));
        d.push(m);
      }
    }
    return d;
  };
  var pg = function (a, b) {
      var c = function () {};
      c.prototype = a.prototype;
      var d = new c();
      a.apply(d, Array.prototype.slice.call(arguments, 1));
      return d;
    },
    qg = function (a) {
      var b = a;
      return function () {
        if (b) {
          var c = b;
          b = null;
          c();
        }
      };
    };
  function rg(a) {
    return "null" !== a.origin;
  }
  var ug = function (a, b, c, d) {
      return sg(d) ? og(a, String(b || tg()), c) : [];
    },
    xg = function (a, b, c, d, e) {
      if (sg(e)) {
        var f = vg(a, d, e);
        if (1 === f.length) return f[0].id;
        if (0 !== f.length) {
          f = wg(
            f,
            function (g) {
              return g.ee;
            },
            b,
          );
          if (1 === f.length) return f[0].id;
          f = wg(
            f,
            function (g) {
              return g.kd;
            },
            c,
          );
          return f[0] ? f[0].id : void 0;
        }
      }
    };
  function yg(a, b, c, d) {
    var e = tg(),
      f = window;
    rg(f) && (f.document.cookie = a);
    var g = tg();
    return e != g || (void 0 != c && 0 <= ug(b, g, !1, d).indexOf(c));
  }
  var Cg = function (a, b, c) {
      function d(u, r, v) {
        if (null == v) return delete g[r], u;
        g[r] = v;
        return u + "; " + r + "=" + v;
      }
      function e(u, r) {
        if (null == r) return delete g[r], u;
        g[r] = !0;
        return u + "; " + r;
      }
      if (!sg(c.jb)) return 2;
      var f;
      void 0 == b
        ? (f = a + "=deleted; expires=" + new Date(0).toUTCString())
        : (c.encode && (b = encodeURIComponent(b)), (b = zg(b)), (f = a + "=" + b));
      var g = {};
      f = d(f, "path", c.path);
      var l;
      c.expires instanceof Date ? (l = c.expires.toUTCString()) : null != c.expires && (l = "" + c.expires);
      f = d(f, "expires", l);
      f = d(f, "max-age", c.bl);
      f = d(f, "samesite", c.fl);
      c.il && (f = e(f, "secure"));
      var m = c.domain;
      if (m && "auto" === m.toLowerCase()) {
        for (var n = Ag(), p = 0; p < n.length; ++p) {
          var q = "none" !== n[p] ? n[p] : void 0,
            t = d(f, "domain", q);
          t = e(t, c.flags);
          if (!Bg(q, c.path) && yg(t, a, b, c.jb)) return 0;
        }
        return 1;
      }
      m && "none" !== m.toLowerCase() && (f = d(f, "domain", m));
      f = e(f, c.flags);
      return Bg(m, c.path) ? 1 : yg(f, a, b, c.jb) ? 0 : 1;
    },
    Dg = function (a, b, c) {
      null == c.path && (c.path = "/");
      c.domain || (c.domain = "auto");
      return Cg(a, b, c);
    };
  function wg(a, b, c) {
    for (var d = [], e = [], f, g = 0; g < a.length; g++) {
      var l = a[g],
        m = b(l);
      m === c ? d.push(l) : void 0 === f || m < f ? ((e = [l]), (f = m)) : m === f && e.push(l);
    }
    return 0 < d.length ? d : e;
  }
  function vg(a, b, c) {
    for (var d = [], e = ug(a, void 0, void 0, c), f = 0; f < e.length; f++) {
      var g = e[f].split("."),
        l = g.shift();
      if (!b || -1 !== b.indexOf(l)) {
        var m = g.shift();
        m && ((m = m.split("-")), d.push({ id: g.join("."), ee: 1 * m[0] || 1, kd: 1 * m[1] || 1 }));
      }
    }
    return d;
  }
  var zg = function (a) {
      a && 1200 < a.length && (a = a.substring(0, 1200));
      return a;
    },
    Eg = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    Fg = /(^|\.)doubleclick\.net$/i,
    Bg = function (a, b) {
      return Fg.test(window.document.location.hostname) || ("/" === b && Eg.test(a));
    },
    tg = function () {
      return rg(window) ? window.document.cookie : "";
    },
    Ag = function () {
      var a = [],
        b = window.document.location.hostname.split(".");
      if (4 === b.length) {
        var c = b[b.length - 1];
        if (parseInt(c, 10).toString() === c) return ["none"];
      }
      for (var d = b.length - 2; 0 <= d; d--) a.push(b.slice(d).join("."));
      var e = window.document.location.hostname;
      Fg.test(e) || Eg.test(e) || a.push("none");
      return a;
    },
    sg = function (a) {
      if (!Hf().h() || !a || !Tf()) return !0;
      if (!Sf(a)) return !1;
      var b = Qf(a);
      return null == b ? !0 : !!b;
    };
  var Gg = function (a) {
      var b = Math.round(2147483647 * Math.random());
      return a ? String(b ^ (ng(a) & 2147483647)) : String(b);
    },
    Hg = function (a) {
      return [Gg(a), Math.round(z() / 1e3)].join(".");
    },
    Rg = function (a, b, c, d, e) {
      var f = Pg(b);
      return xg(a, f, Qg(c), d, e);
    },
    Sg = function (a, b, c, d) {
      var e = "" + Pg(c),
        f = Qg(d);
      1 < f && (e += "-" + f);
      return [b, e, a].join(".");
    },
    Pg = function (a) {
      if (!a) return 1;
      a = 0 === a.indexOf(".") ? a.substr(1) : a;
      return a.split(".").length;
    },
    Qg = function (a) {
      if (!a || "/" === a) return 1;
      "/" !== a[0] && (a = "/" + a);
      "/" !== a[a.length - 1] && (a += "/");
      return a.split("/").length - 1;
    };
  var Tg = function () {
    Wd.dedupe_gclid || (Wd.dedupe_gclid = "" + Hg());
    return Wd.dedupe_gclid;
  };
  var Ug = function () {
    var a = !1;
    return a;
  };
  var S = { H: "UA-145719737-3", ob: "" },
    Vg = { Bh: "UA-145719737-3", Ch: "UA-145719737-3" };
  S.cf = Ba("");
  var Wg = function () {
      return Vg.Bh ? Vg.Bh.split("|") : [S.H];
    },
    Xg = function () {
      return Vg.Ch ? Vg.Ch.split("|") : [];
    },
    Yg = function () {
      this.container = {};
      this.destination = {};
      this.canonical = {};
    },
    $g = function () {
      for (var a = Zg(), b = Wg(), c = 0; c < b.length; c++) {
        var d = a.container[b[c]];
        !d || qa(d) ? (a.container[b[c]] = { state: 2 }) : (d.state = 2);
      }
      for (var e = Xg(), f = 0; f < e.length; f++) {
        var g = a.destination[e[f]];
        g && 0 === g.state && O(93);
        g ? (g.state = 2) : (a.destination[e[f]] = { state: 2 });
      }
      a.canonical[S.ob] = 2;
    },
    ah = function (a) {
      return !!Zg().container[a];
    },
    bh = function () {
      var a = Zg().container,
        b;
      for (b in a)
        if (a.hasOwnProperty(b)) {
          var c = a[b];
          if (qa(c)) {
            if (1 === c) return !0;
          } else if (1 === c.state) return !0;
        }
      return !1;
    },
    ch = function () {
      var a = {};
      k(Zg().destination, function (b, c) {
        0 === c.state && (a[b] = c);
      });
      return a;
    };
  function Zg() {
    var a = Wd.tidr;
    a || ((a = new Yg()), (Wd.tidr = a));
    return a;
  }
  var dh = { "": "n", UA: "u", AW: "a", DC: "d", G: "e", GF: "f", GT: "t", HA: "h", MC: "m", GTM: "g", OPT: "o" },
    eh = { UA: 1, AW: 2, DC: 3, G: 4, GF: 5, GT: 12, GTM: 14, HA: 6, MC: 7 },
    fh = function (a) {
      var b = S.H.split("-"),
        c = b[0].toUpperCase();
      if (Q(45)) {
        var d = {};
        d.tj = S.H;
        d.uk = Vd.ff;
        d.yk = Vd.Sc;
        d.Zj = S.cf ? 2 : 1;
        ce ? ((d.te = eh[c]), d.te || (d.te = 0)) : (d.te = ie ? 13 : 10);
        ge ? (d.Cf = 1) : Ug() ? (d.Cf = 2) : (d.Cf = 3);
        var e;
        var f = d.te,
          g = d.Cf;
        void 0 === f
          ? (e = "")
          : (g || (g = 0),
            (e = "" + ad(1, 1) + "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[(f << 2) | g]));
        var l = d.Xk,
          m = 4 + e + (l ? "" + ad(2, 1) + "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[l] : ""),
          n,
          p = d.yk;
        n = p && $c.test(p) ? "" + ad(3, 2) + p : "";
        var q,
          t = d.uk;
        q = t ? "" + ad(4, 1) + "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[t] : "";
        var u;
        var r = d.tj;
        if (r && a) {
          var v = r.split("-"),
            w = v[0].toUpperCase();
          if ("GTM" !== w && "OPT" !== w) u = "";
          else {
            var y = v[1];
            u =
              "" +
              ad(5, 3) +
              "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[1 + y.length] +
              (d.Zj || 0) +
              y;
          }
        } else u = "";
        return m + n + q + u;
      }
      var x = dh[c] || "i",
        A = a && "GTM" === c ? b[1] : "OPT" === c ? b[1] : "",
        B = "w";
      ce && (B = Ug() ? "s" : "o");
      ee
        ? ("w" === B && (B = "x"), "o" === B && (B = "q"))
        : ge
        ? ("w" === B && (B = "y"), "o" === B && (B = "r"))
        : ie && (B = "z");
      return "2" + B + x + (4 === Vd.Sc.length ? Vd.Sc.slice(1) : Vd.Sc) + A;
    };
  function gh(a, b) {
    if ("" === a) return b;
    var c = Number(a);
    return isNaN(c) ? b : c;
  }
  var hh = function (a, b, c) {
    a.addEventListener && a.addEventListener(b, c, !1);
  };
  function ih() {
    return gb("iPhone") && !gb("iPod") && !gb("iPad");
  }
  function jh() {
    ih() || gb("iPad") || gb("iPod");
  }
  gb("Opera");
  gb("Trident") || gb("MSIE");
  gb("Edge");
  !gb("Gecko") ||
    (-1 != fb().toLowerCase().indexOf("webkit") && !gb("Edge")) ||
    gb("Trident") ||
    gb("MSIE") ||
    gb("Edge");
  -1 != fb().toLowerCase().indexOf("webkit") && !gb("Edge") && gb("Mobile");
  gb("Macintosh");
  gb("Windows");
  gb("Linux") || gb("CrOS");
  var kh = ma.navigator || null;
  kh && (kh.appVersion || "").indexOf("X11");
  gb("Android");
  ih();
  gb("iPad");
  gb("iPod");
  jh();
  fb().toLowerCase().indexOf("kaios");
  var lh = function (a, b, c, d) {
      for (var e = b, f = c.length; 0 <= (e = a.indexOf(c, e)) && e < d; ) {
        var g = a.charCodeAt(e - 1);
        if (38 == g || 63 == g) {
          var l = a.charCodeAt(e + f);
          if (!l || 61 == l || 38 == l || 35 == l) return e;
        }
        e += f + 1;
      }
      return -1;
    },
    mh = /#|$/,
    nh = function (a, b) {
      var c = a.search(mh),
        d = lh(a, 0, b, c);
      if (0 > d) return null;
      var e = a.indexOf("&", d);
      if (0 > e || e > c) e = c;
      d += b.length + 1;
      return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "));
    },
    oh = /[?&]($|#)/,
    ph = function (a, b, c) {
      for (var d, e = a.search(mh), f = 0, g, l = []; 0 <= (g = lh(a, f, b, e)); )
        l.push(a.substring(f, g)), (f = Math.min(a.indexOf("&", g) + 1 || e, e));
      l.push(a.slice(f));
      d = l.join("").replace(oh, "$1");
      var m,
        n = null != c ? "=" + encodeURIComponent(String(c)) : "";
      var p = b + n;
      if (p) {
        var q,
          t = d.indexOf("#");
        0 > t && (t = d.length);
        var u = d.indexOf("?"),
          r;
        0 > u || u > t ? ((u = t), (r = "")) : (r = d.substring(u + 1, t));
        q = [d.slice(0, u), r, d.slice(t)];
        var v = q[1];
        q[1] = p ? (v ? v + "&" + p : p) : v;
        m = q[0] + (q[1] ? "?" + q[1] : "") + q[2];
      } else m = d;
      return m;
    };
  var qh = function (a, b) {
    if (a) for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  };
  function rh(a) {
    if (!a || !F.head) return null;
    var b = sh("META");
    F.head.appendChild(b);
    b.httpEquiv = "origin-trial";
    b.content = a;
    return b;
  }
  var th = function () {
      if (E.top == E) return 0;
      var a = E.location.ancestorOrigins;
      if (a) return a[a.length - 1] == E.location.origin ? 1 : 2;
      var b;
      var c = E.top;
      try {
        var d;
        if ((d = !!c && null != c.location.href))
          b: {
            try {
              Ff(c.foo);
              d = !0;
              break b;
            } catch (e) {}
            d = !1;
          }
        b = d;
      } catch (e) {
        b = !1;
      }
      return b ? 1 : 2;
    },
    sh = function (a, b) {
      b = void 0 === b ? document : b;
      return b.createElement(String(a).toLowerCase());
    };
  function uh(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    a.google_image_requests || (a.google_image_requests = []);
    var e = sh("IMG", a.document);
    if (c) {
      var f = function () {
        if (c) {
          var g = a.google_image_requests,
            l = $a(g, e);
          0 <= l && Array.prototype.splice.call(g, l, 1);
        }
        e.removeEventListener && e.removeEventListener("load", f, !1);
        e.removeEventListener && e.removeEventListener("error", f, !1);
      };
      hh(e, "load", f);
      hh(e, "error", f);
    }
    d && (e.attributionsrc = "");
    e.src = b;
    a.google_image_requests.push(e);
  }
  var wh = function (a) {
      var b;
      b = void 0 === b ? !1 : b;
      var c = "https://pagead2.googlesyndication.com/pagead/gen_204?id=tcfe";
      qh(a, function (d, e) {
        d && (c += "&" + e + "=" + encodeURIComponent(d));
      });
      vh(c, b);
    },
    vh = function (a, b) {
      var c = window,
        d;
      b = void 0 === b ? !1 : b;
      d = void 0 === d ? !1 : d;
      if (c.fetch) {
        var e = { keepalive: !0, credentials: "include", redirect: "follow", method: "get", mode: "no-cors" };
        d && ((e.mode = "cors"), (e.headers = { "Attribution-Reporting-Eligible": "event-source" }));
        c.fetch(a, e);
      } else uh(c, a, void 0 === b ? !1 : b, void 0 === d ? !1 : d);
    };
  var xh = function () {};
  var yh = function (a) {
      void 0 !== a.addtlConsent && "string" !== typeof a.addtlConsent && (a.addtlConsent = void 0);
      void 0 !== a.gdprApplies && "boolean" !== typeof a.gdprApplies && (a.gdprApplies = void 0);
      return (void 0 !== a.tcString && "string" !== typeof a.tcString) ||
        (void 0 !== a.listenerId && "number" !== typeof a.listenerId)
        ? 2
        : a.cmpStatus && "error" !== a.cmpStatus
        ? 0
        : 3;
    },
    zh = function (a, b) {
      b = void 0 === b ? {} : b;
      this.m = a;
      this.h = null;
      this.M = {};
      this.Ha = 0;
      var c;
      this.R = null != (c = b.Hk) ? c : 500;
      var d;
      this.D = null != (d = b.Yk) ? d : !1;
      this.B = null;
    };
  la(zh, xh);
  zh.prototype.addEventListener = function (a) {
    var b = this,
      c = { internalBlockOnErrors: this.D },
      d = qg(function () {
        return a(c);
      }),
      e = 0;
    -1 !== this.R &&
      (e = setTimeout(function () {
        c.tcString = "tcunavailable";
        c.internalErrorState = 1;
        d();
      }, this.R));
    var f = function (g, l) {
      clearTimeout(e);
      g
        ? ((c = g),
          (c.internalErrorState = yh(c)),
          (c.internalBlockOnErrors = b.D),
          (l && 0 === c.internalErrorState) || ((c.tcString = "tcunavailable"), l || (c.internalErrorState = 3)))
        : ((c.tcString = "tcunavailable"), (c.internalErrorState = 3));
      a(c);
    };
    try {
      Ah(this, "addEventListener", f);
    } catch (g) {
      (c.tcString = "tcunavailable"), (c.internalErrorState = 3), e && (clearTimeout(e), (e = 0)), d();
    }
  };
  zh.prototype.removeEventListener = function (a) {
    a && a.listenerId && Ah(this, "removeEventListener", null, a.listenerId);
  };
  var Ch = function (a, b, c) {
      var d;
      d = void 0 === d ? "755" : d;
      var e;
      a: {
        if (a.publisher && a.publisher.restrictions) {
          var f = a.publisher.restrictions[b];
          if (void 0 !== f) {
            e = f[void 0 === d ? "755" : d];
            break a;
          }
        }
        e = void 0;
      }
      var g = e;
      if (0 === g) return !1;
      var l = c;
      2 === c ? ((l = 0), 2 === g && (l = 1)) : 3 === c && ((l = 1), 1 === g && (l = 0));
      var m;
      if (0 === l)
        if (a.purpose && a.vendor) {
          var n = Bh(a.vendor.consents, void 0 === d ? "755" : d);
          m = n && "1" === b && a.purposeOneTreatment && "CH" === a.publisherCC ? !0 : n && Bh(a.purpose.consents, b);
        } else m = !0;
      else
        m =
          1 === l
            ? a.purpose && a.vendor
              ? Bh(a.purpose.legitimateInterests, b) && Bh(a.vendor.legitimateInterests, void 0 === d ? "755" : d)
              : !0
            : !0;
      return m;
    },
    Bh = function (a, b) {
      return !(!a || !a[b]);
    },
    Ah = function (a, b, c, d) {
      c || (c = function () {});
      if ("function" === typeof a.m.__tcfapi) {
        var e = a.m.__tcfapi;
        e(b, 2, c, d);
      } else if (Dh(a)) {
        Eh(a);
        var f = ++a.Ha;
        a.M[f] = c;
        if (a.h) {
          var g = {};
          a.h.postMessage(((g.__tcfapiCall = { command: b, version: 2, callId: f, parameter: d }), g), "*");
        }
      } else c({}, !1);
    },
    Dh = function (a) {
      if (a.h) return a.h;
      var b;
      a: {
        for (var c = a.m, d = 0; 50 > d; ++d) {
          var e;
          try {
            e = !(!c.frames || !c.frames.__tcfapiLocator);
          } catch (l) {
            e = !1;
          }
          if (e) {
            b = c;
            break a;
          }
          var f;
          b: {
            try {
              var g = c.parent;
              if (g && g != c) {
                f = g;
                break b;
              }
            } catch (l) {}
            f = null;
          }
          if (!(c = f)) break;
        }
        b = null;
      }
      a.h = b;
      return a.h;
    },
    Eh = function (a) {
      a.B ||
        ((a.B = function (b) {
          try {
            var c;
            c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data).__tcfapiReturn;
            a.M[c.callId](c.returnValue, c.success);
          } catch (d) {}
        }),
        hh(a.m, "message", a.B));
    },
    Fh = function (a) {
      if (!1 === a.gdprApplies) return !0;
      void 0 === a.internalErrorState && (a.internalErrorState = yh(a));
      return "error" === a.cmpStatus || 0 !== a.internalErrorState
        ? a.internalBlockOnErrors
          ? (wh({ e: String(a.internalErrorState) }), !1)
          : !0
        : "loaded" !== a.cmpStatus || ("tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus)
        ? !1
        : !0;
    };
  var Gh = !0;
  Gh = !1;
  var Hh = { 1: 0, 3: 0, 4: 0, 7: 3, 9: 3, 10: 3 },
    Ih = gh("", 550),
    Jh = gh("", 500);
  function Kh() {
    var a = Wd.tcf || {};
    return (Wd.tcf = a);
  }
  var Ph = function () {
    var a = Kh(),
      b = new zh(E, { Hk: Gh ? 3e3 : -1 });
    if (
      !0 === E.gtag_enable_tcf_support &&
      !a.active &&
      ("function" === typeof E.__tcfapi || "function" === typeof b.m.__tcfapi || null != Dh(b))
    ) {
      a.active = !0;
      a.md = {};
      Lh();
      var c = null;
      Gh
        ? (c = E.setTimeout(function () {
            Mh(a);
            Nh(a);
            c = null;
          }, Jh))
        : (a.tcString = "tcunavailable");
      try {
        b.addEventListener(function (d) {
          c && (clearTimeout(c), (c = null));
          if (0 !== d.internalErrorState) Mh(a), Nh(a);
          else {
            var e;
            a.gdprApplies = d.gdprApplies;
            if (!1 === d.gdprApplies) (e = Oh()), b.removeEventListener(d);
            else if (
              "tcloaded" === d.eventStatus ||
              "useractioncomplete" === d.eventStatus ||
              "cmpuishown" === d.eventStatus
            ) {
              var f = {},
                g;
              for (g in Hh)
                if (Hh.hasOwnProperty(g))
                  if ("1" === g) {
                    var l,
                      m = d,
                      n = !0;
                    n = void 0 === n ? !1 : n;
                    l = Fh(m)
                      ? !1 === m.gdprApplies ||
                        "tcunavailable" === m.tcString ||
                        (void 0 === m.gdprApplies && !n) ||
                        "string" !== typeof m.tcString ||
                        !m.tcString.length
                        ? !0
                        : Ch(m, "1", 0)
                      : !1;
                    f["1"] = l;
                  } else f[g] = Ch(d, g, Hh[g]);
              e = f;
            }
            e && ((a.tcString = d.tcString || "tcempty"), (a.md = e), Nh(a));
          }
        });
      } catch (d) {
        c && (clearTimeout(c), (c = null)), Mh(a), Nh(a);
      }
    }
  };
  function Mh(a) {
    a.type = "e";
    a.tcString = "tcunavailable";
    Gh && (a.md = Oh());
  }
  function Lh() {
    var a = {},
      b = ((a.ad_storage = "denied"), (a.wait_for_update = Ih), a);
    cg(b);
  }
  function Oh() {
    var a = {},
      b;
    for (b in Hh) Hh.hasOwnProperty(b) && (a[b] = !0);
    return a;
  }
  function Nh(a) {
    var b = {},
      c = ((b.ad_storage = a.md["1"] ? "granted" : "denied"), b);
    dg(c, { eventId: 0 }, { gdprApplies: a ? a.gdprApplies : void 0, tcString: Qh() });
  }
  var Qh = function () {
      var a = Kh();
      return a.active ? a.tcString || "" : "";
    },
    Rh = function () {
      var a = Kh();
      return a.active && void 0 !== a.gdprApplies ? (a.gdprApplies ? "1" : "0") : "";
    },
    Sh = function (a) {
      if (!Hh.hasOwnProperty(String(a))) return !0;
      var b = Kh();
      return b.active && b.md ? !!b.md[String(a)] : !0;
    };
  var Th = function (a) {
    var b = String(a[Ob.Sa] || "").replace(/_/g, "");
    0 === b.indexOf("cvt") && (b = "cvt");
    return b;
  };
  var Uh = ["L", "S", "Y"],
    Vh = ["S", "E"],
    Wh = { sampleRate: "0.005000", Uh: "", Th: Number("5"), Sh: Number("") },
    Xh = 0 <= F.location.search.indexOf("?gtm_latency=") || 0 <= F.location.search.indexOf("&gtm_latency="),
    Yh;
  if (!(Yh = Xh)) {
    var Zh = Math.random(),
      $h = Wh.sampleRate;
    Yh = Zh < $h;
  }
  var ai = Yh,
    bi = "https://www.googletagmanager.com/a?id=" + S.H + "&cv=1",
    ci = { label: S.H + " Container", children: [{ label: "Initialization", children: [] }] };
  function di() {
    return [bi, "&v=3&t=t", "&pid=" + ta(), "&rv=" + Vd.Sc].join("");
  }
  var ei = di();
  function fi() {
    ei = di();
  }
  var gi = {},
    hi = "",
    ii = "",
    ji = "",
    ki = "",
    li = [],
    mi = "",
    ni = {},
    oi = !1,
    pi = {},
    qi = {},
    ri = {},
    si = "",
    ti = void 0,
    ui = {},
    vi = {},
    wi = void 0,
    xi = 5;
  0 < Wh.Th && (xi = Wh.Th);
  var yi = (function (a, b) {
      for (var c = 0, d = [], e = 0; e < a; ++e) d.push(0);
      return {
        Rj: function () {
          return c < a ? !1 : z() - d[c % a] < b;
        },
        rk: function () {
          var f = c++ % a;
          d[f] = z();
        },
      };
    })(xi, 1e3),
    zi = 1e3,
    Ai = "";
  function Bi(a, b) {
    var c = ti;
    if (void 0 === c) return "";
    var d = Za("GTM"),
      e = Za("TAGGING"),
      f = Za("HEALTH"),
      g = ei,
      l = gi[c] ? "" : "&es=1",
      m = ui[c],
      n = Ci(c),
      p = Di(),
      q = hi,
      t = ii,
      u = si,
      r = Ei(a),
      v = ji,
      w = ki,
      y = Fi(a, b),
      x;
    return [
      g,
      l,
      m,
      n,
      d ? "&u=" + d : "",
      e ? "&ut=" + e : "",
      f ? "&h=" + f : "",
      p,
      q,
      t,
      u,
      r,
      v,
      w,
      y,
      x,
      mi ? "&dl=" + encodeURIComponent(mi) : "",
      0 < li.length ? "&tdp=" + li.join(".") : "",
      Vd.ff ? "&x=" + Vd.ff : "",
      "&z=0",
    ].join("");
  }
  function Hi(a) {
    wi && (E.clearTimeout(wi), (wi = void 0));
    if (void 0 !== ti && (!gi[ti] || hi || ii || Ii(a)))
      if (void 0 === Ji[ti] && (vi[ti] || yi.Rj() || 0 >= zi--)) O(1), (vi[ti] = !0);
      else {
        void 0 === Ji[ti] && yi.rk();
        var b = Bi(!0, a);
        a ? Fb(b) : yb(b);
        if (ki || (mi && 0 < li.length)) {
          var c = b.replace("/a?", "/td?");
          yb(c);
        }
        gi[ti] = !0;
        mi = ki = ji = si = ii = hi = "";
        li = [];
      }
  }
  function Ki() {
    wi || (wi = E.setTimeout(Hi, 500));
  }
  function Li(a) {
    return a.match(/^(gtm|gtag)\./) ? encodeURIComponent(a) : "*";
  }
  function Mi() {
    2022 <= Bi().length && Hi();
  }
  function Di() {
    return (
      "&tc=" +
      oc.filter(function (a) {
        return a;
      }).length
    );
  }
  var Oi = function (a, b) {
      if (ai && !vi[a] && ti !== a) {
        Hi();
        ti = a;
        ji = hi = "";
        ui[a] = "&e=" + Li(b) + "&eid=" + a;
        Ki();
      }
    },
    Pi = function (a, b, c, d) {
      if (ai && b) {
        var e = Th(b),
          f = c + e;
        if (!vi[a]) {
          a !== ti && (Hi(), (ti = a));
          hi = hi ? hi + "." + f : "&tr=" + f;
          var g = b["function"];
          if (!g) throw Error("Error: No function name given for function call.");
          var l = (qc[g] ? "1" : "2") + e;
          ji = ji ? ji + "." + l : "&ti=" + l;
          Ki();
          Mi();
        }
      }
    },
    Qi = function (a, b, c) {
      if (ai && a && a[Ob.sb]) {
        var d = b + "." + a[Ob.sb];
        ri[d] = c;
        "html" == Th(a) && Ai == d && (hi += ":" + Math.floor(c));
      }
    };
  function Ei(a) {}
  function Ci(a) {}
  var Xi = function (a, b, c) {
      if (ai && void 0 !== a && !vi[a]) {
        a !== ti && (Hi(), (ti = a));
        var d = c + b;
        ii = ii ? ii + "." + d : "&epr=" + d;
        Ki();
        Mi();
      }
    },
    Yi = function (a, b, c) {},
    Zi = ["S", "P", "C", "Z"],
    $i = {},
    aj = (($i[1] = 5), ($i[2] = 5), ($i[3] = 5), $i),
    bj = {},
    Ji = {},
    Gi = void 0,
    cj = function (a, b) {
      var c = !1;
      if (!ai || Ji[a] || 0 === aj[b]) return !1;
      --aj[b];
      Ji[a] = b;
      c = !0;
      return c;
    },
    dj = function (a, b, c) {
      if (!ai || !Ji[a]) return;
      var d = bj[a];
      d || (bj[a] = d = {});
      d[b] = c;
    };
  function Fi(a, b) {
    var c;
    if (!ti || !Ii(b)) return "";
    var d = bj[ti];
    c =
      "&al=" +
      Zi.filter(function (e) {
        return void 0 !== d[e];
      })
        .map(function (e) {
          return e + Math.floor(d[e]);
        })
        .join(".") +
      (".Z" + Ji[ti]);
    a && delete bj[ti];
    return c;
  }
  function Ii(a) {
    var b = !1;
    if (!ti || !bj[ti]) return !1;
    b = a || "C" in bj[ti];
    return b;
  }
  var ej = function () {
    if (ai) {
      E.setInterval(fi, 864e5);
      zb(E, "pagehide", function () {
        ti && Ji[ti] && Hi(!0);
        for (var a in bj) bj.hasOwnProperty(a) && ((ti = Number(a)), Hi(!0));
      });
    }
  };
  hb();
  ih() || gb("iPod");
  gb("iPad");
  !gb("Android") || ib() || hb() || gb("Opera") || gb("Silk");
  ib();
  !gb("Safari") ||
    ib() ||
    gb("Coast") ||
    gb("Opera") ||
    gb("Edge") ||
    gb("Edg/") ||
    gb("OPR") ||
    hb() ||
    gb("Silk") ||
    gb("Android") ||
    jh();
  var fj = {},
    gj = null,
    hj = function (a) {
      for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && ((b[c++] = e & 255), (e >>= 8));
        b[c++] = e;
      }
      var f = 4;
      void 0 === f && (f = 0);
      if (!gj) {
        gj = {};
        for (
          var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
            l = ["+/=", "+/", "-_=", "-_.", "-_"],
            m = 0;
          5 > m;
          m++
        ) {
          var n = g.concat(l[m].split(""));
          fj[m] = n;
          for (var p = 0; p < n.length; p++) {
            var q = n[p];
            void 0 === gj[q] && (gj[q] = p);
          }
        }
      }
      for (
        var t = fj[f], u = Array(Math.floor(b.length / 3)), r = t[64] || "", v = 0, w = 0;
        v < b.length - 2;
        v += 3
      ) {
        var y = b[v],
          x = b[v + 1],
          A = b[v + 2],
          B = t[y >> 2],
          D = t[((y & 3) << 4) | (x >> 4)],
          H = t[((x & 15) << 2) | (A >> 6)],
          J = t[A & 63];
        u[w++] = "" + B + D + H + J;
      }
      var C = 0,
        K = r;
      switch (b.length - v) {
        case 2:
          (C = b[v + 1]), (K = t[(C & 15) << 2] || r);
        case 1:
          var M = b[v];
          u[w] = "" + t[M >> 2] + t[((M & 3) << 4) | (C >> 4)] + K + r;
      }
      return u.join("");
    };
  var ij = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");
  function jj() {
    var a;
    return null != (a = E.google_tag_data) ? a : (E.google_tag_data = {});
  }
  function kj() {
    var a = E.google_tag_data,
      b;
    if (null != a && a.uach) {
      var c = a.uach,
        d = Object.assign({}, c);
      c.fullVersionList && (d.fullVersionList = c.fullVersionList.slice(0));
      b = d;
    } else b = null;
    return b;
  }
  function lj() {
    var a, b;
    return null != (b = null == (a = E.google_tag_data) ? void 0 : a.uach_promise) ? b : null;
  }
  function mj() {
    var a, b;
    return (
      "function" ===
      typeof (null == (a = E.navigator) ? void 0 : null == (b = a.userAgentData) ? void 0 : b.getHighEntropyValues)
    );
  }
  function nj() {
    if (!mj()) return null;
    var a = jj();
    if (a.uach_promise) return a.uach_promise;
    var b = E.navigator.userAgentData.getHighEntropyValues(ij).then(function (c) {
      null != a.uach || (a.uach = c);
      return c;
    });
    return (a.uach_promise = b);
  }
  function tj(a, b, c, d) {
    var e,
      f = Number(null != a.Ua ? a.Ua : void 0);
    0 !== f && (e = new Date((b || z()) + 1e3 * (f || 7776e3)));
    return { path: a.path, domain: a.domain, flags: a.flags, encode: !!c, expires: e, jb: d };
  }
  var uj;
  var yj = function () {
      var a = vj,
        b = wj,
        c = xj(),
        d = function (g) {
          a(g.target || g.srcElement || {});
        },
        e = function (g) {
          b(g.target || g.srcElement || {});
        };
      if (!c.init) {
        zb(F, "mousedown", d);
        zb(F, "keyup", d);
        zb(F, "submit", e);
        var f = HTMLFormElement.prototype.submit;
        HTMLFormElement.prototype.submit = function () {
          b(this);
          f.call(this);
        };
        c.init = !0;
      }
    },
    zj = function (a, b, c, d, e) {
      var f = { callback: a, domains: b, fragment: 2 === c, placement: c, forms: d, sameHost: e };
      xj().decorators.push(f);
    },
    Aj = function (a, b, c) {
      for (var d = xj().decorators, e = {}, f = 0; f < d.length; ++f) {
        var g = d[f],
          l;
        if ((l = !c || g.forms))
          a: {
            var m = g.domains,
              n = a,
              p = !!g.sameHost;
            if (m && (p || n !== F.location.hostname))
              for (var q = 0; q < m.length; q++)
                if (m[q] instanceof RegExp) {
                  if (m[q].test(n)) {
                    l = !0;
                    break a;
                  }
                } else if (0 <= n.indexOf(m[q]) || (p && 0 <= m[q].indexOf(n))) {
                  l = !0;
                  break a;
                }
            l = !1;
          }
        if (l) {
          var t = g.placement;
          void 0 == t && (t = g.fragment ? 2 : 1);
          t === b && Ha(e, g.callback());
        }
      }
      return e;
    };
  function xj() {
    var a = qb("google_tag_data", {}),
      b = a.gl;
    (b && b.decorators) || ((b = { decorators: [] }), (a.gl = b));
    return b;
  }
  var Bj = /(.*?)\*(.*?)\*(.*)/,
    Cj = /^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,
    Dj = /^(?:www\.|m\.|amp\.)+/,
    Uj = /([^?#]+)(\?[^#]*)?(#.*)?/;
  function Vj(a) {
    return new RegExp("(.*?)(^|&)" + a + "=([^&]*)&?(.*)");
  }
  var Xj = function (a) {
    var b = [],
      c;
    for (c in a)
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        void 0 !== d &&
          d === d &&
          null !== d &&
          "[object Object]" !== d.toString() &&
          (b.push(c), b.push(Ua(String(d))));
      }
    var e = b.join("*");
    return ["1", Wj(e), e].join("*");
  };
  function Wj(a, b) {
    var c = [
        ob.userAgent,
        new Date().getTimezoneOffset(),
        ob.userLanguage || ob.language,
        Math.floor(z() / 60 / 1e3) - (void 0 === b ? 0 : b),
        a,
      ].join("*"),
      d;
    if (!(d = uj)) {
      for (var e = Array(256), f = 0; 256 > f; f++) {
        for (var g = f, l = 0; 8 > l; l++) g = g & 1 ? (g >>> 1) ^ 3988292384 : g >>> 1;
        e[f] = g;
      }
      d = e;
    }
    uj = d;
    for (var m = 4294967295, n = 0; n < c.length; n++) m = (m >>> 8) ^ uj[(m ^ c.charCodeAt(n)) & 255];
    return ((m ^ -1) >>> 0).toString(36);
  }
  function Yj() {
    return function (a) {
      var b = We(E.location.href),
        c = b.search.replace("?", ""),
        d = Pe(c, "_gl", !0) || "";
      a.query = Zj(d) || {};
      var e = Ue(b, "fragment").match(Vj("_gl"));
      a.fragment = Zj((e && e[3]) || "") || {};
    };
  }
  function ak(a, b) {
    var c = Vj(a).exec(b),
      d = b;
    if (c) {
      var e = c[2],
        f = c[4];
      d = c[1];
      f && (d = d + e + f);
    }
    return d;
  }
  var bk = function (a, b) {
      b || (b = "_gl");
      var c = Uj.exec(a);
      if (!c) return "";
      var d = c[1],
        e = ak(b, (c[2] || "").slice(1)),
        f = ak(b, (c[3] || "").slice(1));
      e.length && (e = "?" + e);
      f.length && (f = "#" + f);
      return "" + d + e + f;
    },
    ck = function (a) {
      var b = Yj(),
        c = xj();
      c.data || ((c.data = { query: {}, fragment: {} }), b(c.data));
      var d = {},
        e = c.data;
      e && (Ha(d, e.query), a && Ha(d, e.fragment));
      return d;
    },
    Zj = function (a) {
      try {
        var b = dk(a, 3);
        if (void 0 !== b) {
          for (var c = {}, d = b ? b.split("*") : [], e = 0; e + 1 < d.length; e += 2) {
            var f = d[e],
              g = Va(d[e + 1]);
            c[f] = g;
          }
          Xa("TAGGING", 6);
          return c;
        }
      } catch (l) {
        Xa("TAGGING", 8);
      }
    };
  function dk(a, b) {
    if (a) {
      var c;
      a: {
        for (var d = a, e = 0; 3 > e; ++e) {
          var f = Bj.exec(d);
          if (f) {
            c = f;
            break a;
          }
          d = decodeURIComponent(d);
        }
        c = void 0;
      }
      var g = c;
      if (g && "1" === g[1]) {
        var l = g[3],
          m;
        a: {
          for (var n = g[2], p = 0; p < b; ++p)
            if (n === Wj(l, p)) {
              m = !0;
              break a;
            }
          m = !1;
        }
        if (m) return l;
        Xa("TAGGING", 7);
      }
    }
  }
  function ek(a, b, c, d) {
    function e(p) {
      p = ak(a, p);
      var q = p.charAt(p.length - 1);
      p && "&" !== q && (p += "&");
      return p + n;
    }
    d = void 0 === d ? !1 : d;
    var f = Uj.exec(c);
    if (!f) return "";
    var g = f[1],
      l = f[2] || "",
      m = f[3] || "",
      n = a + "=" + b;
    d ? (m = "#" + e(m.substring(1))) : (l = "?" + e(l.substring(1)));
    return "" + g + l + m;
  }
  function fk(a, b) {
    var c = "FORM" === (a.tagName || "").toUpperCase(),
      d = Aj(b, 1, c),
      e = Aj(b, 2, c),
      f = Aj(b, 3, c);
    if (Ia(d)) {
      var g = Xj(d);
      c ? gk("_gl", g, a) : hk("_gl", g, a, !1);
    }
    if (!c && Ia(e)) {
      var l = Xj(e);
      hk("_gl", l, a, !0);
    }
    for (var m in f)
      if (f.hasOwnProperty(m))
        a: {
          var n = m,
            p = f[m],
            q = a;
          if (q.tagName) {
            if ("a" === q.tagName.toLowerCase()) {
              hk(n, p, q);
              break a;
            }
            if ("form" === q.tagName.toLowerCase()) {
              gk(n, p, q);
              break a;
            }
          }
          "string" == typeof q && ek(n, p, q);
        }
  }
  function hk(a, b, c, d) {
    if (c.href) {
      var e = ek(a, b, c.href, void 0 === d ? !1 : d);
      eb.test(e) && (c.href = e);
    }
  }
  function gk(a, b, c) {
    if (c && c.action) {
      var d = (c.method || "").toLowerCase();
      if ("get" === d) {
        for (var e = c.childNodes || [], f = !1, g = 0; g < e.length; g++) {
          var l = e[g];
          if (l.name === a) {
            l.setAttribute("value", b);
            f = !0;
            break;
          }
        }
        if (!f) {
          var m = F.createElement("input");
          m.setAttribute("type", "hidden");
          m.setAttribute("name", a);
          m.setAttribute("value", b);
          c.appendChild(m);
        }
      } else if ("post" === d) {
        var n = ek(a, b, c.action);
        eb.test(n) && (c.action = n);
      }
    }
  }
  function vj(a) {
    try {
      var b;
      a: {
        for (var c = a, d = 100; c && 0 < d; ) {
          if (c.href && c.nodeName.match(/^a(?:rea)?$/i)) {
            b = c;
            break a;
          }
          c = c.parentNode;
          d--;
        }
        b = null;
      }
      var e = b;
      if (e) {
        var f = e.protocol;
        ("http:" !== f && "https:" !== f) || fk(e, e.hostname);
      }
    } catch (g) {}
  }
  function wj(a) {
    try {
      if (a.action) {
        var b = Ue(We(a.action), "host");
        fk(a, b);
      }
    } catch (c) {}
  }
  var ik = function (a, b, c, d) {
      yj();
      zj(a, b, "fragment" === c ? 2 : 1, !!d, !1);
    },
    jk = function (a, b) {
      yj();
      zj(a, [Te(E.location, "host", !0)], b, !0, !0);
    },
    kk = function () {
      var a = F.location.hostname,
        b = Cj.exec(F.referrer);
      if (!b) return !1;
      var c = b[2],
        d = b[1],
        e = "";
      if (c) {
        var f = c.split("/"),
          g = f[1];
        e = "s" === g ? decodeURIComponent(f[2]) : decodeURIComponent(g);
      } else if (d) {
        if (0 === d.indexOf("xn--")) return !1;
        e = d.replace(/-/g, ".").replace(/\.\./g, "-");
      }
      var l = a.replace(Dj, ""),
        m = e.replace(Dj, ""),
        n;
      if (!(n = l === m)) {
        var p = "." + m;
        n = l.substring(l.length - p.length, l.length) === p;
      }
      return n;
    },
    lk = function (a, b) {
      return !1 === a ? !1 : a || b || kk();
    };
  var mk = ["1"],
    nk = {},
    ok = {},
    qk = function (a) {
      return nk[pk(a)];
    },
    tk = function (a, b) {
      b = void 0 === b ? !0 : b;
      var c = pk(a.prefix);
      if (!nk[c] && !rk(c, a.path, a.domain) && b) {
        var d = pk(a.prefix),
          e = Hg();
        if (0 === sk(d, e, a)) {
          var f = qb("google_tag_data", {});
          f._gcl_au || (f._gcl_au = e);
        }
        rk(c, a.path, a.domain);
      }
    };
  function sk(a, b, c, d) {
    var e = Sg(b, "1", c.domain, c.path),
      f = tj(c, d);
    f.jb = "ad_storage";
    return Dg(a, e, f);
  }
  function rk(a, b, c) {
    var d = Rg(a, b, c, mk, "ad_storage");
    if (!d) return !1;
    uk(a, d);
    return !0;
  }
  function uk(a, b) {
    var c = b.split(".");
    5 === c.length
      ? ((nk[a] = c.slice(0, 2).join(".")), (ok[a] = { id: c.slice(2, 4).join("."), yh: Number(c[4]) || 0 }))
      : 3 === c.length
      ? (ok[a] = { id: c.slice(0, 2).join("."), yh: Number(c[2]) || 0 })
      : (nk[a] = b);
  }
  function pk(a) {
    return (a || "_gcl") + "_au";
  }
  function vk(a) {
    Tf() || a();
    Xf(
      function () {
        Qf("ad_storage") && a();
        Yf(a, "ad_storage");
      },
      ["ad_storage"],
    );
  }
  function wk(a) {
    var b = ck(!0),
      c = pk(a.prefix);
    vk(function () {
      var d = b[c];
      if (d) {
        uk(c, d);
        var e = 1e3 * Number(nk[c].split(".")[1]);
        if (e) {
          var f = tj(a, e);
          f.jb = "ad_storage";
          var g = Sg(d, "1", a.domain, a.path);
          Dg(c, g, f);
        }
      }
    });
  }
  function xk(a, b, c, d) {
    d = d || {};
    var e = function () {
      var f = pk(d.prefix),
        g = {},
        l = Rg(f, d.path, d.domain, mk, "ad_storage");
      if (!l) return g;
      g[f] = l;
      return g;
    };
    vk(function () {
      ik(e, a, b, c);
    });
  }
  var yk = function (a) {
    for (
      var b = [],
        c = F.cookie.split(";"),
        d = new RegExp("^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$"),
        e = 0;
      e < c.length;
      e++
    ) {
      var f = c[e].match(d);
      f && b.push({ Of: f[1], value: f[2], timestamp: Number(f[2].split(".")[1]) || 0 });
    }
    b.sort(function (g, l) {
      return l.timestamp - g.timestamp;
    });
    return b;
  };
  function zk(a, b) {
    var c = yk(a),
      d = {};
    if (!c || !c.length) return d;
    for (var e = 0; e < c.length; e++) {
      var f = c[e].value.split(".");
      if (!("1" !== f[0] || (b && 3 > f.length) || (!b && 3 !== f.length)) && Number(f[1])) {
        d[c[e].Of] || (d[c[e].Of] = []);
        var g = { version: f[0], timestamp: 1e3 * Number(f[1]), ia: f[2] };
        b && 3 < f.length && (g.labels = f.slice(3));
        d[c[e].Of].push(g);
      }
    }
    return d;
  }
  var Ak = /^\w+$/,
    Bk = /^[\w-]+$/,
    Ck = { aw: "_aw", dc: "_dc", gf: "_gf", ha: "_ha", gp: "_gp", gb: "_gb" },
    Dk = function () {
      if (!Hf().h() || !Tf()) return !0;
      var a = Qf("ad_storage");
      return null == a ? !0 : !!a;
    },
    Ek = function (a, b) {
      Sf("ad_storage")
        ? Dk()
          ? a()
          : Yf(a, "ad_storage")
        : b
        ? Xa("TAGGING", 3)
        : Xf(
            function () {
              Ek(a, !0);
            },
            ["ad_storage"],
          );
    },
    Gk = function (a) {
      return Fk(a).map(function (b) {
        return b.ia;
      });
    },
    Fk = function (a) {
      var b = [];
      if (!rg(E) || !F.cookie) return b;
      var c = ug(a, F.cookie, void 0, "ad_storage");
      if (!c || 0 == c.length) return b;
      for (var d = {}, e = 0; e < c.length; d = { sd: d.sd }, e++) {
        var f = Hk(c[e]);
        if (null != f) {
          var g = f,
            l = g.version;
          d.sd = g.ia;
          var m = g.timestamp,
            n = g.labels,
            p = sa(
              b,
              (function (q) {
                return function (t) {
                  return t.ia === q.sd;
                };
              })(d),
            );
          p
            ? ((p.timestamp = Math.max(p.timestamp, m)), (p.labels = Ik(p.labels, n || [])))
            : b.push({ version: l, ia: d.sd, timestamp: m, labels: n });
        }
      }
      b.sort(function (q, t) {
        return t.timestamp - q.timestamp;
      });
      return Jk(b);
    };
  function Ik(a, b) {
    for (var c = {}, d = [], e = 0; e < a.length; e++) (c[a[e]] = !0), d.push(a[e]);
    for (var f = 0; f < b.length; f++) c[b[f]] || d.push(b[f]);
    return d;
  }
  function Kk(a) {
    return a && "string" == typeof a && a.match(Ak) ? a : "_gcl";
  }
  var Mk = function () {
      var a = We(E.location.href),
        b = Ue(a, "query", !1, void 0, "gclid"),
        c = Ue(a, "query", !1, void 0, "gclsrc"),
        d = Ue(a, "query", !1, void 0, "wbraid"),
        e = Ue(a, "query", !1, void 0, "dclid");
      if (!b || !c || !d) {
        var f = a.hash.replace("#", "");
        b = b || Pe(f, "gclid");
        c = c || Pe(f, "gclsrc");
        d = d || Pe(f, "wbraid");
      }
      return Lk(b, c, e, d);
    },
    Lk = function (a, b, c, d) {
      var e = {},
        f = function (g, l) {
          e[l] || (e[l] = []);
          e[l].push(g);
        };
      e.gclid = a;
      e.gclsrc = b;
      e.dclid = c;
      void 0 !== d && Bk.test(d) && ((e.gbraid = d), f(d, "gb"));
      if (void 0 !== a && a.match(Bk))
        switch (b) {
          case void 0:
            f(a, "aw");
            break;
          case "aw.ds":
            f(a, "aw");
            f(a, "dc");
            break;
          case "ds":
            f(a, "dc");
            break;
          case "3p.ds":
            f(a, "dc");
            break;
          case "gf":
            f(a, "gf");
            break;
          case "ha":
            f(a, "ha");
        }
      c && f(c, "dc");
      return e;
    },
    Ok = function (a) {
      var b = Mk();
      Ek(function () {
        Nk(b, !1, a);
      });
    };
  function Nk(a, b, c, d, e) {
    function f(w, y) {
      var x = Pk(w, g);
      x && (Dg(x, y, l), (m = !0));
    }
    c = c || {};
    e = e || [];
    var g = Kk(c.prefix);
    d = d || z();
    var l = tj(c, d, !0);
    l.jb = "ad_storage";
    var m = !1,
      n = Math.round(d / 1e3),
      p = function (w) {
        var y = ["GCL", n, w];
        0 < e.length && y.push(e.join("."));
        return y.join(".");
      };
    a.aw && f("aw", p(a.aw[0]));
    a.dc && f("dc", p(a.dc[0]));
    a.gf && f("gf", p(a.gf[0]));
    a.ha && f("ha", p(a.ha[0]));
    a.gp && f("gp", p(a.gp[0]));
    if (!m && a.gb) {
      var q = a.gb[0],
        t = Pk("gb", g),
        u = !1;
      if (!b)
        for (var r = Fk(t), v = 0; v < r.length; v++)
          r[v].ia === q && r[v].labels && 0 < r[v].labels.length && (u = !0);
      u || f("gb", p(q));
    }
  }
  var Rk = function (a, b) {
      var c = ck(!0);
      Ek(function () {
        for (var d = Kk(b.prefix), e = 0; e < a.length; ++e) {
          var f = a[e];
          if (void 0 !== Ck[f]) {
            var g = Pk(f, d),
              l = c[g];
            if (l) {
              var m = Math.min(Qk(l), z()),
                n;
              b: {
                var p = m;
                if (rg(E))
                  for (var q = ug(g, F.cookie, void 0, "ad_storage"), t = 0; t < q.length; ++t)
                    if (Qk(q[t]) > p) {
                      n = !0;
                      break b;
                    }
                n = !1;
              }
              if (!n) {
                var u = tj(b, m, !0);
                u.jb = "ad_storage";
                Dg(g, l, u);
              }
            }
          }
        }
        Nk(Lk(c.gclid, c.gclsrc), !1, b);
      });
    },
    Pk = function (a, b) {
      var c = Ck[a];
      if (void 0 !== c) return b + c;
    },
    Qk = function (a) {
      return 0 !== Sk(a.split(".")).length ? 1e3 * (Number(a.split(".")[1]) || 0) : 0;
    };
  function Hk(a) {
    var b = Sk(a.split("."));
    return 0 === b.length
      ? null
      : { version: b[0], ia: b[2], timestamp: 1e3 * (Number(b[1]) || 0), labels: b.slice(3) };
  }
  function Sk(a) {
    return 3 > a.length || ("GCL" !== a[0] && "1" !== a[0]) || !/^\d+$/.test(a[1]) || !Bk.test(a[2]) ? [] : a;
  }
  var Tk = function (a, b, c, d, e) {
      if (ra(b) && rg(E)) {
        var f = Kk(e),
          g = function () {
            for (var l = {}, m = 0; m < a.length; ++m) {
              var n = Pk(a[m], f);
              if (n) {
                var p = ug(n, F.cookie, void 0, "ad_storage");
                p.length && (l[n] = p.sort()[p.length - 1]);
              }
            }
            return l;
          };
        Ek(function () {
          ik(g, b, c, d);
        });
      }
    },
    Jk = function (a) {
      return a.filter(function (b) {
        return Bk.test(b.ia);
      });
    },
    Uk = function (a, b) {
      if (rg(E)) {
        for (var c = Kk(b.prefix), d = {}, e = 0; e < a.length; e++) Ck[a[e]] && (d[a[e]] = Ck[a[e]]);
        Ek(function () {
          k(d, function (f, g) {
            var l = ug(c + g, F.cookie, void 0, "ad_storage");
            l.sort(function (u, r) {
              return Qk(r) - Qk(u);
            });
            if (l.length) {
              var m = l[0],
                n = Qk(m),
                p = 0 !== Sk(m.split(".")).length ? m.split(".").slice(3) : [],
                q = {},
                t;
              t = 0 !== Sk(m.split(".")).length ? m.split(".")[2] : void 0;
              q[f] = [t];
              Nk(q, !0, b, n, p);
            }
          });
        });
      }
    };
  function Vk(a, b) {
    for (var c = 0; c < b.length; ++c) if (a[b[c]]) return !0;
    return !1;
  }
  var Wk = function (a) {
      function b(e, f, g) {
        g && (e[f] = g);
      }
      if (Tf()) {
        var c = Mk();
        if (Vk(c, a)) {
          var d = {};
          b(d, "gclid", c.gclid);
          b(d, "dclid", c.dclid);
          b(d, "gclsrc", c.gclsrc);
          b(d, "wbraid", c.gbraid);
          jk(function () {
            return d;
          }, 3);
          jk(function () {
            var e = {};
            return (e._up = "1"), e;
          }, 1);
        }
      }
    },
    Xk = function (a, b, c, d) {
      var e = [];
      c = c || {};
      if (!Dk()) return e;
      var f = Fk(a);
      if (!f.length) return e;
      for (var g = 0; g < f.length; g++) -1 === (f[g].labels || []).indexOf(b) ? e.push(0) : e.push(1);
      if (d) return e;
      if (1 !== e[0]) {
        var l = f[0],
          m = f[0].timestamp,
          n = [l.version, Math.round(m / 1e3), l.ia].concat(l.labels || [], [b]).join("."),
          p = tj(c, m, !0);
        p.jb = "ad_storage";
        Dg(a, n, p);
      }
      return e;
    };
  function Yk(a, b) {
    var c = Kk(b),
      d = Pk(a, c);
    if (!d) return 0;
    for (var e = Fk(d), f = 0, g = 0; g < e.length; g++) f = Math.max(f, e[g].timestamp);
    return f;
  }
  function Zk(a) {
    var b = 0,
      c;
    for (c in a) for (var d = a[c], e = 0; e < d.length; e++) b = Math.max(b, Number(d[e].timestamp));
    return b;
  }
  var $k = function (a) {
    var b = Math.max(Yk("aw", a), Zk(Dk() ? zk() : {}));
    return Math.max(Yk("gb", a), Zk(Dk() ? zk("_gac_gb", !0) : {})) > b;
  };
  var el = /[A-Z]+/,
    fl = /\s/,
    gl = function (a) {
      if (h(a)) {
        a = Da(a);
        var b = a.indexOf("-");
        if (!(0 > b)) {
          var c = a.substring(0, b);
          if (el.test(c)) {
            for (var d = a.substring(b + 1).split("/"), e = 0; e < d.length; e++)
              if (!d[e] || (fl.test(d[e]) && ("AW" !== c || 1 !== e))) return;
            return { id: a, prefix: c, U: c + "-" + d[0], J: d };
          }
        }
      }
    },
    il = function (a) {
      for (var b = {}, c = 0; c < a.length; ++c) {
        var d = gl(a[c]);
        d && (b[d.id] = d);
      }
      hl(b);
      var e = [];
      k(b, function (f, g) {
        e.push(g);
      });
      return e;
    };
  function hl(a) {
    var b = [],
      c;
    for (c in a)
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        "AW" === d.prefix && d.J[1] && b.push(d.U);
      }
    for (var e = 0; e < b.length; ++e) delete a[b[e]];
  }
  var kl = function (a, b, c, d) {
      return (2 === jl() || d || "http:" != E.location.protocol ? a : b) + c;
    },
    jl = function () {
      var a = wb(),
        b;
      if (1 === a)
        a: {
          var c = ke;
          c = c.toLowerCase();
          for (
            var d = "https://" + c, e = "http://" + c, f = 1, g = F.getElementsByTagName("script"), l = 0;
            l < g.length && 100 > l;
            l++
          ) {
            var m = g[l].src;
            if (m) {
              m = m.toLowerCase();
              if (0 === m.indexOf(e)) {
                b = 3;
                break a;
              }
              1 === f && 0 === m.indexOf(d) && (f = 2);
            }
          }
          b = f;
        }
      else b = a;
      return b;
    };
  var ml = function (a, b, c) {
      if (E[a.functionName]) return b.Ff && G(b.Ff), E[a.functionName];
      var d = ll();
      E[a.functionName] = d;
      if (a.ae) for (var e = 0; e < a.ae.length; e++) E[a.ae[e]] = E[a.ae[e]] || ll();
      a.pe && void 0 === E[a.pe] && (E[a.pe] = c);
      vb(kl("https://", "http://", a.Mf), b.Ff, b.ek);
      return d;
    },
    ll = function () {
      var a = function () {
        a.q = a.q || [];
        a.q.push(arguments);
      };
      return a;
    },
    nl = { functionName: "_googWcmImpl", pe: "_googWcmAk", Mf: "www.gstatic.com/wcm/loader.js" },
    ol = { functionName: "_gaPhoneImpl", pe: "ga_wpid", Mf: "www.gstatic.com/gaphone/loader.js" },
    pl = { Yh: "", Zi: "5" },
    ql = {
      functionName: "_googCallTrackingImpl",
      ae: [ol.functionName, nl.functionName],
      Mf: "www.gstatic.com/call-tracking/call-tracking_" + (pl.Yh || pl.Zi) + ".js",
    },
    rl = {},
    sl = function (a, b, c, d) {
      O(22);
      if (c) {
        d = d || {};
        var e = ml(nl, d, a),
          f = { ak: a, cl: b };
        void 0 === d.ib && (f.autoreplace = c);
        e(2, d.ib, f, c, 0, Ea(), d.options);
      }
    },
    tl = function (a, b, c, d) {
      O(21);
      if (b && c) {
        d = d || {};
        for (var e = { countryNameCode: c, destinationNumber: b, retrievalTime: Ea() }, f = 0; f < a.length; f++) {
          var g = a[f];
          rl[g.id] ||
            (g && "AW" === g.prefix && !e.adData && 2 <= g.J.length
              ? ((e.adData = { ak: g.J[0], cl: g.J[1] }), (rl[g.id] = !0))
              : g && "UA" === g.prefix && !e.gaData && ((e.gaData = { gaWpid: g.U }), (rl[g.id] = !0)));
        }
        (e.gaData || e.adData) && ml(ql, d)(d.ib, e, d.options);
      }
    },
    ul = function () {
      var a = !1;
      return a;
    },
    vl = function (a, b) {
      if (a)
        if (Ug()) {
        } else {
          if (h(a)) {
            var c = gl(a);
            if (!c) return;
            a = c;
          }
          var d = void 0,
            e = !1,
            f = U(b, P.g.Ei);
          if (f && ra(f)) {
            d = [];
            for (var g = 0; g < f.length; g++) {
              var l = gl(f[g]);
              l && (d.push(l), (a.id === l.id || (a.id === a.U && a.U === l.U)) && (e = !0));
            }
          }
          if (!d || e) {
            var m = U(b, P.g.Eg),
              n;
            if (m) {
              ra(m) ? (n = m) : (n = [m]);
              var p = U(b, P.g.Cg),
                q = U(b, P.g.Dg),
                t = U(b, P.g.Fg),
                u = U(b, P.g.Di),
                r = p || q,
                v = 1;
              "UA" !== a.prefix || d || (v = 5);
              for (var w = 0; w < n.length; w++)
                if (w < v)
                  if (d) tl(d, n[w], u, { ib: r, options: t });
                  else if ("AW" === a.prefix && a.J[1])
                    ul()
                      ? tl([a], n[w], u || "US", { ib: r, options: t })
                      : sl(a.J[0], a.J[1], n[w], { ib: r, options: t });
                  else if ("UA" === a.prefix)
                    if (ul()) tl([a], n[w], u || "US", { ib: r });
                    else {
                      var y = a.U,
                        x = n[w],
                        A = { ib: r };
                      O(23);
                      if (x) {
                        A = A || {};
                        var B = ml(ol, A, y),
                          D = {};
                        void 0 !== A.ib ? (D.receiver = A.ib) : (D.replace = x);
                        D.ga_wpid = y;
                        D.destination = x;
                        B(2, Ea(), D);
                      }
                    }
            }
          }
        }
    };
  var wl = function (a, b, c) {
      this.target = a;
      this.eventName = b;
      this.h = c;
      this.m = {};
      this.metadata = I(c.eventMetadata || {});
      this.I = !1;
    },
    xl = function (a, b, c) {
      var d = U(a.h, b);
      void 0 !== d ? (a.m[b] = d) : void 0 !== c && (a.m[b] = c);
    },
    yl = function (a, b, c) {
      var d = De(a.target.U);
      return d && d.hasOwnProperty(b) ? d[b] : c;
    };
  function zl(a) {
    return {
      getDestinationId: function () {
        return a.target.U;
      },
      getEventName: function () {
        return a.eventName;
      },
      setEventName: function (b) {
        return void (a.eventName = b);
      },
      getHitData: function (b) {
        return a.m[b];
      },
      setHitData: function (b, c) {
        return void (a.m[b] = c);
      },
      setHitDataIfNotDefined: function (b, c) {
        void 0 === a.m[b] && (a.m[b] = c);
      },
      copyToHitData: function (b, c) {
        xl(a, b, c);
      },
      getMetadata: function (b) {
        return a.metadata[b];
      },
      setMetadata: function (b, c) {
        return void (a.metadata[b] = c);
      },
      abort: function () {
        return void (a.I = !0);
      },
      getProcessedEvent: function () {
        return a;
      },
      getFromEventContext: function (b) {
        return U(a.h, b);
      },
    };
  }
  var Sl = function (a, b, c, d, e, f, g, l, m, n, p, q) {
      this.eventId = a;
      this.priorityId = b;
      this.h = c;
      this.M = d;
      this.m = e;
      this.D = f;
      this.R = g;
      this.B = l;
      this.eventMetadata = m;
      this.P = n;
      this.O = p;
      this.C = q;
    },
    U = function (a, b, c) {
      if (void 0 !== a.h[b]) return a.h[b];
      if (void 0 !== a.M[b]) return a.M[b];
      if (void 0 !== a.m[b]) return a.m[b];
      ai && Tl(a, a.D[b], a.R[b]) && (O(71), O(79));
      return void 0 !== a.D[b] ? a.D[b] : void 0 !== a.B[b] ? a.B[b] : c;
    },
    Ul = function (a) {
      function b(g) {
        for (var l = Object.keys(g), m = 0; m < l.length; ++m) c[l[m]] = 1;
      }
      var c = {};
      b(a.h);
      b(a.M);
      b(a.m);
      b(a.D);
      if (ai)
        for (var d = Object.keys(a.R), e = 0; e < d.length; e++) {
          var f = d[e];
          if ("event" !== f && "gtm" !== f && "tagTypeBlacklist" !== f && !c.hasOwnProperty(f)) {
            O(71);
            O(80);
            break;
          }
        }
      return Object.keys(c);
    },
    Vl = function (a, b, c) {
      function d(m) {
        Mb(m) &&
          k(m, function (n, p) {
            f = !0;
            e[n] = p;
          });
      }
      var e = {},
        f = !1;
      (c && 1 !== c) || (d(a.B[b]), d(a.D[b]), d(a.m[b]), d(a.M[b]));
      (c && 2 !== c) || d(a.h[b]);
      if (ai) {
        var g = f,
          l = e;
        e = {};
        f = !1;
        (c && 1 !== c) || (d(a.B[b]), d(a.R[b]), d(a.m[b]), d(a.M[b]));
        (c && 2 !== c) || d(a.h[b]);
        if (f !== g || Tl(a, e, l)) O(71), O(81);
        f = g;
        e = l;
      }
      return f ? e : void 0;
    },
    Wl = function (a) {
      var b = [P.g.Dc, P.g.Bd, P.g.Cd, P.g.Dd, P.g.Ed, P.g.Fd, P.g.Gd],
        c = {},
        d = !1,
        e = function (l) {
          for (var m = 0; m < b.length; m++) void 0 !== l[b[m]] && ((c[b[m]] = l[b[m]]), (d = !0));
          return d;
        };
      if (e(a.h) || e(a.M) || e(a.m)) return c;
      e(a.D);
      if (ai) {
        var f = c,
          g = d;
        c = {};
        d = !1;
        e(a.R);
        Tl(a, c, f) && (O(71), O(82));
        c = f;
        d = g;
      }
      if (d) return c;
      e(a.B);
      return c;
    },
    Tl = function (a, b, c) {
      if (!ai) return !1;
      try {
        if (b === c) return !1;
        var d = Kb(b);
        if (d !== Kb(c) || !((Mb(b) && Mb(c)) || "array" === d)) return !0;
        if ("array" === d) {
          if (b.length !== c.length) return !0;
          for (var e = 0; e < b.length; e++) if (Tl(a, b[e], c[e])) return !0;
        } else {
          for (var f in c) if (!b.hasOwnProperty(f)) return !0;
          for (var g in b) if (!c.hasOwnProperty(g) || Tl(a, b[g], c[g])) return !0;
        }
      } catch (l) {
        O(72);
      }
      return !1;
    },
    Xl = function (a, b) {
      this.Ni = a;
      this.Oi = b;
      this.D = {};
      this.Vg = {};
      this.h = {};
      this.M = {};
      this.m = {};
      this.Qc = {};
      this.B = {};
      this.qc = function () {};
      this.Ha = function () {};
      this.R = !1;
    },
    Yl = function (a, b) {
      a.D = b;
      return a;
    },
    Zl = function (a, b) {
      a.Vg = b;
      return a;
    },
    $l = function (a, b) {
      a.h = b;
      return a;
    },
    am = function (a, b) {
      a.M = b;
      return a;
    },
    bm = function (a, b) {
      a.m = b;
      return a;
    },
    cm = function (a, b) {
      a.Qc = b;
      return a;
    },
    dm = function (a, b) {
      a.B = b || {};
      return a;
    },
    em = function (a, b) {
      a.qc = b;
      return a;
    },
    fm = function (a, b) {
      a.Ha = b;
      return a;
    },
    gm = function (a) {
      a.R = !0;
      return a;
    },
    hm = function (a) {
      return new Sl(a.Ni, a.Oi, a.D, a.Vg, a.h, a.M, a.m, a.Qc, a.B, a.qc, a.Ha, a.R);
    };
  function lm() {
    return "attribution-reporting";
  }
  function mm(a) {
    var b;
    b = void 0 === b ? document : b;
    var c;
    return !(null == (c = b.featurePolicy) || !c.allowedFeatures().includes(a));
  }
  var nm = !1;
  function om() {
    if (mm("join-ad-interest-group") && pa(ob.joinAdInterestGroup)) return !0;
    nm ||
      (rh(
        "A751Xsk4ZW3DVQ8WZng2Dk5s3YzAyqncTzgv+VaE6wavgTY0QHkDvUTET1o7HanhuJO8lgv1Vvc88Ij78W1FIAAAAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1RoaXJkUGFydHkiOnRydWV9",
      ),
      (nm = !0));
    return mm("join-ad-interest-group") && pa(ob.joinAdInterestGroup);
  }
  function pm(a, b) {
    var c = void 0;
    try {
      c = F.querySelector('iframe[data-tagging-id="' + b + '"]');
    } catch (e) {}
    if (c) {
      var d = Number(c.dataset.loadTime);
      if (d && 6e4 > z() - d) {
        Xa("TAGGING", 9);
        return;
      }
    } else
      try {
        if (50 <= F.querySelectorAll('iframe[allow="join-ad-interest-group"][data-tagging-id*="-"]').length) {
          Xa("TAGGING", 10);
          return;
        }
      } catch (e) {}
    xb(a, void 0, { allow: "join-ad-interest-group" }, { taggingId: b, loadTime: z() }, c);
  }
  function qm() {
    return Q(60) ? "https://td.doubleclick.net" : "https://googleads.g.doubleclick.net";
  }
  var rm = RegExp("^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$"),
    sm = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
    tm = /^\d+\.fls\.doubleclick\.net$/,
    um = /;gac=([^;?]+)/,
    vm = /;gacgb=([^;?]+)/,
    wm = /;gclaw=([^;?]+)/,
    xm = /;gclgb=([^;?]+)/;
  function ym(a, b) {
    if (tm.test(F.location.host)) {
      var c = F.location.href.match(b);
      return c && 2 == c.length && c[1].match(rm) ? decodeURIComponent(c[1]) : "";
    }
    var d = [],
      e;
    for (e in a) {
      for (var f = [], g = a[e], l = 0; l < g.length; l++) f.push(g[l].ia);
      d.push(e + ":" + f.join(","));
    }
    return 0 < d.length ? d.join(";") : "";
  }
  var zm = function (a, b, c) {
    var d = Dk() ? zk("_gac_gb", !0) : {},
      e = [],
      f = !1,
      g;
    for (g in d) {
      var l = Xk("_gac_gb_" + g, a, b, c);
      f =
        f ||
        (0 !== l.length &&
          l.some(function (m) {
            return 1 === m;
          }));
      e.push(g + ":" + l.join(","));
    }
    return { Dj: f ? e.join(";") : "", Cj: ym(d, vm) };
  };
  function Am(a, b, c) {
    if (tm.test(F.location.host)) {
      var d = F.location.href.match(c);
      if (d && 2 == d.length && d[1].match(sm)) return [{ ia: d[1] }];
    } else return Fk((a || "_gcl") + b);
    return [];
  }
  var Bm = function (a) {
      return Am(a, "_aw", wm)
        .map(function (b) {
          return b.ia;
        })
        .join(".");
    },
    Cm = function (a) {
      return Am(a, "_gb", xm)
        .map(function (b) {
          return b.ia;
        })
        .join(".");
    },
    Dm = function (a, b) {
      var c = Xk(((b && b.prefix) || "_gcl") + "_gb", a, b);
      return 0 === c.length ||
        c.every(function (d) {
          return 0 === d;
        })
        ? ""
        : c.join(".");
    };
  var Em = function () {
    if (pa(E.__uspapi)) {
      var a = "";
      try {
        E.__uspapi("getUSPData", 1, function (b, c) {
          if (c && b) {
            var d = b.uspString;
            d && RegExp("^[\\da-zA-Z-]{1,20}$").test(d) && (a = d);
          }
        });
      } catch (b) {}
      return a;
    }
  };
  var on = {
    V: {
      Wh: "ads_conversion_hit",
      Mk: "container_execute_start",
      ci: "container_setup_end",
      Vf: "container_setup_start",
      di: "container_yield_end",
      Wf: "container_yield_start",
      Pk: "event_execute_end",
      Qk: "event_execute_start",
      Rk: "event_setup_start",
      Li: "ga4_conversion_hit",
      df: "page_load",
      Db: "snippet_load",
      aj: "tag_callback_error",
      bj: "tag_callback_failure",
      cj: "tag_callback_success",
      dj: "tag_execute_end",
      hh: "tag_execute_start",
    },
  };
  var rn = function (a, b, c, d, e, f) {
      var g = {};
      return g;
    },
    sn = function (a) {
      var b = !1;
      return b;
    },
    tn = function (a, b) {},
    un = function (a, b, c) {},
    vn = function () {
      function a(d) {
        return !qa(d) || 0 > d ? 0 : d;
      }
      if (!Wd._li && Ib() && Ib().timing) {
        var b = Ib().timing.navigationStart,
          c = qa(xe.get("gtm.start")) ? xe.get("gtm.start") : 0;
        Wd._li = { cst: a(c - b), cbt: a(me - b) };
      }
    },
    wn = function (a) {
      Ib() && Ib().mark(S.H + "_" + a + "_start");
    },
    xn = function (a) {
      if (Ib()) {
        var b = Ib(),
          c = S.H + "_" + a + "_start",
          d = S.H + "_" + a + "_duration";
        b.measure(d, c);
        var e = Ib().getEntriesByName(d)[0];
        b.clearMarks(c);
        b.clearMeasures(d);
        var f = Wd._p || {};
        void 0 === f[a] && ((f[a] = e.duration), (Wd._p = f));
        return e.duration;
      }
    },
    yn = function () {
      var a = Hb();
      if (void 0 !== a) {
        var b = Wd._p || {};
        b.PAGEVIEW = a;
        Wd._p = b;
      }
    };
  var zn = function (a, b) {
    var c,
      d = E.GooglebQhCsO;
    d || ((d = {}), (E.GooglebQhCsO = d));
    c = d;
    if (c[a]) return !1;
    c[a] = [];
    c[a][0] = b;
    return !0;
  };
  var An = function (a, b) {
    var c = nh(a, "fmt");
    if (b) {
      var d = nh(a, "random"),
        e = nh(a, "label") || "";
      if (!d) return !1;
      var f = hj(decodeURIComponent(e.replace(/\+/g, " ")) + ":" + decodeURIComponent(d.replace(/\+/g, " ")));
      if (!zn(f, b)) return !1;
    }
    c && 4 != c && (a = ph(a, "rfmt", c));
    var g = ph(a, "fmt", 4);
    vb(
      g,
      function () {
        E.google_noFurtherRedirects && b && b.call && ((E.google_noFurtherRedirects = null), b());
      },
      void 0,
      void 0,
      F.getElementsByTagName("script")[0].parentElement || void 0,
    );
    return !0;
  };
  var Qn = function () {
      this.h = {};
    },
    Rn = function (a, b, c) {
      null != c && (a.h[b] = c);
    },
    Sn = function (a) {
      return Object.keys(a.h)
        .map(function (b) {
          return encodeURIComponent(b) + "=" + encodeURIComponent(a.h[b]);
        })
        .join("&");
    },
    Un = function (a, b, c, d, e) {};
  function Wn(a, b) {
    if (a) {
      var c = "" + a;
      0 !== c.indexOf("http://") && 0 !== c.indexOf("https://") && (c = "https://" + c);
      "/" === c[c.length - 1] && (c = c.substring(0, c.length - 1));
      return We("" + c + b).href;
    }
  }
  function Xn(a, b) {
    return ee || ge ? Wn(a, b) : void 0;
  }
  function Yn() {
    return !!Vd.Yd && "SGTM_TOKEN" !== Vd.Yd.split("@@").join("");
  }
  var $n = function (a, b, c, d) {
      if (!Zn() && !ah(a)) {
        var e = c ? "/gtag/js" : "/gtm.js",
          f = "?id=" + encodeURIComponent(a) + "&l=" + Vd.ja,
          g = 0 === a.indexOf("GTM-");
        g || (f += "&cx=c");
        var l = Yn();
        l && (f += "&sign=" + Vd.Yd);
        var m = Xn(b, e + f);
        if (!m) {
          var n = Vd.yd + e;
          l && pb && g && (n = pb.replace(/^(?:https?:\/\/)?/i, "").split(/[?#]/)[0]);
          m = kl("https://", "http://", n + f);
        }
        Zg().container[a] = { state: 1, context: d };
        vb(m);
      }
    },
    ao = function (a, b, c) {
      var d;
      if ((d = !Zn())) {
        var e = Zg().destination[a];
        d = !(e && e.state);
      }
      if (d)
        if (bh()) (Zg().destination[a] = { state: 0, transportUrl: b, context: c }), O(91);
        else {
          var f = "/gtag/destination?id=" + encodeURIComponent(a) + "&l=" + Vd.ja + "&cx=c";
          Yn() && (f += "&sign=" + Vd.Yd);
          var g = Xn(b, f);
          g || (g = kl("https://", "http://", Vd.yd + f));
          Zg().destination[a] = { state: 1, context: c };
          vb(g);
        }
    };
  function Zn() {
    if (Ug()) {
      return !0;
    }
    return !1;
  }
  var bo = new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),
    co = {
      cl: ["ecl"],
      customPixels: ["nonGooglePixels"],
      ecl: ["cl"],
      ehl: ["hl"],
      hl: ["ehl"],
      html: ["customScripts", "customPixels", "nonGooglePixels", "nonGoogleScripts", "nonGoogleIframes"],
      customScripts: ["html", "customPixels", "nonGooglePixels", "nonGoogleScripts", "nonGoogleIframes"],
      nonGooglePixels: [],
      nonGoogleScripts: ["nonGooglePixels"],
      nonGoogleIframes: ["nonGooglePixels"],
    },
    eo = {
      cl: ["ecl"],
      customPixels: ["customScripts", "html"],
      ecl: ["cl"],
      ehl: ["hl"],
      hl: ["ehl"],
      html: ["customScripts"],
      customScripts: ["html"],
      nonGooglePixels: ["customPixels", "customScripts", "html", "nonGoogleScripts", "nonGoogleIframes"],
      nonGoogleScripts: ["customScripts", "html"],
      nonGoogleIframes: ["customScripts", "html", "nonGoogleScripts"],
    },
    fo = "google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" "),
    io = function (a) {
      var b = we("gtm.allowlist") || we("gtm.whitelist");
      b && O(9);
      ce && (b = ["google", "gtagfl", "lcl", "zone"]);
      go &&
        ho() &&
        ((b = []), window.console && window.console.log && window.console.log("GTM blocked. See go/13687728."));
      var c = b && Ja(Ca(b), co),
        d = we("gtm.blocklist") || we("gtm.blacklist");
      d || ((d = we("tagTypeBlacklist")) && O(3));
      d ? O(8) : (d = []);
      ho() && ((d = Ca(d)), d.push("nonGooglePixels", "nonGoogleScripts", "sandboxedScripts"));
      0 <= Ca(d).indexOf("google") && O(2);
      var e = d && Ja(Ca(d), eo),
        f = {};
      return function (g) {
        var l = g && g[Ob.Sa];
        if (!l || "string" != typeof l) return !0;
        l = l.replace(/^_*/, "");
        if (void 0 !== f[l]) return f[l];
        var m = oe[l] || [],
          n = a(l, m);
        if (b) {
          var p;
          if ((p = n))
            a: {
              if (0 > c.indexOf(l))
                if (m && 0 < m.length)
                  for (var q = 0; q < m.length; q++) {
                    if (0 > c.indexOf(m[q])) {
                      O(11);
                      p = !1;
                      break a;
                    }
                  }
                else {
                  p = !1;
                  break a;
                }
              p = !0;
            }
          n = p;
        }
        var t = !1;
        if (d) {
          var u = 0 <= e.indexOf(l);
          if (u) t = u;
          else {
            var r = xa(e, m || []);
            r && O(10);
            t = r;
          }
        }
        var v = !n || t;
        v || !(0 <= m.indexOf("sandboxedScripts")) || (c && -1 !== c.indexOf("sandboxedScripts")) || (v = xa(e, fo));
        return (f[l] = v);
      };
    },
    go = !1;
  var ho = function () {
    return bo.test(E.location && E.location.hostname);
  };
  var jo = { initialized: 11, complete: 12, interactive: 13 },
    ko = {},
    lo = Object.freeze(((ko[P.g.ya] = !0), ko)),
    mo = 0 <= F.location.search.indexOf("?gtm_diagnostics=") || 0 <= F.location.search.indexOf("&gtm_diagnostics="),
    oo = function (a, b, c) {
      if (ai && "config" === a && !(1 < gl(b).J.length)) {
        var d,
          e = qb("google_tag_data", {});
        e.td || (e.td = {});
        d = e.td;
        var f = I(c.D);
        I(c.h, f);
        var g = [],
          l;
        for (l in d) {
          var m = no(d[l], f);
          m.length && (mo && console.log(m), g.push(l));
        }
        if (g.length) {
          if (g.length) {
            var n = b + "*" + g.join(".");
            ki = ki ? ki + "!" + n : "&tdc=" + n;
          }
          Xa("TAGGING", jo[F.readyState] || 14);
        }
        d[b] = f;
      }
    };
  function po(a, b) {
    var c = {},
      d;
    for (d in b) b.hasOwnProperty(d) && (c[d] = !0);
    for (var e in a) a.hasOwnProperty(e) && (c[e] = !0);
    return c;
  }
  function no(a, b, c, d) {
    c = void 0 === c ? {} : c;
    d = void 0 === d ? "" : d;
    if (a === b) return [];
    var e = function (q, t) {
        var u = t[q];
        return void 0 === u ? lo[q] : u;
      },
      f;
    for (f in po(a, b)) {
      var g = (d ? d + "." : "") + f,
        l = e(f, a),
        m = e(f, b),
        n = "object" === Kb(l) || "array" === Kb(l),
        p = "object" === Kb(m) || "array" === Kb(m);
      if (n && p) no(l, m, c, g);
      else if (n || p || l !== m) c[g] = !0;
    }
    return Object.keys(c);
  }
  var qo = !1,
    ro = 0,
    so = [];
  function to(a) {
    if (!qo) {
      var b = F.createEventObject,
        c = "complete" == F.readyState,
        d = "interactive" == F.readyState;
      if (!a || "readystatechange" != a.type || c || (!b && d)) {
        qo = !0;
        for (var e = 0; e < so.length; e++) G(so[e]);
      }
      so.push = function () {
        for (var f = 0; f < arguments.length; f++) G(arguments[f]);
        return 0;
      };
    }
  }
  function uo() {
    if (!qo && 140 > ro) {
      ro++;
      try {
        F.documentElement.doScroll("left"), to();
      } catch (a) {
        E.setTimeout(uo, 50);
      }
    }
  }
  var vo = function (a) {
    qo ? a() : so.push(a);
  };
  var wo = function (a, b) {
    return { entityType: 1, indexInOriginContainer: a, nameInOriginContainer: b, originContainerId: S.H };
  };
  var yo = function (a, b) {
      this.h = !1;
      this.D = [];
      this.M = { tags: [] };
      this.R = !1;
      this.m = this.B = 0;
      xo(this, a, b);
    },
    zo = function (a, b, c, d) {
      if (Zd.hasOwnProperty(b) || "__zone" === b) return -1;
      var e = {};
      Mb(d) && (e = I(d, e));
      e.id = c;
      e.status = "timeout";
      return a.M.tags.push(e) - 1;
    },
    Ao = function (a, b, c, d) {
      var e = a.M.tags[b];
      e && ((e.status = c), (e.executionTime = d));
    },
    Bo = function (a) {
      if (!a.h) {
        for (var b = a.D, c = 0; c < b.length; c++) b[c]();
        a.h = !0;
        a.D.length = 0;
      }
    },
    xo = function (a, b, c) {
      void 0 !== b && Co(a, b);
      c &&
        E.setTimeout(function () {
          return Bo(a);
        }, Number(c));
    },
    Co = function (a, b) {
      var c = Ga(function () {
        return G(function () {
          b(S.H, a.M);
        });
      });
      a.h ? c() : a.D.push(c);
    },
    Do = function (a) {
      a.B++;
      return Ga(function () {
        a.m++;
        a.R && a.m >= a.B && Bo(a);
      });
    },
    Eo = function (a) {
      a.R = !0;
      a.m >= a.B && Bo(a);
    };
  var Fo = {},
    Go = function () {
      return E.GoogleAnalyticsObject && E[E.GoogleAnalyticsObject];
    },
    Ho = !1;
  var Io = function (a) {
      E.GoogleAnalyticsObject || (E.GoogleAnalyticsObject = a || "ga");
      var b = E.GoogleAnalyticsObject;
      if (E[b]) E.hasOwnProperty(b);
      else {
        var c = function () {
          c.q = c.q || [];
          c.q.push(arguments);
        };
        c.l = Number(Ea());
        E[b] = c;
      }
      vn();
      return E[b];
    },
    Jo = function (a) {
      if (Tf()) {
        var b = Go();
        b(a + "require", "linker");
        b(a + "linker:passthrough", !0);
      }
    };
  function Ko() {
    return E.GoogleAnalyticsObject || "ga";
  }
  var Lo = function (a) {},
    Mo = function (a, b) {
      return function () {
        var c = Go(),
          d = c && c.getByName && c.getByName(a);
        if (d) {
          var e = d.get("sendHitTask");
          d.set("sendHitTask", function (f) {
            var g = f.get("hitPayload"),
              l = f.get("hitCallback"),
              m = 0 > g.indexOf("&tid=" + b);
            m &&
              (f.set("hitPayload", g.replace(/&tid=UA-[0-9]+-[0-9]+/, "&tid=" + b), !0),
              f.set("hitCallback", void 0, !0));
            e(f);
            m && (f.set("hitPayload", g, !0), f.set("hitCallback", l, !0), f.set("_x_19", void 0, !0), e(f));
          });
        }
      };
    };
  function Ro(a, b, c, d) {
    var e = oc[a],
      f = So(a, b, c, d);
    if (!f) return null;
    var g = xc(e[Ob.gh], c, []);
    if (g && g.length) {
      var l = g[0];
      f = Ro(l.index, { P: f, O: 1 === l.sh ? b.terminate : f, terminate: b.terminate }, c, d);
    }
    return f;
  }
  function So(a, b, c, d) {
    function e() {
      if (f[Ob.Ti]) l();
      else {
        var w = yc(f, c, []),
          y = w[Ob.Zh];
        if (null != y)
          for (var x = 0; x < y.length; x++)
            if (!eg(y[x])) {
              l();
              return;
            }
        var A = zo(c.Fb, String(f[Ob.Sa]), Number(f[Ob.sb]), w[Ob.Ui]),
          B = !1;
        w.vtp_gtmOnSuccess = function () {
          if (!B) {
            B = !0;
            var C = z() - J;
            Pi(c.id, oc[a], "5", C);
            Ao(c.Fb, A, "success", C);
            Q(70) && un(c, f, on.V.cj);
            g();
          }
        };
        w.vtp_gtmOnFailure = function () {
          if (!B) {
            B = !0;
            var C = z() - J;
            Pi(c.id, oc[a], "6", C);
            Ao(c.Fb, A, "failure", C);
            Q(70) && un(c, f, on.V.bj);
            l();
          }
        };
        w.vtp_gtmTagId = f.tag_id;
        w.vtp_gtmEventId = c.id;
        c.priorityId && (w.vtp_gtmPriorityId = c.priorityId);
        Pi(c.id, f, "1");
        var D = function () {
          var C = z() - J;
          Pi(c.id, f, "7", C);
          Ao(c.Fb, A, "exception", C);
          Q(70) && un(c, f, on.V.aj);
          B || ((B = !0), l());
        };
        if (Q(70)) {
          var H = rn(on.V.hh, S.H, c.id, Number(f[Ob.sb]), c.name, Th(f));
          sn(H);
        }
        var J = z();
        try {
          wc(w, { event: c, index: a, type: 1 });
        } catch (C) {
          D(C);
        }
        Q(70) && un(c, f, on.V.dj);
      }
    }
    var f = oc[a],
      g = b.P,
      l = b.O,
      m = b.terminate;
    if (c.xf(f)) return null;
    var n = xc(f[Ob.ih], c, []);
    if (n && n.length) {
      var p = n[0],
        q = Ro(p.index, { P: g, O: l, terminate: m }, c, d);
      if (!q) return null;
      g = q;
      l = 2 === p.sh ? m : q;
    }
    if (f[Ob.bh] || f[Ob.Wi]) {
      var t = f[Ob.bh] ? pc : c.Fk,
        u = g,
        r = l;
      if (!t[a]) {
        e = Ga(e);
        var v = To(a, t, e);
        g = v.P;
        l = v.O;
      }
      return function () {
        t[a](u, r);
      };
    }
    return e;
  }
  function To(a, b, c) {
    var d = [],
      e = [];
    b[a] = Uo(d, e, c);
    return {
      P: function () {
        b[a] = Vo;
        for (var f = 0; f < d.length; f++) d[f]();
      },
      O: function () {
        b[a] = Wo;
        for (var f = 0; f < e.length; f++) e[f]();
      },
    };
  }
  function Uo(a, b, c) {
    return function (d, e) {
      a.push(d);
      b.push(e);
      c();
    };
  }
  function Vo(a) {
    a();
  }
  function Wo(a, b) {
    b();
  }
  var Yo = function (a, b) {
      return 1 === arguments.length ? Xo("config", a) : Xo("config", a, b);
    },
    Zo = function (a, b, c) {
      c = c || {};
      c[P.g.Cb] = a;
      return Xo("event", b, c);
    };
  function Xo(a) {
    return arguments;
  }
  var $o = function () {
    this.h = [];
    this.m = [];
  };
  $o.prototype.enqueue = function (a, b, c) {
    var d = this.h.length + 1;
    a["gtm.uniqueEventId"] = b;
    a["gtm.priorityId"] = d;
    c.eventId = b;
    c.fromContainerExecution = !0;
    c.priorityId = d;
    var e = { message: a, notBeforeEventId: b, priorityId: d, messageContext: c };
    this.h.push(e);
    for (var f = 0; f < this.m.length; f++)
      try {
        this.m[f](e);
      } catch (g) {}
  };
  $o.prototype.listen = function (a) {
    this.m.push(a);
  };
  $o.prototype.get = function () {
    for (var a = {}, b = 0; b < this.h.length; b++) {
      var c = this.h[b],
        d = a[c.notBeforeEventId];
      d || ((d = []), (a[c.notBeforeEventId] = d));
      d.push(c);
    }
    return a;
  };
  $o.prototype.prune = function (a) {
    for (var b = [], c = [], d = 0; d < this.h.length; d++) {
      var e = this.h[d];
      e.notBeforeEventId === a ? b.push(e) : c.push(e);
    }
    this.h = c;
    return b;
  };
  var bp = function (a, b, c) {
      ap().enqueue(a, b, c);
    },
    dp = function () {
      var a = cp;
      ap().listen(a);
    };
  function ap() {
    var a = Wd.mb;
    a || ((a = new $o()), (Wd.mb = a));
    return a;
  }
  var lp = function (a) {
      var b = Wd.zones;
      return b
        ? b.getIsAllowedFn(Wg(), a)
        : function () {
            return !0;
          };
    },
    mp = function (a) {
      var b = Wd.zones;
      return b ? b.isActive(Wg(), a) : !0;
    };
  var pp = function (a, b) {
    for (var c = [], d = 0; d < oc.length; d++)
      if (a[d]) {
        var e = oc[d];
        var f = Do(b.Fb);
        try {
          var g = Ro(d, { P: f, O: f, terminate: f }, b, d);
          if (g) {
            var l = c,
              m = l.push,
              n = d,
              p = e["function"];
            if (!p) throw "Error: No function name given for function call.";
            var q = qc[p];
            m.call(l, { Ph: n, Fh: q ? q.priorityOverride || 0 : 0, execute: g });
          } else np(d, b), f();
        } catch (u) {
          f();
        }
      }
    c.sort(op);
    for (var t = 0; t < c.length; t++) c[t].execute();
    return 0 < c.length;
  };
  function op(a, b) {
    var c,
      d = b.Fh,
      e = a.Fh;
    c = d > e ? 1 : d < e ? -1 : 0;
    var f;
    if (0 !== c) f = c;
    else {
      var g = a.Ph,
        l = b.Ph;
      f = g > l ? 1 : g < l ? -1 : 0;
    }
    return f;
  }
  function np(a, b) {
    if (ai) {
      var c = function (d) {
        var e = b.xf(oc[d]) ? "3" : "4",
          f = xc(oc[d][Ob.gh], b, []);
        f && f.length && c(f[0].index);
        Pi(b.id, oc[d], e);
        var g = xc(oc[d][Ob.ih], b, []);
        g && g.length && c(g[0].index);
      };
      c(a);
    }
  }
  var sp = !1,
    qp;
  var $p = function (a) {
    var b = z(),
      c = a["gtm.uniqueEventId"],
      d = a["gtm.priorityId"],
      e = a.event;
    if ("gtm.js" === e) {
      if (sp) return !1;
      sp = !0;
    }
    var l,
      m = !1;
    if (mp(c)) l = lp(c);
    else {
      if ("gtm.js" !== e && "gtm.init" !== e && "gtm.init_consent" !== e) return !1;
      m = !0;
      l = lp(Number.MAX_SAFE_INTEGER);
    }
    Oi(c, e);
    var n = a.eventCallback,
      p = a.eventTimeout,
      q = n;
    var t = {
        id: c,
        priorityId: d,
        name: e,
        xf: io(l),
        Fk: [],
        zh: function () {
          O(6);
          Xa("HEALTH", 0);
        },
        mh: tp(),
        nh: up(c),
        Fb: new yo(q, p),
      },
      u = Cc(t);
    m && (u = vp(u));
    var r = pp(u, t),
      v = !1;
    Eo(t.Fb);
    ("gtm.js" !== e && "gtm.sync" !== e) || Lo(S.H);
    return Zp(u, r) || v;
  };
  function up(a) {
    return function (b) {
      ai && (Nb(b) || Yi(a, "input", b));
    };
  }
  function tp() {
    var a = {};
    a.event = Ae("event", 1);
    a.ecommerce = Ae("ecommerce", 1);
    a.gtm = Ae("gtm");
    a.eventModel = Ae("eventModel");
    return a;
  }
  function vp(a) {
    for (var b = [], c = 0; c < a.length; c++)
      if (a[c]) {
        var d = String(oc[c][Ob.Sa]);
        if (Yd[d] || void 0 !== oc[c][Ob.Xi] || pe[d]) b[c] = !0;
        Q(58) ||
          (0 !== oc[c][Ob.Sa].indexOf("__ccd") &&
            0 !== oc[c][Ob.Sa].indexOf("__ogt") &&
            "__set_product_settings" !== oc[c][Ob.Sa]) ||
          (b[c] = !0);
      }
    return b;
  }
  function Zp(a, b) {
    if (!b) return b;
    for (var c = 0; c < a.length; c++) if (a[c] && oc[c] && !Zd[String(oc[c][Ob.Sa])]) return !0;
    return !1;
  }
  var bq = function (a, b, c, d) {
      aq.push("event", [b, a], c, d);
    },
    cq = function (a, b, c, d) {
      aq.push("get", [a, b], c, d);
    },
    dq = function () {
      this.status = 1;
      this.D = {};
      this.h = {};
      this.M = {};
      this.R = null;
      this.B = {};
      this.m = !1;
    },
    eq = function (a, b, c, d) {
      var e = z();
      this.type = a;
      this.m = e;
      this.X = b || "";
      this.h = c;
      this.messageContext = d;
    },
    fq = function () {
      this.m = {};
      this.B = {};
      this.h = [];
    },
    gq = function (a, b) {
      var c = gl(b);
      return (a.m[c.U] = a.m[c.U] || new dq());
    },
    hq = function (a, b, c, d) {
      if (d.X) {
        var e = gq(a, d.X),
          f = e.R;
        if (f) {
          var g = I(c),
            l = I(e.D[d.X]),
            m = I(e.B),
            n = I(e.h),
            p = I(a.B),
            q = {};
          if (ai)
            try {
              q = I(te);
            } catch (v) {
              O(72);
            }
          var t = gl(d.X).prefix,
            u = function (v) {
              Xi(d.messageContext.eventId, t, v);
              var w = g[P.g.Rb];
              w && G(w);
            },
            r = hm(
              fm(
                em(
                  dm(
                    bm(
                      am(cm($l(Zl(Yl(new Xl(d.messageContext.eventId, d.messageContext.priorityId), g), l), m), n), p),
                      q,
                    ),
                    d.messageContext.eventMetadata,
                  ),
                  function () {
                    if (u) {
                      var v = u;
                      u = void 0;
                      v("2");
                    }
                  },
                ),
                function () {
                  if (u) {
                    var v = u;
                    u = void 0;
                    v("3");
                  }
                },
              ),
            );
          try {
            Xi(d.messageContext.eventId, t, "1"), oo(d.type, d.X, r), f(d.X, b, d.m, r);
          } catch (v) {
            Xi(d.messageContext.eventId, t, "4");
          }
        }
      }
    };
  fq.prototype.register = function (a, b, c) {
    var d = gq(this, a);
    3 !== d.status && ((d.R = b), (d.status = 3), c && (I(d.h, c), (d.h = c)), this.flush());
  };
  fq.prototype.push = function (a, b, c, d) {
    if (void 0 !== c) {
      if (!gl(c)) return;
      if (c) {
        var e = gl(c);
        e && 1 === gq(this, c).status && ((gq(this, c).status = 2), this.push("require", [{}], e.U, {}));
      }
      gq(this, c).m && (d.deferrable = !1);
    }
    this.h.push(new eq(a, c, b, d));
    d.deferrable || this.flush();
  };
  fq.prototype.flush = function (a) {
    for (var b = this, c = [], d = !1, e = {}; this.h.length; ) {
      var f = this.h[0];
      if (f.messageContext.deferrable)
        !f.X || gq(this, f.X).m ? ((f.messageContext.deferrable = !1), this.h.push(f)) : c.push(f), this.h.shift();
      else {
        var g = void 0;
        switch (f.type) {
          case "require":
            g = gq(this, f.X);
            if (3 !== g.status && !a) {
              this.h.push.apply(this.h, c);
              return;
            }
            break;
          case "set":
            k(f.h[0], function (t, u) {
              I(Ka(t, u), b.B);
            });
            break;
          case "config":
            g = gq(this, f.X);
            e.kb = {};
            k(
              f.h[0],
              (function (t) {
                return function (u, r) {
                  I(Ka(u, r), t.kb);
                };
              })(e),
            );
            var l = !!e.kb[P.g.Pc];
            delete e.kb[P.g.Pc];
            var m = gl(f.X),
              n = m.U === m.id;
            l || (n ? (g.B = {}) : (g.D[f.X] = {}));
            (g.m && l) || hq(this, P.g.wa, e.kb, f);
            g.m = !0;
            n ? I(e.kb, g.B) : (I(e.kb, g.D[f.X]), O(70));
            d = !0;
            break;
          case "event":
            g = gq(this, f.X);
            e.rd = {};
            k(
              f.h[0],
              (function (t) {
                return function (u, r) {
                  I(Ka(u, r), t.rd);
                };
              })(e),
            );
            hq(this, f.h[1], e.rd, f);
            break;
          case "get":
            g = gq(this, f.X);
            var p = {},
              q = ((p[P.g.Ra] = f.h[0]), (p[P.g.cb] = f.h[1]), p);
            hq(this, P.g.Da, q, f);
        }
        this.h.shift();
        iq(this, f);
      }
      e = { kb: e.kb, rd: e.rd };
    }
    this.h.push.apply(this.h, c);
    d && this.flush();
  };
  var iq = function (a, b) {
      if ("require" !== b.type)
        if (b.X) for (var c = gq(a, b.X).M[b.type] || [], d = 0; d < c.length; d++) c[d]();
        else
          for (var e in a.m)
            if (a.m.hasOwnProperty(e)) {
              var f = a.m[e];
              if (f && f.M) for (var g = f.M[b.type] || [], l = 0; l < g.length; l++) g[l]();
            }
    },
    jq = function (a, b) {
      var c = aq,
        d = I(b);
      I(gq(c, a).h, d);
      gq(c, a).h = d;
    },
    aq = new fq();
  var kq = {},
    lq = {},
    mq = function (a) {
      for (var b = [], c = [], d = {}, e = 0; e < a.length; d = { xd: d.xd, ud: d.ud }, e++) {
        var f = a[e];
        if (0 <= f.indexOf("-"))
          (d.xd = gl(f)),
            d.xd &&
              (sa(
                Xg(),
                (function (p) {
                  return function (q) {
                    return p.xd.U === q;
                  };
                })(d),
              )
                ? b.push(f)
                : c.push(f));
        else {
          var g = kq[f] || [];
          d.ud = {};
          g.forEach(
            (function (p) {
              return function (q) {
                return (p.ud[q] = !0);
              };
            })(d),
          );
          for (var l = Wg(), m = 0; m < l.length; m++)
            if (d.ud[l[m]]) {
              b = b.concat(Xg());
              break;
            }
          var n = lq[f] || [];
          n.length && (b = b.concat(n));
        }
      }
      return { bk: b, dk: c };
    },
    nq = function (a) {
      k(kq, function (b, c) {
        var d = c.indexOf(a);
        0 <= d && c.splice(d, 1);
      });
    },
    oq = function (a) {
      k(lq, function (b, c) {
        var d = c.indexOf(a);
        0 <= d && c.splice(d, 1);
      });
    };
  var pq = "HA GF G UA AW DC MC".split(" "),
    qq = !1,
    rq = !1;
  function sq(a, b) {
    a.hasOwnProperty("gtm.uniqueEventId") || Object.defineProperty(a, "gtm.uniqueEventId", { value: qe() });
    b.eventId = a["gtm.uniqueEventId"];
    b.priorityId = a["gtm.priorityId"];
    return { eventId: b.eventId, priorityId: b.priorityId };
  }
  var tq = {
      config: function (a, b) {
        var c = sq(a, b);
        if (!(2 > a.length) && h(a[1])) {
          var d = {};
          if (2 < a.length) {
            if ((void 0 != a[2] && !Mb(a[2])) || 3 < a.length) return;
            d = a[2];
          }
          var e = gl(a[1]);
          if (e) {
            Oi(c.eventId, "gtag.config");
            var f = e.U,
              g = e.id !== f;
            if (g ? -1 === Xg().indexOf(f) : -1 === Wg().indexOf(f)) {
              if (!Q(61) || !d[P.g.Pd]) {
                var l = d[P.g.oa] || aq.B[P.g.oa];
                g
                  ? ao(f, l, { source: 2, fromContainerExecution: b.fromContainerExecution })
                  : $n(f, l, !0, { source: 2, fromContainerExecution: b.fromContainerExecution });
              }
            } else {
              if (be && !g && !d[P.g.Pc]) {
                var m = rq;
                rq = !0;
                if (m) return;
              }
              qq || O(43);
              if (!b.noTargetGroup)
                if (g) {
                  oq(e.id);
                  var n = e.id,
                    p = d[P.g.Nd] || "default";
                  p = String(p).split(",");
                  for (var q = 0; q < p.length; q++) {
                    var t = lq[p[q]] || [];
                    lq[p[q]] = t;
                    0 > t.indexOf(n) && t.push(n);
                  }
                } else {
                  nq(e.id);
                  var u = e.id,
                    r = d[P.g.Nd] || "default";
                  r = r.toString().split(",");
                  for (var v = 0; v < r.length; v++) {
                    var w = kq[r[v]] || [];
                    kq[r[v]] = w;
                    0 > w.indexOf(u) && w.push(u);
                  }
                }
              delete d[P.g.Nd];
              var y = b.eventMetadata || {};
              y.hasOwnProperty("is_external_event") || (y.is_external_event = !b.fromContainerExecution);
              b.eventMetadata = y;
              delete d[P.g.Rb];
              for (var x = g ? [e.id] : Xg(), A = 0; A < x.length; A++) {
                var B = I(b);
                aq.push("config", [d], x[A], B);
              }
            }
          }
        }
      },
      consent: function (a, b) {
        if (3 === a.length) {
          O(39);
          var c = sq(a, b),
            d = a[1];
          "default" === d ? cg(a[2]) : "update" === d && dg(a[2], c);
        }
      },
      event: function (a, b) {
        var c = a[1];
        if (!(2 > a.length) && h(c)) {
          var d;
          if (2 < a.length) {
            if ((!Mb(a[2]) && void 0 != a[2]) || 3 < a.length) return;
            d = a[2];
          }
          var e = d,
            f = {},
            g = ((f.event = c), f);
          e &&
            ((g.eventModel = I(e)),
            e[P.g.Rb] && (g.eventCallback = e[P.g.Rb]),
            e[P.g.Jd] && (g.eventTimeout = e[P.g.Jd]));
          var l = sq(a, b),
            m = l.eventId,
            n = l.priorityId;
          g["gtm.uniqueEventId"] = m;
          n && (g["gtm.priorityId"] = n);
          if ("optimize.callback" === c) return (g.eventModel = g.eventModel || {}), g;
          var p;
          var q = d,
            t = q && q[P.g.Cb];
          void 0 === t && ((t = we(P.g.Cb, 2)), void 0 === t && (t = "default"));
          if (h(t) || ra(t)) {
            var u = t.toString().replace(/\s+/g, "").split(","),
              r = mq(u),
              v = r.bk,
              w = r.dk;
            if (w.length)
              for (var y = (q && q[P.g.oa]) || aq.B[P.g.oa], x = 0; x < w.length; x++) {
                var A = gl(w[x]);
                A && ao(A.U, y, { source: 3, fromContainerExecution: b.fromContainerExecution });
              }
            p = il(v);
          } else p = void 0;
          var B = p;
          if (B) {
            Oi(m, c);
            for (var D = [], H = 0; H < B.length; H++) {
              var J = B[H],
                C = I(b);
              if (-1 !== pq.indexOf(J.prefix)) {
                var K = I(d),
                  M = C.eventMetadata || {};
                M.hasOwnProperty("is_external_event") || (M.is_external_event = !C.fromContainerExecution);
                C.eventMetadata = M;
                delete K[P.g.Rb];
                bq(c, K, J.id, C);
              }
              D.push(J.id);
            }
            g.eventModel = g.eventModel || {};
            0 < B.length ? (g.eventModel[P.g.Cb] = D.join()) : delete g.eventModel[P.g.Cb];
            qq || O(43);
            return b.noGtmEvent ? void 0 : g;
          }
        }
      },
      get: function (a, b) {
        O(53);
        if (4 === a.length && h(a[1]) && h(a[2]) && pa(a[3])) {
          var c = gl(a[1]),
            d = String(a[2]),
            e = a[3];
          if (c) {
            qq || O(43);
            var f = aq.B[P.g.oa];
            if (
              !sa(Xg(), function (l) {
                return c.U === l;
              })
            )
              ao(c.U, f, { source: 4, fromContainerExecution: b.fromContainerExecution });
            else if (-1 !== pq.indexOf(c.prefix)) {
              sq(a, b);
              var g = {};
              Zf(I(((g[P.g.Ra] = d), (g[P.g.cb] = e), g)));
              cq(
                d,
                function (l) {
                  G(function () {
                    return e(l);
                  });
                },
                c.id,
                b,
              );
            }
          }
        }
      },
      js: function (a, b) {
        if (2 == a.length && a[1].getTime) {
          qq = !0;
          var c = sq(a, b),
            d = c.eventId,
            e = c.priorityId,
            f = {};
          return (
            (f.event = "gtm.js"),
            (f["gtm.start"] = a[1].getTime()),
            (f["gtm.uniqueEventId"] = d),
            (f["gtm.priorityId"] = e),
            f
          );
        }
      },
      policy: function () {},
      set: function (a, b) {
        var c;
        2 == a.length && Mb(a[1])
          ? (c = I(a[1]))
          : 3 == a.length && h(a[1]) && ((c = {}), Mb(a[2]) || ra(a[2]) ? (c[a[1]] = I(a[2])) : (c[a[1]] = a[2]));
        if (c) {
          var d = sq(a, b),
            e = d.eventId,
            f = d.priorityId;
          I(c);
          var g = I(c);
          aq.push("set", [g], void 0, b);
          c["gtm.uniqueEventId"] = e;
          f && (c["gtm.priorityId"] = f);
          Q(30) && delete c.event;
          b.overwriteModelFields = !0;
          return c;
        }
      },
    },
    uq = { policy: !0 };
  var vq = function (a) {
      var b = E[Vd.ja].hide;
      if (b && void 0 !== b[a] && b.end) {
        b[a] = !1;
        var c = !0,
          d;
        for (d in b)
          if (b.hasOwnProperty(d) && !0 === b[d]) {
            c = !1;
            break;
          }
        c && (b.end(), (b.end = null));
      }
    },
    wq = function (a) {
      var b = E[Vd.ja],
        c = b && b.hide;
      c && c.end && (c[a] = !0);
    };
  var xq = !1,
    yq = [];
  function zq() {
    if (!xq) {
      xq = !0;
      for (var a = 0; a < yq.length; a++) G(yq[a]);
    }
  }
  var Aq = function (a) {
    xq ? G(a) : yq.push(a);
  };
  var Rq = function (a) {
    if (Qq(a)) return a;
    this.h = a;
  };
  Rq.prototype.getUntrustedMessageValue = function () {
    return this.h;
  };
  var Qq = function (a) {
    return !a || "object" !== Kb(a) || Mb(a) ? !1 : "getUntrustedMessageValue" in a;
  };
  Rq.prototype.getUntrustedMessageValue = Rq.prototype.getUntrustedMessageValue;
  var Sq = 0,
    Tq = {},
    Uq = [],
    Vq = [],
    Wq = !1,
    Xq = !1;
  function Yq(a, b) {
    return (
      a.messageContext.eventId - b.messageContext.eventId || a.messageContext.priorityId - b.messageContext.priorityId
    );
  }
  var Zq = function (a) {
      return E[Vd.ja].push(a);
    },
    $q = function (a, b) {
      var c = Wd[Vd.ja],
        d = c ? c.subscribers : 1,
        e = 0,
        f = !1,
        g = void 0;
      b &&
        (g = E.setTimeout(function () {
          f || ((f = !0), a());
          g = void 0;
        }, b));
      return function () {
        ++e === d && (g && (E.clearTimeout(g), (g = void 0)), f || (a(), (f = !0)));
      };
    };
  function ar(a, b) {
    var c = a._clear || b.overwriteModelFields;
    k(a, function (e, f) {
      "_clear" !== e && (c && ze(e), ze(e, f));
    });
    le || (le = a["gtm.start"]);
    var d = a["gtm.uniqueEventId"];
    if (!a.event) return !1;
    "number" !== typeof d && ((d = qe()), (a["gtm.uniqueEventId"] = d), ze("gtm.uniqueEventId", d));
    return $p(a);
  }
  function br(a) {
    if (null == a || "object" !== typeof a) return !1;
    if (a.event) return !0;
    if (za(a)) {
      var b = a[0];
      if ("config" === b || "event" === b || "js" === b || "get" === b) return !0;
    }
    return !1;
  }
  function cr() {
    var a;
    if (Vq.length) a = Vq.shift();
    else if (Uq.length) a = Uq.shift();
    else return;
    var b;
    var c = a;
    if (Wq || !br(c.message)) b = c;
    else {
      Wq = !0;
      var d = c.message["gtm.uniqueEventId"];
      "number" !== typeof d && (d = c.message["gtm.uniqueEventId"] = qe());
      var e = {},
        f = {
          message: ((e.event = "gtm.init_consent"), (e["gtm.uniqueEventId"] = d - 2), e),
          messageContext: { eventId: d - 2 },
        },
        g = {},
        l = {
          message: ((g.event = "gtm.init"), (g["gtm.uniqueEventId"] = d - 1), g),
          messageContext: { eventId: d - 1 },
        };
      Uq.unshift(l, c);
      if (ai && S.H) {
        var m;
        if (S.cf) {
          var n = S.H,
            p = Zg().destination[n];
          m = p && p.context;
        } else {
          var q = S.H,
            t = Zg().container[q];
          m = t && t.context;
        }
        var u = m,
          r,
          v = We(E.location.href);
        r = v.hostname + v.pathname;
        var w = u && u.fromContainerExecution,
          y = u && u.source,
          x = S.H,
          A = S.ob,
          B = S.cf;
        mi || (mi = r);
        li.push(x + ";" + A + ";" + (w ? 1 : 0) + ";" + (y || 0) + ";" + (B ? 1 : 0));
      }
      b = f;
    }
    return b;
  }
  function dr() {
    for (var a = !1, b; !Xq && (b = cr()); ) {
      Xq = !0;
      delete te.eventModel;
      ve();
      var c = b,
        d = c.message,
        e = c.messageContext;
      if (null == d) Xq = !1;
      else {
        if (e.fromContainerExecution)
          for (
            var f = ["gtm.allowlist", "gtm.blocklist", "gtm.whitelist", "gtm.blacklist", "tagTypeBlacklist"], g = 0;
            g < f.length;
            g++
          ) {
            var l = f[g],
              m = we(l, 1);
            if (ra(m) || Mb(m)) m = I(m);
            ue[l] = m;
          }
        try {
          if (pa(d))
            try {
              d.call(xe);
            } catch (D) {}
          else if (ra(d)) {
            var n = d;
            if (h(n[0])) {
              var p = n[0].split("."),
                q = p.pop(),
                t = n.slice(1),
                u = we(p.join("."), 2);
              if (null != u)
                try {
                  u[q].apply(u, t);
                } catch (D) {}
            }
          } else {
            var r = void 0,
              v = !1;
            if (za(d)) {
              a: {
                if (d.length && h(d[0])) {
                  var w = tq[d[0]];
                  if (w && (!e.fromContainerExecution || !uq[d[0]])) {
                    r = w(d, e);
                    break a;
                  }
                }
                r = void 0;
              }
              (v = r && "set" === d[0] && !!r.event) && O(101);
            } else r = d;
            if (r) {
              var y = ar(r, e);
              a = y || a;
              v && y && O(113);
            }
          }
        } finally {
          e.fromContainerExecution && ve(!0);
          var x = d["gtm.uniqueEventId"];
          if ("number" === typeof x) {
            for (var A = Tq[String(x)] || [], B = 0; B < A.length; B++) Vq.push(er(A[B]));
            A.length && Vq.sort(Yq);
            delete Tq[String(x)];
            x > Sq && (Sq = x);
          }
          Xq = !1;
        }
      }
    }
    return !a;
  }
  function fr() {
    if (Q(70) && gr()) {
      var b = rn(on.V.Wf, S.H),
        c = rn(on.V.di, S.H);
      sn(c) && tn(c, b);
    }
    var d = dr();
    try {
      vq(S.H);
    } catch (e) {}
    return d;
  }
  function cp(a) {
    if (Sq < a.notBeforeEventId) {
      var b = String(a.notBeforeEventId);
      Tq[b] = Tq[b] || [];
      Tq[b].push(a);
    } else
      Vq.push(er(a)),
        Vq.sort(Yq),
        G(function () {
          Xq || dr();
        });
  }
  function er(a) {
    return { message: a.message, messageContext: a.messageContext };
  }
  var hr = function () {
      function a(g) {
        var l = {};
        if (Qq(g)) {
          var m = g;
          g = Qq(m) ? m.getUntrustedMessageValue() : void 0;
          l.fromContainerExecution = !0;
        }
        return { message: g, messageContext: l };
      }
      var b = qb(Vd.ja, []),
        c = (Wd[Vd.ja] = Wd[Vd.ja] || {});
      !0 === c.pruned && O(83);
      Tq = ap().get();
      dp();
      vo(function () {
        if (!c.gtmDom) {
          c.gtmDom = !0;
          var g = {};
          b.push(((g.event = "gtm.dom"), g));
        }
      });
      Aq(function () {
        if (!c.gtmLoad) {
          c.gtmLoad = !0;
          var g = {};
          b.push(((g.event = "gtm.load"), g));
        }
      });
      c.subscribers = (c.subscribers || 0) + 1;
      var d = b.push;
      b.push = function () {
        var g;
        if (0 < Wd.SANDBOXED_JS_SEMAPHORE) {
          g = [];
          for (var l = 0; l < arguments.length; l++) g[l] = new Rq(arguments[l]);
        } else g = [].slice.call(arguments, 0);
        var m = g.map(function (t) {
          return a(t);
        });
        Uq.push.apply(Uq, m);
        var n = d.apply(b, g),
          p = Math.max(100, Number("1000") || 300);
        if (this.length > p) for (O(4), c.pruned = !0; this.length > p; ) this.shift();
        var q = "boolean" !== typeof n || n;
        return dr() && q;
      };
      var e = b.slice(0).map(function (g) {
        return a(g);
      });
      Uq.push.apply(Uq, e);
      if (gr()) {
        if (Q(70)) {
          var f = rn(on.V.Wf, S.H);
          sn(f);
        }
        G(fr);
      }
    },
    gr = function () {
      var a = !0;
      return a;
    };
  function ir(a) {
    if (null == a || 0 === a.length) return !1;
    var b = Number(a),
      c = z();
    return b < c + 3e5 && b > c - 9e5;
  }
  function jr(a) {
    return a && 0 === a.indexOf("pending:") ? ir(a.substr(8)) : !1;
  }
  var tc = {};
  tc.Ud = new String("undefined");
  var Kr = E.clearTimeout,
    Lr = E.setTimeout,
    W = function (a, b, c, d) {
      if (Ug()) {
        b && G(b);
      } else return vb(a, b, c, d);
    },
    Mr = function () {
      return new Date();
    },
    Nr = function () {
      return E.location.href;
    },
    Or = function (a) {
      return Ue(We(a), "fragment");
    },
    Pr = function (a) {
      return Ve(We(a));
    },
    Qr = function (a, b) {
      return we(a, b || 2);
    },
    Rr = function (a, b, c) {
      var d;
      b ? ((a.eventCallback = b), c && (a.eventTimeout = c), (d = Zq(a))) : (d = Zq(a));
      return d;
    },
    Sr = function (a, b) {
      E[a] = b;
    },
    X = function (a, b, c) {
      b && (void 0 === E[a] || (c && !E[a])) && (E[a] = b);
      return E[a];
    },
    Tr = function (a, b, c) {
      return ug(a, b, void 0 === c ? !0 : !!c);
    },
    Ur = function (a, b, c) {
      return 0 === Dg(a, b, c);
    },
    Vr = function (a, b) {
      if (Ug()) {
        b && G(b);
      } else xb(a, b);
    },
    Wr = function (a) {
      return !!qr(a, "init", !1);
    },
    Xr = function (a) {
      or(a, "init", !0);
    },
    Yr = function (a, b, c) {
      ai && (Nb(a) || Yi(c, b, a));
    };
  var vs = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"];
  function ws(a, b) {
    a = String(a);
    b = String(b);
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) === c;
  }
  var xs = new ua();
  function ys(a, b, c) {
    var d = c ? "i" : void 0;
    try {
      var e = String(b) + d,
        f = xs.get(e);
      f || ((f = new RegExp(b, d)), xs.set(e, f));
      return f.test(a);
    } catch (g) {
      return !1;
    }
  }
  function zs(a, b) {
    function c(g) {
      var l = We(g),
        m = Ue(l, "protocol"),
        n = Ue(l, "host", !0),
        p = Ue(l, "port"),
        q = Ue(l, "path").toLowerCase().replace(/\/$/, "");
      if (void 0 === m || ("http" === m && "80" === p) || ("https" === m && "443" === p)) (m = "web"), (p = "default");
      return [m, n, p, q];
    }
    for (var d = c(String(a)), e = c(String(b)), f = 0; f < d.length; f++) if (d[f] !== e[f]) return !1;
    return !0;
  }
  function As(a) {
    return Bs(a) ? 1 : 0;
  }
  function Bs(a) {
    var b = a.arg0,
      c = a.arg1;
    if (a.any_of && Array.isArray(c)) {
      for (var d = 0; d < c.length; d++) {
        var e = I(a, {});
        I({ arg1: c[d], any_of: void 0 }, e);
        if (As(e)) return !0;
      }
      return !1;
    }
    switch (a["function"]) {
      case "_cn":
        return 0 <= String(b).indexOf(String(c));
      case "_css":
        var f;
        a: {
          if (b)
            try {
              for (var g = 0; g < vs.length; g++) {
                var l = vs[g];
                if (b[l]) {
                  f = b[l](c);
                  break a;
                }
              }
            } catch (m) {}
          f = !1;
        }
        return f;
      case "_ew":
        return ws(b, c);
      case "_eq":
        return String(b) === String(c);
      case "_ge":
        return Number(b) >= Number(c);
      case "_gt":
        return Number(b) > Number(c);
      case "_lc":
        return 0 <= String(b).split(",").indexOf(String(c));
      case "_le":
        return Number(b) <= Number(c);
      case "_lt":
        return Number(b) < Number(c);
      case "_re":
        return ys(b, c, a.ignore_case);
      case "_sw":
        return 0 === String(b).indexOf(String(c));
      case "_um":
        return zs(b, c);
    }
    return !1;
  }
  Object.freeze({ dl: 1, id: 1 });
  Object.freeze(["config", "event", "get", "set"]);
  function Xs() {
    return (E.gaGlobal = E.gaGlobal || {});
  }
  var Ys = function () {
      var a = Xs();
      a.hid = a.hid || ta();
      return a.hid;
    },
    Zs = function (a, b) {
      var c = Xs();
      if (void 0 == c.vid || (b && !c.from_cookie)) (c.vid = a), (c.from_cookie = b);
    };
  var ut = function () {
      var a = !0;
      (Sh(7) && Sh(9) && Sh(10)) || (a = !1);
      return a;
    },
    vt = function () {
      var a = !0;
      (Sh(3) && Sh(4)) || (a = !1);
      return a;
    };
  var Zt = window,
    $t = document,
    au = function (a) {
      var b = Zt._gaUserPrefs;
      if ((b && b.ioo && b.ioo()) || (a && !0 === Zt["ga-disable-" + a])) return !0;
      try {
        var c = Zt.external;
        if (c && c._gaUserPrefs && "oo" == c._gaUserPrefs) return !0;
      } catch (f) {}
      for (var d = og("AMP_TOKEN", String($t.cookie), !0), e = 0; e < d.length; e++) if ("$OPT_OUT" == d[e]) return !0;
      return $t.getElementById("__gaOptOutExtension") ? !0 : !1;
    };
  function iu(a) {
    k(a, function (c) {
      "_" === c.charAt(0) && delete a[c];
    });
    var b = a[P.g.Na] || {};
    k(b, function (c) {
      "_" === c.charAt(0) && delete b[c];
    });
  }
  var ru = function (a, b) {};
  function qu(a, b) {
    var c = function () {};
    return c;
  }
  function su(a, b, c) {}
  var xv = function (a, b) {
      if (!b.C) {
        var c = U(b, P.g.Ra),
          d = U(b, P.g.cb),
          e = U(b, c);
        if (void 0 === e) {
          var f = void 0;
          uv.hasOwnProperty(c) ? (f = uv[c]) : vv.hasOwnProperty(c) && (f = vv[c]);
          1 === f && (f = wv(c));
          h(f)
            ? Go()(function () {
                var g = Go().getByName(a).get(f);
                d(g);
              })
            : d(void 0);
        } else d(e);
      }
    },
    yv = function (a, b) {
      var c = a[P.g.Vb],
        d = b + ".",
        e = a[P.g.N] || "",
        f = void 0 === c ? !!a.use_anchor : "fragment" === c,
        g = !!a[P.g.Ab];
      e = String(e).replace(/\s+/g, "").split(",");
      var l = Go();
      l(d + "require", "linker");
      l(d + "linker:autoLink", e, f, g);
    },
    Cv = function (a, b, c) {
      if (Tf() && (!c.C || !zv[a])) {
        var d = !eg(P.g.T),
          e = function (f) {
            var g,
              l,
              m = Go(),
              n = Av(b, "", c),
              p,
              q = n.createOnlyFields._useUp;
            if (c.C || Bv(b, n.createOnlyFields)) {
              c.C && ((g = "gtm" + qe()), (l = n.createOnlyFields), n.gtmTrackerName && (l.name = g));
              m(function () {
                var u = m.getByName(b);
                u && (p = u.get("clientId"));
                c.C || m.remove(b);
              });
              m("create", a, c.C ? l : n.createOnlyFields);
              d &&
                eg(P.g.T) &&
                ((d = !1),
                m(function () {
                  var u = Go().getByName(c.C ? g : b);
                  !u ||
                    (u.get("clientId") == p && q) ||
                    (c.C
                      ? ((n.fieldsToSet["&gcu"] = "1"), (n.fieldsToSet["&gcut"] = Sd[f]))
                      : ((n.fieldsToSend["&gcu"] = "1"), (n.fieldsToSend["&gcut"] = Sd[f])),
                    u.set(n.fieldsToSet),
                    c.C ? u.send("pageview") : u.send("pageview", n.fieldsToSend));
                }));
              c.C &&
                m(function () {
                  m.remove(g);
                });
            }
          };
        hg(function () {
          return e(P.g.T);
        }, P.g.T);
        hg(function () {
          return e(P.g.F);
        }, P.g.F);
        c.C && (zv[a] = !0);
      }
    },
    Dv = function (a, b) {
      Yn() && b && (a[P.g.zb] = b);
    },
    Mv = function (a, b, c) {
      function d() {
        var C = U(c, P.g.Hc);
        l(function () {
          if (!c.C && Mb(C)) {
            var K = r.fieldsToSend,
              M = m().getByName(n),
              T;
            for (T in C)
              if (C.hasOwnProperty(T) && /^(dimension|metric)\d+$/.test(T) && void 0 != C[T]) {
                var ba = M.get(wv(C[T]));
                Ev(K, T, ba);
              }
          }
        });
      }
      function e() {
        if (r.displayfeatures) {
          var C = "_dc_gtm_" + f.replace(/[^A-Za-z0-9-]/g, "");
          p("require", "displayfeatures", void 0, { cookieName: C });
        }
      }
      var f = a,
        g = "https://www.google-analytics.com/analytics.js",
        l = c.C ? Io(U(c, "gaFunctionName")) : Io();
      if (pa(l)) {
        var m = Go,
          n;
        c.C ? (n = U(c, "name") || U(c, "gtmTrackerName")) : (n = "gtag_" + f.split("-").join("_"));
        var p = function (C) {
            var K = [].slice.call(arguments, 0);
            K[0] = n ? n + "." + K[0] : "" + K[0];
            l.apply(window, K);
          },
          q = function (C) {
            var K = function (ca, V) {
                for (var R = 0; V && R < V.length; R++) p(ca, V[R]);
              },
              M = c.C,
              T = M ? Fv(r) : Gv(b, c);
            if (T) {
              var ba = {};
              Dv(ba, C);
              p("require", "ec", "ec.js", ba);
              M && T.qf && p("set", "&cu", T.qf);
              var L = T.action;
              if (M || "impressions" === L) if ((K("ec:addImpression", T.xh), !M)) return;
              if ("promo_click" === L || "promo_view" === L || (M && T.ld)) {
                var N = T.ld;
                K("ec:addPromo", N);
                if (N && 0 < N.length && "promo_click" === L) {
                  M ? p("ec:setAction", L, T.Ta) : p("ec:setAction", L);
                  return;
                }
                if (!M) return;
              }
              "promo_view" !== L && "impressions" !== L && (K("ec:addProduct", T.Hb), p("ec:setAction", L, T.Ta));
            }
          },
          t = function (C) {
            if (C) {
              var K = {};
              if (Mb(C)) for (var M in Hv) Hv.hasOwnProperty(M) && Iv(Hv[M], M, C[M], K);
              Dv(K, y);
              p("require", "linkid", K);
            }
          },
          u = function () {
            if (Ug()) {
            } else {
              var C = U(c, P.g.Ci);
              C && (p("require", C, { dataLayer: Vd.ja }), p("require", "render"));
            }
          },
          r = Av(n, b, c),
          v = function (C, K, M) {
            M && (K = "" + K);
            r.fieldsToSend[C] = K;
          };
        !c.C &&
          Bv(n, r.createOnlyFields) &&
          (l(function () {
            m() && m().remove(n);
          }),
          (Jv[n] = !1));
        l("create", f, r.createOnlyFields);
        if (r.createOnlyFields[P.g.zb] && !c.C) {
          var w = Xn(r.createOnlyFields[P.g.zb], "/analytics.js");
          w && (g = w);
        }
        var y = c.C ? r.fieldsToSet[P.g.zb] : r.createOnlyFields[P.g.zb];
        if (y) {
          var x = c.C ? r.fieldsToSet[P.g.Ld] : r.createOnlyFields[P.g.Ld];
          x && !Jv[n] && ((Jv[n] = !0), l(Mo(n, x)));
        }
        c.C ? r.enableRecaptcha && p("require", "recaptcha", "recaptcha.js") : (d(), t(r.linkAttribution));
        var A = r[P.g.sa];
        A && A[P.g.N] && yv(A, n);
        p("set", r.fieldsToSet);
        if (c.C) {
          if (r.enableLinkId) {
            var B = {};
            Dv(B, y);
            p("require", "linkid", "linkid.js", B);
          }
          Tf() && Cv(f, n, c);
        }
        if (b === P.g.xc)
          if (c.C) {
            e();
            if (r.remarketingLists) {
              var D = "_dc_gtm_" + f.replace(/[^A-Za-z0-9-]/g, "");
              p("require", "adfeatures", { cookieName: D });
            }
            q(y);
            p("send", "pageview");
            r.createOnlyFields._useUp && Jo(n + ".");
          } else u(), p("send", "pageview", r.fieldsToSend);
        else
          b === P.g.wa
            ? (u(),
              vl(f, c),
              U(c, P.g.fb) && (Wk(["aw", "dc"]), Jo(n + ".")),
              0 != r.sendPageView && p("send", "pageview", r.fieldsToSend),
              Cv(f, n, c))
            : b === P.g.Da
            ? xv(n, c)
            : "screen_view" === b
            ? p("send", "screenview", r.fieldsToSend)
            : "timing_complete" === b
            ? ((r.fieldsToSend.hitType = "timing"),
              v("timingCategory", r.eventCategory, !0),
              c.C ? v("timingVar", r.timingVar, !0) : v("timingVar", r.name, !0),
              v("timingValue", Aa(r.value)),
              void 0 !== r.eventLabel && v("timingLabel", r.eventLabel, !0),
              p("send", r.fieldsToSend))
            : "exception" === b
            ? p("send", "exception", r.fieldsToSend)
            : ("" === b && c.C) ||
              ("track_social" === b && c.C
                ? ((r.fieldsToSend.hitType = "social"),
                  v("socialNetwork", r.socialNetwork, !0),
                  v("socialAction", r.socialAction, !0),
                  v("socialTarget", r.socialTarget, !0))
                : ((c.C || Kv[b]) && q(y),
                  c.C && e(),
                  (r.fieldsToSend.hitType = "event"),
                  v("eventCategory", r.eventCategory, !0),
                  v("eventAction", r.eventAction || b, !0),
                  void 0 !== r.eventLabel && v("eventLabel", r.eventLabel, !0),
                  void 0 !== r.value && v("eventValue", Aa(r.value))),
              p("send", r.fieldsToSend));
        if (!Lv && !c.C) {
          Lv = !0;
          vn();
          var H = function () {
              c.O();
            },
            J = function () {
              m().loaded || H();
            };
          Ug() ? G(J) : vb(g, J, H);
        }
      } else G(c.O);
    },
    Nv = function (a, b, c, d) {
      ig(
        function () {
          Mv(a, b, d);
        },
        [P.g.T, P.g.F],
      );
    },
    Pv = function (a) {
      function b(e) {
        function f(l, m) {
          for (var n = 0; n < m.length; n++) {
            var p = m[n];
            if (e[p]) {
              g[l] = e[p];
              break;
            }
          }
        }
        var g = I(e);
        f("id", ["id", "item_id", "promotion_id"]);
        f("name", ["name", "item_name", "promotion_name"]);
        f("brand", ["brand", "item_brand"]);
        f("variant", ["variant", "item_variant"]);
        f("list", ["list_name", "item_list_name"]);
        f("position", ["list_position", "creative_slot", "index"]);
        (function () {
          if (e.category) g.category = e.category;
          else {
            for (var l = "", m = 0; m < Ov.length; m++) void 0 !== e[Ov[m]] && (l && (l += "/"), (l += e[Ov[m]]));
            l && (g.category = l);
          }
        })();
        f("listPosition", ["list_position"]);
        f("creative", ["creative_name"]);
        f("list", ["list_name"]);
        f("position", ["list_position", "creative_slot"]);
        return g;
      }
      for (var c = [], d = 0; a && d < a.length; d++) a[d] && Mb(a[d]) && c.push(b(a[d]));
      return c.length ? c : void 0;
    },
    Qv = function (a) {
      return eg(a);
    },
    Rv = !1;
  var Lv,
    Jv = {},
    zv = {},
    Sv = {},
    uv = Object.freeze(
      ((Sv.client_storage = "storage"),
      (Sv.sample_rate = 1),
      (Sv.site_speed_sample_rate = 1),
      (Sv.store_gac = 1),
      (Sv.use_amp_client_id = 1),
      (Sv[P.g.pb] = 1),
      (Sv[P.g.ra] = "storeGac"),
      (Sv[P.g.Za] = 1),
      (Sv[P.g.Ja] = 1),
      (Sv[P.g.ab] = 1),
      (Sv[P.g.Fc] = 1),
      (Sv[P.g.Ce] = 1),
      (Sv[P.g.yb] = 1),
      Sv),
    ),
    Tv = {},
    Uv = Object.freeze(
      ((Tv._cs = 1),
      (Tv._useUp = 1),
      (Tv.allowAnchor = 1),
      (Tv.allowLinker = 1),
      (Tv.alwaysSendReferrer = 1),
      (Tv.clientId = 1),
      (Tv.cookieDomain = 1),
      (Tv.cookieExpires = 1),
      (Tv.cookieFlags = 1),
      (Tv.cookieName = 1),
      (Tv.cookiePath = 1),
      (Tv.cookieUpdate = 1),
      (Tv.legacyCookieDomain = 1),
      (Tv.legacyHistoryImport = 1),
      (Tv.name = 1),
      (Tv.sampleRate = 1),
      (Tv.siteSpeedSampleRate = 1),
      (Tv.storage = 1),
      (Tv.storeGac = 1),
      (Tv.useAmpClientId = 1),
      (Tv._cd2l = 1),
      Tv),
    ),
    Vv = Object.freeze({ anonymize_ip: 1 }),
    Wv = {},
    vv = Object.freeze(
      ((Wv.campaign = {
        content: "campaignContent",
        id: "campaignId",
        medium: "campaignMedium",
        name: "campaignName",
        source: "campaignSource",
        term: "campaignKeyword",
      }),
      (Wv.app_id = 1),
      (Wv.app_installer_id = 1),
      (Wv.app_name = 1),
      (Wv.app_version = 1),
      (Wv.description = "exDescription"),
      (Wv.fatal = "exFatal"),
      (Wv.language = 1),
      (Wv.page_hostname = "hostname"),
      (Wv.transport_type = "transport"),
      (Wv[P.g.na] = "currencyCode"),
      (Wv[P.g.Ag] = 1),
      (Wv[P.g.La] = "location"),
      (Wv[P.g.Me] = "page"),
      (Wv[P.g.Ma] = "referrer"),
      (Wv[P.g.Xb] = "title"),
      (Wv[P.g.Hg] = 1),
      (Wv[P.g.va] = 1),
      Wv),
    ),
    Xv = {},
    Yv = Object.freeze(
      ((Xv.content_id = 1),
      (Xv.event_action = 1),
      (Xv.event_category = 1),
      (Xv.event_label = 1),
      (Xv.link_attribution = 1),
      (Xv.name = 1),
      (Xv[P.g.sa] = 1),
      (Xv[P.g.zg] = 1),
      (Xv[P.g.ya] = 1),
      (Xv[P.g.la] = 1),
      Xv),
    ),
    Zv = Object.freeze({
      displayfeatures: 1,
      enableLinkId: 1,
      enableRecaptcha: 1,
      eventAction: 1,
      eventCategory: 1,
      eventLabel: 1,
      gaFunctionName: 1,
      gtmEcommerceData: 1,
      gtmTrackerName: 1,
      linker: 1,
      remarketingLists: 1,
      socialAction: 1,
      socialNetwork: 1,
      socialTarget: 1,
      timingVar: 1,
      value: 1,
    }),
    Ov = Object.freeze(["item_category", "item_category2", "item_category3", "item_category4", "item_category5"]),
    $v = {},
    Hv = Object.freeze((($v.levels = 1), ($v[P.g.Ja] = "duration"), ($v[P.g.Fc] = 1), $v)),
    aw = {},
    bw = Object.freeze(
      ((aw.anonymize_ip = 1),
      (aw.fatal = 1),
      (aw.send_page_view = 1),
      (aw.store_gac = 1),
      (aw.use_amp_client_id = 1),
      (aw[P.g.ra] = 1),
      (aw[P.g.Ag] = 1),
      aw),
    ),
    Iv = function (a, b, c, d) {
      if (void 0 !== c)
        if ((bw[b] && (c = Ba(c)), "anonymize_ip" !== b || c || (c = void 0), 1 === a)) d[wv(b)] = c;
        else if (h(a)) d[a] = c;
        else for (var e in a) a.hasOwnProperty(e) && void 0 !== c[e] && (d[a[e]] = c[e]);
    },
    wv = function (a) {
      return a && h(a)
        ? a.replace(/(_[a-z])/g, function (b) {
            return b[1].toUpperCase();
          })
        : a;
    },
    cw = {},
    Kv = Object.freeze(
      ((cw.checkout_progress = 1),
      (cw.select_content = 1),
      (cw.set_checkout_option = 1),
      (cw[P.g.sc] = 1),
      (cw[P.g.uc] = 1),
      (cw[P.g.Nb] = 1),
      (cw[P.g.vc] = 1),
      (cw[P.g.vb] = 1),
      (cw[P.g.Ob] = 1),
      (cw[P.g.wb] = 1),
      (cw[P.g.Ca] = 1),
      (cw[P.g.wc] = 1),
      (cw[P.g.Ia] = 1),
      cw),
    ),
    dw = {},
    ew = Object.freeze(
      ((dw.checkout_progress = 1),
      (dw.set_checkout_option = 1),
      (dw[P.g.dg] = 1),
      (dw[P.g.eg] = 1),
      (dw[P.g.sc] = 1),
      (dw[P.g.uc] = 1),
      (dw[P.g.fg] = 1),
      (dw[P.g.Nb] = 1),
      (dw[P.g.Ca] = 1),
      (dw[P.g.wc] = 1),
      (dw[P.g.gg] = 1),
      dw),
    ),
    fw = {},
    gw = Object.freeze(
      ((fw.generate_lead = 1),
      (fw.login = 1),
      (fw.search = 1),
      (fw.select_content = 1),
      (fw.share = 1),
      (fw.sign_up = 1),
      (fw.view_search_results = 1),
      (fw[P.g.vc] = 1),
      (fw[P.g.vb] = 1),
      (fw[P.g.Ob] = 1),
      (fw[P.g.wb] = 1),
      (fw[P.g.Ia] = 1),
      fw),
    ),
    hw = function (a) {
      var b = "general";
      ew[a] ? (b = "ecommerce") : gw[a] ? (b = "engagement") : "exception" === a && (b = "error");
      return b;
    },
    iw = {},
    jw = Object.freeze(((iw.view_search_results = 1), (iw[P.g.vb] = 1), (iw[P.g.wb] = 1), (iw[P.g.Ia] = 1), iw)),
    Ev = function (a, b, c) {
      a.hasOwnProperty(b) || (a[b] = c);
    },
    kw = function (a) {
      if (ra(a)) {
        for (var b = [], c = 0; c < a.length; c++) {
          var d = a[c];
          if (void 0 != d) {
            var e = d.id,
              f = d.variant;
            void 0 != e && void 0 != f && b.push(String(e) + "." + String(f));
          }
        }
        return 0 < b.length ? b.join("!") : void 0;
      }
    },
    Av = function (a, b, c) {
      var d = function (K) {
          return U(c, K);
        },
        e = {},
        f = {},
        g = {},
        l = {},
        m = kw(d(P.g.Bi));
      !c.C && m && Ev(f, "exp", m);
      g["&gtm"] = fh(!0);
      Q(69) && !c.C && (g._no_slc = !0);
      Tf() && (l._cs = Qv);
      var n = d(P.g.Hc);
      if (!c.C && Mb(n))
        for (var p in n)
          if (n.hasOwnProperty(p) && /^(dimension|metric)\d+$/.test(p) && void 0 != n[p]) {
            var q = d(String(n[p]));
            void 0 !== q && Ev(f, p, q);
          }
      for (var t = Ul(c), u = 0; u < t.length; ++u) {
        var r = t[u];
        if (c.C) {
          var v = d(r);
          Zv.hasOwnProperty(r) ? (e[r] = v) : Uv.hasOwnProperty(r) ? (l[r] = v) : (g[r] = v);
        } else {
          var w = void 0;
          w = r !== P.g.ba ? d(r) : Vl(c, r);
          if (Yv.hasOwnProperty(r)) Iv(Yv[r], r, w, e);
          else if (Vv.hasOwnProperty(r)) Iv(Vv[r], r, w, g);
          else if (vv.hasOwnProperty(r)) Iv(vv[r], r, w, f);
          else if (uv.hasOwnProperty(r)) Iv(uv[r], r, w, l);
          else if (/^(dimension|metric|content_group)\d+$/.test(r)) Iv(1, r, w, f);
          else if (r === P.g.ba) {
            if (!Rv) {
              var y = Ma(w);
              y && (f["&did"] = y);
            }
            var x = void 0,
              A = void 0;
            b === P.g.wa ? (x = Ma(Vl(c, r), ".")) : ((x = Ma(Vl(c, r, 1), ".")), (A = Ma(Vl(c, r, 2), ".")));
            x && (f["&gdid"] = x);
            A && (f["&edid"] = A);
          } else r === P.g.Qa && 0 > t.indexOf(P.g.Fc) && (l.cookieName = w + "_ga");
        }
      }
      (!1 !== d(P.g.oi) && !1 !== d(P.g.xb) && ut()) || (g.allowAdFeatures = !1);
      (!1 !== d(P.g.Z) && vt()) || (g.allowAdPersonalizationSignals = !1);
      !c.C && d(P.g.fb) && (l._useUp = !0);
      if (c.C) {
        l.name = l.name || e.gtmTrackerName;
        var B = g.hitCallback;
        g.hitCallback = function () {
          pa(B) && B();
          c.P();
        };
      } else {
        Ev(l, "cookieDomain", "auto");
        Ev(g, "forceSSL", !0);
        Ev(e, "eventCategory", hw(b));
        jw[b] && Ev(f, "nonInteraction", !0);
        "login" === b || "sign_up" === b || "share" === b
          ? Ev(e, "eventLabel", d(P.g.zg))
          : "search" === b || "view_search_results" === b
          ? Ev(e, "eventLabel", d(P.g.Ii))
          : "select_content" === b && Ev(e, "eventLabel", d(P.g.ui));
        var D = e[P.g.sa] || {},
          H = D[P.g.Ub];
        H || (0 != H && D[P.g.N]) ? (l.allowLinker = !0) : !1 === H && Ev(l, "useAmpClientId", !1);
        f.hitCallback = c.P;
        l.name = a;
      }
      Tf() &&
        ((g["&gcs"] = fg()),
        eg(P.g.T) || (l.storage = "none"),
        eg(P.g.F) || ((g.allowAdFeatures = !1), (l.storeGac = !1)));
      var J = d(P.g.oa) || d(P.g.zb),
        C = d(P.g.Ld);
      J && (c.C || (l[P.g.zb] = J), (l._cd2l = !0));
      C && !c.C && (l[P.g.Ld] = C);
      e.fieldsToSend = f;
      e.fieldsToSet = g;
      e.createOnlyFields = l;
      return e;
    },
    Fv = function (a) {
      var b = a.gtmEcommerceData;
      if (!b) return null;
      var c = {};
      b.currencyCode && (c.qf = b.currencyCode);
      if (b.impressions) {
        c.action = "impressions";
        var d = b.impressions;
        c.xh = "impressions" === b.translateIfKeyEquals ? Pv(d) : d;
      }
      if (b.promoView) {
        c.action = "promo_view";
        var e = b.promoView.promotions;
        c.ld = "promoView" === b.translateIfKeyEquals ? Pv(e) : e;
      }
      if (b.promoClick) {
        c.action = "promo_click";
        var f = b.promoClick.promotions;
        c.ld = "promoClick" === b.translateIfKeyEquals ? Pv(f) : f;
        c.Ta = b.promoClick.actionField;
        return c;
      }
      for (var g in b)
        if (
          b.hasOwnProperty(g) &&
          "translateIfKeyEquals" !== g &&
          "impressions" !== g &&
          "promoView" !== g &&
          "promoClick" !== g &&
          "currencyCode" !== g
        ) {
          c.action = g;
          var l = b[g].products;
          c.Hb = "products" === b.translateIfKeyEquals ? Pv(l) : l;
          c.Ta = b[g].actionField;
          break;
        }
      return Object.keys(c).length ? c : null;
    },
    Gv = function (a, b) {
      function c(r) {
        return {
          id: d(P.g.Fa),
          affiliation: d(P.g.yi),
          revenue: d(P.g.la),
          tax: d(P.g.lg),
          shipping: d(P.g.Ic),
          coupon: d(P.g.zi),
          list: d(P.g.Fe) || d(P.g.Ee) || r,
        };
      }
      for (
        var d = function (r) {
            return U(b, r);
          },
          e = d(P.g.aa),
          f,
          g = 0;
        e && g < e.length && !(f = e[g][P.g.Fe] || e[g][P.g.Ee]);
        g++
      );
      var l = d(P.g.Hc);
      if (Mb(l))
        for (var m = 0; e && m < e.length; ++m) {
          var n = e[m],
            p;
          for (p in l) l.hasOwnProperty(p) && /^(dimension|metric)\d+$/.test(p) && void 0 != l[p] && Ev(n, p, n[l[p]]);
        }
      var q = null,
        t = d(P.g.Ai);
      if (a === P.g.Ca || a === P.g.wc) q = { action: a, Ta: c(), Hb: Pv(e) };
      else if (a === P.g.sc) q = { action: "add", Ta: c(), Hb: Pv(e) };
      else if (a === P.g.uc) q = { action: "remove", Ta: c(), Hb: Pv(e) };
      else if (a === P.g.Ia) q = { action: "detail", Ta: c(f), Hb: Pv(e) };
      else if (a === P.g.vb) q = { action: "impressions", xh: Pv(e) };
      else if (a === P.g.wb) q = { action: "promo_view", ld: Pv(t) || Pv(e) };
      else if (("select_content" === a && t && 0 < t.length) || a === P.g.Ob)
        q = { action: "promo_click", ld: Pv(t) || Pv(e) };
      else if ("select_content" === a || a === P.g.vc)
        q = { action: "click", Ta: { list: d(P.g.Fe) || d(P.g.Ee) || f }, Hb: Pv(e) };
      else if (a === P.g.Nb || "checkout_progress" === a) {
        var u = { step: a === P.g.Nb ? 1 : d(P.g.kg), option: d(P.g.jg) };
        q = { action: "checkout", Hb: Pv(e), Ta: I(c(), u) };
      } else
        "set_checkout_option" === a && (q = { action: "checkout_option", Ta: { step: d(P.g.kg), option: d(P.g.jg) } });
      q && (q.qf = d(P.g.na));
      return q;
    },
    lw = {},
    Bv = function (a, b) {
      var c = lw[a];
      lw[a] = I(b);
      if (!c) return !1;
      for (var d in b) if (b.hasOwnProperty(d) && b[d] !== c[d]) return !0;
      for (var e in c) if (c.hasOwnProperty(e) && c[e] !== b[e]) return !0;
      return !1;
    };
  var mw = qu;
  var ow = encodeURI,
    Y = encodeURIComponent,
    pw = function (a, b, c) {
      yb(a, b, c);
    },
    qw = function (a, b) {
      if (!a) return !1;
      var c = Ue(We(a), "host");
      if (!c) return !1;
      for (var d = 0; b && d < b.length; d++) {
        var e = b[d] && b[d].toLowerCase();
        if (e) {
          var f = c.length - e.length;
          0 < f && "." != e.charAt(0) && (f--, (e = "." + e));
          if (0 <= f && c.indexOf(e, f) == f) return !0;
        }
      }
      return !1;
    },
    rw = function (a, b, c) {
      for (var d = {}, e = !1, f = 0; a && f < a.length; f++)
        a[f] && a[f].hasOwnProperty(b) && a[f].hasOwnProperty(c) && ((d[a[f][b]] = a[f][c]), (e = !0));
      return e ? d : null;
    };
  var Z = { o: {} };
  (Z.o.e = ["google"]),
    (function () {
      (function (a) {
        Z.__e = a;
        Z.__e.s = "e";
        Z.__e.isVendorTemplate = !0;
        Z.__e.priorityOverride = 0;
        Z.__e.isInfrastructure = !1;
      })(function (a) {
        return String(a.vtp_gtmCachedValues.event);
      });
    })();
  (Z.o.v = ["google"]),
    (function () {
      (function (a) {
        Z.__v = a;
        Z.__v.s = "v";
        Z.__v.isVendorTemplate = !0;
        Z.__v.priorityOverride = 0;
        Z.__v.isInfrastructure = !1;
      })(function (a) {
        var b = a.vtp_name;
        if (!b || !b.replace) return !1;
        var c = Qr(b.replace(/\\\./g, "."), a.vtp_dataLayerVersion || 1),
          d = void 0 !== c ? c : a.vtp_defaultValue;
        Yr(d, "v", a.vtp_gtmEventId);
        return d;
      });
    })();

  (Z.o.rep = ["google"]),
    (function () {
      (function (a) {
        Z.__rep = a;
        Z.__rep.s = "rep";
        Z.__rep.isVendorTemplate = !0;
        Z.__rep.priorityOverride = 0;
        Z.__rep.isInfrastructure = !1;
      })(function (a) {
        var b = gl(a.vtp_containerId),
          c;
        switch (b.prefix) {
          case "AW":
            c = Wu;
            c = wu;
            break;
          case "DC":
            c = fv;
            break;
          case "GF":
            c = lv;
            break;
          case "HA":
            c = qv;
            break;
          case "UA":
            c = Nv;
            break;
          case "MC":
            break;
          default:
            G(a.vtp_gtmOnFailure);
            return;
        }
        c
          ? (G(a.vtp_gtmOnSuccess),
            aq.register(a.vtp_containerId, c),
            a.vtp_remoteConfig && jq(a.vtp_containerId, a.vtp_remoteConfig || {}))
          : G(a.vtp_gtmOnFailure);
      });
    })();
  (Z.o.cid = ["google"]),
    (function () {
      (function (a) {
        Z.__cid = a;
        Z.__cid.s = "cid";
        Z.__cid.isVendorTemplate = !0;
        Z.__cid.priorityOverride = 0;
        Z.__cid.isInfrastructure = !1;
      })(function () {
        return S.H;
      });
    })();

  (Z.o.get = ["google"]),
    (function () {
      (function (a) {
        Z.__get = a;
        Z.__get.s = "get";
        Z.__get.isVendorTemplate = !0;
        Z.__get.priorityOverride = 0;
        Z.__get.isInfrastructure = !1;
      })(function (a) {
        var b = a.vtp_settings,
          c = b.eventParameters || {},
          d = String(a.vtp_eventName),
          e = {};
        e.eventId = a.vtp_gtmEventId;
        e.priorityId = a.vtp_gtmPriorityId;
        a.vtp_deferrable && (e.deferrable = !0);
        var f = Zo(String(b.streamId), d, c);
        bp(f, e.eventId, e);
        a.vtp_gtmOnSuccess();
      });
    })();

  var Jx = {};
  Jx.dataLayer = xe;
  Jx.callback = function (a) {
    ne.hasOwnProperty(a) && pa(ne[a]) && ne[a]();
    delete ne[a];
  };
  Jx.bootstrap = 0;
  Jx._spx = !1;
  function Kx() {
    Wd[S.H] = Wd[S.H] || Jx;
    S.ob && (Wd["ctid_" + S.ob] = Jx);
    $g();
    bh() ||
      k(ch(), function (a, b) {
        ao(a, b.transportUrl, b.context);
        O(92);
      });
    Ha(oe, Z.o);
    vc = Dc;
  }
  (function (a) {
    function b() {
      m = F.documentElement.getAttribute("data-tag-assistant-present");
      ir(m) && (l = g.Ki);
    }
    if (!E["__TAGGY_INSTALLED"]) {
      var c = !1;
      if (F.referrer) {
        var d = We(F.referrer);
        c = "cct.google" === Te(d, "host");
      }
      if (!c) {
        var e = ug("googTaggyReferrer");
        c = e.length && e[0].length;
      }
      c && ((E["__TAGGY_INSTALLED"] = !0), vb("https://cct.google/taggy/agent.js"));
    }
    if (ie) a();
    else {
      var f = function (r) {
          var v = "GTM",
            w = "GTM";
          ce ? ((v = "OGT"), (w = "GTAG")) : ie && (w = v = "OPT");
          var y = E["google.tagmanager.debugui2.queue"];
          y ||
            ((y = []),
            (E["google.tagmanager.debugui2.queue"] = y),
            vb("https://" + Vd.yd + "/debug/bootstrap?id=" + S.H + "&src=" + w + "&cond=" + r + "&gtm=" + fh()));
          var x = {
            messageType: "CONTAINER_STARTING",
            data: { scriptSource: pb, containerProduct: v, debug: !1, id: S.H, isGte: be },
          };
          x.data.resume = function () {
            a();
          };
          Vd.ai && (x.data.initialPublish = !0);
          y.push(x);
        },
        g = { Sk: 1, Mi: 2, Yi: 3, ei: 4, Ki: 5 },
        l = void 0,
        m = void 0,
        n = Ue(E.location, "query", !1, void 0, "gtm_debug");
      ir(n) && (l = g.Mi);
      if (!l && F.referrer) {
        var p = We(F.referrer);
        "tagassistant.google.com" === Te(p, "host") && (l = g.Yi);
      }
      if (!l) {
        var q = ug("__TAG_ASSISTANT");
        q.length && q[0].length && (l = g.ei);
      }
      l || b();
      if (!l && Q(54) && jr(m)) {
        var t = function () {
            if (u) return !0;
            u = !0;
            b();
            l && pb ? f(l) : a();
          },
          u = !1;
        zb(
          F,
          "TADebugSignal",
          function () {
            t();
          },
          !1,
        );
        E.setTimeout(function () {
          t();
        }, 200);
      } else l && pb ? f(l) : a();
    }
  })(function () {
    var a = !1;
    a && wn("INIT");
    if (Q(70)) {
      var b = rn(on.V.Vf, S.H);
      sn(b);
    }
    Hf().m();
    Ph();
    if (S.ob ? Wd["ctid_" + S.ob] : Wd[S.H]) {
      var c = Wd.zones;
      c && c.unregisterChild(Wg());
    } else {
      for (var d = data.resource || {}, e = d.macros || [], f = 0; f < e.length; f++) lc.push(e[f]);
      for (var g = d.tags || [], l = 0; l < g.length; l++) oc.push(g[l]);
      for (var m = d.predicates || [], n = 0; n < m.length; n++) nc.push(m[n]);
      for (var p = d.rules || [], q = 0; q < p.length; q++) {
        for (var t = p[q], u = {}, r = 0; r < t.length; r++) u[t[r][0]] = Array.prototype.slice.call(t[r], 1);
        mc.push(u);
      }
      qc = Z;
      rc = As;
      Kx();
      hr();
      qo = !1;
      ro = 0;
      if (("interactive" == F.readyState && !F.createEventObject) || "complete" == F.readyState) to();
      else {
        zb(F, "DOMContentLoaded", to);
        zb(F, "readystatechange", to);
        if (F.createEventObject && F.documentElement.doScroll) {
          var v = !0;
          try {
            v = !E.frameElement;
          } catch (H) {}
          v && uo();
        }
        zb(E, "load", to);
      }
      xq = !1;
      "complete" === F.readyState ? zq() : zb(E, "load", zq);
      ej();
      Q(46) && (O(111), Xa("HEALTH", 1));
      Q(47) && (O(112), Xa("HEALTH", 2));
      me = z();
      Jx.bootstrap = me;
      if (a) {
        var A = xn("INIT");
      }
      if (Q(70)) {
        var B = rn(on.V.ci, S.H);
        if (sn(B)) {
          var D = rn(on.V.Vf, S.H);
          tn(B, D);
        }
      }
    }
  });
})();
