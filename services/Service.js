define([
    'underscore',
    'backbone',
    'app/base/Class',
    'app/base/Context',
    'app/events/AlertEvent',
    'app/services/ServiceQueue',
    'lang/Lang'
], function(
    _,
    Backbone,
    Class,
    Context,
    AlertEvent,
    ServiceQueue,
    Lang
)
{
    var Service = Class.extend(
    {
        init: function(queue)
        {
            if (queue) ServiceQueue.add(this);
            else this.execute();
        },
        execute: function()
        {
            // concrete
        },
        parse: function(response)
        {
            // concrete
        },
        onSuccess: function(response)
        {
            this.parse(response);
            this.cleanup();
        },
        onError: function(code, error)
        {
            if (_.isObject(error) && error.status && _.isArray(error.data))
            {
                if (code === 401)
                {
                    this.alert(Lang.alerts.alert, Lang.errors.notAuthorized, function(){window.location.href='/';}, true);
                }
                else
                {
                    error.code = code;
                    this.parse(error);
                }
            }
            else this.onFault(code, error);
            this.cleanup();
        },
        onFault: function(code, error)
        {
            console.error('SERVER FAULT', code, error);
        },
        cleanup: function()
        {
            if (this.complete) this.complete();
            this.error = this.success = this.complete = this.data = undefined;
            delete this.data;
            delete this.error;
            delete this.success;
            delete this.complete;
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
        alert: function(title, message, action, forceAction)
        {
            Context.dispatch(new AlertEvent(AlertEvent.ALERT, title, message, action, forceAction));
        },
        permissionAlert: function(admin)
        {
            if (!admin) Context.dispatch(new AlertEvent(AlertEvent.ALERT, Lang.errors.error, Lang.errors.permissionError));
            else Context.dispatch(new AlertEvent(AlertEvent.ALERT, Lang.errors.error, Lang.errors.permissionAdminError.split('%NAME%').join(admin)));
        },
        on: function(type, listener)
        {
            if (type === 'success') this.success = listener;
            else if (type === 'error') this.error = listener;
            else if (type === 'complete') this.complete = listener;
            return this;
        }
    });
    return Service;
});