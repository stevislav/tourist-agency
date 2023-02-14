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

        offer = driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div[3]/div[2]")
        off1 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div[3]/div[2]").text.split("\n")[0]
        print(off1)
        offer.click()
        
        driver.implicitly_wait(1)
        off2 = driver.find_element(By.CLASS_NAME, "hotelTitle").text
        print(off2)
    
        self.assertEqual(off1, off2, "Done")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()