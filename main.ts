/**
 * --- IR Remote Demo: Pixel Mover ---
 */
// Handles the IR datagram event.
// Called every time a signal is received.
function onIrSignalReceived () {
    buttonCode = makerbit.irButton()
    // --- Movement Controls ---
    // Move Up (2)
    // Move Down (8)
    // Move Left (4)
    // Move Right (6)
    // --- Action Controls ---
    // Clear Screen (EQ)
    // Toggle Pixel (Play/Pause)
    // This will turn the pixel at (x, y) on or off
    // Reset to Center (0)
    // Play "Nyan Cat" (CH)
    if (buttonCode == IrButton.Number_2) {
        y = Math.max(0, y - 1)
        led.plot(x, y)
    } else if (buttonCode == IrButton.Number_8) {
        y = Math.min(4, y + 1)
        led.plot(x, y)
    } else if (buttonCode == IrButton.Number_4) {
        x = Math.max(0, x - 1)
        led.plot(x, y)
    } else if (buttonCode == IrButton.Number_6) {
        x = Math.min(4, x + 1)
        led.plot(x, y)
    } else if (buttonCode == IrButton.Eq) {
        basic.clearScreen()
        // Re-plot the current pixel
        led.plot(x, y)
    } else if (buttonCode == IrButton.PlayPause) {
        led.toggle(x, y)
    } else if (buttonCode == IrButton.Number_0) {
        x = 2
        y = 2
        basic.clearScreen()
        led.plot(x, y)
    } else if (buttonCode == IrButton.Ch) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
        basic.pause(3000)
        music.stopMelody(MelodyStopOptions.All)
    }
}
// Initializes the IR receiver and plots the starting pixel.
function initializeApp () {
    // 1. Connect to the IR Receiver on Pin 0
    makerbit.connectIrReceiver(DigitalPin.P0, IrProtocol.NEC)
    // 2. Set the starting volume to low
    music.setVolume(20)
    // 3. Plot the starting pixel in the center
    led.plot(x, y)
}
let buttonCode = 0
let y = 0
let x = 0
x = 2
y = 2
// --- Main Program ---
initializeApp()
makerbit.onIrDatagram(onIrSignalReceived)
