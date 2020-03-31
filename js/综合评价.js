var title = new Array();
var data = {};
//权重
var weight = {};
var year = "2010";

$(function () {
    var hei = window.innerHeight;
    $('#container').css('height', String(hei * 0.9) + 'px');
    $('#foot').css('height', String(hei * 0.1) + 'px');
    myChart = echarts.init($('#map')[0]);
    mapIn();
    $('input').on('input', function (e) {
        // var val = e.delegateTarget.value;
        // $(e.delegateTarget).next()[0].innerHTML = val;
        var inputs = $('input');
        var allVal = 0;
        $.each(inputs, function (index) {
            allVal += parseInt(inputs[index].value);
        });
        $.each(inputs, function (index) {
            weight[title[index + 2]] = parseInt(inputs[index].value) / allVal;
        });
        var cla = $(this).parent()[0].className;
        cla = cla.split(' ')[1];
        switch (cla) {
            case 'economics':
                $(this).css('background', 'linear-gradient(to right, #60acfc, #ebeff4 ' + String(parseInt(this.value) / parseInt(this.max) * 100) + '%, #ebeff4)');
                break;
            case 'sociology':
                $(this).css('background', 'linear-gradient(to right, #ff7c7c, #ebeff4 ' + String(parseInt(this.value) / parseInt(this.max) * 100) + '%, #ebeff4)');
                break;
            case 'environmental':
                $(this).css('background', 'linear-gradient(to right, #5bc49f, #ebeff4 ' + String(parseInt(this.value) / parseInt(this.max) * 100) + '%, #ebeff4)');
                break;
            default:
                $(this).css('background', 'linear-gradient(to right, #feb64d, #ebeff4 ' + String(parseInt(this.value) / parseInt(this.max) * 100) + '%, #ebeff4)');
        }
        calAndShow();
    });
    $('.time-horizontal li').bind("click", function () {
        year = this.innerText;
        $('.time-horizontal li').removeClass('select');
        $(this).addClass('select');
        calAndShow();
    });
});

function mapIn() {
    $.get('../map/json/province/csj.json', function (csj) {
        echarts.registerMap('csj', csj);
        setMap();
        readCsv();
    });
}

function setMap() {
    option = {
        title: {
            text: '城市活力计算',
            left: '10%',
            top: 20,
            textStyle: {
                color: 'white',
                fontSize: 30,
                fontStyle: 'oblique'
            },
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                if (isNaN(params.value)) {
                    return '暂无数据'
                } else {
                    return (params.value).toFixed(2);
                }
            }
        },
        visualMap: {
            left: 'right',
            min: 0,
            max: 24,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text: ['High', 'Low'],           // 文本，默认为数值文本
            calculable: true,
            textStyle: {
                color: 'white'
            },
        },
        series: [
            {
                type: 'map',
                roam: true,
                map: 'csj',
                itemStyle: {
                    emphasis: { label: { show: true } }
                },
                textFixed: {
                    Alaska: [20, -20]
                },
                data: []
            }
        ]
    };

    myChart.setOption(option);
}

function readCsv() {
    $.get('../data/专题地图数据-已插值.csv', function (csv) {
        var lines = csv.split('\n');
        title = lines[0].split(',');
        for (var i = 2; i < title.length; i++) {
            weight[title[i]] = 1 / (title.length - 2);
        }
        lines.shift();
        for (var line of lines) {
            var vals = line.split(',');
            if (!data.hasOwnProperty(vals[0])) {
                data[vals[0]] = {};
                data[vals[0]]['城市数'] = 0;
                data[vals[0]]['已计算分数'] = false;
                data[vals[0]]['城市'] = new Array();
            }
            data[vals[0]]['城市数']++;
            data[vals[0]]['城市'].push({ name: vals[1] });
            for (var i = 2; i < vals.length; i++) {
                data[vals[0]]['城市'][data[vals[0]]['城市数'] - 1][title[i]] = { val: parseFloat(vals[i]), mark: -1 };
            }
        }
        calAndShow();
    });
}

function calMark(year) {
    var cityList = data[year]['城市'];
    for (var i = 2; i < title.length; i++) {
        cityList.sort(function (a, b) {
            return a[title[i]].val - b[title[i]].val;
        });
        for (var city in cityList) {
            cityList[city][title[i]].mark = parseInt(city) + 1;
        }
    }
    data[year]['已计算分数'] = true;
}

function makeMapData(year) {
    var mapData = new Array();
    var cityList = data[year]['城市'];
    for (var city of cityList) {
        var totalMark = 0;
        for (var i = 2; i < title.length; i++) {
            totalMark += city[title[i]].mark * weight[title[i]];
        }
        mapData.push({ name: city.name, value: totalMark });
    }
    return mapData;
}

function calAndShow() {
    if (data[year]['已计算分数'] == false) {
        calMark(year);
    }
    var mapData = makeMapData(year);
    var max=mapData[0]['value'];
    var min=mapData[0]['value'];
    for(var item of mapData){
        if(item['value']>max){
            max=item['value'];
        }
        if(item['value']<min){
            min=item['value'];
        }
    }
    myChart.setOption({
        visualMap:{
            min:min,
            max:max
        },
        series: {
            data: mapData
        }
    });
}