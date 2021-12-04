---
title:  "Hacking out an object detector using brain.js"
date:   2018-04-05 04:00:00 +0530
categories: [AI]
tags: [ML]
---

Two weeks back, I had to demo my final year project which uses Deep Learning. 
Being a novice myself, I know how difficult it is to wrap our minds around DL. So, 
I wanted to build an intuitive demo with real-world applications which would help me 
to explain my project. (The world has had enough MNIST classifiers!).

I planned on building an object detector but also eschewed from "production-ready" 
deep-learning frameworks because those are quite convoluted for a beginner to 
understand. So after a lot of considerations, I picked 
[_brain.js_](https://github.com/BrainJS/brain.js). Brain.js is a fork of an 
older javascript neural network library, brain, which went unmaintained few years 
back. It has a steep learning curve, easy to use, and runs on the browser.

I was all set to build the detector but had one major problem: I have never collected 
a real-world image dataset before, let alone do it with javascript. After searching 
for a while, I came up with this inane idea of completely collecting the dataset in 
the frontend using the webcam.

Here's how I did it:
1. Get the camera stream using `navigator.getUserMedia` and write to a video tag.
2. Write the video to a canvas as a 100x100 image so that it can be read back as 
[ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.
3. Read the canvas, grayscale the image, and write one of the color channels to 
an array. [[ref](https://www.html5rocks.com/en/tutorials/canvas/imagefilters/)]
4. Convert the array to a CSV and download it. [[ref](https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side)]

```js
// grayscales ImageData object
function grayscale(image) {
    let pixels = image.data;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 
        0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
    }

    return image;
}

// converts a given channel of an ImageData object to array
function channelToArray(image, channelID) {
    let pixels = image.data;
    let channel = [];

    for (let i = 0; i < pixels.length; i += 4) {
        channel.push(pixels[i + channelID]);
    }

    return channel;
}

// converts 2D array to CSV and downloads it
function arrayToCSV(arr) {
    let csvContent = 'data:text/csv;charset=utf-8,';
    arr.forEach(row => {
        csvContent += row.join(',') + '\r\n';
    });

    const URI  = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', URI);
    link.setAttribute('download', 'dataset.csv');
    document.body.appendChild(link);
    link.click();
}

window.addEventListener('load', () => {
    const display  = document.querySelector('#display');
    const canvas   = document.querySelector('#canvas');
    const ctx      = canvas.getContext('2d');
    const startBtn = document.querySelector('#start');
    const stopBtn  = document.querySelector('#stop');
    const HEIGHT   = 100;
    const WIDTH    = 100;

    let dataset = [];
    let recordInterval;

    // write webcam to #display
    navigator.getUserMedia({video: { width: WIDTH, height: HEIGHT }},
        stream => display.srcObject = stream,
        err => alert('Something went terribly wrong! :('));

    startBtn.addEventListener('click', () => {
        // starts writing webcam to dataset @ 30fps
        recordInterval = setInterval(() => {
            ctx.drawImage(display, 0, 0, WIDTH, HEIGHT);
            const image      = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            const grayscaled = grayscale(image);
            const channel    = channelToArray(grayscaled, 0);

            dataset.push(channel);
            console.log(channel);

            ctx.putImageData(grayscaled, 0, 0);
        }, 1000 / 30);
    });

    stopBtn.addEventListener('click', () => {
        // stops writing webcam to datset and downloads dataset as CSV
        clearInterval(recordInterval);
        arrayToCSV(dataset);
    });
});
```

This way I created separate datasets for the obstacle and its absence. Using this I 
created, trained, and saved a network.

```js
const brain = require('brain.js');
const fs    = require('fs');

function readCSV(path) {
    const content = fs.readFileSync(path, 'utf8');
    let arr       = [];

    content.split('\n').forEach(line => {
        arr.push(line.split(',').map(n => parseInt(n, 10)));
    });

    return arr;
}

// read obstacle and no_obstacle dataset seperately and convert to brain.js format
obstacle   = readCSV('./dataset/obstacle.csv');
noObstacle = readCSV('./dataset/no_obstacle.csv');

inputData = [];
obstacle.forEach(image => inputData.push({input: image, output: [0]}));
noObstacle.forEach(image => inputData.push({input: image, output: [1]}));

// train the network
console.time('training');
const net = new brain.NeuralNetwork({
    activation: 'sigmoid',
    hiddenLayers: [1000, 100],
    learningRate: 0.6
});
net.train(inputData);
console.timeEnd('training');

// write the model
fs.writeFileSync('./model/model.json', JSON.stringify(net.toJSON()));
```

Here is where something really unexpected happened. The generated model was around 
270MB which is gargantuan considering it was trained to run on the browser. But 
since this is just a demo, it wasn't much of a problem when serving from local.

Finally, all I had to do was load the model via AJAX and predict.

```js
// fethes the model using AJAX
function loadModel(net) {
    fetch('../model/model.json')
        .then(res => res.json())
        .then(json => net.fromJSON(json));

    return net;
}

// initialize and load the model
function initModel() {
    const net = new brain.NeuralNetwork({
        activation: 'sigmoid',
        hiddenLayers: [1000, 100],
        learningRate: 0.6
    });

    const model = loadModel(net);
    return model;
}

// grayscales ImageData object
function grayscale(image) {
    let pixels = image.data;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i + 1] = pixels[i + 2] =
        0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
    }

    return image;
}

// converts a given channel of an ImageData object to array
function channelToArray(image, channelID) {
    let pixels = image.data;
    let channel = [];

    for (let i = 0; i < pixels.length; i += 4) {
        channel.push(pixels[i + channelID]);
    }

    return channel;
}

// if obstacle -> 1 else -> 0
function predict(net, image) {
    const input = channelToArray(grayscale(image), 0);
    return net.run(input) <= 0.5;
}

window.addEventListener('load', () => {
    const display  = document.querySelector('#display');
    const canvas   = document.querySelector('#canvas');
    const ctx      = canvas.getContext('2d');
    const model    = initModel();
    const HEIGHT   = 100;
    const WIDTH    = 100;

    // write webcam to #display
    navigator.getUserMedia({video: { width: WIDTH, height: HEIGHT }},
        stream => display.srcObject = stream,
        err => alert('Something went terribly wrong! :('));

    // predict and update @ 30fps
    setInterval(() => {
        ctx.drawImage(display, 0, 0, WIDTH, HEIGHT);

        const image = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        document.body.style.backgroundColor = (predict(model, image) ? 'red' : 'green'); // if obstacle -> red else -> green
    }, 1000 / 30);
});
```

So the million dollar question: _Did it work?_ Well, it partially did. Definitely, 
not the best object detector, but was good enough for the demo. Afterall, this is 
all just a hack!

Complete source [here](https://github.com/AravindVasudev/object-detector).