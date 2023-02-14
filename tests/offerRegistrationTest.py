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

        search = driver.find_element(By.ID, "search")
        date = driver.find_element(By.ID, "4")
        date.click()

        day1 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[8]")
        month = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[2]/button[2]")
        month.click()
        month.click()
        month.click()
        month.click()
        day2 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[22]")
        day1.click()
        day2.click()
        day1Value = int(driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[2]/div[4]/div/div[3]/div/div[2]/button[8]").text)

        search.click()
        driver.implicitly_wait(2)

        offer = driver.find_element(By.ID, "see")
        offer.click()

        offerid = driver.current_url.split("/")[4]
        # print(offerid)

        reserve = driver.find_element(By.ID, "btnReserve")
        reserve.click()
        comment = driver.find_element(By.ID, "comment")
        cmt = comment.send_keys("Reserving")
        reserved = driver.find_element(By.ID, "btnReservation")
        reserved.click()

        user = driver.find_element(By.ID, "btnUser").click()
        reservationList = driver.find_element(By.ID, "reservations").click()

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
                off = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[2]/div").text
                if off == offerid:
                    self.assertEqual(off, offerid, "Done")
                    trigger = False
            btnNext.click() 

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()