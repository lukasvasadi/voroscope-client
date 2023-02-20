#!/bin/zsh

if [ "$1" == "" ]
then
echo "Please include path to icon png file (1024x1024 px)"
else
icon1024 = $1
mkdir MyIcon.iconset
sips -z 16 16     $icon1024 --out MyIcon.iconset/icon_16x16.png
sips -z 32 32     $icon1024 --out MyIcon.iconset/icon_16x16@2x.png
sips -z 32 32     $icon1024 --out MyIcon.iconset/icon_32x32.png
sips -z 64 64     $icon1024 --out MyIcon.iconset/icon_32x32@2x.png
sips -z 128 128   $icon1024 --out MyIcon.iconset/icon_128x128.png
sips -z 256 256   $icon1024 --out MyIcon.iconset/icon_128x128@2x.png
sips -z 256 256   $icon1024 --out MyIcon.iconset/icon_256x256.png
sips -z 512 512   $icon1024 --out MyIcon.iconset/icon_256x256@2x.png
sips -z 512 512   $icon1024 --out MyIcon.iconset/icon_512x512.png
cp $icon1024 MyIcon.iconset/icon_512x512@2x.png
iconutil -c icns MyIcon.iconset
rm -R MyIcon.iconset
fi
