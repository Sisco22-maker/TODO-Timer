const container = document.getElementById('todoContainer');
const createNewSection = document.getElementById('creatNewSection');
const overlay = document.getElementById('overlay');
//For adding New Section
const addingSectionModal = document.querySelector('.adding-new-section');
const confirmNewSectionBtn = document.querySelector('.btn-confirm-new-section');
const denyNewSectionBtn = document.querySelector('.btn-deny-new-section');
const newSectionInput = document.querySelector('.new-add-input');
//For editing existant Section
const editingSectionModal = document.querySelector('.editing-section');
const confirEditingSection = document.querySelector(
  '.btn-confirm-section-edit'
);
const denyEditingSection = document.querySelector('.btn-deny-section-edit');
const editSectionInput = document.querySelector('.edit-section-input');
//For adding new task
const newTaskModal = document.querySelector('.create-new-task');
const newTaskInput = document.querySelector('.create-new-task-input');
const newTaskConfirm = document.querySelector('.btn-new-task-confirm');
const newTaskDeny = document.querySelector('.btn-new-task-deny');
//For section deletion confirm
const deletionConfirmModal = document.querySelector(
  '.confirm-section-deletion'
);
const deletionConfirmBtn = document.querySelector('.btn-deletion-confirm');
const deletionDeny = document.querySelector('.btn-deletion-deny');
//For task deletion confirm
const taskDeletionConfirmModal = document.querySelector(
  '.confirm-task-deletion'
);
const taskDeletionConfirmBtn = document.querySelector(
  '.btn-task-deletion-confirm'
);
const taskDeletionDenyBtn = document.querySelector('.btn-task-deletion-deny');
//Editing Task Name
const editTaskModal = document.querySelector('.editing-task');
const editTaskConfirmBtn = document.querySelector('.btn-new-task-name-confirm');
const editTaskDenyBtn = document.querySelector('.btn-new-task-name-deny');
const editTaskInput = document.querySelector('.edit-task-input');
//For Count Down
const countDownModal = document.querySelector('.count-down-modal');
const hoursInput = document.querySelector('.hours');
const minutesInput = document.querySelector('.minutes');
const secondsInput = document.querySelector('.seconds');
const countDownConfirmBtn = document.querySelector('.btn-count-down-confirm');
const countDownDenyBtn = document.querySelector('.btn-count-down-deny');
const dayWheel = document.querySelector('.day-wheel');
const morning = document.querySelector('.morning');
const night = document.querySelector('.night');
const dayContainer = document.querySelector('.morning-night-container');
const countDownSound = document.getElementById('countDownSound');
//General Perpose Flags
let globalSectionParent = null;
let globalTaskList = null;
let globalTask = null;
let globalTaskTitle = null;
let globalTotalSeconds = 0;
const modalDownRate = -120;
let countDownId = null;

//For validate confirming
const validateConfirming = function (targetModal, targetInput, generalPerpose) {
  const inputValue = targetInput.value;
  if (inputValue.length === 0) {
    targetInput.classList.add('shake');
    targetInput.classList.add('show-place-holder');
  } else {
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    targetModal.style.transform = ``;
    if (targetModal === addingSectionModal) {
      createSection(inputValue);
    } else if (targetModal === editingSectionModal) {
      generalPerpose.textContent = editSectionInput.value;
    } else if (targetModal === newTaskModal) {
      // console.log('from here once');
      const hasTasksList = generalPerpose.querySelector('.section-tasks');
      const taksTitle = targetInput.value;
      if (hasTasksList === null) {
        //There is no tasks yet
        createTasksList(generalPerpose);
        const tasksList = generalPerpose.lastElementChild;
        creatTask(tasksList, taksTitle);
      } else {
        const tasksList = generalPerpose.lastElementChild;
        tasksList.classList.remove('close-tasks-section');
        tasksList.classList.add('open-tasks-section');
        creatTask(tasksList, taksTitle);
      }
    } else if (targetModal === editTaskModal) {
      generalPerpose.textContent = targetInput.value;
    }
  }
};
const validatingDenining = function (targetModal) {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  targetModal.style.transform = ``;
};
const validateTime = function (hours, minutes, seconds) {
  const h = Number(hours);
  const m = Number(minutes);
  const s = Number(seconds);
  if (h < 0 || m < 0 || s < 0) {
    return false;
  }
  if (h === 0 && m === 0 && s === 0) {
    return false;
  }
  if (m >= 60 || s >= 60) {
    return false;
  }
};
const countDownTicks = function (totalSeconds) {
  dayWheel.classList.add('rotate-animation');
  dayWheel.style.animationDuration = `${totalSeconds}s`;
  morning.classList.add('remove-opacity');
  morning.style.animationDuration = `${totalSeconds}s`;
  night.classList.add('give-opacity');
  night.style.animationDuration = `${totalSeconds}s`;
};
const TickTack = function () {
  globalTotalSeconds -= 1;
  if (globalTotalSeconds === 0) {
    clearInterval(countDownId);
    countDownSound.pause();
  } else {
    countDownSound.play();
  }
};
countDownConfirmBtn.addEventListener('click', function () {
  //first get the input values
  const h = hoursInput.value;
  const m = minutesInput.value;
  const s = secondsInput.value;
  if (validateTime(h, m, s) == false) {
    hoursInput.classList.add('shake');
    minutesInput.classList.add('shake');
    secondsInput.classList.add('shake');
  } else {
    const totalSeconds = Number(h) * 60 * 60 + Number(m) * 60 + Number(s);
    countDownTicks(totalSeconds);
    dayContainer.style.transform = `translateY(0px)`;
    validatingDenining(countDownModal);
    globalTotalSeconds = totalSeconds;
    countDownId = setInterval(TickTack, 1000);
  }
});
countDownDenyBtn.addEventListener('click', function () {
  validatingDenining(countDownModal);
});
editTaskConfirmBtn.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  editTaskModal.style.transform = ``;
  validateConfirming(editTaskModal, editTaskInput, globalTaskTitle);
});
editTaskDenyBtn.addEventListener('click', function () {});
taskDeletionConfirmBtn.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  taskDeletionConfirmModal.style.transform = ``;
  globalTaskList.removeChild(globalTask);
});
taskDeletionDenyBtn.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  taskDeletionConfirmModal.style.transform = ``;
});
deletionConfirmBtn.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  deletionConfirmModal.style.transform = ``;
  container.removeChild(globalSectionParent);
});
deletionDeny.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  deletionConfirmModal.style.transform = ``;
});
const changeSectionName = function (sectionTitle) {
  confirEditingSection.addEventListener('click', function () {
    validateConfirming(editingSectionModal, editSectionInput, sectionTitle);
  });
};
denyEditingSection.addEventListener('click', function () {
  validatingDenining(editingSectionModal);
});

newTaskConfirm.addEventListener('click', function () {
  validateConfirming(newTaskModal, newTaskInput, globalSectionParent);
});

newTaskDeny.addEventListener('click', function () {
  validatingDenining(newTaskModal);
});
createNewSection.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  overlay.style.top = `${window.scrollY}`;
  document.body.classList.add('overflow-hidden');
  addingSectionModal.style.transform = `translateY(${
    window.scrollY + modalDownRate
  }px)`;
  newSectionInput.value = '';
});
overlay.addEventListener('click', function () {
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  addingSectionModal.style.transform = ``;
  editingSectionModal.style.transform = ``;
  newTaskModal.style.transform = ``;
  deletionConfirmModal.transform = '';
  countDownModal.transform = ``;
});
denyNewSectionBtn.addEventListener('click', function () {
  validatingDenining(addingSectionModal);
});
confirmNewSectionBtn.addEventListener('click', function () {
  validateConfirming(addingSectionModal, newSectionInput, null);
});
container.addEventListener('click', function (event) {
  const eventTarget = event.target;
  //Adding new Task
  const parentSection = eventTarget.closest('.todo-section');
  if (eventTarget.classList.contains('add-task')) {
    //Bringing Modal
    globalSectionParent = parentSection;
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    newTaskModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
    newTaskInput.value = '';
  } else if (eventTarget.classList.contains('delete-section')) {
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    deletionConfirmModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
    globalSectionParent = parentSection;
    // container.removeChild(parentSection);
  } else if (eventTarget.classList.contains('open-close-section')) {
    const hasTasksList = parentSection.querySelector('.section-tasks');
    if (hasTasksList !== null) {
      //There are some tasks
      const tasksList = hasTasksList;
      //If it opend then close it and if closed then open it
      toggleSection(tasksList);
    }
    eventTarget.classList.toggle('rotate-180-clock-wise');
  } else if (eventTarget.classList.contains('edit-section')) {
    //bring the value of section titile
    const sectionTitle = parentSection.querySelector('.section-titel');
    editSectionInput.value = sectionTitle.textContent;
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    editingSectionModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
    changeSectionName(sectionTitle);
  }
  //tasks Logic
  if (eventTarget.classList.contains('delete-task')) {
    //Getting the task parent
    const taskDirectParent = eventTarget.closest('.task');
    const tasksList = parentSection.querySelector('.section-tasks');
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    taskDeletionConfirmModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
    globalTaskList = tasksList;
    globalTask = taskDirectParent;
  } else if (eventTarget.classList.contains('uncompleted-task')) {
    const checkMark = eventTarget;
    checkMark.classList.add('fa-regular');
    checkMark.classList.add('completed-task');
    checkMark.classList.remove('uncompleted-task');
    checkMark.classList.remove('fa-solid');
    const tasksList = parentSection.querySelector('.section-tasks');
    const task = checkMark.closest('.task');
    tasksList.removeChild(task);
    tasksList.appendChild(task);
  } else if (eventTarget.classList.contains('completed-task')) {
    const checkMark = eventTarget;
    const tasksList = parentSection.querySelector('.section-tasks');
    //find all uncompleted tasks
    const unCompletedList = tasksList.querySelectorAll('.uncompleted-task');
    const task = checkMark.closest('.task');
    if (unCompletedList.length !== 0) {
      const unCompletedTasks = getParent(unCompletedList);
      const listLength = unCompletedTasks.length;
      unCompletedTasks[listLength - 1].insertAdjacentElement('afterend', task);
    } else {
      const firstTask = tasksList.firstElementChild;
      tasksList.insertBefore(task, firstTask);
    }
    checkMark.classList.add('uncompleted-task');
    checkMark.classList.add('fa-solid');
    checkMark.classList.remove('fa-regular');
    checkMark.classList.remove('completed-task');
  } else if (eventTarget.classList.contains('edit-task-name')) {
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    editTaskModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
    const taskParent = eventTarget.closest('.task');
    const taskTitle = taskParent.querySelector('.task-titel');
    editTaskInput.value = taskTitle.textContent;
    globalTaskTitle = taskTitle;
  } else if (eventTarget.classList.contains('task-timer')) {
    overlay.classList.remove('hidden');
    overlay.style.top = `${window.scrollY}`;
    document.body.classList.add('overflow-hidden');
    countDownModal.style.transform = `translateY(${
      window.scrollY + modalDownRate
    }px)`;
  }
});
const getParent = function (children) {
  let parentList = [];
  children.forEach((element) => {
    parentList.push(element.closest('.task'));
  });
  return parentList;
};
const toggleSection = function (tasksList) {
  if (tasksList.classList.contains('open-tasks-section')) {
    tasksList.classList.remove('open-tasks-section');
    tasksList.classList.add('close-tasks-section');
  } else if (tasksList.classList.contains('close-tasks-section')) {
    tasksList.classList.remove('close-tasks-section');
    tasksList.classList.add('open-tasks-section');
  }
};
const createSection = function (sectionName) {
  const section = `
    <section class="todo-section">
        <div class="section-header">
          <h3 class="section-titel">${sectionName}</h3>
          <div class="section-controlers">
            <i class="add-task fa-solid fa-plus"></i>
            <i class="open-close-section fa-solid fa-chevron-down"></i>
            <i class="edit-section fa-regular fa-pen-to-square"></i>
            <i class="delete-section fa-solid fa-trash"></i>
          </div>
        </div>
      </section>
    `;
  const template = document.createElement('template');
  template.innerHTML += section.trim();
  const appendedChild = template.content.firstElementChild;
  container.appendChild(appendedChild);
};
const createTasksList = function (todoSection) {
  const tasksList = `
    <div class="section-tasks open-tasks-section">
    </div>
    `;
  todoSection.innerHTML += tasksList.trim();
};
const creatTask = function (tasksList, taskTitle) {
  const task = `<div class="task">
            <h4 class="task-titel">${taskTitle}</h4>
            <div class="task-controlers">
            <i class="uncompleted-task fa-solid fa-circle-stop"></i>
            <i class="edit-task-name fa-regular fa-pen-to-square"></i>
              <i class="delete-task fa-regular fa-trash-can"></i>
              <i class="task-timer fa-regular fa-hourglass"></i>
            </div>
          </div>`;
  tasksList.innerHTML += task.trim();
};
