
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

let test = ''
fetch('http://localhost:3000/allTask')
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        test = element.taskName
        console.log(element.taskName);
    });
})

    console.log(test);

function getData() {
    // let test = ''
    // fetch('http://localhost:3000/allTask')
    // .then(response => response.json())
    // .then(data => {
    //     data.forEach(element => {
    //         test = element.taskName
    //         console.log(element.taskName);
    //     });
    // })

        //console.log(test);
    anychart.onDocumentReady(function () {
        // create data
        var data = [{
            id: "1",
            name: "Development Life Cycle",
            actualStart: Date.UTC(2018, 01, 02),
            actualEnd: Date.UTC(2018, 06, 15),
            children: [{
                    id: "1_1",
                    name: "Planning",
                    actualStart: Date.UTC(2018, 01, 02),
                    actualEnd: Date.UTC(2018, 01, 22),
                },
                {
                    id: "1_2",
                    name: "Design and Prototyping",
                    actualStart: Date.UTC(2018, 01, 23),
                    actualEnd: Date.UTC(2018, 02, 20),
                },
                {
                    id: "1_4",
                    name: "Application Development",
                    actualStart: Date.UTC(2018, 02, 26),
                    actualEnd: Date.UTC(2018, 04, 26),
                },
                {
                    id: "1_5",
                    name: "Testing",
                    actualStart: Date.UTC(2018, 04, 29),
                    actualEnd: Date.UTC(2018, 05, 15),
                },
                {
                    id: "1_6",
                    name: "Deployment",
                    actualStart: Date.UTC(2018, 05, 20),
                    actualEnd: Date.UTC(2018, 05, 27),
                },
                {
                    id: "1_7",
                    name: "Maintenance",
                    actualStart: Date.UTC(2018, 05, 30),
                    actualEnd: Date.UTC(2018, 06, 11),
                },
    
            ]
        }];
        // create a data tree
        var treeData = anychart.data.tree(data, "as-tree");
    
        // create a chart
        var chart = anychart.ganttProject();
    
        // set the data
        chart.data(treeData);
        // configure the scale
        chart.getTimeline().scale().maximum(Date.UTC(2018, 06, 30));
        // set the container id
        chart.container("container");
        // initiate drawing the chart
        chart.draw();
        // fit elements to the width of the timeline
        chart.fitAll();
    });
    
}
