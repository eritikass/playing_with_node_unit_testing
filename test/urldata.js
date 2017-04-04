var urldata = require('../js/urldata');
var assert = require('assert');
var NodeUrl = require('url');

var faker = require('faker');

describe('urldata.parseArticleUrl', function() {
    it('check method exists', function() {
        assert.ok(urldata.parseArticleUrl, 'method parse does not exists');
    });

    var runParseArticleUrl = function(url, expectedData) {
        it('parse article url - ' + url, function() {
            var urlObj = NodeUrl.parse(url);

            var actualData = urldata.parseArticleUrl(urlObj);
            assert.ok(actualData, 'url parse failed ');

            assert.deepEqual(expectedData, actualData, 'match data parsed');
        });
    }

    var runParseArticleUrl_bad_input = function(url, expectedData) {
        it('fail not/bad article url - ' + url, function() {
            var urlObj = NodeUrl.parse(url);

            var actualData = urldata.parseArticleUrl(urlObj);
            assert.ifError(actualData, 'url parse failed ');

        });
    }

    var randomWords = function(joinUsing, min, max) {
        return faker.lorem.words(faker.random.number({min:min, max:(max || min)})).split(' ').join(joinUsing);
    }

    var fakeDomain = function() {
        return faker.internet.protocol() + '://' + faker.internet.domainName() + '/';
    }

    var fakeTest = function(query_template) {
        var id = faker.random.number();
        var title = randomWords('-', 4, 6);
        var parent = randomWords('/', 1, 3);

        query_template = query_template || 'id=#id#'

        var url = fakeDomain() + parent + '/' + title + '?' + query_template.replace('#id#', id);

        runParseArticleUrl(url, {
            "id": id,
            "title": title,
            "parent": parent
        });
    }

    for (var i = 1; i <= 5; i++) {
        fakeTest();
        if (i > 3) {
            fakeTest('id=#id#&t=' + i);
        }
    }

    fakeTest('video_id=abc123&id=#id#&utmCampaignId=5876xcvad');
    fakeTest('cid=123&id=#id#&foo=boo');



    // expected to fail (not article urls)
    runParseArticleUrl_bad_input(fakeDomain() + randomWords('/', 1, 5) + '/' + randomWords('-', 2, 4) + '?id=');
    runParseArticleUrl_bad_input(fakeDomain() + randomWords('/', 1, 5) + '/' + randomWords('-', 2, 4) + '?xid=' + faker.random.number());
    runParseArticleUrl_bad_input(fakeDomain());
    runParseArticleUrl_bad_input(fakeDomain() + randomWords('/', 3, 5));
});