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
let mode = 'aram'

const logInfo = (content) => {
  console.log("%c---------------------------------------------------------", 'color:pink');
  console.log(`%c------------------------%c${content}%c------------------------`, 'color:aqua', 'color:red', 'color:aqua');
  console.log("%c---------------------------------------------------------", 'color:pink');
}
logInfo('二次元别进');

// 校验输入的数值
const vaild = (num) => {
  if (num <= 0) {
    alert("请输入一个正整数")
    document.getElementById("number").value = 1
    return
  } else if (num > 20) {
    alert("不能太贪心哦,请输入一个小于或等于20的正整数")
    document.getElementById("number").value = 1
    return
  }
}


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

const randomChampionAddHtml = (num, mode, array) => {
  // console.log("当前roll次数设定为:"+num);
  vaild(num)

  const indexArr = []
  const randomArr = []
  for (let i = 0; i < num; i++) {
    let index = randomNum(1, array.length)
    while (indexArr.includes(index)) {
      index = randomNum(1, array.length)
    }
    indexArr.push(index)
    randomArr.push({
      key: array[index - 1].key,
      rank: index,
      championImg: array[index - 1].image_url,
      name: array[index - 1].name,
      tier: array[index - 1].average_stats.tier == 0 ? 'op' : array[index - 1].average_stats.tier,
      winRate: mode == 'aram' ? Number(array[index - 1].average_stats.win_rate * 100).toFixed(2) + '%' : Number(array[index - 1].average_stats.win / array[index - 1].average_stats.play * 100).toFixed(2) + '%',
    })
  }
  randomArr.sort((a, b) => a.rank - b.rank)
  randomArr.forEach(item => {
    const tr = document.createElement("tr");
    //设置a的关键属性
    tr.innerHTML =
      `
      <td class="rank">${item.rank}</td>
      <td class="champion"><a href="https://www.op.gg/modes/${mode}/${item.key}/build?region=global" target="_blank"><img src="${item.championImg}">${item.name}</a></td>
      <td class="tier"><img src="https://s-lol-web.op.gg/images/icon/icon-tier-${item.tier}.svg"></td>
      <td class="rate">${(item.winRate)}</td>
    `
      ;
    document.getElementById('tbody').appendChild(tr)
  })
}


// 1. 获取所有按钮元素
const btns = document.querySelectorAll('.modeButton');
btns[0].style.backgroundColor = '#5383e8';
btns[0].style.color = '#fff';
// btns得到的是伪数组  里面的每一个元素 btns[i]
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    // (1) 我们先把所有的按钮背景颜色去掉  干掉所有人
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.backgroundColor = '';
      btns[i].style.color = '#000';
    }
    // 第一个按钮aram，第二个按钮arena
    if (i == 0) {
      mode = 'aram'
    } else if (i == 1) {
      mode = 'arena'
    }
    clearResult()
    // (2) 然后才让当前的元素背景颜色为pink 留下我自己
    this.style.backgroundColor = '#5383e8';
    this.style.color = '#fff';

  }
}

// Button确认
const submit = () => {
  let num = document.getElementById("number").value
  console.log(mode);
  switch (mode) {
    case 'aram':
      randomChampionAddHtml(num, mode, aramChampionArr)
      break;
    case 'arena':
      randomChampionAddHtml(num, mode, arenaChampionArr)
      break;
    default:
      break;
  }

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

