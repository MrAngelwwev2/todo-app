import React, { useState } from 'react';
import './styles.css';

// Definir una lista de categorías
const categorias = ["Urgente", "Media", "Baja"];

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState(''); // Estado para la categoría

  const [filterCategory, setFilterCategory] = useState('');

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { title: newTodo, description: newDescription, category: newCategory, completed: false }]);
      setNewTodo('');
      setNewDescription('');
      setNewCategory('');
    }
  };

  const editTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const markAsCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
  };

  const markAsIncomplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = false;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <label>Filtrar por Categoría: </label>
        <select
          value={filterCategory}
          onChange={(e) => handleFilterCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Título de la Tarea"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción de la Tarea"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <select // Lista desplegable de categorías
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      <button onClick={addTodo}>Agregar Tarea</button>
      <ul>
        {todos
          .filter((todo) => filterCategory === '' || todo.category === filterCategory)
          .map((todo, index) => (
            <li key={index} style={{ backgroundColor: todo.completed ? '#d3ffd3' : '#ffd3d3' }}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Categoría: {todo.category}</p>
              <button onClick={() => markAsCompleted(index)}>Completada</button>
              <button onClick={() => markAsIncomplete(index)}>Incompleta</button>
              <button onClick={() => {
                const updatedTitle = prompt('Nuevo título:', todo.title);
                const updatedDescription = prompt('Nueva descripción:', todo.description);
                const updatedCategory = prompt('Nueva categoría:', todo.category);
                editTodo(index, {
                  title: updatedTitle || todo.title,
                  description: updatedDescription || todo.description,
                  category: updatedCategory || todo.category,
                  completed: todo.completed
                });
              }}>Editar</button>
              <button onClick={() => deleteTodo(index)}>Eliminar</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
