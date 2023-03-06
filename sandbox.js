// let person = {
//     name: "pawan",
//     age : 22,
//     country : "India"
// }
// function logData(){
// console.log( `${person.name} is ${person.age} years old and lives in ${person.country}`)
// }
// logData();

// function save(){
//     console.log("Button clicked!");
// }





let leads = [];
const inputEl = document.querySelector(".input-el");
// Event Listener
const inputBtn = document.querySelector(".input-btn");
let unList = document.querySelector("#ul-li");
const deleteBtn = document.querySelector(".delete-btn");
const saveBtn = document.querySelector(".save-btn");

// localStorage.setItem("myLeads","test");
// console.log(localStorage.getItem("myLeads"));



const localData = JSON.parse(localStorage.getItem("data"));
if (localData) {
    leads = localData;
    renderData(leads);
}

deleteBtn.addEventListener("dblclick", function () {

    localStorage.clear();
    leads = [];
    renderData(leads);
})

saveBtn.addEventListener("click", function () {
    //save url
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        leads.push(tabs[0].url);
        localStorage.setItem("data", JSON.stringify(leads));
        renderData(leads);
    })
})

inputBtn.addEventListener("click", function () {
    leads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("data", JSON.stringify(leads));
    renderData(leads);
    // const list = document.createElement("li");
    // list.append(inputEl.value);
    // unList.appendChild(list);
    // inputEl.value = "";
    // renderData();

})

function renderData(link) {
    let items = "";
    let count = 0;
    for (let i = 0; i < link.length; i++) {
        items += `<div class = "flex_box" id = "item-${count}">
        <li >
        <a id="link-${count}" href = "${link[i]}" target ="_main" >${link[i]}</a>
        </li>
        <button id = "del-${count}" class="trash">Del</button>
        </div>`;
        count++;
    }
    unList.innerHTML = items;

    
    // const notes = document.querySelectorAll("li");
    // const data = [];
    // notes.forEach((note) => {
    //     data.push(note.innerText);
    // });

    // localStorage.setItem("notes",JSON.stringify(data));
}

// (function() {
//     const data = JSON.parse(localStorage.getItem("notes"));
//     data.forEach( (dat) => {
//         const list = document.createElement("li");
//         list.append(dat);
//         unList.appendChild(list);
//     });
// })();


const TrashList = document.querySelectorAll(".trash");
const list = document.getElementById("ul-li");

TrashList.forEach(Trash => {
    Trash.addEventListener("click",() => {
        const buttonId = Trash.id.split("-")[1];
        const container = document.getElementById(`item-${buttonId}`);
        let test = JSON.parse(localStorage.getItem("data"));
        const searchString = document.getElementById(`link-${buttonId}`).textContent;
        const index = leads.indexOf(searchString);

        leads.splice(index, 1);
        localStorage.setItem("data",JSON.stringify(leads));

        list.removeChild(container);
        console.log("yes");
        
    })
});
