// Todo App JavaScript
class TodoApp {
    constructor() {
        this.todos = [];
        this.todoInput = document.getElementById('todoInput');
        this.todoForm = document.getElementById('todoForm');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.completedCount = document.getElementById('completedCount');
        this.totalCount = document.getElementById('totalCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        
        this.init();
    }

    init() {
        this.loadTodos();
        this.bindEvents();
        this.updateUI();
    }

    bindEvents() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Clear completed button
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        // Enter key on input
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.todoInput.focus();
        
        this.saveTodos();
        this.updateUI();
        this.showNotification('Task added successfully!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.updateUI();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.updateUI();
        this.showNotification('Task deleted!', 'info');
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.updateUI();
        this.showNotification(`${completedCount} completed tasks cleared!`, 'info');
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                aria-label="Mark task as ${todo.completed ? 'incomplete' : 'complete'}"
            >
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button 
                class="delete-btn" 
                aria-label="Delete task"
                title="Delete task"
            >
                🗑️
            </button>
        `;

        // Add event listeners
        const checkbox = li.querySelector('.todo-checkbox');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => {
            this.toggleTodo(todo.id);
        });

        deleteBtn.addEventListener('click', () => {
            this.deleteTodo(todo.id);
        });

        return li;
    }

    updateUI() {
        // Update todo list
        this.todoList.innerHTML = '';
        
        if (this.todos.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            
            this.todos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.todoList.appendChild(todoElement);
            });
        }

        // Update stats
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        
        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;

        // Show/hide clear completed button
        if (completed > 0) {
            this.clearCompletedBtn.style.display = 'block';
        } else {
            this.clearCompletedBtn.style.display = 'none';
        }
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos:', error);
        }
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            if (saved) {
                this.todos = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.todos = [];
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            info: '#3b82f6',
            error: '#ef4444'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add todo
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const todoInput = document.getElementById('todoInput');
        if (document.activeElement === todoInput) {
            e.preventDefault();
            document.getElementById('todoForm').dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        const todoInput = document.getElementById('todoInput');
        if (document.activeElement === todoInput) {
            todoInput.value = '';
            todoInput.blur();
        }
    }
});
