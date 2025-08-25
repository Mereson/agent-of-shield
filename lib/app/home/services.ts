import { useMutation } from "@tanstack/react-query"

export interface Location {
	place_id?: string
	display_name: string
	lat: string
	lon: string
}

export interface SendLocationDataProps {
	location: {
		longitude: string
		latitude: string
		name: string
	}
	previousDate: string
	currentDate: string
}


/**
 * -------------------------------
 * ---- ANALYZE LOCATION DATA ----
 * -------------------------------
 */

const sendLocationDataRequest = async (data: SendLocationDataProps) => {
	console.log(data)
	const res = await fetch("/api/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			endpoint: "prompt/get-sentiment",
			data,
		}),
	})

	const result = await res.json()

	if (!result.success)
		throw new Error(result.message || "Send location data failed")

	return result
}

export const useSendLocationData = () =>
	useMutation({
		mutationFn: sendLocationDataRequest,
	})


	