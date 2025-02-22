import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Download, Send } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeProject, setActiveProject] = useState(1);
  const [mode, setMode] = useState("DEFAULT MODE");
  const [prompt, setPrompt] = useState("Fit different models to the data in file1.csv, perform cross-validation, print MSE for all models, plot the distribution of data.");
  const [testConditions, setTestConditions] = useState("No errors\nPlots look beautiful");
  const [progress1, setProgress1] = useState(65);
  const [progress2, setProgress2] = useState(30);
  const [files, setFiles] = useState<string[]>([
    "data.csv",
    "labels.csv"
  ]);
  const [outputFiles, setOutputFiles] = useState<string[]>([
    "file1.py",
    "file2.py",
    "plot.pdf"
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload
    toast({
      title: "Success",
      description: "File uploaded successfully.",
    });
  };

  const handleDownload = () => {
    // Handle download
    toast({
      title: "Success",
      description: "Files downloaded successfully.",
    });
  };

  const handleSend = () => {
    // Handle send
    toast({
      title: "Processing",
      description: "Running models...",
    });
  };

  const handleHumanInTheLoop = () => {
    navigate('/hil');
  };

  const ProjectTab = ({ number, progress, isActive }: { number: number; progress: number; isActive: boolean }) => (
    <div 
      className={`relative cursor-pointer ${isActive ? 'z-10' : ''}`}
      onClick={() => setActiveProject(number)}
    >
      <Button 
        variant="secondary"
        className={`
          relative bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B] pr-12
          ${isActive ? 'border-b-0' : ''}
        `}
      >
        {`PROJECT_${number}_NAME`}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="relative w-6 h-6">
            <svg className="w-6 h-6 transform -rotate-90">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="transparent"
                className="opacity-25"
              />
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="#4CAF50"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 8}`}
                strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
              />
            </svg>
          </div>
        </div>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D4B6B] p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        {/* Header */}
        <div className="flex gap-2">
          <ProjectTab number={1} progress={progress1} isActive={activeProject === 1} />
          <ProjectTab number={2} progress={progress2} isActive={activeProject === 2} />
        </div>

        {/* Mode Switch */}
        <div className={`w-full p-4 rounded-lg flex items-center mt-4 ${
          mode === "DEFAULT MODE" 
            ? 'bg-[#FFDEE2] border-2 border-[#0D4B6B]' 
            : 'bg-[#FFDEE2] border-2 border-[#0D4B6B]'
        }`}>
          <Switch 
            checked={mode === "ADVANCED MODE"}
            onCheckedChange={(checked) => setMode(checked ? "ADVANCED MODE" : "DEFAULT MODE")}
            className={`
              border-2 border-[#0D4B6B] 
              ${mode === "ADVANCED MODE" 
                ? 'bg-[#0D4B6B] data-[state=checked]:bg-[#0D4B6B]' 
                : 'bg-[#FFDEE2] data-[state=unchecked]:bg-[#FFDEE2]'
              }
              [&>span]:bg-[#221F26]
            `}
          />
          <span className="ml-2 font-medium text-[#0D4B6B]">{mode}</span>
        </div>

        {/* Main Content */}
        <ResizablePanelGroup 
          direction="horizontal" 
          className="flex-grow mt-4 gap-4"
        >
          {/* Input Section */}
          <ResizablePanel defaultSize={30}>
            <div className="bg-[#FFDEE2] rounded-lg p-4 flex flex-col h-full">
              <h2 className="text-[#0D4B6B] font-bold mb-4">INPUT</h2>
              <div className="space-y-2 flex-grow mb-4 overflow-y-auto">
                {files.map((file) => (
                  <div key={file} className="text-[#0D4B6B]">{file}</div>
                ))}
              </div>
              <Button 
                variant="secondary" 
                className="w-full bg-[#0D4B6B] text-white hover:bg-[#0D5B7B]"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                UPLOAD
              </Button>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent" />

          {/* Middle Section */}
          <ResizablePanel defaultSize={40}>
            <div className="space-y-4 h-full">
              {/* Prompt Section */}
              <div className="bg-[#FFDEE2] rounded-lg p-4">
                <h2 className="text-[#0D4B6B] font-bold mb-4">PROMPT</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 bg-transparent text-[#0D4B6B] resize-none focus:outline-none"
                />
                <Button 
                  variant="secondary" 
                  className="w-full bg-[#0D4B6B] text-white hover:bg-[#0D5B7B]"
                  onClick={handleSend}
                >
                  <Send className="mr-2 h-4 w-4" />
                  SEND
                </Button>
              </div>

              {/* Test Conditions (only visible in Advanced Mode) */}
              {mode === "ADVANCED MODE" && (
                <div className="bg-[#FFDEE2] rounded-lg p-4">
                  <h2 className="text-[#0D4B6B] font-bold mb-4">TEST CONDITIONS</h2>
                  <textarea
                    value={testConditions}
                    onChange={(e) => setTestConditions(e.target.value)}
                    className="w-full h-32 bg-transparent text-[#0D4B6B] resize-none focus:outline-none"
                  />
                </div>
              )}

              {/* Progress Circle (only visible in Default Mode) */}
              {mode === "DEFAULT MODE" && (
                <div className="flex justify-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="36"
                        stroke="#0D4B6B"
                        strokeWidth="8"
                        fill="transparent"
                        className="opacity-25"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="36"
                        stroke="#4CAF50"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - (activeProject === 1 ? progress1 : progress2) / 100)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[#0D4B6B] font-bold text-xl">
                      {activeProject === 1 ? progress1 : progress2}%
                    </div>
                  </div>
                </div>
              )}

              {/* Human in the Loop Button (only visible in Advanced Mode) */}
              {mode === "ADVANCED MODE" && (
                <Button 
                  variant="secondary" 
                  className="w-full bg-[#F4511E] text-white hover:bg-[#E64A19]"
                  onClick={handleHumanInTheLoop}
                >
                  HUMAN-IN-THE-LOOP
                </Button>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent" />

          {/* Output Section */}
          <ResizablePanel defaultSize={30}>
            <div className="bg-[#FFDEE2] rounded-lg p-4 flex flex-col h-full">
              <h2 className="text-[#0D4B6B] font-bold mb-4">OUTPUT</h2>
              <div className="space-y-2 flex-grow mb-4 overflow-y-auto">
                {outputFiles.map((file) => (
                  <div key={file} className="text-[#0D4B6B]">{file}</div>
                ))}
              </div>
              <Button 
                variant="secondary" 
                className="w-full bg-[#0D4B6B] text-white hover:bg-[#0D5B7B]"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                DOWNLOAD
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
