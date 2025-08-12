import type { Product, ProductCategory } from "@/types/product"

export const productCategories: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Electrical Terminals",
    description: "High-quality terminals for electrical connections",
    image: "/images/categories/electrical-terminals.png",
    subcategories: [
      {
        id: "subcat-1",
        name: "Aluminum Terminals",
        description: "Terminals made from aluminum for power connections",
        image: "/images/subcategories/aluminum-terminals.png",
      },
      {
        id: "subcat-2",
        name: "Copper Terminals",
        description: "Terminals made from copper for reliable connections",
        image: "/images/subcategories/copper-terminals.png",
      },
      {
        id: "subcat-3",
        name: "Small Terminals",
        description: "Compact terminals for smaller gauge wires",
        image: "/images/subcategories/small-terminals.png",
      },
    ],
  },
  {
    id: "cat-2",
    name: "Overhead Distribution",
    description: "Components for overhead power distribution systems",
    image: "/images/categories/overhead-distribution.png",
    subcategories: [
      {
        id: "subcat-4",
        name: "Mechanical Connectors",
        description: "Mechanical connectors for overhead lines",
        image: "/images/subcategories/mechanical-connectors.png",
      },
      {
        id: "subcat-5",
        name: "C-Wedge Connectors",
        description: "C-Wedge style connectors for secure connections",
        image: "/images/subcategories/c-wedge-connectors.png",
      },
      {
        id: "subcat-6",
        name: "Parallel Groove Connectors",
        description: "Parallel groove connectors for distribution lines",
        image: "/images/subcategories/parallel-groove-connectors.png",
      },
      {
        id: "subcat-7",
        name: "P-Tap Connectors",
        description: "P-Tap style connectors for tap connections",
        image: "/images/subcategories/p-tap-connectors.png",
      },
    ],
  },
  {
    id: "cat-3",
    name: "Mechanical Tools",
    description: "Professional tools for electrical installations",
    image: "/images/categories/mechanical-tools.png",
  },
  {
    id: "cat-4",
    name: "Grounding Connectors",
    description: "Reliable grounding and earthing solutions",
    image: "/images/categories/grounding-connectors.png",
  },
  {
    id: "cat-5",
    name: "Networking",
    description: "Components for data and network installations",
    image: "/images/categories/networking.png",
  },
  {
    id: "cat-6",
    name: "Unified Communication",
    description: "Solutions for integrated communication systems",
    image: "/images/categories/unified-communication.png",
  },
]

export const products: Product[] = [
  {
    id: "product-001",
    description: "Power Distribution Terminal Block",
    itemCode: "85369010",
    modelNumber: "DB-100A",
    brand: "Schneider Electric",
    quantity: 150,
    prices: {
      tier2Price: 450,
      crpEndPrice: 520,
      customerPrice: 650,
    },
    createdAt: "2023-01-05T10:30:00Z",
    updatedAt: "2023-01-05T10:30:00Z",
  },
  {
    id: "product-002",
    description: "3-Phase Circuit Breaker",
    itemCode: "85362020",
    modelNumber: "MCB-63A",
    brand: "ABB",
    quantity: 75,
    prices: {
      tier2Price: 1200,
      crpEndPrice: 1350,
      customerPrice: 1650,
    },
    createdAt: "2023-01-10T14:15:00Z",
    updatedAt: "2023-01-10T14:15:00Z",
  },
  {
    id: "product-003",
    description: "Industrial Power Contactor",
    itemCode: "85365020",
    modelNumber: "LC1D25",
    brand: "Siemens",
    quantity: 100,
    prices: {
      tier2Price: 850,
      crpEndPrice: 950,
      customerPrice: 1150,
    },
    createdAt: "2023-01-15T09:45:00Z",
    updatedAt: "2023-01-15T09:45:00Z",
  },
  {
    id: "product-004",
    description: "Digital Panel Meter",
    itemCode: "90328990",
    modelNumber: "DPM-48",
    brand: "L&T",
    quantity: 50,
    prices: {
      tier2Price: 1800,
      crpEndPrice: 2000,
      customerPrice: 2400,
    },
    createdAt: "2023-01-20T11:20:00Z",
    updatedAt: "2023-01-20T11:20:00Z",
  },
  {
    id: "product-005",
    description: "Industrial Power Cable (100m)",
    itemCode: "85444999",
    modelNumber: "PC-4C-16",
    brand: "Havells",
    quantity: 25,
    prices: {
      tier2Price: 4500,
      crpEndPrice: 5000,
      customerPrice: 5800,
    },
    createdAt: "2023-01-25T16:30:00Z",
    updatedAt: "2023-01-25T16:30:00Z",
  },
]
