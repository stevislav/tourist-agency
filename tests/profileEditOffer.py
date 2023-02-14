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


        user = "63eb5f287a0592a92e34bfa3"

        def loading(driver):
            reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text
            # print(reg)
            return reg != "0–0 of 0"

        WebDriverWait(driver, timeout=30).until(loading, "Not working")

        btnNext = ""
        active = ""
        activate = ""
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
                if usr == user:
                    self.assertEqual(usr, user, "Done")
                    activate = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[6]/div[1]/div/div").click()
                    # active = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[5]/div").text
                    print(activate)
                    # self.assertEqual(active, "true", "Is Active")
                    trigger = False
                    break
            if trigger == True:
                try:
                    btnNext.click()
                    clicks = clicks + 1
                except:
                    self.assertEqual("da", "ne", "ok") 
        name = driver.find_element(By.ID, "name")
        name.clear()
        name.send_keys("Kragujevac 2077")
        ime = "Kragujevac 2077"
        send = driver.find_element(By.CLASS_NAME, "sendButtonOffer")
        send.click()
        
        offerList = driver.find_element(By.ID, "offers")
        offerList.click()

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
                if usr == user:
                    names = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[2]/div").text
                    self.assertEqual(usr, user, "Done")
                    self.assertEqual(ime, names, "DONE")
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