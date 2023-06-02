function handlePopUp(popUpId) {
    var popUp = document.getElementById(popUpId);
    if (popUp.style.display === "none") {
        popUp.style.display = "block";
    }
    else {
        popUp.style.display = "none";
    }
}

function closePopUps(exception: string = null) {
    var popUps = document.getElementsByClassName("pop-up") as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < popUps.length; i++) {
        if (popUps[i].id != exception) {
            popUps[i].style.display = "none";
        }
    }
}

window.addEventListener("load", () => {
    document.getElementById("mass-btn").addEventListener("click", () => handlePopUp("mass-info"));
    document.getElementById("excentricity-btn").addEventListener("click", () => handlePopUp("excentricity-info"));
    document.getElementById("semimajor-btn").addEventListener("click", () => handlePopUp("semimajor-info"));

    window.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (! target.classList.contains("pop-up") && ! target.classList.contains("info")) {
            closePopUps();
        }

        if (target.classList.contains("info")) {
            const id = target.id.split("-")[0] + "-info";
            closePopUps(id);
        }
    });

    window.addEventListener("touchstart", (event) => {
        const target = event.target as HTMLElement;
        if (! target.classList.contains("pop-up") && ! target.classList.contains("info")) {
            closePopUps();
        }

        if (target.classList.contains("info")) {
            const id = target.id.split("-")[0] + "-info";
            closePopUps(id);
        }
    });

});