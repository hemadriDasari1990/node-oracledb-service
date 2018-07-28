let logger = require('../util/log');
let express = require('express');
let router = express.Router();
let controller = require('../controller/jp.js');
let error = require('../model/error')

// validation(router)
router.use((req, res, next) => {
	logger.info(`Request method: ${req.method}, Request Param: ${req.params}, Request URL: ${req.url}`);
	req.start = Date.now(); 
	next(); 
});
/**GET */
router.get('/getData', (req, res, next) => {
	controller.getData(req, res, next);
})
/** */

/**POST */
router.post('/test/', (req, res, next) => {
	controller.postTest(req, res, next);
})
/** */

/**PUT */
router.put('/test/', (req, res, next) => {
	controller.putTest(req, res, next);
})
/** */

/**DELETE */
router.delete('/test/:id', (req, res, next) => {
	controller.deleteTest(req, res, next);
})
/** */
router.use(errorHandling)

function errorHandling(err, req, res, next) {
    logger.error("Sent error to user")
    logger.error(err)
    res.status(err.status).send(err)
}

module.exports = router;