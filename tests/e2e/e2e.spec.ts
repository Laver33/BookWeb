import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
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

test("should navigate to top authors", async ({ page }) => {
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("button", { name: "Меню" }).hover();
  await page.getByText("Книги", { exact: true }).click();

  await page.getByRole("button", { name: "Топ авторов" }).click();
  await expect(page.getByText("Топ авторов")).toBeVisible();
});

// исправить
test("should like a book", async ({ page }) => {
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Перейти" }).first().click();
  await page.getByRole("button", { name: "Понравилась книга" }).click();

  await expect(page.getByText("Книга добавлена в избранное")).toBeVisible();
});

// исправить
test("should add a new book", async ({ page }) => {
  const bookTitle = faker.lorem.words({ min: 2, max: 5 });
  const bookDescription = faker.lorem.paragraph();
  const bookPrice = faker.number.int({ min: 1, max: 100 });

  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Добавить книгу" }).click();

  await page.locator('input[name="title"]').fill(bookTitle);
  await page.locator('input[name="description"]').fill(bookDescription);
  await page.getByRole("spinbutton").fill(String(bookPrice));
  await page.getByRole("button", { name: "Добавить книгу" }).click();

  await expect(page.getByText("Книга добавлена")).toBeVisible();
  await page.getByRole("button", { name: "Close", exact: true }).click();
});
