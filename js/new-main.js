'use strict'
;(function App() {
  // this function wouldn't be a anonymous function for debugging purposes
  document.addEventListener('DOMContentLoaded', onDocumentReady) // thanks to the hoisting power
  function onDocumentReady() {
    const NavLinks = document.querySelectorAll('.nav__link')
    NavLinks.forEach(Link => {
      Link.addEventListener('click', onNavLinkClick)
      // Load Initial State of the App
      if (Link.href === window.location.href)
        Link.dispatchEvent(new Event('click'))
    })
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
