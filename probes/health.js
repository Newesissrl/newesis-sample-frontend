const fs = require("fs");
const vm = require("vm");
const assert = require("assert");
const path = require("path");
const envConfigFileName = "env-config.js";
const envConfigPath = path.resolve(__dirname, `../${envConfigFileName}`);

if (!fs.existsSync(envConfigPath)) {
  throw `${envConfigFileName} not found in ${envConfigPath}`;
}
const envConfigContent = fs.readFileSync(envConfigPath, {
  encoding: "utf8",
});
try {
  const script = new vm.Script(envConfigContent);
  const ctx = vm.createContext({ window: {} });
  script.runInContext(ctx);
  assert.equal(
    ctx.window._env_ != null,
    true,
    `The file "${envConfigFileName}" doesn't contain the mandatory "_env_" property`,
  );
} catch (e) {
  throw JSON.stringify({ msg: e.message, content: envConfigContent }, null, 2);
}

console.log(`Valid "${envConfigFileName}" file found`);
