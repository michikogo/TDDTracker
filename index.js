$(document).ready(function(){
    var taskDetails = [
        {id: 0, name: "Fix Start and End Timer", startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: null},
        {id: 1, name: "Filterning", startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: null}
    ]
    var count = 2;
    
    // Creatiing new task, added task appends to list
    $("#new-task").click(function(){
        var newTaskTitle = document.getElementById("new-task-title").value
        if(newTaskTitle != ''){
            console.log(newTaskTitle)
            $("ul").prepend('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><span class="p-margin">' + newTaskTitle + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch"></span></div><div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'); 
            document.getElementById('new-task-title').value = ''
            taskDetails.push({id: count++, name: newTaskTitle, startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: null})
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
            $("ul").append('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><span class="p-margin">' + taskDetails[i].name + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch"></span></div><div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'); 
        }
    });

    // Start Time
    $(document).on('click', ' #start', function() {
        console.log(this)
        console.log($(this).closest('li').prop('id'));
        console.log($(this).closest('li').find('.p-margin').text())
        var taskName = $(this).closest('li').find('.p-margin').text()
        var now = new Date(Date.now());
        var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        console.log(formatted)
        // $(this).closest('li').find("#stopwatch").replaceWith("Start Time: " + formatted)
        for(i = 0; i < taskDetails.length; i++) {
            if(taskName == taskDetails[i].name){
                taskDetails[i].startTimeHours = now.getHours()
                taskDetails[i].startTimeMins = now.getMinutes()
                taskDetails[i].startTimeSeconds = now.getSeconds()
            }
        }
        console.log(taskDetails)
        // $(this).closest('li').toggleClass('strike').fadeOut('slow', function() { 
            // stopwatchFormat.start();
        // });
    });
    
    // End Stopwatch
    $(document).on('click', ' #end', function() {
        console.log(this)
        console.log($(this).closest('li').prop('id'));
        console.log($(this).closest('li').find('.p-margin').text())
        var taskName = $(this).closest('li').find('.p-margin').text()
        var now = new Date(Date.now());
        var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        console.log(formatted)

        for(i = 0; i < taskDetails.length; i++) {
            if(taskDetails[i].startTimeHours != null){
                if(taskName == taskDetails[i].name){
                    taskDetails[i].endTimeHours = now.getHours()
                    taskDetails[i].endTimeMins = now.getMinutes()
                    taskDetails[i].endTimeSeconds = now.getSeconds()

                    var hours = taskDetails[i].endTimeHours - taskDetails[i].startTimeHours
                    var mins = taskDetails[i].endTimeMins - taskDetails[i].startTimeMins
                    var seconds = taskDetails[i].endTimeSeconds - taskDetails[i].startTimeSeconds
                
                    var computation = hours + ":" + mins + ":" + seconds 
                    console.log(computation)

                    taskDetails[i].duration = computation
                    $(this).closest('li').find("#stopwatch").text("( " + computation + " )")
                }
            }
        }
        console.log(taskDetails)
        // $(this).closest('li').toggleClass('strike').fadeOut('slow', function() { 
            // stopwatchFormat.start();
        // });
    });
});