module.exports = function sendResponse({err,message='',errStatus=400,status=200,res,result=[]}){
    const success = !err;
    if(err){
        message = err.message;
        status = errStatus;
    }
    res.status(status).json({success,message,result});
}