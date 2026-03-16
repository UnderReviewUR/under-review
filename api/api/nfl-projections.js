export default async function handler(req, res) {
  try {
    const API_KEY = process.env.BALLDONTLIE_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing BALLDONTLIE_API_KEY" });
    }

    const headers = {
      Authorization: API_KEY,
    };

    async function searchPlayers(name) {
      const url = `https://api.balldontlie.io/nfl/v1/players?search=${encodeURIComponent(name)}`;
      const response = await fetch(url, { headers });
      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    }

    async function getBestPlayer(name) {
      const players = await searchPlayers(name);
      return players[0] || null;
    }

    const qbTargets = [
      { name: "Patrick Mahomes", line: "4650", stat: "PASS YDS", dir: "over" },
      { name: "Josh Allen", line: "4300", stat: "PASS YDS", dir: "over" },
      { name: "Joe Burrow", line: "4400", stat: "PASS YDS", dir: "over" },
      { name: "C.J. Stroud", line: "4100", stat: "PASS YDS", dir: "over" },
      { name: "Lamar Jackson", line: "3850", stat: "PASS YDS", dir: "over" },
    ];

    const rbTargets = [
      { name: "Christian McCaffrey", line: "1325", stat: "RUSH YDS", dir: "over" },
      { name: "Bijan Robinson", line: "1210", stat: "RUSH YDS", dir: "over" },
      { name: "Breece Hall", line: "1180", stat: "RUSH YDS", dir: "over" },
      { name: "Jonathan Taylor", line: "1140", stat: "RUSH YDS", dir: "over" },
      { name: "Saquon Barkley", line: "1090", stat: "RUSH YDS", dir: "over" },
    ];

    const wrTargets = [
      { name: "Justin Jefferson", line: "1480", stat: "REC YDS", dir: "over" },
      { name: "CeeDee Lamb", line: "1450", stat: "REC YDS", dir: "over" },
      { name: "Ja'Marr Chase", line: "1390", stat: "REC YDS", dir: "over" },
      { name: "Amon-Ra St. Brown", line: "1360", stat: "REC YDS", dir: "over" },
      { name: "A.J. Brown", line: "1310", stat: "REC YDS", dir: "over" },
    ];

    async function enrich(list) {
      const results = await Promise.all(
        list.map(async (item) => {
          const player = await getBestPlayer(item.name);

          return {
            player: item.name,
            team:
              player?.team?.abbreviation ||
              player?.team?.full_name ||
              player?.team?.name ||
              "TEAM N/A",
            line: item.line,
            stat: item.stat,
            dir: item.dir,
          };
        })
      );

      return results;
    }

    const [qbs, rbs, wrs] = await Promise.all([
      enrich(qbTargets),
      enrich(rbTargets),
      enrich(wrTargets),
    ]);

    return res.status(200).json({ qbs, rbs, wrs });
  } catch (error) {
    console.error("NFL projections API error:", error);
    return res.status(500).json({ error: "Failed to load NFL projections" });
  }
}
