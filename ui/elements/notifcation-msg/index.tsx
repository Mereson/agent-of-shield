"use client"

import React from "react"
import { NotificationMsgProps } from "./index.types"
import clsx from "clsx"

const NotificationMsg = ({
	message,
	type = "success",
}: NotificationMsgProps) => {
	return (
		<div className="flex flex-col">
			{message && (
				<h2
					className={clsx(
						"!rounded-[0.525rem] !px-[1.563rem]  !py-2.5 sm:!py-2 text-xs  first-letter:capitalize sm:text-sm",
						type === "success"
							? "!bg-[#85C55A] !text-black"
							: "!bg-[#CA2834] !text-white"
					)}
				>
					{message}
				</h2>
			)}
		</div>
	)
}

export { NotificationMsg }
export * from "./index.types"
