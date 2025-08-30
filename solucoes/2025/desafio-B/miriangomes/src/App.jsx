import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Edit3, Trash2, Check, X, Download, Upload, Search, Calendar, Tag } from 'lucide-react';
import './App.css';

const Header = ({ todoCount, completedCount }) => (
  <div className="header">
    <div className="header-content">
      <h1 className="header-title">
        📝 Lista de Tarefas
      </h1>
      <div className="header-stats">
        <span>Pendentes: <strong className="stat-pending">{todoCount}</strong></span>
        <span>Concluídas: <strong className="stat-completed">{completedCount}</strong></span>
      </div>
    </div>
  </div>
);

const AddTodoForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    texto: '',
    prioridade: 'media',
    categoria: '',
    dataVencimento: ''
  });

  const handleSubmit = () => {
    if (formData.texto.trim()) {
      onAdd(formData);
      setFormData({ texto: '', prioridade: 'media', categoria: '', dataVencimento: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="add-todo-form">
      <div className="form-content">
        <div className="form-main">
          <input
            type="text"
            value={formData.texto}
            onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="Nova tarefa..."
            className="todo-input"
          />
          <button
            onClick={handleSubmit}
            className="add-button"
          >
            <Plus size={20} />
            Adicionar
          </button>
        </div>
        
        <div className="form-fields">
          <select
            value={formData.prioridade}
            onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
            className="form-select"
          >
            <option value="baixa">Prioridade Baixa</option>
            <option value="media">Prioridade Média</option>
            <option value="alta">Prioridade Alta</option>
          </select>
          
          <input
            type="text"
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            placeholder="Categoria (opcional)"
            className="form-input"
          />
          
          <input
            type="date"
            value={formData.dataVencimento}
            onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
};

const Filters = ({ activeFilter, onFilterChange, searchTerm, onSearchChange, onClearCompleted, onExport, onImport }) => {
  const filters = [
    { key: 'todas', label: 'Todas' },
    { key: 'pendentes', label: 'Pendentes' },
    { key: 'concluidas', label: 'Concluídas' }
  ];

  return (
    <div className="filters">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-button ${activeFilter === filter.key ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar tarefas..."
            className="search-input"
          />
        </div>
      </div>
      
      <div className="action-buttons">
        <button
          onClick={onClearCompleted}
          className="action-button clear-button"
        >
          Limpar Concluídas
        </button>
        <button
          onClick={onExport}
          className="action-button export-button"
        >
          <Download size={16} />
          Exportar
        </button>
        <label className="action-button import-button">
          <Upload size={16} />
          Importar
          <input type="file" accept=".json" onChange={onImport} className="file-input" />
        </label>
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.texto);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { texto: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.texto);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const getPriorityLabel = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'Alta';
      case 'media': return 'Média';
      case 'baixa': return 'Baixa';
      default: return 'Média';
    }
  };

  const isOverdue = todo.dataVencimento && new Date(todo.dataVencimento) < new Date() && !todo.concluida;

  return (
    <div className={`todo-item ${todo.concluida ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <button
          onClick={() => onToggle(todo.id)}
          className={`todo-checkbox ${todo.concluida ? 'checked' : ''}`}
        >
          {todo.concluida && <Check size={12} />}
        </button>
        
        <div className="todo-main">
          {isEditing ? (
            <div className="edit-mode">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="edit-input"
                autoFocus
              />
              <button onClick={handleSave} className="save-button">
                <Check size={16} />
              </button>
              <button onClick={handleCancel} className="cancel-button">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div>
              <p className="todo-text" onDoubleClick={() => setIsEditing(true)}>
                {todo.texto}
              </p>
              
              <div className="todo-meta">
                <span className={`priority-badge priority-${todo.prioridade}`}>
                  {getPriorityLabel(todo.prioridade)}
                </span>
                
                {todo.categoria && (
                  <span className="category-badge">
                    <Tag size={12} />
                    {todo.categoria}
                  </span>
                )}
                
                {todo.dataVencimento && (
                  <span className={`date-badge ${isOverdue ? 'overdue-date' : ''}`}>
                    <Calendar size={12} />
                    {new Date(todo.dataVencimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit-btn"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="action-btn delete-btn"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todoApp');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((formData) => {
    const newTodo = {
      id: Date.now(),
      texto: formData.texto.trim(),
      concluida: false,
      prioridade: formData.prioridade,
      categoria: formData.categoria.trim(),
      dataVencimento: formData.dataVencimento,
      criadaEm: new Date().toISOString(),
      editadaEm: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, concluida: !todo.concluida, editadaEm: new Date().toISOString() }
        : todo
    ));
  }, []);

  const updateTodo = useCallback((id, updates) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, editadaEm: new Date().toISOString() }
        : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.concluida));
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `todos-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [todos]);

  const importData = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTodos = JSON.parse(e.target.result);
          if (Array.isArray(importedTodos)) {
            setTodos(importedTodos);
          } else {
            alert('Formato de arquivo inválido');
          }
        } catch (error) {
          alert('Erro ao importar arquivo');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    switch (filter) {
      case 'pendentes':
        filtered = filtered.filter(todo => !todo.concluida);
        break;
      case 'concluidas':
        filtered = filtered.filter(todo => todo.concluida);
        break;
    }

    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.texto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const priorityOrder = { alta: 3, media: 2, baixa: 1 };
      const priorityDiff = priorityOrder[b.prioridade] - priorityOrder[a.prioridade];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.criadaEm) - new Date(a.criadaEm);
    });
  }, [todos, filter, searchTerm]);

  const todoCount = todos.filter(todo => !todo.concluida).length;
  const completedCount = todos.filter(todo => todo.concluida).length;

  return (
    <div className="app">
      <Header todoCount={todoCount} completedCount={completedCount} />
      
      <div className="container">
        <AddTodoForm onAdd={addTodo} />
        
        <Filters
          activeFilter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearCompleted={clearCompleted}
          onExport={exportData}
          onImport={importData}
        />
        
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {todos.length === 0 ? 'Nenhuma tarefa ainda. Adicione uma nova!' : 'Nenhuma tarefa encontrada.'}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
        
        {todos.length > 0 && (
          <div className="stats-footer">
            <div className="stats-grid">
              <div>Total: <strong>{todos.length}</strong></div>
              <div>Pendentes: <strong>{todoCount}</strong></div>
              <div>Concluídas: <strong>{completedCount}</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;