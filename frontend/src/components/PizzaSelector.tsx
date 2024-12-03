import React from 'react';
import { Check } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface Pizza {
  id: string;
  label: string;
  color: string;
}

interface PizzaSelectorProps {
  pizzas: Pizza[];
  selectedPizzas: Set<string>;
  onTogglePizza: (id: string) => void;
  onColorChange: (label: string, color: string) => void;
}

export const PizzaSelector = ({ 
  pizzas, 
  selectedPizzas, 
  onTogglePizza,
  onColorChange 
}: PizzaSelectorProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter Pizza Types</h2>
      <div className="flex flex-wrap gap-2">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="flex items-center"
          >
            <button
              onClick={() => onTogglePizza(pizza.label)}
              className={`flex items-center gap-2 px-3 py-2 rounded-l-full border-y border-l transition-colors ${
                selectedPizzas.has(pizza.label)
                  ? 'bg-gray-100 border-gray-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: pizza.color }}
              />
              <span className="text-sm text-gray-700">{pizza.label}</span>
              {selectedPizzas.has(pizza.label) && (
                <Check className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <div className={`border-y border-r rounded-r-full px-2 ${
              selectedPizzas.has(pizza.label)
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white border-gray-200'
            }`}>
              <ColorPicker
                color={pizza.color}
                onChange={(color) => onColorChange(pizza.label, color)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
