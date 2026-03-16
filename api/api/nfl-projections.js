export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    qbs: [
      {player:"Joe Burrow",team:"CIN · QB",stat:"PASS YDS",line:"4268",dir:"over"},
      {player:"Lamar Jackson",team:"BAL · QB",stat:"PASS YDS",line:"3950",dir:"over"},
      {player:"Josh Allen",team:"BUF · QB",stat:"PASS TDS",line:"32.5",dir:"over"},
      {player:"Patrick Mahomes",team:"KC · QB",stat:"PASS YDS",line:"4450",dir:"over"},
      {player:"Jalen Hurts",team:"PHI · QB",stat:"RUSH TDS",line:"11.5",dir:"over"},
    ],
    rbs: [
      {player:"Derrick Henry",team:"DAL · RB",stat:"RUSH YDS",line:"1150",dir:"over"},
      {player:"Bijan Robinson",team:"ATL · RB",stat:"RUSH YDS",line:"1250",dir:"over"},
      {player:"Breece Hall",team:"NYJ · RB",stat:"REC YDS",line:"550",dir:"over"},
      {player:"De'Von Achane",team:"MIA · RB",stat:"RUSH YDS",line:"1100",dir:"over"},
    ],
    wrs: [
      {player:"CeeDee Lamb",team:"DAL · WR",stat:"REC YDS",line:"1450",dir:"over"},
      {player:"Tyreek Hill",team:"MIA · WR",stat:"REC YDS",line:"1550",dir:"over"},
      {player:"Ja'Marr Chase",team:"CIN · WR",stat:"REC YDS",line:"1350",dir:"over"},
      {player:"Justin Jefferson",team:"MIN · WR",stat:"REC YDS",line:"1400",dir:"over"},
    ]
  });
}
