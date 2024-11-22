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
  saveWorkflowState: () => void;
  restoreWorkflowState: () => void;
  setCurrentStep: (step: number) => void;
  setSelectedTypes: (types: ArticleType[]) => void;
  setSelectedHeadlines: (headlines: HeadlineVariation[]) => void;
  setSelectedVariations: (variations: ContentVariation[]) => void;
  setPreviewData: (data: any) => void;
  markStepCompleted: (step: number) => void;
  calculateTotalArticles: () => void;
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

      saveWorkflowState: () => {
        // State is automatically persisted by zustand/persist
      },

      restoreWorkflowState: () => {
        // State is automatically restored by zustand/persist
      },

      setCurrentStep: (step) => 
        set((state) => ({ 
          currentStep: step,
          // When moving backwards, keep completed steps
          completedSteps: state.completedSteps.filter(s => s < step)
        })),

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])]
            .sort((a, b) => a - b)
        })),

      setSelectedTypes: (types) =>
        set((state) => {
          if (types.length > 0) {
            return {
              selectedTypes: types,
              completedSteps: [...new Set([...state.completedSteps, 0])]
                .sort((a, b) => a - b)
            };
          }
          return { selectedTypes: types };
        }),

      setSelectedHeadlines: (headlines) =>
        set((state) => {
          if (headlines.length > 0) {
            return {
              selectedHeadlines: headlines,
              completedSteps: [...new Set([...state.completedSteps, 1])]
                .sort((a, b) => a - b)
            };
          }
          return { selectedHeadlines: headlines };
        }),

      setSelectedVariations: (variations) =>
        set((state) => {
          if (variations.length > 0) {
            return {
              selectedVariations: variations,
              completedSteps: [...new Set([...state.completedSteps, 2])]
                .sort((a, b) => a - b)
            };
          }
          return { selectedVariations: variations };
        }),

      setPreviewData: (data) =>
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

      calculateTotalArticles: () => {
        const { selectedHeadlines, selectedVariations } = get();
        const total = selectedHeadlines.length * selectedVariations.length;
        set({ totalArticles: total });
      },
      
      reset: () => set({
        currentStep: 0,
        completedSteps: [],
        selectedTypes: [],
        selectedHeadlines: [],
        selectedVariations: [],
        previewData: null,
        totalArticles: 0
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
        completedSteps: state.completedSteps
      })
    }
  )
);