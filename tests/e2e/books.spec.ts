import { test } from "@playwright/test";

// От дома до книги
test("Test home to book", async ({ page }) => {
  await page.goto("http://localhost:5173/home");
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
});

// От книг к книге
test("Test books to book", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await page.getByRole("button", { name: "Перейти" }).nth(1).click();
});

// От книги по нижней книге
test("Test book to footer books", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("button", { name: "Перейти" }).nth(2).click();
});

// Создание книги
test("Test create book", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
});
