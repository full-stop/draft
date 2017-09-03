# share.js #

## 简介 ##
根绝自己工作量身定做的轻量级分享插件。

## 使用说明 ##

```javascript
new share({
    dom:document.getElementById('box'),
    url:'http://www.xxxx.com',
    title:'分享的标题',
    desc:'分享的描述',
    images:'http://mobile.qq.com/qrcode?url=text&width=150&height=150',
    qrcode:'http://mobile.qq.com/qrcode?url=text&width=150&height=150',
    target:'blank',    
    qqzone:{ //单独配置qq空间的分享参数。
        summary:'这是一个摘要',
        site:'http://www.xxx.com',
        images:'http://mobile.qq.com/qrcode?url=text&width=150&height=150'
    }
});
```

## API说明 ##

|-- dom [object]        ：指定生成分享组件的dom对象。
|-- type [array]            ：指定分享的类型。默认值为空数组，表示生成全部的分享类型。
    |- weibo [string]      ：分享到新浪微博。
    |- qqweibo [string]    ：分享到QQ微博。
    |- qq [string]         ：分享到QQ好友。
    |- qqzone [string]     ：分享到QQ空间。
    |- wx [string]         ：分享到微信中去。
    |- rr [string]        ：分享到人人网。
    |- bdtb [string]    ：分享到百度贴吧。
    |- db [string]        ：分享到豆瓣。
    |- qqpy [string]      ：分享到朋友网。
    |- kx [string]        ：分享到开心网。
|-- url [string]             ：通用的分享链接。
|-- title [string]        ：通用的分享标题。
|-- desc [string]        ：通用的分享描述。
|-- image [string]         ：通用的分享图片。
|-- qrcode [string]         ：设置微信的二维码。
|-- target [string]         ：设置微信二维码的打开方式。
    |- self            ：当前位置显示。
    |- blank            ：弹出层打开。
|-- weibo [object]        ：单独设置新浪微博分享的参数。
    |- url             ：单独设置新浪微博分享的url。
    |- title            ：单独设置新浪微博分享的标题。
    |- images            ：单独设置新浪微博分享的图片。
 |-- qqweibo [object]    ：单独设置QQ微博分享的参数。
    |- url             ：单独设置QQ微博分享的url。
    |- title            ：单独设置QQ微博分享的标题。
    |- images            ：单独设置QQ微博分享的图片。
|-- qq [object]            ：单独设置QQ分享的参数。
    |- url             ：单独设置QQ分享的url。
    |- title            ：单独设置QQ分享的标题。
    |- desc            ：单独设置QQ分享的描述。
    |- summary        ：单独设置QQ分享的摘要。
    |- site            ：单独设置QQ分享的来源。
    |- images            ：单独设置QQ分享的图片。
|-- qqzone [object]        ：单独设置QQ空间分享的参数。
    |- url             ：单独设置QQ空间分享的url。
    |- title            ：单独设置QQ空间分享的标题。
    |- desc            ：单独设置QQ空间分享的描述。
    |- summary        ：单独设置QQ空间分享的摘要。
    |- site            ：单独设置QQ空间分享的来源。
    |- images            ：单独设置QQ空间分享的图片。
|-- rr [object]            ：单独设置人人分享的参数。
    |- url             ：单独设置人人分享的url。
    |- title            ：单独设置人人分享的标题。
    |- desc            ：单独设置人人分享的描述。
    |- images            ：单独设置人人分享的图片。
|--bdtb [object]        ：单独设置百度贴吧分享的参数。
    |- url             ：单独设置百度贴吧分享的url。
    |- title            ：单独设置百度贴吧分享的标题。
    |- desc            ：单独设置百度贴吧分享的描述。
    |- images            ：单独设置百度贴吧分享的图片。
|--db [object]            ：单独设置豆瓣分享的参数。
    |- url             ：单独设置豆瓣分享的url。
    |- title            ：单独设置豆瓣分享的标题。
    |- desc            ：单独设置豆瓣分享的描述。
    |- images            ：单独设置豆瓣分享的图片。
|--qqpy [object]         ：单独设置朋友网分享的参数。
    |- url             ：单独设置朋友网分享的url。
    |- title            ：单独设置朋友网分享的标题。
    |- desc            ：单独设置朋友网分享的描述。
    |- summary        ：单独设置朋友网分享的摘要。
    |- images            ：单独设置朋友网分享的图片。
|--kx [object]         ：单独设置开心分享的参数。
    |- url             ：单独设置豆瓣分享的url。
    |- title            ：单独设置豆瓣分享的标题。

## 关于微信二维码分享的动态生成 ##
可以使用腾讯提供的在线二维码生成服务 `http://mobile.qq.com/qrcode?url=text&width=150&height=150`。
将其作为`qrcode`参数的值，详情可参见[使用说明]。
