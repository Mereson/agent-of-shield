import localFont from "next/font/local"

export const SpaceGrotesk = localFont({
	src: [
		{
			path: "../public/font/space-grotesk/SpaceGrotesk-Bold.ttf",
			weight: "700",
			style: "normal",
		},

		{
			path: "../public/font/space-grotesk/SpaceGrotesk-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/font/space-grotesk/SpaceGrotesk-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/font/space-grotesk/SpaceGrotesk-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/font/space-grotesk/SpaceGrotesk-Light.ttf",
			weight: "300",
			style: "normal",
		},
	],
	display: "fallback",
	variable: "--font-space-grotesk",
})
