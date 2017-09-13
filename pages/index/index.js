//index.js
//获取应用实例
const app = getApp().globalData

Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {

    //1.登录
    wx.login({
      success: res => {
        // 2.发送 res.code 到后台换取 openId
        wx.request({
          url: app.apiUrl + '/login/',
          data: {
            code: res.code
          },
          header: {},
          method: 'POST',
          dataType: '',
          success: res => {
            app.userInfo = res.data
            //3.获取userinfo
            wx.getUserInfo({
              success: res => {
                console.log(res.userInfo)
                //4.更新userInfo
                wx.request({
                  url: app.userInfo.url,
                  data: {
                    name:res.userInfo.nickName,
                    avatar:res.userInfo.avatarUrl,
                    gender:res.userInfo.gender
                  },
                  header: {},
                  method: 'PATCH',
                  dataType: '',
                  success: res=> {
                    console.log(res.data)
                    app.userInfo=res.data
                  },
                })
              }
            })
          }
        })
      }
    })
  },

  getGoods:function(){
    
  }

})
