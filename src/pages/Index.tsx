
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Download, Send } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState("DEFAULT MODE");
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(65);
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

  return (
    <div className="min-h-screen bg-[#0D4B6B] p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            className="bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B]"
          >
            PROJECT_1_NAME 🟢
          </Button>
          <Button 
            variant="secondary"
            className="bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B]"
          >
            PROJECT_2_NAME 🟢
          </Button>
        </div>

        {/* Mode Switch */}
        <div className="w-full p-4 rounded-lg bg-[#FFDEE2] flex items-center">
          <Switch 
            checked={mode === "DEFAULT MODE"}
            onCheckedChange={(checked) => setMode(checked ? "DEFAULT MODE" : "ADVANCED MODE")}
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

          {/* Prompt Section */}
          <div className="bg-[#FFDEE2] rounded-lg p-4">
            <h2 className="text-[#0D4B6B] font-bold mb-4">PROMPT</h2>
            <textarea
              value="Fit different models to the data in file1.csv, perform cross-validation, print MSE for all models, plot the distribution of data."
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
            
            {/* Progress Circle */}
            <div className="flex justify-center mt-4">
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
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#0D4B6B] font-bold text-xl">
                  {progress}%
                </div>
              </div>
            </div>
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
