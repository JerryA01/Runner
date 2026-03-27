import { exec } from "child_process";
import fs from "fs";

export function compileJava(code) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/Solution.java", code);

    exec("javac /tmp/Solution.java", (err, stdout, stderr) => {
      if (err || stderr) {
        return resolve({ error: stderr || err.message });
      }
      resolve({ success: true });
    });
  });
}