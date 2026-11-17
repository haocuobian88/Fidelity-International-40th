const cover=document.querySelector('#cover'),main=document.querySelector('main'),music=document.querySelector('#music'),toggle=document.querySelector('#musicToggle'),label=document.querySelector('#musicLabel');
main.inert=true;main.setAttribute("aria-hidden","true");
let opened=false;
function syncMusic(){const playing=!music.paused;toggle.classList.toggle('playing',playing);toggle.setAttribute('aria-pressed',String(playing));toggle.setAttribute('aria-label',playing?'暫停配樂':'播放配樂');label.textContent=playing?'暫停配樂':'播放配樂'}
async function playMusic(){try{music.volume=.35;await music.play()}catch{document.querySelector('#status').textContent='配樂尚未播放，可點擊右下角播放配樂。'}syncMusic()}
function openInvitation(){if(opened)return;opened=true;playMusic();cover.classList.add('opening');setTimeout(()=>{main.inert=false;main.setAttribute('aria-hidden','false');document.body.classList.add('opened');cover.classList.add('dismissed');toggle.hidden=false;main.querySelector('header a').focus({preventScroll:true});},matchMedia('(prefers-reduced-motion: reduce)').matches?0:1400)}
document.querySelector('#open').addEventListener('click',openInvitation);document.querySelector('#openText').addEventListener('click',openInvitation);toggle.addEventListener('click',()=>music.paused?playMusic():music.pause());music.addEventListener('play',syncMusic);music.addEventListener('pause',syncMusic);music.addEventListener('error',()=>{document.querySelector('#status').textContent='配樂載入失敗，請稍後再試。';syncMusic()});
// JavaScript unavailable: preserve readable invitation content.
