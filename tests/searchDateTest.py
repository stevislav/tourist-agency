from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.firefox.options import Options
import unittest

options = Options()
options.binary_location = r'C:\Program Files\Mozilla Firefox\firefox.exe'

class LoginTest(unittest.TestCase):
    def setUp(self):     
        self.driver = webdriver.Firefox(executable_path=r'C:\WebDrivers\bin\geckodriver.exe', options=options)
        
    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("http://localhost:3000")

        search = driver.find_element(By.ID, "search")
        date = driver.find_element(By.ID, "4")
        date.click()

        day1 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[8]")
        day2 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[22]")
        day1.click()
        day2.click()
        day1Value = int(driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[8]").text)

        search.click()
        driver.implicitly_wait(1)

        searchDate = driver.find_element(By.ID, "date").text
        # print(searchDate)
        startDate = int(searchDate[8:10])
        # print(startDate)
        endDate = int(searchDate[26:28])
        # print(endDate)

        self.assertGreaterEqual(startDate, day1Value, "Search Completed")


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()