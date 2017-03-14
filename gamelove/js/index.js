/**
 * Created by hasee on 2017/1/4.
 */
window.onload = function () {
    //平滑的动画
    function remove(ele, target, fn) {
        var current = ele.offsetTop;
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var flag = true;
            if (flag) {
                step = Math.abs(current - target) / 20;
                step = ele.offsetTop < target ? step : -step;
                if (Math.abs(ele.offsetTop - target) > Math.abs(step)) {
                    ele.style.marginTop = ele.offsetTop + step + "px";
                    flag = false;
                } else {
                    ele.style.marginTop = target + "px";
                    flag = true;
                }
            }
            if (flag) {
                if (fn) {
                    fn();
                }
                clearInterval(ele.timer);
            }
        }, 20)
    }

    //获取对象的设置的样式的值
    function getAttrValue(element, attr) {
        if (element.currentStyle) {
            return element.currentStyle[attr];
        } else {
            return window.getComputedStyle(element, null)[attr];
        }
        // return element.currentStyle ? element.currentStyle[attr] : window.getComputedStyle(element, null)[attr];
    }

    //缓动的动画
    function animate(element, json, fn) {
        clearInterval(element.timeId);
        element.timeId = setInterval(function () {
            var flag = true;//假设都达到了目标
            for (var attr in json) {
                if (attr == "opacity") {//判断属性是不是opacity
                    var current = getAttrValue(element, attr) * 1000;
                    //每次移动多少步
                    var target = json[attr] * 1000;//直接赋值给一个变量,后面的代码都不用改
                    var step = (target - current) / 10;//(目标-当前)/10
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current = current + step;
                    element.style[attr] = current / 1000;
                } else if (attr == "zIndex") {//判断属性是不是zIndex
                    element.style[attr] = json[attr];
                } else {//普通的属性

                    //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
                    var current = parseInt(getAttrValue(element, attr)) || 0;
                    //每次移动多少步
                    var target = json[attr];//直接赋值给一个变量,后面的代码都不用改
                    var step = (target - current) / 50;//(目标-当前)/10
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current = current + step;
                    element.style[attr] = current + "px";
                }
                if (current != target) {
                    flag = false;//如果没到目标结果就为false
                }
            }
            if (flag) {//结果为true
                clearInterval(element.timeId);
                if (fn) {//如果用户传入了回调的函数
                    fn(); //就直接的调用,
                }
            }
        }, 10);
    }

    //封装获取ID
    function my$(id) {
        return document.getElementById(id);
    }

    var ulObj = my$("bg").children[0];
    var firstLi = ulObj.children[0];
    var lis = my$("bg").children[0].children;
    var scrollH = my$("bg").offsetHeight;
    var flag = true;
    var num = 0;   //btn --- num
    var btn = my$("btn");
    var voideStartBtn = my$("voideStartBtn");
    var divShowVideo = my$("voideShow");
    var divHideVideo = my$("voideHide");
    var showVoide = my$("showVideo");
    var hideVoide = my$("hideVideo");
    var mask = my$("mask");
    var txtImg = my$("txtImg");
    var txtImgs = txtImg.children;
    var closeVoideBtn = my$("closeVoideBtn");
    var nav = my$("nav");
    var border = my$("border");
    var share = my$("share");
    //对ul下的第一个li的操作
    firstLi.style.height = scrollH + "px";
    //第一个li下的tartBtn的按钮
    //鼠标进入事件
    voideStartBtn.onmouseover = mouseoverHandel;
    function mouseoverHandel() {
        animate(voideStartBtn, {
            "width": 68,
            "height": 68,
            "marginLeft": -10,
        });
    }

    //鼠标移除事件
    voideStartBtn.onmouseout = mouseoutHandel;
    function mouseoutHandel() {
        animate(voideStartBtn, {
            "width": 50,
            "height": 50,
            "marginLeft": -0,
        });
    }

    //显示视频---点击事件
    voideStartBtn.onclick = function () {
        divShowVideo.style.display = 'none';
        animate(closeVoideBtn, {"opacity": 0.6});
        animate(nav, {"opacity": 0});
        animate(btn, {"opacity": 0});
        animate(border, {"opacity": 0});
        divHideVideo.style.display = 'block';

        //隐藏从头视频播放
        hideVoide.currentTime = 0;
        hideVoide.play();
        //移除事件
        this.onmouseout = null;
        this.onmouseout = null;
        animate(voideStartBtn, {
            "height": 0,
            "width": 0,
        });
        animate(mask, {
            "height": 0
        });
        animate(txtImg, {
            "opacity": 0,
        }, function () {
            animate(txtImgs[0], {
                "opacity": 0
            }, function () {
                animate(txtImgs[1], {
                    "opacity": 0
                }, function () {
                    animate(txtImgs[2], {
                        "opacity": 0
                    }, function () {
                        animate(txtImgs[3], {
                            "opacity": 0
                        }, function () {
                            animate(txtImgs[4], {
                                "opacity": 0
                            });
                        });
                    });
                });
            });
        });
    };


    //为隐藏视频 ———— 关闭播放按钮设置事件
    closeVoideBtn.onclick = function () {
        divShowVideo.style.display = 'block';
        divHideVideo.style.display = 'none';
        animate(closeVoideBtn, {"opacity": 0});
        animate(nav, {"opacity": 1});
        animate(btn, {"opacity": 1});
        animate(border, {"opacity": 0.2});

        //显示视频从头播放
        showVoide.currentTime = 0;
        showVoide.play();
        hideVoide.pause();
        //show  voideStartBtn

        //绑定时间
        voideStartBtn.onmouseover = mouseoverHandel;
        voideStartBtn.onmouseout = mouseoutHandel;
        //动画事件

        animate(mask, {
            "height": scrollH
        });
        animate(txtImg, {
            "opacity": 1,
        }, function () {
            animate(txtImgs[0], {
                "opacity": 1
            }, function () {
                animate(txtImgs[1], {
                    "opacity": 1
                }, function () {
                    animate(txtImgs[2], {
                        "opacity": 1
                    }, function () {
                        animate(txtImgs[3], {
                            "opacity": 1
                        }, function () {
                            animate(txtImgs[4], {
                                "opacity": 1
                            },function () {
                                animate(voideStartBtn, {
                                    "height": 50,
                                    "width": 50
                                });
                            });
                        });
                    });
                });
            });
        });

    };
    //图片数组
    var imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    //遍历li添加图片出去第一个li
    for (var i = 1; i <= imgArr.length; i++) {
        lis[i].style.height = my$("bg").offsetHeight + 'px';
        lis[i].style.backgroundSize = "cover";
        lis[i].style.backgroundImage = "url(img/bg" + imgArr[i - 1] + ")";
    }
    //动态添加ol里的li，并为li设置事件
    var olObj = my$("bdBox").children[0];
    for (var j = 0; j < lis.length; j++) {
        var liObj = document.createElement("li");
        liObj.setAttribute('index', j + "");
        olObj.appendChild(liObj);

    }
    var olLi = olObj.children;
    for (var n = 0; n < olLi.length; n++) {
        olLi[0].style.backgroundColor = "red";
        olLi[n].onclick = function () {
            for (var i = 0; i < olLi.length; i++) {
                olLi[i].style.backgroundColor = ""
            }
            this.style.backgroundColor = "red";
            num = this.getAttribute("index");
            remove(ulObj, -num * scrollH, function () {
                if (num == 5) {
                    setTimeout(function () {
                        animate(share, {
                            "opacity": 1,
                        });
                    }, 100)

                }
            })

        };
    }
    btn.onclick = function () {
        num++;
        if (num >= lis.length) {
            num = 0;
        }
        remove(ulObj, -num * scrollH);
        for (var i = 0; i < olLi.length; i++) {
            olLi[i].style.backgroundColor = "";
        }
        olLi[num].style.backgroundColor = 'red';
    };

    //百度的 鼠标滚轮事件，利用了事件对象来判断上下滚动
    var scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                // alert("滑轮向上滚动");
                if (flag) {
                    flag = false;
                    num--;
                    console.log(num);
                    if (num == -1) {
                        num = 0;
                    }
                    if (num == 0 && divHideVideo.style.display == "block") {
                        nav.style.opacity = 0;
                        border.style.opacity = 0;
                        btn.style.opacity = 0;
                    }
                    remove(ulObj, -num * scrollH, function () {
                        flag = true;
                    });
                    for (var i = 0; i < olLi.length; i++) {
                        olLi[i].style.backgroundColor = "";
                    }
                    olLi[num].style.backgroundColor = "red";

                }

            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时

                animate(closeVoideBtn, {"opacity": 1});
                animate(nav, {"opacity": 1});
                animate(btn, {"opacity": 1});
                animate(border, {"opacity": 0.2});
                if (flag) {
                    flag = false;
                    num++;
                    if (num == lis.length) {
                        num = lis.length - 1;
                    }
                    remove(ulObj, -num * scrollH, function () {
                        flag = true;
                        if (num == 5) {
                            animate(share, {
                                "opacity": 1,
                            });
                        } else {
                            animate(share, {
                                "opacity": 0,
                            });
                        }
                    });
                    for (var i = 0; i < olLi.length; i++) {
                        olLi[i].style.backgroundColor = "";
                    }
                    olLi[num].style.backgroundColor = "red";

                }

            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail < 0) { //当滑轮向上滚动时
                if (flag) {
                    flag = false;
                    num--;
                    console.log(num);
                    if (num == -1) {
                        num = 0;
                    }
                    if (num == 0 && divHideVideo.style.display == "block") {
                        nav.style.opacity = 0;
                        border.style.opacity = 0;
                        btn.style.opacity = 0;
                    }
                    remove(ulObj, -num * scrollH, function () {
                        flag = true;
                    });
                    for (var i = 0; i < olLi.length; i++) {
                        olLi[i].style.backgroundColor = "";
                    }
                    olLi[num].style.backgroundColor = "red";

                }
            }
            if (e.detail > 0) { //当滑轮向下滚动时
                animate(closeVoideBtn, {"opacity": 1});
                animate(nav, {"opacity": 1});
                animate(btn, {"opacity": 1});
                animate(border, {"opacity": 0.2});
                if (flag) {
                    flag = false;
                    num++;
                    if (num == lis.length) {
                        num = lis.length - 1;
                    }
                    remove(ulObj, -num * scrollH, function () {
                        flag = true;
                        if (num == 5) {
                            animate(share, {
                                "opacity": 1,
                            });
                        } else {
                            animate(share, {
                                "opacity": 0,
                            });
                        }
                    });
                    for (var i = 0; i < olLi.length; i++) {
                        olLi[i].style.backgroundColor = "";
                    }
                    olLi[num].style.backgroundColor = "red";

                }
            }
        }
    };
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {//firefox
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    document.body.onmousewheel = scrollFunc;


// ZCD

    var navBar = my$("navBar");
    var navList = my$("navList");
    var spot = 0;
    var ulwidth;

    navBar.onmouseover = function () {
        this.style.backgroundPosition = "-300px 0px";
    };
    navBar.onmouseout = function () {
        this.style.backgroundPosition = "-200px 0px";
    };

    navBar.onclick = function () {
        spot++;
        if (spot % 2 != 0) {
            ulwidth = navList.offsetWidth;

            this.style.backgroundPosition = "0px 0px";
            animate(navList, {"width": 0});
            this.onmouseover = function () {
                this.style.backgroundPosition = "-100px 0px";
            };
            this.onmouseout = function () {
                this.style.backgroundPosition = "0px 0px";
            }
        } else {
            this.style.backgroundPosition = "-300px 0px";
            this.onmouseover = function () {
                this.style.backgroundPosition = "-300px 0px";
            };
            this.onmouseout = function () {
                this.style.backgroundPosition = "-200px 0px";
            };
            animate(navList, {"width": ulwidth});
        }
    };


// 分享感言部分
    var share = my$("share");
    var aObjs = my$("share").getElementsByTagName("a");
    for (var i = 0; i < aObjs.length; i++) {
        var pos = -i * 29;
        aObjs[i].setAttribute("index", i);
        aObjs[i].style.backgroundPosition = pos + "px 0px";
        aObjs[i].onmouseover = overHandle;
        function overHandle() {
            var index = this.getAttribute("index");
            this.style.backgroundPosition = -index * 29 + "px 24px";
        }

        aObjs[i].onmouseout = outHandle;
        function outHandle() {
            var index = this.getAttribute("index");
            this.style.backgroundPosition = -index * 29 + "px 0px";
        }
    }
};

