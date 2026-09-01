Set-Location -LiteralPath 'C:\Users\ADMIN\Documents\Coding\goldenfield-erp-testing\my-erp-backend'
Get-Process -Name 'node' -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
node server.js
