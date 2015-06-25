define([
    'jquery',
    'underscore',
    'app/base/Class'
], function(
    $,
    _,
    Class
)
{
    var RestAPI = Class.extend(
    {
        execute: function(type, request, responder, data)
        {
            //console.debug(type + ' /' + request);
            if (data) data = JSON.stringify(data);
            $.ajax({
                type: type,
                url: '/_/' + request,
                data: data,
                dataType: 'json',
                contentType: 'application/json',
                success: function(data, statusText, jqXHR)
                {
                    if (_.isObject(data))
                    {
                        data.code = jqXHR.status;
                        if (responder) responder.onSuccess(data);
                    }
                    else this.error(jqXHR);
                },
                error: function(jqXHR)
                {
                    if (responder) responder.onError(jqXHR.status, jqXHR.responseJSON || jqXHR.responseText);
                    if (jqXHR.status >= 500)
                    {
                        //Raygun.send(new Error('SERVER FAULT ' + jqXHR.status + '  ' + type + ' /' + request));
                    }
                }
            });
        }
    });
    return new RestAPI();
});