import React from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...data];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    onChange(updatedEducation);
  };

  const handleAddEducation = () => {
    onChange([
      ...data,
      { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#071463]">Educación</h3>
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center text-sm bg-[#071463] text-white px-3 py-1 rounded hover:bg-[#0a1e8a] transition-colors duration-300"
        >
          <Plus size={16} className="mr-1" /> Añadir
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay información de educación. Añade tu formación académica.</p>
        </div>
      ) : (
        data.map((education, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-[#071463]">Formación {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Institución *
                </label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  value={education.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                  placeholder="Ej. Universidad de Chile"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    id={`degree-${index}`}
                    value={education.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                    placeholder="Ej. Licenciatura"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`fieldOfStudy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Área de Estudio *
                  </label>
                  <input
                    type="text"
                    id={`fieldOfStudy-${index}`}
                    value={education.fieldOfStudy}
                    onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                    placeholder="Ej. Ingeniería Informática"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={education.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                  />
                </div>
                
                <div>
                  <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Fin
                  </label>
                  <input
                    type="month"
                    id={`endDate-${index}`}
                    value={education.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id={`description-${index}`}
                  value={education.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463] resize-none"
                  placeholder="Logros académicos, actividades destacadas..."
                />
              </div>
            </div>
          </div>
        ))
      )}
      
      {data.length > 0 && (
        <button
          type="button"
          onClick={handleAddEducation}
          className="w-full flex items-center justify-center text-sm border border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:text-[#071463] hover:border-[#071463] transition-colors"
        >
          <Plus size={16} className="mr-1" /> Añadir otra educación
        </button>
      )}
    </div>
  );
};

export default EducationForm;