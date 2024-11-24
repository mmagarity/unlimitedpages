import React, { useEffect } from 'react';
import { Box } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWorkflowStore } from '../store/workflowStore';
import { WorkflowStepper } from './WorkflowStepper';
import { ArticleTypeSelector } from './ArticleTypeSelector';
import { HeadlineGenerator } from './HeadlineGenerator';
import { VariationSelector } from './VariationSelector';
import { ContentPreview } from './ContentPreview';
import { CMSMappingTable } from './CMSMappingTable';
import { PublishingOptions } from './PublishingOptions';
import { UserProfile } from './UserProfile';
import type { ArticleType, HeadlineVariation, ContentVariation } from '../types';

const WORKFLOW_STEPS = [
  {
    title: 'Select Type',
    description: 'Choose article type',
    completed: false
  },
  {
    title: 'Headlines',
    description: 'Generate headlines',
    completed: false
  },
  {
    title: 'Variations',
    description: 'Select variations',
    completed: false
  },
  {
    title: 'Preview',
    description: 'Review content',
    completed: false
  },
  {
    title: 'CMS Mapping',
    description: 'Map to CMS fields',
    completed: false
  },
  {
    title: 'Publish',
    description: 'Publish content',
    completed: false
  }
];

export function WorkflowApp() {
  console.log('🔄 WorkflowApp rendering');
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { 
    currentStep, 
    completedSteps,
    selectedTypes,
    selectedHeadlines,
    selectedVariations,
    generatedContent,
    setCurrentStep,
    setSelectedTypes,
    setSelectedHeadlines,
    setSelectedVariations,
    setGeneratedContent,
    markStepCompleted,
    restoreWorkflowState 
  } = useWorkflowStore();

  // Update steps completion status
  const steps = WORKFLOW_STEPS.map((step, index) => ({
    ...step,
    completed: completedSteps.includes(index)
  }));

  useEffect(() => {
    console.log('👤 Current user:', user?.email);
    console.log('🔄 Current step:', currentStep);
    console.log('✅ Completed steps:', completedSteps);
    
    // Restore workflow state when returning from auth/payment
    restoreWorkflowState();
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleArticleTypeSelected = (type: ArticleType) => {
    console.log('Selected article type:', type);
    setSelectedTypes([type]); // Always set as array with single type
    markStepCompleted(0);
    setCurrentStep(1);
  };

  const handleHeadlinesSelected = (headlines: HeadlineVariation[]) => {
    setSelectedHeadlines(headlines);
    markStepCompleted(1);
    setCurrentStep(2);
  };

  const handleVariationsSelected = (variations: ContentVariation[]) => {
    setSelectedVariations(variations);
    markStepCompleted(2);
    setCurrentStep(3);
  };

  const handleContentPreviewComplete = (content: any[]) => {
    setGeneratedContent(content);
    markStepCompleted(3);
    setCurrentStep(4);
  };

  const handleCMSMappingComplete = () => {
    markStepCompleted(4);
    setCurrentStep(5);
  };

  const handleNavigateToSettings = () => {
    navigate('/settings/webflow', { 
      state: {
        currentStep,
        selectedTypes,
        selectedHeadlines,
        selectedVariations,
        generatedContent
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-[#0066CC] shadow-lg rounded-lg mr-3">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">UnlimitedPages</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <UserProfile 
                user={user}
                onSignOut={async () => {
                  try {
                    await signOut();
                    navigate('/signin');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
              />
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkflowStepper 
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        
        <div className="mt-8">
          {currentStep === 0 && (
            <ArticleTypeSelector
              onTypeSelected={handleArticleTypeSelected}
              selectedTypes={selectedTypes}
              selectedHeadlines={selectedHeadlines}
            />
          )}
          
          {currentStep === 1 && selectedTypes.length > 0 && (
            <HeadlineGenerator
              onHeadlinesGenerated={handleHeadlinesSelected}
              selectedHeadlines={selectedHeadlines}
            />
          )}
          
          {currentStep === 2 && selectedHeadlines.length > 0 && (
            <VariationSelector
              selectedHeadlines={selectedHeadlines}
              onVariationsSelected={handleVariationsSelected}
            />
          )}
          
          {currentStep === 3 && selectedVariations.length > 0 && (
            <ContentPreview
              headlines={selectedHeadlines}
              variations={selectedVariations}
              onComplete={handleContentPreviewComplete}
            />
          )}
          
          {currentStep === 4 && generatedContent && (
            <CMSMappingTable
              content={generatedContent}
              onComplete={handleCMSMappingComplete}
            />
          )}
          
          {currentStep === 5 && (
            <PublishingOptions
              content={generatedContent}
              onNavigateToSettings={handleNavigateToSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
}