export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    season: "2026",
    updated: "March 2026 — Post Free Agency",
    qbs: [
      {player:"Josh Allen",team:"BUF · QB",stat:"PASS YDS",line:"4,650",dir:"over"},
      {player:"Lamar Jackson",team:"BAL · QB",stat:"PASS YDS",line:"3,800",dir:"over"},
      {player:"Patrick Mahomes",team:"KC · QB",stat:"PASS YDS",line:"4,500",dir:"under"},
      {player:"Joe Burrow",team:"CIN · QB",stat:"PASS YDS",line:"4,268",dir:"over"},
      {player:"Jalen Hurts",team:"PHI · QB",stat:"PASS TDS",line:"30.5",dir:"under"},
      {player:"Tua Tagovailoa",team:"ATL · QB",stat:"PASS YDS",line:"3,950",dir:"under"},
      {player:"Kyler Murray",team:"MIN · QB",stat:"PASS YDS",line:"3,750",dir:"over"},
      {player:"CJ Stroud",team:"HOU · QB",stat:"PASS YDS",line:"4,100",dir:"over"},
      {player:"Jordan Love",team:"GB · QB",stat:"PASS YDS",line:"4,050",dir:"under"},
      {player:"Dak Prescott",team:"DAL · QB",stat:"PASS YDS",line:"3,900",dir:"under"},
    ],
    rbs: [
      {player:"Saquon Barkley",team:"PHI · RB",stat:"RUSH YDS",line:"1,350",dir:"over"},
      {player:"Derrick Henry",team:"DAL · RB",stat:"RUSH YDS",line:"1,100",dir:"under"},
      {player:"Kenneth Walker III",team:"KC · RB",stat:"RUSH YDS",line:"1,150",dir:"over"},
      {player:"Bijan Robinson",team:"ATL · RB",stat:"RUSH YDS",line:"1,200",dir:"under"},
      {player:"Breece Hall",team:"NYJ · RB",stat:"RUSH YDS",line:"1,050",dir:"over"},
      {player:"De'Von Achane",team:"MIA · RB",stat:"RUSH YDS",line:"1,100",dir:"under"},
      {player:"Jahmyr Gibbs",team:"DET · RB",stat:"RUSH YDS",line:"1,150",dir:"over"},
      {player:"Josh Jacobs",team:"GB · RB",stat:"RUSH YDS",line:"1,000",dir:"under"},
      {player:"Jonathan Taylor",team:"IND · RB",stat:"RUSH YDS",line:"1,050",dir:"under"},
      {player:"Travis Etienne",team:"JAX · RB",stat:"RUSH YDS",line:"950",dir:"over"},
    ],
    wrs: [
      {player:"CeeDee Lamb",team:"DAL · WR",stat:"REC YDS",line:"1,450",dir:"over"},
      {player:"Ja'Marr Chase",team:"CIN · WR",stat:"REC YDS",line:"1,400",dir:"over"},
      {player:"Tyreek Hill",team:"MIA · WR",stat:"REC YDS",line:"1,350",dir:"under"},
      {player:"Justin Jefferson",team:"MIN · WR",stat:"REC YDS",line:"1,400",dir:"over"},
      {player:"Amon-Ra St. Brown",team:"DET · WR",stat:"REC YDS",line:"1,200",dir:"under"},
      {player:"Davante Adams",team:"LV · WR",stat:"REC YDS",line:"1,100",dir:"under"},
      {player:"Stefon Diggs",team:"NE · WR",stat:"REC YDS",line:"950",dir:"under"},
      {player:"Drake London",team:"ATL · WR",stat:"REC YDS",line:"1,050",dir:"over"},
      {player:"Garrett Wilson",team:"NYJ · WR",stat:"REC YDS",line:"1,100",dir:"over"},
      {player:"Deebo Samuel",team:"SF · WR",stat:"REC YDS",line:"900",dir:"under"},
    ]
  });
}
