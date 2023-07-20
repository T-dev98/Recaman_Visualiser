const scale = 10; // 0-> 1 (1 unit) = 10px // scale it so that the illustration is easier to look at

const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#rangeInput');
const rangeValueDiv = document.querySelector('#rangeValue');

const CANVAS_DIMENSIONS = { height: canvas.height, width: canvas.width };
const ctx = canvas.getContext("2d");

const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
  42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
  79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91,
]
  .map(item => item * scale);

// Function to clear the canvas
const clearCanvas = () => {
  ctx.clearRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);
};

// Function to draw the Recaman sequence up to a given index
const drawRecaman = (index) => {
  clearCanvas();

  // Draw the number line
  const lineY = CANVAS_DIMENSIONS.height / 2;
  ctx.beginPath();
  ctx.moveTo(0, lineY);
  ctx.lineTo(CANVAS_DIMENSIONS.width, lineY);
  ctx.stroke();

  // Draw the arcs/lines for each number in the sequence
  for (let i = 1; i <= index; i++) {
    const prevNumber = sequence[i - 1];
    const currNumber = sequence[i];
    const radius = Math.abs(currNumber - prevNumber) / 2;

    const centerX = (currNumber + prevNumber) / 2;
    const centerY = lineY;

    let startAngle, endAngle;

    if (currNumber > prevNumber) {
      startAngle = Math.PI;
      endAngle = 0;
    } else {
      startAngle = 0;
      endAngle = Math.PI;
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, true);
    ctx.stroke();
  }
};

const onInputChangeHandler = (value) => {
  rangeValueDiv.innerText = value;
  drawRecaman(value);
};

rangeInput.addEventListener('input', (e) => onInputChangeHandler(e.target.value));

// Initial drawing
drawRecaman(rangeInput.value);
