var TinyMessenger = function(){
}
TinyMessenger.prototype.getMsg = function(customEvent, callback){
    var pattern = /(.[^:]+):(\w+)/gi;
    customEvent.replace(pattern,function(all,dom,domEv){
            $(dom).on(domEv,function(){
                callback.apply(this,arguments)
            })
    })
    this._callbacks || (this._callbacks = {});
    (this._callbacks[customEvent] || (this._callbacks[customEvent] = [])).push(callback);
    return this;
};
TinyMessenger.prototype.sendMsg = function(){
    var args = Array.prototype.slice.call(arguments,0),
        customEvent = args.shift(),
        list;
    if(!this._callbacks) return this;
    if(!(list = this._callbacks[customEvent])) return this;
    for(var i = 0; i < list.length; i++){
        list[i].apply(this, args);
    }
    return this;
};
TinyMessenger.prototype.cancelGetMsg = function(customEvent,callback){
    if(!(this._callbacks) || !(this._callbacks[customEvent])) return this;
    this._callbacks[customEvent].splice(this._callbacks[customEvent].indexOf(callback),1);
    return this;
}
