import React from 'react';
import { FileText, Image, ExternalLink } from 'lucide-react';

interface FileViewerProps {
  url?: string;
  type: 'poster' | 'approval';
  className?: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ url, type, className = '' }) => {
  if (!url) return null;

  const isPdf = url.toLowerCase().includes('.pdf');
  const label = type === 'poster' ? 'View Event Poster' : 'View Approval Letter';
  const icon = isPdf ? <FileText className="w-4 h-4" /> : <Image className="w-4 h-4" />;

  return (
    <div className={`${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
      >
        {icon}
        <span>{label}</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

export default FileViewer;