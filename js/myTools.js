//前一个节点
function prev(obj) {
	var prevElt = obj.previousElementSibling || obj.previousSibling;
	if (prevElt && prevElt.nodeType == 1) {
		return prevElt;
	} else {
		return null;
	}
}

//后一个节点
function next(obj) {
	var nextElt = obj.nextElementSibling || obj.nextSibling;
	if (nextElt && nextElt.nodeType == 1) {
		return nextElt;
	} else {
		return null;
	}
}

//当前第一个节点
function first(obj) {
	var firstElt = obj.firstElementChild || obj.firstChild;
	if (firstElt && firstElt.nodeType == 1) {
		return firstElt;
	} else {
		return null;
	}
}

//最后一个节点
function last(obj) {
	var lastEle = obj.lastElementChild || obj.lastChild;
	if (lastEle && lastEle.nodeType == 1) {
		return lastEle;
	} else {
		return null;
	}
}

//绑定事件
function bind(obj, evType, evTn) {
	if (obj.addEventListener) {
		obj.addEventListener(evType, evTn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evType, evTn, false);
	} else {
		obj['on' + evType] = evTn;
	}
}

//解绑事件
function unbind(obj, evType, evTn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evType, evTn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on' + evType, evTn, false);
	} else {
		obj['on' + evType] = null;
	}
}

//获取ID名和tagName
function $1(selector, parent) {
	if (selector.charAt(0) == '#') {
		return document.getElementById(selector.substring(1));
	} else if (selector.charAt(0) == '.') {
		return document.getElementsByClassName(selector.substring(1));
	} else {
		parent = parent || document;
		return parent.getElementsByTagName(selector);
	}
}

//运动函数
function move(obj, attr, speed, tar, fn) {
	clearInterval(obj.timer);
	var dis = parseFloat(getStyle(obj, attr));

	speed = dis > tar ? -speed : speed;
	obj.timer = setInterval(function () {

		dis += speed;
		if (dis >= tar && speed > 0) {
			dis = tar;
		}
		if (dis <= tar && speed < 0) {
			dis = tar;
		}
		obj.style[attr] = dis + 'px';
		if (dis == tar) {
			clearInterval(obj.timer);
			obj.timer = null;
			fn && fn();
		}

	}, 30);

}

//获取样式函数
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle() : getComputedStyle(obj)[attr];
}

//缓冲运动函数

function bigStartMove(obj, json, rate, callback) {

	clearInterval(obj.timer);
	var cur = 0;
	var speed = 0;
	obj.timer = setInterval(function () {

		var onOff = true;

		// 传入多个属性名和属性值 然后在定时器里面 循环遍历这个对象 每一次定时器执行的时候 都会遍历一次所有的属性
		//让所有的属性都往前挪一步
		for (var attr in json) {

			var target = json[attr];

			//通过判断attr属性是什么 如果传入的属性是透明度 说明你一定是要让透明度运动
			if (attr == "opacity") {
				cur = Math.round(getStyle(obj, attr) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}

			speed = (target - cur) / rate;
			// style="width: 299.981px;" width: 298.8px;
			// 处理一下运动过程中的取整问题 将物体运动分别判断  将结果达到目标点
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//console.log(cur + ":" + speed);


			if (cur != target) {
				onOff = false;
				if (attr == "opacity") {
					obj.style.opacity = (cur + speed) / 100;
					obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
				} else {
					obj.style[attr] = cur + speed + "px";
				}
			}


		}

		if (onOff) {
			clearInterval(obj.timer);
			obj.timer = null;
			if (typeof callback === "function") {
				callback.call(obj);
			}
		}


	}, 30);

}