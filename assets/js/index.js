let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let linksFromLocalStorage= JSON.parse(localStorage.getItem("myLinks")) //getting links from localstorage
console.log(linksFromLocalStorage)

function render(array) {
    let listItems = ""
    for (let i = 0; i < array.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${array[i]}'>
                    ${array[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

if(linksFromLocalStorage){
    myLinks=linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    render(myLinks)
    localStorage.setItem("myLinks", JSON.stringify(myLinks)) //stroing the array in localstorage
    console.log(localStorage.getItem("myLinks"))
})

