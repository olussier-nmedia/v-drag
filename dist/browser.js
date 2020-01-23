/*!
 * v-drag v2.1.3
 * by Nil Vila
 */
var vdrag = function () {
  "use strict";

  function a(a, t, o = "add") {
    a.forEach(a => {
      document[`${o}EventListener`](a, t)
    })
  }

  function t(a, t, o) {
    return `matrix(${a || "1, 0, 0, 1,"} ${t}, ${o})`
  }

  function o(a, o) {
    window.data.relativeX = window.data.mouseX * a, window.data.relativeY = window.data.mouseY * o, window.data.move.style.transform = t(window.data.matrix, window.data.matrixX + window.data.relativeX, window.data.matrixY + window.data.relativeY)
  }
  const n = {
    x() {
      o(!0, !1)
    },
    y() {
      o(!1, !0)
    },
    all() {
      o(!0, !0)
    }
  };

  function d() {
    n[window.data.axis](window.data), window.data.posAnimation = requestAnimationFrame(d)
  }

  function e() {
    window.data.move.classList.add(window.data.class.move), window.data.posAnimation = requestAnimationFrame(d), a(["mousemove", "touchmove"], e, "remove")
  }

  function i(a, t) {
    let o = Number(window.getComputedStyle(window.data.move)[t].replace("px", ""));
    if ("none" !== a) {
      const n = a.match(/[0-9.-]+/g);
      o += Number(n[8 - t.length])
    }
    return o
  }

  function w(a, t, o) {
    window.data.move.style.transform = a, window.data.move.style.left = t, window.data.move.style.top = o
  }

  function s(a) {
    window.data.mouseX = (a.pageX || a.touches[0].pageX) - window.data.initialX, window.data.mouseY = (a.pageY || a.touches[0].pageY) - window.data.initialY
  }

  function l(o, n, d, l) {
    window.data.grab = o, window.data.move = n, window.data.axis = d, window.data.initialX = l.pageX || l.touches[0].pageX, window.data.initialY = l.pageY || l.touches[0].pageY, window.data.relativeX = 0, window.data.relativeY = 0;
    const r = window.getComputedStyle(window.data.move).transform;
    window.data.matrix = "none" !== r && r.match(/\d([^,]*,){4}/g);
    const c = i(r, "left"),
      m = i(r, "top");
    w(t(window.data.matrix, c, m), 0, 0), window.data.matrixX = c, window.data.matrixY = m, window.data.grab.classList.add(window.data.class.down), a(["mousemove", "touchmove"], s), a(["mousemove", "touchmove"], e)
  }

  function r() {
    cancelAnimationFrame(window.data.posAnimation), a(["mousemove", "touchmove"], e, "remove"), w(window.data.matrix ? t(window.data.matrix, 0, 0) : "none", `${window.data.matrixX + window.data.relativeX}px`, `${window.data.matrixY + window.data.relativeY}px`), window.data.grab.classList.remove(window.data.class.down), window.data.move.classList.remove(window.data.class.move), a(["mousemove", "touchmove"], s, "remove")
  }

  function c(a) {
    return !!["x", "y", "all"].includes(a)
  }

  function m(t, o) {
    const n = o.value,
      d = n instanceof Object ? n.handle : n;
    let e;
    e = n instanceof Object && n.axis && c(n.axis) ? n.axis : c(o.arg) ? o.arg : "all";
    const i = document.querySelectorAll(d);
    0 !== i.length ? (t.classList.add(window.data.class.usesHandle), i.forEach(a => {
      a.classList.add(window.data.class.handle), a.onmousedown = (o => l(a, t, e, o)), a.ontouchstart = (o => l(a, t, e, o))
    })) : (t.onmousedown = (a => l(t, t, e, a)), t.ontouchstart = (a => l(t, t, e, a))), t.classList.add(window.data.class.initial), a(["mouseup", "touchend"], r)
  }
  return {
    install(a, t) {
      if (window.data = {}, window.data.class = {
          initial: "drag-draggable", usesHandle: "drag-uses-handle", handle: "drag-handle", down: "drag-down", move: "drag-move"
        }, t) {
        const a = t.eventClass;
        Object.keys(a).forEach(t => {
          a[t] && (window.data.class[t] = a[t])
        })
      }
      const o = document.createElement("style");
      o.innerHTML = `.${window.data.class.initial}{position:relative;transition:none;}.${window.data.class.initial}:not(.${window.data.class.usesHandle}),.${window.data.class.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;}.${window.data.class.handle}.${window.data.class.down},.${window.data.class.initial}:not(.${window.data.class.usesHandle}).${window.data.class.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;}`, document.body.appendChild(o), a.directive("drag", {
        inserted(a, t) {
          m(a, t)
        },
        update(a, t) {
          a.onmousedown = null, a.ontouchstart = null;
          const o = "object" == typeof t.oldValue ? t.oldValue.handle : t.oldValue;
          document.querySelectorAll(o).forEach(t => {
            t.onmousedown = null, t.ontouchstart = null, t.classList.remove(window.data.class.handle), a.classList.remove(window.data.class.usesHandle)
          }), m(a, t)
        }
      })
    }
  }
}();
