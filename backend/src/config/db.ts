import { connect } from "mongoose";

const connection = async () => {
     try {
          await connect(process.env.DB_URL);
          console.log("database connected...");
     } catch (e) {
          console.log(e);
          process.exit(1);
     }
}

export default connection;