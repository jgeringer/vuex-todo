import axios from 'axios'

const state = {
    todos: [
        //// going to use an action since we are fetching it from jsonplaceholder
        // {
        //     id: 1,
        //     title: `Todo one`
        // },
        // {
        //     id: 2,
        //     title: `Todo two`
        // }
    ]
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
        commit(`setTodos`, response.data)
    },
    async addTodo({ commit }, title) {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`, { 
            title, 
            completed: false
        })
        commit(`newTodo`, response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit(`removeTodo`, id)
    },
    async filterTodos({ commit }, e) { // add 'commit' here whenever you want to do a mutations
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/?limit=${limit}`)
        commit(`setTodos`, response.data)
    },
    async updateTodo({ commit }, updatedTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)
        commit(`updatedTodo`, response.data)
    }
}

// mutations: used to add to state
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}