'use strict';

{
  let currentIndex = 0;
  let tapCount = 0;
  let t; //画像の切り替え時間

    let colors = [
        {img: 'image/pic00.png', name: "画像0"},
        {img: "image/pic01.png", name: "画像1"},
        {img: "image/pic02.png", name: "画像2"},
        {img: "image/pic03.png", name: "画像3"},
        {img: "image/pic04.png", name: "画像4"},
        {img: "image/pic05.png", name: "画像5"},
        {img: "image/pic06.png", name: "画像6"},
        {img: "image/pic07.png", name: "画像7"},
      ];
  
  document.addEventListener('show', (event) => {
    let page = event.target;
    const images = document.getElementById('images');

    if(page.matches('#top-page')){
      
      if(images.hasChildNodes()){
        images.textContent = null;
      };

      console.log(colors);
      colors.forEach((color) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const p = document.createElement('p');
        img.src = color.img;
        p.textContent = color.name;
        li.appendChild(img);       
        li.appendChild(p);
        const btn = document.createElement('ons-button');
        btn.textContent = 'remove';
        li.classList.add('all');
        li.appendChild(btn);
        images.appendChild(li);
        
        btn.onclick = function() {
          for(let i = 0; i < colors.length; i++){
            if(p.textContent === colors[i].name){
              colors.splice(i, 1);
            }
          };
          li.parentNode.removeChild(li);
          console.log(colors);
        }
      });
      

      page.querySelector('#start').onclick = function() {
        document.querySelector('#navigator').pushPage('levels.html');
        console.log(colors);
      };

      page.querySelector('#add').onclick = function() {
        document.querySelector('#navigator').pushPage('add.html');
      };
    }
  });
      
  document.addEventListener('init', (event) => {
    let page = event.target;
    
    if(page.matches('#levels-page')){
      
      page.querySelector('#level1').onclick = function() {
        t = 1000;
        Initialization();
        document.querySelector('#navigator').pushPage('slide.html');
        console.log('level1');
      };

      page.querySelector('#level2').onclick = function() {
        t = 500;
        Initialization();
        document.querySelector('#navigator').pushPage('slide.html');
        console.log('level2');
      };

      page.querySelector('#level3').onclick = function() {
        t = 100;
        Initialization();
        document.querySelector('#navigator').pushPage('slide.html');
        console.log('level3');

      };

      page.querySelector('#level4').onclick = function() {
        t = 10;
        Initialization();
        document.querySelector('#navigator').pushPage('slide.html');
        console.log('level4');
      };
      page.querySelector('#random').onclick = function() {
        const levelNumber = Math.floor(Math.random() * 4 + 1);
        page.querySelector('#level' + String(levelNumber)).click();
      };



    }else if(page.matches('#add-page')){
      const file = document.getElementById('file');
      const imageName = document.getElementById('image-name');
      const addImage = document.getElementById('add-image');
      let imageFileName;

      file.addEventListener('change', (e) => {
        console.log(e.target.files);
        let imageFile = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(imageFile[0]);
        reader.onload = function(){
          imageFileName = reader.result;
          addImage.src = reader.result;
        }
      }, false);

      page.querySelector('#plus').onclick = function() {
        if(file.value === '' || imageName.value === '' ){
          return;
        }
        colors.push({img: imageFileName, name: imageName.value});
        console.log(colors);
        document.querySelector('#navigator').resetToPage('top.html', {animation: "default"});
      }




    }else if(page.matches('#slide-page')){
      shuffles = shuffle([...colors]);
      shuffleimages = [...shuffles];
      console.log(shuffleimages);
      const main = document.getElementById('main');
      main.src = shuffleimages[currentIndex].img;
      play();
      if(currentIndex == shuffleimages.length - 1){
        clearTimeout(timeoutId);
      }



    }else if(page.matches('#select-page')){
      setName();

      page.querySelector('#stop').onclick = function() {
        document.querySelector('#navigator').resetToPage('top.html', {animation: "default"});
      };

      page.querySelector('#reset').onclick = function() {
        tapCount = 0;
        document.getElementById('check').classList.add('cannot');
        lists.forEach((list, index) => {
          const elLi = list.elem;
          elLi.textContent = selectNames[index].name; 
          //押したli要素の名前を元に戻す
          elLi.classList.remove('tapped');
        });
        lists.splice(0);
        selectNames.splice(0);
      }

      
      
      page.querySelector('#check').onclick = function() {
        if(tapCount !== colors.length){
          return;
        }
        document.querySelector('#navigator').pushPage('last' + '.html');
      };

    }else if(page.matches('#last-page')){

      const p = document.querySelector('#judge');
      for(let i = 0; i < shuffleimages.length; i++){
        if(shuffleimages[i].name !== selectNames[i].name){
          p.textContent = "残念";
          break;
        }else{
          p.textContent = "完璧";
        }
      }

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

      const myAnswer = document.getElementById('your-answer');
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

  function Initialization(){
    currentIndex = 0;
    tapCount = 0;
    lists.splice(0);
    selectNames.splice(0);
  }

  let timeoutId;
  function play(){
    if(currentIndex == shuffleimages.length - 1){
      setTimeout(() => {
        document.querySelector('#navigator').pushPage('select.html');
      }, t);
      return;
    }
    timeoutId = setTimeout(() => {
      main.src = shuffleimages[currentIndex].img;
      play();
    }, t);
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

  
  let shuffles = [];
  let shuffleimages = [];


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
        if(tapCount === colors.length){
          document.getElementById('check').classList.remove('cannot');
        }
      });
    });
  }
}