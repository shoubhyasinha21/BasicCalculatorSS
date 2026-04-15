let display = document.getElementById("display");
let historyBox = document.getElementById("historyBox");

let memory = 0;
let history = [];

/* INPUT FUNCTIONS */
function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

/* CALCULATION LOGIC */
function calculate() {
    try {
        let expr = display.value;

        // Trigonometric replacements
        expr = expr.replace(/sin\(([^)]+)\)/g, "Math.sin(toRadians($1))");
        expr = expr.replace(/cos\(([^)]+)\)/g, "Math.cos(toRadians($1))");
        expr = expr.replace(/tan\(([^)]+)\)/g, "Math.tan(toRadians($1))");

        // Scientific replacements
        expr = expr.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");
        expr = expr.replace(/log10\(([^)]+)\)/g, "Math.log10($1)");
        expr = expr.replace(/ln\(([^)]+)\)/g, "Math.log($1)");

        // Constant replacements
        expr = expr.replace(/π/g, "Math.PI");
        expr = expr.replace(/e/g, "Math.E");

        let result = eval(expr);

        addHistory(display.value + " = " + result);
        display.value = result;

    } catch (e) {
        display.value = "Error";
    }
}

function toRadians(deg) {
    return deg * (Math.PI / 180);
}

/* HISTORY MANAGEMENT */
function addHistory(item) {
    history.push(item);
    // Keeps only last 10 entries
    historyBox.innerHTML = "<b>History</b><br>" + history.slice(-10).join("<br>");
}

/* MEMORY FUNCTIONS */
function memoryClear() { 
    memory = 0; 
}
function memoryRecall() { 
    display.value += memory; 
}
function memoryAdd() { 
    memory += Number(display.value) || 0; 
}
function memorySub() { 
    memory -= Number(display.value) || 0; 
}