
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import WorkflowForm from '@/components/WorkflowForm';
import ResultDisplay from '@/components/ResultDisplay';
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
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Advanced mode toggled:", advancedMode);
    if (advancedMode) {
      fetchPrompts();
    }
  }, [advancedMode]);

  const fetchPrompts = async () => {
    try {
      console.log("Fetching prompts...");
      const response = await fetch(`${API_URL}/prompts`);
      const data = await response.json();
      console.log("Fetched prompts:", data);
      setGenerateCodePrompt(data.generate_code_prompt);
      setValidateOutputPrompt(data.validate_output_prompt);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch prompts. Please try again.",
        variant: "destructive",
      });
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
        description: "Failed to upload files. Please try again.",
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
        description: "Failed to remove file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting workflow...");

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
      console.error("Error running workflow:", error);
      toast({
        title: "Error",
        description: "Failed to run workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Azlon-Demo
        </h1>
        
        <div className="flex gap-6">
          <FileExplorer
            files={files}
            onFileUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />
          
          <div className="flex-1">
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
            />

            <ResultDisplay result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
