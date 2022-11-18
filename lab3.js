/*1. Реалізувати unittest скрипт тестування наступного функціоналу ресурсу http://demo-store.seleniumacademy.com: 
a. Пошук різних груп товарів
b. Реєстрації нового користувача та логін
c. Довільний функціонал за вибором студента */

require('chromedriver');
const assert = require('assert');

const { Builder, By } = require('selenium-webdriver');

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    const findElementAndWriteValue = async (element, value) => {
        try {
            const answerInput = await driver.findElement(By.xpath(`//input[@placeholder='${element}']`)).sendKeys(value);

        } catch (error) {
            console.log(error)
        }

    }
    const findInputElementByNameAndWriteValue = async (element, value) => {
        try {
            const answerInput = await driver.findElement(By.xpath(`//input[@name='${element}']`)).sendKeys(value);
        } catch (error) {
            console.log(error)
        }
    }
    const checkURL = async (valueToContain) => {
        try {
            const URL = await driver.getCurrentUrl();
            assert.ok(URL.includes(valueToContain))
        console.log("URL tested successfully");
        await driver.sleep(2000)
        } catch (error) {
            console.log(error)
        }
    }
    try {
        await driver.get('http://demo-store.seleniumacademy.com');
        const menNavTab = await driver.findElement(By.className('nav-primary')).findElement(By.className('nav-2'))
        await driver.actions().move({origin: menNavTab}).perform().then(async ()=>{
            await driver.findElement(By.xpath('//*[contains(text(),"Shirts")]')).click()
            checkURL("men/shirts")
            const shirtText = await driver.findElement(By.className('products-grid')).findElement(By.className('product-name')).findElement(By.css('a')).getText()
            console.log('shirtText:', shirtText, shirtText.includes('SHIRT'))
            assert.ok( shirtText.includes('SHIRT'))
            console.log("TEST 1 PASSED");
        })
        findElementAndWriteValue("Search entire store here...", "BRACELETS").then(async ()=>{
            await driver.findElement(By.xpath(`//button[@title='Search']`)).click();
            checkURL("catalogsearch")
            const braceletText = await driver.findElement(By.className('products-grid')).findElement(By.className('product-name')).findElement(By.css('a')).getText()
            console.log('shirtText:', braceletText, braceletText.includes('BRACELETS'))
            assert.ok( braceletText.includes('BRACELETS'))
            console.log("TEST 2 PASSED");
        })
        // REGISTRATION AND LOG IN FLOW
        await driver.sleep(3000)
        await driver.get('http://demo-store.seleniumacademy.com/customer/account/create/');
        await driver.sleep(2000)
        checkURL("customer/account/create/")
        findInputElementByNameAndWriteValue("firstname","Masyanya")
        await driver.sleep(1000)
        findInputElementByNameAndWriteValue("middlename","Fedir")
        await driver.sleep(1000)
        findInputElementByNameAndWriteValue("lastname","Zvarych")
        await driver.sleep(1000)
        const randomNumber=Math.floor(Math.random() * 1000000)+1
        findInputElementByNameAndWriteValue("email",`${randomNumber}2811maximus@gmail.com`)
        await driver.sleep(1000)
        findInputElementByNameAndWriteValue("password","robotHack0101")
        await driver.sleep(1000)
        findInputElementByNameAndWriteValue("confirmation","robotHack0101")
        await driver.sleep(1000)
        await driver.findElement(By.xpath(`//button[@title='Register']`)).click();
        const userDataText = await driver.findElement(By.className('box-content')).findElement(By.css('p')).getText()
        console.log('userDataText:', userDataText)
        assert.ok(userDataText.includes(`${randomNumber}2811maximus@gmail.com`))
        console.log("TEST 3 PASSED");
        await driver.sleep(3000)
        // LOG OUT AND LOG IN FLOW
        await driver.get('http://demo-store.seleniumacademy.com');
        await driver.findElement(By.xpath('//*[contains(text(),"Account")]')).click().then(async ()=>{
            await driver.findElement(By.xpath('//*[contains(text(),"Log Out")]')).click()
        checkURL("logoutSuccess/")
        })
        await driver.findElement(By.xpath('//*[contains(text(),"Account")]')).click().then(async ()=>{
            await driver.findElement(By.xpath('//*[contains(text(),"Log In")]')).click()
            checkURL("login/")
            findInputElementByNameAndWriteValue("login[username]",`${randomNumber}2811maximus@gmail.com`)
            await driver.sleep(1000)
            findInputElementByNameAndWriteValue("login[password]","robotHack0101")
            await driver.sleep(1000)
            await driver.findElement(By.xpath(`//button[@title='Login']`)).click()
            await driver.sleep(2000)
            const userDataLoginText = await driver.findElement(By.className('box-content')).findElement(By.css('p')).getText()
            console.log('userDataText:', userDataLoginText)
            assert.ok(userDataLoginText.includes(`${randomNumber}2811maximus@gmail.com`))
            console.log("TEST 4 PASSED");
            checkURL("account")
        })
        await driver.sleep(20000)
    } finally {
        await driver.quit();
    }
})();
