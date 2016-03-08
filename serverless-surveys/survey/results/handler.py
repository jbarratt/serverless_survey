from __future__ import print_function

import json
import logging

log = logging.getLogger()
log.setLevel(logging.DEBUG)

# this adds the component-level `lib` directory to the Python import path
import sys
import os
# get this file's directory independent of where it's run from
here = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(here, "../"))
sys.path.append(os.path.join(here, "../vendored"))

# import the shared library, now anything in component/lib/__init__.py can be
# referenced as `lib.something`
# import lib
import uuid
import boto3


def handler(event, context):
    bucket = os.environ.get('RESULTS_BUCKET', None)
    if bucket is None:
        log.debug("RESULTS_BUCKET not set")
        bucket = "dev-serverless-surveys-results"
    log.debug("Received event {}".format(json.dumps(event)))
    s3 = boto3.resource('s3')
    filename = "{}.json".format(uuid.uuid4())
    s3.Bucket(bucket).put_object(Key=filename,
                                 Body=json.dumps(event['body']))
    return {"message": "Submission saved to {}".format(filename),
            "event": event}
