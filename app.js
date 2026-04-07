// ---------------- ZONES ----------------
let zones = ["Gate A", "Gate B", "Food Court", "Washroom", "Parking"];


// ---------------- FIREBASE CONFIG ----------------
const firebaseConfig = {
    apiKey: "AIzaSyBBucn9q9AV1PpJXLSUVZJcVZjZgOHYiEg",
    authDomain: "eventflow-ai-9d67c.firebaseapp.com",
    databaseURL: "https://eventflow-ai-9d67c-default-rtdb.firebaseio.com",
    projectId: "eventflow-ai-9d67c",
    storageBucket: "eventflow-ai-9d67c.firebasestorage.app",
    messagingSenderId: "749522908133",
    appId: "1:749522908133:web:e6f6e7dc3234322b4c750c"
};


// ---------------- INITIALIZE FIREBASE ----------------
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();


// ---------------- SIMULATE FUNCTION ----------------
function simulate() {

    let zone = zones[Math.floor(Math.random() * zones.length)];
    let crowd = Math.floor(Math.random() * 100);

    console.log("Writing to Firebase:", zone, crowd);

    // ✅ WRITE DATA SAFELY
    console.log("🔥 TRYING TO WRITE...");

    db.ref("crowd").set({
        zone: zone,
        level: crowd
    })
        .then(() => {
            console.log("✅ WRITE SUCCESS");
        })
        .catch((error) => {
            console.error("❌ WRITE FAILED:", error);
        });

    // UI UPDATE (instant feedback)
    updateUI(zone, crowd);

    updateHeatmap();
}


// ---------------- UI UPDATE FUNCTION ----------------
function updateUI(zone, crowd) {

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
}


// ---------------- HEATMAP ----------------
function updateHeatmap() {
    let cells = ["c1", "c2", "c3", "c4"];

    cells.forEach(id => {
        let val = Math.floor(Math.random() * 100);
        let el = document.getElementById(id);

        if (val > 75) el.style.background = "#ff3b3b";
        else if (val > 40) el.style.background = "#ffb347";
        else el.style.background = "#2ecc71";
    });
}


// ---------------- CHATBOT ----------------
function send() {

    let input = document.getElementById("input").value.toLowerCase();
    let chat = document.getElementById("chat");

    if (!input) return;

    let response = "🤖 ";

    if (input.includes("crowd")) {
        response += "Current congestion is high. Avoid Gate B.";
    }
    else if (input.includes("fastest")) {
        response += "Fastest route is via Gate A.";
    }
    else if (input.includes("food")) {
        response += "Food court near Gate A has low wait time.";
    }
    else if (input.includes("washroom")) {
        response += "Nearest washroom is near Gate B.";
    }
    else {
        response += "Analyzing situation... Recommend low-density zones.";
    }

    chat.innerHTML += `<p>🧑 ${input}</p>`;
    chat.innerHTML += `<p>${response}</p>`;

    chat.scrollTop = chat.scrollHeight;
    document.getElementById("input").value = "";
}


// ---------------- REAL-TIME LISTENER ----------------
db.ref("crowd").on("value", (snapshot) => {
    let data = snapshot.val();

    console.log("📡 Firebase Data:", data);

    if (!data || !data.zone || data.level === undefined) {
        console.warn("⚠️ No valid data yet");
        return;
    }

    updateUI(data.zone, data.level);
});


// ---------------- AUTO SIMULATION ----------------
setInterval(() => {
    simulate();
}, 5000);