import { test } from "@playwright/test";

// Создание тест аккаунта
test("Create test acc", async ({ page }) => {
  let testEmail: number = Math.floor(Math.random() * 100000);

  await page.goto("http://localhost:5173/register");
  await page.getByRole("textbox", { name: "Имя" }).click();
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill("");
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill("");
  await page.getByRole("textbox", { name: "Имя" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Имя" }).fill("Тестовый");
  await page.getByRole("textbox", { name: "Фамилия" }).click();
  await page.getByRole("textbox", { name: "Фамилия" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Фамилия" }).fill("Аккаунт");
  await page.getByRole("spinbutton", { name: "Возраст" }).click();
  await page.getByRole("spinbutton", { name: "Возраст" }).fill("66");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill(`test${testEmail}@gmail.com`);
  await page.getByRole("textbox", { name: "Пароль", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Пароль", exact: true })
    .fill("test1234test");
  await page.getByRole("textbox", { name: "Подтвердите пароль" }).click();
  await page
    .getByRole("textbox", { name: "Подтвердите пароль" })
    .fill("test1234test");
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
