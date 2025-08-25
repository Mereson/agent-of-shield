"use client"
import { Typography } from "@/ui"
import React, { useEffect } from "react"
import { Charts } from "../components"
import { useSentimentContext } from "../context/useSentimentData"
import { useSentimentOptions } from "@/lib/hooks"
import { SentimentOutput } from "@/lib/utils"


export const Sentiment = () => {
	const { data, isPending, isSuccess } = useSentimentContext()

	console.log(data)
	const {
		distributionOption,
		categorizationOption,
		timeSeriesOption,
		summaryData,
	} = useSentimentOptions({ sentimentData: data?.result })

	// const {
	// 	distributionOption,
	// 	categorizationOption,
	// 	timeSeriesOption,
	// 	summaryData,
	// } = useSentimentOptions({ sentimentData: sampleData })

	
	if (isPending) return <div>...</div>

	

	return (
		<>
			{isSuccess && (
				<section className="w-screen grid place-content-center mt-12 mb-6">
					<main className="w-[57.875rem] grid gap-5">
						<div className="grid gap-3">
							<Typography tag="h2" variant="h2">
								Overall Sentiment
							</Typography>
							<Typography variant="body-r">
								{summaryData || "No summary to display"}
							</Typography>
						</div>
						<div>
							<Charts title={"Sentiment Distribution"} option={distributionOption} />
						</div>
						<div>
							<Typography tag="h2" variant="h2">
								Recent Sentiment Trends
							</Typography>
							<Charts title={"Sentiment Trend Over Time"} option={timeSeriesOption} />
						</div>
						<div>
							<Typography tag="h2" variant="h2">
								Sentiment by Category
							</Typography>
							<Charts title={"Sentiment by Category"} option={categorizationOption} />
						</div>
					</main>
				</section>
			)}
		</>
	)
}



const sampleData: SentimentOutput[] = [
	{
	  type: 'summary',
	  data: 'The overall sentiment in Enugu is currently neutral, with a slight positive trend (+2%) over the last 30 days.',
	},
	{
	  type: 'distribution',
	  data: [
		{ sentiment: 'Neutral', value: 50 },
		{ sentiment: 'Positive', value: 30 },
		{ sentiment: 'Negative', value: 20 },
	  ],
	},
	{
	  type: 'time_series',
	  data: [
		{ time: 'Week 1', Neutral: 5, Positive: 3, Negative: 2 },
		{ time: 'Week 2', Neutral: 6, Positive: 4, Negative: 1 },
		{ time: 'Week 3', Neutral: 4, Positive: 2, Negative: 3 },
		{ time: 'Week 4', Neutral: 7, Positive: 4, Negative: 2 },
	  ],
	},
	{
	  type: 'categorization',
	  data: [
		{ category: 'Safety', Neutral: 10, Positive: 5, Negative: 8 },
		{ category: 'Community', Neutral: 8, Positive: 6, Negative: 2 },
		{ category: 'Environment', Neutral: 2, Positive: 1, Negative: 1 },
		{ category: 'Services', Neutral: 1, Positive: 1, Negative: 0 },
	  ],
	},
  ];
