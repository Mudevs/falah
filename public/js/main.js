'use strict'
$(document).ready(function(){
  var listOfClasses;

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
    //console.log(data);
    for(var i = 0; i<data.length; i++){

      var li = document.createElement('li');
      li.innerHTML = data[i].name;
      //console.log(li);
      li.setAttribute("class", "classes-list"); 
      ulElement.appendChild(li);

    }
     listOfClasses = $('.classes-list');
     console.log(listOfClasses);
     listOfClasses.on("click", function(){
      var classClicked = $(this).text();
      $('#class-search-form').val(classClicked);
      $('#searchclass').trigger( "click", {searchclass: classClicked} );
      // $.post( "/searchclass", { searchclass: classClicked, ajax: true}, function(data){
      //   console.log(data);
      // }); //end $post function
      
      });//end listOfClasses click function

     // });
  });

  }

});//end ready function