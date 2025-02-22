
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Download, Send } from "lucide-react";

const Index = () => {
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
    toast({
      title: "Human In The Loop",
      description: "Processing with human oversight...",
    });
  };

  const ProjectButton = ({ name, progress }: { name: string; progress: number }) => (
    <div className="relative">
      <Button 
        variant="secondary"
        className="bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B] pr-12"
      >
        {name}
      </Button>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D4B6B] p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex gap-2">
          <ProjectButton name="PROJECT_1_NAME" progress={progress1} />
          <ProjectButton name="PROJECT_2_NAME" progress={progress2} />
        </div>

        {/* Mode Switch */}
        <div className="w-full p-4 rounded-lg bg-[#FFDEE2] flex items-center">
          <Switch 
            checked={mode === "ADVANCED MODE"}
            onCheckedChange={(checked) => setMode(checked ? "ADVANCED MODE" : "DEFAULT MODE")}
          />
          <span className="ml-2 text-[#0D4B6B] font-medium">{mode}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Input Section */}
          <div className="bg-[#FFDEE2] rounded-lg p-4">
            <h2 className="text-[#0D4B6B] font-bold mb-4">INPUT</h2>
            <div className="space-y-2 mb-4">
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

          {/* Middle Section */}
          <div className="space-y-4">
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

          {/* Output Section */}
          <div className="bg-[#FFDEE2] rounded-lg p-4">
            <h2 className="text-[#0D4B6B] font-bold mb-4">OUTPUT</h2>
            <div className="space-y-2 mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
