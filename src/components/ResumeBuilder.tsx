import React, { useState, useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { ResumeData, emptyResumeData } from '../types/resume';
import { Download, FileCheck } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("PDF Generation Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-4 text-center">
          Ocurrió un error al generar el PDF. Por favor, inténtalo de nuevo.
        </div>
      );
    }
    return this.props.children;
  }
}

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [pdfSize, setPdfSize] = useState<string>('A4');

  // Función personalizada para generar el PDF con el tamaño correcto
  const generatePDF = () => {
    // Obtenemos el elemento que queremos convertir a PDF
    const element = targetRef.current;
    if (!element) return;

    // Creamos un nuevo objeto jsPDF
    import('jspdf').then(({ default: jsPDF }) => {
      import('html2canvas').then(({ default: html2canvas }) => {
        // Configuración de html2canvas
        html2canvas(element, {
          scale: 3, // Escala alta para mejor calidad
          useCORS: true,
          letterRendering: true,
          logging: false
        }).then(canvas => {
          // Creamos un nuevo PDF con el tamaño A4
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          // Obtenemos las dimensiones del canvas
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Añadimos la imagen al PDF
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

          // Guardamos el PDF
          pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
        });
      });
    });
  };

  // Configuración básica para la vista previa
  const pdfOptions = {
    filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
    page: {
      format: pdfSize as any,
      orientation: 'portrait'
    },
    method: 'save'
  };

  const { toPDF, targetRef } = usePDF(pdfOptions);

  const handleFormChange = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <ResumeForm data={resumeData} onChange={handleFormChange} />
      </div>

      <div className="lg:w-1/2">
        <div className="sticky top-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold text-[#071463] mb-3">Vista Previa</h2>
            <ErrorBoundary>
              <div className="bg-gray-100 p-0 rounded overflow-auto" style={{ maxWidth: '100%' }}>
                <div
                  ref={targetRef}
                  className="mx-auto"
                  style={{ width: 'fit-content' }}
                >
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </ErrorBoundary>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-[#071463] mb-3">Descargar CV</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tamaño del PDF
              </label>
              <select
                value={pdfSize}
                onChange={(e) => setPdfSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-[#071463] focus:border-[#071463]"
              >
                <option value="A4">A4 (Recomendado)</option>
                <option value="letter">Carta</option>
                <option value="legal">Legal</option>
              </select>
            </div>

            <button
              onClick={generatePDF}
              className="w-full bg-[#071463] hover:bg-[#0a1e8a] text-white font-medium py-2 px-4 rounded flex items-center justify-center transition-colors duration-300"
            >
              <Download size={20} className="mr-2" />
              Descargar PDF
            </button>

            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <FileCheck size={16} className="mr-1 text-green-500" />
              Todos los datos permanecen en tu dispositivo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;