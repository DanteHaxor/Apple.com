/**
 * Base URL — change this when switching environments:
 *
 *   Local:  http://localhost:1337
 *   Prod:   https://pear-z5ta.onrender.com
 */
// const url = "http://localhost:1337";
const url = "https://pear-z5ta.onrender.com";

(function () {
  const base = url.replace(/\/$/, "");
  const AUTH_COOKIE = "authToken";
  const NAME_COOKIE = "displayName";

  window.url = base;
  window.api = base + "/api";

  function readCookie(name) {
    const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`);
    const match = document.cookie.match(pattern);
    return match ? decodeURIComponent(match[1]) : "";
  }

  function parseLegacyAuthCookie() {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      const idx = cookie.indexOf("=");
      if (idx === -1) continue;
      const name = decodeURIComponent(cookie.slice(0, idx));
      const value = decodeURIComponent(cookie.slice(idx + 1));
      if (value.startsWith("eyJ")) {
        return { name, token: value };
      }
    }
    return { name: "", token: "" };
  }

  window.getAuthToken = function () {
    const token = readCookie(AUTH_COOKIE);
    if (token) return token;
    return parseLegacyAuthCookie().token;
  };

  window.getDisplayName = function () {
    const name = readCookie(NAME_COOKIE);
    if (name) return name;
    return parseLegacyAuthCookie().name || "Account";
  };

  window.clearAuthCookie = function () {
    const expired =
      "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";

    document.cookie = `${AUTH_COOKIE}=; ${expired}`;
    document.cookie = `${NAME_COOKIE}=; ${expired}`;

    document.cookie.split(";").forEach((part) => {
      const cookie = part.trim();
      const idx = cookie.indexOf("=");
      if (idx === -1) return;
      const name = cookie.slice(0, idx).trim();
      const value = decodeURIComponent(cookie.slice(idx + 1));
      if (!value.startsWith("eyJ")) return;
      document.cookie = `${name}=; ${expired}`;
      document.cookie = `${decodeURIComponent(name)}=; ${expired}`;
    });
  };

  window.signOut = async function () {
    try {
      await fetch(`${window.api}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {
      /* still clear client cookies */
    }
    clearAuthCookie();
    window.location.href = `${base}/signin`;
  };

  function updateAuthNav() {
    const toggle = document.getElementById("ltoggle");
    const account = document.getElementById("dname");
    const signedIn = !!getAuthToken();

    if (toggle) {
      toggle.textContent = signedIn ? "Sign Out" : "Sign in";
      toggle.href = signedIn ? "#" : `${base}/signin`;
    }
    if (account) {
      account.textContent = signedIn ? getDisplayName() : "Account";
    }
  }

  function initAuthNav() {
    const toggle = document.getElementById("ltoggle");
    if (!toggle || toggle.dataset.authBound === "true") return;

    toggle.dataset.authBound = "true";
    toggle.addEventListener("click", (e) => {
      if (getAuthToken()) {
        e.preventDefault();
        signOut();
      }
    });

    updateAuthNav();
  }

  function applyNavLinks() {
    document.querySelectorAll("a.svg-apple").forEach((a) => {
      a.href = base + "/";
    });
    const bagLink = document.getElementById("bag-link");
    if (bagLink) bagLink.href = base + "/bag.html";
    const adminHome = document.getElementById("admin-home-link");
    if (adminHome) adminHome.href = base + "/";
    updateAuthNav();
  }

  window.initAuthNav = initAuthNav;
  window.updateAuthNav = updateAuthNav;

  function boot() {
    applyNavLinks();
    initAuthNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
