const api_key = 'AIzaSyD_d7IeC3P6-D6zxivF0UKXFaDzcUSpLzw'

let list = []
const tripInfo = JSON.parse(localStorage.getItem('adventureTime'))

document.querySelector('#list').innerHTML = ''

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${api_key}&input=${tripInfo.location}&inputtype=textquery`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${JSON.parse(data.contents).candidates[0].place_id}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        const location = JSON.parse(data.contents).result.geometry.location
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${api_key}&query=${tripInfo.theme}&type=${tripInfo.theme}&radius=8046.72&location=${location.lat},${location.lng}`)}`)
          .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
          })
          .then(data => {
            const places = JSON.parse(data.contents).results
            places.forEach((place, i) => {
              document.querySelector('#list').innerHTML += `
                <li class="accordion-item" data-accordion-item>
                  <a href="#" class="accordion-title">${place.name}</a>
                  <div class="accordion-content" data-tab-content>
                    <p>Panel 1. Lorem ipsum dolor</p>
                    <a href="#">Nowhere to Go</a>
                  </div>
                </li>`
              if (i === 19) {
                console.log(document.querySelector('#list').childNodes)
              }
            })
          })
      })
      .catch(e => console.error(e))
  })
  .catch(e => console.error(e))


  document.querySelector('#search-btn').addEventListener('click', e => {
    const search = document.querySelector('#search-input').value
    document.querySelector('#list').childNodes.forEach(x => {
      if (x.tagName === 'LI') {
        if (!x.childNodes[1].innerText.includes(search)) {
          x.style.display = 'none'
        }
      }
    })
  })