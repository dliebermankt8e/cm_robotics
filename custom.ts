

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1ec" block="CM Utilities"
namespace Utilities {

    /**
     */
    //% block
    export const Forward = 0;
    /**
     */
    //% block
    export const Left = 1;
    /**
     */
    //% block
    export const Right = 2;
    /**
     */
    //% block
    export const Stop = 3;
    /**
     */
    //% block
    export const Reverse = 4;
   
    /**
     */
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
        if (PinValue < 500) {
            return 1
        } else {
            return 0
        }
    }

    /**
         */
    //% block
    export function SensorDirection() : number {
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
                return Stop;
            case 7:
                return Stop;
            case 6:
                return Left;
            case 5:
                return Forward;
           case 4:
                return Left;
            case 3:
                return Right;
            case 2:
                return Stop;
            case 1:
                return Right;
        }
    }
    /**
     */
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
}