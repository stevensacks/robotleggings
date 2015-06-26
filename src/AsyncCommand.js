define([
    'underscore',
    'Command',
    'lib/Dictionary'
], function(
    _,
    Command,
    Dictionary
)
{
    var AsyncCommand = Command.extend(
    {
        init: function(event)
        {
            this._super(event);
            AsyncCommand.commands.addItem(this, true);
        },
        listenTo: function(service)
        {
            service.on('success', _.bind(this.onSuccess, this))
                   .on('error', _.bind(this.onError, this));
        },
        onSuccess: function()
        {
            // concrete implementation
        },
        onError: function()
        {
            this.finish();
        },
        finish: function()
        {
            this.event = undefined;
            delete this.event;
            AsyncCommand.commands.removeItem(this);
        }
    });
    AsyncCommand.commands = new Dictionary();
    return AsyncCommand;
});
