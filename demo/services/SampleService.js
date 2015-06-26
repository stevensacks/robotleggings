define(['app/services/Service'], function(Service)
{
    var SampleService = Service.extend(
    {
        type: 'POST',
        route: 'route/action'
        init: function(id)
        {
            this.data = {
                id: id
            }
            this._super(true);
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