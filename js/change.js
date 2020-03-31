onmessage = function (event) {
    var data = event.data;
    var lines = data.split('\n');
    var points = [];
    var i = 0;
    for (var line of lines) {
        if (i < 800) {
            var vals = line.split(',');
            points.push([parseFloat(vals[0]), parseFloat(vals[1])]);
            i++;
        }else{
            postMessage(points);
            i=0;
            points=[];
        }
    }
    self.close();
}