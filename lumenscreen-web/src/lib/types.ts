export type ScoreDiagnostic = {
  probability: number;
  predicted_positive: boolean;
  label: string;
  threshold: number;
  model_name: string;
  importances: { feature: string; label: string; weight: number }[];
  values: Record<string, number | null>;
  disclaimer: string;
};
