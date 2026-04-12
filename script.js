let arr = [];
let steps = [];
let currentStep = 0;
let speed = 50;

// Generate random array
function generateArray() {
  arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 10);
  }
}

// Render bars
function render(array) {
  const container = document.getElementById("array");
  container.innerHTML = "";

  array.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";
    container.appendChild(bar);
  });
}

// Bubble Sort Steps
function bubbleSortSteps(array) {
  let temp = [...array];

  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp.length - i - 1; j++) {
      if (temp[j] > temp[j + 1]) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
        steps.push([...temp]);
      }
    }
  }
}

// Selection Sort Steps
function selectionSortSteps(array) {
  let temp = [...array];

  for (let i = 0; i < temp.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < temp.length; j++) {
      if (temp[j] < temp[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [temp[i], temp[minIndex]] = [temp[minIndex], temp[i]];
      steps.push([...temp]);
    }
  }
}

// Insertion Sort Steps
function insertionSortSteps(array) {
  let temp = [...array];

  for (let i = 1; i < temp.length; i++) {
    let key = temp[i];
    let j = i - 1;

    while (j >= 0 && temp[j] > key) {
      temp[j + 1] = temp[j];
      j--;
      steps.push([...temp]);
    }

    temp[j + 1] = key;
    steps.push([...temp]);
  }
}

// Generate steps based on selected algorithm
function generateSteps() {
  steps = [];
  currentStep = 0;

  generateArray();

  let algo = document.getElementById("algo").value;

  if (algo === "bubble") bubbleSortSteps(arr);
  else if (algo === "selection") selectionSortSteps(arr);
  else if (algo === "insertion") insertionSortSteps(arr);

  render(arr);
}

// Next step
function nextStep() {
  if (currentStep < steps.length) {
    render(steps[currentStep]);
    currentStep++;
  }
}

// Previous step
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    render(steps[currentStep]);
  }
}

// Speed control
document.getElementById("speed").oninput = function () {
  speed = this.value;
};

// Optional auto play (uses speed)
function play() {
  if (currentStep >= steps.length) return;

  nextStep();
  setTimeout(play, 200 - speed);
}