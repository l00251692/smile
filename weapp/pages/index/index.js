//index.js
//获取应用实例
var ScanBar = require("../../biliang/scan/scanbar.js")

Page({
  data: {
    startStopEngine: '开始',
  },

  onLoad:function(){
    //1、创建对象
    this.scanBar = new ScanBar();

    this.scanBar.init();
    //2、传入需要展示的图标
    // this.scanBar.init(['../../images/icon_toutiao.svg', '../../images/icon_weibo.svg', '../../images/icon_sohu.svg', '../../images/icon_sina.svg', '../../images/icon_wangyi163.svg', '../../images/icon_zhihu.svg', '../../images/icon_ifeng.svg', '../../images/icon_weixin.svg', '../../images/icon_163news.png', '../../images/icon_baidu.png', '../../images/icon_cnr.png', '../../images/icon_teiba.png']);
  },

  onShow: function () {
    
  },

  //开始/结束按钮点击
  engineButtonTap: function () {
    let changeButtonStatus = this.data.startStopEngine == '开始' ? '结束' : '开始';
    let start = this.data.startStopEngine == '开始';

    this.setData({
      startStopEngine: changeButtonStatus,
    })

    if (start) {
      this.startScan();
    } else {
      this.stopScan();
    }
  },

  startScan: function () {
    //3、开始扫描
    this.scanBar.startScan();

    let progress = 0;
    this.timer = setInterval(function () {

      progress = progress + 20
      //4、设置进度
      this.scanBar.setProgress(progress);

      if (progress === 80) {
        this.scanBar.stopScan(true);
        clearInterval(this.timer);
        this.setData({
          startStopEngine: '开始',
        })
      }
    }.bind(this), 1000);
  },

  stopScan: function () {
    //5、停止扫描
    this.scanBar.stopScan(true);

    clearInterval(this.timer);
    this.setData({
      startStopEngine: '开始',
    })
  }
})
