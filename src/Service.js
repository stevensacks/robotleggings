define([
    'underscore',
    'backbone',
    'Context',
    'RestAPI',
    'ServiceQueue',
    'lib/Class'
], function(
    _,
    Backbone,
    Context,
    RestAPI,
    ServiceQueue,
    Class
)
{
    var Service = Class.extend(
    {
        type: 'GET',
        route: undefined,
        init: function(queue)
        {
            if (queue) ServiceQueue.add(this);
            else this.execute();
        },
        execute: function()
        {
            if (this.type === 'GET' || this.type === 'DELETE') RestAPI.execute(this.type, this.route, this);
            else RestAPI.execute(this.type, this.route, this, this.data);
        },
        parse: function(response)
        {
            if (response.code === 200)
            {
                if (this.success) this.success();
            }
            else
            {
                if (this.error) this.error();
            }
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
                if (code === 401 && this.on401) this.on401();
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
            this.error = this.success = this.complete = this.type = this.route = this.data = undefined;
            delete this.type;
            delete this.route;
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
        on: function(type, listener)
        {
            if (type === 'success') this.success = listener;
            else if (type === 'error') this.error = listener;
            else if (type === 'complete') this.complete = listener;
            else if (type === '401') this.on401 = listener;
            return this;
        }
    });
    return Service;
});