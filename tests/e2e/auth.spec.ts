import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config({ path: "./tests/.env" });

const BASE_URL = "http://localhost:5173/";

const TEST_ACC = {
  email: process.env.TEST_ACC_EMAIL || " ",
  password: process.env.TEST_ACC_PASSWORD || "",
};

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// Регистрация и вход в систему
test("should register new user", async ({ page }) => {
  const testName = faker.person.firstName();
  const testSurname = faker.person.lastName();
  const testEmail = faker.internet.email();
  const testPassword = faker.internet.password({ length: 10 });
  const testAge = faker.number.int({ min: 18, max: 80 });

  await page.getByRole("button", { name: "Нету аккаунта" }).click();

  await page.getByRole("textbox", { name: "Имя" }).fill(testName);
  await page.getByRole("textbox", { name: "Фамилия" }).fill(testSurname);
  await page.getByRole("spinbutton", { name: "Возраст" }).fill(String(testAge));
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page
    .getByRole("textbox", { name: "Пароль", exact: true })
    .fill(testPassword);
  await page
    .getByRole("textbox", { name: "Подтвердите пароль" })
    .fill(testPassword);

  // Отправка формы
  await page.getByRole("button", { name: "Зарегистрироваться" }).click();

  await expect(page).toHaveURL(BASE_URL);
});

// -
test("should login with existing account", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).fill(TEST_ACC.email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(TEST_ACC.password);
  await page.getByRole("button", { name: "Войти", exact: true }).click();

  // Проверка успешного входа
  await expect(page.getByText("Добро пожаловать")).toBeVisible();
  await expect(page).toHaveURL(`${BASE_URL}home`);
});

test("should login as guest", async ({ page }) => {
  await page.getByRole("button", { name: "Войти как гость" }).click();
  await expect(page).toHaveURL(`${BASE_URL}home`);
});

test("should navigate from register to login", async ({ page }) => {
  await page.getByRole("button", { name: "Нету аккаунта" }).click();
  await expect(page).toHaveURL(/.*register/);

  await page.getByRole("button", { name: "Уже есть аккаунт" }).click();
});

test("should register and login with new account", async ({ page }) => {
  const testName = faker.person.firstName();
  const testSurname = faker.person.lastName();
  const testEmail = faker.internet.email();
  const testPassword = faker.internet.password({ length: 10 });
  const testAge = faker.number.int({ min: 18, max: 80 });

  // Регистрация
  await page.getByRole("button", { name: "Нету аккаунта" }).click();
  await page.getByRole("textbox", { name: "Имя" }).fill(testName);
  await page.getByRole("textbox", { name: "Фамилия" }).fill(testSurname);
  await page.getByRole("spinbutton", { name: "Возраст" }).fill(String(testAge));
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page
    .getByRole("textbox", { name: "Пароль", exact: true })
    .fill(testPassword);
  await page
    .getByRole("textbox", { name: "Подтвердите пароль" })
    .fill(testPassword);
  await page.getByRole("button", { name: "Зарегистрироваться" }).click();

  // Логин
  await expect(page).toHaveURL(BASE_URL);
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page.getByRole("textbox", { name: "Пароль" }).fill(testPassword);
  await page.getByRole("button", { name: "Войти", exact: true }).click();

  await expect(page).toHaveURL(`${BASE_URL}home`);
});
