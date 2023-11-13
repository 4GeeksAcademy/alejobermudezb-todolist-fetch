import React, { useState, useEffect } from 'react';

// Componente de inicio
function Todo() {
    //Crear un estado

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const createUser = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/AlejoBermudez', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      });
  
      if (response.ok) {
        console.log('Usuario creado correctamente');
      } else {
        console.log('Error al crear el usuario');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    createUser();
    fetchTodos();
  }, []);
  

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/AlejoBermudez', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data);
        setTotal(data.length);
      } else {
        console.log('Error al obtener los datos');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputCambio = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newTodo = {
        label: inputValue,
        done: false
      };

      try {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/AlejoBermudez', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([...todos, newTodo])
        });

        if (response.ok) {
          setTodos([...todos, newTodo]);
          setInputValue('');
          setTotal(total + 1);
        } else {
          console.log('Error al agregar la tarea');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBorrarTodo = async (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/AlejoBermudez', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodos)
      });

      if (response.ok) {
        setTodos(newTodos);
        setTotal(total - 1);
      } else {
        console.log('Error al borrar la tarea');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLimpiarTodas = async () => {
    try {
      const response = await fetch(
        'https://playground.4geeks.com/apis/fake/todos/user/AlejoBermudez',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        setTodos([]);
        setTotal(0);
        createUser();
      } else {
        console.log('Error al limpiar las tareas');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todos</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputCambio}
        onKeyPress={handleAddTodo}
        placeholder="Add a new task"
        className="todo-input"
      />
      {todos.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul className="todo-items">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo.label}
              <button onClick={() => handleBorrarTodo(index)} className="delete-button">
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="total">
        {total} {total === 1 ? 'item left' : 'items left'}
      </div>
      <button onClick={handleLimpiarTodas} className="btn btn-success">
        Clear All
      </button>

    </div>
  );
}

export default Todo;