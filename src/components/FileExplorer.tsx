
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileExplorerProps {
  files: File[];
  onFileUpload: (files: File[]) => void;
  onFileRemove: (fileName: string) => void;
}

const FileExplorer = ({ files, onFileUpload, onFileRemove }: FileExplorerProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="section-card">
      <h2 className="text-lg font-semibold mb-4">INPUT FILES</h2>
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.name} className="text-sm">
            {file.name}
          </div>
        ))}
      </div>
      <label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <Button className="w-full mt-4" variant="secondary">
          UPLOAD
        </Button>
      </label>
    </div>
  );
};

export default FileExplorer;
