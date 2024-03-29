import "dotenv/config";
import app from "./app.js";

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`server running on the port ${process.env.PORT || 4000}`);
});
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("we got an uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});
process.on("unhandleRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandleRejection, shutting down the server.");
  server.close(() => {
    process.exit(1);
  });
});
