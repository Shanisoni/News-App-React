const express = require("express");
const generateNews = require("./generateNews");
const cors = require("cors");
const path = require("path");


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.get("/api/news", async (req, res) => {
  try {
    const news = await generateNews();
    res.status(200).json(news);
  } catch (error) {
    console.error(`Error fetching news: ${error}`);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
