async function api(url, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  return res.json();
}

const addPhotoBtn = document.getElementById('addPhotoBtn');
if (addPhotoBtn) {
  addPhotoBtn.addEventListener('click', async () => {
    const url = document.getElementById('photoUrl').value.trim();
    const caption = document.getElementById('photoCaption').value.trim() || 'Picha';
    if (!url) return alert('Weka URL ya picha!');
    const data = await api('/api/gallery', 'POST', { url, caption });
    if (data.success) location.reload();
    else alert('Kosa: ' + data.message);
  });
}

const addTlBtn = document.getElementById('addTlBtn');
if (addTlBtn) {
  addTlBtn.addEventListener('click', async () => {
    const year = document.getElementById('tlYear').value.trim();
    const title = document.getElementById('tlTitle').value.trim();
    const text = document.getElementById('tlText').value.trim();
    if (!year || !title || !text) return alert('Jaza sehemu zote!');
    const data = await api('/api/timeline', 'POST', { year, title, text });
    if (data.success) location.reload();
    else alert('Kosa: ' + data.message);
  });
}

window.deletePhoto = async (id) => {
  if (confirm('Una uhakika?')) {
    await api('/api/gallery/' + id, 'DELETE');
    location.reload();
  }
};

window.deleteTl = async (id) => {
  if (confirm('Una uhakika?')) {
    await api('/api/timeline/' + id, 'DELETE');
    location.reload();
  }
};

window.deleteBless = async (id) => {
  if (confirm('Una uhakika?')) {
    await api('/api/blessings/' + id, 'DELETE');
    location.reload();
  }
};
