@echo off
echo ===================================
echo 正在构建并启动生产环境服务器...
echo ===================================

:: 进入客户端目录
cd /d e:\github\nalakubara3.0\client

:: 确保public目录中有原始的games.json文件
echo 正在复制原始游戏数据到public目录...
if not exist "public" mkdir public
copy /Y "e:\github\nalakubara3.0\client\src\data\games.json" "e:\github\nalakubara3.0\client\public\src\data\games.json" /B

:: 强制重新构建
echo 正在清除旧的构建文件...
if exist "build" (
  cmd /c "rmdir /s /q build"
)

echo 正在构建生产环境...
call npm run build
  
if %ERRORLEVEL% NEQ 0 (
  echo 构建失败，请检查错误信息！
  pause
  exit /b 1
)
  
echo 构建完成！

:: 确保构建目录中有原始的games.json文件
echo 正在复制原始游戏数据到构建目录...
if not exist "build\src\data" mkdir "build\src\data"
copy /Y "e:\github\nalakubara3.0\client\src\data\games.json" "e:\github\nalakubara3.0\client\build\src\data\games.json" /B
copy /Y "e:\github\nalakubara3.0\client\src\data\games.json" "e:\github\nalakubara3.0\client\build\games.json" /B

:: 关闭所有可能占用端口的进程
echo 正在查找并关闭占用端口的进程...

:: 查找并关闭占用3200端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3200') do (
  echo 正在终止进程 PID: %%a
  taskkill /F /PID %%a 2>nul
)

:: 等待2秒确保端口释放
echo 等待端口释放...
timeout /t 2 /nobreak > nul

:: 启动生产服务器
echo 正在启动生产服务器在端口3200...
start cmd /k "npx serve -s build -l 3200 --no-clipboard"

:: 等待服务器启动
echo 等待服务器启动...
timeout /t 3 /nobreak > nul

:: 检查服务器是否成功启动
netstat -ano | findstr :3200 | findstr LISTENING > nul
if %ERRORLEVEL% EQU 0 (
  echo ===================================
  echo 生产服务器已成功启动!
  echo 请访问: http://localhost:3200
  echo ===================================
  
  :: 尝试打开浏览器
  start "" "http://localhost:3200"
) else (
  echo ===================================
  echo 警告: 服务器可能未成功启动
  echo 请检查命令窗口是否有错误信息
  echo ===================================
)

echo 按任意键退出...
pause > nul