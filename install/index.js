const fs = require("fs/promises");
const { exec } = require("child_process");

function execp(command) {
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

async function install() {
  let nproc;
  try {
    await execp("nproc");
    nproc = true;
  } catch (error) {
    nproc = false;
  }

  await fs.mkdir("third_party/zopfli/build", { recursive: true });
  await execp(
    `cd third_party/zopfli/build && cmake .. && make ${
      nproc ? "-j$(nproc)" : ""
    }`
  );
  await execp('npx cmake-js compile -G "Unix Makefiles"');
}

install();
