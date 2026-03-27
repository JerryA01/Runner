import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {
    fs.writeFileSync("/tmp/SolutionTest.java", testCode);

    const junit = "/opt/render/project/src/runner/junit-4.13.2.jar";
    const hamcrest = "/opt/render/project/src/runner/hamcrest-core-1.3.jar";

    const cmd = `
      javac -cp ${junit}:${hamcrest}:/tmp /tmp/SolutionTest.java &&
      java -cp ${junit}:${hamcrest}:/tmp org.junit.runner.JUnitCore SolutionTest
    `;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return resolve(stderr || err.message);
      }
      resolve(stdout + stderr);
    });
  });
}
