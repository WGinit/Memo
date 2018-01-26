//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const shareData = require('../../utils/shareData.js')

Page({
  data: {
    height: 20,
    option:'编辑',
    topText: true,
    isEdit: false,
    isShow: false,
    isNull: true,
    primarySize: 'default',
    memoLists: [],
    delLists: [],
    newLists: [],
    allLength: '0',
    checkboxLength: '',
    btnText: '删除全部',
    delFunc: 'delAllMemo'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    try {
      var value = wx.getStorageSync('memoLists');
      if (value) {
        that.data.memoLists.push(value)
        that.setData({
          memoLists: that.data.memoLists,
          allLength: util.count(that.data.memoLists[0]),
          isNull: false
        })
      }else{

      }
    } catch (e) {
      wx.showToast({
        title: '获取数据失败',
        icon: 'none',
        duration: 1500
      })
    };

    // 小程序置顶
    wx.setTopBarText({
      text: '白山羊备忘录，帮你记录会话中的任务。'
    })
  },

  // 使用说明
  instruction: function(){
    wx.showModal({
      title: '关于备忘录',
      content: '记录重要的会话消息(任务，网址，地址等等)，避免消息过多而被疏漏。所有信息均将保存到手机缓存中，他人无法获取，可放心使用。有任何建议、意见欢迎拍砖至Wginit@163.com',
      showCancel: false,
      confirmText: '知道了',
      success: function (res) {

         console.log('用户点击确定')
        
      }
    })
  },
  // 编辑列表
  editCheckBox: function(e) {
    var that = this;
    this.setData({
      topText: (!that.data.topText)
    })
    if(this.data.topText){
      this.setData({
        option: '编辑',
        isEdit: false,
        isShow: false
      })
    }else{
      this.setData({
        option: '取消',
        isEdit: true,
        isShow: true
      })
    }
  },

  // 添加备忘录，跳转到新页面
  addMemoLists: function(){
    wx.redirectTo({
      url: '/pages/add/add'
    })
  },

  //选择单条记录  
  checkboxChange: function (e) {
    try {
      wx.setStorageSync('delLists', e.detail.value)
    } catch (e) {
      wx.showToast({
        title: '保存失败',
        icon: 'error',
        duration: 2000
      })
    }
    
      this.setData({
        checkboxLength: e.detail.value.length,
        btnText: '删除'+e.detail.value.length+ '条',
        delFunc: 'delMemoLists'
      });
      if(this.data.checkboxLength == 0){
        this.setData({
          btnText: '删除全部',
          delFunc: 'delAllMemo'
        })
      }
    
  },

  // 删除全部备忘录
  delAllMemo: function(){
    var that = this;
    wx.showModal({
      title: '删除全部',
      content: '确认删除'+that.data.allLength+'条记录吗?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 500
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }, 500);
        }
      }
    })
  },
  // 删除单条备忘记录
  delMemoLists: function(e) {
    var that = this;
      try {
        wx.showModal({
          title: '',
          content: '确认删除这' + that.data.checkboxLength+'条吗?',
          success: function (res) {
            if (res.confirm) {
                try {
                  var delValue = wx.getStorageSync('delLists');
                  // 数组从大到小排序
                  delValue.sort(function (a, b) {
                    return a < b;
                  })
                  
                  if (delValue) {
                    if (that.data.allLength == that.data.checkboxLength) {
                      //wx.clearStorageSync();
                      wx.removeStorage({
                        key: 'memoLists'
                        
                      });
                      
                    }else{
                    for(var i=0; i<delValue.length; i++){
                        try {
                          that.data.memoLists[0].splice(delValue[i] - 1, 1);   //删除指定下标的值
                          wx.setStorageSync('memoLists', that.data.memoLists[0]);   //异步更新列表缓存
                          wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 500
                          });
                        } catch (e) { }
                      }
                    }
                    // 删除后刷新页面
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/index/index'
                      });
                    }, 500);

                  } else {
                    wx.showToast({
                      title: '获取数据失败',
                      icon: 'none',
                      duration: 1000
                    });
                  }
                } catch (e) {
                  wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            } 
        })
        
      } catch (e) {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1500
        })
      }
  },

  // 分享
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
