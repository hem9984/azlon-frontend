import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Download, Send, X } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showFileContent, setShowFileContent] = useState(false);
  const [selectedInputFile, setSelectedInputFile] = useState<string | null>(null);
  const [selectedOutputFile, setSelectedOutputFile] = useState<string | null>(null);

  const fileContents: Record<string, string> = {
    'data.csv': 'id,feature1,feature2\n1,0.5,0.3\n2,0.7,0.8',
    'labels.csv': 'id,label\n1,true\n2,false',
    'file1.py': 'import pandas as pd\nfrom sklearn.model_selection\nimport train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\n\n# Load the dataset\ndf = pd.read_csv("file1.csv")',
    'file2.py': 'print("Hello World")',
    'plot.pdf': '[PDF Content]'
  };

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

  const handleSendTestConditions = () => {
    simulateProgress(activeProject);
    toast({
      title: "Processing",
      description: "Applying test conditions...",
    });
  };

  const handleHumanInTheLoop = () => {
    navigate('/hil');
  };

  const handleFileClick = (filename: string) => {
    setSelectedFile(filename);
    setShowFileContent(true);
  };

  const FileComponent = ({ filename, isOutput = false }: { filename: string; isOutput?: boolean }) => (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div
            className="text-[#0D4B6B] cursor-pointer hover:underline"
            onClick={() => {
              if (isOutput) {
                setSelectedOutputFile(filename);
              } else {
                setSelectedInputFile(filename);
              }
            }}
          >
            {filename}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black p-2 max-w-md">
          <pre className="whitespace-pre-wrap">{fileContents[filename]}</pre>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const FileContentView = ({ filename, onClose }: { filename: string; onClose: () => void }) => (
    <div className="relative bg-white rounded-lg p-4 h-full overflow-auto">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-transparent"
        onClick={onClose}
      >
        <X className="h-4 w-4 text-red-500" />
      </Button>
      <h3 className="text-[#0D4B6B] font-bold mb-2">{filename}</h3>
      <pre className="whitespace-pre-wrap text-black">
        {fileContents[filename]}
      </pre>
    </div>
  );

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

  useEffect(() => {
    if (!isProcessing) {
      setProgress1(0);
      setProgress2(0);
    }
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#0D4B6B] p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        <div className="flex gap-2">
          <ProjectTab number={1} progress={progress1} isActive={activeProject === 1} />
          <ProjectTab number={2} progress={progress2} isActive={activeProject === 2} />
        </div>

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

        <ResizablePanelGroup 
          direction="horizontal" 
          className="flex-grow mt-4 gap-4"
        >
          <ResizablePanel defaultSize={30}>
            <div className="bg-[#FFDEE2] rounded-lg p-4 flex flex-col h-full">
              <h2 className="text-[#0D4B6B] font-bold mb-4">INPUT</h2>
              {selectedInputFile ? (
                <FileContentView 
                  filename={selectedInputFile}
                  onClose={() => setSelectedInputFile(null)}
                />
              ) : (
                <>
                  <div className="space-y-2 flex-grow mb-4 overflow-y-auto">
                    {files.map((file) => (
                      <FileComponent key={file} filename={file} />
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
                </>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent" />

          <ResizablePanel defaultSize={40}>
            <div className="space-y-4 h-full flex flex-col">
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

              {mode === "ADVANCED MODE" && (
                <div className="bg-[#FFDEE2] rounded-lg p-4 flex-grow">
                  <h2 className="text-[#0D4B6B] font-bold mb-4">TEST CONDITIONS</h2>
                  <textarea
                    value={testConditions}
                    onChange={(e) => setTestConditions(e.target.value)}
                    className="w-full h-32 bg-transparent text-[#0D4B6B] resize-none focus:outline-none"
                  />
                  <Button 
                    variant="secondary" 
                    className="w-full bg-[#0D4B6B] text-white hover:bg-[#0D5B7B] mb-4"
                    onClick={handleSendTestConditions}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    SEND
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-[#F4511E] text-white hover:bg-[#E64A19]"
                    onClick={handleHumanInTheLoop}
                  >
                    HUMAN-IN-THE-LOOP
                  </Button>
                </div>
              )}

              {mode === "DEFAULT MODE" && (
                <div className="flex justify-center flex-grow items-center">
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
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent" />

          <ResizablePanel defaultSize={30}>
            <div className="bg-[#FFDEE2] rounded-lg p-4 flex flex-col h-full">
              <h2 className="text-[#0D4B6B] font-bold mb-4">OUTPUT</h2>
              {selectedOutputFile ? (
                <FileContentView 
                  filename={selectedOutputFile}
                  onClose={() => setSelectedOutputFile(null)}
                />
              ) : (
                <>
                  <div className="space-y-2 flex-grow mb-4 overflow-y-auto">
                    {outputFiles.map((file) => (
                      <FileComponent key={file} filename={file} isOutput />
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
                </>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Dialog open={showFileContent} onOpenChange={setShowFileContent}>
        <DialogContent className="bg-white text-black max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedFile}</span>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setShowFileContent(false)}
              >
                <X className="h-4 w-4 text-[#ea384c]" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap p-4 bg-white">
            {selectedFile ? fileContents[selectedFile] : ''}
          </pre>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
