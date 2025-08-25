import { Typography } from "@/ui"
import ReactECharts from "echarts-for-react"

export const Charts = ({ option, title }) => {
	return (
		<section className="rounded-[0.5rem] h-[24.438rem] shadow-md text-[#8281a4] w-full my-6 border-[1px] border-[#304D69]">
			<Typography variant="body-r" fontWeight="bold" customClassName="px-6 pt-6">{title}</Typography>
			<ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
		</section>
	)
}
