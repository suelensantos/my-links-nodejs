// OBS.: https://www.freecodecamp.org/news/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547/

//const request = new XMLHttpRequest();

const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

const url_api = "http://localhost:3000/"

// Get all data
//request.open('GET', url_api, true);
//request.onload = function () {

    // Accessing JSON data
    //var data = JSON.parse(request.response);

    //console.log("VALOOORR:", data)

    //data.urls.map(({name, url}) => addElement({name, url}))
//}
//request.send()

async function load() {
    const res = await fetch(url_api).then((data) => data.json())

    console.log(res)
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => {
        removeElement(trash)
        
        fetch(url_api + `?name=${name}&url=${url}`, {
            method: 'DELETE',
        })
    }

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if(confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('Formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    fetch(url_api, {
        method: 'POST',
        body: JSON.stringify({ name, url })
    })

    //fetch(url_api).then((data) => data.json())
        //.then(res => JSON.stringify(res.urls.push({name: name, url: url})))

    //request.open("POST", url_api, true);
    //request.setRequestHeader('Content-type','application/json; charset=utf-8');
    //var data = JSON.stringify({ name, url })
    //console.log("DATAAA:", data)
    //request.send(data);

    input.value = ""
})