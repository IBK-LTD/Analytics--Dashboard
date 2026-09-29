let trendChart, campaignChart, channelChart;

function renderTrendChart() {
  const campaigns = getFilteredCampaigns();
  const dates = campaigns[0]?.dailyStats.map(d => d.date) || [];

  const spendByDate = dates.map((date, i) =>
    campaigns.reduce((sum, c) => sum + c.dailyStats[i].spend, 0)
  );

  const ctx = document.getElementById('trendChart');
  if (trendChart) trendChart.destroy();
  trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Total Spend',
        data: spendByDate,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderCampaignChart() {
  const campaigns = getFilteredCampaigns();
  const labels = campaigns.map(c => c.name);
  const totals = campaigns.map(c => c.dailyStats.reduce((sum, d) => sum + d.spend, 0));

  const ctx = document.getElementById('campaignChart');
  if (campaignChart) campaignChart.destroy();
  campaignChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label: 'Total Spend', data: totals, backgroundColor: '#4f46e5' }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderChannelChart() {
  const campaigns = getFilteredCampaigns();
  const channels = [...new Set(campaigns.map(c => c.channel))];
  const totalsByChannel = channels.map(channel =>
    campaigns
      .filter(c => c.channel === channel)
      .reduce((sum, c) => sum + c.dailyStats.reduce((s, d) => s + d.spend, 0), 0)
  );

  const ctx = document.getElementById('channelChart');
  if (channelChart) channelChart.destroy();
  channelChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: channels,
      datasets: [{ data: totalsByChannel, backgroundColor: ['#4f46e5', '#006591', '#39b8fd', '#005338'] }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderAllCharts() {
  renderTrendChart();
  renderCampaignChart();
  renderChannelChart();
}

function renderKPIs() {
  const campaigns = getFilteredCampaigns();
  let totalSpend = 0, totalConversions = 0, totalClicks = 0, totalImpressions = 0;

  campaigns.forEach(c => {
    c.dailyStats.forEach(d => {
      totalSpend += d.spend;
      totalConversions += d.conversions;
      totalClicks += d.clicks;
      totalImpressions += d.impressions;
    });
  });

  const ctr = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const roas = totalSpend ? (totalConversions * 50 / totalSpend).toFixed(2) : '0.00'; // assumes $50 value per conversion — adjust if you want

  document.querySelectorAll('.font-metric-display')[0].textContent = `$${totalSpend.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
  document.querySelectorAll('.font-metric-display')[1].textContent = totalConversions.toLocaleString();
  document.querySelectorAll('.font-metric-display')[2].textContent = `${roas}x`;
  document.querySelectorAll('.font-metric-display')[3].textContent = `${ctr}%`;
}