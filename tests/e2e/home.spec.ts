import { test } from "@playwright/test";

test("Open home page", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
});

test("Test header button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Начать читать" }).click();
});

test("Test navigate buttons", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Главная" }).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("link", { name: "Главная" }).click();
  await page.getByRole("img").click();
});

test("Test footer button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Начать сейчас" }).click();
});

test("Test top button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Топ авторов" }).click();
});
