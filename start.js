const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 28;
const select = [];

function calResult(){
  var pointArray = [
    { name: 'Estyle', value: 0, key: 2000},
    { name: 'Istyle', value: 0, key: 1000},
    { name: 'Nstyle', value: 0, key: 200},
    { name: 'Sstyle', value: 0, key: 100},
    { name: 'Fstyle', value: 0, key: 20},
    { name: 'Tstyle', value: 0, key: 10},
    { name: 'Jstyle', value: 0, key: 2},
    { name: 'Pstyle', value: 0, key: 1},
  ]

  for(let i = 0; i<endPoint; i++){
    var target = qnaList[i].a[select[i]];
    for(let j = 0; j<target.type.length; j++){
      for(let k = 0; k < pointArray.length; k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1;
        }
      }
    }
  }
  var resultArray = pointArray.sort(function(a,b){
    if(a.value > b.value){
      return -1;
    }
    if(a.value < b.value){
      return 1;
    }
    return 0;
  });

  return resultArray;

}
function calMBTI(){
  let resultMBTI = calResult()[0].key + calResult()[1].key + calResult()[2].key +calResult()[3].key;
  if(resultMBTI === 1212){
    return 0;
  }
  if(resultMBTI === 1211){
    return 1;
  }
  if(resultMBTI === 2212){
    return 2;
  }
  if(resultMBTI === 2211){
    return 3;
  }
  if(resultMBTI === 1222){
    return 4;
  }
  if(resultMBTI === 1221){
    return 5;
  }
  if(resultMBTI === 2222){
    return 6;
  }
  if(resultMBTI === 2221){
    return 7;
  }
  if(resultMBTI === 1112){
    return 8;
  }
  if(resultMBTI === 1122){
    return 9;
  }
  if(resultMBTI === 2112){
    return 10;
  }
  if(resultMBTI === 2122){
    return 11;
  }
  if(resultMBTI === 1111){
    return 12;
  }
  if(resultMBTI === 1121){
    return 13;
  }
  if(resultMBTI === 2111){
    return 14;
  }
  if(resultMBTI === 2121){
    return 15;
  }

}
function setResult(){
  let point = calMBTI();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'image-'+point+'.jpg';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;

}
function goResult(){
  qna.style.display =" none";
  result.style.display = "block";

  setResult();
}
function addAnswer(answerText, qIdx, idx){
  var a =document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  a.appendChild(answer);
  answer.innerHTML= answerText;

  answer.addEventListener("click",function(){
    var children = document.querySelectorAll('.answerList');
    select[qIdx] = idx;
    for(let i=0; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.display = 'none';
    }
    goNext(++qIdx);
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) +'%';
}
function begin(){
  main.style.display ="none";
  qna.style.display="block";
  let qIdx = 0;
  goNext(qIdx);
}
