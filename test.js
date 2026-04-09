function testSimulation() {
    let zones = ["Gate A", "Gate B", "Food Court"];
    let zone = zones[Math.floor(Math.random() * zones.length)];

    if (!zone) {
        console.error("❌ Test Failed: Zone not generated");
    } else {
        console.log("✅ Test Passed: Zone =", zone);
    }
}

testSimulation();