TinyMessenger
=============

TinyMessenger is build for module communication.


TinyMessenger是一个为解决模块间通信的小插件，基于典型的pub/sub模式，通过自定义事件传递模块间的参数。

相较于Jquery的自定义事件（通过事件冒泡机制），TinyMessenger无需绑定到DOM，进一步降低了耦合。

相较于scaleApp，主要特点就是更小更灵活。。。。去掉了sandbox的概念。

通过实例化多个TinyMessenger对象，可以实现多个信道互不干扰的通信

举一个最简单的例子如下，

![demo1](http://gtms01.alicdn.com/tps/i1/T1gpRHXAlhXXXBJo.U-1440-761.jpg)

在选择了时间控件的值以后，商品详情需要根据对应的时间值显示相应的内容，而hightchart则需要
对应的时间值画出相应的图表，总结来说就是时间控件change以后要做2个操作。最简单的写法就是

`timeSelectBox.change(function(){`

   ` infoContainer.getInfo(startTime,endTime,goodsId);`

   ` highcharts.drawTable(startTime,endTime);`

   `/*理解意思就行**/`

`})`

这时，耦合就出现了，而且不利于后期代码维护（比如要增加第三个模块时就需要改动timeSelectBox.change里面的东西）

基于模块化的思路，把这个页面抽象成3个模块，其中A模块会在其他很多页面中复用，而B模块和C模块是这个页面独有的。进一步抽象成
一个简单的“类图”如下：

![demo2](http://gtms01.alicdn.com/tps/i1/T1cJYeFh8iXXbxY7oy-747-544.jpg)

这时TinyMessenger的作用就凸显了

首先实例化一个TM对象

`var tm = new TinyMessenger()`

在A模块中

`timeSelectBox.change(function(){

    tm.sendMsg('timeChange',startTime,endTime)

    /*startTime,endTime是需要暴露给其他模块的起始时间参数*/

}`

在B模块中

`tm.getMsg('timeChange',functioin(startTime,EndTime){

    infoContainer.getInfo(startTime,endTime,goodsId);

    /*startTime,endTime是从A模块传递过来的，goodsId是B模块的私有属性*/

})`

在C模块中

`tm.getMsg('timeChange',functioin(startTime,EndTime){

    highcharts.drawTable(startTime,endTime);

})`

事实上，B模块和C模块可能还会产生通信，比如C模块可能依赖B模块的goodsId。当然这只是一个最简单的例子,使用TinyMessenger可以无痛构建
一个简单的模块化APP

使用方法

sendMsg(customEventName,arg1,arg2,arg3...) 

//第一个参数是自定义事件名称，后面的参数是需要进行通信的消息，可以是值类型，也可以是
引用类型（对象或者数组），如果需要的话也可以传递一个DOM节点过去（不推荐）

getMsg(customEventName,callback);

//订阅者的callback里面接收的参数就是发布者传递过来的消息

cancelMsg(customEventName,callback);

//取消订阅，前提是callback不能为一个匿名函数

事实上getMsg还可以直接绑定到DOM节点上的事件，但严重不推荐这样做，格式是

getMsg('.span1:click',function(){xxxxx})






