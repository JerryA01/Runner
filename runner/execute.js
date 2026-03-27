import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {

    // ⭐ Remove BOM if present
    testCode = testCode.replace(/^\uFEFF/, "").trimStart();

    // ⭐ Write test file with clean UTF-8
    fs.writeFileSync("/tmp/SolutionTest.java", testCode, { encoding: "utf8" });

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