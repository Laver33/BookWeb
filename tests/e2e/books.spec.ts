import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "./tests/.env" });

const BASE_URL = "http://localhost:5173";
const TEST_ACC_EMAIL: string = process.env.TEST_ACC_EMAIL || "";
const TEST_ACC_PASSWORD: string = process.env.TEST_ACC_PASSWORD || "";

if (!TEST_ACC_EMAIL || !TEST_ACC_PASSWORD) {
  throw new Error(
    "TEST_ACC_EMAIL and TEST_ACC_PASSWORD must be set in tests/.env",
  );
}

const TEST_USER = {
  email: TEST_ACC_EMAIL,
  password: TEST_ACC_PASSWORD,
};

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole("textbox", { name: "Email" }).fill(TEST_USER.email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(TEST_USER.password);
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.getByText("Добро пожаловать")).toBeVisible();
});

// От дома до книги
test("Test home to book", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
});

// От книг к книге
test("Test books to book", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).nth(1).click();
});

// От книги по нижней книге
test("Test book to footer books", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("button", { name: "Перейти" }).nth(2).click();
});

test("Test recommend book with login", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("img").nth(3).click();
});

test("Test unrecommend book with login", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("img").nth(4).click();
});

// От переход на лучшую книгу
test("Test books to best book", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
});
