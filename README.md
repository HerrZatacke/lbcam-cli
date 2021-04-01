# lbcam-cli
A cli to run the lameboy_camera image transformation pipeline in the command line

This project is based on [https://github.com/JakeHL/lameboy_camera/](https://github.com/JakeHL/lameboy_camera/)

## setup and running
* You need [node.js](https://nodejs.org/) installed
* check out this repo
* run `npm i` in the repo folder
+ run the script `node src/index.js *.png [optional parameters]`

## optional parameters
`--brightness=n` value between -100 and 100  
`--contrast=n` value between 0 and 15  
`--lowLight` use lowLightDitherMatricies
