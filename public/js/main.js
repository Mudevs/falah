'use strict'
$(document).ready(function(){
  var listOfClasses;
  var studentDetails; 

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
      
      });//end listOfClasses click function

     // });
  });

  }//end else statement

  //edit student details
  $("#edit-details").click(function(){
    var editableFields = document.getElementsByTagName("input");
     studentDetails = {} ; 
     //grab student details and attach to object
     studentDetails['1'] = $('#firstname').text();
     studentDetails['2'] = $('#lastname').text();
     studentDetails['3'] = $('#contact').text(); 
     studentDetails['4'] = $('#address').text(); 
     studentDetails['5'] = $('#medical').text();
     studentDetails['6'] = $('#class').text();


     
     $('.f-student-profile').hide();
     $('.editable-details').toggleClass('hidden');

     for(var i =1; i<editableFields.length - 1; i++){
      editableFields[i].value = studentDetails[''+ i]; 
     }


  });

});//end ready function







