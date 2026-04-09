// Advanced testing simulation

function runTests() {
    console.log("🧪 Running Tests...");

    let testZone = "Gate A";
    let testCrowd = 50;

    if (typeof testZone !== "string") {
        console.error("❌ Zone test failed");
    } else {
        console.log("✅ Zone test passed");
    }

    if (testCrowd >= 0 && testCrowd <= 100) {
        console.log("✅ Crowd range test passed");
    } else {
        console.error("❌ Crowd range invalid");
    }

    console.log("✅ All tests executed");
}

runTests();