import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/SolutionTest.java", testCode);

    const cmd = `
      javac -cp ./runner/junit.jar:./runner/hamcrest.jar:/tmp /tmp/SolutionTest.java &&
      java -cp ./runner/junit.jar:./runner/hamcrest.jar:/tmp org.junit.runner.JUnitCore SolutionTest
    `;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return resolve(stderr || err.message);
      }

      // JUnit prints to stderr even when passing
      resolve(stdout + stderr);
    });
  });
}
