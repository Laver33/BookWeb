import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/home");
});

// Тест кнопки чтения
test("Test header button", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Начать читать" }).click();
});

// Навигационные кнопки
test("Test navigate buttons", async ({ page }) => {
  await page.getByRole("link", { name: "Главная" }).click();
  await page.getByRole("button", { name: "Меню" }).hover();
  await page.getByText("Книги", { exact: true }).click();
  await page.getByRole("button", { name: "Меню" }).hover();
  await page.getByRole("button").getByText("Топ авторов").click();
  await page.getByRole("list").getByRole("img").click();
  await page.getByRole("list").getByRole("img").click();
});

// Тест нижней кнопки
test("Test footer button", async ({ page }) => {
  await page.getByRole("link", { name: "Начать сейчас" }).click();
});

// Тест топ авторов ( - )
test("Test top button", async ({ page }) => {
  await page.getByRole("button", { name: "Меню" }).hover();
  await page.getByRole("button").getByText("Топ авторов").click();
});

// Тест переключения тем
test("nav theme", async ({ page }) => {
  await page.getByRole("img").click();
  await page.locator("path").first().click();
});
