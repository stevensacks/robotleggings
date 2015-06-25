var Event = require('../events/Event');
var SampleEvent = Event.extend(
{
    init: function(type, payload)
    {
        this._super(type);
        this.payload = payload;
    }
});
SampleEvent._name = 'SampleEvent';
SampleEvent.TYPE = 'type';
module.exports = SampleEvent;