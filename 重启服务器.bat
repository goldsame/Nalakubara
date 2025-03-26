@echo off
echo 正在重启服务器...

:: 查找并关闭当前运行在8080端口的进程
echo 正在查找当前运行的服务器进程...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr ESTABLISHED') do (
    echo 找到服务器进程, PID: %%a, 正在停止...
    taskkill /F /PID %%a
    echo 服务器进程已停止
)

:: 等待1秒确保端口释放
timeout /t 1 /nobreak > nul

:: 启动新的服务器
echo 正在启动服务器...
cd /d e:\github\nalakubara3.0
start cmd /k "npm run serve"

echo 服务器正在启动, 请稍候...
echo 服务器启动后, 请访问: http://localhost:8080