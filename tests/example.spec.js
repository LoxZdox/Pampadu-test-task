const { test, expect } = require('@playwright/test');
import {BASE_URL, VALID_NUMBER_FIRST, VALID_NUMBER_SECOND, INVALID_NUMBER, FIELD_ERROR_COLOR} from "../constants";

test.beforeEach(async({page})=>{
  await page.goto(`${BASE_URL}index.html#49a973bd-2d7c-4b9b-9c28-d986d7757983`);
  await expect(page.getByText('Калькулятор ОСАГО')).toBeVisible();
  await expect(page.getByText('Простой способ выгодно купить полис')).toBeVisible();
});

test('positive-passing-car-number', async ({ page }) => {
  await test.step('filling-fields-with-valid-data', async()=>{
    await page.locator('[data-test="left-side-gos-sign"]').fill(`${VALID_NUMBER_FIRST}`);
    await page.locator('[class="gos-input-region"]').fill(`${VALID_NUMBER_SECOND}`);
    await expect(page.locator('[data-test="left-side-gos-sign"]')).toHaveValue(`${VALID_NUMBER_FIRST}`);
    await expect(page.locator('[class="gos-input-region"]')).toHaveValue(`${VALID_NUMBER_SECOND}`);
  });
  await test.step('passing-data', async()=>{
    await page.locator('button', {hasText: 'Продолжить'}).click();
    await expect(page.getByText('Марка автомобиля')).toBeVisible();
    await expect(page.getByText('Модель автомобиля')).toBeVisible();
  })
});

test('positive-not-passing-car-number', async ({ page }) => {
  await test.step('making-sure-fields-are-empty', async()=>{
    await expect(page.locator('[data-test="left-side-gos-sign"]')).toBeEmpty();
    await expect(page.locator('[class="gos-input-region"]')).toBeEmpty();
  });
  await test.step('continue-filling-form', async()=>{
    await page.locator('[data-test="gos-sign-link"]').click();
    await expect(page.getByText('Марка автомобиля')).toBeVisible();
    await expect(page.getByText('Модель автомобиля')).toBeVisible();
  })
});

test('negative-not-passing-car-number', async ({ page }) => {
  await test.step('making-sure-fields-are-empty', async()=>{
    await expect(page.locator('[data-test="left-side-gos-sign"]')).toBeEmpty();
    await expect(page.locator('[class="gos-input-region"]')).toBeEmpty();
  });
  await test.step('continue-filling-form', async()=>{
    await page.locator('button', {hasText: 'Продолжить'}).click();
    await expect(page.locator('[class="layout gos-input align-center"]')).toHaveCSS('background-color', `${FIELD_ERROR_COLOR}`);
  })
});

test('negative-passing-invalid-car-number', async ({ page }) => {
  await test.step('filling-fields-with-invalid-data', async()=>{
    await page.locator('[data-test="left-side-gos-sign"]').fill(`${INVALID_NUMBER}`);
  });
  await test.step('making-sure-error-is-visible', async()=>{
    await page.locator('button', {hasText: 'Продолжить'}).click();
    await expect(page.locator('[class="layout gos-input align-center"]')).toHaveCSS('background-color', `${FIELD_ERROR_COLOR}`);
  })
});

