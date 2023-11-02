document.addEventListener('DOMContentLoaded', () => {
    let todoItems = document.querySelectorAll('li');
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].addEventListener("mouseenter", () => {
            todoItems[i].classList.add("display-edit-btns")
        });
        todoItems[i].addEventListener("mouseleave", () => {
            todoItems[i].classList.remove("display-edit-btns")
        });
    }
});