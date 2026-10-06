module.exports = {
  apps: [
    {
      name: 'soundflow-backend',
      cwd: '/home/vpsuser/apps/soundflow-backend',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: '250M',
      env: {
        NODE_ENV: 'production',
        PORT: 5006,
      },
      error_file: '/home/vpsuser/apps/soundflow-backend/logs/err.log',
      out_file: '/home/vpsuser/apps/soundflow-backend/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
