const query = require('../dao/oracledb/OracleQuery');
const error = require('../model/error');
const response = require('../model/response');
const connection = require('../dao/oracledb/connect').connection;
const doRelease = require('../dao/oracledb/connect').doRelease();
const logger = require('../util/log');

function getData(req, res, next) {
    let getData = query.get('getData');
    connection.execute(getData, (err, result) => {
        if(err){
            let { message } = err || '';
            let status = 500,
            type = 'Internal Server Error',
            details = message;
            logger.error(err);
            res.status(status).send({ error: new error(status, type, details) });
        }else{
            let status = 201,
            type = 'success! Data retrieved successfully',
            details = result;
            res.status(status).send({ data: new response(status, type, details) });
            doRelease(connection);
        }
    });
}

module.exports = {
    getData
}