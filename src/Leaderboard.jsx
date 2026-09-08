import React from 'react'
import { ArrowLeft, BrainCircuit, Medal, RefreshCw, Trophy } from 'lucide-react'
import { supabase } from './supabase'
import { LanguageToggle } from './i18n'

export default function Leaderboard({onHome,language,onLanguageChange}) {
  const [rows,setRows]=React.useState([]),[loading,setLoading]=React.useState(true),[error,setError]=React.useState('')
  const load=React.useCallback(async()=>{
    setLoading(true);setError('')
    const {data,error:queryError}=await supabase.from('leaderboard').select('*').order('best_percentage',{ascending:false}).order('best_score',{ascending:false}).limit(100)
    if(queryError){setError(queryError.message);setRows([])} else setRows(data||[])
    setLoading(false)
  },[])
  React.useEffect(()=>{load()},[load])
  return <div className="leaderboard-page"><header className="navbar home-navbar"><button className="brand brand-button" onClick={onHome}><span className="brand-mark"><BrainCircuit size={21}/></span><span>BPSC TRE <span className="brand-accent">CS</span></span></button><div className="home-nav-actions"><LanguageToggle lang={language} onChange={onLanguageChange}/><button className="secondary-btn" onClick={onHome}><ArrowLeft size={16}/> Home</button></div></header><main className="leaderboard-wrap"><div className="leaderboard-hero"><span className="eyebrow"><Trophy size={15}/> LEADERBOARD</span><h1>Top CS Quiz Performers</h1><p>Best percentage score from completed quiz attempts.</p></div><section className="leaderboard-card"><div className="leaderboard-card-head"><h2>Rankings</h2><button className="secondary-btn" onClick={load}><RefreshCw size={15}/> Refresh</button></div>{loading?<div className="leaderboard-empty">Loading leaderboard…</div>:error?<div className="leaderboard-empty">Unable to load leaderboard: {error}</div>:rows.length?<div className="leaderboard-list">{rows.map((row,index)=><div className="leaderboard-row" key={row.user_id}><div className="rank">{index<3?<Medal size={20}/>:index+1}</div><div className="leader-user"><strong>{row.display_name||'Anonymous learner'}</strong><span>{row.attempts_count||0} attempt{Number(row.attempts_count)===1?'':'s'}</span></div><div className="leader-score"><strong>{Number(row.best_percentage||0)}%</strong><span>{Number(row.best_score||0)} best</span></div></div>)}</div>:<div className="leaderboard-empty">No completed attempts yet. Be the first!</div>}</section></main></div>
}
