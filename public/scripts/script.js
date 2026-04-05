// random color for cards
document.querySelectorAll(".card").forEach(card => {
  const hue = Math.floor(Math.random() * 360);    
  const saturation = 60 + Math.random() * 20;     
  const lightness = 80 + Math.random() * 10;      
  card.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});