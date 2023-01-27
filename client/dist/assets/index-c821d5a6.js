(function () {
  const c = document.createElement("link").relList;
  if (c && c.supports && c.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const n of t.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = u(e);
    fetch(e.href, t);
  }
})();
const d = document.querySelector(".btn-menu"),
  g = document.querySelector(".menu"),
  i = document.querySelectorAll(".btn-menu span"),
  l = document.querySelector(".svg-bag"),
  o = document.querySelector(".bag"),
  m = document.querySelector("main"),
  s = document.querySelector(".seta-bag"),
  v = document.querySelector(".remove-bag"),
  f = document.querySelector("header");
d.addEventListener("click", () => {
  g.classList.toggle("active"),
    i[0].classList.toggle("span-topo-active"),
    i[1].classList.toggle("span-bottom-active"),
    l.classList.toggle("bag-opacity"),
    f.classList.toggle("header-active"),
    o.classList.remove("bag-active"),
    s.classList.remove("seta-active");
});
l.addEventListener("click", () => {
  o.classList.toggle("bag-active"), s.classList.toggle("seta-active");
});
m.addEventListener("click", () => {
  o.classList.remove("bag-active"), s.classList.remove("seta-active");
});
v.addEventListener("click", () => {
  o.classList.remove("bag-active"), s.classList.remove("seta-active");
});
let y = document.cookie.split("=")[1];
y
  ? (document.getElementById("ltoggle").innerText = "Sign Out")
  : (document.getElementById("ltoggle").innerText = "Sign in");
const a = document.cookie.split("=")[0];
console.log(a);
document.getElementById("dname").innerText = a || "Account";
