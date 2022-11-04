import { createLogger, transports, format } from "winston";

const userLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'user.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
    })
]
});


export default userLogger;

