import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { pizzaSalesData, Pizza } from '../data/pizzaSales';
import { format, parse } from 'date-fns';
import { PizzaSelector } from './PizzaSelector';
import { DateSelector } from './DateSelector';
import { Download } from 'lucide-react';

interface ServerSideChartProps {
}

export const ServerSideChart = () => {
  const [selectedPizzas, setSelectedPizzas] = useState<Set<string>>(
    new Set(pizzaSalesData.map((pizza: Pizza) => pizza.label))
  );

  const [pizzaColors, setPizzaColors] = useState<Record<string, string>>(() => {
    const colors: Record<string, string> = {};
    pizzaSalesData.forEach((pizza: Pizza) => {
      if (!colors[pizza.label]) {
        colors[pizza.label] = pizza.color;
      }
    });
    return colors;
  });

  const dates = pizzaSalesData.map((pizza: Pizza) => 
    parse(pizza.date, 'yyyy-MM-dd', new Date())
  );
  const minDate = useMemo(() => new Date(Math.min(...dates.map((d: Date) => d.getTime()))), []);
  const maxDate = useMemo(() => new Date(Math.max(...dates.map((d: Date) => d.getTime()))), []);
  
  const [selectedDate, setSelectedDate] = useState<Date>(minDate);

  const handleTogglePizza = (label: string) => {
    setSelectedPizzas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const handleColorChange = (label: string, color: string) => {
    setPizzaColors(prev => ({
      ...prev,
      [label]: color
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const filteredData = useMemo(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return pizzaSalesData
      .filter((pizza: Pizza) => pizza.date === dateStr && selectedPizzas.has(pizza.label))
      .map((pizza: Pizza) => ({
        ...pizza,
        id: pizza.label,
        color: pizzaColors[pizza.label]
      })) as Pizza[];
  }, [selectedDate, selectedPizzas, pizzaColors]);

  const uniquePizzas = useMemo(() => 
    Array.from(new Set(pizzaSalesData.map((pizza: Pizza) => ({
      id: pizza.label,
      label: pizza.label,
      color: pizzaColors[pizza.label]
    })))) as { id: string; label: string; color: string }[],
    [pizzaColors]
  );

  const [svg, setSvg] = useState('');

  useEffect(() => {
    axios.post('http://localhost:3000/chart', filteredData)
      .then((response) => {
        setSvg(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filteredData]);

  const handleGeneratePdf = () => {
    axios.post('http://localhost:3000/generate-pdf', filteredData, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />
      <PizzaSelector
        pizzas={uniquePizzas}
        selectedPizzas={selectedPizzas}
        onTogglePizza={handleTogglePizza}
        onColorChange={handleColorChange}
      />
      <button 
        onClick={handleGeneratePdf} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Download size={20} className="mr-2" />
        Generate PDF
      </button>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};
