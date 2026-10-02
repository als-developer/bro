/* ═══════════ BLESSING FORM (API Version) ═══════════ */
const blessingForm = document.getElementById('blessingForm');
const blessingList = document.getElementById('blessingList');

async function loadBlessings() {
  try {
    const res = await fetch('/api/blessings');
    const data = await res.json();
    if (data.success) renderBlessings(data.data);
  } catch (e) { console.error(e); }
}

blessingForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('blessName').value.trim();
  const relation = document.getElementById('blessRelation').value;
  const msg = document.getElementById('blessMsg').value.trim();
  if (!name || !relation || !msg) return;

  try {
    const res = await fetch('/api/blessings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, relation, msg })
    });
    const data = await res.json();
    if (data.success) {
      blessingForm.reset();
      loadBlessings();
      playPop();
      for (let i = 0; i < 3; i++) setTimeout(() => randomFirework(), i * 200);
      burstGifts(window.innerWidth / 2, window.innerHeight / 2);
    }
  } catch (e) {
    alert('Hitilafu ya mtandao!');
  }
});

function renderBlessings(blessings) {
  if (!blessingList) return;
  blessingList.innerHTML = '';
  blessings.forEach(b => {
    const card = document.createElement('div');
    card.className = 'bless-card';
    card.innerHTML = `
      <h4>💝 ${b.name} <small>(${b.relation})</small></h4>
      <p>${b.msg}</p>
      <small>📅 ${b.date}</small>
    `;
    blessingList.appendChild(card);
  });
}

if (blessingList) loadBlessings();
