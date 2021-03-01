import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { jsonStringify } from "../jsonStringify.ts";

Deno.test("undefined", () => {
  assertEquals(jsonStringify(undefined), undefined);
});

Deno.test("true", () => {
  assertEquals(jsonStringify(true), "true");
});

Deno.test("string", () => {
  assertEquals(jsonStringify("foo"), `"foo"`);
});

Deno.test("symbol", () => {
  assertEquals(jsonStringify(Symbol("")), undefined);
});

Deno.test("NaN", () => {
  assertEquals(jsonStringify(NaN), "null");
});

Deno.test("Infinity", () => {
  assertEquals(jsonStringify(Infinity), "null");
});

Deno.test("null", () => {
  assertEquals(jsonStringify(null), "null");
});
