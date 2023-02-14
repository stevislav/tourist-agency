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

        offers = driver.find_element(By.CLASS_NAME, "allOffers")
        offers.click()
        
        url = str(driver.current_url)
        self.assertEqual(url, "http://localhost:3000/offers", "Offer Page")


    # Temporarilly disable
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()