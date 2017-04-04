var MongoClient = require('mongodb').MongoClient;

var MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
var MONGO_PORT = process.env.MONGO_PORT || 27017;
var MONGO_DB = process.env.MONGO_DB || 'testDb';

exports.writeAndRead = function(write, callback) {

    // Connect to the db
    MongoClient.connect("mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DB, function(err, db) {
        if(err) {
            console.log('err[connect]', err);
            callback('mongo connect error');
            return;
        }

        var insert = {
            'data': 'cat',
            'fuu': 123,
            'date': new Date(),
            'testdata': write
        };

        var collection =  db.collection('restttxy');

        collection.insertOne(insert, function(err, result) {
            if (err) {
                console.log('err[insertOne]', err);
                callback('mongo insertOne error');
                return;
            }

            //console.log('result', result.insertedId);

            collection.findOne({'_id': result.insertedId}, function(err, item) {
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