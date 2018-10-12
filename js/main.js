'use srtrict'
;(function App() {
  function GenerateRandomPassword(length = 24, type = 'complex') {
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

  document.addEventListener('DOMContentLoaded', function onDocumentReady() {
    function GetSelectedRadio(radios) {
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          return radios[i].value
        }
      }
    }
    new ClipboardJS('#copyButton')

    hsimp(
      {
        options: {
          calculationsPerSecond: 1e10, // 10 billion,
          good: 31557600e6, // 1,000,000 years
          ok: 31557600e2 // 100 year
        },
        outputTime: function(time, input) {
          document.querySelector('#time').innerHTML = time || 'instantly'
        }
      },
      document.getElementById('randomPassword')
    )

    document.getElementById('randomPasswordLength').addEventListener('input', function() {
      document.getElementById('randomPasswordLengthValue').innerText = this.value
      document.getElementById('randomPassword').value = GenerateRandomPassword(
        this.value,
        GetSelectedRadio(document.getElementsByName('type'))
      )
      /* Tiggering keyup event, vanillay way */
      document.getElementById('randomPassword').dispatchEvent(new Event('keyup'))
    })
    document.querySelector('#generatePassword').addEventListener('submit', function(event) {
      event.preventDefault()
      document.getElementById('randomPassword').value = GenerateRandomPassword(
        document.getElementById('randomPasswordLength').value
      )
      /* Tiggering keyup event, vanillay way */
      document.getElementById('randomPassword').dispatchEvent(new Event('keyup'))
    })

    document.getElementById('randomPasswordLengthValue').innerText = document.getElementById(
      'randomPasswordLength'
    ).value
    document.getElementById('randomPassword').value = document.getElementById(
      'randomPassword'
    ).value = GenerateRandomPassword(this.value, GetSelectedRadio(document.getElementsByName('type')))

    /* Tiggering keyup event, vanillay way */
    document.getElementById('randomPassword').dispatchEvent(new Event('keyup'))
  })
})()
