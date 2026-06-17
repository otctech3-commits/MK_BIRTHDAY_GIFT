document.getElementById('wishForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = {
    n: document.getElementById('name').value,
    a: document.getElementById('age').value,
    s: extractYouTubeID(document.getElementById('song').value),
    m: document.getElementById('message').value,
    t: document.getElementById('theme').value,
    p: [
      document.getElementById('pic1').value,
      document.getElementById('pic2').value,
      document.getElementById('pic3').value,
      document.getElementById('pic4').value,
      document.getElementById('pic5').value
    ].filter(Boolean)
  };
  
  // Encode to base64
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  const link = `${window.location.origin}${window.location.pathname.replace('index.html', '')}wish.html?d=${encoded}`;
  
  document.getElementById('wishLink').value = link;
  document.getElementById('previewBtn').href = link;
  document.getElementById('result').style.display = 'block';
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
});

function extractYouTubeID(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : url;
}

function copyLink() {
  const input = document.getElementById('wishLink');
  input.select();
  document.execCommand('copy');
  alert('Link copied! 🎉');
}
