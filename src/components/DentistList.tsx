import React from 'react';
import { Dentist } from '../types';

interface DentistListProps {
  dentists: Dentist[];
  onEdit: (dentist: Dentist) => void;
  onDelete: (id: number) => void;
}

const DentistList: React.FC<DentistListProps> = ({ dentists, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Dentistas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dentists.map((dentist) => (
            <tr key={dentist.id}>
              <td>{dentist.nombre}</td>
              <td>{dentist.apellido}</td>
              <td>{dentist.especialidad}</td>
              <td>
                <button onClick={() => onEdit(dentist)}>Editar</button>
                <button onClick={() => onDelete(dentist.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DentistList;