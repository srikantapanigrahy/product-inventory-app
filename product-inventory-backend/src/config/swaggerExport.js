import fs from "fs";
import { swaggerSpec } from "./swagger.js";

// Create /docs folder if not exists
const docsDir = "./docs";
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Write OpenAPI JSON file
fs.writeFileSync(`${docsDir}/openapi.json`, JSON.stringify(swaggerSpec, null, 2));

console.log("✅ Swagger OpenAPI spec exported to docs/openapi.json");
