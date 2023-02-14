from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import Select
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
        offerList = driver.find_element(By.ID, "offers")
        offerList.click()


        id = "63eb5f287a0592a92e34bfa5"

        def loading(driver):
            reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text
            # print(reg)
            return reg != "0–0 of 0"

        WebDriverWait(driver, timeout=30).until(loading, "Not working")

        btnNext = ""
        active = ""
        delete = ""
        trigger = True
        clicks = 0
        while(trigger):
            WebDriverWait(driver, timeout=30).until(loading, "Not working")
            btnNext = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/div[2]")
            count = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text.split("–")
            # print(count)
            i = int(count[0])
            j = int(count[1].split(" of ")[0])
            
            for row in range(0, j-i+1):
                print(trigger)
                usr = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[1]/div").text
                if usr == id:
                    self.assertEqual(usr, id, "Done")
                    delete = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[6]/div[1]/div[2]").click()
                    driver.switch_to.alert.accept()
                    trigger = False
                    break
            if trigger == True:
                try:
                    btnNext.click()
                    clicks = clicks + 1
                except:
                    self.assertEqual("da", "ne", "ok") 
        
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()