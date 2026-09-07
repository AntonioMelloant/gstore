@echo off
echo ==========================================
echo   G. STORE - Copiando imagens do projeto
echo ==========================================

set "SRC=C:\Users\anton\.gemini\antigravity\brain\e74edd82-1d15-4b22-8644-bb59bc50c6fe\.user_uploaded"
set "DST=C:\Users\anton\.gemini\antigravity\scratch\g-store\img"

if not exist "%DST%" mkdir "%DST%"

echo.
echo [LOGO]
copy /y "%SRC%\media_1788734179886.jpg" "%DST%\"

echo.
echo [Jaqueta Tommy Hilfiger - 5 fotos]
copy /y "%SRC%\media_1788732999127.jpg" "%DST%\"
copy /y "%SRC%\media_1788732999140.jpg" "%DST%\"
copy /y "%SRC%\media_1788732999145.jpg" "%DST%\"
copy /y "%SRC%\media_1788732999163.jpg" "%DST%\"
copy /y "%SRC%\media_1788732999176.jpg" "%DST%\"

echo.
echo [Moletom Champion - 2 fotos]
copy /y "%SRC%\media_1788733377289.jpg" "%DST%\"
copy /y "%SRC%\media_1788733389232.jpg" "%DST%\"

echo.
echo [Camisa Nike Tottenham - 4 fotos]
copy /y "%SRC%\media_1788816686210.jpg" "%DST%\"
copy /y "%SRC%\media_1788816686226.jpg" "%DST%\"
copy /y "%SRC%\media_1788816686239.jpg" "%DST%\"
copy /y "%SRC%\media_1788816686257.jpg" "%DST%\"

echo.
echo [Camisa Nike Chelsea - 3 fotos]
copy /y "%SRC%\media_1788816969936.jpg" "%DST%\"
copy /y "%SRC%\media_1788816969970.jpg" "%DST%\"
copy /y "%SRC%\media_1788816970007.jpg" "%DST%\"

echo.
echo ==========================================
echo OK! 15 imagens copiadas (1 logo + 14 fotos de produtos)
echo Agora suba a pasta g-store inteira para o Vercel!
echo ==========================================
pause
