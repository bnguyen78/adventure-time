document.getElementById('button').addEventListener('click', e => {
  e.preventDefault()

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${places_key}&input=${document.getElementById('newLocation').value}&inputtype=textquery`)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?key=${places_key}&place_id=${JSON.parse(data.contents).candidates[0].place_id}`)}`)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          localStorage.setItem('adventureTime', JSON.stringify({
            location: JSON.parse(data.contents).result.name,
            lat: JSON.parse(data.contents).result.geometry.location.lat,
            lng: JSON.parse(data.contents).result.geometry.location.lng,
            hotel: '',
            restaurant: '',
            activities: '',
            nightClub: '',
            theme: ''
          }))
          window.location.href = './budget.html'
        })
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e))

})