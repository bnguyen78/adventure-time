document.getElementById('budgetButton').addEventListener('click', e => {
  e.preventDefault()
  console.log(document.getElementById('budgetHotel').value)
  let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
  localStorage.setItem('adventureTime', JSON.stringify({
    location: at_ls.location,
    hotelBudget: document.getElementById('budgetHotel').value,
    restaurantBudget: document.getElementById('budgetRestaurant').value,
    activitiesBudget: document.getElementById('budgetActivities').value,
    nightClubBudget: document.getElementById('budgetNightClub').value,
    theme: ''
  }))
  window.location.href = './tile.html'
})

//only move to next page if all slots are filled out


// console.log(hotelBudget)