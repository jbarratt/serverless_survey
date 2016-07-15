.PHONY: build

BUCKET_NAME = survey-b0ea57d03

devbuild:
	./node_modules/.bin/webpack -d
	cp src/index.html build/index.html

build: 
	@NODE_ENV=production ./node_modules/.bin/webpack -p
	cp src/index.html build/index.html
	cp src/favicon.ico build/favicon.ico

# http://survey-b0ea57d03.s3-website-us-west-2.amazonaws.com
bucket:
	aws s3 mb s3://$(BUCKET_NAME)
	aws s3api put-bucket-website --bucket $(BUCKET_NAME) --website-configuration file://website.json

deploy:
	aws s3 sync --acl "public-read" --sse "AES256" build/ s3://$(BUCKET_NAME)
