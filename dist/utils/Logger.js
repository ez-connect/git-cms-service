class Logger {
    debug(message, ...optionalParams) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(message, ...optionalParams);
        }
    }
    log(message, ...optionalParams) {
        if (process.env.NODE_ENV === 'development') {
            console.log(message, ...optionalParams);
        }
    }
    info(message, ...optionalParams) {
        if (process.env.NODE_ENV === 'development') {
            console.info(message, ...optionalParams);
        }
    }
    warn(message, ...optionalParams) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(message, ...optionalParams);
        }
    }
    error(message, ...optionalParams) {
        if (process.env.NODE_ENV === 'development') {
            console.error(message, ...optionalParams);
        }
    }
}
const singleton = new Logger();
export { singleton as Logger };
