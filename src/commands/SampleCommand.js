var Command = require('./Command');
var CommandMap = require('../base/CommandMap');
var SampleEvent = require('../events/SampleEvent');

var SampleCommand = Command.extend(
{
    execute: function()
    {
        console.log('SampleCommand.execute', this.event.payload);
        this._super();
    }
});
CommandMap.mapEvent(SampleEvent.TYPE, SampleCommand, SampleEvent);
module.exports = SampleCommand;