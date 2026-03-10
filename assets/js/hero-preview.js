// Scrolling lunch preview (from FooterCodeInjection.xml, second script)
(function() {
  const hero = document.getElementById("hhHomeMenuHero");
  const track = document.getElementById("hhHeroTrack");
  const down = document.getElementById("hhHeroDown");
  const kicker = document.getElementById("hhHeroKicker");
  const sub = document.getElementById("hhHeroSub");
  if (!hero || !track || !down || !kicker || !sub) return;

  const DEBUG = new URLSearchParams(location.search).get("hhdebug") === "1";
  const log = (...a) => DEBUG && console.log("[HH HERO]", ...a);

  const DATA_URL = "menu-data.html";
  const JSON_ID = "hh-menu-data";
  const MAX_ITEMS = 18;
  const LOAD_TIMEOUT_MS = 9000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toISODateLocal = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const weekdayName = (d) => d.toLocaleDateString("en-US",{weekday:"long"});

  const escapeHtml = (str) => String(str ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");

  function cardHTML(name, tag){
    return `<div class="hh-card" role="button" tabindex="0"><div class="hh-card-top"><div class="hh-card-name">${escapeHtml(name)}</div><div class="hh-card-tag">${escapeHtml(tag)}</div></div><div class="hh-heat" aria-hidden="true"></div></div>`;
  }

  function goToMenu(){ window.location.href = "menu.html"; }

  function bindCards(){
    [...track.querySelectorAll(".hh-card")].forEach(card => {
      card.addEventListener("click", goToMenu);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToMenu(); } });
    });
  }

  let w = 0;
  function recalc(){ w = track.scrollWidth / 2; }

  function setItems(names, tag){
    const list = (names || []).slice(0, MAX_ITEMS);
    const safe = list.length ? list : ["Lunch menu unavailable"];
    const label = tag || "Tap → Menu";
    track.innerHTML = safe.map(n => cardHTML(n, label)).join("") + safe.map(n => cardHTML(n, label)).join("");
    bindCards();
    recalc();
  }

  async function fetchWithTimeout(url, ms){
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try{ return await fetch(url, { credentials:"same-origin", signal: ctrl.signal, cache:"no-store" }); }
    finally { clearTimeout(timer); }
  }

  function extractJSONFromHTML(html){
    const doc = new DOMParser().parseFromString(html, "text/html");
    const el = doc.getElementById(JSON_ID);
    if (el && (el.textContent||"").trim()) return (el.textContent||"").trim();
    return null;
  }

  function parseLunchNames(data, iso){
    const menu = (data?.menus||{})[iso];
    const lunch = menu?.lunch;
    if (!menu || !lunch || lunch.show === false) return [];
    const items = Array.isArray(lunch.items) ? lunch.items : [];
    return items.map(x => (x && typeof x === "object") ? String(x.name||"").trim() : String(x||"").trim()).filter(Boolean);
  }

  const now = new Date();
  kicker.textContent = `${weekdayName(now)} • ${toISODateLocal(now)}`;
  setItems(["Loading today’s lunch…"], "Please wait");

  (async () => {
    try{
      const res = await fetchWithTimeout(DATA_URL, LOAD_TIMEOUT_MS);
      if (!res.ok) throw new Error(`Fetch ${DATA_URL} failed (${res.status})`);
      const html = await res.text();
      const jsonText = extractJSONFromHTML(html);
      if (!jsonText) throw new Error(`Could not find #${JSON_ID} on ${DATA_URL}`);
      const data = JSON.parse(jsonText);
      const iso = toISODateLocal(new Date());
      const names = parseLunchNames(data, iso);
      if (DEBUG) sub.textContent = names.length ? `DEBUG: loaded ${names.length} items` : `DEBUG: no lunch items for ${iso}`;
      setItems(names.length ? names : ["Lunch menu unavailable"], "Tap → Menu");
    }catch(err){
      log("ERROR", err);
      setItems(["Tap to view today’s menu"], "Tap → Menu");
      if (DEBUG) sub.textContent = `DEBUG: ${err?.message || "Unknown error"}`;
    }
  })();

  down.addEventListener("click", () => window.scrollBy({ top: 620, behavior: reduceMotion ? "auto" : "smooth" }));

  let x = 0;
  const speed = 1.25;
  let isHover = false, isDown = false, startX=0, startOffset=0;

  hero.addEventListener("mouseenter", () => isHover = true);
  hero.addEventListener("mouseleave", () => isHover = false);
  window.addEventListener("resize", recalc);

  function setTransform(){ track.style.transform = `translate3d(${-x}px,0,0)`; }

  track.addEventListener("pointerdown", (e) => {
    isDown = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startOffset = x;
  });
  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    x = startOffset - dx;
    if (w > 0) x = ((x % w) + w) % w;
    setTransform();
  });
  track.addEventListener("pointerup", () => isDown = false);
  track.addEventListener("pointercancel", () => isDown = false);

  function tick(){
    if (!reduceMotion && !isDown && !isHover){
      x += speed;
      if (w > 0 && x >= w) x -= w;
      setTransform();
    }
    requestAnimationFrame(tick);
  }
  recalc(); tick();
})();
