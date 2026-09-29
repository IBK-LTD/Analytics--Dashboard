async function fetchCampaigns() {
    const response = await fetch("data/campaign.json");
    if (!response.ok) {
        throw new Error("Failed to fetch campaign data");
    };
    return response.json();  
}