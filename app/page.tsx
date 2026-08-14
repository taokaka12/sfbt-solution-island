import type { Metadata } from "next";
import { getChatGPTUser, chatGPTSignInPath, chatGPTSignOutPath } from "./chatgpt-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"Solution Island · SFBT 100 Key Points",description:"A gamified, responsive journey through 100 SFBT key points."};

export default async function Home(){
 const user=await getChatGPTUser();
 return <main className="site-shell">
  <section className="hero">
   <nav><div className="logo"><b>S</b><span>Solution Island</span></div>{user?<a className="quiet" href={chatGPTSignOutPath('/')}>Sign out</a>:<a className="quiet" href={chatGPTSignInPath('/')}>Sign in</a>}</nav>
   <div className="hero-grid"><div><p className="kicker">SOLUTION FOCUSED BRIEF THERAPY</p><h1>Turn good questions into <em>small steps.</em></h1><p className="intro">Learn 100 key points through six-part explanations, illustrated study cards and four thoughtful challenges per lesson.</p>{user?<div className="actions"><a className="start" href="/course/index.html">Continue learning</a><span>Welcome, {user.displayName}</span></div>:<div className="actions"><a className="start" href={chatGPTSignInPath('/')}>Sign in to begin</a><span>Your progress belongs to you.</span></div>}</div><div className="card-stack"><div className="poster-card"><span>SFBT 100</span><strong>Notice what already helps.</strong><small>LOOK FOR EXCEPTIONS · PROGRESS · STRENGTHS</small></div><div className="step-card">100 illustrated stages<br/><b>6 steps + 4 challenges</b></div></div></div>
  </section>
  <section className="features"><article><b>01</b><h2>Faithful learning</h2><p>Book-led explanations preserve the specific purpose and boundaries of each key point.</p></article><article><b>02</b><h2>Built for practice</h2><p>Scenarios test judgement rather than simple recall.</p></article><article><b>03</b><h2>Any screen</h2><p>A focused experience on computers, tablets and phones.</p></article></section>
  <footer className="site-credit">Prof.Tao, Huzhou Normal University</footer>
 </main>
}
