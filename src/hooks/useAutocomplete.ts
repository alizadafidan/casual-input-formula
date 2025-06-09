
import { useQuery } from "@tanstack/react-query";
import type { AutocompleteItem } from "../types";

const fetchAutocomplete = async (
  query: string
): Promise<AutocompleteItem[]> => {
  try {
    const response = await fetch(
      `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${encodeURIComponent(
        query
      )}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn("API failed, using fallback data:", error);
  }

  // fallback data
  const fallbackData: AutocompleteItem[] = [
    { id: "revenue", name: "Revenue", category: "💰 Financials", value: 50000 },
    { id: "cost", name: "Cost", category: "💰 Financials", value: 25000 },
    { id: "profit", name: "Profit", category: "💰 Financials", value: 25000 },
    { id: "users", name: "Users", category: "📊 Metrics", value: 1250 },
    {
      id: "conversion",
      name: "Conversion Rate",
      category: "📊 Metrics",
      value: 0.05,
    },
    {
      id: "growth",
      name: "Monthly Growth",
      category: "📊 Metrics",
      value: 0.15,
    },
    { id: "cac", name: "CAC", category: "📈 Marketing", value: 120 },
    { id: "ltv", name: "LTV", category: "📈 Marketing", value: 2400 },
    { id: "churn", name: "Churn Rate", category: "📊 Metrics", value: 0.02 },
    { id: "mrr", name: "MRR", category: "💰 Financials", value: 85000 },
    { id: "arr", name: "ARR", category: "💰 Financials", value: 1020000 },
    { id: "team", name: "Team Size", category: "👥 Operations", value: 45 },
    { id: "target", name: "Sales Target", category: "🎯 Sales", value: 75000 },
    {
      id: "quota",
      name: "Quota Attainment",
      category: "🎯 Sales",
      value: 0.92,
    },
    { id: "sessions", name: "Sessions", category: "📊 Metrics", value: 15420 },
    { id: "bounce", name: "Bounce Rate", category: "📊 Metrics", value: 0.34 },
    {
      id: "pageviews",
      name: "Page Views",
      category: "📊 Metrics",
      value: 45230,
    },
    { id: "roas", name: "ROAS", category: "📈 Marketing", value: 4.2 },
    // Additional variables for testing
    {
      id: "expenses",
      name: "Expenses",
      category: "💰 Financials",
      value: 15000,
    },
    { id: "leads", name: "Leads", category: "📈 Marketing", value: 2500 },
    { id: "deals", name: "Deals", category: "🎯 Sales", value: 128 },
    { id: "pipeline", name: "Pipeline", category: "🎯 Sales", value: 450000 },
    {
      id: "retention",
      name: "Retention Rate",
      category: "📊 Metrics",
      value: 0.85,
    },
  ];

  return fallbackData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const useAutocompleteQuery = (
  query: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchAutocomplete(query),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, 
    select: (data: AutocompleteItem[]) => data.slice(0, 8),
    refetchOnWindowFocus: false,
  });
};
