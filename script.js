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
function startConfetti(canvasId) {
  const canvas = document.getElementById(canvasId);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const confettiCount = 150;
  const confetti = [];
  for(let i=0;i<confettiCount;i++){
    confetti.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height - canvas.height,
      r: Math.random()*6+4,
      d: Math.random()*confettiCount,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach((c)=>{
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
      ctx.stroke();
    });
    update();
  }

  function update(){
    confetti.forEach((c,i)=>{
      c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
      c.x += Math.sin(c.d/3);
      if(c.y > canvas.height) {
        confetti[i] = {x: Math.random()*canvas.width, y: -10, r:c.r, d:c.d, color:c.color, tilt:c.tilt};
      }
    });
  }

  const interval = setInterval(draw, 25);
  setTimeout(()=>{clearInterval(interval); ctx.clearRect(0,0,canvas.width,canvas.height)}, 5000);
}
