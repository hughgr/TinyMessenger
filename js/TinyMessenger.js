var TinyMessenger = function(){
}
TinyMessenger.prototype.sendMsg = function(){
    var args = Array.prototype.slice.call(arguments,0);
    var ev = args.shift();
    var list, calls;
    if(!(calls = this._callbacks)) return this;
    if(!(list = this._callbacks[ev])) return this;
    for(var i = 0; i < list.length; i++){
        list[i].apply(this, args);
    }
    return this;
};
TinyMessenger.prototype.getMsg = function(ev, callback){
    var pattern = /(.[^:]+):(\w+)/gi;
    ev.replace(pattern,function(all,dom,domEv){
            $(dom).on(domEv,function(){
                callback.apply(this,arguments)
            })
    })
    this._callbacks || (this._callbacks = {});
    (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
    return this;
};
TinyMessenger.prototype.cancelGetMsg = function(ev,callback){
    if(!(this._callbacks) || !(this._callbacks[ev])) return this;
    this._callbacks[ev].splice(this._callbacks[ev].indexOf(callback),1);
    return this;

}
