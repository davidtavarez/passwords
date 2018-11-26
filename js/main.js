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

  const initHSIMP = (OutputElement, InfoElement) =>
    hsimp({
      options: {
        calculationsPerSecond: 1e10, // 10 billion,
        good: 31557600e6, // 1,000,000 years
        ok: 7776000, // 3 moths
      },
      outputTime: time => (OutputElement.innerHTML = time || 'instantly'),
      outputChecks: checks => {
        InfoElement.innerHTML = generateInfoMessages(checks)
      },
    })

  const triggerEvent = (element, eventType) =>
    element.dispatchEvent(new Event(eventType))

  const initClipboard = selector => new ClipboardJS(selector)
  const getCheckboxValues = (checkboxes = []) =>
    [...checkboxes].filter(c => c.checked).map(c => c.value)

  function onDocumentReady() {
    initClipboard('#copyButton')
    initHSIMP(
      document.getElementById('time'),
      document.getElementById('alert')
    )(document.getElementById('randomPassword'))
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

  function generateInfoMessages(checks = []) {
    return checks
      .map(check => `<p><strong>${check.level}:</strong> ${check.message}</p>`)
      .join('')
      .trim('')
  }
})()
