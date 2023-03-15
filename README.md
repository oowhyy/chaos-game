# What is this
web app simulation of "chaos game"

# inspired by
numberphile video [Chaos Game - Numberphile] (https://youtu.be/kbKtFN71Lfs)
wiki page [Chaos game] (https://en.wikipedia.org/wiki/Chaos_game)

# How this works
The basic idea is that we have some attractor points (placed on a circle for certainty). Also there is a pen that can draw dots.
On each step a random attractor is chosen and the pen lerps some distance to the chosen point. This process should be repeated indefinitely in theory. 
In practice screen space is discrete and dots start to overlap. In the basisc case after a while a Sierpinski triangle appears.
## Basic example
How to start - run index.html
### Basic example controls

Click on a die to make a step (1 or 2 - first attractor selected, 3 or 4 - second, 5 or 6 - third)
Press "a" on a keyboard to start/stop auto roll.
// TODO add demo gif

## All dots 
