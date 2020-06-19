'use strict';

{
  let currentIndex = 0;
  let tapCount = 0;
  let t; //画像の切り替え時間
  let number = 0; //variousかどうかの判定
  let various = []; 
  let lengthNumber;

 
  let colors = [];
  let games = [];

  let rainbow = [
      {img: 'image/pic00.png', name: "紫"},
      {img: "image/pic01.png", name: "水色"},
      {img: "image/pic02.png", name: "エメラルド"},
      {img: "image/pic03.png", name: "緑"},
      {img: "image/pic04.png", name: "黄緑"},
      {img: "image/pic05.png", name: "黄色"},
      {img: "image/pic06.png", name: "オレンジ"},
      {img: "image/pic07.png", name: "赤"},
    ];

  let characters = [
    {img: "image/characters/IMG_2744.PNG", name: "ルフィー"},
    {img: "image/characters/IMG_2745.PNG", name: "ゾロ"},
    {img: "image/characters/IMG_2746.PNG", name: "ナミ"},
    {img: "image/characters/IMG_2747.PNG", name: "ウソップ"},
    {img: "image/characters/IMG_2748.PNG", name: "サンジ"},
    {img: "image/characters/IMG_2749.PNG", name: "チョッパー"},
    {img: "image/characters/IMG_2750.PNG", name: "ロビン"},
    {img: "image/characters/IMG_2751.PNG", name: "フランキー"},
    {img: "image/characters/IMG_2752.PNG", name: "ブルック"},
    {img: "image/characters/IMG_2763.PNG", name: "ウッディ"},
    {img: "image/characters/IMG_2764.PNG", name: "バズ"},
    {img: "image/characters/IMG_2765.PNG", name: "ジェシー"},
    {img: "image/characters/IMG_2767.PNG", name: "ハム"},
    {img: "image/characters/IMG_2771.PNG", name: "エイリアン"},
    {img: "image/characters/IMG_2772.PNG", name: "ブルズアイ"},
    {img: "image/characters/IMG_2774.PNG", name: "ザーク"},
  ];

  let animals = [
    {img: "image/animals/animal00.jpg", name: "ホッキョクグマ"},
    {img: "image/animals/animal01.jpg", name: "フクロウ"},
    {img: "image/animals/animal02.jpg", name: "グリズリー"},
    {img: "image/animals/animal03.jpg", name: "テナガザル"},
    {img: "image/animals/animal04.jpg", name: "アシカ"},
    {img: "image/animals/animal05.jpg", name: "ヘラジカ"},
    {img: "image/animals/animal06.jpg", name: "シファカ"},
    {img: "image/animals/animal07.jpg", name: "リス"},
    {img: "image/animals/animal08.jpg", name: "ホッキョクギツネ"},
    {img: "image/animals/animal09.jpg", name: "ライオン"},
  ];

  let johnnys = [
    {img: "image/j/IMG_2787.PNG", name: "高橋優斗"},
    {img: "image/j/IMG_2788.PNG", name: "井上瑞稀"},
    {img: "image/j/IMG_2789.PNG", name: "橋本涼"},
    {img: "image/j/IMG_2790.PNG", name: "猪狩蒼弥"},
    {img: "image/j/IMG_2791.PNG", name: "作間龍斗"},
    {img: "image/j/IMG_2754.PNG", name: "重岡大樹"},
    {img: "image/j/IMG_2755.PNG", name: "桐山照史"},
    {img: "image/j/IMG_2756.PNG", name: "中間淳太"},
    {img: "image/j/IMG_2757.PNG", name: "神山智洋"},
    {img: "image/j/IMG_2758.PNG", name: "藤井流星"},
    {img: "image/j/IMG_2759.PNG", name: "濵田崇裕"},
    {img: "image/j/IMG_2760.PNG", name: "小瀧望"},
  ];

  document.addEventListener('show', (event) => {
    let page = event.target;
    
   if(page.matches('#levels-page')){
    page.querySelector('.home').onclick = function() {
      document.querySelector('#navigator').resetToPage('top.html');
    };

    page.querySelector('#go').onclick = function() {
      if(games.length === 0){
        return;
      }
      t = 1000;
      Initialization();
      console.log('level1');
    };
    

    const file = document.getElementById('file');
    const imageName = document.getElementById('image-name');
    const addImage = document.getElementById('add-image');
    const h2 = document.getElementById('image-list');
    const box = document.getElementById('box');
    const b = document.querySelector('#close-message');
    let imageFileName;

    if(number === 0){
      console.log('number is 0');

      h2.onclick = function() {
        if(h2.classList.contains('open')){
          h2.classList.remove('open');
          h2.textContent = '画像を表示する'
          box.style.display = 'none'
        }else{
          h2.classList.add('open');
          h2.textContent = '画像を非表示にする'
          box.style.display = 'block'
        }
      }

      b.onclick = function() {
        h2.classList.remove('open');
        h2.textContent = '画像を表示する'
        box.style.display = 'none'
      }

      const images = document.getElementById('images');
      colors.forEach((color, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const p = document.createElement('p');
        img.src = color.img;
        p.textContent = color.name;
        li.appendChild(img);       
        li.appendChild(p); 
        const btn = document.createElement('ons-button');
        btn.textContent = '追加する';
        li.classList.add('all');
        li.appendChild(btn);
        images.appendChild(li);
        for(let i = 0; i < games.length; i++) {
          if(games[i].name === color.name){
            btn.classList.add('added');
            btn.textContent = '取り消す';
            console.log('exist' + color.name);
          }
        }

        // modal
        const onsModal = document.createElement('ons-modal')
        const bigImg = document.createElement('img');
        const container = document.createElement('div');
        container.classList.add('modal_container');
        bigImg.classList.add('layout');
        bigImg.src = color.img;
        const closeButton = document.createElement('ons-button');
        closeButton.classList.add('close');
        closeButton.textContent = 'Close';
        container.appendChild(bigImg);
        container.appendChild(closeButton);
        onsModal.appendChild(container);
        const body = document.querySelector('body')
        body.appendChild(onsModal);

        img.onclick = function() {
          onsModal.show();
        }

        onsModal.querySelector('.close').onclick = function() {
          onsModal.hide();
        }
  
        btn.onclick = function() {
          if(btn.classList.contains('added')){
            btn.classList.remove('added');
            btn.textContent = '追加する';
            for(let i = 0; i < games.length; i++){
              if(p.textContent === games[i].name){
                games.splice(i, 1);
              }
            }
            console.log(colors);
            console.log(games);
          } else {
            games.push({img: color.img, name: color.name});
            btn.classList.add('added');
            btn.textContent = '取り消す'
            console.log(colors);
            console.log(games);
          }
        }
      });
  
      console.log(games); 
      
    }else{
      if(games.length === 0){
        console.log('make games[]');
        lengthNumber = Math.floor(Math.random() * 3 + 5);
        various = shuffle([...colors]);
        for(let i = 0; i < lengthNumber; i++){
          games.push(various[i]);
          console.log(games[i]);
        }
      }
      console.log('number is 1');
      h2.textContent = '何が出るかな';
    }

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
      games.push({img: imageFileName, name: imageName.value});
      addImage.src = '';
      imageName.value = '';
      console.log(colors);
      console.log(games);

      if(number === 0){
        const li = document.createElement('li');
        const img = document.createElement('img');
        const p = document.createElement('p');
        img.src = colors[colors.length - 1].img;
        p.textContent =  colors[colors.length - 1].name;
        li.appendChild(img);       
        li.appendChild(p); 
        const btn = document.createElement('ons-button');
        btn.textContent = '取り消す';
        btn.classList.add('added');
        li.classList.add('all');
        li.appendChild(btn);
        images.appendChild(li);
  
        btn.onclick = function() {
          if(btn.classList.contains('added')){
            btn.classList.remove('added');
            btn.textContent = '追加する';
            for(let i = 0; i < games.length; i++){
              if(p.textContent === games[i].name){
                games.splice(i, 1);
              }
            }
            console.log(games);
          } else {
            games.push({img: color.img, name: color.name});
            btn.classList.add('added');
            btn.textContent = '取り消す'
            console.log(games);
          }
        }
      }
    }

      page.querySelector('#level1').onclick = function() {
        if(games.length === 0){
          return;
        }
        t = 1000;
        Initialization();
        console.log('level1');
      };

      page.querySelector('#level2').onclick = function() {
        if(games.length === 0){
          return;
        }
        t = 700;
        Initialization();
        console.log('level2');
      };

      page.querySelector('#level3').onclick = function() {
        if(games.length === 0){
          return;
        }
        t = 500;
        Initialization();
        console.log('level3');
      };

      page.querySelector('#level4').onclick = function() {
        if(games.length === 0){
          return;
        }
        t = 300;
        Initialization();
        console.log('level4');
      };

      page.querySelector('#random').onclick = function() {
        if(games.length === 0){
          return;
        }
        let time = [1000, 700, 500, 300, 200];
        t = time[Math.floor(Math.random()*5)];
        Initialization();
        console.log('高速');
      };

      page.querySelector('#level1-ex').onclick = function() {
        setExplain('Level 1', '画像がゆっくり流れるよ！');
      };

      page.querySelector('#level2-ex').onclick = function() {
        setExplain('Level 2', 'Level1より早く画像が流れるよ！');
      };

      page.querySelector('#level3-ex').onclick = function() {
        setExplain('Level 3', 'Level2より早く画像が流れるよ！');
      };

      page.querySelector('#level4-ex').onclick = function() {
        setExplain('Level 4', 'Level3より早く画像が流れるよ！');
      };

      page.querySelector('#random-ex').onclick = function() {
        setExplain('random', 'レベルをランダムで決めるよ！');
      };

      const dialog = document.getElementById('dialog');
      dialog.querySelector('.close').onclick = function() {
        document.getElementById('dialog').hide();
      };
    }
    

  });

      
  document.addEventListener('init', (event) => {
    let page = event.target;

    if(page.matches('#top-page')){
      page.querySelector('#start').onclick = function() {
        document.querySelector('#navigator').pushPage('genre.html');
      };
      
      const onsModal = document.querySelector('ons-modal');
      const method1 = document.getElementById('method1');
      const method2 = document.getElementById('method2');
      const method3 = document.getElementById('method3');
      const method4 = document.getElementById('method4');

      page.querySelector('#how').onclick = function() {
        method1.show();
      };
      
      method1.querySelector('#next-modal1').onclick = function() {
        method2.show();
        method1.hide();
      };

      method1.querySelector('#close-modal1').onclick = function() {
        method1.hide();
      }

      
      method2.querySelector('#next-modal2').onclick = function() {
        method3.show();
        method2.hide();
      };

      method2.querySelector('#return-modal2').onclick = function() {
        method1.show();
        method2.hide();
      };

      method2.querySelector('#close-modal2').onclick = function() {
        method2.hide();
      }

      method3.querySelector('#next-modal3').onclick = function() {
        method4.show();
        method3.hide();
      };

      method3.querySelector('#return-modal3').onclick = function() {
        method2.show();
        method3.hide();
      };

      method3.querySelector('#close-modal3').onclick = function() {
        method3.hide();
      }

      method4.querySelector('#close-modal4').onclick = function() {
        method4.hide();
      };
      
      method4.querySelector('#return-modal4').onclick = function() {
        method3.show();
        method4.hide();
      };

    }else if(page.matches('#genre-page')){
      page.querySelector('#colors').onclick = function() {
        colors = rainbow;
        gameSet(colors);
      };
    
      page.querySelector('#characters').onclick = function() {
        colors = characters;
        gameSet(colors);
      };
    
      page.querySelector('#animals').onclick = function() {
        colors = animals;
        gameSet(colors);
      };
    
      page.querySelector('#jhonnys').onclick = function() {
        colors = johnnys;
        gameSet(colors);
      };
    
      page.querySelector('#various').onclick = function() {
        colors = rainbow.concat(characters);
        colors = colors.concat(animals);
        colors = colors.concat(johnnys);
        gameSet(colors);
        number = 1;
      };
    
    }else if(page.matches('#slide-page')){
      page.querySelector('.home').onclick = function() {
        clearTimeout(timeoutId);
        document.querySelector('#navigator').resetToPage('top.html');
      };

      shuffles = shuffle([...games]);
      shuffleimages = [...shuffles];
      console.log(shuffleimages);
      const main = document.getElementById('main');
      play();
      if(currentIndex === shuffleimages.length){
        clearTimeout(timeoutId);
      }




    }else if(page.matches('#select-page')){
      setName();

      page.querySelector('.home').onclick = function() {
        document.querySelector('#navigator').resetToPage('top.html');
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
        if(tapCount !== games.length){
          return;
        }
        document.querySelector('#navigator').pushPage('last.html');
      };

    }else if(page.matches('#last-page')){
      const p = document.querySelector('#judge');
      for(let i = 0; i < shuffleimages.length; i++){
        if(shuffleimages[i].name !== selectNames[i].name){
          p.textContent = "残念";
          p.style.fontFamily = 'Kaisho';
          break;
        }else{
          p.textContent = "完璧";
          p.style.fontFamily = 'Dakuten';
        }
      }

      selectNames.forEach((selectName) => {
        for(let i = 0; i < games.length; i++){
          if(selectName.name === games[i].name){
            selectName.img = games[i].img;
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
        document.querySelector('#navigator').resetToPage('top.html');    
      };

      page.querySelector('#again').onclick = function() {
        document.querySelector('#navigator').resetToPage('levels.html', {animation: "default"}); 
        if(number === 1){
          games = [];
          console.log('reset games[]' + games);
        }   
      };

    }  
  });

  function setExplain(level, text){
    const modal = document.getElementById('dialog');
    modal.show();
    modal.querySelector('h1').textContent = level;
    modal.querySelector('p').textContent = text;
  }

  function Initialization(){
    currentIndex = 0;
    tapCount = 0;
    lists.splice(0);
    selectNames.splice(0);
    document.querySelector('#navigator').pushPage('slide.html');
  }

  function gameSet(colors){
    document.querySelector('#navigator').pushPage('levels.html');
    games = [];
    number = 0;
    console.log(games);
    lengthNumber = Math.floor(Math.random() * 3 + 5);
    various = shuffle([...colors]);
    for(let i = 0; i < lengthNumber; i++){
      games.push(various[i]);
      console.log(various[i]);
    }
  }

  let timeoutId;
  function play(){
    if(currentIndex === shuffleimages.length){
      setTimeout(() => {
        document.querySelector('#navigator').pushPage('select.html');
      }, t);
      return;
    }
    timeoutId = setTimeout(() => {
      const main = document.getElementById('main');
      main.src = shuffleimages[currentIndex].img;
      console.log(currentIndex + ' ' + shuffleimages[currentIndex].name);
      currentIndex++;
      play();
    }, t);
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
    games.forEach((game) => {
      const li = document.createElement('li');
      li.textContent = game.name;
      document.querySelector('.select').appendChild(li);

      li.addEventListener('click', () => {
        if(li.classList.contains('tapped')){
          return;
        }
        // console.log(game.name);
        tapCount++;
        li.classList.add('tapped');
        li.textContent = tapCount;
        lists.push({elem: li, tap: tapCount});
        selectNames.push({name: game.name, tap: tapCount});
        if(tapCount === games.length){
          document.getElementById('check').classList.remove('cannot');
        }
      });
    });
  }
}