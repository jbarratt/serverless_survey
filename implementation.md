# Plan

The idea is to start with a bone-simple setup: truly anonymous surveys.
All that's required is:

* a single REST endpoint `/results/`, which results are POSTed to
* an s3 bucket which stores the results as `/results/<uuid>.json`
* a single HTML page, with the survey content inline, which posts to the bucket

Long term ideas for improvement include

* allow password-enabled recovery of results
* improve single page app
    * make styling not awful
    * reactified
    * react-router to explain things, link to how it's made, post-submission thanks
    * generate a browser token, stash in localstorage, for dedupe

Things I know I'll need:

    * https://github.com/joostfarla/serverless-cors-plugin
    * https://github.com/serverless/serverless-client-s3

Blogs that were useful:

    * https://serverlesscode.com/post/python-on-serverless-intro/
    * http://zanon.io/posts/building-serverless-websites-on-aws-tutorial

# Historical Log

Since this is a new foray into `serverless`, I'll just log things as they happen.

    npm install serverless -g

I snagged serverless-starter, but it's pretty heavy on boilerplate. 

    serverless project install serverless-starter

I moved it aside, will keep it around for reference.

    sls project create

So the structure is generally
    
    - project # the top level thing
        - component # an element that groups code per runtime (node, python)
            - module # each 'microservice'
                - function # where the tiny lambdas actually live

Still a decent amount of goodness in the default deploy:

    ./.env
    ./.gitignore
    ./_meta
    ./_meta/resources
    ./_meta/resources/s-resources-cf-dev-uswest2.json
    ./_meta/variables
    ./_meta/variables/s-variables-common.json
    ./_meta/variables/s-variables-dev-uswest2.json
    ./_meta/variables/s-variables-dev.json
    ./admin.env
    ./package.json
    ./README.md
    ./s-project.json
    ./s-resources-cf.json

So now to create the endpoint:

    sls component create -r python2.7
    # survey
    sls function create survey/results

Great, first deploy

    sls dash deploy
        Ctrl-A, down,down,Deploy

Get seems to work, but POST no dice. Ah, needs to be in `s-function.json`. Fixed it.
Dash deploy again.

    http POST https://qpzm97uod1.execute-api.us-west-2.amazonaws.com/dev/results "foo=bar"

	{                                                           
		"event": {                                              
			"foo": "bar"                                        
		},                                                      
		"message": "Submission sent to /dev/null"               
	}                                                           

Neat! That seems to work. Still need to know if it's a GET or POST though.

From serverless-starter, it looks like the root s-templates.json needs to have an API request tempalte in it. Cool, stealing that.

Yuck, big barf. Bad JSON syntax for my edit. I fixed it, but goodness help you if you'd made a bunch of edits. Traceback gave no indication of what the actual problem was.

And now the event is much richer.

Parameters are now coming in as `body: {"foo": "bar"}`. I'm also getting `httpMethod`: `POST`.
And `queryParams: {}`.






