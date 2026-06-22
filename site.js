(function(){
  "use strict";

  /* ---- waveform builders ---- */
  function buildWave(el,count){
    if(!el) return;
    var html="";
    for(var i=0;i<count;i++){
      var dur=(1.0+Math.random()*1.1).toFixed(2);
      var del=(Math.random()*-2).toFixed(2);
      html+='<i style="animation-duration:'+dur+'s;animation-delay:'+del+'s"></i>';
    }
    el.innerHTML=html;
  }
  buildWave(document.getElementById('heroWave'),64);
  (function(){var f=document.getElementById('footWave');if(f){for(var i=0;i<7;i++){var b=document.createElement('i');b.style.height=(20+Math.random()*80)+'%';b.style.animationDelay=(i*0.12)+'s';f.appendChild(b);}}})();

  /* ---- marquee: duplicate server-rendered items for a seamless loop ---- */
  var track=document.getElementById('marquee');
  if(track && track.children.length){
    track.innerHTML=track.innerHTML+track.innerHTML;
  }

  /* ---- persist language choice is via separate files; nothing to do here ---- */

  /* ---- nav scroll state ---- */
  var nav=document.getElementById('nav');
  var onScroll=function(){ nav.classList.toggle('scrolled',window.scrollY>40); };
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  /* ---- mobile menu ---- */
  var menuBtn=document.getElementById('menuBtn'), mm=document.getElementById('mobileMenu');
  menuBtn.addEventListener('click',function(){ mm.classList.toggle('open'); document.body.classList.toggle('lock'); });
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');document.body.classList.remove('lock');});});

  /* ---- day / night toggle ---- */
  var root=document.documentElement, tBtn=document.getElementById('modeToggle');
  tBtn.addEventListener('click',function(){
    root.setAttribute('data-mode', root.getAttribute('data-mode')==='night' ? 'day':'night');
  });

  /* ---- reveal on scroll ---- */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- count up ---- */
  var counted=new WeakSet();
  var cio=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting||counted.has(e.target))return;
      counted.add(e.target);
      var el=e.target, target=+el.getAttribute('data-count'), suffix=el.querySelector('small');
      var sfx=suffix?suffix.outerHTML:'', start=performance.now(), dur=1400;
      (function tick(now){
        var p=Math.min((now-start)/dur,1), ease=1-Math.pow(1-p,3);
        el.innerHTML=Math.round(target*ease)+sfx;
        if(p<1)requestAnimationFrame(tick);
      })(start);
    });
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  /* ---- layout switcher ---- */
  var opts=document.querySelectorAll('.lay-opt'), plans=document.querySelectorAll('#layPlan img');
  opts.forEach(function(o){
    o.addEventListener('click',function(){
      var i=o.getAttribute('data-i');
      opts.forEach(function(x){x.classList.remove('active');});
      o.classList.add('active');
      plans.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-i')===i);});
    });
  });

  /* ---- accordion ---- */
  document.querySelectorAll('.acc-item').forEach(function(item){
    var head=item.querySelector('.acc-head'), body=item.querySelector('.acc-body');
    var set=function(open){ body.style.maxHeight=open ? body.scrollHeight+'px':'0px'; };
    if(item.classList.contains('open')) requestAnimationFrame(function(){set(true);});
    head.addEventListener('click',function(){
      var willOpen=!item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(function(o){ o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight='0px'; });
      if(willOpen){ item.classList.add('open'); set(true); }
    });
  });
  window.addEventListener('resize',function(){
    var open=document.querySelector('.acc-item.open .acc-body');
    if(open) open.style.maxHeight=open.scrollHeight+'px';
  });

  /* ---- hero parallax ---- */
  var hp=document.getElementById('heroPhoto');
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y<window.innerHeight) hp.style.transform='scale(1.06) translateY('+(y*0.18)+'px)';
  },{passive:true});

})();
