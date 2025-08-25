// search.tsx
"use client"
import Image from "next/image"
import SearchIcon from "@/public/assets/svgs/search-icon.svg"
import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react"

export type LocationSuggestion = {
	display_name: string
	lat: string
	lon: string
}

export const Search = ({
	query,
	setQuery,
	handleSearch,
	suggestions,
	setSuggestions,
}: {
	query: string
	setQuery: Dispatch<SetStateAction<string>>
	handleSearch: (location: LocationSuggestion) => void
	suggestions: LocationSuggestion[]
	setSuggestions: Dispatch<SetStateAction<LocationSuggestion[]>>
}) => {
	const [isFocused, setIsFocused] = useState(false)

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && suggestions.length > 0) {
			handleSearch(suggestions[0])
			setQuery(suggestions[0].display_name)
			setSuggestions([])
			setIsFocused(false)
		}
	}

	return (
		<section className="relative">
			<div className="w-full h-auto flex px-4 py-3 bg-[#21364A] rounded-[0.5rem]">
				<Image src={SearchIcon} alt="search icon" />
				<input
					type="text"
					value={query}
					onFocus={() => setIsFocused(true)}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={onKeyDown}
					placeholder="Search for a location"
					className="text-[#8FADCC] w-full px-2 outline-0 border-0 focus:bg-transparent"
				/>
			</div>
			{isFocused && suggestions.length > 0 && (
				<ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-700 rounded-[0.5rem] z-2000 max-h-60 overflow-y-auto">
					{suggestions.map((item, idx) => (
						<li
							key={idx}
							onClick={() => {
								setQuery(item.display_name)
								handleSearch(item)
								setSuggestions([])
								setIsFocused(false)
							}}
							className="px-4 py-2 cursor-pointer hover:bg-[#2c4b6b] hover:text-white text-black"
						>
							{item.display_name}
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
