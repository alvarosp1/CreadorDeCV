import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Calendar, Building, GraduationCap } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  const displayDate = (startDate: string, endDate: string, current: boolean = false) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = current ? 'Presente' : formatDate(endDate);

    if (!formattedStart && !formattedEnd) return '';
    if (!formattedStart) return formattedEnd;
    if (!formattedEnd) return formattedStart;

    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="bg-white p-6 mx-auto overflow-hidden" style={{
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '794px',
      minHeight: '1123px'
    }}>
      {/* Header with personal info */}
      <header className="mb-6 relative">
        <div className="bg-[#071463] absolute top-0 right-0 left-0 h-48 -mx-6 -mt-6"></div>
        <div className="relative z-10 pt-6 px-4">
          <h1 className="text-3xl font-bold text-white mb-1">
            {data.personalInfo.name || 'Tu Nombre Completo'}
          </h1>
          <h2 className="text-[#f2ae2b] text-xl font-medium mb-4">
            {data.personalInfo.title || 'Tu Título Profesional'}
          </h2>

          <div className="flex flex-wrap items-center gap-6 text-base text-white">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-white" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}

            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-white" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}

            {data.personalInfo.location && (
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-white" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pt-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h3 className="text-[#071463] font-bold text-lg border-b-2 border-[#f2ae2b] pb-1 mb-2">Perfil Profesional</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#071463] font-bold text-lg border-b-2 border-[#f2ae2b] pb-1 mb-3">Experiencia Profesional</h3>

            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{exp.position}</h4>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Building size={14} className="mr-1 text-[#071463]" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="mx-1">|</span>
                            <span>{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {(exp.startDate || exp.endDate) && (
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar size={14} className="mr-1 text-[#071463]" />
                        <span>{displayDate(exp.startDate, exp.endDate, exp.current)}</span>
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#071463] font-bold text-lg border-b-2 border-[#f2ae2b] pb-1 mb-3">Educación</h3>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{edu.degree} en {edu.fieldOfStudy}</h4>
                      <div className="flex items-center text-gray-600 text-sm">
                        <GraduationCap size={14} className="mr-1 text-[#071463]" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>

                    {(edu.startDate || edu.endDate) && (
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar size={14} className="mr-1 text-[#071463]" />
                        <span>{displayDate(edu.startDate, edu.endDate)}</span>
                      </div>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-[#071463] font-bold text-lg border-b-2 border-[#f2ae2b] pb-1 mb-3">Habilidades</h3>

            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                            i < skill.level ? 'bg-[#071463]' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;