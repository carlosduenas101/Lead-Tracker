// ════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════
const AUTH_USER = 'admin';
const AUTH_PASS = 'leadlog2026';

function doLogin(){
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  if(u === AUTH_USER && p === AUTH_PASS){
    sessionStorage.setItem('leadlog_auth','1');
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app-wrapper').style.display='block';
    err.style.display='none';
    assignColors();populateDropdowns();renderDash();renderTable();
  } else {
    err.style.display='block';
    document.getElementById('login-pass').value='';
    document.getElementById('login-pass').focus();
  }
}

function doLogout(){
  sessionStorage.removeItem('leadlog_auth');
  document.getElementById('app-wrapper').style.display='none';
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('login-user').value='';
  document.getElementById('login-pass').value='';
  document.getElementById('login-error').style.display='none';
  document.getElementById('login-user').focus();
}

// ════════════════════════════════════════════
//  DATA — DEFAULT LEADS (seeded on first load)
// ════════════════════════════════════════════
const DEFAULT_LEADS = [
  {id:1,DATE:"2/16/2026",NAME:"Jany",PHONE:"832-202-4176",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 2beds",CONTACTED:"Y",APPT:"Y",SHOWING:"N",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Follow up on 3/8 Morning",MONTH:"2026-02"},
  {id:2,DATE:"2/16/2026",NAME:"Ras",PHONE:"346-846-6309",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 2beds",CONTACTED:"N",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"$0.00",NOTES:"Hung up on me-Contacted twice",MONTH:"2026-02"},
  {id:3,DATE:"2/16/2026",NAME:"Aniya",PHONE:"504-952-6110",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 1bed",CONTACTED:"Y",APPT:"Y",SHOWING:"N",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Reached out again on 3/7",MONTH:"2026-02"},
  {id:4,DATE:"2/16/2026",NAME:"Mr.Nagresha",PHONE:"832-531-1772",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Follow up 3/10",MONTH:"2026-02"},
  {id:5,DATE:"2/17/2026",NAME:"Melissa RE Agent",PHONE:"503-501-6864",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Working on offer for Crane",MONTH:"2026-02"},
  {id:6,DATE:"2/17/2026",NAME:"Junaid Heibel",PHONE:"215.439.7460",SOURCE:"OTHER",PROPERTY:"11314 Courtshire Rd(SALE)",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer, sent text msg",MONTH:"2026-02"},
  {id:7,DATE:"2/17/2026",NAME:"Shantavia Stocker",PHONE:"(346) 747-4548",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Asked for more info",MONTH:"2026-02"},
  {id:8,DATE:"2/17/2026",NAME:"Pamela Price",PHONE:"(832) 675-4630",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Phone out of service",MONTH:"2026-02"},
  {id:9,DATE:"2/17/2026",NAME:"Veronica Dohrman",PHONE:"8328788865",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Showing Wed 2/18 at 5:30PM",MONTH:"2026-02"},
  {id:10,DATE:"2/17/2026",NAME:"Yao Chen",PHONE:"9024411192",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Information Sent",MONTH:"2026-02"},
  {id:11,DATE:"2/17/2026",NAME:"Cadet",PHONE:"307-453-4534",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Not End Buyer",MONTH:"2026-02"},
  {id:12,DATE:"2/17/2026",NAME:"Deborah Bacon",PHONE:"(906) 235-5947",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"$600-650/mo",MONTH:"2026-02"},
  {id:13,DATE:"2/17/2026",NAME:"Deana Pierson",PHONE:"832-551-8446",SOURCE:"ZILLOW",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-02"},
  {id:14,DATE:"2/17/2026",NAME:"Ivan Bennett",PHONE:"409-295-6050",SOURCE:"ZILLOW",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Showing Tue 2/24 at 9:00AM",MONTH:"2026-02"},
  {id:15,DATE:"2/18/2026",NAME:"Joshua Pettry",PHONE:"4193102264",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No Answer.Sent Text",MONTH:"2026-02"},
  {id:16,DATE:"2/18/2026",NAME:"Vidal Gabay",PHONE:"9546342870",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No Answer.Sent Text",MONTH:"2026-02"},
  {id:17,DATE:"2/18/2026",NAME:"Mary McNeil",PHONE:"(910) 619-5966",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No Answer.Sent Text",MONTH:"2026-02"},
  {id:18,DATE:"2/18/2026",NAME:"Alex Kurkowski",PHONE:"281-814-2028",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No Answer.Sent Information",MONTH:"2026-02"},
  {id:19,DATE:"2/18/2026",NAME:"Starling Heard",PHONE:"(757) 977-3845",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No Answer.Sent Text",MONTH:"2026-02"},
  {id:20,DATE:"2/18/2026",NAME:"Ken Tran",PHONE:"281-248-3109",SOURCE:"LoopNet",PROPERTY:"10401 S Mason Rd Building A",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Under negotiations",MONTH:"2026-02"},
  {id:21,DATE:"2/20/2026",NAME:"Ray Henry",PHONE:"(210) 794-2561",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 3",CONTACTED:"N",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Hung up on me-Contacted twice",MONTH:"2026-02"},
  {id:22,DATE:"2/20/2026",NAME:"Melissa",PHONE:"281-513-0077",SOURCE:"REFERRAL",PROPERTY:"6620 Lawndale",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Did not like the outside",MONTH:"2026-02"},
  {id:23,DATE:"2/25/2026",NAME:"Catherine",PHONE:"956-215-3740",SOURCE:"FB",PROPERTY:"6620 Lawndale #1",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Application sent/ghosted",MONTH:"2026-02"},
  {id:24,DATE:"2/25/2026",NAME:"Nelson",PHONE:"281-865-8565",SOURCE:"FB",PROPERTY:"6620 Lawndale",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Just browsing",MONTH:"2026-02"},
  {id:25,DATE:"2/25/2026",NAME:"Noemi",PHONE:"832-855-5504",SOURCE:"OTHER",PROPERTY:"6620 Lawndale",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Showing 2/25 at 6:15PM / Ghosted",MONTH:"2026-02"},
  {id:26,DATE:"2/25/2026",NAME:"Magali Acurio",PHONE:"346-392-3952",SOURCE:"LoopNet",PROPERTY:"10401 S Mason Rd Building A",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Looking for 600sqft",MONTH:"2026-02"},
  {id:27,DATE:"3/4/2026",NAME:"Andrew",PHONE:"708-724-9063",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:28,DATE:"3/4/2026",NAME:"Yat",PHONE:"256-559-8467",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Has 2 ESA Dogs",MONTH:"2026-03"},
  {id:29,DATE:"3/4/2026",NAME:"Genesis Barrientez",PHONE:"346-717-5084",SOURCE:"FB",PROPERTY:"9315 Ashville Drive Unit #B",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Looking for residential, has 2 dogs",MONTH:"2026-03"},
  {id:30,DATE:"3/4/2026",NAME:"Linda Lange",PHONE:"419-261-2012",SOURCE:"ZILLOW",PROPERTY:"315 8th Ave N unit 4",CONTACTED:"N",APPT:"N",SHOWING:"N",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Called again, still no answer",MONTH:"2026-03"},
  {id:31,DATE:"3/4/2026",NAME:"Aaron Smith",PHONE:"989-751-1884",SOURCE:"OTHER",PROPERTY:"5101 Crane St (SALE)",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Looking for seller financing",MONTH:"2026-03"},
  {id:32,DATE:"3/4/2026",NAME:"Ronald Gosselin",PHONE:"(201) 564-8471",SOURCE:"OTHER",PROPERTY:"315 8th Ave N unit 4",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:33,DATE:"3/4/2026",NAME:"Gabino Ramirez",PHONE:"406-679-5046",SOURCE:"ZILLOW",PROPERTY:"315 8th Ave N unit 4",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Already found something",MONTH:"2026-03"},
  {id:34,DATE:"3/4/2026",NAME:"william Hudson",PHONE:"(409) 259-0844",SOURCE:"OTHER",PROPERTY:"1633 Fourcade St",CONTACTED:"N",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:35,DATE:"3/4/2026",NAME:"Ashley Varnado",PHONE:"7139878283",SOURCE:"HAR",PROPERTY:"1633 Fourcade St",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:36,DATE:"3/4/2026",NAME:"kalisha wise",PHONE:"281-777-1673",SOURCE:"ZILLOW",PROPERTY:"6620 Lawndale",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Decided to apply to something different",MONTH:"2026-03"},
  {id:37,DATE:"3/4/2026",NAME:"Lucero Arguello",PHONE:"8324209875",SOURCE:"HAR",PROPERTY:"6621 Lawndale",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Apmt set for Tuesday 3/10",MONTH:"2026-03"},
  {id:38,DATE:"3/4/2026",NAME:"Claudia Saunders",PHONE:"407-925-3242",SOURCE:"LoopNet",PROPERTY:"10401 S Mason Rd Building A",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"$2500 Office space around Richmond",MONTH:"2026-03"},
  {id:39,DATE:"3/4/2026",NAME:"Vick",PHONE:"936-270-9910",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"Y",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Ghosted",MONTH:"2026-03"},
  {id:40,DATE:"3/4/2026",NAME:"Lana",PHONE:"727-853-4181",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 2beds",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Did not like the apartments",MONTH:"2026-03"},
  {id:41,DATE:"3/4/2026",NAME:"Jalen",PHONE:"404-984-6650",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 2beds",CONTACTED:"Y",APPT:"N",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Already got an apartment",MONTH:"2026-03"},
  {id:42,DATE:"3/4/2026",NAME:"Angeline",PHONE:"281-678-7223",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"N",CLOSED:"",COMMISSION:"",NOTES:"Has 2 dogs/Showing Eskridge 3/8",MONTH:"2026-03"},
  {id:43,DATE:"3/5/2026",NAME:"Matilda",PHONE:"832-562-7772",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 1beds",CONTACTED:"Y",APPT:"Y",SHOWING:"Y",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Had to check with boyfriend/No answer",MONTH:"2026-03"},
  {id:44,DATE:"3/5/2026",NAME:"Johnny",PHONE:"713-897-9748",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Showing 3/8 at 10AM",MONTH:"2026-03"},
  {id:45,DATE:"3/6/2026",NAME:"(Unknown)",PHONE:"601-402-6810",SOURCE:"REFERRAL",PROPERTY:"1/1 APMNT",CONTACTED:"Y",APPT:"Y",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Out of town/call back Thu 12th",MONTH:"2026-03"},
  {id:46,DATE:"3/6/2026",NAME:"Holly",PHONE:"832-875-2357",SOURCE:"REFERRAL",PROPERTY:"5718 Eskridge 2beds",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Wasn't looking in the area",MONTH:"2026-03"},
  {id:47,DATE:"3/6/2026",NAME:"Robert",PHONE:"737-701-2397",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"N",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Mid August",MONTH:"2026-03"},
  {id:48,DATE:"3/6/2026",NAME:"Rod",PHONE:"667-417-5863",SOURCE:"REFERRAL",PROPERTY:"1633 Fourcade St",CONTACTED:"Y",APPT:"Y",SHOWING:"N",APP:"",CLOSED:"",COMMISSION:"",NOTES:"Showing didn't happen",MONTH:"2026-03"},
  {id:49,DATE:"3/7/2026",NAME:"Celia Washington",PHONE:"404-808-8206",SOURCE:"HAR",PROPERTY:"6620 Lawndale St #2",CONTACTED:"Y",APPT:"Y",SHOWING:"N",APP:"N",CLOSED:"N",COMMISSION:"",NOTES:"Did not want to move forward. Altercation",MONTH:"2026-03"},
  {id:50,DATE:"3/7/2026",NAME:"JoNeisha McFarland",PHONE:"832-289-8234",SOURCE:"HAR",PROPERTY:"5718 Eskridge #6",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:51,DATE:"3/7/2026",NAME:"Vijay Singh",PHONE:"925.323.5865",SOURCE:"Crexi",PROPERTY:"11314 Courtshire Rd",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"},
  {id:52,DATE:"3/7/2026",NAME:"Braelon Hickmon",PHONE:"832-677-9924",SOURCE:"HAR",PROPERTY:"5718 Eskridge #9",CONTACTED:"N",APPT:"",SHOWING:"",APP:"",CLOSED:"",COMMISSION:"",NOTES:"No answer. Sent Text Msg",MONTH:"2026-03"}
];

function loadLeads() {
  try {
    const stored = localStorage.getItem('leadlog_leads');
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_LEADS));
}

function saveLeads() {
  try {
    localStorage.setItem('leadlog_leads', JSON.stringify(LEADS));
    localStorage.setItem('leadlog_nextId', String(nextId));
  } catch(e) {}
}

let LEADS = loadLeads();
let nextId = parseInt(localStorage.getItem('leadlog_nextId') || '0') || Math.max(...LEADS.map(l => l.id), 0) + 1;
let pendingImport = [];

// ════════════ PALETTE & HELPERS ════════════
const PALETTE = ['#5c78ff','#34d399','#f59e0b','#f472b6','#2dd4bf','#a78bfa','#fb923c','#60a5fa','#f87171','#4ade80'];
const SRC_COLORS = {};
function getSources(){ return [...new Set(LEADS.map(r=>r.SOURCE))].sort(); }
function assignColors(){
  const s=getSources(); s.forEach((src,i)=>{if(!SRC_COLORS[src])SRC_COLORS[src]=PALETTE[i%PALETTE.length];});
}
function parseDate(s){
  if(!s)return new Date(0);
  const p=s.split('/');
  if(p.length===3)return new Date(+p[2],+p[0]-1,+p[1]);
  const d=new Date(s); return isNaN(d)?new Date(0):d;
}
function dateToISO(s){
  const d=parseDate(s);
  if(!d||isNaN(d))return '';
  return d.toISOString().split('T')[0];
}
function isoToDate(s){return s?new Date(s):null;}
function monthFromDate(dateStr){
  const d=parseDate(dateStr);
  if(!d||isNaN(d))return '';
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}
function parseComm(s){
  if(!s)return 0;
  const v=parseFloat(s.replace(/[$,]/g,''));
  return isNaN(v)?0:v;
}
function toast(msg,type='t-info',dur=3000){
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  const ico=type==='t-success'?'✓':type==='t-error'?'✕':'ℹ';
  t.innerHTML=`<span>${ico}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(40px)';t.style.transition='all .3s';setTimeout(()=>t.remove(),300);},dur);
}

// ════════════ DROPDOWNS POPULATION ════════════
function populateDropdowns(){
  assignColors();
  const sources=getSources();
  const months=[...new Set(LEADS.map(r=>r.MONTH||monthFromDate(r.DATE)).filter(Boolean))].sort();
  ['dash-src','lead-src'].forEach(id=>{
    const el=document.getElementById(id); if(!el)return;
    const cur=el.value;
    while(el.options.length>1)el.remove(1);
    sources.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;el.appendChild(o);});
    el.value=cur;
  });
  ['dash-month','lead-month'].forEach(id=>{
    const el=document.getElementById(id); if(!el)return;
    const cur=el.value;
    while(el.options.length>1)el.remove(1);
    months.forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=fmtMonth(m);el.appendChild(o);});
    el.value=cur;
  });
}
function fmtMonth(m){
  if(!m)return m;
  const [y,mo]=m.split('-');
  const names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${names[+mo-1]} ${y}`;
}

// ════════════ FILTER HELPERS ════════════
function getDashData(){
  const from=isoToDate(document.getElementById('dash-from').value);
  const to=isoToDate(document.getElementById('dash-to').value);
  const src=document.getElementById('dash-src').value;
  const month=document.getElementById('dash-month').value;
  return LEADS.filter(r=>{
    const d=parseDate(r.DATE);
    if(from&&d<from)return false;
    if(to&&d>to)return false;
    if(src&&r.SOURCE!==src)return false;
    const rm=r.MONTH||monthFromDate(r.DATE);
    if(month&&rm!==month)return false;
    return true;
  });
}
function getAnData(){
  const from=isoToDate(document.getElementById('an-from').value);
  const to=isoToDate(document.getElementById('an-to').value);
  return LEADS.filter(r=>{
    const d=parseDate(r.DATE);
    if(from&&d<from)return false;
    if(to&&d>to)return false;
    return true;
  });
}
function resetFilter(prefix){
  if(prefix==='dash'){
    ['dash-from','dash-to'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('dash-src').value='';
    document.getElementById('dash-month').value='';
    renderDash();
  }else if(prefix==='lead'){
    document.getElementById('lead-search').value='';
    document.getElementById('lead-src').value='';
    document.getElementById('lead-cont').value='';
    document.getElementById('lead-closed').value='';
    document.getElementById('lead-month').value='';
    currentPage=1; renderTable();
  }else if(prefix==='an'){
    ['an-from','an-to'].forEach(id=>document.getElementById(id).value='');
    renderAnalytics();
  }
}

// ════════════ CHARTS STORAGE ════════════
const CHARTS={};
function destroyChart(k){if(CHARTS[k]){try{CHARTS[k].destroy();}catch(e){}delete CHARTS[k];}}

// ════════════ DASHBOARD ════════════
function renderDash(){
  const data=getDashData();
  document.getElementById('total-badge').textContent=LEADS.length+' Leads';
  const contacted=data.filter(r=>r.CONTACTED==='Y').length;
  const appts=data.filter(r=>r.APPT==='Y').length;
  const showings=data.filter(r=>r.SHOWING==='Y').length;
  const apps=data.filter(r=>r.APP==='Y').length;
  const closed=data.filter(r=>r.CLOSED==='Y').length;
  const comm=data.reduce((s,r)=>s+parseComm(r.COMMISSION),0);
  const cr=data.length?Math.round(contacted/data.length*100):0;
  document.getElementById('kpi-grid').innerHTML=`
    <div class="kpi blue"><div class="kpi-label">Total Leads</div><div class="kpi-val">${data.length}</div><div class="kpi-sub">Selected period</div></div>
    <div class="kpi green"><div class="kpi-label">Contacted</div><div class="kpi-val">${contacted}</div><div class="kpi-sub">${cr}% contact rate</div></div>
    <div class="kpi amber"><div class="kpi-label">Appts Set</div><div class="kpi-val">${appts}</div><div class="kpi-sub">${contacted?Math.round(appts/contacted*100):0}% of contacted</div></div>
    <div class="kpi pink"><div class="kpi-label">Showings</div><div class="kpi-val">${showings}</div><div class="kpi-sub">${appts?Math.round(showings/appts*100):0}% of appts</div></div>
    <div class="kpi teal"><div class="kpi-label">Applications</div><div class="kpi-val">${apps}</div><div class="kpi-sub">${showings?Math.round(apps/showings*100):0}% of showings</div></div>
    <div class="kpi gold"><div class="kpi-label">Commission</div><div class="kpi-val">$${comm.toLocaleString()}</div><div class="kpi-sub">${closed} closed deal${closed!==1?'s':''}</div></div>
  `;
  // Pie
  const srcC={};data.forEach(r=>{srcC[r.SOURCE]=(srcC[r.SOURCE]||0)+1;});
  const sL=Object.keys(srcC),sV=sL.map(k=>srcC[k]),sCols=sL.map(k=>SRC_COLORS[k]||'#888');
  destroyChart('pie');
  CHARTS.pie=new Chart(document.getElementById('pieChart'),{type:'doughnut',data:{labels:sL,datasets:[{data:sV,backgroundColor:sCols,borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed} leads`}}}}});
  document.getElementById('pie-legend').innerHTML=sL.map((l,i)=>`<span class="leg-item"><span class="leg-dot" style="background:${sCols[i]}"></span>${l} (${sV[i]})</span>`).join('');
  // Funnel
  const steps=[{l:'Total Leads',c:data.length,col:'#5c78ff'},{l:'Contacted',c:contacted,col:'#34d399'},{l:'Appt Set',c:appts,col:'#f59e0b'},{l:'Showing',c:showings,col:'#f472b6'},{l:'Application',c:apps,col:'#2dd4bf'},{l:'Closed',c:closed,col:'#a78bfa'}];
  document.getElementById('funnel-wrap').innerHTML=steps.map(s=>{
    const pct=data.length?Math.round(s.c/data.length*100):0;
    const w=data.length?Math.max(s.c/data.length*100,3):3;
    return `<div class="funnel-row"><div class="funnel-lbl">${s.l}</div><div class="funnel-track"><div class="funnel-fill" style="width:${w}%;background:${s.col};color:#fff">${s.c}</div></div><div class="funnel-pct">${pct}%</div></div>`;
  }).join('');
  // Bar by day
  const dC={};data.forEach(r=>{dC[r.DATE]=(dC[r.DATE]||0)+1;});
  const dK=Object.keys(dC).sort((a,b)=>parseDate(a)-parseDate(b));
  destroyChart('bar');
  CHARTS.bar=new Chart(document.getElementById('barChart'),{type:'bar',data:{labels:dK,datasets:[{label:'Leads',data:dK.map(k=>dC[k]),backgroundColor:'#5c78ff',borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#7b8199',font:{size:10},maxRotation:45,autoSkip:false},grid:{color:'rgba(255,255,255,0.05)'}},y:{ticks:{color:'#7b8199',stepSize:1},grid:{color:'rgba(255,255,255,0.05)'}}}}});
  // Commission by month
  const mC={};data.forEach(r=>{const m=r.MONTH||monthFromDate(r.DATE);const v=parseComm(r.COMMISSION);if(v>0)mC[m]=(mC[m]||0)+v;});
  const mK=Object.keys(mC).sort();
  destroyChart('comm');
  CHARTS.comm=new Chart(document.getElementById('commChart'),{type:'bar',data:{labels:mK.length?mK.map(fmtMonth):['No Data'],datasets:[{label:'Commission',data:mK.length?mK.map(k=>mC[k]):[0],backgroundColor:'#fbbf24',borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` $${ctx.parsed.y.toLocaleString()}`}}},scales:{x:{ticks:{color:'#7b8199'},grid:{color:'rgba(255,255,255,0.05)'}},y:{ticks:{color:'#7b8199',callback:v=>'$'+v},grid:{color:'rgba(255,255,255,0.05)'}}}}});
}

// ════════════ TABLE ════════════
let sortKey='DATE',sortDir=1,currentPage=1;
const PER_PAGE=15;
let editingId=null;

function getTableData(){
  const q=(document.getElementById('lead-search').value||'').toLowerCase();
  const src=document.getElementById('lead-src').value;
  const cont=document.getElementById('lead-cont').value;
  const closed=document.getElementById('lead-closed').value;
  const month=document.getElementById('lead-month').value;
  let rows=[...LEADS];
  if(q)rows=rows.filter(r=>(r.NAME||'').toLowerCase().includes(q)||(r.PHONE||'').includes(q)||(r.PROPERTY||'').toLowerCase().includes(q)||(r.NOTES||'').toLowerCase().includes(q));
  if(src)rows=rows.filter(r=>r.SOURCE===src);
  if(cont)rows=rows.filter(r=>r.CONTACTED===cont);
  if(closed)rows=rows.filter(r=>r.CLOSED===closed);
  if(month)rows=rows.filter(r=>(r.MONTH||monthFromDate(r.DATE))===month);
  rows.sort((a,b)=>{
    let av=a[sortKey]||'',bv=b[sortKey]||'';
    if(sortKey==='DATE'){av=parseDate(a.DATE);bv=parseDate(b.DATE);}
    return av<bv?-sortDir:av>bv?sortDir:0;
  });
  return rows;
}

function pill(val){
  if(val==='Y')return `<span class="pill pill-y yn-toggle" title="Click to change">Yes ▾</span>`;
  if(val==='N')return `<span class="pill pill-n yn-toggle" title="Click to change">No ▾</span>`;
  return `<span class="pill pill-dash yn-toggle" title="Click to set">— ▾</span>`;
}

function ynDropdown(id,field,currentVal){
  return `<div class="yn-wrap" data-id="${id}" data-field="${field}">
    ${pill(currentVal)}
    <div class="yn-menu">
      ${currentVal!=='Y'?`<div class="yn-menu-item" onclick="setYN(${id},'${field}','Y')"><span class="pill pill-y" style="cursor:default;pointer-events:none">Yes</span></div>`:''}
      ${currentVal!=='N'?`<div class="yn-menu-item" onclick="setYN(${id},'${field}','N')"><span class="pill pill-n" style="cursor:default;pointer-events:none">No</span></div>`:''}
      ${currentVal!==''?`<div class="yn-menu-item" onclick="setYN(${id},'${field}','')"><span class="pill pill-dash" style="cursor:default;pointer-events:none">Clear</span></div>`:''}
    </div>
  </div>`;
}

function renderTable(){currentPage=1;renderTablePage();}
function renderTablePage(){
  const rows=getTableData();
  const total=rows.length;
  const pages=Math.max(1,Math.ceil(total/PER_PAGE));
  if(currentPage>pages)currentPage=pages;
  const slice=rows.slice((currentPage-1)*PER_PAGE,currentPage*PER_PAGE);

  document.getElementById('lead-tbody').innerHTML=slice.map(r=>{
    if(editingId===r.id) return editRowHTML(r);
    return `<tr data-id="${r.id}">
      <td style="color:var(--muted);white-space:nowrap;font-size:12px">${r.DATE}</td>
      <td style="font-weight:600">${r.NAME||'<em style="color:var(--muted)">Unknown</em>'}</td>
      <td style="color:var(--muted2);font-size:12px">${r.PHONE}</td>
      <td><span class="pill-src">${r.SOURCE}</span></td>
      <td style="font-size:12px;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.PROPERTY}">${r.PROPERTY}</td>
      <td>${ynDropdown(r.id,'CONTACTED',r.CONTACTED)}</td>
      <td>${ynDropdown(r.id,'APPT',r.APPT)}</td>
      <td>${ynDropdown(r.id,'SHOWING',r.SHOWING)}</td>
      <td>${ynDropdown(r.id,'APP',r.APP)}</td>
      <td>${ynDropdown(r.id,'CLOSED',r.CLOSED)}</td>
      <td class="commission-val">${r.COMMISSION||'—'}</td>
      <td class="notes-cell" title="${r.NOTES||''}">${r.NOTES||''}</td>
      <td><div class="row-actions" style="justify-content:center">
        <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="startEdit(${r.id})">✏️</button>
        <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="deleteLead(${r.id})">🗑</button>
      </div></td>
    </tr>`;
  }).join('');

  // Pagination
  document.getElementById('pag-info').textContent=total===0?'No results':`Showing ${(currentPage-1)*PER_PAGE+1}–${Math.min(currentPage*PER_PAGE,total)} of ${total}`;
  const pb=document.getElementById('pag-btns');pb.innerHTML='';
  const prev=document.createElement('button');prev.className='pag-btn';prev.textContent='← Prev';prev.disabled=currentPage<=1;prev.onclick=()=>{currentPage--;renderTablePage();};pb.appendChild(prev);
  const maxP=Math.min(pages,7);
  for(let p=1;p<=maxP;p++){const b=document.createElement('button');b.className='pag-btn'+(p===currentPage?' active':'');b.textContent=p;b.onclick=(pp=>()=>{currentPage=pp;renderTablePage();})(p);pb.appendChild(b);}
  const nxt=document.createElement('button');nxt.className='pag-btn';nxt.textContent='Next →';nxt.disabled=currentPage>=pages;nxt.onclick=()=>{currentPage++;renderTablePage();};pb.appendChild(nxt);
}

function editRowHTML(r){
  const srcOpts=['REFERRAL','ZILLOW','FB','HAR','LoopNet','Crexi','OTHER'].map(s=>`<option value="${s}"${r.SOURCE===s?' selected':''}>${s}</option>`).join('');
  const ynOpts=(v)=>['','Y','N'].map(o=>`<option value="${o}"${v===o?' selected':''}>${o||'—'}</option>`).join('');
  return `<tr class="editing-row" data-id="${r.id}">
    <td><input class="edit-input" id="ei-date" type="text" value="${r.DATE}" style="width:90px"/></td>
    <td><input class="edit-input" id="ei-name" value="${r.NAME||''}" style="width:120px"/></td>
    <td><input class="edit-input" id="ei-phone" value="${r.PHONE||''}" style="width:110px"/></td>
    <td><select class="edit-select" id="ei-source">${srcOpts}</select></td>
    <td><input class="edit-input" id="ei-property" value="${r.PROPERTY||''}" style="width:150px"/></td>
    <td><select class="edit-select" id="ei-contacted">${ynOpts(r.CONTACTED)}</select></td>
    <td><select class="edit-select" id="ei-appt">${ynOpts(r.APPT)}</select></td>
    <td><select class="edit-select" id="ei-showing">${ynOpts(r.SHOWING)}</select></td>
    <td><select class="edit-select" id="ei-app">${ynOpts(r.APP)}</select></td>
    <td><select class="edit-select" id="ei-closed">${ynOpts(r.CLOSED)}</select></td>
    <td><input class="edit-input" id="ei-commission" value="${r.COMMISSION||''}" style="width:80px"/></td>
    <td><input class="edit-input" id="ei-notes" value="${r.NOTES||''}" style="width:160px"/></td>
    <td><div class="row-actions" style="justify-content:center">
      <button class="btn btn-success btn-sm btn-icon" title="Save" onclick="saveEdit(${r.id})">💾</button>
      <button class="btn btn-ghost btn-sm btn-icon" title="Cancel" onclick="cancelEdit()">✕</button>
    </div></td>
  </tr>`;
}

function startEdit(id){editingId=id;renderTablePage();}
function cancelEdit(){editingId=null;renderTablePage();}
function saveEdit(id){
  const lead=LEADS.find(l=>l.id===id);if(!lead)return;
  lead.DATE=document.getElementById('ei-date').value;
  lead.NAME=document.getElementById('ei-name').value;
  lead.PHONE=document.getElementById('ei-phone').value;
  lead.SOURCE=document.getElementById('ei-source').value;
  lead.PROPERTY=document.getElementById('ei-property').value;
  lead.CONTACTED=document.getElementById('ei-contacted').value;
  lead.APPT=document.getElementById('ei-appt').value;
  lead.SHOWING=document.getElementById('ei-showing').value;
  lead.APP=document.getElementById('ei-app').value;
  lead.CLOSED=document.getElementById('ei-closed').value;
  lead.COMMISSION=document.getElementById('ei-commission').value;
  lead.NOTES=document.getElementById('ei-notes').value;
  lead.MONTH=monthFromDate(lead.DATE);
  editingId=null;
  populateDropdowns();renderTablePage();renderDash();
  saveLeads();
  toast('Lead updated successfully','t-success');
}
function deleteLead(id){
  if(!confirm('Delete this lead? This cannot be undone.'))return;
  LEADS=LEADS.filter(l=>l.id!==id);
  populateDropdowns();renderTablePage();renderDash();
  saveLeads();
  toast('Lead deleted','t-error');
}

// ════════════ Y/N DROPDOWN INTERACTION ════════════
document.addEventListener('click',function(e){
  if(!e.target.closest('.yn-wrap')){
    document.querySelectorAll('.yn-menu.open').forEach(m=>m.classList.remove('open'));
    return;
  }
  if(e.target.closest('.yn-menu-item'))return;
  const wrap=e.target.closest('.yn-wrap');
  if(!wrap)return;
  const menu=wrap.querySelector('.yn-menu');
  if(!menu)return;
  const isOpen=menu.classList.contains('open');
  document.querySelectorAll('.yn-menu.open').forEach(m=>m.classList.remove('open'));
  if(!isOpen)menu.classList.add('open');
  e.stopPropagation();
});

function setYN(id,field,val){
  const lead=LEADS.find(l=>l.id===id);if(!lead)return;
  lead[field]=val;
  document.querySelectorAll('.yn-menu.open').forEach(m=>m.classList.remove('open'));
  renderTablePage();renderDash();
  saveLeads();
}

function sortBy(key){
  if(sortKey===key)sortDir*=-1;else{sortKey=key;sortDir=1;}
  document.querySelectorAll('thead th').forEach(th=>{th.classList.remove('sort-asc','sort-desc');});
  const headers=['DATE','NAME','PHONE','SOURCE','PROPERTY','CONTACTED','APPT','SHOWING','APP','CLOSED','COMMISSION','NOTES'];
  const idx=headers.indexOf(key);
  if(idx>=0){const ths=document.querySelectorAll('thead th');if(ths[idx])ths[idx].classList.add(sortDir===1?'sort-asc':'sort-desc');}
  renderTablePage();
}

// ════════════ ADD LEAD MODAL ════════════
function openAddModal(){
  document.getElementById('f-date').value=new Date().toISOString().split('T')[0];
  ['f-name','f-phone','f-property','f-commission','f-notes'].forEach(id=>document.getElementById(id).value='');
  ['f-source','f-contacted','f-appt','f-showing','f-app','f-closed'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('add-modal').style.display='flex';
}
function saveLead(){
  const name=document.getElementById('f-name').value.trim();
  const date=document.getElementById('f-date').value;
  const source=document.getElementById('f-source').value;
  if(!name){toast('Name is required','t-error');return;}
  if(!date){toast('Date is required','t-error');return;}
  if(!source){toast('Source is required','t-error');return;}
  const [y,m,d]=date.split('-');
  const displayDate=`${+m}/${+d}/${y}`;
  const lead={
    id:nextId++,
    DATE:displayDate,
    NAME:name,
    PHONE:document.getElementById('f-phone').value.trim(),
    SOURCE:source,
    PROPERTY:document.getElementById('f-property').value.trim(),
    CONTACTED:document.getElementById('f-contacted').value,
    APPT:document.getElementById('f-appt').value,
    SHOWING:document.getElementById('f-showing').value,
    APP:document.getElementById('f-app').value,
    CLOSED:document.getElementById('f-closed').value,
    COMMISSION:document.getElementById('f-commission').value.trim(),
    NOTES:document.getElementById('f-notes').value.trim(),
    MONTH:monthFromDate(displayDate)
  };
  LEADS.unshift(lead);
  closeModal('add-modal');
  populateDropdowns();renderTable();renderDash();
  saveLeads();
  toast(`Lead "${name}" added!`,'t-success');
}

// ════════════ IMPORT ════════════
function openImportModal(){
  document.getElementById('import-status-wrap').innerHTML='';
  document.getElementById('import-preview-wrap').innerHTML='';
  document.getElementById('import-confirm-btn').style.display='none';
  document.getElementById('csv-file-input').value='';
  pendingImport=[];
  document.getElementById('import-modal').style.display='flex';
}

const dz=document.getElementById('drop-zone');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag-over');});
dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag-over');const f=e.dataTransfer.files[0];if(f)processCSVFile(f);});

function handleFileInput(e){const f=e.target.files[0];if(f)processCSVFile(f);}

function processCSVFile(file){
  if(!file.name.endsWith('.csv')){
    document.getElementById('import-status-wrap').innerHTML=`<div class="import-status error">⚠ Please upload a .csv file</div>`;
    return;
  }
  const reader=new FileReader();
  reader.onload=e=>parseImportCSV(e.target.result);
  reader.readAsText(file);
}

const CSV_COLS=['DATE','LEAD NAME','PHONE','SOURCE','PROPERTY','CONTACTED','APPOINTMENT SET','SHOWING','APPLICATION SUBMITTED','CLOSED','COMMISSION','NOTES'];

function parseImportCSV(text){
  const lines=text.split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2){
    document.getElementById('import-status-wrap').innerHTML=`<div class="import-status error">File appears empty or has no data rows.</div>`;return;
  }
  const headers=parseCSVLine(lines[0]).map(h=>h.trim());
  const missingCols=CSV_COLS.filter(c=>!headers.includes(c));
  if(missingCols.length>0){
    document.getElementById('import-status-wrap').innerHTML=`<div class="import-status warn">⚠ Missing columns: ${missingCols.join(', ')}. Proceeding with available columns.</div>`;
  }
  const rows=[];
  for(let i=1;i<lines.length;i++){
    const vals=parseCSVLine(lines[i]);
    const obj={};
    headers.forEach((h,idx)=>{obj[h]=vals[idx]||'';});
    rows.push(obj);
  }
  const mapped=rows.map(r=>({
    id:0,
    DATE:r['DATE']||'',
    NAME:r['LEAD NAME']||'',
    PHONE:r['PHONE']||'',
    SOURCE:r['SOURCE']||'OTHER',
    PROPERTY:r['PROPERTY']||'',
    CONTACTED:r['CONTACTED']||'',
    APPT:r['APPOINTMENT SET']||'',
    SHOWING:r['SHOWING']||'',
    APP:r['APPLICATION SUBMITTED']||'',
    CLOSED:r['CLOSED']||'',
    COMMISSION:r['COMMISSION']||'',
    NOTES:r['NOTES']||'',
    MONTH:monthFromDate(r['DATE']||'')
  })).filter(r=>r.DATE||r.NAME);

  const existing=new Set(LEADS.map(l=>`${l.NAME}|${l.DATE}`));
  const fresh=mapped.filter(r=>!existing.has(`${r.NAME}|${r.DATE}`));
  const dupes=mapped.length-fresh.length;
  pendingImport=fresh;

  let statusMsg=`Found ${mapped.length} rows: <strong>${fresh.length} new</strong>`;
  if(dupes>0)statusMsg+=`, ${dupes} duplicate${dupes>1?'s':''} skipped`;
  document.getElementById('import-status-wrap').innerHTML=`<div class="import-status ${fresh.length>0?'success':'warn'}">${statusMsg}</div>`;

  if(fresh.length>0){
    const preview=fresh.slice(0,5);
    document.getElementById('import-preview-wrap').innerHTML=`
      <div class="import-preview" style="margin-top:14px">
        <p style="font-size:12px;color:var(--muted);margin-bottom:8px">Preview (first ${preview.length} of ${fresh.length}):</p>
        <div class="import-preview-table"><table>
          <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Source</th><th>Property</th></tr></thead>
          <tbody>${preview.map(r=>`<tr><td>${r.DATE}</td><td>${r.NAME}</td><td>${r.PHONE}</td><td>${r.SOURCE}</td><td>${r.PROPERTY}</td></tr>`).join('')}</tbody>
        </table></div>
      </div>`;
    document.getElementById('import-confirm-btn').style.display='inline-flex';
  }else{
    document.getElementById('import-confirm-btn').style.display='none';
  }
}

function parseCSVLine(line){
  const result=[];let cur='';let inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){inQ=!inQ;}
    else if(c===','&&!inQ){result.push(cur.trim());cur='';}
    else{cur+=c;}
  }
  result.push(cur.trim());
  return result;
}

function confirmImport(){
  if(!pendingImport.length)return;
  pendingImport.forEach(r=>{r.id=nextId++;});
  LEADS=LEADS.concat(pendingImport);
  const count=pendingImport.length;
  pendingImport=[];
  closeModal('import-modal');
  populateDropdowns();renderTable();renderDash();
  saveLeads();
  toast(`${count} lead${count!==1?'s':''} imported successfully!`,'t-success');
}

// ════════════ TEMPLATE DOWNLOAD ════════════
function downloadTemplate(){
  const header=CSV_COLS.join(',')+'\n';
  const example=[
    '3/19/2026','John Doe','832-555-0123','REFERRAL','5718 Eskridge 2beds','Y','Y','N','N','N','','Example note - follow up next week'
  ].join(',')+'\n';
  const csv=header+example;
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='leadlog_template.csv';a.click();
  URL.revokeObjectURL(url);
  toast('Template downloaded!','t-info');
}

// ════════════ EXPORT CSV ════════════
function exportCSV(){
  const header=CSV_COLS.join(',')+'\n';
  const rows=LEADS.map(r=>[
    r.DATE,`"${r.NAME}"`,r.PHONE,r.SOURCE,`"${r.PROPERTY}"`,
    r.CONTACTED,r.APPT,r.SHOWING,r.APP,r.CLOSED,r.COMMISSION,`"${(r.NOTES||'').replace(/"/g,'""')}"`
  ].join(',')).join('\n');
  const blob=new Blob([header+rows],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='leadlog_export.csv';a.click();
  URL.revokeObjectURL(url);
  toast(`${LEADS.length} leads exported!`,'t-success');
}

// ════════════ ANALYTICS ════════════
function renderAnalytics(){
  const data=getAnData();
  const dC={};data.forEach(r=>{const v=parseComm(r.COMMISSION);if(v>0)dC[r.DATE]=(dC[r.DATE]||0)+v;});
  const dK=Object.keys(dC).sort((a,b)=>parseDate(a)-parseDate(b));
  destroyChart('commT');
  CHARTS.commT=new Chart(document.getElementById('commTimeline'),{type:'line',data:{labels:dK.length?dK:['No data'],datasets:[{label:'Commission $',data:dK.length?dK.map(k=>dC[k]):[0],borderColor:'#fbbf24',backgroundColor:'rgba(251,191,36,0.1)',fill:true,tension:.3,pointBackgroundColor:'#fbbf24',pointRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` $${ctx.parsed.y.toLocaleString()}`}}},scales:{x:{ticks:{color:'#7b8199',maxRotation:45},grid:{color:'rgba(255,255,255,0.05)'}},y:{ticks:{color:'#7b8199',callback:v=>'$'+v},grid:{color:'rgba(255,255,255,0.05)'}}}}});
  const sC={};data.forEach(r=>{sC[r.SOURCE]=(sC[r.SOURCE]||0)+1;});
  const sL=Object.keys(sC),sV=sL.map(k=>sC[k]),sCols=sL.map(k=>SRC_COLORS[k]||'#888');
  destroyChart('anP');
  CHARTS.anP=new Chart(document.getElementById('anPie'),{type:'doughnut',data:{labels:sL,datasets:[{data:sV,backgroundColor:sCols,borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'55%',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed}`}}}}});
  document.getElementById('an-pie-legend').innerHTML=sL.map((l,i)=>{const p=data.length?Math.round(sV[i]/data.length*100):0;return `<span class="leg-item"><span class="leg-dot" style="background:${sCols[i]}"></span>${l} ${p}%</span>`;}).join('');
  const srcMap={};data.forEach(r=>{if(!srcMap[r.SOURCE])srcMap[r.SOURCE]={t:0,c:0};srcMap[r.SOURCE].t++;if(r.CONTACTED==='Y')srcMap[r.SOURCE].c++;});
  const cSrc=Object.keys(srcMap),cRates=cSrc.map(k=>srcMap[k].t?Math.round(srcMap[k].c/srcMap[k].t*100):0);
  destroyChart('conv');
  CHARTS.conv=new Chart(document.getElementById('convBySource'),{type:'bar',data:{labels:cSrc,datasets:[{label:'Contact Rate %',data:cRates,backgroundColor:cSrc.map(k=>SRC_COLORS[k]||'#888'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` ${ctx.parsed.x}% contacted`}}},scales:{x:{ticks:{color:'#7b8199',callback:v=>v+'%'},max:100,grid:{color:'rgba(255,255,255,0.05)'}},y:{ticks:{color:'#7b8199',font:{size:11}},grid:{color:'rgba(255,255,255,0.05)'}}}}});
  const contacted=data.filter(r=>r.CONTACTED==='Y').length,notC=data.length-contacted;
  destroyChart('cD');
  CHARTS.cD=new Chart(document.getElementById('contactDonut'),{type:'doughnut',data:{labels:['Contacted','Not Contacted'],datasets:[{data:[contacted,notC],backgroundColor:['#34d399','rgba(248,113,113,0.5)'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed}`}}}}});
  document.getElementById('contact-legend').innerHTML=`
    <span class="leg-item"><span class="leg-dot" style="background:#34d399"></span>Contacted: ${contacted} (${data.length?Math.round(contacted/data.length*100):0}%)</span>
    <span class="leg-item"><span class="leg-dot" style="background:rgba(248,113,113,0.6)"></span>Not Contacted: ${notC}</span>`;
}

// ════════════ TABS ════════════
function showTab(name,btn){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  btn.classList.add('active');
  if(name==='dashboard')renderDash();
  if(name==='leads'){renderTablePage();}
  if(name==='analytics')renderAnalytics();
}

// ════════════ MODAL HELPERS ════════════
function closeModal(id){document.getElementById(id).style.display='none';}
function closeModalOutside(e,id){if(e.target===document.getElementById(id))closeModal(id);}

// ════════════ INIT ════════════
if(sessionStorage.getItem('leadlog_auth')==='1'){
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app-wrapper').style.display='block';
  assignColors();populateDropdowns();renderDash();renderTable();
} else {
  document.getElementById('login-user').focus();
}
