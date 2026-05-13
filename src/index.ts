import express from "express";
import cors from "cors";

// `import` statements for routes
import eventRoutes from "./routes/eventRoute";
import categoryRoutes from "./routes/categoryRoute";
import speakerRoutes from "./routes/speakerRoutes";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//  import dan gunakan routes
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

