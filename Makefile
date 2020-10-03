IMAGE_NAME := mdreport-demo
TAG_NAME := latest
PORT := 5000

build:
	docker build -t $(IMAGE_NAME):$(TAG_NAME) .

run:
	docker stop mdreport-demo; docker rm mdreport-demo; echo 1
	docker run \
		-itd \
		--rm \
		-p $(PORT):3000 \
		-v ${PWD}:/app \
		--name=mdreport-demo \
		$(IMAGE_NAME):$(TAG_NAME)

