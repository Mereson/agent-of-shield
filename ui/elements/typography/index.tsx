import clsx from "clsx"
import { TypographyProps, variantMapping } from "./index.types"
import { cva } from "class-variance-authority"

const typography = cva("", {
	variants: {
		intent: {
			h1: "text-[2rem] leading-10 font-bold",
			h2: "text-[1.375rem] leading-7 font-bold",
			"body-r": "text-base leading-6",
			"body-s": "text-sm leading-[1.313rem]",
			"body-xs": "text-[0.813rem] leading-5",
		},
		color: {
			white: "text-white",
			info: "text-[#8FADCC]",
		},
		fontWeight: {
			light: "font-light",
			regular: "font-regular",
			medium: "font-medium",
			"semi-bold": "font-semibold",
			bold: "font-bold",
		},
		underline: { always: "underline", hover: "hover:underline", none: "" },
		align: {
			center: "text-center",
			start: "text-start",
			end: "text-end",
			left: "text-left",
			right: "text-right",
			justify: "text-justify",
		},
	},
	compoundVariants: [],
})

// Typography component
const Typography: React.FC<TypographyProps> = (props) => {
	const {
		variant = "body-r",
		color = "white",
		tag,
		underline = "none",
		fontWeight,
		gutterBottom,
		noWrap,
		align = "left",
		customClassName = "",
		children,
	} = props

	// Resolved tag
	const Tag = (tag ||
		variantMapping[variant] ||
		"p") as keyof React.JSX.IntrinsicElements

	// Classes
	const className = clsx(
		gutterBottom && "mb-4",
		noWrap && "overflow-hidden text-ellipsis whitespace-nowrap"
	)

	return (
		<Tag
			className={typography({
				intent: variant,
				color,
				underline,
				fontWeight,
				align,
				className: `${className} ${customClassName} `,
			})}
		>
			{children}
		</Tag>
	)
}

export { Typography }
export * from "./index.types"
