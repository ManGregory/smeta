var htmlRoomObject =
  '<li class="room-object">' +
  '  <form class="form-inline">' +      
  '    <select name="" id="" class="form-control input-md">' +
  '      <option value="">Wall</option>' +
  '      <option value="">Window</option>' +
  '      <option value="">Door</option>' +
  '    </select>' +
  '    <input type="number" id="objWidth" class="form-control input-md calc-object obj-width" min="0" step="0.01"/>' +
  '    <label for="objHeight"/>X</label>' +
  '    <input type="number" id="objHeight" class="form-control input-md calc-object obj-height" min="0" step="0.01"/>' +
  '    <select name="" id="" class="form-control input-md calc-object select-sign">' +
  '      <option value="">+</option>' +
  '      <option value="">-</option>' +
  '    </select>' +
  '    <button type="button" class="btn btn-default btn-md delete-room-object"><span class="glyphicon glyphicon-trash"></span> Delete</button>' +
  '  </form>' +
  '</li>';

var htmlProject = '<li><a href="#">Project 2</a></li>';  

function calcArea() {
  var sum = 0;
  var sign = '+'
  $('.room-object form').each(function(index) {            
    var height = parseFloat($(this).find('.obj-height').val());
    var width = parseFloat($(this).find('.obj-width').val());
    if (!isNaN(width) && !isNaN(height)){
      if (sign === '+') {
        sum += width * height;                  
      } else {
        sum -= width * height;
      }
    }
    sign = $(this).find('select.select-sign option:selected').text();
  });
  return sum;
}

function setAreaValue(area) {
  $('.summary .summary-area b').text(area);
}

function addRoomObject() {
  $("#room-objects").append(htmlRoomObject);
}

function deleteRoomObject(roomObject) {
  roomObject.parents(".room-object").remove();
}

function addProject() {
  $(".project-list").
      append(htmlProject);  
}

function bindEvents() {
  $("#addNewRoomObject").click(function() {
    addRoomObject();
  });

  $(document).on('click','button.delete-room-object',function(){
    deleteRoomObject($(this));
    setAreaValue(calcArea());
  });

  $(document).on('click', '#addProject', function(){
    addProject();
  });  

  $(document).on('click', '#addRoom', function(){
    var subProjectList = $(".project-list a.selected");
    var ul = subProjectList.next();
    if (ul.attr("class") !== undefined){
      ul.append('<li><a href="#">Room</a></li>');
    } else {
      subProjectList.after('<ul class="project-list-sub"><li><a href="#">Room</a></li></ul>');
    }
  });
    
  $(document).on('click', 'ul.project-list li a', function() {
    $('ul.project-list li a').removeClass('selected');
    $(this).addClass('selected');
  });

  $(document).on('change', '.calc-object', function() {
    setAreaValue(calcArea());
  });  
}