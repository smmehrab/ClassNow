# ClassNow

A Class Scheduler App which will schedule the classes for different courses, teachers &amp; student groups, considering free time slots &amp; other constraints.


<div>

<a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/smmehrab/ClassNow/documentation/documentation/badges/node.svg"><a>
<a href="https://www.npmjs.com/"><img src="https://raw.githubusercontent.com/smmehrab/ClassNow/documentation/documentation/badges/npm.svg"><a>
[![Generic license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/smmehrab/lexicon/blob/documentation/LICENSE)

</div>

<br>

## Get Started

<br>

1. Clone/Download the repository.

2. Go to [algorithm](https://github.com/smmehrab/ClassNow/tree/master/algorithm) directory.
    ```
    cd algorithm/
    ```

3. Install the dependencies.
    ```
    npm install
    ```
    (Make sure you already got [node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) installed)

4. Run
    ```
    npm start
    ```
    (This will internally run [scheduler.js](https://github.com/smmehrab/ClassNow/blob/master/algorithm/scheduler.js))

This will show the following [output](https://raw.githubusercontent.com/smmehrab/ClassNow/documentation/documentation/screenshots/output.png) on terminal, for the [sample input](https://raw.githubusercontent.com/smmehrab/ClassNow/master/algorithm/data/input.xlsx). 

The output will also be saved on ```./algorithm/output/``` directory as [routines.xlsx](https://raw.githubusercontent.com/smmehrab/ClassNow/master/algorithm/output/routines.xlsx).

<br>

## Cookbook

<br>

To use it to generate routines for any valid input, follow these:

1. Download the [sample input](https://raw.githubusercontent.com/smmehrab/ClassNow/master/algorithm/data/input.xlsx). 
    > To maintain the input format

2. Edit it as you like & save the changes. 
    > Insert any valid input

3.  Run
    ```
    npm start
    ```

4. Get the output as a ```.xlsx``` file from [./algorithm/output/](https://github.com/smmehrab/ClassNow/tree/master/algorithm/output/).
