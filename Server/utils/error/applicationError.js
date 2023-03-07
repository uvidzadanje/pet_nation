class ApplicationError extends Error {
    static type = {
      APP_NAME: "PETNATION",
      INTERNAL: "INTERNAL",
      NETWORK: "NETWORK",
      UNKNOWN: "UNKNOWN",
    };
  
    constructor(options) {
      super();
  
      if (!ApplicationError.type.hasOwnProperty(options.type)) {
        throw new Error(`ApplicationError: ${options.type} is not a valid type.`);
      }
  
      if (!options.message) {
        throw new Error("ApplicationError: error message required.");
      }
  
      if (!options.code) {
        throw new Error("ApplicationError: error code required.");
      }
  
      this.name = "ApplicationError";
      this.type = options.type;
      this.code = options.code;
      this.message = options.message;
      this.errors = options.errors;
      this.statusCode = options.statusCode;
    }
}

module.exports = ApplicationError;