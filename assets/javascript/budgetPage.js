document.getElementById('budgetButton').addEventListener('click', e => {
  e.preventDefault()
  console.log(document.getElementById('budgetHotel').value)
  let hotel = document.getElementById('budgetHotel').value
  let restaurant = document.getElementById('budgetRestaurant').value
  let activities = document.getElementById('budgetActivities').value
  let nightClub = document.getElementById('budgetNightClub').value

  if (hotel && restaurant && activities && nightClub) {

    let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
    localStorage.setItem('adventureTime', JSON.stringify({
      location: at_ls.location,
      hotel: hotel,
      restaurant: restaurant,
      activities: activities,
      nightClub: nightClub,
      theme: ''
    }))
      window.location.href = './tile.html'
    }
  })

//only move to next page if all slots are filled out


// console.log(hotelBudget)