import React from "react"
import Logo from "../Logo"

export const Navbar = () => {
	return (
		<nav className="px-10 py-3 flex items-center w-full border-b-[1.5px] border-gray-500">
			<Logo />
			<div className="flex justify-between items-center pl-9 w-[86%] ">
				<ul className="flex gap-9 font-medium text-base">
					<li>Home</li>
					<li>Alert</li>
					<li>Report</li>
				</ul>
                <div className="bg-gray-300 rounded-full size-[40px]"></div>
			</div>
		</nav>
	)
}
