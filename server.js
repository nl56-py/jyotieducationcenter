/**
 * Production Entry Point for DirectAdmin 25 (CloudLinux / LiteSpeed / Phusion Passenger)
 * Jyoti Education Corner Pvt. Ltd. (Jyoti Educations)
 */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
// DirectAdmin Passenger assigns port via process.env.PORT (or named pipe/socket)
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({
  dev,
  dir: __dirname,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Passenger request handling error:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(
        `> [Jyoti Educations] Production server ready on http://${hostname}:${port}`
      );
      console.log(`> Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js application server:", err);
    process.exit(1);
  });
