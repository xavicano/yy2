input.onButtonPressed(Button.A, function () {
    if (ESP8266_IoT.wifiState(true)) {
        OLED12864_I2C.showString(
        3,
        3,
        "Wifi: " + "Ok",
        1
        )
    } else {
        OLED12864_I2C.showString(
        3,
        3,
        "Wifi: " + "Wrong",
        1
        )
    }
    if (ESP8266_IoT.thingSpeakState(true)) {
        OLED12864_I2C.showString(
        3,
        4,
        "ThigSpeak: " + "Ok",
        1
        )
    } else {
        OLED12864_I2C.showString(
        3,
        4,
        "ThigSpeak" + "Wrong",
        5
        )
    }
})
function RFIDtag () {
    serial.redirect(
    SerialPin.P14,
    SerialPin.P13,
    BaudRate.BaudRate115200
    )
    for (let value of wake) {
        serial.writeString("" + (value))
    }
    receive_ACK = serial.readBuffer(15)
    for (let value of receive_ACK) {
        serial.writeString("" + (value))
    }
    serial.redirectToUSB()
}
function RFIDinit () {
    serial.redirect(
    SerialPin.P14,
    SerialPin.P13,
    BaudRate.BaudRate115200
    )
    for (let value of wake) {
        serial.writeString("" + (value))
    }
    serial.setRxBufferSize(15)
    receive_ACK = serial.readBuffer(15)
    for (let value of receive_ACK) {
        serial.writeString("" + (value))
    }
    serial.redirectToUSB()
}
function Wifi () {
    basic.showNumber(0)
    ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
    basic.showNumber(1)
    basic.pause(5000)
    ESP8266_IoT.connectWifi("JAZZAxa", "11052006AXA")
    basic.showNumber(2)
    basic.pause(5000)
}
function RFIDfirmware () {
    serial.redirect(
    SerialPin.P14,
    SerialPin.P13,
    BaudRate.BaudRate115200
    )
    for (let value of firmware) {
        serial.writeString("" + (value))
    }
    receive_ACK = serial.readBuffer(15)
    for (let value of receive_ACK) {
        serial.writeString("" + (value))
    }
    serial.redirectToUSB()
}
input.onButtonPressed(Button.B, function () {
    serial.redirect(
    SerialPin.P14,
    SerialPin.P13,
    BaudRate.BaudRate115200
    )
    RFID = serial.readLine()
    OLED12864_I2C.showString(
    3,
    5,
    "RFID" + RFID,
    5
    )
    serial.redirectToUSB()
})
function TextLine () {
    OLED12864_I2C.zoom(false)
    for (let index = 0; index <= 4; index++) {
        OLED12864_I2C.rect(
        2 * index,
        2 * index,
        127 - 2 * index,
        63 - 2 * index,
        1
        )
    }
}
let RFID = ""
let receive_ACK: Buffer = null
let firmware: number[] = []
let wake: number[] = []
// HEX Codes to Wake Up 0x55, 0x55, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x03, 0xfd, 0xd4, 0x14, 0x01, 0x17, 0x00
wake = [85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 3, 253, 212, 20, 1, 23, 0]
// HEX Codes to Firmware 0x00, 0x00, 0xFF, 0x02, 0xFE, 0xD4, 0x02, 0x2A, 0x00
firmware = [0, 0, 255, 2, 254, 212, 2, 42, 0]
// Hex Codes for Tag reading  0x00, 0x00, 0xFF, 0x04, 0xFC, 0xD4, 0x4A, 0x01, 0x00, 0xE1, 0x00
let tag = [0, 0, 255, 4, 252, 212, 74, 1, 0, 225, 0]
// Hex Codes for Tag reading  0x00, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0x0C, 0xF4, 0xD5, 0x4B, 0x01, 0x01, 0x00, 0x04, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x4b, 0x00
let std_ACK = [0, 0, 255, 0, 255, 0, 0, 0, 255, 12, 244, 213, 75, 1, 1, 0, 4, 8, 4, 0, 0, 0, 0, 75, 0]
OLED12864_I2C.init(60)
OLED12864_I2C.on()
Wifi()
TextLine()
RFIDinit()
basic.forever(function () {
    basic.showNumber(3)
    basic.pause(5000)
    ESP8266_IoT.connectThingSpeak()
    basic.pause(5000)
    basic.showNumber(4)
    ESP8266_IoT.setData(
    "ZZ4H6N50C5DZTCEU",
    input.lightLevel(),
    input.temperature()
    )
    if (ESP8266_IoT.thingSpeakState(true) && ESP8266_IoT.wifiState(true)) {
        ESP8266_IoT.uploadData()
    }
    OLED12864_I2C.showString(
    3,
    1,
    "Light Level: " + ("" + input.lightLevel()),
    1
    )
    OLED12864_I2C.showString(
    3,
    2,
    "Temperature: " + ("" + input.temperature()) + "ºC",
    1
    )
    basic.pause(12000)
})
