document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('tile')) {
    let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
    localStorage.setItem('adventureTime', JSON.stringify({
      location: at_ls.location,
      budget: at_ls.budget,
      theme: e.target.dataset.theme
    }))
    window.location.href = './list.html'
  }
})