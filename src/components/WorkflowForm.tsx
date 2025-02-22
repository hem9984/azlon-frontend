
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

interface WorkflowFormProps {
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  testConditions: string;
  setTestConditions: (value: string) => void;
  advancedMode: boolean;
  setAdvancedMode: (value: boolean) => void;
  generateCodePrompt: string;
  setGenerateCodePrompt: (value: string) => void;
  validateOutputPrompt: string;
  setValidateOutputPrompt: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  progress: number;
}

const WorkflowForm = ({
  userPrompt,
  setUserPrompt,
  testConditions,
  setTestConditions,
  advancedMode,
  setAdvancedMode,
  onSubmit,
  isLoading,
  progress
}: WorkflowFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="mode-switch">
        <Switch
          checked={advancedMode}
          onCheckedChange={setAdvancedMode}
        />
        <span className="ml-2">{advancedMode ? "ADVANCED MODE" : "DEFAULT MODE"}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="section-card">
          <h2 className="text-lg font-semibold mb-4">PROMPT</h2>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full h-32 bg-transparent resize-none focus:outline-none"
            placeholder="Enter your prompt here..."
          />
          <Button 
            type="submit" 
            className="w-full mt-4" 
            variant="secondary"
            disabled={isLoading}
          >
            SEND
          </Button>
        </div>

        {advancedMode && (
          <div className="section-card">
            <h2 className="text-lg font-semibold mb-4">TEST CONDITIONS</h2>
            <textarea
              value={testConditions}
              onChange={(e) => setTestConditions(e.target.value)}
              className="w-full h-32 bg-transparent resize-none focus:outline-none"
              placeholder="Enter test conditions..."
            />
            <Button 
              type="button"
              className="w-full mt-4" 
              variant="secondary"
            >
              HUMAN-IN-THE-LOOP
            </Button>
          </div>
        )}

        <div className="section-card">
          <h2 className="text-lg font-semibold mb-4">OUTPUT</h2>
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <svg className="progress-ring">
                <circle
                  className="circular-progress"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  r="30"
                  cx="48"
                  cy="48"
                  style={{
                    strokeDasharray: '188.5',
                    strokeDashoffset: `${188.5 * (1 - progress / 100)}`
                  }}
                />
                <text
                  x="48"
                  y="48"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-lg font-bold"
                >
                  {progress}%
                </text>
              </svg>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default WorkflowForm;
