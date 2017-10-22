> jQuery Scrollify

> Version Beta v1.0.5

> Date:2017-04-25 23:45


 ## 说明 ##

 基于Jquery通过滚动滚动条实现的全屏滚动组件，相比于传统的fullpage方式的全屏滚动，它即可以通过滚动条滚动内容，也可以鼠标滚轮全屏滚动内容，使滚动条与全屏滚动有效的结合在一起。同时也支持非溢出的显示内容，在小屏幕下，多余的内容，可以通过额外的滚动全部显示完成后，才会滚动到下一屏。
 该全屏组件支持IE7+,但是IE浏览器滚动条不支持 `mouseDown` 与 `mouseUp`事件的原因，会有些瑕疵。
 该组件目前是测试版本，不确保功能正常，我会继续跟踪改进，如果你有使用到，并且发生了问题，请与我联系:sgt_ah@163.com

 ## 使用 ##

 调用方法:

```javascript
$.scrollify({
	'target':'body,html', //滚动的目标容器，默认值为body,html
	'selector': 'section', //每个分区的类名，无需加点号.
	'extraSelector': 'section-six', //特殊的分区，例如文网文
	'minHeight': 600, //每个分区的最低高度，可以不设
	'scrollingSpeed': 8e2, //滚动速度，默认值8e2
	'easing':'easeInOutQuart', //滚动的动画速度方式。
	'before':function, //回调函数，滚动之前
	'after':function //回调函数，滚动之后
});
```