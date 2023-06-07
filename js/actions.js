$.fn.dragHorizontally = function () {
    var attachment = false,
        lastPosition, position, difference;
    $($(this).selector).on("mousedown mouseup mousemove", function (e) {
        if (e.type == "mousedown") attachment = true, lastPosition = [e.clientX, e.clientY];
        if (e.type == "mouseup") attachment = false;
        if (e.type == "mousemove" && attachment == true) {
            position = [e.clientX, e.clientY];
            difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
            $(this).scrollLeft($(this).scrollLeft() - difference[0]);
            $(this).scrollTop($(this).scrollTop() - difference[1]);
            lastPosition = [e.clientX, e.clientY];
        }
    });
    $(window).on("mouseup", function () {
        attachment = false;
    });
}

function tweakForm() {
    let iframe = document.getElementById("7LSV-76A");
    console.log(iframe.contentWindow.document);
    let formElems = iframe.contentWindow.document.getElementsByTagName("body")[0]
    console.log(formElems);
    formElems.style.backgroundColor = "red";
    // let formElems = iframe.contentWindow.document.querySelectorAll(".removed-form-fields");
    // const formElems = document.querySelectorAll(".brand-awareness-feature");
    // formElems.forEach(element => {
    //     element.style.display = "none";
    // })
    console.dir(formElems);
}

$(document).ready(function () {
    $(".games-container").dragHorizontally();
});

tweakForm();
