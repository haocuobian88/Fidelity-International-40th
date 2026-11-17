const cover=document.querySelector('#cover');
const main=document.querySelector('main');
const music=document.querySelector('#music');
const toggle=document.querySelector('#musicToggle');
const label=document.querySelector('#musicLabel');
music.volume=.35;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
main.inert=true;
main.setAttribute('aria-hidden','true');
let opened=false;
let confettiTimer;

function isMusicOn(){return !music.paused&&!music.muted&&music.volume>0;}
function syncMusic(){
  const playing=isMusicOn();
  toggle.classList.toggle('playing',playing);
  toggle.setAttribute('aria-pressed',String(playing));
  toggle.setAttribute('aria-label',playing?'關閉音樂':'開啟音樂');
  label.textContent=playing?'關閉音樂':'開啟音樂';
  toggle.classList.toggle('muted',music.muted||music.volume===0);
}
async function playMusic(){
  try{await music.play();}
  catch{document.querySelector('#status').textContent='配樂尚未播放，可點擊上方選單播放音樂。';}
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
  cover.classList.add('revealing');
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
  setTimeout(()=>cover.classList.add('opening'),1000);
  setTimeout(finishOpening,2850);
}
document.querySelector('#open').addEventListener('click',openInvitation);

document.querySelector('#cheers').addEventListener('click',()=>{
  celebrate();
  document.querySelector('#cheersFeedback').textContent='正好有你，正好一起。期待見到大家！';
});
toggle.addEventListener('click',()=>{
  if(isMusicOn()){music.pause();return;}
  music.muted=false;
  if(music.volume===0)music.volume=.35;
  playMusic();
});
music.addEventListener('play',syncMusic);
music.addEventListener('pause',syncMusic);
music.addEventListener('volumechange',syncMusic);
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

// One fixed 1100 × 1000 composition, cropped close before the seal is pressed.
function sizeEnvelopeScene(){
  const width=cover.clientWidth,height=cover.clientHeight;
  const fit=Math.min((width-32)/1100,(height-40)/1000);
  const close=Math.max(width/1100*1.5,height/1000*1.3);
  cover.style.setProperty('--camera-fit',String(Math.max(.15,fit)));
  cover.style.setProperty('--camera-close',String(close));
}
sizeEnvelopeScene();
if('ResizeObserver' in window)new ResizeObserver(sizeEnvelopeScene).observe(cover);
else window.addEventListener('resize',sizeEnvelopeScene);


// Keep the menu beside the logo at the top, float it only after scrolling.
function syncHeaderLayout(){
  document.body.classList.toggle('menu-floating',window.scrollY>24);
}
window.addEventListener('scroll',syncHeaderLayout,{passive:true});
window.addEventListener('pageshow',syncHeaderLayout);
syncHeaderLayout();
syncMusic();
