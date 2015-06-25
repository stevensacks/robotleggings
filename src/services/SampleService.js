var RestAPI = require('../net/RestAPI'), 
    Service = require('../services/Service');

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
module.exports = SampleService;