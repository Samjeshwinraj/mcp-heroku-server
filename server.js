const { spawn } = require("child_process");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const mcp = spawn("npx", ["@salesforce/mcp", "--orgs", "DEFAULT_TARGET_ORG", "--toolsets", "all"]);

  mcp.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  mcp.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  mcp.on("close", (code) => {
    res.send(`MCP exited with code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
});
