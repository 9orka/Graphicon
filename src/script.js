const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const contoursBtn = document.getElementsByClassName('contour');
const effectsBtn = document.getElementsByClassName('effect');

const canvasSizeOX = 1150;
const canvasSizeOY = 605;

canvas.height = canvasSizeOY;
canvas.width = canvasSizeOX;
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = '#00000';



ctx.fillStyle = '#00000';


let painting = false;
let filling = false;
let modeTextf = false;
let text = '';

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}


function onMouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let region = new Path2D();


    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();

    }
}



function onMouseDown(event) {
    painting = true;
}
var color;

function changeColor(event) {
    document.getElementById('color').oninput = function() {
        ctx.strokeStyle = this.value;
    }

    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    const colorInput = event.target.value;
    ctx.strokeStyle = colorInput;
    ctx.fillStyle = colorInput;
}

function rangeChange(event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function modeFill() {
    document.getElementById("text_mode_cont").style.cssText = "display:none;";
    text = '';
    filling = true;
    painting = false;
    modeTextf = false;
}

function modeBrush() {
    console.log('brushsmode');
    document.getElementById("text_mode_cont").style.cssText = "display:none;";
    text = " ";
    document.getElementById('textModeInput').value = text;
    painting = true;
    filling = false;
    mdrawRect = false;
    modeTextf = false;
}

function modeEraser() {
    ctx.clearRect(0, 0, canvasSizeOX, canvasSizeOY);
    // console.log('erasermode');
    // filling = false;

    // ctx.strokeStyle = '#fff';
}

function canvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvasSizeOX, canvasSizeOY);
    }
}

function modeText() {
    modeTextf = true;
    filling = false;
    if (modeTextf) {

        document.getElementById("text_mode_cont").style.cssText = "display:block;";


        ctx.font = "30px serif";
        canvas.addEventListener('click', (event) => {
            let x, y;
            x = event.offsetX;
            y = event.offsetY;
            text = document.getElementById('textModeInput').value;
            console.log(text);
            ctx.fillText(text, x, y);

        })
    } else {
        document.getElementById("text_mode_cont").style.cssText = "display:none;";

    }



}
if (!modeTextf) {}

function changeContour(event) {

    valueBtn = parseInt(this.value);
    switch (valueBtn) {
        case 1:
            canvas.style.cssText = "background-image:url(./img/bird.png);"
            console.log('птица');
            break;
        case 2:
            canvas.style.cssText = "background-image:url(./img/airplane.png);"
            console.log('самолет');
            break;
        case 3:
            canvas.style.cssText = "background-image:url(./img/car.png);"
            console.log('машина');
            break;
        case 4:
            canvas.style.cssText = "background-image:url(./img/elephant.png);"
            console.log('слон');
            break;
        case 5:
            canvas.style.cssText = "background-image:url(./img/fish.png);"
            console.log('рыба');
            break;
        case 6:
            canvas.style.cssText = "background-image:url(./img/moto.png);"
            console.log('мотоцикл');
            break;
        case 7:
            canvas.style.cssText = "background-image:none;"
            console.log('cancel');
            break;
    }


}
let xn, xs, yn, ys;
let mdrawRect = false;

function drawRect(event) {



}
$('#figures_rectan').on("click", function(e) {
    mdrawRect = true;
    if (mdrawRect) {
        painting = false;

        canvas.addEventListener('mousedown', (event) => {
            //console.log(event);
            xn = event.offsetX;
            yn = event.offsetY;

        })
        canvas.addEventListener('mouseup', (event) => {
            xs = event.offsetX;
            ys = event.offsetY;
            ctx.strokeRect(xn, yn, xs - xn, ys - yn);
        })
        console.log(xn, yn);
        console.log(xs, ys);
    }
});
//сохранение
$('#saveBtn').on("click", function(e) {
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = "graphicon.jpg";
    link.click();
});


if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', canvasClick);

}
Array.from(colors).forEach(color => color.onclick = changeColor);
if (range) {
    range.addEventListener('input', rangeChange)
}
Array.from(contoursBtn).forEach(contour => contour.onclick = changeContour);

//open pict
var fileName = '';

$(document).ready(function() {
    let fil = document.getElementById('inputFile');
    var img = new Image();
    fil.addEventListener('change', function() {
        img = new Image();
        img.src = URL.createObjectURL(fil.files[0]);
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            $("#canvas").removeAttr("data-caman-id");
        };
    })


    $("#brightness-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.brightness(10).render();
        });
    });

    $("#brightness-dec").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.brightness(-10).render();
        });
    });

    $("#contrast-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.contrast(10).render();
        });
    });

    $("#contrast-dec").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.contrast(-10).render();
        });
    });

    $("#saturation-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.saturation(10).render();
        });
    });

    $("#saturation-dec").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.saturation(-10).render();
        });
    });

    $("#exposure-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.exposure(10).render();
        });
    });

    $("#exposure-dec").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.exposure(-10).render();
        });
    });

    $("#noise-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.noise(10).render();
        });
    });

    $("#sharpen-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.sharpen(10).render();
        });
    });

    $("#sepia-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.sepia(20).render();
        });
    });

    $("#hue-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.hue(10).render();
        });
    });

    $("#blur-inc").on("click", function(e) {
        Caman("#canvas", img, function() {
            this.stackBlur(5).render();
        });
    });

});

document.querySelector("show-login").addEventListener("click", function() {
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click", function() {
    document.querySelector(".popup").classList.remove("active");
});