export function weightList(
	diceCount: number,
	faceCount = 6
): Map<number, number> {
	const map = new Map<number, number>()

	const dice = new Array<number>(diceCount).fill(1)

	const sum = (arr: any[]) => arr.reduce((p, c) => p + c, 0)
	let roll = sum(dice)

	const permutations = Math.pow(faceCount, diceCount)

	for (let i = 0; i < permutations; i++) {
		map.set(roll, (map.get(roll) ?? 0) + 1)

		// Increment
		for (let i = 0; i < dice.length; i++) {
			dice[i] = (dice[i] % faceCount) + 1
			if (dice[i] !== 1) break
		}

		roll = sum(dice)
	}

	for (const [roll, count] of [...map.entries()]) {
		map.set(roll, count / permutations)
	}

	return map
}
