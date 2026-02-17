// ================================
// CONFIG (ඔයාගේ links මෙතන paste කරන්න)
// ================================

// Contact links (tap -> open)
// Examples:
//   WHATSAPP_LINK = "https://wa.me/94XXXXXXXXX"
//   TELEGRAM_LINK = "https://t.me/yourusername"
const WHATSAPP_LINK = "";  // <-- PASTE YOUR WHATSAPP LINK HERE
const TELEGRAM_LINK = "";  // <-- PASTE YOUR TELEGRAM LINK HERE

// Logo image URLs (optional)
// If you add a URL here, it will replace the default SVG placeholder.
// Use direct image links (png/svg/webp/jpg). Recommended: SVG/PNG.
const LOGO_URLS = {
  bybit: "",        // <-- PASTE BYBIT LOGO DIRECT LINK
  binance: "",      // <-- PASTE BINANCE LOGO DIRECT LINK
  cryptobot: "",    // <-- PASTE CRYPTO BOT LOGO DIRECT LINK
  bitget: "",       // <-- PASTE BITGET LOGO DIRECT LINK
  hetzner: "",      // <-- PASTE HETZNER LOGO DIRECT LINK
  oraclecloud: "",  // <-- PASTE ORACLE CLOUD LOGO DIRECT LINK
  okx: ""           // <-- PASTE OKX LOGO DIRECT LINK
};

// ================================
// APP (Visitors can't edit anything)
// ================================

const modal = document.getElementById('contactModal');
const moreWorkBtn = document.getElementById('moreWorkBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const whatsappCard = document.getElementById('whatsappCard');
const telegramCard = document.getElementById('telegramCard');

const whatsappHint = document.getElementById('whatsappHint');
const telegramHint = document.getElementById('telegramHint');

function openModal(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setContactLink(el, hintEl, link){
  const v = (link || '').trim();
  if(!v){
    el.classList.add('disabled');
    el.href = '#';
    hintEl.textContent = 'Not set (edit script.js to add your link)';
    return;
  }
  el.classList.remove('disabled');
  el.href = v;
  hintEl.textContent = v;
}

function applyLogos(){
  const imgs = document.querySelectorAll('img[data-logo-key]');
  imgs.forEach(img => {
    const key = img.getAttribute('data-logo-key');
    const url = (LOGO_URLS[key] || '').trim();
    if(url){
      img.src = url;
    }
  });
}

moreWorkBtn.addEventListener('click', () => {
  openModal();
});
closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  const target = e.target;
  if(target && target.dataset && target.dataset.close === 'true') closeModal();
});

window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

setContactLink(whatsappCard, whatsappHint, WHATSAPP_LINK);
setContactLink(telegramCard, telegramHint, TELEGRAM_LINK);
applyLogos();
