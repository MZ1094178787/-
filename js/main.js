function SpanCSSChange1(ID) {
    $('#' + ID).css({
        'box-shadow': '0 0 2px #fff,0 0 4px #fff,0 0 6px #fff',
        'box-shadow': '0 0 2px #fff,0 0 4px #fff,0 0 6px #fff inset',
        'background': 'linear-gradient(to top, #60acfc, #ebeff4)'
    });
    $('#img' + ID[ID.length - 1]).css({
        'transform': 'translate(0px,0)',
        'filter': 'grayscale(0%)'
    });
}
function SpanCSSChange0(ID) {
    $('#' + ID).css({
        'box-shadow': '',
        'background': ''
    });
    $('#img' + ID[ID.length - 1]).css({
        'transform': 'translate(-1920px,0)',
        'zindex': '-1',
        'filter': 'grayscale(100%)'
    });
}

$(function () {
    bgchange();
    var wid = window.innerWidth;
    var size = (wid / 1920) * 16;
    $('body').css('font-size', size + 'px');
    $('#fullpage').fullpage({
        navigation: true
    });
    var hei = $('.container div').height() / 2;
    $('.container div p').css('margin-top', hei + 'px');
    changePosition();
    $('.section:nth-of-type(3)').one('mouseover', function () {
        setTimeout("echartsIn()", 1500);
    });
})

function bgchange() {
    $('#bg').css({
        'opacity': '0.35',
        'transform': 'scale(1.2)'
    });
}

function changePosition() {
    var hei = $('#introduction .text').height();
    $('#introduction .text').css('margin-top', '-' + String(hei) + 'px');
    hei = $('#background .text').height();
    $('#background .text').css('margin-top', '-' + String(hei) + 'px');
    hei = $('#data .text').height();
    $('#data .text').css('margin-top', '-' + String(hei) + 'px');
    hei = $('#about').height() - $('#about .pageTitle').outerHeight(true) + $('#about hr').outerHeight(true);
    $('#memAndSupport').css('height', String(hei) + 'px');
}

function echartsIn() {
    var chart = echarts.init($('#tree')[0]);
    var data1 = {
        "name": "传统活力数据",
        "children": [
            {
                "name": "经济活力",
                "children": [
                    {
                        "name": "经济活力基础",
                        "children": [
                            { "name": "居民人均可支配收入" },
                            { "name": "地方一般公共预算收入" },
                            { "name": "第三产业生产总值" },
                            { "name": "工业企业单位数" }
                        ]
                    },
                    {
                        "name": "经济活跃程度",
                        "children": [
                            { "name": "实际外商直接投资" },
                            { "name": "进出口总额" }
                        ]
                    }
                ]
            },
            {
                "name": "社会活力",
                "children": [
                    {
                        "name": "社会活力基础",
                        "children": [
                            { "name": "社会固定资产投资" },
                            { "name": "医生数" },
                            { "name": "人均公共预算支出" },
                            { "name": "从业人员" },
                            { "name": "个人汽车拥有量" }
                        ]
                    },
                    {
                        "name": "社会活跃程度",
                        "children": [
                            { "name": "全年专利申请数" },
                            { "name": "社会保障和就业支出" },
                            { "name": "移动电话用户" }
                        ]
                    }
                ]
            },
            {
                "name": "环境活力基础",
                "children": [
                    { "name": "公共绿地面积" },
                    { "name": "全年用电量" },
                    { "name": "公路里程" },
                    { "name": "建成区绿地面积" },
                    { "name": "城镇生活污水处理率" }
                ]
            },
            {
                "name": "文化活力基础",
                "children": [
                    { "name": "公共图书馆图书藏量" },
                    { "name": "在校学生数" },
                    { "name": "教育支出" },
                    { "name": "剧场、影剧院数" }
                ]
            },
        ]
    };
    var data2 = {
        "name": "新型活力数据",
        "children": [
            { "name": "夜光数据" },
            { "name": "微博签到数据" },
            { "name": "公交路线" }
        ]
    };
    var option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        backgroundColor: 'rgb(255,255,255)',
        series: [
            {
                type: 'tree',

                name: 'tree1',

                data: [data1],

                top: '5%',
                left: '10%',
                bottom: '2%',
                right: '60%',

                symbolSize: 10,

                itemStyle: {
                    color: '#fff'
                },

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right'
                    },
                    color: 'rgb(255,255,255)'
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,

                animationDuration: 550,
                animationDurationUpdate: 750

            },
            {
                type: 'tree',
                name: 'tree2',
                data: [data2],

                top: '20%',
                left: '60%',
                bottom: '22%',
                right: '18%',

                symbolSize: 10,

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right'
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,

                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    chart.setOption(option);
}