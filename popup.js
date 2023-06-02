function handlePopUp(popUpId) {
    var popUp = document.getElementById(popUpId);
    if (popUp.style.display === "none") {
        popUp.style.display = "block";
    }
    else {
        popUp.style.display = "none";
    }
}
function closePopUps(exception) {
    if (exception === void 0) { exception = null; }
    var popUps = document.getElementsByClassName("pop-up");
    for (var i = 0; i < popUps.length; i++) {
        if (popUps[i].id != exception) {
            popUps[i].style.display = "none";
        }
    }
}
window.addEventListener("load", function () {
    document.getElementById("mass-btn").addEventListener("click", function () { return handlePopUp("mass-info"); });
    document.getElementById("excentricity-btn").addEventListener("click", function () { return handlePopUp("excentricity-info"); });
    document.getElementById("semimajor-btn").addEventListener("click", function () { return handlePopUp("semimajor-info"); });
    window.addEventListener("click", function (event) {
        var target = event.target;
        if (!target.classList.contains("pop-up") && !target.classList.contains("info")) {
            closePopUps();
        }
        if (target.classList.contains("info")) {
            var id = target.id.split("-")[0] + "-info";
            closePopUps(id);
        }
    });
    window.addEventListener("touchstart", function (event) {
        var target = event.target;
        if (!target.classList.contains("pop-up") && !target.classList.contains("info")) {
            closePopUps();
        }
        if (target.classList.contains("info")) {
            var id = target.id.split("-")[0] + "-info";
            closePopUps(id);
        }
    });
});
//# sourceMappingURL=popup.js.map