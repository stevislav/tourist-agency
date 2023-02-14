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
        continent = driver.find_element(By.ID, "2")

        continent.clear()
        continent.send_keys("Europe")

        search.click()
        driver.implicitly_wait(10)

        detail = driver.find_element(By.ID, "see")
        detail.click()

        cont = driver.find_element(By.ID, "country").text.split(", ")[0]

        self.assertEqual(cont, "Europe", "Search Completed")


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()