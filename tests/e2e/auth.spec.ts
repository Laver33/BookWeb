import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

// Создание тест аккаунта
test("Create test acc", async ({ page }) => {
  const testName = faker.person.firstName();
  const testSurname = faker.person.lastName();
  const testEmail = faker.internet.email();
  const testPassword = faker.internet.password();
  const testAge = faker.number.int({ min: 1, max: 100 });

  await page.goto("http://localhost:5173/register");
  await page.getByRole("textbox", { name: "Имя" }).click();
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill("");
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill("");
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill(testName);
  await page.getByRole("textbox", { name: "Фамилия" }).click();
  await page.getByRole("textbox", { name: "Фамилия" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Фамилия" }).fill(testSurname);
  await page.getByRole("spinbutton", { name: "Возраст" }).click();
  await page.getByRole("spinbutton", { name: "Возраст" }).fill(`${testAge}`);
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page.getByRole("textbox", { name: "Пароль", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Пароль", exact: true })
    .fill(testPassword);
  await page.getByRole("textbox", { name: "Подтвердите пароль" }).click();
  await page
    .getByRole("textbox", { name: "Подтвердите пароль" })
    .fill(testPassword);
  await page.getByRole("button", { name: "Зарегистрироваться" }).click();
});

// С окна регистрации на логин и войти
test("login on test acc", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("testacc@gmail.com");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("test1234test");
  await page.getByRole("button", { name: "Войти" }).click();
});

// От окна логина на главную
test("login to home", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Войти как гость" }).click();
});

// ОТ окна регистрации на главную
test("register to home", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Нету аккаунта" }).click();
  await page.getByRole("button", { name: "Войти как гость" }).click();
});
