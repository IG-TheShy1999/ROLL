// import{championArr} from "./tierListData"

// import './tierListData.js'
// document.write("<script src='static/js/tierListData.js'></script>");
// http请求
// const Http = new XMLHttpRequest();
// const url='https://www.op.gg/_next/data/e-5T64yN45gAGOjTxNgTp/en_US/modes/aram.json';
// Http.open("GET", url);
// Http.send();

// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
// }


const logInfo = (content) => {
  console.log("%c---------------------------------------------------------", 'color:pink');
  console.log(`%c------------------------%c${content}%c------------------------`, 'color:aqua', 'color:red', 'color:aqua');
  console.log("%c---------------------------------------------------------", 'color:pink');
}
logInfo('二次元别进');

// //生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

const randomChanpionAddHtml = (num) => {
  // console.log("当前roll次数设定为:"+num);
  if (num <= 0) {
    alert("请输入一个正整数")
    document.getElementById("number").value = 1
    return
  } else if (num > 20) {
    alert("不能太贪心哦,请输入一个小于或等于20的正整数")
    document.getElementById("number").value = 1
    return
  }
  const indexArr = []
  const randomArr = []
  for (let i = 0; i < num; i++) {
    let index = randomNum(1, championArr.length)
    while (indexArr.includes(index)) {
      index = randomNum(1, championArr.length)
    }
    indexArr.push(index)
    randomArr.push({
      key:championArr[index - 1].key,
      rank: index,
      championImg:championArr[index - 1].image_url,
      name: championArr[index - 1].name,
      tier:championArr[index - 1].average_stats.tier,
      winRate:Number(championArr[index - 1].average_stats.win_rate*100).toFixed(2)+'%',
    })
  }
  randomArr.sort((a, b) => a.rank - b.rank)
  randomArr.forEach(item => {
    const tr = document.createElement("tr");
    //设置a的关键属性
    tr.innerHTML = 
    `
      <td class="rank">${item.rank}</td>
      <td class="champion"><a href="https://www.op.gg/modes/aram/${item.key}/build?region=global" target="_blank"><img src="${item.championImg}">${item.name}</a></td>
      <td class="tier"><img src="https://s-lol-web.op.gg/images/icon/icon-tier-${item.tier}.svg"></td>
      <td class="rate">${(item.winRate)}</td>
    `
    ;
    document.getElementById('tbody').appendChild(tr)
  })
}

// Button确认
const submit = () => {
  randomChanpionAddHtml(document.getElementById("number").value)
  // randomChanpion(document.getElementById("number").value)
}

// Button清除
const clearResult = () => {
  // console.log('hello');
  const result = document.getElementById('tbody')
  const child = result.childNodes
  for (let i = child.length - 1; i >= 0; i--) {
    result.removeChild(child[i])
  }
}

