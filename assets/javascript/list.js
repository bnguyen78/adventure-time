const api_key = 'AIzaSyD_d7IeC3P6-D6zxivF0UKXFaDzcUSpLzw'

let list, currentToken, budget, timeout
const tripInfo = JSON.parse(localStorage.getItem('adventureTime'))

const setupPage = _ => {
  document.querySelector('#user-name').innerHTML = displayName ? `<b>${displayName}</b>` : ''
  timeout = false
  list = []
  switch (tripInfo.theme) {
    case 'movie_theater':
    case 'amusement_park':
    case 'stadium':
      budget = tripInfo.activities
      break
    case 'night_club':
      budget = tripInfo.nightClub
      break
    case 'restaurant':
      budget = tripInfo.restaurant
      break
    case 'lodging':
      budget = tripInfo.hotel
      break
    default:
      budget = 4
      break
  }
  document.querySelector('#list').innerHTML = ''
}

const addListItems = d => {
  const places = JSON.parse(d.contents).results
  currentToken = JSON.parse(d.contents).next_page_token
  places.forEach((place, i) => {
    let price = ""
    for (let i = 0; i < place.price_level; i++) {
      price += '$'
    }
    if (!place.price_level) {
      price = 'No price information available'
    }
    document.querySelector('#list').innerHTML += `
                <li class="accordion-item" data-accordion-item>
                  <a href="#" class="accordion-title">${place.name}</a>
                  <div class="accordion-content" data-tab-content>
                    <p><b>Address: </b>${place.formatted_address}</p>
                    <p><b>Price: </b>${price}</p>
                    <p><b>Open: </b>${place.opening_hours ? (place.opening_hours.open_now ? 'Yes' : 'No') : 'Hours not available'}</p>
                    <p><b>Rating: </b>${place.rating}</p>
                    <button type="button" class="success button fav-btn">Add to Favorites</button>
                  </div>
                </li>`
  })
  document.querySelector('.last-one') ? document.querySelector('.last-one').classList.remove('last-one') : ''
  let listChildren = document.querySelector('#list').children
  listChildren[listChildren.length - 1].className += ' last-one'

  let accordion = new Foundation.Accordion($('.accordion'))
}

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
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${api_key}&query=${tripInfo.theme}&type=${tripInfo.theme}&radius=8046.72&location=${location.lat},${location.lng}&maxprice=${budget}`)}`)
          .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
          })
          .then(data => addListItems(data))
          .catch(e => console.error(e))
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
      } else {
        x.style.display = 'list-item'
      }
    }
  })
})

document.querySelector('#list').addEventListener('scroll', e => {
  if (document.querySelector('.last-one').getBoundingClientRect().top < window.innerHeight && !timeout) {
    console.log('adding more')
    timeout = true
    setTimeout(_ => timeout = false, 600)
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${api_key}&query=${tripInfo.theme}&type=${tripInfo.theme}&radius=8046.72&location=${location.lat},${location.lng}&pagetoken =${currentToken}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => addListItems(data))
      .catch(e => console.error(e))
  }
})

setupPage()