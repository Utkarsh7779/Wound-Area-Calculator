// Get HTML elements
let currentImage; 

const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('woundCanvas');
const ctx = canvas.getContext('2d');

// When a file is selected
imageLoader.addEventListener('change', function (e) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
    // Save the image in the variable
    currentImage = img;

    // Set the canvas size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    ctx.drawImage(currentImage, 0, 0);
};

        img.src = event.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);
});
// Function to calculate area using Shoelace formula
function calculateArea() {
    if (points.length < 3) {
        alert("You need at least 3 points to calculate an area.");
        return;
    }

    let area = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += (points[i].x * points[j].y) - (points[j].x * points[i].y);
    }

    area = Math.abs(area / 2);

    // Show the result on the page instead of alert
    const areaDisplay = document.getElementById('areaDisplay');
    areaDisplay.textContent = `Area: ${area.toFixed(2)} pixels²`;
}


// Store the clicked points
const points = [];

// When user clicks on the canvas
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Save the new point
    points.push({ x, y });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the image
    ctx.drawImage(currentImage, 0, 0);

    // Redraw all points
    ctx.fillStyle = 'red';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    console.log(`Point added: (${x}, ${y})`);
});
function clearPoints() {
    points.length = 0; // Clear the array

    // Clear the canvas and redraw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0);
}
