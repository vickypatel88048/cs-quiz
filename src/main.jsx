import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import Categories from './Categories'
import QuizApp from './QuizApp'
import './styles.css'
import './quiz.css'
import './home.css'
import './mobile.css'
import './ui-polish.css'
import './ui-premium.css'
import './time-ui.css'
import './language.css'

function App(){
  const [view,setView]=React.useState('home')
  const [selectedCategory,setSelectedCategory]=React.useState(null)
  const [language,setLanguage]=React.useState(()=>localStorage.getItem('bpsc_tre_language')||'en')

  const changeLanguage=next=>{
    setLanguage(next)
    localStorage.setItem('bpsc_tre_language',next)
    document.documentElement.lang=next
  }

  const startQuiz=categoryId=>{
    setSelectedCategory(categoryId||'exam-practice')
    setView('quiz')
  }

  return <>
    {view==='home'&&<Home language={language} onLanguageChange={changeLanguage} onStart={()=>startQuiz('exam-practice')} onCategories={()=>setView('categories')}/>}
    {view==='categories'&&<Categories language={language} onLanguageChange={changeLanguage} onStart={startQuiz} onHome={()=>setView('home')}/>}
    {view==='quiz'&&<QuizApp language={language} onLanguageChange={changeLanguage} categoryId={selectedCategory} onHome={()=>setView('home')}/>} 
  </>
}

createRoot(document.getElementById('root')).render(<App />)
