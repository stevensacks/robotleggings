define([
    'app/base/Command',
    'app/base/CommandMap',
    'app/events/SampleEvent'
], function(
    Command,
    CommandMap,
    SampleEvent
)
{
    var SampleCommand = Command.extend(
    {
        execute: function()
        {
            console.log('SampleCommand.execute', this.event.payload);
            this._super();
        }
    });
    CommandMap.mapEvent(SampleEvent.TYPE, SampleCommand, SampleEvent);
    return SampleCommand;
});