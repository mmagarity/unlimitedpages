import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HeadlineVariation, ContentVariation, ArticleType } from '../types';

interface WorkflowState {
  currentStep: number;
  completedSteps: number[];
  selectedTypes: ArticleType[];
  selectedHeadlines: HeadlineVariation[];
  selectedVariations: ContentVariation[];
  previewData: any | null;
  totalArticles: number;
  generatedContent: any[] | null;
  saveWorkflowState: () => void;
  restoreWorkflowState: () => void;
  setCurrentStep: (step: number) => void;
  setSelectedTypes: (types: ArticleType[]) => void;
  setSelectedHeadlines: (headlines: HeadlineVariation[]) => void;
  setSelectedVariations: (variations: ContentVariation[]) => void;
  setPreviewData: (data: any) => void;
  setGeneratedContent: (content: any[]) => void;
  markStepCompleted: (step: number) => void;
  calculateTotalArticles: (total: number) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      completedSteps: [],
      selectedTypes: [],
      selectedHeadlines: [],
      selectedVariations: [],
      previewData: null,
      totalArticles: 0,
      generatedContent: null,

      saveWorkflowState: () => {
        // State is automatically persisted by zustand/persist
      },

      restoreWorkflowState: () => {
        const state = get();
        // Only restore if we have a valid previous state
        if (state.selectedTypes.length > 0 || state.selectedHeadlines.length > 0) {
          console.log('Restoring workflow state:', state);
          return;
        }
        // Otherwise reset to initial state
        set({
          currentStep: 0,
          completedSteps: [],
          selectedTypes: [],
          selectedHeadlines: [],
          selectedVariations: [],
          previewData: null,
          totalArticles: 0,
          generatedContent: null
        });
      },

      setCurrentStep: (step: number) => {
        set((state) => {
          // If going back to a previous step, remove it and subsequent steps from completed
          const completedSteps = state.completedSteps.filter(s => s < step);
          
          // Reset data for subsequent steps
          let updates: Partial<WorkflowState> = {
            currentStep: step,
            completedSteps
          };
          
          if (step === 0) {
            // Going back to article type selection
            // Keep selectedHeadlines but reset other data
            updates = {
              ...updates,
              selectedVariations: [],
              previewData: null,
              generatedContent: null
            };
          } else if (step === 1) {
            // Going back to headlines
            updates = {
              ...updates,
              selectedVariations: [],
              previewData: null,
              generatedContent: null
            };
          }
          
          return updates;
        });
      },

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])]
            .sort((a, b) => a - b)
        })),

      setSelectedTypes: (types: ArticleType[]) => 
        set((state) => {
          // If types have changed, clear headlines
          const typesChanged = JSON.stringify(types) !== JSON.stringify(state.selectedTypes);
          return {
            selectedTypes: types,
            // Clear headlines if types changed
            selectedHeadlines: typesChanged ? [] : state.selectedHeadlines,
            // Always clear subsequent steps
            selectedVariations: [],
            previewData: null,
            generatedContent: null
          };
        }),

      setSelectedHeadlines: (headlines: HeadlineVariation[]) => 
        set((state) => ({
          selectedHeadlines: headlines,
          completedSteps: headlines.length > 0 
            ? [...new Set([...state.completedSteps, 1])].sort((a, b) => a - b)
            : state.completedSteps.filter(step => step !== 1)
        })),

      setSelectedVariations: (variations: ContentVariation[]) => 
        set((state) => ({
          selectedVariations: variations,
          completedSteps: variations.length > 0
            ? [...new Set([...state.completedSteps, 2])].sort((a, b) => a - b)
            : state.completedSteps.filter(step => step !== 2)
        })),

      setPreviewData: (data: any) =>
        set((state) => {
          if (data !== null) {
            return {
              previewData: data,
              completedSteps: [...new Set([...state.completedSteps, 3])]
                .sort((a, b) => a - b)
            };
          }
          return { previewData: data };
        }),

      setGeneratedContent: (content: any[]) =>
        set((state) => ({
          generatedContent: content,
          completedSteps: content.length > 0
            ? [...new Set([...state.completedSteps, 3])].sort((a, b) => a - b)
            : state.completedSteps.filter(step => step !== 3)
        })),

      calculateTotalArticles: (total: number) => 
        set(() => ({
          totalArticles: total
        })),

      reset: () => set({
        currentStep: 0,
        completedSteps: [],
        selectedTypes: [],
        selectedHeadlines: [],
        selectedVariations: [],
        previewData: null,
        totalArticles: 0,
        generatedContent: null
      })
    }),
    {
      name: 'workflow-storage',
      partialize: (state) => ({
        selectedTypes: state.selectedTypes,
        selectedHeadlines: state.selectedHeadlines,
        selectedVariations: state.selectedVariations,
        previewData: state.previewData,
        totalArticles: state.totalArticles,
        generatedContent: state.generatedContent,
        completedSteps: state.completedSteps
      })
    }
  )
);