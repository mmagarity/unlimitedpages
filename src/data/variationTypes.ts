import { MapPin, Users, Calendar } from 'lucide-react';
import type { IconType } from '../types';

export interface VariationOption {
  id: string;
  label: string;
  preview?: string;
  value?: string;
}

export interface VariationType {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  options: VariationOption[];
}

export const VARIATION_TYPES: VariationType[] = [
  {
    id: 'location',
    name: 'Location',
    description: 'Add city and state variations',
    icon: MapPin,
    options: [
      {
        id: 'city-state',
        label: 'City, State (Philadelphia, PA)',
        preview: 'Coffee Shops in Philadelphia, PA'
      },
      {
        id: 'full-name',
        label: 'Full Name (Philadelphia, Pennsylvania)',
        preview: 'Coffee Shops in Philadelphia, Pennsylvania'
      },
      {
        id: 'city-only',
        label: 'City Only (Philadelphia)',
        preview: 'Coffee Shops in Philadelphia'
      },
      {
        id: 'state-only',
        label: 'State Only (Pennsylvania)',
        preview: 'Coffee Shops in Pennsylvania'
      }
    ]
  },
  {
    id: 'demographic',
    name: 'Demographics',
    description: 'Target specific audiences',
    icon: Users,
    options: [
      {
        id: 'beginners',
        label: 'Beginners',
        preview: 'Coffee Shops for Beginners'
      },
      {
        id: 'professionals',
        label: 'Professionals',
        preview: 'Coffee Shops for Professionals'
      },
      {
        id: 'students',
        label: 'Students',
        preview: 'Coffee Shops for Students'
      },
      {
        id: 'seniors',
        label: 'Seniors',
        preview: 'Coffee Shops for Seniors'
      },
      {
        id: 'parents',
        label: 'Parents',
        preview: 'Coffee Shops for Parents'
      }
    ]
  },
  {
    id: 'year',
    name: 'Year',
    description: 'Add time-based variations',
    icon: Calendar,
    options: [
      {
        id: 'current-year',
        label: 'Current Year',
        preview: 'Coffee Shops (2024)',
        value: '(2024)'
      },
      {
        id: 'year-guide',
        label: 'Year Guide',
        preview: 'Coffee Shops (2024 Guide)',
        value: '(2024 Guide)'
      },
      {
        id: 'year-range',
        label: 'Last Year\'s Range',
        preview: 'Coffee Shops (2023-2024)',
        value: '(2023-2024)'
      },
      {
        id: 'year-update',
        label: 'Year Update',
        preview: 'Coffee Shops: 2024 Update',
        value: ': 2024 Update'
      }
    ]
  }
];