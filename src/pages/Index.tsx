
import React, { useState, useEffect } from 'react';
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
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const simulateProgress = (projectNumber: number) => {
    setIsProcessing(true);
    const setProgressFn = projectNumber === 1 ? setProgress1 : setProgress2;
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsProcessing(false);
        toast({
          title: "Complete",
          description: "Processing finished successfully.",
        });
      }
      setProgressFn(Math.min(progress, 100));
    }, 500);

    return () => clearInterval(interval);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map(file => file.name);
      setFiles(prev => [...prev, ...newFiles]);
      simulateProgress(activeProject);
      toast({
        title: "Success",
        description: "File upload started.",
      });
    }
  };

  const handleDownload = () => {
    simulateProgress(activeProject);
    toast({
      title: "Processing",
      description: "Preparing files for download...",
    });
  };

  const handleSend = () => {
    simulateProgress(activeProject);
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
          relative bg-[#0D4B6B] text-white border-2 border-white hover:bg-[#0D5B7B] h-16
          ${isActive ? 'border-b-0' : ''}
          ${isProcessing && isActive ? 'cursor-wait' : ''}
        `}
        disabled={isProcessing && isActive}
      >
        <span className="mr-16">{`PROJECT_${number}_NAME`}</span>
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="#FFDEE2"
                className="opacity-100"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke={progress === 100 ? "#4CAF50" : "#FFFFFF"}
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-[#0D4B6B]">{Math.floor(progress)}%</span>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );

  // Reset progress when switching projects
  useEffect(() => {
    if (!isProcessing) {
      setProgress1(0);
      setProgress2(0);
    }
  }, [activeProject]);

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
                  <div className="relative w-48 h-48">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#0D4B6B"
                        strokeWidth="4"
                        fill="#FFDEE2"
                        className="opacity-100"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${2 * Math.PI * 88 * (1 - (activeProject === 1 ? progress1 : progress2) / 100)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[#0D4B6B] font-bold text-4xl">
                      {Math.floor(activeProject === 1 ? progress1 : progress2)}%
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
