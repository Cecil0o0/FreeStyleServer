### 统一版本前缀
<code>/v1</code>

### 中文韵脚查词
<code>/free-style/:keyWordParam/:searchTypeParam</code>

> // 搜索类型(全压，单压，英文韵脚)
'full','single','en'

ex.
[/v1/free-style/你好/full](http://qingf.me:3000/v1/free-style/你好/full)

### 百度图像识别
<code>/baidu-aip/imageClassify/:category</code>

ex.
[/v1/baidu-aip/imageClassify/car?url=https://www.enterprise.co.uk/content/dam/global-vehicle-images/cars/VAUX_INSI_2014.png](http://qingf.me:3000/v1/baidu-aip/imageClassify/car?url=https://car3.autoimg.cn/cardfs/product/g14/M0C/CF/94/1024x0_1_q87_autohomecar__wKgH1VlBDSqAfqpuAAnlqDc2tO8436.jpg)

### 摩斯密码编解码
<code>/morse/encode/:str</code>  

ex.
[/v1/morse/encode/英雄](http://qingf.me:3000/v1/morse/encode/英雄)

<code>/morse/decode/:code</code>

ex.
[/v1/morse/decode/-.....-.----...-%2F-..-.--.--...-..](http://qingf.me:3000/v1/morse/decode/-.....-.----...-%2F-..-.--.--...-..)

### 在线小说(支持斗破苍穹，斗罗大陆，琴帝)

<code>/v1/novels/:name/:id</code>

ex.
[/v1/novels/dpcq/1](http://qingf.me:3000/v1/novels/dpcq/1)

OR

ex.
[http://novel.qingf.me/dpcq/1](http://novel.qingf.me/dpcq/1)
