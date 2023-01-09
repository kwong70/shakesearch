# ShakeSearch

Welcome to the Pulley Shakesearch Take-home Challenge! In this repository,
you'll find a simple web app that allows a user to search for a text string in
the complete works of Shakespeare.

You can see a live version of the app at
https://pulley-shakesearch.onrender.com/. Try searching for "Hamlet" to display
a set of results.

In it's current state, however, the app is in rough shape. The search is
case sensitive, the results are difficult to read, and the search is limited to
exact matches.

## Your Mission

Improve the app! Think about the problem from the **user's perspective**
and prioritize your changes according to what you think is most useful.

You can approach this with a back-end, front-end, or full-stack focus.

## Evaluation

We will be primarily evaluating based on how well the search works for users. A search result with a lot of features (i.e. multi-words and mis-spellings handled), but with results that are hard to read would not be a strong submission.

## Submission

1. Fork this repository and send us a link to your fork after pushing your changes.
2. Render (render.com) hosting, the application deploys cleanly from a public url.
3. In your submission, share with us what changes you made and how you would prioritize changes if you had more time.

## API  
#### Application: https://kw-shakesearch-ui.onrender.com/
#### API Repo   : https://github.com/kwong70/shakesearch-api
#### API BASEURL: https://kw-shakesearch-api.onrender.com
#### Note       : Render.com suspends/sleeps the api after 15 minutes of idle time. The first request takes ~1min to awake the server. Subsequent requests take their normal time <1s .

## Features Completed 
1. Highlight found word/s 
2. Case insensitive (always)
3. Each finding in its own block 
4. Search selected titles
5. Display title
6. Exact match for phrase or individual words
7. Total match count 
8. Pagination 
9. Remove possible matches from prework/finis

## Future Improvments 
1. Concept matching (love -> monologue about love)
1b. Finds oppososite concepts (love -> love and hatred)
2. Search based off speaker (hamlet, love -> search for hamlet talking about love)

## Test Queries 
#### "He is married?" 
- two matches in Antony and Cleo but close enough where it should only show in one viewing

#### "merchandise" 
- word that appears 7 times. base case

## User Wants 
1. find works with a certain word
2. search for a given a concept, alike and opposites 
3. search in a specific work 