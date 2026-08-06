import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

// Вход -> главная -> книги -> топ авторов
test("Open home page", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("pad666444@gmail.com");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("admin12345");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await page.getByRole("link", { name: "Начать читать" }).click();
  await page.getByRole("button", { name: "Перейти" }).nth(1).click();
  await page.getByRole("button", { name: "Перейти" }).nth(2).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Топ авторов" }).click();
});

// Переход на книгу и лайк
test("Test like book", async ({ page }) => {
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
  await page.getByRole("button", { name: "Понравилась книга" }).click();
});

// Добавление книги
test("Test add book", async ({ page }) => {
  const bookTitle = faker.lorem.words({ min: 2, max: 30 });
  const bookDescription = faker.lorem.paragraph({ min: 20, max: 3000 });
  const bookPrice = faker.number.int({ min: 1, max: 100 });

  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("pad666444@gmail.com");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("admin12345");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await page.getByRole("link", { name: "Книги" }).click();
  await page.getByRole("button", { name: "Добавить книгу" }).click();
  await page.locator('input[name="title"]').fill("testbook");
  await page.locator('input[name="title"]').fill(bookTitle);
  await page.locator('input[name="title"]').press("ControlOrMeta+a");
  await page.locator('input[name="title"]').press("ControlOrMeta+c");
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="description"]').fill("testbookNameE2E ");
  await page.locator('input[name="description"]').press("ControlOrMeta+a");
  await page.locator('input[name="description"]').press("ControlOrMeta+c");
  await page.locator('input[name="description"]').press("ArrowRight");
  await page.locator('input[name="description"]').fill(bookDescription);
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill(`${bookPrice}`);
  await page.getByRole("button", { name: "Добавить книгу" }).click();
  await page.getByRole("button", { name: "Очистка" }).click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
});
