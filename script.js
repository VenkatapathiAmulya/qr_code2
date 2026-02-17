let currentStep = 1;
let selected = null;
let isCorrect = false;

// Move between steps
function nextStep(step) {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.add('active');

  if(step === 2) startConfetti('confetti-canvas');
  if(step === 4) startConfetti('confetti-final');
}

// Select an option

function selectAnswer(btn, correct) {
    selected = btn.innerText;
    isCorrect = correct;
  
    // Remove "selected" class from all buttons
    document.querySelectorAll('#step2 .options button').forEach(b => {
      b.classList.remove('selected');
    });
  
    // Add "selected" class to the clicked button
    btn.classList.add('selected');
  }
  
// Submit answer and show feedback
function submitAnswer() {
  const feedback = document.getElementById('feedback');

  if (!selected) {
    alert('Please select an option!');
    return;
  }

  if (isCorrect) {
    feedback.innerText = 'Correct! ✅';
    feedback.style.color = 'green';

    // Move to next step after a short delay
    setTimeout(() => nextStep(3), 1200);
  } else {
    feedback.innerText = 'Wrong! ❌ Try again.';
    feedback.style.color = 'red';
  }
}

// Photo upload logic
document.getElementById('photoInput').addEventListener('change', function() {
  const file = this.files[0];
  if(file) {
    const url = URL.createObjectURL(file);
    document.getElementById('preview').src = url;
    document.getElementById('preview').style.display = 'block';
    document.getElementById('finalPhoto').src = url;
    setTimeout(() => nextStep(4), 800); // small delay
  }
});

// Simple confetti effect (same as before)
// function startConfetti(canvasId) {
//   const canvas = document.getElementById(canvasId);
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   const ctx = canvas.getContext('2d');

//   const confettiCount = 150;
//   const confetti = [];
//   for(let i=0;i<confettiCount;i++){
//     confetti.push({
//       x: Math.random()*canvas.width,
//       y: Math.random()*canvas.height - canvas.height,
//       r: Math.random()*6+4,
//       d: Math.random()*confettiCount,
//       color: `hsl(${Math.random()*360},100%,50%)`,
//       tilt: Math.random()*10-10
//     });
//   }

//   function draw(){
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     confetti.forEach((c)=>{
//       ctx.beginPath();
//       ctx.lineWidth = c.r;
//       ctx.strokeStyle = c.color;
//       ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
//       ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
//       ctx.stroke();
//     });
//     update();
//   }

//   function update(){
//     confetti.forEach((c,i)=>{
//       c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
//       c.x += Math.sin(c.d/3);
//       if(c.y > canvas.height) {
//         confetti[i] = {x: Math.random()*canvas.width, y: -10, r:c.r, d:c.d, color:c.color, tilt:c.tilt};
//       }
//     });
//   }

//   const interval = setInterval(draw, 25);
//   setTimeout(()=>{clearInterval(interval); ctx.clearRect(0,0,canvas.width,canvas.height)}, 5000);
// }

function startConfetti(canvasId) {
    const canvas = document.getElementById(canvasId);
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
  
    // Match the size of the step box
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  
    // Confetti setup
    const confettiCount = 500; // fewer but bigger pieces
    const confetti = [];
  
    const colors = [
        '#FFD700', // gold
        '#FF0000', // red
        '#00FF00', // green
        '#0000FF', // blue
        '#FF69B4', // pink
        '#FFA500', // orange
        '#8A2BE2', // purple
        '#00FFFF'  // cyan
      ];
    // for (let i = 0; i < confettiCount; i++) {
    //   confetti.push({
    //     x: Math.random() * canvas.width,
    //     y: Math.random() * canvas.height * -1, // start above box
    //     r: Math.random() * 15 + 8,          // 100–250px HUGE pieces
    //     speed: Math.random() * 2 + 2,          // slow fall
    //     rotation: Math.random() * 360,
    //     rotationSpeed: Math.random() * 5 + 2,
    //     color: ['#FFD700','#FFC107','#FFB300'][Math.floor(Math.random()*3)] // gold tones
    //   });
    // }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          r: Math.random() * 15 + 8,  // size 100–250px
          speed: Math.random() * 2 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)] // pick random color
        });
      }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      confetti.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation * Math.PI / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.r/2, -c.r/4, c.r, c.r/2); // massive rectangle
        ctx.restore();
  
        // Movement
        c.y += c.speed;
        c.rotation += c.rotationSpeed;
  
        if (c.y > canvas.height + 100) {
          c.y = -100;
          c.x = Math.random() * canvas.width;
        }
      });
    }
  
    const interval = setInterval(draw, 30);
  
    // Stop confetti after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
  }
  
  const uploadBtn = document.getElementById('uploadBtn');
  const photoInput = document.getElementById('photoInput');
  const preview = document.getElementById('preview');
  
  // Trigger the hidden file input
  uploadBtn.addEventListener('click', () => {
    photoInput.click();
  });
  
  // Show preview after file selected
  photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if(file){
      preview.src = URL.createObjectURL(file);
      preview.style.display = 'block';
    }
  });
  