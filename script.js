// firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://champions-b7e3e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsmentListInDB = ref(database, "endorsments")

const endorsmentText = document.getElementById("endorsment-text")
const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")
const endorsmentForm = document.getElementById("endorsment-form")
const endorsments = document.getElementById("endorsments")


endorsmentForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (endorsmentText.value && fromInput.value && toInput.value) {
    push(endorsmentListInDB, {
      from: fromInput.value,
      body: endorsmentText.value,
      to: toInput.value,
      likes: 5,
    })
    emptyInputFields()
  } else {
    alert("Please fill out all fields")
    emptyInputFields()
  }
})

onValue(endorsmentListInDB, (snap) => {
  if (snap.exists()) {
    let itemsArr = Object.entries(snap.val())
    endorsments.innerHTML = ""
    for (let i = 0; i < itemsArr.length; i++) {
      const itemId = itemsArr[i][0]
      const currentItem = itemsArr[i][1]
      render(currentItem, itemId)
    }
  } else {
    endorsments.innerHTML = `<p class="empty-post">Nothing here yet...</p>`
  }
})

function emptyInputFields() {
  endorsmentText.value = ""
  fromInput.value = ""
  toInput.value = ""
}

function render(itemVal, itemId) {
  let html = `
<div class="post">
  <p class="to">To ${itemVal.to}</p>
  <p class="body">${itemVal.body}</p>
  <p class="from">From ${itemVal.from}</p>
  <span class="like-details">
    <i class="fa-solid fa-heart like-post" id="${itemId}"></i>
    ${itemVal.likes}
  </span>
</div>`
  endorsments.innerHTML += html
}