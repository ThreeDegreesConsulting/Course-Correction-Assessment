import { useState, useRef } from "react";

const C = {
  navy:"#1B3A5C",dnavy:"#0F2235",teal:"#1B7A8A",gold:"#C8922A",
  white:"#FFFFFF",light:"#E8F4F7",gray:"#F4F4F4",dgray:"#555555",
  black:"#1A1A1A",red:"#8B1A1A",lred:"#FBF0F0",amber:"#C05000",
  lamb:"#FFF3E8",green:"#1A6B3A",lgreen:"#E8F4EE",
};
const COPYRIGHT = "\u00A9 2025 Brian O\u2019Riordan \u00B7 Three Degrees Consulting \u00B7 All Rights Reserved";
const COPYRIGHT_SHORT = "\u00A9 2025 Three Degrees Consulting";

const SECTIONS = [
  { id:1, title:"Foundational Business Attributes", subtitle:"Direction \u2014 Do you know where you\u2019re going and why?", color:C.navy, workbook:"Workbook 1 \u2014 Are You Off Course?",
    questions:["Our organization has a written Mission Statement that team members can recite and connect to their daily work.","Our organization has a written Vision Statement that describes what we are building toward in the next 3\u20135 years.","Our organization has documented Core Values that are used in hiring, performance, and decision-making \u2014 not just posted on a wall.","We have a written strategic plan that covers at least the next 12\u201336 months with defined priorities and goals.","Our strategic plan is reviewed at least quarterly against actual results, with adjustments made when needed.","Senior leadership is aligned on the top three strategic priorities for the current year \u2014 and could each state them consistently.","Our Mission, Vision, and Values are actively used to evaluate major business decisions \u2014 not just referenced in onboarding.","We have a clear picture of what success looks like in 3 years \u2014 defined in measurable terms, not just aspirational language."]},
  { id:2, title:"Month-to-Month Operating Plan", subtitle:"Planning \u2014 Have you translated direction into monthly operating reality?", color:C.teal, workbook:"Workbook 2 \u2014 Chart Your Course",
    questions:["We have a written monthly plan for sales activity \u2014 including targets, pipeline stages, and conversion expectations.","We have a documented marketing plan with defined channels, campaigns, and lead generation targets by month.","We operate from an annual budget that is broken into monthly targets for revenue, cost, and profit.","Our budget is reviewed against actual performance monthly, with variance discussion at the leadership level.","We have defined performance metrics for each functional area of the business that are tracked month to month.","Monthly targets are known by the people responsible for hitting them \u2014 not just by leadership or finance.","We have a formal monthly business review where results across all operating areas are discussed together.","When monthly targets are missed, we have a documented process for identifying why and adjusting the near-term plan."]},
  { id:3, title:"Execution Metrics & Weekly Accountability", subtitle:"Execution \u2014 Are you measuring whether the plan is actually happening?", color:C.gold, workbook:"Workbook 3 \u2014 Tacking to Growth",
    questions:["We have defined KPIs for each major area of the business that are tracked and reported at least weekly.","Every team member with budget or performance responsibility knows their specific weekly targets and metrics.","We hold a regular weekly meeting where performance metrics are reviewed \u2014 not just discussed generally.","We track leading indicators \u2014 the activities that predict results \u2014 not just lagging indicators like revenue and margin.","When a weekly metric is off target, there is a clear owner and a defined response process \u2014 not just awareness.","Our sales team tracks pipeline velocity, conversion rates, and activity metrics \u2014 not just closed revenue.","Operational metrics (quality, throughput, delivery, utilization) are measured and visible to the people doing the work.","We can identify a performance problem in our business within one week of it beginning \u2014 before it shows up in monthly results."]},
  { id:4, title:"Review, Learn & Grow", subtitle:"Learning \u2014 Are your results making you smarter and your strategy stronger?", color:C.green, workbook:"Workbook 4 \u2014 The Crow\u2019s Nest",
    questions:["We have a formal quarterly or annual strategic review process that uses operating data to evaluate and update our strategic plan.","The insights generated from our weekly and monthly metrics are formally discussed at the leadership level \u2014 not just filed.","We have a defined process for identifying what is working, what is not, and what to do differently \u2014 beyond general conversation.","Our long-term action planning (12 months+) is informed by patterns in our performance data \u2014 not just intuition or market observation.","Individual roles have clear accountability for what they do with performance data \u2014 not just for generating it.","When strategy and results diverge, we have a structured conversation about whether to change execution or change strategy.","Learnings from our review process have directly resulted in changes to our strategic plan in the last 12 months.","Our organization is measurably better at planning and executing today than it was 12 months ago \u2014 and we can point to evidence."]},
];

const SCALE=[{val:1,label:"1",desc:"Does not exist or is not practiced"},{val:2,label:"2",desc:"Exists informally, inconsistent"},{val:3,label:"3",desc:"Exists but not consistently practiced"},{val:4,label:"4",desc:"Documented and mostly consistent"},{val:5,label:"5",desc:"Embedded, consistent, actively reviewed"}];

function getProfile(scores){const avg=scores.reduce((a,b)=>a+b,0)/scores.length;const s1=scores[0],s3=scores[2];if(s1<2.5&&s3>=3.5)return"Instinctive";if(avg>=4.0)return"Adaptive";if(avg>=3.0)return"Robust";return"Rigid";}
function getBand(score){if(score<2.6)return{label:"Course Correction Needed",color:C.red,bg:C.lred};if(score<4.0)return{label:"Worth Addressing",color:C.amber,bg:C.lamb};return{label:"Strong Foundation",color:C.green,bg:C.lgreen};}

const PROFILES={
  Rigid:{color:C.red,tagline:"Structured but brittle",summary:"Your business has built real infrastructure \u2014 plans, processes, and documentation. In calm water, this performs exactly as designed. The challenge surfaces when conditions change. The same structure that provides stability can become resistance when the market shifts or a key person leaves. The risk is not collapse \u2014 it is holding course long after the course needs to change.",focus:"The work is not rebuilding what exists. It is making your structure responsive \u2014 treating the plan as a compass heading rather than a fixed rail."},
  Robust:{color:C.amber,tagline:"Solid but static",summary:"You have built something that lasts. This business has staying power \u2014 financial discipline, operational consistency, and institutional knowledge. When rough water comes, you don\u2019t panic. The question your assessment raises is not about survival. It is about learning \u2014 specifically, whether the organization captures hard-won lessons or lets them stay in people\u2019s heads.",focus:"The difference between Robust and Adaptive is not effort or capability. It is whether you have built the feedback loops that turn experience into learning and learning into better decisions."},
  Adaptive:{color:C.teal,tagline:"Built for change",summary:"This is what a well-navigated business looks like. You have direction and discipline \u2014 but hold both with the flexibility to respond to conditions rather than just react. When something breaks, you fix it and ask why. When a plan underperforms, you adjust and capture the learning. The plan is not the destination. It is the current best route.",focus:"The work at this stage is elevation. The question shifts from \u2018are we doing this right\u2019 to \u2018are we building something that gets better without us having to personally make it better.\u2019"},
  Instinctive:{color:C.gold,tagline:"High performance, low transferability",summary:"You have built something real \u2014 and you did it largely by feel. By reading the market, knowing your customers, and making calls that turned out to be right more often than not. The results speak for themselves. What your assessment surfaces is a single question worth sitting with: how much of what makes this business work lives in the organization \u2014 and how much lives in you?",focus:"The goal is not to replace instinct with process. It is to capture enough of what the Navigator knows that the organization can navigate independently when it needs to. Water flows through more than one channel."},
};

const SECTION_NARRATIVES={
  1:{Rigid:"Your foundational documents exist and are likely well-crafted. The gap is between documentation and activation. A Mission Statement on a wall and one that drives a hiring decision are two different things. The work is reconnecting what exists to the daily decisions that either align with it or quietly contradict it.",Robust:"You have a sense of direction and your team broadly understands it. What your scores suggest is that the foundational layer may be more implicit than explicit \u2014 it lives in the culture but hasn\u2019t been fully documented or stress-tested. That works until you need to scale, hire senior leadership, or navigate a significant transition.",Adaptive:"Your foundational layer is a genuine strength. Direction is clear, documented, and connected to decision-making. The opportunity is ensuring your strategic plan is dynamic enough to absorb the learning your organization generates \u2014 that what you discover in execution actually feeds back into how strategy evolves.",Instinctive:"Your organization has direction \u2014 but it may live primarily in your head. You know where you\u2019re going and why. The question your scores raise is whether your team shares that understanding with enough precision to act on it independently. When you\u2019re in the room, the direction is clear. When you\u2019re not, does it hold?"},
  2:{Rigid:"Your monthly planning infrastructure is likely detailed and well-structured. The risk is over-engineering \u2014 plans too specific to survive a changing market, or budgets that become political documents rather than navigational tools. If your planning process generates more compliance than insight, it needs a redesign for adaptability.",Robust:"Monthly planning happens but may not be as integrated as it could be. Sales knows its targets. Finance knows the budget. Operations knows the schedule. But the conversation that connects all three into a single monthly navigational picture may not be happening consistently.",Adaptive:"Your monthly operating cadence is a genuine strength. Targets are known, variance is discussed, and the plan is treated as a living document. The opportunity is in the quality of questions your review generates \u2014 not just \u2018did we hit the number\u2019 but \u2018what does the variance tell us about the assumptions underneath it.\u2019",Instinctive:"Monthly planning in your organization likely happens \u2014 but may be driven more by your read of the business than by a documented process others can operate independently. You know when something is off before the numbers confirm it. The risk is that this early warning system lives in your pattern recognition, not in a metric your team can monitor."},
  3:{Rigid:"Your organization measures things \u2014 possibly many things. The risk is measurement without meaning. KPIs tracked but not acted on. Reports generated but not discussed. Dashboards that show what happened without generating a conversation about what to do next. Measurement is only as valuable as the decision it informs.",Robust:"Execution tracking exists but may not be operating at the frequency or specificity that gives you early warning rather than after-the-fact confirmation. Monthly results tell you what happened. Weekly metrics tell you what is about to happen. The difference between those two is the difference between steering and reacting.",Adaptive:"Weekly execution metrics are a strength. People know their numbers, accountability is clear, and the data generates action rather than just awareness. The opportunity is in the quality of your leading indicators \u2014 the metrics that tell you where results are heading before they arrive.",Instinctive:"Execution in your organization is strong \u2014 but may be driven by personal accountability and direct oversight rather than a metric system that operates independently. You know who is performing and who isn\u2019t before the report says so. The question is whether that intelligence is visible to the right people without requiring your direct involvement."},
  4:{Rigid:"Your organization likely has review processes \u2014 quarterly business reviews, annual planning cycles, performance evaluations. The risk is that these generate documentation rather than learning. The after-action review that produces a report nobody reads. Review without genuine inquiry is compliance, not intelligence.",Robust:"Your organization reviews its performance \u2014 but the learning that review generates may not be making its way back into your strategic plan systematically. Insights stay in the meeting where they were generated. Good ideas surface and then sink without being captured. The gap between \u2018we talked about it\u2019 and \u2018we changed because of it\u2019 is where most Robust organizations lose their learning.",Adaptive:"Review and learning are genuine organizational strengths. Your business not only generates data \u2014 it uses it. Insights from operations influence strategy. The learning loop is functioning. The opportunity is formalizing that loop \u2014 making it explicit enough to survive leadership transitions and systematic enough to compound over time.",Instinctive:"Learning in your organization happens \u2014 but primarily through you. You absorb what the business is telling you, adjust accordingly, and move forward. That is real learning \u2014 it just isn\u2019t transferable yet. When the business needs to learn something while you\u2019re focused elsewhere, the institutional knowledge may not be there to draw on."},
};

const styles=`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Source Sans 3',sans-serif;background:#0F2235;color:#1A1A1A;}
  .app{min-height:100vh;background:#0F2235;display:flex;flex-direction:column;align-items:center;padding:0 0 60px;}
  .header{width:100%;background:#0F2235;border-bottom:3px solid #C8922A;padding:18px 40px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
  .header-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FFF;letter-spacing:1px;}
  .header-sub{font-size:13px;color:#C8922A;letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
  .header-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;}
  .header-progress{display:flex;align-items:center;gap:12px;}
  .progress-wrap{width:180px;height:5px;background:rgba(255,255,255,0.15);border-radius:3px;}
  .progress-fill{height:100%;background:#C8922A;border-radius:3px;transition:width 0.4s ease;}
  .prog-label{font-size:13px;color:rgba(255,255,255,0.5);white-space:nowrap;}
  .hdr-copy{font-size:11px;color:rgba(255,255,255,0.22);letter-spacing:0.5px;}
  .card{background:#FFF;border-radius:2px;width:100%;max-width:880px;margin:36px auto 0;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.4);}
  .hero{background:#1B3A5C;padding:56px 56px 44px;}
  .eyebrow{font-size:13px;letter-spacing:4px;text-transform:uppercase;color:#C8922A;margin-bottom:14px;}
  .hero-title{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:#FFF;line-height:1.1;margin-bottom:14px;}
  .hero-sub{font-size:20px;color:rgba(255,255,255,0.6);font-style:italic;font-weight:300;margin-bottom:20px;}
  .divider{width:60px;height:3px;background:#C8922A;margin-bottom:12px;}
  .hero-copy{font-size:12px;color:rgba(255,255,255,0.28);letter-spacing:0.5px;}
  .body{padding:48px 56px;}
  .intro{font-size:18px;color:#555;line-height:1.8;margin-bottom:32px;}
  .scale-box{background:#E8F4F7;border:1px solid #1B7A8A;padding:24px 28px;margin-bottom:36px;}
  .scale-ttl{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#1B7A8A;margin-bottom:16px;font-weight:600;}
  .scale-row{display:flex;}
  .scale-item{flex:1;text-align:center;padding:10px 6px;border-right:1px solid rgba(27,122,138,0.2);}
  .scale-item:last-child{border-right:none;}
  .scale-n{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#1B3A5C;display:block;}
  .scale-d{font-size:12px;color:#555;line-height:1.35;margin-top:6px;}
  .section-label{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#1B7A8A;font-weight:600;margin-bottom:16px;}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:36px;}
  .wcard{background:#F4F4F4;padding:16px 20px;}
  .wcard:nth-child(1){border-left:4px solid #1B3A5C;}
  .wcard:nth-child(2){border-left:4px solid #1B7A8A;}
  .wcard:nth-child(3){border-left:4px solid #C8922A;}
  .wcard:nth-child(4){border-left:4px solid #1A6B3A;}
  .wcard-num{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#555;margin-bottom:6px;}
  .wcard-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#1B3A5C;}
  .pform{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px;}
  .flabel{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#1B7A8A;font-weight:600;display:block;margin-bottom:8px;}
  .finput{border:1px solid #DDD;border-bottom:2px solid #1B3A5C;padding:12px 14px;font-family:'Source Sans 3',sans-serif;font-size:16px;color:#1A1A1A;background:#FFF;outline:none;width:100%;transition:border-color 0.2s;}
  .finput:focus{border-bottom-color:#1B7A8A;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;font-family:'Source Sans 3',sans-serif;font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;transition:all 0.2s;}
  .btn-navy{background:#1B3A5C;color:#FFF;}.btn-navy:hover{background:#1B7A8A;}
  .btn-gold{background:#C8922A;color:#FFF;}.btn-gold:hover{background:#A87820;}
  .btn-out{background:transparent;color:#1B3A5C;border:2px solid #1B3A5C;}.btn-out:hover{background:#1B3A5C;color:#FFF;}
  .sec-header{padding:40px 56px 32px;display:flex;align-items:flex-start;gap:20px;}
  .sec-num{font-family:'Playfair Display',serif;font-size:80px;font-weight:900;line-height:1;opacity:0.09;color:#1B3A5C;flex-shrink:0;width:80px;text-align:right;}
  .sec-eyebrow{font-size:13px;letter-spacing:4px;text-transform:uppercase;color:#C8922A;margin-bottom:8px;}
  .sec-title{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#1B3A5C;line-height:1.2;margin-bottom:10px;}
  .sec-sub{font-size:16px;color:#555;font-style:italic;}
  .qlist{padding:0 56px 40px;}
  .qitem{margin-bottom:36px;padding-bottom:36px;border-bottom:1px solid #EEE;}
  .qitem:last-child{border-bottom:none;margin-bottom:0;}
  .qnum{font-size:12px;letter-spacing:3px;color:#1B7A8A;text-transform:uppercase;margin-bottom:10px;font-weight:600;}
  .qtext{font-size:18px;color:#1A1A1A;line-height:1.65;margin-bottom:20px;}
  .rrow{display:flex;gap:10px;}
  .rbtn{flex:1;padding:14px 6px;border:2px solid #DDD;background:#FFF;cursor:pointer;text-align:center;transition:all 0.15s;display:flex;flex-direction:column;align-items:center;gap:6px;}
  .rbtn:hover{border-color:#1B7A8A;background:#E8F4F7;}
  .rbtn.s1{background:#8B1A1A;border-color:#8B1A1A;}.rbtn.s2{background:#C05000;border-color:#C05000;}
  .rbtn.s3{background:#C8922A;border-color:#C8922A;}.rbtn.s4{background:#1B7A8A;border-color:#1B7A8A;}
  .rbtn.s5{background:#1A6B3A;border-color:#1A6B3A;}
  .rnum{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#1A1A1A;}
  .rbtn.s1 .rnum,.rbtn.s2 .rnum,.rbtn.s3 .rnum,.rbtn.s4 .rnum,.rbtn.s5 .rnum{color:#FFF;}
  .rlbl{font-size:11px;color:#555;text-align:center;line-height:1.3;}
  .rbtn.s1 .rlbl,.rbtn.s2 .rlbl,.rbtn.s3 .rlbl,.rbtn.s4 .rlbl,.rbtn.s5 .rlbl{color:rgba(255,255,255,0.85);}
  .snav{padding:0 56px 40px;display:flex;align-items:center;justify-content:space-between;}
  .sprog{font-size:15px;color:#555;}.sprog strong{color:#1B3A5C;}
  .sc-hero{background:#0F2235;padding:48px 56px 40px;position:relative;overflow:hidden;}
  .sc-hero::before{content:"⚓";position:absolute;right:-20px;top:-30px;font-size:220px;opacity:0.04;color:#FFF;}
  .sc-ey{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#C8922A;margin-bottom:10px;}
  .sc-main{display:flex;align-items:flex-end;gap:36px;margin-bottom:32px;}
  .sc-big{font-family:'Playfair Display',serif;font-size:100px;font-weight:900;line-height:1;}
  .sc-den{font-size:26px;color:rgba(255,255,255,0.4);margin-bottom:18px;}
  .sc-plbl{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;}
  .sc-pname{font-family:'Playfair Display',serif;font-size:40px;font-weight:700;}
  .sc-ptag{font-size:17px;color:rgba(255,255,255,0.55);font-style:italic;margin-top:6px;}
  .sc-bars{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .sc-bar{background:rgba(255,255,255,0.05);padding:14px 18px;}
  .sc-barlbl{font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px;display:flex;justify-content:space-between;}
  .sc-barlbl span{font-weight:700;}
  .sc-track{height:5px;background:rgba(255,255,255,0.1);border-radius:3px;}
  .sc-fill{height:100%;border-radius:3px;transition:width 0.8s ease;}
  .sc-body{padding:48px 56px;}
  .pblock{border-left:5px solid;padding:26px 30px;margin-bottom:36px;}
  .pblock-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:14px;}
  .pblock-text{font-size:17px;color:#555;line-height:1.8;margin-bottom:16px;}
  .pblock-focus{font-size:16px;color:#1A1A1A;line-height:1.75;font-style:italic;border-top:1px solid #EEE;padding-top:16px;}
  .res-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#1B3A5C;margin-bottom:24px;padding-bottom:14px;border-bottom:2px solid #C8922A;}
  .rrow2{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #EEE;}
  .rrow2:last-child{border-bottom:none;}
  .rheader{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px;}
  .rsname{font-size:16px;font-weight:700;color:#1B3A5C;}
  .rsbadge{display:flex;align-items:center;gap:10px;}
  .rscore{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;}
  .rband{font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;}
  .rtrack{height:7px;background:#EEE;border-radius:4px;margin-bottom:14px;}
  .rfill{height:100%;border-radius:4px;transition:width 1s ease;}
  .rnarr{font-size:16px;color:#555;line-height:1.8;}
  .wbrec{display:inline-block;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;padding:6px 12px;margin-top:12px;}
  .seqtbl{width:100%;border-collapse:collapse;margin-bottom:36px;}
  .seqtbl th{background:#1B3A5C;color:#FFF;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:14px 18px;text-align:left;}
  .seqtbl td{padding:14px 18px;font-size:15px;border-bottom:1px solid #EEE;}
  .seqtbl tr:nth-child(even) td{background:#F4F4F4;}
  .pbadge{font-size:12px;font-weight:700;letter-spacing:1px;padding:4px 12px;text-transform:uppercase;}
  .gbox{background:#E8F4F7;border:1px solid #1B7A8A;border-left:5px solid #1B7A8A;padding:28px 32px;margin-bottom:36px;}
  .gbox-t{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#1B7A8A;margin-bottom:12px;font-weight:700;}
  .gbox-b{font-size:16px;color:#1A1A1A;line-height:1.8;}
  .ctabox{background:#0F2235;border:2px solid #C8922A;padding:40px 44px;text-align:center;}
  .cta-ttl{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#C8922A;margin-bottom:10px;}
  .cta-sub{font-size:18px;color:#FFF;margin-bottom:10px;}
  .cta-det{font-size:15px;color:rgba(255,255,255,0.55);font-style:italic;margin-bottom:28px;line-height:1.65;}
  .cta-name{font-size:17px;font-weight:700;color:#FFF;margin-top:24px;}
  .cta-url{font-size:15px;color:#1B7A8A;margin-top:6px;}
  .sc-footer{background:#1B3A5C;padding:16px 56px;display:flex;align-items:center;justify-content:space-between;}
  .sc-fcopy{font-size:12px;color:rgba(255,255,255,0.35);letter-spacing:0.5px;}
  .sc-fbrand{font-size:12px;color:#C8922A;letter-spacing:1px;}
  .fade-in{animation:fadeIn 0.4s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
`;

export default function App(){
  const[phase,setPhase]=useState("welcome");
  const[cur,setCur]=useState(0);
  const[answers,setAnswers]=useState(SECTIONS.map(s=>s.questions.map(()=>null)));
  const[part,setPart]=useState({name:"",company:"",date:"",sector:""});
  const ref=useRef(null);
  const total=SECTIONS.reduce((a,s)=>a+s.questions.length,0);
  const done=answers.flat().filter(a=>a!==null).length;
  const pct=done/total;
  const scores=answers.map(sec=>{const f=sec.filter(a=>a!==null);return f.length>0?f.reduce((a,b)=>a+b,0)/f.length:0;});
  const overall=scores.reduce((a,b)=>a+b,0)/scores.length;
  const profile=getProfile(scores);
  const pd=PROFILES[profile];
  function setAns(si,qi,v){setAnswers(p=>{const n=p.map(s=>[...s]);n[si][qi]=v;return n;});}
  function top(){ref.current?.scrollIntoView({behavior:"smooth"});}
  const curDone=answers[cur].filter(a=>a!==null).length;
  const curTotal=SECTIONS[cur].questions.length;
  const canGo=curDone===curTotal;
  function next(){if(cur<SECTIONS.length-1){setCur(cur+1);top();}else{setPhase("results");top();}}
  function back(){if(cur>0){setCur(cur-1);top();}else{setPhase("welcome");top();}}
  const order=[0,1,2,3].map(i=>({idx:i,score:scores[i]})).sort((a,b)=>a.score-b.score);
  const pri=s=>{if(s<2.6)return{label:"Immediate",color:C.red};if(s<3.5)return{label:"High",color:C.amber};if(s<4.0)return{label:"Consider",color:C.teal};return{label:"Strong",color:C.green};};
  const today=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

  return(<><style>{styles}</style>
  <div className="app">
    {/* Header */}
    <div className="header">
      <div><div className="header-title">PREPARE TO TACK</div><div className="header-sub">Course Correction Series · Assessment</div></div>
      <div className="header-right">
        {phase!=="welcome"&&<div className="header-progress">
          <div className="prog-label">{done} of {total}</div>
          <div className="progress-wrap"><div className="progress-fill" style={{width:`${pct*100}%`}}/></div>
          <div className="prog-label">{Math.round(pct*100)}%</div>
        </div>}
        <div className="hdr-copy">{COPYRIGHT_SHORT}</div>
      </div>
    </div>

    <div ref={ref} style={{width:"100%",maxWidth:880,padding:"0 20px"}}>

    {/* ── WELCOME ── */}
    {phase==="welcome"&&<div className="card fade-in">
      <div className="hero">
        <div className="eyebrow">Three Degrees Consulting</div>
        <div className="hero-title">Course Correction<br/>Series</div>
        <div className="hero-sub">Strategic Assessment Tool</div>
        <div className="divider"/>
        <div className="hero-copy">{COPYRIGHT}</div>
      </div>
      <div className="body">
        <p className="intro">This assessment evaluates four areas of your business against 32 questions. Your responses generate a personalized scorecard — including your organization profile, section-by-section diagnostic, and a recommended course correction sequence.<br/><br/>Score each statement honestly based on what is actually true in your organization <em>today</em> — not what you aspire to, or what was true two years ago.</p>
        <div className="scale-box">
          <div className="scale-ttl">Scoring Scale — applies to all 32 questions</div>
          <div className="scale-row">{SCALE.map(s=><div key={s.val} className="scale-item"><span className="scale-n">{s.label}</span><div className="scale-d">{s.desc}</div></div>)}</div>
        </div>
        <div className="section-label">Four Sections · 8 Questions Each</div>
        <div className="grid2">{SECTIONS.map(s=><div key={s.id} className="wcard"><div className="wcard-num">Section {s.id}</div><div className="wcard-title">{s.title}</div></div>)}</div>
        <div className="section-label">Your Details</div>
        <div className="pform">{[["name","Your Name"],["company","Company / Organization"],["date","Today's Date"],["sector","Industry / Sector"]].map(([k,l])=>
          <div key={k}><label className="flabel">{l}</label><input className="finput" value={part[k]} onChange={e=>setPart(p=>({...p,[k]:e.target.value}))} placeholder={k==="date"?today:l}/></div>
        )}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <button className="btn btn-navy" onClick={()=>{setPhase("section");top();}}>Begin Assessment →</button>
          <div style={{fontSize:14,color:C.dgray,fontStyle:"italic"}}>Approximately 10–15 minutes</div>
        </div>
      </div>
    </div>}

    {/* ── SECTION ── */}
    {phase==="section"&&<div className="card fade-in" key={cur}>
      <div className="sec-header" style={{borderTop:`6px solid ${SECTIONS[cur].color}`}}>
        <div className="sec-num">0{cur+1}</div>
        <div><div className="sec-eyebrow">Section {cur+1} of {SECTIONS.length}</div>
          <div className="sec-title">{SECTIONS[cur].title}</div>
          <div className="sec-sub">{SECTIONS[cur].subtitle}</div></div>
      </div>
      <div className="qlist">{SECTIONS[cur].questions.map((q,qi)=>
        <div key={qi} className="qitem">
          <div className="qnum">Question {qi+1} of {curTotal}</div>
          <div className="qtext">{q}</div>
          <div className="rrow">{SCALE.map(s=>
            <button key={s.val} className={`rbtn${answers[cur][qi]===s.val?` s${s.val}`:""}`} onClick={()=>setAns(cur,qi,s.val)}>
              <span className="rnum">{s.label}</span><span className="rlbl">{s.desc}</span>
            </button>
          )}</div>
        </div>
      )}</div>
      <div className="snav">
        <button className="btn btn-out" onClick={back}>← Back</button>
        <div className="sprog"><strong>{curDone}</strong> of <strong>{curTotal}</strong> answered</div>
        <button className="btn btn-navy" onClick={next} disabled={!canGo} style={{opacity:canGo?1:0.35,cursor:canGo?"pointer":"not-allowed"}}>
          {cur<SECTIONS.length-1?"Next Section →":"View My Scorecard →"}
        </button>
      </div>
    </div>}

    {/* ── RESULTS ── */}
    {phase==="results"&&<div className="card fade-in">
      {/* Hero */}
      <div className="sc-hero">
        <div className="sc-ey">Course Correction Series · Strategic Assessment Scorecard</div>
        {part.name&&<div style={{fontSize:15,color:"rgba(255,255,255,0.4)",marginBottom:20,letterSpacing:0.5}}>
          {part.name}{part.company?` · ${part.company}`:""}{part.sector?` · ${part.sector}`:""}{part.date?` · ${part.date}`:`· ${today}`}
        </div>}
        <div className="sc-main">
          <div>
            <div style={{fontSize:13,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:6}}>Overall Score</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:10}}>
              <div className="sc-big" style={{color:getBand(overall).color}}>{overall.toFixed(1)}</div>
              <div className="sc-den">/ 5.0</div>
            </div>
          </div>
          <div><div className="sc-plbl">Organization Profile</div>
            <div className="sc-pname" style={{color:pd.color}}>{profile}</div>
            <div className="sc-ptag">{pd.tagline}</div></div>
        </div>
        <div className="sc-bars">{SECTIONS.map((sec,i)=>{const sc=scores[i];const b=getBand(sc);return(
          <div key={i} className="sc-bar">
            <div className="sc-barlbl"><span>S{i+1} — {sec.title}</span><span style={{color:b.color}}>{sc.toFixed(1)}</span></div>
            <div className="sc-track"><div className="sc-fill" style={{width:`${(sc/5)*100}%`,background:b.color}}/></div>
          </div>);})}</div>
      </div>

      <div className="sc-body">
        {/* Score key */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:36}}>
          {[{range:"1.0\u20132.5",label:"Course Correction Needed",color:C.red,bg:C.lred,desc:"Active drag on overall performance. Direct intervention has highest impact."},
            {range:"2.6\u20133.9",label:"Worth Addressing",color:C.amber,bg:C.lamb,desc:"Signals worth a structured conversation. Addressing this strengthens everything downstream."},
            {range:"4.0\u20135.0",label:"Strong Foundation",color:C.green,bg:C.lgreen,desc:"Protect and document what\u2019s working. Monitor for drift."}
          ].map((b,i)=><div key={i} style={{background:b.bg,border:`1px solid ${b.color}`,padding:"16px 18px"}}>
            <div style={{fontSize:13,fontWeight:700,color:b.color,marginBottom:6}}>{b.range} · {b.label}</div>
            <div style={{fontSize:14,color:C.black,lineHeight:1.55}}>{b.desc}</div>
          </div>)}
        </div>

        {/* Profile narrative */}
        <div className="pblock" style={{borderColor:pd.color,background:`${pd.color}08`}}>
          <div className="pblock-title" style={{color:pd.color}}>Your Organization Profile — {profile}</div>
          <div className="pblock-text">{pd.summary}</div>
          <div className="pblock-focus">{pd.focus}</div>
        </div>

        {/* Section diagnostic */}
        <div style={{marginBottom:36}}>
          <div className="res-title">Section-by-Section Diagnostic</div>
          {SECTIONS.map((sec,i)=>{const sc=scores[i];const b=getBand(sc);const narr=SECTION_NARRATIVES[sec.id][profile];return(
            <div key={i} className="rrow2">
              <div className="rheader">
                <div><div style={{fontSize:12,letterSpacing:3,textTransform:"uppercase",color:C.dgray,marginBottom:4}}>Section {i+1}</div>
                  <div className="rsname">{sec.title}</div></div>
                <div className="rsbadge">
                  <div className="rscore" style={{color:b.color}}>{sc.toFixed(1)} / 5.0</div>
                  <div className="rband" style={{color:b.color,background:b.bg}}>{b.label}</div>
                </div>
              </div>
              <div className="rtrack"><div className="rfill" style={{width:`${(sc/5)*100}%`,background:b.color}}/></div>
              <div className="rnarr">{narr}</div>
              <div className="wbrec" style={{background:sec.color,color:C.white}}>{sec.workbook}</div>
            </div>);
          })}
        </div>

        {/* Sequence */}
        <div style={{marginBottom:36}}>
          <div className="res-title">Your Recommended Course Correction Sequence</div>
          <div style={{fontSize:16,color:C.dgray,fontStyle:"italic",marginBottom:20,lineHeight:1.65}}>Based on your scores and organization profile. This is a starting point — your 30-minute debrief will refine it based on your specific context.</div>
          <table className="seqtbl"><thead><tr><th>Step</th><th>Module</th><th>Focus</th><th>Priority</th></tr></thead>
          <tbody>{order.map((item,step)=>{const sec=SECTIONS[item.idx];const p=pri(item.score);return(
            <tr key={item.idx}>
              <td style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.navy}}>{step+1}</td>
              <td style={{fontWeight:700,color:C.navy}}>{sec.workbook}</td>
              <td style={{color:C.dgray}}>{sec.subtitle.split("—")[0].trim()}</td>
              <td><span className="pbadge" style={{background:p.color,color:C.white}}>{p.label}</span></td>
            </tr>);})}
          </tbody></table>
        </div>

        {/* Goal note */}
        <div className="gbox">
          <div className="gbox-t">⚓ A Note on the Goal</div>
          <div className="gbox-b">The purpose of the Course Correction Series is not to build a perfectly structured business — it is to build one that gets stronger every time something tries to break it. The goal is an <strong style={{color:C.teal}}>Adaptive</strong> organization: enough structure to hold a course, enough flexibility to find a new one when the original route is blocked. <em style={{color:C.navy,fontWeight:700}}>Water, not ice.</em></div>
        </div>

        {/* CTA */}
        <div className="ctabox">
          <div style={{fontSize:32,marginBottom:10}}>⚓</div>
          <div className="cta-ttl">Your Next Step</div>
          <div className="cta-sub">Schedule your complimentary 30-minute Course Correction Debrief</div>
          <div className="cta-det">In this conversation we will review your scores, discuss the patterns your assessment revealed,<br/>and co-create a course correction sequence that fits your business — not a generic prescription.</div>
          <button className="btn btn-gold" onClick={()=>window.open("https://www.threedegreesconsulting.com","_blank")}>Schedule My Debrief →</button>
          <div className="cta-name">Brian O'Riordan  |  Three Degrees Consulting</div>
          <div className="cta-url">www.threedegreesconsulting.com</div>
        </div>

        <div style={{textAlign:"center",marginTop:32}}>
          <button className="btn btn-out" onClick={()=>{setPhase("welcome");setAnswers(SECTIONS.map(s=>s.questions.map(()=>null)));setCur(0);top();}}>← Start Over</button>
        </div>
      </div>

      {/* Footer */}
      <div className="sc-footer">
        <div className="sc-fcopy">{COPYRIGHT}</div>
        <div className="sc-fbrand">Prepare to Tack · Course Correction Series</div>
      </div>
    </div>}

    </div>
  </div></>);
}