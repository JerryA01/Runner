import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/MainTest.java", testCode);

    const cmd = `
      javac -cp ./runner/junit.jar:/tmp /tmp/MainTest.java &&
      java -cp ./runner/junit.jar:/tmp org.junit.runner.JUnitCore MainTest
    `;

    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        return resolve(stderr || err.message);
      }
      resolve(stdout);
    });
  });
}