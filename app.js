import express from "express";
import { compileJava } from "./runner/compile.js";
import { runJUnit } from "./runner/execute.js";

const app = express();
app.use(express.json({ limit: "5mb" }));

app.post("/run", async (req, res) => {
  try {
    const { code, tests } = req.body;

    const compileResult = await compileJava(code);
    if (compileResult.error) {
      return res.json({
        type: "compile-error",
        output: compileResult.error,
      });
    }

    const testResult = await runJUnit(tests);
    return res.json({
      type: "success",
      output: testResult,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Runner live on " + PORT));