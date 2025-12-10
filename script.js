// HAMBURGUER MENU
const menu = document.getElementById('ham-menu');
const nav = document.getElementById('nav');
const smallHeader = document.getElementById('small-header-section');
const body = document.querySelector('body');
const bodyNoNav = document.querySelectorAll('body > *:not(nav):not(#ham-menu)');
const bodyNoInputNote = document.querySelectorAll('body')

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('no-scroll');
    bodyNoNav.forEach(e => {
        e.classList.toggle('opacity');
    });
})

// THEME
const themeBtn = document.getElementById('theme-switch');

function checkTheme() {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const searchImg = document.getElementById('search-img');
    const addImg = document.querySelectorAll('.add-img');
    const clockImg = document.querySelectorAll('.clock-img');
    const trashImg = document.querySelectorAll('.trash-img');
    const starImg = document.querySelectorAll('.star-img');
    const markedStar = document.querySelectorAll('.marked-star');

    if (document.body.dataset.theme === 'dark') {
        moon.classList.add('active');
        sun.classList.remove('active');
        searchImg.src = 'assets/search-dark.png';
        addImg.forEach(img => img.src = 'assets/add-dark.png');
        starImg.forEach(img => img.src = 'assets/star-dark.png');
        trashImg.forEach(img => img.src = 'assets/trash-dark.png');
        clockImg.forEach(img => img.src = 'assets/clock-dark.png');
        markedStar.forEach(img => img.src = 'assets/marked-star-dark.png');
    } else {
        sun.classList.add('active');
        moon.classList.remove('active');
        searchImg.src = 'assets/search.png'
        addImg.forEach(img => img.src = 'assets/add.png');
        starImg.forEach(img => img.src = 'assets/star.png');
        trashImg.forEach(img => img.src = 'assets/trash.png');
        clockImg.forEach(img => img.src = 'assets/clock.png');
        markedStar.forEach(img => img.src = 'assets/marked-star.png');
    }
};

checkTheme();

themeBtn.addEventListener('click', () => {
     if (document.body.dataset.theme === 'dark') {
        document.body.dataset.theme = ''
     } else {
        document.body.dataset.theme = 'dark'
     }

     checkTheme()
})

// ADD NOTE
const addNoteBtn = document.getElementById('add-note-btn');
const inputNote = document.getElementById('input-note');
const bodyNoNotes = document.querySelectorAll('body > *:not(#input-note):not(#input-reminder)')

addNoteBtn.addEventListener('click', () => {
    inputNote.classList.add('active');
    bodyNoNotes.forEach(e => e.classList.toggle('opacity'));
    body.classList.toggle('no-scroll');
});

// ADD REMINDER
const addReminderBtn = document.getElementById('add-reminder-btn');
const inputReminder = document.getElementById('input-reminder');

addReminderBtn.addEventListener('click', () => {
    inputReminder.classList.add('active');
    bodyNoNotes.forEach(e => e.classList.toggle('opacity'));
    body.classList.toggle('no-scroll');
});

// CANCELL BUTTON
const noteCancelBtn = document.getElementById('input-note-cancel');
const inputNoteTitle = document.getElementById('input-note-title');
const inputNoteText = document.getElementById('input-note-text');
const reminderCancelBtn = document.getElementById('input-reminder-cancel');
const inputReminderText = document.getElementById('input-reminder-text');

function clearNote() {
    inputNoteTitle.value = '';
    inputNoteText.value = '';
    inputNote.classList.remove('active');
    inputNoteTitle.style.border = '';
    inputNoteText.style.border = '';
    bodyNoNotes.forEach(e => e.classList.toggle('opacity'));
    body.classList.toggle('no-scroll');
    textCounter.textContent = 0;
    titleCounter.textContent = 0;
}

noteCancelBtn.addEventListener('click', clearNote);

function clearReminder() {
    inputReminderText.value = '';
    inputReminder.classList.remove('active');
    bodyNoNotes.forEach(e => e.classList.toggle('opacity'));
    body.classList.toggle('no-scroll');
}

reminderCancelBtn.addEventListener('click', clearReminder);

// SUBMIT NOTE
const subNoteBtn = document.getElementById('input-note-sub');
const notesContainer =  document.getElementById('notes-container');
const favNotesContainer = document.getElementById('fav-notes-container');
checkFavPadding();

function createNewNote() {
    let noteArray = Array.from(document.querySelectorAll('.note'));
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    const noteObj = {
        id: noteArray.length
    };
    newNote.dataset.id = noteObj.id;

    let inputNoteTitleValue = inputNoteTitle.value;
    let inputNoteTextValue = inputNoteText.value;
    if (!inputNoteTitleValue) {
        inputNoteTitle.style.animation = 'shake 0.2s ease-in-out';
        inputNoteTitle.style.border = '1px solid red';
    } else if (!inputNoteTextValue) {
        inputNoteText.style.animation = 'shake 0.2s ease-in-out';
        inputNoteText.style.border = '1px solid red';
    } else {
        const newDate = new Date();
        const now = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`

        newNote.innerHTML = 
    `<div class="note-body">
        <p class="note-title">${inputNoteTitleValue}</p>
        <p class="note-text">${inputNoteTextValue}</p>
    </div>
    <div class="note-bottom">
        <div class="note-date">
            <button><img class="clock-img" src="assets/clock.png" alt=""><p id="time">${now}</p></button>
        </div>
        <div class="note-buttons">
            <button><img class="star-img" src="assets/star.png" alt=""></button>
            <button><img class="trash-img" src="assets/trash.png" alt=""></button>
        </div>
    </div>`
    
    notesContainer.prepend(newNote);

    clearNote();
    }
};

subNoteBtn.addEventListener('click', createNewNote);

// SUBMIT REMINDER 
const remindersContainer = document.getElementById('reminders');
const subReminderBtn = document.getElementById('input-reminder-sub');

function checkReminders() {
    let remindersArray = Array.from(document.querySelectorAll('.reminder-item'));
    if (remindersArray.length > 3) {
        remindersContainer.lastChild.remove();
    };
};

function createNewReminder() {
    const newReminder = document.createElement('div');
    newReminder.classList.add('reminder-item');

    let inputReminderTextValue = inputReminderText.value;
    if (!inputReminderTextValue) {
        inputReminderText.style.animation = 'shake 0.2s ease-in-out';
        inputReminderText.style.border = '1px solid red';
    } else {
        newReminder.innerHTML = `<p class="reminder-item-text">${inputReminderTextValue}</p>`;
        remindersContainer.prepend(newReminder);
        clearReminder();
        checkReminders();
    };
};

subReminderBtn.addEventListener('click', createNewReminder)

// TYPING CHECK
const titleCounter = document.getElementById('title-char-counter');
const maxTitleCounter = document.getElementById('title-max-counter');

inputNoteTitle.addEventListener('input', (e) => {
    e.target.style.border = '';
    titleCounter.textContent = e.target.value.length;
});

const textCounter = document.getElementById('text-char-counter');
const maxTextCounter = document.getElementById('text-max-counter');

inputNoteText.addEventListener('input', (e) => {
    e.target.style.border = '';
    textCounter.textContent = e.target.value.length;
});

const reminderCounter = document.getElementById('reminder-char-counter');
const reminderMaxCounter = document.getElementById('reminder-max-counter');

inputReminderText.addEventListener('input', (e) => {
    e.target.style.border = '';
    reminderCounter.textContent = e.target.value.length;
});

// NOTE BUTTONS
// FAVORITE NOTE

function favoriteNote(event) {
    let noteTarget = event.target.closest('.note');
    
    if(!noteTarget.classList.contains('fav')) {
        noteAnimation(noteTarget);
        noteTarget.classList.add('fav');
        favNotesContainer.prepend(noteTarget);
        event.target.classList.add('marked-star');
        checkFavPadding();
        checkStarImg();
        checkThemeForStar();
    } else if (noteTarget.classList.contains('fav')){
        noteAnimation(noteTarget);
        noteTarget.classList.remove('fav');
        notesContainer.appendChild(noteTarget);
        let newArray = Array.from(notesContainer.querySelectorAll('.note'));
        newArray.sort((a, b) => {
            return b.dataset.id - a.dataset.id;
        });
        newArray.forEach(note => notesContainer.appendChild(note));
        event.target.classList.remove('marked-star');
        checkFavPadding();
        checkStarImg();
        checkThemeForStar();
    };
};

// ERASE NOTE
function eraseNote(event) {
    const noteTarget = event.target.closest('.note');
    noteTarget.remove();
}


// CHECK
// EVENT DELEGATION
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('star-img')) {
        favoriteNote(e);
    };
    if (e.target.classList.contains('trash-img')) {
        eraseNote(e);
    };
});

function checkFavPadding() {
    if (!favNotesContainer.hasChildNodes()) {
        favNotesContainer.style.padding = '0';
    } else {
        favNotesContainer.style.padding = '1rem 1rem 0 1rem';
    };
};

function checkThemeForStar() {
    const starImg = document.querySelectorAll('.star-img');
    const markedStar = document.querySelectorAll('.marked-star');

    if (document.body.dataset.theme === 'dark') {
        starImg.forEach(img => img.src = 'assets/star-dark.png')
    } else {
        starImg.forEach(img => img.src = 'assets/star.png')
    };

    if (document.body.dataset.theme === 'dark') {
        markedStar.forEach(img => img.src = 'assets/marked-star-dark.png');
    } else {
        markedStar.forEach(img => img.src = 'assets/marked-star.png');
    };
};

function checkStarImg() {
    const starImg = document.querySelectorAll('.star-img');

    starImg.forEach(star => {
        if (star.classList.contains('marked-star')) {
            star.src = 'assets/marked-star.png'
        } else {
            star.src = 'assets/star.png'
        }
    })
};

// ANIMATION
function noteAnimation(note) {
    note.classList.add('move');
    setTimeout(() => {
        note.classList.remove('move');
    }, 10);
};