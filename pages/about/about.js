// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //保存图片
  saveImg: function (e) {
    var _this = this;
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功");
              var imgUrl = "https://coding.net/u/liecol/p/liecol/git/raw/xcx/qqcx_share.png";
              wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            },
            fail: function (res) {
              console.log(res.errMsg + "enter")
                console.log("打开设置窗口");
                // wx.openSetting({
                //   success(settingdata) {
                //     console.log(settingdata)
                //     if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                //       console.log("获取权限成功，再次点击图片保存到相册")
                //     } else {
                //       console.log("获取权限失败")
                //     }
                //   }
                // })
              wx.showToast({
                title: '请开启授权设置',
                icon: 'loading',
                duration: 1500,
                mask: false
              })
            }
          })
        }
      })
  },
})