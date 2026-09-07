$src = "C:\Users\anton\.gemini\antigravity\brain\e74edd82-1d15-4b22-8644-bb59bc50c6fe"
$dst = "C:\Users\anton\.gemini\antigravity\scratch\g-store\img"

New-Item -ItemType Directory -Force -Path $dst | Out-Null

Copy-Item "$src\gstore_logo_1788729742242.png" "$dst\logo.png" -Force
Copy-Item "$src\product_nike_airmax_1788729752191.png" "$dst\nike-airmax.png" -Force
Copy-Item "$src\product_puma_suede_1788729762097.png" "$dst\puma-suede.png" -Force
Copy-Item "$src\product_lacoste_polo_1788729772378.png" "$dst\lacoste-polo.png" -Force
Copy-Item "$src\product_nike_tshirt_1788729783049.png" "$dst\nike-tshirt.png" -Force
Copy-Item "$src\product_puma_rsx_1788729793143.png" "$dst\puma-rsx.png" -Force

Write-Host "All images copied successfully."
