$(document).ready(function(){
    var taskDetails = [
        {   id: 0, name: "Fix Start and End Timer", 
            startTimeHours: null, startTimeMins: null, startTimeSeconds: null, 
            endTimeHours: null, endTimeMins: null, endTimeSeconds: null, 
            duration: "00:00:00", durationInSeconds: null
        },
        {   id: 1, name: "Filterning", 
            startTimeHours: null, startTimeMins: null, startTimeSeconds: null, 
            endTimeHours: null, endTimeMins: null, endTimeSeconds: null, 
            duration: "00:00:00", durationInSeconds: null
        }
    ]
    var count = 2;

    // Creatiing new task, added task appends to list
    $("#new-task").click(function(){
        var newTaskTitle = document.getElementById("new-task-title").value
        if(newTaskTitle != ''){
            console.log("[NEW TASK] newTaskTitle: " + newTaskTitle)
            $("ul").prepend('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style">'
                                + '<span class="p-margin">' + newTaskTitle + '</span></div><div class="col-5"><div class="row">'
                                + '<span class="stopwatch-style" id="stopwatch">(0:0:0)</span></div><div class="row"><div class="col">' 
                                + '<button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col">'
                                + '<button type="button" class="btn btn-secondary end-style" id="end">End</button></div></div></div></div></div></div></li>'
                            ); 
            document.getElementById('new-task-title').value = ''
            taskDetails.push({
                    id: count++, name: newTaskTitle, 
                    startTimeHours: null, startTimeMins: null, startTimeSeconds: null, 
                    endTimeHours: null, endTimeMins: null, endTimeSeconds: null, 
                    duration: "00:00:00", durationInSeconds: null
                })
            console.log(taskDetails)
        } else {
            alert("No Task!")
        }
    });

    function notUsable(){
        $(this).closest('li').find("#end").attr("disabled", true);
    }

    // Filtering 
    $("#filter").change(function(){
        var id = $(this).val();
        var text = $('option:selected', this).text();
        
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

        // Printing Filtered
        $('ul').empty()
        for(i = 0; i<taskDetails.length; i++){
            durationSplit = taskDetails[i].duration.split(':')
            $("ul").append('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="col text-style"><span class="p-margin">' 
                            + taskDetails[i].name + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch">(' 
                            + durationSplit[0] + ':' + durationSplit[1] + ':' + durationSplit[2] + ')</span></div>'
                            + '<div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button>'
                            + '</div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end">End</button>'
                            +'</div></div></div></div></div></div></li>'
                        );
        }
    });

    // Start Time
    $(document).on('click', ' #start', function() {
        // console.log(this)
        // console.log($(this).closest('li').prop('id'));
        // console.log($(this).closest('li').find('.p-margin').text())
        
        var taskName = $(this).closest('li').find('.p-margin').text()
        var now = new Date(Date.now());

        for(i = 0; i < taskDetails.length; i++) {
            if(taskName == taskDetails[i].name){
                // DISABLE start - ENABLE end
                $(this).closest('li').find("#end").attr("disabled", false);
                $(this).closest('li').find("#start").attr("disabled", true);
                // Placing in array
                taskDetails[i].startTimeHours = now.getHours()
                taskDetails[i].startTimeMins = now.getMinutes()
                taskDetails[i].startTimeSeconds = now.getSeconds()
            }
        }
    });

    // End Stopwatch
    $(document).on('click', ' #end', function() {
        var totalDurationHours = 0;
        var totalDurationMins = 0;
        var totalDurationSeconds = 0;
        var newTotalDuration = 0

        var now = new Date(Date.now());
        var taskName = $(this).closest('li').find('.p-margin').text()
        
        for(i = 0; i < taskDetails.length; i++) {
            if(taskDetails[i].startTimeHours != null){
                if(taskName == taskDetails[i].name){
                    // DISABLE end - ENABLE start
                    $(this).closest('li').find("#end").attr("disabled", true);
                    $(this).closest('li').find("#start").attr("disabled", false);
                    // Placing in array
                    taskDetails[i].endTimeHours = now.getHours()
                    taskDetails[i].endTimeMins = now.getMinutes()
                    taskDetails[i].endTimeSeconds = now.getSeconds()
                    // Compute difference of time
                    var diffHours = taskDetails[i].endTimeHours - taskDetails[i].startTimeHours
                    var diffMins = taskDetails[i].endTimeMins - taskDetails[i].startTimeMins
                    var diffSeconds = taskDetails[i].endTimeSeconds - taskDetails[i].startTimeSeconds
                    var computation = diffHours + ":" + diffMins + ":" + diffSeconds 
                
                    if(taskDetails[i].duration != null){
                        // Computing duration
                        splitDuration = taskDetails[i].duration.split(':')
                        var totalHours = parseInt(splitDuration[0]) + diffHours
                        var totalMins = parseInt(splitDuration[1]) + diffMins
                        totalHours = totalHours + totalMins / 60
                        totalMins = diffMins % 60
                        var totalSeconds = parseInt(splitDuration[2]) + diffSeconds
                        totalMins = totalMins + totalSeconds / 60
                        totalSeconds = totalSeconds % 60
                        // Placing in array
                        var newDuration = parseInt(totalHours) + ":" + parseInt(totalMins) + ":" + parseInt(totalSeconds) 
                        taskDetails[i].duration = newDuration
                        console.log("[END BTN] First Time Duration: " + newDuration)
                        // Display
                        $(this).closest('li').find("#stopwatch").text("( " + newDuration + " )")

                        // Converting time into seconds for easier filtering
                        var hoursInSeconds = parseInt(totalHours) * 120
                        var minsInSeconds = parseInt(totalMins) * 60
                        var timeInSeconds = hoursInSeconds + minsInSeconds + parseInt(totalSeconds)
                        // Placing in array
                        taskDetails[i].durationInSeconds = timeInSeconds
                    } else {
                        // Converting time into seconds for easier filtering
                        var hoursInSeconds = parseInt(diffHours) * 120
                        var minsInSeconds = parseInt(diffMins) * 60
                        var timeInSeconds = hoursInSeconds + minsInSeconds + parseInt(diffSeconds)

                        // Placing in array
                        taskDetails[i].duration = computation
                        taskDetails[i].durationInSeconds = timeInSeconds
                        console.log("[END BTN] timeInSeconds: " + timeInSeconds)
                        // Display
                        $(this).closest('li').find("#stopwatch").text("( " + computation + " )")
                    }
                    
                }
            }
            // Computing "Summary" Time 
            totalDurationSplit = taskDetails[i].duration.split(':')
            totalDurationHours = totalDurationSplit[0] + totalDurationHours
            totalDurationMins = parseInt(totalDurationSplit[1]) + totalDurationMins
            totalDurationHours = totalDurationHours + totalDurationMins / 60;
            totalDurationMins = totalDurationMins % 60
            totalDurationSeconds = parseInt(totalDurationSplit[2]) + totalDurationSeconds
            totalDurationMins = totalDurationMins + totalDurationSeconds / 60
            totalDurationSeconds = totalDurationSeconds % 60
            newTotalDuration = parseInt(totalDurationHours) + ":" + parseInt(totalDurationMins) + ":" + parseInt(totalDurationSeconds) 
        }
        console.log("[SUMMARY] newTotalDuration:" + newTotalDuration)
        $("#total-time").empty()
        $("#total-time").append("(" + newTotalDuration + ")")
        console.log(taskDetails)
    });
});