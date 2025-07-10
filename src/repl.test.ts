import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
      input: "  hello  world  ",
      expected: ["hello", "world"],
    },
    {
        input: "  This is  new INPUT",
        expected: ["this", "is", "new", "input"],
    },
    {
        input: "  This is  new INPUT   CommanD",
        expected: ["this", "is", "new", "input", "command"],
    },
    {
        input: "  This is          input",
        expected: ["this", "is", "input"],
    },
    {
        input: "    ",
        expected: [],
    },
  ])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
      let actual = cleanInput(input);
      expect(actual).toHaveLength(expected.length);
      for (const i in expected) {
        expect(actual[i]).toBe(expected[i]);
      }
    });
  });