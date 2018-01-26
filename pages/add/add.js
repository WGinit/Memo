// pages/add/add.js
const util = require('../../utils/util.js')
const shareData = require('../../utils/shareData.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      value: '',
      time:'',
      memoLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;

    try {
      var value = wx.getStorageSync('memoLists')
      if (value) {
        that.setData({
           memoLists: value
        })
      }
    } catch (e) {}
 
  },
  // 返回首页
  back: function(){
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  // 获取备忘录标题
  memoTitle: function(e){
    this.setData({
      title: e.detail.value
    })  
  },
  // 获取备忘录详细值
  getMemoValue: function(e) {
    this.setData({
      value: e.detail.value
    })
  },

 //保存备忘录 
  saveMemo: function(){
    var that = this;
    var stamp = +new Date();  //获取时间戳
    var time = util.format(stamp);  // 转换成标准时间格式
    var title = that.data.title;
    var memo_value = that.data.value;
  
    if (title == ''){
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000
      })
    }
    // else if (memo_value == '' ){
    //   wx.showToast({
    //     title: '请输入内容',
    //     icon: 'none',
    //     duration: 1000
    //   })
    // }
    else{

      that.data.memoLists.unshift({ "title": title, "text": memo_value, "time": time });
      
      try {
        wx.setStorageSync('memoLists', that.data.memoLists)
      } catch (e) {
        wx.showToast({
          title: '保存失败',
          icon: 'error',
          duration: 2000
        })
      }
      wx.redirectTo({
        url: '/pages/index/index'
      })
      
    }
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: shareData[Math.round(Math.random() * (shareData.length - 1))],
      path: '/pages/index/index',
      imageUrl: '../../assets/images/share.jpg',
      success: function (res) {
        console.log('已转发')
      },
      fail: function (res) {
        console.log('用户取消转发')
      }
    }
  }
})