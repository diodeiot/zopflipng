import { exec } from "child_process";

export function execp(command:string) {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });
  });
}
