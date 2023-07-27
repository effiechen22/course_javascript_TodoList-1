//宣告變數
const list = document.querySelector("#todoList");
let data = [
  {
    "content":"房間整理：找到地板，藏起所有雜物！",
    "isCompleted":false,
  },
  {
    "content":"每天健身計畫：下樓，上健身房，完成！",
    "isCompleted":true,
  },
  {
    "content":"在浴室舉辦演唱會，讓鄰居也能聆聽。",
    "isCompleted":false,
  },    
]  
render(); 

function render() { 
  let str="";
  const tab = document.querySelector('.tab');
  const selectedTab = document.querySelector('.active').textContent;

  let filteredData = data; // 未篩選的資料
  if (selectedTab === "待完成") {
    filteredData = data.filter(item => !item.isCompleted);
  } 
  else if (selectedTab === "已完成") {
    filteredData = data.filter(item => item.isCompleted);
  }

  filteredData.forEach(function(item, index) {
    // 根据过滤后的数据渲染待辦事項
    if (item.isCompleted==true){
      str+=`<li ><label class="checkbox" for=""><input type="checkbox" data-num="${index}" checked><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`;
    }
    else{
      str+=`<li ><label class="checkbox" for=""><input type="checkbox" data-num="${index}"><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`;}
  });

  //將資料內容顯示在表單上
  list.innerHTML = str;
  updateItemsTag();
};

//新增待辦
const inputTodo = document.querySelector(".inputTodo");
const btnAdd = document.querySelector("#btn_add");
btnAdd.addEventListener("click",function(){
  if (inputTodo.value==""){
    return;
  }else{    
    let addTodo={};
    addTodo.content = inputTodo.value;
    addTodo.isCompleted = false;
    data.push(addTodo);
    render();   
    inputTodo.value="";  
  };
});

//更新待辦事項的數量
function updateItemsTag(){  
  const todoItemsTag = document.querySelector('.todoItemsTag');
  const todoItemsArray = data.filter(function(item){
    return item.isCompleted === false;
  });
  todoItemsTag.textContent=`待完成 ${todoItemsArray.length}/${data.length}`;
}

//--------------//
//刪除待辦 & 勾選待辦後 狀態為完成
list.addEventListener("click",function(e){   
  // console.log(e.target.getAttribute("class"));  
  if (e.target.getAttribute("class")!=="delete" && e.target.getAttribute("type")!=="checkbox"){ 
    return;   
  } 
  else if (e.target.getAttribute("class")=="delete"){    
    //刪除待辦
    let num = e.target.getAttribute("data-num");    
    data.splice(num,1);
    render();   
    updateItemsTag();
  } 
  else if (e.target.getAttribute("type")=="checkbox"){    
    //勾選待辦後 狀態為完成
    this.checked = !this.checked;
    let num = e.target.getAttribute("data-num");  
    data[num].isCompleted = !data[num].isCompleted;
    updateItemsTag();
  }
});

//清除已完成項目
const clearCompleted = document.querySelector('.clearCompleted');
clearCompleted.addEventListener('click',function(e){
  const unCompletedData = data.filter(function(item){
    return item.isCompleted == false;
  });
  data=unCompletedData;
  render(data);  
});

//切換tab
const tab = document.querySelector('.tab');
tab.addEventListener("click", function(e) {  
  let tabs = document.querySelectorAll('.tab li');  

  // 設定currentTab樣式
  // 先將所有 li 元素的 class 屬性清除
  tabs.forEach(item => {
    item.removeAttribute("class");
  });
  e.target.setAttribute("class", "active");
  render();    
});


