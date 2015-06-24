define([
    'underscore',
    'backbone'
], function(
    _,
    Backbone
)
{
    var Context;
    Context = _.clone(Backbone.Events);
    Context.dispatch = function(event)
    {
        //console.log(event.toString());
        this.trigger(event.type, event);
        return this;
    };
    return Context;
});