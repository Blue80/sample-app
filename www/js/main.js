'use strict';

{
  let currentIndex = 0;
    let tapCount = 0;

    const colors = [
        {img: 'image/pic00.png', name: "画像0"},
        {img: "image/pic01.png", name: "画像1"},
        {img: "image/pic02.png", name: "画像2"},
        {img: "image/pic03.png", name: "画像3"},
        {img: "image/pic04.png", name: "画像4"},
        {img: "image/pic05.png", name: "画像5"},
        {img: "image/pic06.png", name: "画像6"},
        {img: "image/pic07.png", name: "画像7"},
      ];

  document.addEventListener("DOMContentLoaded", (event) => {
    const main = document.getElementById('main');
  });

  document.addEventListener('init', () => {
    let page = event.target;

    if(page.matches('#top-page')){
      page.querySelector('#btn').onclick = function() {
        document.querySelector('#navigator').pushPage('slide.html');
      };

    }else if(page.matches('#slide-page')){
      main.src = shuffleimages[currentIndex].img;
      play();
      if(currentIndex == shuffleimages.length - 1){
        clearTimeout(timeoutId);
      }

    }else if(page.matches('#select-page')){
      setName();

      page.querySelector('#reset').onclick = function() {
        tapCount = 0;
        document.getElementById('check').classList.add('cannot');
        // console.log(lists);
        // console.log(selectNames);
        lists.forEach((list, index) => {
          const elLi = list.elem;
          elLi.textContent = selectNames[index].name; 
          //押したli要素の名前を元に戻す
          elLi.classList.remove('tapped');
        });
        lists.splice(0);
        selectNames.splice(0);

        console.log(lists);
        console.log(selectNames);
      }

      page.querySelector('#check').onclick = function() {
        if(tapCount !== colors.length){
          return;
        }
        document.querySelector('#navigator').pushPage('last.html');
      };

    }else if(page.matches('#last-page')){

      const p = document.querySelector('#judge');
      shuffleimages.forEach((shuffleimage, index) => {
        if(shuffleimage.name === selectNames[index].name){
          p.textContent = "完璧";
        }else{
          p.textContent = "残念";
        }
      });

      selectNames.forEach((selectName) => {
        for(let i = 0; i < colors.length; i++){
          if(selectName.name === colors[i].name){
            selectName.img = colors[i].img;
          }
        }
      });

      const answer = document.getElementById('answer');
      shuffleimages.forEach((shuffleimage) => {
        const li = document.createElement('li');
        li.classList.add('row');
        const img = document.createElement('img');
        img.src = shuffleimage.img;
        li.appendChild(img);
        answer.appendChild(li);
      });

      const myAnswer = document.getElementById('my-answer');
      selectNames.forEach((selectName) => {
        const li = document.createElement('li');
        li.classList.add('row');
        const img = document.createElement('img');
        img.src = selectName.img;
        li.appendChild(img);
        myAnswer.appendChild(li);
      });

      page.querySelector('#last').onclick = function() {
        document.querySelector('#navigator').resetToPage('top.html', {animation: "default"});
      };

    }  
  });



  let timeoutId
  function play(){
    if(currentIndex == shuffleimages.length - 1){
      setTimeout(() => {
        document.querySelector('#navigator').pushPage('select.html');
      }, 100);
      return;
    }
    timeoutId = setTimeout(() => {
      main.src = shuffleimages[currentIndex].img;
      play();
    }, 100);
    currentIndex++;
  }


  function shuffle(arr) {
    let i = arr.length - 1; 
  
    for(i; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1)); 
      [arr[j], arr[i]] = [arr[i], arr[j]]; 
    }
    return arr;
  }

  const shuffles = shuffle([...colors]);
  const shuffleimages = [...shuffles];


  let selectNames = [];
  let lists = [];
  function setName() {
    colors.forEach((color) => {
      const li = document.createElement('li');
      li.textContent = color.name;
      document.querySelector('.select').appendChild(li);

      li.addEventListener('click', () => {
        if(li.classList.contains('tapped')){
          return;
        }

        tapCount++;
        li.classList.add('tapped');
        li.textContent = tapCount;
        lists.push({elem: li, tap: tapCount});
        selectNames.push({name: color.name, tap: tapCount});
        console.log(selectNames);
        if(tapCount === colors.length){
          document.getElementById('check').classList.remove('cannot');
        }
      });
    });
  }
}