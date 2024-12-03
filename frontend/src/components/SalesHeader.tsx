import React from 'react';
import { PizzaIcon } from 'lucide-react';

export const SalesHeader = () => (
  <div className="flex items-center gap-3 mb-8">
    <PizzaIcon className="w-8 h-8 text-orange-500" />
    <h1 className="text-3xl font-bold text-gray-800">Weekly Pizza Sales Distribution</h1>
  </div>
);
