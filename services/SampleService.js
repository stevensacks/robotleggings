define([
    'app/net/RestAPI', 
    'app/services/Service'
], function(
    RestAPI,
    Service
)
{
    var SampleService = Service.extend(
    {
        init: function()
        {
            this._super(true);
        },
        execute: function()
        {
            RestAPI.execute('GET', 'route/action', this);
        },
        parse: function(response)
        {
            if (response.code === 200)
            {
                if (this.success) this.success(response.data);
            }
            else
            {
                if (this.error) this.error();
            }
        }
    });
    return SampleService;
});