import { SentimentOutput } from "../utils"

export const useSentimentOptions = ({
	sentimentData,
}: {
	sentimentData: SentimentOutput[] | null | undefined
}) => {
	const colors = {
		Neutral: "#8281a4",
		Positive: "#0AD95C",
		Negative: "#CA2834",
	}

	const getDistributionOption = (
		data: { sentiment: string; value: number }[] = []
	) => {
		const colorMap: Record<string, string> = {
			Positive: colors.Positive,
			Negative: colors.Negative,
			Neutral: colors.Neutral,
		}

		return {
			tooltip: { trigger: "axis" },
			xAxis: {
				type: "category",
				data: data.length > 0 ? data.map((d) => d.sentiment) : ["No Data"],
			},
			yAxis: { type: "value", max: 100 },
			series: [
				{
					type: "bar",
					data:
						data.length > 0
							? data.map((d) => ({
									value: d.value,
									itemStyle: { color: colorMap[d.sentiment] || "#4A90E2" },
								}))
							: [{ value: 0 }],
				},
			],
			grid: { left: "10%", right: "10%", containLabel: true },
		}
	}

	const getTimeSeriesOption = (
		data: {
			time: string
			Neutral: number
			Positive: number
			Negative: number
		}[] = []
	) => ({
		tooltip: { trigger: "axis" },
		legend: {
			data: ["Neutral", "Positive", "Negative"],
			textStyle: {
				color: "#fff", 
				fontWeight: "bold",
				fontSize: 12,
			},
		},
		xAxis: {
			type: "category",
			data: data.length > 0 ? data.map((d) => d.time) : ["No Data"],
		},
		yAxis: { type: "value" },
		series: [
			{
				name: "Neutral",
				type: "line",
				smooth: 0.3,
				lineStyle: { width: 8 },
				data: data.length > 0 ? data.map((d) => d.Neutral) : [0],
				itemStyle: { color: colors.Neutral },
			},
			{
				name: "Positive",
				type: "line",
				smooth: 0.3,
				lineStyle: { width: 8 },
				data: data.length > 0 ? data.map((d) => d.Positive) : [0],
				itemStyle: { color: colors.Positive },
			},
			{
				name: "Negative",
				type: "line",
				smooth: 0.3,
				lineStyle: { width: 8 },
				data: data.length > 0 ? data.map((d) => d.Negative) : [0],
				itemStyle: { color: colors.Negative },
			},
		],
		grid: { left: "10%", right: "10%", containLabel: true },
	})

	const getCategorizationOption = (
		data: {
			category: string
			Neutral: number
			Positive: number
			Negative: number
		}[] = []
	) => ({
		tooltip: { trigger: "axis" },
		legend: { data: ["Neutral", "Positive", "Negative"] },
		xAxis: {
			type: "value",
		},
		yAxis: {
			type: "category",
			data: data.length > 0 ? data.map((d) => d.category) : ["No Data"],
		},
		series: [
			{
				name: "Neutral",
				type: "bar",
				stack: "total",
				data: data.length > 0 ? data.map((d) => d.Neutral) : [0],
				itemStyle: { color: colors.Neutral },
			},
			{
				name: "Positive",
				type: "bar",
				stack: "total",
				data: data.length > 0 ? data.map((d) => d.Positive) : [0],
				itemStyle: { color: colors.Positive },
			},
			{
				name: "Negative",
				type: "bar",
				stack: "total",
				data: data.length > 0 ? data.map((d) => d.Negative) : [0],
				itemStyle: { color: colors.Negative },
			},
		],
		grid: { left: "10%", right: "10%", containLabel: true },
	})

	const distributionData =
		sentimentData?.find((d) => d.type === "distribution")?.data || []
	const timeSeriesData =
		sentimentData?.find((d) => d.type === "time_series")?.data || []
	const categorizationData =
		sentimentData?.find((d) => d.type === "categorization")?.data || []
	const summaryData =
		sentimentData?.find((d) => d.type === "summary")?.data ||
		"Data not available"

	const distributionOption = getDistributionOption(
		Array.isArray(distributionData) ? distributionData : []
	)
	const timeSeriesOption = getTimeSeriesOption(
		Array.isArray(timeSeriesData) ? timeSeriesData : []
	)
	const categorizationOption = getCategorizationOption(
		Array.isArray(categorizationData) ? categorizationData : []
	)

	return {
		distributionOption,
		timeSeriesOption,
		categorizationOption,
		summaryData,
	}
}
