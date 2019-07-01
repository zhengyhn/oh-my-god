const puppeteer = require('puppeteer-core');

/*
let html = '<span class="RichText ztext CopyrightRichText-richText" itemprop="text" ecommerce="[object Object]"><p>——先森们，我们需要一种完美的武器，用来收拾坦克的！( ￣▽￣)σ</p><p>——好的，先生，来说说您的要求吧，我们马上就可以开始设计工作。(◦˙▽˙◦)</p><p>——首先，我们要确定它必须可以击穿现在的大部分都坦克。(*´∀`)σ</p><p>——是的，用大炮，大量装药！从海军的炮里选是个不错的想法，128MM或者130MM的舰炮怎么样？这些炮可带劲儿了！\(≧▽≦)/</p><p>——很好设计师！很好！坚固的防护是必不可少的，你懂的。\(≧▽≦)/</p><p>——那么我们需要一个很厚重的正面装甲，如果是这样，把大炮焊在车体上可以更稳定更坚固也更简单。（￣～￣）</p><p>——你的想法很有趣，先生！( ￣▽￣)σ</p><figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/50/v2-62a3df52b4426c15af4031e469aca5fc_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic3.zhimg.com/50/v2-348e08b9d244c266f6d0259aa8d5c53f_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic2.zhimg.com/v2-62a3df52b4426c15af4031e469aca5fc_r.jpg"/></noscript><img src="https://pic2.zhimg.com/80/v2-62a3df52b4426c15af4031e469aca5fc_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic3.zhimg.com/50/v2-348e08b9d244c266f6d0259aa8d5c53f_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="2048" data-original="https://pic2.zhimg.com/v2-62a3df52b4426c15af4031e469aca5fc_r.jpg" data-actualsrc="https://pic2.zhimg.com/50/v2-62a3df52b4426c15af4031e469aca5fc_hd.jpg"></figure><p class="ztext-empty-paragraph"><br></p><p>——先生们，我们注意到了一个问题，这辆车没办法攻击身后的敌人！这是很严重的错误！</p><figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/50/v2-e5745dfa5551cc747b104e36774aa175_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic1.zhimg.com/50/v2-a40b82fa4b05c0ab43d9d7ff105b9176_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic2.zhimg.com/v2-e5745dfa5551cc747b104e36774aa175_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/80/v2-e5745dfa5551cc747b104e36774aa175_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——对不起，但是我们总不能也在后面焊一根炮管吧。我有个新想法，我们在这辆车尾上加个机枪塔吧？如何？((유∀유|||))</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/50/v2-aba48f8f772fe20c8e1a9b3fa1a49c68_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic4.zhimg.com/50/v2-93eabfc6aee55a86d2252192feb4e919_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic4.zhimg.com/v2-aba48f8f772fe20c8e1a9b3fa1a49c68_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/80/v2-aba48f8f772fe20c8e1a9b3fa1a49c68_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——嗯，我建议把它移到车顶，这样视野比较好。（￣▽￣）／</p><figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/50/v2-b9537598c1e0390e92567ce69e17218f_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic1.zhimg.com/50/v2-e9fc4271b488fe957d9b6042b39ca869_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic1.zhimg.com/v2-b9537598c1e0390e92567ce69e17218f_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/80/v2-b9537598c1e0390e92567ce69e17218f_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——简直完美！，但是万一后面的敌人是辆坦克呢？！(ᕑᗢᓫา∗)˒机枪可对付不了那些磨人的小妖精！</p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/50/v2-ebe1404433fb239cc9e0e907596620bc_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic4.zhimg.com/50/v2-997d6e41fd5fc981ad045999892c5682_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic3.zhimg.com/v2-ebe1404433fb239cc9e0e907596620bc_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/80/v2-ebe1404433fb239cc9e0e907596620bc_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——要不，我们在车顶的炮塔上装门炮吧？(⋟﹏⋞)</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/50/v2-af11635a5e657e80ccd0ca7cbd5b8643_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic4.zhimg.com/50/v2-84b939fab6e861a6c07a74bd0e854beb_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic4.zhimg.com/v2-af11635a5e657e80ccd0ca7cbd5b8643_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/80/v2-af11635a5e657e80ccd0ca7cbd5b8643_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——嗯，不错不错。可是万一头上的小炮打不穿后面的坦克呢？</p><p>——emmm，换大的！和车上那门一样大的！</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/50/v2-5d05b6dc2a075a3740520d5a2aad07d7_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic4.zhimg.com/50/v2-122af5cae3526675ba8fd6f11fc05c5e_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic4.zhimg.com/v2-5d05b6dc2a075a3740520d5a2aad07d7_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/80/v2-5d05b6dc2a075a3740520d5a2aad07d7_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——完美，唯一的缺点就是太重了！</p><p>——我有一个不成熟的建议，我们取消一门炮吧，把下面一门取消掉如何？</p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/50/v2-09242e5bea0c07b1e9fa8952b00be0e2_hd.jpg" data-rawwidth="2048" data-rawheight="1532" data-size="normal" data-default-watermark-src="https://pic4.zhimg.com/50/v2-82d9a82628664b891a6f97b9051e54de_hd.jpg" class="origin_image zh-lightbox-thumb" width="2048" data-original="https://pic3.zhimg.com/v2-09242e5bea0c07b1e9fa8952b00be0e2_r.jpg"/></noscript><span><div class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/80/v2-09242e5bea0c07b1e9fa8952b00be0e2_hd.jpg" style="width: 654px; height: 489.223px;"><div class="VagueImage-mask is-active"></div></div></span></figure><p>——完美，完美的武器！</p><p>——谢谢您的夸奖。</p><p>——别忘了装甲，设计师！还有什么问题吗？</p><p>——只有一个问题，这个东西除了不叫坦克，它和坦克有区别吗？→_→←_←</p><p>=͟͟͞͞(꒪ᗜ꒪ ‧̣̥̇) ∑===π （￣～￣）/就你话多</p><p class="ztext-empty-paragraph"><br></p><p class="ztext-empty-paragraph"><br></p><p>PS:坦克歼击车的出现不就是为了弥补坦克在反装甲作战中的火力不足和牵引式反坦克炮机动不足的问题吗？既然现在这些事情坦克能做到了，我干嘛还要费心费力去搞TD呢？一家之言仅供参考 （＾＿＾）</p></span>'
let text = `——先森们，我们需要一种完美的武器，用来收拾坦克的！( ￣▽￣)σ

——好的，先生，来说说您的要求吧，我们马上就可以开始设计工作。(◦˙▽˙◦)

——首先，我们要确定它必须可以击穿现在的大部分都坦克。(*∀)σ

——是的，用大炮，大量装药！从海军的炮里选是个不错的想法，128MM或者130MM的舰炮怎么样？这些炮可带劲儿了！\(≧▽≦)/

——很好设计师！很好！坚固的防护是必不可少的，你懂的。\(≧▽≦)/

——那么我们需要一个很厚重的正面装甲，如果是这样，把大炮焊在车体上可以更稳定更坚固也更简单。（￣～￣）

——你的想法很有趣，先生！( ￣▽￣)σ




——先生们，我们注意到了一个问题，这辆车没办法攻击身后的敌人！这是很严重的错误！

——对不起，但是我们总不能也在后面焊一根炮管吧。我有个新想法，我们在这辆车尾上加个机枪塔吧？如何？((유∀유|||))

——嗯，我建议把它移到车顶，这样视野比较好。（￣▽￣）／

——简直完美！，但是万一后面的敌人是辆坦克呢？！(ᕑᗢᓫา∗)˒机枪可对付不了那些磨人的小妖精！

——要不，我们在车顶的炮塔上装门炮吧？(⋟﹏⋞)

——嗯，不错不错。可是万一头上的小炮打不穿后面的坦克呢？

——emmm，换大的！和车上那门一样大的！

——完美，唯一的缺点就是太重了！

——我有一个不成熟的建议，我们取消一门炮吧，把下面一门取消掉如何？

——完美，完美的武器！

——谢谢您的夸奖。

——别忘了装甲，设计师！还有什么问题吗？

——只有一个问题，这个东西除了不叫坦克，它和坦克有区别吗？→_→←_←

=͟͟͞͞(꒪ᗜ꒪ ‧̣̥̇) ∑===π （￣～￣）/就你话多







PS:坦克歼击车的出现不就是为了弥补坦克在反装甲作战中的火力不足和牵引式反坦克炮机动不足的问题吗？既然现在这些事情坦克能做到了，我干嘛还要费心费力去搞TD呢？一家之言仅供参考 （＾＿＾）
`
let set = new Set()
let j = 0
let i = html.indexOf(text.substr(0, 3))
for (; i < html.length; ++i) {
  if (html.substr(i, 10) === '<img src="') {
    const end = html.indexOf('"', i + 10)
    const url = html.substring(i + 10, end)
    const fileName = url.substr(url.lastIndexOf('/'))
    if (!set.has(fileName)) {
      console.log(url)
      text = text.substr(0, j + 3) + 'image[' + url + ']' + text.substr(j + 3)
      set.add(fileName)
    }
    i = end
  } else {
    const newPos = text.indexOf(html.substr(i, 3), j)
    j = newPos >= 0 ? newPos : j
  }
}
console.log(text)
 */
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/local/Caskroom/google-chrome/latest/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    devtools: true
  })
  const page = await browser.newPage()
  await page.goto('https://www.zhihu.com/question/295729108/answer/728565418')

  const title = await page.$eval('.QuestionHeader-title', item => item.innerText)
  const reply = await page.$eval('.RichContent > .RichContent-inner', item => item.innerHTML)
  const author = await page.$eval('.AuthorInfo-name', item => item.innerText)
  const up = await page.$eval('.VoteButton', item => item.innerText)
  console.log(author)
  console.log(up)
  await browser.close()
})()