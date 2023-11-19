let bodyEl = $('body');

let currentDayContainer = $('#currentDay');
let currentTimeContainer = $('#currentTime');

let scheduleContainer = $('.schedule-container');
let timeBlock = $('.time-block');
// console.log(timeBlock.length);
// console.log(timeBlock);

let saveButton = $('.saveBtn');
let userInput = $('.userTodo');

// figure out how to grab users input and save it to local storage on a click

// getting current day
let today = dayjs();
// console.log(today);

let currentTime = today.format('HH:mm a');
let currentDay = today.format('MMMM DD, YYYY');
// console.log(currentTime)

// changing current time and date displays
currentDayContainer.text(today.format('MMMM DD, YYYY'));
currentTimeContainer.text(today.format('HH:mm a'));

saveButton.on('click', function(){
  let userInput = $(this).siblings('.description').val();
  let timeBlockId = $(this).closest('.time-block').attr('id');
  localStorage.setItem(timeBlockId ,userInput);
});

function getData() {
  for (let i = 0; i < timeBlock.length; i++) {
    let blockId = timeBlock.eq(i).attr('id');
    let storedData = localStorage.getItem(blockId);
    timeBlock.eq(i).find('.description').val(storedData);
  }
}

// updating time using an interval every 15 seconds
function updateTime(){
  let timeNow = dayjs().format('HH:mm a');
  let dayNow = dayjs().format('MMMM DD, YYYY');
  // console.log(now);
  if (currentTime !== timeNow) {
    currentTime = timeNow;
    currentTimeContainer.text(timeNow);
  }
  if (currentDay !== dayNow) {
    currentDay = dayNow;
    currentDayContainer.text(dayNow);
  }
}
// console.log(currentTime);

setInterval(function() {
   updateTime();
},15000);

// change the color of time blocks for past, present, or future based on current hour and div id
function colorChange() {
  let currentHour = parseInt(dayjs().format('H'));
  // console.log(currentHour);

  if (currentHour < 9 || currentHour > 17) {
    for (let i = 0; i < timeBlock.length; i++) {
      let currentBlock = $(timeBlock[i]);
      currentBlock.removeClass('present future').addClass('past');
    }
  } else {
    for (let i = 0; i < timeBlock.length; i++) {
      let blockId = parseInt(timeBlock.eq(i).attr('id'));
      let currentBlock = $(timeBlock[i]);
      currentBlock.removeClass('past present future');
      if (blockId === currentHour) {
        currentBlock.removeClass('future past').addClass('present');

      } else if (blockId < currentHour) {
        currentBlock.removeClass('present future').addClass('past');
      } else  {
        currentBlock.removeClass('present past').addClass('future');
      }
    }
  }
}

colorChange();
getData();
