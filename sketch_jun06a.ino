const int TrigPin = 2; 
const int EchoPin = 3; 
float cm; 
void setup() 
{ 
Serial.begin(9600); 
pinMode(TrigPin, OUTPUT); 
pinMode(EchoPin, INPUT); 
pinMode(13,OUTPUT);
} 
void loop() 
{ 
digitalWrite(13, LOW);

digitalWrite(TrigPin, LOW); //低高低电平发一个短时间脉冲去TrigPin 
delayMicroseconds(2); 
digitalWrite(TrigPin, HIGH); 
delayMicroseconds(10); 
digitalWrite(TrigPin, LOW); 

cm = pulseIn(EchoPin, HIGH) / 58.0; //将回波时间换算成cm 
cm = (int(cm * 100.0)) / 100.0; //保留两位小数 
if (cm>=2 && cm<=10)
digitalWrite(13, HIGH);
}
