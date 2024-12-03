window.onload = function () {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  let mazeImg = document.getElementById('maze');
  let faceImg = document.getElementById('face');

  window.onkeydown = processKey;
  window.onpointerdown = processPointerDown;
  window.onpointermove = processPointerMove;
  window.onpointerup = processPointerUp;

  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 0;
  let t = false;

  drawMaze(163, 3);

  function drawMaze(startingX, startingY) {
    canvas.width = mazeImg.width;
    canvas.height = mazeImg.height;

    context.drawImage(mazeImg, 0, 0);

    x = startingX;
    y = startingY;
    context.drawImage(faceImg, x, y);
    context.stroke();

    window.requestAnimationFrame(drawFrame);
  }

  function processKey(e) {
    e.preventDefault();

    dx = 0;
    dy = 0;

    if (e.keyCode == 38) {
      dy = -1;
    }

    if (e.keyCode == 40) {
      dy = 1;
    }

    if (e.keyCode == 37) {
      dx = -1;
    }

    if (e.keyCode == 39) {
      dx = 1;
    }
  }

  function processPointerDown(e) {
    e.preventDefault();
    t = true;
  }

  function processPointerMove(e) {
    e.preventDefault();
    if (!t) return;

    dx = 0;
    dy = 0;

    const offsetX = e.clientX - x;
    const offsetY = e.clientY - y;
    const offsetMore = Math.abs(offsetX) > Math.abs(offsetY) ? 'x' : 'y';

    if (offsetY > 0 && offsetMore == 'y') {
      dy = 1;
    }

    if (offsetY < 0 && offsetMore == 'y') {
      dy = -1;
    }

    if (offsetX > 0 && offsetMore == 'x') {
      dx = 1;
    }

    if (offsetX < 0 && offsetMore == 'x') {
      dx = -1;
    }
  }

  function processPointerUp(e) {
    e.preventDefault();
    t = false;
  }

  function drawFrame() {
    if (dx != 0 || dy != 0) {
      context.beginPath();
      context.fillStyle = '#e6e4e9';
      context.rect(x, y, 15, 15);
      context.fill();

      x += dx;
      y += dy;

      if (checkForCollision()) {
        x -= dx;
        y -= dy;
        dx = 0;
        dy = 0;
      }

      context.drawImage(faceImg, x, y);

      if (y > canvas.height - 17) {
        alert('Победа!');
        x = 0;
        y = 0;
        dx = 0;
        dy = 0;
        drawMaze(163, 3);
        return;
      }
    }

    window.requestAnimationFrame(drawFrame);
  }

  function checkForCollision() {
    let imgData = context.getImageData(x - 1, y - 1, 15 + 2, 15 + 2);
    let pixels = imgData.data;

    for (let i = 0; (n = pixels.length), i < n; i += 4) {
      let red = pixels[i];
      let green = pixels[i + 1];
      let blue = pixels[i + 2];

      if (red < 200 && green < 200 && blue < 200) {
        return true;
      }
    }

    return false;
  }
};
