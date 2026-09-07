@echo off
set "SRC=C:\Users\anton\.gemini\antigravity\brain\e74edd82-1d15-4b22-8644-bb59bc50c6fe"
set "DST=C:\Users\anton\.gemini\antigravity\scratch\g-store\img"

copy /y "%SRC%\gstore_logo_1788729742242.png" "%DST%\logo.png"
copy /y "%SRC%\product_nike_airmax_1788729752191.png" "%DST%\nike-airmax.png"
copy /y "%SRC%\product_puma_suede_1788729762097.png" "%DST%\puma-suede.png"
copy /y "%SRC%\product_lacoste_polo_1788729772378.png" "%DST%\lacoste-polo.png"
copy /y "%SRC%\product_nike_tshirt_1788729783049.png" "%DST%\nike-tshirt.png"
copy /y "%SRC%\product_puma_rsx_1788729793143.png" "%DST%\puma-rsx.png"

echo All images copied successfully.
