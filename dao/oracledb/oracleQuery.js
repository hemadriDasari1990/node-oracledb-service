//Place all your oracle database queries here

let QueryMap = {
    'getData': `select * from table`
};

QueryFactory = function () {
};

QueryFactory.prototype.getQuery = function (queryId, params) {

    let theQuery = QueryMap[queryId];
    if (!params) {
        return theQuery;
    }

    let keys = Object.keys(params);
    keys.forEach(key => {
        let regEx = new RegExp(':' + key, "g");
        theQuery = theQuery.replace(regEx, params[key])
    });
    return theQuery;
};
module.exports = QueryMap;