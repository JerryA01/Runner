import { exec } from "child_process";
import fs from "fs";

export function compileJava(code) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/Solution.java", code);

    exec("javac /tmp/Solution.java", (err, stdout, stderr) => {
      if (err || stderr) {
          console.error("compile error:", err);
          console.error("stderr c:", stderr);
          console.error("stdout c:", stdout);
        return resolve({ error: stderr || err.message });
      }
      resolve({ success: true });
    });
  });
}