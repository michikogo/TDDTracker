// stopwatch functions...
var Stopwatch = function(elem, options) {
    var timer = createTimer(),
      startButton = createButton("start", start),
      stopButton = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(stopButton);
    elem.appendChild(resetButton);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
      return document.createElement("span");
    }
  
    function createButton(action, handler) {
      var a = document.createElement("a");
      a.href = "#" + action;
      a.innerHTML = action;
      a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
      });
      return a;
    }
  
    function start() {
      if (!interval) {
        offset = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      clock = 0;
      render(0);
    }
  
    function update() {
      clock += delta();
      render();
    }
  
    function render() {
      var h = Math.floor(clock / (1000 * 60 * 60)) % 24;
      var m = Math.floor(clock / (1000 * 60)) % 60;
      var s = Math.floor(clock / 1000) % 60;
      var ms = Math.floor(clock % 1000);
  
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      if (ms < 100) {
        ms = "0" + ms;
      }
      if (ms < 10) {
        ms = "0" + ms;
      }
  
      timer.innerHTML = h + ':' + m + ':' + s + '::' + ms;
  
    }
  
    function delta() {
      var now = Date.now(),
        d = now - offset;
  
      offset = now;
      return d;
    }
  
    this.start = start;
    this.stop = stop;
    this.reset = reset;
  };
  
  
  var elems = document.getElementsByClassName("basic");
  for (var i = 0, len = elems.length; i < len; i++) {
    new Stopwatch(elems[i]);
  }
  
  
  //click one btn, stop all other watch
  $('#btngroup button').live('click', function() {
    var btnClicked = $(this).index();
    $('.basic').each(function(index) {
      if(btnClicked == index){
        $(this).find('a:eq(0)')[0].click();
      } else {
        $(this).find('a:eq(1)')[0].click();
      }
    });
  });