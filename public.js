/* ===========================================================
   ProposalPilot AI — public proposal viewer (no login required)
   Opened via proposal.html?id=<proposalId>
=========================================================== */

const params = new URLSearchParams(location.search);
const proposalId = params.get('id');
let DB = loadDB();
const root = document.getElementById('pubRoot');

const check = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const lock = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.7"/></svg>`;

function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${check}<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s ease'; setTimeout(()=>el.remove(),300); }, 3200);
}

function getProposal(){ return DB.proposals.find(p=>p.id===proposalId); }

function recordView(){
  const p = getProposal();
  if(!p) return;
  p.views.push({ ts: Date.now() });
  if(p.status === 'sent') p.status = 'viewed';
  saveDB(DB);
}

function render(){
  const p = getProposal();
  const s = DB.settings;

  if(!p){
    root.innerHTML = `
      <div class="pub-header"><div class="pub-logo">${brandMark(s)} ${s.companyName}</div></div>
      <div class="doc-card"><div class="empty" style="padding:80px 26px;"><h3>Proposal not found</h3><p>This link may be out of date. Contact the sender for a new one.</p></div></div>
    `;
    return;
  }

  const total = proposalTotal(p);
  const deposit = Math.round(total * 0.3 / 50) * 50;
  const expired = Date.now() > p.validUntil && !p.signature;

  root.innerHTML = `
    <div class="pub-header">
      <div class="pub-logo">${brandMark(s)} ${s.companyName}</div>
      <div class="pub-badge">${lock} Secure client view</div>
    </div>

    <div class="doc-card">
      <div class="doc-head">
        <span class="kicker">Proposal</span>
        <h1>${p.title}</h1>
        <div class="meta">
          <span>Prepared for <strong style="color:var(--text)">${p.leadName}</strong>${p.company ? ' · '+p.company : ''}</span>
          <span>Valid until ${fmtDate(p.validUntil)}</span>
        </div>
      </div>

      <div class="doc-body">
        ${expired ? `<div class="card" style="background:var(--warn-bg);border-color:rgba(251,191,36,0.3);padding:14px 18px;margin-bottom:26px;color:var(--warn);font-size:13.5px;">This proposal's pricing window has expired. Contact ${s.companyName} for an updated quote.</div>` : ''}

        <table>
          <thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
          <tbody>
            ${p.lineItems.map(li=>`<tr><td>${li.desc}</td><td class="mono">${li.qty}</td><td class="mono">${fmtMoney(li.price)}</td><td class="mono">${fmtMoney(li.qty*li.price)}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="flex-between" style="padding-top:20px;font-family:var(--font-display);font-weight:700;font-size:20px;">
          <span>Total</span><span>${fmtMoney(total)}</span>
        </div>

        <div class="divider"></div>

        ${renderSignSection(p, expired)}

        <div class="divider"></div>

        ${renderPaySection(p, deposit, expired)}
      </div>
    </div>
    <p class="cell-muted" style="text-align:center;margin-top:22px;">Viewing and accepting this proposal does not require an account.</p>
  `;
}

function brandMark(s){
  if(s.logoDataUrl) return `<img src="${s.logoDataUrl}" style="height:28px;border-radius:6px;">`;
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 17 4.5 17 11C17 13.5 16 15.5 16 15.5L12 19L8 15.5C8 15.5 7 13.5 7 11C7 4.5 12 2 12 2Z" stroke="${s.primaryColor}" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2" stroke="${s.primaryColor}" stroke-width="1.7"/></svg>`;
}

function renderSignSection(p, expired){
  if(p.signature){
    return `
      <div class="signed-box">${check} Signed by ${p.signature.name} on ${fmtDate(p.signature.signedAt)}</div>
    `;
  }
  if(expired){
    return `<p class="cell-muted">Signing is disabled because this proposal has expired.</p>`;
  }
  return `
    <div class="kicker">Accept &amp; sign</div>
    <div class="sig-pad">
      <label style="font-size:13px;color:var(--muted);">Type your full name to sign</label>
      <input class="input" id="sigName" placeholder="Your full name" style="max-width:320px;margin:12px auto 0;">
      <div class="sig-preview" id="sigPreview"></div>
    </div>
    <label class="checkbox-row" style="margin-top:16px;">
      <input type="checkbox" id="sigAgree">
      <span class="cell-muted">I have reviewed this proposal and agree to its terms and pricing.</span>
    </label>
    <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px;" onclick="signProposal()">Sign &amp; Accept Proposal</button>
  `;
}

function renderPaySection(p, deposit, expired){
  if(p.paid){
    return `<div class="signed-box">${check} Deposit of ${fmtMoney(deposit)} received — you're all set.</div>`;
  }
  if(!p.signature){
    return `<p class="cell-muted">Payment unlocks once the proposal is signed.</p>`;
  }
  if(expired) return '';
  return `
    <div class="kicker">Pay deposit to get started</div>
    <p class="cell-muted" style="margin-bottom:16px;">A 30% deposit of <strong style="color:var(--text)">${fmtMoney(deposit)}</strong> secures your project start date.</p>
    <button class="stripe-btn" onclick="openCheckout(${deposit})">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="white" fill-opacity="0.15"/><path d="M11.6 8.6c0-.6.5-.85 1.3-.85 1.15 0 2.6.35 3.75 1V5.4c-1.25-.5-2.5-.7-3.75-.7-3.05 0-5.1 1.6-5.1 4.25 0 4.15 5.7 3.5 5.7 5.3 0 .7-.6.95-1.45.95-1.25 0-2.85-.5-4.1-1.2v3.4c1.4.6 2.8.85 4.1.85 3.15 0 5.3-1.55 5.3-4.25 0-4.5-5.75-3.7-5.75-5.4Z" fill="white"/></svg>
      Pay ${fmtMoney(deposit)} deposit
    </button>
    <p class="cell-muted" style="text-align:center;margin-top:10px;">Payments processed securely via Stripe.</p>
  `;
}

/* signature preview as you type */
document.addEventListener('input', (e)=>{
  if(e.target && e.target.id === 'sigName'){
    const el = document.getElementById('sigPreview');
    if(el) el.textContent = e.target.value;
  }
});

function signProposal(){
  const name = document.getElementById('sigName').value.trim();
  const agree = document.getElementById('sigAgree').checked;
  if(!name){ toast('Type your name to sign'); return; }
  if(!agree){ toast('Please confirm you agree to the terms'); return; }
  const p = getProposal();
  p.signature = { name, signedAt: Date.now() };
  p.status = 'accepted';
  saveDB(DB);
  toast('Proposal signed!');
  render();
}

function openCheckout(amount){
  const overlay = document.createElement('div');
  overlay.className = 'checkout-overlay';
  overlay.id = 'checkoutOverlay';
  overlay.innerHTML = `
    <div class="checkout-card">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700;margin-bottom:4px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#635bff"/><path d="M11.6 8.6c0-.6.5-.85 1.3-.85 1.15 0 2.6.35 3.75 1V5.4c-1.25-.5-2.5-.7-3.75-.7-3.05 0-5.1 1.6-5.1 4.25 0 4.15 5.7 3.5 5.7 5.3 0 .7-.6.95-1.45.95-1.25 0-2.85-.5-4.1-1.2v3.4c1.4.6 2.8.85 4.1.85 3.15 0 5.3-1.55 5.3-4.25 0-4.5-5.75-3.7-5.75-5.4Z" fill="white"/></svg>
        <span style="color:#0a0c12;">Pay ${fmtMoney(amount)}</span>
      </div>
      <p style="color:#6b7280;font-size:13px;margin-bottom:18px;">Demo checkout — no real charge will be made.</p>
      <label>Card number</label>
      <input placeholder="4242 4242 4242 4242" id="ckCard">
      <div style="display:flex;gap:10px;margin-top:12px;">
        <div style="flex:1;"><label>Expiry</label><input placeholder="12/29"></div>
        <div style="flex:1;"><label>CVC</label><input placeholder="123"></div>
      </div>
      <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:20px;" onclick="confirmPayment(${amount})">Pay ${fmtMoney(amount)}</button>
      <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:10px;" onclick="document.getElementById('checkoutOverlay').remove()">Cancel</button>
    </div>
  `;
  document.body.appendChild(overlay);
}
function confirmPayment(amount){
  const p = getProposal();
  p.paid = true;
  saveDB(DB);
  document.getElementById('checkoutOverlay').remove();
  toast('Payment received — thank you!');
  render();
}

recordView();
render();
