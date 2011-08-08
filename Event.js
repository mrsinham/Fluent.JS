var Event = Class.extend({
	
	listen: function(object, eventName, callback) 
	{
		var context = this;
		var callbackWithContext = function(event) {
			callback.call(context, event);
		}
		if (object instanceof TwengaObject) {
			object._addListener(eventName, callbackWithContext);
		} else if(object instanceof Element) {
			object.addEventListener(eventName, function(event){
				event.source = this;
				event.name = eventName;
				callbackWithContext(event);
			}, false);
		}
	},
	
	_addListener: function(eventName, callback) 
	{
		if (this._aEventsListeners == undefined) {
			this._aEventsListeners = new Object();
		}
		if (this._aEventsListeners[eventName] == undefined) {
			this._aEventsListeners[eventName] = new Array();
		}
		this._aEventsListeners[eventName].push(callback);
	},
	
	notify: function(eventName, event) 
	{
		event = event || {};
		event.source = this;
		event.name = eventName;
		if (this._aEventsListeners[eventName] != undefined) {
			for (i in this._aEventsListeners[eventName]) {
				this._aEventsListeners[eventName][i](event);
			}
		}
	}

});