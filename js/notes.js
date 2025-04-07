const textarea = document.getElementById('noteTextare');


textarea.value = localStorage.getItem('myNotes') || '';


textarea.addEventListener('input', () => {
    localStorage.setItem('myNotes', textarea.value);
});