/* Memory Walk · York Through Time (v2)
   Spacious timeline: icons above, years below, journey line
*/
const START_YEAR = 70;
const TARGET_KM = 1955;

// Eras (bands)
const ERAS = [
  { name: "Roman", from: 70, to: 410 },
  { name: "Anglo-Saxon", from: 411, to: 865 },
  { name: "Viking", from: 866, to: 1065 },
  { name: "Norman & Medieval", from: 1066, to: 1485 },
  { name: "Tudor–Stuart", from: 1486, to: 1714 },
  { name: "Georgian & Industrial", from: 1715, to: 1900 },
  { name: "Modern", from: 1901, to: 2025 }
];

// Milestones
const MILESTONES = [
  { year:70,   label:"Challenge not started",           icon:"icon-arch",
    caption:"The team will begin the challenge on Friday 17th of October, 2025.", link:"", image:"assets/photos/70.jpg" },
     { year:71,   label:"Eboracum founded",
    caption:"The Romans established the fortress of Eboracum at the confluence of the Ouse and Foss—foundations of today’s York.", link:"", image:"assets/photos/71.jpg" },
  { year:208,  label:"Death of Septimius Severus", icon:"icon-laurel",
    caption:"Roman emperor Septimius Severus died in York while campaigning in Britain, briefly making the city an imperial power base.", link:"", image:"assets/photos/208.jpg" },
  { year:306,  label:"Constantine proclaimed",     icon:"icon-crown",
    caption:"In Eboracum, Constantine was hailed emperor by his father’s troops—an event that helped set Rome (and later Europe) on a path toward Christianisation.", link:"", image:"assets/photos/306.jpg" },
  { year:627,  label:"First York Minster",         icon:"icon-minster",
    caption:"King Edwin’s baptism led to a first wooden church on this site, beginning 1,300+ years of worship in York.", link:"", image:"assets/photos/627.jpg" },
  { year:866,  label:"Viking Invasion",            icon:"icon-ship",
    caption:"The Great Heathen Army captured York and renamed it Jórvík, turning it into a bustling Viking trading hub.", link:"", image:"assets/photos/866.jpg" },
  { year:1068, label:"York Castle built",          icon:"icon-castle",
    caption:"William the Conqueror raised a motte-and-bailey at York—precursor to Clifford’s Tower—to secure Norman control.", link:"", image:"assets/photos/1068.jpg" },
  { year:1212, label:"Minster fire",               icon:"icon-flame",
    caption:"A medieval blaze damaged parts of the Minster and city, prompting phases of rebuilding in stone.", link:"", image:"assets/1212.png" },
  { year:1349, label:"Black Death",                icon:"icon-skull",
    caption:"The plague hit York hard, reshaping population, labour and guild life across the city. Learn more:", link:"", image:"assets/photos/1349.jpg" },
  { year:1485, label:"Wars of the Roses end",      icon:"icon-rose",
    caption:"Bosworth brought Tudor rule; York’s close ties to Richard III ended and civic fortunes shifted under new royal policy.", link:"", image:"assets/photos/1485.jpg" },
  { year:1644, label:"Siege of York",              icon:"icon-shield",
    caption:"After the Parliamentarian victory at nearby Marston Moor, York surrendered—turning the tide in the North.", link:"", image:"assets/photos/1644.jpg" },
  { year:1839, label:"Railway station opens",      icon:"icon-train",
    caption:"York’s first station opened, propelling the city into the railway age and new industries.", link:"", image:"assets/photos/1839.jpg" },
  { year:1932, label:"Chocolate Orange launched",  icon:"icon-choc",
    caption:"Terry’s created the Chocolate Orange in York—a local invention that became a national favourite.", link:"", image:"assets/photos/1932.jpg" },
  { year:1984, label:"JORVIK Centre opens",        icon:"icon-ship",
    caption:"JORVIK brought Coppergate’s archaeology to life and re-imagined museum storytelling.", link:"", image:"assets/photos/1984.jpg" },
  { year:2001, label:"Fairtrade City",             icon:"icon-handshake",
    caption:"York’s fair-trade movement gathered pace; the city would go on to achieve official Fairtrade City status in 2004.", link:"", image:"assets/photos/2001.jpg" },
  { year:2025, label:"Challenge complete!",        icon:"icon-stars",
    caption:"We've made it to the present day—time traveller status unlocked!", link:"", image:"assets/photos/2025.jpg" }
];

// Helpers
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const yearToPercent = (year) => clamp((year - START_YEAR) / TARGET_KM, 0, 1);
const resolveIcon = (id) => document.getElementById(id) ? id : "icon-arch";

function pickMilestone(currentYear){
  let chosen = MILESTONES[0];
  for (const m of MILESTONES){
    if (m.year <= currentYear && (!chosen || m.year >= chosen.year)) chosen = m;
  }
  return chosen || MILESTONES[0];
}

// ---- Renderers ----
function renderStatus(totalKm){
  const currentYear = START_YEAR + totalKm;
  document.getElementById('progressText').textContent = `${totalKm} / ${TARGET_KM} km`;
  const yLabel = currentYear <= 0 ? `${Math.abs(currentYear)} BCE` : `${currentYear} CE`;
  document.getElementById('currentYear').textContent = yLabel;
}

function renderEraBands(container){
  if (!container) return;
  container.innerHTML = '';
  for (const e of ERAS){
    const left = yearToPercent(e.from) * 100;
    const width = (yearToPercent(e.to) - yearToPercent(e.from)) * 100;
    const el = document.createElement('div');
    el.className = 'era-band';
    el.style.left = `${left}%`;
    el.style.width = `${width}%`;
    el.innerHTML = `<div class="era-name">${e.name}</div>`;
    container.appendChild(el);
  }
}

/* Icons above the rail */
function renderMilestoneMarks(container){
if (!container) return;
  container.innerHTML = '';
  MILESTONES.forEach((m, i) => {
    if (!m.icon) return; // Only show icons for milestones that have them
    const p = yearToPercent(m.year);
    const el = document.createElement('div');
    el.className = 'milestone-mark ' + (i % 2 ? 'row2' : 'row1'); // stagger to reduce overlap
    el.style.left = (p * 100) + '%';
    el.innerHTML = `
      <svg class="ico"><use href="#${resolveIcon(m.icon)}"></use></svg>
      <div class="tick"></div>
    `;
    container.appendChild(el);
  });
}

/* Years below the rail */
const labelYear = (y) => (y <= 0 ? `${Math.abs(y)} BCE` : (y < 100 ? `${y} AD` : `${y}`));

function renderEraStartLabels(container){
  if (!container) return;
  container.innerHTML = '';
  ERAS.forEach(e => {
    const p = yearToPercent(e.from);
    const el = document.createElement('div');
    el.className = 'milestone-label';
    el.style.left = (p * 100) + '%';
    el.textContent = labelYear(e.from);
    container.appendChild(el);
  });
}


/* Journey line from start → current */
function renderJourneyLine(totalKm){
  const p = clamp(totalKm / TARGET_KM, 0, 1);
  const line = document.getElementById('journeyLine');
  if (line) line.style.width = (p * 100) + '%';
}

function moveMarker(marker, totalKm){
  if (!marker) return;
  const currentYear = START_YEAR + totalKm;
  marker.style.left = (yearToPercent(currentYear) * 100) + '%';
}

// ---- State ----
let reachedMilestones = [];
let currentMilestoneIndex = -1;

function renderMilestoneCard(m){
  if (!m) return;

  document.getElementById('mTitle').textContent = m.label;
  document.getElementById('mYear').textContent = m.year;
  document.getElementById('mDesc').textContent = m.caption || '';

  const linkEl = document.getElementById('mLink');
  if (linkEl){
    if (m.link) { linkEl.href = m.link; linkEl.style.display = 'inline-block'; }
    else { linkEl.style.display = 'none'; }
  }

  const img = document.getElementById('mImage');
  const iconUse = document.querySelector('#mIcon use') || document.querySelector('.card-icon use');

  if (img && m.image){
    img.style.display = 'block';
    img.src = m.image;
    if (iconUse) iconUse.parentElement.style.display = 'none';
  } else {
    if (img){ img.style.display = 'none'; img.removeAttribute('src'); }
    if (iconUse){
      iconUse.parentElement.style.display = 'block';
      iconUse.setAttribute('href', `#${resolveIcon(m.icon)}`);
    }
  }

  // Update nav buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = currentMilestoneIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentMilestoneIndex >= reachedMilestones.length - 1;
}

// ---- Init ----
async function init(){
  let totalKm = 0;
  try{
    const res = await fetch('assets/progress.json', { cache: 'no-store' });
    const data = await res.json();
    totalKm = clamp(Number(data.totalKm)||0, 0, TARGET_KM);
  }catch(e){
    totalKm = 0;
    console.warn('Could not. I have restored the original `sketch.js` file. Now I will clean up the temporary verification files.load progress.json; using 0 km');
  }

  const currentYear = START_YEAR + totalKm;
  reachedMilestones = MILESTONES.filter(m => m.year <= currentYear);
  currentMilestoneIndex = reachedMilestones.length - 1;

  renderStatus(totalKm);
  renderEraBands(document.getElementById('eraBands'));
  renderMilestoneMarks(document.getElementById('milestoneMarks'));
  renderEraStartLabels(document.getElementById('milestoneLabels'));

  renderMilestoneCard(reachedMilestones[currentMilestoneIndex]);
  renderJourneyLine(totalKm);
  moveMarker(document.getElementById('progressMarker'), totalKm);

  // Nav events
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentMilestoneIndex > 0){
      currentMilestoneIndex--;
      renderMilestoneCard(reachedMilestones[currentMilestoneIndex]);
    }
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentMilestoneIndex < reachedMilestones.length - 1){
      currentMilestoneIndex++;
      renderMilestoneCard(reachedMilestones[currentMilestoneIndex]);
    }
  });

  window.addEventListener('resize', () => {
    renderEraBands(document.getElementById('eraBands'));
    renderMilestoneMarks(document.getElementById('milestoneMarks'));
    renderEraStartLabels(document.getElementById('milestoneLabels'));
  });
}
init();

// --- Parallax background hotspot ---
(function parallaxBG(){
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return; // respect accessibility

  let gx = '20%', gy = '18%', raf = 0;
  const paint = () => {
    root.style.setProperty('--gx', gx);
    root.style.setProperty('--gy', gy);
    raf = 0;
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };

  window.addEventListener('pointermove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    gx = (x * 100).toFixed(1) + '%';
    gy = (y * 100).toFixed(1) + '%';
    schedule();
  }, { passive: true });

  // Sensible default on first paint
  schedule();
})();

