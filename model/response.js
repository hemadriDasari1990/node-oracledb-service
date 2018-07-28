var Response = function(resultCode,message,data){
	this.resultCode = resultCode;
	this.message = message;
	this.data = data;
};


module.exports = Response;