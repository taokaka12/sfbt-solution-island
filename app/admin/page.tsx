import {desc,eq} from "drizzle-orm";
import {getDb} from "../../db";
import {admins,progress,usageSessions} from "../../db/schema";
import {requireChatGPTUser} from "../chatgpt-auth";

export const dynamic="force-dynamic";
type State={done?:unknown[];xp?:number;stars?:number;combo?:number;wrong?:number};
const dt=(value:string)=>new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Hong_Kong",dateStyle:"medium",timeStyle:"short"}).format(new Date(value));
const elapsed=(seconds:number)=>seconds<60?`${seconds}s`:seconds<3600?`${Math.floor(seconds/60)}m ${seconds%60}s`:`${Math.floor(seconds/3600)}h ${Math.floor(seconds%3600/60)}m`;
const stateOf=(raw:string):State=>{try{return JSON.parse(raw)}catch{return {}}};

export default async function Admin(){
  const user=await requireChatGPTUser("/admin"),db=getDb();
  const allowed=await db.select().from(admins).where(eq(admins.userId,user.userId)).limit(1);
  if(!allowed.length)return <main className="admin-page"><h1>Administrator access required</h1><p>Your signed-in account is not on the administrator list.</p><footer>Prof.Tao, Huzhou Normal University</footer></main>;
  const [learners,sessions]=await Promise.all([db.select().from(progress).orderBy(desc(progress.updatedAt)),db.select().from(usageSessions).orderBy(desc(usageSessions.loginAt))]);
  const usage=new Map<string,{count:number;seconds:number;first:string;last:string}>();
  for(const item of sessions){const old=usage.get(item.userId);usage.set(item.userId,{count:(old?.count||0)+1,seconds:(old?.seconds||0)+item.activeSeconds,first:old?.first||item.loginAt,last:!old||item.lastSeenAt>old.last?item.lastSeenAt:old.last})}
  const totalSeconds=sessions.reduce((sum,item)=>sum+item.activeSeconds,0),completed=learners.reduce((sum,item)=>sum+(stateOf(item.state).done?.length||0),0);
  return <main className="admin-page">
    <header className="admin-head"><div><p className="kicker">PRIVATE ADMINISTRATION</p><h1>Learning dashboard</h1><p>Account activity and course outcomes for Solution Island.</p></div><a href="/course/">Open course</a></header>
    <section className="admin-summary"><article><b>{learners.length}</b><span>Learners</span></article><article><b>{sessions.length}</b><span>Login sessions</span></article><article><b>{elapsed(totalSeconds)}</b><span>Total active time</span></article><article><b>{completed}</b><span>Lessons completed</span></article></section>
    <section className="admin-panel"><h2>Learner overview</h2><div className="admin-scroll"><table className="admin-table"><thead><tr><th>Learner</th><th>Login count</th><th>First login</th><th>Last activity</th><th>Active time</th><th>Progress</th><th>Score</th><th>Stars</th><th>Best combo</th><th>Wrong tries</th><th>Last saved</th></tr></thead><tbody>{learners.map(row=>{const s=stateOf(row.state),u=usage.get(row.userId),done=s.done?.length||0;return <tr key={row.userId}><td><strong>{row.displayName}</strong><small>{row.email}</small></td><td>{u?.count||0}</td><td>{u?dt(u.first):"—"}</td><td>{u?dt(u.last):"—"}</td><td>{elapsed(u?.seconds||0)}</td><td><span>{done}/100</span><i className="admin-progress"><i style={{width:`${done}%`}}/></i></td><td>{s.xp||0} XP</td><td>{s.stars||0}</td><td>{s.combo||0}</td><td>{s.wrong||0}</td><td>{dt(row.updatedAt)}</td></tr>})}</tbody></table></div></section>
    <section className="admin-panel"><h2>Recent login sessions</h2><div className="admin-scroll"><table className="admin-table"><thead><tr><th>Learner</th><th>Login time</th><th>Last activity</th><th>Active duration</th></tr></thead><tbody>{sessions.slice(0,100).map(item=><tr key={item.sessionId}><td><strong>{item.displayName}</strong><small>{item.email}</small></td><td>{dt(item.loginAt)}</td><td>{dt(item.lastSeenAt)}</td><td>{elapsed(item.activeSeconds)}</td></tr>)}</tbody></table></div></section>
    <p className="admin-privacy">Privacy: this dashboard records account identity, course progress, scores, session times, and active study duration. It does not record IP addresses, device details, or page-by-page browsing history.</p>
    <footer>Prof.Tao, Huzhou Normal University</footer>
  </main>;
}
