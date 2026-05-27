(function initBagNav() {
  const button = document.querySelector(".btn-menu");
  const menu = document.querySelector(".menu");
  const spanTopo = document.querySelectorAll(".btn-menu span");
  const iconBag = document.querySelector(".svg-bag");
  const bag = document.querySelector(".bag");
  const main = document.querySelector("main");
  const setaBag = document.querySelector(".seta-bag");
  const removeBag = document.querySelector(".remove-bag");
  const header = document.querySelector("header");

  if (!iconBag || !bag) return;

  function closeBag() {
    bag.classList.remove("bag-active");
    setaBag?.classList.remove("seta-active");
  }

  function openBag() {
    bag.classList.add("bag-active");
    setaBag?.classList.add("seta-active");
  }

  window.openBag = openBag;
  window.closeBag = closeBag;

  button?.addEventListener("click", () => {
    menu?.classList.toggle("active");
    spanTopo[0]?.classList.toggle("span-topo-active");
    spanTopo[1]?.classList.toggle("span-bottom-active");
    iconBag.classList.toggle("bag-opacity");
    header?.classList.toggle("header-active");
    closeBag();
  });

  iconBag.addEventListener("click", (e) => {
    e.preventDefault();
    bag.classList.toggle("bag-active");
    setaBag?.classList.toggle("seta-active");
  });

  const bagLink = document.getElementById("bag-link");
  bagLink?.addEventListener("click", () => {
    closeBag();
  });

  if (main) {
    main.addEventListener("click", closeBag);
  } else {
    document.addEventListener("click", (e) => {
      if (!bag.classList.contains("bag-active")) return;
      if (e.target.closest(".bag") || e.target.closest(".svg-bag")) return;
      closeBag();
    });
  }

  removeBag?.addEventListener("click", closeBag);
})();
