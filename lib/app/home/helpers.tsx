import React, { Dispatch, SetStateAction, useEffect } from "react"
import dayjs from "dayjs"
import { useMap } from "react-leaflet"

const today = dayjs().format("YYYY-MM-DD")

export const useHelpers = ({
	currentDate,
	previousDate,
	setPreviousDate,
	setCurrentDate,
}: {
	currentDate: string
	previousDate: string
	setPreviousDate: Dispatch<SetStateAction<string>>
	setCurrentDate: Dispatch<SetStateAction<string>>
}) => {
	const handlePreviousDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = dayjs(e.target.value)
		const current = currentDate ? dayjs(currentDate) : null

		if (current && selectedDate.isAfter(current)) {
			// If selected previousDate is after currentDate, set previousDate to one day before currentDate
			const dayBefore = current.subtract(1, "day").format("YYYY-MM-DD")
			setPreviousDate(dayBefore)
		} else if (selectedDate.isAfter(dayjs())) {
			setPreviousDate(today)
		} else {
			setPreviousDate(e.target.value)
		}

		// If currentDate is not set or is today, set it to today
		if (!currentDate || dayjs(currentDate).isSame(today, "day")) {
			setCurrentDate(today)
		}
	}

	const handleCurrentDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = dayjs(e.target.value)
		const previous = previousDate ? dayjs(previousDate) : null

		if (previous && selectedDate.isBefore(previous)) {
			setCurrentDate(today) // set to today if invalid
		} else {
			setCurrentDate(e.target.value)
		}
	}

	return {
		handlePreviousDate,
		handleCurrentDate,
	}
}

export const MapUpdater = ({ position }: { position: [number, number] }) => {
	const map = useMap()
	useEffect(() => {
		map.setView(position, 16)
		// Add a slight delay to ensure container is fully rendered
		setTimeout(() => {
			map.invalidateSize()
		}, 100)
	}, [map, position])
	return null
}
const wittyMessages = [
	"Consulting local crime oracles...",
	"Sniffing out shady tweets...",
	"Cross-referencing gossip with facts...",
	"Plotting sentiment on a crime-radar...",
	"Interrogating the data gently...",
	"Dusting for digital fingerprints...",
	"Compiling mood swings by region...",
	"Reading between the crime lines...",
	"Crunching emotional alibis...",
	"Spying on sentiment without a warrant...",
	"Staring down the numbers until they talk...",
	"Profiling positivity vs. pessimism...",
	"Dragging clues out of the news...",
	"Mapping the drama in 3D...",
	"Letting the AI do detective work...",
]

export const useLoadingMessages = () => {
	type ShouldContinue = () => boolean
	type UpdateMessage = (message: string) => void

	let intervalId: NodeJS.Timeout | null = null
	let timeoutId: NodeJS.Timeout | null = null

	const handleLoadingMessages = (
		shouldContinue: ShouldContinue,
		updateMessage: UpdateMessage
	): void => {
		if (intervalId) clearInterval(intervalId)
		if (timeoutId) clearTimeout(timeoutId)

		const showMessage = () => {
			if (!shouldContinue()) {
				if (intervalId) clearInterval(intervalId)
				if (timeoutId) clearTimeout(timeoutId)
				return
			}
			const randomIndex = Math.floor(Math.random() * wittyMessages.length)
			updateMessage(wittyMessages[randomIndex])
		}

		timeoutId = setTimeout(() => {
			showMessage()
			intervalId = setInterval(showMessage, 10000)
		}, 10000)
	}

	return { handleLoadingMessages, intervalId, timeoutId }
}
