# POSTINGO @ Hackathon Stuttgart 2018 #Team12

![GitHub Logo](/documentation/postingo_low.png)



# THE TEAM
*
*
*
*
*
*
*
*


# THE [initial] IDEA
TeamViewer as a Remote Interface, with a Sidebar for controlling all features like:
* A SmartPostBox (with OpenCV for identification, able to open up, with Notification)
* A Home/holiday home smart Interface (security system, watering, video surveillance (opencv zones))
* A Server Room surveillance (power consumption, video surveillance (opencv zones)), Hardware trigger
Because to the limited time we decided to concentrate to the first point, the PostBox.

# FEATUTRES
* Automatic control of the Temperature,Humidity of the PostBox to store sensitive good like drugs and fresh food
* Simple WebUI to show the state of the PostBox (count packages inside, temperature, humidity, weight) 
* Simple WebUI to cre<ate package deliveries

# PARTS
* RPI 3b - Control of the complete postbox
* Arduino - Controls all actors/sensors through the RPI
* TeamViwer - System monitoring to the user
* Heroku - Hosting the backend and the user frontend
* DC Gear Motor with L295D H Bridge - open/close the front door
* Fan - to cool down the inside

## SENSORS
* Loadcell - to weight the packages
* 2x lightgates - to monitor the gate state
* DHT22 - monitor temperature and humidity of the inside the postbox
* Barcode Scanner - scan packages to indentify them

# IMAGES

## POSTINGO IN MEDICAL COOLING MODE
 ![GitHub Logo](/documentation/DSC02694.JPG)
## ELECTRIC no.1
 ![GitHub Logo](/documentation/DSC02689.JPG)

## ELECTRIC no.2
![GitHub Logo](/documentation/DSC02706.JPG)

## WITH PACAKGE
![GitHub Logo](/documentation/DSC02753.JPG)

## SAMPLE KEYCARD
![GitHub Logo](/documentation/DSC02766.JPG)

 
# VIDEO
