import type { WorkflowStep } from '../types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    title: 'Article Type',
    description: 'Choose content template',
    completed: false,
  },
  {
    title: 'Headlines',
    description: 'Generate and customize headlines',
    completed: false,
  },
  {
    title: 'Variations',
    description: 'Add location, time & audience',
    completed: false,
  },
  {
    title: 'Content',
    description: 'Preview generated content',
    completed: false,
  },
  {
    title: 'CMS Mapping',
    description: 'Review and map content',
    completed: false,
  },
  {
    title: 'Publish',
    description: 'Schedule and publish',
    completed: false,
  }
];