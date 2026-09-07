const exactTranslations = {
  'Home':'होम','Subjects':'विषय','Features':'फीचर्स','About':'अबाउट','Start Practice':'अभ्यास शुरू करें','Start practicing':'अभ्यास शुरू करें','Explore subjects':'विषय देखें','Instant results':'तुरंत परिणाम','Detailed explanations':'विस्तृत व्याख्या','TRE focused':'TRE केंद्रित','Core CS Subjects':'मुख्य CS विषय','Practice Questions':'अभ्यास प्रश्न','Self Practice':'स्वयं अभ्यास','Difficulty Levels':'कठिनाई स्तर','WHY BPSC TRE CS':'BPSC TRE CS क्यों','Practice with a purpose.':'उद्देश्य के साथ अभ्यास करें।','BPSC TRE PREPARATION':'BPSC TRE तैयारी','One platform focused on Computer Science.':'Computer Science पर केंद्रित एक प्लेटफॉर्म।','Start TRE practice':'TRE अभ्यास शुरू करें','Practice by subject':'विषय के अनुसार अभ्यास करें','Search CS subjects...':'CS विषय खोजें...','Start practice':'अभ्यास शुरू करें','No subjects found':'कोई विषय नहीं मिला','Try another subject.':'कोई दूसरा विषय आज़माएँ।','Back to Home':'होम पर वापस जाएँ','Admin':'एडमिन','Logout':'लॉगआउट','Set your time':'समय निर्धारित करें','Choose how much time you want for this quiz.':'इस क्विज़ के लिए अपना समय चुनें।','Quick select':'जल्दी चुनें','You can choose between':'आप चुन सकते हैं','time limit':'समय सीमा','questions':'प्रश्न','mark / question':'अंक / प्रश्न','Start quiz':'क्विज़ शुरू करें','Pause':'रोकें','Resume':'जारी रखें','Resume Quiz':'क्विज़ जारी रखें','Quiz Paused':'क्विज़ रुका हुआ है','Your progress is saved. The timer is stopped.':'आपकी प्रगति सेव है। टाइमर रुक गया है।','Previous':'पिछला','Next question':'अगला प्रश्न','Submit quiz':'क्विज़ सबमिट करें','Marked':'चिह्नित','Mark for review':'रिव्यू के लिए मार्क करें','QUESTIONS':'प्रश्न','Answered':'उत्तर दिया','Review':'रिव्यू','Not visited':'नहीं देखा','QUIZ COMPLETED':'क्विज़ पूरा हुआ','Correct':'सही','Incorrect':'गलत','Skipped':'छोड़ा गया','Percentage':'प्रतिशत','Try again':'फिर से प्रयास करें','ANSWER REVIEW':'उत्तर समीक्षा','Review your performance':'अपना प्रदर्शन देखें','Understand every mistake and know what to study next.':'अपनी गलतियाँ समझें और आगे क्या पढ़ना है जानें।','Your answer':'आपका उत्तर','Correct answer':'सही उत्तर','Explanation':'व्याख्या','No questions match this filter.':'इस फ़िल्टर से कोई प्रश्न नहीं मिला।','Excellent performance!':'बहुत अच्छा प्रदर्शन!','Good job — keep improving.':'अच्छा काम — सुधार जारी रखें।','Nice attempt — more practice will help.':'अच्छा प्रयास — और अभ्यास मदद करेगा।','Keep practicing — you will improve.':'अभ्यास जारी रखें — आप बेहतर होंगे।','No questions available':'कोई प्रश्न उपलब्ध नहीं है','Please choose another category.':'कृपया कोई दूसरा विषय चुनें।','BPSC TRE · Computer Science':'BPSC TRE · कंप्यूटर साइंस','Computer Science practice platform':'कंप्यूटर साइंस अभ्यास प्लेटफॉर्म'
}

function translateText(value) {
  const text = value.trim()
  if (!text) return value
  if (exactTranslations[text]) return value.replace(text, exactTranslations[text])
  let out = text
  out = out.replace(/Question (\\d+) of (\\d+)/g, 'प्रश्न $1 / $2')
  out = out.replace(/(\\d+) questions/g, '$1 प्रश्न')
  out = out.replace(/(\\d+)\\+ questions/g, '$1+ प्रश्न')
  out = out.replace(/(\\d+) min time limit/g, '$1 मिनट समय सीमा')
  out = out.replace(/(\\d+) min/g, '$1 मिनट')
  out = out.replace(/Score \/ (\\d+)/g, 'स्कोर / $1')
  out = out.replace(/You scored (.*?) out of (\\d+)\\. Review your answers below\\./g, 'आपका स्कोर $1 / $2 है। नीचे अपने उत्तर देखें।')
  return out
}

function createLanguageButton() {
  const button = document.createElement('button')
  button.id = 'language-switcher'
  button.type = 'button'
  button.setAttribute('aria-label', 'Change language')
  button.textContent = localStorage.getItem('cs_quiz_lang') === 'hi' ? 'EN' : 'हिंदी'
  Object.assign(button.style, { position:'fixed', right:'12px', bottom:'14px', zIndex:'9999', border:'1px solid #dfe4e9', background:'#fff', color:'#17202a', borderRadius:'999px', padding:'9px 13px', font:'700 12px system-ui,sans-serif', boxShadow:'0 8px 22px rgba(23,32,42,.14)', cursor:'pointer' })
  document.body.appendChild(button)
  return button
}

let language = localStorage.getItem('cs_quiz_lang') || 'en'
const button = createLanguageButton()

function applyLanguage() {
  document.documentElement.lang = language === 'hi' ? 'hi' : 'en'
  button.textContent = language === 'hi' ? 'EN' : 'हिंदी'
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach(node => {
    if (node.parentElement?.id === 'language-switcher') return
    if (!node._csQuizEnglish) node._csQuizEnglish = node.nodeValue
    node.nodeValue = language === 'hi' ? translateText(node._csQuizEnglish) : node._csQuizEnglish
  })
}

button.addEventListener('click', () => {
  language = language === 'en' ? 'hi' : 'en'
  localStorage.setItem('cs_quiz_lang', language)
  applyLanguage()
})

const observer = new MutationObserver(() => {
  if (!document.body.contains(button)) document.body.appendChild(button)
  applyLanguage()
})
observer.observe(document.body, { childList:true, subtree:true })
applyLanguage()
