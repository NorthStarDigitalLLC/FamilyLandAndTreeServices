// Guided Explore Nav v2 — global navigation, share, footer year
// (Copy the first script block from FooterCodeInjection.xml here)
// I'll provide a condensed version; you may need to paste the full original.

(function(){
  const INIT_KEY = "__GEN_NAV_V2_INIT__";
  function oncePerPage() {
    const stamp = location.pathname + "|" + location.search;
    if (!window[INIT_KEY]) window[INIT_KEY] = { stamp: null };
    if (window[INIT_KEY].stamp === stamp) return false;
    window[INIT_KEY].stamp = stamp;
    return true;
  }

  function ready(fn){
    if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(fn, 0);
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function escapeHtml(str){
    return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }

  function init(){
    const root   = document.getElementById("genRoot");
    const pill   = document.getElementById("genPill");
    const panel  = document.getElementById("genPanel");
    const close  = document.getElementById("genClose");
    const list   = document.getElementById("genList");
    const search = document.getElementById("genSearch");
    const topBtn = document.getElementById("genTop");
    const coach  = document.getElementById("genCoach");
    const dock   = document.getElementById("genDock");

    if (!root || !pill || !panel || !close || !list || !search || !topBtn || !coach || !dock) return;

    root.hidden = false;
    dock.hidden = false;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SECTIONS = [
      { id: "gen-home",     label: "Home",     sub: "Top of page" },
      { id: "gen-delivery", label: "Delivery", sub: "Pickup & delivery options" },
      { id: "gen-menu",     label: "Menu",     sub: "Browse the plates" },
      { id: "gen-order",    label: "Order",    sub: "Call and place an order" },
      { id: "gen-about",    label: "About",    sub: "Our story + vibe" },
      { id: "gen-location", label: "Location", sub: "Hours + map" },
    ];

    const found = SECTIONS.map(s => ({...s, el: document.getElementById(s.id)})).filter(s => !!s.el);

    if (found.length === 0) {
      pill.querySelector(".gen-pill-tx").textContent = "Menu";
      pill.querySelector(".gen-pill-ic").textContent = "🍽️";
      pill.addEventListener("click", () => { window.location.href = "menu.html"; });
      panel.style.display = "none";
      coach.hidden = true;
      return;
    }

    function makeItem(section, idx){
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gen-item";
      btn.setAttribute("data-idx", String(idx));
      btn.setAttribute("role","listitem");
      btn.innerHTML = `
        <span class="gen-item-left">
          <div class="gen-item-title">${escapeHtml(section.label)}</div>
          <div class="gen-item-sub">${escapeHtml(section.sub || "")}</div>
        </span>
        <span class="gen-item-right" aria-hidden="true">
          <span class="gen-badge">Jump</span>
          <span class="gen-jump">↵</span>
        </span>
      `;
      btn.addEventListener("click", () => jumpTo(idx));
      return btn;
    }

    function renderList(filterText = ""){
      list.innerHTML = "";
      const q = (filterText || "").trim().toLowerCase();
      let count = 0;
      found.forEach((s, idx) => {
        const hay = (s.label + " " + (s.sub || "")).toLowerCase();
        if (q && !hay.includes(q)) return;
        list.appendChild(makeItem(s, idx));
        count++;
      });
      if (count === 0) {
        const empty = document.createElement("div");
        empty.style.padding = "14px"; empty.style.color = "rgba(255,255,255,0.72)"; empty.style.fontSize = "13px";
        empty.textContent = "No matches. Try a different word.";
        list.appendChild(empty);
      }
    }
    renderList("");

    function openPanel(){ panel.classList.add("is-open"); panel.setAttribute("aria-hidden","false"); pill.setAttribute("aria-expanded","true"); setTimeout(() => search.focus(), 60); }
    function closePanel(){ panel.classList.remove("is-open"); panel.setAttribute("aria-hidden","true"); pill.setAttribute("aria-expanded","false"); }
    function togglePanel(){ panel.classList.contains("is-open") ? closePanel() : openPanel(); }
    pill.onclick = togglePanel;
    close.onclick = closePanel;

    document.addEventListener("pointerdown", (e) => {
      if (!panel.classList.contains("is-open")) return;
      if (panel.contains(e.target) || pill.contains(e.target)) return;
      closePanel();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (panel.classList.contains("is-open")) closePanel();
    });

    search.addEventListener("input", (e) => renderList(e.target.value || ""));

    function jumpTo(idx){
      const s = found[idx];
      if (!s || !s.el) return;
      closePanel();
      if (s.id === "gen-home") { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); return; }
      s.el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    topBtn.addEventListener("click", () => { closePanel(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

    let activeIdx = 0;
    function setActive(idx){
      activeIdx = idx;
      const items = list.querySelectorAll(".gen-item");
      items.forEach(i => i.classList.remove("is-active"));
      const activeEl = [...items].find(b => b.getAttribute("data-idx") === String(idx));
      if (activeEl) activeEl.classList.add("is-active");
      const dot = pill.querySelector(".gen-pill-dot");
      if (dot){ dot.style.filter = "brightness(1.25)"; setTimeout(() => { dot.style.filter = "none"; }, 180); }
    }

    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter(en => en.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const id = visible[0].target.id;
      const idx = found.findIndex(s => s.id === id);
      if (idx !== -1 && idx !== activeIdx) setActive(idx);
    }, { threshold: 0.35 });
    found.forEach(s => io.observe(s.el));
    setActive(0);

    // Scroll coach
    const COACH_KEY = "genCoachDismissedV2";
    function getCoachDismissed(){ try { return localStorage.getItem(COACH_KEY) === "1"; } catch(e){ return false; } }
    function setCoachDismissed(){ try { localStorage.setItem(COACH_KEY, "1"); } catch(e){} }
    function updateCoach(){
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (getCoachDismissed()) { coach.hidden = true; return; }
      coach.hidden = y > 40;
    }
    coach.addEventListener("click", () => {
      setCoachDismissed();
      coach.hidden = true;
      const homeIdx = found.findIndex(s => s.id === "gen-home");
      const targetIdx = (homeIdx === 0 && found[1]) ? 1 : 0;
      const target = found[targetIdx]?.el;
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      else window.scrollBy({ top: 420, behavior: reduceMotion ? "auto" : "smooth" });
    });
    window.addEventListener("scroll", () => {
      updateCoach();
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 120 && !getCoachDismissed()) { setCoachDismissed(); coach.hidden = true; }
    }, { passive: true });
    updateCoach();

    function updatePill(){
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      pill.style.opacity = (y > 20) ? "1" : "0.985";
    }
    window.addEventListener("scroll", updatePill, { passive: true });
    updatePill();

    // Footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

    // Share button
    const shareBtn = document.getElementById("genSideShare");
    if (shareBtn) {
      shareBtn.addEventListener("click", async function () {
        const shareData = { title: document.title || 'Check this out', text: 'Take a look at this page', url: window.location.href };
        try {
          if (navigator.share) { await navigator.share(shareData); return; }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(window.location.href);
            shareBtn.classList.add('copied');
            const label = shareBtn.querySelector('.gen-side-tx');
            if (label) {
              const oldText = label.textContent;
              label.textContent = 'Copied';
              setTimeout(function () { label.textContent = oldText; shareBtn.classList.remove('copied'); }, 1800);
            }
            return;
          }
          // fallback
          var temp = document.createElement('input');
          temp.value = window.location.href;
          document.body.appendChild(temp);
          temp.select();
          temp.setSelectionRange(0, 99999);
          document.execCommand('copy');
          document.body.removeChild(temp);
          var label2 = shareBtn.querySelector('.gen-side-tx');
          if (label2) {
            var oldText2 = label2.textContent;
            label2.textContent = 'Copied';
            setTimeout(function () { label2.textContent = oldText2; }, 1800);
          }
        } catch (e) { console.log('Share/copy failed', e); }
      });
    }

    // Long press on About link for admin updater (optional)
    const aboutLink = document.getElementById("genAboutLink");
    if (aboutLink) {
      let holdTimer = null;
      let longPressed = false;
      const UPDATER_URL = "fb-menu-editor.html"; // or wherever
      const HOLD_MS = 1000;
      function startHold() {
        longPressed = false;
        holdTimer = setTimeout(() => {
          longPressed = true;
          try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {}
          window.location.href = UPDATER_URL;
        }, HOLD_MS);
      }
      function cancelHold() { if (holdTimer) clearTimeout(holdTimer); holdTimer = null; }
      aboutLink.addEventListener("pointerdown", startHold);
      aboutLink.addEventListener("pointerup", cancelHold);
      aboutLink.addEventListener("pointercancel", cancelHold);
      aboutLink.addEventListener("pointerleave", cancelHold);
      aboutLink.addEventListener("touchstart", startHold, { passive: true });
      aboutLink.addEventListener("touchend", cancelHold);
      aboutLink.addEventListener("touchcancel", cancelHold);
      aboutLink.addEventListener("contextmenu", function (e) { e.preventDefault(); });
      aboutLink.addEventListener("click", function (e) { if (longPressed) { e.preventDefault(); e.stopPropagation(); longPressed = false; } }, true);
    }
  }

  ready(() => {
    if (oncePerPage()) init();
    // Re-init on history change
    const origPush = history.pushState;
    history.pushState = function(){
      origPush.apply(this, arguments);
      setTimeout(() => { if (oncePerPage()) init(); }, 50);
    };
    window.addEventListener("popstate", () => setTimeout(() => { if (oncePerPage()) init(); }, 50));
  });
})();

// Also include the footer year update if not already in above
document.addEventListener("DOMContentLoaded", function() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();
});
