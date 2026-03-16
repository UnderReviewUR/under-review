export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json([
    {player:"Jayson Tatum",team:"BOS · SF",stat:"PTS",line:"32.5",dir:"over"},
    {player:"Nikola Jokic",team:"DEN · C",stat:"PRA",line:"54.5",dir:"over"},
    {player:"Bam Adebayo",team:"MIA · C",stat:"REB",line:"9.5",dir:"under"},
    {player:"Jalen Brunson",team:"NYK · PG",stat:"PTS",line:"28.5",dir:"over"},
    {player:"LeBron James",team:"LAL · SF",stat:"AST",line:"7.5",dir:"under"},
    {player:"Shai Gilgeous-Alexander",team:"OKC · PG",stat:"PTS",line:"32.5",dir:"under"},
    {player:"Jamal Murray",team:"DEN · PG",stat:"PTS",line:"21.5",dir:"over"},
    {player:"Tyler Herro",team:"MIA · SG",stat:"PTS",line:"19.5",dir:"under"},
  ]);
}
