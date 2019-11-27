/*
 * a pineket és a szoba hosszát meg kell adni
 * led1 a szenzorhoz közelebb lévő led
 */
const int echoPin = 35;
const int trigPin = 32;
const int led1Pin = 23;
const int led2Pin = 22;

const int roomLength = 18;

long duration = 0;
int distance = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
  //Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); //10 microseconds trigger pulse
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = 0.03434 * duration / 2;
  //Serial.print(distance);
  
  if(distance >= roomLength) {
    //Serial.println(" room empty");
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
  } else if(distance < roomLength/3) {
    //Serial.println(" led 1");
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, LOW);
  } else if(distance >= roomLength/3 && distance <= (2*roomLength)/3 ) {
    //Serial.println(" led 1 & 2");
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, HIGH);
  } else if(distance > (2*roomLength)/3 && distance < roomLength) {
    //Serial.println(" led 2");
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, HIGH);
  }
}
