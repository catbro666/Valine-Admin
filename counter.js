var AV = require('leanengine');

AV.Cloud.beforeUpdate('Counter', async function(req) {
    var query = new AV.Query("Counter");
    if (req.object.updatedKeys.includes('time')) {
        return query.get(req.object.id).then(function (obj) {
            if (obj.get("time") > req.object.get("time")) {
                throw new AV.Cloud.Error('Invalid update!');
            }
            return req.object.save();
        });
    }
});


