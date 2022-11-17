/*1. Реалізувати скрипт для автоматизації наступних дій: 
a. Відкрити сторінку http://suninjuly.github.io/math.html
b. Прочитати значення змінної x. 
c. Обчислити математичну функцию від x: f ( x )=ln (|sin (12⌊ x ⌋)|). Використовувати модуль math. 
d. Ввести відповідь в текстове поле. e. Вибрати checkbox "I'm the robot". 
f. Вибрати radiobutton "Robots rule!". 
g. Натиснути кнопку Submit. 
Додаткове завдання
2. Написати скрипт реєстрації на сторінці селекторами, за XPath-селекторами.
http://demo-store.seleniumacademy.com/customer/account/create/ */

require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    const findElementAndWriteValue = async (element, value) => {
        try {
            const answerInput = await driver.findElement(By.xpath(`//input[@name='${element}']`)).sendKeys(value);

        } catch (error) {
            console.log(error)
        }

    }
    try {
        await driver.get('http://suninjuly.github.io/math.html');
        const x = await driver.findElement(By.id('input_value')).getText();
        console.log('x:', x)
        const result = Math.log(Math.abs(12*Math.sin(Math.abs(x))))
        console.log('result:', result)
        const answerInput = await driver.findElement(By.id('answer')).sendKeys(result);
        const robotCheckBox = await driver.findElement(By.id('robotCheckbox')).click()
        const robotsRule = await driver.findElement(By.id('robotsRule')).click()
        const submit = await driver.findElement(By.css('button')).click()
        await driver.sleep(5000)
        await driver.get('http://demo-store.seleniumacademy.com/customer/account/create/');
        findElementAndWriteValue("firstname","Masyanya")
        await driver.sleep(1000)
        findElementAndWriteValue("middlename","Fedir")
        await driver.sleep(1000)
        findElementAndWriteValue("lastname","Zvarych")
        await driver.sleep(1000)
        findElementAndWriteValue("email","2811maximus@gmail.com")
        await driver.sleep(1000)
        findElementAndWriteValue("password","robotHack0101")
        await driver.sleep(1000)
        findElementAndWriteValue("confirmation","robotHack0101")
        await driver.sleep(1000)
        const registrationCheckBox = await driver.findElement(By.xpath(`//input[@name='is_subscribed']`)).click();
        const registrationSubmit = await driver.findElement(By.xpath(`//button[@title='Register']`)).click();
        await driver.sleep(10000)

    } finally {
        await driver.quit();
    }
})();