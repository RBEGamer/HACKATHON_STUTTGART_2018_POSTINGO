#include <HX711.h> // Zutun: seriellen auslesen
#include <Stepper.h>
#include <SimpleDHT.h>

int pirPin = 2;
int pirWert = 0;
int pir = 0;
int door = 2; // 0 = schließen 1 = öffenen 2 = leer
int motorpin = 7;
int pinDHT11 = 3;
int photo = A3;
int brief = 0;
int doormode = 0;

String tuersoll;
String tempsoll;

int photowert;
int photokali;

byte temperature = 0;
byte humidity = 0;

long zeit;
long letzteZeit = 0;

#define STEPS 128

Stepper stepper(STEPS, 8, 10, 9, 11);
HX711 scale(A1, A0);
SimpleDHT11 dht11;

String readString;

void setup()
{

    Serial.begin(9600);
    delay(100);
    Serial.println("__START__");

    pinMode(pirPin, INPUT);
    pinMode(photo, INPUT);
    pinMode(motorpin, OUTPUT);
    Serial.begin(9600);
    scale.set_scale(-723960);
    scale.tare();
    stepper.setSpeed(200);
    photokali = analogRead(photo);
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {
        0, -1};
    int maxIndex = data.length() - 1;
    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void cooling()
{
    digitalWrite(motorpin, HIGH);
}

void loop()
{
    // put your main code here, to run repeatedly:
    zeit = millis();
    pirWert = digitalRead(pirPin);
    photowert = analogRead(photo);

    if (photowert <= photokali - 50)
    {
        brief = 1;
    }

    if (pirWert == HIGH)
    {
        pir = 1;
    }
    if (door == 0)
    {
        stepper.step(-3000);
        door = 2;
        doormode = 1;
    }
    else if (door == 1)
    {
        stepper.step(3000);
        door = 2;
        doormode = 0;
    }

    if (dht11.read(pinDHT11, &temperature, &humidity, NULL))
    {
        return;
    }

    if (zeit >= letzteZeit + 2000) //
    {
        letzteZeit = zeit;
        Serial.print("_");
        Serial.print(scale.get_units(10) * -1, 2);
        Serial.print("_");
        Serial.print(pir);
        Serial.print("_");
        Serial.print((int)temperature);
        Serial.print("_");
        Serial.print((int)humidity);
        Serial.print("_");
        Serial.print(brief);
        Serial.print("_");
        Serial.print(doormode);
        Serial.println("_");
        pir = 0;
        brief = 0;
    }

    while (Serial.available())
    {
        delay(5); //delay to allow buffer to fill
        if (Serial.available() > 0)
        {
            char c = Serial.read(); //gets one byte from serial buffer
            if (c == '\r' || c == '\n')
            {
                break;
            }
            readString += c; //makes the string readString
            Serial.println(c);
        }
    }

    if (readString.length() > 0)
    {
        String cmd = getValue(readString, '_', 1);
        int pin = getValue(readString, '_', 2).toInt();
        int state = getValue(readString, '_', 3).toInt();

        Serial.println("GOT_" + cmd + "_" + String(pin) + "->" + String(state));
        readString = "";
    }
}
