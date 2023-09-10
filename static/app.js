const APP_CMD = function (key, ...rest) {
  const command = APP_CMD[key]
  if (!command) {
    return
  }
  command(...rest)
};

(function (APP_CMD) {
  


  function bindGlobalEvent() {
    window.addEventListener('scroll', (e) => {
      const scrollTop = document.documentElement.scrollTop || 0;
      setGoTopButtonVisible(scrollTop)
      setNavState(scrollTop)
    })
  }

  const goTopButtonEl = document.querySelector('#go-top-btn')
  function setGoTopButtonVisible(scrollTop) {
    const goTopVisible = scrollTop > 300
    if (goTopVisible) {
      goTopButtonEl.classList.remove('d-none')
      goTopButtonEl.classList.remove('animate__fadeOutDown')
      goTopButtonEl.classList.add('animate__fadeInUp')
    } else {
      goTopButtonEl.classList.add('animate__fadeOutDown')
      goTopButtonEl.classList.remove('animate__fadeInUp')
    }
  }


  const headerEl = document.querySelector('#header')
  function setNavState(scrollTop){
    if (scrollTop > 200) {
      headerEl.classList.add('header-scrolled')
    } else {
      headerEl.classList.remove('header-scrolled')
    }
  }

  function scrollToTop() {
    document.documentElement.scrollTop = 0
  }

  function start() {
    scrollToTop();
    bindGlobalEvent()
  }

  document.onreadystatechange = (e) => {
    if (document.readyState !== 'complete') {
      return
    }
    start()
    document.onreadystatechange = null;
  }

  const expose = {
    scrollToTop
  }

  Object.keys(expose).forEach(key => {
    APP_CMD[`${key}`] = expose[key]
  })
})(APP_CMD)

