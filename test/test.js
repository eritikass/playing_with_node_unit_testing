var assert = require('assert');
var sinon = require('sinon');

describe('random-tests', function() {

    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function() {
                assert.equal(-1, [1,2,3].indexOf(4));
            });
        });
    });

    describe('User', function() {
        describe('#save()', function() {
            it('should save without error (test callback)', function(done) {
                var testAPI = { save: function (callback) { callback(); } };
                testAPI.save(done);
            });
        });
    });


    function applyClass(parent, cssClass) {
        var els = parent.querySelectorAll('.something-special');
        for(var i = 0; i < els.length; i++) {
            els[i].classList.add(cssClass);
        }
    }

    describe('some mocking usecase', function() {

        it('adds correct class', function() {
            var parent = {
                querySelectorAll: sinon.stub()
            };
            var elStub = {
                classList: {
                    add: sinon.stub()
                }
            };
            parent.querySelectorAll.returns([elStub]);
            var expectedClass = 'hello-world';

            applyClass(parent, expectedClass);

            sinon.assert.calledWith(elStub.classList.add, expectedClass);
        });

    });

});
