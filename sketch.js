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

// Milestones (images set to assets/photos/<year>.jpg). Only milestones with an `icon` will show an icon on the timeline.
const MILESTONES = [
  // keep the initial challenge marker
  { year:70,   label:"Challenge kickoff!",           icon:"icon-arch",
    caption:"The team will begin the challenge on Friday 17th of October, 2025.", link:"", image:"assets/photos/70.jpg" },

  // Roman era
  { year:71, label:"Eboracum founded",
    caption:"The Romans established the fortress of Eboracum at the meeting of the Ouse and Foss—York’s first foundations.", link:"https://en.wikipedia.org/wiki/Eboracum", image:"assets/photos/71.jpg" },
  { year:208, label:"Death of Septimius Severus", icon:"icon-laurel",
    caption:"Emperor Septimius Severus died in York in 208 while on campaign—briefly putting the city at the heart of imperial attention.", link:"https://en.wikipedia.org/wiki/Septimius_Severus", image:"assets/photos/208.jpg" },
  { year:306, label:"Constantine proclaimed emperor", icon:"icon-crown",
    caption:"In 306 Constantine was acclaimed emperor in Eboracum — a moment that would shape Christianity and Europe for centuries.", link:"https://en.wikipedia.org/wiki/Constantine_the_Great", image:"assets/photos/306.jpg" },
  { year:410, label:"End of Roman rule in Britain",
    caption:"As Roman authority receded, the garrison at Eboracum would give way to new local powers and the seeds of medieval York.", link:"https://en.wikipedia.org/wiki/Roman_withdrawal_from_Britain", image:"assets/photos/410.jpg" },

  // Anglo‑Saxon era
  { year:627, label:"King Edwin baptised — first Minster site", icon:"icon-minster",
    caption:"King Edwin’s conversion led to a wooden church on the Minster site, starting over a millennium of Christian worship in York.", link:"https://en.wikipedia.org/wiki/Edwin_of_Northumbria", image:"assets/photos/627.jpg" },
  { year:789, label:"York an important Anglo-Saxon centre",
    caption:"Through the 8th–9th centuries York grew as a regional centre for religion, trade and administration.", link:"https://en.wikipedia.org/wiki/History_of_York", image:"assets/photos/789.jpg" },

  // Viking era
  { year:866, label:"Vikings take the city — Jórvík", icon:"icon-ship",
    caption:"The Great Heathen Army captured York and turned it into Jórvík, a thriving Viking trading and craft hub.", link:"https://en.wikipedia.org/wiki/Jorvik", image:"assets/photos/866.jpg" },
  { year:954, label:"English kings re‑assert control",
    caption:"By the mid-10th century kings such as Eadred restored English rule and York rejoined the Anglo‑Saxon kingdom.", link:"https://en.wikipedia.org/wiki/Eadred", image:"assets/photos/954.jpg" },
  { year:1002, label:"St Brice's Day massacre",
    caption:"A royal order in 1002 led to violence against Danes across the north, a dark episode remembered in York’s Viking-era story.", link:"https://en.wikipedia.org/wiki/St_Brice%27s_Day_massacre", image:"assets/photos/1002.jpg" },

  // Norman & Medieval
  { year:1066, label:"Norman Conquest reaches the north",
    caption:"William’s victory in 1066 set the stage for sweeping change across England — York would soon be reshaped to secure Norman power.", link:"https://en.wikipedia.org/wiki/Norman_conquest_of_England", image:"assets/photos/1066.jpg" },
  { year:1068, label:"York Castle established", icon:"icon-castle",
    caption:"The Normans built a motte-and-bailey where Clifford’s Tower stands today to control the north and the city.", link:"https://en.wikipedia.org/wiki/Clifford%27s_Tower", image:"assets/photos/1068.jpg" },
  { year:1086, label:"Domesday records York",
    caption:"The Domesday Book notes York’s wealth and households — a snapshot of the city soon after the Conquest.", link:"https://en.wikipedia.org/wiki/Domesday_Book", image:"assets/photos/1086.jpg" },
  { year:1190, label:"Massacre of York’s Jewish community",
    caption:"In a tragic episode, anti-Jewish violence in 1190 saw many lives lost; it’s a solemn part of the city’s medieval history.", link:"https://en.wikipedia.org/wiki/Massacre_of_Jews_in_England", image:"assets/photos/1190.jpg" },
  { year:1212, label:"York Minster fire", icon:"icon-flame",
    caption:"A major medieval blaze damaged the Minster and parts of the city, prompting long phases of rebuilding in stone.", link:"https://en.wikipedia.org/wiki/York_Minster", image:"assets/photos/1212.jpg" },
  { year:1220, label:"Gothic rebuilding of the Minster begins",
    caption:"From the early 13th century the Minster was rebuilt in Gothic style — the building we recognise today grew over centuries.", link:"https://en.wikipedia.org/wiki/York_Minster", image:"assets/photos/1220.jpg" },
  { year:1349, label:"Black Death reaches York", icon:"icon-skull",
    caption:"The plague swept through the city in 1349, dramatically altering population and civic life.", link:"https://en.wikipedia.org/wiki/Black_Death", image:"assets/photos/1349.jpg" },
  { year:1357, label:"Merchant Adventurers' Hall established",
    caption:"The Hall became the meeting place for York’s leading traders and remains one of the best‑preserved medieval guild halls.", link:"https://en.wikipedia.org/wiki/Merchant_Adventurers%27_Hall", image:"assets/photos/1357.jpg" },

  // Tudor–Stuart
  { year:1485, label:"Wars of the Roses end", icon:"icon-rose",
    caption:"Bosworth brought the Plantagenet conflicts to an end; York’s political fortunes shifted under Tudor rule.", link:"https://en.wikipedia.org/wiki/Battle_of_Bosworth_Field", image:"assets/photos/1485.jpg" },
  { year:1536, label:"Pilgrimage of Grace",
    caption:"Yorkshire rose in protest against Henry VIII’s religious reforms — the Pilgrimage of Grace had its heart in the north.", link:"https://en.wikipedia.org/wiki/Pilgrimage_of_Grace", image:"assets/photos/1536.jpg" },
  { year:1644, label:"Battle of Marston Moor & Siege of York", icon:"icon-shield",
    caption:"In 1644 Parliamentarian forces defeated the Royalists at Marston Moor; York’s siege that year marked a turning point in the Civil War in the north.", link:"https://en.wikipedia.org/wiki/Battle_of_Marston_Moor", image:"assets/photos/1644.jpg" },

  // Georgian & Industrial
  { year:1767, label:"Terry’s founded in York",
    caption:"Joseph Terry began the confectionery business that would grow into one of York’s best-known companies.", link:"https://en.wikipedia.org/wiki/Terry%27s", image:"assets/photos/1767.jpg" },
  { year:1830, label:"Yorkshire Museum opens",
    caption:"The Yorkshire Museum (opened by the Yorkshire Philosophical Society) began sharing the city’s archaeology and natural history with the public.", link:"https://en.wikipedia.org/wiki/Yorkshire_Museum", image:"assets/photos/1830.jpg" },
  { year:1839, label:"Railway station opens", icon:"icon-train",
    caption:"York’s station connected the city to the new railway age, helping to drive industry, travel and growth.", link:"https://en.wikipedia.org/wiki/York_railway_station", image:"assets/photos/1839.jpg" },
  { year:1862, label:"Rowntree’s established",
    caption:"Rowntree’s began producing chocolate and cocoa in York, joining Terry’s to create a famous local confectionery tradition.", link:"https://en.wikipedia.org/wiki/Rowntree%27s", image:"assets/photos/1862.jpg" },

  // Late 19th / 20th century → Modern
  { year:1932, label:"Chocolate Orange launched", icon:"icon-choc",
    caption:"Terry’s introduced the Chocolate Orange in 1932 — a York invention that became a national favourite.", link:"https://en.wikipedia.org/wiki/Terry%27s", image:"assets/photos/1932.jpg" },
  { year:1942, label:"Baedeker raids — wartime damage",
    caption:"During the Second World War York suffered bombing in the Baedeker raids, with damage to parts of the historic centre.", link:"https://en.wikipedia.org/wiki/Baedeker_blitz", image:"assets/photos/1942.jpg" },
  { year:1974, label:"Local government reorganisation",
    caption:"A nationwide reorganisation changed administrative boundaries and the shape of local government affecting York.", link:"https://en.wikipedia.org/wiki/Local_Government_Act_1972", image:"assets/photos/1974.jpg" },
  { year:1975, label:"National Railway Museum opens in York",
    caption:"The NRM made York a major destination for railway heritage and transport history enthusiasts.", link:"https://en.wikipedia.org/wiki/National_Railway_Museum", image:"assets/photos/1975.jpg" },
  { year:1984, label:"JORVIK Viking Centre opens",
    caption:"JORVIK transformed how archaeology is presented, recreating Viking York and bringing Coppergate finds to life.", link:"https://en.wikipedia.org/wiki/Jorvik_Viking_Centre", image:"assets/photos/1984.jpg" },
  { year:2001, label:"Fairtrade movement strengthens locally",
    caption:"York’s community embraced fair trade initiatives that would lead to formal city-wide recognition.", link:"https://en.wikipedia.org/wiki/Fair_trade_city", image:"assets/photos/2001.jpg" },
  { year:2004, label:"York becomes a Fairtrade City",
    caption:"Official Fairtrade City status celebrated local and civic commitment to ethical trade.", link:"https://en.wikipedia.org/wiki/Fair_trade_city", image:"assets/photos/2004.jpg" },

  // Present
  { year:2025, label:"Challenge complete!", icon:"icon-stars",
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
    console.warn('Could not load progress.json; using 0 km');
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
  const prevEl = document.getElementById('prevBtn');
  const nextEl = document.getElementById('nextBtn');
  if (prevEl) prevEl.addEventListener('click', () => {
    if (currentMilestoneIndex > 0){
      currentMilestoneIndex--;
      renderMilestoneCard(reachedMilestones[currentMilestoneIndex]);
    }
  });
  if (nextEl) nextEl.addEventListener('click', () => {
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
