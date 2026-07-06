/* ===========================================================
   PropelAI — shared data layer
   Everything here is a stand-in for a real backend. It persists
   to localStorage so the demo feels alive across the dashboard
   and the public proposal page. See README.md for what a real
   backend would replace each piece with.
=========================================================== */

const DB_KEY = 'propelai_db_v1';

function uid(prefix){ return prefix + '_' + Math.random().toString(36).slice(2,9); }

function seedDB(){
  const now = Date.now();
  const day = 86400000;
  return {
    settings: {
      companyName: 'My Company',
      primaryColor: '#6366f1',
      customDomain: 'proposals.yourcompany.com',
      logoDataUrl: null,
      approvalThreshold: 10000,
      requireApproval: true,
      team: [
        { id: uid('team'), name: 'Michael Airo', email: 'michael@domineultra.com', role: 'Owner' },
        { id: uid('team'), name: 'Priya Nandan', email: 'priya@domineultra.com', role: 'Editor' },
      ],
      integrations: {
        hubspot: false,
        pipedrive: false,
        salesforce: false,
      }
    },
    leads: [
      { id: uid('lead'), name: 'Alex Rivera', company: 'TechStart Solutions', status: 'won', value: 20000, created: now - 3*day },
      { id: uid('lead'), name: 'Mike Chen', company: 'Urban Eats Restaurant Group', status: 'proposal_sent', value: 8500, created: now - 3*day },
      { id: uid('lead'), name: 'Jessica Park', company: 'Bloom Real Estate', status: 'negotiation', value: 15000, created: now - 3*day },
      { id: uid('lead'), name: 'Sarah Johnson', company: 'ABC Fitness', status: 'new', value: 5000, created: now - 3*day },
      { id: uid('lead'), name: 'David Kim', company: 'HealthBridge Clinics', status: 'contacted', value: 12000, created: now - 3*day },
      { id: uid('lead'), name: 'Maria Garcia', company: 'Luna Coffee Roasters', status: 'won', value: 7500, created: now - 3*day },
      { id: uid('lead'), name: 'Tom Wilson', company: 'Apex Consulting Group', status: 'lost', value: 25000, created: now - 3*day },
      { id: uid('lead'), name: 'Emma Davis', company: 'GreenPath Logistics', status: 'new', value: 18000, created: now - 3*day },
    ],
    proposals: [
      {
        id: 'prop_demo1', title: 'Loyalty App Development', leadName: 'Mike Chen', company: 'Urban Eats Restaurant Group',
        status: 'sent', amount: 8500, validUntil: now + 14*day, sentAt: now - 2*day,
        lineItems: [
          { desc: 'Mobile loyalty app (iOS + Android)', qty: 1, price: 6500 },
          { desc: 'Points & rewards engine', qty: 1, price: 1500 },
          { desc: '30-day post-launch support', qty: 1, price: 500 },
        ],
        views: [{ ts: now - day - 3600000 }, { ts: now - 3600000 }],
        signature: null, paid: false, approvalStatus: 'approved',
      },
      {
        id: 'prop_demo2', title: 'CRM Integration Suite', leadName: 'Jessica Park', company: 'Bloom Real Estate',
        status: 'viewed', amount: 15000, validUntil: now + 19*day, sentAt: now - 4*day,
        lineItems: [
          { desc: 'CRM discovery & data migration', qty: 1, price: 4000 },
          { desc: 'Custom pipeline automation', qty: 1, price: 8000 },
          { desc: 'Team training', qty: 1, price: 3000 },
        ],
        views: [{ ts: now - 2*day }], signature: null, paid: false, approvalStatus: 'approved',
      },
      {
        id: 'prop_demo3', title: 'E-Commerce Platform', leadName: 'Maria Garcia', company: 'Luna Coffee Roasters',
        status: 'accepted', amount: 7500, validUntil: now - 5*day, sentAt: now - 20*day,
        lineItems: [
          { desc: 'Storefront design & build', qty: 1, price: 5000 },
          { desc: 'Payment + shipping integration', qty: 1, price: 2500 },
        ],
        views: [{ ts: now - 18*day }, { ts: now - 17*day }, { ts: now - 16*day }],
        signature: { name: 'Maria Garcia', signedAt: now - 16*day }, paid: true, approvalStatus: 'approved',
      },
      {
        id: 'prop_demo4', title: 'Membership Portal', leadName: 'Sarah Johnson', company: 'ABC Fitness',
        status: 'draft', amount: 5000, validUntil: now + 35*day, sentAt: null,
        lineItems: [ { desc: 'Member portal + billing', qty: 1, price: 5000 } ],
        views: [], signature: null, paid: false, approvalStatus: 'not_required',
      },
      {
        id: 'prop_demo5', title: 'Digital Presence Package', leadName: 'Alex Rivera', company: 'TechStart Solutions',
        status: 'viewed', amount: 20000, validUntil: now + 25*day, sentAt: now - 5*day,
        lineItems: [
          { desc: 'Brand + website redesign', qty: 1, price: 9000 },
          { desc: 'SEO & content strategy (3mo)', qty: 1, price: 6000 },
          { desc: 'Paid media setup', qty: 1, price: 5000 },
        ],
        views: [{ ts: now - 3*day }, { ts: now - day }],
        signature: null, paid: false, approvalStatus: 'pending',
      },
    ],
    templates: [
      { id: uid('tpl'), name: 'SaaS Product Development', tag: 'Technology', desc: 'Comprehensive proposal template for SaaS companies', uses: 24, isDefault: true },
      { id: uid('tpl'), name: 'Digital Marketing Campaign', tag: 'Marketing', desc: 'Full-funnel digital marketing proposal', uses: 18, isDefault: true },
      { id: uid('tpl'), name: 'Brand Identity Design', tag: 'Design', desc: 'Logo, brand guidelines, and visual identity', uses: 12, isDefault: false },
      { id: uid('tpl'), name: 'Restaurant Website & Ordering', tag: 'Food & Beverage', desc: 'Restaurant digital presence with online ordering', uses: 9, isDefault: false },
      { id: uid('tpl'), name: 'E-Commerce Store', tag: 'Retail', desc: 'Complete e-commerce solution with payment processing', uses: 31, isDefault: true },
      { id: uid('tpl'), name: 'Consulting Engagement', tag: 'Consulting', desc: 'Strategic consulting proposal template', uses: 7, isDefault: false },
      { id: uid('tpl'), name: 'Healthcare Patient Portal', tag: 'Healthcare', desc: 'HIPAA-aware patient portal & scheduling proposal', uses: 4, isDefault: false },
      { id: uid('tpl'), name: 'Real Estate Listing Site', tag: 'Real Estate', desc: 'IDX-integrated listings site with lead capture', uses: 6, isDefault: false },
    ],
    emailTemplates: [
      { id: uid('email'), name: 'Initial Follow-Up', tagBadge: 'Follow Up', subject: 'Following up on your proposal — {{proposalTitle}}',
        body: "Hi {{leadName}},\n\nI wanted to follow up on the proposal I sent last week for \"{{proposalTitle}}\". I'd love to hear your thoughts and answer any questions you might have.\n\nFeel free to reply to this email or book a quick call at your convenience.\n\nBest regards" },
      { id: uid('email'), name: 'Proposal Sent Notification', tagBadge: 'Proposal Sent', subject: 'Your proposal is ready — {{proposalTitle}}',
        body: "Hi {{leadName}},\n\nGreat news! I've prepared a detailed proposal for \"{{proposalTitle}}\" just for you. You can review it by clicking the link below.\n\n[View Proposal]\n\nThe proposal includes a full breakdown of deliverables, timeline, and pricing. Let me know if you have any questions!\n\nLooking forward to working together." },
      { id: uid('email'), name: 'Acceptance Thank You', tagBadge: 'Proposal Accepted', subject: 'Welcome aboard! — {{proposalTitle}}',
        body: "Hi {{leadName}},\n\nThank you so much for accepting the proposal for \"{{proposalTitle}}\"! We're excited to get started.\n\nOur team will reach out within 24 hours to schedule a kickoff call and discuss next steps.\n\nWelcome to the family!" },
      { id: uid('email'), name: 'Urgent Follow-Up', tagBadge: 'Reminder', subject: 'Action needed: {{proposalTitle}} expires soon',
        body: "Hi {{leadName}},\n\nI wanted to reach out because your proposal for \"{{proposalTitle}}\" is expiring soon. The pricing and availability reflected are only guaranteed until the expiry date.\n\nI'd hate for you to miss out. Please let me know if you'd like to discuss any last-minute questions.\n\nBest regards" },
    ],
  };
}

function loadDB(){
  const raw = localStorage.getItem(DB_KEY);
  if(!raw){
    const seeded = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try{ return JSON.parse(raw); }
  catch(e){ const seeded = seedDB(); localStorage.setItem(DB_KEY, JSON.stringify(seeded)); return seeded; }
}

function saveDB(db){ localStorage.setItem(DB_KEY, JSON.stringify(db)); }

function resetDB(){ localStorage.removeItem(DB_KEY); return loadDB(); }

function fmtMoney(n){
  return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function fmtDate(ts){
  if(!ts) return '—';
  const d = new Date(ts);
  return (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
}

function fmtDateTime(ts){
  if(!ts) return '—';
  const d = new Date(ts);
  return fmtDate(ts) + ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function timeAgo(ts){
  if(!ts) return '—';
  const diff = Date.now() - ts;
  const mins = Math.floor(diff/60000);
  if(mins < 1) return 'just now';
  if(mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins/60);
  if(hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs/24);
  return days + 'd ago';
}

function proposalTotal(p){
  return p.lineItems.reduce((sum, li) => sum + (li.qty * li.price), 0);
}

/* ---- Mock "AI" helpers -------------------------------------------------
   These simulate model output with deterministic local logic so the demo
   works fully offline. In production, replace with a real call to the
   Claude API (see README.md) using the proposal's scope as context.
------------------------------------------------------------------------ */

function aiSuggestPricing(scopeText, lineItems){
  const base = lineItems.reduce((s,li)=> s + li.qty*li.price, 0) || 4000;
  const complexity = Math.min(1.4, 0.9 + (scopeText.length / 600));
  const suggested = Math.round((base * complexity) / 50) * 50;
  const low = Math.round(suggested * 0.88 / 50) * 50;
  const high = Math.round(suggested * 1.15 / 50) * 50;
  return {
    suggested, low, high,
    reasoning: `Based on similar ${lineItems.length}-item engagements and the scope described, most agencies price this between ${fmtMoney(low)}–${fmtMoney(high)}. ${fmtMoney(suggested)} balances competitiveness with margin for revisions.`
  };
}

function aiFollowUpEmail(proposal, tone){
  const daysSinceSent = proposal.sentAt ? Math.floor((Date.now()-proposal.sentAt)/86400000) : 0;
  const openedLine = proposal.views && proposal.views.length
    ? `I saw you had a chance to look over it${proposal.views.length>1 ? ' a couple of times' : ''} — `
    : `I know inboxes get busy, so just floating this back to the top — `;
  const tones = {
    friendly: {
      subject: `Quick check-in on ${proposal.title}`,
      body: `Hi ${proposal.leadName},\n\n${openedLine}wanted to see if you had any questions on the ${proposal.title} proposal I sent ${daysSinceSent || 'a few'} day${daysSinceSent===1?'':'s'} ago.\n\nHappy to hop on a quick call this week if it's easier to talk through the scope or pricing.\n\nLooking forward to hearing your thoughts,\n${proposal.company ? '' : ''}`
    },
    direct: {
      subject: `${proposal.title} — next steps?`,
      body: `Hi ${proposal.leadName},\n\nFollowing up on the ${proposal.title} proposal (${fmtMoney(proposal.amount)}). Are you able to move forward this week, or is there a blocker I can help clear up?\n\nLet me know and I'll get things moving right away.`
    },
    urgent: {
      subject: `${proposal.title} — pricing valid until ${fmtDate(proposal.validUntil)}`,
      body: `Hi ${proposal.leadName},\n\n${openedLine}wanted to flag that the pricing in the ${proposal.title} proposal is only guaranteed until ${fmtDate(proposal.validUntil)}.\n\nIf you'd like to lock it in, just reply here or sign directly from the proposal link — happy to answer anything first.`
    }
  };
  return tones[tone] || tones.friendly;
}
