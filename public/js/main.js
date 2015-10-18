'use strict'
$(document).ready(function(){
  var listOfClasses;
  var studentDetails; 

  function getListOfClasses(element, data){
    //get select element - we'll need later to append option element
    var selectElement = document.getElementById(element);

    for(var i = 0; i<data.length; i++){
      var option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
      option.name = data[i].name;
      selectElement.appendChild(option);
    }
  }

  //get classes list for addstudent page
  if(window.location.pathname === '/addstudent'){
    $.ajax('/getclasses')
  .done(function( data ) {
    getListOfClasses('options', data);
  });      

  } else if(window.location.pathname === '/dashboard'){
    $.ajax('/getclasses')
  .done(function( data ) {
    var ulElement = document.getElementById('classes-list');
    
    for(var i = 0; i<data.length; i++){

      var li = document.createElement('li');
      li.innerHTML = data[i].name;
      //console.log(li);
      li.setAttribute("class", "classes-list"); 
      ulElement.appendChild(li);

    }
     listOfClasses = $('.classes-list');
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
    var defaultOption = document.getElementById('f-default');
    //get an array of all tags of type input
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

     //we're taking one 1 from length of array because of the edit button, which is also of type input - we dont want that one
     //loop through the editableFields array and assign value of studentDetails property as the value for the input element - i.e. the students details
     //also note that var i = 1 - because position 0 is the edit button
     for(var i =1; i<editableFields.length - 1; i++){
      editableFields[i].value = studentDetails[''+ i]; 
     }

     $.ajax('/getclasses')
      .done(function( data ) {
        console.log(data);
        getListOfClasses('f-classes-edit', data);
        defaultOption.setAttribute("selected", "selected");
        defaultOption.innerHTML = studentDetails['6']; 
  });


  });//end edit details click function

});//end ready function







