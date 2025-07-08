const container = document.querySelector('.container');
const button = document.getElementById('new-grid');

function createGrid(sides) {
  container.innerHTML = '';
  const squareSize = 960 / sides;

  for (let i = 0; i < sides * sides; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Hover: Random RGB + Progressive Darken
    square.addEventListener('mouseover', () => {
      // Jika belum pernah disentuh: buat warna random
      if (!square.dataset.rgb) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        square.dataset.rgb = `${r},${g},${b}`;
        square.dataset.opacity = 0.1;
      } else {
        // Sudah ada warna: tingkatkan opacity
        let currentOpacity = parseFloat(square.dataset.opacity);
        if (currentOpacity < 1) {
          currentOpacity += 0.1;
          square.dataset.opacity = currentOpacity.toFixed(2);
        }
      }

      // Ambil data
      const [r, g, b] = square.dataset.rgb.split(',');
      const opacity = square.dataset.opacity;

      // Terapkan ke background
      square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });

    container.appendChild(square);
  }
}

button.addEventListener('click', () => {
  let userInput = parseInt(prompt('Enter grid size (max 100):'));
  if (isNaN(userInput) || userInput < 1 || userInput > 100) {
    alert('Invalid input! Please enter a number between 1 and 100.');
    return;
  }
  createGrid(userInput);
});

createGrid(16);
