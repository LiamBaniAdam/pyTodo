document.addEventListener('DOMContentLoaded', () => {
    let targetNode = document.querySelector('ul');
    const config = { attributes: true, childList: true, subtree: true };
    let callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                addClasses();
            }
        }
    };
    addClasses();
    let observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});

function addClasses() {
    let todoItems = document.querySelectorAll('li');
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].addEventListener("click", () => {
            id = todoItems[i].id;
            if (!todoItems[i].classList.contains('checked')) {
                todoItems[i].classList.add('checked');
                $.ajax({
                    url: 'todo/edit/',
                    data: {
                        'id': id,
                        'status': 'True'
                    },
                    dataType: 'json',
                })
            }
            else {
                todoItems[i].classList.remove('checked');
                $.ajax({
                    url: 'todo/edit/',
                    data: {
                        'id': id,
                        'status': 'False'
                    },
                    dataType: 'json',
                })
            }
        });
        todoItems[i].addEventListener("mouseenter", () => {
            todoItems[i].classList.add("display-edit-btns")
        });
        todoItems[i].addEventListener("mouseleave", () => {
            todoItems[i].classList.remove("display-edit-btns")
        });
    }
}

let frm = $('#addTodo');
frm.submit(() => {
    let todoName = $('input[name="add"]').val();
    if (todoName) {
        $.ajax({
            url: 'todo/add/',
            data: frm.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.added) {
                    appendToTodoTable(data.added);
                }
            }
        });
    }
    else {
        alert("All fields must have a valid value.");
    }
    $('form#addTodo').trigger("reset");
    return false;
});

let lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;

function appendToTodoTable(todo) {
    todo.name = todo.name.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    $('#myUL').append(`<li id="${todo.id}">${todo.id} ${todo.name} <button class="button"
            onclick="deleteTodo(${todo.id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg></button>
    </li>`)
};

function deleteTodo(id) {
    let action = confirm("Are you sure you want to delete this Todo?");
    if (action != false) {
        $.ajax({
            url: 'todo/delete/',
            data: {
                'id': id,
            },
            dataType: 'json',
            success: function (data) {
                if (data.deleted) {
                    $("#" + id).remove();
                }
            }
        });
    }
    event.stopPropagation();
};