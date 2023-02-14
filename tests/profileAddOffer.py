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
        btnAdd = driver.find_element(By.CLASS_NAME, "link").click()

        name = driver.find_element(By.ID, "name")
        price = driver.find_element(By.ID, "price")
        country = driver.find_element(By.ID, "country")
        internet = driver.find_element(By.ID, "internet")
        tv = driver.find_element(By.ID, "tv")
        airconditioning = driver.find_element(By.ID, "airConditioning")
        roomfridge = driver.find_element(By.ID, "roomFridge")
        location = driver.find_element(By.ID, "location")
        daysper = driver.find_element(By.ID, "daysPerLocation")
        description = driver.find_element(By.ID, "description")
        descper = driver.find_element(By.ID, "descPerDay")
        rating = Select(driver.find_element(By.ID, "accommodationType"))
        continent = Select(driver.find_element(By.ID, "continent"))
        room = Select(driver.find_element(By.ID, "roomType"))
        transport = Select(driver.find_element(By.ID, "transportType"))
        accommodation = Select(driver.find_element(By.ID, "accommodation"))
        image = driver.find_element(By.XPATH, "//input[@id='file']")
        date = driver.find_element(By.CLASS_NAME, "dateHalf")

        name.clear()
        price.clear()
        country.clear()
        location.clear()
        daysper.clear()
        description.clear()
        descper.clear()

        name.send_keys("Belgrade May 2077")
        price.send_keys("1000")
        country.send_keys("Serbia")
        location.send_keys("Belgrade")
        daysper.send_keys("1")
        description.send_keys("Affordable two day trip")
        descper.send_keys("Deskripcija jedan")
        internet.click()
        tv.click()
        airconditioning.click()
        roomfridge.click()
        rating.select_by_value("5")
        continent.select_by_value("Asia")
        room.select_by_value("1/3")
        transport.select_by_value("bus")
        accommodation.select_by_value("hotel")

        date.click()
        day1 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[3]/div/div[3]/div/div[3]/div/div[2]/button[8]")
        month = driver.find_element(By.CLASS_NAME, "rdrNextButton")
        month.click()
        month.click()
        month.click()
        month.click()
        day2 = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[3]/div/div[3]/div/div[3]/div/div[2]/button[22]")
        day1.click()
        day2.click()

        image.send_keys(r"C:\Users\steva\OneDrive\Documents\GitHub\tourist-agency\tests\slika.jpg")
        upload = driver.find_element(By.CLASS_NAME, "sendButtonOffer")
        upload.click()
       
        ime = "Belgrade May 2077"

        def working(driver):
            reg = driver.find_element(By.CLASS_NAME, "topOffer").text
            # print(reg)
            # return reg != "Working.."
            return reg == "Successfully added offer!"

        WebDriverWait(driver, timeout=10).until(working, "Not working")

        def loading(driver):
            reg = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text
            # print(reg)
            return reg != "0–0 of 0"
       
        trigger = True
        while(trigger):
            offerList = driver.find_element(By.ID, "offers")
            offerList.click()
            WebDriverWait(driver, timeout=30).until(loading, "Not working")
            btnNext = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/div[2]")
            count = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/p").text.split("–")
            # print(count)
            i = int(count[0])
            j = int(count[1].split(" of ")[0])
            
            for row in range(0, j-i+1):
                print(trigger)
                usr = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div/div[" + str(row + 1) + "]/div[2]/div").text
                if usr == ime:
                    self.assertEqual(usr, ime, "Done")
                    trigger = False
            btnNext.click() 

    # def tearDown(self):
    #     self.driver.close()

if __name__ == "__main__":
    unittest.main()