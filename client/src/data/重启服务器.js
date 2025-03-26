/**
 * 重启服务器脚本
 * 用于自动停止当前运行的服务器进程并重新启动
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 项目根目录路径
const rootDir = path.resolve(__dirname, '../../../');
const clientDir = path.resolve(rootDir, 'client');

console.log('正在查找当前运行的服务器进程...');

// 查找使用8080端口的进程
exec('netstat -ano | findstr :8080', (error, stdout, stderr) => {
  if (error) {
    console.log('未找到运行中的服务器进程，将直接启动新服务器');
    startServer();
    return;
  }

  // 解析进程ID
  const lines = stdout.trim().split('\n');
  if (lines.length > 0) {
    // 提取最后一列的PID
    const pidMatches = lines[0].match(/\s+(\d+)$/);
    if (pidMatches && pidMatches[1]) {
      const pid = pidMatches[1];
      console.log(`找到服务器进程，PID: ${pid}，正在停止...`);
      
      // 终止进程
      exec(`taskkill /F /PID ${pid}`, (killError, killStdout, killStderr) => {
        if (killError) {
          console.error(`停止进程失败: ${killError.message}`);
          console.log('尝试直接启动新服务器...');
        } else {
          console.log('服务器进程已停止');
        }
        
        // 无论是否成功终止旧进程，都尝试启动新服务器
        setTimeout(() => {
          startServer();
        }, 1000); // 等待1秒确保端口释放
      });
    } else {
      console.log('无法解析进程ID，尝试直接启动新服务器');
      startServer();
    }
  } else {
    console.log('未找到运行中的服务器进程，将直接启动新服务器');
    startServer();
  }
});

// 启动服务器函数
function startServer() {
  console.log('正在启动服务器...');
  console.log(`工作目录: ${rootDir}`);
  
  // 检查server.js文件是否存在
  const serverJsPath = path.join(clientDir, 'src', 'server.js');
  if (!fs.existsSync(serverJsPath)) {
    console.error(`错误: 服务器文件不存在 (${serverJsPath})`);
    return;
  }
  
  // 使用子进程启动服务器
  const serverProcess = exec('npm run serve', { cwd: rootDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`启动服务器时出错: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`服务器错误输出: ${stderr}`);
    }
  });
  
  // 输出服务器日志
  serverProcess.stdout.on('data', (data) => {
    console.log(`服务器输出: ${data.trim()}`);
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(`服务器错误: ${data.trim()}`);
  });
  
  console.log('服务器启动命令已执行，请等待服务器启动完成...');
  console.log('服务器启动后，请访问: http://localhost:8080');
}