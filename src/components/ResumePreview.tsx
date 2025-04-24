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
    <div className="resume-preview bg-white p-4 mx-auto overflow-hidden shadow-sm" style={{
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      aspectRatio: '0.707',
      minHeight: '500px'
    }}>
      {/* Header with personal info */}
      <header className="mb-3 relative w-full">
        <div className="bg-[#071463] absolute top-0 right-0 left-0 h-32 -mx-4 -mt-4 w-full"></div>
        <div className="relative z-10 pt-3 px-3 w-full">
          <h1 className="text-xl font-bold text-white mb-0.5">
            {data.personalInfo.name || 'Tu Nombre Completo'}
          </h1>
          <h2 className="text-[#f2ae2b] text-base font-medium mb-2">
            {data.personalInfo.title || 'Tu Título Profesional'}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail size={10} className="mr-1 text-white" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}

            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone size={10} className="mr-1 text-white" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}

            {data.personalInfo.location && (
              <div className="flex items-center">
                <MapPin size={10} className="mr-1 text-white" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pt-4">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-3">
            <h3 className="text-[#071463] font-bold text-sm border-b border-[#f2ae2b] pb-0.5 mb-1">Perfil Profesional</h3>
            <p className="text-[10px] text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-3">
            <h3 className="text-[#071463] font-bold text-sm border-b border-[#f2ae2b] pb-0.5 mb-1">Experiencia Profesional</h3>

            <div className="space-y-2">
              {data.experience.map((exp, index) => (
                <div key={index} className="pb-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800 text-xs">{exp.position}</h4>
                      <div className="flex items-center text-gray-600 text-[10px]">
                        <Building size={10} className="mr-0.5 text-[#071463]" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="mx-0.5">|</span>
                            <span>{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {(exp.startDate || exp.endDate) && (
                      <div className="text-[10px] text-gray-600 flex items-center">
                        <Calendar size={10} className="mr-0.5 text-[#071463]" />
                        <span>{displayDate(exp.startDate, exp.endDate, exp.current)}</span>
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-[10px] text-gray-700 mt-0.5">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-3">
            <h3 className="text-[#071463] font-bold text-sm border-b border-[#f2ae2b] pb-0.5 mb-1">Educación</h3>

            <div className="space-y-2">
              {data.education.map((edu, index) => (
                <div key={index} className="pb-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800 text-xs">{edu.degree} en {edu.fieldOfStudy}</h4>
                      <div className="flex items-center text-gray-600 text-[10px]">
                        <GraduationCap size={10} className="mr-0.5 text-[#071463]" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>

                    {(edu.startDate || edu.endDate) && (
                      <div className="text-[10px] text-gray-600 flex items-center">
                        <Calendar size={10} className="mr-0.5 text-[#071463]" />
                        <span>{displayDate(edu.startDate, edu.endDate)}</span>
                      </div>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-[10px] text-gray-700 mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-[#071463] font-bold text-sm border-b border-[#f2ae2b] pb-0.5 mb-1">Habilidades</h3>

            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-1.5 py-0.5">
                  <div className="flex items-center">
                    <span className="text-[10px] font-medium">{skill.name}</span>
                    <div className="ml-1 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 h-0.5 rounded-full mx-0.5 ${
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