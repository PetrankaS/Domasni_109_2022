
// questionnaire.js - store questionnaire data locally
const Q_KEY = 'cityexplorer_questionnaire_v1';
function getQs(){ return JSON.parse(localStorage.getItem(Q_KEY) || '[]'); }
function saveQs(arr){ localStorage.setItem(Q_KEY, JSON.stringify(arr)); }

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('questionForm');
  const out = document.getElementById('questionResults');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('qName').value.trim();
    const age = document.getElementById('qAge').value;
    const reason = document.getElementById('qReason').value;
    const extra = document.getElementById('qExtra').value.trim();
    if(!name){ alert('Внеси име'); return; }
    const arr = getQs();
    arr.push({name,age,reason,extra,ts:new Date().toISOString()});
    saveQs(arr);
    renderList();
    alert('Ви благодарам, прашалникот е испратен.');
    form.reset();
  });
  function renderList(){
    const data = getQs();
    if(!out) return;
    out.innerHTML = '';
    if(data.length===0){ out.innerHTML = '<div>Нема испратени прашалници.</div>'; return; }
    data.slice().reverse().forEach(d=>{
      const el = document.createElement('div');
      el.className = 'q-item';
      el.innerHTML = `<div><strong>${escapeHtml(d.name)}</strong> — ${d.age} — ${escapeHtml(d.reason)}</div><div class="time">${fmtTime(d.ts)}</div><div class="qextra">${escapeHtml(d.extra||'')}</div>`;
      out.appendChild(el);
    });
  }
  renderList();
});
