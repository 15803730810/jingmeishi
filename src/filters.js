// 存放过滤器相关代码
export function date(timestamp) {
  //服务器传递的时间戳是字符串类型, 无法转换日期, 需要人为转成数字
  timestamp = parseInt(timestamp);
  let date = new Date(timestamp);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;
}
