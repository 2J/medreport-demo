IMAGE_NAME := medreport-demo
TAG_NAME := latest
PORT := 5000

build:
	docker build -t $(IMAGE_NAME):$(TAG_NAME) .

run:
	docker stop $(IMAGE_NAME); docker rm $(IMAGE_NAME); echo 1
	docker run \
		-itd \
		-p $(PORT):3000 \
		--name=$(IMAGE_NAME) \
		$(IMAGE_NAME):$(TAG_NAME)

