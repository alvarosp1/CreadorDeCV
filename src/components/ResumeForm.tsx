import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import PersonalInfoForm from './form-sections/PersonalInfoForm';
import EducationForm from './form-sections/EducationForm';
import ExperienceForm from './form-sections/ExperienceForm';
import SkillsForm from './form-sections/SkillsForm';
import { Book, Briefcase as BriefcaseBusiness, User2, Lightbulb } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>('personal');

  const handlePersonalInfoChange = (personalInfo: typeof data.personalInfo) => {
    onChange({ ...data, personalInfo });
  };

  const handleEducationChange = (education: typeof data.education) => {
    onChange({ ...data, education });
  };

  const handleExperienceChange = (experience: typeof data.experience) => {
    onChange({ ...data, experience });
  };

  const handleSkillsChange = (skills: typeof data.skills) => {
    onChange({ ...data, skills });
  };

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: <User2 size={18} /> },
    { id: 'education', label: 'Educación', icon: <Book size={18} /> },
    { id: 'experience', label: 'Experiencia', icon: <BriefcaseBusiness size={18} /> },
    { id: 'skills', label: 'Habilidades', icon: <Lightbulb size={18} /> },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#071463] mb-6">Crear Currículum</h2>
      
      <div className="flex overflow-x-auto mb-6 pb-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#071463] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-md">
        {activeTab === 'personal' && (
          <PersonalInfoForm 
            data={data.personalInfo} 
            onChange={handlePersonalInfoChange} 
          />
        )}
        
        {activeTab === 'education' && (
          <EducationForm 
            data={data.education} 
            onChange={handleEducationChange} 
          />
        )}
        
        {activeTab === 'experience' && (
          <ExperienceForm 
            data={data.experience} 
            onChange={handleExperienceChange} 
          />
        )}
        
        {activeTab === 'skills' && (
          <SkillsForm 
            data={data.skills} 
            onChange={handleSkillsChange} 
          />
        )}
      </div>
    </div>
  );
};

export default ResumeForm;