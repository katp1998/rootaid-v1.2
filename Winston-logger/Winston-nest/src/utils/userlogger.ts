import {
  transports,
  format
} from 'winston';

export const useLogger = {
    transports: [
      new transports.File({
        filename: 'user.log',
        level: 'info',
        format: format.combine(
          format.timestamp(),
          format.json()
        )
})

    ],
    
  }