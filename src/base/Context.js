var _ = require("underscore");
var Backbone = require("Backbone");
var Context;
Context = _.clone(Backbone.Events);
Context.dispatch = function(event)
{
    //console.log(event.toString());
    this.trigger(event.type, event);
    return this;
};
module.exports =  Context;