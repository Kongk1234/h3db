function addToTask(){
    let userName = document.getElementById("addPerson").value
    let task = document.getElementById("addTask").value

    let data = {'name': userName, 'taskName': task}
    fetch('http://localhost:3000/addToTask', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function deleteTask(task){
    let data = {'taskName': task}
    fetch('http://localhost:3000/deleteTask', {
    method: 'DELETE', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function tasks() {
    let trrid = 0;
    fetch('http://localhost:3000/allTask')
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let input = document.createElement('input')
            input.className = 'form-control'
            input.value = element.taskName
            input.name = element.taskName
            document.getElementById('cards').appendChild(input)

            let startTime = document.createElement('input')
            let oldTime = new Date(element.timeStart)
            let oldDate = oldTime.toISOString().substring(0,10);      
            startTime.className = 'form-control'
            startTime.id = oldDate.toString()
            startTime.type = "date"
            startTime.value = oldDate
            document.getElementById('cards').appendChild(startTime)
        
            let endTime = document.createElement('input')
            let enddTime = new Date(element.timeEnd)
            let endDate = enddTime.toISOString().substring(0,10);   
            endTime.className = 'form-control'
            endTime.id = endDate.toString()
            endTime.type = "date"
            endTime.value = endDate
            document.getElementById('cards').appendChild(endTime)

            let deleteButton = document.createElement('button')
            deleteButton.className = 'btn'
            deleteButton.id = element.taskName
            deleteButton.innerHTML = ' X '
            deleteButton.style.backgroundColor = "red"
            deleteButton.onclick = (event) =>{deleteTask(event.target.id)}
            document.getElementById('cards').appendChild(deleteButton)

            let updateButton = document.createElement('button')
            updateButton.className = 'btn'
            updateButton.id = element.taskName
            updateButton.innerHTML = ' Update '
            updateButton.onclick = (event) =>{updateTask(event.target.id, startTime.id, endTime.id)}
            document.getElementById('cards').appendChild(updateButton)

            if(index == 0){
                let table = document.createElement("table")
                let tbody = document.createElement("tbody")
                let tr = document.createElement("tr") 
                tr.id = "trr" + trrid.toString()
                tbody.id = "tbodyy"
                tbody.appendChild(tr)
                table.appendChild(tbody) 
                document.getElementById("cards").appendChild(table) 
            }
            else if(index % 5 == 0 && index != 0){
                let tr = document.createElement("tr")
                trrid++; 
                tr.id = "trr" + trrid.toString()
                document.getElementById("tbodyy").appendChild(tr)
            }
            if(index < 5){
                let td = document.createElement("td")
                td.appendChild(input)
                td.appendChild(startTime)
                td.appendChild(endTime)
                td.appendChild(deleteButton)
                td.appendChild(updateButton)
    
                document.getElementById("trr" + trrid.toString()).appendChild(td)
            }
            if(index >= 5){
                let td = document.createElement("td")
        
                td.appendChild(input)
                td.appendChild(startTime)
                td.appendChild(endTime)
                td.appendChild(deleteButton)
                td.appendChild(updateButton)
    
                document.getElementById("trr" + trrid.toString()).appendChild(td)                    
            }
        };
    })

    let createTask = document.createElement('input')
    createTask.className = 'form-control time'
    createTask.placeholder = "Task name"
    createTask.id = 'createTask'
    document.getElementById('cards').appendChild(createTask)


    let startTime = document.createElement('input')
    startTime.className = 'form-control time'
    startTime.id = 'startTime'
    startTime.type = "date"
    document.getElementById('cards').appendChild(startTime)

    let endTime = document.createElement('input')
    endTime.className = 'form-control time'
    endTime.id = 'endTime'
    endTime.type = "date"
    document.getElementById('cards').appendChild(endTime)

    let createButton = document.createElement('button')
    createButton.className = 'btn'
    createButton.innerHTML = 'Create task'
    createButton.onclick = () =>{createNewTask()}
    document.getElementById('cards').appendChild(createButton)
}

function updateTask(oldName, oldDatee, endDatee){
    let newName = document.getElementsByName(oldName)[0].value
    let timeStart = document.getElementById(oldDatee).value
    let timeEnd = document.getElementById(endDatee).value
    let data = {'newName': newName, 'timeEnd':timeEnd, 'timeStart':timeStart, 'oldName': oldName}
    fetch('http://localhost:3000/updateTask', {
    method: 'PUT', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function users() {
    let trrid = 0;
    fetch('http://localhost:3000/allUsers')
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let input = document.createElement('input')
            input.className = 'form-control'
            input.value = element.name
            input.name = element.name
         

            let deleteButton = document.createElement('button')
            deleteButton.className = 'btn'
            deleteButton.id = element.name
            deleteButton.innerHTML = ' X '
            deleteButton.style.backgroundColor = "red"
            deleteButton.onclick = (event) =>{deleteUser(event.target.id)}

            let updateButton = document.createElement('button')
            updateButton.className = 'btn'
            updateButton.id = element.name
            updateButton.innerHTML = ' Update '
            updateButton.onclick = (event) =>{updateUser(event.target.id)}

            if(index == 0){
                let table = document.createElement("table")
                let tbody = document.createElement("tbody")
                let tr = document.createElement("tr") 
                tr.id = "trr" + trrid.toString()
                tbody.id = "tbodyy"
                tbody.appendChild(tr)
                table.appendChild(tbody) 
                document.getElementById("cards").appendChild(table) 
            }
            else if(index % 5 == 0 && index != 0){
                let tr = document.createElement("tr")
                trrid++; 
                tr.id = "trr" + trrid.toString()
                document.getElementById("tbodyy").appendChild(tr)
            }
            if(index < 5){
                let td = document.createElement("td")
                td.appendChild(input)
                td.appendChild(deleteButton)
                td.appendChild(updateButton)
    
                document.getElementById("trr" + trrid.toString()).appendChild(td)
            }
            if(index >= 5){
                let td = document.createElement("td")
        
                td.appendChild(input)
                td.appendChild(deleteButton)
                td.appendChild(updateButton)
    
                document.getElementById("trr" + trrid.toString()).appendChild(td)                    
            }
            
        }

    })

    let createUser = document.createElement('input')
    createUser.className = 'form-control'
    createUser.id = 'createUser'
    document.getElementById('cards').appendChild(createUser)

    let createButton = document.createElement('button')
    createButton.className = 'btn'
    createButton.innerHTML = 'Create User'
    createButton.onclick = () =>{createNewUser()}
    document.getElementById('cards').appendChild(createButton)
}

function getChoose() {
    let cards = document.getElementById("cards");
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }

    let choosen = document.getElementById("choose").value
    if(choosen == "Users"){
        users()
    }
    if(choosen == "Tasks"){
        tasks()
    }
    if(choosen == "Add"){
        combine()
    }
    if(choosen == "Show"){
        show()
    }
}

function show() {
    let showTasks = document.createElement('input')
    showTasks.className = 'form-control time'
    showTasks.id = "showTasks"
    showTasks.placeholder = "User"
    document.getElementById('cards').appendChild(showTasks)

    let showTaskButton = document.createElement('button')
    showTaskButton.className = 'btn'
    showTaskButton.innerHTML = 'Show tasks'
    showTaskButton.onclick = () =>{getTasks()}
    document.getElementById('cards').appendChild(showTaskButton)
}

function removeFromTask(task){
    let name = document.getElementById("showTasks").value

    let data = {'name': name, 'taskName': task}
    fetch('http://localhost:3000/removeFromTask', {
    method: 'DELETE', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function getTasks() {
    let cards = document.getElementById("cards");
    while (cards.children.length > 2) {
        cards.removeChild(cards.lastChild);
    }
    
    let newName = document.getElementById("showTasks").value
    let data = {'name': newName}
    fetch('http://localhost:3000/getSpecTask', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let input = document.createElement('input')
            input.className = 'form-control time'
            input.value = element.taskName
            input.name = element.taskName
            document.getElementById('cards').appendChild(input)

            let deleteButton = document.createElement('button')
            deleteButton.className = 'btn'
            deleteButton.id = element.taskName
            deleteButton.innerHTML = ' X '
            deleteButton.style.backgroundColor = "red"
            deleteButton.onclick = (event) =>{removeFromTask(event.target.id)}
            document.getElementById('cards').appendChild(deleteButton)

        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function combine(){
    let addPerson = document.createElement('input')
    addPerson.className = 'form-control time'
    addPerson.id = "addPerson"
    addPerson.placeholder = "User"
    document.getElementById('cards').appendChild(addPerson)

    let addTask = document.createElement('input')
    addTask.className = 'form-control time'
    addTask.id = "addTask"
    addTask.placeholder = "Task"
    document.getElementById('cards').appendChild(addTask)

    let addButton = document.createElement('button')
    addButton.className = 'btn'
    addButton.innerHTML = 'Add to task'
    addButton.onclick = () =>{addToTask()}
    document.getElementById('cards').appendChild(addButton)
}



function updateUser(oldName){
    let newName = document.getElementsByName(oldName)[0].value
    let data = {'newName': newName, 'oldName': oldName}
    fetch('http://localhost:3000/updateUser', {
    method: 'PUT', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}


function createNewUser() {
    let userName = document.getElementById("createUser").value
    let data = {'name': userName}
    fetch('http://localhost:3000/createUser', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function deleteUser(deletedUser) {
    let data = {'name': deletedUser}
    fetch('http://localhost:3000/deleteUser', {
    method: 'DELETE', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function createNewTask() {
    let task = document.getElementById("createTask").value
    let timeStart = document.getElementById("startTime").value
    let timeEnd = document.getElementById("endTime").value

    let data = {'taskName': task, 'timeStart': timeStart ,'timeEnd': timeEnd}
    fetch('http://localhost:3000/createTask', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

let dataArr = []

function onTask(array){
    array.forEach(element => {
        let collection = []
        let data = {'taskName': element.taskName}
        fetch('http://localhost:3000/getUserTask', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                collection.push(element.name)                
            });
            dataArr.push(collection)
        })
        .catch((error) => {
        console.error('Error:', error);
        });

    });
}


function getData() {
    let dataColletion = []
    fetch('http://localhost:3000/allTask')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            dataColletion.push(element)
        });
    })

    setTimeout(() => {
        anychart.onDocumentReady(function () {
            // create data
            let data = [{
                id: "1",
                name: "Project",
                actualStart: Date.UTC(2022, 01, 02),
                actualEnd: Date.UTC(2030, 06, 15),
                children: [
                ]
            }];

            onTask(dataColletion)
        
            
            for (let index = 0; index < dataColletion.length; index++) {
                const element = dataColletion[index];
                let startdate = new Date(element.timeStart)
                let enddate = new Date(element.timeEnd)
                let chartjson = {
                    id: element.id,
                    name: element.taskName,
                    personOnTask: "",
                    actualStart: Date.UTC(startdate.getFullYear(), startdate.getMonth(), startdate.getDay()),
                    actualEnd: Date.UTC(enddate.getFullYear(), enddate.getMonth(), enddate.getDay()),
                }
                setTimeout(() => {
                    for (let index1 = 0; index1 < dataArr[index].length; index1++) {
                        chartjson.personOnTask += dataArr[index][index1] + ", "
                    }
                }, 500);
   
                data[0].children.push(chartjson) 
            }

            setTimeout(() => {
            // create a data tree
            let treeData = anychart.data.tree(data, "as-tree");
        
            // create a chart
            let chart = anychart.ganttProject();
        
            // set the data
            chart.data(treeData);
            
            let column_2 = chart.dataGrid().column(2);
            column_2.labels().useHtml(true);
            column_2.title("Persons on this task");
            column_2.setColumnFormat("personOnTask", "text");

            // configure the scale
            chart.getTimeline().scale().maximum(Date.UTC(2026, 06, 15));
            // set the container id
            chart.container("container");
            // initiate drawing the chart
            chart.draw();
            // fit elements to the width of the timeline
            chart.fitAll();
            }, 1000);
        });

    }, 2000);   
}
