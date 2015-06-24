define([
    'app/base/Command',
    'app/base/CommandMap',
    'app/events/SampleEvent',
    'app/services/SampleService'
], function(
    Command,
    CommandMap,
    SampleEvent,
    SampleService
)
{
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
    return SampleAsyncCommand;
});