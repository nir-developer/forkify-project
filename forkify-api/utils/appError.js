class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    //DERIVED THE VALUE!(if no statusCode - then it is null and then statusCode as a string is null...)
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    //ALL INSTANCE ARE OPERATIONAL ERRORS
    this.isOperational = true;

    //Configure the stack trace - remove this constructor call from the trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// class AppError extends Error  {
//     //status property is derived from statusCode!
//     constructor(message, statusCode)
//     {
//         super(message)  ;
//         this.statusCode = statusCode;
//         //this.status = `${Number.parseInt(statusCode)}`.startsWith('4') ? 'fail' : 'error'
//         this.status = `${statusCode}`.startsWith('4') ? 'fail':'error';

//     }

// }
