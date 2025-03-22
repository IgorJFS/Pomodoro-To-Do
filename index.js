//Todo
const initialOptions = [
    "linear-gradient(300deg, #00bfff, #ff4c68, #ef8172)",
    "linear-gradient(300deg, #e8cbc0, #636fa4)"  
];
const breakOptions = [
    "linear-gradient(300deg, #34e89e, #0f3443)", 
    "linear-gradient(360deg, #22c1c3, #fdbb2d)" 
]

function getRandomBackground(options) {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return options[randomIndex];
}


document.getElementById('addTask').addEventListener('click',() =>{
    let input = document.querySelector('input');
    let taskText = input.value.trim()
    if (taskText){
        const taskItem = document.createElement('div')
        taskItem.classList.add('task-item')

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;


        const checkBtn = document.createElement('button')
        checkBtn.textContent = "✅"
        checkBtn.classList.add('check-btn')
        checkBtn.addEventListener('click', ()=>{
            taskItem.classList.toggle('completed')
        });

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "🗑️"
        deleteBtn.classList.add('delete-btn')
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            localStorage.setItem('tasks', [...document.querySelectorAll('.task-item span')].map(span => span.textContent).join('|'));
        });


        taskItem.appendChild(checkBtn);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);

        document.getElementById('tasks').appendChild(taskItem);
        input.value = '';
        localStorage.setItem('tasks', [...document.querySelectorAll('.task-item span')].map(span => span.textContent).join('|'));
    }
})

const savedTasks = localStorage.getItem('tasks') ? localStorage.getItem('tasks').split('|') : [];
savedTasks.forEach(taskText => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    const checkBtn = document.createElement('button');
    checkBtn.textContent = "✅";
    checkBtn.classList.add('check-btn');
    checkBtn.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        localStorage.setItem('tasks', [...document.querySelectorAll('.task-item span')].map(span => span.textContent).join('|'));
    });

    taskItem.appendChild(checkBtn);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);

    document.getElementById('tasks').appendChild(taskItem);
});



/*-------------------Pomodoro-------------------------------*/ 
const display = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")
let timer = null;
let startTime = 2400;
let isBreak = false;
const startSong = new Audio("audios/Clickzin.wav")
const pauseSong = new Audio("audios/pausezin.wav")

function toggleTimer(){
    if (timer === null){
        updateDisplay()
        startBtn.textContent = 'Pause'
        startBtn.classList.add("pause")
        startSong.currentTime = 0;
        startSong.play();

        timer = setInterval(() => {
            if(startTime > 0){
                startTime--;
                updateDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                startBtn.textContent = 'Start';
                startBtn.classList.remove("pause");

                 if (!isBreak){
                isBreak = true;
                startTime = 1200;
                document.body.style.background = getRandomBackground(breakOptions)
                display.style.color = "#34e89e";
                toggleTimer();
            } else {
                isBreak = false;
                startTime = 2400;
                document.body.style.background = getRandomBackground(initialOptions)
                display.style.color = "#ffffff";
                toggleTimer();
                updateDisplay();
             }
            }
        }, 1000);
    } else {
        pauseSong.currentTime = 0;
        pauseSong.play()
        clearInterval(timer);
        timer = null;
        startBtn.textContent = 'Start';
        startBtn.classList.remove("pause");
    }
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay(){
    display.textContent = formatTime(startTime)
}

document.body.style.background = getRandomBackground(initialOptions)
updateDisplay();