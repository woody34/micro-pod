export default {
  id: "default",
  url: process.env.MONGO_URL || "mongodb://localhost:27017/podcast",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
