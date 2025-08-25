"use client"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapUpdater } from "@/lib/app"

type Props = {
	position: [number, number]
}

const LeafletMap = ({ position }: Props) => {
	return (
		<MapContainer
			center={position}
			zoom={10}
			style={{
				height: "100%",
				width: "100%",
				borderRadius: "8px",
			}}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
			<Marker
				position={position}
				icon={L.icon({
					iconUrl:
						"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowUrl:
						"https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
					shadowSize: [41, 41],
				})}
			/>
			<MapUpdater position={position} />
		</MapContainer>
	)
}

export default LeafletMap