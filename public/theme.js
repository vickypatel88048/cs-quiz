const THEME_KEY = 'bpsc_tre_cs_theme'

const applyTheme = theme => {
  document.body.classList.toggle('theme-dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light'
applyTheme(savedTheme)

document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button')
  button.className = 'theme-toggle'
  button.type = 'button'
  button.setAttribute('aria-label', 'Toggle day and night mode')
  button.setAttribute('title', 'Day / Night mode')

  const render = () => {
    const dark = document.body.classList.contains('theme-dark')
    button.innerHTML = dark ? '☀️' : '🌙'
    button.setAttribute('aria-pressed', String(dark))
    button.setAttribute('title', dark ? 'Switch to day mode' : 'Switch to night mode')
  }

  button.addEventListener('click', () => {
    const next = document.body.classList.contains('theme-dark') ? 'light' : 'dark'
    localStorage.setItem(THEME_KEY, next)
    applyTheme(next)
    render()
  })

  document.body.appendChild(button)
  render()
})
