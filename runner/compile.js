import { exec } from "child_process";
import fs from "fs";

export function compileJava(code) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/Main.java", code);

    exec("javac /tmp/Main.java", (err, stdout, stderr) => {
      if (err || stderr) {
        return resolve({ error: stderr || err.message });
      }
      resolve({ success: true });
    });
  });
}