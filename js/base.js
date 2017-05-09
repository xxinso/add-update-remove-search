(function (window) {
  // 1.创建构造函数
  function ZSGC() {
    this.data = [{
        name: "张xx",
        num: 1,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "邹xx",
        num: 3,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "王xx",
        num: 2,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "伍xx",
        num: 4,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "周xx",
        num: 4,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "周xx",
        num: 4,
        money: 123,
        time: "2013-12-15"
      },
      {
        name: "周xx",
        num: 4,
        money: 123,
        time: "2013-12-15"
      },
    ];

    // 获取数据先将数据清空
    this.html = "";
    // 获取元素
    this.tableBody = document.getElementById("table_body");
    this.selects = document.getElementById("s_select").children;
    this.nowPageEle = document.getElementById("nowPage");
    this.nowPa = parseInt(document.getElementById("nowPage").innerHTML);
    this.totalPage = document.getElementById("totalPage").innerHTML;
    // 填入表格的内容
    this.donatePerson = document.getElementById("donate_person");
    this.companey = document.getElementById("b_select");
    this.money = document.getElementById("money");
    this.time = document.getElementById("time");
    this.newPerson = document.getElementById("person_but");
    // 获取删除
    this.reMove = document.getElementsByClassName("reMove");
    this.id=0;
    // 传入到函数中去
    this.addata();
    // this.returndata(this.data);
    this.fenye();
    // this.removedata();

  }
  // 2.添加数据
  ZSGC.prototype.addata = function () {

    //2.1将外面的this变为that
    var that = this;
    // 2.2添加点击事件
    this.newPerson.onclick = function () {
      var newdata = {

        name: that.donatePerson.value,
        num: parseInt(that.companey.value),
        money: that.money.value,
        time: that.time.value
      };
      that.data.push(newdata);
      console.log(that.data);

      // that.fenye();

      // that.returndata(newdata);
      // 2.3清空输入框的数据
      that.donatePerson.value = "";
      that.companey.value = "";
      that.money.value = "";
      that.time.value = "";
    }
  }
  // 3.删除数据
  ZSGC.prototype.removedata = function (idNum) {
    console.log(1);
    //  for(var i=0;i<this.reMove.length;i++)
    //  //3.1点击删除按钮触发事件
    //   this.reMove[i].onclick=function(){
    //   this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

    // 1.找到元素的id
    // for(var i=0;i<this.reMove.length;i++){
    var that = this;
    this.id=0;
    //  this.reMove[i].onclick=click;
    //  console.log(this.reMove[i]);
    // }
    // function click(thiss){
    //   console.log(1);
    //  var idNum=thiss.parentNode.parentNode.firstChild.innerHTML;
    //  console.log(idNum);
    // 2.在原型的数组中删除这个对象
    that.data.splice(idNum - 1, 1);
    // 3.调用添加元素，并设置id;
    // that.id = 1;
    that.fenye();
    //  }
  }

  // 1.创建后台数据
  ZSGC.prototype.returndata = function (data) {
    //1.获取原型中的数据

    //  1.1遍历数据获取元素
    this.html = "";
   
    for (var i = 0; i < data.length; i++) {
      this.id++;
      var name = data[i].name;
      var comp = this.selects[data[i].num].innerHTML;
      var money =data[i].money;
      var time = data[i].time;

      // 1.2拼接字符串
      this.html +=
        "<tr >" +
        "<td>" + this.id + "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + comp + "</td>" +
        "<td>" + money + "</td>" +
        "<td>" + time + "</td>" +
        "<td><a href='javascript:void(0);' onclick='change(this)'>编辑</a>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0);' class='reMove' onclick='del(this)'>删除</a></td>" +
        "</tr>";
      // console.log(this.html);
    }
    //1.3将拼接的字符转转义到页面上
    this.tableBody.innerHTML = this.html;
  };
  // 修改元素
  ZSGC.prototype.update = function (tds) {
    // 1.遍历获取到的元素
    console.log(1);
    for (var i = 1; i < tds.length - 1; i++) {
      // 2.1获取到点击的tr中的每个元素的值
      var Value = tds[i].innerHTML;
      //2.将每个里面的元素改为输入框
      tds[i].innerHTML = "<input class='update' value='" + Value + "'>";
    }
    // 3.修改最后一个输入框中的文字
    tds[tds.length - 1].innerHTML = "<a href='javascript:void(0);'onclick='com(this)'>完成</a>" +
      "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0);' class='reMove' onclick='giveup()'>放弃</a>";

  }
  ZSGC.prototype.compelite = function (tds) {
    for (var i = 1; i < tds.length - 1; i++) {
      var Value = tds[i].firstChild.value;
      tds[i].innerHTML = Value;
    }
    tds[tds.length - 1].innerHTML = "<a href='javascript:void(0);' onclick='change(this)'>编辑</a>" +
      "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0);' class='reMove'  onclick='del(this)'>删除</a>";
  }

  // 分页处理数据
  ZSGC.prototype.fenye = function () {
   
    // 1.一页的数量
    this.pageSize = 5;
    // 2.所有对象的总数
    this.num = this.data.length;
     
    // 3.页数
    this.pageNum = Math.ceil(this.num / this.pageSize);
    console.log(this.nowPa);
    // 4.创建一个新数组，将要显示的页面放到数组中去
    var newArr = [];
    // 5.用for循环将需要的数组添加到新建的数组中
    if (this.nowPa == this.pageNum) {
      for (var j = (this.nowPa - 1) * 5; j < this.num; j++) {
           newArr.push(this.data[j]);
      }
    } else {
      for (var i = (this.nowPa - 1) * 5; i < this.nowPa * 5; i++) {
        console.log(this.nowPa);
        newArr.push(this.data[i]);
      }
    }
    console.log(newArr);
    this.returndata(newArr);

  };
  // 跳转到上一页处理的事件
  ZSGC.prototype.prev = function () {
    this.nowPa--;
    if (this.nowPa < 1) {
      this.nowPa = 1;
      alert("已经是第一页了");
      return;
    }
    //将数据返回到页面
     // 将id变为前一页的最后一个数字
    this.id=(this.nowPa-1)*5;
    this.fenye();
    this.nowPageEle.innerHTML = this.nowPa;
  }
  // 跳转到下一页
  ZSGC.prototype.next = function () {
    this.nowPa++;
    // 判断当前页面时候大于压面总数
    if (this.nowPa > this.pageNum) {
      this.nowPa = this.pageNum;
      alert("已经是最后一页了");
      return;
    }
    //将数据返回到页面
    // 将id变为前一页的最后一个数字
    this.id=(this.nowPa-1)*5;
    this.fenye();
    this.nowPageEle.innerHTML = this.nowPa;
  }
  // 查询事件
  ZSGC.prototype.search=function(){
      // 1.找到搜索框中的value;
   var searchVa=document.getElementById("s_select").value;
    var searchArr=[];
    for(var i=0;i<this.data.length;i++){
          if(this.data[i].num==searchVa){
            searchArr.push(this.data[i]);
          }         
    }
    
    this.data=searchArr;
    this.id=0;
    this.fenye();
  }



  window.ZSGC = ZSGC;
})(window)

//上一页和下一页处理




//  var