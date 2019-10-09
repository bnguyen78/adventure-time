let list, currentToken, budget, timeout
const at_ls = JSON.parse(localStorage.getItem('adventureTime'))
document.querySelector('#bc-location').innerHTML = `<a href="./location.html">${at_ls.location}</a>`
let category
switch (at_ls.theme) {
  case 'restaurant':
    category = 'Restaurants'
    break
  case 'movie_theater':
    category = 'Movie Theaters'
    break
  case 'night_club':
    category = 'Night Clubs'
    break
  case 'amusement_park':
    category = 'Amusement Parks'
    break
  case 'stadium':
    category = 'Sports'
    break
  default:
    category = 'Category'
    break
}
document.querySelector('#bc-category').innerHTML = `<span class="show-for-sr">Current: </span> ${category}`

const setupPage = _ => {
  timeout = false
  list = []
  switch (at_ls.theme) {
    case 'movie_theater':
    case 'amusement_park':
    case 'stadium':
      budget = at_ls.activities
      break
    case 'night_club':
      budget = at_ls.nightClub
      break
    case 'restaurant':
      budget = at_ls.restaurant
      break
    case 'lodging':
      budget = at_ls.hotel
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
                    <button type="button" class="success button fav-btn" data-placeid="${place.place_id}" data-name="${place.name}" data-address="${place.formatted_address}" data-price="${price}" data-rating="${place.rating}">Add to Favorites</button>
                  </div>
                </li>`
  })
  document.querySelector('.last-one') ? document.querySelector('.last-one').classList.remove('last-one') : ''
  let listChildren = document.querySelector('#list').children
  listChildren[listChildren.length - 1].className += ' last-one'

  let accordion = new Foundation.Accordion($('.accordion'))
}

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${places_key}&query=${at_ls.theme}&type=${at_ls.theme}&radius=8046.72&location=${at_ls.lat},${at_ls.lng}&maxprice=${budget}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => addListItems(data))
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
    timeout = true
    setTimeout(_ => timeout = false, 600)
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${places_key}&query=${at_ls.theme}&type=${at_ls.theme}&radius=8046.72&location=${at_ls.lat},${at_ls.lng}&pagetoken =${currentToken}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => addListItems(data))
      .catch(e => console.error(e))
  }
})

document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('fav-btn')) {
    const { placeid, name, address, price, rating } = e.target.dataset
    db.collection('users')
      .doc(`${uid}`)
      .collection('favorites')
      .doc(`${placeid}`)
      .set({
        place_id: placeid,
        name: name,
        address: address,
        price: price,
        rating: rating
      })

  }
})

setupPage()