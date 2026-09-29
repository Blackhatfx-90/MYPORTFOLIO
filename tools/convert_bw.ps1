Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\godfa\.gemini\antigravity-ide\brain\ea541183-b264-4940-ad5c-fdd453649ebd\.user_uploaded\media_1790695483974.jpg"
$destDir = "C:\Users\godfa\OneDrive\Desktop\MY PORTFOLIO\assets\images"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$origImg = [System.Drawing.Image]::FromFile($srcPath)

# Grayscale Color Matrix
$colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix (
    , @(
        @(0.299, 0.299, 0.299, 0, 0),
        @(0.587, 0.587, 0.587, 0, 0),
        @(0.114, 0.114, 0.114, 0, 0),
        @(0, 0, 0, 1, 0),
        @(0.02, 0.02, 0.02, 0, 1) # slight contrast lift
    )
)

$imageAttributes = New-Object System.Drawing.Imaging.ImageAttributes
$imageAttributes.SetColorMatrix($colorMatrix, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)

# 1. Full Portrait (for about.html)
$portraitBitmap = New-Object System.Drawing.Bitmap($origImg.Width, $origImg.Height)
$g1 = [System.Drawing.Graphics]::FromImage($portraitBitmap)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g1.DrawImage($origImg, [System.Drawing.Rectangle]::new(0, 0, $origImg.Width, $origImg.Height), 0, 0, $origImg.Width, $origImg.Height, [System.Drawing.GraphicsUnit]::Pixel, $imageAttributes)
$g1.Dispose()

$portraitPath = Join-Path $destDir "priyanshu_portrait.jpg"
$portraitBitmap.Save($portraitPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$portraitBitmap.Dispose()
Write-Output "Saved portrait: $portraitPath"

# 2. Square Avatar focused on face (for index.html bento card)
$squareSize = [Math]::Min($origImg.Width, $origImg.Height) # 810
$avatarBitmap = New-Object System.Drawing.Bitmap(800, 800)
$g2 = [System.Drawing.Graphics]::FromImage($avatarBitmap)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
# crop from (0, 0, 810, 810) to capture face and head perfectly
$g2.DrawImage($origImg, [System.Drawing.Rectangle]::new(0, 0, 800, 800), 0, 0, $squareSize, $squareSize, [System.Drawing.GraphicsUnit]::Pixel, $imageAttributes)
$g2.Dispose()

$avatarPath = Join-Path $destDir "priyanshu_avatar.png"
$avatarBitmap.Save($avatarPath, [System.Drawing.Imaging.ImageFormat]::Png)
$avatarBitmap.Dispose()
Write-Output "Saved avatar: $avatarPath"

$origImg.Dispose()
Write-Output "Image conversion complete!"
