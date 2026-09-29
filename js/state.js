const appState = {
    campaigns: [],
    filters: {
        campaignId: 'all',
        channel: 'all'
    }
};

function setCampaigns(data) {
    appState.campaigns = data;
}

function getFilteredCampaigns() {
  return appState.campaigns.filter(c => {
    const matchesCampaign = appState.filters.campaignId === 'all' || c.id === appState.filters.campaignId;
    const matchesChannel = appState.filters.channel === 'all' || c.channel === appState.filters.channel;
    return matchesCampaign && matchesChannel;
  });
}