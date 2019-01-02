// pages/welcome/welcome.js
//获取实例
var app = getApp();
//引用js
var relationship = require("../../utils/relationship.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second_height: 0, //第二部分的高度
    screenData:"",
    male_src: "../images/male_checked.png",
    female_src: "../images/female.png",
    result:"",
    id1: "老公",
    id2: "老婆",
    id3: "back",
    id4: "clean",
    id5: "爸爸",
    id6: "妈妈",
    id7: "哥哥",
    id8: "弟弟",
    id9: "姐姐",
    id10: "妹妹",
    id11: "儿子",
    id12: "女儿",
    id13: "each",
    id14: "=",
    id15:"?",
    isTrue:false,
    sex:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 点击开关男|女
   */

  switchChange: function (e) {
    //console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    //通过判断true or false
    if (e.detail.value){ //true时为女
      //设置数据为选中
      this.setData({
        sex: 0
      })
    }else{
      //设置数据为选中
      this.setData({
        sex: 1
      })
    }
  },

  SexChame: function (event){
    var id = event.target.id;
    var male_src = this.data.male_src.toString();
    var female_src = this.data.female_src.toString();
    if(id=="male"){
      male_src ="../images/male_checked.png"
      female_src = "../images/female.png"
      this.setData({
        sex: 1
      })
    }else{
      male_src = "../images/male.png"
      female_src = "../images/female_checked.png"
      this.setData({
        sex: 0
      })
    }
    //设置数据
    this.setData({
      male_src: male_src,
      female_src: female_src
    })
  },


  /**
   * 点击按钮事件
   */
  clickButton: function (event) {
    console.log(event);
    //获取屏幕内容
    var data = this.data.screenData.toString();
    // console.log(data);
    //获取屏幕结果内容
    var dataResult = this.data.result.toString();
    //获取点击的id
    var id = event.target.id;
    if (id == this.data.id3) { //如果是X 后退则清除两个字符
      
        //如果屏幕只有 "我" 则不处理
        if(data){
          var data = data.substring(0, data.length - 3);
          //需要重新计算关系
          var result = relationship({ text: data, sex: this.data.sex, reverse: false, type: 'default' });
          dataResult = result;
        }

       
     //   console.log(data);
    } else if (id == this.data.id4) { //AC操作 清空屏幕
        data = "";
        dataResult = "";
    }else{ //点击其他操作
      if(data){
        var data = data.substring(0, data.length);
        // console.log(data);
        var result = relationship({ text: data, sex: this.data.sex, reverse: false, type: 'default' });
        console.log(result);
      }
      if (id == this.data.id14){//点击 = 处理
        //如果字数大于26个则不要增加and提示关系态复杂啦
        if (data.length >= 26) {
          //console.log("字数超出限制");
          dataResult = "这么复杂？是想测我的bug？";
          return ;
        }
        //计算公式，核心算法
        //修改屏幕结果为result
        dataResult = result;
      }else if (id == this.data.id13) { //互查操作  Ta称呼我
        //如果字数大于26个则不要增加and提示关系态复杂啦
        if (data.length >= 26) {
          //console.log("字数超出限制");
          dataResult = "这么复杂？是想测我的bug？";
          return;
        }
        //this.data.isTrue
        if (this.data.isTrue){ //一开始为false
          result = relationship({ text: data, sex: this.data.sex, reverse: false, type: 'default' });
          //设置数据
          this.setData({
            isTrue: false
          })
        }else{
          result = relationship({ text: data, sex: this.data.sex, reverse: true, type: 'default' });
          //设置数据
          this.setData({
            isTrue: true
          })
        }
        //修改屏幕结果为result
        dataResult = result;
      }else if (id == this.data.id15){ //点击问号跳转自我介绍
        wx.redirectTo({
          url: '../../pages/about/about',
        }) 
      }else{
        //如果字数大于26个则不要增加and提示关系态复杂啦
        if(data.length>=26){
            //console.log("字数超出限制");
          dataResult = "这么复杂？是想测我的bug？";
        }else{
          if (((this.data.sex == 1 && id == this.data.id1 && data == '') || (this.data.sex == 0 && id == this.data.id2 && data == ''))){
            data = id;
            dataResult = "难道你是~弯的？";
          }else{
            console.log("enter")
            data = data ? data + "的" + id : id;
            console.log(data)
            //需要重新计算关系
            result = relationship({ text: data, sex: this.data.sex, reverse: false, type: 'default' });
            if( this.isNull(result) ){ //结果为空
                result = "关系有点乱~";
            }
            dataResult = result;
          }
        }
        }
    } 



    //设置数据
    this.setData({
      screenData: data,
      result: dataResult
    })
  },
  //判断结果是否为空，若是则输出关系太复杂了
  isNull: function (result){
      if(result.length==0){
        return true;
      }
      return false;
  }

})

