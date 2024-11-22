export type RootStackParamList = {
  Home: {menuItems?: { dishName: string; description: string; course: string; price: number }[]; // For batch updates
  };

  AddMenu: { menuItems: { dishName: string; description: string; course: string; price: number; }[]};
  
  FilterMenu: { menuItems: { dishName: string; description: string; course: string; price: number; }[]};};



  