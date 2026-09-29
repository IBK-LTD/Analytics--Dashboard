document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchCampaigns();
  setCampaigns(data);
  renderAllCharts();

  const campaignSelect = document.getElementById('campaignFilter');
const channelSelect = document.getElementById('channelFilter');

data.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.id;
  opt.textContent = c.name;
  campaignSelect.appendChild(opt);
});

[...new Set(data.map(c => c.channel))].forEach(channel => {
  const opt = document.createElement('option');
  opt.value = channel;
  opt.textContent = channel;
  channelSelect.appendChild(opt);
});

campaignSelect.addEventListener('change', (e) => {
  appState.filters.campaignId = e.target.value;
  renderAllCharts();
});

channelSelect.addEventListener('change', (e) => {
  appState.filters.channel = e.target.value;
  renderAllCharts();
});

  const sidebar = document.querySelector('aside');
const mainWrap = document.querySelector('.pl-60');
const header = document.querySelector('header');
const toggleBtn = document.getElementById('sidebarToggle');

toggleBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('w-60');
  sidebar.classList.toggle('w-20');
  mainWrap.classList.toggle('pl-60');
  mainWrap.classList.toggle('pl-20');
  header.classList.toggle('left-60');
  header.classList.toggle('left-20');
});
});