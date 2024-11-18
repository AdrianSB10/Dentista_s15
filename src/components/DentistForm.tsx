import React, { useState, useEffect } from 'react';
import { Dentist } from '../types';

interface DentistFormProps {
  onAddDentist: (dentist: Omit<Dentist, 'id'>) => void;
  onUpdateDentist: (dentist: Dentist) => void;
  currentDentist: Dentist | null;
}

const DentistForm: React.FC<DentistFormProps> = ({ onAddDentist, onUpdateDentist, currentDentist }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  useEffect(() => {
    if (currentDentist) {
      setNombre(currentDentist.nombre);
      setApellido(currentDentist.apellido);
      setEspecialidad(currentDentist.especialidad);
    }
  }, [currentDentist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentDentist) {
      onUpdateDentist({ id: currentDentist.id, nombre, apellido, especialidad });
    } else {
      onAddDentist({ nombre, apellido, especialidad });
    }
    setNombre('');
    setApellido('');
    setEspecialidad('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div>
        <label>Especialidad:</label>
        <input
          type="text"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        />
      </div>
      <button type="submit">{currentDentist ? 'Actualizar Dentista' : 'Agregar Dentista'}</button>
    </form>
  );
};

export default DentistForm;