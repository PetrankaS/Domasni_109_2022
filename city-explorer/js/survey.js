
// survey.js - store survey responses in localStorage
const SURVEY_KEY = 'cityexplorer_survey_v1';
function getSurveys(){ return JSON.parse(localStorage.getItem(SURVEY_KEY) || '[]'); }
function saveSurveys(arr){ localStorage.setItem(SURVEY_KEY, JSON.stringify(arr)); }

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('surveyForm');
  const results = document.getElementById('surveyResults');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const rating = document.getElementById('siteRating').value;
    const features = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(n=>n.value);
    const comment = document.getElementById('surveyComment').value.trim();
    const arr = getSurveys();
    arr.push({rating,features,comment,ts:new Date().toISOString()});
    saveSurveys(arr);
    renderList();
    alert('Ви благодарам за пополнување!');
    form.reset();
  });
  function renderList(){
    const data = getSurveys();
    if(!results) return;
    results.innerHTML = '';
    if(data.length===0){ results.innerHTML = '<div>Нема досега одговори.</div>'; return; }
    data.slice().reverse().forEach(d=>{
      const el = document.createElement('div');
      el.className = 'survey-item';
      el.innerHTML = `<div><strong>${d.rating}</strong> — ${d.features.join(', ')}</div><div class="time">${fmtTime(d.ts)}</div><div class="scomment">${escapeHtml(d.comment||'')}</div>`;
      results.appendChild(el);
    });
  }
  renderList();
});
