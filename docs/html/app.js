/* =========================================================
   DAIRLY — App runtime
   ========================================================= */

/* -----------------------------
   Inline SVG icon library
   ----------------------------- */
const I = {
  bell: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16V11a6 6 0 10-12 0v5l-2 3h16l-2-3z"/><path d="M10 21a2 2 0 004 0"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  bottle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4v3l2 4v10a2 2 0 01-2 2H10a2 2 0 01-2-2V9l2-4V2z"/><path d="M9 11h6"/></svg>`,
  home: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2z"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4"/><path d="M16 14h5v-4h-5a2 2 0 000 4z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  chevR: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  chevL: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  play: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18l-7 10v6l-4-2v-4z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.3 1.82l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.65 1.65 0 00-1.82-.3 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.65 1.65 0 00.3-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.3-1.82l-.1-.1a2 2 0 112.8-2.8l.1.1a1.65 1.65 0 001.82.3h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.65 1.65 0 00-.3 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>`,
  down: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>`,
  pkg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8L12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v10"/></svg>`,
  coin: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 7v10M15 9l-3-2-3 2"/></svg>`,
  wave: `<svg viewBox="0 0 80 40" width="80" height="40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2 28 Q 14 8 26 20 T 50 18 T 78 12"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0116 11"/></svg>`,
  build: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01"/></svg>`,
  map: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6l7-2 8 2 7-2v16l-7 2-8-2-7 2z"/><path d="M8 4v16M16 6v16"/></svg>`,
  location: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-9 8-14a8 8 0 10-16 0c0 5 8 14 8 14z"/><circle cx="12" cy="8" r="2.5"/></svg>`,
  signal: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M2 18h2v4H2zM7 14h2v8H7zM12 9h2v13h-2zM17 4h2v18h-2z"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01"/></svg>`,
  battery: `<svg viewBox="0 0 28 14" width="22" height="11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="22" height="12" rx="3"/><rect x="3" y="3" width="16" height="8" rx="1.5" fill="currentColor"/><path d="M25 5v4" stroke-width="2"/></svg>`,
};

/* Status bar */
const statusBar = `
<div class="status-bar">
  <span>9:41</span>
  <span class="status-right">
    ${I.signal}${I.wifi}${I.battery}
  </span>
</div>
`;

/* =========================================================
   CUSTOMER APP
   ========================================================= */
function customerApp() {
  return `
  <div class="phone">
    <span class="screen-label">Customer App</span>
    <div class="phone-screen">
      ${statusBar}
      <div class="screens" data-app="customer">
        ${custScreen_Onboarding()}
        ${custScreen_Home()}
        ${custScreen_Plans()}
        ${custScreen_Calendar()}
        ${custScreen_Wallet()}
        ${custScreen_History()}
        ${custScreen_Profile()}
      </div>
      <nav class="bottom-nav" data-app-nav="customer">
        ${navItem('home','Home',I.home, true)}
        ${navItem('plans','Plans',I.pkg)}
        ${navFab('cal', I.plus)}
        ${navItem('wallet','Wallet',I.wallet)}
        ${navItem('profile','Profile',I.user)}
      </nav>
    </div>
  </div>`;
}

function navItem(target, label, icon, active=false) {
  return `<button class="nav-item ${active?'active':''}" data-target="${target}">${icon}<span>${label}</span></button>`;
}
function navFab(target, icon) {
  return `<button class="nav-item" data-target="${target}"><span class="nav-fab">${icon}</span></button>`;
}

/* ---------- Onboarding ---------- */
function custScreen_Onboarding() {
  return `
  <section class="screen" data-screen="onboarding">
    <div class="onboarding">
      <div class="row between">
        <span class="chip">1 / 3</span>
        <button class="btn btn-sm btn-ghost" data-target="home">Skip</button>
      </div>
      <div class="illo">
        <svg viewBox="0 0 220 220" width="220" height="220" fill="none">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#2563EB"/>
              <stop offset="1" stop-color="#60A5FA"/>
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r="100" fill="#fff" opacity=".6"/>
          <circle cx="110" cy="110" r="70" fill="url(#g1)" opacity=".15"/>
          <g transform="translate(60 40)">
            <path d="M30 0h40v14l8 16c4 8 4 14 4 22v50a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V52c0-8 0-14 4-22l8-16V0z" fill="#fff" stroke="#2563EB" stroke-width="3"/>
            <path d="M22 38h56" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="70" r="14" fill="#DBE7FF"/>
            <path d="M50 58v24M38 70h24" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
          </g>
          <circle cx="50" cy="50" r="8" fill="#F5B301"/>
          <circle cx="180" cy="170" r="6" fill="#10B981"/>
          <circle cx="40" cy="180" r="5" fill="#60A5FA"/>
        </svg>
      </div>
      <h1>Fresh milk delivered,<br/>before your alarm rings.</h1>
      <p>Subscribe once, enjoy farm-fresh dairy delivered to your doorstep every morning.</p>
      <div class="dots"><span class="active"></span><span></span><span></span></div>
      <button class="btn btn-primary btn-block" data-target="home">Get Started</button>
    </div>
  </section>`;
}

/* ---------- Home ---------- */
function custScreen_Home() {
  return `
  <section class="screen active" data-screen="home">
    <div class="app-header">
      <div>
        <div class="row gap-2 muted text-xs">${I.location}<span>Whitefield, Bangalore</span></div>
        <div class="title">Hey, Shweta</div>
      </div>
      <div class="row gap-2">
        <button class="icon-btn">${I.bell}<span class="dot"></span></button>
        <div class="avatar">SH</div>
      </div>
    </div>

    <div class="scroll">
      <div class="search mb-3">
        ${I.search}
        <input placeholder="Search milk, paneer, ghee..."/>
        <button class="icon-btn" style="width:32px;height:32px;box-shadow:none">${I.filter}</button>
      </div>

      <div class="hero">
        <span class="eyebrow">Tomorrow · 6:00 AM</span>
        <h2>1 L Farm Fresh Milk</h2>
        <p>Scheduled delivery · Cow Milk · 1 Liter</p>
        <div class="hero-actions">
          <button class="btn btn-sm btn-ghost">${I.pause} Pause</button>
          <button class="btn btn-sm btn-ghost">${I.chevR} Track</button>
        </div>
      </div>

      <div class="section-head">
        <h3>Quick Actions</h3>
      </div>
      <div class="quick-grid">
        <button class="quick" data-target="plans">
          <span class="q-icn" style="background:var(--brand-soft);color:var(--brand-ink)">${I.pkg}</span>
          <span>Subscribe</span>
        </button>
        <button class="quick" data-target="cal">
          <span class="q-icn" style="background:var(--mint-soft);color:#065F46">${I.cal}</span>
          <span>Schedule</span>
        </button>
        <button class="quick" data-target="wallet">
          <span class="q-icn" style="background:var(--sun-soft);color:#92400E">${I.wallet}</span>
          <span>Top Up</span>
        </button>
        <button class="quick" data-target="history">
          <span class="q-icn" style="background:var(--rose-soft);color:#9F1239">${I.clock}</span>
          <span>History</span>
        </button>
      </div>

      <div class="section-head">
        <h3>Your Subscriptions</h3>
        <a href="#" data-target="plans">View all</a>
      </div>

      <div class="card">
        <div class="card-row">
          <div class="thumb">${I.bottle}</div>
          <div class="flex-1">
            <div class="row between">
              <div class="card-title">Daily Cow Milk</div>
              <span class="chip mint"><span class="status-dot mint"></span>Active</span>
            </div>
            <div class="card-sub">1 L · 6:00 AM · ?62 / day</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="row between">
          <div class="row gap-2 text-xs muted">${I.clock}<span>Next delivery tomorrow</span></div>
          <button class="btn btn-sm btn-ghost">Manage</button>
        </div>
      </div>

      <div class="card">
        <div class="card-row">
          <div class="thumb mint">${I.bottle}</div>
          <div class="flex-1">
            <div class="row between">
              <div class="card-title">Organic Curd</div>
              <span class="chip sun"><span class="status-dot sun"></span>Paused</span>
            </div>
            <div class="card-sub">500 g · Alt days · ?45 / unit</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="row between">
          <div class="row gap-2 text-xs muted">${I.pause}<span>Resumes Apr 22</span></div>
          <button class="btn btn-sm btn-ghost">Resume</button>
        </div>
      </div>

      <div class="section-head">
        <h3>Explore</h3>
        <a href="#">See more</a>
      </div>
      <div class="row gap-2" style="overflow-x:auto; padding-bottom:4px;">
        ${exploreTile('Buffalo Milk','?74 / L','sun')}
        ${exploreTile('A2 Milk','?95 / L','brand-soft')}
        ${exploreTile('Paneer','?120 / 200g','mint-soft')}
      </div>
    </div>
  </section>`;
}

function exploreTile(name, price, tone) {
  const bg = tone === 'sun' ? 'var(--sun-soft)' : tone === 'mint-soft' ? 'var(--mint-soft)' : 'var(--brand-soft)';
  const fg = tone === 'sun' ? '#92400E' : tone === 'mint-soft' ? '#065F46' : 'var(--brand-ink)';
  return `
  <div class="card" style="min-width:150px;flex:0 0 auto">
    <div class="thumb" style="background:${bg};color:${fg}">${I.bottle}</div>
    <div class="card-title mt-2">${name}</div>
    <div class="card-sub">${price}</div>
  </div>`;
}

/* ---------- Plans ---------- */
function custScreen_Plans() {
  return `
  <section class="screen" data-screen="plans">
    <div class="app-header">
      <button class="icon-btn" data-target="home">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Subscription Plans</div></div>
      <button class="icon-btn">${I.filter}</button>
    </div>
    <div class="scroll">
      <p class="muted text-sm mt-2">Pick a plan that fits your household. Pause, resume or cancel anytime.</p>

      <div class="row gap-2 mt-3" style="overflow-x:auto;padding-bottom:4px;">
        <span class="chip brand">All</span>
        <span class="chip">Cow Milk</span>
        <span class="chip">Buffalo Milk</span>
        <span class="chip">A2 Organic</span>
        <span class="chip">Curd</span>
      </div>

      <div class="mt-4 stack gap-3">
        ${planCard('Starter','Perfect for singles','499','/mo',['500 ml daily','Weekday schedule','Free delivery'],false)}
        ${planCard('Family Fresh','Most popular for homes','1,199','/mo',['1 L daily','All 7 days','Free delivery','Priority support'],true)}
        ${planCard('Premium A2','Organic cow milk','1,799','/mo',['1 L daily A2','Glass bottle','Farm-direct source','Flexible pause'],false)}
      </div>
    </div>
  </section>`;
}

function planCard(name, sub, price, per, feats, featured) {
  return `
  <div class="plan ${featured?'featured':''}">
    ${featured? '<span class="ribbon">BEST VALUE</span>':''}
    <div class="plan-head">
      <div>
        <div class="plan-name">${name}</div>
        <div class="muted text-xs mt-2" style="font-weight:600">${sub}</div>
      </div>
      <div class="plan-price">?${price}<small>${per}</small></div>
    </div>
    <ul>
      ${feats.map(f=>`<li><span style="color:${featured?'#60A5FA':'var(--mint)'}">${I.check}</span>${f}</li>`).join('')}
    </ul>
    <button class="btn ${featured?'btn-brand':'btn-ghost'} btn-block mt-4">${featured?'Start Plan':'Choose'}</button>
  </div>`;
}

/* ---------- Calendar ---------- */
function custScreen_Calendar() {
  const dows = ['S','M','T','W','T','F','S'];
  // Build a 35-day grid; highlight some as delivered / paused / today
  const cells = [];
  for (let i=0; i<35; i++) {
    const day = i - 2; // offset
    if (day < 1 || day > 30) {
      cells.push(`<div class="cal-day muted">${day < 1 ? day + 31 : day - 30}</div>`);
    } else {
      let cls = '';
      let micro = '';
      if ([2,3,4,5,7,8,9,10,11,12,14,15,16].includes(day)) { cls='delivered'; micro='<span class="micro"></span>'; }
      if ([6,13].includes(day)) { cls='paused'; micro='<span class="micro"></span>'; }
      if (day === 18) cls='today';
      cells.push(`<div class="cal-day ${cls}">${day}${micro}</div>`);
    }
  }
  return `
  <section class="screen" data-screen="cal">
    <div class="app-header">
      <button class="icon-btn" data-target="home">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Delivery Schedule</div></div>
      <button class="icon-btn">${I.settings}</button>
    </div>
    <div class="scroll">
      <div class="card">
        <div class="cal-head">
          <div class="row gap-2">
            <button class="icon-btn" style="width:32px;height:32px;box-shadow:none">${I.chevL}</button>
            <div class="bold">April 2026</div>
            <button class="icon-btn" style="width:32px;height:32px;box-shadow:none">${I.chevR}</button>
          </div>
          <div class="row gap-2">
            <span class="chip mint"><span class="status-dot mint"></span>Delivered</span>
            <span class="chip sun"><span class="status-dot sun"></span>Paused</span>
          </div>
        </div>
        <div class="cal-grid">
          ${dows.map(d=>`<div class="cal-dow">${d}</div>`).join('')}
          ${cells.join('')}
        </div>
      </div>

      <div class="section-head"><h3>Today — Apr 18</h3></div>
      <div class="card">
        <div class="card-row">
          <div class="thumb">${I.truck}</div>
          <div class="flex-1">
            <div class="card-title">Out for delivery</div>
            <div class="card-sub">Rahul · arriving in ~12 mins</div>
          </div>
          <span class="chip brand"><span class="status-dot mint"></span>Live</span>
        </div>
        <div class="divider"></div>
        <div class="row between">
          <div class="row gap-2 text-xs muted">${I.bottle}<span>1 L Cow Milk</span></div>
          <button class="btn btn-sm btn-primary">Track Live</button>
        </div>
      </div>

      <div class="section-head"><h3>Upcoming Changes</h3></div>
      <div class="card">
        <div class="row between">
          <div class="stack">
            <strong>Pause Apr 25 – Apr 27</strong>
            <span class="muted text-xs">Travel break</span>
          </div>
          <button class="btn btn-sm btn-ghost">Edit</button>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- Wallet ---------- */
function custScreen_Wallet() {
  return `
  <section class="screen" data-screen="wallet">
    <div class="app-header">
      <button class="icon-btn" data-target="home">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Wallet</div></div>
      <button class="icon-btn">${I.settings}</button>
    </div>
    <div class="scroll">
      <div class="hero" style="background:linear-gradient(135deg,#0B1220 0%, #1F2A44 100%); box-shadow: 0 20px 30px -14px rgba(11,18,32,.5)">
        <span class="eyebrow">Wallet Balance</span>
        <h2 style="font-size:30px">?1,284.50</h2>
        <p>Auto-debit enabled · Next bill Apr 30</p>
        <div class="hero-actions">
          <button class="btn btn-sm btn-brand">${I.plus} Add Money</button>
          <button class="btn btn-sm btn-ghost">${I.chart} Statement</button>
        </div>
      </div>

      <div class="section-head"><h3>Quick Recharge</h3></div>
      <div class="row gap-2" style="overflow-x:auto">
        ${['?200','?500','?1,000','?2,000'].map(v=>`<button class="card" style="min-width:88px;flex:0 0 auto;text-align:center;font-weight:800">${v}</button>`).join('')}
      </div>

      <div class="section-head"><h3>Recent Transactions</h3><a href="#">See all</a></div>
      ${txnRow('Added money','UPI · HDFC','+ ?500','Apr 16','mint')}
      ${txnRow('Daily milk · 1 L','Sub debit','- ?62','Apr 15','rose')}
      ${txnRow('Daily milk · 1 L','Sub debit','- ?62','Apr 14','rose')}
      ${txnRow('Referral bonus','Promo · FRESH20','+ ?100','Apr 12','mint')}
      ${txnRow('Daily milk · 1 L','Sub debit','- ?62','Apr 11','rose')}
    </div>
  </section>`;
}

function txnRow(title, sub, amt, date, tone) {
  const cls = tone === 'mint' ? 'mint' : 'rose';
  const icn = tone === 'mint' ? I.coin : I.bottle;
  return `
  <div class="list-item">
    <div class="thumb ${cls}" style="width:40px;height:40px;border-radius:12px">${icn}</div>
    <div class="meta">
      <strong>${title}</strong>
      <span>${sub} · ${date}</span>
    </div>
    <div class="bold ${tone==='mint'?'':''}" style="color:${tone==='mint'?'var(--mint)':'var(--ink-900)'}">${amt}</div>
  </div>`;
}

/* ---------- History ---------- */
function custScreen_History() {
  return `
  <section class="screen" data-screen="history">
    <div class="app-header">
      <button class="icon-btn" data-target="home">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Order History</div></div>
      <button class="icon-btn">${I.filter}</button>
    </div>
    <div class="scroll">
      <div class="row gap-2 mt-2" style="overflow-x:auto">
        <span class="chip brand">All</span>
        <span class="chip"><span class="status-dot mint"></span>Delivered</span>
        <span class="chip"><span class="status-dot sun"></span>Paused</span>
        <span class="chip"><span class="status-dot rose"></span>Skipped</span>
      </div>

      <div class="mt-4 muted text-xs bold" style="letter-spacing:.08em">THIS WEEK</div>
      ${histCard('Apr 18','Cow Milk · 1 L','delivered','Delivered by 6:08 AM','?62')}
      ${histCard('Apr 17','Cow Milk · 1 L','delivered','Delivered by 6:02 AM','?62')}
      ${histCard('Apr 16','Cow Milk · 1 L','skipped','Skipped by customer','—')}

      <div class="mt-4 muted text-xs bold">LAST WEEK</div>
      ${histCard('Apr 14','Cow Milk · 1 L','delivered','Delivered by 6:12 AM','?62')}
      ${histCard('Apr 13','Cow Milk + Curd','delivered','Delivered by 6:05 AM','?107')}
    </div>
  </section>`;
}

function histCard(date, title, status, sub, amt) {
  const tone = status==='delivered'?'mint': status==='skipped'?'rose':'sun';
  const label = status==='delivered'?'Delivered': status==='skipped'?'Skipped':'Paused';
  return `
  <div class="card">
    <div class="row between">
      <div class="stack">
        <div class="card-title">${title}</div>
        <div class="card-sub">${date} · ${sub}</div>
      </div>
      <div class="stack" style="align-items:flex-end">
        <span class="chip ${tone}"><span class="status-dot ${tone}"></span>${label}</span>
        <div class="bold mt-2">${amt}</div>
      </div>
    </div>
  </div>`;
}

/* ---------- Profile ---------- */
function custScreen_Profile() {
  return `
  <section class="screen" data-screen="profile">
    <div class="app-header">
      <button class="icon-btn" data-target="home">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Profile</div></div>
      <button class="icon-btn">${I.settings}</button>
    </div>
    <div class="scroll">
      <div class="card" style="background:linear-gradient(135deg, var(--brand-soft), #fff)">
        <div class="row gap-3">
          <div class="avatar" style="width:54px;height:54px;font-size:18px">SH</div>
          <div class="flex-1">
            <div class="card-title">Shweta Kumar</div>
            <div class="card-sub">${'shweta@dzinly.com'}</div>
          </div>
          <button class="btn btn-sm btn-ghost">Edit</button>
        </div>
        <div class="row gap-2 mt-3">
          <span class="chip brand">Premium</span>
          <span class="chip mint">Loyalty · L3</span>
        </div>
      </div>

      <div class="section-head"><h3>Preferences</h3></div>
      ${prefRow('Daily delivery reminder','Get a notification at 5:45 AM', true)}
      ${prefRow('Weekly summary email','Track spend + deliveries', false)}
      ${prefRow('Auto top-up wallet','Adds ?500 when below ?100', true)}

      <div class="section-head"><h3>Account</h3></div>
      ${linkRow('Delivery addresses','2 saved', I.map)}
      ${linkRow('Payment methods','HDFC UPI · +1 more', I.wallet)}
      ${linkRow('Refer & Earn','?100 per friend', I.users)}
      ${linkRow('Help & Support','FAQs, chat, call', I.phone)}
    </div>
  </section>`;
}

function prefRow(title, sub, on) {
  return `
  <div class="list-item">
    <div class="meta">
      <strong>${title}</strong>
      <span>${sub}</span>
    </div>
    <div class="switch ${on?'on':''}"></div>
  </div>`;
}
function linkRow(title, sub, icn) {
  return `
  <div class="list-item">
    <div class="thumb" style="width:40px;height:40px;border-radius:12px">${icn}</div>
    <div class="meta"><strong>${title}</strong><span>${sub}</span></div>
    <span class="muted">${I.chevR}</span>
  </div>`;
}

/* =========================================================
   VENDOR APP
   ========================================================= */
function vendorApp() {
  return `
  <div class="phone">
    <span class="screen-label">Vendor App</span>
    <div class="phone-screen">
      ${statusBar}
      <div class="screens" data-app="vendor">
        ${vendScreen_Dashboard()}
        ${vendScreen_Orders()}
        ${vendScreen_Inventory()}
        ${vendScreen_Earnings()}
        ${vendScreen_Customers()}
      </div>
      <nav class="bottom-nav four" data-app-nav="vendor">
        ${navItem('dash','Dashboard',I.home, true)}
        ${navItem('orders','Orders',I.truck)}
        ${navItem('inv','Inventory',I.pkg)}
        ${navItem('earn','Earnings',I.coin)}
      </nav>
    </div>
  </div>`;
}

/* ---------- Vendor Dashboard ---------- */
function vendScreen_Dashboard() {
  return `
  <section class="screen active" data-screen="dash">
    <div class="app-header">
      <div>
        <div class="muted text-xs">Good morning</div>
        <div class="title">Rahul's Dairy</div>
      </div>
      <div class="row gap-2">
        <button class="icon-btn">${I.bell}<span class="dot"></span></button>
        <div class="avatar" style="background:linear-gradient(135deg,#10B981,#60A5FA)">RA</div>
      </div>
    </div>
    <div class="scroll">

      <div class="hero" style="background:linear-gradient(135deg,#10B981,#34D399)">
        <span class="eyebrow">Today · Apr 18</span>
        <h2>42 Deliveries</h2>
        <p>28 completed · 14 pending · Route 4 active</p>
        <div class="hero-actions">
          <button class="btn btn-sm btn-ghost">${I.map} Open Route</button>
          <button class="btn btn-sm btn-ghost">${I.check} Start Day</button>
        </div>
      </div>

      <div class="stats-grid mt-4">
        ${statCard('Today Earnings','?3,480','up','+12%')}
        ${statCard('Active Subs','186','up','+4')}
        ${statCard('Pending','14','down','-3')}
        ${statCard('Rating','4.8','up','+0.1')}
      </div>

      <div class="section-head"><h3>Route Progress</h3><a href="#" data-target="orders">View all</a></div>
      <div class="card">
        <div class="row between">
          <strong>Route 4 · Whitefield</strong>
          <span class="chip mint"><span class="status-dot mint"></span>On time</span>
        </div>
        <div class="muted text-xs mt-2">28 of 42 stops complete</div>
        <div style="height:8px; background:var(--milk-200); border-radius:999px; margin-top:8px; overflow:hidden">
          <div style="height:100%; width:66%; background:linear-gradient(90deg,var(--mint),#34D399)"></div>
        </div>
      </div>

      <div class="section-head"><h3>Next Stops</h3></div>
      ${stopRow('Shweta K.','12A, Palm Meadows','1L Cow Milk','6 min')}
      ${stopRow('Aditya R.','24, Prestige Lakeside','2L Buffalo','9 min')}
      ${stopRow('Priya S.','B-202, Brigade','1L A2 Organic','14 min')}

    </div>
  </section>`;
}

function statCard(label, value, tr, trv) {
  const tcls = tr === 'up' ? 'up' : 'down';
  const ticn = tr === 'up' ? I.trend : I.down;
  return `
  <div class="stat">
    <div class="stat-label">${label}</div>
    <div class="stat-value">${value}</div>
    <div class="trend ${tcls}">${ticn} ${trv}</div>
    <svg class="stat-spark" viewBox="0 0 80 40" width="80" height="40" fill="none" stroke="${tr==='up'?'#10B981':'#F43F5E'}" stroke-width="2" stroke-linecap="round"><path d="M2 28 Q 14 8 26 20 T 50 18 T 78 12"/></svg>
  </div>`;
}
function stopRow(name, addr, item, eta) {
  return `
  <div class="list-item">
    <div class="thumb mint">${I.location}</div>
    <div class="meta">
      <strong>${name}</strong>
      <span>${addr} · ${item}</span>
    </div>
    <div class="stack" style="align-items:flex-end">
      <div class="bold text-sm">${eta}</div>
      <button class="btn btn-sm btn-primary" style="margin-top:4px">Mark</button>
    </div>
  </div>`;
}

/* ---------- Vendor Orders ---------- */
function vendScreen_Orders() {
  return `
  <section class="screen" data-screen="orders">
    <div class="app-header">
      <button class="icon-btn" data-target="dash">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Today's Orders</div></div>
      <button class="icon-btn">${I.filter}</button>
    </div>
    <div class="scroll">
      <div class="row gap-2 mt-2" style="overflow-x:auto">
        <span class="chip brand">All · 42</span>
        <span class="chip"><span class="status-dot sun"></span>Pending · 14</span>
        <span class="chip"><span class="status-dot mint"></span>Delivered · 28</span>
        <span class="chip"><span class="status-dot rose"></span>Skipped · 0</span>
      </div>

      <div class="section-head"><h3>Pending</h3></div>
      ${orderRow('Shweta K.','12A, Palm Meadows · 6:15 AM','1 L Cow Milk','pending')}
      ${orderRow('Aditya R.','24, Prestige Lakeside · 6:20 AM','2 L Buffalo','pending')}
      ${orderRow('Priya S.','B-202, Brigade · 6:30 AM','1 L A2 Organic','pending')}

      <div class="section-head"><h3>Delivered</h3></div>
      ${orderRow('Rohan V.','4B Sobha Dream · 5:45 AM','1 L Cow Milk','delivered')}
      ${orderRow('Meera P.','12 Prestige Shantiniketan','500 ml Curd','delivered')}
    </div>
  </section>`;
}
function orderRow(name, meta, item, status) {
  const tone = status==='delivered'?'mint':'sun';
  const label = status==='delivered'?'Done':'Pending';
  return `
  <div class="list-item">
    <div class="avatar" style="width:40px;height:40px;font-size:12px;background:linear-gradient(135deg,#60A5FA,#3B82F6)">${name.split(' ').map(n=>n[0]).join('')}</div>
    <div class="meta">
      <strong>${name}</strong>
      <span>${meta} · ${item}</span>
    </div>
    <span class="chip ${tone}"><span class="status-dot ${tone}"></span>${label}</span>
  </div>`;
}

/* ---------- Vendor Inventory ---------- */
function vendScreen_Inventory() {
  return `
  <section class="screen" data-screen="inv">
    <div class="app-header">
      <button class="icon-btn" data-target="dash">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Inventory</div></div>
      <button class="icon-btn">${I.plus}</button>
    </div>
    <div class="scroll">

      <div class="stats-grid">
        ${statCard('Total SKUs','12','up','+1')}
        ${statCard('Low Stock','2','down','-1')}
      </div>

      <div class="section-head"><h3>Stock Levels</h3></div>
      ${invRow('Cow Milk · 1 L','Today batch · Farm A','240 L / 300 L',80,'mint')}
      ${invRow('Buffalo Milk · 1 L','Today batch · Farm B','85 L / 100 L',85,'mint')}
      ${invRow('A2 Organic · 1 L','Today batch · Farm C','12 L / 60 L',20,'rose')}
      ${invRow('Curd · 500 g','Fresh today','48 / 100 units',48,'sun')}
      ${invRow('Paneer · 200 g','Today batch','26 / 40 units',65,'mint')}

    </div>
  </section>`;
}
function invRow(title, sub, qty, pct, tone) {
  const barColor = tone==='mint'?'var(--mint)': tone==='sun'?'var(--sun)':'var(--rose)';
  return `
  <div class="card">
    <div class="row between">
      <div class="stack">
        <div class="card-title">${title}</div>
        <div class="card-sub">${sub}</div>
      </div>
      <div class="bold text-sm">${qty}</div>
    </div>
    <div style="height:6px; background:var(--milk-200); border-radius:999px; margin-top:10px; overflow:hidden">
      <div style="height:100%; width:${pct}%; background:${barColor}"></div>
    </div>
  </div>`;
}

/* ---------- Vendor Earnings ---------- */
function vendScreen_Earnings() {
  const data = [40,55,48,72,65,90,78];
  const max = Math.max(...data);
  return `
  <section class="screen" data-screen="earn">
    <div class="app-header">
      <button class="icon-btn" data-target="dash">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Earnings</div></div>
      <button class="icon-btn">${I.chart}</button>
    </div>
    <div class="scroll">
      <div class="hero" style="background:linear-gradient(135deg,#F5B301,#FBBF24); color:#3B2400; box-shadow: 0 20px 30px -14px rgba(245,179,1,.5)">
        <span class="eyebrow">This Month · April</span>
        <h2>?94,820</h2>
        <p>?3,480 today · Payout on Apr 30</p>
        <div class="hero-actions">
          <button class="btn btn-sm" style="background:#0B1220;color:#fff">Withdraw</button>
          <button class="btn btn-sm btn-ghost" style="background:rgba(0,0,0,.08);color:#3B2400">Statements</button>
        </div>
      </div>

      <div class="section-head"><h3>Last 7 Days</h3></div>
      <div class="card">
        <div class="bars-wrap">
          <div class="bars">
            ${data.map((v,i)=>`<div class="bar ${i===5?'highlight':''}" style="height:${(v/max)*100}%"></div>`).join('')}
          </div>
          <div class="bars-labels">
            ${['M','T','W','T','F','S','S'].map(d=>`<span>${d}</span>`).join('')}
          </div>
        </div>
        <div class="divider"></div>
        <div class="row between">
          <div class="stack"><span class="muted text-xs">Avg / day</span><strong>?3,240</strong></div>
          <div class="stack"><span class="muted text-xs">Best day</span><strong>?4,120 Sat</strong></div>
          <div class="stack"><span class="muted text-xs">Orders</span><strong>298</strong></div>
        </div>
      </div>

      <div class="section-head"><h3>Recent Payouts</h3></div>
      ${txnRow('Weekly payout','To HDFC ••4821','+ ?22,450','Apr 14','mint')}
      ${txnRow('Weekly payout','To HDFC ••4821','+ ?19,780','Apr 7','mint')}
      ${txnRow('Weekly payout','To HDFC ••4821','+ ?21,100','Mar 31','mint')}
    </div>
  </section>`;
}

/* ---------- Vendor Customers ---------- */
function vendScreen_Customers() {
  return `
  <section class="screen" data-screen="cust">
    <div class="app-header">
      <button class="icon-btn" data-target="dash">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Customers</div></div>
      <button class="icon-btn">${I.search}</button>
    </div>
    <div class="scroll">
      <div class="stats-grid">
        ${statCard('Active','186','up','+4')}
        ${statCard('Paused','12','down','-2')}
      </div>
      ${custRow('Shweta Kumar','Daily · 1 L Cow Milk','Active','SH')}
      ${custRow('Aditya Rao','Daily · 2 L Buffalo','Active','AR')}
      ${custRow('Priya Sharma','Alt days · A2 Organic','Active','PS')}
      ${custRow('Rohan Verma','Weekday · 500ml Curd','Paused','RV')}
      ${custRow('Meera Patel','Daily · Cow + Curd','Active','MP')}
    </div>
  </section>`;
}
function custRow(name, sub, status, initials) {
  const tone = status==='Active'?'mint':'sun';
  return `
  <div class="list-item">
    <div class="avatar" style="width:40px;height:40px;font-size:12px">${initials}</div>
    <div class="meta"><strong>${name}</strong><span>${sub}</span></div>
    <span class="chip ${tone}"><span class="status-dot ${tone}"></span>${status}</span>
  </div>`;
}

/* =========================================================
   ADMIN APP
   ========================================================= */
function adminApp() {
  return `
  <div class="phone">
    <span class="screen-label">Super Admin</span>
    <div class="phone-screen">
      ${statusBar}
      <div class="screens" data-app="admin">
        ${adminScreen_Analytics()}
        ${adminScreen_Vendors()}
        ${adminScreen_Customers()}
        ${adminScreen_Reports()}
        ${adminScreen_Settings()}
      </div>
      <nav class="bottom-nav" data-app-nav="admin">
        ${navItem('analytics','Overview',I.home, true)}
        ${navItem('vendors','Vendors',I.build)}
        ${navItem('customers','Users',I.users)}
        ${navItem('reports','Reports',I.chart)}
        ${navItem('settings','Settings',I.settings)}
      </nav>
    </div>
  </div>`;
}

/* ---------- Admin Analytics ---------- */
function adminScreen_Analytics() {
  const data = [60,75,55,90,72,100,85,92,78,95,88,76,80,95];
  const max = Math.max(...data);
  return `
  <section class="screen active" data-screen="analytics">
    <div class="app-header">
      <div>
        <div class="muted text-xs">Super Admin · Apr 18</div>
        <div class="title">Command Center</div>
      </div>
      <div class="row gap-2">
        <button class="icon-btn">${I.bell}<span class="dot"></span></button>
        <div class="avatar" style="background:linear-gradient(135deg,#0B1220,#1F2A44)">AD</div>
      </div>
    </div>
    <div class="scroll">
      <div class="hero" style="background:linear-gradient(135deg,#0B1220,#1F2A44 60%,#2563EB); box-shadow:0 20px 30px -14px rgba(11,18,32,.55)">
        <span class="eyebrow">Gross Revenue · Month to date</span>
        <h2 style="font-size:30px">?14,82,340</h2>
        <p>Trending <span style="color:#86EFAC">+18.2%</span> vs. last month</p>
        <div class="hero-actions">
          <button class="btn btn-sm btn-ghost">${I.chart} Live</button>
          <button class="btn btn-sm btn-ghost">${I.mail} Digest</button>
        </div>
      </div>

      <div class="stats-grid mt-4">
        ${statCard('Active Subs','8,942','up','+6.4%')}
        ${statCard('Vendors','148','up','+3')}
        ${statCard('Churn','1.8%','down','-0.3%')}
        ${statCard('Avg LTV','?12.4k','up','+4.1%')}
      </div>

      <div class="section-head"><h3>Daily Orders · 14d</h3><span class="chip mint"><span class="status-dot mint"></span>Healthy</span></div>
      <div class="card">
        <div class="bars-wrap">
          <div class="bars" style="height:130px">
            ${data.map((v,i)=>`<div class="bar ${i===13?'highlight':''}" style="height:${(v/max)*100}%"></div>`).join('')}
          </div>
        </div>
        <div class="divider"></div>
        <div class="row between">
          <div class="stack"><span class="muted text-xs">Today</span><strong>10,284</strong></div>
          <div class="stack"><span class="muted text-xs">7d avg</span><strong>9,842</strong></div>
          <div class="stack"><span class="muted text-xs">Peak hr</span><strong>6–7 AM</strong></div>
        </div>
      </div>

      <div class="section-head"><h3>Needs Attention</h3><a href="#" data-target="vendors">Review</a></div>
      ${alertRow('Vendor onboarding stuck','3 vendors pending KYC','sun')}
      ${alertRow('Spike in churn · Zone 5','+0.8% today','rose')}
      ${alertRow('Low stock · A2 Organic','6 routes below threshold','sun')}
    </div>
  </section>`;
}
function alertRow(title, sub, tone) {
  const cls = tone === 'sun' ? 'sun' : tone === 'rose' ? 'rose' : 'mint';
  return `
  <div class="list-item">
    <div class="thumb ${cls}" style="width:40px;height:40px;border-radius:12px">${I.shield}</div>
    <div class="meta"><strong>${title}</strong><span>${sub}</span></div>
    <span class="muted">${I.chevR}</span>
  </div>`;
}

/* ---------- Admin Vendors ---------- */
function adminScreen_Vendors() {
  return `
  <section class="screen" data-screen="vendors">
    <div class="app-header">
      <button class="icon-btn" data-target="analytics">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Vendor Management</div></div>
      <button class="icon-btn">${I.plus}</button>
    </div>
    <div class="scroll">
      <div class="search">
        ${I.search}
        <input placeholder="Search vendors, routes, IDs..."/>
      </div>

      <div class="row gap-2 mt-3" style="overflow-x:auto">
        <span class="chip brand">All · 148</span>
        <span class="chip mint">Active · 140</span>
        <span class="chip sun">Pending KYC · 3</span>
        <span class="chip rose">Suspended · 5</span>
      </div>

      <div class="section-head"><h3>Top Performing</h3></div>
      ${vendorAdminRow('Rahul\'s Dairy','Route 4 · Whitefield','?94,820','4.8','active')}
      ${vendorAdminRow('Prime Milk Co.','Route 2 · Indiranagar','?88,120','4.7','active')}
      ${vendorAdminRow('GreenFarms','Route 7 · HSR','?81,540','4.9','active')}

      <div class="section-head"><h3>Pending Approval</h3></div>
      ${vendorAdminRow('Morning Fresh','Route 12 · Koramangala','—','—','pending')}
      ${vendorAdminRow('Pure Valley Dairy','Route 15 · Electronic City','—','—','pending')}
    </div>
  </section>`;
}
function vendorAdminRow(name, route, rev, rating, status) {
  const tone = status==='active'?'mint':'sun';
  const label = status==='active'?'Active':'Pending';
  return `
  <div class="card">
    <div class="row between">
      <div class="row gap-3">
        <div class="thumb" style="width:44px;height:44px">${I.build}</div>
        <div class="stack">
          <div class="card-title">${name}</div>
          <div class="card-sub">${route}</div>
        </div>
      </div>
      <span class="chip ${tone}"><span class="status-dot ${tone}"></span>${label}</span>
    </div>
    <div class="divider"></div>
    <div class="row between">
      <div class="stack"><span class="muted text-xs">Revenue MTD</span><strong>${rev}</strong></div>
      <div class="stack"><span class="muted text-xs">Rating</span><strong>${rating}</strong></div>
      <button class="btn btn-sm btn-ghost">View</button>
    </div>
  </div>`;
}

/* ---------- Admin Customers ---------- */
function adminScreen_Customers() {
  return `
  <section class="screen" data-screen="customers">
    <div class="app-header">
      <button class="icon-btn" data-target="analytics">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Customer Ops</div></div>
      <button class="icon-btn">${I.filter}</button>
    </div>
    <div class="scroll">
      <div class="stats-grid">
        ${statCard('Total Users','24,812','up','+312')}
        ${statCard('New · Week','428','up','+9%')}
        ${statCard('Active Subs','8,942','up','+4.1%')}
        ${statCard('Churn Risk','182','down','-14')}
      </div>

      <div class="section-head"><h3>Segments</h3></div>
      <div class="row gap-2" style="overflow-x:auto">
        <span class="chip brand">Premium · 1,204</span>
        <span class="chip mint">Loyalty L3 · 2,851</span>
        <span class="chip sun">At risk · 182</span>
        <span class="chip">New · 428</span>
      </div>

      <div class="section-head"><h3>Recent Signups</h3></div>
      ${custAdminRow('Shweta Kumar','Bangalore · Whitefield','?1,199/mo','Premium')}
      ${custAdminRow('Aditya Rao','Bangalore · Indiranagar','?899/mo','Starter')}
      ${custAdminRow('Priya Sharma','Bangalore · HSR','?1,799/mo','A2 Organic')}
      ${custAdminRow('Rohan Verma','Bangalore · Koramangala','?499/mo','Starter')}
    </div>
  </section>`;
}
function custAdminRow(name, loc, plan, tier) {
  return `
  <div class="row-tight">
    <div class="row gap-3">
      <div class="avatar" style="width:36px;height:36px;font-size:11px">${name.split(' ').map(n=>n[0]).join('')}</div>
      <div class="stack">
        <strong class="text-sm">${name}</strong>
        <span class="muted text-xs">${loc}</span>
      </div>
    </div>
    <div class="stack" style="align-items:flex-end">
      <strong class="text-sm">${plan}</strong>
      <span class="chip text-xs" style="padding:2px 8px">${tier}</span>
    </div>
    <span class="muted">${I.chevR}</span>
  </div>`;
}

/* ---------- Admin Reports ---------- */
function adminScreen_Reports() {
  return `
  <section class="screen" data-screen="reports">
    <div class="app-header">
      <button class="icon-btn" data-target="analytics">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">Reports & Payouts</div></div>
      <button class="icon-btn">${I.mail}</button>
    </div>
    <div class="scroll">
      <div class="row gap-2 mt-2" style="overflow-x:auto">
        <span class="chip brand">Revenue</span>
        <span class="chip">Payouts</span>
        <span class="chip">GST</span>
        <span class="chip">Refunds</span>
      </div>

      <div class="section-head"><h3>Financial Summary</h3></div>
      <div class="card">
        <div class="row between">
          <div class="stack"><span class="muted text-xs">Gross Revenue</span><strong class="text-xl">?14.82L</strong></div>
          <div class="stack" style="align-items:flex-end"><span class="muted text-xs">Take Home</span><strong class="text-xl" style="color:var(--mint)">?3.21L</strong></div>
        </div>
        <div class="divider"></div>
        <div class="row between text-xs">
          <span class="muted">Vendor payouts</span><strong>?10.18L</strong>
        </div>
        <div class="row between text-xs mt-2">
          <span class="muted">Operating costs</span><strong>?1.43L</strong>
        </div>
        <div class="row between text-xs mt-2">
          <span class="muted">GST liability</span><strong>?0.58L</strong>
        </div>
      </div>

      <div class="section-head"><h3>Export Reports</h3></div>
      ${reportRow('Monthly Revenue · April','PDF · Generated 1 hr ago')}
      ${reportRow('Vendor Payout Register','XLSX · Weekly')}
      ${reportRow('Subscription Cohorts','CSV · Live data')}
      ${reportRow('GST Summary · Q1','PDF · Filed Apr 10')}
    </div>
  </section>`;
}
function reportRow(title, sub) {
  return `
  <div class="list-item">
    <div class="thumb sun" style="width:40px;height:40px;border-radius:12px">${I.chart}</div>
    <div class="meta"><strong>${title}</strong><span>${sub}</span></div>
    <button class="btn btn-sm btn-ghost">Download</button>
  </div>`;
}

/* ---------- Admin Settings ---------- */
function adminScreen_Settings() {
  return `
  <section class="screen" data-screen="settings">
    <div class="app-header">
      <button class="icon-btn" data-target="analytics">${I.chevL}</button>
      <div style="flex:1"><div class="title" style="text-align:center">System Controls</div></div>
      <button class="icon-btn">${I.shield}</button>
    </div>
    <div class="scroll">
      <div class="card">
        <div class="row gap-3">
          <div class="thumb" style="background:var(--ink-900); color:#fff">${I.shield}</div>
          <div class="flex-1">
            <div class="card-title">Platform Health</div>
            <div class="card-sub">API 99.98% · DB 100% · Gateway OK</div>
          </div>
          <span class="chip mint"><span class="status-dot mint"></span>Live</span>
        </div>
      </div>

      <div class="section-head"><h3>Operations</h3></div>
      ${prefRow('Accept new vendor signups','Auto-route to KYC queue', true)}
      ${prefRow('Surge pricing (weekends)','Auto enabled Fri–Sun', false)}
      ${prefRow('Allow customer pause','Up to 7 days / month', true)}
      ${prefRow('SMS + Push alerts','For delivery status', true)}

      <div class="section-head"><h3>Access</h3></div>
      ${linkRow('Team members','6 admins · 2 analysts', I.users)}
      ${linkRow('Roles & permissions','3 role templates', I.shield)}
      ${linkRow('Audit log','Last entry 4 min ago', I.chart)}
      ${linkRow('Billing & invoices','Stripe · Razorpay', I.wallet)}
    </div>
  </section>`;
}

/* =========================================================
   Runtime — mount apps + wire nav
   ========================================================= */
const stage = document.getElementById('stage');

function mount(role) {
  let html = '';
  if (role === 'customer') html = customerApp();
  else if (role === 'vendor') html = vendorApp();
  else if (role === 'admin') html = adminApp();
  stage.innerHTML = html;
  wireScreens();
}

function wireScreens() {
  // Handle nav / screen switching inside any phone
  document.querySelectorAll('.phone').forEach(phone => {
    phone.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-target]');
      if (!btn) return;
      const target = btn.dataset.target;
      const screens = phone.querySelectorAll('.screen');
      let matched = false;
      screens.forEach(s => {
        if (s.dataset.screen === target) {
          matched = true;
          screens.forEach(x => x.classList.remove('active'));
          s.classList.add('active');
        }
      });
      // Sync bottom nav active state
      const nav = phone.querySelector('.bottom-nav');
      if (nav && matched) {
        nav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const match = nav.querySelector(`[data-target="${target}"]`);
        if (match) match.classList.add('active');
      }
      // If target was a switch/pref, toggle it
      if (btn.classList.contains('switch')) {
        btn.classList.toggle('on');
      }
    });

    // Switch toggles
    phone.querySelectorAll('.switch').forEach(sw => {
      sw.addEventListener('click', () => sw.classList.toggle('on'));
    });
  });
}

/* Role switcher */
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mount(btn.dataset.role);
  });
});

/* Initial mount — show all three apps side by side by default */
function mountAll() {
  stage.innerHTML = customerApp() + vendorApp() + adminApp();
  wireScreens();
}
mountAll();

/* Override role switcher to show ALL + highlight */
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // If all 3 visible, clicking a role scrolls to that phone
    const role = btn.dataset.role;
    const labelMap = { customer: 'Customer App', vendor: 'Vendor App', admin: 'Super Admin' };
    const phones = document.querySelectorAll('.phone');
    phones.forEach(p => {
      const label = p.querySelector('.screen-label')?.textContent;
      if (label === labelMap[role]) {
        p.scrollIntoView({ behavior: 'smooth', block: 'center' });
        p.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.03)' },
          { transform: 'scale(1)' }
        ], { duration: 500, easing: 'ease-out' });
      }
    });
  });
});