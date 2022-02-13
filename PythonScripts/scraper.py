import sys
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ExpectedConditions
from selenium.webdriver.remote.webelement import WebElement

passportUrl = 'https://www.publix.org/'

username = sys.argv[1]
password = sys.argv[2]

chrome_options = Options()

chrome_options.add_argument('--user-agent=Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36')
driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
wait = WebDriverWait(driver, 10)
driver.get(passportUrl)

usernameField = driver.find_element_by_xpath('//*[@id="USER"]')
usernameField.send_keys(username)

passwordField = driver.find_element_by_xpath('//*[@id="password"]')
passwordField.send_keys(password)

loginButton = driver.find_element_by_xpath('//*[@id="Login"]')
loginButton.click()

sleep(1)

scheduleButton = driver.find_element_by_xpath('/html/body/main/div[4]/div/div[2]')
scheduleButton.click()

sleep(1)

weekData = driver.find_element_by_xpath('//*[@id="scheduledweek"]/div[1]/div[2]/div[1]')

scheduleListHour = []
scheduleListDay = []

# print(driver.page_source)
# # Get data and time from each day (7 days total)
for i in range(1,8):
  scheduleListHour.append(driver.find_element_by_xpath('//*[@id="accordian"]/a[' + str(i) + ']/div/div[2]/span[1]').get_attribute('innerHTML').strip())
  scheduleListDay.append(driver.find_element_by_xpath('//*[@id="accordian"]/a[' + str(i) + ']/div/div[1]/div[2]').get_attribute('innerHTML').strip())

driver.quit()

dataToSendBack = ""

for i in range(0,7):
  dataToSendBack += scheduleListDay[i] + ' : ' + scheduleListHour[i] + '\n'

print("STARTOFDATA\n" + dataToSendBack + "ENDOFDATA")
sys.stdout.flush()