let zones = ["Gate A", "Gate B", "Food Court", "Washroom", "Parking"];

function simulate() {

    let zone = zones[Math.floor(Math.random() * zones.length)];
    let crowd = Math.floor(Math.random() * 100);

    document.getElementById("zone").innerText = zone;
    document.getElementById("crowd").innerText = crowd + "%";

    let bar = document.getElementById("bar");
    bar.style.width = crowd + "%";

    if (crowd > 75) {
        bar.style.background = "#ff3b3b";
        document.getElementById("suggestion").innerText =
            "🚨 High congestion! Avoid " + zone;
    } else if (crowd > 40) {
        bar.style.background = "#ffb347";
        document.getElementById("suggestion").innerText =
            "⚠️ Moderate crowd. Plan accordingly.";
    } else {
        bar.style.background = "#00ffcc";
        document.getElementById("suggestion").innerText =
            "✅ Area is smooth. Safe to go!";
    }

    updateHeatmap();
}

/* HEATMAP */
function updateHeatmap() {
    let cells = ["c1", "c2", "c3", "c4"];

    cells.forEach(id => {
        let val = Math.floor(Math.random() * 100);
        let el = document.getElementById(id);

        if (val > 70) el.style.background = "red";
        else if (val > 40) el.style.background = "orange";
        else el.style.background = "green";
    });
}

/* CHATBOT */
function send() {

    let input = document.getElementById("input").value;
    let chat = document.getElementById("chat");

    if (!input) return;

    let response = "🤖 ";

    if (input.toLowerCase().includes("washroom"))
        response += "Nearest washroom is near Gate B";
    else if (input.toLowerCase().includes("food"))
        response += "Food court is less crowded near Gate A";
    else if (input.toLowerCase().includes("exit"))
        response += "Fastest exit is Gate A";
    else
        response += "Avoid crowded zones and follow suggestions";

    chat.innerHTML += "<p>🧑 " + input + "</p>";
    setTimeout(() => {
        chat.innerHTML += "<p>" + response + "</p>";
    }, 500);

    document.getElementById("input").value = "";
}

setInterval(() => {
    updateHeatmap();
}, 3000);

setInterval(() => {
    simulate();
}, 5000);