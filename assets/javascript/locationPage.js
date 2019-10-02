document.getElementById('button').addEventListener('click', e => {
  e.preventDefault()
  console.log(document.getElementById('newLocation').value)
 window.location.href = './budget.html' 
})