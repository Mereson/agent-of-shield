"use client"
import { Typography } from "@/ui"
import React from "react"
import MapComponent from "../components/map"

export const Hero = () => {
	return (
		<section className="w-screen grid h-full place-content-center">
			<main className="my-5 p-4 w-[57.875rem]">
				<div className="grid gap-3">
					<Typography tag="h1" variant="h1">
						Crime Heatmap
					</Typography>
					<Typography variant="body-s" color="info">
						Explore crime incidents in your area and stay informed.
					</Typography>
				</div>
				<MapComponent />
			</main>
		</section>
	)
}
