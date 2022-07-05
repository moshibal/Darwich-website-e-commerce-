import "dotenv/config";
import app from "./app.js";
app.listen(process.env.PORT, () => {
  console.log(`server running on the port ${process.env.PORT}`);
});
