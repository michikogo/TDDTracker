$(document).ready(function(){
    var taskDetails = [
        {id: 0, name: "Fix Start and End Timer", startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: "00:00:00", durationInSeconds: null},
        {id: 1, name: "Filterning", startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: "00:00:00", durationInSeconds: null}
    ]
    var count = 2;
    
    $("#end").attr("disabled", true);

    // Creatiing new task, added task appends to list
    $("#new-task").click(function(){
        var newTaskTitle = document.getElementById("new-task-title").value
        if(newTaskTitle != ''){
            // console.log(newTaskTitle)
            $("ul").prepend('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style">'
                                + '<span class="p-margin">' + newTaskTitle + '</span></div><div class="col-5"><div class="row">'
                                + '<span class="stopwatch-style" id="stopwatch">(0:0:0)</span></div><div class="row"><div class="col">' 
                                + '<button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col">'
                                + '<button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'
                            ); 
            document.getElementById('new-task-title').value = ''
            taskDetails.push({id: count++, name: newTaskTitle, startTimeHours: null, startTimeMins: null, startTimeSeconds: null, endTimeHours: null, endTimeMins: null, endTimeSeconds: null, duration: "00:00:00", durationInSeconds: null})
            // console.log(taskDetails)
            $("#end").attr("disabled", true);

        } else {
            alert("No Task!")
        }
    });

    // Filtering 
    $("#filter").change(function(){
        var id = $(this).val();
        var text = $('option:selected', this).text(); //to get selected text
        // console.log(id + "SAD" + text)
        
        // Recently Added
        if(text == "Recently Added"){
            taskDetails.sort(function(a, b){
                return (a.id < b.id) ? 1 : -1;
            })
        }
            
        // Shortest Task
        if(text == "Shortest Task"){
            taskDetails.sort(function(a, b){
                return (a.timeInSeconds < b.timeInSeconds) ? 1 : -1;
            })

        }
        // console.log($(this).closest('#content').find("#end"))
        // $(this).closest('#content').find("#end").attr("disabled", false);
        // $(this).closest('#content').find("#start").attr("disabled", true);

        // Printing Filtered
        // console.log(taskDetails)
        $('ul').empty()
        for(i = 0; i<taskDetails.length; i++){
            durationSplit = taskDetails[i].duration.split(':')
            // console.log(durationSplit)
            $("ul").append('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><span class="p-margin">' 
                            + taskDetails[i].name + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch">(' 
                            + durationSplit[0] + ':' + durationSplit[1] + ':' + durationSplit[2] 
                            + ')</span></div><div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button>'
                            + '</div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button>'
                            +'</div></div></div></div></div></div></li>'
                        ); 
            // $("#start").attr("disabled", false);
            // $("#end").attr("disabled", true);
            
            $(this).closest('ul').find("#start").attr("disabled", false);
            $(this).closest('ul').find("#end").attr("disabled", true);
        }
        
    });

    // Start Time
    $(document).on('click', ' #start', function() {
        // console.log(this)
        // console.log($(this).closest('li').prop('id'));
        // console.log($(this).closest('li').find('.p-margin').text())
        var taskName = $(this).closest('li').find('.p-margin').text()
        var now = new Date(Date.now());
        var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        // console.log(formatted)

        
        
        // $(this).closest('li').find("#stopwatch").replaceWith("Start Time: " + formatted)
        for(i = 0; i < taskDetails.length; i++) {
            if(taskName == taskDetails[i].name){
                
                $(this).closest('li').find("#end").attr("disabled", false);
                $(this).closest('li').find("#start").attr("disabled", true);
                taskDetails[i].startTimeHours = now.getHours()
                taskDetails[i].startTimeMins = now.getMinutes()
                taskDetails[i].startTimeSeconds = now.getSeconds()
            }
        }
        // console.log(taskDetails)
        // $(this).closest('li').toggleClass('strike').fadeOut('slow', function() { 
            // stopwatchFormat.start();
        // });
    });
    
    function computeDuration(){

    }

    // End Stopwatch
    $(document).on('click', ' #end', function() {
        // console.log(this)
        // console.log($(this).closest('li').prop('id'));
        console.log($(this).closest('li'));
        // console.log($(this).closest('li').find('.p-margin').text())
        var taskName = $(this).closest('li').find('.p-margin').text()
        var now = new Date(Date.now());
        var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        // console.log(formatted)

        var totalDurationHours = 0;
        var totalDurationMins = 0;
        var totalDurationSeconds = 0;
        var newTotalDuration = 0
        for(i = 0; i < taskDetails.length; i++) {
            if(taskDetails[i].startTimeHours != null){
                
                
        
                if(taskName == taskDetails[i].name){
                    $(this).closest('li').find("#end").attr("disabled", true);
                    $(this).closest('li').find("#start").attr("disabled", false);
                    taskDetails[i].endTimeHours = now.getHours()
                    taskDetails[i].endTimeMins = now.getMinutes()
                    taskDetails[i].endTimeSeconds = now.getSeconds()

                    var hours = taskDetails[i].endTimeHours - taskDetails[i].startTimeHours
                    var mins = taskDetails[i].endTimeMins - taskDetails[i].startTimeMins
                    var seconds = taskDetails[i].endTimeSeconds - taskDetails[i].startTimeSeconds
                
                    var computation = hours + ":" + mins + ":" + seconds 
                    // console.log("Computation:" + computation)
                    // console.log("Checking array Duration: " + taskDetails[i].duration)

                    if(taskDetails[i].duration != null){

                        // computeDuration(taskDetails[i].duration, )
                        splitDuration = taskDetails[i].duration.split(':')

                        var totalHours = parseInt(splitDuration[0]) + hours
                        var totalMins = parseInt(splitDuration[1]) + mins
                        totalHours = totalHours + totalMins / 60;
                        totalMins = mins % 60
                        var totalSeconds = parseInt(splitDuration[2]) + seconds
                        totalMins = totalMins + totalSeconds / 60
                        totalSeconds = totalSeconds % 60

                        var newDuration = parseInt(totalHours) + ":" + parseInt(totalMins) + ":" + parseInt(totalSeconds) 
                        taskDetails[i].duration = newDuration
                        // console.log("New Duration: " + newDuration)
                        $(this).closest('li').find("#stopwatch").text("( " + newDuration + " )")

                        // Computing in seconds
                        var hoursInSeconds = parseInt(totalHours) * 120
                        var minsInSeconds = parseInt(totalMins) * 60
                        var timeInSeconds = hoursInSeconds + minsInSeconds + parseInt(totalSeconds)

                        // console.log(timeInSeconds)

                        taskDetails[i].durationInSeconds = timeInSeconds
                        
                    } else {
                        // Computing in seconds
                        var hoursInSeconds = parseInt(hours) * 120
                        var minsInSeconds = parseInt(mins) * 60
                        var timeInSeconds = hoursInSeconds + minsInSeconds + parseInt(seconds)

                        taskDetails[i].duration = computation
                        taskDetails[i].durationInSeconds = timeInSeconds
                        // console.log(timeInSeconds)
                        $(this).closest('li').find("#stopwatch").text("( " + computation + " )")
                    }
                    
                }
            }
            // Computing total Time
            // console.log(i + "taskDetails[i].duration: " + taskDetails[i].durationInSeconds)
            totalDurationSplit = taskDetails[i].duration.split(':')
            // console.log(totalDurationSplit)

            totalDurationHours = totalDurationSplit[0] + totalDurationHours
            totalDurationMins = parseInt(totalDurationSplit[1]) + totalDurationMins
            totalDurationHours = totalDurationHours + totalDurationMins / 60;
            totalDurationMins = totalDurationMins % 60
            totalDurationSeconds = parseInt(totalDurationSplit[2]) + totalDurationSeconds
            totalDurationMins = totalDurationMins + totalDurationSeconds / 60
            totalDurationSeconds = totalDurationSeconds % 60

            newTotalDuration = parseInt(totalDurationHours) + ":" + parseInt(totalDurationMins) + ":" + parseInt(totalDurationSeconds) 
            
        }
        console.log(newTotalDuration)
        $("#total-time").empty()
        
        $("#total-time").append("(" + newTotalDuration + ")")
        console.log(taskDetails)
    });
});