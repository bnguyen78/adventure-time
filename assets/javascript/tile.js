const at_ls = JSON.parse(localStorage.getItem('adventureTime'))
document.querySelector('#bc-location').innerHTML = `<a href="./location.html">${at_ls.location}</a>`

document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('tile')) {
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
    window.location.href = e.target.dataset.theme === 'weather' ? './weather.html' : './list.html'
    
  }
  if (e.target.className.includes('bg-weather')) {
    window.location.href = './weather.html'
  }
})