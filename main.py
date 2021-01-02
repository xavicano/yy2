def on_button_pressed_a():
    if ESP8266_IoT.wifi_state(True):
        OLED12864_I2C.show_string(3, 4, "Wifi: " + "Ok", 1)
    else:
        OLED12864_I2C.show_string(3, 4, "Wifi: " + "Wrong", 1)
    if ESP8266_IoT.thing_speak_state(True):
        OLED12864_I2C.show_string(3, 5, "ThigSpeak: " + "Ok", 1)
    else:
        OLED12864_I2C.show_string(3, 5, "ThigSpeak" + "Wrong", 5)
input.on_button_pressed(Button.A, on_button_pressed_a)

def Wifi():
    basic.show_number(0)
    ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
    basic.show_number(1)
    basic.pause(5000)
    ESP8266_IoT.connect_wifi("JAZZAxa", "11052006AXA")
    basic.show_number(2)
    basic.pause(5000)
def TextLine():
    OLED12864_I2C.zoom(False)
    for index in range(5):
        OLED12864_I2C.rect(2 * index, 2 * index, 127 - 2 * index, 63 - 2 * index, 1)
OLED12864_I2C.init(60)
OLED12864_I2C.on()
Wifi()
TextLine()

def on_forever():
    basic.show_number(3)
    basic.pause(5000)
    ESP8266_IoT.connect_thing_speak()
    basic.pause(5000)
    basic.show_number(4)
    ESP8266_IoT.set_data("ZZ4H6N50C5DZTCEU", input.light_level(), input.temperature())
    if ESP8266_IoT.thing_speak_state(True) and ESP8266_IoT.wifi_state(True):
        ESP8266_IoT.upload_data()
    OLED12864_I2C.show_string(3, 2, "Light Level: " + ("" + str(input.light_level())), 1)
    OLED12864_I2C.show_string(3,
        3,
        "Temperature: " + ("" + str(input.temperature())) + "ºC",
        1)
    basic.pause(12000)
basic.forever(on_forever)
