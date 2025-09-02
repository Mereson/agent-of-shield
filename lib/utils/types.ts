export type SentimentType = "summary" | "distribution" | "time_series" | "categorization";

export type SummaryData = string;

export type DistributionData = {
  sentiment: "Neutral" | "Positive" | "Negative";
  value: number;
}[];

export type TimeSeriesData = {
  time: string; 
  Neutral: number;
  Positive: number;
  Negative: number;
}[];

export type CategorizationData = {
  category: string;
  Neutral: number;
  Positive: number;
  Negative: number;
}[];

export type SentimentOutput =
  | { type: "summary"; data: SummaryData }
  | { type: "distribution"; data: DistributionData }
  | { type: "time_series"; data: TimeSeriesData }
  | { type: "categorization"; data: CategorizationData };


  // (
	// 	| { type: "summary"; data: string }
	// 	| { type: "distribution"; data: { sentiment: Sentiment; value: number }[] }
	// 	| {
	// 			type: "time_series"
	// 			data: {
	// 				time: string
	// 				Neutral: number
	// 				Positive: number
	// 				Negative: number
	// 			}[]
	// 	  }
	// 	| {
	// 			type: "categorization"
	// 			data: {
	// 				category: string
	// 				Neutral: number
	// 				Positive: number
	// 				Negative: number
	// 			}[]
	// 	  }
	// )[]