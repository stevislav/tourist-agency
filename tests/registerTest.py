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
        # self.driver = webdriver.Firefox()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        driver.execute_script("document.body.style.zoom='80%'")
        driver.get("http://localhost:3000/register")

        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")
        cpassword = driver.find_element(By.ID, "cPassword")
        first_name = driver.find_element(By.ID, "fName")
        last_name = driver.find_element(By.ID, "lName")
        email = driver.find_element(By.ID, "email")
        phone = driver.find_element(By.ID, "phoneNumber")

        username.clear()
        password.clear()
        cpassword.clear()
        first_name.clear()
        last_name.clear()
        email.clear()
        phone.clear()

        username.send_keys("korisnik")
        password.send_keys("12345")
        cpassword.send_keys("12345")
        first_name.send_keys("Petar")
        last_name.send_keys("Petrovic")
        email.send_keys("petarp@gmail.com")
        phone.send_keys("0691694568")
        
        driver.implicitly_wait(1)
        register_btn = driver.find_element(By.XPATH, "/html/body/div/div/div/div/button")
        register_btn.click()


        def working(driver):
            reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div/span").text
            print(reg)
            return reg == "Successfully registered"

        WebDriverWait(driver, timeout=1).until(working, "Not working")
       
        reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div/span").text
        self.assertNotEqual(reg, "Invalid inputs!", "Done")
        self.assertEqual(reg, "Successfully registered", "Done")

        home = driver.find_element(By.CLASS_NAME, "homePageButton")
        home.click()

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()