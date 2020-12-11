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
    // Index
    var count = 2;

    // Showing static objects in array
    $.each(taskDetails, function(index, value){
        console.log(taskDetails)
        durationSplit = value.duration.split(':')
        $("ul").append('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="row">' 
                        + '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil edit-style" fill="currentColor" id="edit-task" xmlns="http://www.w3.org/2000/svg">'
                        + '<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'
                        + '</svg><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square close-style" id="delete-task" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
                        + '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'
                        + '<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
                        + '</svg></div><div class="col text-style"><span class="p-margin">' 
                        +  value.name + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch">(' 
                        + durationSplit[0] + ':' + durationSplit[1] + ':' + durationSplit[2] + ')</span></div>'
                        + '<div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button>'
                        + '</div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end" disabled="disabled">End</button>'
                        +'</div></div></div></div></div></div></li>'
                    );
    })

    // Creatiing new task, added task appends to list
    $("#new-task").click(function(){
        var newTaskTitle = document.getElementById("new-task-title").value
        if(newTaskTitle != ''){
            console.log("[NEW TASK] newTaskTitle: " + newTaskTitle)
            $("ul").prepend('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="row">' 
                                + '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil edit-style" fill="currentColor" id="edit-task" xmlns="http://www.w3.org/2000/svg">'
                                + '<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'
                                + '</svg><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square close-style" id="delete-task" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
                                + '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'
                                + '<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
                                + '</svg></div><div class="col text-style"><span class="p-margin">' 
                                + newTaskTitle + '</span></div><div class="col-5"><div class="row">'
                                + '<span class="stopwatch-style" id="stopwatch">(00:00:00)</span></div><div class="row"><div class="col">' 
                                + '<button type="button" class="btn btn-secondary start-style" id="start">Start</button></div><div class="col">'
                                + '<button type="button" class="btn btn-secondary end-style" id="end" disabled="disabled">End</button></div></div></div></div></div></div></li>'
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
            $("ul").append('<li id="task-card"><div class="card"><div class="card-body"><div class="row"><div class="row">' 
                            + '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil edit-style" fill="currentColor" id="edit-task" xmlns="http://www.w3.org/2000/svg">'
                            + '<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'
                            + '</svg><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square close-style" id="delete-task" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
                            + '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'
                            + '<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
                            + '</svg></div><div class="col text-style"><span class="p-margin">' 
                            + taskDetails[i].name + '</span></div><div class="col-5"><div class="row"><span class="stopwatch-style" id="stopwatch">(' 
                            + durationSplit[0] + ':' + durationSplit[1] + ':' + durationSplit[2] + ')</span></div>'
                            + '<div class="row"><div class="col"><button type="button" class="btn btn-secondary start-style" id="start">Start</button>'
                            + '</div><div class="col"><button type="button" class="btn btn-secondary end-style" id="end" disabled="disabled">End</button>'
                            +'</div></div></div></div></div></div></li>'
                        );
        }
    });

    // Deleting 
    $(document).on('click', '#delete-task', function(){
        var totalDurationHours = 0;
        var totalDurationMins = 0;
        var totalDurationSeconds = 0;
        var newTotalDuration = 0

        var taskName = $(this).closest("li").find('.p-margin').text()
        // console.log(taskName)

        // Removed
        $(this).closest('li').remove();
        for(i = 0; i < taskDetails.length; i++) {
            // Remove in Array
            if(taskName == taskDetails[i].name){
                taskDetails.splice(i,1)
            }
            // Computing New "Summary" Time 
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
    
    // Editing
    $(document).on('click', '#edit-task', function(){
        var taskName = $(this).closest("li").find('.p-margin').text()
        console.log(taskName)
        $('.p-margin').val()
    })

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