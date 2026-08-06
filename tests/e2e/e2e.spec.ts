import test from "@playwright/test";

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
