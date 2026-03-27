import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/SolutionTest.java", testCode);

    const cmd = `
      javac -cp ./runner/junit.jar:/tmp /tmp/SolutionTest.java &&
      java -cp ./runner/junit.jar:/tmp org.junit.runner.JUnitCore SolutionTest
    `;

    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        return resolve(stderr || err.message);
      }
      resolve(stdout);
    });
  });
}