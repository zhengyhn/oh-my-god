import requests
import os
import arrow
import shutil
from loguru import logger
from io import BytesIO
from PIL import Image, ImageFont, ImageDraw
from ...lib.singleton_mixin import SingletonMixin
from ...lib.string_util import StringUtil
from enum import Enum


class StreamType(Enum):
    IMAGE = 'image'
    TEXT = 'text'


class ArticleGenerateService(SingletonMixin):
    def __init__(self):
        self.punctuations = [u'，', u'。', u'！', u'；']
        self.image_prefix = 'image['
        self.question_font_size = 32
        self.answer_font_size = 26
        self.horizontal_margin = 20
        self.vertical_margin = 10
        self.font_height_ratio = 1.2
        self.image_width = 600
        self.image_height = 800

    def generate(self, data):
        folder_name = arrow.now().format('YYYY-MM-DD')
        folder_path = './output/' + folder_name
        try:
            os.mkdir(folder_path)
        except FileExistsError:
            shutil.rmtree(folder_path)
            os.mkdir(folder_path)
        for item in data['items']:
            self.__generate_one(item, folder_path)
        return {
            "folder_name": folder_name
        }

    def __generate_one(self, item, folder_path):
        question = item['title']
        answer = item['reply']
        question_lines = self.__text_to_lines(question, self.question_font_size)
        answer_lines = self.__text_to_lines(answer, self.answer_font_size)
        logger.debug(question_lines)
        logger.debug(answer_lines)
        answer_streams = self.__get_answer_streams(answer_lines)

        question_font = ImageFont.truetype('/Library/Fonts/Songti.ttc', self.question_font_size)
        answer_font = ImageFont.truetype('./src/font/simsun.ttc', self.answer_font_size)
        need_height = len(question_lines) * self.__get_line_height(self.question_font_size)
        # For the dotted line
        need_height += self.vertical_margin * 7
        for stream in answer_streams:
            if stream['type'] == StreamType.IMAGE:
                _, height = stream['value'].size
                need_height += height + self.vertical_margin
            else:
                need_height += self.__get_line_height(self.answer_font_size)
        if need_height > self.image_height:
            self.image_height += (need_height - self.image_height) + self.vertical_margin
        elif need_height < self.image_height:
            self.image_height -= (self.image_height - need_height) + self.vertical_margin

        im = Image.new('RGB', (self.image_width, self.image_height), (255, 255, 255))
        cur_x = self.horizontal_margin
        cur_y = self.vertical_margin

        draw = ImageDraw.Draw(im)
        for line in question_lines:
            draw.text((cur_x, cur_y), line, (0, 0, 0), font=question_font)
            cur_y += self.__get_line_height(self.question_font_size)
        # cur_y += self.vertical_margin
        for stream in answer_streams:
            if stream['type'] == StreamType.IMAGE:
                width, height = stream['value'].size
                im.paste(stream['value'], ((self.image_width - width) // 2, cur_y))
                cur_y += self.vertical_margin + height
            else:
                draw.text((cur_x, cur_y), stream['value'], (0, 0, 0), font=answer_font)
                cur_y += self.__get_line_height(self.answer_font_size)
        # draw dotted line
        cur_y += self.vertical_margin * 2
        # for x in range(cur_x, self.image_width, 4):
        #     draw.line([(x, cur_y), (x + 2, cur_y)], fill=(170, 170, 170))
        # Save to disk
        im.save(folder_path + '/' + str(arrow.now().timestamp * 1000 + int(arrow.now().format("SSS"))) + '.jpeg')

    def __get_answer_streams(self, lines):
        streams = []
        for line in lines:
            if line.startswith(self.image_prefix):
                url = line[len(self.image_prefix):-1]
                try:
                    response = requests.get(url)
                    image_bytes = BytesIO(response.content)
                    an_image = Image.open(image_bytes)
                    width, height = an_image.size
                    new_width = self.image_width - self.horizontal_margin * 2
                    an_image.thumbnail((new_width, int(self.image_height * width / new_width)))
                    streams.append({'type': StreamType.IMAGE, 'value': an_image})
                except:
                    continue
            else:
                streams.append({'type': StreamType.TEXT, 'value': line})
        return streams

    def __get_line_height(self, font_size):
        return self.vertical_margin + int(font_size * self.font_height_ratio)

    def __split_by_width(self, text, font_size):
        lines = []
        size = (self.image_width - 2 * self.horizontal_margin) * 3 // font_size
        while len(text.encode('utf8')) > size:
            pos = StringUtil().get_cut_position(text, size)
            line = text[:pos]
            if line != '':
                lines.append(line)
            text = text[pos:]
        lines.append(text)
        return lines

    def __text_to_lines(self, text, font_size):
        ret_lines = []
        lines = text.split("\n")
        new_lines = []
        for i in range(0, len(lines)):
            start = 0
            nextStart = lines[i].find(self.image_prefix)
            if nextStart >= 0:
                while nextStart >= 0 and nextStart < len(lines[i]):
                    end = lines[i].find(']', nextStart + 1) + 1
                    head_part = lines[i][start:nextStart]
                    middle_part = lines[i][nextStart:end]
                    new_lines.extend([head_part, middle_part])
                    start = end
                    nextStart = lines[i].find(self.image_prefix, end)
                    if nextStart < 0:
                        nextStart = len(lines[i])
                    tail_part = lines[i][end:nextStart]
                    if tail_part != '':
                        new_lines.append(tail_part)
                        start = nextStart
            elif i > 0 and lines[i] == '' and lines[i - 1] == '':
                pass
            else:
                new_lines.append(lines[i])
        for line in new_lines:
            if line.startswith(self.image_prefix):
                ret_lines.append(line)
            else:
                ret_lines.extend(self.__split_by_width(line, font_size))
        return ret_lines


