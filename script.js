const openNote = document.querySelector(".openNote");
const openNote_title = document.querySelector(".openNote_title");
const openNote_content = document.querySelector(".openNote__content p");
const openNote_date = document.querySelector(".openNote__date");
const shareNote = document.querySelector(".share_note");
const copyNote = document.querySelector(".copy_note");
const editNote = document.querySelector(".edit_note");
const editMode = document.querySelector(".edit_mode");
const close = document.querySelector(".close");

const createNew = document.querySelector("form");
const createNew__submit = createNew.querySelector("button");
const createNew__title = createNew.querySelector("input");
const createNew__content = createNew.querySelector("textarea");

const notes = document.querySelector(".notes");
let current = undefined;

createNew__content.addEventListener("keyup", (e) => {
	textAreaAdjust(e.target);
});

editMode.querySelector("textarea").addEventListener("keyup", (e) => {
	textAreaAdjust(e.target);
});

function textAreaAdjust(element) {
	element.style.height = "1px";
	element.style.height = 10 + element.scrollHeight + "px";
}

const closeOpenNote = () => {
	openNote.classList.add("hidden");
	document.body.style.overflow = "scroll";
};

document.body.addEventListener("keydown", (e) => {
	if (e.code === "Escape" && !openNote.classList.contains("hidden")) {
		closeOpenNote();
	}
});

close.addEventListener("click", closeOpenNote);

openNote.addEventListener("click", (e) => {
	let parent = e.target.closest(".openNote__holder");
	console.log(parent);
	if (!parent) {
		closeOpenNote();
	}
});

const addNewNote = (title, text) => {
	let date = new Date().toLocaleString("en-US", {
		day: "numeric",
		year: "numeric",
		month: "long",
	});
	notes.insertAdjacentHTML(
		"beforeend",
		`
		<div href="#${Date.now()}" class="notes__item">
                <h2 class="note_h2">${title}</h2>
                <p class="note_p">${text}</p>
                <div class="social-media">
                    <h3 class="note_date">${date}</h3>
                    <img src="./img/copy.svg" alt="Copy icon">
                    <img src="./img/facebook.svg" alt="Facebook icon">
                    <img src="./img/twitter.svg" alt="Twitter icon">
                </div>
            </div>
	`
	);
};

createNew__submit.addEventListener("click", (e) => {
	e.preventDefault();
	console.log(createNew__title.value);

	if (createNew__content.value !== "" && createNew__title.value !== "") {
		addNewNote(createNew__title.value, createNew__content.value);
		createNew__title.value = "";
		createNew__content.value = "";
		createNew__content.style.height = "auto";
	}
});

notes.addEventListener("click", (e) => {
	let parent = e.target.closest(".notes__item");
	let media = e.target.closest(".notes__item");

	if (parent) {
		copyNote.textContent = "Copy to Flipboard";
		openNote_title.textContent = parent.querySelector(".note_h2").textContent;
		openNote_content.textContent = parent.querySelector(".note_p").textContent;
		openNote_date.textContent = parent.querySelector(".note_date").textContent;
		openNote.classList.remove("hidden");
		document.body.style.overflow = "hidden";

		current = parent;
	}
});

shareNote.addEventListener("click", () => {
	navigator.share(openNote_content.textContent);
});

copyNote.addEventListener("click", () => {
	navigator.clipboard.writeText(openNote_content.textContent);
	copyNote.textContent = "Done";
});

editNote.addEventListener("click", () => {
	openNote_content.style.display = "none";
	editMode.querySelector("textarea").value = openNote_content.textContent;
	editMode.classList.remove("hidden");
});

document.querySelector(".submit_changes").addEventListener("click", () => {
	openNote_content.style.display = "block";
	openNote_content.textContent = editMode.querySelector("textarea").value;
	editMode.classList.add("hidden");
	console.log(current);
	current.querySelector(".note_p").textContent =
		editMode.querySelector("textarea").value;
});
