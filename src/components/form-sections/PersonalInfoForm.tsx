import React from 'react';
import { PersonalInfo } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold text-[#071463] mb-4">Información Personal</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título Profesional *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
              placeholder="Ej. Ingeniero de Software"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline mr-1" /> Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
              placeholder="Ej. correo@ejemplo.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <Phone size={16} className="inline mr-1" /> Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
              placeholder="Ej. +56 9 1234 5678"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={16} className="inline mr-1" /> Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
            placeholder="Ej. Santiago, Chile"
          />
        </div>
        
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Resumen Profesional
          </label>
          <textarea
            id="summary"
            name="summary"
            value={data.summary}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463] resize-none"
            placeholder="Breve descripción de tu perfil profesional..."
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">* Campos obligatorios</p>
    </div>
  );
};

export default PersonalInfoForm;