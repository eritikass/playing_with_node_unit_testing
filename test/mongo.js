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

    var value_init = faker.random.number({min:5, max:10});
    var value_inc = faker.random.number({min:5, max:10});
    var value_sum = value_init + value_inc;

    it('try mongo $inc update operator to sum numbers (' + value_init + '+' + value_inc + '=' + value_sum + ')', function(done) {
        mongo.increaseValue(value_init, value_inc, function(err, value_summed) {
            assert.ifError(err, 'mongo stuff failed');
            assert.equal(value_sum, value_summed, "error in mongo math");
            done();
        });
    });
});