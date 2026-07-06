/* ===========================================================
   ProposalPilot AI — dashboard app (vanilla JS, hash router)
=========================================================== */

let DB = loadDB();
const app = document.getElementById('app');

/* ---------------- icons ---------------- */
const I = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
  leads: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.7"/><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.7"/></svg>`,
  proposals: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.7"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  templates: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2 2 7l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="m2 7 10 6 10-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  analytics: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><rect x="7" y="12" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="12.5" y="8" width="3" height="10" rx="0.5" fill="currentColor"/><rect x="18" y="5" width="3" height="13" rx="0.5" fill="currentColor"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.4.66.73.86.32.2.7.31 1.09.31H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" stroke-width="1.5"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/></svg>`,
  sparkle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  link: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.15-1.15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  copy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.7"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ---------------- nav ---------------- */
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: I.dashboard },
  { key: 'leads', label: 'Leads', icon: I.leads },
  { key: 'proposals', label: 'Proposals', icon: I.proposals },
  { key: 'templates', label: 'Templates', icon: I.templates },
  { key: 'email-templates', label: 'Email Templates', icon: I.email },
  { key: 'analytics', label: 'Analytics', icon: I.analytics },
  { key: 'settings', label: 'Settings', icon: I.settings },
];

function renderNav(activeKey){
  document.getElementById('nav').innerHTML = NAV_ITEMS.map(it => `
    <a class="nav-item ${it.key===activeKey?'active':''}" href="#/${it.key}">${it.icon}${it.label}</a>
  `).join('');
}

/* ---------------- toast ---------------- */
function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${I.check}<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s ease'; setTimeout(()=>el.remove(),300); }, 3200);
}

/* ---------------- modal ---------------- */
function openModal(html){
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'activeModal';
  overlay.innerHTML = `<div class="modal">${html}</div>`;
  overlay.addEventListener('mousedown', (e)=>{ if(e.target===overlay) closeModal(); });
  document.body.appendChild(overlay);
}
function closeModal(){ const m = document.getElementById('activeModal'); if(m) m.remove(); }

/* ---------------- router ---------------- */
function router(){
  const hash = location.hash.replace('#/','') || 'dashboard';
  const [page, id] = hash.split('/');
  renderNav(page);
  const routes = {
  dashboard: renderDashboard,
  leads: renderLeads,
  proposals: () => id ? renderProposalDetail(id) : renderProposals(),
  'proposal-builder': renderProposalBuilder,
  templates: renderTemplates,
  'email-templates': renderEmailTemplates,
  analytics: renderAnalytics,
  settings: renderSettings,
};
  (routes[page] || renderDashboard)();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

/* ===========================================================
   DASHBOARD
=========================================================== */
function renderDashboard(){
  const newLeadsCount = DB.leads.filter(l=>l.status==='new').length;
  const proposalsSent = DB.proposals.filter(p=>p.status!=='draft').length;
  const wonDeals = DB.leads.filter(l=>l.status==='won').length;
  const pipelineValue = DB.leads.reduce((s,l)=> l.status!=='lost' ? s+l.value : s, 0);

  const stageOrder = ['new','contacted','negotiation','proposal_sent','won','lost'];
  const stageLabels = { new:'New', contacted:'Contacted', negotiation:'Negotiation', proposal_sent:'Proposal Sent', won:'Won', lost:'Lost' };
  const counts = stageOrder.map(s => DB.leads.filter(l=>l.status===s).length);
  const max = Math.max(1, ...counts);

  const reminders = DB.proposals.filter(p=> p.status==='sent' || p.status==='viewed').slice(0,3);
  const recentLeads = [...DB.leads].sort((a,b)=>b.created-a.created).slice(0,4);

  app.innerHTML = `
    <div class="page-head">
  <div>
    <span class="page-badge">🚀 ProposalPilot AI</span>
    <h1>Welcome back, Pilot 👋</h1>
    <p class="page-subtitle">
      Here's what's happening with your proposals and sales pipeline today.
    </p>
  </div>

  <div class="page-actions">
    <button class="btn btn-primary" onclick="location.hash='#/proposals'">
      + New Proposal
    </button>

    <button class="btn btn-ghost btn-sm" onclick="doResetDemo()">
      Reset Demo
    </button>
  </div>
</div>

    <div class="stat-grid">
      ${statCard('New Leads', newLeadsCount, I.leads, '+100%')}
      ${statCard('Proposals Sent', proposalsSent, I.proposals, '+100%')}
      ${statCard('Won Deals', wonDeals, I.check, '+100%')}
      ${statCard('Pipeline Value', fmtMoney(pipelineValue), I.analytics, '+100%')}
    </div>

    <div class="section-grid">
      <div class="card">
        <div class="card-title">Revenue Trend</div>
        <div class="card-body">${revenueSparkSVG()}</div>
      </div>
      <div class="card">
        <div class="card-title">Pipeline Overview</div>
        <div class="card-body">
          ${stageOrder.map((s,i)=>`
            <div class="bar-row">
              <div class="bar-label">${stageLabels[s]}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6,(counts[i]/max)*100)}%">${counts[i]}</div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="section-grid">
      <div class="card">
        <div class="card-title">Follow-up Reminders</div>
        <div class="card-body">
          ${reminders.length ? reminders.map(p=>`
            <div class="flex-between" style="padding:12px 0;border-bottom:1px solid var(--border-soft);">
              <div>
                <div class="cell-primary">${p.leadName}</div>
                <div class="cell-muted">${p.title}</div>
              </div>
              <div style="display:flex;gap:10px;align-items:center;">
                <span class="pill-x">${daysUntil(p.validUntil)}</span>
                <a class="btn btn-primary btn-sm" href="#/proposals/${p.id}">Follow up</a>
              </div>
            </div>`).join('') : emptyState('No reminders', 'Sent proposals awaiting a reply will show up here.')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Recent Leads</div>
        <div class="card-body">
          ${recentLeads.map(l=>`
            <div class="flex-between" style="padding:12px 0;border-bottom:1px solid var(--border-soft);">
              <div>
                <div class="cell-primary">${l.name}</div>
                <div class="cell-muted">${l.company}</div>
              </div>
              <span class="badge badge-${l.status}">${l.status.replace('_',' ')}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function statCard(label, value, icon, delta){
  return `
    <div class="stat-card">

      <div class="stat-top">
        <div class="stat-label">${label}</div>
        <div class="stat-icon">${icon}</div>
      </div>

      <div class="stat-value">${value}</div>

      <div class="stat-footer">
        <span class="trend-up">▲ ${delta}</span>
        <span class="trend-text">vs last month</span>
      </div>

    </div>
  `;
}

function daysUntil(ts){
  const d = Math.ceil((ts-Date.now())/86400000);
  if(d < 0) return 'expired';
  if(d === 0) return 'due today';
  return d + ' day' + (d===1?'':'s');
}

function emptyState(title, sub){
  return `<div class="empty">${I.proposals}<h3>${title}</h3><p>${sub}</p></div>`;
}

function revenueSparkSVG(){
  // simple recreation of the sparse revenue-trend chart style from the original screenshot
  const pts = [1200,1800,900,3200,2600,4100,8000];
  const w=560,h=220,pad=36;
  const maxV = Math.max(...pts);
  const stepX = (w-pad*2)/(pts.length-1);
  const coords = pts.map((v,i)=>[pad+i*stepX, h-pad-(v/maxV)*(h-pad*1.6)]);
  const path = coords.map((c,i)=> (i===0?'M':'L')+c[0].toFixed(1)+','+c[1].toFixed(1)).join(' ');
  const area = path + ` L${coords[coords.length-1][0]},${h-pad} L${coords[0][0]},${h-pad} Z`;
  return `
  <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" style="overflow:visible">
    <defs>
      <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#rev-grad)"/>
    <path d="${path}" fill="none" stroke="#818cf8" stroke-width="2.5"/>
    ${coords.map((c,i)=>`<circle cx="${c[0]}" cy="${c[1]}" r="${i===coords.length-1?5:3}" fill="${i===coords.length-1?'#818cf8':'#363a72'}"/>`).join('')}
    <text x="${pad}" y="${h}" fill="#5b6272" font-size="12" font-family="JetBrains Mono">Jan</text>
    <text x="${coords[coords.length-1][0]-14}" y="${h}" fill="#5b6272" font-size="12" font-family="JetBrains Mono">Jul</text>
  </svg>`;
}

/* ===========================================================
   LEADS
=========================================================== */
function renderLeads(){
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Leads</h1></div>
      <button class="btn btn-primary" onclick="openAddLeadModal()">${I.plus} Add Lead</button>
    </div>
    <div class="field" style="max-width:420px;">
      <input class="input" id="leadSearch" placeholder="Search leads..." oninput="filterLeads(this.value)">
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Name / Company</th><th>Status</th><th>Value</th><th>Created</th><th></th></tr></thead>
        <tbody id="leadsBody"></tbody>
      </table>
    </div>
  `;
  paintLeadsTable(DB.leads);
}
function paintLeadsTable(list){
  const body = document.getElementById('leadsBody');
  body.innerHTML = list.length ? list.map(l=>`
    <tr>
      <td><div class="cell-primary">${l.name}</div><div class="cell-muted">${l.company}</div></td>
      <td><span class="badge badge-${l.status}">${l.status.replace('_',' ')}</span></td>
      <td class="mono">${fmtMoney(l.value)}</td>
      <td class="cell-muted">${fmtDate(l.created)}</td>
      <td style="text-align:right;"><button class="btn btn-subtle btn-sm" onclick="createProposalFromLead('${l.id}')">Create Proposal</button></td>
    </tr>
  `).join('') : `<tr><td colspan="5">${emptyState('No leads found','Try a different search term.')}</td></tr>`;
}
function filterLeads(q){
  q = q.toLowerCase();
  paintLeadsTable(DB.leads.filter(l => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)));
}
function openAddLeadModal(){
  openModal(`
    <div class="modal-head"><h3>Add Lead</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Name</label><input class="input" id="nlName" placeholder="Jane Cooper"></div>
      <div class="field"><label>Company</label><input class="input" id="nlCompany" placeholder="Acme Co."></div>
      <div class="row-2">
        <div class="field"><label>Estimated value</label><input class="input" id="nlValue" type="number" placeholder="5000"></div>
        <div class="field"><label>Status</label>
          <select class="input" id="nlStatus">
            <option value="new">New</option><option value="contacted">Contacted</option><option value="negotiation">Negotiation</option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNewLead()">Add Lead</button>
    </div>
  `);
}
function saveNewLead(){
  const name = document.getElementById('nlName').value.trim();
  const company = document.getElementById('nlCompany').value.trim();
  const value = Number(document.getElementById('nlValue').value) || 0;
  const status = document.getElementById('nlStatus').value;
  if(!name || !company){ toast('Name and company are required'); return; }
  DB.leads.unshift({ id: uid('lead'), name, company, status, value, created: Date.now() });
  saveDB(DB); closeModal(); toast('Lead added'); renderLeads();
}

/* ===========================================================
   PROPOSALS (list)
=========================================================== */
function renderProposals(){
  app.innerHTML = `
    <div class="page-head">

  <div>

    <span class="page-badge">📄 Proposal Workspace</span>

    <h1>Your Proposals</h1>

    <p class="page-subtitle">
      Create, send and manage every proposal from one place.
    </p>

  </div>

  <div class="page-actions">

    <button class="btn btn-primary" onclick="location.hash='#/proposal-builder'">

      ${I.plus} New Proposal

    </button>

  </div>

</div>
<div class="stat-grid">

  ${statCard(
      'Drafts',
      DB.proposals.filter(p=>p.status==='draft').length,
      I.proposals,
      'Ready'
  )}

  ${statCard(
      'Sent',
      DB.proposals.filter(p=>p.status==='sent').length,
      I.eye,
      'Active'
  )}

  ${statCard(
      'Accepted',
      DB.proposals.filter(p=>p.status==='accepted').length,
      I.check,
      'Won'
  )}

  ${statCard(
      'Revenue',
      fmtMoney(
        DB.proposals
          .filter(p=>p.status==='accepted')
          .reduce((t,p)=>t+p.amount,0)
      ),
      I.analytics,
      'Closed'
  )}

</div>
    <div class="card">
      <table>
        <thead><tr><th>Title</th><th>Lead</th><th>Status</th><th>Amount</th><th>Views</th><th>Valid Until</th><th></th></tr></thead>
        <tbody>
          ${DB.proposals.map(p=>`
            <tr style="cursor:pointer" onclick="location.hash='#/proposals/${p.id}'">
              <td class="cell-primary">${p.title}</td>
              <td>${p.leadName}<div class="cell-muted">${p.company||''}</div></td>
              <td>${proposalStatusBadge(p)}</td>
              <td class="mono">${fmtMoney(p.amount)}</td>
              <td class="mono">${p.views.length ? `${p.views.length} · ${timeAgo(p.views[p.views.length-1].ts)}` : '—'}</td>
              <td class="cell-muted">${fmtDate(p.validUntil)}</td>
              <td style="text-align:right;"><span class="muted">${I.arrow}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function renderProposalBuilder(){

    app.innerHTML = `
        <div class="page-head">

            <div>

                <span class="page-badge">
                    ✨ Proposal Builder
                </span>

                <h1>Create Proposal</h1>

                <p class="page-subtitle">
                    Build a professional proposal in a few simple steps.
                </p>

            </div>

        </div>

        <div class="card">

    <h2>Client Information</h2>

    <div class="field">
    <label>Client Name</label>
    <input class="input" id="clientName" placeholder="John Smith">
</div>

<div class="field">
    <label>Company</label>
    <input class="input" id="companyName" placeholder="ABC Holdings">
</div>

<div class="field">
    <label>Email</label>
    <input class="input" id="clientEmail" placeholder="john@company.com">
</div>

<div class="field">
    <label>Phone</label>
    <input class="input" id="clientPhone" placeholder="+27 82 123 4567">
</div>

<div class="field">
    <label>Project Name</label>
    <input class="input" id="projectName" placeholder="Website Redesign">
</div>

    <div style="display:flex;justify-content:flex-end;margin-top:24px;">
        <button class="btn btn-primary">
            Next →
        </button>
    </div>

</div>

    `;

}

function proposalStatusBadge(p){
  if(p.approvalStatus === 'pending') return `<span class="badge badge-pending_approval">pending approval</span>`;
  return `<span class="badge badge-${p.status}">${p.status.replace('_',' ')}</span>`;
}

function openCreateProposalModal(prefillLead){
  const leadOptions = DB.leads.map(l=>`<option value="${l.id}" ${prefillLead===l.id?'selected':''}>${l.name} — ${l.company}</option>`).join('');
  openModal(`
    <div class="modal-head"><h3>Create Proposal</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Title</label><input class="input" id="npTitle" placeholder="e.g. Website Redesign"></div>
      <div class="field"><label>Lead</label><select class="input" id="npLead">${leadOptions}</select></div>
      <div class="field">
        <label>Scope of work</label>
        <textarea class="input" id="npScope" rows="3" placeholder="Briefly describe the deliverables..."></textarea>
      </div>
      <div class="field">
        <div class="flex-between"><label style="margin-bottom:0;">Line items</label><button class="btn btn-subtle btn-sm" onclick="addLineItemRow()">${I.plus} Add item</button></div>
        <div id="lineItemRows" style="margin-top:10px;display:flex;flex-direction:column;gap:8px;"></div>
      </div>
      <div class="card" style="background:var(--accent-soft-bg);border-color:var(--accent-dim);padding:16px 18px;margin-top:6px;">
        <div class="flex-between">
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;font-size:13.5px;color:var(--accent-bright);">${I.sparkle} AI pricing recommendation</div>
          <button class="btn btn-subtle btn-sm" onclick="runAIPricing()">Suggest price</button>
        </div>
        <div id="aiPricingOut" class="cell-muted" style="margin-top:10px;">Add line items and a scope, then click "Suggest price."</div>
      </div>
      <div class="field" style="margin-top:18px;"><label>Valid until</label><input class="input" type="date" id="npValid"></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-subtle" onclick="saveNewProposal(false)">Save Draft</button>
      <button class="btn btn-primary" onclick="saveNewProposal(true)">Save &amp; Send</button>
    </div>
  `);
  addLineItemRow(); addLineItemRow();
  const d = new Date(Date.now()+21*86400000);
  document.getElementById('npValid').value = d.toISOString().slice(0,10);
}

function addLineItemRow(){
  const wrap = document.getElementById('lineItemRows');
  const row = document.createElement('div');
  row.className = 'row-line-item';
  row.style.cssText = 'display:grid;grid-template-columns:1fr 70px 110px 32px;gap:8px;';
  row.innerHTML = `
    <input class="input li-desc" placeholder="Description">
    <input class="input li-qty" type="number" value="1" min="1">
    <input class="input li-price" type="number" placeholder="Price">
    <button class="icon-btn" onclick="this.parentElement.remove()">✕</button>
  `;
  wrap.appendChild(row);
}

function collectLineItems(){
  return Array.from(document.querySelectorAll('#lineItemRows > div')).map(row=>({
    desc: row.querySelector('.li-desc').value || 'Untitled item',
    qty: Number(row.querySelector('.li-qty').value)||1,
    price: Number(row.querySelector('.li-price').value)||0,
  })).filter(li => li.price > 0 || li.desc !== 'Untitled item');
}

function runAIPricing(){
  const scope = document.getElementById('npScope').value || '';
  const items = collectLineItems();
  const out = document.getElementById('aiPricingOut');
  out.innerHTML = `<span class="muted">Analyzing scope…</span>`;
  setTimeout(()=>{
    const rec = aiSuggestPricing(scope, items);
    out.innerHTML = `
      <div style="color:var(--text);font-family:var(--font-display);font-size:20px;font-weight:700;">${fmtMoney(rec.suggested)}</div>
      <div style="margin-top:4px;">${rec.reasoning}</div>
      <button class="btn btn-subtle btn-sm" style="margin-top:10px;" onclick="applyAIPricing(${rec.suggested}, ${items.length})">Apply to last line item</button>
    `;
  }, 550);
}
function applyAIPricing(amount, count){
  const rows = document.querySelectorAll('#lineItemRows .li-price');
  if(rows.length){ rows[rows.length-1].value = amount; toast('Price applied'); }
}

function saveNewProposal(send){
  const title = document.getElementById('npTitle').value.trim() || 'Untitled Proposal';
  const leadId = document.getElementById('npLead').value;
  const lead = DB.leads.find(l=>l.id===leadId);
  const items = collectLineItems();
  const amount = items.reduce((s,li)=>s+li.qty*li.price,0);
  const validUntil = new Date(document.getElementById('npValid').value).getTime();
  const requiresApproval = DB.settings.requireApproval && amount > DB.settings.approvalThreshold;

  const p = {
    id: uid('prop'), title, leadName: lead? lead.name : 'Unassigned', company: lead? lead.company : '',
    status: send ? 'sent' : 'draft', amount, validUntil, sentAt: send ? Date.now() : null,
    lineItems: items.length ? items : [{desc:'Project scope', qty:1, price: amount||1000}],
    views: [], signature: null, paid: false,
    approvalStatus: requiresApproval ? 'pending' : 'approved',
  };
  DB.proposals.unshift(p);
  saveDB(DB); closeModal();
  if(requiresApproval){
    toast('Saved — pending team approval before it can be sent');
  } else {
    toast(send ? 'Proposal sent!' : 'Draft saved');
  }
  location.hash = '#/proposals/' + p.id;
}

function createProposalFromLead(leadId){ openCreateProposalModal(leadId); }

/* ===========================================================
   PROPOSAL DETAIL
=========================================================== */
function renderProposalDetail(id){
  const p = DB.proposals.find(x=>x.id===id);
  if(!p){ location.hash='#/proposals'; return; }
  const total = proposalTotal(p);
  const shareUrl = shareLinkFor(p.id);

  app.innerHTML = `
    <div class="page-head">
      <div>
        <a href="#/proposals" class="muted" style="font-size:13px;">← All proposals</a>
        <h1 style="margin-top:8px;">${p.title}</h1>
        <p class="desc">${p.leadName}${p.company? ' · '+p.company : ''}</p>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        ${p.approvalStatus==='pending' ? `
          <button class="btn btn-subtle" onclick="setApproval('${p.id}','approved')">${I.check} Approve</button>
          <button class="btn btn-danger" onclick="setApproval('${p.id}','rejected')">Reject</button>
        ` : `
          <button class="btn btn-ghost" onclick="copyShareLink('${p.id}')">${I.copy} Copy client link</button>
          <a class="btn btn-ghost" href="${shareUrl}" target="_blank">${I.eye} Preview as client</a>
          ${p.status==='draft' ? `<button class="btn btn-primary" onclick="sendProposal('${p.id}')">Send Proposal</button>` : ''}
        `}
      </div>
    </div>

    <div class="section-grid">
      <div class="card">
        <div class="card-title">Line items</div>
        <div class="card-body">
          <table>
            <thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>
              ${p.lineItems.map(li=>`<tr><td>${li.desc}</td><td class="mono">${li.qty}</td><td class="mono">${fmtMoney(li.price)}</td><td class="mono">${fmtMoney(li.qty*li.price)}</td></tr>`).join('')}
            </tbody>
          </table>
          <div class="flex-between" style="padding-top:18px;font-family:var(--font-display);font-weight:700;font-size:18px;">
            <span>Total</span><span>${fmtMoney(total)}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Status</div>
        <div class="card-body">
          <div class="flex-between" style="margin-bottom:14px;"><span class="muted">Status</span>${proposalStatusBadge(p)}</div>
          <div class="flex-between" style="margin-bottom:14px;"><span class="muted">Valid until</span><span>${fmtDate(p.validUntil)}</span></div>
          <div class="flex-between" style="margin-bottom:14px;"><span class="muted">Sent</span><span>${p.sentAt ? fmtDateTime(p.sentAt) : 'Not sent yet'}</span></div>
          <div class="flex-between" style="margin-bottom:14px;"><span class="muted">Views</span><span>${p.views.length}</span></div>
          <div class="flex-between" style="margin-bottom:14px;"><span class="muted">Signature</span><span>${p.signature ? `${p.signature.name} · ${fmtDate(p.signature.signedAt)}` : 'Not signed'}</span></div>
          <div class="flex-between"><span class="muted">Payment</span><span>${p.paid ? `<span class="badge badge-paid">paid</span>` : 'Unpaid'}</span></div>

          ${p.views.length ? `
          <div class="divider"></div>
          <div class="kicker" style="margin-bottom:10px;">Open tracking</div>
          ${p.views.map(v=>`<div class="cell-muted" style="margin-bottom:6px;">Viewed ${fmtDateTime(v.ts)}</div>`).join('')}
          ` : ''}

          <div class="divider"></div>
          <button class="btn btn-subtle btn-sm" style="width:100%;justify-content:center;" onclick="openFollowUpModal('${p.id}')">${I.sparkle} Generate follow-up email</button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Shareable client link (no login required)</div>
      <div class="card-body">
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <input class="input mono" readonly value="${shareUrl}" style="flex:1;min-width:260px;">
          <button class="btn btn-subtle" onclick="copyShareLink('${p.id}')">${I.copy} Copy</button>
        </div>
        <p class="cell-muted" style="margin-top:10px;">Clients open this link to view the proposal, e-sign, and pay a deposit — without creating an account.</p>
      </div>
    </div>
  `;
}

function shareLinkFor(id){
  const base = location.href.replace(/index\.html.*$/,'').replace(/#.*$/,'');
  return base + 'proposal.html?id=' + id;
}
function copyShareLink(id){
  const url = shareLinkFor(id);
  navigator.clipboard?.writeText(url).catch(()=>{});
  toast('Client link copied to clipboard');
}
function sendProposal(id){
  const p = DB.proposals.find(x=>x.id===id);
  p.status = 'sent'; p.sentAt = Date.now();
  saveDB(DB); toast('Proposal sent'); renderProposalDetail(id);
}
function setApproval(id, decision){
  const p = DB.proposals.find(x=>x.id===id);
  p.approvalStatus = decision;
  if(decision==='approved') toast('Proposal approved');
  else { p.status='draft'; toast('Proposal rejected — moved back to draft'); }
  saveDB(DB); renderProposalDetail(id);
}

function openFollowUpModal(id){
  const p = DB.proposals.find(x=>x.id===id);
  openModal(`
    <div class="modal-head"><h3>${I.sparkle} AI Follow-up Email</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field">
        <label>Tone</label>
        <select class="input" id="fuTone" onchange="regenFollowUp('${id}')">
          <option value="friendly">Friendly check-in</option>
          <option value="direct">Direct — ask for next step</option>
          <option value="urgent">Urgent — pricing expiring</option>
        </select>
      </div>
      <div class="field"><label>Subject</label><input class="input" id="fuSubject"></div>
      <div class="field"><label>Body</label><textarea class="input mono" id="fuBody" rows="9"></textarea></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="copyFollowUp()">${I.copy} Copy email</button>
    </div>
  `);
  regenFollowUp(id);
}
function regenFollowUp(id){
  const p = DB.proposals.find(x=>x.id===id);
  const tone = document.getElementById('fuTone').value;
  const email = aiFollowUpEmail(p, tone);
  document.getElementById('fuSubject').value = email.subject;
  document.getElementById('fuBody').value = email.body;
}
function copyFollowUp(){
  const text = 'Subject: '+document.getElementById('fuSubject').value+'\n\n'+document.getElementById('fuBody').value;
  navigator.clipboard?.writeText(text).catch(()=>{});
  toast('Email copied to clipboard');
}

/* ===========================================================
   TEMPLATES
=========================================================== */
function renderTemplates(){
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Templates</h1><p class="desc">Manage reusable proposal templates for different industries.</p></div>
      <button class="btn btn-primary" onclick="openCreateTemplateModal()">${I.plus} Create Template</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;" id="templateGrid"></div>
  `;
  paintTemplates();
}
function paintTemplates(){
  document.getElementById('templateGrid').innerHTML = DB.templates.map(t=>`
    <div class="card card-pad">
      <div class="flex-between" style="align-items:flex-start;">
        <div style="font-family:var(--font-display);font-weight:600;font-size:17px;max-width:200px;">${t.name}</div>
        ${t.isDefault ? `<span class="chip">Default</span>` : ''}
      </div>
      <div class="chip-list" style="margin-top:12px;"><span class="chip">${t.tag}</span></div>
      <p class="cell-muted" style="margin-top:14px;min-height:40px;">${t.desc}</p>
      <p class="cell-muted" style="margin-top:6px;">Used ${t.uses} times</p>
      <div style="display:flex;gap:8px;margin-top:18px;">
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="useTemplate('${t.id}')">${I.copy} Use</button>
        <button class="icon-btn" onclick="toast('Preview: ${t.name.replace(/'/g,"")}')">${I.eye}</button>
      </div>
    </div>
  `).join('');
}
function useTemplate(id){
  const t = DB.templates.find(x=>x.id===id);
  t.uses++; saveDB(DB);
  openCreateProposalModal();
  setTimeout(()=>{
    document.getElementById('npTitle').value = t.name;
    document.getElementById('npScope').value = t.desc;
  },0);
}
function openCreateTemplateModal(){
  openModal(`
    <div class="modal-head"><h3>Create Template</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Template name</label><input class="input" id="ntName" placeholder="e.g. Web App MVP"></div>
      <div class="field"><label>Industry tag</label><input class="input" id="ntTag" placeholder="e.g. Technology"></div>
      <div class="field"><label>Description</label><textarea class="input" id="ntDesc" rows="3"></textarea></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNewTemplate()">Create</button>
    </div>
  `);
}
function saveNewTemplate(){
  const name = document.getElementById('ntName').value.trim();
  if(!name){ toast('Name is required'); return; }
  DB.templates.unshift({ id: uid('tpl'), name, tag: document.getElementById('ntTag').value||'General', desc: document.getElementById('ntDesc').value||'', uses:0, isDefault:false });
  saveDB(DB); closeModal(); toast('Template created'); renderTemplates();
}

/* ===========================================================
   EMAIL TEMPLATES
=========================================================== */
function renderEmailTemplates(){
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Email Templates</h1><p class="desc">Manage email copy for proposals and follow-ups.</p></div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-ghost" onclick="openStandaloneAIGenerator()">${I.sparkle} AI Generator</button>
        <button class="btn btn-primary" onclick="openCreateEmailModal()">${I.plus} Create Template</button>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:20px;">
      ${DB.emailTemplates.map(e=>`
        <div class="card card-pad">
          <div class="flex-between" style="align-items:flex-start;">
            <div>
              <div style="font-family:var(--font-display);font-weight:600;font-size:17px;">${e.name}</div>
              <div class="cell-muted" style="margin-top:4px;">Subject: ${e.subject}</div>
            </div>
            <span class="badge badge-sent">${e.tagBadge}</span>
          </div>
          <pre style="margin-top:16px;background:var(--bg-soft);border:1px solid var(--border-soft);border-radius:8px;padding:16px;white-space:pre-wrap;font-family:var(--font-mono);font-size:13px;color:var(--muted);">${e.body}</pre>
        </div>
      `).join('')}
    </div>
  `;
}
function openCreateEmailModal(){
  openModal(`
    <div class="modal-head"><h3>Create Email Template</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Name</label><input class="input" id="neName" placeholder="e.g. Second Follow-Up"></div>
      <div class="field"><label>Subject</label><input class="input" id="neSubject" placeholder="Following up — {{proposalTitle}}"></div>
      <div class="field"><label>Body</label><textarea class="input" id="neBody" rows="7" placeholder="Hi {{leadName}}, ..."></textarea></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNewEmailTemplate()">Save</button></div>
  `);
}
function saveNewEmailTemplate(){
  const name = document.getElementById('neName').value.trim();
  if(!name){ toast('Name is required'); return; }
  DB.emailTemplates.push({ id: uid('email'), name, tagBadge:'Custom', subject: document.getElementById('neSubject').value, body: document.getElementById('neBody').value });
  saveDB(DB); closeModal(); toast('Email template saved'); renderEmailTemplates();
}
function openStandaloneAIGenerator(){
  const options = DB.proposals.map(p=>`<option value="${p.id}">${p.title} — ${p.leadName}</option>`).join('');
  openModal(`
    <div class="modal-head"><h3>${I.sparkle} AI Follow-up Generator</h3><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Proposal</label><select class="input" id="fuProposal" onchange="regenFollowUp(this.value)">${options}</select></div>
      <div class="field">
        <label>Tone</label>
        <select class="input" id="fuTone" onchange="regenFollowUp(document.getElementById('fuProposal').value)">
          <option value="friendly">Friendly check-in</option>
          <option value="direct">Direct — ask for next step</option>
          <option value="urgent">Urgent — pricing expiring</option>
        </select>
      </div>
      <div class="field"><label>Subject</label><input class="input" id="fuSubject"></div>
      <div class="field"><label>Body</label><textarea class="input mono" id="fuBody" rows="9"></textarea></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-primary" onclick="copyFollowUp()">${I.copy} Copy email</button></div>
  `);
  if(DB.proposals.length) regenFollowUp(DB.proposals[0].id);
}

/* ===========================================================
   ANALYTICS
=========================================================== */
function renderAnalytics(){
  const won = DB.proposals.filter(p=>p.status==='accepted');
  const sentCount = DB.proposals.filter(p=>p.status!=='draft').length || 1;
  const acceptanceRate = Math.round((won.length / sentCount) * 100);
  const avgDeal = won.length ? Math.round(won.reduce((s,p)=>s+p.amount,0)/won.length) : 0;
  const totalRevenue = won.reduce((s,p)=>s+p.amount,0);
  const avgAccept = won.length ? Math.round(won.reduce((s,p)=> s + ((p.signature? p.signature.signedAt : Date.now()) - p.sentAt)/86400000, 0)/won.length) : 0;

  const stageOrder = ['draft','sent','viewed','accepted','rejected'];
  const stageLabels = { draft:'Draft', sent:'Sent', viewed:'Viewed', accepted:'Accepted', rejected:'Rejected' };
  const counts = stageOrder.map(s=>DB.proposals.filter(p=>p.status===s).length);
  const max = Math.max(1,...counts);

  const byIndustry = {};
  DB.proposals.forEach(p=>{ const t = DB.templates.find(t=>t.name===p.title); const tag = t? t.tag : 'Other'; byIndustry[tag]=(byIndustry[tag]||0)+p.amount; });
  const industryEntries = Object.entries(byIndustry).length ? Object.entries(byIndustry) : [['Services', totalRevenue||1]];

  app.innerHTML = `
    <div class="page-head"><div><h1>Analytics</h1><p class="desc">Performance insights across your entire pipeline.</p></div></div>
    <div class="stat-grid">
      ${statCard('Acceptance Rate', acceptanceRate+'%', I.check, 'live')}
      ${statCard('Avg Deal Value', fmtMoney(avgDeal), I.analytics, 'live')}
      ${statCard('Total Revenue', fmtMoney(totalRevenue), I.analytics, 'live')}
      ${statCard('Time to Accept', avgAccept+' days', I.email, 'live')}
    </div>
    <div class="section-grid">
      <div class="card">
        <div class="card-title">Conversion Funnel</div>
        <div class="card-body">
          ${stageOrder.map((s,i)=>`
            <div class="bar-row">
              <div class="bar-label">${stageLabels[s]}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6,(counts[i]/max)*100)}%">${counts[i]}</div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Revenue by Category</div>
        <div class="card-body" style="display:flex;gap:24px;align-items:center;">
          ${donutSVG(industryEntries)}
          <div class="donut-legend">
            ${industryEntries.map((e,i)=>`<div class="item"><span class="swatch" style="background:${donutColors[i%donutColors.length]}"></span>${e[0]} · ${fmtMoney(e[1])}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Proposal Performance</div>
      <table>
        <thead><tr><th>Proposal</th><th>Status</th><th>Views</th><th>Last viewed</th><th>Signed</th><th>Paid</th></tr></thead>
        <tbody>
          ${DB.proposals.map(p=>`
            <tr style="cursor:pointer" onclick="location.hash='#/proposals/${p.id}'">
              <td class="cell-primary">${p.title}</td>
              <td>${proposalStatusBadge(p)}</td>
              <td class="mono">${p.views.length}</td>
              <td class="cell-muted">${p.views.length ? timeAgo(p.views[p.views.length-1].ts) : '—'}</td>
              <td>${p.signature ? `<span class="badge badge-signed">signed</span>` : '—'}</td>
              <td>${p.paid ? `<span class="badge badge-paid">paid</span>` : '—'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}
const donutColors = ['#6366f1','#a78bfa','#818cf8','#34d399','#fbbf24'];
function donutSVG(entries){
  const total = entries.reduce((s,e)=>s+e[1],0) || 1;
  const r=70, cx=90, cy=90, sw=26;
  let angle = -90;
  const circumference = 2*Math.PI*r;
  const segs = entries.map((e,i)=>{
    const frac = e[1]/total;
    const dash = frac*circumference;
    const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${donutColors[i%donutColors.length]}" stroke-width="${sw}" stroke-dasharray="${dash} ${circumference-dash}" stroke-dashoffset="${-((angle+90)/360)*circumference}" transform="rotate(-90 ${cx} ${cy})"/>`;
    angle += frac*360;
    return seg;
  }).join('');
  return `<svg width="180" height="180" viewBox="0 0 180 180" style="flex-shrink:0;">${segs}</svg>`;
}

/* ===========================================================
   SETTINGS
=========================================================== */
let settingsTab = 'branding';
function renderSettings(){
  app.innerHTML = `
    <div class="page-head"><div><h1>Settings</h1><p class="desc">Manage your workspace preferences.</p></div></div>
    <div class="tabs">
      <div class="tab ${settingsTab==='branding'?'active':''}" onclick="switchSettingsTab('branding')">Branding</div>
      <div class="tab ${settingsTab==='team'?'active':''}" onclick="switchSettingsTab('team')">Team</div>
      <div class="tab ${settingsTab==='integrations'?'active':''}" onclick="switchSettingsTab('integrations')">Integrations</div>
    </div>
    <div id="settingsPane"></div>
  `;
  paintSettingsPane();
}
function switchSettingsTab(t){ settingsTab = t; renderSettings(); }
function paintSettingsPane(){
  const pane = document.getElementById('settingsPane');
  const s = DB.settings;
  if(settingsTab==='branding'){
    pane.innerHTML = `
      <div class="card card-pad" style="max-width:640px;">
        <div style="font-family:var(--font-display);font-weight:600;font-size:17px;">Branding Settings</div>
        <p class="cell-muted" style="margin-top:6px;">Customize how your proposals look to clients.</p>
        <div class="divider"></div>
        <div class="field"><label>Company Name</label><input class="input" id="stCompany" value="${s.companyName}"></div>
        <div class="field">
          <label>Primary Color (Hex)</label>
          <div style="display:flex;gap:10px;">
            <input class="input" id="stColor" value="${s.primaryColor}" style="flex:1;">
            <input type="color" id="stColorPick" value="${s.primaryColor}" style="width:46px;height:44px;border-radius:8px;border:1px solid var(--border);background:none;padding:2px;">
          </div>
        </div>
        <div class="field"><label>Custom Domain</label><input class="input" id="stDomain" value="${s.customDomain}"></div>
        <div class="field">
          <label>Logo</label>
          <input type="file" id="stLogo" accept="image/*" class="input">
          ${s.logoDataUrl ? `<img src="${s.logoDataUrl}" style="height:40px;margin-top:10px;border-radius:6px;">` : ''}
        </div>
        <button class="btn btn-primary" onclick="saveBranding()">Save Changes</button>
      </div>
    `;
    document.getElementById('stColorPick').addEventListener('input', e=>{ document.getElementById('stColor').value = e.target.value; });
  }
  if(settingsTab==='team'){
    pane.innerHTML = `
      <div class="card card-pad" style="max-width:680px;">
        <div class="flex-between">
          <div><div style="font-family:var(--font-display);font-weight:600;font-size:17px;">Team Members</div><p class="cell-muted" style="margin-top:6px;">Invite teammates and control who can approve large proposals.</p></div>
        </div>
        <div class="divider"></div>
        ${s.team.map(m=>`
          <div class="flex-between" style="padding:12px 0;border-bottom:1px solid var(--border-soft);">
            <div><div class="cell-primary">${m.name}</div><div class="cell-muted">${m.email}</div></div>
            <div style="display:flex;gap:10px;align-items:center;">
              <span class="chip">${m.role}</span>
              ${m.role!=='Owner' ? `<button class="icon-btn" onclick="removeTeamMember('${m.id}')">${I.trash}</button>` : ''}
            </div>
          </div>
        `).join('')}
        <div style="display:flex;gap:10px;margin-top:18px;">
          <input class="input" id="tmEmail" placeholder="teammate@company.com" style="flex:1;">
          <select class="input" id="tmRole" style="width:140px;"><option>Editor</option><option>Viewer</option></select>
          <button class="btn btn-primary" onclick="inviteTeamMember()">Invite</button>
        </div>

        <div class="divider"></div>
        <div class="flex-between">
          <div>
            <div class="cell-primary">Require approval on large proposals</div>
            <div class="cell-muted">Proposals over the threshold need Owner sign-off before sending.</div>
          </div>
          <label class="checkbox-row"><input type="checkbox" id="reqApproval" ${s.requireApproval?'checked':''}> <span class="cell-muted">Enabled</span></label>
        </div>
        <div class="field" style="margin-top:14px;max-width:220px;"><label>Approval threshold</label><input class="input" id="approvalThreshold" type="number" value="${s.approvalThreshold}"></div>
        <button class="btn btn-primary" onclick="saveApprovalSettings()">Save Changes</button>
      </div>
    `;
  }
  if(settingsTab==='integrations'){
    const crms = [
      { key:'hubspot', name:'HubSpot', desc:'Sync leads and deals into your HubSpot CRM automatically.' },
      { key:'pipedrive', name:'Pipedrive', desc:'Push new leads and proposal status changes to Pipedrive.' },
      { key:'salesforce', name:'Salesforce', desc:'Two-way sync of contacts, opportunities, and proposal status.' },
    ];
    pane.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
        ${crms.map(c=>`
          <div class="card card-pad">
            <div class="flex-between">
              <div style="font-family:var(--font-display);font-weight:600;font-size:16px;">${c.name}</div>
              ${s.integrations[c.key] ? `<span class="badge badge-won">connected</span>` : ''}
            </div>
            <p class="cell-muted" style="margin-top:10px;min-height:56px;">${c.desc}</p>
            <button class="btn ${s.integrations[c.key]?'btn-danger':'btn-primary'} btn-sm" style="width:100%;justify-content:center;" onclick="toggleIntegration('${c.key}')">
              ${s.integrations[c.key] ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        `).join('')}
      </div>
      <p class="cell-muted" style="margin-top:18px;">Connecting opens an OAuth flow in production; this demo simulates the connected state locally.</p>
    `;
  }
}
function saveBranding(){
  DB.settings.companyName = document.getElementById('stCompany').value;
  DB.settings.primaryColor = document.getElementById('stColor').value;
  DB.settings.customDomain = document.getElementById('stDomain').value;
  const file = document.getElementById('stLogo').files[0];
  const finish = () => { saveDB(DB); toast('Branding saved'); renderSettings(); };
  if(file){
    const reader = new FileReader();
    reader.onload = e => { DB.settings.logoDataUrl = e.target.result; finish(); };
    reader.readAsDataURL(file);
  } else finish();
}
function inviteTeamMember(){
  const email = document.getElementById('tmEmail').value.trim();
  const role = document.getElementById('tmRole').value;
  if(!email){ toast('Enter an email to invite'); return; }
  DB.settings.team.push({ id: uid('team'), name: email.split('@')[0], email, role });
  saveDB(DB); toast('Invite sent to '+email); renderSettings();
}
function removeTeamMember(id){
  DB.settings.team = DB.settings.team.filter(m=>m.id!==id);
  saveDB(DB); renderSettings();
}
function saveApprovalSettings(){
  DB.settings.requireApproval = document.getElementById('reqApproval').checked;
  DB.settings.approvalThreshold = Number(document.getElementById('approvalThreshold').value)||0;
  saveDB(DB); toast('Approval settings saved');
}
function toggleIntegration(key){
  DB.settings.integrations[key] = !DB.settings.integrations[key];
  saveDB(DB); toast((DB.settings.integrations[key]?'Connected to ':'Disconnected from ') + key[0].toUpperCase()+key.slice(1));
  renderSettings();
}

/* ---------------- misc ---------------- */
function doResetDemo(){
  DB = resetDB(); toast('Demo data reset'); router();
}
