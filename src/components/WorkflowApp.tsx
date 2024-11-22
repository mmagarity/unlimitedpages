import React, { useEffect } from 'react';
import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthFlow } from '../hooks/useAuthFlow';
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

export function WorkflowApp() {
  const { requiresAuth, requiresPayment } = useAuthFlow();
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

  useEffect(() => {
    // Restore workflow state when returning from auth/payment
    restoreWorkflowState();
  }, []);

  const handleArticleTypeSelected = (type: ArticleType) => {
    setSelectedTypes(prev => {
      if (!prev.find(t => t.id === type.id)) {
        return [...prev, type];
      }
      return prev;
    });
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
          <UserProfile 
            user={{
              name: 'Demo User',
              email: 'demo@example.com'
            }}
            onSignOut={() => {}}
          />
        </div>

        {/* Workflow Steps */}
        <WorkflowStepper 
          steps={[
            {
              title: 'Select Type',
              description: 'Choose article type',
              completed: completedSteps.includes(0)
            },
            {
              title: 'Headlines',
              description: 'Generate headlines',
              completed: completedSteps.includes(1)
            },
            {
              title: 'Variations',
              description: 'Select variations',
              completed: completedSteps.includes(2)
            },
            {
              title: 'Preview',
              description: 'Review content',
              completed: completedSteps.includes(3)
            },
            {
              title: 'CMS Mapping',
              description: 'Map to CMS fields',
              completed: completedSteps.includes(4)
            },
            {
              title: 'Publish',
              description: 'Publish content',
              completed: completedSteps.includes(5)
            }
          ]}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* Main Content */}
        <div className="py-8">
          {currentStep === 0 && (
            <ArticleTypeSelector 
              onTypeSelected={handleArticleTypeSelected}
              selectedTypes={selectedTypes}
              selectedHeadlines={selectedHeadlines}
            />
          )}

          {currentStep === 1 && (
            <HeadlineGenerator
              selectedTemplates={selectedTypes.flatMap(type => type.templates)}
              onHeadlinesGenerated={handleHeadlinesSelected}
              selectedHeadlines={selectedHeadlines}
              onAddMoreTypes={() => setCurrentStep(0)}
              currentArticleType={selectedTypes[0]?.id}
              onHeadlineAdded={(headline) => setSelectedHeadlines([...selectedHeadlines, headline])}
              onHeadlineRemoved={(id) => setSelectedHeadlines(selectedHeadlines.filter(h => h.id !== id))}
            />
          )}

          {currentStep === 2 && (
            <VariationSelector
              selectedHeadlines={selectedHeadlines}
              onVariationsSelected={handleVariationsSelected}
            />
          )}

          {currentStep === 3 && (
            <ContentPreview
              headlines={selectedHeadlines}
              variations={selectedVariations}
              onComplete={handleContentPreviewComplete}
            />
          )}

          {/* Only show CMS and Publish steps if authenticated and paid */}
          {!requiresAuth && !requiresPayment && (
            <>
              {currentStep === 4 && (
                <CMSMappingTable 
                  selectedHeadlines={selectedHeadlines}
                  selectedVariations={selectedVariations}
                  onExport={handleCMSMappingComplete}
                  onPublish={() => setCurrentStep(5)}
                />
              )}

              {currentStep === 5 && (
                <PublishingOptions
                  articles={generatedContent}
                  onNavigateToSettings={handleNavigateToSettings}
                  onPublish={() => {
                    // Handle publish completion
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}