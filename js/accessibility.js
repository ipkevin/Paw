(function () {
    var s = document.createElement("script");
    var h = document.querySelector("head") || document.body;
    s.src = "https://acsbapp.com/apps/app/dist/js/app.js";
    s.async = true;
    s.onload = function () {
        acsbJS.init({
            statementLink: "",
            footerHtml: "",
            hideMobile: false,
            hideTrigger: false,
            disableBgProcess: false,
            language: "en",
            position: "right",
            leadColor: "#727272",
            triggerColor: "#727272",
            triggerRadius: "50%",
            triggerPositionX: "right",
            triggerPositionY: "bottom",
            triggerIcon: "people",
            triggerSize: "medium",
            triggerOffsetX: 20,
            triggerOffsetY: 20,
            mobile: { triggerSize: "small", triggerPositionX: "right", triggerPositionY: "bottom", triggerOffsetX: 10, triggerOffsetY: 10, triggerRadius: "50%" },
        });
    };
    h.appendChild(s);
})();