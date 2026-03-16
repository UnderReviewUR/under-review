export default async function handler(req, res) {
  const apiKey = process.env.BALLDONTLIE_API_KEY;

  try {
    const response = await fetch(
      "https://api.balldontlie.io/v1/nfl/players?per_page=100",
      {
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await response.json();

    const players = data.data.map((p) => ({
      name: p.first_name + " " + p.last_name,
      team: p.team?.abbreviation || "FA",
      position: p.position
    }));

    res.status(200).json(players);

  } catch (err) {
    res.status(500).json({ error: "Failed to load NFL players" });
  }
}
