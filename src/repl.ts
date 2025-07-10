export function cleanInput(input: string): string[] {
    let inputArray = input.toLocaleLowerCase().trim().split(" ").filter((input) => input !== "");
    return inputArray;
}