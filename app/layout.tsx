import type { Metadata } from "next"
import "@/styles/globals.css"
import { SpaceGrotesk } from "@/styles/fonts"
import Providers from "./providers"

export const metadata: Metadata = {
	title: "Agent of Shield",
	description: "Built by Chimere",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${SpaceGrotesk.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
