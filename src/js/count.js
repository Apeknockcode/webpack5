export default function count(...args) {
    return args.reduce((p, c) => c - p, 0)
}

