
var _ = require('underscore');
var Class = require('./Class');
var Dictionary = require('../utils/Dictionary');
var Context = require('../base/Context');

var CommandMap = Class.extend(
{
    init: function()
    {
        this.eventTypeMap = {};
        this.commandClassMap = new Dictionary();
    },
    mapEvent: function(type, commandClass, eventClass)
    {
        if (type && commandClass && eventClass)
        {
            if (!this.eventTypeMap[type]) this.eventTypeMap[type] = [];
            if (!_.contains(this.eventTypeMap[type], commandClass))
            {
                this.eventTypeMap[type].push(commandClass);
                this.commandClassMap.addItem(commandClass, eventClass);
                if (this.eventTypeMap[type].length === 1)
                {
                    Context.on(type, this.execute, this);
                }
            }
        }
    },
    unmapEvent: function(type, commandClass, eventClass)
    {
        if (this.eventTypeMap[type])
        {
            this.eventTypeMap[type] = _.without(this.eventTypeMap[type], commandClass);
            if (this.eventTypeMap[type].length === 0)
            {
                this.eventTypeMap[type] = undefined;
                this.commandClassMap.removeItem(commandClass, eventClass);
                Context.off(type, this.execute, this);
            }
        }
    },
    execute: function(event)
    {
        var self = this;
        if (this.eventTypeMap[event.type])
        {
            _.each(this.eventTypeMap[event.type], function(commandClass)
            {
                if (event instanceof self.commandClassMap.getItem(commandClass))
                {
                    new commandClass(event).execute();
                }
            })
        }
    }
});
// [jwarden 6.24.2015] TODO/FIXME: Did you mean to return an instance here or a constructor?
module.exports = new CommandMap();