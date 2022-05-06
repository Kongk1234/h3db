function addToTask(){
    let userName = document.getElementById("name").value
    let task = document.getElementById("task").value

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

function deleteTask(){
    let task = document.getElementById("deleteTask").value

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

function updateUser(){
    let newName = document.getElementById("newName").value
    let oldName = document.getElementById("oldName").value

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


function createUser() {
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

function deleteUser() {
    let userName = document.getElementById("deleteUser").value
    let data = {'name': userName}
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

function createTask() {
    let task = document.getElementById("createTask").value
    let timeStart = document.getElementById("startDate").value
    let timeEnd = document.getElementById("endDate").value

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
    let test = []
    fetch('http://localhost:3000/allTask')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            test.push(element)
        });
    })

    setTimeout(() => {
        anychart.onDocumentReady(function () {
            // create data
            var data = [{
                id: "1",
                name: "Project",
                actualStart: Date.UTC(2022, 01, 02),
                actualEnd: Date.UTC(2030, 06, 15),
                children: [
                ]
            }];

            onTask(test)
        
            
            for (let index = 0; index < test.length; index++) {
                const element = test[index];
                let startdate = new Date(element.timeStart)
                let enddate = new Date(element.timeEnd)
                let testjson = {
                    id: element.id,
                    name: element.taskName,
                    name2: "",
                    actualStart: Date.UTC(startdate.getFullYear(), startdate.getMonth(), startdate.getDay()),
                    actualEnd: Date.UTC(enddate.getFullYear(), enddate.getMonth(), enddate.getDay()),
                }
                setTimeout(() => {
                    for (let index1 = 0; index1 < dataArr[index].length; index1++) {
                        testjson.name2 += dataArr[index][index1] + ", "
                    }
                }, 250);
   
                data[0].children.push(testjson) 
            }

            setTimeout(() => {
            // create a data tree
            var treeData = anychart.data.tree(data, "as-tree");
        
            // create a chart
            var chart = anychart.ganttProject();
        
            // set the data
            chart.data(treeData);
            
            var column_2 = chart.dataGrid().column(2);
            column_2.labels().useHtml(true);
            column_2.title("Persons on this task");
            column_2.setColumnFormat("name2", "text");

            // configure the scale
            chart.getTimeline().scale().maximum(Date.UTC(2026, 06, 15));
            // set the container id
            chart.container("container");
            // initiate drawing the chart
            chart.draw();
            // fit elements to the width of the timeline
            chart.fitAll();
            }, 500);
        });

    }, 1000);   
}
