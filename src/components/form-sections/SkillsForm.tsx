import React, { useState } from 'react';
import { Skill } from '../../types/resume';
import { Plus, Trash2, X } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState<string>('');
  const [newLevel, setNewLevel] = useState<number>(3);

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      onChange([...data, { name: newSkill.trim(), level: newLevel }]);
      setNewSkill('');
      setNewLevel(3);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...data];
    updatedSkills.splice(index, 1);
    onChange(updatedSkills);
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Básico';
      case 2: return 'Intermedio';
      case 3: return 'Avanzado';
      case 4: return 'Experto';
      case 5: return 'Maestro';
      default: return 'Intermedio';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-lg font-semibold text-[#071463]">Habilidades</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Habilidad
              </label>
              <input
                type="text"
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                placeholder="Ej. JavaScript, Diseño Gráfico, Liderazgo..."
              />
            </div>
            
            <div>
              <label htmlFor="newLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Dominio
              </label>
              <div className="flex flex-col">
                <select
                  id="newLevel"
                  value={newLevel}
                  onChange={(e) => setNewLevel(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
                >
                  <option value={1}>Básico</option>
                  <option value={2}>Intermedio</option>
                  <option value={3}>Avanzado</option>
                  <option value={4}>Experto</option>
                  <option value={5}>Maestro</option>
                </select>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleAddSkill}
            className="mt-4 w-full flex items-center justify-center bg-[#071463] text-white px-4 py-2 rounded hover:bg-[#0a1e8a] transition-colors duration-300"
            disabled={newSkill.trim() === ''}
          >
            <Plus size={16} className="mr-1" /> Añadir Habilidad
          </button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No has añadido habilidades. Añade tus habilidades profesionales.</p>
          </div>
        ) : (
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Habilidades Añadidas</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-[#071463] bg-opacity-10 text-[#071463] px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill.name}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-xs">{getLevelLabel(skill.level)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-[#f2ae2b] p-4 rounded mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#f2ae2b]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              Añade las habilidades más relevantes para destacar en tu currículum. Ten en cuenta que los reclutadores suelen valorar habilidades específicas relacionadas con el puesto al que aplicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;