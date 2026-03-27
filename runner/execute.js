import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {
    fs.writeFileSync("./runner/temp/MainTest.java", testCode);

    const cmd = `javac -cp .:./runner/junit.jar ./runner/temp/MainTest.java && java -cp .:./runner/junit.jar org.junit.runner.JUnitCore MainTest`;

    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        return resolve(stderr || err.message);
      }
      resolve(stdout);
    });
  });
}