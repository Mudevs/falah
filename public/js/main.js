$(document).ready(function(){
  $('#options').click(function(){
    
  
  });//end click function  



  function renderClasses(element, data){

    for(var i = 0; i<data.length; i++){
      var element = document.createElement(element);
      option.text = data[i].name;
      option.value = data[i].name;
      option.name = data[i].name;
      console.log(data[i].name);

      selectElement.appendChild(option);
    }
  }

  if(window.location.pathname === '/addstudent'){
    $.ajax('/getclasses')
  .done(function( data ) {
    var selectElement = document.getElementById('options');
    
    console.log(data);

    for(var i = 0; i<data.length; i++){
      var option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
      option.name = data[i].name;
      console.log(data[i].name);

      selectElement.appendChild(option);
    }

  });      

  } else if(window.location.pathname === '/dashboard'){
    $.ajax('/getclasses')
  .done(function( data ) {
    var ulElement = document.getElementById('classes-list');
    console.log(data);
    for(var i = 0; i<data.length; i++){

      var li = document.createElement('li');
      li.innerHTML = data[i].name;
      console.log(li);
      ulElement.appendChild(li);

    }
     
  });

  }
  
	

});//end ready function