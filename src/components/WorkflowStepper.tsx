import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface WorkflowStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export function WorkflowStepper({ steps, currentStep, onStepClick }: WorkflowStepperProps) {
  const canNavigateToStep = (stepIndex: number) => {
    // Can navigate to completed steps or the next available step
    return steps.slice(0, stepIndex).every(step => step.completed) || stepIndex === currentStep;
  };

  const getStepStyle = (index: number, completed: boolean) => {
    if (completed) return 'bg-green-100 ring-2 ring-green-500 ring-offset-2';
    if (index === currentStep) return 'bg-blue-100 ring-2 ring-blue-500 ring-offset-2';
    return 'bg-gray-100';
  };

  const getConnectorStyle = (index: number) => {
    const prevCompleted = steps[index].completed;
    const nextCompleted = steps[index + 1]?.completed;
    
    if (prevCompleted && nextCompleted) return 'bg-green-500';
    if (prevCompleted) return 'bg-gradient-to-r from-green-500 to-gray-200';
    return 'bg-gray-200';
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => canNavigateToStep(index) && onStepClick(index)}
                disabled={!canNavigateToStep(index)}
                className={`flex flex-col items-center ${
                  canNavigateToStep(index) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    transition-all duration-200 ease-in-out
                    ${getStepStyle(index, step.completed)}
                    ${canNavigateToStep(index) ? 'hover:scale-110' : ''}
                  `}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className={`w-6 h-6 ${
                      index === currentStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    step.completed ? 'text-green-600' :
                    index === currentStep ? 'text-blue-600' :
                    canNavigateToStep(index) ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </button>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 transition-colors duration-200 ${getConnectorStyle(index)}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}