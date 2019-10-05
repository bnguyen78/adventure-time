document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('tile')) {
    let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
    localStorage.setItem('adventureTime', JSON.stringify({
      location: at_ls.location,
      hotelBudget: at_ls.hotelBudget,
      restaurantBudget: at_ls.restaurantBudget,
      activitiesBudget: at_ls.activitiesBudget,
      nightClubBudget: at_ls.nightClubBudget,
      theme: e.target.dataset.theme
    }))
    window.location.href = './list.html'
    
  }
})