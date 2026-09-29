# Campaign Analytics Dashboard

A campaign performance analytics dashboard built with vanilla HTML/CSS (Tailwind), JavaScript, and Chart.js.

## Overview

A marketing analytics dashboard that visualizes campaign performance across channels — spend, conversions, ROAS, and CTR — with interactive filtering by campaign and channel.

## Tech Stack

- HTML5 / Tailwind CSS (via CDN)
- Vanilla JavaScript (no framework)
- Chart.js for data visualization
- Mock REST-shaped JSON API (`data/campaigns.json`), fetched via the native `fetch()` API

## Features

- Real-time KPI cards (Total Spend, Conversions, Blended ROAS, CTR) computed from live data
- Interactive line chart showing spend trends over time
- Bar chart comparing spend across campaigns
- Doughnut chart showing spend distribution by channel
- Campaign and channel filters that update all charts and KPIs together, driven by shared state
- Collapsible sidebar navigation

## Architecture

- `js/api.js` — data fetching layer
- `js/state.js` — shared application state and filtering logic
- `js/charts.js` — Chart.js rendering logic
- `js/main.js` — event wiring and app initialization

All UI components (KPI cards, charts) read from one shared state object, so a filter change in one place updates everything consistently.

## What's mocked

Currently uses a static JSON file shaped like a real REST API response. Swapping in a live API only requires updating `js/api.js`'s fetch URL — the rest of the app is unaffected.
