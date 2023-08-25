import { expect, it } from "vitest";
import { rowsToData } from "../rowsToData";

it("rowsToData returnColumns", async () => {
  const t = Date.now();
  const res = rowsToData(
    Array(10).fill({
      id: "the-id",
      j: {
        name: "dog",
        age: 20,
        vip: true,
        dog: "the dog",
        cat: "the cat",
        fish: "the fish",
        orm: "the orm",
        redis: "the redis",
        pg: "the pg",
        createAt: "aaaaa",
        updateAt: "aaaaa",
      },
    }),
    ["name", "age", "vip", "dog", "fish", "pg"],
    ["name", "dog", "pg"],
  );
  expect(Date.now() - t).lessThan(100);

  expect(res).deep.eq(
    Array(10).fill({
      id: "the-id",
      createAt: "aaaaa",
      updateAt: "aaaaa",
      name: "d***g",
      age: 20,
      vip: true,
      dog: "th***og",
      fish: "the fish",
      pg: "th***pg",
    }),
  );
});

it("rowsToData not", async () => {
  const t = Date.now();
  const res = rowsToData(
    Array(10).fill({
      id: "the-id",
      j: {
        name: "dog",
        age: 20,
        vip: true,
        dog: "the dog",
        cat: "the cat",
        fish: "the fish",
        orm: "the orm",
        redis: "the redis",
        pg: "the pg",
        createAt: "aaaaa",
        updateAt: "aaaaa",
      },
    }),
  );
  expect(Date.now() - t).lessThan(100);

  expect(res).deep.eq(
    Array(10).fill({
      id: "the-id",
      name: "dog",
      age: 20,
      vip: true,
      dog: "the dog",
      cat: "the cat",
      fish: "the fish",
      orm: "the orm",
      redis: "the redis",
      pg: "the pg",
      createAt: "aaaaa",
      updateAt: "aaaaa",
    }),
  );
});
