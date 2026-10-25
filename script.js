/* =============================================================
   Melody — YouTube IFrame Player integration
   All YouTube video IDs are verified against official uploads.
   No generic sample audio is used. No YouTube search redirects.
   ============================================================= */

const tracks = [
  // Kannada / Sandalwood
  {id:1, title:"Soul of Dia",           artist:"Sanjith Hegde",                    vibe:"Kannada · Sandalwood",  duration:218, art:"cover-golden", symbol:"☼", ytId:"3V-wb9EZCZk",  playlist:"Sandalwood Hits"},
  {id:2, title:"Marali Manasaagide",    artist:"Sanjith Hegde",                    vibe:"Kannada · Melody",      duration:245, art:"cover-focus",  symbol:"✦", ytId:"01uRBlLAjFg",  playlist:"Sandalwood Hits"},
  {id:3, title:"Puttamalli",            artist:"Sanjith Hegde",                    vibe:"Kannada · Folk-pop",    duration:213, art:"cover-night",  symbol:"☾", ytId:"kxeWpi3_xT0",  playlist:"Sandalwood Hits"},
  {id:4, title:"Kaagadada Doniyalli",   artist:"Vasuki Vaibhav",                   vibe:"Kannada · Acoustic",    duration:185, art:"cover-golden", symbol:"☼", ytId:"EtGh9oC2SZ0",  playlist:"Sandalwood Hits"},
  {id:5, title:"Arere Avala Naguva",    artist:"Vasuki Vaibhav",                   vibe:"Kannada · Indie",       duration:227, art:"cover-focus",  symbol:"✦", ytId:"fclPhO1FsOY",  playlist:"Sandalwood Hits"},
  {id:6, title:"Tulasi",                artist:"Sumedh K",                         vibe:"Kannada · Indie-folk",  duration:196, art:"cover-night",  symbol:"☾", ytId:"Y8ZApXcnhy4",  playlist:"Sandalwood Hits"},
  {id:7, title:"Maaye",                 artist:"Sumedh K",                         vibe:"Kannada · Indie",       duration:222, art:"cover-focus",  symbol:"✦", ytId:"Yxx-zTuw1xE",  playlist:"Sandalwood Hits"},
  {id:8, title:"Jhumki",                artist:"Tanmay Gururaj",                   vibe:"Kannada · Indie Pop",   duration:176, art:"cover-night",  symbol:"♫", ytId:"XhUPPuZMEPY",  playlist:"Sandalwood Hits"},
  {id:9, title:"Nasheya Gungale",       artist:"Tanmay Gururaj",                   vibe:"Kannada · Indie Pop",   duration:192, art:"cover-golden", symbol:"☼", ytId:"9dlbKgxvg_A",  playlist:"Sandalwood Hits"},
  // Hindi / Bollywood
  {id:10, title:"Kesariya",             artist:"Arijit Singh",                     vibe:"Hindi · Bollywood",     duration:211, art:"cover-golden", symbol:"☼", ytId:"NJAv_7lHUIU",  playlist:"Bollywood Mix"},
  {id:11, title:"Chaleya",              artist:"Arijit Singh, Shilpa Rao",         vibe:"Hindi · Bollywood",     duration:198, art:"cover-night",  symbol:"☾", ytId:"VAdGW7QDJiU",  playlist:"Bollywood Mix"},
  {id:12, title:"Apna Bana Le",         artist:"Arijit Singh",                     vibe:"Hindi · Romantic",      duration:204, art:"cover-focus",  symbol:"✦", ytId:"ElZ_qp0n9aM",  playlist:"Bollywood Mix"},
  {id:13, title:"Heeriye",              artist:"Jasleen Royal ft. Arijit Singh",   vibe:"Hindi · Pop",           duration:192, art:"cover-golden", symbol:"☼", ytId:"RLzC55ai0eo",  playlist:"Bollywood Mix"},
  {id:14, title:"What Jhumka?",         artist:"Pritam · Arijit Singh · Jonita G.",vibe:"Hindi · Dance",         duration:215, art:"cover-night",  symbol:"♫", ytId:"P1fIdFRnfqw",  playlist:"Bollywood Mix"},
  // English Pop
  {id:15, title:"Anti-Hero",            artist:"Taylor Swift",                     vibe:"English · Pop",         duration:201, art:"cover-focus",  symbol:"✦", ytId:"b1kbLwvqugk",  playlist:"Global Pop"},
  {id:16, title:"Blinding Lights",      artist:"The Weeknd",                       vibe:"English · Synth-pop",   duration:200, art:"cover-night",  symbol:"☾", ytId:"4NRXx6U8ABQ",  playlist:"Global Pop"},
  {id:17, title:"Shape of You",         artist:"Ed Sheeran",                       vibe:"English · Pop",         duration:233, art:"cover-golden", symbol:"☼", ytId:"JGwWNGJdvx8",  playlist:"Global Pop"},
  {id:18, title:"Levitating",           artist:"Dua Lipa",                         vibe:"English · Dance-pop",   duration:203, art:"cover-focus",  symbol:"✦", ytId:"TUVcZfQe-Kw",  playlist:"Global Pop"},
  {id:19, title:"Flowers",              artist:"Miley Cyrus",                      vibe:"English · Pop",         duration:200, art:"cover-golden", symbol:"☼", ytId:"G7KNmW9a75Y",  playlist:"Global Pop"}
];

const playlists = {
  "Sandalwood Hits": {description:"Kannada melodies, indie voices and Sandalwood favourites.", symbol:"✦", art:"cover-golden", ids:[1,2,3,4,5,6,7,8,9]},
  "Bollywood Mix":   {description:"Hindi hits for every mood, from romance to dance.",          symbol:"☼", art:"cover-golden", ids:[10,11,12,13,14]},
  "Global Pop":      {description:"Popular English pop for your daily soundtrack.",             symbol:"♫", art:"cover-night",  ids:[15,16,17,18,19]},
  "Focus Flow":      {description:"Quiet beats for deep work.",                                symbol:"✦", art:"cover-focus",  ids:[1,6,15,10]},
  "Golden Hour":     {description:"Warm sounds, softer days.",                                 symbol:"☼", art:"cover-golden", ids:[4,2,10,13,17]},
  "Late Night Drive":{description:"City lights and long roads.",                               symbol:"☾", art:"cover-night",  ids:[3,8,11,16,19]},
  "Liked Songs":     {description:"The tracks you have saved.",                                symbol:"♥", art:"cover-liked",  ids:[]}
};

let currentTrack = null, liked = new Set(), currentPlaylist = "Focus Flow";
let shuffled = false, repeated = false, toastTimer;
let ytPlayer = null, ytReady = false, pendingPlay = null, progressTimer = null;
let muted = false, lastVol = 100;

const $ = id => document.getElementById(id);
const fmt = sec => { if (!Number.isFinite(sec)||sec<0) sec=0; return `${Math.floor(sec/60)}:${String(Math.floor(sec%60)).padStart(2,"0")}`; };
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function notify(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400);}
function songIdsFor(name){return name==="Liked Songs"?[...liked]:(playlists[name]?.ids||tracks.map(t=>t.id));}
function trackById(id){return tracks.find(t=>t.id===id);}

// ── YouTube IFrame API ────────────────────────────────────────
window.onYouTubeIframeAPIReady = function(){
  ytPlayer = new YT.Player("ytEmbed",{
    height:"100%", width:"100%",
    playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,rel:0,origin:window.location.href},
    events:{onReady:onPlayerReady, onStateChange:onPlayerStateChange, onError:onPlayerError}
  });
};

function onPlayerReady(){
  ytReady = true;
  if($("volume")){$("volume").value=100; ytPlayer.setVolume(100);}
  if(pendingPlay){ytPlayer.loadVideoById(pendingPlay); pendingPlay=null;}
}

function onPlayerStateChange(ev){
  const S = YT.PlayerState;
  if(ev.data===S.PLAYING){$("playPause").textContent="⏸";$("playPause").title="Pause";startProgressTimer();showYtPanel(true);}
  else if(ev.data===S.PAUSED){$("playPause").textContent="▶";$("playPause").title="Play";stopProgressTimer();}
  else if(ev.data===S.ENDED){stopProgressTimer();if(repeated){ytPlayer.seekTo(0);ytPlayer.playVideo();}else advanceTrack(1);}
  else if(ev.data===S.BUFFERING){$("playPause").textContent="…";$("playPause").title="Buffering";}
}

function onPlayerError(ev){
  stopProgressTimer();
  const codes={2:"Invalid request.",5:"HTML5 error.",100:"Video not found.",101:"Embed not permitted by rights holder.",150:"Embed not permitted by rights holder."};
  const msg=codes[ev.data]||"Playback error.";
  notify("Playback unavailable — "+msg);
  $("playPause").textContent="▶";
  if(currentTrack)$("nowArtist").textContent="Playback unavailable — "+msg;
  showYtPanel(false);
}

function startProgressTimer(){stopProgressTimer();progressTimer=setInterval(tickProgress,500);}
function stopProgressTimer(){clearInterval(progressTimer);progressTimer=null;}
function tickProgress(){
  if(!ytPlayer||typeof ytPlayer.getCurrentTime!=="function")return;
  const cur=ytPlayer.getCurrentTime()||0, dur=ytPlayer.getDuration()||0;
  $("currentTime").textContent=fmt(cur);
  $("duration").textContent=fmt(dur);
  const pct=dur>0?(cur/dur)*100:0;
  $("progress").value=pct; $("progress").disabled=false;
}

function showYtPanel(visible){const p=$("ytPanel");if(p)p.classList.toggle("yt-visible",visible);}

function loadYtVideo(ytId){
  showYtPanel(true);
  if(ytReady&&ytPlayer&&typeof ytPlayer.loadVideoById==="function") ytPlayer.loadVideoById(ytId);
  else pendingPlay=ytId;
}

function playTrack(id){
  const t=trackById(Number(id)); if(!t)return;
  currentTrack=t; syncPlayer();
  renderHome();
  if(!$("playlistView").classList.contains("hidden"))renderPlaylist(currentPlaylist);
  if(!$("resultsView").classList.contains("hidden"))renderResults($("searchInput").value);
  if(t.ytId){
    loadYtVideo(t.ytId);
    notify("Now playing: "+t.title);
  } else {
    if(ytReady&&ytPlayer&&typeof ytPlayer.stopVideo==="function")ytPlayer.stopVideo();
    showYtPanel(false); stopProgressTimer();
    $("playPause").textContent="▶"; $("currentTime").textContent="—";
    $("progress").value=0; $("progress").disabled=true;
    notify("Playback unavailable for this track");
    $("nowArtist").textContent="Playback unavailable for this track";
  }
}

function syncPlayer(){
  $("nowTitle").textContent=currentTrack?.title||"Choose a track";
  $("nowArtist").textContent=currentTrack?.artist||"Select a song to start playing";
  $("nowCover").className=`mini-cover ${currentTrack?.art||"cover-focus"}`;
  $("nowCover").textContent=currentTrack?.symbol||"✦";
  $("playPause").textContent="▶"; $("playPause").title="Play";
  $("nowLike").textContent=currentTrack&&liked.has(currentTrack.id)?"♥":"♡";
  $("nowLike").classList.toggle("liked-track",!!currentTrack&&liked.has(currentTrack.id));
  $("duration").textContent=currentTrack?fmt(currentTrack.duration):"0:00";
  $("currentTime").textContent="—";
  $("progress").value=0; $("progress").disabled=!currentTrack?.ytId;
}

function advanceTrack(direction=1){
  const list=songIdsFor(currentPlaylist);
  let pool=list.length?list:tracks.map(t=>t.id);
  let i=pool.indexOf(currentTrack?.id);
  if(i<0)i=0;
  else if(shuffled)i=Math.floor(Math.random()*pool.length);
  else i=(i+direction+pool.length)%pool.length;
  playTrack(pool[i]);
}

function toggleLike(id){
  const n=Number(id);
  if(liked.has(n))liked.delete(n);else liked.add(n);
  playlists["Liked Songs"].ids=[...liked];
  renderHome(); renderResults($("searchInput").value);
  if(!$("playlistView").classList.contains("hidden"))renderPlaylist(currentPlaylist);
  if(currentTrack)syncPlayer();
  notify(liked.has(n)?"Added to Liked Songs ♥":"Removed from Liked Songs");
}

function renderTracks(container,list){
  $(container).innerHTML=list.map((t,i)=>`
<div class="track-row${currentTrack?.id===t.id?" now-playing-row":""}" data-track="${t.id}">
  <span class="track-num">${currentTrack?.id===t.id?"♫":i+1}</span>
  <div class="track-title"><span class="track-cover ${t.art}">${t.symbol}</span><span><b>${esc(t.title)}</b><small>${esc(t.artist)}</small></span></div>
  <span class="track-vibe">${esc(t.vibe)}</span>
  <span class="track-duration">${fmt(t.duration)}</span>
  <span class="track-actions">
    <button class="${liked.has(t.id)?"liked-track":""}" data-like="${t.id}" aria-label="Like ${esc(t.title)}">${liked.has(t.id)?"♥":"♡"}</button>
    <button data-play="${t.id}" aria-label="Play ${esc(t.title)}">▶</button>
  </span>
</div>`).join("");
}

function renderHome(){renderTracks("trackList",tracks.slice(0,6));$("likedCount").textContent=`${liked.size} liked tracks`;renderLibraryTiles();}
function renderResults(query){
  const q=query.trim().toLowerCase();
  const list=tracks.filter(t=>`${t.title} ${t.artist} ${t.vibe} ${t.playlist}`.toLowerCase().includes(q));
  renderTracks("resultsList",list);
  $("emptyState").classList.toggle("hidden",list.length>0);
  $("resultsTitle").textContent=q?`Results for "${query.trim()}"` : "Search";
  $("resultsSub").textContent=`${list.length} ${list.length===1?"track":"tracks"} found`;
}

function renderPlaylist(name){
  currentPlaylist=name;
  const p=playlists[name]||playlists["Focus Flow"];
  const art=$("playlistLargeArt");
  art.className=`playlist-large-art ${p.art}`; art.textContent=p.symbol;
  $("playlistTitle").textContent=name;
  $("playlistDescription").textContent=p.description;
  $("playlistTrackCount").textContent=`${songIdsFor(name).length} tracks`;
  renderTracks("playlistTracks",songIdsFor(name).map(trackById).filter(Boolean));
}
function renderLibraryTiles(){
  $("libraryTiles").innerHTML=Object.entries(playlists).map(([name,p])=>`
<button class="library-tile" data-playlist="${esc(name)}">
  <span class="playlist-thumb ${p.art==="cover-focus"?"purple":p.art==="cover-golden"?"orange":p.art==="cover-night"?"blue":"liked"}">${p.symbol}</span>
  <span><b>${esc(name)}</b><small>${songIdsFor(name).length} tracks</small></span>
</button>`).join("");
}

function showView(view){
  ["homeView","resultsView","playlistView","libraryView"].forEach(id=>$(id).classList.add("hidden"));
  const map={home:"homeView",search:"resultsView",library:"libraryView"};
  if(map[view])$(map[view]).classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  if(view==="search"){renderResults($("searchInput").value);$("searchInput").focus();}
}
function openPlaylist(name){
  if(name==="Liked Songs"&&liked.size===0)notify("Like a track to start your Liked Songs");
  ["homeView","resultsView","libraryView"].forEach(id=>$(id).classList.add("hidden"));
  $("playlistView").classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",false));
  renderPlaylist(name);
}

function setVolume(v){if(ytReady&&ytPlayer&&typeof ytPlayer.setVolume==="function")ytPlayer.setVolume(v);}

function bindEvents(){
  document.addEventListener("click",e=>{
    const play=e.target.closest("[data-play]"); if(play){playTrack(play.dataset.play);return;}
    const like=e.target.closest("[data-like]"); if(like){toggleLike(like.dataset.like);return;}
    const pl=e.target.closest("[data-playlist]"); if(pl){openPlaylist(pl.dataset.playlist);return;}
    const view=e.target.closest("[data-view]"); if(view){showView(view.dataset.view);return;}
    const card=e.target.closest(".album-card"); if(card){openPlaylist(card.dataset.playlist);return;}
  });

  document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
  $("searchInput").addEventListener("input",()=>{showView("search");renderResults($("searchInput").value);});
  $("showAllTracks").addEventListener("click",()=>{showView("search");$("searchInput").value="";renderResults("");});

  $("playPause").addEventListener("click",()=>{
    if(!currentTrack){playTrack(tracks[0].id);return;}
    if(!currentTrack.ytId){notify("Playback unavailable for this track");return;}
    if(!ytReady){loadYtVideo(currentTrack.ytId);return;}
    const state=ytPlayer.getPlayerState();
    if(state===YT.PlayerState.PLAYING)ytPlayer.pauseVideo();
    else if(state===YT.PlayerState.PAUSED||state===YT.PlayerState.CUED||state===-1)ytPlayer.playVideo();
    else loadYtVideo(currentTrack.ytId);
  });

  $("nextTrack").addEventListener("click",()=>advanceTrack(1));
  $("previousTrack").addEventListener("click",()=>{
    if(ytReady&&ytPlayer&&typeof ytPlayer.getCurrentTime==="function"&&ytPlayer.getCurrentTime()>3)ytPlayer.seekTo(0);
    else advanceTrack(-1);
  });

  $("nowLike").addEventListener("click",()=>currentTrack?toggleLike(currentTrack.id):notify("Choose a track first"));

  $("progress").addEventListener("input",()=>{
    if(!ytReady||typeof ytPlayer.getDuration!=="function")return;
    const dur=ytPlayer.getDuration()||0;
    ytPlayer.seekTo((Number($("progress").value)/100)*dur,true);
  });

  $("volume").addEventListener("input",()=>{
    const v=Number($("volume").value); lastVol=v; muted=v===0; setVolume(v);
    $("muteButton").textContent=v===0?"🔇":v<50?"🔉":"🔊";
  });
  $("muteButton").addEventListener("click",()=>{
    muted=!muted;
    if(muted){setVolume(0);$("volume").value=0;$("muteButton").textContent="🔇";}
    else{setVolume(lastVol||100);$("volume").value=lastVol||100;$("muteButton").textContent=(lastVol||100)<50?"🔉":"🔊";}
  });

  $("shuffleControl").addEventListener("click",()=>{shuffled=!shuffled;$("shuffleControl").style.color=shuffled?"var(--green)":"";notify(shuffled?"Shuffle on":"Shuffle off");});
  $("repeatControl").addEventListener("click",()=>{repeated=!repeated;$("repeatControl").style.color=repeated?"var(--green)":"";notify(repeated?"Repeat on":"Repeat off");});
  $("playlistPlay").addEventListener("click",()=>{const ids=songIdsFor(currentPlaylist);if(!ids.length){notify("Like a track to fill this playlist");return;}playTrack(ids[0]);});
  $("shuffleBtn").addEventListener("click",()=>{shuffled=true;$("shuffleControl").style.color="var(--green)";advanceTrack(1);});
  $("newPlaylist").addEventListener("click",()=>{const name=prompt("Name your new playlist:");if(!name||!name.trim())return;const clean=name.trim();if(playlists[clean]){notify("That playlist already exists");return;}playlists[clean]={description:"Your own collection of good sounds.",symbol:"♫",art:"cover-focus",ids:[]};renderLibraryTiles();notify(`Created "${clean}"`);openPlaylist(clean);});
  $("profileButton").addEventListener("click",()=>notify("Listener profile — demo UI"));
  $("backBtn").addEventListener("click",()=>showView("home"));
  $("forwardBtn").addEventListener("click",()=>showView("library"));
  document.addEventListener("keydown",e=>{
    if(e.key==="/"&&document.activeElement.tagName!=="INPUT"){e.preventDefault();showView("search");}
    if(e.code==="Space"&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="BUTTON"){e.preventDefault();$("playPause").click();}
  });
}

function setGreeting(){
  const h=new Date().getHours();
  const g=h<12?"Good morning":h<17?"Good afternoon":"Good evening";
  const icon=h<6?"✦":h<12?"☀":h<18?"☼":"☾";
  const el=document.querySelector(".greeting-row h1");
  if(el)el.innerHTML=`${g}<span class="green-dot">.</span>`;
  const wi=document.querySelector(".weather-icon");
  if(wi)wi.textContent=icon;
}

bindEvents(); renderHome(); renderResults(""); setGreeting();

(function loadYTApi(){
  const tag=document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
})();

