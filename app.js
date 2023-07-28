const notes = document.querySelector(".notes");
const btn = document.querySelector(".btn");

function getNote() {
  return JSON.parse(localStorage.getItem("notes" || "[]"));
}

const arrayNotes = getNote();

arrayNotes.forEach((note) => {
  let addNote = createNote(note.id, note.content);
  notes.insertBefore(addNote, btn);
});

// console.log(arrayNotes);

function createNote(id, content) {
  const el = document.createElement("textarea");
  el.classList.add("not");
  el.value = content;

  el.addEventListener("dblclick", () => {
    deleteNote(id, el);
  });

  el.addEventListener("input", () => {
    updateNote(id, el.value);
  });

  return el;
}

function deleteNote(id, el) {
  // console.log(el);
  const arrNot = getNote().filter((note) => note.id != id);
  // console.log(arrNot);
  setNote(arrNot);
  notes.removeChild(el);
}

function updateNote(id, elVal) {
  // console.log(el);
  const arrNot = getNote();
  // console.log(arrNot[0]);
  const target = arrNot.filter((not) => not.id === id)[0];
  target.content = elVal;
  // console.log(target);
  setNote(arrNot);
}

function addNote() {
  const obj = {
    id: Date.now(),
    content: "",
  };

  let addNote = createNote(obj.id, obj.content);
  notes.insertBefore(addNote, btn);

  arrayNotes.push(obj);

  setNote(arrayNotes);
}

btn.addEventListener("click", addNote);

function setNote(arrayNotes) {
  localStorage.setItem("notes", JSON.stringify(arrayNotes));
}
