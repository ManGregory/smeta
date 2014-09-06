var Html = {
  RoomObject :
    '<li class="room-object">' +
    '  <form class="form-inline">' +      
    '    <select name="" id="" class="form-control input-md">' +
    '      <option value="" selected="selected">Wall</option>' +    
    '      <option value="">Window</option>' +
    '      <option value="">Door</option>' +
    '    </select>' +
    '    <input class="form-control input-md calc-object obj-width" value="1"/>' +  
    '    <label>X' +
    '    <input class="form-control input-md calc-object obj-height" value="1"/>' + 
    '    </label>' +
    '    <select name="" id="" class="form-control input-md calc-object select-sign">' +
    '      <option value="">+</option>' +
    '      <option value="">-</option>' +
    '    </select>' +
    '    <button type="button" class="btn btn-default btn-md delete-room-object"><span class="glyphicon glyphicon-trash"></span> Delete</button>' +
    '  </form>' +
    '</li>',
  Project : '<li><a href="#">Project {{projectNum}}</a></li>',
  SelectedProject : '<li><a href="#" class="selected">Project {{projectNum}}</a></li>',
  Room : '<li><a href="#">Room {{roomNum}}</a></li>',
  FirstRoom : '<ul class="project-list-sub"><li><a href="#">Room {{roomNum}}</a></li></ul>'
};

var projectCount = 1;
var roomCount = 1;

function getProjectCount() {
  return projectCount;
}

function setProjectCount(value) {
  projectCount = value;
}

function getNextProjectNum() {
  return projectCount++;
}

function getRoomCount() {
  return roomCount;
}

function setProjectCount(value) {
  roomCount = value;
}

function getNextRoomNum() {
  return roomCount++;
}

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
  $("#room-objects").append(Html.RoomObject);  
  setAreaValue(calcArea());    
  setMasks();
}

function deleteRoomObject(roomObject) {
  roomObject.parents(".room-object").remove();
  setAreaValue(calcArea());    
}

function addProject(isSelected) {
  $(".project-list").
    append(Handlebars.compile(isSelected ? Html.SelectedProject : Html.Project)({"projectNum" : getNextProjectNum()}));  
}

function getSelectedProject(){
  return subProjectList = $(".project-list a.selected");
}

function addRoom(project) {
  var ul = subProjectList.next();
  if (ul.attr("class") !== undefined){
    ul.append(Handlebars.compile(Html.Room)({"roomNum" : getNextRoomNum()}));
  } else {
    subProjectList.after(Handlebars.compile(Html.FirstRoom)({"roomNum" : getNextRoomNum()}));
  }
}

function createNewWorkspace() {
  addProject(true);    
  addRoom(getSelectedProject());    
  addRoomObject();   
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
    addRoom(getSelectedProject());
  });

  $(document).on('click', 'ul.project-list li a', function() {
    $('ul.project-list li a').removeClass('selected');
    $(this).addClass('selected');
  });

  $(document).on('change', '.calc-object', function() {
    setAreaValue(calcArea());
  });  
}

function setGlobalize() {
  Globalize.load({
    "main": {
      "en": {
        "identity": {
          "version": {
            "_cldrVersion": "25",
            "_number": "$Revision: 91 $"
          },
          "generation": {
            "_date": "$Date: 2014-03-13 22:27:12 -0500 (Thu, 13 Mar 2014) $"
          },
          "language": "en"
        },
        "dates": {
          "calendars": {
            "gregorian": {
              "months": {
                "format": {
                  "abbreviated": {
                    "1": "Jan",
                    "2": "Feb",
                    "3": "Mar",
                    "4": "Apr",
                    "5": "May",
                    "6": "Jun",
                    "7": "Jul",
                    "8": "Aug",
                    "9": "Sep",
                    "10": "Oct",
                    "11": "Nov",
                    "12": "Dec"
                  }
                }
              },
              "dayPeriods": {
                "format": {
                  "wide": {
                    "am": "AM",
                    "am-alt-variant": "am",
                    "noon": "noon",
                    "pm": "PM",
                    "pm-alt-variant": "pm"
                  }
                }
              },
              "dateFormats": {
                "medium": "MMM d, y"
              },
              "timeFormats": {
                "medium": "h:mm:ss a",
              },
              "dateTimeFormats": {
                "medium": "{1}, {0}"
              }
            }
          }
        },
        "numbers": {
          "defaultNumberingSystem": "latn",
          "symbols-numberSystem-latn": {
            "group": ","
          },
          "decimalFormats-numberSystem-latn": {
            "standard": "#,##0.###"
          }
        }
      }
    },
    "supplemental": {
      "version": {
        "_cldrVersion": "25",
        "_number": "$Revision: 91 $"
      },
      "likelySubtags": {
        "en": "en-Latn-US",
      },
      "plurals-type-cardinal": {
        "en": {
          "pluralRule-count-one": "i = 1 and v = 0 @integer 1",
          "pluralRule-count-other": " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"
        }
      }
    }
  }); 
  Globalize.locale( "en" );
  // Use Globalize to format dates.
  console.log( Globalize.formatDate( new Date(), { datetime: "medium" } ) );

  // Use Globalize to format numbers.
  console.log( Globalize.formatNumber( 12345 ) );

  // Use Globalize to format a message with plural inflection.
  console.log( Globalize.formatPlural( 12345, {
    one: "{0} result",
    other: "{0} results"
  }));
}

function setMasks(){
  $('.obj-width').inputmask('decimal');
  $('.obj-height').inputmask('decimal');
}