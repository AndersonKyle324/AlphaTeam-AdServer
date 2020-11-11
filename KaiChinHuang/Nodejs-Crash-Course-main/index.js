const Logger = require('./logger')

const logger = new Logger();

// Event listener
logger.on('message', (data)=>{
   console.log('Called Listener: ', data)
});

logger.log('Hello World')