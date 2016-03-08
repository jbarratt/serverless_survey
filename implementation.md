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


[AWS Reference for Python on Lambda](http://docs.aws.amazon.com/lambda/latest/dg/lambda-python-how-to-create-deployment-package.html)

It includes `boto3` by default so we don't need to package it.
However, if there's anything else, you can do a vendored install

    pip install -t vendored/ -r requirements.txt
    Successfully installed ....

Ok, time for CORS.

    npm install --save serverless-cors-plugin
    sls endpoint deploy --all

Hm, doesn't seem to be working. 

Ok, flip to the UI, come back to it.

[Serverless Client S3](https://github.com/serverless/serverless-client-s3)

Ah. RTFMing for that led to the answer, I had forgotten to add the first
one to the `s-project.json:plugins` list.

    mkdir -p client/dist
    # create index.html
    sls client deploy
    Successfully deployed client to: serverless-surveys.client.dev.us-west-2.s3-website-us-west-2.amazonaws.com 

Pro tip! The default .gitignore ignores dist/. If you put your code there, you'll be wanting that.

Great. And `sls endpoint deploy --all` now shows that (a) an OPTIONS endpoint is deployed and 
(b) when I do GET and POST, I'm getting back Access-Control-Allow-Origin headers. So that's good.

Ok! Time to see if we can actually fill in a form.

Ok, get a tiny bit fancy, and use https://github.com/jarsbe/react-simple

`sls function logs`

Ok, so extra buckets go in s-resources-cf.json.

    $ sls resources deploy

I need to figure out how to get the code to know about
a bucket named

    ${stage}-${project}-results

i.e. dev-serverless-surveys-results

I can hard code it for now but that's janky. Looks like https://github.com/serverless/serverless-helpers-js is sort of for this, but the python version is nil.

Can possibly put it in s-function.json and pass is as an env var, not very DRY, but it should work.

    $ sls env set -r all -s dev -k RESULTS_BUCKET -v dev-serverless-survey-results

.. then add RESULTS_BUCKET to s-function.json

Now all that's left is granting the IAM role to lambda to write files to the bucket.

Cool, got that going. Just add it to the rest of the policies in s-resources-cf.json. Works with templates, too.


## TODO

* Fix basic layout
* Ensure that on submit bounces to a thanks page (react-router)
* create a client/src and webpack the app from there into client/dist
* `sls stage create -s production -r us-west-2`
* add client id localstorage
* add timestamp of result submission
* figure out the `env` issue (file a bug if needed)
