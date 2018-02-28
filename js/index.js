var bigBox = $1('.big')[0];
var smallItem = $1('.small-item');
var bigItem = $1('.big-item');
var bigMore = $1('.bigMore');
var screen = $1('.screen');
var pic = $1('.bigMoreImg');
// 底部tab栏切换
for (var i = 0; i < smallItem.length; i++) {
    smallItem[i].index = i;
    smallItem[i].onmouseover=function(){
        this.style.borderColor = '#f10180';
    }
    smallItem[i].onmouseout=function(){
        this.style.borderColor = '#eee';
    }
    smallItem[i].onclick = function () {
        var index = this.index;
        for (var i = 0; i < smallItem.length; i++) {
            bigItem[i].style.display = 'none';
            smallItem[i].style.borderColor = '#eee';
        }
        bigItem[this.index].style.display = 'block';
        smallItem[this.index].style.borderColor = '#f10180';
        magnifier(index);
    };
}
// 放大镜效果
magnifier(0);
function magnifier(index) {
    bigBox.onmouseover = function(){
        bigMore[index].style.display = 'block';
        smallItem[index].style.borderColor = '#eee';
    }
    bigMore[index].onmousemove = function (e) {
        var e = event || window.event;
        // 获取鼠标的位置
        var X = e.pageX || e.clientX + document.documentElement.scrollLeft;
        var Y = e.pageY || e.clientY + document.documentElement.scrollTop;
        // 获取screen的位置
        var screenX = X - bigBox.offsetLeft - screen[index].offsetWidth / 2;
        var screenY = Y - bigBox.offsetTop - screen[index].offsetHeight / 2;
        // 确定screen的移动范围
        screenX = screenX < 0 ? 0 : screenX;
        screenY = screenY < 0 ? 0 : screenY;
        var screenXMax = bigBox.offsetWidth - screen[index].offsetWidth;
        var screenYMax = bigBox.offsetHeight - screen[index].offsetHeight;
        screenX = screenX > screenXMax ? screenXMax : screenX;
        screenY = screenY > screenYMax ? screenYMax : screenY;
        //确定移动距离
        screen[index].style.left = screenX + 'px';
        screen[index].style.top = screenY + 'px';
        //确定背景图片的移动距离
        // screen的移动距离/screen的最大移动距离 = 背景图的移动距离/背景图的最大移动距离
        var picXMax = pic[index].offsetWidth - bigBox.offsetWidth;
        var picYMax = pic[index].offsetHeight - bigBox.offsetHeight;
        pic[index].style.top = -screenY / screenYMax * picYMax + 'px';
        pic[index].style.left = -screenX / screenXMax * picXMax + 'px';
    }
    bigBox.onmouseout = function(){
        bigMore[index].style.display = 'none';
    }
}
