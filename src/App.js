import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => { setRepository(response.data) });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { title: `cool repo ${Date.now()}`, url: "Cool url", techs: "cool techs" });
    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    //console.log(response);
    const repositoryDeletedIndex = repositories.findIndex(repo => repo.id == id);
    repositories.splice(repositoryDeletedIndex, 1);

    setRepository([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
