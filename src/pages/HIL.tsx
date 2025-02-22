
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";

const HIL = () => {
  const [prompt, setPrompt] = React.useState('Your text here');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E8D5C4] p-4">
      {/* Header */}
      <div className="flex gap-2 mb-4">
        <Button 
          variant="secondary"
          className="bg-[#7C5F3F] text-white border-2 border-white hover:bg-[#8C6F4F] relative pr-8"
          onClick={() => navigate('/')}
        >
          PROJECT_1_NAME
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white" />
        </Button>
        <Button 
          variant="secondary"
          className="bg-[#7C5F3F] text-white border-2 border-white hover:bg-[#8C6F4F] relative pr-8"
          onClick={() => navigate('/')}
        >
          PROJECT_2_NAME
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white" />
        </Button>
      </div>

      {/* Mode Switch */}
      <div className="w-full p-3 rounded-lg flex items-center mb-4">
        <Switch 
          checked={true}
          className="border-2 border-[#7C5F3F] bg-[#7C5F3F] data-[state=checked]:bg-[#7C5F3F]"
        />
        <span className="ml-2 font-bold text-[#7C5F3F]">ADVANCED MODE</span>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 h-[calc(100vh-180px)]">
        {/* Left Panel */}
        <div className="flex-1 bg-[#7C5F3F] rounded-xl p-4">
          <div className="bg-[#E8D5C4] rounded-md px-4 py-1 inline-block font-bold text-[#7C5F3F]">
            INPUT
          </div>
        </div>

        {/* Middle Panel */}
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col">
          <div className="bg-[#E8D5C4] rounded-md px-4 py-1 inline-block font-bold text-[#7C5F3F] mb-4">
            PROMPT
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow resize-none focus:outline-none"
          />
          <Button 
            variant="secondary" 
            size="sm"
            className="w-20 bg-[#E8D5C4] text-[#7C5F3F] hover:bg-[#DBC5B4] mt-2 self-end"
          >
            SEND
          </Button>
        </div>

        {/* Right Content */}
        <div className="flex gap-4 flex-1">
          {/* Output Panel */}
          <div className="flex-1 bg-[#7C5F3F] rounded-xl p-4">
            <div className="bg-[#E8D5C4] rounded-md px-4 py-1 inline-block font-bold text-[#7C5F3F]">
              OUTPUT
            </div>
          </div>

          {/* Timeline Panel */}
          <div className="w-24 bg-[#E8D5C4] rounded-xl p-4">
            <div className="bg-[#7C5F3F] rounded-md px-2 py-1 text-white text-center mb-4 font-bold">
              TIMELINE
            </div>
            <div className="flex flex-col items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <React.Fragment key={i}>
                  <div className="w-3 h-3 rounded-full bg-[#7C5F3F]" />
                  {i < 5 && <div className="w-0.5 h-8 bg-[#7C5F3F]" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIL;
