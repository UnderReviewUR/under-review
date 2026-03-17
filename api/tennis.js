export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { tour = "atp" } = req.query;

  const sportKey =
    tour === "wta"
      ? "tennis_wta_miami_open"
      : "tennis_atp_miami_open";

  try {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=h2h&oddsFormat=american`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || "Failed to fetch tennis odds",
      });
    }

    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (error) {
    return res.status(500).json({
      error: "Server error fetching tennis odds",
    });
  }
}
