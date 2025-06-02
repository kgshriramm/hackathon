
function setActive(element) {
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.style.backgroundColor = '';
  });
  element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
}

function handleCardClick(cardName) {
  alert('Navigating to: ' + cardName);
}

function handleApply(schemeName) {
  alert('Starting application for: ' + schemeName);
}

document.addEventListener('DOMContentLoaded', function () {
  setActive(document.querySelector('.sidebar a'));
});
