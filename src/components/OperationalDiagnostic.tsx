/**
 * Operational Diagnostic - Pattern Recognition Experience
 * 
 * Purpose: Help users self-identify operational patterns without judgment
 * Principles:
 * - No typing required
 * - No scoring shown
 * - No judgment language
 * - Pattern recognition, not quiz
 * - 45-60 seconds total
 */

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface DiagnosticStep {
  id: number;
  type: 'multi-select' | 'single-select';
  prompt: string;
  options: string[];
  allowNone?: boolean;
}

interface DiagnosticProps {
  onComplete: (results: DiagnosticResults) => void;
}

interface DiagnosticResults {
  step1: string[];
  step2: string;
  step3: string;
  step4: string[];
  profile: {
    posture: 'reactive' | 'anticipatory';
    complexity: 'high' | 'low';
    latency: 'high' | 'low';
  };
}

const diagnosticSteps: DiagnosticStep[] = [
  {
    id: 1,
    type: 'multi-select',
    prompt: 'Which of these patterns sound familiar?',
    options: [
      'Issues are usually discovered after customers are affected',
      'Systems don\'t always agree with each other',
      'Teams spend time reconciling data manually',
      'Experience is trusted more than forecasts',
    ],
    allowNone: true,
  },
  {
    id: 2,
    type: 'single-select',
    prompt: 'When demand changes, what usually happens first?',
    options: [
      'Inventory mismatch surfaces later',
      'Fulfillment delays start appearing',
      'Finance discovers surprises in reports',
      'Nothing looks broken yet',
    ],
  },
  {
    id: 3,
    type: 'single-select',
    prompt: 'How do decisions typically happen?',
    options: [
      'After an alert or issue surfaces',
      'During weekly or monthly reviews',
      'By trying to anticipate, but manually',
    ],
  },
  {
    id: 4,
    type: 'multi-select',
    prompt: 'What hurts most when things break?',
    options: [
      'Lost revenue',
      'Customer dissatisfaction',
      'Internal firefighting',
      'Lack of confidence in numbers',
    ],
    allowNone: false,
  },
];

const OperationalDiagnostic: React.FC<DiagnosticProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<{
    [key: number]: string | string[];
  }>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const step = diagnosticSteps[currentStep];
  const isMultiSelect = step.type === 'multi-select';
  const currentSelection = selections[step.id] || (isMultiSelect ? [] : '');

  const handleSelect = (option: string) => {
    if (isMultiSelect) {
      const current = (currentSelection as string[]) || [];
      if (current.includes(option)) {
        setSelections({
          ...selections,
          [step.id]: current.filter((o) => o !== option),
        });
      } else {
        setSelections({
          ...selections,
          [step.id]: [...current, option],
        });
      }
    } else {
      setSelections({
        ...selections,
        [step.id]: option,
      });
      // Auto-advance after single selection (with small delay for feedback)
      setTimeout(() => {
        handleNext();
      }, 400);
    }
  };

  const handleNone = () => {
    setSelections({
      ...selections,
      [step.id]: [],
    });
    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const handleNext = () => {
    if (currentStep < diagnosticSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete diagnostic
      setIsTransitioning(true);
      setTimeout(() => {
        const results = buildResults();
        onComplete(results);
      }, 2000);
    }
  };

  const buildResults = (): DiagnosticResults => {
    // Internal profiling (not shown to user)
    const step1Results = (selections[1] as string[]) || [];
    const step2Result = selections[2] as string;
    const step3Result = selections[3] as string;
    const step4Results = (selections[4] as string[]) || [];

    const posture = step3Result?.includes('anticipate') ? 'anticipatory' : 'reactive';
    const complexity = step1Results.length >= 2 ? 'high' : 'low';
    const latency = step3Result?.includes('weekly') || step3Result?.includes('monthly') ? 'high' : 'low';

    return {
      step1: step1Results,
      step2: step2Result,
      step3: step3Result,
      step4: step4Results,
      profile: {
        posture,
        complexity,
        latency,
      },
    };
  };

  const canProceed = () => {
    if (isMultiSelect) {
      const current = currentSelection as string[];
      return current.length > 0;
    }
    return !!currentSelection;
  };

  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-[900px] mx-auto">
          <div className="bg-white rounded-2xl p-16 border border-primary-200 shadow-sm">
            <div className="max-w-[600px] text-center mx-auto animate-fade-in">
              <h2 className="text-2xl font-semibold text-primary-900 mb-4 leading-relaxed">
                Patterns like these often lead to late detection
              </h2>
              <p className="text-lg text-primary-700">
                Here's what changes when causality becomes visible early
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-[900px] mx-auto">
        {/* Step Content - The Card */}
        <div className="bg-white rounded-2xl p-16 border border-primary-200 shadow-sm animate-fade-in">
          {/* Header Zone (Optional - subtle context) */}
          <div className="mb-6">
            <p className="text-sm font-medium text-primary-500"></p>
          </div>
          {/* Primary Prompt Zone */}
          <h2 className="text-2xl font-semibold text-primary-900 mb-12 leading-relaxed max-w-[600px]">
            {step.prompt}
          </h2>

          {/* Response Options Zone */}
          <div className="space-y-4">
            {step.options.map((option) => {
              const isSelected = isMultiSelect
                ? (currentSelection as string[]).includes(option)
                : currentSelection === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-fast ${
                    isSelected
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-primary-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base text-primary-800 leading-relaxed flex-1">{option}</span>
                    <div
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                        isSelected
                          ? 'border-accent-500 bg-accent-500'
                          : 'border-primary-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}

            {step.allowNone && (
              <button
                onClick={handleNone}
                className="w-full text-left px-6 py-5 rounded-xl border-2 border-primary-200 bg-white hover:border-primary-300 hover:bg-primary-50 transition-fast mt-2"
              >
                <span className="text-primary-600 text-base">None of these</span>
              </button>
            )}
          </div>

          {/* Progress & Navigation Zone */}
          <div className="mt-12 pt-12 border-t border-primary-100 flex items-center justify-between">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {diagnosticSteps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx <= currentStep ? 'bg-accent-500' : 'bg-primary-300'
                  }`}
                />
              ))}
              <span className="text-sm font-medium text-primary-600 ml-2">
                Step {currentStep + 1} of {diagnosticSteps.length}
              </span>
            </div>

            {/* Continue Button (for multi-select only) */}
            {isMultiSelect && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-semibold text-base transition-fast min-w-[140px] ${
                  canProceed()
                    ? 'bg-accent-600 text-white hover:bg-accent-700 shadow-sm hover:shadow'
                    : 'bg-primary-200 text-primary-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalDiagnostic;

