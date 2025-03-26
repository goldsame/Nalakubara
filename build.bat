@echo off
echo ===================================
echo 正在重新构建游戏应用...
echo ===================================

cd e:\github\nalakubara3.0\client
echo 开始构建...
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo 构建失败，请检查错误信息！
  pause
  exit /b 1
)

echo 构建成功！

:: 尝试释放3200端口
set PORT=3200
echo 检查端口 %PORT% 是否被占用...
netstat -ano | findstr :%PORT% > temp.txt
if %ERRORLEVEL% EQU 0 (
  echo 端口 %PORT% 已被占用，尝试释放...
  for /f "tokens=5" %%a in (temp.txt) do (
    echo 正在终止进程 PID: %%a
    taskkill /F /PID %%a
  )
  del temp.txt
  timeout /t 2 /nobreak > nul
)

:: 启动服务器但不打开浏览器
echo 正在启动服务器在端口 %PORT%...
start cmd /k "npx serve -s build -l %PORT% --no-clipboard"

echo ===================================
echo 应用已成功重建并启动在 http://localhost:%PORT%
echo ===================================
echo 请手动打开浏览器访问上述地址
echo ===================================

pause