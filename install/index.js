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
  await fs.mkdir("third_party/zopfli/build", { recursive: true });
  await execp("cmake -S third_party/zopfli -B third_party/zopfli/build");
  await execp(`cmake --build third_party/zopfli/build -j$(nproc)`);
  await execp('npx cmake-js compile -G "Unix Makefiles"');
}

install();
