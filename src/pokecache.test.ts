import { Cache } from "./pokecache.js";
import { expect, test } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
  {
    key: "https://example.com/test",
    val: "testing",
    interval: 400, // 50 milliseconds
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

 /*  const cached2 = cache.get(key);
  expect(cached2).toBe(val);
  
  const cached3 = cache.get(key);
  expect(cached3).toBe(val);  */

  const intervalTiem = await new Promise((resolve) => setTimeout(resolve, interval + 150));
  let reaped = await cache.get(key) || undefined;
  

  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});