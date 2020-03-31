var provinceList = ['江苏省', '上海市', '浙江省'];
var weiboPointsUrls = ['../data/jiangsu_point.csv', '../data/shanghai_point.csv', '../data/zhejiang_point.csv']
var busLineUrls = ['../data/江苏_new.csv', '../data/上海_new.csv', '../data/浙江_new.csv']
var num = 1;
var lastNumTraditional = -1;
var lastNumMorden = -1;
var chartFontSize = 16;
var legendWidth = 30;
var legendHeight = 20;
var mouseX = 0;
var mouseY = 0;
var timeHorizontal = 1;
var int = null;

//载入完成设置
$(function () {
    //页面设置
    var wid = window.innerWidth;

    var imgHeight = $('#traditionalHead .img:nth-of-type(1)').height();
    var textHeight = $('#traditionalHead .text').height();
    var maxHei = Math.max.apply(null, [imgHeight, textHeight]);
    $('#traditionalHead').css('height', String(maxHei + 25) + 'px');
    $('#mordenFoot').css('height', String(maxHei + 25) + 'px');

    $('#tables').css('height', String(wid) + 'px');

    $('#maps').css('height', String(wid / 3 / 0.75) + 'px');
    $('h1')[0].innerHTML = provinceList[num - 1] + '传统城市活力';
    $('h1')[1].innerHTML = provinceList[num - 1] + '新型城市活力';
    chartFontSize *= wid / 1920;
    legendWidth *= wid / 1920;
    legendHeight *= wid / 1920;
    //图形绘制
    drawCanvas();
    //echarts地图初始化
    echartsStart();
    //函数绑定
    $('#tables').mouseover(function () {
        tablesOnMouseOver();
    });
    $('#maps').mouseover(function () {
        mapsOnMouseOver();
    });
    $('.time-horizontal li').bind("click", function () {
        changeNightPic(this);
    });
    $('#nightPic').mouseover(function () {
        if (int != null) {
            clearInterval(int);
            int = null;
        }
    });
    $('#nightPic').mouseout(function () {
        if (int == null) {
            int = setInterval(function () {
                $('.time-horizontal li:nth-of-type(' + String(timeHorizontal) + ')').trigger("click");
            }, 1500);
        }
    });

    int = setInterval(function () {
        $('.time-horizontal li:nth-of-type(' + String(timeHorizontal) + ')').trigger("click");
    }, 1500);
});

//resize响应
$(window).resize(function () {
    drawCanvas();
});

//鼠标位置
document.onmousemove = function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    mouseX = e.pageX || e.clientX + scrollX;
    mouseY = e.pageY || e.clientY + scrollY;
}

document.onmousewheel = function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    mouseX = e.pageX || e.clientX + scrollX;
    mouseY = e.pageY || e.clientY + scrollY;
}

//键盘响应
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var traditionalHeadHight = $('#traditionalHead').height();
    var tablesHeight = $('#tables').height();
    var modernFootHeight = $('#mordenFoot').height();

    if (e && e.keyCode == 37) {
        transforme(-1);
        if (mouseY > traditionalHeadHight && mouseY < (traditionalHeadHight + tablesHeight)) {
            tablesOnMouseOver();
        }
        else if (mouseY > (traditionalHeadHight + tablesHeight + modernFootHeight)) {
            mapsOnMouseOver();
        }
    }
    if (e && e.keyCode == 39) {
        transforme(1);
        if (mouseY > traditionalHeadHight && mouseY < (traditionalHeadHight + tablesHeight)) {
            tablesOnMouseOver();
        }
        else if (mouseY > (traditionalHeadHight + tablesHeight + modernFootHeight)) {
            mapsOnMouseOver();
        }
    }
};

//动画效果
function transforme(change) {
    var current = num;
    if (num == 3 && change == 1) {
        num = 1;
    } else {
        if (num == 1 && change == -1) {
            num = 3;
        } else {
            num += change;
        }
    }
    $('h1')[0].innerHTML = provinceList[num - 1] + '传统城市活力';
    $('h1')[1].innerHTML = provinceList[num - 1] + '新型城市活力';
    var traditionalHeadHight = $('#traditionalHead').height();
    var tablesHeight = $('#tables').height();
    var modernFootHeight = $('#mordenFoot').height();
    if (mouseY > traditionalHeadHight && mouseY < (traditionalHeadHight + tablesHeight)) {
        tablesOnMouseOver();
    }
    else if (mouseY > (traditionalHeadHight + tablesHeight + modernFootHeight)) {
        mapsOnMouseOver();
    }
}

//设置canvas大小以及绘制
function drawCanvas() {
    $('#traditionalHead canvas')[0].width = $('#traditionalHead')[0].offsetWidth;
    $('#traditionalHead canvas')[0].height = $('#traditionalHead')[0].offsetHeight;
    $('#mordenFoot canvas')[0].width = $('#mordenFoot')[0].offsetWidth;
    $('#mordenFoot canvas')[0].height = $('#mordenFoot')[0].offsetHeight;
    var canva1 = $('#traditionalHead canvas')[0];
    var canva2 = $('#mordenFoot canvas')[0];
    var width = canva1.width;
    var height = canva1.height;
    var imgHeight = $('#traditionalHead .img:nth-of-type(1)').height();
    var context1 = canva1.getContext("2d");
    var context2 = canva2.getContext("2d");
    context1.fontSize = '15px';
    context1.fillStyle = 'white';
    context1.fillText('*数据经过归一化处理', 0, (imgHeight + 10));
    context1.fillText('公式为:x=1/2+1/2((x-min)/(max-min))', 0, (imgHeight + 25));

    context1.lineWidth = 2;
    context1.strokeStyle = '#ffffff';
    context1.moveTo(0, imgHeight - 2);
    context1.lineTo((width * 0.26), imgHeight - 2);
    context1.lineTo(width * 0.295, height);
    context1.lineTo(width * 0.705, height);
    context1.lineTo(width * 0.74, imgHeight - 2);
    context1.lineTo(width, imgHeight - 2);
    context1.stroke();

    context2.lineWidth = 2;
    context2.strokeStyle = '#ffffff';
    context2.moveTo(0, imgHeight - 2);
    context2.lineTo((width * 0.26), imgHeight - 2);
    context2.lineTo(width * 0.295, height);
    context2.lineTo(width * 0.705, height);
    context2.lineTo(width * 0.74, imgHeight - 2);
    context2.lineTo(width, imgHeight - 2);
    context2.stroke();
}

//更换夜光图片
function changeNightPic(obj) {
    $('.time-horizontal li').removeClass('select');
    timeHorizontal = $('.time-horizontal li').index(obj) + 1;
    if (timeHorizontal < 5) {
        timeHorizontal++;
    } else {
        timeHorizontal = 1;
    }
    $(obj).addClass('select');
    var year = $(obj).text();
    var path = '../data/nightpic/' + year + '.png';
    $('#nightPic .text')[0].innerHTML = String(year) + '年夜光数据图'
    $('#nightPic img').attr('src', path);
}

//微博数据加载
function setWeiboData(url) {
    weibo.clear();
    weibo.setOption(weiboOption);
    $.get(url, function (data, status) {
        var worker = new Worker('../js/change.js');
        worker.postMessage(data);
        worker.onmessage = function (event) {
            weibo.appendData({
                seriesIndex: 0,
                data: event.data
            });
        }
    });
}

//公交路线数据加载
function setBusData(url) {
    road.clear();
    road.setOption(roadOption);
    $.get(url, function (data, status) {
        var worker = new Worker('../js/changeBus.js');
        worker.postMessage(data);
        worker.onmessage = function (event) {
            road.setOption({
                series: [{
                    data: event.data
                }]
            });
        }
    });
}

//读取csv文件设置图表参数
function setChartOption(echart, option, url) {
    $.get(url, function (data, status) {
        var lines = data.split('\n');
        var years = lines[0].split(',');
        years = years.slice(1, years.length);
        var series = [];
        for (var i = 1; i < lines.length; i++) {
            var linedata = lines[i].split(',');
            linedata = linedata.slice(1, linedata.length);
            linedata = linedata.map(function (val) { return parseFloat(val) });
            series.push({ data: linedata });
        }
        echart.setOption({
            xAxis: [
                {
                    data: years
                }
            ],
            series: series
        });
    }).fail(function () {
        var preOption = echart.getOption();
        echart.setOption(option);
        echart.setOption({
            title: {
                text: preOption.title[0].text + '暂无数据'
            }
        });
    });
}

function tablesOnMouseOver() {
    if (lastNumTraditional == num) {
        return;
    } else {
        lastNumTraditional = num;
    }
    var environmentalFilePath = '../data/' + provinceList[num - 1] + '环境活力.csv';
    var economicsFilePath = '../data/' + provinceList[num - 1] + '经济活力.csv';
    var sociologyFilePath = '../data/' + provinceList[num - 1] + '社会活力.csv';
    var cultureFilePath = '../data/' + provinceList[num - 1] + '文化活力.csv';
    environmental.setOption({
        title: {
            text: provinceList[num - 1] + '环境活力'
        }
    });
    economics.setOption({
        title: {
            text: provinceList[num - 1] + '经济活力'
        }
    });
    sociology.setOption({
        title: {
            text: provinceList[num - 1] + '社会活力'
        }
    });
    culture.setOption({
        title: {
            text: provinceList[num - 1] + '文化活力'
        }
    });
    setChartOption(environmental, environmentalOption, environmentalFilePath);
    setChartOption(economics, economicsOption, economicsFilePath);
    setChartOption(sociology, sociologyOption, sociologyFilePath);
    setChartOption(culture, cultureOption, cultureFilePath);
}

function mapsOnMouseOver() {
    if (lastNumMorden == num) {
        return;
    } else {
        lastNumMorden = num;
    }
    weiboOption.title.text = provinceList[num - 1] + '微博签到数据';
    weiboOption.geo.map = provinceList[num - 1].slice(0, provinceList[num - 1].length - 1);
    setWeiboData(weiboPointsUrls[num - 1]);
    roadOption.title.text = provinceList[num - 1] + '公交路线数据';
    roadOption.geo.map = provinceList[num - 1].slice(0, provinceList[num - 1].length - 1);
    setBusData(busLineUrls[num - 1]);
}

function echartsStart() {
    weibo = echarts.init($('#maps .map:nth-of-type(2)')[0]);
    road = echarts.init($('#maps .map:nth-of-type(3)')[0]);
    environmental = echarts.init($('#tables .in:nth-of-type(1) .table')[0]);
    economics = echarts.init($('#tables .in:nth-of-type(2) .table')[0]);
    sociology = echarts.init($('#tables .in:nth-of-type(3) .table')[0]);
    culture = echarts.init($('#tables .in:nth-of-type(4) .table')[0]);
    weiboOption = {
        backgroundColor: 'transparent',
        title: {
            text: '江苏',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 25
            },
            top: 50
        },
        geo: {
            map: '江苏',
            roam: false,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#5fbbe6'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: '弱',
            type: 'scatterGL',
            progressive: 10000,
            coordinateSystem: 'geo',
            symbolSize: 1.2,
            zoomScale: 0.002,
            blendMode: 'lighter',
            large: true,
            itemStyle: {
                color: 'rgb(20, 15, 2)'
            },
            postEffect: {
                enable: true
            },
            silent: true,
            dimensions: ['lng', 'lat'],
            data: []
        }]
    };

    roadOption = {
        progressive: 20000,
        backgroundColor: 'transparent',
        title: {
            text: '江苏',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 25
            },
            top: 50
        },
        geo: {
            map: '江苏',
            roam: false,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#5fbbe6'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'geo',
            blendMode: 'lighter',
            dimensions: ['value'],
            data: [],
            polyline: true,
            large: true,
            lineStyle: {
                color: '#66FF33',
                width: 0.5,
                opacity: 0.25
            }
        }]
    };

    environmentalOption = {
        title: {
            text: '环境活力',
            left: 'center',
            textStyle: {
                color: 'white'
            },
            top: 20
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            data: ['全年用电量', '公路里程', '公共绿地面积', '建成区绿地面积', '城镇生活污水处理率'],
            top: 'bottom',
            itemWidth: legendWidth,
            itemHeight: legendHeight,
            textStyle: {
                color: 'white',
                fontSize: chartFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                }
            }
        ],
        series: [
            {
                name: '全年用电量',
                type: 'bar',
                barGap: 0,
                data: []
            },
            {
                name: '公路里程',
                type: 'bar',
                data: []
            },
            {
                name: '公共绿地面积',
                type: 'bar',
                data: []
            },
            {
                name: '建成区绿地面积',
                type: 'bar',
                data: []
            },
            {
                name: '城镇生活污水处理率',
                type: 'bar',
                data: []
            }
        ]
    };

    economicsOption = {
        title: {
            text: '经济活力',
            left: 'center',
            textStyle: {
                color: 'white'
            },
            top: 20
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            data: ['居民人均纯收入', '地方一般公共预算收入', '第三产业生产总值', '工业企业单位数', '实际外商直接投资', '进出口额'],
            top: 'bottom',
            itemWidth: legendWidth,
            itemHeight: legendHeight,
            textStyle: {
                color: 'white',
                fontSize: chartFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                }
            }
        ],
        series: [
            {
                name: '居民人均纯收入',
                type: 'line',
                barGap: 0,
                data: []
            },
            {
                name: '地方一般公共预算收入',
                type: 'line',
                data: []
            },
            {
                name: '第三产业生产总值',
                type: 'line',
                data: []
            },
            {
                name: '工业企业单位数',
                type: 'line',
                data: []
            },
            {
                name: '实际外商直接投资',
                type: 'line',
                data: []
            },
            {
                name: '进出口额',
                type: 'line',
                data: []
            }
        ]
    };

    sociologyOption = {
        title: {
            text: '社会活力',
            left: 'center',
            textStyle: {
                color: 'white'
            },
            top: 20
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            data: ['社会固定资产投资', '医生数', '人均公共预算支出', '从业人员', '个人汽车拥有量', '社会保障和就业支出', '全年专利申请量', '移动电话用户'],
            top: 'bottom',
            itemWidth: legendWidth,
            itemHeight: legendHeight,
            textStyle: {
                color: 'white',
                fontSize: chartFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                }
            }
        ],
        series: [
            {
                name: '社会固定资产投资',
                type: 'effectScatter',
                barGap: 0,
                data: []
            },
            {
                name: '医生数',
                type: 'effectScatter',
                data: []
            },
            {
                name: '人均公共预算支出',
                type: 'effectScatter',
                data: []
            },
            {
                name: '从业人员',
                type: 'effectScatter',
                data: []
            },
            {
                name: '个人汽车拥有量',
                type: 'effectScatter',
                data: []
            },
            {
                name: '社会保障和就业支出',
                type: 'effectScatter',
                data: []
            },
            {
                name: '全年专利申请量',
                type: 'effectScatter',
                data: []
            },
            {
                name: '移动电话用户',
                type: 'effectScatter',
                data: []
            }
        ]
    };

    cultureOption = {
        title: {
            text: '文化活力',
            left: 'center',
            textStyle: {
                color: 'white'
            },
            top: 20
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            data: ['公共图书馆藏图书量', '在校学生数', '教育支出', '剧场、影剧院数'],
            top: 'bottom',
            itemWidth: legendWidth,
            itemHeight: legendHeight,
            textStyle: {
                color: 'white',
                fontSize: chartFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                }
            }
        ],
        series: [
            {
                name: '公共图书馆藏图书量',
                type: 'bar',
                barGap: '-100%',
                data: []
            },
            {
                name: '在校学生数',
                type: 'bar',
                data: []
            },
            {
                name: '教育支出',
                type: 'bar',
                data: []
            },
            {
                name: '剧场、影剧院数',
                type: 'bar',
                data: []
            }
        ]
    };

    weibo.setOption(weiboOption);
    road.setOption(roadOption);
    environmental.setOption(environmentalOption);
    economics.setOption(economicsOption);
    sociology.setOption(sociologyOption);
    culture.setOption(cultureOption);
}