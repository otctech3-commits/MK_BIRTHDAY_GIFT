// Get data from URL
const params = new URLSearchParams(location.search);
const encoded = params.get('d');

if (!encoded) {
  document.body.innerHTML = '<div style="text-align:center;padding:50px;color:#fff;"><h1>Invalid Link 😢</h1></div>';
  throw new Error('No data');
}

const data = JSON.parse(decodeURIComponent(atob(encoded)));

// Set theme
document.documentElement.style.setProperty('--gradient', 
  data.t === 'pink' ? 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' :
  data.t === 'blue' ? 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' :
  data.t === 'gold' ? 'linear-gradient(135deg, #f5c518 0%, #f59e0b 100%)' :
  'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
);

document.getElementById('pageTitle').textContent = `Happy Birthday ${data.n}! 🎉`;
document.getElementById('bdayName').textContent = data.n;

if (data.a) {
  document.getElementById('ageBadge').textContent = `${data.a} Years Old`;
  document.getElementById('ageBadge').style.display = 'inline-block';
}

document.getElementById('specialMessage').textContent = data.m;

// Load pictures
const memContainer = document.getElementById('memories');
if (data.p && data.p.length) {
  memContainer.innerHTML = data.p.map(pic => `<img src="${pic}" alt="Memory" loading="lazy">`).join('');
}

// YouTube Player
let player;
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('ytPlayer', {
    height: '0',
    width: '0',
    videoId: data.s,
    playerVars: { autoplay: 0, controls: 0 }
  });
};

// Gift click handler
document.getElementById('giftBox').addEventListener('click', () => {
  document.getElementById('giftBox').classList.add('open');
  
  setTimeout(() => {
    document.getElementById('giftStage').style.display = 'none';
    document.getElementById('celebration').style.display = 'block';
    
    // Play music
    if (player) player.playVideo();
    
    // Confetti
    createConfetti();
  }, 800);
});

function createConfetti() {
  const confetti = document.querySelector('.confetti');
  const colors = ['#f5c518', '#8b5cf6', '#ec4899', '#3b82f6'];
  
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation: fall ${2 + Math.random() * 3}s linear forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    confetti.appendChild(div);
  }
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
