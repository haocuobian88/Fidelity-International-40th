const cover=document.querySelector('#cover');
const main=document.querySelector('main');
const music=document.querySelector('#music');
const toggle=document.querySelector('#musicToggle');
const label=document.querySelector('#musicLabel');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
main.inert=true;
main.setAttribute('aria-hidden','true');
let opened=false;
let confettiTimer;

function syncMusic(){
  const playing=!music.paused;
  toggle.classList.toggle('playing',playing);
  toggle.setAttribute('aria-pressed',String(playing));
  toggle.setAttribute('aria-label',playing?'暫停配樂':'播放配樂');
  label.textContent=playing?'暫停配樂':'播放配樂';
}
async function playMusic(){
  try{music.volume=.35;await music.play();}
  catch{document.querySelector('#status').textContent='配樂尚未播放，可點擊右下角播放配樂。';}
  syncMusic();
}
function celebrate(){
  if(reducedMotion.matches)return;
  const layer=document.querySelector('#confetti');
  clearTimeout(confettiTimer);
  layer.replaceChildren();
  const pieces=document.createDocumentFragment();
  for(let i=0;i<40;i++){
    const piece=document.createElement('i');
    piece.style.left=`${Math.random()*100}%`;
    piece.style.setProperty('--duration',`${3.2+Math.random()*2}s`);
    piece.style.setProperty('--delay',`${Math.random()*.65}s`);
    piece.style.setProperty('--drift',`${Math.random()*180-90}px`);
    piece.style.setProperty('--turn',`${Math.random()*1080-540}deg`);
    pieces.append(piece);
  }
  layer.append(pieces);
  confettiTimer=setTimeout(()=>layer.replaceChildren(),6000);
}
function revealSections(){
  if(!('IntersectionObserver' in window)||reducedMotion.matches)return;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('seen');
      observer.unobserve(entry.target);
    });
  },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
  const elements=main.querySelectorAll('.intro h2,.intro>div>p,.venue,.section-heading,.timeline li,.dress-copy,.swatches,.fashion-gallery figure,.contest,.stage,.props-gallery figure,footer h2');
  elements.forEach(el=>{
    el.classList.add('reveal');
    if(el.getBoundingClientRect().top<innerHeight)el.classList.add('seen');
    observer.observe(el);
  });
  document.body.classList.add('motion-ready');
}
function openInvitation(){
  if(opened)return;
  opened=true;
  playMusic();
  cover.classList.add('opening');
  const finishOpening=()=>{
    main.inert=false;
    main.setAttribute('aria-hidden','false');
    document.body.classList.add('opened');
    cover.classList.add('dismissed');
    toggle.hidden=false;
    revealSections();
    celebrate();
    main.querySelector('header a').focus({preventScroll:true});
  };
  if(reducedMotion.matches){finishOpening();return;}
  setTimeout(finishOpening,1650);
}
document.querySelector('#open').addEventListener('click',openInvitation);
document.querySelector('#openText').addEventListener('click',openInvitation);
document.querySelector('#cheers').addEventListener('click',()=>{
  celebrate();
  document.querySelector('#status').textContent='正好有你，正好一起。期待見到大家！';
});
toggle.addEventListener('click',()=>music.paused?playMusic():music.pause());
music.addEventListener('play',syncMusic);
music.addEventListener('pause',syncMusic);
music.addEventListener('error',()=>{
  document.querySelector('#status').textContent='配樂載入失敗，請稍後再試。';
  syncMusic();
});
if('IntersectionObserver' in window){
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        document.querySelectorAll('nav a').forEach(a=>{
          const active=a.hash===`#${entry.target.id}`;
          a.classList.toggle('active',active);
          if(active)a.setAttribute('aria-current','location');
          else a.removeAttribute('aria-current');
        });
      }
    });
  },{rootMargin:'-10% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>navObserver.observe(s));
}


// Keep outfit previews on the invitation, with native focus trapping and Escape.
const outfitViewer=document.querySelector('#outfitViewer');
const outfitImage=document.querySelector('#outfitImage');
const outfitZoom=document.querySelector('#outfitZoom');
const outfitCanvas=document.querySelector('#outfitCanvas');
let outfitTrigger;
function setOutfitZoom(zoomed){
  outfitViewer.classList.toggle('zoomed',zoomed);
  outfitZoom.setAttribute('aria-pressed',String(zoomed));
  outfitZoom.textContent=zoomed?'顯示全圖':'放大細節';
  outfitCanvas.scrollTop=0;
  outfitCanvas.scrollLeft=0;
}
document.querySelectorAll('.outfit-preview').forEach(link=>{
  link.addEventListener('click',event=>{
    if(typeof outfitViewer.showModal!=='function')return;
    event.preventDefault();
    outfitTrigger=link;
    const source=link.querySelector('img');
    outfitImage.src=link.href;
    outfitImage.alt=source.alt;
    document.querySelector('#outfitTitle').textContent=source.alt.startsWith('男士')?'男士穿搭靈感':'女士穿搭靈感';
    setOutfitZoom(false);
    outfitViewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
document.querySelector('#outfitClose').addEventListener('click',()=>outfitViewer.close());
outfitZoom.addEventListener('click',()=>setOutfitZoom(!outfitViewer.classList.contains('zoomed')));
outfitImage.addEventListener('click',()=>setOutfitZoom(!outfitViewer.classList.contains('zoomed')));
outfitViewer.addEventListener('click',event=>{
  if(event.target===outfitCanvas){outfitViewer.close();return;}
  if(event.target!==outfitViewer)return;
  const box=outfitViewer.getBoundingClientRect();
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)outfitViewer.close();
});
outfitViewer.addEventListener('close',()=>{
  document.body.classList.remove('viewer-open');
  if(outfitTrigger)outfitTrigger.focus({preventScroll:true});
});
