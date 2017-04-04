var MongoClient = require('mongodb').MongoClient;

var MONGO_HOST = process.env.MONGOHOST || 'mongo';
var MONGO_PORT = process.env.MONGOPORT || 27017;
var MONGO_DB = process.env.MONGODB || 'testDb';


var getMongoConnection = function (callback) {
    var url = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DB;
    console.log(url, [MONGO_HOST, MONGO_HOST, MONGO_DB]);
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('err[connect]', err);
            callback('mongo connect error');
            return;
        }

        callback(err, db);
    });
}

exports.writeAndRead = function (write, callback) {

    // Connect to the db
    getMongoConnection(function (err, db) {

        var insert = {
            'data': 'cat',
            'fuu': 123,
            'date': new Date(),
            'testdata': write
        };

        var collection = db.collection('restttxy');

        collection.insertOne(insert, function (err, result) {
            if (err) {
                console.log('err[insertOne]', err);
                callback('mongo insertOne error');
                return;
            }

            //console.log('result', result.insertedId);

            collection.findOne({'_id': result.insertedId}, function (err, item) {
                if (err) {
                    console.log('err[findOne]', err);
                    callback('mongo findOne error');
                    return;
                }
                //console.log('item', item);

                callback(null, item.testdata);
            });


        });

    });

}

exports.increaseValue = function (value, increase, callback) {

    // Connect to the db
    getMongoConnection(function (err, db) {

        var collection = db.collection('restttxy');

        collection.insertOne({
            'value': value,
        }, function (err, result) {
            if (err) {
                console.log('err[insertOne]', err);
                callback('mongo insertOne error');
                return;
            }

            collection.update(
                {'_id': result.insertedId},
                {$inc: {"value": increase}}
                , function (err, item) {
                    if (err) {
                        console.log('err[update]', err);
                        callback('mongo update error');
                        return;
                    }


                    collection.findOne({'_id': result.insertedId}, function (err, item) {
                        if (err) {
                            console.log('err[findOne]', err);
                            callback('mongo findOne error');
                            return;
                        }
                        //console.log('item', item);

                        callback(null, item.value);
                    });

                });
        });

    });
}