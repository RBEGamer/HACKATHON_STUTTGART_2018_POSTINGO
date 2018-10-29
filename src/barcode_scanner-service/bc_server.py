import serial
import json
import requests 

PINGO_ID = 0 #POSTINGO 0

# Converts to an integer if it is an integer, or it returns it as a string

def try_parse_int(s):
    try:
        return int(s)
    except ValueError:
        return s

js = ""
sta = ""
dt = ""
ch = ""
bs = ""
ser = serial.Serial('/dev/tty.usbmodem144301', 9600)
while True:
    
    if (ser.inWaiting()>0):
        data = ser.readline().decode("utf-8").strip('\n').strip('\r') # remove newline and carriage return characters
        print("We got: '{}'".format(data))
        if(str(data) == "799475459597"):
            print("yoo")
            try:
                r = requests.get('http://127.0.0.1:5000/rest/paket/1/set_state/4')
                print(r.text)
            except:
                print("err")

        if(str(data) == "706795639653"):
            print("yoo")
            try:
                r = requests.get('http://127.0.0.1:5000/rest/paket/1/set_state/3')
                print(r.text)
            except:
                print("err")

        if(str(data) == "799475459535"):
            print("yoo")
            try:
                r = requests.get('http://127.0.0.1:5000/rest/paket/1/set_state/2')
                print(r.text)
            except:
                print("err")

        if(str(data) == "799475459566"):
            print("yoo")
            try:
                r = requests.get('http://127.0.0.1:5000/rest/paket/0/set_state/2')
                print(r.text)
            except:
                print("err")






    

    #SET STATES

#SEND SENSOR STATES BACK
