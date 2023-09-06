#!/bin/zsh

# Convert 1024x1024 png to icns

DIR=$1 # User argument path to icon png parent dir

if [[ -d $DIR ]] # Check if directory
then
    ICON1024=$DIR/icon1024.png
    ICONSET=$DIR/MyIcon.iconset
    mkdir $ICONSET
    sips -z 16 16     $ICON1024 --out $ICONSET/icon_16x16.png
    sips -z 32 32     $ICON1024 --out $ICONSET/icon_16x16@2x.png
    sips -z 32 32     $ICON1024 --out $ICONSET/icon_32x32.png
    sips -z 64 64     $ICON1024 --out $ICONSET/icon_32x32@2x.png
    sips -z 128 128   $ICON1024 --out $ICONSET/icon_128x128.png
    sips -z 256 256   $ICON1024 --out $ICONSET/icon_128x128@2x.png
    sips -z 256 256   $ICON1024 --out $ICONSET/icon_256x256.png
    sips -z 512 512   $ICON1024 --out $ICONSET/icon_256x256@2x.png
    sips -z 512 512   $ICON1024 --out $ICONSET/icon_512x512.png
    cp $ICON1024 $ICONSET/icon_512x512@2x.png
    iconutil -c icns $ICONSET
    rm -R $ICONSET
else
    echo "Not a valid path. Please include path to icon file parent directory."
fi
