# -*- coding: utf-8 -*-

import os
import requests
from io import BytesIO
from PIL import Image, ImageFont, ImageDraw


def resize(image_pil, width, height):
    '''
    Resize PIL image keeping ratio and using white background.
    '''
    ratio_w = width / image_pil.width
    ratio_h = height / image_pil.height
    if ratio_w < ratio_h:
        # It must be fixed by width
        resize_width = width
        resize_height = round(ratio_w * image_pil.height)
    else:
        # Fixed by height
        resize_width = round(ratio_h * image_pil.width)
        resize_height = height
    image_resize = image_pil.resize((resize_width, resize_height), Image.ANTIALIAS)
    background = Image.new('RGBA', (width, height), (255, 255, 255, 255))
    offset = (round((width - resize_width) / 2), round((height - resize_height) / 2))
    background.paste(image_resize, offset)
    return background.convert('RGB')

def splitByWidth(text, fontSize, imageWidth, horizontalMargin):
    lines = []
    while len(text) * fontSize > imageWidth:
        size = (imageWidth - 2 * horizontalMargin) // fontSize
        if text[size:size + 1] in punctuations:
            size += 1
        line = text[:size]
        lines.append(line)
        text = text[size:]
    lines.append(text)
    return lines


def textToLines(text, fontSize, imageWidth, horizontalMargin):
    retLines = []
    lines = text.split("\n")
    for i in range(0, len(lines)):
        start = lines[i].find(imagePrefix)
        if start > 0:
            end = lines[i].find(']', start + 1) + 1
            lines.insert(i + 1, lines[i][start:end])
            lines.insert(i + 2, lines[i][end + 1:])
            lines[i] = lines[i][:start]
            i += 2
    for line in lines:
        if line.startswith('image['):
            retLines.append(line)
        else:
            retLines.extend(splitByWidth(line, fontSize, imageWidth, horizontalMargin))
    return retLines

questionFontSize = 18
answerFontSize = 14
horizontalMargin = 10
verticalMargin = 10
imageWidth = 600
imageHeight = 800
punctuations = [u'，', u'。', u'！', u'；']
imagePrefix = 'image['

curX = horizontalMargin
curY = verticalMargin
im = Image.new('RGB', (imageWidth, imageHeight), (255, 255, 255))
questionFont = ImageFont.truetype('./src/font/msyhbd.ttf', questionFontSize)
answerFont = ImageFont.truetype('./src/font/msyh.ttf', answerFontSize)
question = u'如何评价"95后网友飙摩托车追高铁发抖音炫耀 已被刑拘"'
answer = u"""
车在前面飞，魂在后面追，一旦追不上，化成一盒灰。
"""
questionLines = textToLines(question, questionFontSize, imageWidth, horizontalMargin)
answerLines = textToLines(answer, answerFontSize, imageWidth, horizontalMargin)

print(questionLines)
print(answerLines)
needHeight = len(questionLines) * (verticalMargin + questionFontSize)
for line in answerLines:
    if line.startswith(imagePrefix):
        url = line[len(imagePrefix):-1]
        response = requests.get(url)
        bytes = BytesIO(response.content)
        anImage = Image.open(bytes)
        width, height = anImage.size
        newWidth = imageWidth - horizontalMargin * 2
        anImage.thumbnail((newWidth, int(imageHeight * width / newWidth)))
        width, height = anImage.size
        needHeight += height + verticalMargin
    else:
        needHeight += verticalMargin + answerFontSize

if needHeight > imageHeight:
    imageHeight += (needHeight - imageHeight) + verticalMargin
elif needHeight < imageHeight:
    imageHeight -= (imageHeight - needHeight) + verticalMargin
im = resize(im, imageWidth, imageHeight)

draw = ImageDraw.Draw(im)
for line in questionLines:
    draw.text((curX, curY), line, (0, 0, 0), font=questionFont)
    curY += verticalMargin + questionFontSize
for line in answerLines:
    if line.startswith(imagePrefix):
        url = line[len(imagePrefix):-1]
        response = requests.get(url)
        bytes = BytesIO(response.content)
        anImage = Image.open(bytes)
        newWidth = imageWidth - horizontalMargin * 2
        anImage.thumbnail((newWidth, int(imageHeight * width / newWidth)))
        _, height = anImage.size
        im.paste(anImage, (curX, curY))
        curY += verticalMargin + height
    else:
        draw.text((curX, curY), line, (0, 0, 0), font=answerFont)
        curY += verticalMargin + answerFontSize

# im.show()
im.save('./netease.png')