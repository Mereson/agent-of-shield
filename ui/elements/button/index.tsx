import clsx from "clsx"

interface ButtonProps {
	primary?: boolean
	fit?: boolean
	text: string
	customClassname?: string
	type?: "button" | "submit" | undefined
	loading?: boolean
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		primary,
		fit,
		text,
		customClassname,
		type = "button",
		onClick,
		loading,
		...rest
	} = props
	return (
		<button
			type={type}
			onClick={onClick}
			className={clsx(
				"cursor-pointer rounded-[0.5rem] border-0 text-white px-4 py-[0.594rem] font-bold outline-0 transition-colors duration-200 ease-linear",
				primary ? "bg-[#21364A]" : "bg-[#0D80F2]",
				fit ? "w-fit" : "w-full",
				loading && "!cursor-not-allowed !bg-[#4b4a4a] !text-[#999999]",
				customClassname
			)}
			disabled={loading}
			{...rest}
		>
			{text}
		</button>
	)
}

export { Button }
