onmessage = function (event) {
    var data = event.data;
    var lines = data.split('\n');
    var points = [];
    for (var line of lines) {
        var vals = line.split(',');
        var num=vals[1];
        var pois=vals[2].split(';');
        points.push(parseInt(num));
        for (var poi of pois){
            points.push(parseFloat(poi));
        }
    }
    postMessage(points);
    self.close();
}