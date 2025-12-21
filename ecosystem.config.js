module.exports = {
  apps : [{
    name   : "cake-api",
    script : "dist/main.js",
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    }
  }]
}
