import { build } from "esbuild";
import { builtinModules } from "module";

const lambdas = [
  { name: "chatbot", entry: "./src/chatbot.js" },
  { name: "metrics", entry: "./src/metrics.js" },
];

for (const lambda of lambdas) {
  build({
    entryPoints: [lambda.entry],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    outfile: `dist/${lambda.name}/index.js`,
    minify: true,
    external: [
      "@aws-sdk/client-dynamodb",
      "@aws-sdk/lib-dynamodb",
      ...builtinModules,
    ], // ✅ excluye solo módulos nativos de Node
  })
    .then(() => console.log(`✅ Compilado ${lambda.name}`))
    .catch((err) => {
      console.error(`❌ Error compilando ${lambda.name}:`, err);
      process.exit(1);
    });
}
