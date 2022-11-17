/*1. Реалізувати скрипт для автоматизації наступних дій: 
a. Відкрити сторінку http://suninjuly.github.io/explicit_wait2.html 
b. Дочикатись, коли ціна зменшиться до $100. 
c. Натиснути кнопку "Book" 
d. Розв’язати математичну капчу та відправити розв’язок (завдання 1 лабораторної роботи №2) */

require('chromedriver');
const { Builder, By, Key, until, EC } = require('selenium-webdriver');

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('http://suninjuly.github.io/explicit_wait2.html');
        const foundPrice= await driver.wait(function () {
            return driver.findElement(By.id('price')).getText().then(async function (text) {
                if( text==='$100') {
                    await driver.findElement(By.id('book')).click()
                }
                return text === '$100';
            });
        }, 30000);
        console.log('foundPrice:', foundPrice)
        const x = await driver.findElement(By.id('input_value')).getText();
        console.log('x:', x)
        const result = Math.log(Math.abs(12*Math.sin(Math.abs(x))))
        console.log('result:', result)
        const answerInput = await driver.findElement(By.id('answer')).sendKeys(result);
        const submit = await driver.findElement(By.id('solve')).click()
        await driver.sleep(20000)
    } finally {
        await driver.quit();
    }
})();