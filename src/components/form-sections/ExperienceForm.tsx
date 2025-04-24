import React from 'react';
import { Experience } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = [...data];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    onChange(updatedExperience);
  };

  const handleAddExperience = () => {
    onChange([
      ...data,
      { 
        company: '', 
        position: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        current: false,
        description: '' 
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...data];
    updatedExperience.splice(index, 1);
    onChange(updatedExperience);
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    const updatedExperience = [...data];
    updatedExperience[index] = { 
      ...updatedExperience[index], 
      current: checked, 
      endDate: checked ? '' : updatedExperience[index].endDate 
    };
    onChange(updatedExperience);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#071463]">Experiencia Laboral</h3>
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center text-sm bg-[#071463] text-white px-3 py-1 rounded hover:bg-[#0a1e8a] transition-colors duration-300"
        >
          <Plus size={16} className="mr-1" /> Añadir
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay experiencia laboral. Añade tus experiencias profesionales.</p>
        </div>
      ) : (
        data.map((experience, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-[#071463]">Experiencia {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id={`company-${index}`}
                    value={experience.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                    placeholder="Ej. Empresa ABC"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    id={`position-${index}`}
                    value={experience.position}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                    placeholder="Ej. Desarrollador Full Stack"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  id={`location-${index}`}
                  value={experience.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                  placeholder="Ej. Santiago, Chile"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={experience.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                  />
                </div>
                
                <div>
                  <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Fin
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="month"
                      id={`endDate-${index}`}
                      value={experience.endDate}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                      disabled={experience.current}
                    />
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        checked={experience.current}
                        onChange={(e) => handleCurrentChange(index, e.target.checked)}
                        className="h-4 w-4 text-[#071463] focus:ring-[#071463] border-gray-300 rounded"
                      />
                      <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                        Trabajo actual
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción de responsabilidades
                </label>
                <textarea
                  id={`description-${index}`}
                  value={experience.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463] resize-none"
                  placeholder="Describe tus responsabilidades y logros..."
                />
              </div>
            </div>
          </div>
        ))
      )}
      
      {data.length > 0 && (
        <button
          type="button"
          onClick={handleAddExperience}
          className="w-full flex items-center justify-center text-sm border border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:text-[#071463] hover:border-[#071463] transition-colors"
        >
          <Plus size={16} className="mr-1" /> Añadir otra experiencia
        </button>
      )}
    </div>
  );
};

export default ExperienceForm;