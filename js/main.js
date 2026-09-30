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

  // --- Sidebar (desktop collapse + mobile off-canvas) ---
  const sidebar = document.getElementById('sidebar');
  const mainWrap = document.getElementById('mainWrap');
  const header = document.querySelector('header');
  const backdrop = document.getElementById('sidebarBackdrop');
  const desktopToggle = document.getElementById('sidebarToggle');
  const mobileToggle = document.getElementById('mobileMenuToggle');

  function isMobile() {
    return window.matchMedia('(max-width: 1023px)').matches;
  }

  function openMobileSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    backdrop.classList.remove('hidden');
  }

  function closeMobileSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    backdrop.classList.add('hidden');
  }

  function toggleDesktopCollapse() {
    sidebar.classList.toggle('lg:w-60');
    sidebar.classList.toggle('lg:w-20');
    mainWrap.classList.toggle('lg:pl-60');
    mainWrap.classList.toggle('lg:pl-20');
    header.classList.toggle('lg:left-60');
    header.classList.toggle('lg:left-20');
  }

  mobileToggle?.addEventListener('click', openMobileSidebar);
  backdrop?.addEventListener('click', closeMobileSidebar);
  desktopToggle?.addEventListener('click', () => {
    if (isMobile()) {
      closeMobileSidebar();
    } else {
      toggleDesktopCollapse();
    }
  });
});