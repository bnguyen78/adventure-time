document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('tile')) {
    console.log(e.target)
    localStorage.setItem('list-theme', e.target.dataset.theme)
    window.location.href = './list.html'
  }
})