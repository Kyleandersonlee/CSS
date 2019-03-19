!function(){
var view = document.querySelector("section.message")

var model = {
  save:function(name,content){
    var Message = AV.Object.extend('Message');
    var message = new Message();
   return  message.save({
      'name': name,
      'content':content
    })
  },
  init:function(){
    var APP_ID = 'JLJRYUv4zFqvj03kFWhy7xKs-gzGzoHsz';
    var APP_KEY = 'anBxSdLG7doBid9xw0o2wDQX';
    
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    })
  },
  fetch:function(){
   var query = new AV.Query('Message');
   return query.find();

  }
 
  
}

var controller = {
 view:null,
 model:null,
 messageList:null,
 init:function(model,view){
  this.model=model
  this.view=view
  this.messageList = document.querySelector('#messageList')
  this.form = view.querySelector('form') 
  this.model.init()
  this.bindEvent()
  this.loadMessage()
  
 },
 bindEvent:function(){
   this.form.addEventListener('submit',(e)=>{
    e.preventDefault()
    this.saveMessage()

   })
 },
 saveMessage:function(){
   let myForm = this.form;
   let content = myForm.querySelector('input[name=content]').value
   let name = myForm.querySelector('input[name=name]').value
   if(content===""&&name===""){
    alert("名字和内容不能为空");
   }
   else if(content===""&&name!==""){
     alert("内容不能为空")
   }
   else if(content!==""&&name===""){
    alert("姓名不能为空")
  }
   else{
   this.model.save(name,content).then(function(object){
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value=''
   })}
 },

 loadMessage:function(){
  this.model.fetch().then((messages)=>{
  let array = messages.map((item)=> item.attributes )
  array.forEach((item)=>{
    let li = document.createElement('li')
    li.innerText = `${item.name}:${item.content}`
    this.messageList.appendChild(li)

 })


 })}
 }

 controller.init(model,view)


 }.call()

