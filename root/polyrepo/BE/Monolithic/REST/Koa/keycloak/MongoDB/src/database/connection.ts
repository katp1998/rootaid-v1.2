import config from '../../config/index';
import mongoose, { ConnectOptions } from 'mongoose'




export default ()=>{
    mongoose.connect(`${config.dbURL}`, {
        useNewUrlParser: true
      } as ConnectOptions)
    console.log('Db Connected');
      
      mongoose.connection.on("error", (e) => {
        console.error(`Error ${e}`);
      });
}