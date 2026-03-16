export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { sport, eventId } = req.query;
  const sportKey = sport || 'basketball_nba';
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    let url;

    if (eventId) {
      url = `https://api.the-odds-api.com/v4/sports/${sportKey}/events/${eventId}/odds/?apiKey=${apiKey}&regions=us&markets=player_points,player_rebounds,player_assists&oddsFormat=american`;
    } else {
      url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
