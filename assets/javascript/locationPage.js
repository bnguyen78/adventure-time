document.querySelector('#user-name').innerHTML = displayName ? `<b>${displayName}</b>` : ''

document.getElementById('button').addEventListener('click', e => {
  e.preventDefault()
  console.log(document.getElementById('newLocation').value)
  let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
  localStorage.setItem('adventureTime', JSON.stringify({
    location: document.getElementById('newLocation').value,
    budget: '',
    theme: ''
  }))
  window.location.href = './budget.html'
})