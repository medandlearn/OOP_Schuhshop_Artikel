// Elemente auswählen
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");

// Event-Listener hinzufügen
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
window.addEventListener("load", loadTodos);

// Funktionen definieren
function addTodo() {
    // Eingabe validieren
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("Bitte geben Sie eine Aufgabe ein.");
        return;
    }

    // Neues li-Element erstellen
    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;

    // Neues button-Element erstellen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";

    // Button zum li-Element hinzufügen
    todoItem.appendChild(deleteButton);

    // li-Element zur ul-Liste hinzufügen
    todoList.appendChild(todoItem);

    // Eingabefeld leeren
    todoInput.value = "";

    // Aufgabe im local storage speichern
    saveTodo(todoText);
}

function deleteTodo(event) {
    // Überprüfen, ob der geklickte Element ein Button ist
    if (event.target.tagName === "BUTTON") {
        // li-Element aus der ul-Liste entfernen
        const todoItem = event.target.parentElement;
        todoList.removeChild(todoItem);

        // Aufgabe aus dem local storage entfernen
        removeTodo(todoItem.textContent);
    }
}

function saveTodo(todoText) {
    // Aktuelle Aufgaben aus dem local storage abrufen
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        // Wenn keine Aufgaben vorhanden sind, ein leeres Array erstellen
        todos = [];
    } else {
        // Wenn Aufgaben vorhanden sind, das JSON-Format in ein Array umwandeln
        todos = JSON.parse(todos);
    }

    // Neue Aufgabe zum Array hinzufügen
    todos.push(todoText);

    // Das Array in JSON-Format umwandeln und im local storage speichern
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(todoText) {
    // Aktuelle Aufgaben aus dem local storage abrufen
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        // Wenn keine Aufgaben vorhanden sind, ein leeres Array erstellen
        todos = [];
    } else {
        // Wenn Aufgaben vorhanden sind, das JSON-Format in ein Array umwandeln
        todos = JSON.parse(todos);
    }

    // Die zu löschende Aufgabe aus dem Array entfernen
    todos = todos.filter(todo => todo !== todoText);

    // Das Array in JSON-Format umwandeln und im local storage speichern
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    // Aktuelle Aufgaben aus dem local storage abrufen
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        // Wenn keine Aufgaben vorhanden sind, ein leeres Array erstellen
        todos = [];
    } else {
        // Wenn Aufgaben vorhanden sind, das JSON-Format in ein Array umwandeln
        todos = JSON.parse(todos);
    }

    // Für jede Aufgabe ein li-Element mit einem Button erstellen und zur ul-Liste hinzufügen
    for (let todoText of todos) {
        // Neues li-Element erstellen
        const todoItem = document.createElement("li");
        todoItem.textContent = todoText;

        // Neues button-Element erstellen
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";

        // Button zum li-Element hinzufügen
        todoItem.appendChild(deleteButton);

        // li-Element zur ul-Liste hinzufügen
        todoList.appendChild(todoItem);
    }
}