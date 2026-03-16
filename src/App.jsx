import { useState, useRef, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --black:#080A0C; --surface:#0F1215; --border:#1E2328;
    --cyan:#00F5E9; --magenta:#FF2D6B; --gold:#F5C842;
    --text:#E8EAF0; --muted:#5A6070; --win:#00E676; --loss:#FF4444;
    --bubble:#1A1E24;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:var(--black);}

  /* APP SHELL */
  .app{background:var(--black);color:var(--text);font-family:'DM Sans',sans-serif;height:100vh;display:flex;flex-direction:column;overflow:hidden;}

  /* HEADER */
  .hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border);background:rgba(8,10,12,.97);flex-shrink:0;}
  .logo{line-height:1;}
  .logo-under{font-family:'Bebas Neue',sans-serif;font-size:10px;letter-spacing:5px;color:var(--text);display:block;margin-bottom:1px;}
  .logo-review{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;background:linear-gradient(135deg,var(--cyan),var(--magenta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;}
  .hdr-r{display:flex;align-items:center;gap:10px;}
  .hdr-rec{background:var(--surface);border:1px solid var(--border);padding:4px 10px;font-family:'DM Mono',monospace;font-size:10px;}
  .w{color:var(--win);} .l{color:var(--loss);}
  .ask-btn-hdr{background:transparent;border:1px solid var(--cyan);color:var(--cyan);font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;padding:5px 12px;cursor:pointer;transition:all .2s;}
  .ask-btn-hdr:hover,.ask-btn-hdr.active{background:var(--cyan);color:var(--black);}

  /* VIEWS */
  .view{flex:1;overflow:hidden;display:flex;flex-direction:column;}

  /* SLATE VIEW */
  .slate-scroll{flex:1;overflow-y:auto;padding:16px;}
  .slate-hdr{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:18px;}
  .slate-title{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:2px;line-height:1;}
  .slate-title span{color:var(--cyan);}
  .ai-tag{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:3px;color:var(--magenta);border:1px solid var(--magenta);padding:3px 8px;}

  /* GAME CARD */
  .gc{background:var(--surface);border:1px solid var(--border);margin-bottom:10px;cursor:pointer;transition:border-color .2s;}
  .gc:hover,.gc.active{border-color:var(--cyan);}
  .gc-top{padding:14px 14px 12px;display:flex;align-items:center;justify-content:space-between;}
  .teams{display:flex;align-items:center;gap:10px;}
  .tb{text-align:center;min-width:70px;}
  .ta{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:1px;line-height:1;}
  .tr{font-family:'DM Mono',monospace;font-size:9px;color:#8A909E;margin-top:4px;letter-spacing:1px;}
  .vs{text-align:center;padding:0 2px;}
  .vs-t{font-family:'DM Mono',monospace;font-size:8px;color:var(--muted);letter-spacing:2px;}
  .gt{font-family:'Bebas Neue',sans-serif;font-size:14px;color:var(--cyan);display:block;margin-top:2px;letter-spacing:1px;}
  .gm{text-align:right;}
  .sl{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:2px;letter-spacing:1px;}
  .sp{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;color:var(--text);}
  .ou{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);margin-top:2px;}
  .cb{padding:7px 14px 10px;border-top:1px solid var(--border);display:flex;align-items:center;gap:9px;}
  .cl{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:1px;white-space:nowrap;}
  .bt{flex:1;height:3px;background:var(--border);}
  .bf{height:100%;background:linear-gradient(90deg,var(--cyan),var(--magenta));}
  .cp{font-family:'DM Mono',monospace;font-size:11px;color:var(--cyan);white-space:nowrap;}
  .pb{padding:6px 14px;background:rgba(0,245,233,.05);border-top:1px solid rgba(0,245,233,.12);display:flex;align-items:center;justify-content:space-between;}
  .pklabel{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:2px;}
  .pkval{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1px;color:var(--cyan);}
  .pkedge{font-family:'DM Mono',monospace;font-size:9px;color:var(--gold);}

  /* INLINE ANALYSIS */
  .ina{background:rgba(0,245,233,.03);border:1px solid var(--cyan);border-top:none;padding:13px;margin-bottom:10px;}
  .ana-title{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:1px;color:var(--cyan);margin-bottom:8px;}
  .ana-body{font-size:12px;line-height:1.7;color:#9BA4B0;}
  .ana-body strong{color:var(--text);}
  .kf{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);}
  .fi{display:flex;align-items:flex-start;gap:6px;margin-bottom:5px;font-size:11px;color:#9BA4B0;}
  .fd{width:5px;height:5px;border-radius:50%;margin-top:4px;flex-shrink:0;}

  /* PROPS */
  .props-title{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:2px;color:var(--magenta);margin:20px 0 10px;}
  .pr{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:10px;padding:11px 13px;background:var(--surface);border:1px solid var(--border);margin-bottom:5px;}
  .pp{font-size:13px;font-weight:500;}
  .pt{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);margin-top:2px;}
  .pln{font-family:'DM Mono',monospace;font-size:11px;color:var(--text);text-align:center;}
  .pln span{display:block;font-size:9px;color:var(--muted);margin-bottom:1px;}
  .pd{font-family:'Bebas Neue',sans-serif;font-size:16px;text-align:center;min-width:46px;}
  .pd.over{color:var(--win);} .pd.under{color:var(--magenta);}

  /* PARLAY */
  .parlay-box{background:var(--surface);border:1px solid var(--border);padding:12px;margin-top:16px;}
  .parlay-title{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:2px;color:var(--muted);margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid var(--border);}
  .pleg{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border);font-size:11px;}
  .pleg:last-of-type{border-bottom:none;}
  .pln2{color:var(--text);font-weight:500;}
  .pline2{font-family:'DM Mono',monospace;color:var(--cyan);font-size:9px;}
  .podds{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
  .podds-l{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:2px;}
  .podds-v{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);}
  .ctabtn{width:100%;margin-top:9px;padding:9px;background:transparent;border:1px solid var(--cyan);color:var(--cyan);font-family:'DM Mono',monospace;font-size:9px;letter-spacing:3px;cursor:pointer;}

  /* ===== CHAT VIEW ===== */
  .chat-view{flex:1;display:flex;flex-direction:column;overflow:hidden;}
  .chat-topbar{padding:10px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0;}
  .chat-back{background:transparent;border:none;color:var(--muted);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:1px;cursor:pointer;padding:4px 0;}
  .chat-back:hover{color:var(--cyan);}
  .chat-title{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--text);}
  .chat-sub{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:1px;margin-left:auto;}

  .chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;}

  /* EMPTY STATE */
  .chat-empty{display:flex;flex-direction:column;gap:10px;}
  .chat-empty-label{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:2px;margin-bottom:4px;}
  .prompt-group{margin-bottom:14px;}
  .prompt-group-label{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:2px;margin-bottom:7px;}
  .prompt-pills{display:flex;flex-direction:column;gap:6px;}
  .ppill{background:var(--surface);border:1px solid var(--border);color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;padding:11px 14px;cursor:pointer;transition:all .2s;text-align:left;display:flex;align-items:center;gap:10px;border-radius:8px;}
  .ppill:hover{border-color:var(--cyan);color:var(--cyan);}
  .ppill-icon{font-size:16px;flex-shrink:0;}

  /* MESSAGE BUBBLES */
  .msg{display:flex;flex-direction:column;gap:4px;}
  .msg.user{align-items:flex-end;}
  .msg.ai{align-items:flex-start;}
  .bubble{padding:13px 15px;max-width:88%;line-height:1.65;font-size:15px;font-weight:400;}
  .bubble.user{background:#1E2B38;border:1px solid #2A3A4A;color:var(--text);border-radius:18px 18px 4px 18px;}
  .bubble.ai{background:var(--surface);border:1px solid var(--border);color:#C8D0DC;border-radius:4px 18px 18px 18px;}
  .bubble.ai strong{color:var(--text);font-weight:600;}
  .bubble.ai .verdict-line{font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px;display:block;line-height:1.65;}
  .bubble.ai .pct-pill{display:inline-flex;align-items:center;gap:5px;background:rgba(0,245,233,.08);border:1px solid rgba(0,245,233,.25);color:var(--cyan);font-size:12px;font-weight:500;padding:3px 10px;margin-bottom:10px;border-radius:20px;}
  .bubble.ai .factors{margin-top:11px;padding-top:11px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:7px;}
  .bubble.ai .factor{display:flex;align-items:flex-start;gap:8px;font-size:15px;color:#9BA4B0;line-height:1.65;}
  .bubble.ai .fdot{width:6px;height:6px;border-radius:50%;margin-top:7px;flex-shrink:0;}
  .msg-time{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);padding:2px 4px 0;}

  /* TYPING */
  .typing{display:flex;align-items:center;gap:5px;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:16px 16px 16px 4px;width:fit-content;}
  .tdot{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:td 1.2s ease-in-out infinite;}
  .tdot:nth-child(2){animation-delay:.2s;}
  .tdot:nth-child(3){animation-delay:.4s;}
  @keyframes td{0%,80%,100%{transform:scale(.7);opacity:.4}40%{transform:scale(1);opacity:1}}

  /* CHAT INPUT */
  .chat-input-area{padding:10px 14px 14px;border-top:1px solid var(--border);background:rgba(8,10,12,.97);flex-shrink:0;}
  .chat-input-row{display:flex;gap:8px;align-items:flex-end;}
  .chat-input{flex:1;background:var(--surface);border:1px solid var(--border);color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;padding:11px 14px;outline:none;transition:border-color .2s;resize:none;min-height:44px;max-height:120px;border-radius:22px;}
  .chat-input:focus{border-color:var(--cyan);}
  .chat-input::placeholder{color:var(--muted);}
  .send-btn{background:var(--cyan);border:none;color:var(--black);width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;}
  .send-btn:hover{background:var(--magenta);}
  .send-btn:disabled{opacity:.4;cursor:not-allowed;}
  .send-icon{width:18px;height:18px;}

  /* USAGE CAP */
  .cap-bar{padding:8px 14px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
  .cap-dots{display:flex;gap:5px;align-items:center;}
  .cap-dot{width:8px;height:8px;border-radius:50%;transition:all .3s;}
  .cap-dot.used{background:var(--border);}
  .cap-dot.avail{background:var(--cyan);}
  .cap-info{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;color:var(--muted);}
  .cap-info span{color:var(--cyan);font-weight:500;}
  .cap-upgrade{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:var(--gold);cursor:pointer;border:none;background:transparent;padding:0;}
  .cap-upgrade:hover{color:var(--text);}

  /* UPGRADE WALL */
  .upgrade-wall{margin:16px;animation:fadeIn .3s ease both;}
  .upgrade-inner{background:var(--surface);border:1px solid var(--magenta);padding:24px 20px;position:relative;overflow:hidden;}
  .upgrade-inner::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--magenta),var(--gold));}
  .upgrade-icon{font-size:28px;display:block;margin-bottom:12px;text-align:center;}
  .upgrade-title{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;color:var(--text);text-align:center;margin-bottom:4px;}
  .upgrade-sub{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:1px;text-align:center;margin-bottom:18px;line-height:1.6;}
  .upgrade-sub span{color:var(--cyan);}
  .upgrade-features{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
  .upgrade-feat{display:flex;align-items:center;gap:10px;font-size:13px;color:#9BA4B0;}
  .upgrade-feat-dot{width:5px;height:5px;border-radius:50%;background:var(--cyan);flex-shrink:0;}
  .upgrade-price{text-align:center;margin-bottom:16px;}
  .upgrade-amount{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:1px;color:var(--text);line-height:1;}
  .upgrade-period{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:2px;}
  .upgrade-btn{width:100%;padding:14px;background:linear-gradient(135deg,var(--cyan),var(--magenta));border:none;color:var(--black);font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;cursor:pointer;transition:opacity .2s;}
  .upgrade-btn:hover{opacity:.9;}
  .upgrade-reset{text-align:center;margin-top:12px;font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:1px;}
  .upgrade-reset span{color:var(--gold);}

  .disc{padding:8px;font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);text-align:center;flex-shrink:0;}
`;

const GAMES = [
  {
    key:"celtics",
    home:{abbr:"BOS",color:"#00D4AA",rec:"52-18 · HOME"},
    away:{abbr:"MIA",color:"#CE1141",rec:"34-36 · AWAY"},
    time:"7:30 PM ET", spread:"BOS -8.5", ou:"O/U 218.5", conf:74, pick:"BOS -8.5", edge:"+3.2 EDGE",
    analysis:{
      title:"BOS vs MIA",
      body:"Boston enters as heavy chalk for good reason. <strong>Tatum has eclipsed 32 points in 6 of his last 8 home games</strong>, and Miami allows the 4th-most points to small forwards over the past two weeks. The Heat are 2-8 ATS in their last 10 road games.",
      factors:[
        {color:"#00F5E9",text:"Tatum averaging 34.2 pts last 5 home games"},
        {color:"#F5C842",text:"MIA missing Robinson — affects 3pt defense"},
        {color:"#FF2D6B",text:"Line moved from -7 to -8.5 — sharp action"},
        {color:"#00F5E9",text:"BOS 8-2 ATS as home fav of 7+ pts"},
      ]
    }
  },
  {
    key:"nuggets",
    home:{abbr:"DEN",color:"#FEC524",rec:"48-22 · HOME"},
    away:{abbr:"LAL",color:"#552583",rec:"40-30 · AWAY"},
    time:"9:00 PM ET", spread:"DEN -5.5", ou:"O/U 224.0", conf:68, pick:"OVER 224.0", edge:"+2.1 EDGE",
    analysis:{
      title:"DEN vs LAL",
      body:"The Lakers are on their 3rd game in 4 nights at altitude. <strong>Jokic has posted a triple-double in 4 of his last 5 home matchups vs LAL</strong>. LeBron is probable but minutes may be managed.",
      factors:[
        {color:"#FF2D6B",text:"LAL on B2B — 3rd game in 4 nights"},
        {color:"#F5C842",text:"Jokic career avg 28.4 PTS vs LAL at home"},
        {color:"#FF2D6B",text:"LeBron probable but minutes concern"},
        {color:"#00F5E9",text:"Total opened 221, bet up to 224 — market sees points"},
      ]
    }
  },
  {
    key:"knicks",
    home:{abbr:"NYK",color:"#006BB6",rec:"44-26 · HOME"},
    away:{abbr:"OKC",color:"#007AC1",rec:"55-15 · AWAY"},
    time:"7:30 PM ET", spread:"OKC -2.5", ou:"O/U 216.0", conf:61, pick:"NYK +2.5", edge:"+1.4 EDGE",
    analysis:{
      title:"NYK vs OKC",
      body:"OKC is the best team in the West but <strong>Brunson at MSG averages 31.4 points over his last 6 home appearances</strong>. Thunder surrender more perimeter buckets on the road.",
      factors:[
        {color:"#00F5E9",text:"Brunson 31.4 avg pts last 6 MSG games"},
        {color:"#F5C842",text:"OKC allows 2.8 more 3PA/game on road"},
        {color:"#FF2D6B",text:"SGA listed questionable — monitor"},
        {color:"#00F5E9",text:"NYK 7-3 ATS as home underdog this season"},
      ]
    }
  }
];

const PROPS = [
  {player:"Jayson Tatum",team:"BOS · PF",line:"32.5",stat:"PTS",dir:"over"},
  {player:"Nikola Jokic",team:"DEN · C",line:"54.5",stat:"PRA",dir:"over"},
  {player:"Bam Adebayo",team:"MIA · C",line:"9.5",stat:"REB",dir:"under"},
  {player:"Jalen Brunson",team:"NYK · PG",line:"28.5",stat:"PTS",dir:"over"},
  {player:"LeBron James",team:"LAL · SF",line:"7.5",stat:"AST",dir:"under"},
];

const PROMPT_GROUPS = [
  {
    label:"POPULAR",
    prompts:[
      {icon:"🔮", text:"Who wins tonight and why?"},
      {icon:"📊", text:"Best player prop on tonight's slate"},
      {icon:"💎", text:"Find the best value bet tonight"},
      {icon:"💰", text:"Any market mispricing opportunities?"},
    ]
  },
  {
    label:"GAME ANALYSIS",
    prompts:[
      {icon:"⚡", text:"Break down the BOS vs MIA matchup"},
      {icon:"📈", text:"Which team covers the spread tonight?"},
      {icon:"🎯", text:"Best over/under play on the slate"},
      {icon:"⚠️", text:"Upset watch — any dogs worth backing?"},
    ]
  },
  {
    label:"PLAYER PROPS",
    prompts:[
      {icon:"🏀", text:"Will Tatum go over 32.5 points?"},
      {icon:"👑", text:"Is Jokic a value play tonight?"},
      {icon:"📌", text:"Best points prop on the slate"},
      {icon:"🎲", text:"Sleeper prop pick of the night"},
    ]
  },
];

// AI response generator — runs locally, no API needed
function generateResponse(question) {
  const q = question.toLowerCase();

  // SGA threes
  if (q.includes("sga") && (q.includes("three") || q.includes("3"))) {
    return {
      verdict: "LEAN OVER — SLIM EDGE",
      pct: "54%",
      body: "SGA has hit 2+ threes in 14 of his last 20 games, and his 3-point attempt rate at home sits at 6.2 per game this season. The matchup against NYK is workable — they rank 18th in 3-point defense allowed.\n\nHowever, the line at 2.5 is sharp and there isn't a strong edge either way. This is a slight lean over, not a strong play.",
      factors:[
        {color:"#00E676", text:"Hit 3+ threes in 9 of last 20 — consistent volume"},
        {color:"#00E676", text:"Home court — SGA averages 6.2 3PA at home"},
        {color:"#FF2D6B", text:"NYK ranks 18th in 3PA allowed — not a soft target"},
        {color:"#F5C842", text:"Line sharp at 2.5 — books respect his range"},
      ]
    };
  }

  // Burrow — any question about him
  if (q.includes("burrow")) {
    if (q.includes("yard")) {
      return {
        verdict: "OVER IS THE PLAY — 68% CONFIDENCE",
        pct: "68%",
        body: "Burrow threw for 4,475 yards in 2023 before injury cut his 2024 short. In full healthy seasons he projects to 4,400-4,600 yards based on yards-per-attempt and snap count trends.\n\nAt 4,268 the number is set conservatively. If Burrow stays healthy — the real variable — he clears this comfortably.",
        factors:[
          {color:"#00E676", text:"4,475 yards in 2023 full season — well above 4,268"},
          {color:"#00E676", text:"Bengals pass-heavy — 38.4 attempts per game healthy"},
          {color:"#FF2D6B", text:"Injury history is the primary risk — missed 6+ games twice"},
          {color:"#F5C842", text:"Line set conservatively accounting for injury risk"},
        ]
      };
    }
    if (q.includes("touchdown") || q.includes("td")) {
      return {
        verdict: "OVER 30 TDs — LEAN YES AT 63%",
        pct: "63%",
        body: "Burrow threw 41 touchdowns in his 2021 breakout and averaged 35+ in healthy full seasons. A 30 TD line is a low bar if he plays 16+ games — he's averaged 2.1 TDs per game when active.\n\nThe injury caveat is real. In seasons where he's played fewer than 14 games, he falls short. But if he's healthy, 30 TDs is very reachable.",
        factors:[
          {color:"#00E676", text:"41 TDs in 2021 — 30 is a low bar for healthy Burrow"},
          {color:"#00E676", text:"2.1 TD/game average when active — pace easily clears 30"},
          {color:"#FF2D6B", text:"Missed significant time in 2024 — injury risk is real"},
          {color:"#F5C842", text:"Bengals offensive weapons intact — Chase, Higgins healthy"},
        ]
      };
    }
    // General Burrow question
    return {
      verdict: "BURROW IS ELITE WHEN HEALTHY",
      pct: "65%",
      body: "Burrow is a top-3 QB talent but his season props carry meaningful injury risk. He's missed significant time in two of his last three seasons. When healthy, he's one of the most efficient passers in the league — any season prop on him is essentially a health bet first, talent bet second.\n\nWhat specific prop or stat are you asking about? Give me a line and I'll break it down.",
      factors:[
        {color:"#00E676", text:"Top-3 QB when healthy — elite efficiency metrics"},
        {color:"#FF2D6B", text:"Injury history — missed time in 2 of last 3 seasons"},
        {color:"#F5C842", text:"Any Burrow prop is a health bet first"},
        {color:"#00E676", text:"Bengals supporting cast strong — Chase, Higgins, Hendrickson"},
      ]
    };
  }

  // NFL touchdowns general
  if ((q.includes("touchdown") || q.includes(" td ") || q.includes("tds")) && !q.includes("nba")) {
    return {
      verdict: "NEED A SPECIFIC PLAYER OR LINE",
      pct: null,
      body: "Touchdown props are some of the best value bets in the NFL season. Running backs are historically underpriced on anytime TD props, and target-share leaders at WR have strong floor plays.\n\nGive me a specific player and line — like 'Will CMC score 12 TDs this season?' — and I'll give you a real breakdown.",
      factors:[
        {color:"#00E676", text:"RB anytime TD props historically underpriced"},
        {color:"#00E676", text:"High-target WRs near the red zone are strong floor plays"},
        {color:"#F5C842", text:"Ask me about a specific player + line for a real take"},
        {color:"#FF2D6B", text:"Avoid QB season TD totals — too much variance"},
      ]
    };
  }

  // Who wins tonight / general winner question
  if (q.includes("who wins") || q.includes("who win") || q.includes("winner") ||
      q.includes("wins tonight") || q.includes("win tonight") ||
      (q.includes("win") && q.includes("why")) || (q.includes("wins") && q.includes("why"))) {
    return {
      verdict: "BOS and DEN win. NYK covers.",
      pct: "varies",
      body: "Three games tonight. Boston is the strongest play — Tatum at home against a fading Miami team that is 2-8 ATS on the road. Denver handles a fatigued Lakers squad on their third game in four nights. The most interesting game is NYK vs OKC where we like the Knicks to cover at +2.5 — Brunson at MSG is a different player and SGA is questionable.\n\nBest moneyline value: NYK at home.",
      factors:[
        {color:"#00E676", text:"BOS -8.5 · 74% confidence · Best spread play tonight"},
        {color:"#00E676", text:"DEN -5.5 · 68% confidence · Jokic dominates tired LAL"},
        {color:"#F5C842", text:"NYK +2.5 · 61% confidence · Brunson at MSG"},
        {color:"#FF2D6B", text:"Avoid NYK/OKC moneyline — line is too sharp"},
      ]
    };
  }

  // Jokic
  if (q.includes("jokic")) {
    return {
      verdict: "Jokic is the anchor. Play him.",
      pct: "77%",
      body: "Jokic is the highest-floor play on tonight's slate. His PRA line of 54.5 against the Lakers is beatable — he averages 58.2 PRA against LAL over his last 8 matchups.\n\nThe Lakers are on a back-to-back with LeBron's minutes in question. That only adds to the value. He is the safest high-ceiling play on the board tonight.",
      factors:[
        {color:"#00E676", text:"Avg 58.2 PRA vs LAL over last 8 matchups"},
        {color:"#00E676", text:"LAL on B2B — fatigue kills defensive intensity"},
        {color:"#00E676", text:"LeBron minutes concern opens Jokic's lane further"},
        {color:"#FF2D6B", text:"Only risk: foul trouble or early blowout — low probability"},
      ]
    };
  }

  // Underdog specific line evaluation
  if (q.includes("underdog") || q.includes("pick em") || q.includes("pickem") || (q.includes(".") && q.includes("x") && (q.includes("should i") || q.includes("take it") || q.includes("worth it") || q.includes("value")))) {
    // Try to extract player, line, and multiplier from the question
    const isOver = q.includes("over");
    const isUnder = q.includes("under");
    // Parse multiplier e.g. "0.98x" or "1.2x"
    let mult = null;
    const words = q.split(' ');
    for (const w of words) {
      const cleaned = w.replace(/[^0-9.x]/g, '');
      if (cleaned.endsWith('x') && cleaned.length > 1) {
        const num = parseFloat(cleaned);
        if (!isNaN(num) && num > 0 && num < 10) { mult = num; break; }
      }
    }

    // Multiplier evaluation logic
    const multVerdict = () => {
      if (!mult) return null;
      if (mult >= 1.5) return { text: "High multiplier — strong value play if you like the pick", good: true };
      if (mult >= 1.2) return { text: "Solid multiplier — adds meaningful upside", good: true };
      if (mult >= 1.0) return { text: "Even money — only take it if the pick is strong", good: null };
      if (mult >= 0.9) return { text: "Discounted odds — the book sees risk here", good: false };
      return { text: "Low multiplier — Underdog is pricing this as near-certain", good: false };
    };

    const mv = multVerdict();

    // Tatum specific
    if (q.includes("tatum")) {
      const line = 28.5;
      return {
        verdict: mult && mult < 1.0 ? "Take it — line is a gift even at discount." : "Yes. 28.5 is well below his ceiling.",
        pct: "78%",
        body: "Tatum's home average this month is 34.2 points. A line of 28.5 is nearly 6 points below that — that is a significant cushion." + (mult ? " At " + mult + "x the multiplier is " + (mult >= 1.0 ? "fair value or better" : "discounted, which reflects the book's caution, but the line itself is generous enough to still take") + "." : "") + "\n\nThe MIA matchup is favorable — Robinson is out and Miami allows the 4th-most points to small forwards. Unless Tatum sits out or BOS blows them out early and rests starters, this hits.",
        factors: [
          {color:"#00E676", text:"28.5 line — 5.7 pts below his monthly home average of 34.2"},
          {color:"#00E676", text:"MIA missing Robinson — soft perimeter defense tonight"},
          mv ? {color: mv.good === true ? "#00E676" : mv.good === false ? "#FF2D6B" : "#F5C842", text: mv.text} : {color:"#F5C842", text:"No multiplier detected — evaluate at standard odds"},
          {color:"#FF2D6B", text:"Only risk: early blowout causes early rest — watch the score"},
        ]
      };
    }

    // Jokic specific
    if (q.includes("jokic")) {
      return {
        verdict: mult && mult < 1.0 ? "Still worth it — line is too low." : "Yes. Take it.",
        pct: "75%",
        body: "Jokic's PRA average against LAL over his last 8 home matchups is 58.2. Any line under 56 is beatable." + (mult ? " At " + mult + "x, " + (mult >= 1.0 ? "this is strong value." : "the discount reflects injury uncertainty on LAL's end — but the matchup still favors him.") : "") + "\n\nLAL is on a B2B. LeBron's minutes may be limited. Jokic will feast.",
        factors: [
          {color:"#00E676", text:"58.2 avg PRA vs LAL last 8 home games"},
          {color:"#00E676", text:"LAL B2B fatigue — defensive intensity will drop late"},
          mv ? {color: mv.good === true ? "#00E676" : mv.good === false ? "#FF2D6B" : "#F5C842", text: mv.text} : {color:"#F5C842", text:"Check the multiplier before placing"},
          {color:"#FF2D6B", text:"Risk: early blowout or foul trouble"},
        ]
      };
    }

    // Generic Underdog line question
    return {
      verdict: mult ? (mult >= 1.0 ? "Multiplier looks playable — depends on the line." : "Low multiplier — book sees risk.") : "Need the player and line to evaluate.",
      pct: null,
      body: "To give you a real take on an Underdog line I need three things: the player, the stat line, and the multiplier." + (mult ? " You've got the multiplier at " + mult + "x — " + (mv ? mv.text.toLowerCase() : "") + "." : "") + "\n\nAsk me something like: 'Underdog has Jokic PRA over 54.5 at 1.2x — take it?' and I'll tell you whether the line has value and whether the multiplier makes it worth playing.",
      factors: [
        {color:"#00E676", text:"Lines at 1.0x or above — take if the pick is strong"},
        {color:"#F5C842", text:"Lines at 0.9-0.99x — only if the edge is significant"},
        {color:"#FF2D6B", text:"Lines below 0.85x — book is pricing near-certain, fade"},
        {color:"#F5C842", text:"Always compare to the implied probability of the line"},
      ]
    };
  }

  // Tatum
  if (q.includes("tatum")) {
    return {
      verdict: "Strong over. Top pick tonight.",
      pct: "81%",
      body: "This is our highest-confidence prop on the slate. Tatum has gone over 32.5 in 6 of his last 8 home games and MIA is allowing the 4th-most points to small forwards this month.\n\nWith Robinson out for Miami their perimeter defense is compromised. Tatum will attack that gap all night.",
      factors:[
        {color:"#00E676", text:"Over 32.5 in 6 of his last 8 home games"},
        {color:"#00E676", text:"MIA missing Robinson — weakened perimeter D"},
        {color:"#00E676", text:"BOS likely to build lead, keeping Tatum in rhythm"},
        {color:"#F5C842", text:"Only risk: early blowout leads to early rest"},
      ]
    };
  }

  // Best prop / best bet / value
  if (q.includes("best") && (q.includes("prop") || q.includes("value") || q.includes("bet") || q.includes("pick") || q.includes("play"))) {
    return {
      verdict: "Tatum over 32.5 is the best bet tonight.",
      pct: "81%",
      body: "Tatum over 32.5 is the strongest play on tonight's slate. It checks every box — favorable matchup, strong recent form, and a line the market hasn't fully adjusted for with Robinson out.\n\nSecond choice is Jokic PRA over 54.5 at 77% confidence. Parlay both with BOS -8.5 for +512.",
      factors:[
        {color:"#00E676", text:"Tatum over 32.5 — 81% confidence, top play"},
        {color:"#00E676", text:"Jokic PRA over 54.5 — 77% confidence, second play"},
        {color:"#F5C842", text:"Parlay both with BOS -8.5 for +512 odds"},
        {color:"#FF2D6B", text:"Avoid low-confidence plays under 60% tonight"},
      ]
    };
  }

  // Spread / cover
  if (q.includes("cover") || q.includes("spread") || q.includes("ats")) {
    return {
      verdict: "BOS -8.5 is the spread play.",
      pct: "74%",
      body: "Boston at -8.5 is the cleanest spread on the board. The Celtics are 8-2 ATS as home favorites of 7 or more points and Miami has been covering at a dismal rate on the road this season.\n\nThe line moved from -7 to -8.5 — that is sharp money on Boston. Follow it.",
      factors:[
        {color:"#00E676", text:"BOS 8-2 ATS as home favorite of 7+ pts"},
        {color:"#00E676", text:"Line moved -7 to -8.5 — sharp money following Boston"},
        {color:"#FF2D6B", text:"MIA 2-8 ATS in their last 10 road games"},
        {color:"#F5C842", text:"DEN -5.5 is a solid second option"},
      ]
    };
  }

  // Over under / total
  if (q.includes("over") || q.includes("under") || q.includes("total") || q.includes("o/u")) {
    return {
      verdict: "DEN/LAL over 224 is the play.",
      pct: "68%",
      body: "The DEN/LAL total of 224 is the best over on the slate. Both teams have gone over in 5 of their last 7 matchups and Denver's home pace is elite. The total opened at 221 and has been bet up — the market is seeing points.\n\nAvoid the BOS/MIA total — Miami will muck up the pace.",
      factors:[
        {color:"#00E676", text:"DEN/LAL over in 5 of last 7 meetings"},
        {color:"#00E676", text:"Total moved 221 to 224 — public and sharp both on over"},
        {color:"#FF2D6B", text:"LAL fatigue could slow the pace in the fourth"},
        {color:"#F5C842", text:"BOS/MIA total — lean under, Miami plays slow"},
      ]
    };
  }

  // LeBron
  if (q.includes("lebron") || q.includes("lbj") || q.includes("james")) {
    return {
      verdict: "Fade LeBron tonight. B2B risk.",
      pct: "58%",
      body: "LeBron is on a back-to-back playing his third game in four nights. His assist line of 7.5 is the most interesting prop — he tends to facilitate more when conserving energy, but if he is limited to 28-30 minutes the under hits easily.\n\nWait for the injury report before acting on any LeBron prop.",
      factors:[
        {color:"#FF2D6B", text:"B2B — 3rd game in 4 nights, energy management likely"},
        {color:"#F5C842", text:"7.5 assists — if minutes limited, under is the play"},
        {color:"#F5C842", text:"Monitor the injury report before betting"},
        {color:"#00E676", text:"If full go — LeBron historically plays well vs DEN"},
      ]
    };
  }

  // Brunson
  if (q.includes("brunson")) {
    return {
      verdict: "Brunson over. MSG is his house.",
      pct: "66%",
      body: "Brunson at Madison Square Garden is genuinely a different player. His 31.4 point average over the last 6 home games makes the 28.5 line look like a gift.\n\nOKC will make him work — they are a top-5 defensive team — but Brunson's shot creation at home is elite. Lean over.",
      factors:[
        {color:"#00E676", text:"31.4 avg pts across last 6 MSG home games"},
        {color:"#00E676", text:"Line at 28.5 — set 3 pts below his home average"},
        {color:"#FF2D6B", text:"OKC top-5 defense — it won't come easy"},
        {color:"#F5C842", text:"SGA questionable — if out, OKC defense may soften"},
      ]
    };
  }

  // CeeDee Lamb / specific WR TD props
  if (q.includes("ceedee") || q.includes("lamb") || q.includes("cd lamb")) {
    return {
      verdict: "CeeDee over 12 TDs — yes at 64%.",
      pct: "64%",
      body: "CeeDee Lamb is the most target-dominant wide receiver in the NFL. With Dak healthy he saw 135 targets in 2023 and scored 12 touchdowns. The Cowboys' offensive design flows through him near the red zone.\n\nAt 12 TDs the line is fair but slightly undervalued. If Dallas improves their red zone efficiency — which was subpar last year — Lamb easily clears it.",
      factors:[
        {color:"#00E676", text:"135 targets in 2023 — most in the NFL among WRs"},
        {color:"#00E676", text:"12 TDs in 2023 — already hit this number once"},
        {color:"#FF2D6B", text:"Cowboys red zone efficiency was below average last season"},
        {color:"#F5C842", text:"Dak health is the key variable — monitor training camp"},
      ]
    };
  }

  // ===== TENNIS =====
  if (q.includes("tennis") || q.includes("wta") || q.includes("atp") || q.includes("miami open") || q.includes("serve") || q.includes("set") || q.includes("ace")) {
    if (q.includes("ace") || q.includes("aces")) {
      return {
        verdict: "Ace props are volatile — surface and server matter most.",
        pct: "60%",
        body: "Ace props are highly dependent on surface speed and opponent return game. Hard courts at Miami play medium-fast — expect 6-12 aces from big servers like Medvedev or Isner. Grass would push that number higher.\n\nAlways check: is the server a volume ace generator? Isner averages 14+ per match. Djokovic averages 4-5. The line needs to match the player profile.",
        factors: [
          {color:"#00E676", text:"Hard court Miami — medium pace, favors servers"},
          {color:"#00E676", text:"Big servers: Isner, Karlovic, Medvedev — over is strong"},
          {color:"#FF2D6B", text:"Baseline grinders: Djokovic, Alcaraz — under is safer"},
          {color:"#F5C842", text:"Check weather — wind kills ace volume significantly"},
        ]
      };
    }
    if (q.includes("volynets") || q.includes("hon") || q.includes("wta") || q.includes("women")) {
      return {
        verdict: "Volynets covers. 68% confidence.",
        pct: "68%",
        body: "Katie Volynets has a +1.3% form rating and profiles stronger on hard court. Priscilla Hon sits at -4.4% form — she's been underperforming her ranking over the last two months.\n\nThe form-adjusted odds favor Volynets at 68.7%. Hard court at Miami suits her game. Take Volynets to win and consider the spread at -1.5 sets.",
        factors: [
          {color:"#00E676", text:"Volynets +1.3% form — trending in the right direction"},
          {color:"#FF2D6B", text:"Hon -4.4% form — struggling against expectations"},
          {color:"#00E676", text:"Form-adjusted probability: Volynets 68.7%"},
          {color:"#F5C842", text:"Spread -1.5 sets adds risk but boosts payout"},
        ]
      };
    }
    if (q.includes("over") || q.includes("under") || q.includes("total") || q.includes("games")) {
      return {
        verdict: "Lean over on games totals at Miami.",
        pct: "63%",
        body: "Miami Open hard courts play slightly slower than tour average this year, leading to longer rallies and more games played. Matches between evenly-matched players are going over at a 58% rate in early rounds.\n\nAvoid unders unless one player is heavily favored — upsets are common in R1 qualifying and they inflate game counts.",
        factors: [
          {color:"#00E676", text:"Miami courts playing slower — longer rallies, more games"},
          {color:"#00E676", text:"58% of R1 matches going over games total this tournament"},
          {color:"#FF2D6B", text:"Heavy favorites often close out fast — check the matchup"},
          {color:"#F5C842", text:"Weather and wind conditions affect game count significantly"},
        ]
      };
    }
    return {
      verdict: "Miami Open is live. What's the matchup?",
      pct: null,
      body: "We're tracking the Miami Open right now. Volynets vs Hon in qualifying is the featured match — Volynets is the play at 68% confidence based on form ratings.\n\nAsk me about a specific matchup, player, or prop — aces, games totals, set spreads — and I'll give you a focused breakdown.",
      factors: [
        {color:"#00E676", text:"Featured match: Volynets vs Hon — Volynets 68% conf"},
        {color:"#00E676", text:"Hard court Miami — favors baseline power hitters"},
        {color:"#F5C842", text:"Ask me about any specific player or matchup"},
        {color:"#FF2D6B", text:"Early rounds — form matters more than ranking"},
      ]
    };
  }

  // ===== NHL =====
  if (q.includes("nhl") || q.includes("hockey") || q.includes("puck") || q.includes("goal") || q.includes("powerplay") || q.includes("power play")) {
    if (q.includes("over") || q.includes("under") || q.includes("total") || q.includes("goals")) {
      return {
        verdict: "NHL overs are hitting at 54% this month.",
        pct: "54%",
        body: "NHL totals are set at 5.5 or 6 for most games. The over is slightly profitable this season at 54% — goalie fatigue and back-to-backs are the main drivers.\n\nBest over spots: divisional rivalries where both teams push pace, and any game where a top-10 power play unit faces a bottom-10 penalty kill. Avoid overs in tight playoff races where teams play defensive hockey.",
        factors: [
          {color:"#00E676", text:"Overs hitting 54% league-wide this month"},
          {color:"#00E676", text:"B2B goalie starts — fatigue inflates goals in 3rd period"},
          {color:"#FF2D6B", text:"Playoff race teams play trap defense — lean under"},
          {color:"#F5C842", text:"Power play vs penalty kill matchup is key variable"},
        ]
      };
    }
    if (q.includes("prop") || q.includes("shot") || q.includes("point") || q.includes("assist")) {
      return {
        verdict: "Shots on goal props are the edge in NHL.",
        pct: "62%",
        body: "NHL player props are most efficient on shots on goal. Top forwards on strong possession teams average 3.5-5 SOG per game — lines set at 2.5 are frequently beatable for elite players like McDavid, Draisaitl, or Matthews.\n\nPoints props are riskier — a single power play can swing an entire game. Stick to SOG and first goal scorer for the best edges.",
        factors: [
          {color:"#00E676", text:"SOG props — elite forwards at 3.5-5 per game average"},
          {color:"#00E676", text:"McDavid, Draisaitl, Matthews — SOG over 2.5 is consistent value"},
          {color:"#FF2D6B", text:"Points props volatile — single PP opportunity swings results"},
          {color:"#F5C842", text:"Check starting goalie — pulled goalie inflates SOG late"},
        ]
      };
    }
    if (q.includes("moneyline") || q.includes("win") || q.includes("puck line")) {
      return {
        verdict: "Puck line favorites cover 47% — slight fade edge.",
        pct: "53%",
        body: "NHL puck lines at -1.5 cover at only 47% league-wide — the market overprices heavy favorites. The value is almost always on the underdog puck line (+1.5) or the moneyline underdog outright.\n\nBest spots: home underdogs in divisional games, teams playing their third game in five nights on the road, and any matchup where the starting goalie is a significant upgrade over the opponent.",
        factors: [
          {color:"#00E676", text:"Underdog puck line +1.5 covers 53% historically"},
          {color:"#FF2D6B", text:"Favorite puck line -1.5 only covers 47% — avoid"},
          {color:"#00E676", text:"Home underdogs in division games — strong lean"},
          {color:"#F5C842", text:"Goalie matchup is the single biggest handicapping factor"},
        ]
      };
    }
    return {
      verdict: "NHL slate — what's the angle?",
      pct: null,
      body: "Hockey betting is all about goalie matchups, pace of play, and special teams efficiency. The best edges are on shots on goal props, underdog puck lines, and totals in back-to-back situations.\n\nAsk me about a specific game, player prop, or betting angle and I'll give you the breakdown.",
      factors: [
        {color:"#00E676", text:"Best NHL edge: SOG props on elite forwards"},
        {color:"#00E676", text:"Underdog puck line +1.5 covers 53% historically"},
        {color:"#F5C842", text:"Always check starting goalies before betting"},
        {color:"#FF2D6B", text:"Avoid favorite puck lines — books price them perfectly"},
      ]
    };
  }

  // Default / fallback
  return {
    verdict: "SOLID QUESTION — HERE'S THE TAKE",
    pct: null,
    body: "Based on tonight's slate, the strongest plays are BOS -8.5 (74% conf), Tatum over 32.5 pts (81% conf), and Jokic PRA over 54.5 (77% conf). The DEN/LAL over 224 is also strong at 68%.\n\nFor specific player props, matchup angles, or season projections — ask me directly about any player or game and I'll give you a focused breakdown.",
    factors:[
      {color:"#00E676", text:"Top pick: Tatum OVER 32.5 · 81% confidence"},
      {color:"#00E676", text:"Best spread: BOS -8.5 · 74% confidence"},
      {color:"#00E676", text:"Best total: DEN/LAL OVER 224 · 68% confidence"},
      {color:"#F5C842", text:"Ask me about any specific player or matchup"},
    ]
  };
}

function now() {
  return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}

export default function App() {
  const [view, setView] = useState("slate");
  const [activeGame, setActiveGame] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [queriesUsed, setQueriesUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
   const [liveGames, setLiveGames] = useState([]);
  const [modelProps, setModelProps] = useState([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState(null);
  const [activeSport, setActiveSport] = useState("basketball_nba");
  const DAILY_LIMIT = 3;
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);

  const queriesLeft = DAILY_LIMIT - queriesUsed;
  const hoursUntilReset = 24 - new Date().getHours();
  async function fetchModelProps() {
    try {
      const res = await fetch("/api/model-props");
      const data = await res.json();
      setModelProps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading model props:", err);
      setModelProps([]);
    }
  }
  // Fetch live odds on mount and sport change
  useEffect(() => {
  async function fetchOdds() {
    setLiveLoading(true);
    setLiveError(null);

    try {
      const res = await fetch(`/api/odds?sport=${activeSport}`);
      const data = await res.json();

      if (process.env.NODE_ENV === "development") {   console.log("odds response:", data); }

      const gamesArray =
        Array.isArray(data) ? data :
        Array.isArray(data?.data) ? data.data :
        Array.isArray(data?.games) ? data.games :
        [];

      if (!res.ok) {
  setLiveError("Odds API request failed.");
  setLiveGames([]);
  return;
}

if (data?.error) {
  setLiveError("Odds API returned an error.");
  setLiveGames([]);
  return;
}

if (gamesArray.length === 0) {
  setLiveError("No games available for this sport.");
  setLiveGames([]);
  return;
}

      const TEAM_MAP = {
        "Atlanta Hawks": { abbr: "ATL", color: "#E03A3E" },
        "Boston Celtics": { abbr: "BOS", color: "#007A33" },
        "Brooklyn Nets": { abbr: "BKN", color: "#6B6B6B" },
        "Charlotte Hornets": { abbr: "CHA", color: "#1D1160" },
        "Chicago Bulls": { abbr: "CHI", color: "#CE1141" },
        "Cleveland Cavaliers": { abbr: "CLE", color: "#860038" },
        "Dallas Mavericks": { abbr: "DAL", color: "#00538C" },
        "Denver Nuggets": { abbr: "DEN", color: "#0E2240" },
        "Detroit Pistons": { abbr: "DET", color: "#C8102E" },
        "Golden State Warriors": { abbr: "GSW", color: "#1D428A" },
        "Houston Rockets": { abbr: "HOU", color: "#CE1141" },
        "Indiana Pacers": { abbr: "IND", color: "#002D62" },
        "Los Angeles Clippers": { abbr: "LAC", color: "#C8102E" },
        "Los Angeles Lakers": { abbr: "LAL", color: "#552583" },
        "Memphis Grizzlies": { abbr: "MEM", color: "#5D76A9" },
        "Miami Heat": { abbr: "MIA", color: "#98002E" },
        "Milwaukee Bucks": { abbr: "MIL", color: "#00471B" },
        "Minnesota Timberwolves": { abbr: "MIN", color: "#236192" },
        "New Orleans Pelicans": { abbr: "NOP", color: "#0C2340" },
        "New York Knicks": { abbr: "NYK", color: "#006BB6" },
        "Oklahoma City Thunder": { abbr: "OKC", color: "#007AC1" },
        "Orlando Magic": { abbr: "ORL", color: "#0077C0" },
        "Philadelphia 76ers": { abbr: "PHI", color: "#006BB6" },
        "Phoenix Suns": { abbr: "PHX", color: "#1D1160" },
        "Portland Trail Blazers": { abbr: "POR", color: "#E03A3E" },
        "Sacramento Kings": { abbr: "SAC", color: "#5A2D81" },
        "San Antonio Spurs": { abbr: "SAS", color: "#8A8D8F" },
        "Toronto Raptors": { abbr: "TOR", color: "#CE1141" },
        "Utah Jazz": { abbr: "UTA", color: "#002B5C" },
        "Washington Wizards": { abbr: "WAS", color: "#002B5C" },
      };

      const getTeam = (name) => {
        if (TEAM_MAP[name]) return TEAM_MAP[name];
        for (const [key, val] of Object.entries(TEAM_MAP)) {
          if (name.includes(key.split(" ").pop())) return val;
        }
        return {
          abbr: name.split(" ").pop().substring(0, 3).toUpperCase(),
          color: "#888888"
        };
      };

      const transformed = gamesArray.slice(0, 5).map((game, i) => {
        const spread = game.bookmakers?.[0]?.markets?.find(m => m.key === "spreads");
        const total = game.bookmakers?.[0]?.markets?.find(m => m.key === "totals");

        const homeTeam = game.home_team;
        const awayTeam = game.away_team;

        const homeTeamData = getTeam(homeTeam);
        const awayTeamData = getTeam(awayTeam);

        const homeAbbr = homeTeamData.abbr;
        const awayAbbr = awayTeamData.abbr;

        const spreadOutcome = spread?.outcomes?.find(o => o.name === homeTeam);
        const spreadVal = spreadOutcome
          ? (spreadOutcome.point > 0 ? "+" : "") + spreadOutcome.point
          : "PK";

        const totalVal = total?.outcomes?.[0]?.point || "—";

        const gameTime = new Date(game.commence_time);
        const timeStr =
          gameTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }) + " ET";

        return {
          key: game.id || `${homeAbbr}-${awayAbbr}-${i}`,
          home: { abbr: homeAbbr, color: homeTeamData.color, rec: homeTeam },
          away: { abbr: awayAbbr, color: awayTeamData.color, rec: awayTeam },
          time: timeStr,
          spread: homeAbbr + " " + spreadVal,
          ou: "O/U " + totalVal,
          conf: Math.floor(55 + Math.random() * 20),
          pick: spreadVal !== "PK" ? homeAbbr + " " + spreadVal : homeAbbr + " ML",
          edge: "+" + (1 + Math.random() * 3).toFixed(1) + " EDGE",
          analysis: {
            title: homeAbbr + " vs " + awayAbbr,
            body:
              "Live game data loaded. <strong>" +
              homeTeam +
              " host " +
              awayTeam +
              "</strong> with the spread set at " +
              spreadVal +
              ". Total is " +
              totalVal +
              ". Ask UR TAKE for a full breakdown of this matchup.",
            factors: [
              { color: "#00F5E9", text: "Spread: " + homeAbbr + " " + spreadVal },
              { color: "#F5C842", text: "Total: O/U " + totalVal },
              { color: "#00F5E9", text: "Game time: " + timeStr },
              { color: "#FF2D6B", text: "Ask UR TAKE for full AI analysis" },
            ]
          }
        };
      });

            setLiveGames(transformed);
      if (transformed.length > 0) {
        setActiveGame(transformed[0].key);
      }
    } catch (err) {
  console.error("Odds fetch crashed:", err);
  setLiveError("Network error connecting to odds service.");
  setLiveGames([]);
    } finally {
      setLiveLoading(false);
    }
  }

    fetchOdds();
  fetchModelProps();
}, [activeSport]);

  // Use live games if available, fall back to hardcoded
  const displayGames = liveGames.length > 0 ? liveGames : GAMES;
  const cur = displayGames.find(g => g.key === activeGame) || displayGames[0];

// cur now defined in App component with live data

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({behavior:"smooth"});
  }, [messages, typing]);

  function openChat() {
    setView("chat");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg) return;
    if (queriesUsed >= DAILY_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    setInput("");
    setQueriesUsed(prev => prev + 1);
    if (queriesUsed + 1 >= DAILY_LIMIT) setShowUpgrade(false);
    const userMsg = {role:"user", text:msg, time:now()};
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const resp = generateResponse(msg);
      setTyping(false);
      setMessages(prev => [...prev, {role:"ai", ...resp, time:now()}]);
      if (queriesUsed + 1 >= DAILY_LIMIT) {
        setTimeout(() => setShowUpgrade(true), 1800);
      }
    }, 900 + Math.random() * 600);
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="hdr">
          <div>
            <div className="logo">
              <span className="logo-under">UNDER</span>
              <span className="logo-review">REVIEW</span>
            </div>
          </div>
          <div className="hdr-r">
            <div className="hdr-rec">
              <span className="w">47W</span>—<span className="l">31L</span>
            </div>
            <button
              className={`ask-btn-hdr${view==="chat"?" active":""}`}
              onClick={() => view==="chat" ? setView("slate") : openChat()}
            >
              {view==="chat" ? "← SLATE" : "UR TAKE"}
            </button>
          </div>
        </header>

        {view === "slate" && (
          <div className="view">
            <div className="slate-scroll">
          <div className="slate-hdr">
  <div>
    <div className="slate-title">
      {activeSport === "basketball_nba" ? "TONIGHT'S " : "SEASON "}
      <span>{activeSport === "basketball_nba" ? "SLATE" : "PROJECTIONS"}</span>
    </div>

    <div style={{ marginTop: "10px" }}>
      <select
        value={activeSport}
        onChange={(e) => setActiveSport(e.target.value)}
        style={{
          background: "#0F1215",
          color: "#E8EAF0",
          border: "1px solid #1E2328",
          padding: "8px 10px",
          fontFamily: "DM Mono, monospace",
          fontSize: "11px",
          letterSpacing: "1px"
        }}
      >
        <option value="basketball_nba">NBA</option>
        <option value="americanfootball_nfl">NFL</option>
      </select>
    </div>
  </div>

  <div className="ai-tag">AI POWERED</div>
</div>

              {liveLoading && (
              <div style={{padding:"20px",textAlign:"center",fontFamily:"DM Mono,monospace",fontSize:"11px",color:"var(--muted)",letterSpacing:"2px"}}>
                LOADING LIVE ODDS...
              </div>
            )}
            {liveError && (
              <div style={{padding:"12px 16px",background:"rgba(255,45,107,.08)",border:"1px solid rgba(255,45,107,.2)",marginBottom:"12px",fontFamily:"DM Mono,monospace",fontSize:"11px",color:"var(--magenta)"}}>
                {liveError} — showing demo data
              </div>
            )}
            {activeSport === "basketball_nba" && displayGames.map(g => (
                <div key={g.key}>
                                  <div
                    className={`gc${activeGame===g.key?" active":""}`}
                    onClick={() => setActiveGame(g.key)}
                  >
                    <div className="gc-top">
                      <div className="teams">
                        <div className="tb">
                          <div className="ta" style={{color:g.home.color}}>{g.home.abbr}</div>
                          <div className="tr">{g.home.rec}</div>
                        </div>
                        <div className="vs">
                          <div className="vs-t">VS</div>
                          <span className="gt">{g.time}</span>
                        </div>
                        <div className="tb">
                          <div className="ta" style={{color:g.away.color}}>{g.away.abbr}</div>
                          <div className="tr">{g.away.rec}</div>
                        </div>
                      </div>
                      <div className="gm">
                        <div className="sl">SPREAD</div>
                        <div className="sp">{g.spread}</div>
                        <div className="ou">{g.ou}</div>
                      </div>
                    </div>
                    <div className="cb">
                      <div className="cl">AI CONF</div>
                      <div className="bt"><div className="bf" style={{width:g.conf+"%"}}/></div>
                      <div className="cp">{g.conf}%</div>
                    </div>
                    <div className="pb">
                      <div className="pklabel">UR PICK</div>
                      <div className="pkval">{g.pick}</div>
                      <div className="pkedge">{g.edge}</div>
                    </div>
                  </div>
                  {activeGame===g.key && (
                    <div className="ina">
                      <div className="ana-title">{g.analysis.title} — AI BREAKDOWN</div>
                      <div className="ana-body" dangerouslySetInnerHTML={{__html:g.analysis.body}}/>
                      <div className="kf">
                        {g.analysis.factors.map((f,i)=>(
                          <div key={i} className="fi">
                            <div className="fd" style={{background:f.color}}/>
                            <span>{f.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
{activeSport === "americanfootball_nfl" && (
  <div style={{ marginTop: "10px" }}>
    <div className="props-title">QB PROJECTIONS</div>
    {[
      { player: "Patrick Mahomes", team: "KC", line: "4650", stat: "PASS YDS", dir: "over" },
      { player: "Josh Allen", team: "BUF", line: "4300", stat: "PASS YDS", dir: "over" },
      { player: "Joe Burrow", team: "CIN", line: "4400", stat: "PASS YDS", dir: "over" },
      { player: "C.J. Stroud", team: "HOU", line: "4100", stat: "PASS YDS", dir: "over" },
      { player: "Lamar Jackson", team: "BAL", line: "3850", stat: "PASS YDS", dir: "over" },
    ].map((p, i) => (
      <div key={i} className="pr">
        <div>
          <div className="pp">{p.player}</div>
          <div className="pt">{p.team}</div>
        </div>
        <div className="pln">
          <span>{p.stat}</span>
          {p.line}
        </div>
        <div className={`pd ${p.dir}`}>{p.dir.toUpperCase()}</div>
      </div>
    ))}

    <div className="props-title">RB PROJECTIONS</div>
    {[
      { player: "Christian McCaffrey", team: "SF", line: "1325", stat: "RUSH YDS", dir: "over" },
      { player: "Bijan Robinson", team: "ATL", line: "1210", stat: "RUSH YDS", dir: "over" },
      { player: "Breece Hall", team: "NYJ", line: "1180", stat: "RUSH YDS", dir: "over" },
      { player: "Jonathan Taylor", team: "IND", line: "1140", stat: "RUSH YDS", dir: "over" },
      { player: "Saquon Barkley", team: "PHI", line: "1090", stat: "RUSH YDS", dir: "over" },
    ].map((p, i) => (
      <div key={i} className="pr">
        <div>
          <div className="pp">{p.player}</div>
          <div className="pt">{p.team}</div>
        </div>
        <div className="pln">
          <span>{p.stat}</span>
          {p.line}
        </div>
        <div className={`pd ${p.dir}`}>{p.dir.toUpperCase()}</div>
      </div>
    ))}

    <div className="props-title">WR PROJECTIONS</div>
    {[
      { player: "Justin Jefferson", team: "MIN", line: "1480", stat: "REC YDS", dir: "over" },
      { player: "CeeDee Lamb", team: "DAL", line: "1450", stat: "REC YDS", dir: "over" },
      { player: "Ja'Marr Chase", team: "CIN", line: "1390", stat: "REC YDS", dir: "over" },
      { player: "Amon-Ra St. Brown", team: "DET", line: "1360", stat: "REC YDS", dir: "over" },
      { player: "A.J. Brown", team: "PHI", line: "1310", stat: "REC YDS", dir: "over" },
    ].map((p, i) => (
      <div key={i} className="pr">
        <div>
          <div className="pp">{p.player}</div>
          <div className="pt">{p.team}</div>
        </div>
        <div className="pln">
          <span>{p.stat}</span>
          {p.line}
        </div>
        <div className={`pd ${p.dir}`}>{p.dir.toUpperCase()}</div>
      </div>
    ))}
  </div>
)}
                      {activeSport === "basketball_nba" && (
  <>
    <div className="props-title">UR MODEL PROPS — TONIGHT</div>
    {(modelProps.length > 0 ? modelProps : PROPS).map((p, i) => (
      <div key={i} className="pr">
        <div>
          <div className="pp">{p.player}</div>
          <div className="pt">{p.team}</div>
        </div>
        <div className="pln">
          <span>{p.stat}</span>
          {p.line}
        </div>
        <div className={`pd ${p.dir}`}>{p.dir.toUpperCase()}</div>
      </div>
    ))}
  </>
)}

              <div className="parlay-box">
                <div className="parlay-title">PARLAY OF THE DAY</div>
                {[
                  {name:"Tatum OVER 32.5 pts",line:"BOS vs MIA · 81% CONF"},
                  {name:"Jokic OVER 54.5 PRA",line:"DEN vs LAL · 77% CONF"},
                  {name:"BOS -8.5",line:"BOS vs MIA · 74% CONF"},
                ].map((leg,i)=>(
                  <div key={i} className="pleg">
                    <div className="pln2">{leg.name}</div>
                    <div className="pline2">{leg.line}</div>
                  </div>
                ))}
                <div className="podds">
                  <div className="podds-l">3-LEG ODDS</div>
                  <div className="podds-v">+512</div>
                </div>
                <button className="ctabtn" onClick={openChat}>UR TAKE FOR MORE PICKS →</button>
              </div>
            </div>
          </div>
        )}

        {view === "chat" && (
          <div className="chat-view">
            <div className="chat-topbar">
              <button className="chat-back" onClick={()=>setView("slate")}>← SLATE</button>
              <div className="chat-title">UR TAKE</div>
              <div className="chat-sub">NBA · MAR 15</div>
            </div>

            <div className="cap-bar">
              <div className="cap-dots">
                {[...Array(DAILY_LIMIT)].map((_,i) => (
                  <div key={i} className={`cap-dot ${i < queriesUsed ? "used" : "avail"}`}/>
                ))}
                <div className="cap-info" style={{marginLeft:6}}>
                  <span>{queriesLeft}</span> of {DAILY_LIMIT} free takes today
                </div>
              </div>
              {queriesLeft === 0
                ? <button className="cap-upgrade" onClick={()=>setShowUpgrade(true)}>UPGRADE →</button>
                : <div className="cap-info">resets in <span>{hoursUntilReset}h</span></div>
              }
            </div>

            <div className="chat-messages">
              {messages.length === 0 && !typing && (
                <div className="chat-empty">
                  <div className="chat-empty-label">SUGGESTED PROMPTS</div>
                  {PROMPT_GROUPS.map((group, gi) => (
                    <div key={gi} className="prompt-group">
                      <div className="prompt-group-label">{group.label}</div>
                      <div className="prompt-pills">
                        {group.prompts.map((p, pi) => (
                          <button key={pi} className="ppill" onClick={()=>sendMessage(p.text)}>
                            <span className="ppill-icon">{p.icon}</span>
                            {p.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.role}`}>
                  {msg.role === "user" && (
                    <div className="bubble user">{msg.text}</div>
                  )}
                  {msg.role === "ai" && (
                    <div className="bubble ai">
                      {msg.verdict && <span className="verdict-line">{msg.verdict}</span>}
                      {msg.pct && msg.pct !== "varies" && (
                    <span className="pct-pill">⚡ {msg.pct} probability</span>
                  )}
                      <div style={{whiteSpace:"pre-line",marginBottom: msg.factors?.length ? "0" : "0"}}>{msg.body}</div>
                      {msg.factors?.length > 0 && (
                        <div className="factors">
                          {msg.factors.map((f,fi)=>(
                            <div key={fi} className="factor">
                              <div className="fdot" style={{background:f.color}}/>
                              <span>{f.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="msg-time">{msg.time}</div>
                </div>
              ))}

              {typing && (
                <div className="msg ai">
                  <div className="typing">
                    <div className="tdot"/><div className="tdot"/><div className="tdot"/>
                  </div>
                </div>
              )}
              <div ref={messagesEnd}/>
            </div>

            {showUpgrade && (
              <div className="upgrade-wall">
                <div className="upgrade-inner">
                  <span className="upgrade-icon">⚡</span>
                  <div className="upgrade-title">YOU'RE OUT OF FREE TAKES</div>
                  <div className="upgrade-sub">
                    You've used your <span>3 free takes</span> for today.<br/>
                    Upgrade to PRO for unlimited access.
                  </div>
                  <div className="upgrade-features">
                    {[
                      "Unlimited UR TAKE queries",
                      "Saved picks & watchlist",
                      "Full chat history",
                      "Picks record & analytics",
                      "High-confidence alerts",
                      "Multi-sport access",
                    ].map((f,i) => (
                      <div key={i} className="upgrade-feat">
                        <div className="upgrade-feat-dot"/>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="upgrade-price">
                    <div className="upgrade-amount">$9.99</div>
                    <div className="upgrade-period">PER MONTH · CANCEL ANYTIME</div>
                  </div>
                  <button className="upgrade-btn">UPGRADE TO PRO</button>
                  <div className="upgrade-reset">
                    Or wait — free takes reset in <span>{hoursUntilReset}h</span>
                  </div>
                </div>
              </div>
            )}

            <div className="chat-input-area">
              <div className="chat-input-row">
                <textarea
                  ref={inputRef}
                  className="chat-input"
                  value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
                  placeholder={queriesLeft === 0 ? "Upgrade to PRO for unlimited takes..." : "Ask a question..."}
                  rows={1}
                  disabled={queriesLeft === 0}
                  style={{opacity: queriesLeft === 0 ? 0.4 : 1}}
                />
                <button
                  className="send-btn"
                  onClick={()=>queriesLeft===0 ? setShowUpgrade(true) : sendMessage()}
                  style={{background: queriesLeft===0 ? "var(--magenta)" : "var(--cyan)"}}
                >
                  {queriesLeft === 0
                    ? <svg className="send-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    : <svg className="send-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                  }
                </button>
              </div>
            </div>
            <div className="disc">AI analysis · Not financial advice · 21+ · Gamble responsibly</div>
          </div>
        )}
      </div>
    </>
  );
}
