'use strict'
$(document).ready(function(){
  var listOfClasses;
  var studentDetails;
  var editClassButton;
  var cancelEdit;
  var removeClassBtn;    

  function getListOfClasses(element, data, studentDetails){
    //get select element - we'll need later to append option element
    var selectElement = document.getElementById(element);

    for(var i = 0; i<data.length; i++){
      var option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
      option.name = data[i].name;

      //if match don't append duplicate option - just log to console
      if(data[i].name === studentDetails['6']){
        console.log('match');
      } else {
        selectElement.appendChild(option);
      } 
    }

    return data; 
  }

  //get classes list for addstudent page
  if(window.location.pathname === '/addstudent'){
    $.ajax('/getclasses')
  .done(function( data ) {
    getListOfClasses('options', data, {"6": ''});
  });      

  } else if(window.location.pathname === '/dashboard'){
    $.ajax('/getclasses')
  .done(function( data ) {
    var ulElement = document.getElementById('classes-list');
    
    for(var i = 0; i<data.length; i++){

      var li = document.createElement('li');
      li.innerHTML = data[i].name;
      li.setAttribute("class", "classes-list"); 
      ulElement.appendChild(li);

    }
     listOfClasses = $('.classes-list');
     listOfClasses.on("click", function(){
      var classClicked = $(this).text();
      $('#class-search-form').val(classClicked);
      $('#searchclass').trigger( "click", {searchclass: classClicked} );
      
      });//end listOfClasses onclick function

     // });
  });

  }//end else statement

    else if(window.location.pathname === '/searchclass'){
      //get edit class
      editClassButton = $('#editclass');
      editClassButton.click(function(){

        $('.f-body-container').hide();
        $('.f-edit-class-name').toggleClass('hidden');
        $('.originalname').val($('#f-org-class').text());  
      });//end click function

      cancelEdit = $('#f-cancel');
      cancelEdit.click(function(){
        $('.f-body-container').show();
        $('.f-edit-class-name').toggleClass('hidden');

      });

      removeClassBtn = $('#removeclass'); 
      removeClassBtn.click(function(){
        if(confirm('Are you sure you want to delete? This will also delete all students in the class.')){
          $('.originalname').val ($('#f-org-class').text());
        } else {
          return false; 
        }
      });
    }

  //edit student details
  $("#edit-details").click(function(){
    var defaultClass; 
    var defaultOption = document.getElementById('f-default');
    //get an array of all tags of type input
    var editableFields = document.getElementsByTagName("input");
     studentDetails = {} ; 
     //grab student details and attach to object
     studentDetails['0'] = $('#firstname').text();
     studentDetails['1'] = $('#lastname').text();
     studentDetails['2'] = $('#contact').text(); 
     studentDetails['3'] = $('#address').text(); 
     studentDetails['4'] = $('#medical').text();
     studentDetails['5'] = $('#student-id').text();
     studentDetails['6'] = $('#class').text();

     $('.f-student-profile').hide();
     $('.editable-details').toggleClass('hidden');
     //loop through the editableFields array and assign value of studentDetails property as the value for the input element - i.e. the students details
     for(var i =0; i<editableFields.length; i++){
      editableFields[i].value = studentDetails[''+ i]; 
     }

     $.ajax('/getclasses')
      .done(function( data ) {
        getListOfClasses('f-classes-edit', data, studentDetails);
        defaultOption.setAttribute("selected", "selected");
        defaultOption.innerHTML = studentDetails['6'];
         
  });
  });//end edit details click function


});//end ready function







