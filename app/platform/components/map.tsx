"use client"

import {  useHelpers } from "@/lib/app"
import { LocationSuggestion, Search } from "./search"
import { Button, Typography } from "@/ui"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import dayjs from "dayjs"
import { notify, parseResMsg } from "@/lib/utils"
import { useSentimentContext } from "../context/useSentimentData"
import dynamic from "next/dynamic"

// SSR-safe dynamic map
const LeafletMap = dynamic(() => import("./leaflet"), { ssr: false })

const MapComponent = () => {
	const [query, setQuery] = useState("")
	const [debouncedQuery, setDebouncedQuery] = useState("")
	const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
	const [results, setResults] = useState<LocationSuggestion[]>([])
	const [position, setPosition] = useState<[number, number]>([6.4483, 7.5139])

	const [previousDate, setPreviousDate] = useState("")
	const [currentDate, setCurrentDate] = useState("")

	const { handleCurrentDate, handlePreviousDate } = useHelpers({
		currentDate,
		previousDate,
		setCurrentDate,
		setPreviousDate,
	})

	const { isPending, sendLocationData, setData } = useSentimentContext()

	// Debounce query input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query)
		}, 500)
		return () => clearTimeout(handler)
	}, [query])

	// Fetch suggestions
	useEffect(() => {
		const fetchSuggestions = async () => {
			if (debouncedQuery.length < 3) {
				setSuggestions([])
				return
			}
			try {
				const res = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}`
				)
				const data = await res.json()
				setSuggestions(data)
			} catch (err) {
				console.error("Error fetching suggestions", err)
			}
		}
		fetchSuggestions()
	}, [debouncedQuery])

	// Get user's current location
	useEffect(() => {
		if (!navigator.geolocation) return
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition([pos.coords.latitude, pos.coords.longitude])
			},
			(err) => console.warn("Location error:", err),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
		)
	}, [])

	const handleSearch = (location: LocationSuggestion) => {
		setQuery(location.display_name)
		setPosition([parseFloat(location.lat), parseFloat(location.lon)])
		setResults([location])
		setSuggestions([])
	}

	const handleSubmit = async () => {
		try {
			if (results.length === 0) throw new Error("Location not selected")
			const { lon, lat, display_name } = results[0]

			const data = {
				location: {
					longitude: lon,
					latitude: lat,
					name: display_name,
				},
				previousDate,
				currentDate: currentDate || dayjs().format("YYYY-MM-DD"),
			}

			const res = await sendLocationData(data)
			console.log(res.data)
			setData(res.data)

			// notify.success({message: "Data gathered and preprocessed successfully." })
			notify.success({ message: res.message || "Fetch successful" })
			// setData(res.data)
		} catch (error) {
			console.log(error)
			const errMsg = parseResMsg(error instanceof Error ? error.message : "An error occurred")
			notify.error({ message: errMsg })
		}
	}

	return (
		<section>
			<div className="mt-7 mb-6">
				<Search
					query={query}
					setQuery={setQuery}
					handleSearch={handleSearch}
					suggestions={suggestions}
					setSuggestions={setSuggestions}
				/>
			</div>

			<section className="rounded-[0.5rem] h-[25.5rem] w-full">
				<LeafletMap position={position} />
			</section>



			<div className="flex gap-9 mt-7 mb-[2.625rem] items-center">
				<Button text="Filter by Crime Type" fit primary customClassname="!cursor-not-allowed" aria-disabled  />
				<Typography fontWeight="medium">Select Year Range</Typography>
				<input
					type="date"
					disabled
					title="No strength to complete"
					value={previousDate}
					onChange={handlePreviousDate}
					className="py-2 px-3 bg-[#21364A] rounded-[4px] outline-0 cursor-not-allowed"
				/>
				to
				<input
					type="date"
					value={currentDate}
					onChange={handleCurrentDate}
					className="py-2 px-3 bg-[#21364A] rounded-[4px] outline-0 cursor-pointer"
				/>
			</div>

			<div className="flex gap-3 items-center">
				<Button
					loading={isPending}
					onClick={handleSubmit}
					text={isPending ? "Analyzing" : "Analyze"}
					fit
				/>

				{isPending && <p>Loading...</p>}
			</div>
		</section>
	)
}

export default MapComponent