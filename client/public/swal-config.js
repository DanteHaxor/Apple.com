(function () {
  const POPUP_DELAY_MS = 3500;
  const originalSwal = window.swal;

  window.POPUP_DELAY_MS = POPUP_DELAY_MS;
  window.waitForPopup = function () {
    return new Promise(function (resolve) {
      setTimeout(resolve, POPUP_DELAY_MS);
    });
  };

  window.swal = function (titleOrOpts, text, icon) {
    if (typeof titleOrOpts === "object") {
      const opts = titleOrOpts;
      const isConfirm =
        opts.buttons === true ||
        (Array.isArray(opts.buttons) && opts.buttons.length > 0);

      if (isConfirm) {
        return originalSwal(opts);
      }

      return originalSwal(
        Object.assign(
          {
            timer: POPUP_DELAY_MS,
            buttons: false,
            closeOnClickOutside: true,
          },
          opts
        )
      );
    }

    return originalSwal({
      title: titleOrOpts || "",
      text: text || "",
      icon: icon,
      timer: POPUP_DELAY_MS,
      buttons: false,
      closeOnClickOutside: true,
    });
  };
})();
