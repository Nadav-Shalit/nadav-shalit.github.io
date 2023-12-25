var APP = {};

(function() {
  var taskslist = [];
  var taskIdx = 0;
  var saveObj;
  var $todoList = $(".todo-list");

  // template of input text box for new tasks
  var formTemplate = function() {
    var txtTask =  "<label class='sr-only' for='txtTaskDesc' >task</label><input type='text' id='txtTaskDesc' class='task form-control' placeholder='Task description'/>"
    var txtOwner = "<label class='sr-only' for='txtOwner' >task</label><input type='text' id='txtOwner' class='owner form-control' placeholder='Task owner'/>"
    var divAlert = "<div id='msg' ></div>"
    return "<div class='form-inline'>" + txtTask  + txtOwner + "<button type='button' class='btn btn-default btn-xs' onclick='APP.saveTask(this);'><span class='save glyphicon glyphicon-ok' aria-hidden='true'></span></button>&nbsp;<button type='button' class='btn btn-default btn-xs' onclick='APP.resetAddTask();'><span class='cancel glyphicon glyphicon-remove' aria-hidden='true'></span></button>" + divAlert + "</div>"
  }
  // html task template
  var taskTemplate = function(id, parentId, desc, owner, level, childs) {
     var cls_col_1 = level;
     var cls_col_2 = 10 - level;
     var cls_hidden = (childs == 0) ? 'hidden' : '';
     var col_arrow = "<div class='col-xs-" + cls_col_1 + " text-right'><button type='button' class='" + cls_hidden + " btn btn-default btn-xs arrow' onclick='APP.toggleSubTasks(this);'><span class='arrow glyphicon glyphicon-menu-right' aria-hidden='true'></span></button></div>";
     var col_desc = "<div class='col-xs-" + cls_col_2 + "'><span class='task'>" + desc + "</span> own by: <span class='owner'>" + owner + "</span></div>";
     var col_AddBtn = "";
     if(level < 6) {
       col_AddBtn = "<button type='button' class='btn btn-default btn-xs add' onclick='APP.moveTextBox(this);'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span></button>";
     }
     var col_DeleteBtn = "<button type='button' class='btn btn-default btn-xs delete' onclick='APP.deleteTask(this);''><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
     return "<div class='row task' id='task_id_" + id+ "'  data-task-id='" + id + "' data-parent-id='" + parentId + "' data-level='" + level + "' >"+ col_arrow +  col_desc + "<div class='col-xs-2 text-right'>" + col_AddBtn + col_DeleteBtn + "</div></div></div>";

  };

  APP.init = function() {
    taskslist = JSON.parse(localStorage.getItem('taskslist')) || [];
    $todoList.append(formTemplate());
    saveObj = $('.form-inline');
    showList(0); //show first level;
    resetForm();
    updateTitle();
  };

  //set paramters for dest element to append the new task;
  APP.saveTask = function(btnSave) {
    var parentTaskId = $(btnSave).parent().data('add-to') || 0;
    var parentTask = (parentTaskId === 0 ) ? $todoList : $("#task_id_" + parentTaskId);
    addTaskItem(parentTask);
  };

  // delete task from DOM and localStorage
  APP.deleteTask = function(btnObj) {
      var rowObj = getTaskRow(btnObj);
      var taskId = $(rowObj).data('task-id');
      var subTasksArr = $('.row[data-parent-id="'  + taskId +   '"]');
      var objIdx = getObjectIndex(taskId);
      rowObj.remove();
      toggleArrow($(rowObj).data('parent-id'));
      taskslist.splice(objIdx,1);
      objIdx = getObjectIndex($(rowObj).data('parent-id'));
      if(objIdx != null) {
        taskslist[objIdx].childs--;
      }
      updateTitle();
      localStorage.setItem('taskslist',JSON.stringify(taskslist));
      // delete all childs
      $(subTasksArr).each(function(e){
          APP.deleteTask($(this).find('[type="button"].delete'));
        });
  }

  // move DOM position of save form below the parent task
  APP.moveTextBox = function(btnObj) {
    var parentObj = getTaskRow(btnObj);
    var parentTaskId = $(parentObj).data('task-id') || 0;
    var level = $(parentObj).data('level') + 1;

    $(saveObj).addClass("col-xs-offset-" + level);
    $(saveObj).data('add-to', parentTaskId);
    $(parentObj).after(saveObj);
    resetForm();

    //show all parent childs if exists
    if($('.row[data-parent-id="'  + parentTaskId +   '"]').length === 0) {
      APP.toggleSubTasks($(parentObj).find('[type="button"].arrow'));
    }

  };

  //expend/collepse parent childs if exists
  APP.toggleSubTasks = function(btnObj) {
    var parentObj = getTaskRow(btnObj);
    var parentTaskId = $(parentObj).data('task-id') || 0;
      if($('.row[data-parent-id="'  + parentTaskId +   '"]').length === 0) {
        showList(parentTaskId);
        $(btnObj).find('span').attr('class',$(btnObj).find('span').attr('class').replace(/right/,'down'));
      } else {
        var subTasksArr = $('.row[data-parent-id="'  + parentTaskId +   '"]');
        $(subTasksArr).remove();// delete from DOM
        //"hide" all childs
        $(subTasksArr).each(function(e){
            APP.toggleSubTasks($(this).find('[type="button"].arrow'));
          });
        $(btnObj).find('span').attr('class',$(btnObj).find('span').attr('class').replace(/down/,'right')) ;
      }
    };

  //display save form position relative to parent.
  APP.resetAddTask = function(){
    var offsetClass = $(saveObj).attr('class').match(/col-xs-offset-\d/);
    if(offsetClass && offsetClass.length === 1) {
      $(saveObj).removeClass(offsetClass[0]);
    }

    $(saveObj).data('add-to',0);
    $(saveObj).prependTo($($todoList));
    resetForm();
  }
//#################################################################
  // get task data to save
  var addTaskItem = function(parentObj) {
    var parentTaskId = $(parentObj).data('task-id') || 0;
    var parentLevel = $(parentObj).data('level') || 0;
    var taskDesc = $('#txtTaskDesc').val();
    var taskOwner = $('#txtOwner').val();

    if (taskDesc.length === 0) {
      $('#msg').text('Task must contain a description!').fadeIn(1000).fadeOut(2500);
      return;
    }
    if (taskOwner.length === 0) {
      $('#msg').text('Task must contain an owner!').fadeIn(1000).fadeOut(2500);
      return;
    }

    var item =  addTask(parentTaskId, ++parentLevel, taskDesc, taskOwner);
    appendTask(parentTaskId, parentObj, item);
    toggleArrow(parentTaskId);
    APP.resetAddTask();
    }

  // display parent childs in DOM
  var showList = function(parentTaskId) {
    $.each(taskslist, function(idx,item) {
      if(parentTaskId === item.parentId) {
        var parentObj = (parentTaskId === 0 ) ? $($todoList) : $("#task_id_" + parentTaskId);
        appendTask(parentTaskId, parentObj, item);
      }
    });
  }

  var getTaskRow = function(btn) {
     return $(btn).parent().parent()
  }

  var getObjectIndex = function(id) {
    var objIdx = null;
    $.grep(taskslist, function(e,idx){ if(e.id === id) { objIdx = idx; } });
    return objIdx;
  }

  // show/hide arrow after add/remove child
  var toggleArrow = function(id) {
    var subTasksArr = $('.row[data-parent-id="'  + id +   '"]');
    var parentObj = $("#task_id_" + id);
    if(parentObj.length > 0 ) {
      if($(subTasksArr).length === 0) {
        $(parentObj).find('[type="button"].arrow').addClass('hidden');
      } else {
        $(parentObj).find('[type="button"].arrow').removeClass('hidden');
      }
    }
  }

  // add new task object
  var addTask = function(parentId, level, desc, owner) {
    nextTaskId();
    var newTask = function() {
      var taskObj = {};
          taskObj.id = ++taskIdx;
          taskObj.parentId = parentId;
          taskObj.level = level;
          taskObj.childs = 0;
          taskObj.desc = desc;
          taskObj.owner = owner;
          return taskObj;
    };

    taskslist.push(newTask());
    // increse childs count to parent task;
    if(parentId > 0 ) {
      var objIdx = getObjectIndex(parentId);
      taskslist[objIdx].childs++;
    }
    updateTitle();
    localStorage.setItem('taskslist',JSON.stringify(taskslist));
    return $(taskslist).get(-1);
  }

  //get max task id for uniqeness
  var nextTaskId = function() {
    if(taskslist.length > 0) {
      taskIdx =  Math.max.apply(Math,$.map($(taskslist),function(o){return o.id;}));
    }
  }


  var resetForm = function() {
     $('#txtTaskDesc').val('').focus();
     $('#txtOwner').val('');
   }

   //add task opject to DOM
   var appendTask = function(parentTaskId, parentObj, item) {
     if(parentTaskId === 0 ) {
         $(parentObj).append(taskTemplate(item.id, item.parentId, item.desc, item.owner, item.level, item.childs));
       } else {
         $(parentObj).after(taskTemplate(item.id, item.parentId, item.desc, item.owner, item.level, item.childs));
     }
   }

   var updateTitle = function() {
     document.title = "Nadav's Tasks (" + taskslist.length + ")";
   }
})(jQuery);

$(document).ready(function (){
  APP.init();
});
