$(document).ready(function(){
    var taskDetails = [
        {id: 0, name: "Fix Start and End Timer", hours: "00", mins: "00", seconds: "00"},
        {id: 1, name: "Filterning", hours: "00", mins: "00", seconds: "00"}
    ]
    var count = 2;
    // Creatiing new task, added task appends to list
    $("#new-task").click(function(){
        var newTaskTitle = document.getElementById("new-task-title").value
        if(newTaskTitle != ''){
            console.log(newTaskTitle)
            $("ul").prepend('<li><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><p class="p-margin">' + newTaskTitle + '</p></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch"></span></div><div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'); 
            document.getElementById('new-task-title').value = ''
            taskDetails.push({id: count++, name: newTaskTitle, hours: "00", mins: "00", seconds: "00"})
            console.log(taskDetails)
        } else {
            alert("No Task!")
        }
    });

    // Filtering 
    $("#filter").change(function(){
        var id = $(this).val();
        var text = $('option:selected', this).text(); //to get selected text
        console.log(id + "SAD" + text)

        // Recently Added
        if(text == "Recently Added"){
            taskDetails.sort(function(a, b){
                return (a.id < b.id) ? 1 : -1;
            })
        }
            
        // Shortest Task
        if(text == "Shortest Task"){
            taskDetails.sort(function(a, b){
                return (a.name > b.name) ? 1 : -1;
            })
        }

        // Printing Filtered
        console.log(taskDetails)
        $('ul').empty()
        for(i = 0; i<taskDetails.length; i++){
            $("ul").append('<li><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><p class="p-margin">' + taskDetails[i].name + '</p></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch"></span></div><div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'); 
        }
    });

    /**  STOPWATCH **/
    var Stopwatch;
    if (!Stopwatch) 
        Stopwatch = {};

    function Stopwatch(displayTime){
        this.runtime = 0;
        this.timer = null; 
        this.displayTime = displayTime;
    }

    Stopwatch.INCREMENT = 200

    // Display Time
    Stopwatch.prototype.doDisplay = function(){
        if (!this.laptime) 
            this.displayTime(this.runtime);
        else 
            this.displayTime(this.laptime);
    }

    // Time Start Function
    Stopwatch.prototype.start = function(){
        var instance = this;
        this.timer = window.setInterval(function(){
            instance.runtime += Stopwatch.INCREMENT;
            instance.doDisplay();
        }, Stopwatch.INCREMENT);
    }

    // Time Stop Function
    Stopwatch.prototype.stop = function(){
        window.clearInterval(this.timer);
        this.timer = null;
        this.doDisplay();
    }

    // Time Format (H:M:S)
    var stopwatchFormat = new Stopwatch(function(runtime) {
        var hours = Math.floor(runtime / 3600000);
        var minutes = Math.floor(runtime / 60000);
        var seconds = Math.floor(runtime % 60000 / 1000);
        var displayText =  hours + ":" +  minutes + ":" + (seconds < 10 ? "0" : "") + seconds ;
        $("#stopwatch").text(displayText);
    });

    // Start Stopwatch
    $('ul').on('click', '#start', function(){
        console.log("start")
        stopwatchFormat.start();
    });

    // End Stopwatch
    $("ul").on("click", "#end", function(){
        console.log("end")
        stopwatchFormat.stop(); 
    });
});