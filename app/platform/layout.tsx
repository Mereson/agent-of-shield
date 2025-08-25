import { SentimentProvider } from "./context/useSentimentData"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<SentimentProvider>{children}</SentimentProvider>
		</main>
	)
}

export default Layout
