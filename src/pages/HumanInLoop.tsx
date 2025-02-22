
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";

const HumanInLoop = () => {
  const [prompt, setPrompt] = React.useState('Your text here');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D4B6B] p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        {/* Header */}
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            className="bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B] pr-12"
            onClick={() => navigate('/')}
          >
            PROJECT_1_NAME
          </Button>
          <Button 
            variant="secondary"
            className="bg-[#0D4B6B] text-white border border-white hover:bg-[#0D5B7B] pr-12"
            onClick={() => navigate('/')}
          >
            PROJECT_2_NAME
          </Button>
        </div>

        {/* Mode Switch */}
        <div className="w-full p-4 rounded-lg flex items-center mt-4 bg-[#FFDEE2] border-2 border-[#0D4B6B]">
          <Switch 
            checked={true}
            className="border-2 border-[#0D4B6B] bg-[#0D4B6B] data-[state=checked]:bg-[#0D4B6B] [&>span]:bg-[#221F26]"
          />
          <span className="ml-2 font-medium text-[#0D4B6B]">ADVANCED MODE</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow mt-4 gap-4">
          {/* Left Panel */}
          <div className="flex-1 bg-[#0D4B6B] rounded-lg p-4 border-2 border-[#FFDEE2]">
            <div className="bg-[#FFDEE2] rounded-md px-4 py-2 inline-block">
              INPUT
            </div>
          </div>

          {/* Middle Panel */}
          <div className="flex-1 bg-white rounded-lg p-4 flex flex-col">
            <div className="bg-[#FFDEE2] rounded-md px-4 py-2 inline-block mb-4">
              PROMPT
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-grow resize-none focus:outline-none"
            />
            <Button 
              variant="secondary" 
              className="w-24 bg-[#FFDEE2] text-[#0D4B6B] hover:bg-[#FFD0D6] mt-4"
            >
              <Send className="mr-2 h-4 w-4" />
              SEND
            </Button>
          </div>

          {/* Right Content */}
          <div className="flex gap-4 flex-1">
            {/* Output Panel */}
            <div className="flex-1 bg-[#0D4B6B] rounded-lg p-4 border-2 border-[#FFDEE2]">
              <div className="bg-[#FFDEE2] rounded-md px-4 py-2 inline-block">
                OUTPUT
              </div>
            </div>

            {/* Timeline Panel */}
            <div className="w-24 bg-[#FFDEE2] rounded-lg p-4">
              <div className="bg-[#0D4B6B] rounded-md px-4 py-2 text-white text-center mb-4">
                TIMELINE
              </div>
              <div className="flex flex-col items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <React.Fragment key={i}>
                    <div className="w-3 h-3 rounded-full bg-[#0D4B6B]" />
                    {i < 5 && <div className="w-0.5 h-8 bg-[#0D4B6B]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanInLoop;
