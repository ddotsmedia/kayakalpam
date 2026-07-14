module.exports = {
  apps: [
    {
      name: "kayakalpam",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3080 -H 127.0.0.1",
      cwd: "/opt/kayakalpam",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3080",
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
