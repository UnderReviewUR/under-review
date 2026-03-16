export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');

  const apiKey = process.env.ODDS_API_KEY;
  const { tour } = req.query;
  const sportKey = tour === 'wta' ? 'tennis_wta_miami_open' : 'tennis_atp_miami_open';

  try {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h&oddsFormat=american`
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
