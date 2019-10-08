document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('tile')) {
    let at_ls = JSON.parse(localStorage.getItem('adventureTime'))
    localStorage.setItem('adventureTime', JSON.stringify({
      location: at_ls.location,
      lat: at_ls.lat,
      lng: at_ls.lng,
      hotel: at_ls.hotel,
      restaurant: at_ls.restaurant,
      activities: at_ls.activities,
      nightClub: at_ls.nightClub,
      theme: e.target.dataset.theme
    }))
    window.location.href = './list.html'
    
  }
})