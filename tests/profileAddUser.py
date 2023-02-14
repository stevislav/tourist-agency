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
        driver.get("http://localhost:3000/")

        log = driver.find_element(By.ID, "btnLogin").click()
        username = driver.find_element(By.ID, "username")
        password = driver.find_element(By.ID, "password")
        username.clear()
        password.clear()
        username.send_keys("test2")
        password.send_keys("12345")
        login_btn = driver.find_element(By.XPATH, "/html/body/div/div/div/div/button")
        login_btn.click()
        driver.implicitly_wait(3)


        user = driver.find_element(By.ID, "btnUser").click()
        userList = driver.find_element(By.ID, "users").click()
        btnAdd = driver.find_element(By.CLASS_NAME, "link").click()

        username = driver.find_element(By.ID, "username")
        firstname = driver.find_element(By.ID, "fName")
        lastname = driver.find_element(By.ID, "lName")
        email = driver.find_element(By.ID, "email")
        phone = driver.find_element(By.ID, "phoneNumber")
        password = driver.find_element(By.ID, "password")

        username.clear()
        firstname.clear()
        lastname.clear()
        email.clear()
        phone.clear()
        password.clear()

        username.send_keys("petarpetrovic")
        firstname.send_keys("Petar")
        lastname.send_keys("Petrovic")
        email.send_keys("petar.petrovic@yahoo.com")
        phone.send_keys("0636688987")
        password.send_keys("12345")
        user = "petarpetrovic"
        btnAdded = driver.find_element(By.CLASS_NAME, "sendButtonUser").click()
        driver.find_element(By.ID, "users").click()

        def working(driver):
            reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text
            # print(reg)
            return reg != "0–0 of 0"

        
        trigger = True
        while(trigger):
            WebDriverWait(driver, timeout=1).until(working, "Not working")
            btnNext = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/div[2]")
            count = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text.split("–")
            # print(count)
            i = int(count[0])
            j = int(count[1].split(" of ")[0])
            
            for row in range(0, j-i+1):
                print(trigger)
                usr = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[2]/div").text
                if usr == user:
                    self.assertEqual(usr, user, "Done")
                    trigger = False
            btnNext.click() 

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()