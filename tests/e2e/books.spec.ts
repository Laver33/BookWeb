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

// Создание книги ( без входа)
test("Test create book", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await page.getByRole("button", { name: "Добавить книгу" }).click();
});

test("Test recommend book without login", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.locator("path").nth(3).click();
});

test("Test unrecommend book without login", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("img").nth(4).click();
  await page.getByRole("img").nth(4).click();
});

test("Test recommend book with login", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("pad666444@gmail.com");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("admin12345");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("img").nth(3).click();
});

test("Test unrecommend book with login", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("pad666444@gmail.com");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("admin12345");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("img").nth(4).click();
});
