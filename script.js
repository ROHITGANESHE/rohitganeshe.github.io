/* ============================================================
   ROHIT GANESHE — Portfolio Script (Complete Fixed Version)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* === TIME-BASED GREETING === */
  const greetEl = document.getElementById("timeGreeting");
  if (greetEl) {
    const h = new Date().getHours();
    let msg = "";
    if      (h >= 5  && h < 12) msg = "🌅 Good Morning";
    else if (h >= 12 && h < 17) msg = "☀️ Good Afternoon";
    else if (h >= 17 && h < 21) msg = "🌆 Good Evening";
    else                         msg = "🌙 Good Night";
    greetEl.textContent = msg;
  }

  /* === PARTICLE BG === */
  const cv = document.getElementById("bg-canvas");
  if (cv) {
    const cx = cv.getContext("2d");
    let W, H, pts = [], mx = -999, my = -999;
    const N = 55, DIST = 130;
    function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < N; i++)
      pts.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:.8+Math.random()*1.5 });
    document.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; });
    (function loop() {
      cx.clearRect(0,0,W,H);
      const light = document.body.classList.contains("light");
      const col = light ? "rgba(37,99,235," : "rgba(79,142,247,";
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const dx=mx-p.x,dy=my-p.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<160){p.x+=dx*.003;p.y+=dy*.003;}
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<DIST){cx.beginPath();cx.strokeStyle=col+(1-d/DIST)*.22+")";cx.lineWidth=.6;cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.stroke();}
      }
      pts.forEach(p=>{cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle=col+".55)";cx.fill();});
      requestAnimationFrame(loop);
    })();
  }

  /* === CUSTOM CURSOR === */
  const co = document.querySelector(".cursor-outer");
  const ci = document.querySelector(".cursor-inner");
  let cx2=0,cy2=0,ox=0,oy=0;
  document.addEventListener("mousemove", e => { cx2=e.clientX; cy2=e.clientY; });
  (function animC() {
    ox+=(cx2-ox)*.12; oy+=(cy2-oy)*.12;
    if(ci){ci.style.left=cx2+"px";ci.style.top=cy2+"px";}
    if(co){co.style.left=ox+"px";co.style.top=oy+"px";}
    requestAnimationFrame(animC);
  })();
  document.querySelectorAll("a,button,.proj-card,.skill-card,.exp-card,.edu-card,.cg-card,.info-card,.clink").forEach(el=>{
    el.addEventListener("mouseenter",()=>co&&co.classList.add("active"));
    el.addEventListener("mouseleave",()=>co&&co.classList.remove("active"));
  });

  /* === THEME === */
  const tb = document.getElementById("themeBtn");
  function setTheme(l) {
    document.body.classList.toggle("light", l);
    if(tb) tb.textContent = l ? "☀" : "◑";
    localStorage.setItem("rg-theme", l ? "light" : "dark");
  }
  const sv = localStorage.getItem("rg-theme");
  setTheme(sv ? sv==="light" : window.matchMedia("(prefers-color-scheme:light)").matches);
  tb?.addEventListener("click", ()=>setTheme(!document.body.classList.contains("light")));

  /* === NAV SCROLL === */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", ()=>nav?.classList.toggle("scrolled", scrollY>28), {passive:true});
  document.getElementById("navHome")?.addEventListener("click", e=>{
    e.preventDefault(); scrollTo({top:0,behavior:"smooth"});
  });
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a=>a.addEventListener("click", e=>{
    e.preventDefault(); document.querySelector(a.getAttribute("href"))?.scrollIntoView({behavior:"smooth"});
  }));

  /* === TYPEWRITER === */
  const tw = document.getElementById("tw");
  const words = ["Data Scientist","AI/ML Engineer","Data Analyst","GenAI Explorer","ML Engineer"];
  let wi=0, ci3=0, del=false;
  function typeLoop() {
    if (!tw) return;
    const w = words[wi];
    if (!del) {
      tw.textContent = w.slice(0, ++ci3);
      if (ci3===w.length) { del=true; setTimeout(typeLoop, 2400); return; }
      setTimeout(typeLoop, 82);
    } else {
      tw.textContent = w.slice(0, --ci3);
      if (ci3===0) { del=false; wi=(wi+1)%words.length; setTimeout(typeLoop, 380); return; }
      setTimeout(typeLoop, 40);
    }
  }
  typeLoop();

  /* === SCROLL REVEAL === */
  const ro = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("in-view");o.unobserve(e.target);} });
  }, {threshold:0, rootMargin:"0px 0px -48px 0px"});
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i%4)*.08+"s";
    ro.observe(el);
  });
  function sweep() {
    document.querySelectorAll(".reveal").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("in-view");
    });
  }
  sweep(); setTimeout(sweep, 200); setTimeout(sweep, 700);

  /* === SKILL BARS === */
  const so = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("in-view");o.unobserve(e.target);} });
  }, {threshold:.15});
  document.querySelectorAll(".skill-card").forEach(el => so.observe(el));

  /* === CONTACT FORM === */
  const form = document.getElementById("contactForm");
  const fst  = document.getElementById("fstatus");
  form?.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.action || form.action.includes("YOUR_FORM_ID")) {
      if (fst) { fst.style.color="#f87171"; fst.textContent="Form not connected yet. Please email rohitganeshe2001@gmail.com directly."; }
      return;
    }
    if (fst) { fst.style.color="var(--t2)"; fst.textContent="Sending..."; }
    try {
      const r = await fetch(form.action, {method:"POST", body:new FormData(form), headers:{Accept:"application/json"}});
      if (r.ok) { if(fst){fst.style.color="var(--green)"; fst.textContent="✓ Sent! I'll get back to you soon.";} form.reset(); }
      else       { if(fst){fst.style.color="#f87171"; fst.textContent="Failed to send. Please email me directly.";} }
    } catch { if(fst){fst.style.color="#f87171"; fst.textContent="Network error. Try again.";} }
  });

});

/* ============================================================
   CERTIFICATE MODAL — global functions (outside DOMContentLoaded)
   ============================================================ */
window.openCert = function(imgFile, title, issuer, date, tags, certId) {
  const modal  = document.getElementById("certModal");
  const img    = document.getElementById("certModalImg");
  const ttl    = document.getElementById("certModalTitle");
  const iss    = document.getElementById("certModalIssuer");
  const dt     = document.getElementById("certModalDate");
  const cid    = document.getElementById("certModalId");
  const tagsEl = document.getElementById("certModalTags");
  const dlBtn  = document.getElementById("certModalDownload");
  if (!modal) return;

  // Set content
  img.src = imgFile;
  ttl.textContent = title;
  iss.textContent = issuer;
  dt.textContent  = date;
  cid.textContent = certId !== "-" ? "ID: " + certId : "";
  tagsEl.innerHTML = tags.split("·").map(t => `<span>${t.trim()}</span>`).join("");

  // Blob download (works on GitHub Pages)
  const ext      = imgFile.split(".").pop();
  const filename = title.replace(/[^a-z0-9]/gi, "_") + "." + ext;
  fetch(imgFile)
    .then(r => r.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      dlBtn.href     = url;
      dlBtn.download = filename;
      setTimeout(() => URL.revokeObjectURL(url), 90000);
    })
    .catch(() => { dlBtn.href = imgFile; dlBtn.download = filename; });

  // Open
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeCert = function() {
  const modal = document.getElementById("certModal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    const img = document.getElementById("certModalImg");
    if (img) img.src = "";
  }, 300);
};

window.closeCertOnBg = function(e) {
  if (e.target === document.getElementById("certModal")) window.closeCert();
};

window.addEventListener("keydown", e => { if(e.key === "Escape") window.closeCert(); });
