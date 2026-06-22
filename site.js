(function(){
  "use strict";

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

  /* ---- gentle fade-in on scroll (opacity only) ---- */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- stats: render final numbers (no count-up animation) ---- */
  document.querySelectorAll('[data-count]').forEach(function(el){
    var suffix=el.querySelector('small');
    el.innerHTML=el.getAttribute('data-count')+(suffix?suffix.outerHTML:'');
  });

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

})();
