
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import WorkflowForm from '@/components/WorkflowForm';
import FileExplorer from '@/components/FileExplorer';

const API_URL = "https://anthonylamelas.tail9dec88.ts.net:8443";

const Index = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [testConditions, setTestConditions] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [generateCodePrompt, setGenerateCodePrompt] = useState("");
  const [validateOutputPrompt, setValidateOutputPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (advancedMode) {
        console.log("Updating prompts...");
        await fetch(`${API_URL}/prompts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generate_code_prompt: generateCodePrompt,
            validate_output_prompt: validateOutputPrompt
          })
        });
      }

      console.log("Running workflow...");
      const response = await fetch(`${API_URL}/run_workflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_prompt: userPrompt,
          test_conditions: testConditions
        })
      });

      const data = await response.json();
      console.log("Workflow result:", data);
      setResult(data);
      toast({
        title: "Success",
        description: "Workflow completed successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (newFiles: File[]) => {
    try {
      console.log("Uploading files:", newFiles);
      
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      toast({
        title: "Success",
        description: "Files uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Failed to upload files.",
        variant: "destructive",
      });
    }
  };

  const handleFileRemove = async (fileName: string) => {
    try {
      const response = await fetch(`${API_URL}/files/${fileName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${fileName}`);
      }

      setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
      toast({
        title: "Success",
        description: "File removed successfully.",
      });
    } catch (error) {
      console.error("Error removing file:", error);
      toast({
        title: "Error",
        description: "Failed to remove file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="app-container">
      <div className="max-w-7xl mx-auto">
        <div className="project-header">
          <Button variant="secondary">PROJECT_1_NAME</Button>
          <Button variant="secondary">PROJECT_2_NAME</Button>
        </div>
        
        <WorkflowForm
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          testConditions={testConditions}
          setTestConditions={setTestConditions}
          advancedMode={advancedMode}
          setAdvancedMode={setAdvancedMode}
          generateCodePrompt={generateCodePrompt}
          setGenerateCodePrompt={setGenerateCodePrompt}
          validateOutputPrompt={validateOutputPrompt}
          setValidateOutputPrompt={setValidateOutputPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default Index;
