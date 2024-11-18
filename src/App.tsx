import React, { useEffect, useState } from 'react';
import DentistForm from './components/DentistForm';
import DentistList from './components/DentistList';
import { Dentist } from './types';
import './App.css';

const App: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [currentDentist, setCurrentDentist] = useState<Dentist | null>(null);

  useEffect(() => {
    fetch('/clinicadental/dentistas')
      .then(response => response.json())
      .then(data => setDentists(data));
  }, []);

  const addDentist = (dentist: Omit<Dentist, 'id'>) => {
    fetch('/clinicadental/dentistas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dentist),
    })
      .then(response => response.json())
      .then(newDentist => setDentists([...dentists, newDentist]));
  };

  const updateDentist = (dentist: Dentist) => {
    fetch(`/clinicadental/dentistas/${dentist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dentist),
    })
      .then(response => response.json())
      .then(updatedDentist => {
        setDentists(dentists.map(d => (d.id === updatedDentist.id ? updatedDentist : d)));
        setCurrentDentist(null);
      });
  };

  const deleteDentist = (id: number) => {
    fetch(`/clinicadental/dentistas/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setDentists(dentists.filter(dentist => dentist.id !== id));
    });
  };

  const editDentist = (dentist: Dentist) => {
    setCurrentDentist(dentist);
  };

  return (
    <div className="container">
      <h1>Gestión de Dentistas</h1>
      <div className="form-container">
        <DentistForm onAddDentist={addDentist} onUpdateDentist={updateDentist} currentDentist={currentDentist} />
        <img src="/public/dentist.jpg" alt="Dentista" className="dentist-image" />
      </div>
      <DentistList dentists={dentists} onEdit={editDentist} onDelete={deleteDentist} />
    </div>
  );
};

export default App;