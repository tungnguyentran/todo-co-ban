class TodoForm {
    constructor() {
        this.cacheElements();
        this.init();
        this.initEvent();
    }
    cacheElements() {
        this.$listTodo = document.getElementById('listTodo');
        this.$todoInput = document.getElementById('todoInput');
        this.$addBtn = document.getElementById('addBtn');
    }

    init() {
        this.buildTodoList();
    }
    initEvent() {
        this.$addBtn.addEventListener("click", () => {
            this.addNewTodo();
        });
        this.$listTodo.addEventListener("click", (e) => {
            // console.log(e);
            // console.log(e.target.tagName === "I" &&);
            // console.log(e.currentTarget);
        })
    }

    buildTodoList() {
        const promise = this.fetchTodoList();
        promise.then(response => {
            response.data.forEach((todo, index) => {
                let checked = "";
                if (todo.completed) {
                    checked = "checked"
                }
                let listItem = document.createElement('li');
                listItem.innerHTML = `<div class="d-flex align-items-center">
                                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." ${checked} />
                                            ${todo.title}
                                        </div>
                                        <a href="#" data-mdb-toggle="tooltip" title="Remove item">
                                            <i class="fas fa-times text-primary remove"></i>
                                        </a>`;
                listItem.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2");
                this.$listTodo.appendChild(listItem);
            });
        }).catch(e => {
            console.error(e);
        });
    }

    addNewTodo() {
        let title = this.$todoInput.value;
        let listItem = document.createElement('li');
        listItem.innerHTML = `<div class="d-flex align-items-center">
                                    <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                                    ${title}
                                </div>
                                <a href="#" data-mdb-toggle="tooltip" title="Remove item">
                                    <i class="fas fa-times text-primary"></i>
                                </a>`;
        listItem.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2");
        this.$listTodo.prepend(listItem);
        this.$todoInput.value = "";
    }

    async fetchTodoList() {
        try {
            return await axios.get("https://jsonplaceholder.typicode.com/todos");
        } catch (error) {
            throw new Error(error);
        }
    }
}

/// build list todo -> async await (promise) => gọi api "https://jsonplaceholder.typicode.com/posts"

// addNewTodo => cho todo mới nhất lên trên đầu


// nâng cao hơn => làm remove todo