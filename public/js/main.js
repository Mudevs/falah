$(document).ready(function(){
  $('#options').click(function(){
    
  
  });//end click function  

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

  }
  
	

});//end ready function