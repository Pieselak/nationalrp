let autocloseTimeoutId;
let closing = false;

function closeNotification() {
    if (closing) {
        return;
    }

    closing = true;
    const notification = document.getElementById("notification");
    const notificationFade = document.getElementById("notification-fade");

    notificationFade.animate([
        {opacity: "1"},
        {opacity: "0"}
    ], {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
    });

    if (autocloseTimeoutId) {
        clearTimeout(autocloseTimeoutId);
        autocloseTimeoutId = null;
    }

    setTimeout(() => {
        notification.style.display = "none";
        closing = false;
    }, 500);

    return;
}

function displayNotification(title, content, closable, autoclose) {
    if (typeof title != "string") {
        title = "Wartość tytułu nie jest tekstem";
    }

    if (typeof content != "string") {
        content = "Wartość treści nie jest tekstem";
    }

    if (typeof closable != "boolean") {
        closable = true;
    }

    if (typeof autoclose != "boolean") {
        autoclose = true;
    }

    if (autocloseTimeoutId) {
        clearTimeout(autocloseTimeoutId);
        autocloseTimeoutId = null;
    }

    const notification = document.getElementById("notification");
    const notificationFade = document.getElementById("notification-fade");
    const notificationTitle = document.getElementById("notification-title");
    const notificationContent = document.getElementById("notification-text");
    const notificationButton = document.getElementById("notification-button");

    try {
        notificationTitle.innerHTML = title;
        notificationContent.innerHTML = content;

        if (closable) {
            notificationButton.style.display = "block";
            notificationButton.onclick = closeNotification;
        } else {
            notificationButton.style.display = "none";
        }

        notification.style.display = "flex";
        notificationFade.animate([
            {opacity: "0"},
            {opacity: "1"}
        ], {
            duration: 500,
            easing: "ease-in-out",
            fill: "forwards",
        });

        if (autoclose) {
            autocloseTimeoutId = setTimeout(() => {
                closeNotification();
            }, 10000);
        }
    } catch (error) {
        displayNotification("Nieudało się wyświetlić powiadomienia", error + "<br><br> <b>Spróbuj odświeżyć stronę lub skontaktować się z deweloperem</b>", true, true);
    }
    return;
}

function webLoad() {
    const local = localStorage.getItem("collapsed");
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    const footer = document.getElementById("footer");

    try {
        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";
        if (local == "false") {
            if (window.innerWidth <= 950) {
                navSide();
            }
        }
    } catch (error) {
        displayNotification("Napotkano błąd | webLoad", error+"<br><br> <b>Spróbuj odświeżyć stronę lub skontaktować się z deweloperem</b>", false);
    }
    return;
}

function webRedirect(platform) {
    if (platform == "discord") {
        window.location.href = "https://discord.gg/HJAX7xNQhr";
    } else if (platform == "youtube") {
        window.location.href = "#";
    } else if (platform == "tiktok") {
        window.location.href = "#";
    } else if (platform == "github") {
        window.location.href = "http://github.com/pieselak";
    }
};

function navSide() {
    const nav = document.getElementById("nav");
    const menu = document.getElementById("menu");

    try {
    if (nav.style.display == "" || nav.style.display == "none") {
            menu.innerHTML = "<i class='bx bx-hide'></i>";
            nav.style.display = "flex";
            localStorage.setItem("collapsed", "false");
        } else {
            menu.innerHTML = '<i class="bx bx-menu"></i>';
            nav.style.display = "none";
            localStorage.setItem("collapsed", "true");
        }
    } catch(error) {
        displayNotification("Napotkano błąd | navSide", error+"<br><br> <b>Spróbuj odświeżyć stronę lub skontaktować się z deweloperem</b>", false);
    }
    return;
}

function navClose() {
    const nav = document.getElementById("nav");
    const menu = document.getElementById("menu");

    try {
        menu.innerHTML = '<i class="bx bx-menu"></i>';
        nav.style.display = "none";
        localStorage.setItem("collapsed", "true");
    } catch(error) {
        displayNotification("Napotkano błąd | navClose", error+"<br><br> <b>Spróbuj odświeżyć stronę lub skontaktować się z deweloperem</b>", false);
    }
    return;
}

window.addEventListener("resize", function() {
    if (window.innerWidth > 950) {
        navClose();
    }
    return;
});
