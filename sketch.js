/* Memory Walk · York Through Time
   Vanilla JS viewer • 1 km = 1 year
   Data source: assets/progress.json (edit totalKm to update)
*/
const START_YEAR = 70;
const TARGET_KM = 1955; // 70 → 2025 inclusive

// Milestones: concise; add or edit freely.
const MILESTONES = [
  { year: 71,  title: "Eboracum garrison established",
    desc: "The Romans strengthen their northern fortress on the Ouse, making York (Eboracum) a military and administrative centre.",
    icon: "icon-arch", link: "https://en.wikipedia.org/wiki/Eboracum" },
  { year: 306, title: "Constantine proclaimed emperor",
    desc: "After the death of Constantius Chlorus in York, his son Constantine is acclaimed emperor by the troops.",
    icon: "icon-arch", link: "https://en.wikipedia.org/wiki/Constantine_the_Great" },
  { year: 627, title: "First York Minster",
    desc: "King Edwin of Northumbria is baptised in a wooden church at York—seen as the origin of York Minster.",
    icon: "icon-minster", link: "https://en.wikipedia.org/wiki/York_Minster" },
  { year: 866, title: "Viking capture of York",
    desc: "The Great Heathen Army takes the city; Jórvík becomes a thriving trading hub.",
    icon: "icon-ship", link: "https://en.wikipedia.org/wiki/J%C3%B3rvik" },
  { year: 1068, title: "York Castle built",
    desc: "William I builds a motte-and-bailey at Clifford’s Tower site to secure the north.",
    icon: "icon-castle", link: "https://en.wikipedia.org/wiki/Clifford%27s_Tower" },
  { year: 1190, title: "Clifford’s Tower tragedy",
    desc: "Members of York’s Jewish community die during anti‑Jewish violence at the castle.",
    icon: "icon-castle", link: "https://en.wikipedia.org/wiki/York_pogrom" },
  { year: 1644, title: "Siege of York / Marston Moor",
    desc: "A pivotal Civil War moment: the fall of York follows the Parliamentarian victory nearby.",
    icon: "icon-rose", link: "https://en.wikipedia.org/wiki/Siege_of_York" },
  { year: 1839, title: "Railway age arrives",
    desc: "York emerges as a key railway hub, shaping the city’s modern growth.",
    icon: "icon-gear", link: "https://en.wikipedia.org/wiki/History_of_York#Railways" },
  { year: 1862, title: "Rowntree founded",
    desc: "The chocolate maker begins in York, later creating iconic brands and model housing for workers.",
    icon: "icon-gear", link: "https://en.wikipedia.org/wiki/Rowntree%27s" },
  { year: 1963, title: "University of York founded",
    desc: "A new university campus opens, bringing fresh research and culture to the city.",
    icon: "icon-skyline", link: "https://en.wikipedia.org/wiki/University_of_York" },
  { year: 1984, title: "York Minster fire",
    desc: "Lightning strikes the south transept; a huge restoration effort follows.",
    icon: "icon-minster", link: "https://en.wikipedia.org/wiki/1984_fire_at_York_Minster" },
  { year: 2014, title: "Tour de France in York",
    desc: "The Grand Départ brings global attention as riders sweep through the city.",
    icon: "icon-skyline", link: "https://en.wikipedia.org/wiki/2014_Tour_de_France" }
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const yearToPercent = (year) => clamp((year - START_YEAR) / TARGET_KM, 0, 1);

function pickMilestone(currentYear){
  let chosen = MILESTONES[0];
  for(const m of MILESTONES){
    if(m.year <= currentYear && (!chosen || m.year >= chosen.year)) chosen = m;
  }
  return chosen || MILESTONES[0];
}

function renderStatus(totalKm){
  const currentYear = START_YEAR + totalKm;
  document.getElementById('progressText').textContent = `${totalKm} / ${TARGET_KM} km`;
  const yLabel = currentYear <= 0 ? `${Math.abs(currentYear)} BCE` : `${currentYear} CE`;
  document.getElementById('currentYear').textContent = yLabel;
}

function renderEras(container){
  container.innerHTML = '';
  const anchors = [
    { label: "70 AD", year: 70, icon: "icon-arch" },
    { label: "866", year: 866, icon: "icon-ship" },
    { label: "1914", year: 1914, icon: "icon-rose" },
    { label: "2025", year: 2025, icon: "icon-skyline" }
  ];
  for(const a of anchors){
    const p = yearToPercent(a.year);
    const el = document.createElement('div');
    el.className = 'era-mark';
    el.style.left = (p * 100) + '%';
    el.innerHTML = `
      <svg class="ico"><use href="#${a.icon}"></use></svg>
      <div class="label">${a.label}</div>
      <div class="year">${a.year}</div>
    `;
    container.appendChild(el);
  }
}

function moveMarker(marker, totalKm){
  const currentYear = START_YEAR + totalKm;
  const p = yearToPercent(currentYear);
  marker.style.left = (p * 100) + '%';
}

function renderMilestoneCard(totalKm){
  const currentYear = START_YEAR + totalKm;
  const m = pickMilestone(currentYear);
  document.getElementById('mTitle').textContent = m.title;
  document.getElementById('mYear').textContent = m.year;
  document.getElementById('mDesc').textContent = m.desc;
  document.getElementById('mLink').href = m.link;
  document.querySelector('.card-icon use').setAttribute('href', `#${m.icon}`);
}

async function init(){
  let totalKm = 0;
  try{
    const res = await fetch('assets/progress.json', { cache: 'no-store' });
    const data = await res.json();
    totalKm = clamp(Number(data.totalKm)||0, 0, TARGET_KM);
  }catch(err){
    console.warn('Could not load progress.json; defaulting to 0 km', err);
    totalKm = 0;
  }
  renderStatus(totalKm);
  renderMilestoneCard(totalKm);
  renderEras(document.getElementById('eraMarks'));
  moveMarker(document.getElementById('progressMarker'), totalKm);
  window.addEventListener('resize', () => renderEras(document.getElementById('eraMarks')));
}
init();