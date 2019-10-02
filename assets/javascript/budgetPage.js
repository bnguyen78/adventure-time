document.getElementById('budgetButton').addEventListener('click', e => {
  e.preventDefault()
  console.log(document.getElementById('newBudget').value)
 window.location.href = './tile.html' 
})