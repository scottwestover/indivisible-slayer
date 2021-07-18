export default function cloneArray<T>(array: T[]): T[] {
  const clonedArray: T[] = [];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const clone = { ...array[i] };
    clonedArray.push(clone);
  }
  return clonedArray;
}
