exports.parseArticleUrl = function(url) {
    if (!url) {
        url = location;
    }

    var aid = (url.search || '').match(/[?&]id=(\d+)/);
    if (!aid) {
        return null;
    }

    var pathinfo = url.pathname.substr(1).split('/');
    var title = pathinfo.pop();

    return {
        "id": parseInt(aid[1], 10),
        "title": title,
        "parent": pathinfo.join('/')
    }
}