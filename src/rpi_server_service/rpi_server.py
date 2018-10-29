


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
ser = serial.Serial('/dev/tty.usbmodem144410', 9600)
while True:
    
    if (ser.inWaiting()>0):
        data = ser.readline().decode("utf-8").strip('\n').strip('\r') # remove newline and carriage return characters
        print("We got: '{}'".format(data))
        try:
            st = str(data).split('_')
            payload = {'temp': str(st[2]),'presense': str(st[1]),'weight': str(st[0]),'hum': str(st[3]),'post_count': str(st[4])}
            r = requests.post("http://127.0.0.1:5000/rest/postingo/"+str(PINGO_ID)+"/set",data=json.dumps(payload),  headers={'Content-Type': 'application/json'})
            if r.status_code == 200:
                ch = 0
                if not sta == str(r.json()['set_temp']):  
                    sta = str(r.json()['set_temp'])
                    dt = str(r.json()['door_state_set'])
                    bs = str(r.json()['briefe'])
                    print("-----")
                    ch = 1

                if not dt == str(r.json()['door_state']):  
                    sta = str(r.json()['set_temp'])
                    dt = str(r.json()['door_state_set'])
                    bs = str(r.json()['briefe'])
                    print("-----")
                    ch = 1
                
                if not bs == str(r.json()['briefe']):  
                    sta = str(r.json()['set_temp'])
                    dt = str(r.json()['door_state_set'])
                    bs = str(r.json()['briefe'])
                    print("-----")
                    ch = 1

                if ch == 1:
                    ser.write(str(dt)+"_"+str(sta)+"_"+str(bs)+"_\n")
        except:
            print("bad")
            pass
print("123")

    #SET STATES

#SEND SENSOR STATES BACK



