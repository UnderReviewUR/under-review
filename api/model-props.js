export default async function handler(req, res) {
  try {
    const props = [
      { player: "Jayson Tatum", team: "BOS · SF", line: "28.5", stat: "PTS", dir: "over" },
      { player: "Nikola Jokic", team: "DEN · C", line: "27.5", stat: "PTS", dir: "over" },
      { player: "Jalen Brunson", team: "NYK · PG", line: "27.5", stat: "PTS", dir: "over" },
      { player: "LeBron James", team: "LAL · SF", line: "24.5", stat: "PTS", dir: "over" },
      { player: "Bam Adebayo", team: "MIA · C", line: "18.5", stat: "PTS", dir: "over" }
    ];

    res.status(200).json(props);

  } catch (err) {
    res.status(500).json({ error: "Failed to build model props." });
  }
}
