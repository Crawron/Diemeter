const colors = [
	"#FF595A",
	"#FF7D77",
	"#FF9B94",
	"#FFB7B0",
	"#F8D3CF",
	"#D8EAC7",
	"#C0E5A0",
	"#A6E178",
	"#89DB4D",
	"#66D500",
]

function lerp(min: number, max: number, delta: number) {
	return Math.min(Math.max(min + (max - min) * delta, min), max)
}

function lerpInverse(min: number, max: number, value: number) {
	return (value - min) / (max - min)
}

export const meterColor = (value: number) =>
	value === 0
		? "#EEEEEE"
		: colors[
				Math.floor(
					lerp(0, colors.length - 0.0000001, lerpInverse(-0.09, 0.09, value))
				)
		  ]
