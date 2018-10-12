'use srtrict'
;(function App() {
  document.addEventListener('DOMContentLoaded', onDocumentReady) // thanks to the hoisting power
  function GenerateRandomPassword(length = 12, type = 'complex') {
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ'
    var alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ1234567890'
    var complex = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ1234567890!#$%&()*+,-./:;<=>?@[]^_{|}~'
    var password = ''

    var chars = complex
    switch (type) {
      case 'letters':
        chars = letters
        break
      case 'alphanumeric':
        chars = alphanumeric
        break
    }

    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length)
      password += chars.charAt(i)
    }

    return password
  }

  function initClipboard(selector) {
    return new ClipboardJS(selector)
  }

  // TODO: use radiobuttons the right way
  function getActiveRadio(radios) {
    return (
      [...radios].find(function FilterRadios(radio) {
        return radio.checked
      }) || {}
    )
  }

  function initHSIMP(selectorId) {
    return hsimp(
      {
        options: {
          calculationsPerSecond: 1e10, // 10 billion,
          good: 31557600e6, // 1,000,000 years
          ok: 31557600e2 // 100 year
        },
        outputTime: function(time) {
          document.querySelector('#time').innerHTML = time || 'instantly'
        }
      },
      document.getElementById(selectorId)
    )
  }

  function triggerEvent(element, eventType) {
    return element.dispatchEvent(new Event(eventType))
  }

  function onDocumentReady() {
    const copyPasswordClipboard = initClipboard('#copyButton')
    const hsimpListenner = initHSIMP('randomPassword')

    const PasswordLengthInput = document.getElementById('randomPasswordLength')
    const PasswordLengthLabel = document.getElementById('randomPasswordLengthLabel')
    const GeneratedPasswordInput = document.getElementById('randomPassword')
    const PasswordGenerator = document.querySelector('#generatePassword')
    const PasswordType = document.getElementsByName('type')

    function triggerPasswordChange() {
      return triggerEvent(GeneratedPasswordInput, 'keyup')
    }
    function getPasswordType() {
      return getActiveRadio(PasswordType).value
    }

    PasswordLengthInput.addEventListener('input', function(event) {
      const length = event.target.value
      PasswordLengthLabel.innerText = length
      GeneratedPasswordInput.value = GenerateRandomPassword(length, getPasswordType())
      triggerPasswordChange()
    })
    PasswordGenerator.addEventListener('submit', function(event) {
      event.preventDefault()
      const length = PasswordLengthInput.value
      const type = getPasswordType()
      GeneratedPasswordInput.value = GenerateRandomPassword(length, type)
      triggerPasswordChange()
    })

    PasswordLengthLabel.innerText = PasswordLengthInput.value
    GeneratedPasswordInput.value = GeneratedPasswordInput.value = GenerateRandomPassword(undefined, getPasswordType())

    // Trigger the first 'onChange' like event to update the view
    triggerPasswordChange()
  }
})()
