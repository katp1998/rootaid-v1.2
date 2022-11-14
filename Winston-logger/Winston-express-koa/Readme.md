# # Dependencies 
- npm install winston

## Log messages for some level

```js
import { userLogger } from "./logger";

userLogger.log("info", "info level message");
userLogger.log("error", "error level message");
userLogger.log("debug", "debug level message");
userLogger.log("warning", "warning level message");
```
