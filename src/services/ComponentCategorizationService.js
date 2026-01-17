export class ComponentCategorizationService {

  static categorize(description) {
    const lower = description.toLowerCase();
    
    return {
      powerSupply: this.categorizePower(lower),
      inputs: this.categorizeInputs(lower),
      control: this.categorizeControl(lower),
      outputs: this.categorizeOutputs(lower),
      peripherals: this.categorizePeripherals(lower)
    };
  }


  static categorizePower(text) {
    const components = ['Voltage Regulator (5V/3.3V)', 'Power Distribution'];
    
    // Check for specific power sources
    if (text.includes('battery')) {
      components.unshift('Li-Ion Battery + BMS');
    } else if (text.includes('solar')) {
      components.unshift('Solar Panel + Charger');
    } else if (text.includes('usb')) {
      components.unshift('USB Power (5V)');
    } else {
      components.unshift('DC Power Supply');
    }
    
    return components;
  }


  static categorizeInputs(text) {
    const components = [];
    
    // Comprehensive input keyword mapping
    const inputMap = {
      'camera': 'Camera Module (OV2640/OV5640)',
      'motion sensor': 'PIR Motion Sensor (HC-SR501)',
      'pir': 'PIR Motion Sensor',
      'microphone': 'MEMS Microphone',
      'mic': 'MEMS Microphone',
      'button': 'Push Buttons (GPIO)',
      'switch': 'Toggle Switch',
      'touch': 'Capacitive Touch Sensor',
      'temperature': 'Temperature Sensor (DHT22/DS18B20)',
      'humidity': 'Humidity Sensor (DHT22)',
      'light sensor': 'LDR/Ambient Light Sensor',
      'ldr': 'Light Dependent Resistor',
      'proximity': 'Ultrasonic/IR Proximity Sensor',
      'ultrasonic': 'Ultrasonic Sensor (HC-SR04)',
      'accelerometer': '3-Axis Accelerometer (MPU6050)',
      'gyroscope': 'Gyroscope (MPU6050)',
      'pressure': 'Barometric Pressure Sensor (BMP280)',
      'gps': 'GPS Module (NEO-6M)',
      'rfid': 'RFID Reader (RC522)',
      'fingerprint': 'Fingerprint Sensor',
      'keypad': 'Matrix Keypad (4x4)'
    };

    // Match keywords in description
    Object.entries(inputMap).forEach(([key, component]) => {
      if (text.includes(key)) {
        components.push(component);
      }
    });

    // Default if no inputs found
    if (components.length === 0) {
      components.push('GPIO Input Pins');
    }
    
    return components;
  }

  static categorizeControl(text) {
    const components = [];
    
    // Determine microcontroller type
    if (text.includes('esp32') || (text.includes('wifi') && text.includes('bluetooth'))) {
      components.push('ESP32 Microcontroller');
      components.push('Dual-Core Xtensa LX6 (240MHz)');
    } else if (text.includes('esp8266') || text.includes('wifi')) {
      components.push('ESP8266 WiFi SoC');
      components.push('Tensilica L106 (80MHz)');
    } else if (text.includes('arduino')) {
      components.push('ATmega328P (Arduino)');
      components.push('AVR 8-bit (16MHz)');
    } else if (text.includes('raspberry pi')) {
      components.push('Raspberry Pi 4');
      components.push('ARM Cortex-A72 (1.5GHz)');
    } else if (text.includes('stm32')) {
      components.push('STM32 Microcontroller');
      components.push('ARM Cortex-M4 (84MHz)');
    } else {
      // Default intelligent selection
      components.push('STM32 Microcontroller');
      components.push('ARM Cortex-M4');
    }
    
    // Add standard components
    components.push('Flash Memory (4MB)');
    components.push('SRAM (520KB)');
    components.push('ADC/DAC Converters');
    
    return components;
  }

  static categorizeOutputs(text) {
    const components = [];
    
    const outputMap = {
      'speaker': 'Audio Amplifier + Speaker',
      'buzzer': 'Piezo Buzzer',
      'led': 'RGB LED Indicators',
      'display': 'OLED Display (128x64)',
      'lcd': 'LCD Display (16x2)',
      'oled': 'OLED Display (128x64)',
      'motor': 'DC Motor Driver (L298N)',
      'servo': 'Servo Motor (SG90)',
      'stepper': 'Stepper Motor Driver',
      'relay': 'Relay Module (5V)',
      'solenoid': 'Solenoid Lock',
      'vibration': 'Vibration Motor'
    };

    Object.entries(outputMap).forEach(([key, component]) => {
      if (text.includes(key)) {
        components.push(component);
      }
    });

    // Default outputs
    if (components.length === 0) {
      components.push('Status LED Indicators');
      components.push('GPIO Output Pins');
    }
    
    return components;
  }

  static categorizePeripherals(text) {
    const components = [];
    
    const peripheralMap = {
      'wifi': 'WiFi Module (802.11 b/g/n)',
      'bluetooth': 'Bluetooth 4.2/BLE',
      'ble': 'Bluetooth Low Energy',
      'cloud': 'Cloud API Interface',
      'mqtt': 'MQTT Protocol Handler',
      'http': 'HTTP/HTTPS Client',
      'usb': 'USB-to-Serial (CP2102)',
      'sd card': 'SD Card Interface (SPI)',
      'rtc': 'Real-Time Clock (DS3231)',
      'eeprom': 'External EEPROM',
      'ethernet': 'Ethernet Module (W5500)',
      'zigbee': 'Zigbee Module',
      'lora': 'LoRa Module'
    };

    Object.entries(peripheralMap).forEach(([key, component]) => {
      if (text.includes(key)) {
        components.push(component);
      }
    });

    // Default peripheral
    if (components.length === 0) {
      components.push('UART Debug Interface');
    }
    
    return components;
  }
}