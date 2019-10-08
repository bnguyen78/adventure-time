const at_ls = JSON.parse(localStorage.getItem('adventureTime'))
document.querySelector('#bc-location').innerHTML = `<a href="./location.html">${at_ls.location}</a>`


fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.darksky.net/forecast/${weather_key}/${at_ls.lat},${at_ls.lng}?exclude=minutely,hourly,daily,alerts,flags`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => {
    const { icon, temperature, humidity, windSpeed } = JSON.parse(data.contents).currently
    document.querySelector('#current-temperature').innerHTML = `<h4>Temperature: ${temperature}</h4>`
    document.querySelector('#current-humidity').innerHTML = `<h4>Humidity: ${humidity}</h4>`
    document.querySelector('#current-windSpeed').innerHTML = `<h4>Wind Speed: ${windSpeed}</h4>`
    const skyconIcon = new Skycons({ 'colors': 'white'})
    skyconIcon.add('current-icon', icon)
    skyconIcon.play()
  })
  .catch(e => console.error(e))