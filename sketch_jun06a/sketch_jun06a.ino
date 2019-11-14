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
---- BEGIN SSH2 PUBLIC KEY ----
Comment: "rsa-key-20191114"
AAAAB3NzaC1yc2EAAAABJQAAAQEAk/oVyCuglBY7FAAJkhgexw60sd2XAyoJD0cX
bjchTXWk+t4IHiZkrzFWBxte99/aGZFr2raVhFcqf0X56yY+0sZ2sCU4AYplwjk8
zEhsMXOMsyXhSFcE0oDiYcXbMmIhxsglGoSDM1QokZD29vwYziTxwQ5jXu90A/gj
lAyqo07MHhs6vXNnO1PjDCVnn8JOcLgFI0jpWxTNaG7MEozncwVE4sd/hcCG+SAD
zZCOL7eVohSF6V5TqiCaT5TVcK0hSEq7/rmWYakPbHhmaWH0GMm6A8YkJw8xHS8B
w0zzWlKejyJTYLmV7mSDahaGX9yBfSz5q8T4x5nc/A1hDqryvw==
