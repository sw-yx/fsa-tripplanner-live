Deployed at <https://swyx-tripplanner.herokuapp.com/>

# FSA Trip Planner (Live)

Trip Planner is a Single Page Application:

The term "Single-Page Application" (or SPA) is used to describe applications that were built for the browser. The most notable difference between a regular website and an SPA is the absence of page refreshes: Single Page Applications load a single HTML page and dynamically update the DOM as the user interacts with the app or data gets fetched from the server (using AJAX).

In this workshop you will use client-side JavaScript to:

- Get data from the server using AJAX;
- Listen for events (button clicks) and
- Create, add and remove new DOM Elements to the page.

## Epilogue

After writing so much server code, we returned at last to writing client-side (browser) code. This workshop presented many challenges, including: synchronizing in-memory data and the view, reacting to user input, and confronting the browser's lack of any module / dependency system.

## Progress Rubric

We will continue learning about Single Page Applications, but be aware that Trip Planner Live was challenging and open-ended by design. Like many web developers in the days before formal frameworks, you will have written a very ad-hoc solution, likely quite different from your fellow cohort members and/or instructor. Moving forward with Trip Planner Persistence, you may find it difficult to shoehorn in new functionality to your own solution, or even comprehend someone else's solution. That is normal, and one of the reasons we will eventually learn React.js — which will provide solutions for code organization and other issues.

## Main Takeaways

- Gain practice in breaking down a complex software goal into small soluble tasks and features
- Feel comfortable using JavaScript to manipulate the DOM
- Understand event handling.
- Realize the complexity of building an application with even just a handful of integrated components
- Have some notion of "model" and "view" in the context of a front-end application

# Comments From Swyx

I enjoyed using the new `fetch` feature in vanilla js (usable in most browsers) for ajax as I have historically just used `jquery` or `axios` for ajax out of ignorance.
It was also good to be comfortable enough with javascript to be able to confront a completely new library (`mapbox-gl`) and use it effectively. Granted, great documentation replete with examples helped.

We ran into some uncertainties trying to deploy this thing. For one thing I was using `async/await` for the first time on the server and this requires node 8, which heroku doesn't support by default but can easily be enabled (with `engine` in `package.json`). We were also uncertain how to upload local databases to heroku but sidestepped this today as we were simply able to uplaod a seed file. we would not be so lucky in real deployments. I think we just have to enter the remote database through the heroku CLI, something like `heroku pg:psql postgresql-dimensional-72359 --app swyx-tripplanner` but this remains untested.
