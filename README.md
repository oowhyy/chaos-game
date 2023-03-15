# What is this
Web page based simulation of "Chaos game"

# Inspired by
+ Numberphile video [Chaos Game - Numberphile](https://youtu.be/kbKtFN71Lfs)

+ Wiki page [Chaos game](https://en.wikipedia.org/wiki/Chaos_game)

# How this works
The basic idea is that we have some attractor points (placed on a circle for certainty). Also there is a pen that can draw dots.
On each step a random attractor is chosen and the pen lerps some distance to the chosen point. This process should be repeated indefinitely in theory. 
In practice screen space is discrete and dots start to overlap. In the basis case - three attractors, any can be chosen with any probability and no other restrictions, lerp distance is 0.5 - after a while a Sierpinski triangle appears.
## Basic example
How to start - run basic/index.html
### Basic example controls
Click on a die to make a step (1 or 2 - first attractor selected, 3 or 4 - second, 5 or 6 - third)
Press "a" on a keyboard to start/stop auto roll.

// TODO add demo gif

## All dots example
How to start - run example2/index.html

Click any where for the next step

## Main simulation
### Controls
#### start/reset button
resets the simulations with new rules
#### pause/play button
pauses and resumes the simulation
#### rules control - circle of circles
Every circle is a radio button. Can be on or off. 
**These are all restrictions** - based on attractors selected on the previous steps.
By default there are no restrictions.
Restrictions are **relative**. darker color circles indicate previously chosen node.
There are 3 types of restrictions represented by each type of circles:
1. Big yellow circle - restrict choosing node relative to the previous. For example if you cross out the big yellow circle that is next to the orange one clockwise, an attractor clockwise next to the one selected on the previous iteration will be excluded from possible selection pool for the current iteration.
2. Small yellow circle - same as big one but works two steps back - with the attractor one before previous.
3. Blue circle - only becomes relevant on the iteration where previous and the one before attractors were the same. Applies relative restriction same as big yellow circles. For example with dark blue circle (indicating relative previous attractor, like all darker cirles) crossed out any attractor can be selected at most two times in a row.
#### save button
Download png image of the current fractal
#### more + less buttons
increase or decrease number of attractors
#### value slider
Sets the lerping distance. 0.5 by default. Lower values generally lead to more blured images.

# Examples

//TODO add images of fractals with control panels



