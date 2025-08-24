// --- YouTube Clone Script with Watch Page ---

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const themeBtn = document.getElementById('themeBtn');
const grid = document.getElementById('grid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Sidebar toggle
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebar?.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
  });
}

// Theme toggle
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const light = document.body.dataset.theme === 'light';
    document.body.dataset.theme = light ? 'dark' : 'light';
  });
}

// Video dataset
const videos = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Frontend Trick #${i + 1}`,
  channel: i % 3 === 0 ? 'CodeCraft' : i % 3 === 1 ? 'UI Lab' : 'DevPulse',
  views: `${(Math.random() * 900 + 100).toFixed(0)}K views`,
  age: `${(Math.random() * 10).toFixed(0)} days ago`,
  thumb: i === 13
    ? 'https://picsum.photos/seed/fallback14/400/225'
    : `https://picsum.photos/seed/stable${i}/400/225`
}));

// Render video cards with links
function renderCards(list) {
  if (!grid) return;
  grid.innerHTML = list.map(v => `
    <a href="watch.html?title=${encodeURIComponent(v.title)}&channel=${encodeURIComponent(v.channel)}&stats=${encodeURIComponent(v.views + ' • ' + v.age)}&thumb=${encodeURIComponent(v.thumb)}" class="card">
      <div class="thumb-wrapper">
        <img class="thumb"
             src="${v.thumb}"
             alt="Thumbnail for ${v.title}"
             onerror="this.onerror=null; this.src='https://placehold.co/400x225?text=Video';" />
        <span class="duration">12:34</span>
      </div>
      <div class="meta">
        <h3 class="title">${v.title}</h3>
        <div class="byline">${v.channel}</div>
        <div class="stats">${v.views} • ${v.age}</div>
      </div>
    </a>
  `).join('');
}

// Initial render
renderCards(videos);

// Search filter
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim().toLowerCase();
    const filtered = videos.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
    );
    renderCards(filtered);
  });
}
