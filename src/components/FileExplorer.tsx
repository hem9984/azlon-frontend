
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Folder, File, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FileExplorerProps {
  files: File[];
  onFileUpload: (files: File[]) => void;
  onFileRemove: (fileName: string) => void;
}

const FileExplorer = ({ files, onFileUpload, onFileRemove }: FileExplorerProps) => {
  const { toast } = useToast();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <Card className="w-64 h-[calc(100vh-8rem)] flex flex-col overflow-hidden card-glow">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Input Files
        </h3>
      </div>
      
      <div 
        {...getRootProps()} 
        className={`flex-1 relative ${isDragActive ? 'bg-primary/10' : ''}`}
      >
        <input {...getInputProps()} />
        
        <ScrollArea className="h-full">
          <div className="p-2 space-y-1">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary group"
              >
                <File className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6"
                  onClick={() => onFileRemove(file.name)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {isDragActive && (
          <div className="absolute inset-0 border-2 border-dashed border-primary rounded-lg bg-primary/5 flex items-center justify-center">
            <p className="text-primary text-sm">Drop files here</p>
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full text-xs"
          {...getRootProps()}
        >
          Upload Files
        </Button>
      </div>
    </Card>
  );
};

export default FileExplorer;
