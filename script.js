const modal = document.getElementById('contactModal');
const moreWorkBtn = document.getElementById('moreWorkBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const whatsappValue = document.getElementById('whatsappValue');
const telegramValue = document.getElementById('telegramValue');

const saveWhatsappBtn = document.getElementById('saveWhatsappBtn');
const saveTelegramBtn = document.getElementById('saveTelegramBtn');

const openWhatsappBtn = document.getElementById('openWhatsappBtn');
const openTelegramBtn = document.getElementById('openTelegramBtn');

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

function normalizeWhatsApp(input){
  const v = (input || '').trim();
  if(!v) return '';
  if(v.startsWith('http://') || v.startsWith('https://')) return v;
  if(v.includes('wa.me/')) return 'https://' + v.replace(/^https?:\/\//,'');
  // phone number
  const digits = v.replace(/\s+/g,'');
  // If user types +94..., wa.me expects digits only (no +)
  const waDigits = digits.replace(/^\+/, '');
  return 'https://wa.me/' + waDigits;
}

function normalizeTelegram(input){
  const v = (input || '').trim();
  if(!v) return '';
  if(v.startsWith('http://') || v.startsWith('https://')) return v;
  if(v.startsWith('@')) return 'https://t.me/' + v.slice(1);
  if(v.includes('t.me/')) return 'https://' + v.replace(/^https?:\/\//,'');
  return 'https://t.me/' + v;
}

function refreshLinks(){
  const waRaw = localStorage.getItem('sasiya_whatsapp') || '';
  const tgRaw = localStorage.getItem('sasiya_telegram') || '';

  whatsappValue.value = waRaw;
  telegramValue.value = tgRaw;

  const waLink = normalizeWhatsApp(waRaw);
  const tgLink = normalizeTelegram(tgRaw);

  openWhatsappBtn.href = waLink || '#';
  openTelegramBtn.href = tgLink || '#';

  openWhatsappBtn.classList.toggle('disabled', !waLink);
  openTelegramBtn.classList.toggle('disabled', !tgLink);
}

moreWorkBtn.addEventListener('click', () => {
  refreshLinks();
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

saveWhatsappBtn.addEventListener('click', () => {
  localStorage.setItem('sasiya_whatsapp', whatsappValue.value.trim());
  refreshLinks();
});

saveTelegramBtn.addEventListener('click', () => {
  localStorage.setItem('sasiya_telegram', telegramValue.value.trim());
  refreshLinks();
});

refreshLinks();
