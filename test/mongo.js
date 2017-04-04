var mongo = require('../js/mongo');
var faker = require('faker');
var assert = require('assert');

describe('Mongo', function() {
    this.timeout(1000);

    var data_in = faker.lorem.words();

    it('try write and read back (' + data_in + ')', function(done) {

        mongo.writeAndRead(data_in, function(err, data_out) {
            //console.log('data_out', data_out);

            assert.ifError(err, 'mongo stuff failed');
            assert.equal(data_in, data_out, 'match data from mongo');
            done();
        });

    });
});