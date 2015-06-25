var Class = require('../base/Class');
var Context = require('../base/Context');
var Command = Class.extend(
{
    init: function(event)
    {
        this.event = event;
    },
    dispatch: function(event)
    {
        Context.dispatch(event);
        return this;
    },
    trigger: function()
    {
        Context.trigger.apply(Context, arguments);
        return this;
    },
    execute: function()
    {
        this.event = undefined;
        delete this.event;
    }
});
module.exports = Command;
