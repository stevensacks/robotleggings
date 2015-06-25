var _ = require('underscore'),
    Class = require('../base/Class');
var ServiceQueue = Class.extend(
{
    init: function()
    {
        this.queue = [];
        this.nextBind = _.bind(this.next, this);
        this.completeBind = _.bind(this.complete, this);
    },
    add: function(service)
    {
        this.append(service);
    },
    append: function(service)
    {
        if (this.queue.length === 0) _.delay(this.nextBind, 10);
        this.queue.push(service);
        //console.log('ServiceQueue :: (' + this.queue.length + ')');
    },
    next: function()
    {
        var q = this.queue[0];
        q.on('complete', this.completeBind);
        q.execute();
    },
    complete: function()
    {
        this.queue.shift();
        if (this.queue.length > 0) _.delay(this.nextBind, 10);
    }
});
module.exports = new ServiceQueue();