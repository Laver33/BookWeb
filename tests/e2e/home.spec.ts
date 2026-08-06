import { test } from "@playwright/test";

// Открытие главной страницы
test("Open home page", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
});

// Тест кнопки чтения
test("Test header button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Начать читать" }).click();
});

// Навигационные кнопки
test("Test navigate buttons", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Главная" }).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("link", { name: "Главная" }).click();
  await page.getByRole("img").click();
});

// Тест нижней кнопки
test("Test footer button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Начать сейчас" }).click();
});

// Тест топ авторов
test("Test top button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Топ авторов" }).click();
});

// Тест переключения тем
test("nav theme", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("img").click();
  await page.locator("path").first().click();
});
