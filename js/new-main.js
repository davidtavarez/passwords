'use strict'
;(function App() {
  // this function wouldn't be a anonymous function for debugging purposes
  document.addEventListener('DOMContentLoaded', onDocumentReady) // thanks to the hoisting power

  const randomIndex = seed => Math.floor(Math.random() * seed)
  const GenerateRandomPassword = (types = ['lowercase'], length = 12) => {
    const DICTIONARIES = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVXYZ',
      numbers: '1234567890',
      symbols: '!#$%&()*+,-./:;<=>?@[]^_{|}~',
    }
    const chars = types
      .filter(Boolean)
      .reduce((dic, key) => [...dic, DICTIONARIES[key] || ''], [])
      .join('')
      .trim()
    const size = Number(length) || 0
    const charsLength = chars.length
    return Array(size)
      .fill(0)
      .reduce(prev => prev.concat(chars.charAt(randomIndex(charsLength))), '')
  }

  const initHSIMP = (passwordElement, outputElement) =>
    hsimp(
      {
        options: {
          calculationsPerSecond: 1e10, // 10 billion,
          good: 31557600e6, // 1,000,000 years
          ok: 31557600e2, // 100 year
        },
        outputTime: time => (outputElement.innerHTML = time || 'instantly'),
      },
      passwordElement
    )

  const triggerEvent = (element, eventType) =>
    element.dispatchEvent(new Event(eventType))

  const initClipboard = selector => new ClipboardJS(selector)
  const getCheckboxValues = (checkboxes = []) =>
    [...checkboxes].filter(c => c.checked).map(c => c.value)

  function onDocumentReady() {
    const NavLinks = document.querySelectorAll('.nav__link')
    NavLinks.forEach(Link => {
      Link.addEventListener('click', onNavLinkClick)
      // Load Initial State of the App
      if (Link.href === window.location.href) triggerEvent(Link, 'click')
    })

    initClipboard('#copyButton')
    initHSIMP(
      document.getElementById('randomPassword'),
      document.getElementById('time')
    )
    initPasswordGenerator()
  }

  function initPasswordGenerator() {
    const PasswordLengthInput = document.getElementById('randomPasswordLength')
    const PasswordLengthLabel = document.getElementById(
      'randomPasswordLengthLabel'
    )
    const GeneratedPasswordInput = document.getElementById('randomPassword')
    const PasswordGenerator = document.querySelector('#generatePassword')
    const PasswordTypes = document.querySelectorAll(
      '.fill-control-input[type="checkbox"]'
    )

    const triggerPasswordChange = () =>
      triggerEvent(GeneratedPasswordInput, 'keyup')
    const getPasswordType = () => getCheckboxValues(PasswordTypes)

    PasswordTypes.forEach(el =>
      el.addEventListener('click', () =>
        triggerEvent(PasswordLengthInput, 'input')
      )
    )

    PasswordLengthInput.addEventListener('input', event => {
      const length = event.target.value
      const type = getPasswordType()
      PasswordLengthLabel.innerText = length
      GeneratedPasswordInput.value = GenerateRandomPassword(type, length)
      triggerPasswordChange()
    })
    PasswordGenerator.addEventListener('submit', event => {
      event.preventDefault()
      const length = PasswordLengthInput.value
      const type = getPasswordType()
      GeneratedPasswordInput.value = GenerateRandomPassword(type, length)
      triggerPasswordChange()
    })

    PasswordLengthLabel.innerText = PasswordLengthInput.value
    GeneratedPasswordInput.value = GenerateRandomPassword(getPasswordType())

    // Trigger the first 'onChange' like event to update the view
    triggerPasswordChange()
  }

  function onNavLinkClick(event) {
    const target = event.target
    const targetAppSelector = target.href.split('#')[1]
    const isAppActive = setActiveApp(targetAppSelector)
    if (isAppActive) {
      const ActiveNav = target.parentNode.querySelector('.nav__link--active')
      if (ActiveNav) ActiveNav.classList.remove('nav__link--active')
      target.classList.add('nav__link--active')
    }
  }

  /**
   * Function to set the current active tab, app color and active nav link
   * @param {String} targetAppId the Id of the App element we want to activate
   * @returns Boolean wheter the app has found in DOM and activated or not
   */
  function setActiveApp(targetAppId) {
    const AppContainer = document.getElementById(targetAppId)
    if (AppContainer) {
      const ActiveApp = AppContainer.parentNode.querySelector('.tab--active')

      if (ActiveApp) ActiveApp.classList.remove('tab--active')
      AppContainer.classList.add('tab--active')
      if (AppContainer.dataset.appColor)
        document.body.style.setProperty(
          '--main-color',
          AppContainer.dataset.appColor
        )
      return true
    } else {
      return false
    }
  }
})()
