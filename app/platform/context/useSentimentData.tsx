"use client"
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react"

import { SendLocationDataProps, useSendLocationData } from "@/lib/app"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import { SentimentOutput } from "@/lib/utils"

type BackendResult = {
	location: string
	result: SentimentOutput[]
}

type SentimentContextType = {
	data: BackendResult | null | undefined
	setData: Dispatch<SetStateAction<BackendResult | null | undefined>>
	isPending: boolean
	isSuccess: boolean
	sendLocationData: UseMutateAsyncFunction<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		Error,
		SendLocationDataProps,
		unknown
	>
}

const SentimentContext = createContext<SentimentContextType | undefined>(
	undefined
)

export const SentimentProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<BackendResult | null>()

	const {
		mutateAsync: sendLocationData,
		isPending,
		isSuccess,
	} = useSendLocationData()

	return (
		<SentimentContext.Provider
			value={{ data, setData, isPending, isSuccess, sendLocationData }}
		>
			{children}
		</SentimentContext.Provider>
	)
}

export const useSentimentContext = () => {
	const context = useContext(SentimentContext)
	if (!context)
		throw new Error(
			"useSentimentContext must be used within a SentimentProvider"
		)
	return context
}
