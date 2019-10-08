const loadFavorites = _ => {
  document.querySelector('#favorites-list').innerHTML = ''

  db.collection('users')
    .doc(uid)
    .collection('favorites')
    .get()
    .then(favs => {
      favs.forEach(fav => {
        const { name, address, price, rating, place_id } = fav.data()
        document.querySelector('#favorites-list').innerHTML += `
                <li class="accordion-item" data-accordion-item>
                  <a href="#" class="accordion-title">${name}</a>
                  <div class="accordion-content" data-tab-content>
                    <p><b>Address: </b>${address}</p>
                    <p><b>Price: </b>${price}</p>
                    <p><b>Rating: </b>${rating}</p>
                    <button type="button" class="alert button remove-btn" data-placeid="${place_id}">Remove</button>
                  </div>
                </li>`
      })
      let accordion = new Foundation.Accordion($('.accordion'))
    })
    .catch(e => console.error(e))
}

// Wait for user to load
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Add favorites to list
    loadFavorites()
  }
})

document.querySelector('body').addEventListener('click', e => {
  if (e.target.className.includes('remove-btn')) {
    db.collection("users")
      .doc(uid)
      .collection('favorites')
      .doc(e.target.dataset.placeid)
      .delete()
      .then(_ => console.log("Document successfully deleted!"))
      .catch(e => console.error("Error removing document: ", e))

    loadFavorites()
  }
})