(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 720px)');
  const hero = $('.hero'), header = $('.site-header'), menu = $('.menu-toggle'), nav = $('#main-nav');
  const motionButton = $('#motion-toggle'), motionLabel = $('#motion-label');
  const video = $('#hero-video'), canvas = $('#network-field'), context = canvas.getContext('2d');
  const media = window.PORTFOLIO_ASSETS?.hero || {};
  const connection = navigator.connection;
  let savedMotion = null;
  try { savedMotion = localStorage.getItem('ali-portfolio-motion'); } catch (_) {}
  let allowMotion = !reduced.matches && !connection?.saveData && savedMotion !== 'off';
  let inView = true, raf = 0, lastFrame = 0, phase = 0, width = 1, height = 1;
  let videoLoaded = false, videoFailed = false;
  document.body.classList.add('js-ready');
  menu.hidden = false; motionButton.hidden = false;
  $('#current-year').textContent = new Date().getFullYear();

  function closeMenu() { menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open);
  });
  nav.addEventListener('click',event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click',event => { if (!header.contains(event.target)) closeMenu(); });
  narrow.addEventListener('change',closeMenu);

  let scrollQueued = false;
  function updateScroll() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    $('.reading-progress').style.transform = 'scaleX(' + (distance > 0 ? Math.min(1,window.scrollY/distance) : 0) + ')';
    header.classList.toggle('scrolled',window.scrollY > 32); scrollQueued=false;
  }
  window.addEventListener('scroll',() => {
    if (!scrollQueued) { scrollQueued=true; requestAnimationFrame(updateScroll); }
  },{passive:true});
  updateScroll();

  if ('IntersectionObserver' in window) {
    if (!reduced.matches) {
      document.body.classList.add('can-reveal');
      const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); }
      }),{threshold:0.08,rootMargin:'0px 0px -25px 0px'});
      document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
    }
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      const link = nav.querySelector('a[href="#' + entry.target.id + '"]');
      if (!link) return;
      if (entry.isIntersecting) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    }),{rootMargin:'-20% 0px -55% 0px',threshold:0});
    ['about','expertise','contact'].forEach(id => sections.observe(document.getElementById(id)));
    new IntersectionObserver(entries => { inView=entries[0].isIntersecting; syncMotion(); },{threshold:0}).observe(hero);
  }

  // Decorative network geometry, not a depiction of real infrastructure.
  // This is the built-in placeholder; exported Higgsfield video takes its place.
  function point(column,row,time) {
    const u=column/54, v=row/23, envelope=Math.sin(Math.PI*u);
    const wave=Math.sin(u*5.2+v*.75+time*.13)*.068;
    const contour=Math.sin(u*8.2-v*.65-time*.07)*.018;
    return {x:u*width*1.14-width*.07,y:height*(.71+wave*envelope+contour+(v-.5)*.19*(.2+envelope)),alpha:.05+(1-Math.abs(v-.5)*2)*.14};
  }
  function draw(time) {
    if (!context) return;
    context.clearRect(0,0,width,height); context.lineWidth=.7;
    for (let row=0;row<24;row++) {
      context.beginPath();
      for (let column=0;column<=54;column++) {
        const p=point(column,row,time);
        if (column===0) context.moveTo(p.x,p.y); else context.lineTo(p.x,p.y);
      }
      context.strokeStyle='rgba(161,191,203,' + point(27,row,time).alpha + ')'; context.stroke();
    }
    for (let column=3;column<=51;column+=4) {
      context.beginPath();
      for (let row=1;row<23;row++) {
        const p=point(column+Math.sin(row*.3)*.7,row,time);
        if (row===1) context.moveTo(p.x,p.y); else context.lineTo(p.x,p.y);
      }
      context.strokeStyle='rgba(132,169,186,.075)'; context.stroke();
    }
    for (let n=0;n<13;n++) {
      const column=((n*4.29+time*(.28+n*.012))%52)+1, row=(n*7.31)%23, p=point(column,row,time);
      const intensity=.18+.28*(1+Math.sin(time*.4+n))/2;
      context.beginPath(); context.arc(p.x,p.y,n%3===0?1.8:1.1,0,Math.PI*2);
      context.fillStyle='rgba(173,216,232,' + intensity + ')'; context.fill();
    }
  }
  function resize() {
    const rect=hero.getBoundingClientRect(); width=Math.max(1,rect.width); height=Math.max(1,rect.height);
    const dpr=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    if (context) context.setTransform(dpr,0,0,dpr,0,0);
    draw(phase); updateScroll();
  }
  function tick(now) {
    raf=0;
    if (!allowMotion || !inView || document.hidden || hero.classList.contains('has-video')) return;
    if (now-lastFrame >= 33) { phase+=Math.min((now-lastFrame)/1000,.05); lastFrame=now; draw(phase); }
    raf=requestAnimationFrame(tick);
  }
  function startVideo() {
    if (videoLoaded || videoFailed || (!media.webm && !media.mp4) || connection?.saveData) return;
    videoLoaded=true; video.muted=true;
    if (media.poster) video.poster=media.poster;
    [['webm','video/webm'],['mp4','video/mp4']].filter(([key])=>media[key]).forEach(([key,type])=>{
      const source=document.createElement('source'); source.src=media[key]; source.type=type;
      source.addEventListener('error',()=>{ if (video.networkState===3) failVideo(); });
      video.appendChild(source);
    });
    video.hidden=false; video.load();
    video.play().catch(()=>{ hero.classList.remove('has-video'); });
  }
  function failVideo() { videoFailed=true; video.hidden=true; hero.classList.remove('has-video'); syncMotion(); }
  function syncMotion() {
    if (raf) { cancelAnimationFrame(raf); raf=0; }
    motionButton.setAttribute('aria-pressed',String(!allowMotion));
    motionLabel.textContent=allowMotion?'Pause motion':'Enable motion';
    hero.classList.toggle('is-still',!allowMotion);
    if (!allowMotion || !inView || document.hidden) { video.pause(); draw(phase); return; }
    startVideo();
    if (videoLoaded && !videoFailed) video.play().catch(()=>{ hero.classList.remove('has-video'); });
    lastFrame=performance.now(); raf=requestAnimationFrame(tick);
  }
  video.addEventListener('playing',()=>{
    if (!allowMotion || !inView || document.hidden) { video.pause(); return; }
    hero.classList.add('has-video'); if(raf){cancelAnimationFrame(raf);raf=0;}
  });
  video.addEventListener('error',failVideo);
  motionButton.addEventListener('click',()=>{
    allowMotion=!allowMotion;
    try { localStorage.setItem('ali-portfolio-motion',allowMotion?'on':'off'); } catch (_) {}
    syncMotion();
  });
  reduced.addEventListener('change',()=>{
    if(reduced.matches){allowMotion=false;document.body.classList.remove('can-reveal');}
    else {let pref=null;try{pref=localStorage.getItem('ali-portfolio-motion');}catch(_){}allowMotion=pref!=='off'&&!connection?.saveData;}
    syncMotion();
  });
  document.addEventListener('visibilitychange',syncMotion);
  if('ResizeObserver' in window) new ResizeObserver(resize).observe(hero); else window.addEventListener('resize',resize,{passive:true});
  resize(); syncMotion();

  const copyButton=$('#copy-email'),copyLabel=$('#copy-label'),status=$('#copy-status');
  let copyTimer;
  if(navigator.clipboard?.writeText && window.isSecureContext){
    copyButton.hidden=false;
    copyButton.addEventListener('click',async()=>{
      try {await navigator.clipboard.writeText('babamahmoudia@gmail.com');copyLabel.textContent='Copied';status.textContent='Email address copied.';}
      catch(_){copyLabel.textContent='Try again';status.textContent='Copy unavailable. Select the email address or open it to send a message.';}
      clearTimeout(copyTimer);copyTimer=setTimeout(()=>{copyLabel.textContent='Copy';status.textContent='';},3500);
    });
  }
})();
