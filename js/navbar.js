// header.js
document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("header-container");

    if (headerContainer) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                headerContainer.innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "navbar.html", true);
        xhttp.send();
    }
});
