$ErrorActionPreference = 'Stop'

$mysqlBin = 'C:\Program Files\MySQL\MySQL Server 8.0\bin'
$mysqlExe = Join-Path $mysqlBin 'mysql.exe'
$mysqldExe = Join-Path $mysqlBin 'mysqld.exe'
$iniPath = 'C:\Program Files\MySQL\MySQL Server 8.0\my.ini'

Write-Host 'Stopping MySQL service...'
Stop-Service MySQL80 -ErrorAction SilentlyContinue

Write-Host 'Starting MySQL in skip-grant-tables mode...'
$proc = Start-Process -FilePath $mysqldExe -ArgumentList @('--defaults-file="' + $iniPath + '"', '--console', '--skip-grant-tables') -PassThru -NoNewWindow

Start-Sleep -Seconds 4

Write-Host 'Setting root password...'
& $mysqlExe -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'FoodFlow2026!'; FLUSH PRIVILEGES;"

Write-Host 'Stopping temporary MySQL instance...'
Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue

Write-Host 'Starting MySQL service...'
Start-Service MySQL80

Write-Host 'Creating database and importing schema...'
& $mysqlExe -u root -pFoodFlow2026! -e "CREATE DATABASE IF NOT EXISTS foodflow; USE foodflow;"
Get-Content -Raw -Path 'C:\Users\amzad H shafin\OneDrive\Desktop\New folder (3)\Fronted\server\database\schema.sql' | & $mysqlExe -u root -pFoodFlow2026! foodflow
Get-Content -Raw -Path 'C:\Users\amzad H shafin\OneDrive\Desktop\New folder (3)\Fronted\server\database\seed.sql' | & $mysqlExe -u root -pFoodFlow2026! foodflow

Write-Host 'MySQL setup complete.'
Write-Host 'Use DB_PASSWORD=FoodFlow2026! in server/.env'
