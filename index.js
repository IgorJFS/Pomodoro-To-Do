//Todo
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
        });


        taskItem.appendChild(checkBtn);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);

        document.getElementById('tasks').appendChild(taskItem);
        input.value = '';
    }
})




/*-------------------Pomodoro-------------------------------*/ 
const display = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")
let timer = null;
let elapsedTime = 0;
let startTime = 2400;

function toggleTimer(){
    if (timer === null){
        startTime--;
        updateDisplay()
        startBtn.textContent = 'Pause'
        startBtn.classList.add("pause")
        timer = setInterval(() => {
            if(startTime > 0){
                startTime--;
                updateDisplay();
            } else {
                clearInterval(timer);
                timer = null
                startBtn.textContent = 'Start'
                startTime = 1200
                display.style.color = "#34e89e"
                document.body.style.background = "linear-gradient(300deg, #34e89e, #0f3443)"
            }
        }, 1000);
    } else {
        clearInterval(timer)
        timer = null
        startBtn.textContent = 'Start'
        startBtn.classList.remove("pause")
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
updateDisplay()