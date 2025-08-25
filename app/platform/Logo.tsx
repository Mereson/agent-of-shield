import Image from "next/image"
import React from "react"
import BrokenShieldImage from "@/public/assets/images/broken-shield.png"

const Logo = () => {
	return (
		<figure className="flex items-center gap-2 justify-center">
			<Image src={BrokenShieldImage} className="h-6 w-6" alt="Logo" />{" "}
			<figcaption className="font-bold text-xl">Agent of Shield</figcaption>
		</figure>
	)
}

export default Logo
