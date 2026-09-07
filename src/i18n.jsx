import React from 'react'

export const translations = {
  en: {},
  hi: {
    Home:'होम', Subjects:'विषय', Features:'फीचर्स', About:'अबाउट',
    'Start Practice':'अभ्यास शुरू करें', 'Start practicing':'अभ्यास शुरू करें', 'Explore subjects':'विषय देखें',
    'Instant results':'तुरंत परिणाम', 'Detailed explanations':'विस्तृत व्याख्या', 'TRE focused':'TRE केंद्रित',
    'Core CS Subjects':'मुख्य CS विषय', 'Practice Questions':'अभ्यास प्रश्न', 'Self Practice':'स्वयं अभ्यास',
    'Practice with a purpose.':'उद्देश्य के साथ अभ्यास करें।', 'BPSC TRE PREPARATION':'BPSC TRE तैयारी',
    'One platform focused on Computer Science.':'Computer Science पर केंद्रित एक प्लेटफॉर्म।', 'Start TRE practice':'TRE अभ्यास शुरू करें',
    'Practice by subject':'विषय के अनुसार अभ्यास करें', 'Search CS subjects...':'CS विषय खोजें...', 'Start practice':'अभ्यास शुरू करें',
    'No subjects found':'कोई विषय नहीं मिला', 'Try another subject.':'कोई दूसरा विषय आज़माएँ।', 'Back to Home':'होम पर वापस जाएँ',
    Admin:'एडमिन', Logout:'लॉगआउट', 'Set your time':'समय निर्धारित करें', 'Choose how much time you want for this quiz.':'इस क्विज़ के लिए समय चुनें।',
    'Quick select':'जल्दी चुनें', 'Start quiz':'क्विज़ शुरू करें', Pause:'रोकें', Resume:'जारी रखें', 'Resume Quiz':'क्विज़ जारी रखें',
    'Quiz Paused':'क्विज़ रुका हुआ है', 'Your progress is saved. The timer is stopped.':'आपकी प्रगति सेव है। टाइमर रुक गया है।',
    Previous:'पिछला', 'Next question':'अगला प्रश्न', 'Submit quiz':'क्विज़ सबमिट करें', Marked:'चिह्नित', 'Mark for review':'रिव्यू के लिए मार्क करें',
    QUESTIONS:'प्रश्न', Answered:'उत्तर दिया', Review:'रिव्यू', 'Not visited':'नहीं देखा', 'QUIZ COMPLETED':'क्विज़ पूरा हुआ',
    Correct:'सही', Incorrect:'गलत', Skipped:'छोड़ा गया', Percentage:'प्रतिशत', 'Try again':'फिर से प्रयास करें',
    'ANSWER REVIEW':'उत्तर समीक्षा', 'Review your performance':'अपना प्रदर्शन देखें', 'Your answer':'आपका उत्तर', 'Correct answer':'सही उत्तर', Explanation:'व्याख्या',
    'No questions match this filter.':'इस फ़िल्टर से कोई प्रश्न नहीं मिला।', 'Excellent performance!':'बहुत अच्छा प्रदर्शन!',
    'Good job — keep improving.':'अच्छा काम — सुधार जारी रखें।', 'Nice attempt — more practice will help.':'अच्छा प्रयास — और अभ्यास मदद करेगा।',
    'Keep practicing — you will improve.':'अभ्यास जारी रखें — आप बेहतर होंगे।', 'No questions available':'कोई प्रश्न उपलब्ध नहीं है',
    'Please choose another category.':'कृपया कोई दूसरा विषय चुनें।', Question:'प्रश्न', of:'का', min:'मिनट', questions:'प्रश्न',
    'time limit':'समय सीमा', 'mark / question':'अंक / प्रश्न', 'negative / wrong':'गलत उत्तर / नकारात्मक अंक',
    'Question 1 of':'प्रश्न 1 /', 'Not answered':'उत्तर नहीं दिया'
  }
}

export function t(lang, value) {
  if (lang === 'hi' && translations.hi[value]) return translations.hi[value]
  return value
}

export function LanguageToggle({ lang, onChange }) {
  const isHindi = lang === 'hi'
  return (
    <div className="language-switch" role="group" aria-label="Language selector">
      <span className="language-label">भाषा / Language</span>
      <button type="button" className={`language-option ${!isHindi ? 'active' : ''}`} onClick={() => onChange('en')} aria-pressed={!isHindi}>EN</button>
      <button type="button" className={`language-option ${isHindi ? 'active' : ''}`} onClick={() => onChange('hi')} aria-pressed={isHindi}>हिंदी</button>
    </div>
  )
}
