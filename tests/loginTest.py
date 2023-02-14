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

        login = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div/button[2]").click()

        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")

        username.clear()
        password.clear()
        username.send_keys("test2")
        password.send_keys("12345")

        login_btn = driver.find_element(By.XPATH, "/html/body/div/div/div/div/button")
        login_btn.click()
        driver.implicitly_wait(1)

        user = driver.find_element(By.ID, "btnUser").text
        print(user)

        self.assertEqual(user, "test2", "Done")

        logout = driver.find_element(By.ID, "btnLogout")
        logout.click()
        
        btn = driver.find_element(By.ID, "btnLogin").text
        self.assertNotEqual(btn, "Logout", "Done")
        self.assertEqual(btn, "Log in", "Done")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()