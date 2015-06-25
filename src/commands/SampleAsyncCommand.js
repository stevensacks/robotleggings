var Command = require('../commands/Command');
var CommandMap = require('../base/CommandMap');
var SampleEvent = require('../events/SampleEvent');
var SampleService = require('../services/SampleService');

var SampleAsyncCommand = Command.extend(
{
    execute: function()
    {
        if (!this.event.payload) this.finish();
        else
        {
            var service = new SampleService();
            this.listenTo(service);
        }
    },
    onSuccess: function(data)
    {
        // do something
        this.finish();
    },
    onError: function()
    {
        // handle error
    },
    finish: function()
    {
        // cleanup if necessary
        this._super();
    }
});
CommandMap.mapEvent(SampleEvent.TYPE, SampleAsyncCommand, SampleEvent);
module.exports = SampleAsyncCommand;