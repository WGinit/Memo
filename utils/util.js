const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function add0(m) { return m < 10 ? '0' + m : m }
const format = date => {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(date);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
// 获取数组、对象的长度
const  count = obj => {
  var objType = typeof obj;

  if (objType == "string") {
    return obj.length;
  } else if (objType == "object") {
    var objLen = 0;
    
    for (var i in obj) {
      objLen++;
    }
    return objLen;
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  format: format,
  count: count
}
