/**
 * VIP v5 — рамки, ник, бейдж, титул ВЕЗДЕ
 */
(function(){
'use strict';
if (window.__vipLoaded) return;
window.__vipLoaded = true;

var URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb=null;
try{sb=window.supabaseClient||window.supabase.createClient(URL,KEY);}catch(e){}

var vipCache={};

var FRAMES={
none:     {css:'',animated:false},
gold:     {css:'linear-gradient(135deg,#f5d76e,#f39c12,#e67e22,#f5d76e)',animated:false},
silver:   {css:'linear-gradient(135deg,#ecf0f1,#95a5a6,#7f8c8d,#ecf0f1)',animated:false},
fire:     {css:'linear-gradient(135deg,#e74c3c,#f39c12,#e74c3c)',animated:false},
ice:      {css:'linear-gradient(135deg,#5dade2,#85c1e9,#3498db,#5dade2)',animated:false},
emerald:  {css:'linear-gradient(135deg,#27ae60,#16a085,#2ecc71)',animated:false},
royal:    {css:'linear-gradient(135deg,#9b59b6,#8e44ad,#d1a4e8)',animated:false},
cherry:   {css:'linear-gradient(135deg,#e91e63,#c2185b,#ff6090)',animated:false},
cyber:    {css:'linear-gradient(135deg,#00bcd4,#00e5ff,#00838f)',animated:false},
sunset:   {css:'linear-gradient(135deg,#ff6b6b,#feca57,#f39c12)',animated:false},
ocean:    {css:'linear-gradient(135deg,#0f3460,#16537e,#4a90e2)',animated:false},
legendary:{css:'conic-gradient(from 0deg,#f5d76e,#e74c3c,#9b59b6,#3498db,#27ae60,#f5d76e)',animated:true},
rainbow:  {css:'conic-gradient(from 0deg,#e74c3c,#f39c12,#f5d76e,#27ae60,#3498db,#9b59b6,#e74c3c)',animated:true}
};

var css=document.createElement('style');
css.textContent=`
.vip-badge{display:inline-flex;align-items:center;justify-content:center;margin-left:4px;padding:1px 6px;border-radius:6px;background:linear-gradient(135deg,#f5d76e,#f39c12);font-size:.68em;line-height:1;vertical-align:middle;box-shadow:0 2px 8px rgba(243,156,18,.5);animation:vipBG 2.5s ease-in-out infinite;font-weight:900;cursor:help;z-index:11;position:relative}
@keyframes vipBG{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25);box-shadow:0 2px 16px rgba(243,156,18,1)}}
.vip-name{font-weight:900!important;background-size:200% auto!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important;animation:vipSH 8s linear infinite!important}
@keyframes vipSH{0%{background-position:-200% center}100%{background-position:200% center}}
.vip-title-tag{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:10px;background:linear-gradient(135deg,rgba(243,156,18,.2),rgba(245,215,110,.1));border:1px solid rgba(243,156,18,.4);font-size:.62em;font-weight:900;color:#f5d76e;letter-spacing:.3px;vertical-align:middle;text-transform:uppercase}
.vip-avatar-frame{position:relative;display:inline-block;padding:3px;border-radius:50%;background-size:200% 200%;animation:vipFS 8s linear infinite;line-height:0}
.vip-avatar-frame.animated{animation:vipFS 4s linear infinite}
@keyframes vipFS{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.vip-avatar-frame::before{content:'';position:absolute;inset:0;border-radius:50%;background:inherit;filter:blur(8px);opacity:.5;z-index:-1}
.vip-avatar-frame img{display:block;border-radius:50%;border:3px solid #14142a;background:#fff;width:100%;height:100%;object-fit:cover;aspect-ratio:1/1}
`;
document.head.appendChild(css);

async function loadVIP(ids){
  if(!sb||!ids.length)return;
  var toLoad=ids.filter(function(id){return !vipCache[id];});
  if(!toLoad.length)return;
  try{
    var r=await sb.from('profiles').select('user_id,vip_until,nick_color,vip_badge,avatar_frame,custom_title').in('user_id',toLoad);
    (r&&r.data||[]).forEach(function(p){
      var until=p.vip_until?new Date(p.vip_until):null;
      var active=until&&until.getTime()>Date.now();
      vipCache[p.user_id]={active:!!active,color:active?(p.nick_color||'#6C63FF'):null,badge:active?(p.vip_badge||'👑'):null,frame:active?(p.avatar_frame||'none'):null,title:active?p.custom_title:null,until:until};
    });
  }catch(e){}
}

function applyVIP(el,uid){
  if(!el||!uid)return;
  if(el.dataset.vipDone==='1')return;
  var v=vipCache[uid];
  if(!v||!v.active)return;
  el.dataset.vipDone='1';
  var c=v.color||'#6C63FF';
  el.classList.add('vip-name');
  el.style.background='linear-gradient(90deg,'+c+' 0%,#f5d76e 25%,'+c+' 50%,#f5d76e 75%,'+c+' 100%)';
  el.style.backgroundSize='200% auto';
  el.style.webkitBackgroundClip='text';
  el.style.backgroundClip='text';
  el.style.webkitTextFillColor='transparent';
  if(!el.nextElementSibling||!el.nextElementSibling.classList.contains('vip-badge')){
    var b=document.createElement('span');b.className='vip-badge';b.textContent=v.badge||'👑';
    b.title='VIP до '+(v.until?v.until.toLocaleDateString('ru-RU'):'');
    el.insertAdjacentElement('afterend',b);
  }
  if(v.title){
    var nb=el.nextElementSibling;
    var af=(nb&&nb.classList.contains('vip-badge'))?nb:el;
    if(!af.nextElementSibling||!af.nextElementSibling.classList.contains('vip-title-tag')){
      var t=document.createElement('span');t.className='vip-title-tag';t.textContent=v.title;
      af.insertAdjacentElement('afterend',t);
    }
  }
}

function applyFrame(img,uid){
  if(!img||!uid)return;
  if(img.dataset.vipFrame==='1')return;
  var v=vipCache[uid];
  if(!v||!v.active||!v.frame||v.frame==='none')return;
  var f=FRAMES[v.frame];if(!f||!f.css)return;
  img.dataset.vipFrame='1';
  var w=document.createElement('span');
  w.className='vip-avatar-frame'+(f.animated?' animated':'');
  w.style.background=f.css;w.style.backgroundSize='200% 200%';
  var p=img.parentNode;p.insertBefore(w,img);w.appendChild(img);
}

var NICK_SEL='.frm-post-author,.frm-topic-author,.frm-author-link,.gld-chat-msg-author,.gld-post-author,.comment-author,.username,.nickname,.author-name';
var AV_SEL='.frm-post-avatar,.frm-topic-avatar,.gld-chat-msg-avatar,.gld-post-avatar,.comment-avatar,.author-avatar';

function scan(){
  var els=document.querySelectorAll('[data-user-id]');
  var ids=[];
  els.forEach(function(el){var id=el.dataset.userId;if(id&&ids.indexOf(id)===-1)ids.push(id);});
  if(!ids.length)return;
  loadVIP(ids).then(function(){
    els.forEach(function(el){
      var uid=el.dataset.userId;
      var n=el.querySelector(NICK_SEL);if(n)applyVIP(n,uid);
      var a=el.querySelector(AV_SEL)||el.querySelector('img');if(a)applyFrame(a,uid);
    });
  });
}

function init(){
  if(!sb)return;
  scan();
  var t;
  new MutationObserver(function(){clearTimeout(t);t=setTimeout(scan,500);}).observe(document.body,{childList:true,subtree:true});
  console.log('⭐ VIP v5 загружен');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.VIP_FRAMES=FRAMES;
})();
