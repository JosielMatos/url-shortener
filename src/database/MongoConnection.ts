import mongoose, { ConnectOptions } from "mongoose";

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.DB_STRING, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log("DB connection succeeded");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
