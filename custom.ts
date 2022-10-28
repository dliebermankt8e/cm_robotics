/**
 * # = White Under sensor
 * 
 * From the driver seat 
 * 1..2..4
 * 
 * W..W..W  Stop = 7
 * B..B..B  Stop = 0
 * 
 * W..W..B  Left = 3
 * W..B..B  Left = 1
 * B..W..W  Right = 6
 * B..B..W  Right = 4
 * 
 * W..B..W  Forward = 5
 * B..W..B  Stop = 2
**/

enum Dir {
    //% block="Left"
    Left,
    //% block="Right"
    Right,
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse,
    //% block="Stop"
    Stop
}

let Forward_Right_Speed = 50;
let Forward_Left_Speed = 50;
let Right_Turn_Right_Speed = 15;
let Right_Turn_Left_Speed = 30;
let Left_Turn_Right_Speed = 30;
let Left_Turn_Left_Speed = 15;
let Motor_Enabled = false;
let Sensor_Thresh = 850;

/**
 * Custom blocks
 */
//% weight=100 color=#0DA50D icon="\uf1ec" block="CM Utilities"
namespace Utilities {

    //% block
    export function SetSensorThresh(num: number) {
        Sensor_Thresh = num;
    }

    //% block
    export function Left() {
        return Dir.Left;
    }

    //% block
    export function Right() {
        return Dir.Right;
    }

    //% block
    export function Forward() {
        return Dir.Forward;
    }

    //% block
    export function Reverse() {
        return Dir.Reverse;
    }

    //% block
    export function Stop() {
        return Dir.Stop;
    }

    //% block
    export function WhiteDetected(num: number) {
        let PinValue = 0
        if (num == 0) {
            PinValue = pins.analogReadPin(AnalogPin.P0)
        } else if (num == 1) {
            PinValue = pins.analogReadPin(AnalogPin.P1)
        } else {
            PinValue = pins.analogReadPin(AnalogPin.P2)
        }
        //serial.writeString("P")
        //serial.writeNumber(num)
        //serial.writeString(": ")
        //serial.writeNumber(PinValue)
        //serial.writeLine("")
        if (PinValue < Sensor_Thresh) {
            return 1
        } else {
            return 0
        }
    }

    //% block
    export function SensorDirection(): Dir {
        let PinBinary = 0
        if (WhiteDetected(0) == 1) {
            PinBinary |= 1;
        }
        if (WhiteDetected(1) == 1) {
            PinBinary |= 2;
        }
        if (WhiteDetected(2) == 1) {
            PinBinary |= 4;
        }
        switch (PinBinary) {
            case 0:
                return Stop();
            case 7:
                return Stop();
            case 6:
                return Left();
            case 5:
                return Forward();
            case 4:
                return Left();
            case 3:
                return Right();
            case 2:
                return Stop();
            case 1:
                return Right();
        }
        return Stop();
    }

    //% block
    export function ShowSensorLines() {
        let PinBinary = 0
        if (WhiteDetected(0) == 1) {
            PinBinary |= 1;
        }
        if (WhiteDetected(1) == 1) {
            PinBinary |= 2;
        }
        if (WhiteDetected(2) == 1) {
            PinBinary |= 4;
        }
        switch (PinBinary) {
            case 0:
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
        `       )
                break;
            case 7:
                basic.showLeds(`
                # . # . #
                # . # . #
                # . # . #
                # . # . #
                # . # . #
        `       )
                break;
            case 6:
                basic.showLeds(`
                . . # . #
                . . # . #
                . . # . #
                . . # . #
                . . # . #
        `       )
                break;
            case 5:
                basic.showLeds(`
                # . . . #
                # . . . #
                # . . . #
                # . . . #
                # . . . #
        `       )
                break;
            case 4:
                basic.showLeds(`
                . . . . #
                . . . . #
                . . . . #
                . . . . #
                . . . . #
        `       )
                break;
            case 3:
                basic.showLeds(`
                # . # . .
                # . # . .
                # . # . .
                # . # . .
                # . # . .
        `       )
                break;
            case 2:
                basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                . . # . .
        `       )
                break;
            case 1:
                basic.showLeds(`
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                # . . . .
        `       )
                break;
        }
    }

    //% block
    export function SetForwardRightSpeed(num: number) {
        Forward_Right_Speed = num;
    }

    //% block
    export function GetForwardRightSpeed(): number {
        return Forward_Right_Speed;
    }

    //% block
    export function SetForwardLeftSpeed(num: number) {
        Forward_Left_Speed = num;
    }

    //% block
    export function GetForwardLeftSpeed(): number {
        return Forward_Left_Speed;
    }

    //% block
    export function SetRightTurnRightSpeed(num: number) {
        Right_Turn_Right_Speed = num;
    }

    //% block
    export function GetRightTurnRightSpeed(): number {
        return Right_Turn_Right_Speed;
    }

    //% block
    export function SetRightTurnLeftSpeed(num: number) {
        Right_Turn_Left_Speed = num;
    }

    //% block
    export function GetRightTurnLeftSpeed(): number {
        return Right_Turn_Left_Speed;
    }

    //% block
    export function SetLeftTurnRightSpeed(num: number) {
        Left_Turn_Right_Speed = num;
    }

    //% block
    export function GetLeftTurnRightSpeed(): number {
        return Left_Turn_Right_Speed;
    }

    //% block
    export function SetLeftTurnLeftSpeed(num: number) {
        Left_Turn_Left_Speed = num;
    }

    //% block
    export function GetLeftTurnLeftSpeed(): number {
        return Left_Turn_Left_Speed;
    }

   //% block
    export function SetMotorEnabled(flag: boolean) {
        Motor_Enabled = flag;
    }

    //% block
    export function GetMotorEnabled(): boolean {
        return Motor_Enabled;
    }
}