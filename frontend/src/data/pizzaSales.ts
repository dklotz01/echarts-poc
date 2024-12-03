export interface Pizza {
  id: string;
  label: string;
  value: number;
  color: string;
  date: string;
}

export const pizzaSalesData: Pizza[] = [
  { id: '1', label: 'Pepperoni', value: 10, color: '#FF4500', date: '2024-11-15' }, // Pepperoni: spicy red-orange
  { id: '2', label: 'Hot Honey Chicken', value: 20, color: '#FFA500', date: '2024-11-15' }, // Hot Honey Chicken: golden honey
  { id: '3', label: 'Margherita', value: 30, color: '#32CD32', date: '2024-11-16' }, // Margherita: fresh green basil
  { id: '4', label: 'Four Cheese', value: 40, color: '#F5DEB3', date: '2024-11-16' }, // Four Cheese: creamy beige
  { id: '5', label: 'Belle Meuniere Shrimps', value: 50, color: '#FFD700', date: '2024-11-17' }, // Shrimps: golden seafood
  { id: '6', label: 'Sausage', value: 60, color: '#A0522D', date: '2024-11-17' }, // Sausage: meaty brown
  { id: '7', label: 'Corn & Bacon', value: 70, color: '#FFD700', date: '2024-11-18' }, // Corn: golden yellow
  { id: '8', label: 'Ham and Olives', value: 80, color: '#556B2F', date: '2024-11-20' }, // Olives: dark olive green
  { id: '9', label: 'Hawaian Dream', value: 90, color: '#FF69B4', date: '2024-11-15' }, // Hawaiian: tropical pink
  { id: '10', label: 'Surf & Turf', value: 100, color: '#8B4513', date: '2024-11-17' }, // Surf & Turf: earthy brown
];
