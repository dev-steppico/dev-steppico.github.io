// Canvas Logic.
const canvas = document.createElement('canvas');
canvas.setAttribute("width", "600px");
canvas.setAttribute("height", "600px");
canvas.setAttribute("id", "canvas");

const context = canvas.getContext('2d');

const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;

async function sendData(obj) {
    if (obj) {
        console.log("sending data:", obj);
        const int = setInterval(function() {
            window.alert("...data sent");
            clearInterval(int);
        }, 1000);
    }
}

function populateDOM(obj) {
    let userInfo = document.getElementsByClassName("user-coord")[0];
    if (!userInfo) {
        userInfo = document.createElement("p");
        userInfo.className = "user-coord";
        userDiv.appendChild(userInfo);
    }
    userInfo.innerText = "X: " + obj.x + ", Y: " + obj.y;
    return userInfo;
}

function showClick(obj) {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.beginPath();
    context.arc(obj.cursorX + canvas.width / 2, canvas.height / 2 - obj.cursorY, 3, 0, Math.PI * 2, true);
    context.stroke();
    draw();
}

function getCoordinates(e) {
    const offsetX = e.pageX - canvas.offsetLeft;
    const offsetY = canvas.offsetTop - e.pageY;
    let cursorX = offsetX - canvasCenterX;
    let cursorY = offsetY + canvasCenterY; 

    let x = cursorX > 1 ? Math.floor(cursorX / 5) : Math.ceil(cursorX / 5);
    let y = cursorY > 1 ? Math.floor(cursorY / 5) : Math.ceil(cursorY / 5);

    return {
        x,
        cursorX,
        pageX: offsetX,
        y,
        cursorY,
        pageY: offsetY
    };
}
let coords = null;

function input(e) {
    coords = getCoordinates(e);
    showClick(coords);
    populateDOM(coords);
}

canvas.addEventListener("click", input);

/**
 * function to draw the cartesian axis.
 */
function draw() {
    context.lineWidth = 2;
    context.font = "20px Arial"
    context.beginPath();
    context.moveTo(canvasCenterX - 250, canvasCenterY);
    for (let i = canvasCenterX - 200; i < canvasCenterX + 250; i += 50) {
        context.moveTo(i, canvasCenterY - 5);
        context.lineTo(i, canvasCenterY + 5);
        context.moveTo(i, canvasCenterY - 5);
    }
    context.moveTo(canvasCenterX - 250, canvasCenterY);
    context.lineTo(canvasCenterX + 250, canvasCenterY);
    context.fillText("x", canvasCenterX + 250, canvasCenterY + 20);
    context.fillText("y", canvasCenterX - 20, canvasCenterY - 250);
    context.moveTo(canvasCenterX, canvasCenterY - 250);
    for (let j = canvasCenterY - 200; j < canvasCenterY + 250; j += 50) {
        context.moveTo(canvasCenterX - 5, j);
        context.lineTo(canvasCenterX + 5, j);
        context.moveTo(canvasCenterX - 5, j);
    }
    context.moveTo(canvasCenterX, canvasCenterY - 250);
    context.lineTo(canvasCenterX, canvasCenterY + 250);
    context.stroke();
}

draw();

userDiv = document.createElement("div");
userDiv.className = "user-container";
sendButton = document.createElement("button");
sendButton.className = "send-data";
sendButton.innerText = "Share your opinion";
sendButton.addEventListener("click", ()=> {sendData(coords)});
// Appending to body.
const body = document.body;
body.appendChild(canvas);
body.appendChild(userDiv);
body.appendChild(sendButton);
