import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import Categories from './Categories'
import QuizApp from './QuizApp'
import Auth from './Auth'
import Leaderboard from './Leaderboard'
import { supabase } from './supabase'
import './styles.css'
import './quiz.css'
import './home.css'
import './mobile.css'
import './ui-polish.css'
import './ui-premium.css'
import './time-ui.css'
import './language.css'
import './auth.css'

function App(){
  const [view,setView]=React.useState('home')
  const [selectedCategory,setSelectedCategory]=React.useState(null)
  const [language,setLanguage]=React.useState(()=>localStorage.getItem('bpsc_tre_language')||'en')
  const [session,setSession]=React.useState(null)
  const [authOpen,setAuthOpen]=React.useState(false)
  const [pendingCategory,setPendingCategory]=React.useState(null)

  const changeLanguage=next=>{setLanguage(next);localStorage.setItem('bpsc_tre_language',next);document.documentElement.lang=next}
  React.useEffect(()=>{
    supabase.auth.getSession().then(({data})=>setSession(data.session))
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>setSession(next))
    return ()=>subscription.unsubscribe()
  },[])
  const startQuiz=categoryId=>{
    const id=categoryId||'exam-practice'
    if(!session){setPendingCategory(id);setAuthOpen(true);return}
    setSelectedCategory(id);setView('quiz')
  }
  const authSuccess=nextSession=>{
    setSession(nextSession)
    setAuthOpen(false)
    if(pendingCategory){setSelectedCategory(pendingCategory);setPendingCategory(null);setView('quiz')}
  }
  const signOut=async()=>{await supabase.auth.signOut();setView('home')}
  const home=<div className="app-shell"><div className="user-strip"><div>{session?`Logged in as ${session.user.user_metadata?.name||session.user.email}`:'Login is required before attempting a quiz.'}</div><div>{session&&<button onClick={()=>setView('leaderboard')} className="strip-link">Leaderboard</button>}{session?<button onClick={signOut} className="strip-link">Logout</button>:<button onClick={()=>{setPendingCategory(null);setAuthOpen(true)}} className="strip-link">Login / Signup</button>}</div></div><Home language={language} onLanguageChange={changeLanguage} onStart={()=>startQuiz('exam-practice')} onCategories={()=>setView('categories')}/></div>
  return <>
    {view==='home'&&home}
    {view==='categories'&&<><div className="user-strip"><div>{session?`Logged in as ${session.user.user_metadata?.name||session.user.email}`:'Login required to start a quiz.'}</div><div>{session&&<button onClick={()=>setView('leaderboard')} className="strip-link">Leaderboard</button>}{session?<button onClick={signOut} className="strip-link">Logout</button>:<button onClick={()=>setAuthOpen(true)} className="strip-link">Login / Signup</button>}</div></div><Categories language={language} onLanguageChange={changeLanguage} onStart={startQuiz} onHome={()=>setView('home')}/></>}
    {view==='quiz'&&<QuizApp language={language} onLanguageChange={changeLanguage} categoryId={selectedCategory} onHome={()=>setView('home')} user={session?.user}/>} 
    {view==='leaderboard'&&<Leaderboard language={language} onLanguageChange={changeLanguage} onHome={()=>setView('home')}/>} 
    {authOpen&&<Auth language={language} onClose={()=>{setAuthOpen(false);setPendingCategory(null)}} onSuccess={authSuccess}/>} 
  </>
}
createRoot(document.getElementById('root')).render(<App />)
