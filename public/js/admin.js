/* ═══════════ ADMIN DASHBOARD API CLIENT ═══════════ */

/* ═══════════ ADD PHOTO ═══════════ */
document.getElementById('addPhotoBtn')?.addEventListener('click', async () => {
  const url = document.getElementById('photoUrl').value.trim();
  const caption = document.getElementById('photoCaption').value.trim() || 'Picha 🎉';
  if (!url) return alert('Weka URL ya picha!');

  try {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, caption })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('photoUrl').value = '';
      document.getElementById('photoCaption').value = '';
      location.reload();
    } else {
      alert('Kosa: ' + data.message);
    }
  } catch (e) {
    alert('Hitilafu ya mtandao!');
  }
});

/* ═══════════ DELETE PHOTO ═══════════ */
window.deletePhoto = async (id) => {
  if (!confirm('Una uhakika?')) return;
  await fetch('/api/gallery/' + id, { method: 'DELETE' });
  location.reload();
};

/* ═══════════ ADD TIMELINE ═══════════ */
document.getElementById('addTlBtn')?.addEventListener('click', async () => {
  const year = document.getElementById('tlYear').value.trim();
  const title = document.getElementById('tlTitle').value.trim();
  const text = document.getElementById('tlText').value.trim();
  if (!year || !title || !text) return alert('Jaza sehemu zote!');

  try {
    const res = await fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year, title, text })
    });
    const data = await res.json();
    if (data.success) location.reload();
    else alert('Kosa: ' + data.message);
  } catch (e) {
    alert('Hitilafu ya mtandao!');
  }
});

/* ═══════════ DELETE TIMELINE ═══════════ */
window.deleteTl = async (id) => {
  if (!confirm('Una uhakika?')) return;
  await fetch('/api/timeline/' + id, { method: 'DELETE' });
  location.reload();
};

/* ═══════════ DELETE BLESSING ═══════════ */
window.deleteBless = async (id) => {
  if (!confirm('Una uhakika?')) return;
  await fetch('/api/blessings/' + id, { method: 'DELETE' });
  location.reload();
};
