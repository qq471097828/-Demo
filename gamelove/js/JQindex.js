/**
 * Created by hasee on 2017/1/4.
 */
$(function () {
    var scrollH = parseInt($("#bg").css("height"));
    var width = $("#bg").width();
    var count = 0
    $("#bg>ul>li").height(scrollH);
    $("#bg .li-bg").height(scrollH);
    var changeBack = {
        "width": width + 200,
        "height": scrollH + 100,
        "marginLeft": -100,
        "marginTop": -50,
    }
    var normalBack = {
        "width": width,
        "height": scrollH,
        "marginLeft": 0,
        "marginTop": 0,
    }
    //第一个li下的tartBtn的按钮
    //鼠标enter事件
    $("#voideStartBtn").mouseenter(enterHandel);
    function enterHandel() {
        var json = {
            "width": "68",
            "height": "68",
            "marginLeft": "-9"
        }
        $(this).stop().animate(json, 200);
    }

    //鼠标leave事件
    $("#voideStartBtn").mouseleave(leaveHandel);
    function leaveHandel() {
        var json = {
            "width": "50",
            "height": "50",
            "marginLeft": "0"
        }
        $(this).stop().animate(json, 200);
    }

    //鼠标click事件
    //显示视频---点击事件
    $("#voideStartBtn").click(function () {
        $("#voideShow").hide();
        $("#voideHide").show();
        $("#closeVoideBtn").animate({"opacity": .6}, 500);
        $("#nav").animate({"opacity": 0}, 500);
        $("#btn").animate({"opacity": 0}, 500);
        $("#border").animate({"opacity": 0}, 500);
        //voide === handel
        $("#hideVideo")[0].currentTime = 0;
        $("#hideVideo")[0].play();
        //移除事件
        $(this).unbind("mouseenter");
        $(this).unbind("mouseleave");
        //动画
        $(this).animate({"width": 0, "height": 0, "marginLeft": 25, "marginTop": 25}, 500);
        $("#mask").animate({"height": 0}, 500);
        $("#txtImg>img").animate({"opacity": 0}, 500, function () {
            $("#txtImg").animate({"opacity": 0});
        });
    });
    //为隐藏视频 ———— 关闭播放按钮设置事件
    $("#closeVoideBtn").click(function () {
        $("#voideShow").show();
        $("#voideHide").hide();
        $(this).animate({"opacity": 0}, 300);
        $("#nav").animate({"opacity": .5}, 500);
        $("#btn").animate({"opacity": .5}, 500);
        $("#border").animate({"opacity": .5}, 500);
        //显示视频从头播放
        $("#showVideo")[0].currentTime = 0;
        $("#showVideo")[0].play();
        $("#hideVideo")[0].pause();
        //voideStartBtn绑定时间
        $("#voideStartBtn").mouseenter(enterHandel);
        $("#voideStartBtn").mouseleave(leaveHandel);
        //动画事件
        $("#mask").animate({"height": scrollH}, 2500, function () {
            $("#voideStartBtn").animate({"width": 50, "height": 50, "marginLeft": 0, "marginTop": 0}, 500);
        });
        $("#txtImg").animate({"opacity": 1}, 0, function () {
            $("#txtImg>img:first").animate({"opacity": 1}, 500, function () {
                $(this).next("img").animate({"opacity": 1}, 500, arguments.callee)
            });
        });
    });
    //图片数组
    var imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    //遍历li添加图片-----出去第一个li
    for (var i = 1; i <= imgArr.length; i++) {
        $(".li-bg:eq(" + i + ")").css({
            "backgroundSize": "cover",
            "backgroundImage": "url(img/bg" + imgArr[i - 1] + ")",
            "height": $("#bg").css("height"),
        });
    }
    //动态添加ol里的li，并为li设置事件
    for (var j = 0; j < $("#bg>ul>li").length; j++) {
        $("<li></li>").appendTo($("#bdBox>ol"));
    }
    // ol li =============click
    $("#bdBox>ol>li:eq(0)").css({"backgroundColor": "red"});
    $("#bdBox>ol>li").click(function () {
        $("#share").css("opacity", 0);
        //对象不处于动画状态点击才有效
        if (!$("#bg>ul").is(":animated")) {
            $(this).css({"backgroundColor": "red"}).siblings("li").css({"backgroundColor": ""});
            count = $(this).index();
            $("#bg>ul").animate({"marginTop": -(count * scrollH)}, 1000, function () {
                if (count == 5) {
                    $("#share").animate({"opacity": 1}, 500);
                }
            });
            if (count == 0 && $("#voideHide").css("display") == "block") {
                $("#nav").animate({"opacity": 0}, 1000);
                $("#btn").animate({"opacity": 0}, 1000);
                $("#border").animate({"opacity": 0}, 1000);
            } else {
                $("#nav").animate({"opacity": .5}, 1000);
                $("#btn").animate({"opacity": .5}, 1000);
                $("#border").animate({"opacity": 0.5}, 1000);
            }

            for (var i = 1; i < $(".li-bg").length;i++) {
                if (i == count) {
                    $(".li-bg:eq(" + i + ")").stop().animate(changeBack, 3000);
                }else {
                    $(".li-bg:eq("+i+")").stop().animate(normalBack,1000);
                }
            }
        }

        //img文字的显示
        $("#bg>ul").find(".li-img:eq(" + (count - 1) + ")").animate({"marginTop": -40,"opacity":1}, 1500);
        $("#bg>ul").find(".slogen-img:eq(" + (count - 1) + ")").animate({"opacity":1}, 1000);
        
    });
    //向下的按钮的事件
    $("#btn").click(function () {
        //先判断是否处于动画状态，处于动画状态点击事件不好使；
        if (!$("#bg>ul").is(":animated")) {
            $("#share").css("opacity", 0);
            if (count == $("#bg>ul>li").length - 1) {
                $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000);
                count = 4;
            }
            count++;
            $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000, function () {
                if (count == 5) {
                    $("#share").animate({"opacity": 1}, 500);
                }
            });
            $("#bdBox>ol>li:eq(" + count + ")").css({"backgroundColor": "red"}).siblings("li").css({"backgroundColor": ""});
            
            
            for (var i = 1; i < $(".li-bg").length;i++) {
                if (i == count) {
                    $(".li-bg:eq(" + i + ")").stop().animate(changeBack, 3000);
                }else {
                    $(".li-bg:eq("+i+")").stop().animate(normalBack,1000);
                }
            }
        }

        //img文字的显示
        $("#bg>ul").find(".li-img:eq(" + (count - 1) + ")").animate({"marginTop": -40,"opacity":1}, 1500);
        $("#bg>ul").find(".slogen-img:eq(" + (count - 1) + ")").animate({"opacity":1}, 1000);

    });
    //JQ的插件支持鼠标滚轮事件
    $("body").mousewheel(function (evt, delta) {
        //mousewheel事件的处理函数有一点小小的变化，它除了第一个参数event 外，还接收到第二个参数delta。
        //通过参数delta可以获取鼠标滚轮的方向和速度。
        //如果delta的值是负的即-1，那么滚轮就是向下滚动，正的1就是向上。
        if (delta == -1) {//向下滚动
            if (!$("#bg>ul").is(":animated")) {
                //让边框啥的显示

                if ($("#voideHide").css("display") == "block") {
                    $("#nav").animate({"opacity": .5}, 1000);
                    $("#btn").animate({"opacity": .5}, 1000);
                    $("#border").animate({"opacity": .5}, 1000);
                }

                //开始操作
                if (count == $("#bg>ul>li").length - 1) {
                    $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000);
                    count = 4;
                }
                count++;
                $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000, function () {
                    if (count == 5) {
                        $("#share").animate({"opacity": 1}, 500);
                    }
                    $("#share").css({"opacity": 0});

                });
                $("#bdBox>ol>li:eq(" + count + ")").css({"backgroundColor": "red"}).siblings("li").css({"backgroundColor": ""});
                //背景拉近的效果

            }
        }
        if (delta == 1) {//向上滚动
            if (!$("#bg>ul").is(":animated")) {
                $("#share").css({"opacity": 0});
                if (count == 1 && $("#voideHide").css("display") == "block") {
                    $("#nav").animate({"opacity": 0}, 500);
                    $("#btn").animate({"opacity": 0}, 500);
                    $("#border").animate({"opacity": 0}, 500);
                }
                if (count == 0) {
                    $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000);
                    count = 1;
                }
                count--;
                $("#bg>ul").stop().animate({"marginTop": -(count * scrollH)}, 1000);
                $("#bdBox>ol>li:eq(" + count + ")").css({"backgroundColor": "red"}).siblings("li").css({"backgroundColor": ""});

            }
        }
        if ($("#bg>ul").is(":animated")) {
            for (var i = 1; i < $(".li-bg").length;i++) {
                if (i == count) {
                    $(".li-bg:eq(" + i + ")").stop().animate(changeBack, 3000);
                }else {
                    $(".li-bg:eq("+i+")").stop().animate(normalBack,1000);
                }
            }
        }

        //img文字的显示
        $("#bg>ul").find(".li-img:eq(" + (count - 1) + ")").animate({"marginTop": -40,"opacity":1}, 1500);
        $("#bg>ul").find(".slogen-img:eq(" + (count - 1) + ")").animate({"opacity":1}, 1000);
        
        
    });
    // ZCD
    //点击之前的进入事件
    function mouseenterHandel() {
        if (!$(this).hasClass("click-before-mouseenter") || $(this).hasClass("click-before-mouseleave")) {
            $(this).addClass("click-before-mouseenter").removeClass("click-before-mouseleave");
        }
    }

    //点击离开的进入事件
    function mouseleaveHandel() {
        if ($(this).hasClass("click-before-mouseenter") || !$(this).hasClass("click-before-mouseleave")) {
            $(this).removeClass("click-before-mouseenter").addClass("click-before-mouseleave");
        }
    }

    //绑定事件
    $("#navBar").mouseenter(mouseenterHandel).mouseleave(mouseleaveHandel).click(function () {
        $(this).removeClass("click-before-mouseenter click-before-mouseleave")
        if (!$(this).hasClass("click")) {
            $(this).unbind("mouseenter").unbind("mouseleave");
            $(this).mouseenter(function () {
                $(this).addClass("click-after-mouseenter");
            }).mouseleave(function () {
                $(this).removeClass("click-after-mouseenter");
            }).addClass("click click-after-mouseenter");
            $("#navList").stop().animate({"width": 0}, 500);
        } else {
            $(this).unbind("mouseenter").unbind("mouseleave").removeClass("click click-after-mouseenter click-after-mouseenter").mouseenter(mouseenterHandel).mouseleave(mouseleaveHandel).addClass("click-before-mouseenter");
            $("#navList").stop().animate({"width": "90%"}, 500);
        }
    });

// 分享感言部分
    //鼠标进入和离开的事件
    for (var w = 0; w < $("#share a").length; w++) {
        $("#share a:eq(" + w + ")").css("backgroundPosition", -w * 29 + "px 0px");
    }
    $("#share>span").mouseenter(function () {
        var index = $(this).index();
        $("#share a:eq(" + (index - 1) + ")").css("backgroundPosition", -(index - 1) * 29 + "px 24px");
    }).mouseleave(function () {
        var index = $(this).index();
        $("#share a:eq(" + (index - 1) + ")").css("backgroundPosition", -(index - 1) * 29 + "px 0px");
    });
});

