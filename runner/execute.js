import { exec } from "child_process";
import fs from "fs";

export function runJUnit(testCode) {
  return new Promise((resolve) => {

    // Removed BOM if present
    testCode = testCode.replace(/^\uFEFF/, "").trimStart();

    fs.writeFileSync("/tmp/SolutionTest.java", testCode, { encoding: "utf8" });

    const junit = "/opt/render/project/src/runner/junit-4.13.2.jar";
    const hamcrest = "/opt/render/project/src/runner/hamcrest-core-1.3.jar";

    const cmd = `
    javac -cp ${junit}:${hamcrest}:/tmp -d /tmp /tmp/Solution.java /tmp/SolutionTest.java &&
    java -cp ${junit}:${hamcrest}:/tmp org.junit.runner.JUnitCore SolutionTest`;


    console.log("Running JUnit with command:", cmd);

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
          console.error("JUnit error:", err);
          console.error("stderr:", stderr);
          console.error("stdout:", stdout);

        return resolve((stdout || "") + (stderr || "") || err.message);
      }
      resolve(stdout + stderr);
    });
  });
}