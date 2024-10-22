import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-test-95d57-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref( database, "shoppingList" ) 

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const delButtonEl = document.getElementById("del-button")

addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value
    push(shoppingListInDB , inputValue)
    clearInputFieldEl()
    
})

function delete_content(input){

    let itemId = input[0]
    let itemValue = input[1]

    delButtonEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)

        remove(exactLocationOfItemInDB)

    })

}

onValue(shoppingListInDB , function(snapshot){
    if(snapshot.exists()){
        let shoppinglistarray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i=0;i<shoppinglistarray.length;i++){
            let currentItem = shoppinglistarray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
            delete_content(currentItem)
    }
    }
    else{
        shoppingListEl.innerHTML = `<p>No items here !!<p>`
    }

})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "" 
}

function appendItemToShoppingListEl(input) {
    let itemId = input[0]
    let itemValue = input[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click" , function(){
        newEl.style.backgroundColor = "green"
        newEl.style.color = "white"
    })
    shoppingListEl.appendChild(newEl)
}