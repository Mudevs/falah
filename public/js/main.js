$(document).ready(function(){
  $('#options').click(function(){
    
  
  });//end click function  

 

  if(window.location.pathname === '/addstudent'){
    console.log('Add student page');

    $.ajax('/getclasses')
  .done(function( data ) {
    var selectElement = document.getElementById('options');
    var option = document.createElement('option');

    for(var i = 0; i<data.length; i++){
      option.text = data[i].name;
      option.value = data[i].name;

      console.log(option); 
      selectElement.appendChild(option);
    }
      
  });      

  }
  
	

});//end ready function