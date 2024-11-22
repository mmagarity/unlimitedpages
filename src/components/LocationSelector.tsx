<command>// Previous imports and interfaces remain the same...

const handleGenerateVariations = () => {
  const variations: ContentVariation[] = [];

  selectedTypes.forEach(typeId => {
    const options = selectedOptions.get(typeId) || new Set();
    options.forEach(optionId => {
      if (typeId === 'year') {
        const yearOption = VARIATION_TYPES
          .find(t => t.id === 'year')
          ?.options.find(o => o.id === optionId);
        if (yearOption) {
          variations.push({
            type: 'year',
            value: yearOption.value,
            format: yearOption.preview.split('Coffee Shops')[1].trim() // Extract the format
          });
        }
      } else if (typeId === 'demographic') {
        if (optionId.startsWith('custom-')) {
          variations.push({
            type: 'demographic',
            value: optionId.replace('custom-', ''),
            preposition: 'for'
          });
        } else {
          const option = VARIATION_TYPES
            .find(t => t.id === 'demographic')
            ?.options.find(o => o.id === optionId);
          if (option) {
            variations.push({
              type: 'demographic',
              value: option.label,
              preposition: 'for'
            });
          }
        }
      } else if (typeId === 'location') {
        const option = VARIATION_TYPES
          .find(t => t.id === 'location')
          ?.options.find(o => o.id === optionId);
        if (option) {
          variations.push({
            type: 'location',
            value: option.label.split('(')[1].replace(')', ''), // Extract example format
            format: option.id,
            preposition: 'in'
          });
        }
      }
    });
  });

  onVariationsSelected(variations);
};</command>