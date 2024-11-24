import React, { useState, useEffect } from 'react';
import { MapPin, Users, Calendar, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { VARIATION_TYPES } from '../data/variationTypes';
import { TOP_US_CITIES } from '../data/locationData';
import type { ContentVariation } from '../types';
import { useWorkflowStore } from '../store/workflowStore';

interface VariationSelectorProps {
  onVariationsSelected: (variations: ContentVariation[]) => void;
  selectedHeadlines: any[];
}

export function VariationSelector({ onVariationsSelected, selectedHeadlines }: VariationSelectorProps) {
  const { totalArticles, calculateTotalArticles } = useWorkflowStore();
  const [selectedOptions, setSelectedOptions] = useState<Map<string, Set<string>>>(new Map());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['location']));
  const [cityCount, setCityCount] = useState(300);
  const [customDemographics, setCustomDemographics] = useState<string[]>([]);
  const [newDemographic, setNewDemographic] = useState('');

  useEffect(() => {
    let total = 0;
    const numHeadlines = selectedHeadlines.length;
    
    // Calculate location variations
    const locationFormats = selectedOptions.get('location-format') || new Set();
    if (locationFormats.size > 0) {
      total += numHeadlines * cityCount * locationFormats.size;
    }

    // Calculate demographic variations separately
    const demographicOptions = selectedOptions.get('demographic') || new Set();
    const customDemographicsCount = customDemographics.length;
    if (demographicOptions.size > 0 || customDemographicsCount > 0) {
      total += numHeadlines * (demographicOptions.size + customDemographicsCount);
    }

    // Calculate year variations separately
    const yearOptions = selectedOptions.get('year') || new Set();
    if (yearOptions.size > 0) {
      total += numHeadlines * yearOptions.size;
    }

    // Update total immediately
    calculateTotalArticles(total);
  }, [selectedOptions, cityCount, customDemographics, calculateTotalArticles, selectedHeadlines]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleOption = (typeId: string, optionId: string) => {
    const currentOptions = selectedOptions.get(typeId) || new Set();
    const newOptions = new Set(currentOptions);
    
    if (newOptions.has(optionId)) {
      newOptions.delete(optionId);
    } else {
      newOptions.add(optionId);
    }
    
    setSelectedOptions(new Map(selectedOptions.set(typeId, newOptions)));
  };

  const addCustomDemographic = () => {
    if (newDemographic.trim()) {
      setCustomDemographics([...customDemographics, newDemographic.trim()]);
      setNewDemographic('');
    }
  };

  const removeCustomDemographic = (index: number) => {
    setCustomDemographics(prev => prev.filter((_, i) => i !== index));
  };

  const handleReviewVariations = () => {
    const variations: ContentVariation[] = [];
    
    // Add location variations
    const locationFormats = selectedOptions.get('location-format') || new Set();
    
    if (locationFormats.size > 0) {
      // Use actual city data from locationData.ts
      TOP_US_CITIES.slice(0, cityCount).forEach((city) => {
        locationFormats.forEach(format => {
          let locationValue = '';
          switch (format) {
            case 'city-state':
              locationValue = `${city.name}, ${city.state}`;
              break;
            case 'full-name':
              locationValue = `${city.name}, ${city.stateName}`;
              break;
            case 'city-only':
              locationValue = city.name;
              break;
            case 'state-only':
              locationValue = city.stateName;
              break;
          }
          
          variations.push({
            id: `location-${city.name}-${format}`,
            type: 'location',
            value: locationValue,
            preposition: 'in',
            metadata: {
              city: city.name,
              state: city.state,
              stateName: city.stateName,
              population: city.population,
              format
            }
          });
        });
      });
    }

    // Add demographic variations
    const demographicOptions = selectedOptions.get('demographic') || new Set();
    demographicOptions.forEach(demographic => {
      variations.push({
        id: `demographic-${demographic}`,
        type: 'demographic',
        value: demographic,
        preposition: 'for'
      });
    });

    // Add custom demographics
    customDemographics.forEach((demographic, index) => {
      variations.push({
        id: `custom-demographic-${index}`,
        type: 'demographic',
        value: demographic,
        preposition: 'for'
      });
    });

    // Add year variations
    const yearOptions = selectedOptions.get('year') || new Set();
    yearOptions.forEach(year => {
      variations.push({
        id: `year-${year}`,
        type: 'year',
        value: year,
        preposition: 'in'
      });
    });

    onVariationsSelected(variations);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Add Variations</h2>
            <p className="text-sm text-gray-500">Select how your content will be varied</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Articles</div>
            <div className="text-3xl font-bold text-blue-600">{totalArticles}</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Location Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('location')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Location</span>
            </div>
            {expandedSections.has('location') ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.has('location') && (
            <div className="px-4 py-3 border-t">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Number of Top Cities by Population</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={cityCount}
                      min={1}
                      max={1000}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setCityCount(Math.min(Math.max(1, value), 1000));
                      }}
                      className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <span className="text-sm text-gray-500">(1-1000)</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Location Format</p>
                  {VARIATION_TYPES.find(t => t.id === 'location')?.options.map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.get('location-format')?.has(option.id) || false}
                        onChange={() => toggleOption('location-format', option.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">{option.label}</span>
                      {option.preview && (
                        <span className="ml-2 text-sm text-gray-500">({option.preview})</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demographics Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('demographic')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Demographics</span>
            </div>
            {expandedSections.has('demographic') ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.has('demographic') && (
            <div className="px-4 py-3 border-t">
              <div className="space-y-4">
                {/* Predefined Demographics */}
                <div className="space-y-2">
                  {VARIATION_TYPES.find(t => t.id === 'demographic')?.options.map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.get('demographic')?.has(option.id) || false}
                        onChange={() => toggleOption('demographic', option.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">{option.label}</span>
                      {option.preview && (
                        <span className="ml-2 text-sm text-gray-500">({option.preview})</span>
                      )}
                    </label>
                  ))}
                </div>

                {/* Custom Demographics */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newDemographic}
                      onChange={(e) => setNewDemographic(e.target.value)}
                      placeholder="Add custom demographic"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomDemographic()}
                    />
                    <button
                      onClick={addCustomDemographic}
                      className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {customDemographics.map((demographic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{demographic}</span>
                      <button
                        onClick={() => removeCustomDemographic(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Year Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('year')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Year</span>
            </div>
            {expandedSections.has('year') ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.has('year') && (
            <div className="px-4 py-3 border-t">
              <div className="space-y-2">
                {VARIATION_TYPES.find(t => t.id === 'year')?.options.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOptions.get('year')?.has(option.id) || false}
                      onChange={() => toggleOption('year', option.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">{option.label}</span>
                    {option.preview && (
                      <span className="ml-2 text-sm text-gray-500">({option.preview})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="mt-6">
          <button
            onClick={handleReviewVariations}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}